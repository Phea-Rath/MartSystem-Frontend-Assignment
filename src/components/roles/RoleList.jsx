import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash, FaPlus, FaUserShield, FaUsers } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import RoleForm from './RoleForm';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '../../services/api';
import AlertQuestionBox from '../../services/AlertQuestionBox';
import { useAlert } from '../../hooks/AlertContext';
const role = {
    "message": "Roles fetched successfully.",
    "success": true,
    "data": {
        "current_page": 1,
        "data": [
            {
                "role_id": 1,
                "role_name": "Admin",
                "description": "administrator",
                "created_by": 1,
                "is_deleted": 0,
                "created_at": null,
                "updated_at": null,
                "users": [
                    {
                        "user_id": 1,
                        "role_id": 1,
                        "user_name": "Adminstrator"
                    }
                ]
            },
            {
                "role_id": 2,
                "role_name": "Owner",
                "description": "administrator",
                "created_by": 1,
                "is_deleted": 0,
                "created_at": null,
                "updated_at": null,
                "users": [
                    {
                        "user_id": 1,
                        "role_id": 1,
                        "user_name": "Adminstrator"
                    }
                ]
            },
            {
                "role_id": 3,
                "role_name": "Manager",
                "description": "administrator",
                "created_by": 1,
                "is_deleted": 0,
                "created_at": null,
                "updated_at": null,
                "users": [
                    {
                        "user_id": 1,
                        "role_id": 1,
                        "user_name": "Adminstrator"
                    }
                ]
            },
        ],
        "first_page_url": "http://127.0.0.1:8000/api/roles?page=1",
        "from": 1,
        "last_page": 1,
        "last_page_url": "http://127.0.0.1:8000/api/roles?page=1",
        "links": [
            {
                "url": null,
                "label": "&laquo; Previous",
                "page": null,
                "active": false
            },
            {
                "url": "http://127.0.0.1:8000/api/roles?page=1",
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
        "path": "http://127.0.0.1:8000/api/roles",
        "per_page": 10,
        "prev_page_url": null,
        "to": 1,
        "total": 1
    }
}
const RoleList = () => {
    const token = localStorage.getItem('token');
    const alert = useAlert();
    const queryClient = useQueryClient();

    const [showForm, setShowForm] = useState(false);
    const [rolesData, setRolesData] = useState();
    const [dataEdit, setDataEdit] = useState();
    const [page, setPage] = useState(1);
    const [delId, setDelId] = useState();
    const [isOpen, setIsOpen] = useState(false);

    // Fetch Roles
    const fetchRoles = async ({ queryKey }) => {
        const [_key, page] = queryKey;
        const res = await api.get(`roles?limit=10&page=${page}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return res.data.data;
    };

    // const { data, isPending } = useQuery({
    //     queryKey: ['roles', page],
    //     queryFn: fetchRoles,
    //     placeholderData: (previousData) => previousData,
    //     staleTime: 5000,
    // });
    const data = role.data;
    const isPending = false;

    // Delete Role
    const delRoleApi = async (id) => {
        await api.delete(`roles/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
    };

    const { mutate: deleteRole, isPending: delPending } = useMutation({
        mutationFn: delRoleApi,
        onSuccess: () => {
            setTimeout(() => {
                alert.success('Role deleted successfully!', 'Success');
            }, 200);
            queryClient.invalidateQueries({ queryKey: ['roles'] });
            setIsOpen(false);
        },
        onError: (err) => {
            alert.error('Failed to delete role', 'Error');
            console.error(err);
        }
    });

    useEffect(() => {
        if (data) setRolesData(data);
    }, [data]);

    const handleEdit = (role) => {
        setDataEdit(role);
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
                title="Delete Role"
                message="Are you sure you want to delete this role? This might affect users assigned to it."
                confirmText="Delete"
                cancelText="Cancel"
                confirmColor="danger"
                loading={delPending}
                onConfirm={() => deleteRole(delId)}
                onCancel={() => setIsOpen(false)}
            />

            <div className="p-6 mx-auto">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3 sm:gap-4">
                    <div className="min-w-0">
                        <h1 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white">User Roles</h1>
                        <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">Manage permissions and access levels ({rolesData?.total || 0} total)</p>
                    </div>
                    <button onClick={handleAddNew} className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-3 md:px-4 py-2 rounded-lg transition-colors shadow-sm font-semibold text-sm md:text-base whitespace-nowrap">
                        <FaPlus size={14} />
                        <span>Create Role</span>
                    </button>
                </div>

                {/* Table */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-700">
                                    <th className="px-3 md:px-6 py-3 md:py-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Role Name</th>
                                    <th className="hidden md:table-cell px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Description</th>
                                    <th className="hidden sm:table-cell px-3 md:px-6 py-3 md:py-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Users</th>
                                    <th className="px-3 md:px-6 py-3 md:py-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            {!isPending && (
                                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                    {rolesData?.data?.map((role) => (
                                        <tr key={role.role_id} className="hover:bg-gray-50/50 dark:hover:bg-gray-700 transition-colors">
                                            <td className="px-3 md:px-6 py-3 md:py-4">
                                                <div className="flex items-center gap-2 md:gap-3">
                                                    <div className="p-1.5 md:p-2 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg hidden md:block">
                                                        <FaUserShield size={16} />
                                                    </div>
                                                    <div className="min-w-0 flex-1">
                                                        <span className="font-bold text-gray-700 dark:text-white text-sm md:text-base">{role.role_name}</span>
                                                        <p className="md:hidden text-xs text-gray-500 dark:text-gray-400 truncate">{role.description || 'No description'}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="hidden md:table-cell px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                                                {role.description || <span className="text-gray-300 dark:text-gray-600 italic">No description</span>}
                                            </td>
                                            <td className="hidden sm:table-cell px-3 md:px-6 py-3 md:py-4">
                                                <div className="flex items-center gap-1 md:gap-2">
                                                    <span className="flex items-center justify-center w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-white dark:border-gray-800 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-bold">
                                                        {role.users?.length || 0}
                                                    </span>
                                                    <span className="hidden md:inline text-xs text-gray-400 dark:text-gray-500 font-medium">Users</span>
                                                </div>
                                            </td>
                                            <td className="px-3 md:px-6 py-3 md:py-4">
                                                <div className="flex justify-end gap-1 md:gap-2">
                                                    <button onClick={() => handleEdit(role)} className="p-1.5 md:p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                                                        <FaEdit size={14} className="md:hidden" />
                                                        <FaEdit size={16} className="hidden md:block" />
                                                    </button>
                                                    <button onClick={() => { setDelId(role.role_id); setIsOpen(true); }} className="p-1.5 md:p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                                                        <FaTrash size={14} className="md:hidden" />
                                                        <FaTrash size={16} className="hidden md:block" />
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
                    <div className="px-3 md:px-6 py-3 md:py-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
                        <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                            Showing <span className="font-semibold text-gray-800 dark:text-white">{rolesData?.data?.length || 0}</span> roles
                        </p>
                        <div className="flex gap-0.5 md:gap-1 flex-wrap justify-center sm:justify-end">
                            {rolesData?.links.map((link, index) => (
                                <button
                                    key={index}
                                    disabled={!link.url || link.active}
                                    onClick={() => handlePageChange(link.url)}
                                    className={`px-2 md:px-3 py-1 rounded border text-xs md:text-sm transition-all ${link.active
                                        ? 'bg-purple-600 text-white border-purple-600'
                                        : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50'
                                        }`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal for RoleForm */}
            <div className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${showForm ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <div className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm" onClick={() => setShowForm(false)}></div>
                <div className="relative z-10 w-full max-w-md transform transition-transform duration-300 scale-100">
                    <RoleForm data={dataEdit} onCancel={() => setShowForm(false)} />
                </div>
            </div>
        </div>
    );
};

export default RoleList;