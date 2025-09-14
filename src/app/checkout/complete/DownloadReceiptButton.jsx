// src/app/checkout/complete/DownloadReceiptButton.jsx
"use client";

import React from "react";
import { jsPDF } from "jspdf";

/**
 * Client-side PDF receipt generator using jsPDF.
 * Usage: <DownloadReceiptButton order={order} />
 */
export default function DownloadReceiptButton({ order }) {
  if (!order) return null;

  const pad = (n) => (n < 10 ? `0${n}` : `${n}`);

  const formatDate = (iso) => {
    try {
      const d = new Date(iso);
      return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ${pad(
        d.getHours()
      )}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
    } catch {
      return "";
    }
  };

  const handleDownload = () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a4",
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    let y = 40;

    // header logo circle
    const logoX = 40;
    const logoY = y + 10;
    const logoR = 26;
    doc.setFillColor(16, 185, 129);
    doc.circle(logoX + logoR, logoY + logoR, logoR, "F");

    doc.setFontSize(14);
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.text("ES", logoX + logoR - 9, logoY + logoR + 6);

    doc.setFontSize(20);
    doc.setTextColor(10, 25, 40);
    doc.setFont("helvetica", "bold");
    doc.text("Eco-Stride", logoX + logoR * 2 + 10, logoY + 20);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(90, 100, 110);
    doc.text("Thank you for your order — receipt", logoX + logoR * 2 + 10, logoY + 36);

    // right side order id & date
    const rightX = pageWidth - 40;
    doc.setFontSize(9);
    const idText = `Order ID: ${order.id || ""}`;
    doc.text(idText, rightX - doc.getTextWidth(idText), logoY + 6);
    if (order.createdAt) {
      const dt = formatDate(order.createdAt);
      doc.text(dt, rightX - doc.getTextWidth(dt), logoY + 22);
    }

    y += 80;

    // customer & address
    doc.setFontSize(11);
    doc.setTextColor(40, 40, 40);
    doc.text("Customer:", 40, y);
    doc.setFont("helvetica", "bold");
    doc.text(order.name || "—", 110, y);
    doc.setFont("helvetica", "normal");

    y += 18;
    doc.setFontSize(10);
    doc.setTextColor(110, 110, 110);
    doc.text(order.email || "", 110, y);

    y += 18;
    doc.setFontSize(11);
    doc.setTextColor(40, 40, 40);
    doc.text("Delivery address:", 40, y);
    doc.setFont("helvetica", "bold");
    doc.text(order.address || "—", 140, y);

    y += 28;

    // items table header
    const left = 40;
    const right = pageWidth - 40;
    const tableWidth = right - left;
    const colName = left + 6;
    const colQty = left + tableWidth * 0.65 + 6;
    const colPrice = left + tableWidth * 0.85 + 6;

    doc.setFillColor(245, 249, 247);
    doc.rect(left, y - 6, tableWidth, 22, "F");

    doc.setFontSize(10);
    doc.setTextColor(40, 40, 40);
    doc.setFont("helvetica", "bold");
    doc.text("Item", colName, y + 10);
    doc.text("Qty", colQty, y + 10);
    doc.text("Price", colPrice, y + 10);

    y += 30;

    // items rows
    doc.setFont("helvetica", "normal");
    let rowHeight = 20;
    (order.items || []).forEach((it, idx) => {
      if (y + 80 > doc.internal.pageSize.getHeight()) {
        doc.addPage();
        y = 40;
      }

      if (idx % 2 === 0) doc.setFillColor(255, 255, 255);
      else doc.setFillColor(250, 250, 250);
      doc.rect(left, y - 10, tableWidth, rowHeight, "F");

      const itemTitle = it.size ? `${it.name} (Size ${it.size})` : it.name;
      doc.setTextColor(30, 30, 30);
      doc.setFontSize(10);
      doc.text(`${itemTitle}`, colName, y + 4);

      doc.setFontSize(10);
      doc.text(`${it.qty}`, colQty, y + 4);

      const priceText = `₹${it.price}`;
      doc.text(priceText, colPrice, y + 4);

      const subtotalText = `Subtotal: ₹${Number(it.price || 0) * Number(it.qty || 1)}`;
      doc.setFontSize(8);
      doc.setTextColor(120, 120, 120);
      doc.text(subtotalText, colPrice + 6, y + 14);

      y += rowHeight + 6;
    });

    // totals
    y += 10;
    doc.setDrawColor(220, 220, 220);
    doc.line(left, y, right, y);
    y += 10;
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Total:", colPrice - 80, y);
    doc.text(`₹${order.total || 0}`, colPrice + 6, y);

    y += 40;
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(120, 120, 120);
    doc.text(
      "This is an automatically generated receipt for your order. If you need help, contact support.",
      left,
      y
    );

    doc.save(`order-${order.id || "receipt"}.pdf`);
  };

  return (
    <button
      onClick={handleDownload}
      className="mt-6 w-full bg-emerald-600 text-white py-3 rounded shadow"
    >
      Download receipt (PDF)
    </button>
  );
}
