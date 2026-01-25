import React, { useState, useRef } from 'react';
import {
    FaArrowLeft, FaPrint, FaDownload, FaFileInvoiceDollar,
    FaWarehouse, FaExchangeAlt, FaCalendarAlt, FaBox
} from 'react-icons/fa';
import html2canvas from 'html2canvas';
import { Link, useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { useReactToPrint } from "react-to-print";
import api from '../../services/api';

const stock = {
    "success": true,
    "data": {
        "stock_id": 1,
        "from_warehouse_id": 1,
        "to_warehouse_id": 1,
        "stock_type_id": 1,
        "description": "Good",
        "quantity": 10,
        "created_by": 1,
        "is_deleted": 0,
        "created_at": "2026-01-24T10:34:44.000000Z",
        "updated_at": "2026-01-24T10:34:44.000000Z",
        "from_warehouse": {
            "warehouse_id": 1,
            "warehouse_name": "Main Warehouse"
        },
        "to_warehouse": {
            "warehouse_id": 1,
            "warehouse_name": "Main Warehouse"
        },
        "stock_type": {
            "stock_type_id": 1,
            "stock_type_name": "Stock In"
        },
        "stock_details": [
            {
                "stock_id": 1,
                "item_id": 1,
                "quantity": 10,
                "item_cost": "15.00",
                "expire_date": "2026-01-31",
                "is_deleted": 0,
                "created_at": "2026-01-24T10:34:44.000000Z",
                "updated_at": "2026-01-24T10:34:44.000000Z",
                "item": {
                    "item_id": 1,
                    "category_id": 1,
                    "brand_id": 1,
                    "item_name": "Tex Oil",
                    "item_code": "202601246592",
                    "unit_price": "15.00",
                    "item_cost": "0.00",
                    "discount": "5.00",
                    "description": "Good and smoot",
                    "created_by": 1,
                    "is_deleted": 0,
                    "created_at": "2026-01-24T09:56:02.000000Z",
                    "updated_at": "2026-01-24T09:56:02.000000Z"
                }
            }
        ]
    }
}

const InventoryDetails = ({ onBack }) => {
    const [showReceipt, setShowReceipt] = useState(false);
    const token = localStorage.getItem('token');
    const { id } = useParams();
    const receiptRef = useRef();

    const fetchStockById = async ({ queryKey }) => {
        const [, stockId] = queryKey;
        const res = await api.get(`stocks/${stockId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return res.data.data;
    };

    // const { data, isPending, isError } = useQuery({
    //     queryKey: ['stock', id],
    //     queryFn: fetchStockById,
    //     enabled: !!id,
    // });
    const data = stock.data;
    const isPending = false;
    const isError = false;

    const handlePrint = useReactToPrint({ contentRef: receiptRef });

    const handleDownloadPng = async () => {
        const element = receiptRef.current;
        const canvas = await html2canvas(element, { scale: 2 });
        const imageUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = `Stock-Log-${data?.stock_id}.png`;
        link.click();
    };

    if (isPending) return <div className="p-10 text-center">Loading movement details...</div>;
    if (isError) return <div className="p-10 text-center text-red-500">Error loading data.</div>;

    return (
        <div className="p-6 max-w-5xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6 no-print">
                <Link to='/inventories'>
                    <button className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium">
                        <FaArrowLeft /> Back to Inventory
                    </button>
                </Link>
                <div className="flex gap-3">
                    <button
                        onClick={() => setShowReceipt(true)}
                        className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 shadow-md transition-all"
                    >
                        <FaFileInvoiceDollar /> View Log Sheet
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Movement Info */}
                <div className="md:col-span-2 space-y-6">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h2 className="text-xl font-bold text-gray-800 dark:text-white">Movement Information</h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400 italic">{data?.description}</p>
                            </div>
                            <span className="px-4 py-1 rounded-full text-xs font-bold bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-700 uppercase">
                                {data?.stock_type.stock_type_name}
                            </span>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-around bg-gray-50 dark:bg-gray-700 p-6 rounded-xl border border-dashed border-gray-300 dark:border-gray-600 gap-4">
                            <div className="text-center">
                                <FaWarehouse className="mx-auto text-gray-400 dark:text-gray-500 mb-2" size={24} />
                                <p className="text-xs text-gray-400 dark:text-gray-500 uppercase font-bold">Source</p>
                                <p className="font-bold text-gray-800 dark:text-white">{data?.from_warehouse.warehouse_name}</p>
                            </div>
                            <FaExchangeAlt className="text-indigo-400 dark:text-indigo-500 hidden sm:block" size={20} />
                            <div className="text-center">
                                <FaWarehouse className="mx-auto text-indigo-500 dark:text-indigo-400 mb-2" size={24} />
                                <p className="text-xs text-gray-400 dark:text-gray-500 uppercase font-bold">Destination</p>
                                <p className="font-bold text-indigo-600 dark:text-indigo-400">{data?.to_warehouse.warehouse_name}</p>
                            </div>
                        </div>
                    </div>

                    {/* Items Table */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                        <div className="p-4 border-b dark:border-gray-700 bg-gray-50/50 dark:bg-gray-700/50">
                            <h3 className="font-bold text-gray-700 dark:text-gray-200 flex items-center gap-2">
                                <FaBox className="text-indigo-500 dark:text-indigo-400" /> Items in this Batch
                            </h3>
                        </div>
                        <table className="w-full text-left">
                            <thead className="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Item Details</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase text-center">Expiry</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase text-center">Qty</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase text-right">Cost</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                {data?.stock_details.map((detail, idx) => (
                                    <tr key={idx} className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <p className="font-semibold text-gray-800 dark:text-gray-200">{detail.item.item_name}</p>
                                            <p className="text-[10px] font-mono text-gray-400 dark:text-gray-500">{detail.item.item_code}</p>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="text-xs font-medium text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30 px-2 py-1 rounded">
                                                {detail.expire_date || 'N/A'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center font-bold text-gray-700 dark:text-gray-300">{detail.quantity}</td>
                                        <td className="px-6 py-4 text-right font-semibold text-gray-800 dark:text-gray-200">${detail.item_cost}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Summary Sidebar */}
                <div className="space-y-6">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                        <h2 className="text-lg font-bold text-gray-800 dark:text-white border-b dark:border-gray-700 pb-3 mb-4">Log Details</h2>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-500 dark:text-gray-400">Transaction ID</span>
                                <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">#{data?.stock_id}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-500 dark:text-gray-400">Total Quantity</span>
                                <span className="text-sm font-bold text-gray-800 dark:text-gray-200">{data?.quantity} Units</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-500 dark:text-gray-400">Items (SKUs)</span>
                                <span className="text-sm font-bold text-gray-800 dark:text-gray-200">{data?.stock_details.length}</span>
                            </div>
                            <div className="pt-4 border-t dark:border-gray-700">
                                <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500 mb-1">
                                    <FaCalendarAlt /> Created Date
                                </div>
                                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    {new Date(data?.created_at).toLocaleDateString('en-GB', {
                                        day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
                                    })}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Receipt Modal */}
            {showReceipt && (
                <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-lg w-full max-h-[95vh] flex flex-col overflow-hidden">
                        {/* Modal Header */}
                        <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-700 no-print">
                            <h3 className="font-bold text-gray-800 dark:text-white">Movement Log Sheet</h3>
                            <div className="flex gap-2">
                                <button onClick={handlePrint} className="p-2 bg-white dark:bg-gray-800 border dark:border-gray-600 rounded shadow-sm text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-gray-700 transition-all"><FaPrint /></button>
                                <button onClick={handleDownloadPng} className="p-2 bg-white dark:bg-gray-800 border dark:border-gray-600 rounded shadow-sm text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-gray-700 transition-all"><FaDownload /></button>
                                <button onClick={() => setShowReceipt(false)} className="px-4 py-1 bg-gray-800 dark:bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-black dark:hover:bg-black ml-2 transition-all">Close</button>
                            </div>
                        </div>

                        {/* Printable Area */}
                        <div ref={receiptRef} className="p-10 bg-white dark:bg-gray-900 overflow-y-auto">
                            <div className="text-center mb-8">
                                <div className="inline-block p-4 bg-indigo-600 dark:bg-indigo-700 text-white rounded-2xl mb-4 shadow-lg shadow-indigo-100 dark:shadow-indigo-900/30">
                                    <FaWarehouse size={35} />
                                </div>
                                <h2 className="text-2xl font-black uppercase tracking-widest text-gray-900 dark:text-white">Stock Movement</h2>
                                <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400">ID: LOG-{data?.stock_id}</p>
                                <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase mt-1">Movement Type: {data?.stock_type.stock_type_name}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-8 text-sm mb-8 border-y dark:border-gray-700 py-6 border-gray-100">
                                <div>
                                    <p className="font-black text-gray-400 dark:text-gray-500 uppercase mb-2 text-xs">From Warehouse</p>
                                    <p className="font-bold text-gray-800 dark:text-gray-200 text-sm">{data?.from_warehouse.warehouse_name}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-black text-gray-400 dark:text-gray-500 uppercase mb-2 text-xs">To Warehouse</p>
                                    <p className="font-bold text-indigo-600 dark:text-indigo-400 text-sm">{data?.to_warehouse.warehouse_name}</p>
                                </div>
                            </div>

                            <table className="w-full text-sm mb-8">
                                <thead className="border-b-2 dark:border-gray-700 border-gray-900">
                                    <tr>
                                        <th className="py-3 text-left uppercase text-gray-900 dark:text-gray-200">Item Description</th>
                                        <th className="py-3 text-center uppercase text-gray-900 dark:text-gray-200">Qty</th>
                                        <th className="py-3 text-right uppercase text-gray-900 dark:text-gray-200">Exp. Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data?.stock_details.map((item, idx) => (
                                        <tr key={idx} className="border-b dark:border-gray-700 border-gray-50">
                                            <td className="py-4">
                                                <p className="font-bold text-gray-800 dark:text-gray-200">{item.item.item_name}</p>
                                                <p className="text-xs text-gray-400 dark:text-gray-500 font-mono">{item.item.item_code}</p>
                                            </td>
                                            <td className="py-4 text-center font-bold text-gray-900 dark:text-gray-200">x{item.quantity}</td>
                                            <td className="py-4 text-right text-gray-500 dark:text-gray-400">{item.expire_date || 'N/A'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl">
                                <p className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase mb-1">Description / Remarks</p>
                                <p className="text-sm text-gray-700 dark:text-gray-300 italic">{data?.description || 'No additional notes provided.'}</p>
                            </div>

                            <div className="mt-12 pt-8 border-t dark:border-gray-700 border-dashed text-center">
                                <p className="text-[10px] text-gray-400 dark:text-gray-500 font-medium">This is a system generated movement log for internal tracking.</p>
                                <p className="text-xs text-gray-300 dark:text-gray-600 mt-1">{new Date().toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InventoryDetails;