import React, { useState } from 'react';
import { FaEdit, FaTrash, FaPlus, FaBoxes } from 'react-icons/fa';
import StockTypeForm from './StockTypeForm';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '../../services/api';
import AlertQuestionBox from '../../services/AlertQuestionBox';
import { useAlert } from '../../hooks/AlertContext';

const stockTypes = {
    "success": true,
    "data": {
        "current_page": 1,
        "data": [
            {
                "stock_type_id": 2,
                "stock_type_name": "Stock Out",
                "created_by": 1,
                "is_deleted": 0,
                "created_at": "2026-01-24T09:57:01.000000Z",
                "updated_at": "2026-01-24T09:57:01.000000Z"
            },
            {
                "stock_type_id": 1,
                "stock_type_name": "Stock In",
                "created_by": 1,
                "is_deleted": 0,
                "created_at": "2026-01-24T09:52:59.000000Z",
                "updated_at": "2026-01-24T09:52:59.000000Z"
            }
        ],
        "first_page_url": "http://127.0.0.1:8000/api/stock-types?page=1",
        "from": 1,
        "last_page": 1,
        "last_page_url": "http://127.0.0.1:8000/api/stock-types?page=1",
        "links": [
            {
                "url": null,
                "label": "&laquo; Previous",
                "page": null,
                "active": false
            },
            {
                "url": "http://127.0.0.1:8000/api/stock-types?page=1",
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
        "path": "http://127.0.0.1:8000/api/stock-types",
        "per_page": 10,
        "prev_page_url": null,
        "to": 2,
        "total": 2
    }
}
const StockTypeList = () => {
    const token = localStorage.getItem('token');
    const alert = useAlert();
    const queryClient = useQueryClient();

    const [showForm, setShowForm] = useState(false);
    const [dataEdit, setDataEdit] = useState(null);
    const [page, setPage] = useState(1);
    const [delId, setDelId] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    // Fetch Stock Types
    const fetchStockTypes = async ({ queryKey }) => {
        const [_key, pageNum] = queryKey;
        const res = await api.get(`stock-types?limit=10&page=${pageNum}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        // Accessing res.data.data because your JSON wraps the paginated object inside a "data" key
        return res.data.data;
    };

    // const { data: stockData, isPending } = useQuery({
    //     queryKey: ['stock_types', page],
    //     queryFn: fetchStockTypes,
    //     keepPreviousData: true,
    //     staleTime: 5000,
    // });

    const stockData = stockTypes.data;
    const isPending = false;

    // Delete Mutation
    const { mutate: deleteStockType, isPending: delPending } = useMutation({
        mutationFn: async (id) => {
            return await api.delete(`stock-types/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
        },
        onSuccess: () => {
            alert.success('Stock type deleted successfully!', 'Delete Stock Type');
            queryClient.invalidateQueries({ queryKey: ['stock_types'] });
            setIsOpen(false);
        },
        onError: (err) => {
            const errorMsg = err?.response?.data?.message || 'Failed to delete';
            alert.error(errorMsg, 'Error');
        }
    });

    const handleEdit = (item) => {
        setDataEdit(item);
        setShowForm(true);
    };

    const handleAdd = () => {
        setDataEdit(null);
        setShowForm(true);
    };

    const handlePageChange = (url) => {
        if (!url) return;
        const pageParam = new URL(url).searchParams.get('page');
        setPage(Number(pageParam));
    };

    return (
        <div className="bg-transparent h-full relative">
            <AlertQuestionBox
                isOpen={isOpen}
                type="question"
                title="Delete Stock Type"
                message="Are you sure you want to delete this stock type? Items linked to this type may be affected."
                confirmText="Yes, Delete"
                cancelText="Cancel"
                confirmColor="danger"
                loading={delPending}
                onConfirm={() => deleteStockType(delId)}
                onCancel={() => setIsOpen(false)}
            />

            <div className="p-6 mx-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3 sm:gap-4">
                    <div className="min-w-0">
                        <h1 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white">Stock Types</h1>
                        <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                            Categorize your inventory movements ({stockData?.total || 0} total)
                        </p>
                    </div>
                    <button
                        onClick={handleAdd}
                        className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-3 md:px-4 py-2 rounded-lg transition-colors shadow-sm text-sm md:text-base font-semibold whitespace-nowrap"
                    >
                        <FaPlus size={14} />
                        <span>Add Stock Type</span>
                    </button>
                </div>

                {/* Table */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-700">
                                    <th className="hidden sm:table-cell px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm font-semibold text-gray-600 dark:text-gray-300">ID</th>
                                    <th className="px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm font-semibold text-gray-600 dark:text-gray-300">Type Name</th>
                                    <th className="hidden md:table-cell px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300">Created At</th>
                                    <th className="px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm font-semibold text-gray-600 dark:text-gray-300 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                {!isPending && stockData?.data?.map((item) => (
                                    <tr key={item.stock_type_id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                        <td className="hidden sm:table-cell px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm text-gray-500 dark:text-gray-400 font-medium">
                                            #{item.stock_type_id}
                                        </td>
                                        <td className="px-3 md:px-6 py-3 md:py-4">
                                            <div className="flex items-center gap-2 md:gap-3">
                                                <div className="p-1.5 md:p-2 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-lg hidden md:block">
                                                    <FaBoxes size={16} />
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <span className="font-medium text-gray-700 dark:text-white text-sm md:text-base">{item.stock_type_name}</span>
                                                    <p className="md:hidden text-xs text-gray-500 dark:text-gray-400">{item.created_at ? new Date(item.created_at).toLocaleDateString() : 'N/A'}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="hidden md:table-cell px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                            {item.created_at ? new Date(item.created_at).toLocaleDateString() : 'N/A'}
                                        </td>
                                        <td className="px-3 md:px-6 py-3 md:py-4">
                                            <div className="flex justify-end gap-1 md:gap-2">
                                                <button onClick={() => handleEdit(item)} className="p-1.5 md:p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-md transition-colors">
                                                    <FaEdit size={14} className="md:hidden" />
                                                    <FaEdit size={16} className="hidden md:block" />
                                                </button>
                                                <button onClick={() => { setDelId(item.stock_type_id); setIsOpen(true); }} className="p-1.5 md:p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-gray-700 rounded-md transition-colors">
                                                    <FaTrash size={14} className="md:hidden" />
                                                    <FaTrash size={16} className="hidden md:block" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="px-3 md:px-6 py-3 md:py-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
                        <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                            Showing <span className="font-semibold text-gray-800 dark:text-white">{stockData?.data?.length || 0}</span> results
                        </p>
                        <div className="flex gap-0.5 md:gap-1 flex-wrap justify-center sm:justify-end">
                            {stockData?.links?.map((link, index) => (
                                <button
                                    key={index}
                                    disabled={!link.url || link.active}
                                    onClick={() => handlePageChange(link.url)}
                                    className={`px-2 md:px-3 py-1 rounded border text-xs md:text-sm transition-all ${link.active
                                        ? 'bg-emerald-600 text-white border-emerald-600'
                                        : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50'
                                        }`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Form */}
            {showForm && (
                <div className="fixed inset-0 z-50 bg-black/50 dark:bg-black/60 flex items-center justify-center p-4">
                    <StockTypeForm
                        data={dataEdit}
                        onCancel={() => setShowForm(false)}
                    />
                </div>
            )}
        </div>
    );
};

export default StockTypeList;