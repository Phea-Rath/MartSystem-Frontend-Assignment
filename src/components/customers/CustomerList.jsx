import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash, FaPlus, FaTruck, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '../../services/api';
import AlertQuestionBox from '../../services/AlertQuestionBox';
import { useAlert } from '../../hooks/AlertContext';
import CustomerForm from './CustomerForm';

const customer = {
    "message": "Customers fetched successfully.",
    "success": true,
    "data": {
        "current_page": 1,
        "data": [
            {
                "customer_id": 2,
                "customer_name": "Ty Rothana",
                "phone_number": "0887435655",
                "email": "admin@gmail.com",
                "address": "11.570153391546638, 104.86302700073864",
                "created_by": 1,
                "is_deleted": 0,
                "created_at": "2026-01-24T13:56:09.000000Z",
                "updated_at": "2026-01-24T13:56:09.000000Z"
            },
            {
                "customer_id": 1,
                "customer_name": "Unknows",
                "phone_number": null,
                "email": null,
                "address": null,
                "created_by": 1,
                "is_deleted": 0,
                "created_at": "2026-01-24T09:53:00.000000Z",
                "updated_at": "2026-01-24T09:53:00.000000Z"
            }
        ],
        "first_page_url": "http://127.0.0.1:8000/api/customers?page=1",
        "from": 1,
        "last_page": 1,
        "last_page_url": "http://127.0.0.1:8000/api/customers?page=1",
        "links": [
            {
                "url": null,
                "label": "&laquo; Previous",
                "page": null,
                "active": false
            },
            {
                "url": "http://127.0.0.1:8000/api/customers?page=1",
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
        "path": "http://127.0.0.1:8000/api/customers",
        "per_page": 10,
        "prev_page_url": null,
        "to": 2,
        "total": 2
    }
}

const CustomerList = () => {
    const token = localStorage.getItem('token');
    const alert = useAlert();
    const queryClient = useQueryClient();

    const [showForm, setShowForm] = useState(false);
    const [customers, setCustomers] = useState();
    const [dataEdit, setDataEdit] = useState(null);
    const [page, setPage] = useState(1);
    const [delId, setDelId] = useState();
    const [isOpen, setIsOpen] = useState(false);

    // Fetch Customers API
    const fetchCustomers = async ({ queryKey }) => {
        const [_key, page] = queryKey;
        const res = await api.get(`customers?limit=10&page=${page}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return res.data.data; // Accesses the nested data object from your JSON
    };

    // const { data, isPending } = useQuery({
    //     queryKey: ['customers', page],
    //     queryFn: fetchCustomers,
    //     placeholderData: (previousData) => previousData, // smooth pagination
    //     staleTime: 5000,
    // });
    const data = customer.data;
    const isPending = false;

    // Delete Customer API
    const delCustomerApi = async (id) => {
        const res = await api.delete(`customers/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return res.data;
    };

    const { mutate: deleteCustomer, isPending: delPending } = useMutation({
        mutationKey: ['customers', 'delete'],
        mutationFn: delCustomerApi,
        onSuccess: () => {
            setTimeout(() => {
                alert.success('Customer deleted successfully!', 'Delete Customer', { duration: 1000 });
            }, 200);
            queryClient.invalidateQueries({ queryKey: ['customers'] });
            setIsOpen(false);
        },
        onError: (err) => {
            console.error(err?.response?.data || err?.message);
            alert.error('Failed to delete customer!', 'Error');
        }
    });

    useEffect(() => {
        if (data) setCustomers(data);
    }, [data]);

    const handleEdit = (customer) => {
        setDataEdit(customer);
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
                title="Delete Customer"
                message="Are you sure you want to delete this customer? This action cannot be undone."
                confirmText="Delete"
                cancelText="Cancel"
                confirmColor="danger"
                loading={delPending}
                onConfirm={() => deleteCustomer(delId)}
                onCancel={() => setIsOpen(false)}
            />

            <div className="p-6 mx-auto">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Customers</h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Manage your vendor relationships ({customers?.total || 0} total)</p>
                    </div>
                    <button onClick={handleAddNew} className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors shadow-sm font-semibold">
                        <FaPlus size={14} />
                        <span>Add Customer</span>
                    </button>
                </div>

                {/* Table */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-700">
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Customer</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Contact Info</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Address</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            {!isPending && (
                                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                    {customers?.data?.map((item) => (
                                        <tr key={item.customer_id} className="hover:bg-gray-50/50 dark:hover:bg-gray-700 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
                                                        <FaTruck size={18} />
                                                    </div>
                                                    <div>
                                                        <span className="block font-bold text-gray-800 dark:text-white">{item.customer_name}</span>
                                                        <span className="text-[10px] text-gray-400 dark:text-gray-500 font-mono uppercase">ID: {item.customer_id}</span>
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
                                                    <button onClick={() => handleEdit(item)} className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-lg transition-colors border border-transparent hover:border-blue-100 dark:hover:border-blue-700">
                                                        <FaEdit size={16} />
                                                    </button>
                                                    <button onClick={() => { setDelId(item.customer_id); setIsOpen(true); }} className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-gray-700 rounded-lg transition-colors border border-transparent hover:border-red-100 dark:hover:border-red-700">
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
                            Showing <span className="font-bold text-gray-700 dark:text-white">{customers?.from || 0}</span> to <span className="font-bold text-gray-700 dark:text-white">{customers?.to || 0}</span> of {customers?.total || 0} customers
                        </p>
                        <div className="flex gap-1">
                            {customers?.links.map((link, index) => (
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
            </div>

            {/* Modal Overlay for Form */}
            {showForm && (
                <div className="fixed inset-0 z-50 bg-black/60 dark:bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="w-full max-w-lg animate-in zoom-in-95 duration-200">
                        <CustomerForm
                            data={dataEdit}
                            onCancel={() => setShowForm(false)}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomerList;