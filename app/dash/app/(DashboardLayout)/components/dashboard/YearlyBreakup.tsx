"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useTheme } from "@mui/material/styles";
import { Grid, Stack, Typography, Avatar } from "@mui/material";
import { IconArrowUpLeft, IconArrowDownRight } from "@tabler/icons-react";

import DashboardCard from "../shared/DashboardCard";
import { Console } from "console";

const YearlyBreakup = () => {
  // chart color
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const primarylight = "#ecf2ff";
  const successlight = theme.palette.success.light;
  const errorlight = "#fdede8";

  const [totalSales, setTotalSales] = useState(0); // Initialize totalSales
  // chart
  const optionscolumnchart: any = {
    chart: {
      type: "donut",
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: "#adb0bb",
      toolbar: {
        show: false,
      },
      height: 155,
    },
    colors: [primary, primarylight, "#F9F9FD"],
    plotOptions: {
      pie: {
        startAngle: 0,
        endAngle: 360,
        donut: {
          size: "75%",
          background: "transparent",
        },
      },
    },
    tooltip: {
      theme: theme.palette.mode === "dark" ? "dark" : "light",
      fillSeriesColor: false,
    },
    stroke: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    responsive: [
      {
        breakpoint: 991,
        options: {
          chart: {
            width: 120,
          },
        },
      },
    ],
  };
  // const seriescolumnchart: any = [38, 40, 25];

  // const [sales, setSales] = useState([]);
  const sales = [
    //yyyy-mm-dd
    { empid: 1, sales: 100, date: "2023-02-12" },
    { empid: 2, sales: 200, date: "2022-02-11" },
    { empid: 1, sales: 150, date: "2023-12-12" },
    { empid: 3, sales: 300, date: "2022-01-10" },
    { empid: 3, sales: 300, date: "2022-01-10" },
    { empid: 3, sales: 300, date: "2022-01-10" },
    { empid: 3, sales: 300, date: "2022-01-10" },
    { empid: 4, sales: 1000, date: "2021-01-10" },
    { empid: 4, sales: 800, date: "2023-01-10" },
  ];

  const salesByYear = Object.values(
    sales.reduce((result, sale) => {
      const year = sale.date.substring(0, 4);
      result[year] = (result[year] || 0) + sale.sales;
      return result;
    }, {})
  ) as number[];
  console.log("salesbyyear", salesByYear);
  const seriescolumnchart: any = salesByYear;
  const increasePercentage = +(
    ((salesByYear[salesByYear.length - 1] -
      salesByYear[salesByYear.length - 2]) /
      salesByYear[salesByYear.length - 2]) *
    100
  ).toFixed(1);

  console.log(increasePercentage);

  const [data, setData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const url = "http://localhost:3000/api/getSales";
        // const response = await fetch(url, {
        //   method: "GET",
        //   headers: {
        //     "Content-Type": "application/json",
        //     "Cache-Control": "no-cache, no-store, must-revalidate",
        //     Pragma: "no-cache",
        //     Expires: "0",
        //   },
        // });
        // const sales = await response.json();
        // console.log(response);
        // if (sales) {
        //   setSales(sales.result);
        // } else {
        //   setSales([]);
        // }
        const salesByEmpId = sales.reduce((result, sale) => {
          if (result.has(sale.empid)) {
            result.set(sale.empid, result.get(sale.empid) + sale.sales);
          } else {
            result.set(sale.empid, sale.sales);
          }
          return result;
        }, new Map());

        var totalSales = sales.reduce((total, sale) => total + sale.sales, 0);
        console.log(totalSales);

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
        setTotalSales(totalSales); // Set totalSales in state
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <DashboardCard title="Yearly Breakup">
      <Grid container spacing={3}>
        {/* column */}
        <Grid item xs={7} sm={7}>
          <Typography variant="h3" fontWeight="700">
            Rs. {totalSales}
          </Typography>
          <Stack direction="row" spacing={1} mt={1} alignItems="center">
            {increasePercentage < 0 ? (
              <Avatar sx={{ bgcolor: errorlight, width: 27, height: 27 }}>
                <IconArrowDownRight width={20} color="#FA896B" />
              </Avatar>
            ) : (
              <Avatar sx={{ bgcolor: successlight, width: 27, height: 27 }}>
                <IconArrowUpLeft width={20} color="#39B69A" />
              </Avatar>
            )}

            <Typography variant="subtitle2" fontWeight="600">
              {increasePercentage}%
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              last year
            </Typography>
          </Stack>
          <Stack spacing={3} mt={5} direction="row">
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar
                sx={{
                  width: 9,
                  height: 9,
                  bgcolor: primary,
                  svg: { display: "none" },
                }}
              ></Avatar>
              {/* bullet points for 2022 2023 */}
              <Typography variant="subtitle2" color="textSecondary">
                2022
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar
                sx={{
                  width: 9,
                  height: 9,
                  bgcolor: primarylight,
                  svg: { display: "none" },
                }}
              ></Avatar>
              {/* bullet points for 2022 2023 */}
              <Typography variant="subtitle2" color="textSecondary">
                2023
              </Typography>
            </Stack>
          </Stack>
        </Grid>
        {/* column */}
        <Grid item xs={5} sm={5}>
          <Chart
            options={optionscolumnchart}
            series={seriescolumnchart}
            type="donut"
            height="150px"
          />
        </Grid>
      </Grid>
    </DashboardCard>
  );
};

export default YearlyBreakup;
