import React from "react";

export default function Background({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen w-full bg-[#fdf2f8] overflow-hidden text-slate-800">
      {/* Khối cầu sáng mờ trang trí góc trên */}
      <div className="absolute top-[-15%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-pink-300/40 blur-[120px] pointer-events-none" />

      {/* Khối cầu sáng mờ trang trí góc dưới */}
      <div className="absolute bottom-[-10%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-rose-300/40 blur-[100px] pointer-events-none" />

      {/* Lớp nhiễu hạt (Noise) giúp nền không bị "nhựa", nhìn sang trọng hơn */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'url("https://www.transparenttextures.com/patterns/stardust.png")',
        }}
      />

      {/* Nội dung chính của web sẽ nằm trên cùng */}
      <div className="relative z-10 flex min-h-screen flex-col">{children}</div>
    </div>
  );
}
