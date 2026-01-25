import React, { useState } from 'react';
import { FaUpload, FaTimes, FaImage } from 'react-icons/fa';

const ImageUpload = ({
    label,
    value,
    onChange,
    required = false,
    className = '',
    accept = 'image/*',
    maxSizeMB = 2
}) => {
    const [preview, setPreview] = useState(value || '');
    const [dragOver, setDragOver] = useState(false);

    const handleFileChange = (file) => {
        if (file) {
            if (file.size > maxSizeMB * 1024 * 1024) {
                alert(`File size must be less than ${maxSizeMB}MB`);
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                const imageUrl = reader.result;
                setPreview(imageUrl);
                onChange(imageUrl);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragOver(false);
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            handleFileChange(file);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setDragOver(true);
    };

    const handleDragLeave = () => {
        setDragOver(false);
    };

    const removeImage = () => {
        setPreview('');
        onChange('');
    };

    return (
        <div className={`mb-4 ${className}`}>
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}

            <div className="space-y-4">
                {preview ? (
                    <div className="relative inline-block">
                        <img
                            src={preview}
                            alt="Preview"
                            className="w-32 h-32 object-cover rounded-lg border shadow-sm"
                        />
                        <button
                            type="button"
                            onClick={removeImage}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                            <FaTimes size={12} />
                        </button>
                    </div>
                ) : (
                    <div
                        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${dragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
                            }`}
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                    >
                        <div className="flex flex-col items-center justify-center">
                            <FaImage className="text-gray-400 text-3xl mb-3" />
                            <p className="text-sm text-gray-600 mb-2">
                                Drag & drop an image here, or click to browse
                            </p>
                            <p className="text-xs text-gray-500 mb-4">
                                Max size: {maxSizeMB}MB • JPG, PNG, GIF
                            </p>
                            <label className="cursor-pointer">
                                <div className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 inline-flex items-center gap-2">
                                    <FaUpload />
                                    Browse Files
                                </div>
                                <input
                                    type="file"
                                    className="hidden"
                                    accept={accept}
                                    onChange={(e) => handleFileChange(e.target.files[0])}
                                />
                            </label>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImageUpload;