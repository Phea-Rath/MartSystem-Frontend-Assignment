import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState, useEffect, useRef } from 'react';
import { FaSave, FaTimes, FaLayerGroup } from 'react-icons/fa';
import api from '../../services/api';
import { useAlert } from '../../hooks/AlertContext';

const CategoryForm = ({ data, onCancel }) => {
    const [categoryName, setCategoryName] = useState('');
    const [errors, setErrors] = useState({});
    const alert = useAlert();
    const inputRef = useRef();

    const queryClient = useQueryClient();
    // When data changes (e.g., clicking 'Edit' in the list), 
    const focusTimer = setTimeout(() => {
        inputRef.current?.focus();
    }, 100);
    // populate the form. If null, reset the form for 'Create'.
    useEffect(() => {
        if (data) {
            setCategoryName(data.category_name);
        } else {
            setCategoryName('');
        }
        setErrors({});
    }, [data]);

    const createCategoryApi = async (data) => {
        const res = await api.post('categorys', data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        return res.data
    }

    const { mutate: createCategory, isPending } = useMutation({
        mutationKey: ['categorys', 'create'],
        mutationFn: createCategoryApi,

        onSuccess: () => {
            setTimeout(() => {
                alert.success('Category created successful', 'Create Category', {
                    duration: 1000,
                })
            }, 200)
            queryClient.invalidateQueries({ queryKey: ['categorys'] });
            onCancel();
        },

        onError: (err) => {
            console.error(err?.response?.data || err.message);
        },
    });
    const updateCategoryApi = async (data, { mutationKey }) => {
        const [, , id] = mutationKey;
        const res = await api.put(`categorys/${id}`, data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        return res.data
    }

    const { mutate: updateCategory } = useMutation({
        mutationKey: ['categorys', 'update', data?.category_id],
        mutationFn: updateCategoryApi,

        onSuccess: () => {
            setTimeout(() => {
                alert.success('Category updated successful', 'Create Category', {
                    duration: 1000,
                })
            }, 200)
            queryClient.invalidateQueries({ queryKey: ['categorys'] });
            onCancel();
        },

        onError: (err) => {
            console.error(err?.response?.data || err.message);
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        // Simple Frontend Validation (Matching your Laravel Rules)
        if (!categoryName.trim()) {
            setErrors({ category_name: 'The category name field is required.' });
            return;
        }

        if (categoryName.length > 255) {
            setErrors({ category_name: 'Category name must not exceed 255 characters.' });
            return;
        }

        // Pass data back to parent component
        const formData = { category_name: categoryName };
        data ? updateCategory(formData) : createCategory(formData);
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 p-6 w-full max-w-md mx-auto absolute">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 rounded-full">
                    <FaLayerGroup size={20} />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                        {data ? 'Update Category' : 'Create New Category'}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {data ? 'Modify the details below' : 'Add a new classification'}
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
                        Category Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        ref={inputRef}
                        type="text"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        placeholder="e.g. Running Shoes"
                        className={`w-full px-4 py-2 rounded-lg border transition-all outline-none focus:ring-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${errors.category_name
                            ? 'border-red-400 dark:border-red-500 focus:ring-red-100 dark:focus:ring-red-900'
                            : 'border-gray-300 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-indigo-100 dark:focus:ring-indigo-900'
                            }`}
                    />
                    {errors.category_name && (
                        <p className="mt-1 text-xs text-red-500 dark:text-red-400 font-medium">
                            {errors.category_name}
                        </p>
                    )}
                </div>

                <div className="flex items-center gap-3 pt-2">
                    <button
                        type="submit"
                        className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition-colors shadow-sm"
                    >
                        <FaSave size={16} />
                        {data ? 'Update' : 'Save'} Category
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

export default CategoryForm;