"use client";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { MoreDotIcon } from "@/icons";
import { Dropdown } from "@/components/ui/dropdown/Dropdown";
import { DropdownItem } from "@/components/ui/dropdown/DropdownItem";
import { useState } from "react";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function MonthlySalesChart() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  const options: ApexOptions = {
    colors: ["#FFC428"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "bar",
      height: 180,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "40%",
        borderRadius: 6,
        borderRadiusApplication: "end",
      },
    },
    dataLabels: { enabled: false },
    stroke: {
      show: true,
      width: 3,
      colors: ["#1A1A1A"],
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        gradientToColors: ["#FFF8E7"],
        opacityFrom: 1,
        opacityTo: 1,
      },
    },
    xaxis: {
      categories: [
        "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
        "Jul", "Agu", "Sep", "Okt", "Nov", "Des",
      ],
      labels: { style: { colors: "#1A1A1A" } },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    legend: {
      show: false,
    },
    grid: {
      borderColor: "#EEE",
      yaxis: { lines: { show: true } },
    },
    tooltip: {
      theme: "dark",
      y: { formatter: (val: number) => `${val} buku dipinjam` },
    },
  };

  const series = [
    {
      name: "Jumlah Buku Dipinjam",
      data: [120, 160, 200, 150, 220, 250, 300, 270, 320, 280, 260, 310],
    },
  ];

  return (
    <div className="overflow-hidden rounded-2xl border border-[#FFC428] bg-[#FFF8E7] dark:bg-white/[0.03] dark:border-[#333333] px-5 pt-5 shadow-md">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-[#1A1A1A] dark:text-[#FFF8E7]">Statistik Peminjaman Buku</h3>
        <div className="relative inline-block">
          <button onClick={toggleDropdown}>
            <MoreDotIcon className="text-[#1A1A1A]" />
          </button>
          <Dropdown isOpen={isOpen} onClose={closeDropdown} className="w-40 p-2">
            <DropdownItem onItemClick={closeDropdown}>
              Lihat Detail
            </DropdownItem>
            <DropdownItem onItemClick={closeDropdown}>
              Hapus
            </DropdownItem>
          </Dropdown>
        </div>
      </div>

      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div className="-ml-5 min-w-[650px] pl-2">
          <ReactApexChart
            options={options}
            series={series}
            type="bar"
            height={180}
          />
        </div>
      </div>
    </div>
  );
}
