"use client";

import React from "react";

function toCSV(rows: (Record<string, any>)[]) {
  if (!rows || rows.length === 0) return "";
  const keys = Object.keys(rows[0]);
  const lines = [keys.join(",")].concat(
    rows.map((r) => keys.map((k) => {
      const v = r[k] ?? "";
      // escape
      const s = String(v).replace(/"/g, '""');
      return `"${s}"`;
    }).join(","))
  );
  return lines.join("\n");
}

export default function ExportButtons({
  reportName = "laporan",
  payload = [] as Record<string, any>[],
}: {
  reportName?: string;
  payload?: Record<string, any>[];
}) {
  const downloadCSV = () => {
    const csv = toCSV(payload);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const filename = `${reportName}_${new Date().toISOString().slice(0,10)}.csv`;
    a.setAttribute("download", filename);
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const openPrintable = () => {
    // create a minimal printable view
    const w = window.open("", "_blank", "noopener,noreferrer");
    if (!w) return;
    const html = `
      <html>
        <head>
          <title>${reportName}</title>
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <style>
            body{ font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial; padding:20px; color:#0f172a }
            table{ width:100%; border-collapse: collapse; margin-top:10px }
            th,td{ border:1px solid #ddd; padding:8px; text-align:left }
            th{ background:#f3f4f6; }
          </style>
        </head>
        <body>
          <h1>${reportName}</h1>
          <div id="content"></div>
          <script>
            window.onload = () => { window.print(); }
          </script>
        </body>
      </html>
    `;
    w.document.write(html);
    w.document.close();
  };

  return (
    <div className="flex items-center gap-3">
      <button onClick={downloadCSV} className="px-4 py-2 rounded-md bg-[var(--color-primary)] text-black font-semibold hover:opacity-95">
        Export CSV
      </button>
      <button onClick={openPrintable} className="px-4 py-2 rounded-md border border-gray-200 dark:border-gray-700 bg-transparent text-sm">
        Cetak / Print
      </button>
    </div>
  );
}
