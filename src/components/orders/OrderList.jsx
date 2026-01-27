import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import {
    FaSearch, FaThLarge, FaList, FaEye,
    FaEdit, FaTrash, FaPlus, FaShoppingCart, FaUser, FaMoneyBillWave
} from 'react-icons/fa';
import { useNavigate } from 'react-router';
import api from '../../services/api';
import AlertQuestionBox from '../../services/AlertQuestionBox';
import { useAlert } from '../../hooks/AlertContext';
const order = {
    "success": true,
    "data": {
        "current_page": 1,
        "data": [
            {
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
                "is_deleted": 0,
                "created_at": "2026-01-24T10:06:48.000000Z",
                "updated_at": "2026-01-24T10:06:48.000000Z",
                "items": [
                    {
                        "item_id": 1,
                        "item_code": "202601246592",
                        "item_name": "Tex Oil",
                        "unit_price": "15.00",
                        "discount": "5.00",
                        "category_id": 1,
                        "brand_id": 1,
                        "description": "Good and smoot",
                        "created_by": 1,
                        "images": [
                            {
                                "image_id": 1,
                                "image_name": "1769248563_697497330232c.png",
                                "image_url": "http://127.0.0.1:8000/images/1769248563_697497330232c.png"
                            },
                            {
                                "image_id": 2,
                                "image_name": "1769248563_6974973310914.png",
                                "image_url": "http://127.0.0.1:8000/images/1769248563_6974973310914.png"
                            }
                        ],
                        "attributes": [
                            {
                                "attr_name": "size",
                                "attr_values": [
                                    "xl"
                                ]
                            }
                        ]
                    }
                ],
                "customer": {
                    "customer_id": 1,
                    "customer_name": "Unknows"
                }
            }
        ],
        "first_page_url": "http://127.0.0.1:8000/api/orders?page=1",
        "from": 1,
        "last_page": 1,
        "last_page_url": "http://127.0.0.1:8000/api/orders?page=1",
        "links": [
            {
                "url": null,
                "label": "&laquo; Previous",
                "page": null,
                "active": false
            },
            {
                "url": "http://127.0.0.1:8000/api/orders?page=1",
                "label": "1",
                "page": 1,
                "active": true
            },
            {
                "url": null,
                "label": "Next &raquo;",
                "page": null,
                "active": false
            }
        ],
        "next_page_url": null,
        "path": "http://127.0.0.1:8000/api/orders",
        "per_page": 10,
        "prev_page_url": null,
        "to": 1,
        "total": 1
    }
}
const OrderListPage = () => {
    // --- State ---
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const token = localStorage.getItem('token');
    const [viewMode, setViewMode] = useState('list');
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [isOpen, setIsOpen] = useState(false);
    const [delId, setDelId] = useState(null);
    const alert = useAlert();

    // --- Data Fetching ---
    // const { data: orders, isPending } = useQuery({
    //     queryKey: ['orders', page, searchTerm],
    //     queryFn: async () => {
    //         const res = await api.get(`orders?page=${page}&search=${searchTerm}&limit=10`, {
    //             headers: { Authorization: `Bearer ${token}` }
    //         });
    //         return res.data.data;
    //     }
    // });

    const orders = order.data;


    // --- Mutations ---
    const { mutate: deleteOrder, isPending: delPending } = useMutation({
        mutationFn: async (id) => {
            const res = await api.delete(`orders/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return res.data;
        },
        onSuccess: () => {
            alert.success('Order deleted successfully!', 'Delete Order');
            queryClient.invalidateQueries({ queryKey: ['orders'] });
            setIsOpen(false);
        },
        onError: (err) => {
            alert.error(err?.response?.data?.message || 'Delete failed!', 'Error');
        }
    });

    // --- Helpers ---
    const getStatusStyle = (status) => {
        switch (status) {
            case 1: return 'bg-orange-100 text-orange-700 border-orange-200'; // Preorder
            case 2: return 'bg-blue-100 text-blue-700 border-blue-200';     // Delivery
            case 3: return 'bg-green-100 text-green-700 border-green-200';   // Complete
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    const getStatusLabel = (status) => {
        if (status === 1) return 'Preorder';
        if (status === 2) return 'Delivery';
        if (status === 3) return 'Complete';
        return 'Unknown';
    };

    const handleDel = (id) => {
        setDelId(id);
        setIsOpen(true);
    };

    return (
        <div className="p-4 md:p-6 bg-transparent min-h-screen">
            <AlertQuestionBox
                isOpen={isOpen}
                type="question"
                title="Cancel Order"
                message="Are you sure you want to delete this order? This cannot be undone."
                confirmText="Delete"
                cancelText="Cancel"
                confirmColor="danger"
                loading={delPending}
                onConfirm={() => deleteOrder(delId)}
                onCancel={() => setIsOpen(false)}
            />

            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Order Management</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Manage customer orders and payment statuses</p>
                </div>

                <div className="flex items-center gap-2">
                    <div className="relative">
                        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search Order ID or Customer..."
                            className="pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none w-full md:w-64 bg-white dark:bg-gray-700"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex border border-gray-200 dark:border-gray-600 rounded-lg bg-white overflow-hidden">
                        <button onClick={() => setViewMode('list')} className={`p-2.5 ${viewMode === 'list' ? 'bg-indigo-600 text-white' : 'text-gray-500'}`}><FaList /></button>
                        <button onClick={() => setViewMode('grid')} className={`p-2.5 ${viewMode === 'grid' ? 'bg-indigo-600 text-white' : 'text-gray-500'}`}><FaThLarge /></button>
                    </div>
                    <button onClick={() => navigate(`/sales`)} className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-semibold transition-all shadow-sm">
                        <FaPlus size={14} /> New Order
                    </button>
                </div>
            </div>

            {/* Content Area */}
            {viewMode === 'list' ? (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs uppercase border-b border-gray-200 dark:border-gray-600">
                                <th className="px-6 py-4 font-semibold">Order ID</th>
                                <th className="px-6 py-4 font-semibold">Customer</th>
                                <th className="px-6 py-4 font-semibold">Status</th>
                                <th className="px-6 py-4 font-semibold">Total Price</th>
                                <th className="px-6 py-4 font-semibold">Balance</th>
                                <th className="px-6 py-4 font-semibold text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {orders?.data?.map((order) => (
                                <tr key={order.order_id} className="hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                                    <td className="px-6 py-4 font-medium text-indigo-600">ORD-{order.order_id}</td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-bold text-gray-800 dark:text-white">{order.customer?.customer_name}</div>
                                        <div className="text-[10px] text-gray-400">Via {order.payment_method} ({order.payment_by})</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase border ${getStatusStyle(order.status)}`}>
                                            {getStatusLabel(order.status)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-bold text-gray-900 dark:text-gray-100">${order.total_price}</td>
                                    <td className={`px-6 py-4 font-bold ${Number(order.balance) < 0 ? 'text-red-500' : 'text-green-500'}`}>
                                        ${order.balance}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex justify-center gap-2">
                                            <button onClick={() => navigate(`view/${order.order_id}`)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"><FaEye /></button>
                                            <button onClick={() => navigate(`edit/${order.order_id}`)} className="p-2 text-amber-500 hover:bg-amber-50 rounded-lg"><FaEdit /></button>
                                            <button onClick={() => handleDel(order.order_id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><FaTrash /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {orders?.data?.map((order) => (
                        <div key={order.order_id} className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all relative overflow-hidden">
                            <div className="flex justify-between items-start mb-4">
                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${getStatusStyle(order.status)}`}>
                                    {getStatusLabel(order.status)}
                                </span>
                                <div className="flex gap-1 text-gray-400">
                                    <button onClick={() => navigate(`view/${order.order_id}`)} className="p-1 hover:text-blue-500"><FaEye size={14} /></button>
                                    <button onClick={() => navigate(`edit/${order.order_id}`)} className="p-1 hover:text-amber-500"><FaEdit size={14} /></button>
                                    <button onClick={() => handleDel(order.order_id)} className="p-1 hover:text-red-500"><FaTrash size={14} /></button>
                                </div>
                            </div>

                            <div className="mb-4">
                                <h3 className="font-black text-gray-800 dark:text-white text-lg">ORD-{order.order_id}</h3>
                                <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                                    <FaUser size={10} /> {order.customer?.customer_name}
                                </div>
                            </div>

                            <div className="space-y-2 border-t border-dashed pt-4">
                                <div className="flex justify-between text-xs">
                                    <span className="text-gray-400">Items:</span>
                                    <span className="font-bold">{order.items?.length || 0} Products</span>
                                </div>
                                <div className="flex justify-between text-sm font-black">
                                    <span className="text-gray-400 font-normal">Total:</span>
                                    <span className="text-indigo-600">${order.total_price}</span>
                                </div>
                                <div className="flex justify-between text-xs mt-2 p-2 bg-gray-50 rounded-lg">
                                    <span className="flex items-center gap-1"><FaMoneyBillWave size={10} /> Paid:</span>
                                    <span className="font-bold text-gray-700">${order.paymented}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Pagination remains same as your original logic */}
            {orders?.links && (
                <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-gray-500">
                        Showing <span className="font-semibold">{orders?.from || 0}</span> to <span className="font-semibold">{orders?.to || 0}</span> of <span className="font-semibold">{orders?.total || 0}</span> orders
                    </p>
                    <div className="flex items-center gap-1">
                        {orders.links.map((link, index) => (
                            <button
                                key={index}
                                disabled={!link.url}
                                onClick={() => {
                                    const pageUrl = new URL(link.url);
                                    setPage(pageUrl.searchParams.get('page'));
                                }}
                                className={`px-4 py-2 text-sm rounded-lg transition-all ${link.active ? 'bg-indigo-600 text-white font-bold' : 'bg-white border border-gray-200 text-gray-600 disabled:opacity-50'}`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderListPage;