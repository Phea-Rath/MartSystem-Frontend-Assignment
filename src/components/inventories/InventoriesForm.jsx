import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FaTrash, FaPlus, FaSave, FaArrowLeft, FaCalculator, FaBox, FaWarehouse, FaExchangeAlt } from 'react-icons/fa';
import Select from 'react-select';
import api from '../../services/api';
import { useAlert } from '../../hooks/AlertContext';
import { Link, useNavigate, useParams } from 'react-router';

const InventoryForm = () => {
    const alert = useAlert();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { id } = useParams();
    const token = localStorage.getItem('token');
    const isEditMode = !!id;

    // --- Form State ---
    const [fromWarehouse, setFromWarehouse] = useState(null);
    const [toWarehouse, setToWarehouse] = useState(null);
    const [stockType, setStockType] = useState(null);
    const [description, setDescription] = useState('');
    const [items, setItems] = useState([]);
    const [totals, setTotals] = useState({ totalQuantity: 0, totalCost: 0 });

    // --- Fetch Data for Edit Mode ---
    const { data: editData } = useQuery({
        queryKey: ['stock', id],
        queryFn: async () => {
            const res = await api.get(`stocks/${id}`, { headers: { Authorization: `Bearer ${token}` } });
            return res.data.data;
        },
        enabled: !!id,
    });

    // --- Populate Form ---
    useEffect(() => {
        if (editData) {
            setFromWarehouse(editData.from_warehouse ? { value: editData.from_warehouse_id, label: editData.from_warehouse.warehouse_name } : null);
            setToWarehouse(editData.to_warehouse ? { value: editData.to_warehouse_id, label: editData.to_warehouse.warehouse_name } : null);
            setStockType(editData.stock_type ? { value: editData.stock_type_id, label: editData.stock_type.stock_type_name } : null);
            setDescription(editData.description || '');

            const mappedItems = editData.stock_details?.map(d => ({
                item_id: d.item_id,
                item_name: d.item?.item_name,
                quantity: d.quantity,
                item_cost: d.item_cost,
                expire_date: d.expire_date || '',
                code: d.item?.item_code
            })) || [];
            setItems(mappedItems);
        }
    }, [editData]);

    // --- Options Fetching ---
    const { data: warehouseOptions } = useQuery({
        queryKey: ['warehouses', 'select'],
        queryFn: async () => {
            const res = await api.get('warehouses', { headers: { Authorization: `Bearer ${token}` } });
            return res.data.data.data.map(w => ({ value: w.warehouse_id, label: w.warehouse_name }));
        }
    });

    const { data: stockTypeOptions } = useQuery({
        queryKey: ['stock-types', 'select'],
        queryFn: async () => {
            const res = await api.get('stock-types', { headers: { Authorization: `Bearer ${token}` } });
            return res.data.data.data.map(t => ({ value: t.stock_type_id, label: t.stock_type_name }));
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

    // --- Calculation ---
    useEffect(() => {
        let q = 0;
        let c = 0;
        items.forEach(item => {
            q += parseFloat(item.quantity || 0);
            c += parseFloat(item.quantity || 0) * parseFloat(item.item_cost || 0);
        });
        setTotals({ totalQuantity: q, totalCost: c });
    }, [items]);

    // --- Handlers ---
    const addItem = () => setItems([...items, { item_id: null, quantity: 1, item_cost: 0, expire_date: '' }]);
    const removeItem = (index) => setItems(items.filter((_, i) => i !== index));
    const updateItem = (index, field, value) => {
        const newItems = [...items];
        newItems[index][field] = value;
        setItems(newItems);
    };

    const handleItemSelect = (index, selected) => {
        const newItems = [...items];
        newItems[index].item_id = selected.value;
        newItems[index].item_name = selected.label;
        newItems[index].item_cost = selected.cost;
        newItems[index].code = selected.code;
        setItems(newItems);
    };

    // --- Save Mutation ---
    const { mutate: handleSave, isPending } = useMutation({
        mutationFn: (payload) => isEditMode
            ? api.put(`stocks/${id}`, payload, { headers: { Authorization: `Bearer ${token}` } })
            : api.post('stocks', payload, { headers: { Authorization: `Bearer ${token}` } }),
        onSuccess: () => {
            setTimeout(() => {
                alert.success('Stock updated successfully!', isEditMode ? 'Stock updated' : 'Stock recorded', {
                    duration: 1000,
                    position: 'top-center',
                });
            }, 200);
            queryClient.invalidateQueries(['stocks']);
            navigate('/inventories');
        },
        onError: (err) => alert.error(err.response?.data?.message || 'Save failed', {
            duration: 1000,
            position: 'top-center',
        })
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!stockType) return alert.error('Stock Type is required');
        if (items.length === 0 || items.some(i => !i.item_id)) return alert.error('Add items correctly');

        handleSave({
            from_warehouse_id: fromWarehouse?.value || null,
            to_warehouse_id: toWarehouse?.value || null,
            stock_type_id: stockType.value,
            description,
            details: items.map(i => ({
                item_id: i.item_id,
                quantity: parseFloat(i.quantity),
                item_cost: parseFloat(i.item_cost),
                expire_date: i.expire_date || null
            }))
        });
    };

    // Custom Label (kept from your Purchase code)
    const formatProductLabel = ({ label, code, image }) => (
        <div className="flex items-center gap-3">
            {image ? <img src={image} className="w-8 h-8 rounded object-cover" /> : <div className="w-8 h-8 rounded bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-400 dark:text-gray-500 border dark:border-gray-600"><FaBox size={14} /></div>}
            <div>
                <div className="font-medium text-sm text-gray-800 dark:text-gray-200">{label}</div>
                <div className="text-[10px] text-gray-500 dark:text-gray-400 font-mono">{code}</div>
            </div>
        </div>
    );

    const customSelectStyles = {
        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
        control: (base) => ({ ...base, borderRadius: '0.5rem' })
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <Link to='/inventories'><button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"><FaArrowLeft className="text-gray-600 dark:text-gray-400" /></button></Link>
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{isEditMode ? `Edit Stock #${id}` : 'Inventory Movement'}</h1>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    {/* Warehouse & Type Selection */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Stock Type *</label>
                            <Select options={stockTypeOptions} value={stockType} onChange={setStockType} styles={customSelectStyles} />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">From Warehouse (Source)</label>
                            <Select isClearable options={warehouseOptions} value={fromWarehouse} onChange={setFromWarehouse} styles={customSelectStyles} />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">To Warehouse (Destination)</label>
                            <Select isClearable options={warehouseOptions} value={toWarehouse} onChange={setToWarehouse} styles={customSelectStyles} />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Description</label>
                            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows="2" className="w-full p-3 border border-gray-400 dark:border-gray-600 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
                        </div>
                    </div>

                    {/* Items Table */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-visible">
                        <div className="p-4 border-b border-gray-400 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 flex justify-between items-center">
                            <h3 className="font-bold text-gray-700 dark:text-gray-200 text-sm uppercase">Item Details</h3>
                            <button type="button" onClick={addItem} className="flex items-center gap-2 bg-indigo-600 text-white px-3 py-1.5 rounded-md text-sm"><FaPlus size={12} /> Add Item</button>
                        </div>
                        <div className="overflow-x-auto min-h-[300px]">
                            <table className="w-full text-sm">
                                <thead className="bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-b border-gray-400 dark:border-gray-600">
                                    <tr>
                                        <th className="px-4 py-3 text-left">Product</th>
                                        <th className="px-4 py-3 text-center w-24">Qty</th>
                                        <th className="px-4 py-3 text-right w-32">Cost</th>
                                        <th className="px-4 py-3 text-right w-40">Expiry Date</th>
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
                                                    styles={customSelectStyles}
                                                    menuPortalTarget={document.body}
                                                />
                                            </td>
                                            <td className="px-4 py-3">
                                                <input type="number" value={item.quantity} onChange={(e) => updateItem(index, 'quantity', e.target.value)} className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded text-center bg-white dark:bg-gray-700 text-gray-900 dark:text-white" min="1" />
                                            </td>
                                            <td className="px-4 py-3">
                                                <input type="number" step="0.01" value={item.item_cost} onChange={(e) => updateItem(index, 'item_cost', e.target.value)} className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded text-right bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
                                            </td>
                                            <td className="px-4 py-3">
                                                <input type="date" value={item.expire_date} onChange={(e) => updateItem(index, 'expire_date', e.target.value)} className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
                                            </td>
                                            <td className="px-4 py-3 text-center">
                                                <button type="button" onClick={() => removeItem(index)} className="text-red-400 dark:text-red-500 hover:text-red-600 dark:hover:text-red-400"><FaTrash /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Sidebar Summary */}
                <div className="space-y-6">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm sticky top-6">
                        <div className="flex items-center gap-2 mb-6 text-indigo-600 dark:text-indigo-400 border-b dark:border-gray-700 pb-4">
                            <FaCalculator />
                            <h3 className="font-bold uppercase tracking-wider text-sm">Movement Summary</h3>
                        </div>
                        <div className="space-y-4">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500 dark:text-gray-400 font-medium">Total Items Count</span>
                                <span className="font-bold text-gray-900 dark:text-white">{items.length}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500 dark:text-gray-400 font-medium">Total Quantity</span>
                                <span className="font-bold text-indigo-600 dark:text-indigo-400">{totals.totalQuantity}</span>
                            </div>
                            <div className="pt-4 border-t dark:border-gray-700 border-dashed">
                                <div className="flex justify-between text-lg font-black text-gray-800 dark:text-white">
                                    <span>VALUATION</span>
                                    <span>${totals.totalCost.toFixed(2)}</span>
                                </div>
                            </div>
                            <button
                                type="submit"
                                disabled={isPending}
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-4 rounded-xl shadow-lg transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 uppercase"
                            >
                                <FaSave /> {isPending ? 'Processing...' : isEditMode ? 'Update Stock' : 'Confirm Stock'}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default InventoryForm;