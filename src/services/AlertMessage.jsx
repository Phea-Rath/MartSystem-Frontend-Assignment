import React, { useEffect, useState } from 'react';
import {
    FaCheckCircle,
    FaExclamationCircle,
    FaExclamationTriangle,
    FaTimesCircle,
    FaInfoCircle,
    FaTimes,
    FaBell
} from 'react-icons/fa';
import { MdClose } from 'react-icons/md';

const AlertMessage = ({
    isOpen = false,
    message = "",
    title = "",
    type = "info", // success, error, warning, info
    duration = 5000, // Auto-close duration in ms (0 = no auto-close)
    position = "top-right", // top-right, top-left, bottom-right, bottom-left, top-center, bottom-center
    showCloseButton = true,
    showIcon = true,
    onClose,
    onConfirm,
    confirmText = "OK",
    showConfirmButton = false,
    autoClose = true,
    maxWidth = "max-w-md",
    className = "",
    allowHTML = false,
}) => {
    const [visible, setVisible] = useState(isOpen);
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setVisible(true);
            setIsExiting(false);

            if (autoClose && duration > 0) {
                const timer = setTimeout(() => {
                    handleClose();
                }, duration);

                return () => clearTimeout(timer);
            }
        } else {
            handleClose();
        }
    }, [isOpen, duration, autoClose]);

    const handleClose = () => {
        if (visible && !isExiting) {
            setIsExiting(true);
            setTimeout(() => {
                setVisible(false);
                if (onClose) onClose();
            }, 300);
        }
    };

    const handleConfirm = () => {
        if (onConfirm) {
            onConfirm();
        }
        handleClose();
    };

    const getIcon = () => {
        const iconClasses = "w-5 h-5";

        switch (type) {
            case 'success':
                return <FaCheckCircle className={`${iconClasses} text-green-500`} />;
            case 'error':
                return <FaTimesCircle className={`${iconClasses} text-red-500`} />;
            case 'warning':
                return <FaExclamationTriangle className={`${iconClasses} text-amber-500`} />;
            case 'info':
            default:
                return <FaInfoCircle className={`${iconClasses} text-blue-500`} />;
        }
    };

    const getBgColor = () => {
        switch (type) {
            case 'success':
                return 'bg-green-50 border-green-200';
            case 'error':
                return 'bg-red-50 border-red-200';
            case 'warning':
                return 'bg-amber-50 border-amber-200';
            case 'info':
            default:
                return 'bg-blue-50 border-blue-200';
        }
    };

    const getTextColor = () => {
        switch (type) {
            case 'success':
                return 'text-green-800';
            case 'error':
                return 'text-red-800';
            case 'warning':
                return 'text-amber-800';
            case 'info':
            default:
                return 'text-blue-800';
        }
    };

    const getTitleColor = () => {
        switch (type) {
            case 'success':
                return 'text-green-700';
            case 'error':
                return 'text-red-700';
            case 'warning':
                return 'text-amber-700';
            case 'info':
            default:
                return 'text-blue-700';
        }
    };

    const getBorderColor = () => {
        switch (type) {
            case 'success':
                return 'border-l-4 border-green-500';
            case 'error':
                return 'border-l-4 border-red-500';
            case 'warning':
                return 'border-l-4 border-amber-500';
            case 'info':
            default:
                return 'border-l-4 border-blue-500';
        }
    };

    const getPositionClasses = () => {
        switch (position) {
            case 'top-right':
                return 'top-4 right-4';
            case 'top-left':
                return 'top-4 left-4';
            case 'bottom-right':
                return 'bottom-4 right-4';
            case 'bottom-left':
                return 'bottom-4 left-4';
            case 'top-center':
                return 'top-4 left-1/2 transform -translate-x-1/2';
            case 'bottom-center':
                return 'bottom-4 left-1/2 transform -translate-x-1/2';
            default:
                return 'top-4 right-4';
        }
    };

    if (!visible) return null;

    return (
        <div
            className={`fixed z-[9999] ${getPositionClasses()} ${maxWidth} w-full px-4`}
        >
            <div
                className={`${getBgColor()} ${getBorderColor()} rounded-lg shadow-lg border ${className} ${isExiting ? 'animate-slideOut' : 'animate-slideIn'
                    }`}
                role="alert"
                aria-live="assertive"
            >
                <div className="p-4">
                    <div className="flex items-start gap-3">
                        {showIcon && (
                            <div className="flex-shrink-0 mt-0.5">
                                {getIcon()}
                            </div>
                        )}

                        <div className="flex-1 min-w-0">
                            {title && (
                                <h3 className={`text-sm font-semibold ${getTitleColor()} mb-1`}>
                                    {title}
                                </h3>
                            )}

                            <div className={`text-sm ${getTextColor()}`}>
                                {allowHTML ? (
                                    <div dangerouslySetInnerHTML={{ __html: message }} />
                                ) : (
                                    message
                                )}
                            </div>

                            {showConfirmButton && (
                                <button
                                    onClick={handleConfirm}
                                    className={`mt-3 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${type === 'success' ? 'bg-green-100 text-green-700 hover:bg-green-200' :
                                            type === 'error' ? 'bg-red-100 text-red-700 hover:bg-red-200' :
                                                type === 'warning' ? 'bg-amber-100 text-amber-700 hover:bg-amber-200' :
                                                    'bg-blue-100 text-blue-700 hover:bg-blue-200'
                                        }`}
                                >
                                    {confirmText}
                                </button>
                            )}
                        </div>

                        {showCloseButton && (
                            <button
                                onClick={handleClose}
                                className={`flex-shrink-0 ml-3 p-1 rounded-full transition-colors ${type === 'success' ? 'text-green-400 hover:text-green-600 hover:bg-green-100' :
                                        type === 'error' ? 'text-red-400 hover:text-red-600 hover:bg-red-100' :
                                            type === 'warning' ? 'text-amber-400 hover:text-amber-600 hover:bg-amber-100' :
                                                'text-blue-400 hover:text-blue-600 hover:bg-blue-100'
                                    }`}
                                aria-label="Close"
                            >
                                <MdClose className="w-4 h-4" />
                            </button>
                        )}
                    </div>

                    {/* Progress bar for auto-close */}
                    {autoClose && duration > 0 && !isExiting && (
                        <div className="mt-3 overflow-hidden rounded-full">
                            <div
                                className={`h-1 ${type === 'success' ? 'bg-green-300' :
                                        type === 'error' ? 'bg-red-300' :
                                            type === 'warning' ? 'bg-amber-300' :
                                                'bg-blue-300'
                                    } animate-progressBar`}
                                style={{ '--duration': `${duration}ms` }}
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Animation styles */}
            <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes slideOut {
          from {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          to {
            opacity: 0;
            transform: translateY(-20px) scale(0.95);
          }
        }
        
        @keyframes progressBar {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }
        
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
        
        .animate-slideOut {
          animation: slideOut 0.3s ease-in;
        }
        
        .animate-progressBar {
          animation: progressBar var(--duration) linear forwards;
          transform-origin: left;
        }
      `}</style>
        </div>
    );
};

// Hook for easy usage
export const useAlertMessage = () => {
    const [alertState, setAlertState] = useState({
        isOpen: false,
        message: '',
        title: '',
        type: 'info',
    });

    const showAlert = (options) => {
        setAlertState({
            isOpen: true,
            ...options,
        });
    };

    const hideAlert = () => {
        setAlertState(prev => ({ ...prev, isOpen: false }));
    };

    const AlertComponent = (props) => (
        <AlertMessage
            {...alertState}
            onClose={hideAlert}
            {...props}
        />
    );

    return {
        showAlert,
        hideAlert,
        AlertComponent,
    };
};

export default AlertMessage;