// Mobile card view for BrandList - Add this snippet after the </div> closing the desktop table container

{/* Mobile Card View */ }
<div className="md:hidden space-y-3">
    {!isPending && brands?.data?.map((brand) => (
        <div key={brand.brand_id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3 flex-1">
                    <div className="p-2 bg-indigo-50 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 rounded-lg flex-shrink-0">
                        <FaFolder size={16} />
                    </div>
                    <div className="min-w-0">
                        <p className="font-semibold text-gray-800 dark:text-white text-sm truncate">{brand.brand_name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">ID: #{brand.brand_id}</p>
                    </div>
                </div>
            </div>
            <div className="mb-3 pb-3 border-b border-gray-100 dark:border-gray-700">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                    Created: {new Date(brand.created_at).toLocaleDateString()}
                </p>
            </div>
            <div className="flex gap-2 justify-end">
                <button onClick={() => handleEdit(brand)} className="flex-1 flex items-center justify-center gap-1 p-2 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-gray-700 rounded-lg transition-colors text-sm font-medium">
                    <FaEdit size={14} />
                    <span>Edit</span>
                </button>
                <button onClick={() => handleDel(brand.brand_id)} className="flex-1 flex items-center justify-center gap-1 p-2 text-red-600 dark:text-red-400 bg-red-50 dark:bg-gray-700 rounded-lg transition-colors text-sm font-medium">
                    <FaTrash size={14} />
                    <span>Delete</span>
                </button>
            </div>
        </div>
    ))}

    {/* Mobile Pagination */}
    <div className="flex gap-1 justify-center pt-4">
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
</div>
