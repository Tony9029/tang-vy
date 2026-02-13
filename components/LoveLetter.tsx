"use client";
import React from "react";

export default function LoveTimer() {
  return (
    <div className="flex flex-col items-center justify-center space-y-5 w-full">
      {/* Bảng đồng hồ luôn ở mức 0 */}
      <div className="flex space-x-2 sm:space-x-4">
        <TimeBlock value={0} label="Ngày" />
        <TimeBlock value={0} label="Giờ" />
        <TimeBlock value={0} label="Phút" />
        <TimeBlock value={0} label="Giây" />
      </div>

      {/* Câu nhắn gửi */}
      <div className="mt-4 px-4 py-2 bg-pink-50 rounded-xl border border-pink-100">
        <p className="text-sm font-medium text-pink-500 italic text-center">
          "Đồng hồ này đang chờ Vy cho phép nó được bắt đầu chạy..."
        </p>
      </div>
    </div>
  );
}

function TimeBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center justify-center bg-pink-50/80 px-4 py-3 rounded-2xl shadow-sm min-w-[70px] sm:min-w-[80px] border border-pink-100 opacity-70">
      <span className="text-3xl font-black text-pink-400">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-widest mt-1">
        {label}
      </span>
    </div>
  );
}
