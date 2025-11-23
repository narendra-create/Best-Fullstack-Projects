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
    { name: 'Tue', 'Total Orders': 1300, 'Avg Value': 39 },
    { name: 'Wed', 'Total Orders': 500, 'Avg Value': 1980 },
    { name: 'Thu', 'Total Orders': 450, 'Avg Value': 1390 },
];

const OrdersChart = () => {
    return (
        //wraping Recharts in ResponsiveContainer to make it fit my div
        <ResponsiveContainer width="100%" height="100%">
            {/* passing the data here */}
            <LineChart
                data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
                {/* grid size - 3x3 */}
                <CartesianGrid strokeDasharray="3 3" />

                {/* bottom scale label*/}
                <XAxis dataKey="name" />

                {/*vertical scale label */}
                <YAxis />

                {/*shows data when the user hovers over a point */}
                <Tooltip />

                {/*explains what each line color means*/}
                <Legend />

                {/* plots the actual data! dataKey matches a key in your data objects */}
                <Line type="monotone" dataKey="Total Orders" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="Avg Value" stroke="#82ca9d" />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default OrdersChart;