"use client";
import React, { useEffect, useState } from "react";

import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from "chart.js";
import 'chart.js/auto';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);
const options = {
  indexAxis: "x",
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "right",
    },
    title: {
      display: true,
      text: "Chart.js Horizontal Bar Chart",
    },
  },
};

export default function HorizontalChart() {
  const [sales, setSales] = useState([]);
  const [data, setData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = "http://localhost:3000/api/getSales";
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache, no-store, must-revalidate",
            Pragma: "no-cache",
            Expires: "0",
          },
        });
        const sales = await response.json();
        console.log(response);
        if (sales) {
          setSales(sales.result);
        } else {
          setSales([]);
        }
        const salesByEmpId = sales.result.reduce((result, sale) => {
          if (result.has(sale.empid)) {
            result.set(sale.empid, result.get(sale.empid) + sale.sales);
          } else {
            result.set(sale.empid, sale.sales);
          }
          return result;
        }, new Map());

        setData({
          labels: Array.from(salesByEmpId.keys()),
          datasets: [
            {
              label: "Sales",
              data: Array.from(salesByEmpId.values()),
              borderColor: "rgb(255,0,0)",
              backgroundColor: "rgba(25, 90, 13, 0.5)",
            },
          ],
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div style={{ width: "80%", height: "50%" }}>
      <Bar data={data} options={options} />
      <Pie data={data} />
    </div>
  );
}
