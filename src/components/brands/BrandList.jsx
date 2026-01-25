import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash, FaPlus, FaFolder } from 'react-icons/fa';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';
import { useNavigate } from 'react-router';
import BrandForm from './BrandForm';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '../../services/api';
import AlertQuestionBox from '../../services/AlertQuestionBox'
import AlertMessage, { useAlertMessage } from '../../services/AlertMessage';
import { useAlert } from '../../hooks/AlertContext';
const brand = {
    "message": "Brands fetched successfully.",
    "success": true,
    "data": {
        "current_page": 1,
        "data": [
            {
                "brand_id": 1,
                "brand_name": "TechXZone",
                "created_by": null,
                "is_deleted": 0,
                "created_at": "2026-01-24T09:54:28.000000Z",
                "updated_at": "2026-01-24T09:54:28.000000Z",
                "items": [
                    { "item_id": 1, "brand_id": 1, "item_name": "Tex Oil" },
                    { "item_id": 2, "brand_id": 1, "item_name": "Engine Oil Pro" }
                ]
            },
            {
                "brand_id": 2,
                "brand_name": "AutoMax",
                "created_by": null,
                "is_deleted": 0,
                "created_at": "2026-01-22T08:30:00.000000Z",
                "updated_at": "2026-01-22T08:30:00.000000Z",
                "items": [
                    { "item_id": 3, "brand_id": 2, "item_name": "Brake Fluid" },
                    { "item_id": 4, "brand_id": 2, "item_name": "Coolant Liquid" }
                ]
            },
            {
                "brand_id": 3,
                "brand_name": "IndusPro",
                "created_by": null,
                "is_deleted": 0,
                "created_at": "2026-01-20T10:00:00.000000Z",
                "updated_at": "2026-01-20T10:00:00.000000Z",
                "items": [
                    { "item_id": 5, "brand_id": 3, "item_name": "Hydraulic Oil" },
                    { "item_id": 6, "brand_id": 3, "item_name": "Gear Oil" }
                ]
            },
            {
                "brand_id": 4,
                "brand_name": "MegaLube",
                "created_by": null,
                "is_deleted": 0,
                "created_at": "2026-01-18T14:15:00.000000Z",
                "updated_at": "2026-01-18T14:15:00.000000Z",
                "items": [
                    { "item_id": 7, "brand_id": 4, "item_name": "Industrial Lubricant" },
                    { "item_id": 8, "brand_id": 4, "item_name": "Transmission Oil" }
                ]
            },
            {
                "brand_id": 5,
                "brand_name": "MotoPro",
                "created_by": null,
                "is_deleted": 0,
                "created_at": "2026-01-16T09:45:00.000000Z",
                "updated_at": "2026-01-16T09:45:00.000000Z",
                "items": [
                    { "item_id": 9, "brand_id": 5, "item_name": "Power Steering Oil" },
                    { "item_id": 10, "brand_id": 5, "item_name": "Synthetic Oil X" }
                ]
            }
        ],
        "first_page_url": "http://127.0.0.1:8000/api/brands?page=1",
        "from": 1,
        "last_page": 1,
        "last_page_url": "http://127.0.0.1:8000/api/brands?page=1",
        "links": [
            { "url": null, "label": "&laquo; Previous", "page": null, "active": false },
            { "url": "http://127.0.0.1:8000/api/brands?page=1", "label": "1", "page": 1, "active": true },
            { "url": null, "label": "Next &raquo;", "page": null, "active": false }
        ],
        "next_page_url": null,
        "path": "http://127.0.0.1:8000/api/brands",
        "per_page": 10,
        "prev_page_url": null,
        "to": 5,
        "total": 5
    }
}


const BrandList = () => {

    const token = localStorage.getItem('token');
    const navigater = useNavigate();
    const alert = useAlert();
    // const token = localStorage.getItem('')
    const [showForm, setShowForm] = useState(false);
    const [brands, setBrands] = useState();
    const [dataEdit, setDataEdit] = useState();
    const [page, setPage] = useState(1);
    const [delId, setDelId] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const queryClient = useQueryClient();
    const fetchBrands = async ({ queryKey }) => {
        const [_key, page] = queryKey; // extract page from queryKey
        const res = await api.get(`brands?limit=10&page=${page}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.data.data;
    };
    // const { data, error, isPending, isError, isFetching, isSuccess, refetch, status } = useQuery({
    //     queryKey: ['brands', page], // include page here
    //     queryFn: fetchBrands,
    //     keepPreviousData: true, // smooth pagination
    //     staleTime: 5000,
    // });
    const data = brand.data;
    const isPending = false;

    const delBrandApi = async (id) => {
        const res = await api.delete(`brands/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.data;
    };

    const { mutate: deleteBrand, isPending: delPending } = useMutation({
        mutationKey: ['brands', 'delete'],
        mutationFn: delBrandApi,
        onSuccess: () => {
            setTimeout(() => {
                alert.success('Brand deleted successfully!', 'Delete Brand', {
                    duration: 1000,
                    position: 'top-center',
                });
            }, 200)
            queryClient.invalidateQueries({ queryKey: ['brands'] });
            setIsOpen(false);
        },
        onError: (err) => {
            console.error(err?.response?.data || err?.message);
            setTimeout(() => {
                alert.error('Brand deleted failed!', 'Delete Brand', {
                    duration: 5000,
                    position: 'top-center',
                });
            }, 200)
        }
    });

    const handleDel = (id) => {
        setDelId(id);
        setIsOpen(true);
    };

    const handleAction = () => {
        deleteBrand(delId);
    };

    useEffect(() => {
        setBrands(data);
    }, [data]);

    const handleEdit = (data) => {
        setDataEdit(data);
        setShowForm(true);
    }

    const handlePageChange = (url) => {
        if (!url) return;
        const pageParam = new URL(url).searchParams.get('page');
        setPage(Number(pageParam));
    };

    return (
        <div className=" bg-transparent h-full !relative">
            <AlertQuestionBox
                isOpen={isOpen}
                type="question"
                title="Delete Brand"
                message="Are you sure you want to delete this brand? This action cannot be undone"
                confirmText="Ok"
                cancelText="Cancecl"
                confirmColor="danger"
                loading={delPending}
                onConfirm={handleAction}
                onCancel={() => setIsOpen(false)}
            />
            <div className="p-3 sm:p-6 mx-auto max-w-full">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-3 sm:gap-4">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">Brands</h1>
                        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Manage your brands ({brands?.total} total)</p>
                    </div>
                    <button onClick={() => setShowForm(true)} className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 dark:hover:bg-indigo-800 text-white px-3 sm:px-4 py-2 rounded-lg transition-colors shadow-sm text-sm sm:text-base w-full sm:w-auto">
                        <FaPlus size={14} />
                        <span>Add Brand</span>
                    </button>
                </div>

                {/* Desktop Table View */}
                <div className="hidden md:block bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300">ID</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300">Brand Name</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300">Created At</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300 text-right">Actions</th>
                                </tr>
                            </thead>
                            {!isPending && <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                {brands?.data?.map((brand) => (
                                    <tr key={brand.brand_id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                        <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 font-medium">
                                            #{brand.brand_id}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-indigo-50 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 rounded-lg">
                                                    <FaFolder size={16} />
                                                </div>
                                                <span className="font-medium text-gray-700 dark:text-gray-200">{brand.brand_name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                            {new Date(brand.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex justify-end gap-2">
                                                <button onClick={() => handleEdit(brand)} className=\"p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-700 dark:hover:bg-gray-700 rounded-md transition-colors\" title=\"Edit\">
                                                <FaEdit size={16} />
                                            </button>
                                            <button onClick={() => handleDel(brand.brand_id)} className=\"p-2 text-red-600 hover:bg-red-50 dark:hover:bg-gray-700 dark:hover:bg-gray-700 rounded-md transition-colors\" title=\"Delete\">
                                            <FaTrash size={16} />
                                        </button>
                                    </div>
                                        </td>
                                    </tr>
                                ))}
                    </tbody>}
                </table>
            </div>

            {/* Pagination Footer */}
            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600 flex items-center justify-between">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                    Showing <span className="font-semibold">{brands?.data.length}</span> results
                </p>
                <div className="flex gap-1">
                    {brands?.links.map((link, index) => (
                        <button
                            key={index}
                            disabled={!link.url || link.active}
                            onClick={() => handlePageChange(link.url)}
                            className={`px-3 py-1 rounded border text-sm transition-all ${link.active
                                ? 'bg-indigo-600 text-white border-indigo-600'
                                : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50'
                                }`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>

            </div>
        </div>

                {/* Mobile Card View */ }
    <div className="md:hidden space-y-3">
        {!isPending && brands?.data?.map((brand) => (
            <div key={brand.brand_id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
                <div className="flex items-start gap-3 mb-4">
                    <div className="p-2 bg-indigo-50 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 rounded-lg">
                        <FaFolder size={16} />
                    </div>
                    <div className="flex-1">
                        <p className="font-semibold text-gray-800 dark:text-white">{brand.brand_name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">ID: #{brand.brand_id}</p>
                    </div>
                </div>
                <div className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        Created: {new Date(brand.created_at).toLocaleDateString()}
                    </p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => handleEdit(brand)}
                        className="flex-1 flex items-center justify-center gap-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 p-2 rounded-lg text-xs font-medium transition-colors hover:bg-blue-100 dark:hover:bg-blue-900/50"
                    >
                        <FaEdit size={14} />
                        <span>Edit</span>
                    </button>
                    <button
                        onClick={() => handleDel(brand.brand_id)}
                        className="flex-1 flex items-center justify-center gap-2 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-2 rounded-lg text-xs font-medium transition-colors hover:bg-red-100 dark:hover:bg-red-900/50"
                    >
                        <FaTrash size={14} />
                        <span>Delete</span>
                    </button>
                </div>
            </div>
        ))}

        {/* Mobile Pagination */}
        {brands?.links && (
            <div className="flex gap-1 justify-center mt-4">
                {brands?.links.map((link, index) => (
                    <button
                        key={index}
                        disabled={!link.url || link.active}
                        onClick={() => handlePageChange(link.url)}
                        className={`px-2 py-1 rounded border text-xs transition-all ${link.active
                            ? 'bg-indigo-600 text-white border-indigo-600'
                            : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50'
                            }`}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                ))}
            </div>
        )}
    </div>
            </div >
    <div className={`absolute w-full h-full top-0 bg-black/50 flex items-center justify-center transition-all duration-300 ${showForm ? '' : 'hidden'}`}>
        <BrandForm data={dataEdit} onSave={''} onCancel={() => setShowForm(false)} />
    </div>
        </div >
    );
};

export default BrandList;