import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell, ResponsiveContainer
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF4560', '#00E396'];

export default function Sale({ visible, onClose }) {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [newClients, setNewClients] = useState([]);
  const [clientData, setClientData] = useState([]);

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await axios.get('/bill/bills', { params: { date: selectedDate } });
        setBills(response.data.bills);
        setNewClients(response.data.clients);
        setLoading(false);
      } catch (err) {
        setError(err.response ? err.response.data.message : 'An error occurred while fetching bills');
        setLoading(false);
      }
    };

    const fetchClients = async () => {
      try {
        const response = await axios.get('/getclient');
        setClientData(response.data);
      } catch (err) {
        console.error('Error fetching client data:', err);
      }
    };

    fetchSalesData();
    fetchClients();
  }, [selectedDate]);

  if (!visible) return null;

  const totalSales = bills.reduce((acc, bill) => acc + bill.total, 0);

  const itemSales = bills.flatMap(bill => bill.items)
    .reduce((acc, item) => {
      acc[item.name] = (acc[item.name] || 0) + item.quantity * item.price;
      return acc;
    }, {});

  const itemSalesData = Object.entries(itemSales).map(([name, total]) => ({ name, total }));

  const customerBills = bills.reduce((acc, bill) => {
    acc[bill.clientId] = (acc[bill.clientId] || 0) + bill.total;
    return acc;
  }, {});

  const customerBillsData = Object.entries(customerBills).map(([clientId, total]) => {
    const client = clientData.find(c => c.tp === clientId);
    const name = client ? `${client.fname} ${client.lname}` : 'Unknown';
    return { name, total };
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[1000px] h-[900px] overflow-y-auto">
        <h1 className="mb-4 text-2xl font-bold">Sales Dashboard</h1>

        <div className="mb-2">
          <input
            type='date'
            className='p-2 border rounded'
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="text-center">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500">Error: {error}</div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="p-4 border rounded">
                <h3 className="font-bold">Total Sales</h3>
                <p className="text-2xl font-bold">${totalSales.toFixed(2)}</p>
              </div>
              <div className="p-4 border rounded">
                <h3 className="font-bold">New Clients on {selectedDate}</h3>
                <p className="text-2xl font-bold">{newClients.length}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 mb-4">
              {/* Item Sales Bar Chart */}
              <div className="mb-4">
                <h3 className="mb-2 font-bold">Item Sales</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={itemSalesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="total" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Flex Container for Customer Bills Charts */}
            <div className="flex gap-4 mb-4">
              {/* Customer Bills Pie Chart */}
              <div className="flex-1">
                <h3 className="mb-2 font-bold">Customer Bills (Pie Chart)</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={customerBillsData}
                        cx="50%"
                        cy="50%"
                        label={(entry) => `${entry.name}`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="total"
                      >
                        {customerBillsData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Customer Bills Bar Chart */}
              <div className="flex-1">
                <h3 className="mb-2 font-bold">Customer Bills (Bar Chart)</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={customerBillsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="total" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </>
        )}

        <div className="mt-4 text-center">
          <button
            className="px-4 py-2 text-gray-700 bg-gray-300 rounded hover:bg-gray-400"
            onClick={onClose}
            type="button"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
