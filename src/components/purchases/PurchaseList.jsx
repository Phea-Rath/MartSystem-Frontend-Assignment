import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    FaPlus, FaSearch, FaTable, FaThLarge, FaEye,
    FaEdit, FaTrash, FaTimes, FaCheckCircle, FaUser, FaCalendarAlt
} from 'react-icons/fa';
import api from '../../services/api';
import { useAlert } from '../../hooks/AlertContext';
import AlertQuestionBox from '../../services/AlertQuestionBox';
import { useNavigate } from 'react-router';

const purs = {
    "success": true,
    "message": "Purchase list retrieved successfully",
    "data": {
        "current_page": 1,
        "data": [
            {
                "purchase_id": 1,
                "supplier_id": 1,
                "price": "130.00",
                "delivery_fee": "5.00",
                "tax": "3.00",
                "payment": "138.90",
                "balance": "0.00",
                "discount": "0.00",
                "status": "1.00",
                "description": "Buy engine oil",
                "created_by": 1,
                "is_deleted": 0,
                "created_at": "2026-01-24T13:30:12.000000Z",
                "updated_at": "2026-01-24T13:30:12.000000Z",
                "quantity": 10,
                "supplier": {
                    "supplier_id": 1,
                    "supplier_name": "Micro Market"
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
                            "item_name": "Tex Oil",
                            "brand_id": 1,
                            "category_id": 1,
                            "brand": {
                                "brand_id": 1,
                                "brand_name": "TechXZone"
                            },
                            "category": {
                                "category_id": 1,
                                "category_name": "Oil"
                            }
                        }
                    }
                ]
            },

            {
                "purchase_id": 2,
                "supplier_id": 2,
                "price": "220.00",
                "delivery_fee": "10.00",
                "tax": "5.00",
                "payment": "235.00",
                "balance": "0.00",
                "discount": "0.00",
                "status": "1.00",
                "description": "Buy brake fluid",
                "created_by": 1,
                "is_deleted": 0,
                "created_at": "2026-01-23T10:15:00.000000Z",
                "updated_at": "2026-01-23T10:15:00.000000Z",
                "quantity": 20,
                "supplier": {
                    "supplier_id": 2,
                    "supplier_name": "Auto Supply Co"
                },
                "purchase_details": [
                    {
                        "purchase_id": 2,
                        "item_id": 3,
                        "cost_price": "11.00",
                        "total_price": "220.00",
                        "discount": "0.00",
                        "quantity": 20,
                        "is_deleted": 0,
                        "created_at": "2026-01-23T10:15:00.000000Z",
                        "updated_at": "2026-01-23T10:15:00.000000Z",
                        "item": {
                            "item_id": 3,
                            "item_name": "Brake Fluid",
                            "brand_id": 2,
                            "category_id": 2,
                            "brand": {
                                "brand_id": 2,
                                "brand_name": "AutoMax"
                            },
                            "category": {
                                "category_id": 2,
                                "category_name": "Brake"
                            }
                        }
                    }
                ]
            },

            {
                "purchase_id": 3,
                "supplier_id": 3,
                "price": "180.00",
                "delivery_fee": "7.00",
                "tax": "4.00",
                "payment": "191.00",
                "balance": "0.00",
                "discount": "0.00",
                "status": "1.00",
                "description": "Hydraulic oil stock",
                "created_by": 1,
                "is_deleted": 0,
                "created_at": "2026-01-22T09:40:00.000000Z",
                "updated_at": "2026-01-22T09:40:00.000000Z",
                "quantity": 12,
                "supplier": {
                    "supplier_id": 3,
                    "supplier_name": "Industrial Parts Ltd"
                },
                "purchase_details": [
                    {
                        "purchase_id": 3,
                        "item_id": 4,
                        "cost_price": "15.00",
                        "total_price": "180.00",
                        "discount": "0.00",
                        "quantity": 12,
                        "is_deleted": 0,
                        "created_at": "2026-01-22T09:40:00.000000Z",
                        "updated_at": "2026-01-22T09:40:00.000000Z",
                        "item": {
                            "item_id": 4,
                            "item_name": "Hydraulic Oil",
                            "brand_id": 3,
                            "category_id": 1,
                            "brand": {
                                "brand_id": 3,
                                "brand_name": "IndusPro"
                            },
                            "category": {
                                "category_id": 1,
                                "category_name": "Oil"
                            }
                        }
                    }
                ]
            },

            {
                "purchase_id": 4,
                "supplier_id": 1,
                "price": "150.00",
                "delivery_fee": "5.00",
                "tax": "3.50",
                "payment": "158.50",
                "balance": "0.00",
                "discount": "0.00",
                "status": "1.00",
                "description": "Gear oil purchase",
                "created_by": 1,
                "is_deleted": 0,
                "created_at": "2026-01-21T08:20:00.000000Z",
                "updated_at": "2026-01-21T08:20:00.000000Z",
                "quantity": 10,
                "supplier": {
                    "supplier_id": 1,
                    "supplier_name": "Micro Market"
                },
                "purchase_details": [
                    {
                        "purchase_id": 4,
                        "item_id": 6,
                        "cost_price": "15.00",
                        "total_price": "150.00",
                        "discount": "0.00",
                        "quantity": 10,
                        "is_deleted": 0,
                        "created_at": "2026-01-21T08:20:00.000000Z",
                        "updated_at": "2026-01-21T08:20:00.000000Z",
                        "item": {
                            "item_id": 6,
                            "item_name": "Gear Oil",
                            "brand_id": 3,
                            "category_id": 1,
                            "brand": {
                                "brand_id": 3,
                                "brand_name": "IndusPro"
                            },
                            "category": {
                                "category_id": 1,
                                "category_name": "Oil"
                            }
                        }
                    }
                ]
            },

            {
                "purchase_id": 5,
                "supplier_id": 4,
                "price": "300.00",
                "delivery_fee": "15.00",
                "tax": "6.00",
                "payment": "321.00",
                "balance": "0.00",
                "discount": "0.00",
                "status": "1.00",
                "description": "Industrial lubricant bulk",
                "created_by": 1,
                "is_deleted": 0,
                "created_at": "2026-01-20T14:10:00.000000Z",
                "updated_at": "2026-01-20T14:10:00.000000Z",
                "quantity": 25,
                "supplier": {
                    "supplier_id": 4,
                    "supplier_name": "Heavy Tools Supply"
                },
                "purchase_details": [
                    {
                        "purchase_id": 5,
                        "item_id": 9,
                        "cost_price": "12.00",
                        "total_price": "300.00",
                        "discount": "0.00",
                        "quantity": 25,
                        "is_deleted": 0,
                        "created_at": "2026-01-20T14:10:00.000000Z",
                        "updated_at": "2026-01-20T14:10:00.000000Z",
                        "item": {
                            "item_id": 9,
                            "item_name": "Industrial Lubricant",
                            "brand_id": 5,
                            "category_id": 4,
                            "brand": {
                                "brand_id": 5,
                                "brand_name": "MegaLube"
                            },
                            "category": {
                                "category_id": 4,
                                "category_name": "Industrial"
                            }
                        }
                    }
                ]
            }
        ],
        "per_page": 10,
        "total": 10,
        "last_page": 1,
        "from": 1,
        "to": 10
    }
}


const PurchaseList = () => {
    const navigater = useNavigate();
    const token = localStorage.getItem('token');
    const alert = useAlert();
    const queryClient = useQueryClient();

    // State
    const [viewMode, setViewMode] = useState('card'); // 'table' or 'card'
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [selectedAction, setSelectedAction] = useState({ id: null, type: '' });

    // Status Mapping
    const STATUS_MAP = {
        1: { label: 'Pending', color: 'bg-yellow-100 text-yellow-700', border: 'border-yellow-200' },
        2: { label: 'Received', color: 'bg-green-100 text-green-700', border: 'border-green-200' },
        3: { label: 'Cancelled', color: 'bg-red-100 text-red-700', border: 'border-red-200' }
    };

    const isPending = false; // Replace with actual loading state from data fetching
    // Fetch Data
    // const { data: purchaseData, isPending } = useQuery({
    //     queryKey: ['purchases', page, search],
    //     queryFn: async () => {
    //         const res = await api.get(`purchases?page=${page}&search=${search}&limit=10`, {
    //             headers: { Authorization: `Bearer ${token}` }
    //         });
    //         return res.data.data;
    //     },
    //     keepPreviousData: true
    // });
    const purchaseData = purs.data;

    // Mutations
    const deleteMutation = useMutation({
        mutationFn: (id) => api.delete(`purchases/${id}`, { headers: { Authorization: `Bearer ${token}` } }),
        onSuccess: () => {
            setTimeout(() => {
                alert.success('Brand deleted successfully!', 'Delete Brand', {
                    duration: 1000,
                    position: 'top-center',
                });
            }, 200);
            queryClient.invalidateQueries(['purchases']);
            setIsOpen(false);
        },
        onError: (err) => {
            console.error(err?.response?.data || err?.message);
            setTimeout(() => {
                alert.error(err?.response?.data || err?.message || 'Purchase deleted failed!', 'Delete Purchase', {
                    duration: 5000,
                    position: 'top-center',
                });
            }, 200)
        }
    });

    const statusMutation = useMutation({
        mutationFn: ({ id, status }) => api.patch(`purchases/${id}/status`, { status }, { headers: { Authorization: `Bearer ${token}` } }),
        onSuccess: (res, variables) => {
            alert.success(`Purchase ${variables.status === 2 ? 'Received' : 'Cancelled'}`, {
                duration: 1000,
                position: 'top-center',
            });
            queryClient.invalidateQueries(['purchases']);
            setIsOpen(false);
        },
        onError: (err) => {
            console.error(err?.response?.data || err?.message);
            setTimeout(() => {
                alert.error(err?.response?.data || err?.message || 'Purchase status updated failed!', 'Update status Purchase', {
                    duration: 5000,
                    position: 'top-center',
                });
            }, 200)
        }
    });

    const handleConfirmAction = () => {
        const { id, type } = selectedAction;
        if (type === 'delete') deleteMutation.mutate(id);
        if (type === 'receive') statusMutation.mutate({ id, status: 2 });
        if (type === 'cancel') statusMutation.mutate({ id, status: 3 });
    };

    const triggerAction = (id, type) => {
        setSelectedAction({ id, type });
        setIsOpen(true);
    };

    return (
        <div className="p-6">
            <AlertQuestionBox
                isOpen={isOpen}
                title="Confirm Action"
                message={`Are you sure you want to ${selectedAction.type} this purchase?`}
                onConfirm={handleConfirmAction}
                onCancel={() => setIsOpen(false)}
                confirmColor={selectedAction.type === 'delete' || selectedAction.type === 'cancel' ? 'danger' : 'success'}
            />

            {/* Header & Controls */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Purchases</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Total: {purchaseData?.total || 0} orders</p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <div className="relative">
                        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search orders..."
                            className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none w-64 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
                        <button
                            onClick={() => setViewMode('table')}
                            className={`p-2 rounded-md ${viewMode === 'table' ? 'bg-white dark:bg-gray-700 shadow-sm text-blue-600' : 'text-gray-500 dark:text-gray-400'}`}
                        >
                            <FaTable />
                        </button>
                        <button
                            onClick={() => setViewMode('card')}
                            className={`p-2 rounded-md ${viewMode === 'card' ? 'bg-white dark:bg-gray-700 shadow-sm text-blue-600' : 'text-gray-500 dark:text-gray-400'}`}
                        >
                            <FaThLarge />
                        </button>
                    </div>

                    <button onClick={() => navigater(`create`)} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all">
                        <FaPlus size={14} /> Create Purchase
                    </button>
                </div>
            </div>

            {/* Content View */}
            {isPending ? (
                <div className="text-center py-20">Loading...</div>
            ) : (
                <>
                    {viewMode === 'table' ? (
                        <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-400 dark:border-gray-600">
                                    <tr>
                                        <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300">ID</th>
                                        <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300">Supplier</th>
                                        <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300">Total</th>
                                        <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300">Status</th>
                                        <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y dark:divide-gray-700">
                                    {purchaseData?.data.map(item => (
                                        <tr key={item.purchase_id} className="hover:bg-gray-50 dark:hover:bg-gray-700 border-gray-300 dark:border-gray-700">
                                            <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-200">#{item.purchase_id}</td>
                                            <td className="px-6 py-4 text-gray-900 dark:text-gray-200">{item.supplier?.supplier_name}</td>
                                            <td className="px-6 py-4 font-bold text-blue-600 dark:text-blue-400">${item.price}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${STATUS_MAP[item.status].color}`}>
                                                    {STATUS_MAP[item.status].label}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex justify-end gap-2">
                                                    {item.status === 1 && (
                                                        <button onClick={() => triggerAction(item.purchase_id, 'receive')} className="p-2 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/30 rounded" title="Receive"><FaCheckCircle /></button>
                                                    )}
                                                    <button onClick={() => navigater(`view/${item.purchase_id}`)} className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded" title="View"><FaEye /></button>
                                                    <button onClick={() => navigater(`edit/${item.purchase_id}`)} className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded" title="Edit"><FaEdit /></button>
                                                    <button
                                                        onClick={() => triggerAction(item.purchase_id, item.status === 2 ? 'delete' : 'cancel')}
                                                        className={`p-2 rounded ${item.status === 2 ? 'text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30' : 'text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/30'}`}
                                                        title={item.status === 2 ? 'Delete' : 'Cancel'}
                                                    >
                                                        {item.status === 2 ? <FaTrash /> : <FaTimes />}
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {purchaseData?.data.map(item => (
                                <div key={item.purchase_id} className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm relative hover:shadow-md transition-all">
                                    {/* Status Top-Left */}
                                    <div className={`absolute top-0 left-0 px-3 py-1 text-xs font-bold rounded-br-lg ${STATUS_MAP[item.status]?.color}`}>
                                        {STATUS_MAP[item.status]?.label}
                                    </div>

                                    <div className="p-5 pt-10">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Order #{item.purchase_id}</h3>
                                                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-1">
                                                    <FaUser size={12} /> {item.supplier?.supplier_name}
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-xl font-black text-blue-600 dark:text-blue-400">${item.price}</div>
                                                <div className="text-[10px] text-gray-400 dark:text-gray-500 flex items-center gap-1 justify-end">
                                                    <FaCalendarAlt /> {new Date(item.created_at).toLocaleDateString()}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="border-t border-gray-300 dark:border-gray-700 pt-4 flex justify-between gap-2">
                                            <div className="flex gap-1">
                                                <button onClick={() => navigater(`view/${item.purchase_id}`)} className="p-2 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600"><FaEye /></button>
                                                <button onClick={() => navigater(`edit/${item.purchase_id}`)} className="p-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50"><FaEdit /></button>
                                            </div>
                                            <div className="flex gap-2">
                                                {item.status === 1 && (
                                                    <button onClick={() => triggerAction(item.purchase_id, 'receive')} className="px-3 py-1 bg-green-600 dark:bg-green-700 text-white rounded-lg flex items-center gap-2 text-sm hover:bg-green-700 dark:hover:bg-green-600">
                                                        <FaCheckCircle /> Receive
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => triggerAction(item.purchase_id, item.status === 2 ? 'delete' : 'cancel')}
                                                    className={`px-3 py-1 rounded-lg flex items-center gap-2 text-sm border ${item.status === 2 ? 'border-red-200 dark:border-red-700 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30' : 'border-orange-200 dark:border-orange-700 text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/30'}`}
                                                >
                                                    {item.status === 2 ? <><FaTrash /> Delete</> : <><FaTimes /> Cancel</>}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Pagination */}
                    <div className="mt-8 flex items-center justify-between">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Showing {purchaseData?.from} to {purchaseData?.to} of {purchaseData?.total}</p>
                        <div className="flex gap-2">
                            {purchaseData?.links?.map((link, idx) => (
                                <button
                                    key={idx}
                                    disabled={!link.url || link.active}
                                    onClick={() => {
                                        const p = new URL(link.url).searchParams.get('page');
                                        setPage(Number(p));
                                    }}
                                    className={`px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-sm transition-all ${link.active ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50'}`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default PurchaseList;