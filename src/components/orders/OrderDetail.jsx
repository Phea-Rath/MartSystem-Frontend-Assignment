import React, { useState, useRef } from 'react';
import {
    FaArrowLeft, FaPrint, FaDownload, FaFileInvoiceDollar,
    FaUser, FaReceipt, FaRegClock, FaCreditCard
} from 'react-icons/fa';
import html2canvas from 'html2canvas';
import { Link, useParams } from 'react-router';
import { useReactToPrint } from "react-to-print";

// Updated mock data based on your order JSON
const orderJson = {
    "success": true,
    "data": {
        "order_id": 2,
        "customer_id": 1,
        "subtotal_price": "380.00",
        "discount": "50.00",
        "tax": "20.00",
        "payment_method": "bank",
        "payment_by": "ABA",
        "paymented": "500",
        "balance": "-150",
        "total_price": "350.00",
        "created_by": 1,
        "status": 1,
        "online": 0,
        "created_at": "2026-01-24T10:06:48.000000Z",
        "items": [
            {
                "item_id": 1,
                "item_code": "202601246592",
                "item_name": "Tex Oil",
                "unit_price": "15.00",
                "discount": "5.00",
                "images": [{ "image_url": "https://images.unsplash.com/photo-1558981806-ec527fa84c39" }],
                "attributes": [{ "attr_name": "size", "attr_values": ["xl"] }]
            }
        ],
        "customer": { "customer_id": 1, "customer_name": "Unknowns" }
    }
};

const OrderDetails = ({ onBack }) => {
    const [modalType, setModalType] = useState(null); // 'large' or 'small'
    const data = orderJson.data;
    const receiptRef = useRef();

    const STATUS_MAP = {
        1: { label: 'Pending', color: 'bg-yellow-100 text-yellow-700' },
        2: { label: 'Completed', color: 'bg-green-100 text-green-700' },
        3: { label: 'Cancelled', color: 'bg-red-100 text-red-700' }
    };

    const handlePrint = useReactToPrint({ contentRef: receiptRef });

    const handleDownloadPng = async () => {
        const element = receiptRef.current;
        const canvas = await html2canvas(element, { scale: 2 });
        const imgData = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = imgData;
        link.download = `Order-${data.order_id}-${modalType}.png`;
        link.click();
    };

    return (
        <div className="p-6 max-w-5xl dark:text-gray-200 mx-auto">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between mb-6 no-print gap-4">
                <Link to='/orders'>
                    <button onClick={onBack} className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors">
                        <FaArrowLeft /> Back to Orders
                    </button>
                </Link>
                <div className="flex gap-2">
                    <button onClick={() => setModalType('small')} className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700">
                        <FaReceipt /> Small Receipt
                    </button>
                    <button onClick={() => setModalType('large')} className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
                        <FaFileInvoiceDollar /> Full Invoice
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                    {/* Customer Info */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                        <div className="flex justify-between items-start mb-4">
                            <h2 className="text-xl font-bold text-gray-800 dark:text-white">Order Details</h2>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${STATUS_MAP[data?.status]?.color}`}>
                                {STATUS_MAP[data?.status]?.label}
                            </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                                <FaUser className="text-indigo-500" />
                                <span className="font-semibold">{data?.customer.customer_name}</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                                <FaRegClock className="text-indigo-500" />
                                {new Date(data?.created_at).toLocaleDateString()}
                            </div>
                            <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                                <FaCreditCard className="text-indigo-500" />
                                {data?.payment_method.toUpperCase()} ({data?.payment_by})
                            </div>
                        </div>
                    </div>

                    {/* Items Table */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th className="px-6 py-4 text-sm font-semibold">Product</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-right">Price</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y dark:divide-gray-700">
                                {data?.items.map((item, idx) => (
                                    <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <img src={item.images[0]?.image_url} alt="" className="w-12 h-12 rounded object-cover border" />
                                                <div>
                                                    <p className="font-medium">{item.item_name}</p>
                                                    <p className="text-xs text-gray-400">
                                                        {item.attributes.map(a => `${a.attr_name}: ${a.attr_values.join(', ')}`)}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right font-bold">${item.unit_price}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Summary */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 h-fit space-y-4">
                    <h2 className="text-lg font-bold border-b pb-2">Payment Summary</h2>
                    <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-500">Subtotal</span>
                            <span>${data?.subtotal_price}</span>
                        </div>
                        <div className="flex justify-between text-red-500">
                            <span>Discount</span>
                            <span>-${data?.discount}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Tax</span>
                            <span>+${data?.tax}</span>
                        </div>
                        <div className="border-t pt-3 flex justify-between text-xl font-black text-indigo-600">
                            <span>Total</span>
                            <span>${data?.total_price}</span>
                        </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg mt-4 space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Paid Amount</span>
                            <span className="font-bold text-green-600">${data?.paymented}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Change/Balance</span>
                            <span className="font-bold text-orange-600">${data?.balance}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Receipt Modal */}
            {modalType && (
                <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-4">
                    <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden ${modalType === 'small' ? 'max-w-xs' : 'max-w-lg'} w-full`}>
                        <div className="p-4 border-b flex justify-between items-center bg-gray-50 dark:bg-gray-700">
                            <span className="font-bold text-xs uppercase">Preview: {modalType}</span>
                            <div className="flex gap-2">
                                <button onClick={handlePrint} className="p-2 hover:text-indigo-600"><FaPrint /></button>
                                <button onClick={handleDownloadPng} className="p-2 hover:text-green-600"><FaDownload /></button>
                                <button onClick={() => setModalType(null)} className="ml-2 text-red-500">✕</button>
                            </div>
                        </div>

                        <div className="overflow-y-auto max-h-[70vh]">
                            <div ref={receiptRef} className={`bg-white text-black p-6 font-mono ${modalType === 'small' ? 'text-[10px] w-[80mm]' : 'text-sm'}`}>
                                {modalType === 'small' ? (
                                    /* SMALL RECEIPT DESIGN */
                                    <div className="text-center">
                                        <h2 className="text-lg font-bold">MY STORE</h2>
                                        <p>Phnom Penh, Cambodia</p>
                                        <p>088 123 4567</p>
                                        <div className="border-b border-dashed my-2"></div>
                                        <p className="text-left">Date: {new Date().toLocaleDateString()}</p>
                                        <p className="text-left">Order: #{data.order_id}</p>
                                        <div className="border-b border-dashed my-2"></div>
                                        {data.items.map((item, i) => (
                                            <div key={i} className="flex justify-between mb-1">
                                                <span className="text-left">{item.item_name} x1</span>
                                                <span>${item.unit_price}</span>
                                            </div>
                                        ))}
                                        <div className="border-b border-dashed my-2"></div>
                                        <div className="flex justify-between font-bold">
                                            <span>TOTAL:</span>
                                            <span>${data.total_price}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>PAID ({data.payment_by}):</span>
                                            <span>${data.paymented}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>CHANGE:</span>
                                            <span>${Math.abs(data.balance)}</span>
                                        </div>
                                        <div className="mt-4 text-[8px]">THANK YOU FOR YOUR VISIT</div>
                                    </div>
                                ) : (
                                    /* LARGE INVOICE DESIGN */
                                    <div>
                                        <div className="flex justify-between mb-8">
                                            <h1 className="text-2xl font-bold text-indigo-600">INVOICE</h1>
                                            <div className="text-right">
                                                <p className="font-bold">Order #{data.order_id}</p>
                                                <p>{new Date(data.created_at).toLocaleString()}</p>
                                            </div>
                                        </div>
                                        <div className="mb-6">
                                            <p className="text-gray-500">Customer:</p>
                                            <p className="font-bold">{data.customer.customer_name}</p>
                                        </div>
                                        <table className="w-full mb-6">
                                            <thead className="border-b-2 border-black">
                                                <tr>
                                                    <th className="text-left py-2">Item</th>
                                                    <th className="text-right py-2">Price</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {data.items.map((item, i) => (
                                                    <tr key={i} className="border-b">
                                                        <td className="py-2">{item.item_name}</td>
                                                        <td className="text-right py-2">${item.unit_price}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        <div className="w-1/2 ml-auto space-y-1">
                                            <div className="flex justify-between"><span>Subtotal:</span><span>${data.subtotal_price}</span></div>
                                            <div className="flex justify-between"><span>Tax:</span><span>${data.tax}</span></div>
                                            <div className="flex justify-between font-bold border-t pt-1"><span>Total:</span><span>${data.total_price}</span></div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderDetails;