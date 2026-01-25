import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState, useEffect, useRef } from 'react';
import { FaSave, FaTimes, FaWarehouse } from 'react-icons/fa';
import api from '../../services/api';
import { useAlert } from '../../hooks/AlertContext';

const WarehouseForm = ({ data, onCancel }) => {
    const [warehouseName, setWarehouseName] = useState('');
    const [isActive, setIsActive] = useState(1); // Default to active (1)
    const [errors, setErrors] = useState({});
    const alert = useAlert();
    const inputRef = useRef();

    const queryClient = useQueryClient();

    // Populate form on edit or reset on create
    useEffect(() => {
        if (data) {
            setWarehouseName(data.warehouse_name || '');
            setIsActive(data.is_active ?? 1);
        } else {
            setWarehouseName('');
            setIsActive(1);
        }
        setErrors({});

        const focusTimer = setTimeout(() => {
            inputRef.current?.focus();
        }, 100);
        return () => clearTimeout(focusTimer);
    }, [data]);

    // Create Warehouse Mutation
    const { mutate: createWarehouse, isPending: isCreating } = useMutation({
        mutationFn: async (payload) => {
            const res = await api.post('warehouses', payload, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            return res.data;
        },
        onSuccess: () => {
            alert.success('Warehouse created successfully', 'Create Warehouse');
            queryClient.invalidateQueries({ queryKey: ['warehouses'] });
            onCancel();
        },
        onError: (err) => {
            setErrors(err?.response?.data?.errors || {});
            console.error(err?.response?.data || err.message);
        },
    });

    // Update Warehouse Mutation
    const { mutate: updateWarehouse, isPending: isUpdating } = useMutation({
        mutationFn: async (payload) => {
            const res = await api.put(`warehouses/${data.warehouse_id}`, payload, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            return res.data;
        },
        onSuccess: () => {
            alert.success('Warehouse updated successfully', 'Update Warehouse');
            queryClient.invalidateQueries({ queryKey: ['warehouses'] });
            onCancel();
        },
        onError: (err) => {
            setErrors(err?.response?.data?.errors || {});
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};

        // --- Frontend Validation ---
        if (!warehouseName.trim()) {
            newErrors.warehouse_name = 'The warehouse name field is required.';
        } else if (warehouseName.length > 255) {
            newErrors.warehouse_name = 'Warehouse name must not exceed 255 characters.';
        }

        if (isActive === undefined || isActive === null) {
            newErrors.is_active = 'The status field is required.';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const formData = {
            warehouse_name: warehouseName,
            is_active: parseInt(isActive)
        };

        if (data) {
            updateWarehouse(formData);
        } else {
            createWarehouse(formData);
        }
    };

    const isPending = isCreating || isUpdating;

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 p-6 w-full max-w-md mx-auto absolute">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full">
                    <FaWarehouse size={20} />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                        {data ? 'Update Warehouse' : 'Create New Warehouse'}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {data ? 'Modify the warehouse settings' : 'Add a new storage location'}
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Warehouse Name */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
                        Warehouse Name <span className="text-red-500 dark:text-red-400">*</span>
                    </label>
                    <input
                        ref={inputRef}
                        type="text"
                        value={warehouseName}
                        onChange={(e) => setWarehouseName(e.target.value)}
                        placeholder="e.g. Main Central Warehouse"
                        className={`w-full px-4 py-2 rounded-lg border transition-all outline-none focus:ring-2 bg-white dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 ${errors.warehouse_name
                            ? 'border-red-400 dark:border-red-500 focus:ring-red-100 dark:focus:ring-red-900'
                            : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-100 dark:focus:ring-blue-900'
                            }`}
                    />
                    {errors.warehouse_name && (
                        <p className="mt-1 text-xs text-red-500 dark:text-red-400 font-medium">
                            {Array.isArray(errors.warehouse_name) ? errors.warehouse_name[0] : errors.warehouse_name}
                        </p>
                    )}
                </div>

                {/* Is Active Status */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
                        Status <span className="text-red-500 dark:text-red-400">*</span>
                    </label>
                    <select
                        value={isActive}
                        onChange={(e) => setIsActive(e.target.value)}
                        className={`w-full px-4 py-2 rounded-lg border transition-all outline-none focus:ring-2 bg-white dark:bg-gray-700 dark:text-white ${errors.is_active
                            ? 'border-red-400 dark:border-red-500 focus:ring-red-100 dark:focus:ring-red-900'
                            : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-100 dark:focus:ring-blue-900'
                            }`}
                    >
                        <option value={1} className="bg-white dark:bg-gray-700">Active</option>
                        <option value={0} className="bg-white dark:bg-gray-700">Inactive</option>
                    </select>
                    {errors.is_active && (
                        <p className="mt-1 text-xs text-red-500 dark:text-red-400 font-medium">
                            {Array.isArray(errors.is_active) ? errors.is_active[0] : errors.is_active}
                        </p>
                    )}
                </div>

                <div className="flex items-center gap-3 pt-2">
                    <button
                        type="submit"
                        disabled={isPending}
                        className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors shadow-sm disabled:opacity-50"
                    >
                        <FaSave size={16} />
                        {isPending ? 'Saving...' : data ? 'Update' : 'Save'} Warehouse
                    </button>

                    <button
                        type="button"
                        onClick={onCancel}
                        className="flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-semibold py-2 px-4 rounded-lg transition-colors"
                    >
                        <FaTimes size={16} />
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default WarehouseForm;