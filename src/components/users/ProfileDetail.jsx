import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState, useRef, useEffect } from 'react';
import {
    FaUserCircle, FaCamera, FaSave, FaEdit, FaTimes,
    FaPhone, FaEnvelope, FaRobot, FaCommentDots, FaInfoCircle, FaQrcode
} from 'react-icons/fa';
import api from '../../services/api';
import { useAlert } from '../../hooks/AlertContext';
import { useParams } from 'react-router';
import profiles from '../../data/profile';

const ProfileDetail = () => {
    const [isEdit, setIsEdit] = useState(false);
    const token = localStorage.getItem('token');
    const alert = useAlert();
    const queryClient = useQueryClient();



    const [data, setData] = useState({});
    const [previews, setPreviews] = useState({ image: null, qr_image: null });

    // Handle Input Changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
    };
    const fetchProfileById = async () => {
        const res = await api.get(`profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return res.data.data;
    };

    const {
        data: editData,
    } = useQuery({
        queryKey: ['profile'],
        queryFn: fetchProfileById,
    });

    useEffect(() => {
        setData(profiles.data);
    }, []);

    // Handle Image Uploads
    const handleFileChange = (e, field) => {
        const file = e.target.files[0];
        if (file) {
            setData(prev => ({ ...prev, [field]: file }));
            setPreviews(prev => ({ ...prev, [field]: URL.createObjectURL(file) }));
        }
    };

    const saveProfileApi = async (payload) => {
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        };
        const res = await api.post(`profiles`, payload, config);
        return res.data;

    };

    // --- Mutation ---
    const { mutate: saveProfile, isPending } = useMutation({
        mutationFn: saveProfileApi,
        onSuccess: () => {
            const msg = 'Profile updated successfully';
            setTimeout(() => {
                alert.success(msg, 'Success', { duration: 1000 });
            }, 200);
            queryClient.invalidateQueries({ queryKey: ['profile'] });
        },
        onError: (err) => {
            const backendErrors = err?.response?.data?.errors;
            console.error(err);
            alert.error(`${err?.response?.data?.message || err.message}`, 'Success', { duration: 5000 });
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Saving Profile Data:", data);
        const formData = new FormData();
        formData.append('profile_name', data.profile_name)
        formData.append('email', data.email)
        formData.append('phone_number', data.phone_number)
        formData.append('bot_token', data.bot_token)
        formData.append('chat_id', data.chat_id)
        formData.append('description', data.description)
        formData.append('image', data.image)
        formData.append('qr_image', data.qr_image)
        // Here you would append to FormData() for multipart/form-data API call
        setIsEdit(false);
        saveProfile(formData);
    };

    return (
        <div className="min-h-screen p-4 md:p-8 bg-transparent text-gray-800 dark:text-gray-100 transition-colors">
            <div className="max-w-4xl mx-auto">

                {/* Header Section */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-black">User Profile</h1>
                    {!isEdit ? (
                        <button
                            onClick={() => setIsEdit(true)}
                            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl font-bold transition-all shadow-lg"
                        >
                            <FaEdit /> Edit Profile
                        </button>
                    ) : (
                        <div className="flex gap-3">
                            <button
                                onClick={() => setIsEdit(false)}
                                className="flex items-center gap-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 px-5 py-2 rounded-xl font-bold transition-all"
                            >
                                <FaTimes /> Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-xl font-bold transition-all shadow-lg"
                            >
                                <FaSave /> Save Changes
                            </button>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column: Avatar & QR */}
                    <div className="space-y-6">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-200 dark:border-gray-700 text-center relative overflow-hidden">
                            <div className="relative inline-block group">
                                {previews?.image || data?.image ? (
                                    <img
                                        src={previews?.image || data?.image}
                                        className="w-32 h-32 rounded-full object-cover border-4 border-indigo-50 dark:border-gray-700"
                                        alt="Profile"
                                    />
                                ) : (
                                    <FaUserCircle className="w-32 h-32 text-gray-300 dark:text-gray-600" />
                                )}

                                {isEdit && (
                                    <label className="absolute bottom-0 right-0 bg-indigo-600 p-2 rounded-full text-white cursor-pointer hover:scale-110 transition-transform">
                                        <FaCamera size={14} />
                                        <input type="file" className="hidden" onChange={(e) => handleFileChange(e, 'image')} accept="image/*" />
                                    </label>
                                )}
                            </div>
                            <h2 className="mt-4 text-xl font-bold">{data?.profile_name}</h2>
                            <p className="text-gray-500 dark:text-gray-400 text-sm">ID: #{data?.profile_id}</p>
                        </div>

                        {/* QR Code Section */}
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-200 dark:border-gray-700">
                            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4 flex items-center gap-2">
                                <FaQrcode /> QR Image
                            </h3>
                            <div className="flex flex-col items-center gap-4">
                                {previews?.qr_image || data?.qr_image ? (
                                    <img src={previews?.qr_image || data?.qr_image} className="w-full aspect-square rounded-xl object-contain bg-gray-50 dark:bg-gray-900 p-2" alt="QR" />
                                ) : (
                                    <div className="w-full aspect-square rounded-xl bg-gray-100 dark:bg-gray-900 flex items-center justify-center text-gray-400 italic text-xs">No QR Image</div>
                                )}
                                {isEdit && (
                                    <input type="file" onChange={(e) => handleFileChange(e, 'qr_image')} className="text-xs w-full" />
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Information */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm border border-gray-200 dark:border-gray-700">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                {/* Basic Info */}
                                <div className="space-y-4 md:col-span-2">
                                    <label className="text-xs font-black uppercase text-indigo-600 dark:text-indigo-400">Basic Information</label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <span className="text-xs text-gray-500 flex items-center gap-1"><FaUserCircle /> Name</span>
                                            {isEdit ? (
                                                <input name="profile_name" value={data?.profile_name} onChange={handleChange} className="w-full bg-gray-50 dark:bg-gray-900 p-2 rounded-lg border dark:border-gray-700 focus:ring-2 ring-indigo-500 outline-none" />
                                            ) : (
                                                <p className="font-semibold">{data?.profile_name}</p>
                                            )}
                                        </div>
                                        <div className="space-y-1">
                                            <span className="text-xs text-gray-500 flex items-center gap-1"><FaEnvelope /> Email</span>
                                            {isEdit ? (
                                                <input name="email" value={data?.email} onChange={handleChange} className="w-full bg-gray-50 dark:bg-gray-900 p-2 rounded-lg border dark:border-gray-700 focus:ring-2 ring-indigo-500 outline-none" />
                                            ) : (
                                                <p className="font-semibold">{data?.email || 'N/A'}</p>
                                            )}
                                        </div>
                                        <div className="space-y-1">
                                            <span className="text-xs text-gray-500 flex items-center gap-1"><FaPhone /> Phone</span>
                                            {isEdit ? (
                                                <input name="phone_number" value={data?.phone_number} onChange={handleChange} className="w-full bg-gray-50 dark:bg-gray-900 p-2 rounded-lg border dark:border-gray-700 focus:ring-2 ring-indigo-500 outline-none" />
                                            ) : (
                                                <p className="font-semibold">{data?.phone_number || 'N/A'}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Telegram Integration */}
                                <div className="space-y-4 md:col-span-2 mt-4 pt-4 border-t border-gray-400 dark:border-gray-700">
                                    <label className="text-xs font-black uppercase text-sky-600 dark:text-sky-400">Notification Settings (Telegram)</label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <span className="text-xs text-gray-500 flex items-center gap-1"><FaRobot /> Bot Token</span>
                                            {isEdit ? (
                                                <input name="bot_token" value={data?.bot_token || ''} onChange={handleChange} placeholder="Enter Bot Token" className="w-full bg-gray-50 dark:bg-gray-900 p-2 rounded-lg border dark:border-gray-700 text-xs" />
                                            ) : (
                                                <p className="font-mono text-xs truncate max-w-[200px]">{data?.bot_token || 'Not Set'}</p>
                                            )}
                                        </div>
                                        <div className="space-y-1">
                                            <span className="text-xs text-gray-500 flex items-center gap-1"><FaCommentDots /> Chat ID</span>
                                            {isEdit ? (
                                                <input name="chat_id" value={data?.chat_id || ''} onChange={handleChange} placeholder="Enter Chat ID" className="w-full bg-gray-50 dark:bg-gray-900 p-2 rounded-lg border dark:border-gray-700 text-xs" />
                                            ) : (
                                                <p className="font-semibold">{data?.chat_id || 'Not Set'}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="space-y-4 md:col-span-2 mt-4 pt-4 border-t border-gray-400 dark:border-gray-700">
                                    <span className="text-xs text-gray-500 flex items-center gap-1"><FaInfoCircle /> Description / Bio</span>
                                    {isEdit ? (
                                        <textarea name="description" value={data?.description || ''} onChange={handleChange} rows="3" className="w-full bg-gray-50 dark:bg-gray-900 p-3 rounded-xl border dark:border-gray-700 outline-none text-sm" />
                                    ) : (
                                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{data?.description || 'No description provided.'}</p>
                                    )}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileDetail;