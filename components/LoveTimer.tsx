"use client";

import React from "react";
import { Heart, ArrowLeft } from "lucide-react";

export default function LoveTimer({ setView }: { setView?: any }) {
  return (
    <div className="min-h-screen bg-[#fff0f5] flex flex-col items-center justify-center p-6 animate-in fade-in zoom-in duration-500">
      <div className="bg-white p-12 md:p-16 rounded-[4rem] shadow-2xl max-w-2xl w-full text-center relative border border-pink-100">
        {/* Nút quay lại */}
        <button
          onClick={() => setView && setView("home")}
          className="absolute top-10 left-10 text-pink-400 hover:text-pink-600 transition-colors"
        >
          <ArrowLeft size={40} />
        </button>

        {/* Trái tim đập */}
        <div className="relative w-48 h-48 mx-auto mb-12 mt-8 md:mt-0">
          <div className="absolute inset-0 bg-pink-400 rounded-full animate-ping opacity-25"></div>
          <div className="relative w-full h-full bg-gradient-to-tr from-pink-500 to-rose-400 rounded-full flex items-center justify-center shadow-2xl">
            <Heart size={80} className="text-white fill-white animate-pulse" />
          </div>
        </div>

        <h2 className="text-4xl font-black text-slate-700 mb-12">
          Hành trình của chúng mình
        </h2>

        {/* Đồng hồ đếm */}
        <div className="grid grid-cols-4 gap-6 mb-12">
          {["NGÀY", "GIỜ", "PHÚT", "GIÂY"].map((unit) => (
            <div key={unit}>
              <div className="bg-[#fff0f5] rounded-3xl py-8 text-5xl font-black text-[#f43f5e]">
                00
              </div>
              <div className="text-sm md:text-base font-bold text-slate-400 mt-4 tracking-widest">
                {unit}
              </div>
            </div>
          ))}
        </div>

        <p className="text-[#f43f5e] text-xl font-bold italic animate-bounce">
          "Đang chờ Vy cho phép chạy..."
        </p>
      </div>
    </div>
  );
}
