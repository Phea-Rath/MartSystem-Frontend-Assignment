import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';
import AlertMessage from '../services/AlertMessage';
const AlertContext = createContext();

export const useAlert = () => {
    const context = useContext(AlertContext);
    if (!context) {
        throw new Error('useAlert must be used within AlertProvider');
    }
    return context;
};

export const AlertProvider = ({ children }) => {
    const [alertState, setAlertState] = useState({
        isOpen: false,
        message: '',
        title: '',
        type: 'info',
        position: 'top-center',
        duration: 5000,
    });

    const showAlert = useCallback((options) => {
        setAlertState({
            isOpen: true,
            duration: options.duration,
            position: 'top-center',
            type: 'info',
            duration: 5000,
            ...options,
        });
        setTimeout(() => {
            setAlertState(prev => ({ ...prev, isOpen: false }));
        }, options.duration)
    }, []);


    const hideAlert = useCallback(() => {
        setAlertState(prev => ({ ...prev, isOpen: false }));
    }, []);

    const alert = {
        success: (message, title = 'Success', options = {}) =>
            showAlert({ message, title, type: 'success', ...options }),

        error: (message, title = 'Error', options = {}) =>
            showAlert({ message, title, type: 'error', ...options }),

        warning: (message, title = 'Warning', options = {}) =>
            showAlert({ message, title, type: 'warning', ...options }),

        info: (message, title = 'Info', options = {}) =>
            showAlert({ message, title, type: 'info', ...options }),

        hide: hideAlert,
    };

    return (
        <AlertContext.Provider value={alert}>
            {children}
            <AlertMessage
                isOpen={alertState.isOpen}
                message={alertState.message}
                title={alertState.title}
                type={alertState.type}
                position={alertState.position}
                duration={alertState.duration}
                onClose={hideAlert}
                {...alertState}
            />
        </AlertContext.Provider>
    );
};