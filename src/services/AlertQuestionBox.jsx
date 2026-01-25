import React, { useEffect } from 'react';
import {
    FaQuestionCircle,
    FaExclamationTriangle,
    FaCheckCircle,
    FaTimesCircle,
    FaInfoCircle,
    FaExclamationCircle
} from 'react-icons/fa';

const AlertQuestionBox = ({
    isOpen = false,
    title = "Confirmation Required",
    message = "Are you sure you want to proceed?",
    type = "question", // question, warning, success, error, info
    onConfirm,
    onCancel,
    confirmText = "Confirm",
    cancelText = "Cancel",
    confirmColor = "primary", // primary, success, danger, warning, info
    cancelColor = "secondary",
    showIcon = true,
    showCloseButton = true,
    closeOnBackdropClick = true,
    loading = false,
    maxWidth = "max-w-md",
    children,
}) => {
    useEffect(() => {
        if (!isOpen) return;

        const handleEscapeKey = (e) => {
            if (e.key === 'Escape' && onCancel) {
                onCancel();
            }
        };
        const handleEnterKey = (e) => {
            if (e.key === 'Enter' && onConfirm) {
                onConfirm();
            }
        };

        document.addEventListener('enter', handleEnterKey);
        document.addEventListener('keydown', handleEscapeKey);
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', handleEscapeKey);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onCancel]);

    if (!isOpen) return null;


    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget && closeOnBackdropClick && onCancel) {
            onCancel();
        }
    };

    // const handleEscapeKey = (e) => {
    //     if (e.key === 'Escape' && onCancel) {
    //         onCancel();
    //     }
    // };

    // useEffect(() => {
    //     document.addEventListener('keydown', handleEscapeKey);
    //     return () => document.removeEventListener('keydown', handleEscapeKey);
    // }, []);

    // Get icon based on type
    const getIcon = () => {
        const iconClasses = "w-8 h-8";

        switch (type) {
            case 'warning':
                return <FaExclamationTriangle className={`${iconClasses} text-amber-500`} />;
            case 'success':
                return <FaCheckCircle className={`${iconClasses} text-green-500`} />;
            case 'error':
                return <FaTimesCircle className={`${iconClasses} text-red-500`} />;
            case 'info':
                return <FaInfoCircle className={`${iconClasses} text-blue-500`} />;
            case 'question':
            default:
                return <FaQuestionCircle className={`${iconClasses} text-indigo-500`} />;
        }
    };

    // Get color classes for confirm button
    const getConfirmButtonClasses = () => {
        const baseClasses = "px-5 py-2.5 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2";

        switch (confirmColor) {
            case 'success':
                return `${baseClasses} bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 shadow-sm hover:shadow-md`;
            case 'danger':
                return `${baseClasses} bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 shadow-sm hover:shadow-md`;
            case 'warning':
                return `${baseClasses} bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700 shadow-sm hover:shadow-md`;
            case 'info':
                return `${baseClasses} bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-sm hover:shadow-md`;
            case 'primary':
            default:
                return `${baseClasses} bg-gradient-to-r from-indigo-500 to-indigo-600 text-white hover:from-indigo-600 hover:to-indigo-700 shadow-sm hover:shadow-md`;
        }
    };

    // Get color classes for cancel button
    const getCancelButtonClasses = () => {
        const baseClasses = "px-5 py-2.5 rounded-lg font-medium transition-all duration-200 border";

        switch (cancelColor) {
            case 'secondary':
            default:
                return `${baseClasses} border-gray-300 text-gray-700 hover:bg-gray-50`;
        }
    };

    // Get border color based on type
    const getBorderColor = () => {
        switch (type) {
            case 'warning':
                return 'border-l-4 border-amber-500';
            case 'success':
                return 'border-l-4 border-green-500';
            case 'error':
                return 'border-l-4 border-red-500';
            case 'info':
                return 'border-l-4 border-blue-500';
            case 'question':
            default:
                return 'border-l-4 border-indigo-500';
        }
    };

    // Get title color based on type
    const getTitleColor = () => {
        switch (type) {
            case 'warning':
                return 'text-amber-700';
            case 'success':
                return 'text-green-700';
            case 'error':
                return 'text-red-700';
            case 'info':
                return 'text-blue-700';
            case 'question':
            default:
                return 'text-gray-800';
        }
    };

    return (
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={handleBackdropClick}
        >
            <div
                className={`bg-white rounded-2xl shadow-2xl w-full ${maxWidth} animate-scaleIn`}
                role="dialog"
                aria-modal="true"
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                {/* Header */}
                <div className={`p-6 ${getBorderColor()}`}>
                    <div className="flex items-start gap-4">
                        {showIcon && (
                            <div className="flex-shrink-0 mt-1">
                                {getIcon()}
                            </div>
                        )}

                        <div className="flex-1">
                            <h3
                                id="alert-dialog-title"
                                className={`text-xl font-bold ${getTitleColor()} mb-2`}
                            >
                                {title}
                            </h3>

                            <div
                                id="alert-dialog-description"
                                className="text-gray-600"
                            >
                                {message}
                            </div>

                            {children && (
                                <div className="mt-3">
                                    {children}
                                </div>
                            )}
                        </div>

                        {showCloseButton && onCancel && (
                            <button
                                onClick={onCancel}
                                className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
                                aria-label="Close"
                            >
                                <FaExclamationCircle className="w-5 h-5" />
                            </button>
                        )}
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-200"></div>

                {/* Footer with Actions */}
                <div className="p-6">
                    <div className="flex flex-col sm:flex-row justify-end gap-3">
                        {onCancel && (
                            <button
                                onClick={onCancel}
                                className={getCancelButtonClasses()}
                                disabled={loading}
                            >
                                {cancelText}
                            </button>
                        )}

                        {onConfirm && (
                            <button
                                onClick={onConfirm}
                                className={getConfirmButtonClasses()}
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        Processing...
                                    </>
                                ) : (
                                    confirmText
                                )}
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Add animation styles */}
            <style jsx>{`
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.2s ease-out;
        }
      `}</style>
        </div>
    );
};

export default AlertQuestionBox;