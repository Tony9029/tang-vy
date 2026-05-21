"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Heart,
  ArrowLeft,
  Mail,
  Clock,
  Calendar,
  Sparkles,
  Coffee,
  ChevronRight,
  Star,
  Lock,
  Unlock,
  Radio,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Lightbulb,
  Plus,
} from "lucide-react";
import {
  getGocHenHoItems,
  saveGocHenHoItems,
  deleteItemAction,
  DateItem,
} from "@/app/actions";

// --- COMPONENT CHỮ CHẠY ---
const Typewriter = ({ text }: { text: string }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setDisplayedText("");
    setIndex(0);
  }, [text]);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, 30);
      return () => clearTimeout(timeout);
    }
  }, [index, text]);

  return <p className="whitespace-pre-line leading-relaxed">{displayedText}</p>;
};

// --- COMPONENT NÚT MENU ---
const MenuBtn = ({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center gap-4 bg-pink-50 hover:bg-pink-100 text-[#f43f5e] font-bold text-xl md:text-2xl py-5 px-8 rounded-full transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105 border border-pink-200"
    >
      {icon}
      {label}
    </button>
  );
};

// --- COMPONENT: TRẠM PHÁT SÓNG TÌNH YÊU ---
const TramPhatSong = () => {
  const PLAYLIST = [
    { src: "/audio/bai-1.mp3", message: "Ưu tiên của tui Nguyễn Thanh Vy" },
    { src: "/audio/bai-2.mp3", message: "Bài này tui thấy dễ thương🥰" },
    {
      src: "/audio/bai-3.mp3",
      message: "Bài này tui nghĩ Vy sẽ thích đó, nghe đi nha! 🎵",
    },
    {
      src: "/audio/bai-4.mp3",
      message: "Nghe quen hông 5 điều phải nhớ đóaaaa 🎶",
    },
    { src: "/audio/bai-5.mp3", message: "Bỏ vào tại tui thích lyrics" },
    {
      src: "/audio/bai-6.mp3",
      message: "tiếp theo là một bài về tình yêu đáng eo khác ",
    },
    {
      src: "/audio/bai-7.mp3",
      message:
        "Vy ghi chú bài này xong tui mê quớ thêm vào lun, Nghe xong bài này Vy nhớ cười một cái nha, Vy cười dethuong lắm!💖",
    },
    { src: "/audio/bai-8.mp3", message: "Vẫn là từ ghi chú" },
    { src: "/audio/bai-9.mp3", message: "Bài này nói j nữa guột lun" },
    {
      src: "/audio/bai-10.mp3",
      message:
        "E hèm hông có ý chê chiều cao nhó thấy dễ thương là nhiềuuuu 😘",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("0:00");
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentTrack = PLAYLIST[currentIndex];

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % PLAYLIST.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? PLAYLIST.length - 1 : prev - 1));
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const total = audioRef.current.duration;
      setProgress((current / total) * 100);
      setCurrentTime(formatTime(current));
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(formatTime(audioRef.current.duration));
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const newTime =
        (Number(e.target.value) / 100) * audioRef.current.duration;
      audioRef.current.currentTime = newTime;
      setProgress(Number(e.target.value));
    }
  };

  useEffect(() => {
    if (audioRef.current && isPlaying) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => console.log("Audio play error:", error));
      }
    }
  }, [currentIndex]);

  return (
    <div className="bg-[#fff0f5] p-6 md:p-8 rounded-[3rem] shadow-sm border border-pink-100 text-center w-full mt-6 relative overflow-hidden transition-all hover:shadow-md">
      <audio
        ref={audioRef}
        src={currentTrack.src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleNext}
      />
      <div className="flex justify-center mb-4 relative z-10">
        <div
          className={`bg-white p-4 rounded-full shadow-sm transition-all duration-1000 ${isPlaying ? "animate-pulse shadow-pink-200" : ""}`}
        >
          <Radio className="w-8 h-8 text-[#f43f5e]" />
        </div>
      </div>
      <h3 className="text-2xl font-black text-slate-700 mb-4 relative z-10">
        Trạm Phát Sóng Tình Yêu
      </h3>
      <div className="min-h-[120px] flex flex-col items-center justify-center bg-white rounded-3xl p-6 mb-6 border border-pink-50 shadow-inner relative z-10 overflow-hidden">
        <span className="absolute top-4 right-5 text-xs font-bold text-slate-300">
          {currentIndex + 1} / {PLAYLIST.length}
        </span>
        <p className="text-slate-600 italic font-medium leading-relaxed text-lg md:text-xl transition-all duration-500">
          "{currentTrack.message}"
        </p>
      </div>
      <div className="w-full mb-6 px-2 relative z-10">
        <input
          type="range"
          min="0"
          max="100"
          value={isNaN(progress) ? 0 : progress}
          onChange={handleSeek}
          className="w-full h-2 bg-pink-200 rounded-lg appearance-none cursor-pointer accent-[#f43f5e]"
        />
        <div className="flex justify-between mt-2 text-xs font-bold text-pink-400">
          <span>{currentTime}</span>
          <span>{duration}</span>
        </div>
      </div>
      <div className="flex items-center justify-center gap-6 relative z-10">
        <button
          onClick={handlePrev}
          className="bg-white text-slate-400 hover:text-[#f43f5e] hover:bg-pink-50 rounded-full p-4 transition-all duration-300 shadow-sm border border-pink-50 flex items-center justify-center hover:scale-110"
          title="Bài trước"
        >
          <SkipBack className="w-6 h-6 fill-currentColor" />
        </button>
        <button
          onClick={handlePlayPause}
          className="bg-gradient-to-r from-[#f43f5e] to-rose-400 hover:from-rose-500 hover:to-pink-500 text-white rounded-full p-5 transition-all duration-300 shadow-lg flex items-center justify-center hover:scale-110 active:scale-95"
        >
          {isPlaying ? (
            <Pause className="w-8 h-8 fill-currentColor" />
          ) : (
            <Play className="w-8 h-8 ml-1 fill-currentColor" />
          )}
        </button>
        <button
          onClick={handleNext}
          className="bg-white text-slate-400 hover:text-[#f43f5e] hover:bg-pink-50 rounded-full p-4 transition-all duration-300 shadow-sm border border-pink-50 flex items-center justify-center hover:scale-110"
          title="Chuyển bài"
        >
          <SkipForward className="w-6 h-6 fill-currentColor" />
        </button>
      </div>
    </div>
  );
};

// --- COMPONENT: GÓC HẸN HÒ (ĐÃ FIX ĐẦY ĐỦ TÍNH NĂNG XÓA) ---
const GocHenHo = ({ onBack }: { onBack: () => void }) => {
  const [activeTab, setActiveTab] = useState<"bucket" | "random">("bucket");
  const [bucketList, setBucketList] = useState<DateItem[]>([]);
  const [foodList, setFoodList] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // State hỗ trợ Thêm Ý Tưởng
  const [newTitle, setNewTitle] = useState("");
  const [newEmoji, setNewEmoji] = useState("❤️");

  // State hỗ trợ Thêm Món Ăn
  const [newFood, setNewFood] = useState("");

  const [isSpinning, setIsSpinning] = useState(false);
  const [randomResult, setRandomResult] = useState(
    "Bấm nút để chọn đồ ăn đi Vy ơi! 🎯",
  );

  // Load dữ liệu từ database khi mở góc hẹn hò
  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      const data = await getGocHenHoItems();
      setBucketList(data.bucketList || []);
      setFoodList(data.foodList || []);
      setIsLoading(false);
    }
    loadData();
  }, []);

  // Xóa món ăn khỏi DB vĩnh viễn
  const handleDeleteFood = async (foodName: string) => {
    setFoodList((prev) => prev.filter((f) => f !== foodName));
    const res = await deleteItemAction("food", { foodName });
    if (!res.success) alert("Lỗi khi xóa món ăn khỏi database!");
  };

  // Xóa hoạt động khỏi DB vĩnh viễn
  const handleDeleteBucket = async (id: string) => {
    setBucketList((prev) => prev.filter((item) => item.id !== id));
    const res = await deleteItemAction("bucket", { bucketId: id });
    if (!res.success) alert("Lỗi khi xóa hoạt động khỏi database!");
  };

  // Hàm click chọn thì Đánh dấu hoàn thành -> Đồng bộ DB
  const toggleBucketItem = async (id: string) => {
    const updatedList = bucketList.map((item) =>
      item.id === id ? { ...item, done: true } : item,
    );
    setBucketList(updatedList);
    await saveGocHenHoItems(updatedList, foodList);
  };

  // Hàm thêm ý tưởng hẹn hò mới
  const handleAddBucketItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newItem: DateItem = {
      id: Date.now().toString(),
      text: newTitle.trim(),
      icon: newEmoji,
      done: false,
    };

    const updatedList = [newItem, ...bucketList];
    setBucketList(updatedList);
    setNewTitle("");
    await saveGocHenHoItems(updatedList, foodList);
  };

  // Hàm thêm món ăn mới vào danh sách random
  const handleAddFoodItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFood.trim()) return;

    const updatedFood = [newFood.trim(), ...foodList];
    setFoodList(updatedFood);
    setNewFood("");
    await saveGocHenHoItems(bucketList, updatedFood);
  };

  // Hàm xử lý quay random chọn món ăn
  const handleSpin = () => {
    if (isSpinning || foodList.length === 0) return;
    setIsSpinning(true);
    let times = 0;
    const interval = setInterval(() => {
      setRandomResult(foodList[Math.floor(Math.random() * foodList.length)]);
      times++;
      if (times > 25) {
        clearInterval(interval);
        setIsSpinning(false);
        setRandomResult(foodList[Math.floor(Math.random() * foodList.length)]);
      }
    }, 80);
  };

  // Lọc lấy những ý tưởng CHƯA HOÀN THÀNH để hiển thị lên list
  const activeBucketItems = bucketList.filter((item) => !item.done);

  return (
    <div className="max-w-5xl w-full mx-auto bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl text-center border-2 border-pink-50 relative overflow-hidden mt-10">
      <button
        onClick={onBack}
        className="absolute top-8 left-8 text-[#f43f5e] hover:bg-pink-50 p-3 rounded-full transition-all"
      >
        <ArrowLeft size={28} />
      </button>

      <h1 className="text-4xl md:text-5xl font-black text-[#f43f5e] mb-4 flex items-center justify-center gap-3 mt-8 md:mt-0">
        Góc Hẹn Hò{" "}
        <Lightbulb className="text-yellow-400 fill-yellow-400" size={40} />
      </h1>
      <p className="text-slate-500 text-lg md:text-xl italic mb-8">
        "Lưu lại những nơi và những việc tui muốn tụi mình cùng đi và cùng
        làm,..."
      </p>

      <div className="flex justify-center gap-4 mb-10 bg-pink-50 p-2 rounded-full w-fit mx-auto shadow-inner">
        <button
          onClick={() => setActiveTab("bucket")}
          className={`px-6 py-3 rounded-full font-bold text-lg md:text-xl transition-all ${activeTab === "bucket" ? "bg-white text-[#f43f5e] shadow-md" : "text-slate-400 hover:text-pink-400"}`}
        >
          📋 Bucket List
        </button>
        <button
          onClick={() => setActiveTab("random")}
          className={`px-6 py-3 rounded-full font-bold text-lg md:text-xl transition-all ${activeTab === "random" ? "bg-white text-[#f43f5e] shadow-md" : "text-slate-400 hover:text-pink-400"}`}
        >
          🎡 Hôm Nay Ăn Gì?
        </button>
      </div>

      {isLoading ? (
        <div className="text-xl font-bold text-pink-400 py-20 animate-pulse">
          💝 Đang kết nối vũ trụ dữ liệu tình yêu...
        </div>
      ) : (
        <>
          {activeTab === "bucket" && (
            <div className="space-y-6 animate-in fade-in duration-500 text-left">
              {/* Form thêm ý tưởng hẹn hò */}
              <form
                onSubmit={handleAddBucketItem}
                className="bg-pink-50/50 p-4 rounded-3xl border border-pink-100 flex flex-col sm:flex-row gap-3 items-center"
              >
                <select
                  value={newEmoji}
                  onChange={(e) => setNewEmoji(e.target.value)}
                  className="p-3 bg-white border border-pink-200 rounded-2xl text-2xl outline-none cursor-pointer"
                >
                  <option value="❤️">❤️</option>
                  <option value="🌲">🌲</option>
                  <option value="🌊">🌊</option>
                  <option value="🏝️">🏝️</option>
                  <option value="🌉">🌉</option>
                  <option value="👻">👻</option>
                  <option value="🌙">🌙</option>
                  <option value="🏺">🏺</option>
                  <option value="🏹">🏹</option>
                  <option value="🍿">🍿</option>
                  <option value="🍕">🍕</option>
                  <option value="🌸">🌸</option>
                </select>
                <input
                  type="text"
                  placeholder="Vy muốn tụi mình cùng làm gì tiếp theo nè..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="flex-1 p-3 bg-white border border-pink-200 rounded-2xl text-base font-bold text-slate-700 outline-none placeholder:text-slate-300 focus:border-pink-400"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-[#f43f5e] to-rose-400 text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-md hover:scale-105 active:scale-95 transition-all"
                >
                  <Plus size={20} /> Thêm kế hoạch
                </button>
              </form>

              {/* Grid hiển thị danh sách các ý tưởng chưa làm kèm NÚT XÓA */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
                {activeBucketItems.length === 0 ? (
                  <div className="col-span-full text-center py-10 text-slate-400 italic text-lg">
                    🥳 Wow, tụi mình đã hoàn thành hết các mục tiêu rồi, hoặc
                    chưa thêm kế hoạch mới á Vy!
                  </div>
                ) : (
                  activeBucketItems.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => toggleBucketItem(item.id)}
                      className="flex items-center justify-between p-4 rounded-3xl border-2 cursor-pointer bg-white border-pink-100 hover:border-pink-300 shadow-sm transition-all hover:scale-[1.02] duration-200 animate-in fade-in group"
                    >
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <div className="w-12 h-12 shrink-0 rounded-full flex items-center justify-center text-2xl bg-slate-100 text-slate-400">
                          {item.icon}
                        </div>
                        <span className="text-base font-bold text-slate-700 truncate">
                          {item.text}
                        </span>
                      </div>

                      {/* Nút xóa hoạt động hẳn khỏi hệ thống */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation(); // Ngăn kích hoạt hàm click hoàn thành của thẻ cha
                          handleDeleteBucket(item.id);
                        }}
                        className="text-gray-300 hover:text-red-500 font-bold p-2 transition-colors sm:opacity-0 group-hover:opacity-100"
                        title="Xóa hẳn mục này"
                      >
                        ✕
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === "random" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left animate-in fade-in duration-500">
              {/* Bên trái: Form thêm món ăn và Danh sách món ăn có TÍNH NĂNG XÓA */}
              <div className="bg-pink-50/50 p-6 rounded-[2.5rem] border border-pink-100 flex flex-col h-[60vh]">
                <h3 className="font-black text-xl text-slate-700 mb-3 flex items-center gap-2">
                  🍲 Kho Đồ Ăn Của Vy ({foodList.length})
                </h3>
                <form onSubmit={handleAddFoodItem} className="flex gap-2 mb-4">
                  <input
                    type="text"
                    placeholder="Thêm món ăn Vy thèm..."
                    value={newFood}
                    onChange={(e) => setNewFood(e.target.value)}
                    className="flex-1 p-3 bg-white border border-pink-200 rounded-2xl text-sm font-bold text-slate-700 outline-none focus:border-pink-400"
                  />
                  <button
                    type="submit"
                    className="p-3 bg-[#f43f5e] text-white rounded-2xl font-bold shadow-md hover:scale-105 transition-all"
                  >
                    <Plus size={20} />
                  </button>
                </form>

                <div className="flex-1 overflow-y-auto custom-scrollbar space-y-2 pr-1">
                  {foodList.length === 0 ? (
                    <p className="text-center text-slate-400 text-sm italic py-4">
                      Kho trống trơn rồi á Vy!
                    </p>
                  ) : (
                    foodList.map((food, idx) => (
                      <div
                        key={idx}
                        className="bg-white px-4 py-3 rounded-2xl border border-pink-100 text-sm font-bold text-slate-600 shadow-sm flex justify-between items-center group"
                      >
                        <span className="truncate flex-1 pr-2">{food}</span>
                        {/* Nút xóa món ăn */}
                        <button
                          type="button"
                          onClick={() => handleDeleteFood(food)}
                          className="text-gray-300 hover:text-red-500 font-bold p-1 transition-colors sm:opacity-0 group-hover:opacity-100"
                          title="Xóa món này"
                        >
                          ✕
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Bên phải: Vòng xoay random */}
              <div className="lg:col-span-2 flex flex-col items-center justify-center p-8 bg-gradient-to-br from-pink-50 to-rose-50 rounded-[3rem] border-4 border-dashed border-pink-200">
                <div className="text-8xl md:text-9xl mb-8">
                  {isSpinning ? "🌀" : "🤤"}
                </div>
                <div className="min-h-[120px] flex items-center justify-center px-8 py-6 bg-white rounded-3xl shadow-inner w-full md:w-3/4 mx-auto border-2 border-pink-100 mb-10 text-center">
                  <h2
                    className={`text-2xl md:text-3xl font-black transition-all duration-100 ${isSpinning ? "text-slate-400 blur-[1px] scale-105" : "text-[#f43f5e] scale-100"}`}
                  >
                    {randomResult}
                  </h2>
                </div>
                <button
                  onClick={handleSpin}
                  disabled={isSpinning || foodList.length === 0}
                  className={`px-12 py-6 bg-gradient-to-r from-[#f43f5e] to-rose-400 text-white rounded-full font-black text-xl md:text-2xl shadow-xl hover:shadow-2xl transition-all flex items-center gap-3 ${isSpinning || foodList.length === 0 ? "opacity-50 cursor-not-allowed scale-95" : "hover:scale-110 active:scale-95"}`}
                >
                  {isSpinning ? "Đang chọn món..." : "Vy nhấn chọn món iii! 🎲"}
                </button>
              </div>
            </div>
          )}
        </>
      )}

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #fff0f5;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #fbcfe8;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #f472b6;
        }
      `}</style>
    </div>
  );
};

// --- DATA: 24 BỨC THƯ ---
const LETTERS_DATA = [
  {
    id: 1,
    label: "Lúc cảm thấy bản thân không đủ giỏi",
    emoji: "🌱",
    content:
      "Vy à, tui biết có những khi Vy nhìn quanh và thấy mình kém cỏi so với mọi người. Vy tự trách bản thân rằng mình chưa đủ giỏi, chưa đủ hoàn hảo. Nhưng Vy ơi, không ai trên đời này sinh ra đã là hoàn hảo cả. Mỗi người đều có con đường riêng, nhịp đi riêng. Và Vy cũng vậy, từng bước Vy đi, từng nỗ lực Vy bỏ ra đều xứng đáng được trân trọng. Vy chưa giỏi hôm nay, không có nghĩa là Vy sẽ mãi mãi như thế. Thời gian sẽ chứng minh rằng Vy mạnh mẽ và tài giỏi hơn Vy nghĩ nhiều.",
  },
  {
    id: 2,
    label: "Lúc cảm thấy không đủ may mắn",
    emoji: "🍀",
    content:
      "Có những lúc Vy nghĩ rằng mình thật không may mắn... Nhưng Vy ơi, tui tin rằng may mắn không chỉ đến từ sự tình cờ, mà còn từ chính sự nỗ lực và kiên trì của mình. Nếu Vy đã cố gắng rất nhiều rồi, thì chỉ cần đi tiếp, một ngày nào đó Vy sẽ nhận được phần thưởng xứng đáng.",
  },
  {
    id: 3,
    label: "Lúc cảm thấy mệt mỏi",
    emoji: "😴",
    content:
      "Mỗi khi Vy kiệt sức như lúc mở bức thư này lên, hi vọng lúc đó tui có thể ở cạnh Vy nếu ko thể là một người bạn trai thì với một tư cách một người bạn cũng được. Tui muốn nói rằng Vy đã làm rất tốt rồi.",
  },
  {
    id: 4,
    label: "Lúc cảm thấy không được tin tưởng",
    emoji: "🤝",
    content:
      "Việc ai đó không tin Vy không hề làm giảm giá trị của Vy. Vy vẫn là Vy – chân thành, tử tế, đáng tin cậy. Đừng để tâm tới những con người đó, Vy chỉ cần tin những người thực sự thương Vy là đủ.",
  },
  {
    id: 5,
    label: "Lúc hoài nghi về chính mình",
    emoji: "🪞",
    content:
      "Đừng để một chút sự cố nhỏ mà hoài nghi bản thân mình nhé. Vy đã vượt qua rất nhiều thứ rồi mà. Vy nên tin vào bản thân nhiều hơn đi Vy siêu hơn Vy nghĩ nhiều đóaaa",
  },
  {
    id: 6,
    label: "Lúc thức khuya",
    emoji: "🌙",
    content:
      "Ây daaa Vy ơi, dù hôm nay có chuyện gì xảy ra thì Vy vẫn phải thương bản thân mình bằng cách ngủ sớm và ngủ thật ngon vào nhennn. Thức khuya tui xót lắm đó!",
  },
  {
    id: 7,
    label: "Lúc lười ăn",
    emoji: "🍲",
    content:
      "Vy à, Vy đã nói Vy dễ ăn, dễ nuôi ùi nên là ăn uống đàng hoàng nhó đừng để cái bụng mình phải chịu đói. Mệt cỡ nào cũng ăn một chút cho tui yên tâm nhé, tất nhiên là sẽ có thưởng nếu ngoan ùi",
  },
  {
    id: 8,
    label: "Lúc muốn bỏ cuộc",
    emoji: "🔥",
    content:
      "Dừng lại nghỉ ngơi thì được, chứ đừng bỏ cuộc vì sợ hãi Vy nha. Tui sẽ luôn ở phía sau ủng hộ Vy.",
  },
  {
    id: 9,
    label: "Lúc thấy cô đơn, trống rỗng",
    emoji: "💌",
    content:
      "Vy ơi, Vy có tui mà. Yên tâm khoảng cách xa xíu nhưng mà với khả năng lái xe của tui sẽ ko lâu để tui có mặt đâu kkk.",
  },
  {
    id: 10,
    label: "Lúc bị từ chối/thất bại",
    emoji: "📉",
    content:
      "Thất bại chỉ là một phần của quá trình trưởng thành. Làm lại thôi Vy, tui tin vào bản lĩnh của Vy mà.",
  },
  {
    id: 11,
    label: "Lúc áp lực học tập/công việc",
    emoji: "📚",
    content:
      "Thả lỏng đôi vai một chút đi Vy. Áp lực hôm nay rồi sẽ trở thành thành quả rực rỡ ngày mai thôi.",
  },
  {
    id: 12,
    label: "Lúc xích mích với người thân/bạn bè",
    emoji: "🫂",
    content:
      "Nhẹ nhàng cho nhau cơ hội nếu họ quan trọng Vy nhé. Còn nếu họ không xứng đáng, hãy mạnh dạn buông tay.",
  },
  {
    id: 13,
    label: "Lúc nhớ nhà",
    emoji: "🏡",
    content:
      "Nhớ nhà thì cứ về thôi Vy. Về để nạp lại năng lượng từ những người thương Vy vô điều kiện nhất.",
  },
  {
    id: 14,
    label: "Lúc chờ kết quả quan trọng",
    emoji: "⏳",
    content:
      "Dù kết quả thế nào, Vy đã nỗ lực hết mình rồi. Tui vẫn luôn tự hào về Vy bất kể điều gì xảy ra.",
  },
  {
    id: 15,
    label: "Lúc tự so sánh với người khác",
    emoji: "⚖️",
    content:
      "Vy là duy nhất. Đừng đem ánh sáng của mình đi so với đèn của nhà người khác. Vy tuyệt vời theo cách của riêng Vy.",
  },
  {
    id: 16,
    label: "Lúc thấy không ai hiểu mình",
    emoji: "🌀",
    content:
      "Tui có thể không hiểu hết mọi chuyện, nhưng tui hứa sẽ lắng nghe Vy bằng cả trái tim. Vy cứ nói, tui nghe.",
  },
  {
    id: 17,
    label: "Lúc ốm/không khỏe",
    emoji: "🤒",
    content:
      "Hi vọng Vy sẽ ko mở bức thư này lên quá nhiều lần hen, nhưng mà mở rồi thì hãy nhớ nếu cần j cứ nói tui ha.",
  },
  {
    id: 18,
    label: "Lúc gặp xui xẻo liên tiếp",
    emoji: "☔",
    content:
      "Bad days không có nghĩa là bad life. Mọi chuyện rồi sẽ ổn thôi, có tui làm 'bùa may mắn' cho Vy đây. À còn nếu kéo xì dách xu thì tui chịu á ko đỡ nỗi đâu kkk",
  },
  {
    id: 19,
    label: "Lúc muốn khóc mà không khóc được",
    emoji: "🌧️",
    content:
      "Đừng gồng nữa Vy. Nếu thấy mệt quá, cứ để nước mắt rơi một chút cho nhẹ lòng. Có tui ở đây rồi.",
  },
  {
    id: 20,
    label: "Lúc mất phương hướng",
    emoji: "🧭",
    content:
      "Lạc lối cũng là một phần của hành trình tìm thấy chính mình. Đừng lo, cứ đi rồi sẽ tới thôi Vy.",
  },
  {
    id: 21,
    label: "Lúc có thành công nhỏ",
    emoji: "🎉",
    content:
      "Giỏi lắm cô gái ! Mỗi bước tiến nhỏ đều đáng để ăn mừng. Tui tự hào về Vy lắm!",
  },
  {
    id: 22,
    label: "Lúc thấy mình không quan trọng",
    emoji: "💖",
    content:
      "Chắc Vy ko mở bức thư này đâu tại tui nghĩ Vy biết mình quan trọng mà ha, còn nếu mở rồi thì chắc chắn là tò mò tui ghi j đúng hông nè .",
  },
  {
    id: 23,
    label: "Lúc cảm thấy thế giới quá ồn ào",
    emoji: "🎧",
    content:
      "Nhắm mắt lại và hít thở sâu. Tui sẽ là nơi bình yên nhất để Vy trốn vào mỗi khi mệt mỏi.",
  },
  {
    id: 24,
    label: "Lúc muốn nghe lời yêu thương",
    emoji: "🌹",
    content:
      "Tui thương Vy. Thương nhất trên đời. Câu này tui sẽ nói với Vy mỗi ngày, không bao giờ chán. E hèm câu này sẽ nói khi chúng ta đã quen nhau nha giờ ko danh ko phận nói quê lắm",
  },
  {
    id: 25,
    label: "Lúc bé giận",
    emoji: "😡",
    content:
      "Vy đang giận tui đúng không? Đừng giữ trong lòng nha, cứ xả hết vào tui nè. Tui sai rồi, tui xin lỗi cục dàng nhóooo 💖 Mở lòng nghe tui giải thích hoặc dắt đi ăn bù nha!",
  },
];

// --- DATA: TIMELINE ---
const TIMELINE_DATA = [
  {
    year: "2026",
    status: "unlocked",
    events: [
      {
        date: "14/02",
        title: "Lễ Tình Nhân 2026",
        desc: "Món quà bí mật tặng Vy lên sóng. Hy vọng Vy sẽ thích góc nhỏ này.",
        img: "Đang cập nhật",
      },
    ],
  },
  { year: "2027", status: "locked", events: [] },
  { year: "2028", status: "locked", events: [] },
];

// --- DATA: THƯ VIỆN CẢM XÚC ---
const LIBRARY_DATA = [
  {
    id: "8-3-2026",
    date: "08/03/2026",
    title: "Ngày Quốc Tế Phụ Nữ 8/3",
    coverEmoji: "💐",
    content: `Gửi Ngoan Xinh Yêu Mang Tên Vy\n\nTui không giỏi nói những lời mật ngọt, cũng chẳng biết phô trương tình cảm theo cách người ta thường làm. Tui chọn yêu Vy theo cách riêng của mình – một cách yêu không ồn ào, không khéo léo, nhưng luôn chân thật.\n\nTình yêu của tui nằm trong những câu hỏi nhỏ nhặt mỗi ngày: "Vy ăn j chưa?", "Nào Vy zìa nói tui biết nhó", hay "Hôm nay có mệt lắm không?". Hoặc là những khi tui cảm thấy nhớ Vy tui không dám gọi hay phiền Vy mà chỉ lặng lẽ đọc lại từng dòng tin nhắn cũ rồi thầm cười . Nếu Vy để ý một chút, Vy sẽ thấy tình yêu của tui luôn hiện diện, kiên trì và cố gắng từng chút một. Có thể tui ít khi nói ra thành lời nhưng mong Vy hiểu là : Sự hiện diện của Vy luôn nằm trong mọi kế hoạch tương lai mà tui tính tới, tại tui sợ Vy bị áp lực hay khó chịu nên tui giấu hoy nhó.\n\nNhân ngày 8/3 hôm nay, tui chúc Vy thật vui vẻ và hạnh phúc. Mong Vy luôn được trân trọng, bớt đi những áp lực cuộc sống và hãy cười thật nhiều nhé. Hãy cứ yêu thương bản thân thật tốt và luôn xinh đẹp theo cách của riêng mình.\n\nVy nhớ nha: Bất cứ khi nào Vy không ổn, mong Vy nhớ rằng luôn có một người sẵn sàng ưu tiên để đến VY nhanh nhất.\n\nTái bút: tác giả đang rất muốn ôm Vy vào hôm nay nhưng mà dự kiến sẽ hơi chậm trễ mong Vy ghi nhớ và tính lãi thêm nhiều cái ôm khác `,
    color: "from-pink-400 to-rose-300",
  },
  {
    id: "14-2-2026",
    date: "14/02/2026",
    title: "Valentine Đầu Tiên",
    coverEmoji: "🍫",
    content:
      "Món quà này tui đã ấp ủ làm cho Vy từ lâu rồi. Mong là góc nhỏ này sẽ khiến Vy vui và bất ngờ. Cảm ơn Vy vì đã xuất hiện trong thế giới của tui...",
    color: "from-rose-400 to-red-400",
  },
  {
    id: "17-2-2026",
    date: "17/02/2026",
    title: "Sinh nhật của Vy",
    coverEmoji: "🎂",
    content: `Lần đầu tiên tụi mình gặp nhau.\nẤn tượng đầu tiên của tui là Vy nhỏ nhắn, đáng yêu y hệt như những gì tui từng hình dung. Không hiểu sao ở cạnh Vy, tui thấy bình yên và thoải mái lắm, thoải mái đến mức tui có thể tự nhiên kể cho Vy nghe những tâm sự mà tui vốn dĩ chẳng bao giờ muốn nói với ai.\nTui hy vọng rằng, trên những chặng đường sắp tới, chúng ta sẽ luôn có cơ hội đồng hành cùng nhau. Chúc Vy của tui có một ngày sinh nhật thật vui vẻ, ấm áp và luôn cười thật tươi nhé`,
    color: "from-rose-400 to-red-400",
  },
  {
    id: "17-4-2026",
    date: "17/04/2026",
    title: "Tốt nghiệp của cục dàng",
    coverEmoji: "💐",
    content: `Chào em nha, cục dàng dễ thương của anh.\n\nAnh thấy mình thật may mắn khi được cùng em đi qua một cột mốc rất đẹp trong cuộc đời – ngày em tốt nghiệp. Khoảnh khắc này không chỉ đáng nhớ với em, mà với anh cũng là một niềm tự hào rất lớn.\n\nSau này, dù con đường phía trước có như thế nào, anh vẫn luôn tin rằng em sẽ tiếp tục tỏa sáng theo cách riêng của mình. Hãy cứ trải nghiệm thật nhiều, học hỏi thật nhiều em nhé. Con đường sau giảng đường chắc chắn sẽ có những chông gai và thử thách, nhưng em đừng lo. Nếu có lúc mệt mỏi hay áp lực quá, cứ dựa vào anh. Anh sẽ luôn ở đây, ở cạnh em, bảo bọc em, và đưa em về “nhà” – nơi có cơm ngon đợi cửa, trà sữa luôn đầy ly.\n\nMệt thì cứ nhõng nhẽo với anh, buồn thì cứ than thở với anh, có chuyện gì không vui hay ai làm em buồn cũng méc cho anh nghe nha. Anh nói rồi mà, anh sẽ luôn là “đồng minh” đáng tin cậy nhất của cục dàng – chỉ sau ba mẹ thôi.\n\nAnh thương em rất nhiều, Thanh Vy à – cục dàng của anh. Moahhh.\n\nTừ Thiên Gia Bảo`,
    color: "from-rose-400 to-red-400",
  },
];

// --- MAIN COMPONENT TRANG CHỦ ---
export default function Home() {
  const [isLocked, setIsLocked] = useState(true);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const [view, setView] = useState<
    "home" | "timeline" | "library" | "letters" | "dating"
  >("home");

  const [selectedLetter, setSelectedLetter] = useState<
    (typeof LETTERS_DATA)[0] | null
  >(null);
  const [selectedLibraryItem, setSelectedLibraryItem] = useState<
    (typeof LIBRARY_DATA)[0] | null
  >(null);

  const CORRECT_PASSWORD = "1702";

  const handleUnlock = () => {
    if (password === CORRECT_PASSWORD) {
      setIsLocked(false);
    } else {
      setError(true);
      setTimeout(() => setError(false), 500);
      setPassword("");
    }
  };

  // MÀN HÌNH KHÓA BẢO MẬT
  if (isLocked) {
    return (
      <main className="min-h-screen bg-[#fff0f5] flex items-center justify-center p-6 md:p-12">
        <div
          className={`bg-white p-12 md:p-16 rounded-[3.5rem] shadow-2xl max-w-xl w-full text-center transition-all duration-300 ${error ? "animate-bounce border-4 border-red-300" : "border-4 border-white"}`}
        >
          <div className="w-28 h-28 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
            <Lock className="text-white" size={48} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-[#1e293b] mb-4">
            Vùng trời của Vy
          </h1>
          <p className="text-slate-400 text-lg md:text-xl mb-10 italic">
            Vy hãy nhập mật mã để mở khóa...
          </p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-6 bg-pink-50/50 rounded-3xl border-2 border-pink-200 focus:border-pink-500 outline-none text-center text-4xl font-black text-pink-600 mb-8 tracking-[0.5em]"
            onKeyDown={(e) => e.key === "Enter" && handleUnlock()}
          />
          <button
            onClick={handleUnlock}
            className="w-full py-6 bg-[#f43f5e] text-white rounded-3xl font-bold text-2xl hover:bg-rose-600 shadow-xl hover:shadow-2xl flex items-center justify-center gap-3 transition-all active:scale-95"
          >
            Vào thôiii! <Unlock size={28} />
          </button>
          {error && (
            <p className="text-red-500 text-lg mt-6 font-bold animate-pulse">
              Mật mã chưa đúng rồi Vy ơi... 😢
            </p>
          )}
        </div>
      </main>
    );
  }

  // KHÔNG GIAN ĐÃ MỞ KHÓA
  return (
    <main className="min-h-screen bg-[#fff5f7] p-4 md:p-12 text-slate-800">
      {/* 1. MÀN HÌNH CHÍNH (DASHBOARD) */}
      {view === "home" && (
        <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in duration-500">
          <div className="text-center space-y-3">
            <h1 className="text-4xl md:text-6xl font-black text-[#f43f5e] tracking-tight flex items-center justify-center gap-3">
              Chào Cục dàng nhaa!{" "}
              <Heart
                className="fill-current animate-ping text-rose-500"
                size={36}
              />
            </h1>
            <p className="text-slate-500 text-lg md:text-2xl italic font-medium">
              Nơi chứa đựng những điều ngọt ngào nhất aiu dành riêng cho bé.
            </p>
          </div>

          {/* Grid các tính năng lớn */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <MenuBtn
              icon={<Clock size={28} />}
              label="Hành trình thời gian"
              onClick={() => setView("timeline")}
            />
            <MenuBtn
              icon={<Mail size={28} />}
              label="24 Bức thư cảm xúc"
              onClick={() => setView("letters")}
            />
            <MenuBtn
              icon={<Sparkles size={28} />}
              label="Thư viện kỷ niệm"
              onClick={() => setView("library")}
            />
            <MenuBtn
              icon={<Coffee size={28} />}
              label="Góc hẹn hò ạ"
              onClick={() => setView("dating")}
            />
          </div>

          {/* Trạm âm nhạc phía dưới Dashboard */}
          <TramPhatSong />
        </div>
      )}

      {/* 2. CHỨC NĂNG TIMELINE */}
      {view === "timeline" && (
        <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-[3rem] shadow-xl relative animate-in fade-in duration-500">
          <button
            onClick={() => setView("home")}
            className="absolute top-8 left-8 text-[#f43f5e] hover:bg-pink-50 p-2 rounded-full transition-all"
          >
            <ArrowLeft size={24} />
          </button>
          <h2 className="text-3xl md:text-4xl font-black text-[#f43f5e] text-center mb-10 mt-6">
            ⌛ Hành trình thời gian
          </h2>
          <div className="space-y-8 relative before:absolute before:inset-0 before:left-4 before:w-1 before:bg-pink-100">
            {TIMELINE_DATA.map((t, i) => (
              <div key={i} className="relative pl-10">
                <div
                  className={`absolute left-2 top-1 w-5 h-5 rounded-full border-4 border-white shadow ${t.status === "unlocked" ? "bg-pink-500" : "bg-slate-300"}`}
                />
                <h3 className="text-2xl font-black text-slate-700">
                  {t.year} {t.status === "locked" && "🔒"}
                </h3>
                {t.events.map((ev, idx) => (
                  <div
                    key={idx}
                    className="bg-pink-50/50 p-4 rounded-2xl mt-2 border border-pink-100"
                  >
                    <span className="text-xs font-bold bg-pink-200 text-pink-700 px-2 py-0.5 rounded-full">
                      {ev.date}
                    </span>
                    <h4 className="font-bold text-lg text-slate-800 mt-1">
                      {ev.title}
                    </h4>
                    <p className="text-slate-600 text-sm mt-1">{ev.desc}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. CHỨC NĂNG 24 BỨC THƯ */}
      {view === "letters" && !selectedLetter && (
        <div className="max-w-5xl mx-auto bg-white p-8 md:p-12 rounded-[3rem] shadow-xl relative animate-in fade-in duration-500 text-center">
          <button
            onClick={() => setView("home")}
            className="absolute top-8 left-8 text-[#f43f5e] hover:bg-pink-50 p-2 rounded-full transition-all"
          >
            <ArrowLeft size={24} />
          </button>
          <h2 className="text-3xl md:text-4xl font-black text-[#f43f5e] mb-2 mt-6">
            ✉️ Thư cảm xúc
          </h2>
          <p className="text-slate-400 italic mb-8">
            Hãy chọn một bức thư đúng với tâm trạng hiện tại của Vy nhé...
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
            {LETTERS_DATA.map((letItem) => (
              <div
                key={letItem.id}
                onClick={() => setSelectedLetter(letItem)}
                className="p-5 bg-pink-50/50 rounded-2xl border border-pink-100 hover:border-pink-400 shadow-sm cursor-pointer hover:scale-105 transition-all text-left flex items-center gap-3"
              >
                <span className="text-3xl">{letItem.emoji}</span>
                <span className="font-bold text-slate-700 text-sm md:text-base">
                  {letItem.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CHI TIẾT MỘT BỨC THƯ ĐANG ĐỌC */}
      {view === "letters" && selectedLetter && (
        <div className="max-w-2xl mx-auto bg-white p-8 md:p-12 rounded-[3rem] shadow-xl relative animate-in zoom-in-95 duration-300">
          <button
            onClick={() => setSelectedLetter(null)}
            className="absolute top-8 left-8 text-[#f43f5e] hover:bg-pink-50 p-2 rounded-full transition-all"
          >
            <ArrowLeft size={24} />
          </button>
          <div className="text-center mt-6">
            <span className="text-6xl">{selectedLetter.emoji}</span>
            <h3 className="text-2xl font-black text-slate-800 mt-4 mb-6">
              {selectedLetter.label}
            </h3>
            <div className="text-left bg-slate-50 p-6 rounded-3xl border border-slate-100 text-slate-600 text-lg font-medium">
              <Typewriter text={selectedLetter.content} />
            </div>
          </div>
        </div>
      )}

      {/* 4. CHỨC NĂNG THƯ VIỆN KỶ NIỆM */}
      {view === "library" && !selectedLibraryItem && (
        <div className="max-w-5xl mx-auto bg-white p-8 md:p-12 rounded-[3rem] shadow-xl relative animate-in fade-in duration-500 text-center">
          <button
            onClick={() => setView("home")}
            className="absolute top-8 left-8 text-[#f43f5e] hover:bg-pink-50 p-2 rounded-full transition-all"
          >
            <ArrowLeft size={24} />
          </button>
          <h2 className="text-3xl md:text-4xl font-black text-[#f43f5e] mb-2 mt-6">
            💐 Thư viện kỷ niệm
          </h2>
          <p className="text-slate-400 italic mb-8">
            Những lá thư dài tui viết cho Vy vào những ngày đặc biệt...
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {LIBRARY_DATA.map((libItem) => (
              <div
                key={libItem.id}
                onClick={() => setSelectedLibraryItem(libItem)}
                className={`p-6 rounded-3xl bg-gradient-to-br ${libItem.color} text-white shadow-md cursor-pointer hover:scale-[1.03] transition-all text-left flex flex-col justify-between h-44`}
              >
                <div className="flex justify-between items-start">
                  <span className="text-4xl">{libItem.coverEmoji}</span>
                  <span className="text-xs font-bold opacity-80 bg-white/20 px-2 py-1 rounded-full">
                    {libItem.date}
                  </span>
                </div>
                <h3 className="font-black text-xl tracking-tight">
                  {libItem.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CHI TIẾT MỘT KỶ NIỆM ĐANG ĐỌC */}
      {view === "library" && selectedLibraryItem && (
        <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-[3rem] shadow-xl relative animate-in zoom-in-95 duration-300">
          <button
            onClick={() => setSelectedLibraryItem(null)}
            className="absolute top-8 left-8 text-[#f43f5e] hover:bg-pink-50 p-2 rounded-full transition-all"
          >
            <ArrowLeft size={24} />
          </button>
          <div className="mt-8">
            <span className="text-xs font-bold bg-pink-100 text-pink-700 px-3 py-1 rounded-full">
              {selectedLibraryItem.date}
            </span>
            <h3 className="text-3xl font-black text-slate-800 mt-3 mb-6 flex items-center gap-2">
              {selectedLibraryItem.coverEmoji} {selectedLibraryItem.title}
            </h3>
            <div className="bg-pink-50/30 p-6 md:p-8 rounded-3xl border border-pink-100 text-slate-700 text-base md:text-lg font-medium whitespace-pre-wrap leading-relaxed shadow-inner max-h-[60vh] overflow-y-auto custom-scrollbar">
              {selectedLibraryItem.content}
            </div>
          </div>
        </div>
      )}

      {/* 5. GÓC HẸN HÒ (GỌI ĐÚNG ĐẾN COMPONENT ĐÃ FIX) */}
      {view === "dating" && <GocHenHo onBack={() => setView("home")} />}
    </main>
  );
}
