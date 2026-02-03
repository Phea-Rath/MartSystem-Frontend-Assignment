import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FaTrash, FaPlus, FaSave, FaArrowLeft, FaCalculator, FaBox } from 'react-icons/fa';
import Select from 'react-select';
import api from '../../services/api';
import { useAlert } from '../../hooks/AlertContext';
import { Link, useNavigate, useParams } from 'react-router';

const PurchaseForm = () => {
    const alert = useAlert();
    const navigater = useNavigate();
    const queryClient = useQueryClient();
    const { id } = useParams();
    const token = localStorage.getItem('token');
    const isEditMode = !!id;

    // --- Form State ---
    const [supplier, setSupplier] = useState(null);
    const [description, setDescription] = useState('');
    const [deliveryFee, setDeliveryFee] = useState(0);
    const [taxRate, setTaxRate] = useState(0);
    const [overallDiscount, setOverallDiscount] = useState(0);
    const [payment, setPayment] = useState(0);
    const [items, setItems] = useState([]);

    const [totals, setTotals] = useState({ subtotal: 0, grandTotal: 0, balance: 0 });

    const fetchPurchaseById = async ({ queryKey }) => {
        const [, id] = queryKey; // ['products', id]

        const res = await api.get(`purchases/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return res.data.data;
    };

    const {
        data: editData,
    } = useQuery({
        queryKey: ['purchase', id],
        queryFn: fetchPurchaseById,
        enabled: !!id, // prevent run when id is undefined
    });

    // --- Populate Form in Edit Mode ---
    useEffect(() => {
        if (editData) {
            setSupplier({ value: editData?.supplier?.supplier_id, label: editData?.supplier?.supplier_name || 'Selected Supplier' });
            setDescription(editData.description || '');
            setDeliveryFee(editData.delivery_fee || 0);
            setTaxRate(editData.tax || 0);
            setOverallDiscount(editData.discount || 0);
            setPayment(editData.payment || 0);

            // Map items from editData
            const mappedItems = editData.purchase_details?.map(item => ({
                item_id: item.item_id,
                item_name: item.item_name,
                quantity: item.quantity,
                cost_price: item.cost_price,
                // discount: item.discount || 0,
                // tax: item.tax || 0
            })) || [];
            setItems(mappedItems);
        }
    }, [editData]);

    // --- Data Fetching ---
    const { data: supplierOptions } = useQuery({
        queryKey: ['suppliers', 'select'],
        queryFn: async () => {
            const res = await api.get('suppliers?limit=100', { headers: { Authorization: `Bearer ${token}` } });
            return res.data.data.data.map(s => ({ value: s.supplier_id, label: s.supplier_name }));
        }
    });

    const { data: productOptions } = useQuery({
        queryKey: ['products', 'select'],
        queryFn: async () => {
            const res = await api.get('products?limit=100', { headers: { Authorization: `Bearer ${token}` } });
            return res.data.data.map(i => ({
                value: i.item_id,
                label: i.item_name,
                cost: parseFloat(i.unit_price || 0),
                code: i.item_code,
                image: i.images?.[0]?.image_url || null
            }));
        }
    });

    // --- Custom Rendering ---
    const formatProductLabel = ({ label, code, image }) => (
        <div className="flex items-center gap-3">
            {image ? (
                <img src={image} alt="" className="w-8 h-8 rounded object-cover" />
            ) : (
                <div className="w-8 h-8 rounded bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-400 dark:text-gray-500 border dark:border-gray-600">
                    <FaBox size={14} />
                </div>
            )}
            <div>
                <div className="font-medium text-sm text-gray-800 dark:text-gray-200">{label}</div>
                <div className="text-[10px] text-gray-500 dark:text-gray-400 font-mono">{code}</div>
            </div>
        </div>
    );

    const customSelectStyles = {
        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
        control: (base) => ({ ...base, minHeight: '38px', borderRadius: '0.5rem' })
    };

    // --- Calculation Logic ---
    useEffect(() => {
        let sub = 0;
        // 1. Calculate the subtotal from line items
        items.forEach(item => {
            const itemTotal = (parseFloat(item.quantity || 0) * parseFloat(item.cost_price || 0));
            sub += itemTotal;
        });

        // 2. Calculate Tax and Discount as percentages of the subtotal
        const taxAmount = sub * (parseFloat(taxRate || 0) / 100);
        const discountAmount = sub * (parseFloat(overallDiscount || 0) / 100);

        // 3. Final Totals
        // Grand Total = Subtotal + Delivery + Tax(%) - Discount(%)
        const grand = sub + parseFloat(deliveryFee || 0) + taxAmount - discountAmount;
        const bal = grand - parseFloat(payment || 0);

        setTotals({
            subtotal: sub,
            grandTotal: grand,
            balance: bal,
            taxAmount: taxAmount,      // Added for UI display
            discountAmount: discountAmount // Added for UI display
        });
    }, [items, deliveryFee, taxRate, overallDiscount, payment]);

    // --- Handlers ---
    const addItem = () => {
        setItems([...items, { item_id: null, quantity: 1, cost_price: 0, discount: 0, tax: 0 }]);
    };

    const removeItem = (index) => {
        setItems(items.filter((_, i) => i !== index));
    };

    const updateItem = (index, field, value) => {
        const newItems = [...items];
        newItems[index][field] = value;
        setItems(newItems);
    };

    const handleItemSelect = (index, selectedOption) => {
        const newItems = [...items];
        newItems[index].item_id = selectedOption.value;
        newItems[index].item_name = selectedOption.label;
        newItems[index].cost_price = selectedOption.cost;
        setItems(newItems);
    };

    // --- Mutation (Submit/Update) ---
    const { mutate: handleSave, isPending } = useMutation({
        mutationFn: (payload) => {
            if (isEditMode) {
                return api.put(`purchases/${editData.purchase_id}`, payload, { headers: { Authorization: `Bearer ${token}` } });
            }
            return api.post('purchases', payload, { headers: { Authorization: `Bearer ${token}` } });
        },
        onSuccess: () => {
            alert.success(isEditMode ? 'Purchase updated successfully' : 'Purchase created successfully', {
                duration: 1000,
                position: 'top-center',
            });
            queryClient.invalidateQueries(['purchases']);
            navigater('/purchases')
        },
        onError: (err) => alert.error(err.response?.data?.message || 'Failed to save purchase', {
            duration: 1000,
            position: 'top-center',
        })
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!supplier) return alert.error('Please select a supplier');
        if (items.length === 0 || items.some(i => !i.item_id)) return alert.error('Please select products for all rows');

        const payload = {
            supplier_id: supplier.value,
            price: totals.subtotal,
            delivery_fee: deliveryFee,
            tax: taxRate,
            payment: payment,
            balance: totals.balance,
            discount: overallDiscount,
            description: description,
            items: items.map(i => ({
                item_id: i.item_id,
                quantity: i.quantity,
                cost_price: i.cost_price,
                discount: i.discount || 0,
                tax: i.tax || 0
            }))
        };
        handleSave(payload);
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <Link to='/purchases'>
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
                        <FaArrowLeft className="text-gray-600 dark:text-gray-400" />
                    </button>
                </Link>
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                    {isEditMode ? `Edit Purchase #${editData?.purchase_id}` : 'Create New Purchase'}
                </h1>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    {/* Supplier Info */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Supplier *</label>
                        <Select
                            options={supplierOptions}
                            value={supplier}
                            onChange={setSupplier}
                            placeholder="Select Supplier..."
                            styles={customSelectStyles}
                            menuPortalTarget={document.body}
                        />
                        <div className="mt-4">
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Description</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows="2"
                                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                        </div>
                    </div>

                    {/* Dynamic Items Table */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-visible">
                        <div className="p-4 border-b border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 flex justify-between items-center">
                            <h3 className="font-bold text-gray-700 dark:text-gray-200 text-sm uppercase tracking-wider">Order Items</h3>
                            <button type="button" onClick={addItem} className="flex items-center gap-2 bg-indigo-600 text-white px-3 py-1.5 rounded-md text-sm hover:bg-indigo-700">
                                <FaPlus size={12} /> Add Item
                            </button>
                        </div>
                        <div className="overflow-x-auto min-h-[300px]">
                            <table className="w-full text-sm">
                                <thead className="bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-b border-gray-300 dark:border-gray-600">
                                    <tr>
                                        <th className="px-4 py-3 text-left w-1/2">Product Selection</th>
                                        <th className="px-4 py-3 text-center">Qty</th>
                                        <th className="px-4 py-3 text-right">Cost</th>
                                        <th className="px-4 py-3 text-right">Total</th>
                                        <th className="px-4 py-3 text-center"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y dark:divide-gray-700">
                                    {items.map((item, index) => (
                                        <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                            <td className="px-4 py-3">
                                                <Select
                                                    options={productOptions}
                                                    value={productOptions?.find(opt => opt.value === item.item_id)}
                                                    formatOptionLabel={formatProductLabel}
                                                    onChange={(opt) => handleItemSelect(index, opt)}
                                                    placeholder="Find product..."
                                                    styles={customSelectStyles}
                                                    menuPortalTarget={document.body}
                                                />
                                            </td>
                                            <td className="px-4 py-3">
                                                <input type="number" value={item.quantity} onChange={(e) => updateItem(index, 'quantity', e.target.value)} className="w-16 p-2 border border-gray-400 dark:border-gray-600 rounded text-center outline-none focus:ring-1 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
                                            </td>
                                            <td className="px-4 py-3">
                                                <input type="number" value={item.cost_price} onChange={(e) => updateItem(index, 'cost_price', e.target.value)} className="w-24 p-2 border border-gray-400 dark:border-gray-600 rounded text-right outline-none focus:ring-1 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
                                            </td>
                                            <td className="px-4 py-3 text-right font-bold text-indigo-700 dark:text-indigo-400">
                                                ${((parseFloat(item.quantity || 0) * parseFloat(item.cost_price || 0)) - (parseFloat(item.discount || 0)) + (parseFloat(item.tax || 0))).toFixed(2)}
                                            </td>
                                            <td className="px-4 py-3 text-center">
                                                <button type="button" onClick={() => removeItem(index)} className="p-2 text-red-400 dark:text-red-500 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                                                    <FaTrash />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {items.length === 0 && <div className="p-8 text-center text-gray-400 dark:text-gray-500 italic">No items added.</div>}
                        </div>
                    </div>
                </div>

                {/* Calculation Summary Sidebar */}
                <div className="space-y-6">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm sticky top-6">
                        <div className="flex items-center gap-2 mb-6 text-indigo-600 dark:text-indigo-400 border-b dark:border-gray-700 pb-4">
                            <FaCalculator />
                            <h3 className="font-bold uppercase tracking-wider text-sm">Purchase Summary</h3>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500 dark:text-gray-400 font-medium">Items Subtotal</span>
                                <span className="font-bold text-gray-900 dark:text-white">${totals.subtotal.toFixed(2)}</span>
                            </div>
                            <div className="space-y-3 py-4 border-y dark:border-gray-700 border-dashed border-gray-100">
                                <div className="flex items-center justify-between gap-4">
                                    <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 text-nowrap">DELIVERY FEE ($)</span>
                                    <input
                                        type="number"
                                        value={deliveryFee}
                                        onChange={(e) => setDeliveryFee(e.target.value)}
                                        className="w-24 p-1.5 border border-gray-400 dark:border-gray-600 rounded text-right text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                    />
                                </div>

                                {/* TAX PERCENTAGE */}
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center justify-between gap-4">
                                        <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 text-nowrap">TAX (%)</span>
                                        <input
                                            type="number"
                                            value={taxRate}
                                            onChange={(e) => setTaxRate(e.target.value)}
                                            className="w-24 p-1.5 border border-gray-400 dark:border-gray-600 rounded text-right text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                        />
                                    </div>
                                    <div className="text-[10px] text-right text-gray-400 dark:text-gray-500">+ ${totals.taxAmount?.toFixed(2)}</div>
                                </div>

                                {/* DISCOUNT PERCENTAGE */}
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center justify-between gap-4">
                                        <span className="text-xs font-semibold text-green-600 dark:text-green-400 text-nowrap">DISCOUNT (%)</span>
                                        <input
                                            type="number"
                                            value={overallDiscount}
                                            onChange={(e) => setOverallDiscount(e.target.value)}
                                            className="w-24 p-1.5 border border-green-200 dark:border-green-700 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded text-right text-sm"
                                        />
                                    </div>
                                    <div className="text-[10px] text-right text-green-500 dark:text-green-400">- ${totals.discountAmount?.toFixed(2)}</div>
                                </div>
                            </div>

                            <div className="pt-2">
                                <div className="flex justify-between text-xl font-black text-indigo-700 dark:text-indigo-400">
                                    <span>GRAND TOTAL</span>
                                    <span>${totals.grandTotal.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="bg-indigo-50 dark:bg-indigo-900/30 p-4 rounded-xl space-y-3 border border-indigo-100 dark:border-indigo-700">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-bold text-gray-700 dark:text-gray-300">PAYMENT</span>
                                    <input
                                        type="number"
                                        required
                                        value={payment}
                                        onChange={(e) => setPayment(e.target.value)}
                                        className="w-28 p-2 border-2 border-indigo-200 dark:border-indigo-700 rounded-lg text-right font-black text-indigo-700 dark:text-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-500 outline-none bg-white dark:bg-gray-800"
                                    />
                                </div>
                                <div className="flex justify-between text-xs font-bold pt-2 border-t dark:border-indigo-700 border-indigo-100">
                                    <span className="text-gray-500 dark:text-gray-400 uppercase text-nowrap">Balance Due</span>
                                    <span className={totals.balance > 0 ? 'text-red-500 dark:text-red-400' : 'text-green-600 dark:text-green-400'}>
                                        ${totals.balance.toFixed(2)}
                                    </span>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isPending}
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-4 rounded-xl shadow-lg shadow-indigo-100 dark:shadow-indigo-900/30 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 uppercase tracking-tight"
                            >
                                <FaSave /> {isPending ? 'Processing...' : isEditMode ? 'Update Purchase' : 'Save Purchase'}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default PurchaseForm;