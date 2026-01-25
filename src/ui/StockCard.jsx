import React from 'react';
import { FaBox, FaWarehouse, FaExclamationTriangle, FaChartLine } from 'react-icons/fa';

const StockCard = ({ item }) => {
    const getStockLevelColor = (current, min, max) => {
        const percentage = (current / max) * 100;
        if (current <= min) return 'red';
        if (percentage < 30) return 'yellow';
        if (percentage > 90) return 'orange';
        return 'green';
    };

    const stockColor = getStockLevelColor(item.current_qty, item.min_qty, item.max_qty);

    return (
        <div className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{item.item_name}</h4>
                    <p className="text-sm text-gray-500 mb-2">{item.sku}</p>

                    <div className="flex items-center gap-4 mb-3">
                        <div className="flex items-center gap-1">
                            <FaWarehouse className="text-gray-400 text-sm" />
                            <span className="text-sm">{item.warehouse_name}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <FaBox className="text-gray-400 text-sm" />
                            <span className="text-sm">{item.category_name}</span>
                        </div>
                    </div>
                </div>

                {stockColor === 'red' && (
                    <FaExclamationTriangle className="text-red-500 mt-1" />
                )}
            </div>

            <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Current Stock</span>
                    <span className={`font-medium ${stockColor === 'red' ? 'text-red-600' :
                            stockColor === 'yellow' ? 'text-yellow-600' :
                                stockColor === 'orange' ? 'text-orange-600' : 'text-green-600'
                        }`}>
                        {item.current_qty} {item.unit}
                    </span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                        className={`h-2 rounded-full ${stockColor === 'red' ? 'bg-red-600' :
                                stockColor === 'yellow' ? 'bg-yellow-600' :
                                    stockColor === 'orange' ? 'bg-orange-600' : 'bg-green-600'
                            }`}
                        style={{
                            width: `${Math.min((item.current_qty / item.max_qty) * 100, 100)}%`
                        }}
                    ></div>
                </div>

                <div className="flex justify-between text-xs text-gray-500">
                    <span>Min: {item.min_qty}</span>
                    <span>Max: {item.max_qty}</span>
                </div>
            </div>

            <div className="mt-4 pt-4 border-t flex justify-between items-center">
                <div>
                    <p className="text-sm text-gray-600">Value</p>
                    <p className="font-medium">${item.total_value.toFixed(2)}</p>
                </div>
                <div className="flex gap-2">
                    <button className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200">
                        View
                    </button>
                    <button className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200">
                        Adjust
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StockCard;