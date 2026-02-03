"use client";

import React from "react";
import { motion } from "framer-motion";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    AreaChart,
    Area,
} from "recharts";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Users,
    Briefcase,
    CheckCircle,
    CreditCard,
    TrendingUp,
    MapPin,
} from "lucide-react";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

interface MetaData {
    totalGuides: number;
    totalTourists: number;
    totalBookings: number;
    totalPayments: number;
    totalRevenue: number;
    bookingStatusDistribution: { status: string; count: number }[];
    monthlyBookings: { month: string; count: number }[];
}

const AdminDashboardOverview = ({ data }: { data: MetaData }) => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
        },
    };

    const stats = [
        {
            title: "Total Guides",
            value: data.totalGuides,
            icon: Briefcase,
            color: "text-blue-600",
            bg: "bg-blue-100",
        },
        {
            title: "Total Tourists",
            value: data.totalTourists,
            icon: Users,
            color: "text-green-600",
            bg: "bg-green-100",
        },
        {
            title: "Total Bookings",
            value: data.totalBookings,
            icon: CheckCircle,
            color: "text-purple-600",
            bg: "bg-purple-100",
        },
        {
            title: "Total Revenue",
            value: `$${data.totalRevenue.toLocaleString()}`,
            icon: CreditCard,
            color: "text-orange-600",
            bg: "bg-orange-100",
        },
    ];

    // Format month for chart
    const formattedMonthlyBookings = data.monthlyBookings.map((item) => ({
        ...item,
        month: new Date(item.month).toLocaleString("default", { month: "short" }),
    }));

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
        >
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Dashboard Overview</h2>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, index) => (
                    <motion.div
                        key={index}
                        variants={itemVariants}
                        whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    >
                        <Card className="hover:shadow-2xl transition-all duration-300 overflow-hidden relative border-none bg-white/80 backdrop-blur-sm shadow-sm">
                            <div className={`absolute -right-4 -top-4 opacity-5 ${stat.color} rotate-12`}>
                                <stat.icon size={120} />
                            </div>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-semibold tracking-wide uppercase opacity-70">
                                    {stat.title}
                                </CardTitle>
                                <div className={`${stat.bg} ${stat.color} p-2.5 rounded-xl shadow-inner`}>
                                    <stat.icon size={19} />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-black">{stat.value}</div>
                                <div className="flex items-center mt-1 text-xs font-medium text-emerald-600">
                                    <TrendingUp size={12} className="mr-1" />
                                    <span>+12.5%</span>
                                    <span className="text-muted-foreground ml-1 font-normal">vs last month</span>
                                </div>
                            </CardContent>
                            <div className={`h-1 w-full absolute bottom-0 left-0 bg-gradient-to-r from-transparent via-${stat.color.split('-')[1]}-400 to-transparent opacity-30`} />
                        </Card>
                    </motion.div>
                ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                {/* Monthly Bookings Area Chart */}
                <motion.div variants={itemVariants} className="col-span-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Monthly Bookings Growth</CardTitle>
                            <CardDescription>
                                Overview of bookings made over the last few months.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="pl-2">
                            <div className="h-[350px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={formattedMonthlyBookings}>
                                        <defs>
                                            <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                                        <XAxis
                                            dataKey="month"
                                            stroke="#888888"
                                            fontSize={12}
                                            tickLine={false}
                                            axisLine={false}
                                        />
                                        <YAxis
                                            stroke="#888888"
                                            fontSize={12}
                                            tickLine={false}
                                            axisLine={false}
                                            tickFormatter={(value) => `${value}`}
                                        />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: "rgba(255, 255, 255, 0.9)",
                                                borderRadius: "8px",
                                                border: "none",
                                                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                                            }}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="count"
                                            stroke="#8884d8"
                                            fillOpacity={1}
                                            fill="url(#colorCount)"
                                            strokeWidth={3}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Booking Status Pie Chart */}
                <motion.div variants={itemVariants} className="col-span-3">
                    <Card className="h-full">
                        <CardHeader>
                            <CardTitle>Booking Status Distribution</CardTitle>
                            <CardDescription>
                                Breakdown of booking statuses.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px] flex items-center justify-center">
                                {data.bookingStatusDistribution.length > 0 ? (
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={data.bookingStatusDistribution}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={60}
                                                outerRadius={80}
                                                paddingAngle={5}
                                                dataKey="count"
                                                nameKey="status"
                                            >
                                                {data.bookingStatusDistribution.map((entry, index) => (
                                                    <Cell
                                                        key={`cell-${index}`}
                                                        fill={COLORS[index % COLORS.length]}
                                                    />
                                                ))}
                                            </Pie>
                                            <Tooltip
                                                contentStyle={{
                                                    borderRadius: "8px",
                                                }}
                                            />
                                        </PieChart>
                                    </ResponsiveContainer>
                                ) : (
                                    <div className="text-muted-foreground text-sm italic">No booking data available</div>
                                )}
                            </div>
                            {data.bookingStatusDistribution.length > 0 && (
                                <div className="grid grid-cols-2 gap-2 mt-4">
                                    {data.bookingStatusDistribution.map((item, index) => (
                                        <div key={index} className="flex items-center space-x-2">
                                            <div
                                                className="w-3 h-3 rounded-full"
                                                style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                            />
                                            <span className="text-xs font-medium uppercase truncate">
                                                {item.status}: {item.count}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </motion.div>
            </div>

            {/* Additional Stats / Recent Activity Placeholder */}
            <motion.div variants={itemVariants} className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                        <div className="p-2 bg-yellow-100 text-yellow-600 rounded-lg">
                            <TrendingUp size={20} />
                        </div>
                        <div>
                            <CardTitle className="text-lg">Overall Performance</CardTitle>
                            <CardDescription>Up 12% from last week</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="mt-4 h-2 w-full bg-muted rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "75%" }}
                                transition={{ duration: 1, delay: 0.5 }}
                                className="h-full bg-yellow-500"
                            />
                        </div>
                        <div className="flex justify-between mt-2 text-sm">
                            <span className="text-muted-foreground">Target Reach</span>
                            <span className="font-bold text-yellow-600">75%</span>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                        <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                            <MapPin size={20} />
                        </div>
                        <div>
                            <CardTitle className="text-lg">Popular Locations</CardTitle>
                            <CardDescription>Top 5 visited spots</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3 mt-2">
                            {["Dhaka", "Cox's Bazar", "Sylhet"].map((city, i) => (
                                <div key={city} className="flex items-center justify-between">
                                    <span className="text-sm font-medium">{city}</span>
                                    <div className="flex-1 mx-3 h-1.5 bg-muted rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${90 - i * 20}%` }}
                                            transition={{ duration: 1, delay: 0.7 + (i * 0.1) }}
                                            className="h-full bg-blue-500"
                                        />
                                    </div>
                                    <span className="text-xs text-muted-foreground">{(10 - i) * 12}%</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white border-none">
                    <CardHeader>
                        <CardTitle className="text-white">Pro Insights</CardTitle>
                        <CardDescription className="text-indigo-100">AI Generated suggestions</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm leading-relaxed">
                            Based on recent booking trends, we recommend increasing guide availability in Cox's Bazar for the upcoming holiday season.
                        </p>
                        <button className="mt-4 w-full bg-white/20 hover:bg-white/30 text-white py-2 rounded-lg text-sm font-medium transition-colors">
                            View Full Report
                        </button>
                    </CardContent>
                </Card>
            </motion.div>
        </motion.div>
    );
};

export default AdminDashboardOverview;
