import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash, FaPlus, FaTruck, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '../../services/api';
import AlertQuestionBox from '../../services/AlertQuestionBox';
import { useAlert } from '../../hooks/AlertContext';
import SupplierForm from './SupplierForm';
const supplier = {
    "message": "Suppliers fetched successfully.",
    "success": true,
    "data": {
        "current_page": 1,
        "data": [
            {
                "supplier_id": 1,
                "supplier_name": "Micro Market",
                "phone_number": "0887435655",
                "email": "micro@gmail.com",
                "address": "SOS#567, Phnom Penh Thmey, Phnom Penh",
                "created_by": 1,
                "is_deleted": 0,
                "created_at": "2026-01-24T13:28:15.000000Z",
                "updated_at": "2026-01-24T13:28:15.000000Z"
            }
        ],
        "first_page_url": "http://127.0.0.1:8000/api/suppliers?page=1",
        "from": 1,
        "last_page": 1,
        "last_page_url": "http://127.0.0.1:8000/api/suppliers?page=1",
        "links": [
            {
                "url": null,
                "label": "&laquo; Previous",
                "page": null,
                "active": false
            },
            {
                "url": "http://127.0.0.1:8000/api/suppliers?page=1",
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
        "path": "http://127.0.0.1:8000/api/suppliers",
        "per_page": 10,
        "prev_page_url": null,
        "to": 1,
        "total": 1
    }
}

const SupplierList = () => {
    const token = localStorage.getItem('token');
    const alert = useAlert();
    const queryClient = useQueryClient();

    const [showForm, setShowForm] = useState(false);
    const [suppliers, setSuppliers] = useState();
    const [dataEdit, setDataEdit] = useState(null);
    const [page, setPage] = useState(1);
    const [delId, setDelId] = useState();
    const [isOpen, setIsOpen] = useState(false);

    // Fetch Suppliers API
    const fetchSuppliers = async ({ queryKey }) => {
        const [_key, page] = queryKey;
        const res = await api.get(`suppliers?limit=10&page=${page}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return res.data.data; // Accesses the nested data object from your JSON
    };

    // const { data, isPending } = useQuery({
    //     queryKey: ['suppliers', page],
    //     queryFn: fetchSuppliers,
    //     placeholderData: (previousData) => previousData, // smooth pagination
    //     staleTime: 5000,
    // });
    const data = supplier.data;
    const isPending = false;

    // Delete Supplier API
    const delSupplierApi = async (id) => {
        const res = await api.delete(`suppliers/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return res.data;
    };

    const { mutate: deleteSupplier, isPending: delPending } = useMutation({
        mutationKey: ['suppliers', 'delete'],
        mutationFn: delSupplierApi,
        onSuccess: () => {
            setTimeout(() => {
                alert.success('Supplier deleted successfully!', 'Delete Supplier', { duration: 1000 });
            }, 200);
            queryClient.invalidateQueries({ queryKey: ['suppliers'] });
            setIsOpen(false);
        },
        onError: (err) => {
            console.error(err?.response?.data || err?.message);
            alert.error('Failed to delete supplier!', 'Error');
        }
    });

    useEffect(() => {
        if (data) setSuppliers(data);
    }, [data]);

    const handleEdit = (supplier) => {
        setDataEdit(supplier);
        setShowForm(true);
    };

    const handleAddNew = () => {
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
                title="Delete Supplier"
                message="Are you sure you want to delete this supplier? This action cannot be undone."
                confirmText="Delete"
                cancelText="Cancel"
                confirmColor="danger"
                loading={delPending}
                onConfirm={() => deleteSupplier(delId)}
                onCancel={() => setIsOpen(false)}
            />

            <div className="p-3 sm:p-6 mx-auto max-w-full">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-3 sm:gap-4">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">Suppliers</h1>
                        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Manage your vendor relationships ({suppliers?.total || 0} total)</p>
                    </div>
                    <button onClick={handleAddNew} className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 dark:hover:bg-indigo-800 text-white px-3 sm:px-4 py-2 rounded-lg transition-colors shadow-sm font-semibold text-sm sm:text-base w-full sm:w-auto">
                        <FaPlus size={14} />
                        <span>Add Supplier</span>
                    </button>
                </div>

                {/* Desktop Table */}
                <div className="hidden md:block bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-700">
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Supplier</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Contact Info</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Address</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            {!isPending && (
                                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                    {suppliers?.data?.map((item) => (
                                        <tr key={item.supplier_id} className="hover:bg-gray-50/50 dark:hover:bg-gray-700 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
                                                        <FaTruck size={18} />
                                                    </div>
                                                    <div>
                                                        <span className="block font-bold text-gray-800 dark:text-white">{item.supplier_name}</span>
                                                        <span className="text-[10px] text-gray-400 dark:text-gray-500 font-mono uppercase">ID: {item.supplier_id}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                                        <FaPhoneAlt size={12} className="text-gray-400 dark:text-gray-500" /> {item.phone_number || 'N/A'}
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                                        <FaEnvelope size={12} className="text-gray-400 dark:text-gray-500" /> {item.email || 'N/A'}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-start gap-2 max-w-xs">
                                                    <FaMapMarkerAlt size={14} className="text-red-400 dark:text-red-500 mt-1 flex-shrink-0" />
                                                    <span className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{item.address || 'No address provided'}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex justify-end gap-2">
                                                    <button onClick={() => handleEdit(item)} className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-lg transition-colors border border-transparent hover:border-blue-100 dark:hover:border-blue-700 dark:hover:bg-gray-700">
                                                        <FaEdit size={16} />
                                                    </button>
                                                    <button onClick={() => { setDelId(item.supplier_id); setIsOpen(true); }} className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-gray-700 rounded-lg transition-colors border border-transparent hover:border-red-100 dark:hover:border-red-700 dark:hover:bg-gray-700">
                                                        <FaTrash size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            )}
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
                        <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                            Showing <span className="font-bold text-gray-700 dark:text-white">{suppliers?.from || 0}</span> to <span className="font-bold text-gray-700 dark:text-white">{suppliers?.to || 0}</span> of {suppliers?.total || 0} suppliers
                        </p>
                        <div className="flex gap-1">
                            {suppliers?.links.map((link, index) => (
                                <button
                                    key={index}
                                    disabled={!link.url || link.active}
                                    onClick={() => handlePageChange(link.url)}
                                    className={`px-3 py-1.5 rounded-md border text-xs font-semibold transition-all ${link.active
                                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                                        : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-40'
                                        }`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden space-y-3">
                    {!isPending && suppliers?.data?.map((item) => (
                        <div key={item.supplier_id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
                            <div className="flex items-start gap-3 mb-4">
                                <div className="p-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
                                    <FaTruck size={16} />
                                </div>
                                <div className="flex-1">
                                    <p className="font-semibold text-gray-800 dark:text-white">{item.supplier_name}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">ID: #{item.supplier_id}</p>
                                </div>
                            </div>
                            <div className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700 space-y-2">
                                <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                                    <FaPhoneAlt size={12} className="text-gray-400 dark:text-gray-500" />
                                    <span>{item.phone_number || 'N/A'}</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                                    <FaEnvelope size={12} className="text-gray-400 dark:text-gray-500" />
                                    <span>{item.email || 'N/A'}</span>
                                </div>
                                <div className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-400">
                                    <FaMapMarkerAlt size={12} className="text-red-400 dark:text-red-500 mt-0.5 flex-shrink-0" />
                                    <span className="line-clamp-1">{item.address || 'No address'}</span>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleEdit(item)}
                                    className="flex-1 flex items-center justify-center gap-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 p-2 rounded-lg text-xs font-medium transition-colors hover:bg-blue-100 dark:hover:bg-blue-900/50"
                                >
                                    <FaEdit size={14} />
                                    <span>Edit</span>
                                </button>
                                <button
                                    onClick={() => { setDelId(item.supplier_id); setIsOpen(true); }}
                                    className="flex-1 flex items-center justify-center gap-2 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-2 rounded-lg text-xs font-medium transition-colors hover:bg-red-100 dark:hover:bg-red-900/50"
                                >
                                    <FaTrash size={14} />
                                    <span>Delete</span>
                                </button>
                            </div>
                        </div>
                    ))}

                    {/* Mobile Pagination */}
                    {suppliers?.links && (
                        <div className="flex gap-1 justify-center mt-4">
                            {suppliers?.links.map((link, index) => (
                                <button
                                    key={index}
                                    disabled={!link.url || link.active}
                                    onClick={() => handlePageChange(link.url)}
                                    className={`px-2 py-1 rounded border text-xs transition-all ${link.active
                                        ? 'bg-indigo-600 text-white border-indigo-600'
                                        : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50'
                                        }`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Modal Overlay for Form */}
            {showForm && (
                <div className="fixed inset-0 z-50 bg-black/60 dark:bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="w-full max-w-lg animate-in zoom-in-95 duration-200">
                        <SupplierForm
                            data={dataEdit}
                            onCancel={() => setShowForm(false)}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default SupplierList;