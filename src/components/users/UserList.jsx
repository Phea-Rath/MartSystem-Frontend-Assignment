import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash, FaPlus, FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import UserForm from './UserForm'; // Ensure you have this component
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '../../services/api';
import AlertQuestionBox from '../../services/AlertQuestionBox';
import { useAlert } from '../../hooks/AlertContext';

const user = {
    "response_code": 200,
    "status": "success",
    "message": "Fetched user list successfully",
    "data_user_list": {
        "current_page": 1,
        "data": [
            {
                "user_id": 1,
                "profile_id": 1,
                "role_id": 1,
                "user_name": "Adminstrator",
                "image": null,
                "phone_number": "0979797977",
                "email": "admin@example.com",
                "created_by": null,
                "is_active": 1,
                "login_at": null,
                "is_deleted": 0,
                "email_verified_at": null,
                "created_at": null,
                "updated_at": null,
                "image_url": null,
                "role": {
                    "role_id": 1,
                    "role_name": "Admin"
                }
            }
        ],
        "first_page_url": "http://127.0.0.1:8000/api/users?page=1",
        "from": 1,
        "last_page": 1,
        "last_page_url": "http://127.0.0.1:8000/api/users?page=1",
        "links": [
            {
                "url": null,
                "label": "&laquo; Previous",
                "page": null,
                "active": false
            },
            {
                "url": "http://127.0.0.1:8000/api/users?page=1",
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
        "path": "http://127.0.0.1:8000/api/users",
        "per_page": 10,
        "prev_page_url": null,
        "to": 1,
        "total": 1
    }
}

const UserList = () => {
    const token = localStorage.getItem('token');
    const alert = useAlert();
    const queryClient = useQueryClient();

    const [showForm, setShowForm] = useState(false);
    const [dataEdit, setDataEdit] = useState(null);
    const [page, setPage] = useState(1);
    const [delId, setDelId] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    // Fetch Users based on your JSON structure: res.data.data_user_list
    const fetchUsers = async ({ queryKey }) => {
        const [_key, pageNum] = queryKey;
        const res = await api.get(`users?limit=10&page=${pageNum}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return res.data.data_user_list;
    };

    // const { data: userListData, isPending, refetch } = useQuery({
    //     queryKey: ['users', page],
    //     queryFn: fetchUsers,
    //     keepPreviousData: true,
    //     staleTime: 5000,
    // });
    const userListData = user.data_user_list;
    const isPending = false;

    // Delete User Mutation
    const delUserApi = async (id) => {
        return await api.delete(`users/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
    };

    const { mutate: deleteUser, isPending: delPending } = useMutation({
        mutationFn: delUserApi,
        onSuccess: () => {
            alert.success('User deleted successfully!', 'Delete User');
            queryClient.invalidateQueries({ queryKey: ['users'] });
            setIsOpen(false);
        },
        onError: () => {
            alert.error('Failed to delete user!', 'Delete Error');
        }
    });

    const handleDel = (id) => {
        setDelId(id);
        setIsOpen(true);
    };

    const handleEdit = (user) => {
        setDataEdit(user);
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
                title="Delete User"
                message="Are you sure you want to delete this user? This action cannot be undone."
                confirmText="Delete"
                cancelText="Cancel"
                confirmColor="danger"
                loading={delPending}
                onConfirm={() => deleteUser(delId)}
                onCancel={() => setIsOpen(false)}
            />

            <div className="p-6 mx-auto">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">User Management</h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Manage staff accounts and permissions ({userListData?.total || 0} total)
                        </p>
                    </div>
                    <button
                        onClick={() => { setDataEdit(null); setShowForm(true); }}
                        className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors shadow-sm"
                    >
                        <FaPlus size={14} />
                        <span>Add New User</span>
                    </button>
                </div>

                {/* Table Container */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-700">
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300">User</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300">Contact</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300">Role</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300">Status</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                {!isPending && userListData?.data?.map((user) => (
                                    <tr key={user.user_id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                {user.image_url ? (
                                                    <img
                                                        src={user.image_url}
                                                        alt={user.user_name}
                                                        className="w-10 h-10 rounded-full object-cover border border-gray-200 dark:border-gray-600"
                                                    />
                                                ) : (
                                                    <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                                                        <FaUserCircle size={24} />
                                                    </div>
                                                )}
                                                <div>
                                                    <div className="font-medium text-gray-800 dark:text-white">{user.user_name}</div>
                                                    <div className="text-xs text-gray-400 dark:text-gray-500">ID: #{user.user_id}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-700 dark:text-gray-300">{user.email}</div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400">{user.phone_number}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border border-blue-100 dark:border-blue-700">
                                                {user.role?.role_name || 'N/A'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium ${user.is_active ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                                                }`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${user.is_active ? 'bg-green-600 dark:bg-green-400' : 'bg-gray-400 dark:bg-gray-500'}`}></span>
                                                {user.is_active ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex justify-end gap-2">
                                                <button onClick={() => handleEdit(user)} className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-md transition-colors">
                                                    <FaEdit size={16} />
                                                </button>
                                                <button onClick={() => handleDel(user.user_id)} className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-gray-700 rounded-md transition-colors">
                                                    <FaTrash size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Footer */}
                    <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Showing <span className="font-semibold text-gray-800 dark:text-white">{userListData?.data.length || 0}</span> results
                        </p>
                        <div className="flex gap-1">
                            {userListData?.links?.map((link, index) => (
                                <button
                                    key={index}
                                    disabled={!link.url || link.active}
                                    onClick={() => handlePageChange(link.url)}
                                    className={`px-3 py-1 rounded border text-sm transition-all ${link.active
                                        ? 'bg-indigo-600 text-white border-indigo-600'
                                        : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50'
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
                <div className="fixed inset-0 z-50 bg-black/50 dark:bg-black/60 flex items-center justify-center p-4">
                    <UserForm
                        data={dataEdit}
                        onCancel={() => setShowForm(false)}
                    />
                </div>
            )}
        </div>
    );
};

export default UserList;