"use client";

import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Card } from '@/components/ui/card';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ProfilePieChart() {
  const chartData = {
    labels: ["Fiction", "Science", "History", "Finance"],
    datasets: [{
      data: [12, 9, 5, 8],
      backgroundColor: ["#3B82F6","#10B981","#EAB308","#EF4444"],
      borderWidth: 2,
    }]
  };

  return (
    <Card className="rounded-2xl p-5 mt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-navy-700 dark:text-white">Reading Category Breakdown</h2>
        <select className="text-sm font-semibold text-gray-600 dark:text-white bg-transparent">
          <option>Monthly</option>
          <option>Yearly</option>
          <option>Weekly</option>
        </select>
      </div>

      <div className="flex justify-center mb-5">
        <div className="w-60 md:w-72">
          <Pie data={chartData} />
        </div>
      </div>
    </Card>
  );
}
