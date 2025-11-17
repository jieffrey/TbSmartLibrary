"use client";

import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import React from "react";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

type SeriesPoint = { month: string; count: number };

export default function MonthlyLoansChart({ data = [] as SeriesPoint[] }) {
  const categories = data.map((d) => d.month);
  const series = [{ name: "Peminjaman", data: data.map((d) => d.count) }];

  const options: ApexOptions = {
    chart: { type: "area", toolbar: { show: false }, fontFamily: "Inter, sans-serif" },
    stroke: { curve: "smooth", width: 2 },
    xaxis: { categories },
    yaxis: { labels: { formatter: (v) => `${v}` } },
    colors: ["#465FFF"],
    dataLabels: { enabled: false },
    grid: { borderColor: "#E6E6E6" },
    fill: { type: "gradient", gradient: { opacityFrom: 0.6, opacityTo: 0.05 } },
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Total Peminjaman per Bulan</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">12 bulan terakhir</p>
      </div>

      <div className="min-h-[240px]">
        <ReactApexChart options={options} series={series} type="area" height={240} />
      </div>
    </div>
  );
}
