"use client";

import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Card } from '@/components/ui/card';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ProfilePieChart() {
  // ============================
  // DUMMY DATA (ganti MySQL nanti)
  // ============================
  const chartData = {
    labels: ["Fiction", "Science", "History", "Finance"],
    datasets: [
      {
        data: [12, 9, 5, 8],
        backgroundColor: [
          "#3B82F6", // blue
          "#10B981", // green
          "#EAB308", // yellow
          "#EF4444", // red
        ],
        borderWidth: 2,
      },
    ],
  };

  return (
    <Card className="rounded-[20px] p-5 mt-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-navy-700 dark:text-white">
          Reading Category Breakdown
        </h2>

        <select className="text-sm font-semibold text-gray-600 dark:text-white bg-transparent">
          <option>Monthly</option>
          <option>Yearly</option>
          <option>Weekly</option>
        </select>
      </div>

      {/* Pie Chart */}
      <div className="flex justify-center mb-5">
        <div className="w-60 md:w-72">
          <Pie data={chartData} />
        </div>
      </div>

      {/* Summary Section */}
      <div className="flex flex-row justify-between rounded-2xl px-2 py-3 shadow-2xl shadow-shadow-500 dark:bg-navy-700 dark:shadow-none">
        {/* Fiction */}
        <div className="flex flex-col items-center">
          <div className="flex items-center">
            <div className="h-2 w-2 bg-[#3B82F6] rounded-full" />
            <p className="ml-1 text-sm text-gray-600">Fiction</p>
          </div>
          <p className="text-lg font-bold text-navy-700 dark:text-white">
            12
          </p>
        </div>

        <div className="h-11 w-px bg-gray-300 dark:bg-white/10" />

        {/* Science */}
        <div className="flex flex-col items-center">
          <div className="flex items-center">
            <div className="h-2 w-2 bg-[#10B981] rounded-full" />
            <p className="ml-1 text-sm text-gray-600">Science</p>
          </div>
          <p className="text-lg font-bold text-navy-700 dark:text-white">
            9
          </p>
        </div>

        <div className="h-11 w-px bg-gray-300 dark:bg-white/10" />

        {/* History */}
        <div className="flex flex-col items-center">
          <div className="flex items-center">
            <div className="h-2 w-2 bg-[#EAB308] rounded-full" />
            <p className="ml-1 text-sm text-gray-600">History</p>
          </div>
          <p className="text-lg font-bold text-navy-700 dark:text-white">
            5
          </p>
        </div>

        <div className="h-11 w-px bg-gray-300 dark:bg-white/10" />

        {/* Finance */}
        <div className="flex flex-col items-center">
          <div className="flex items-center">
            <div className="h-2 w-2 bg-[#EF4444] rounded-full" />
            <p className="ml-1 text-sm text-gray-600">Finance</p>
          </div>
          <p className="text-lg font-bold text-navy-700 dark:text-white">
            8
          </p>
        </div>
      </div>
    </Card>
  );
}
