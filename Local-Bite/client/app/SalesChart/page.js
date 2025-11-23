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

//data for testing 

// const data = [
// { month: 'JAN', Total_Orders: 412, Avg_Value: 230 },
// { month: 'FEB', Total_Orders: 520, Avg_Value: 180 },
// { month: 'MAR', Total_Orders: 680, Avg_Value: 260 },
// { month: 'APR', Total_Orders: 305, Avg_Value: 195 },
// { month: 'MAY', Total_Orders: 750, Avg_Value: 245 },
// { month: 'JUN', Total_Orders: 590, Avg_Value: 210 },
// { month: 'JUL', Total_Orders: 810, Avg_Value: 275 },
// { month: 'AUG', Total_Orders: 690, Avg_Value: 220 },
// { month: 'SEP', Total_Orders: 430, Avg_Value: 190 },
// { month: 'OCT', Total_Orders: 920, Avg_Value: 300 },
// { month: 'NOV', Total_Orders: 1, Avg_Value: 200 },
// { month: 'DEC', Total_Orders: 580, Avg_Value: 210 },
// ];


const OrdersChart = ({ data }) => {
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
                <XAxis dataKey="month" name='Month' />

                {/*vertical scale label */}
                <YAxis />

                {/*shows data when the user hovers over a point */}
                <Tooltip />

                {/*explains what each line color means*/}
                <Legend />

                {/* plots the actual data! dataKey matches a key in your data objects */}
                <Line type="monotone" name='Total Orders' dataKey="Total_Orders" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" name='Avg Value' dataKey="Avg_Value" stroke="#82ca9d" />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default OrdersChart;