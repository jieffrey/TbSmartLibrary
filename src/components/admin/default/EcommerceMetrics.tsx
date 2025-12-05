"use client";
import React from "react";
import Badge from "@/components/ui/badge/Badge";
import { ArrowDownIcon, ArrowUpIcon, BoxIconLine } from "@/icons";

export const EcommerceMetrics = () => {
  const cards = [
    {
      label: "Total Buku",
      value: "1,240",
      trend: "+2.4%",
      iconColor: "var(--color-foreground)",
      badgeType: "success",
    },
    {
      label: "Buku Tersedia",
      value: "830",
      trend: "+1.2%",
      iconColor: "var(--color-foreground)",
      badgeType: "success",
    },
    {
      label: "Buku Dipinjam",
      value: "410",
      trend: "-3.8%",
      iconColor: "var(--color-foreground)",
      badgeType: "error",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
      {cards.map((item, i) => (
        <div
          key={i}
          className="rounded-2xl border p-5 md:p-6 transition-colors bg-[#fff8e7] border-[#FFE7B3] dark:bg-white/[0.03] dark:border-[#333333]"
        >
          <div
            className="flex items-center justify-center w-12 h-12 rounded-xl"
            style={{ backgroundColor: "var(--color-white)" }}
          >
            <BoxIconLine className="size-6" style={{ color: item.iconColor }} />
          </div>

          <div className="flex items-end justify-between mt-5">
            <div>
              <span className="text-sm opacity-70">{item.label}</span>
              <h4 className="mt-2 font-bold text-title-sm">{item.value}</h4>
            </div>
            <Badge color={item.badgeType}>
              {item.badgeType === "success" ? (
                <ArrowUpIcon className="size-4" />
              ) : (
                <ArrowDownIcon className="size-4" />
              )}
              {item.trend}
            </Badge>
          </div>
        </div>
      ))}
    </div>
  );
};
