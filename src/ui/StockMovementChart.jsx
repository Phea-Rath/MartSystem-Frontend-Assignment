import React from 'react';
import { FaChartLine } from 'react-icons/fa';

const StockMovementChart = () => {
    // Mock data for chart
    const data = [
        { date: 'Jan 1', incoming: 150, outgoing: 80 },
        { date: 'Jan 2', incoming: 200, outgoing: 120 },
        { date: 'Jan 3', incoming: 180, outgoing: 90 },
        { date: 'Jan 4', incoming: 220, outgoing: 150 },
        { date: 'Jan 5', incoming: 190, outgoing: 110 },
        { date: 'Jan 6', incoming: 210, outgoing: 130 },
        { date: 'Jan 7', incoming: 240, outgoing: 170 },
    ];

    const maxValue = Math.max(...data.map(d => Math.max(d.incoming, d.outgoing)));

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-700">7-Day Stock Movement</h3>
                <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded"></div>
                        <span>Incoming</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded"></div>
                        <span>Outgoing</span>
                    </div>
                </div>
            </div>

            <div className="flex relative items-end h-48 gap-2 pt-4">
                {data.map((day, index) => (
                    <div key={index} className="flex-1  h-full flex flex-col items-center">
                        <div className="relative  h-full flex items-end justify-center gap-1 w-full">
                            <div
                                className="w-3 relative bg-green-500 rounded-t"
                                style={{ height: `${(day.incoming / maxValue) * 100}%` }}
                                title={`Incoming: ${day.incoming}`}
                            ></div>
                            <div
                                className="w-3 relative bg-red-500 rounded-t"
                                style={{ height: `${((day.outgoing / maxValue) * 100)}%` }}
                                title={`Outgoing: ${day.outgoing}`}
                            ></div>
                        </div>
                        <div className="mt-2 text-xs text-gray-500">{day.date}</div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div className="text-center">
                    <p className="text-sm text-gray-600">Total Incoming</p>
                    <p className="text-2xl font-bold text-green-600">
                        {data.reduce((sum, day) => sum + day.incoming, 0)}
                    </p>
                </div>
                <div className="text-center">
                    <p className="text-sm text-gray-600">Total Outgoing</p>
                    <p className="text-2xl font-bold text-red-600">
                        {data.reduce((sum, day) => sum + day.outgoing, 0)}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default StockMovementChart;