import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash, FaPlus, FaWarehouse } from 'react-icons/fa';
import WarehouseForm from './WarehouseForm';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '../../services/api';
import AlertQuestionBox from '../../services/AlertQuestionBox'
import { useAlert } from '../../hooks/AlertContext';

const warehouse = {
    "message": "Warehouses fetched successfully.",
    "success": true,
    "data": {
        "current_page": 1,
        "data": [
            {
                "warehouse_id": 1,
                "warehouse_name": "Main Warehouse",
                "created_by": 1,
                "is_active": 1,
                "is_deleted": 0,
                "created_at": "2026-01-24T09:52:59.000000Z",
                "updated_at": "2026-01-24T09:52:59.000000Z"
            }
        ],
        "first_page_url": "http://127.0.0.1:8000/api/warehouses?page=1",
        "from": 1,
        "last_page": 1,
        "last_page_url": "http://127.0.0.1:8000/api/warehouses?page=1",
        "links": [
            {
                "url": null,
                "label": "&laquo; Previous",
                "page": null,
                "active": false
            },
            {
                "url": "http://127.0.0.1:8000/api/warehouses?page=1",
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
        "path": "http://127.0.0.1:8000/api/warehouses",
        "per_page": 10,
        "prev_page_url": null,
        "to": 1,
        "total": 1
    }
}

const WarehouseList = () => {
    const token = localStorage.getItem('token');
    const alert = useAlert();

    const [showForm, setShowForm] = useState(false);
    const [warehouses, setWarehouses] = useState();
    const [dataEdit, setDataEdit] = useState();
    const [page, setPage] = useState(1);
    const [delId, setDelId] = useState();
    const [isOpen, setIsOpen] = useState(false);

    const queryClient = useQueryClient();

    const fetchWarehouses = async ({ queryKey }) => {
        const [_key, page] = queryKey;
        const res = await api.get(`warehouses?limit=10&page=${page}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.data.data;
    };

    // const { data, isPending } = useQuery({
    //     queryKey: ['warehouses', page],
    //     queryFn: fetchWarehouses,
    //     keepPreviousData: true,
    //     staleTime: 5000,
    // });
    const data = warehouse.data;
    const isPending = false;

    const delWarehouseApi = async (id) => {
        const res = await api.delete(`warehouses/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.data;
    };

    const { mutate: deleteWarehouse, isPending: delPending } = useMutation({
        mutationKey: ['warehouses', 'delete'],
        mutationFn: delWarehouseApi,
        onSuccess: () => {
            setTimeout(() => {
                alert.success('Warehouse deleted successfully!', 'Delete Warehouse', {
                    duration: 1000,
                    position: 'top-center',
                });
            }, 200)
            queryClient.invalidateQueries({ queryKey: ['warehouses'] });
            setIsOpen(false);
        },
        onError: (err) => {
            console.error(err?.response?.data || err?.message);
            setTimeout(() => {
                alert.error('Warehouse delete failed!', 'Delete Warehouse', {
                    duration: 5000,
                    position: 'top-center',
                });
            }, 200)
        }
    });

    const handleDel = (id) => {
        setDelId(id);
        setIsOpen(true);
    };

    const handleAction = () => {
        deleteWarehouse(delId);
    };

    useEffect(() => {
        setWarehouses(data);
    }, [data]);

    const handleEdit = (data) => {
        setDataEdit(data);
        setShowForm(true);
    }

    const handleAdd = () => {
        setDataEdit(null);
        setShowForm(true);
    }

    const handlePageChange = (url) => {
        if (!url) return;
        const pageParam = new URL(url).searchParams.get('page');
        setPage(Number(pageParam));
    };

    return (
        <div className="bg-transparent h-full !relative">
            <AlertQuestionBox
                isOpen={isOpen}
                type="question"
                title="Delete Warehouse"
                message="Are you sure you want to delete this warehouse? This action cannot be undone"
                confirmText="Ok"
                cancelText="Cancel"
                confirmColor="danger"
                loading={delPending}
                onConfirm={handleAction}
                onCancel={() => setIsOpen(false)}
            />

            <div className="p-6 mx-auto">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Warehouses</h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Manage your storage locations ({warehouses?.total || 0} total)</p>
                    </div>
                    <button onClick={handleAdd} className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors shadow-sm">
                        <FaPlus size={14} />
                        <span>Add Warehouse</span>
                    </button>
                </div>

                {/* Table Container */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-700">
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300">ID</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300">Warehouse Name</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300">Status</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300">Created At</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300 text-right">Actions</th>
                                </tr>
                            </thead>
                            {!isPending && <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                {warehouses?.data?.map((warehouse) => (
                                    <tr key={warehouse.warehouse_id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                        <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 font-medium">
                                            #{warehouse.warehouse_id}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
                                                    <FaWarehouse size={16} />
                                                </div>
                                                <span className="font-medium text-gray-700 dark:text-white">{warehouse.warehouse_name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${warehouse.is_active
                                                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                                                : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                                                }`}>
                                                {warehouse.is_active ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                            {new Date(warehouse.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex justify-end gap-2">
                                                <button onClick={() => handleEdit(warehouse)} className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-md transition-colors" title="Edit">
                                                    <FaEdit size={16} />
                                                </button>
                                                <button onClick={() => handleDel(warehouse.warehouse_id)} className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-gray-700 rounded-md transition-colors" title="Delete">
                                                    <FaTrash size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>}
                        </table>
                    </div>

                    {/* Pagination Footer */}
                    <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Showing <span className="font-semibold text-gray-800 dark:text-white">{warehouses?.data?.length || 0}</span> results
                        </p>
                        <div className="flex gap-1">
                            {warehouses?.links.map((link, index) => (
                                <button
                                    key={index}
                                    disabled={!link.url || link.active}
                                    onClick={() => handlePageChange(link.url)}
                                    className={`px-3 py-1 rounded border text-sm transition-all ${link.active
                                        ? 'bg-blue-600 text-white border-blue-600'
                                        : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50'
                                        }`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Overlay */}
            {showForm && (
                <div className="fixed inset-0 z-50 bg-black/50 dark:bg-black/60 flex items-center justify-center transition-all duration-300">
                    <WarehouseForm
                        data={dataEdit}
                        onCancel={() => setShowForm(false)}
                    />
                </div>
            )}
        </div>
    );
};

export default WarehouseList;