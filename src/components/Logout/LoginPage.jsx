import React, { useState, useRef, useEffect } from 'react';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaSignInAlt } from 'react-icons/fa';
import api from '../../services/api';
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';

const LoginPage = () => {
    const navigater = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const emailRef = useRef(null);
    const queryClient = useQueryClient();

    // Auto-focus email field on load
    useEffect(() => {
        emailRef.current?.focus();
    }, []);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const LoginUser = async (data) => {
        const res = await api.post('login', data);
        return res.data
    }

    const { mutate: login, isPending } = useMutation({
        mutationKey: ['login'],
        mutationFn: LoginUser,

        onSuccess: (data) => {   // ✅ receive API response
            localStorage.setItem('token', data.token);
            navigater('/');
            // refetch user profile after login
            queryClient.invalidateQueries({ queryKey: ['user'] });

            console.log('Login successful');
        },

        onError: (err) => {
            console.log(err.response?.data?.message || 'Failed');
        }
    });


    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};

        // Basic Validation
        if (!formData.email) newErrors.email = "Email is required";
        if (!formData.password) newErrors.password = "Password is required";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        login(formData);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
            <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">

                {/* Header Section */}
                <div className="bg-indigo-600 dark:bg-indigo-700 p-8 text-center">
                    <div className="inline-flex p-3 bg-white/20 rounded-full text-white mb-4">
                        <FaLock size={28} />
                    </div>
                    <h2 className="text-2xl font-bold text-white uppercase tracking-wider">Welcome Back</h2>
                    <p className="text-indigo-100 dark:text-indigo-200 text-sm mt-1">Please sign in to your account</p>
                </div>

                {/* Form Section */}
                <form onSubmit={handleSubmit} className="p-8 space-y-6">

                    {/* Email Field */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Email Address</label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 dark:text-gray-500">
                                <FaEnvelope />
                            </span>
                            <input
                                ref={emailRef}
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="admin@example.com"
                                className={`w-full pl-10 pr-4 py-2.5 rounded-lg border transition-all outline-none focus:ring-4 bg-white dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 ${errors.email ? 'border-red-400 dark:border-red-500 focus:ring-red-100 dark:focus:ring-red-900' : 'border-gray-300 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-indigo-100 dark:focus:ring-indigo-900'
                                    }`}
                            />
                        </div>
                        {errors.email && <p className="mt-1 text-xs text-red-500 dark:text-red-400 font-medium">{errors.email}</p>}
                    </div>

                    {/* Password Field */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Password</label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 dark:text-gray-500">
                                <FaLock />
                            </span>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                className={`w-full pl-10 pr-12 py-2.5 rounded-lg border transition-all outline-none focus:ring-4 bg-white dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 ${errors.password ? 'border-red-400 dark:border-red-500 focus:ring-red-100 dark:focus:ring-red-900' : 'border-gray-300 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-indigo-100 dark:focus:ring-indigo-900'
                                    }`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 dark:text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        {errors.password && <p className="mt-1 text-xs text-red-500 dark:text-red-400 font-medium">{errors.password}</p>}
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="flex items-center">
                            <input type="checkbox" className="rounded border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 focus:ring-indigo-500" />
                            <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Remember me</span>
                        </label>
                        <a href="#" className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline font-medium">Forgot password?</a>
                    </div>

                    {/* Submit Button (Triggers on Enter) */}
                    <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition-all active:scale-[0.98] shadow-lg shadow-indigo-200 dark:shadow-indigo-900"
                    >
                        <FaSignInAlt />
                        Sign In
                    </button>
                </form>

                <div className="p-6 bg-gray-50 dark:bg-gray-700 border-t border-gray-100 dark:border-gray-600 text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Don't have an account? <a href="#" className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline">Sign Up</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;