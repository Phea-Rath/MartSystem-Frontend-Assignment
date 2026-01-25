import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash, FaPlus, FaFolder } from 'react-icons/fa';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';
import { useNavigate } from 'react-router';
import CategoryForm from './CategoryForm';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '../../services/api';
import AlertQuestionBox from '../../services/AlertQuestionBox'
import { useAlert } from '../../hooks/AlertContext';

const category = {
    "message": "Categories fetched successfully.",
    "success": true,
    "data": {
        "current_page": 1,
        "data": [
            {
                "category_id": 1,
                "category_name": "Oil",
                "created_by": null,
                "is_deleted": 0,
                "created_at": "2026-01-24T09:53:54.000000Z",
                "updated_at": "2026-01-24T09:53:54.000000Z"
            },
            {
                "category_id": 2,
                "category_name": "Brake",
                "created_by": null,
                "is_deleted": 0,
                "created_at": "2026-01-22T08:40:00.000000Z",
                "updated_at": "2026-01-22T08:40:00.000000Z"
            },
            {
                "category_id": 3,
                "category_name": "Lubricant",
                "created_by": null,
                "is_deleted": 0,
                "created_at": "2026-01-20T10:20:00.000000Z",
                "updated_at": "2026-01-20T10:20:00.000000Z"
            },
            {
                "category_id": 4,
                "category_name": "Coolant",
                "created_by": null,
                "is_deleted": 0,
                "created_at": "2026-01-18T11:15:00.000000Z",
                "updated_at": "2026-01-18T11:15:00.000000Z"
            },
            {
                "category_id": 5,
                "category_name": "Transmission",
                "created_by": null,
                "is_deleted": 0,
                "created_at": "2026-01-16T09:50:00.000000Z",
                "updated_at": "2026-01-16T09:50:00.000000Z"
            }
        ],
        "first_page_url": "http://127.0.0.1:8000/api/categorys?page=1",
        "from": 1,
        "last_page": 1,
        "last_page_url": "http://127.0.0.1:8000/api/categorys?page=1",
        "links": [
            { "url": null, "label": "&laquo; Previous", "page": null, "active": false },
            { "url": "http://127.0.0.1:8000/api/categorys?page=1", "label": "1", "page": 1, "active": true },
            { "url": null, "label": "Next &raquo;", "page": null, "active": false }
        ],
        "next_page_url": null,
        "path": "http://127.0.0.1:8000/api/categorys",
        "per_page": 10,
        "prev_page_url": null,
        "to": 5,
        "total": 5
    }
}


const CategoryPage = () => {

    const token = localStorage.getItem('token');
    const navigater = useNavigate();
    const alert = useAlert();
    // const token = localStorage.getItem('')
    const [showForm, setShowForm] = useState(false);
    const [categories, setCategories] = useState();
    const [dataEdit, setDataEdit] = useState();
    const [page, setPage] = useState(1);
    const [delId, setDelId] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const queryClient = useQueryClient();
    const fetchCategories = async ({ queryKey }) => {
        const [_key, page] = queryKey; // extract page from queryKey
        const res = await api.get(`categorys?limit=10&page=${page}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.data.data;
    };
    // const { data, error, isPending, isError, isFetching, isSuccess, refetch, status } = useQuery({
    //     queryKey: ['categorys', page], // include page here
    //     queryFn: fetchCategories,
    //     keepPreviousData: true, // smooth pagination
    //     staleTime: 5000,
    // });
    const data = category.data;
    const isPending = false;

    const delCategoryApi = async (id) => {
        const res = await api.delete(`categorys/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.data;
    };

    const { mutate: deleteCategory, isPending: delPending } = useMutation({
        mutationKey: ['categorys', 'delete'],
        mutationFn: delCategoryApi,
        onSuccess: () => {
            setTimeout(() => {
                alert.success('Category deleted successfully!', 'Delete Category', {
                    duration: 1000,
                    position: 'top-center',
                });
            }, 200)
            queryClient.invalidateQueries({ queryKey: ['categories'] });
            setIsOpen(false);
        },
        onError: (err) => {
            console.error(err?.response?.data || err?.message);
            setTimeout(() => {
                alert.error('Category deleted failed!', 'Delete Category', {
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
        deleteCategory(delId);
    };

    useEffect(() => {
        setCategories(data);
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
                title="Delete Category"
                message="Are you sure you want to delete this category? This action cannot be undone"
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
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">Categories</h1>
                        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Manage your product classifications ({categories?.total} total)</p>
                    </div>
                    <button onClick={() => setShowForm(true)} className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 dark:hover:bg-indigo-800 text-white px-3 sm:px-4 py-2 rounded-lg transition-colors shadow-sm text-sm sm:text-base w-full sm:w-auto">
                        <FaPlus size={14} />
                        <span>Add Category</span>
                    </button>
                </div>

                {/* Desktop Table Container */}
                <div className="hidden md:block bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300">ID</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300">Category Name</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300">Created At</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300 text-right">Actions</th>
                                </tr>
                            </thead>
                            {!isPending && <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                {categories?.data?.map((category) => (
                                    <tr key={category.category_id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                        <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 font-medium">
                                            #{category.category_id}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-indigo-50 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 rounded-lg">
                                                    <FaFolder size={16} />
                                                </div>
                                                <span className="font-medium text-gray-700 dark:text-gray-200">{category.category_name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                            {new Date(category.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex justify-end gap-2">
                                                <button onClick={() => handleEdit(category)} className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-700 dark:hover:bg-gray-700 rounded-md transition-colors" title="Edit">
                                                    <FaEdit size={16} />
                                                </button>
                                                <button onClick={() => handleDel(category.category_id)} className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-gray-700 dark:hover:bg-gray-700 rounded-md transition-colors" title="Delete">
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
                            Showing <span className="font-semibold">{categories?.data.length}</span> results
                        </p>
                        <div className="flex gap-1">
                            {categories?.links.map((link, index) => (
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

                {/* Mobile Card View */}
                <div className="md:hidden space-y-3">
                    {!isPending && categories?.data?.map((category) => (
                        <div key={category.category_id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
                            <div className="flex items-start gap-3 mb-4">
                                <div className="p-2 bg-indigo-50 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 rounded-lg">
                                    <FaFolder size={16} />
                                </div>
                                <div className="flex-1">
                                    <p className="font-semibold text-gray-800 dark:text-white">{category.category_name}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">ID: #{category.category_id}</p>
                                </div>
                            </div>
                            <div className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    Created: {new Date(category.created_at).toLocaleDateString()}
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleEdit(category)}
                                    className="flex-1 flex items-center justify-center gap-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 p-2 rounded-lg text-xs font-medium transition-colors hover:bg-blue-100 dark:hover:bg-blue-900/50"
                                >
                                    <FaEdit size={14} />
                                    <span>Edit</span>
                                </button>
                                <button
                                    onClick={() => handleDel(category.category_id)}
                                    className="flex-1 flex items-center justify-center gap-2 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-2 rounded-lg text-xs font-medium transition-colors hover:bg-red-100 dark:hover:bg-red-900/50"
                                >
                                    <FaTrash size={14} />
                                    <span>Delete</span>
                                </button>
                            </div>
                        </div>
                    ))}

                    {/* Mobile Pagination */}
                    {categories?.links && (
                        <div className="flex gap-1 justify-center mt-4">
                            {categories?.links.map((link, index) => (
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
            </div>
            <div className={`absolute w-full h-full top-0 bg-black/50 flex items-center justify-center transition-all duration-300 ${showForm ? '' : 'hidden'}`}>
                <CategoryForm data={dataEdit} onSave={''} onCancel={() => setShowForm(false)} />
            </div>
        </div>
    );
};

export default CategoryPage;