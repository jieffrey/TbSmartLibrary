"use client";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { Dropdown } from "@/components/ui/dropdown/Dropdown";
import { MoreDotIcon } from "@/icons";
import { useState } from "react";
import { DropdownItem } from "@/components/ui/dropdown/DropdownItem";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function MonthlyTarget() {
  const series = [75.55];

  const options: ApexOptions = {
    colors: ["#FFC428"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "radialBar",
      height: 330,
      sparkline: { enabled: true },
    },
    plotOptions: {
      radialBar: {
        startAngle: -85,
        endAngle: 85,
        hollow: { size: "80%" },
        track: {
          background: "#FFF8E7",
        },
        dataLabels: {
          name: { show: false },
          value: {
            fontSize: "36px",
            fontWeight: "700",
            offsetY: -40,
            color: "#1A1A1A",
            formatter: (val) => `${val}%`,
          },
        },
      },
    },
    stroke: { lineCap: "round", colors: ["#1A1A1A"] },
  };

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-2xl border border-[#FFC428] bg-[#FFF8E7] dark:bg-white/[0.03] dark:border-[#333333] shadow-md">
      <div className="px-5 pt-5 pb-11">
        <div className="flex justify-between">
          <div>
            <h3 className="text-lg font-semibold text-[#1A1A1A] dark:text-[#FFF8E7]">
              Target Peminjaman
            </h3>
            <p className="mt-1 text-gray-700 text-sm">
              Target mingguan & bulanan
            </p>
          </div>

          <button onClick={() => setIsOpen(!isOpen)}>
            <MoreDotIcon className="text-[#1A1A1A]" />
          </button>

          <Dropdown isOpen={isOpen} onClose={() => setIsOpen(false)} className="w-40 p-2">
            <DropdownItem onItemClick={() => setIsOpen(false)}>Lihat Detail</DropdownItem>
          </Dropdown>
        </div>

        <div className="relative">
          <ReactApexChart options={options} series={series} type="radialBar" height={330} />
          <span className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-[95%] bg-white px-3 py-1 rounded-full text-xs font-medium text-[#1A1A1A]">
            +10%
          </span>
        </div>
      </div>

      <div className="flex justify-center gap-8 px-6 py-5 text-[#1A1A1A] dark:text-[#FFF8E7]">
        <div className="text-center">
          <p className="text-sm">Weekly</p>
          <p className="font-semibold">120</p>
        </div>
        <div className="w-px bg-[#FFC428]"></div>
        <div className="text-center">
          <p className="text-sm">Monthly</p>
          <p classnmae="font-semibold">480</p>
        </div>
        <div className="w-px bg-[#FFC428]"></div>
        <div className="text-center">
          <p className="text-sm">Today</p>
          <p className="font-semibold">22</p>
        </div>
      </div>
    </div>
  );
}
