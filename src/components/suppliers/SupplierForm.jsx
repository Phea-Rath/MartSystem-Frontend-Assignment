import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState, useEffect, useRef } from 'react';
import { FaSave, FaTimes, FaTruckLoading } from 'react-icons/fa';
import api from '../../services/api';
import { useAlert } from '../../hooks/AlertContext';

const SupplierForm = ({ data, onCancel }) => {
    // 1. Multi-field state
    const [formData, setFormData] = useState({
        supplier_name: '',
        phone_number: '',
        email: '',
        address: ''
    });

    const [errors, setErrors] = useState({});
    const alert = useAlert();
    const inputRef = useRef();
    const queryClient = useQueryClient();

    // 2. Populate form on Edit or Reset on Create
    useEffect(() => {
        if (data) {
            setFormData({
                supplier_name: data.supplier_name || '',
                phone_number: data.phone_number || '',
                email: data.email || '',
                address: data.address || ''
            });
        } else {
            setFormData({ supplier_name: '', phone_number: '', email: '', address: '' });
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

    // --- API Functions ---
    const saveSupplierApi = async (payload) => {
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        };

        // If data exists, it's a PUT (Update), otherwise POST (Create)
        if (data?.supplier_id) {
            const res = await api.put(`suppliers/${data.supplier_id}`, payload, config);
            return res.data;
        } else {
            const res = await api.post('suppliers', payload, config);
            return res.data;
        }
    };

    // --- Mutation ---
    const { mutate: saveSupplier, isPending } = useMutation({
        mutationFn: saveSupplierApi,
        onSuccess: () => {
            const msg = data ? 'Supplier updated successfully' : 'Supplier created successfully';
            setTimeout(() => {
                alert.success(msg, 'Success', { duration: 1000 });
            }, 200);
            queryClient.invalidateQueries({ queryKey: ['suppliers'] });
            onCancel();
        },
        onError: (err) => {
            const backendErrors = err?.response?.data?.errors;
            if (backendErrors) {
                setErrors(backendErrors);
            } else {
                console.error(err.message);
            }
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};

        // Frontend Validation
        if (!formData.supplier_name.trim()) {
            newErrors.supplier_name = 'The supplier name field is required.';
        }
        if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address.';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        saveSupplier(formData);
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 w-full max-w-lg mx-auto">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full">
                    <FaTruckLoading size={20} />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                        {data ? 'Update Supplier' : 'Add New Supplier'}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Manage vendor contact information</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Supplier Name - Full Width */}
                <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
                        Supplier Name <span className="text-red-500 dark:text-red-400">*</span>
                    </label>
                    <input
                        ref={inputRef}
                        name="supplier_name"
                        type="text"
                        value={formData.supplier_name}
                        onChange={handleInputChange}
                        placeholder="e.g. Global Logistics Co."
                        className={`w-full px-4 py-2 rounded-lg border outline-none transition-all focus:ring-2 bg-white dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 ${errors.supplier_name ? 'border-red-400 dark:border-red-500 focus:ring-red-100 dark:focus:ring-red-900' : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-100 dark:focus:ring-blue-900'
                            }`}
                    />
                    {errors.supplier_name && <p className="mt-1 text-xs text-red-500 dark:text-red-400">{errors.supplier_name}</p>}
                </div>

                {/* Phone Number */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">Phone Number</label>
                    <input
                        name="phone_number"
                        type="text"
                        value={formData.phone_number}
                        onChange={handleInputChange}
                        placeholder="e.g. +1 234 567 890"
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 bg-white dark:bg-gray-700 dark:text-white dark:placeholder-gray-500"
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">Email Address</label>
                    <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="contact@supplier.com"
                        className={`w-full px-4 py-2 rounded-lg border outline-none focus:ring-2 bg-white dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 ${errors.email ? 'border-red-400 dark:border-red-500 focus:ring-red-100 dark:focus:ring-red-900' : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-100 dark:focus:ring-blue-900'
                            }`}
                    />
                    {errors.email && <p className="mt-1 text-xs text-red-500 dark:text-red-400">{errors.email}</p>}
                </div>

                {/* Address - Full Width */}
                <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">Physical Address</label>
                    <textarea
                        name="address"
                        rows="2"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Street, City, Country"
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 bg-white dark:bg-gray-700 dark:text-white dark:placeholder-gray-500"
                    />
                </div>

                {/* Actions */}
                <div className="md:col-span-2 flex items-center gap-3 mt-2">
                    <button
                        type="submit"
                        disabled={isPending}
                        className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition-colors shadow-sm disabled:bg-blue-300 dark:disabled:bg-blue-900"
                    >
                        <FaSave size={16} />
                        {isPending ? 'Processing...' : (data ? 'Update' : 'Save')}
                    </button>

                    <button
                        type="button"
                        onClick={onCancel}
                        className="flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-semibold py-2.5 px-6 rounded-lg transition-colors"
                    >
                        <FaTimes size={16} />
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SupplierForm;