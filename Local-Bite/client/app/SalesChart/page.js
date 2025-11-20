"use client"
import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';

// Your data from step 2
const data = [
    { name: 'Mon', 'Total Orders': 400, 'Avg Value': 240 },
    { name: 'Tue', 'Total Orders': 300, 'Avg Value': 139 },
    { name: 'Wed', 'Total Orders': 500, 'Avg Value': 980 },
    { name: 'Thu', 'Total Orders': 450, 'Avg Value': 390 },
];

const OrdersChart = () => {
    return (
        // 1. Always wrap Recharts in ResponsiveContainer to make it fit your div
        <ResponsiveContainer width="100%" height={300}>
            {/* 2. LineChart is the main container component, pass it your data */}
            <LineChart
                data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
                {/* 3. CartesianGrid draws the background lines */}
                <CartesianGrid strokeDasharray="3 3" />

                {/* 4. XAxis maps the 'name' key from your data to the bottom */}
                <XAxis dataKey="name" />

                {/* 5. YAxis handles the vertical scale */}
                <YAxis />

                {/* 6. Tooltip shows data when the user hovers over a point */}
                <Tooltip />

                {/* 7. Legend explains what each line color means */}
                <Legend />

                {/* 8. Line plots the actual data! dataKey matches a key in your data objects */}
                <Line type="monotone" dataKey="Total Orders" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="Avg Value" stroke="#82ca9d" />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default OrdersChart;