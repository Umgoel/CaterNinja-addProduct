import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useTheme } from "@mui/material/styles";
import { Stack, Typography, Avatar, Fab } from "@mui/material";
import {
  IconArrowDownRight,
  IconCurrencyRupee,
  IconArrowUpLeft,
} from "@tabler/icons-react";
import DashboardCard from "../shared/DashboardCard";

const MonthlyEarnings = () => {
  // chart color
  const theme = useTheme();
  const secondary = theme.palette.secondary.main;
  const secondarylight = "#f5fcff";
  const errorlight = "#fdede8";
  const successlight = theme.palette.success.light;

  // chart
  const optionscolumnchart: any = {
    chart: {
      type: "area",
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: "#adb0bb",
      toolbar: {
        show: false,
      },
      height: 60,
      sparkline: {
        enabled: true,
      },
      group: "sparklines",
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    fill: {
      colors: [secondarylight],
      type: "solid",
      opacity: 0.05,
    },
    markers: {
      size: 0,
    },
    tooltip: {
      theme: theme.palette.mode === "dark" ? "dark" : "light",
    },
  };
  const sales = [
    //yyyy-mm-dd
    { empid: 1, sales: 100, date: "2023-02-12" },
    { empid: 2, sales: 200, date: "2022-02-11" },
    { empid: 2, sales: 300, date: "2023-08-11" },
    { empid: 4, sales: 290, date: "2023-09-11" },
    { empid: 3, sales: 500, date: "2023-10-11" },
    { empid: 1, sales: 150, date: "2023-12-12" },
    { empid: 1, sales: 150, date: "2023-11-12" },
    { empid: 1, sales: 150, date: "2023-10-12" },
    { empid: 1, sales: 550, date: "2023-02-12" },
    { empid: 1, sales: 850, date: "2023-09-12" },
    { empid: 1, sales: 950, date: "2023-12-12" },
    { empid: 3, sales: 300, date: "2022-01-10" },
    { empid: 4, sales: 1000, date: "2021-01-10" },
    { empid: 4, sales: 800, date: "2023-01-10" },
    { empid: 4, sales: 1800, date: "2023-11-10" },
  ];

  const currentYear = new Date().getFullYear(); // Get the current year

  const monthWiseSales: number[] = Array(12).fill(0); // Initialize an array with 12 elements, representing the 12 months

  sales.forEach((sale) => {
    const year = new Date(sale.date).getFullYear(); // Get the year from the sale date

    if (year === currentYear) {
      const month = new Date(sale.date).getMonth(); // Get the month (0-11) from the sale date
      monthWiseSales[month] += sale.sales; // Add the sale amount to the corresponding month in the array
    }
  });
  // console.log("monthWiseSales",monthWiseSales);
  console.log(monthWiseSales);
  const seriescolumnchart: any = [
    {
      name: "",
      color: secondary,
      // data: [25, 66, 20, 40, 12, 58, 20],
      data: monthWiseSales,
    },
  ];

  const yearlySales = monthWiseSales.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
  const currentMonth = new Date().getMonth();
  const increasePercentage = +(
    ((monthWiseSales[currentMonth] - monthWiseSales[currentMonth - 1]) /
      monthWiseSales[currentMonth - 1]) *
    100
  ).toFixed(1);
  console.log(increasePercentage);
  return (
    <DashboardCard
      title="Monthly Earnings"
      action={
        <Fab color="secondary" size="medium" sx={{ color: "#ffffff" }}>
          <IconCurrencyRupee width={24} />
        </Fab>
      }
      footer={
        <Chart
          options={optionscolumnchart}
          series={seriescolumnchart}
          type="area"
          height="60px"
        />
      }
    >
      <>
        <Typography variant="h3" fontWeight="700" mt="-20px">
          Rs. {yearlySales}
        </Typography>
        <Stack direction="row" spacing={1} my={1} alignItems="center">
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
            last month
          </Typography>
        </Stack>
      </>
    </DashboardCard>
  );
};

export default MonthlyEarnings;
