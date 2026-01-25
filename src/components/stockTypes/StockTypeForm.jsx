import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState, useEffect, useRef } from 'react';
import { FaSave, FaTimes, FaBoxes } from 'react-icons/fa'; // Changed icon for Stock Type
import api from '../../services/api';
import { useAlert } from '../../hooks/AlertContext';

const StockTypeForm = ({ data, onCancel }) => {
    const [stockTypeName, setStockTypeName] = useState('');
    const [errors, setErrors] = useState({});
    const alert = useAlert();
    const inputRef = useRef();
    const queryClient = useQueryClient();

    // Reset and focus logic
    useEffect(() => {
        if (data) {
            setStockTypeName(data.stock_type_name || '');
        } else {
            setStockTypeName('');
        }
        setErrors({});
        const focusTimer = setTimeout(() => inputRef.current?.focus(), 100);
        return () => clearTimeout(focusTimer);
    }, [data]);

    // Create Mutation
    const { mutate: createStockType, isPending: isCreating } = useMutation({
        mutationFn: async (payload) => {
            const res = await api.post('stock-types', payload, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            return res.data;
        },
        onSuccess: () => {
            alert.success('Stock Type created successfully', 'Success');
            queryClient.invalidateQueries({ queryKey: ['stock_types'] });
            onCancel();
        },
        onError: (err) => {
            // Handle Laravel backend validation errors (like unique constraint)
            setErrors(err?.response?.data?.errors || { stock_type_name: 'Server error occurred' });
        }
    });

    // Update Mutation
    const { mutate: updateStockType, isPending: isUpdating } = useMutation({
        mutationFn: async (payload) => {
            const res = await api.put(`stock-types/${data.stock_type_id}`, payload, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            return res.data;
        },
        onSuccess: () => {
            alert.success('Stock Type updated successfully', 'Success');
            queryClient.invalidateQueries({ queryKey: ['stock_types'] });
            onCancel();
        },
        onError: (err) => {
            setErrors(err?.response?.data?.errors || { stock_type_name: 'Server error occurred' });
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({}); // Clear previous errors

        // --- Frontend Validation ---
        const newErrors = {};

        if (!stockTypeName.trim()) {
            newErrors.stock_type_name = 'The stock type name field is required.';
        } else if (stockTypeName.length > 255) {
            newErrors.stock_type_name = 'Stock type name must not exceed 255 characters.';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const payload = { stock_type_name: stockTypeName };

        if (data) {
            updateStockType(payload);
        } else {
            createStockType(payload);
        }
    };

    const isLoading = isCreating || isUpdating;

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 p-6 w-full max-w-md mx-auto">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full">
                    <FaBoxes size={20} />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                        {data ? 'Edit Stock Type' : 'New Stock Type'}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Define how items are categorized in stock
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
                        Stock Type Name <span className="text-red-500 dark:text-red-400">*</span>
                    </label>
                    <input
                        ref={inputRef}
                        type="text"
                        value={stockTypeName}
                        onChange={(e) => {
                            setStockTypeName(e.target.value);
                            if (errors.stock_type_name) setErrors({}); // Clear error on type
                        }}
                        placeholder="e.g. Raw Material, Finished Goods"
                        disabled={isLoading}
                        className={`w-full px-4 py-2 rounded-lg border transition-all outline-none focus:ring-2 bg-white dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 ${errors.stock_type_name
                            ? 'border-red-400 dark:border-red-500 focus:ring-red-100 dark:focus:ring-red-900 bg-red-50 dark:bg-red-900/20'
                            : 'border-gray-300 dark:border-gray-600 focus:border-emerald-500 dark:focus:border-emerald-400 focus:ring-emerald-100 dark:focus:ring-emerald-900'
                            }`}
                    />
                    {errors.stock_type_name && (
                        <p className="mt-1 text-xs text-red-500 dark:text-red-400 font-medium italic">
                            {Array.isArray(errors.stock_type_name) ? errors.stock_type_name[0] : errors.stock_type_name}
                        </p>
                    )}
                </div>

                <div className="flex items-center gap-3 pt-2">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 rounded-lg transition-all shadow-sm active:scale-95 disabled:opacity-70"
                    >
                        <FaSave size={16} />
                        {isLoading ? 'Processing...' : data ? 'Update Type' : 'Save Type'}
                    </button>

                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={isLoading}
                        className="flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-semibold py-2.5 px-5 rounded-lg transition-colors disabled:opacity-50"
                    >
                        <FaTimes size={16} />
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default StockTypeForm;