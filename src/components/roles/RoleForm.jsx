import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState, useEffect, useRef } from 'react';
import { FaSave, FaTimes, FaUserShield } from 'react-icons/fa';
import api from '../../services/api';
import { useAlert } from '../../hooks/AlertContext';

const RoleForm = ({ data, onCancel }) => {
    const [formData, setFormData] = useState({
        role_name: '',
        description: ''
    });
    const [errors, setErrors] = useState({});
    const alert = useAlert();
    const inputRef = useRef();
    const queryClient = useQueryClient();

    // Populate form for Edit mode or reset for Create mode
    useEffect(() => {
        if (data) {
            setFormData({
                role_name: data.role_name || '',
                description: data.description || ''
            });
        } else {
            setFormData({ role_name: '', description: '' });
        }
        setErrors({});

        const focusTimer = setTimeout(() => {
            inputRef.current?.focus();
        }, 100);
        return () => clearTimeout(focusTimer);
    }, [data]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Unified API logic for Create and Update
    const saveRoleApi = async (payload) => {
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        };

        if (data?.role_id) {
            // Update existing role
            const res = await api.put(`roles/${data.role_id}`, payload, config);
            return res.data;
        } else {
            // Create new role
            const res = await api.post('roles', payload, config);
            return res.data;
        }
    };

    const { mutate: saveRole, isPending } = useMutation({
        mutationFn: saveRoleApi,
        onSuccess: () => {
            const message = data ? 'Role updated successfully' : 'Role created successfully';
            setTimeout(() => {
                alert.success(message, 'Success', { duration: 1000 });
            }, 200);
            queryClient.invalidateQueries({ queryKey: ['roles'] });
            onCancel();
        },
        onError: (err) => {
            const backendErrors = err?.response?.data?.errors;
            if (backendErrors) {
                setErrors(backendErrors);
            } else {
                console.error(err?.response?.data || err.message);
                alert.error('An error occurred while saving the role.', 'Error');
            }
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        // Client-side Validation
        if (!formData.role_name.trim()) {
            setErrors({ role_name: 'The role name field is required.' });
            return;
        }

        if (formData.role_name.length > 255) {
            setErrors({ role_name: 'Role name must not exceed 255 characters.' });
            return;
        }

        saveRole(formData);
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 p-6 w-full max-w-md mx-auto">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full">
                    <FaUserShield size={20} />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                        {data ? 'Update Role' : 'Create New Role'}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {data ? 'Modify system permissions' : 'Define a new user role'}
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Role Name */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
                        Role Name <span className="text-red-500 dark:text-red-400">*</span>
                    </label>
                    <input
                        ref={inputRef}
                        name="role_name"
                        type="text"
                        value={formData.role_name}
                        onChange={handleInputChange}
                        placeholder="e.g. Administrator"
                        className={`w-full px-4 py-2 rounded-lg border transition-all outline-none focus:ring-2 bg-white dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 ${errors.role_name
                            ? 'border-red-400 dark:border-red-500 focus:ring-red-100 dark:focus:ring-red-900'
                            : 'border-gray-300 dark:border-gray-600 focus:border-purple-500 dark:focus:border-purple-400 focus:ring-purple-100 dark:focus:ring-purple-900'
                            }`}
                    />
                    {errors.role_name && (
                        <p className="mt-1 text-xs text-red-500 dark:text-red-400 font-medium">
                            {errors.role_name}
                        </p>
                    )}
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
                        Description
                    </label>
                    <textarea
                        name="description"
                        rows="3"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Describe the responsibilities of this role..."
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 outline-none focus:border-purple-500 dark:focus:border-purple-400 focus:ring-2 focus:ring-purple-100 dark:focus:ring-purple-900 transition-all resize-none bg-white dark:bg-gray-700 dark:text-white dark:placeholder-gray-500"
                    />
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 pt-2">
                    <button
                        type="submit"
                        disabled={isPending}
                        className="flex-1 flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2.5 rounded-lg transition-colors shadow-sm disabled:bg-purple-300 dark:disabled:bg-purple-900"
                    >
                        <FaSave size={16} />
                        {isPending ? 'Saving...' : (data ? 'Update' : 'Save')}
                    </button>

                    <button
                        type="button"
                        onClick={onCancel}
                        className="flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-semibold py-2.5 px-4 rounded-lg transition-colors"
                    >
                        <FaTimes size={16} />
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RoleForm;