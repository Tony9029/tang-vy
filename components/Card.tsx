import React from "react";
import { cn } from "../lib/utils";

export default function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl border border-white/60 bg-white/40 p-6 shadow-xl backdrop-blur-xl transition-all",
        className,
      )}
    >
      {/* Hiệu ứng ánh sáng chéo cho giống kính thật */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/10 pointer-events-none" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
