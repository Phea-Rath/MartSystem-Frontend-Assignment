import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState, useEffect, useRef } from 'react';
import { FaSave, FaTimes, FaLayerGroup } from 'react-icons/fa';
import api from '../../services/api';
import { useAlert } from '../../hooks/AlertContext';

const BrandForm = ({ data, onCancel }) => {
    const [brandName, setBrandName] = useState('');
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
            setBrandName(data.brand_name);
        } else {
            setBrandName('');
        }
        setErrors({});
    }, [data]);

    const createBrandApi = async (data) => {
        const res = await api.post('brands', data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        return res.data
    }

    const { mutate: createBrand, isPending } = useMutation({
        mutationKey: ['brands', 'create'],
        mutationFn: createBrandApi,

        onSuccess: () => {
            setTimeout(() => {
                alert.success('Brand created successful', 'Create Brand', {
                    duration: 1000,
                })
            }, 200)
            queryClient.invalidateQueries({ queryKey: ['brands'] });
            onCancel();
        },

        onError: (err) => {
            console.error(err?.response?.data || err.message);
        },
    });

    const updateBrandApi = async (data, { mutationKey }) => {
        const [, , id] = mutationKey;
        const res = await api.put(`brands/${id}`, data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        return res.data
    }

    const { mutate: updateBrand } = useMutation({
        mutationKey: ['brands', 'update', data?.brand_id],
        mutationFn: updateBrandApi,

        onSuccess: () => {
            setTimeout(() => {
                alert.success('Brand updated successful', 'Create Brand', {
                    duration: 1000,
                })
            }, 200)
            queryClient.invalidateQueries({ queryKey: ['brands'] });
            onCancel();
        },

        onError: (err) => {
            console.error(err?.response?.data || err.message);
        },
    });


    const handleSubmit = (e) => {
        e.preventDefault();

        // Simple Frontend Validation (Matching your Laravel Rules)
        if (!brandName.trim()) {
            setErrors({ brand_name: 'The brand name field is required.' });
            return;
        }

        if (brandName.length > 255) {
            setErrors({ brand_name: 'Brand name must not exceed 255 characters.' });
            return;
        }

        // Pass data back to parent component
        const formData = { brand_name: brandName };
        // onSave(formData, data?.brand_id);
        createBrand(formData);
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 p-6 w-full max-w-md mx-auto absolute">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 rounded-full">
                    <FaLayerGroup size={20} />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                        {data ? 'Update Brand' : 'Create New Brand'}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {data ? 'Modify the details below' : 'Add a new classification'}
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
                        Brand Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        ref={inputRef}
                        type="text"
                        value={brandName}
                        onChange={(e) => setBrandName(e.target.value)}
                        placeholder="e.g. Running Shoes"
                        className={`w-full px-4 py-2 rounded-lg border transition-all outline-none focus:ring-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${errors.brand_name
                            ? 'border-red-400 dark:border-red-500 focus:ring-red-100 dark:focus:ring-red-900'
                            : 'border-gray-300 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-indigo-100 dark:focus:ring-indigo-900'
                            }`}
                    />
                    {errors.brand_name && (
                        <p className="mt-1 text-xs text-red-500 dark:text-red-400 font-medium">
                            {errors.brand_name}
                        </p>
                    )}
                </div>

                <div className="flex items-center gap-3 pt-2">
                    <button
                        type="submit"
                        className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition-colors shadow-sm"
                    >
                        <FaSave size={16} />
                        {data ? 'Update' : 'Save'} Brand
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

export default BrandForm;