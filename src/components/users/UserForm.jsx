import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState, useEffect, useRef } from 'react';
import { FaSave, FaTimes, FaUserPlus, FaImage, FaTrash } from 'react-icons/fa';
import api from '../../services/api';
import { useAlert } from '../../hooks/AlertContext';

const UserForm = ({ data, onCancel }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone_number: '',
        password: '',
        confirm_password: '',
        role_id: '',
        image: null
    });

    const [preview, setPreview] = useState(null);
    const [errors, setErrors] = useState({});
    const alert = useAlert();
    const inputRef = useRef();
    const queryClient = useQueryClient();

    const { data: roles } = useQuery({
        queryKey: ['roles_list'],
        queryFn: async () => {
            const res = await api.get('roles', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            return res.data.data.data;
        }
    });

    useEffect(() => {
        if (data) {
            setFormData({
                name: data.user_name || '',
                email: data.email || '',
                phone_number: data.phone_number || '',
                role_id: data.role_id || '',
                password: '',
                confirm_password: '',
                image: null
            });
            setPreview(data.image_url || null);
        } else {
            setFormData({ name: '', email: '', phone_number: '', password: '', confirm_password: '', role_id: '', image: null });
            setPreview(null);
        }
        setErrors({});
        setTimeout(() => inputRef.current?.focus(), 100);
    }, [data]);

    // Validation Logic
    const validate = () => {
        let newErrors = {};

        if (!formData.name.trim()) newErrors.name = ['Name is required'];

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email) {
            newErrors.email = ['Email is required'];
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = ['Please enter a valid email address'];
        }

        if (!formData.phone_number) newErrors.phone_number = ['Phone number is required'];
        if (!formData.role_id) newErrors.role_id = ['Please select a role'];

        // Password validation (only required for new users)
        if (!data) {
            if (!formData.password) {
                newErrors.password = ['Password is required'];
            } else if (formData.password.length < 6) {
                newErrors.password = ['Password must be at least 6 characters'];
            }

            if (formData.password !== formData.confirm_password) {
                newErrors.confirm_password = ['Passwords do not match'];
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user starts typing again
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                alert.error("File is too large. Max 2MB allowed.", "Validation Error");
                return;
            }
            setFormData(prev => ({ ...prev, image: file }));
            setPreview(URL.createObjectURL(file));
        }
    };

    const removeImage = () => {
        setFormData(prev => ({ ...prev, image: null }));
        setPreview(null);
    };

    const saveUserApi = async (payload) => {
        const body = new FormData();
        Object.keys(payload).forEach(key => {
            if (payload[key] !== null && payload[key] !== '') body.append(key, payload[key]);
        });

        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'multipart/form-data'
            }
        };

        if (data?.user_id) {
            body.append('_method', 'POST');
            return (await api.post(`users/${data.user_id}`, body, config)).data;
        }
        return (await api.post('register', body, config)).data;
    };

    const { mutate: saveUser, isPending } = useMutation({
        mutationFn: saveUserApi,
        onSuccess: () => {
            alert.success(data ? 'User updated successfully' : 'User created successfully', 'Success');
            queryClient.invalidateQueries({ queryKey: ['users'] });
            onCancel();
        },
        onError: (err) => {
            setErrors(err?.response?.data?.errors || { general: ['Something went wrong'] });
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            saveUser(formData);
        } else {
            setTimeout(() => {
                alert.error("Please fix the errors in the form.", "Validation Failed", {
                    duration: 4000,
                });
            }, 200);
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 p-6 w-full max-w-lg mx-auto overflow-y-auto max-h-[90vh]">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full">
                    <FaUserPlus size={20} />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">{data ? 'Edit User' : 'New User Account'}</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Enter user credentials and assign roles</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">Full Name *</label>
                    <input
                        ref={inputRef}
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 rounded-lg border outline-none transition-all bg-white dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 ${errors.name ? 'border-red-500 dark:border-red-500 bg-red-50 dark:bg-red-900/20' : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900'}`}
                    />
                    {errors.name && <p className="text-xs text-red-500 dark:text-red-400 mt-1 font-medium">{errors.name[0]}</p>}
                </div>

                {/* Email */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">Email Address *</label>
                    <input
                        name="email"
                        type="text"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 rounded-lg border outline-none transition-all bg-white dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 ${errors.email ? 'border-red-500 dark:border-red-500 bg-red-50 dark:bg-red-900/20' : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900'}`}
                    />
                    {errors.email && <p className="text-xs text-red-500 dark:text-red-400 mt-1 font-medium">{errors.email[0]}</p>}
                </div>

                {/* Phone */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">Phone Number *</label>
                    <input
                        name="phone_number"
                        type="text"
                        value={formData.phone_number}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 rounded-lg border outline-none transition-all bg-white dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 ${errors.phone_number ? 'border-red-500 dark:border-red-500 bg-red-50 dark:bg-red-900/20' : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900'}`}
                    />
                    {errors.phone_number && <p className="text-xs text-red-500 dark:text-red-400 mt-1 font-medium">{errors.phone_number[0]}</p>}
                </div>

                {/* Role */}
                <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">Assign Role *</label>
                    <select
                        name="role_id"
                        value={formData.role_id}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 rounded-lg border outline-none transition-all bg-white dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 ${errors.role_id ? 'border-red-500 dark:border-red-500 bg-red-50 dark:bg-red-900/20' : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900'}`}
                    >
                        <option value="" className="bg-white dark:bg-gray-700">Select a role</option>
                        {roles?.map(role => (
                            <option key={role.role_id} value={role.role_id} className="bg-white dark:bg-gray-700">{role.role_name}</option>
                        ))}
                    </select>
                    {errors.role_id && <p className="text-xs text-red-500 dark:text-red-400 mt-1 font-medium">{errors.role_id[0]}</p>}
                </div>

                {/* Passwords */}
                {!data && (
                    <>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">Password *</label>
                            <input
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                className={`w-full px-4 py-2 rounded-lg border outline-none transition-all bg-white dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 ${errors.password ? 'border-red-500 dark:border-red-500 bg-red-50 dark:bg-red-900/20' : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900'}`}
                            />
                            {errors.password && <p className="text-xs text-red-500 dark:text-red-400 mt-1 font-medium">{errors.password[0]}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">Confirm Password *</label>
                            <input
                                name="confirm_password"
                                type="password"
                                value={formData.confirm_password}
                                onChange={handleChange}
                                className={`w-full px-4 py-2 rounded-lg border outline-none transition-all bg-white dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 ${errors.confirm_password ? 'border-red-500 dark:border-red-500 bg-red-50 dark:bg-red-900/20' : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900'}`}
                            />
                            {errors.confirm_password && <p className="text-xs text-red-500 dark:text-red-400 mt-1 font-medium">{errors.confirm_password[0]}</p>}
                        </div>
                    </>
                )}

                {/* Profile Image */}
                <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">Profile Image</label>
                    <div className="flex items-center gap-5">
                        <div className="relative w-24 h-24 bg-gray-50 dark:bg-gray-700 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl overflow-hidden flex items-center justify-center">
                            {preview ? (
                                <>
                                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                                    <button
                                        type="button"
                                        onClick={removeImage}
                                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 shadow-md"
                                    >
                                        <FaTrash size={10} />
                                    </button>
                                </>
                            ) : (
                                <FaImage size={24} className="text-gray-300 dark:text-gray-600" />
                            )}
                        </div>
                        <div className="flex-1">
                            <label className="cursor-pointer inline-flex items-center gap-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-medium px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 transition-all">
                                <FaImage />
                                <span>{formData.image ? 'Change Image' : 'Select Image'}</span>
                                <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
                            </label>
                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">JPG, PNG or GIF. Max 2MB.</p>
                        </div>
                    </div>
                </div>

                <div className="md:col-span-2 flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-gray-700 mt-2">
                    <button type="submit" disabled={isPending} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-lg flex justify-center items-center gap-2 transition-all disabled:opacity-50 active:scale-95">
                        <FaSave /> {isPending ? 'Saving...' : 'Save User'}
                    </button>
                    <button type="button" onClick={onCancel} className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-bold py-2.5 px-6 rounded-lg transition-all active:scale-95">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UserForm;