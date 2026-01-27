import React, { useState, useEffect } from 'react';
import {
    FaSave, FaArrowLeft, FaPlus, FaTrash,
    FaUser, FaCreditCard, FaPercentage, FaReceipt
} from 'react-icons/fa';
import { Link } from 'react-router';

const UpdateOrder = () => {
    // Initial data from your JSON
    const initialData = {
        order_id: 2,
        customer_id: 1,
        payment_method: "bank",
        payment_by: "ABA",
        discount: 50.00,
        tax: 20.00,
        paymented: 500,
        status: 1,
        online: 0,
        items: [
            {
                item_id: 1,
                item_name: "Tex Oil",
                unit_price: 15.00,
                quantity: 25, // Derived from subtotal logic (380/15 approx)
                discount: 5.00
            }
        ]
    };

    const [formData, setFormData] = useState({
        customer_id: initialData.customer_id,
        payment_method: initialData.payment_method,
        payment_by: initialData.payment_by,
        discount: initialData.discount,
        tax: initialData.tax,
        paymented: initialData.paymented,
        status: initialData.status,
        online: initialData.online === 1,
        details: initialData.items.map(item => ({
            item_id: item.item_id,
            item_name: item.item_name,
            quantity: item.quantity,
            unit_price: item.unit_price,
            discount: item.discount
        }))
    });

    const [totals, setTotals] = useState({ subtotal: 0, total: 0, balance: 0 });

    // Calculate Totals Automatically
    useEffect(() => {
        const subtotal = formData.details.reduce((sum, item) =>
            sum + (item.unit_price * item.quantity), 0
        );
        const grandTotal = subtotal - (Number(formData.discount) || 0) + (Number(formData.tax) || 0);
        const balance = (Number(formData.paymented) || 0) - grandTotal;

        setTotals({ subtotal, total: grandTotal, balance });
    }, [formData]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleDetailChange = (index, field, value) => {
        const newDetails = [...formData.details];
        newDetails[index][field] = value;
        setFormData(prev => ({ ...prev, details: newDetails }));
    };

    const removeDetail = (index) => {
        setFormData(prev => ({
            ...prev,
            details: prev.details.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitting Updated Order:", formData);
        alert("Order update logic triggered!");
    };

    const handleAddIitem = () => {
        setFormData(prev => ({
            ...prev,
            details: [...prev.details, { item_id: '', item_name: '', quantity: 1, unit_price: 0, discount: 0 }]
        }));
    };

    return (
        <div className="min-h-screen p-4 md:p-8 bg-transparent dark:text-gray-200 transition-colors">
            <form onSubmit={handleSubmit} className="max-w-6xl mx-auto space-y-6">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-400 dark:border-gray-700 pb-5">
                    <div>
                        <Link to="/orders" className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 mb-1">
                            <FaArrowLeft /> Back to List
                        </Link>
                        <h1 className="text-2xl font-black">Update Order <span className="text-gray-400">#{initialData.order_id}</span></h1>
                    </div>
                    <button type="submit" className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-indigo-200 dark:shadow-none">
                        <FaSave /> Save Changes
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Left Column: Items */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-400 dark:border-gray-700 overflow-hidden">
                            <div className="p-4 border-b border-gray-400 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-700/50 flex justify-between items-center">
                                <h2 className="font-bold flex items-center gap-2"><FaReceipt /> Order Items</h2>
                                <button onClick={handleAddIitem} type="button" className="text-sm text-indigo-600 dark:text-indigo-400 font-bold flex items-center gap-1">
                                    <FaPlus /> Add Item
                                </button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="text-xs uppercase text-gray-800 dark:text-gray-400 border-b border-gray-400 dark:border-gray-700">
                                            <th className="px-4 py-3">Product (ID)</th>
                                            <th className="px-4 py-3 w-24">Qty</th>
                                            <th className="px-4 py-3">Price</th>
                                            <th className="px-4 py-3">Disc ($)</th>
                                            <th className="px-4 py-3 text-right">Total</th>
                                            <th className="px-4 py-3"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y dark:divide-gray-700">
                                        {formData.details.map((item, idx) => (
                                            <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                                                <td className="px-4 py-4">
                                                    <select
                                                        value={item.item_id}
                                                        onChange={(e) => handleDetailChange(idx, 'item_id', e.target.value)}
                                                        className="bg-transparent font-medium focus:outline-none text-indigo-600 dark:text-indigo-400"
                                                    >
                                                        <option value={1}>{item.item_name}</option>
                                                        <option value={1}>Coca Cola</option>
                                                        <option value={1}>Mile</option>
                                                        {/* More items would be mapped here */}
                                                    </select>
                                                </td>
                                                <td className="px-4 py-4">
                                                    <input
                                                        type="number"
                                                        min="1"
                                                        value={item.quantity}
                                                        onChange={(e) => handleDetailChange(idx, 'quantity', Number(e.target.value))}
                                                        className="w-full bg-gray-100 dark:bg-gray-900 border-none rounded px-2 py-1 focus:ring-2 ring-indigo-500"
                                                    />
                                                </td>
                                                <td className="px-4 py-4 text-gray-500">${item.unit_price}</td>
                                                <td className="px-4 py-4">
                                                    <input
                                                        type="number"
                                                        value={item.discount}
                                                        onChange={(e) => handleDetailChange(idx, 'discount', Number(e.target.value))}
                                                        className="w-16 bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none"
                                                    />
                                                </td>
                                                <td className="px-4 py-4 text-right font-bold">
                                                    ${((item.unit_price * item.quantity) - item.discount).toFixed(2)}
                                                </td>
                                                <td className="px-4 py-4 text-center">
                                                    <button onClick={() => removeDetail(idx)} className="text-red-400 hover:text-red-600"><FaTrash /></button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Payment Info */}
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-400 dark:border-gray-700 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold flex items-center gap-2"><FaCreditCard /> Payment Method</label>
                                <select
                                    name="payment_method"
                                    value={formData.payment_method}
                                    onChange={handleChange}
                                    className="w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-900 border  border-gray-400 dark:border-gray-700 focus:ring-2 ring-indigo-500"
                                >
                                    <option value="bank">Bank Transfer</option>
                                    <option value="cash">Cash</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold">Payment Via (e.g. ABA/Wing)</label>
                                <input
                                    type="text"
                                    name="payment_by"
                                    value={formData.payment_by}
                                    onChange={handleChange}
                                    className="w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-900 border  border-gray-400 dark:border-gray-700"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Order Summary & Status */}
                    <div className="space-y-6">
                        <div className="bg-indigo-600 text-white p-6 rounded-2xl shadow-xl space-y-4">
                            <h2 className="text-lg font-bold border-b border-indigo-400 pb-2">Order Summary</h2>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between opacity-80">
                                    <span>Subtotal</span>
                                    <span>${totals.subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="opacity-80">Discount</span>
                                    <input
                                        type="number"
                                        name="discount"
                                        value={formData.discount}
                                        onChange={handleChange}
                                        className="w-20 bg-indigo-500 text-right rounded px-1 focus:outline-none"
                                    />
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="opacity-80">Tax</span>
                                    <input
                                        type="number"
                                        name="tax"
                                        value={formData.tax}
                                        onChange={handleChange}
                                        className="w-20 bg-indigo-500 text-right rounded px-1 focus:outline-none"
                                    />
                                </div>
                                <div className="border-t border-indigo-400 pt-3 flex justify-between text-xl font-black">
                                    <span>Grand Total</span>
                                    <span>${totals.total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-400 dark:border-gray-700 space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-green-600">Amount Received ($)</label>
                                <input
                                    type="number"
                                    name="paymented"
                                    value={formData.paymented}
                                    onChange={handleChange}
                                    className="w-full p-3 text-lg font-bold rounded-xl bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 focus:ring-2 ring-green-500"
                                />
                            </div>
                            <div className="flex justify-between items-center p-3 rounded-xl bg-gray-50 dark:bg-gray-900">
                                <span className="text-sm font-medium">Balance/Change</span>
                                <span className={`text-lg font-black ${totals.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    ${totals.balance.toFixed(2)}
                                </span>
                            </div>

                            <hr className="dark:border-gray-700" />

                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-semibold">Online Order</span>
                                    <input
                                        type="checkbox"
                                        name="online"
                                        checked={formData.online}
                                        onChange={handleChange}
                                        className="w-5 h-5 accent-indigo-600"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold">Order Status</label>
                                    <select
                                        name="status"
                                        value={formData.status}
                                        onChange={handleChange}
                                        className="w-full p-2 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-400 dark:border-gray-700"
                                    >
                                        <option value={1}>Pending</option>
                                        <option value={2}>Completed</option>
                                        <option value={3}>Cancelled</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default UpdateOrder;