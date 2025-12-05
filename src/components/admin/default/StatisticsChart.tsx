"use client";
import React, { useState } from "react";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import ChartTab from "../ChartTab";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function StatisticsChart() {
  const [activeTab, setActiveTab] = useState("weekly");

  const baseOptions: ApexOptions = {
    colors: ["#FFC428"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      height: 310,
      toolbar: { show: false },
    },
    stroke: { curve: "smooth", width: 2, colors: ["#1A1A1A"] },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 0.7,
        opacityFrom: 0.7,
        opacityTo: 0.0,
        stops: [0, 100],
      },
    },
    dataLabels: { enabled: false },
    grid: { borderColor: "#EEE" },
    tooltip: { theme: "dark" },
  };

  const weekly = {
    options: {
      ...baseOptions,
      xaxis: {
        categories: ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"],
        labels: { style: { colors: "#1A1A1A" } },
      },
    },
    series: [{ name: "Peminjaman", data: [12, 15, 18, 13, 20, 17, 22] }],
  };

  const monthly = {
    options: {
      ...baseOptions,
      xaxis: {
        categories: [
          "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
          "Jul", "Agu", "Sep", "Okt", "Nov", "Des",
        ],
        labels: { style: { colors: "#1A1A1A" } },
      },
    },
    series: [{ name: "Peminjaman", data: [140,110,120,180,200,190,210,250,240,260,280,300] }],
  };

  const chart = activeTab === "weekly" ? weekly : monthly;

  return (
    <div className="rounded-2xl border border-[#FFC428] bg-[#FFF8E7] dark:bg-white/[0.03] dark:border-[#333333] p-6 shadow-md">
      <div className="flex justify-between mb-6">
        <h3 className="text-lg font-semibold text-[#FFC428]">
          Grafik Aktivitas Peminjaman
        </h3>
        <ChartTab active={activeTab} setActive={setActiveTab} />
      </div>

      <div>
        <ReactApexChart
          options={chart.options}
          series={chart.series}
          type="area"
          height={310}
        />
      </div>
    </div>
  );
}
