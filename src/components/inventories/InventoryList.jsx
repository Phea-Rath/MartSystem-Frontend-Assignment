import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import {
    FaSearch, FaThLarge, FaList, FaEye,
    FaEdit, FaTrash, FaWarehouse, FaBoxOpen,
    FaPlus, FaExchangeAlt
} from 'react-icons/fa';
import { useNavigate } from 'react-router';
import api from '../../services/api';
import AlertQuestionBox from '../../services/AlertQuestionBox';
import { useAlert } from '../../hooks/AlertContext';

// const stock = {
//     "success": true,
//     "data": {
//         "current_page": 1,
//         "data": [
//             {
//                 "stock_id": 1,
//                 "from_warehouse_id": 1,
//                 "to_warehouse_id": 1,
//                 "stock_type_id": 1,
//                 "description": "Stock added for Tex Oil",
//                 "quantity": 10,
//                 "created_by": 1,
//                 "is_deleted": 0,
//                 "created_at": "2026-01-24T10:34:44.000000Z",
//                 "updated_at": "2026-01-24T10:34:44.000000Z",
//                 "from_warehouse": {
//                     "warehouse_id": 1,
//                     "warehouse_name": "Main Warehouse"
//                 },
//                 "to_warehouse": {
//                     "warehouse_id": 1,
//                     "warehouse_name": "Main Warehouse"
//                 },
//                 "stock_type": {
//                     "stock_type_id": 1,
//                     "stock_type_name": "Stock In"
//                 },
//                 "stock_details": [
//                     {
//                         "stock_id": 1,
//                         "item_id": 1,
//                         "quantity": 10,
//                         "item_cost": "15.00",
//                         "expire_date": "2026-01-31",
//                         "is_deleted": 0,
//                         "created_at": "2026-01-24T10:34:44.000000Z",
//                         "updated_at": "2026-01-24T10:34:44.000000Z",
//                         "item": {
//                             "item_id": 1,
//                             "category_id": 1,
//                             "brand_id": 1,
//                             "item_name": "Tex Oil",
//                             "item_code": "202601246592",
//                             "unit_price": "15.00",
//                             "item_cost": "0.00",
//                             "discount": "5.00",
//                             "description": "Good and smooth",
//                             "created_by": 1,
//                             "is_deleted": 0,
//                             "created_at": "2026-01-24T09:56:02.000000Z",
//                             "updated_at": "2026-01-24T09:56:02.000000Z"
//                         }
//                     }
//                 ]
//             },
//             {
//                 "stock_id": 2,
//                 "from_warehouse_id": 2,
//                 "to_warehouse_id": 1,
//                 "stock_type_id": 1,
//                 "description": "Stock added for Engine Oil Pro",
//                 "quantity": 15,
//                 "created_by": 1,
//                 "is_deleted": 0,
//                 "created_at": "2026-01-24T11:00:00.000000Z",
//                 "updated_at": "2026-01-24T11:00:00.000000Z",
//                 "from_warehouse": {
//                     "warehouse_id": 2,
//                     "warehouse_name": "Secondary Warehouse"
//                 },
//                 "to_warehouse": {
//                     "warehouse_id": 1,
//                     "warehouse_name": "Main Warehouse"
//                 },
//                 "stock_type": {
//                     "stock_type_id": 1,
//                     "stock_type_name": "Stock In"
//                 },
//                 "stock_details": [
//                     {
//                         "stock_id": 2,
//                         "item_id": 2,
//                         "quantity": 15,
//                         "item_cost": "22.00",
//                         "expire_date": "2026-02-28",
//                         "is_deleted": 0,
//                         "created_at": "2026-01-24T11:00:00.000000Z",
//                         "updated_at": "2026-01-24T11:00:00.000000Z",
//                         "item": {
//                             "item_id": 2,
//                             "category_id": 1,
//                             "brand_id": 2,
//                             "item_name": "Engine Oil Pro",
//                             "item_code": "202601246593",
//                             "unit_price": "22.00",
//                             "item_cost": "0.00",
//                             "discount": "3.00",
//                             "description": "High performance engine oil",
//                             "created_by": 1,
//                             "is_deleted": 0,
//                             "created_at": "2026-01-24T09:58:00.000000Z",
//                             "updated_at": "2026-01-24T09:58:00.000000Z"
//                         }
//                     }
//                 ]
//             },
//             {
//                 "stock_id": 3,
//                 "from_warehouse_id": 1,
//                 "to_warehouse_id": 2,
//                 "stock_type_id": 1,
//                 "description": "Stock added for Brake Fluid",
//                 "quantity": 20,
//                 "created_by": 1,
//                 "is_deleted": 0,
//                 "created_at": "2026-01-24T11:30:00.000000Z",
//                 "updated_at": "2026-01-24T11:30:00.000000Z",
//                 "from_warehouse": {
//                     "warehouse_id": 1,
//                     "warehouse_name": "Main Warehouse"
//                 },
//                 "to_warehouse": {
//                     "warehouse_id": 2,
//                     "warehouse_name": "Secondary Warehouse"
//                 },
//                 "stock_type": {
//                     "stock_type_id": 1,
//                     "stock_type_name": "Stock In"
//                 },
//                 "stock_details": [
//                     {
//                         "stock_id": 3,
//                         "item_id": 3,
//                         "quantity": 20,
//                         "item_cost": "11.00",
//                         "expire_date": "2026-03-15",
//                         "is_deleted": 0,
//                         "created_at": "2026-01-24T11:30:00.000000Z",
//                         "updated_at": "2026-01-24T11:30:00.000000Z",
//                         "item": {
//                             "item_id": 3,
//                             "category_id": 2,
//                             "brand_id": 2,
//                             "item_name": "Brake Fluid",
//                             "item_code": "202601246594",
//                             "unit_price": "8.50",
//                             "item_cost": "0.00",
//                             "discount": "0.00",
//                             "description": "DOT3 brake fluid",
//                             "created_by": 1,
//                             "is_deleted": 0,
//                             "created_at": "2026-01-24T09:59:00.000000Z",
//                             "updated_at": "2026-01-24T09:59:00.000000Z"
//                         }
//                     }
//                 ]
//             },
//             {
//                 "stock_id": 4,
//                 "from_warehouse_id": 2,
//                 "to_warehouse_id": 2,
//                 "stock_type_id": 1,
//                 "description": "Stock added for Hydraulic Oil",
//                 "quantity": 12,
//                 "created_by": 1,
//                 "is_deleted": 0,
//                 "created_at": "2026-01-24T12:00:00.000000Z",
//                 "updated_at": "2026-01-24T12:00:00.000000Z",
//                 "from_warehouse": {
//                     "warehouse_id": 2,
//                     "warehouse_name": "Secondary Warehouse"
//                 },
//                 "to_warehouse": {
//                     "warehouse_id": 2,
//                     "warehouse_name": "Secondary Warehouse"
//                 },
//                 "stock_type": {
//                     "stock_type_id": 1,
//                     "stock_type_name": "Stock In"
//                 },
//                 "stock_details": [
//                     {
//                         "stock_id": 4,
//                         "item_id": 4,
//                         "quantity": 12,
//                         "item_cost": "15.00",
//                         "expire_date": "2026-02-28",
//                         "is_deleted": 0,
//                         "created_at": "2026-01-24T12:00:00.000000Z",
//                         "updated_at": "2026-01-24T12:00:00.000000Z",
//                         "item": {
//                             "item_id": 4,
//                             "category_id": 1,
//                             "brand_id": 3,
//                             "item_name": "Hydraulic Oil",
//                             "item_code": "202601246595",
//                             "unit_price": "18.00",
//                             "item_cost": "0.00",
//                             "discount": "2.00",
//                             "description": "Industrial hydraulic oil",
//                             "created_by": 1,
//                             "is_deleted": 0,
//                             "created_at": "2026-01-24T10:00:00.000000Z",
//                             "updated_at": "2026-01-24T10:00:00.000000Z"
//                         }
//                     }
//                 ]
//             }
//         ]
//     }
// }


const InventoryList = () => {
    // --- State ---
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [viewMode, setViewMode] = useState('grid'); // 'list' or 'grid'
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [isOpen, setIsOpen] = useState(false);
    const [delId, setDelId] = useState(false);
    const alert = useAlert();

    const { data: stocks, isPending } = useQuery({
        queryKey: ['stocks', page, searchTerm],
        queryFn: async () => {
            const res = await api.get(`stocks?page=${page}&search=${searchTerm}&limit=10`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return res.data.data;
        }
    });
    // const stocks = stock.data;


    const delStockApi = async (id) => {
        const res = await api.delete(`stocks/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.data;
    };

    const { mutate: deleteStock, isPending: delPending } = useMutation({
        mutationKey: ['stocks', 'delete'],
        mutationFn: delStockApi,
        onSuccess: () => {
            setTimeout(() => {
                alert.success('Stock deleted successfully!', 'Delete Stock', {
                    duration: 1000,
                    position: 'top-center',
                });
            }, 200)
            queryClient.invalidateQueries({ queryKey: ['stocks'] });
            setIsOpen(false);
        },
        onError: (err) => {
            console.error(err?.response?.data || err?.message);
            setTimeout(() => {
                alert.error(err?.response?.data || err?.message || 'Stock deleted failed!', 'Delete Stock', {
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
        deleteStock(delId);
    };

    // Helper to style Stock Type like a Status
    const getStockTypeStyle = (typeName) => {
        const name = typeName?.toLowerCase();
        if (name?.includes('in') || name?.includes('purchase')) return 'bg-green-100 text-green-700 border-green-200';
        if (name?.includes('out') || name?.includes('sale')) return 'bg-red-100 text-red-700 border-red-200';
        if (name?.includes('transfer')) return 'bg-blue-100 text-blue-700 border-blue-200';
        return 'bg-gray-100 text-gray-700 border-gray-200';
    };

    return (
        <div className="p-4 md:p-6 bg-transparent min-h-screen">
            <AlertQuestionBox
                isOpen={isOpen}
                type="question"
                title="Delete Inventory"
                message="Are you sure you want to delete this inventory? This action cannot be undone"
                confirmText="Ok"
                cancelText="Cancecl"
                confirmColor="danger"
                loading={delPending}
                onConfirm={handleAction}
                onCancel={() => setIsOpen(false)}
            />
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Inventory Logs</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">History of stock adjustments and movements</p>
                </div>

                <div className="flex items-center gap-2">
                    <div className="relative">
                        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by ID or Warehouse..."
                            className="pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none w-full md:w-64 transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="flex border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 overflow-hidden">
                        <button onClick={() => setViewMode('list')} className={`p-2.5 ${viewMode === 'list' ? 'bg-indigo-600 text-white' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}>
                            <FaList size={18} />
                        </button>
                        <button onClick={() => setViewMode('grid')} className={`p-2.5 ${viewMode === 'grid' ? 'bg-indigo-600 text-white' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}>
                            <FaThLarge size={18} />
                        </button>
                    </div>
                    <button onClick={() => navigate(`create`)} className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-all shadow-sm font-semibold">
                        <FaPlus size={14} /> New Movement
                    </button>
                </div>
            </div>

            {/* Content Area */}
            {viewMode === 'list' ? (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs uppercase tracking-wider border-b border-gray-200 dark:border-gray-600">
                                <th className="px-6 py-4 font-semibold">Stock ID</th>
                                <th className="px-6 py-4 font-semibold">Type / Status</th>
                                <th className="px-6 py-4 font-semibold">Source & Destination</th>
                                <th className="px-6 py-4 font-semibold">Total Items</th>
                                <th className="px-6 py-4 font-semibold text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {stocks?.data?.map((stock) => (
                                <tr key={stock.stock_id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-indigo-600">#{stock.stock_id}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase border ${getStockTypeStyle(stock.stock_type?.stock_type_name)}`}>
                                            {stock.stock_type?.stock_type_name || 'N/A'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                                            <span className="font-medium">{stock.from_warehouse?.warehouse_name || '---'}</span>
                                            <FaExchangeAlt className="text-gray-300 dark:text-gray-600 text-xs" />
                                            <span className="font-medium text-indigo-600 dark:text-indigo-400">{stock.to_warehouse?.warehouse_name || '---'}</span>
                                        </div>
                                        <div className="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5 italic">{stock.description?.substring(0, 30)}...</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1.5">
                                            <span className="bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded text-gray-700 dark:text-gray-300 font-bold">{stock.stock_details?.length || 0}</span>
                                            <span className="text-gray-400 dark:text-gray-500 text-xs font-medium">SKUs</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex justify-center gap-2">
                                            <button onClick={() => navigate(`view/${stock.stock_id}`)} title="View" className="p-2 text-blue-500 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg transition-colors"><FaEye /></button>
                                            <button
                                                onClick={() => navigate(`edit/${stock.stock_id}`)}
                                                title="Edit"
                                                className="p-2 text-amber-500 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900 rounded-lg transition-colors"
                                            >
                                                <FaEdit />
                                            </button>
                                            <button onClick={() => handleDel(stock.stock_id)} title="Delete" className="p-2 text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg transition-colors"><FaTrash /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                /* Grid View Updated */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {stocks?.data?.map((stock) => (
                        <div key={stock.stock_id} className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                            <div className={`absolute top-0 right-0 h-1 w-full ${stock.stock_type?.stock_type_name?.toLowerCase().includes('in') ? 'bg-green-500' : 'bg-blue-500'}`}></div>
                            <div className="flex justify-between items-start mb-4">
                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${getStockTypeStyle(stock.stock_type?.stock_type_name)}`}>
                                    {stock.stock_type?.stock_type_name}
                                </span>
                                <div className="flex gap-1">
                                    <button onClick={() => navigate(`view/${stock.stock_id}`)} title="View" className="p-2 text-blue-500 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg transition-colors"><FaEye /></button>
                                    <button onClick={() => navigate(`edit/${stock.stock_id}`)} className="p-1.5 text-amber-500 dark:text-amber-400"><FaEdit size={14} /></button>
                                    <button onClick={() => handleDel(stock.stock_id)} className="p-1.5 text-red-500 dark:text-red-400"><FaTrash size={14} /></button>
                                </div>
                            </div>

                            <h3 className="font-bold text-gray-800 dark:text-white text-lg mb-1">Batch #{stock.stock_id}</h3>
                            <p className="text-xs text-gray-400 dark:text-gray-500 mb-4 italic truncate">{stock.description || 'No description'}</p>

                            <div className="space-y-3">
                                <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                    <div className="text-[10px] text-gray-400 dark:text-gray-500 uppercase font-bold mb-1">Movement</div>
                                    <div className="text-xs flex items-center justify-between text-gray-700 dark:text-gray-300">
                                        <span className="truncate">{stock.from_warehouse?.warehouse_name || 'N/A'}</span>
                                        <span className="mx-2 text-gray-300 dark:text-gray-600">→</span>
                                        <span className="truncate font-semibold text-indigo-600 dark:text-indigo-400">{stock.to_warehouse?.warehouse_name || 'N/A'}</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between text-sm pt-2">
                                    <span className="text-gray-500 dark:text-gray-400">Items Stored</span>
                                    <span className="font-bold text-gray-800 dark:text-white">{stock.stock_details?.length} Lines</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Pagination */}
            {stocks?.links && (
                <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Showing <span className="font-semibold text-gray-700 dark:text-gray-300">{stocks?.from || 0}</span> to <span className="font-semibold text-gray-700 dark:text-gray-300">{stocks?.to || 0}</span> of <span className="font-semibold text-gray-700 dark:text-gray-300">{stocks?.total || 0}</span> entries
                    </p>
                    <div className="flex items-center gap-1">
                        {stocks.links.map((link, index) => (
                            <button
                                key={index}
                                disabled={!link.url}
                                onClick={() => {
                                    const pageUrl = new URL(link.url);
                                    setPage(pageUrl.searchParams.get('page'));
                                }}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                                className={`px-4 py-2 text-sm rounded-lg transition-all ${link.active ? 'bg-indigo-600 text-white font-bold' : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50'}`}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default InventoryList;