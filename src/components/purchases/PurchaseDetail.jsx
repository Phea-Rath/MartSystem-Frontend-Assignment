import React, { useState, useRef } from 'react';
import {
    FaArrowLeft, FaPrint, FaDownload, FaFileInvoiceDollar,
    FaUser, FaMapMarkerAlt, FaPhone, FaEnvelope
} from 'react-icons/fa';
import html2canvas from 'html2canvas';
import { Link, useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { useReactToPrint } from "react-to-print";
import api from '../../services/api';

const pur = {
    "success": true,
    "message": "Purchase retrieved successfully",
    "data": {
        "purchase_id": 1,
        "supplier_id": 1,
        "price": "130.00",
        "delivery_fee": "5.00",
        "tax": "3.00",
        "payment": "138.90",
        "balance": "0.00",
        "discount": "0.00",
        "quantity": 10,
        "status": 1,
        "description": "Buy",
        "created_by": 1,
        "is_deleted": 0,
        "created_at": "2026-01-24T13:30:12.000000Z",
        "updated_at": "2026-01-24T13:30:12.000000Z",
        "supplier": {
            "supplier_id": 1,
            "supplier_name": "Micro Market",
            "phone_number": "0887435655",
            "email": "micro@gmail.com",
            "address": "SOS#567, Phnom Penh Thmey, Phnom Penh",
            "created_by": 1,
            "is_deleted": 0,
            "created_at": "2026-01-24T13:28:15.000000Z",
            "updated_at": "2026-01-24T13:28:15.000000Z"
        },
        "purchase_details": [
            {
                "purchase_id": 1,
                "item_id": 1,
                "cost_price": "13.00",
                "total_price": "130.00",
                "discount": "0.00",
                "quantity": 10,
                "is_deleted": 0,
                "created_at": "2026-01-24T13:30:12.000000Z",
                "updated_at": "2026-01-24T13:30:12.000000Z",
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
                    "updated_at": "2026-01-24T09:56:02.000000Z",
                    "images": [
                        {
                            "image_id": 8,
                            "image_name": "transmission.png",
                            "url": "https://images.unsplash.com/photo-1558981806-ec527fa84c39"
                        },
                        {
                            "image_id": 7,
                            "image_name": "steering.png",
                            "url": "https://images.unsplash.com/photo-1593941707882-a5bba14938c7"
                        }
                    ]
                }
            }
        ]
    }
}
const PurchaseDetails = ({ purchaseData, onBack }) => {
    const [showReceipt, setShowReceipt] = useState(false);
    const token = localStorage.getItem('token');
    const { id } = useParams();
    const receiptRef = useRef();
    // const [data, setData] = useState({});

    const STATUS_MAP = {
        1: { label: 'Pending', color: 'bg-yellow-100 text-yellow-700' },
        2: { label: 'Received', color: 'bg-green-100 text-green-700' },
        3: { label: 'Cancelled', color: 'bg-red-100 text-red-700' }
    };

    const fetchProductById = async ({ queryKey }) => {
        const [, id] = queryKey; // ['products', id]

        const res = await api.get(`purchases/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return res.data.data;
    };

    // const {
    //     data,
    //     isPending,
    //     isError,
    //     error,
    // } = useQuery({
    //     queryKey: ['purchase', id],
    //     queryFn: fetchProductById,
    //     enabled: !!id, // prevent run when id is undefined
    // });
    const data = pur.data;

    console.log(data);


    // --- Actions ---
    const handlePrint = useReactToPrint({ contentRef: receiptRef });

    const handleDownloadPng = async () => {
        const element = receiptRef.current;
        const canvas = await html2canvas(element, { scale: 2 });
        const data = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = data;
        link.download = `Receipt-Purchase-${purchaseData.purchase_id}.png`;
        link.click();
    };

    return (
        <div className="p-6 max-w-5xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6 no-print">
                <Link to='/purchases'>
                    <button onClick={onBack} className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                        <FaArrowLeft /> Back to List
                    </button>
                </Link>
                <div className="flex gap-3">
                    <button
                        onClick={() => setShowReceipt(true)}
                        className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                    >
                        <FaFileInvoiceDollar /> View Receipt
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Supplier & Order Info */}
                <div className="md:col-span-2 space-y-6">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                        <div className="flex justify-between items-start mb-4">
                            <h2 className="text-xl font-bold text-gray-800 dark:text-white">Supplier Information</h2>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${STATUS_MAP[data?.status]?.color}`}>
                                {STATUS_MAP[data?.status]?.label}
                            </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                                <FaUser className="text-indigo-500 dark:text-indigo-400" />
                                <span className="font-semibold">{data?.supplier.supplier_name}</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                                <FaPhone className="text-indigo-500 dark:text-indigo-400" /> {data?.supplier.phone_number}
                            </div>
                            <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                                <FaEnvelope className="text-indigo-500 dark:text-indigo-400" /> {data?.supplier.email}
                            </div>
                            <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                                <FaMapMarkerAlt className="text-indigo-500 dark:text-indigo-400" /> {data?.supplier.address}
                            </div>
                        </div>
                    </div>

                    {/* Items Table */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 dark:bg-gray-700 border-b dark:border-gray-600">
                                <tr>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300">Product</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300 text-center">Qty</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300 text-right">Cost</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300 text-right">Total</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y dark:divide-gray-700">
                                {data?.purchase_details.map((item, idx) => (
                                    <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <img src={item.item.images[0]?.url} alt="" className="w-10 h-10 rounded object-cover border dark:border-gray-600" />
                                                <div>
                                                    <p className="font-medium text-gray-800 dark:text-gray-200">{item.item.item_name}</p>
                                                    <p className="text-xs text-gray-400 dark:text-gray-500">Code: {item.item.item_code}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center text-gray-900 dark:text-gray-200">{item.quantity}</td>
                                        <td className="px-6 py-4 text-right font-medium text-gray-900 dark:text-gray-200">${item.cost_price}</td>
                                        <td className="px-6 py-4 text-right font-bold text-gray-800 dark:text-gray-200">${item.total_price}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Summary Column */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 h-fit space-y-4">
                    <h2 className="text-lg font-bold text-gray-800 dark:text-white border-b dark:border-gray-700 pb-2">Order Summary</h2>
                    <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-500 dark:text-gray-400">Subtotal</span>
                            <span className="font-semibold text-gray-900 dark:text-gray-200">${data?.price}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500 dark:text-gray-400">Delivery Fee</span>
                            <span className="font-semibold text-green-600 dark:text-green-400">+ ${data?.delivery_fee}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500 dark:text-gray-400">Tax</span>
                            <span className="font-semibold text-red-600 dark:text-red-400">+ ${data?.tax}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500 dark:text-gray-400">Discount</span>
                            <span className="font-semibold text-green-600 dark:text-green-400">- ${data?.discount}</span>
                        </div>
                        <div className="border-t dark:border-gray-700 pt-3 flex justify-between text-lg font-black text-indigo-600 dark:text-indigo-400">
                            <span>Total</span>
                            <span>${(parseFloat(data?.price) + parseFloat(data?.delivery_fee) + parseFloat(data?.tax) - parseFloat(data?.discount)).toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="bg-indigo-50 dark:bg-indigo-900/30 p-4 rounded-lg mt-6 border border-indigo-100 dark:border-indigo-700">
                        <div className="flex justify-between text-sm mb-1">
                            <span className="text-indigo-700 dark:text-indigo-400 font-medium">Amount Paid</span>
                            <span className="font-bold text-indigo-800 dark:text-indigo-300">${data?.payment}</span>
                        </div>
                        <div className="flex justify-between text-sm text-red-600 dark:text-red-400">
                            <span className="font-medium">Balance Due</span>
                            <span className="font-bold">${data?.balance}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Receipt Modal */}
            {showReceipt && (
                <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] flex flex-col overflow-hidden">
                        {/* Modal Header */}
                        <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-700 no-print">
                            <h3 className="font-bold text-gray-800 dark:text-white">Purchase Receipt</h3>
                            <div className="flex gap-2">
                                <button onClick={handlePrint} className="p-2 bg-white dark:bg-gray-800 border dark:border-gray-600 rounded shadow-sm text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-gray-700"><FaPrint /></button>
                                <button onClick={handleDownloadPng} className="p-2 bg-white dark:bg-gray-800 border dark:border-gray-600 rounded shadow-sm text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-gray-700"><FaDownload /></button>
                                <button onClick={() => setShowReceipt(false)} className="px-3 py-1 bg-gray-200 dark:bg-gray-600 rounded text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-200 ml-2">Close</button>
                            </div>
                        </div>

                        {/* Printable Area */}
                        <div ref={receiptRef} className="p-10 bg-white dark:bg-gray-900 overflow-y-auto print:text-md">
                            <div className="text-center mb-8">
                                <div className="inline-block p-3 bg-indigo-600 text-white rounded-full mb-2">
                                    <FaFileInvoiceDollar size={30} />
                                </div>
                                <h2 className="text-2xl font-black uppercase tracking-widest text-indigo-900">Purchase Invoice</h2>
                                <p className="text-sm text-gray-500">Order ID: #{data?.purchase_id}</p>
                                <p className="text-sm text-gray-400">{new Date(data?.created_at).toLocaleString()}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-sm mb-8 border-y py-4">
                                <div>
                                    <p className="font-bold text-gray-800 uppercase">Supplier</p>
                                    <p>{data?.supplier.supplier_name}</p>
                                    <p>{data?.supplier.phone_number}</p>
                                    <p className="truncate">{data?.supplier.address}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-gray-800 uppercase">Payment Info</p>
                                    <p>Total: ${data?.price}</p>
                                    <p>Paid: ${data?.payment}</p>
                                    <p className="text-red-600 font-bold underline">Due: ${data?.balance}</p>
                                </div>
                            </div>

                            <table className="w-full text-sm mb-8">
                                <thead className="border-b-2 border-gray-800">
                                    <tr>
                                        <th className="py-2 text-left">Description</th>
                                        <th className="py-2 text-center">Qty</th>
                                        <th className="py-2 text-right">Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data?.purchase_details.map((item, idx) => (
                                        <tr key={idx} className="border-b border-gray-100">
                                            <td className="py-2">{item.item.item_name}</td>
                                            <td className="py-2 text-center">x{item.quantity}</td>
                                            <td className="py-2 text-right">${item.cost_price}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <div className="space-y-1 text-sm text-right w-1/2 ml-auto">
                                <div className="flex justify-between">
                                    <span>Subtotal:</span>
                                    <span>${data?.price}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Discount:</span>
                                    <span>-${data?.discount}</span>
                                </div>
                                <div className="flex justify-between border-t border-gray-800 pt-1 font-bold text-sm">
                                    <span>Grand Total:</span>
                                    <span>${(parseFloat(data?.price) - parseFloat(data?.discount)).toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="mt-10 pt-10 border-t text-center text-[10px] text-gray-400 italic">
                                Thank you for your business! Generated by Inventory Pro System.
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PurchaseDetails;