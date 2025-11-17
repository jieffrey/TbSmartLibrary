"use client";

import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import React from "react";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

type Item = { name: string; loans: number };

export default function TopUsersChart({ data = [] as Item[] }) {
  const categories = data.map((d) => d.name);
  const series = [{ name: "Jumlah Peminjaman", data: data.map((d) => d.loans) }];

  const options: ApexOptions = {
    chart: { type: "bar", toolbar: { show: false }, fontFamily: "Inter, sans-serif" },
    plotOptions: { bar: { horizontal: true, barHeight: "56%", borderRadius: 8 } },
    dataLabels: { enabled: false },
    colors: ["#9CB9FF"],
    grid: { strokeDashArray: 4 },
    yaxis: { labels: { style: { fontSize: "13px" } } },
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">User Paling Aktif</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">Berdasarkan jumlah peminjaman</p>
      </div>

      <div className="min-h-[220px]">
        <ReactApexChart options={{ ...options, yaxis: { categories } }} series={series} type="bar" height={220} />
      </div>
    </div>
  );
}
