"use client";
import React, { useEffect, useState } from "react";
import { Select, MenuItem } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import DashboardCard from "../shared/DashboardCard";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const SalesOverview = () => {
  //TODO:const data doesnt get the updated data from salesByEmpId
  const [data, setData] = useState({ labels: [], datasets: [] });

  // const sales = [
  //   { empid: 1, sales: 100 },
  //   { empid: 2, sales: 200 },
  //   { empid: 1, sales: 150 },
  //   { empid: 3, sales: 300 },
  //   { empid: 4, sales: 200 },
  //   { empid: 85, sales: 285 },
  //   { empid: 33, sales: 233 },
  //   { empid: 44, sales: 244 },
  //   { empid: 4, sales: 490 },
  // ];
  // select
  const [month, setMonth] = React.useState("1");

  const handleChange = (event: any) => {
    setMonth(event.target.value);
  };

  // chart color
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;

  // chart
  const optionscolumnchart: any = {
    chart: {
      type: "bar",
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: "#adb0bb",
      toolbar: {
        show: true,
      },
      height: 500,
    },
    colors: [primary, secondary],
    plotOptions: {
      bar: {
        horizontal: false,
        barHeight: "60%",
        columnWidth: "42%",
        borderRadius: [6],
        borderRadiusApplication: "end",
        borderRadiusWhenStacked: "all",
      },
    },

    stroke: {
      show: true,
      width: 5,
      lineCap: "butt",
      colors: ["transparent"],
    },
    dataLabels: {
      enabled: true,
    },
    legend: {
      show: true,
    },
    grid: {
      borderColor: "rgba(0,0,0,0.1)",
      strokeDashArray: 3,
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    yaxis: {
      tickAmount: 10,
    },
    xaxis: {
      axisBorder: {
        show: false,
      },
      // categories: sales.map((data) => data.empid),
    },
    tooltip: {
      theme: theme.palette.mode === "dark" ? "dark" : "light",
      fillSeriesColor: false,
    },
  };
  // const seriescolumnchart: any = [
  //   {
  //     name: "Eanings this month",
  //     data: [355, 390, 300, 350, 390, 180, 355, 390],
  //   },
  //   {
  //     name: "Expense this month",
  //     data: [280, 250, 325, 215, 250, 310, 280, 250],
  //   },
  // ];

  const [sales, setSales] = useState([]);

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
        console.log(salesByEmpId);

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
        console.log(data.datasets);
  
        
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <DashboardCard
      title="Sales Overview"
      action={
        <Select
          labelId="month-dd"
          id="month-dd"
          value={month}
          size="small"
          onChange={handleChange}
        >
          <MenuItem value={1}>March 2023</MenuItem>
          <MenuItem value={2}>April 2023</MenuItem>
          <MenuItem value={3}>May 2023</MenuItem>
        </Select>
      }
    >
      <Chart
        options={optionscolumnchart}
        series={data.datasets}
        // series={sales}
        type="bar"
        height="370px"
      />
    </DashboardCard>
  );
};

export default SalesOverview;
