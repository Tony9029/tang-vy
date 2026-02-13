"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Lock,
  CalendarHeart,
  Star,
  Image as ImageIcon,
} from "lucide-react";
import Card from "./Card";

// Dữ liệu dòng thời gian (Bạn có thể sửa lại chữ tùy ý)
const TIMELINE_DATA = [
  {
    year: "2026",
    locked: false,
    events: [
      {
        date: "Đầu năm",
        title: "Tết Nguyên Đán",
        desc: "Cái Tết đầu tiên tui biết đến sự hiện diện của Vy...",
        isSpecial: false,
      },
      {
        date: "14/02/2026",
        title: "Valentine",
        desc: "Ngày lễ tình nhân đặc biệt. Tui gom hết can đảm để làm cái web này cho Vy nè.",
        isSpecial: true,
      },
      {
        date: "17/02/2026",
        title: "Sinh nhật Vy 🎂",
        desc: "Ngày thiên thần giáng trần! Chúc Vy tuổi mới luôn vui vẻ và cho phép tui được đồng hành cùng Vy nha.",
        isSpecial: true,
      },
      {
        date: "Tháng 9/2026",
        title: "Tết Trung Thu",
        desc: "Tui hy vọng lúc này tui với Vy đang cùng nhau đi dạo phố lồng đèn rồi.",
        isSpecial: false,
      },
      {
        date: "25/12/2026",
        title: "Giáng Sinh ấm áp",
        desc: "Noel năm nay tui không muốn lạnh nữa, vì mong là đã có tay Vy để nắm.",
        isSpecial: false,
      },
    ],
  },
  {
    year: "2027",
    locked: true,
    message: "Hành trình phía trước tui muốn có Vy đồng hành...",
  },
  {
    year: "2028",
    locked: true,
    message:
      "Một tương lai xa hơn, nơi chúng mình gọi nhau bằng một cái tên khác...",
  },
];

export default function Timeline({ onBack }: { onBack: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="w-full max-w-lg z-20 h-[85vh] flex flex-col"
    >
      {/* Nút quay lại và Tiêu đề */}
      <div className="flex items-center space-x-4 mb-6 bg-white/40 p-4 rounded-3xl backdrop-blur-md border border-white/60">
        <button
          onClick={onBack}
          className="p-2 bg-white/60 rounded-full hover:bg-pink-100 transition-colors text-pink-500"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-bold text-gray-800 flex items-center">
          <CalendarHeart className="w-6 h-6 mr-2 text-pink-500" />
          Dòng thời gian
        </h2>
      </div>

      {/* Khu vực cuộn chứa các sự kiện */}
      <div className="flex-1 overflow-y-auto pr-2 space-y-8 scrollbar-hide pb-20">
        {TIMELINE_DATA.map((item, index) => (
          <div key={index} className="relative">
            {/* Nhãn Năm */}
            <div className="inline-block bg-pink-500 text-white px-6 py-2 rounded-full font-black text-lg shadow-md mb-6 relative z-10">
              {item.year}
            </div>

            {/* Trục dọc nối các năm */}
            <div className="absolute left-[31px] top-10 bottom-[-40px] w-1 bg-pink-200/50 z-0"></div>

            {/* Nếu năm bị khóa */}
            {item.locked ? (
              <div className="ml-14 relative z-10">
                <Card className="p-6 bg-gray-50/80 border-dashed border-2 border-gray-300 flex items-center space-x-4 opacity-80">
                  <div className="bg-gray-200 p-3 rounded-full">
                    <Lock className="w-6 h-6 text-gray-500" />
                  </div>
                  <p className="text-gray-500 font-medium italic text-sm">
                    {item.message}
                  </p>
                </Card>
              </div>
            ) : (
              /* Nếu năm mở (2026) -> Liệt kê sự kiện */
              <div className="space-y-6 ml-14 relative z-10">
                {item.events?.map((event, idx) => (
                  <div key={idx} className="relative">
                    {/* Dấu chấm trên trục */}
                    <div
                      className={`absolute -left-[45px] top-5 w-4 h-4 rounded-full border-4 border-white shadow-sm ${event.isSpecial ? "bg-pink-500" : "bg-pink-300"}`}
                    ></div>

                    <Card
                      className={`p-5 transition-all ${event.isSpecial ? "border-pink-300 shadow-pink-100" : ""}`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-bold text-pink-500 bg-pink-50 px-3 py-1 rounded-full">
                          {event.date}
                        </span>
                        {event.isSpecial && (
                          <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-gray-800 mb-2">
                        {event.title}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed mb-4">
                        {event.desc}
                      </p>

                      {/* Chỗ để chèn ảnh sau này (Khung xám Placeholder) */}
                      <div className="w-full h-24 bg-gray-100 rounded-xl border border-gray-200 border-dashed flex items-center justify-center text-gray-400">
                        <ImageIcon className="w-6 h-6 mr-2" />
                        <span className="text-xs font-medium">
                          Ảnh kỷ niệm (Sau này tui thêm vô)
                        </span>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
