import { useState } from "react";
import { RiShoppingCartFill } from "react-icons/ri";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { FaWarehouse } from "react-icons/fa";
import { curveCardinal } from "d3-shape";
import {
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    RadialBarChart,
    RadialBar,
    ResponsiveContainer,
    AreaChart,
    Area,
    BarChart,
    Bar,
    Rectangle,
    RadarChart,
    Radar,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
} from "recharts";
const dataRadar = [
    {
        subject: "07:00 AM",
        today: 120,
        yesterday: 110,
        fullMark: 150,
    },
    {
        subject: "11:00 AM",
        today: 98,
        yesterday: 130,
        fullMark: 150,
    },
    {
        subject: "04:00 PM",
        today: 86,
        yesterday: 130,
        fullMark: 150,
    },
    {
        subject: "09:00 PM",
        today: 99,
        yesterday: 100,
        fullMark: 150,
    },
    {
        subject: "02:00 AM",
        today: 85,
        yesterday: 90,
        fullMark: 150,
    },
    {
        subject: "06:00 AM",
        today: 65,
        yesterday: 85,
        fullMark: 150,
    },
];

const dataArea = [
    {
        name: "Week 1",
        thisMonth: 8000,
        lastMonth: 2800,
    },
    {
        name: "Week 2",
        thisMonth: 1000,
        lastMonth: 1398,
    },
    {
        name: "Week 3",
        thisMonth: 2000,
        lastMonth: 9800,
    },
    {
        name: "Week 4",
        thisMonth: 2780,
        lastMonth: 3908,
    },
];
const dataAreaCard = [
    {
        name: "Week 1",
        thisMonth: 8000,
    },
    {
        name: "Week 2",
        thisMonth: 3000,
    },
    {
        name: "Week 3",
        thisMonth: 2000,
    },
    {
        name: "Week 4",
        thisMonth: 2780,
    },
];
const dataBar = [
    {
        name: "Day 1",
        thisWeek: 8000,
        Weekend: 2800,
    },
    {
        name: "Day 2",
        thisWeek: 3000,
        Weekend: 1398,
    },
    {
        name: "Day 3",
        thisWeek: 2000,
        Weekend: 9800,
    },
    {
        name: "Day 4",
        thisWeek: 2780,
        Weekend: 3908,
    },
    {
        name: "Day 5",
        thisWeek: 1890,
        Weekend: 4800,
    },
    {
        name: "Day 6",
        thisWeek: 2390,
        Weekend: 3800,
    },
    {
        name: "Day 7",
        thisWeek: 3490,
        Weekend: 4300,
    },
];

const popularPurchase = [
    {
        name: "Computer",
        type: "Electronic",
        price: 799,
        discription:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto laborum vel, doloribus commodi voluptas quod deserunt blanditiis exercitationem sunt non.",
    },
    {
        name: "Printer",
        type: "Electronic",
        price: 129,
        discription:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto laborum vel, doloribus commodi voluptas quod deserunt blanditiis exercitationem sunt non.",
    },
    {
        name: "Phone",
        type: "Electronic",
        price: 259,
        discription:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto laborum vel, doloribus commodi voluptas quod deserunt blanditiis exercitationem sunt non.",
    },
    {
        name: "Camera",
        type: "Electronic",
        price: 479,
        discription:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto laborum vel, doloribus commodi voluptas quod deserunt blanditiis exercitationem sunt non.",
    },
    {
        name: "Panasonic",
        type: "Electronic",
        price: 1599,
        discription:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto laborum vel, doloribus commodi voluptas quod deserunt blanditiis exercitationem sunt non.",
    },
];
const popularStockIn = [
    {
        img: "https://t4.ftcdn.net/jpg/04/39/60/05/360_F_439600528_2FWTMQDiXYv6T0qolS57KSxiNbqlhDTa.jpg",
        name: "Computer",
        category: "shoe",
        stock: 799,
    },
    {
        img: "https://t4.ftcdn.net/jpg/04/39/60/05/360_F_439600528_2FWTMQDiXYv6T0qolS57KSxiNbqlhDTa.jpg",
        name: "Printer",
        category: "shoe",
        stock: 129,
    },
    {
        img: "https://t4.ftcdn.net/jpg/04/39/60/05/360_F_439600528_2FWTMQDiXYv6T0qolS57KSxiNbqlhDTa.jpg",
        name: "Phone",
        category: "shoe",
        stock: 259,
    },
    {
        img: "https://t4.ftcdn.net/jpg/04/39/60/05/360_F_439600528_2FWTMQDiXYv6T0qolS57KSxiNbqlhDTa.jpg",
        name: "Camera",
        category: "shoe",
        stock: 479,
    },
    {
        img: "https://t4.ftcdn.net/jpg/04/39/60/05/360_F_439600528_2FWTMQDiXYv6T0qolS57KSxiNbqlhDTa.jpg",
        name: "Panasonic",
        category: "shoe",
        stock: 1599,
    },
];
const Dashboard = () => {
    const [timeRange, setTimeRange] = useState(["month", "week", "day", "hour"]);

    const lineData = [
        { name: "January", thisYear: 50, lastYear: 45 },
        { name: "February", thisYear: 40, lastYear: 30 },
        { name: "March", thisYear: 20, lastYear: 15 },
        { name: "April", thisYear: 50, lastYear: 45 },
        { name: "May", thisYear: 20, lastYear: 15 },
        { name: "June", thisYear: 25, lastYear: 20 },
        { name: "July", thisYear: 30, lastYear: 25 },
        { name: "August", thisYear: 40, lastYear: 30 },
        { name: "September", thisYear: 25, lastYear: 20 },
        { name: "October", thisYear: 50, lastYear: 45 },
        { name: "November", thisYear: 30, lastYear: 25 },
        { name: "December", thisYear: 35, lastYear: 30 },
    ];

    const pieData = [
        { name: "thisMonth", value: 63.2 },
        { name: "lastMonth", value: 30 },
    ];
    const RADIAN = Math.PI / 180;

    const renderCustomizedLabel = ({
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        percent,
    }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
        const y = cy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

        return (
            <text
                x={x}
                y={y}
                fill="white"
                textAnchor={x > cx ? "start" : "end"}
                dominantBaseline="central"
            >
                {`${((percent ?? 1) * 100).toFixed(0)}%`}
            </text>
        );
    };
    const COLORS = ["#0088FE", "#FFBB28", "#00C49F"];

    const topReferrals = [
        { name: "GitHub", value: 19301 },
        { name: "Stack Overflow", value: 11201 },
        { name: "Hacker News", value: 9301 },
        { name: "Reddit", value: 8301 },
    ];

    const goalOverview = [
        {
            name: "Social Share",
            completions: 29,
            value: 120,
            conversion: 45,
            fill: "#FF8042",
        },
        {
            name: "EBook Download",
            completions: 19,
            value: 120,
            conversion: 43,
            fill: "#00C49F",
        },
    ];

    const upData = [
        { name: "1", value: 10 },
        { name: "2", value: 15 },
        { name: "3", value: 20 },
    ];

    const downData = [
        { name: "1", value: 20 },
        { name: "2", value: 15 },
        { name: "3", value: 10 },
    ];

    return (
        <div className="p-6 bg-transparent min-h-screen">
            {/* Top Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-purple-300/50 text-purple-800 rounded-tl-lg rounded-tr-lg shadow-sm">
                    <div className="px-4 pt-2">
                        <div className="flex justify-between items-center ">
                            <h3 className="text-lg font-semibold">Sale</h3>
                            <RiShoppingCartFill className="text-5xl text-purple-800" />
                        </div>
                        <p className="text-xl">
                            2,390 <span className="text-green-800 text-base">↑ 12.4%</span>
                        </p>
                    </div>
                    <div className="h-10 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart
                                data={dataAreaCard}
                                margin={{
                                    top: 0,
                                    right: 0,
                                    left: 0,
                                    bottom: 0,
                                }}
                            >
                                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                                {/* <XAxis dataKey="name" />
                <YAxis /> */}
                                {/* <Tooltip /> */}
                                {/* <Legend /> */}
                                <Area
                                    type="monotone"
                                    dataKey={`${Object.keys(dataAreaCard[0])[1]}`}
                                    stackId="1"
                                    stroke="#8884d8"
                                    fill="#8884df"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="bg-yellow-300/50 text-yellow-800 rounded-tl-lg rounded-tr-lg shadow-sm">
                    <div className="px-4 pt-2">
                        <div className="flex justify-between items-center ">
                            <h3 className="text-lg font-semibold">Stock</h3>
                            <FaWarehouse className="text-5xl text-yellow-800" />
                        </div>
                        <p className="text-xl">
                            2,390 <span className="text-green-800 text-base">↑ 12.4%</span>
                        </p>
                    </div>
                    <div className="h-10 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart
                                data={dataAreaCard}
                                margin={{
                                    top: 0,
                                    right: 0,
                                    left: 0,
                                    bottom: 0,
                                }}
                            >
                                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                                {/* <XAxis dataKey="name" />
                <YAxis /> */}
                                {/* <Tooltip /> */}
                                {/* <Legend /> */}
                                <Area
                                    type="monotone"
                                    dataKey={`${Object.keys(dataAreaCard[0])[1]}`}
                                    stackId="1"
                                    stroke="#dab600"
                                    fill="#e9d700"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="bg-red-300/50 text-red-800 rounded-tl-lg rounded-tr-lg shadow-sm">
                    <div className="px-4 pt-2">
                        <div className="flex justify-between items-center ">
                            <h3 className="text-lg font-semibold">Purchase</h3>
                            <RiMoneyDollarCircleFill className="text-5xl text-red-800" />
                        </div>
                        <p className="text-xl">
                            2,390 <span className="text-green-800 text-base">↑ 12.4%</span>
                        </p>
                    </div>
                    <div className="h-10 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart
                                data={dataAreaCard}
                                margin={{
                                    top: 0,
                                    right: 0,
                                    left: 0,
                                    bottom: 0,
                                }}
                            >
                                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                                {/* <XAxis dataKey="name" />
                <YAxis /> */}
                                {/* <Tooltip /> */}
                                {/* <Legend /> */}
                                <Area
                                    type="monotone"
                                    dataKey={`${Object.keys(dataAreaCard[0])[1]}`}
                                    stackId="1"
                                    stroke="#ff4d00"
                                    fill="#ff7800"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="bg-green-300/50 text-green-800 rounded-tl-lg rounded-tr-lg shadow-sm">
                    <div className="px-4 pt-2">
                        <div className="flex justify-between items-center ">
                            <h3 className="text-lg font-semibold">Revenue</h3>
                            <FaMoneyBillTrendUp className="text-5xl text-green-800" />
                        </div>
                        <p className="text-xl">
                            2,390 <span className="text-green-800 text-base">↑ 12.4%</span>
                        </p>
                    </div>
                    <div className="h-10 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart
                                data={dataAreaCard}
                                margin={{
                                    top: 0,
                                    right: 0,
                                    left: 0,
                                    bottom: 0,
                                }}
                            >
                                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                                {/* <XAxis dataKey="name" />
                <YAxis /> */}
                                {/* <Tooltip /> */}
                                {/* <Legend /> */}
                                <Area
                                    type="monotone"
                                    dataKey={`${Object.keys(dataAreaCard[0])[1]}`}
                                    stackId="1"
                                    stroke="#398564"
                                    fill="#398564"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Sessions and Devices */}
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6 text-xs">
                <div className="lg:col-span-2 bg-white dark:bg-gray-800 dark:text-gray-200 p-4 pb-20 rounded-lg shadow-md h-96">
                    <div className="flex justify-between mb-4">
                        <div className="border-l-4 border-green-500 flex-1 bg-gradient-to-r from-green-500/50 dark:to-gray-800 to-white px-3">
                            <h3 className="text-lg font-semibold">Purchase Line Chart</h3>
                        </div>
                        <div className="space-x-2">
                            <button
                                onClick={() => setTimeRange("hour")}
                                className={`px-2 py-1 rounded ${timeRange[0] === "hour"
                                    ? "bg-green-800 text-white"
                                    : "bg-gray-200 dark:bg-gray-600"
                                    }`}
                            >
                                Hour
                            </button>
                            <button
                                onClick={() => setTimeRange("day")}
                                className={`px-2 py-1 rounded ${timeRange[0] === "day"
                                    ? "bg-green-800 text-white"
                                    : "bg-gray-200 dark:bg-gray-600"
                                    }`}
                            >
                                Day
                            </button>
                            <button
                                onClick={() => setTimeRange("week")}
                                className={`px-2 py-1 rounded ${timeRange[0] === "week"
                                    ? "bg-green-800 text-white"
                                    : "bg-gray-200 dark:bg-gray-600"
                                    }`}
                            >
                                Week
                            </button>
                            <button
                                onClick={() => setTimeRange("month")}
                                className={`px-2 py-1 rounded ${timeRange[0] === "month"
                                    ? "bg-green-800 text-white"
                                    : "bg-gray-200 dark:bg-gray-600"
                                    }`}
                            >
                                Month
                            </button>
                        </div>
                    </div>

                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            data={lineData}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey={`${Object.keys(lineData[0])[1]}`}
                                stroke="#0088FE"
                                activeDot={{ r: 8 }}
                            />
                            <Line
                                type="monotone"
                                dataKey={`${Object.keys(lineData[0])[2]}`}
                                stroke="#FF0000"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <div className="col-span-1 bg-white dark:bg-gray-800 dark:text-gray-200 p-4 rounded-lg shadow">
                    <div className="border-l-4 border-blue-500 bg-gradient-to-r from-blue-500/50 dark:to-gray-800 to-white px-3">
                        <h3 className="text-lg font-semibold">Popular Purchase</h3>
                    </div>
                    <div className="mt-3 flex flex-col gap-3 p-2">
                        {popularPurchase.map((ex, index) => (
                            <div key={index} className="flex gap-5 items-center h-10">
                                <div>
                                    <h1 className="text-[15px] font-extrabold text-gray-600">
                                        {ex.name}
                                    </h1>
                                    <p className="text-green-800">{ex.type}</p>
                                </div>
                                <div className="flex-1 text-gray-800 line-clamp-2 text-ellipsis overflow-hidden">
                                    {ex.discription}
                                </div>
                                <p className="text-red-600">-${ex.price}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* Sessions and Devices */}
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6 text-xs">
                <div className="lg:col-span-2 bg-white dark:bg-gray-800 dark:text-gray-200 p-5 pb-20 rounded-lg shadow-md h-96">
                    <div className="flex justify-between mb-4">
                        <div className="border-l-4 border-green-500 flex-1 bg-gradient-to-r from-green-500/50 dark:to-gray-800 to-white px-3">
                            <h3 className="text-lg font-semibold">Revenue Area Chart</h3>
                        </div>
                        <div className="space-x-2">
                            <button
                                onClick={() => setTimeRange("hour")}
                                className={`px-2 py-1 rounded ${timeRange[1] === "hour"
                                    ? "bg-green-800 text-white"
                                    : "bg-gray-200 dark:bg-gray-600"
                                    }`}
                            >
                                Hour
                            </button>
                            <button
                                onClick={() => setTimeRange("day")}
                                className={`px-2 py-1 rounded ${timeRange[1] === "day"
                                    ? "bg-green-800 text-white"
                                    : "bg-gray-200 dark:bg-gray-600"
                                    }`}
                            >
                                Day
                            </button>
                            <button
                                onClick={() => setTimeRange("week")}
                                className={`px-2 py-1 rounded ${timeRange[1] === "week"
                                    ? "bg-green-800 text-white"
                                    : "bg-gray-200 dark:bg-gray-600"
                                    }`}
                            >
                                Week
                            </button>
                            <button
                                onClick={() => setTimeRange("month")}
                                className={`px-2 py-1 rounded ${timeRange[1] === "month"
                                    ? "bg-green-800 text-white"
                                    : "bg-gray-200 dark:bg-gray-600"
                                    }`}
                            >
                                Month
                            </button>
                        </div>
                    </div>
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            width={800}
                            height={800}
                            data={dataArea}
                            margin={{
                                top: 10,
                                right: 30,
                                left: 0,
                                bottom: 0,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Area
                                type="monotone"
                                dataKey={`${Object.keys(dataArea[0])[2]}`}
                                // stackId="1"
                                stroke="#8884d8"
                                fill="#8884d8"
                                fillOpacity={0.4}
                            />
                            <Area
                                type={curveCardinal.tension(0.2)}
                                dataKey={`${Object.keys(dataArea[0])[1]}`}
                                // stackId="1"
                                stroke="#82ca9d"
                                fill="#82ca9d"
                                fillOpacity={0.3}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
                <div className="col-span-1 bg-white dark:bg-gray-800 dark:text-gray-200 p-4 rounded-lg shadow">
                    <div className="border-l-4 border-blue-500 flex-1 bg-gradient-to-r from-blue-500/50 dark:to-gray-800 to-white px-3">
                        <h3 className="text-lg font-semibold">Popular Revenue</h3>
                    </div>
                    <PieChart width={300} height={200}>
                        <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {pieData.map((entry, index) => (
                                <Cell
                                    key={`cell-${entry.name}`}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                    <div>
                        {pieData.map((entry, index) => (
                            <div key={index} className="flex justify-between text-gray-800 items-center mb-3">
                                <div className="flex gap-2 items-center">
                                    <div
                                        style={{ background: COLORS[index % COLORS.length] }}
                                        className={`w-2 h-2`}
                                    />
                                    {entry.name}
                                </div>
                                <div>
                                    <p>{entry.value}%</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* <p className="text-center mt-2 text-sm text-gray-800">Last Week: 8</p> */}
                    <button className="mt-4 w-full bg-blue-800 text-white py-2 rounded">
                        View Full Report
                    </button>
                </div>
            </div>
            {/* Sessions and Devices */}
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6 text-xs">
                <div className="lg:col-span-2 bg-white dark:bg-gray-800 dark:text-gray-200 p-5 pb-20 rounded-lg shadow-md h-96">
                    <div className="flex justify-between mb-4">
                        <div className="border-l-4 border-green-500 flex-1 bg-gradient-to-r from-green-500/50 dark:to-gray-800 to-white px-3">
                            <h3 className="text-lg font-semibold">Stock Bar Chart</h3>
                        </div>
                        <div className="space-x-2">
                            <button
                                onClick={() => setTimeRange("hour")}
                                className={`px-2 py-1 rounded ${timeRange[2] === "hour"
                                    ? "bg-green-800 text-white"
                                    : "bg-gray-200 dark:bg-gray-600"
                                    }`}
                            >
                                Hour
                            </button>
                            <button
                                onClick={() => setTimeRange("day")}
                                className={`px-2 py-1 rounded ${timeRange[2] === "day"
                                    ? "bg-green-800 text-white"
                                    : "bg-gray-200 dark:bg-gray-600"
                                    }`}
                            >
                                Day
                            </button>
                            <button
                                onClick={() => setTimeRange("week")}
                                className={`px-2 py-1 rounded ${timeRange[2] === "week"
                                    ? "bg-green-800 text-white"
                                    : "bg-gray-200 dark:bg-gray-600"
                                    }`}
                            >
                                Week
                            </button>
                            <button
                                onClick={() => setTimeRange("month")}
                                className={`px-2 py-1 rounded ${timeRange[2] === "month"
                                    ? "bg-green-800 text-white"
                                    : "bg-gray-200 dark:bg-gray-600"
                                    }`}
                            >
                                Month
                            </button>
                        </div>
                    </div>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            width={800}
                            height={300}
                            data={dataBar}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar
                                dataKey={`${Object.keys(dataBar[0])[1]}`}
                                fill="#8884d8"
                                activeBar={<Rectangle fill="pink" stroke="blue" />}
                            />
                            <Bar
                                dataKey={`${Object.keys(dataBar[0])[2]}`}
                                fill="#82ca9d"
                                activeBar={<Rectangle fill="gold" stroke="purple" />}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="col-span-1 bg-white dark:bg-gray-800 dark:text-gray-200 p-4 rounded-lg shadow">
                    <div className="border-l-4 border-blue-500 flex-1 bg-gradient-to-r from-blue-500/50 dark:to-gray-800 to-white px-3">
                        <h3 className="text-lg font-semibold">Popular Stock In</h3>
                    </div>
                    <div className="mt-3 flex flex-col gap-3 p-2">
                        {popularStockIn.map((s, index) => (
                            <div key={index} className="flex justify-between items-center h-10">
                                <div className="flex gap-2">
                                    <img className="w-10" src={s.img} alt="" />
                                    <div>
                                        <h1 className="text-[15px] font-extrabold text-gray-600">
                                            {s.name}
                                        </h1>
                                        <p className="text-info">{s.category}</p>
                                    </div>
                                </div>
                                {/* <div className="flex-1 text-gray-800 line-clamp-2 text-ellipsis overflow-hidden">
                  {s.discription}
                </div> */}
                                <p className="text-green-500">+{s.stock}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* Sessions and Devices */}
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6 text-xs">
                <div className="lg:col-span-2 bg-white dark:bg-gray-800 dark:text-gray-200 p-5 pb-20 rounded-lg shadow-md h-96">
                    <div className="flex justify-between mb-4">
                        <div className="border-l-4 border-green-500 flex-1 bg-gradient-to-r from-green-500/50 dark:to-gray-800 to-white px-3">
                            <h3 className="text-lg font-semibold">Sale Redar Chart</h3>
                        </div>
                        <div className="space-x-2">
                            <button
                                onClick={() => setTimeRange("hour")}
                                className={`px-2 py-1 rounded ${timeRange[3] === "hour"
                                    ? "bg-green-800 text-white"
                                    : "bg-gray-200 dark:bg-gray-600"
                                    }`}
                            >
                                Hour
                            </button>
                            <button
                                onClick={() => setTimeRange("day")}
                                className={`px-2 py-1 rounded ${timeRange[3] === "day"
                                    ? "bg-green-800 text-white"
                                    : "bg-gray-200 dark:bg-gray-600"
                                    }`}
                            >
                                Day
                            </button>
                            <button
                                onClick={() => setTimeRange("week")}
                                className={`px-2 py-1 rounded ${timeRange[3] === "week"
                                    ? "bg-green-800 text-white"
                                    : "bg-gray-200 dark:bg-gray-600"
                                    }`}
                            >
                                Week
                            </button>
                            <button
                                onClick={() => setTimeRange("month")}
                                className={`px-2 py-1 rounded ${timeRange[3] === "month"
                                    ? "bg-green-800 text-white"
                                    : "bg-gray-200 dark:bg-gray-600"
                                    }`}
                            >
                                Month
                            </button>
                        </div>
                    </div>
                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={dataRadar}>
                            <PolarGrid />
                            <PolarAngleAxis dataKey="subject" />
                            <PolarRadiusAxis angle={30} domain={[0, 150]} />
                            <Tooltip />
                            <Radar
                                name={`${Object.keys(dataRadar[0])[1]}`}
                                dataKey={`${Object.keys(dataRadar[0])[1]}`}
                                stroke="#8884d8"
                                fill="#8884d8"
                                fillOpacity={0.6}
                            />
                            <Radar
                                name={`${Object.keys(dataRadar[0])[2]}`}
                                dataKey={`${Object.keys(dataRadar[0])[2]}`}
                                stroke="#82ca9d"
                                fill="#82ca9d"
                                fillOpacity={0.6}
                            />
                            <Legend />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>
                <div className="col-span-1 bg-white dark:bg-gray-800 dark:text-gray-200 p-4 rounded-lg shadow">
                    <div className="border-l-4 border-blue-500 flex-1 bg-gradient-to-r from-blue-500/50 dark:to-gray-800 to-white px-3">
                        <h3 className="text-lg font-semibold">Popular Product Sale</h3>
                    </div>
                    <div className="mt-3 flex flex-col gap-4 p-2">
                        {popularStockIn.map((s, index) => (
                            <div key={index} className="flex justify-between items-center h-10">
                                <div className="flex gap-2">
                                    <img className="w-10" src={s.img} alt="" />
                                    <div>
                                        <h1 className="text-[15px] font-extrabold text-gray-600">
                                            {s.name}
                                        </h1>
                                        <p className="text-info">{s.category}</p>
                                    </div>
                                </div>
                                <div className=" text-gray-800 line-clamp-2 text-ellipsis overflow-hidden">
                                    Now have {s.stock} in stock
                                </div>
                                <p className="text-blue-500">${s.stock}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Row */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-gray-800 dark:text-gray-200 p-4 rounded-lg shadow">
                    <h3 className="text-lg font-semibold">Top Referrals</h3>
                    {topReferrals.map((item, index) => (
                        <div key={index} className="flex justify-between py-2">
                            <span>{item.name}</span>
                            <span>{item.value.toLocaleString()}</span>
                        </div>
                    ))}
                </div>
                <div className="bg-white dark:bg-gray-800 dark:text-gray-200 p-4 rounded-lg shadow">
                    <h3 className="text-lg font-semibold">Goal Overview</h3>
                    {goalOverview.map((item, index) => (
                        <div key={index} className="grid grid-cols-4 gap-2 py-2 text-sm">
                            <span>{item.name}</span>
                            <span>{item.completions} Completions</span>
                            <span>${item.value} Value</span>
                            <div className="flex items-center">
                                <RadialBarChart
                                    width={50}
                                    height={50}
                                    innerRadius="80%"
                                    outerRadius="100%"
                                    startAngle={180}
                                    endAngle={0}
                                    data={[
                                        { name: "conv", value: item.conversion, fill: item.fill },
                                    ]}
                                >
                                    <RadialBar
                                        minAngle={15}
                                        background={{ fill: "#eee" }}
                                        clockWise
                                        dataKey="value"
                                    />
                                </RadialBarChart>
                                <span className="ml-2">{item.conversion}% Conversion Rate</span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="bg-white dark:bg-gray-800 dark:text-gray-200 p-4 rounded-lg shadow">
                    <h3 className="text-lg font-semibold">User Country</h3>
                    <div className="h-48 bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-gray-800">
                        World Map Placeholder
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;