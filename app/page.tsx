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
} from "lucide-react";

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

// --- COMPONENT: GÓC HẸN HÒ ---
const GocHenHo = ({ onBack }: { onBack: () => void }) => {
  const [activeTab, setActiveTab] = useState<"bucket" | "random">("bucket");

  const [bucketList, setBucketList] = useState([
    { id: 1, title: "Đi Đà Lạt săn mây", emoji: "🌲", done: false },
    { id: 2, title: "Đi Vũng Tàu ăn hải sản", emoji: "🌊", done: false },
    { id: 3, title: "Đi Vĩnh Hy ngắm biển", emoji: "🏝️", done: false },
    { id: 4, title: "Đi Đà Nẵng qua cầu Rồng", emoji: "🌉", done: false },
    { id: 5, title: "Xem phim kinh dị cùng nhau", emoji: "👻", done: false },
    { id: 6, title: "Đi dạo buổi tối hóng gió", emoji: "🌙", done: false },
    { id: 7, title: "Đi workshop làm gốm", emoji: "🏺", done: false },
    { id: 8, title: "Đi bắn cung giải trí", emoji: "🏹", done: false },
    { id: 9, title: "Đi đua xe Go-kart", emoji: "🏎️", done: false },
    { id: 10, title: "Đi bắn súng paintball/laser", emoji: "🔫", done: false },
    { id: 11, title: "Đi dạo chợ hoa", emoji: "🌻", done: false },
    { id: 12, title: "Quẩy ở Lễ hội âm nhạc", emoji: "🎵", done: false },
    { id: 13, title: "Đi công viên dã ngoại", emoji: "🧺", done: false },
    { id: 14, title: "Đi chụp hình Photobooth", emoji: "📸", done: false },
    { id: 15, title: "Chơi nhà ma Escape Room", emoji: "🧟‍♂️", done: false },
    { id: 16, title: "Đi trượt tuyết", emoji: "⛷️", done: false },
    { id: 17, title: "Đi trượt patin", emoji: "🛼", done: false },
    { id: 18, title: "Đi tô tượng thư giãn", emoji: "🎨", done: false },
  ]);

  const toggleBucketItem = (id: number) => {
    setBucketList(
      bucketList.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item,
      ),
    );
  };

  const [isSpinning, setIsSpinning] = useState(false);
  const [randomResult, setRandomResult] = useState(
    "Bấm nút để chọn đồ ăn đi Vy ơi! 🎯",
  );

  const RANDOM_FOOD = [
    "Ăn Bún bò Huế  🍜",
    "Ăn Phở bò ngon ngon",
    "Ăn Cơm tấm sườn bì chả 🍛",
    "Ăn Cơm gà xối mỡ 🍗",
    "Ăn Gà rán giòn rụm 🍗",
    "Ăn Hủ tiếu Nam Vang 🍲",
    "Đi ăn Đồ Hàn  🥘",
    "Đi ăn Đồ Âu  🍝",
    "Đi ăn Đồ Nhật  🍣",
    "Đi ăn Đồ Thái 🍲",
    "Đi ăn Há Cảo / Dimsum 🥟",
    "Thách thức Mì cay 7 cấp độ 🌶️",
    "Ăn Lẩu chay thanh tịnh 🌱",
  ];

  const handleSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    let times = 0;
    const interval = setInterval(() => {
      setRandomResult(
        RANDOM_FOOD[Math.floor(Math.random() * RANDOM_FOOD.length)],
      );
      times++;
      if (times > 25) {
        clearInterval(interval);
        setIsSpinning(false);
        setRandomResult(
          RANDOM_FOOD[Math.floor(Math.random() * RANDOM_FOOD.length)],
        );
      }
    }, 80);
  };

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

      {activeTab === "bucket" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500 h-[50vh] overflow-y-auto pr-2 text-left custom-scrollbar">
          {bucketList.map((item) => (
            <div
              key={item.id}
              onClick={() => toggleBucketItem(item.id)}
              className={`flex items-center gap-4 p-4 rounded-3xl border-2 cursor-pointer transition-all hover:scale-105 active:scale-95 ${item.done ? "bg-green-50 border-green-200" : "bg-white border-pink-100 hover:border-pink-300 shadow-sm"}`}
            >
              <div
                className={`w-12 h-12 shrink-0 rounded-full flex items-center justify-center text-2xl transition-all ${item.done ? "bg-green-400 text-white" : "bg-slate-100 text-slate-400"}`}
              >
                {item.done ? "✔️" : item.emoji}
              </div>
              <span
                className={`text-base font-bold transition-all flex-1 ${item.done ? "text-green-600 line-through opacity-70" : "text-slate-700"}`}
              >
                {item.title}
              </span>
            </div>
          ))}
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
      )}

      {activeTab === "random" && (
        <div className="flex flex-col items-center justify-center p-10 md:p-16 bg-gradient-to-br from-pink-50 to-rose-50 rounded-[3rem] border-4 border-dashed border-pink-200 animate-in fade-in zoom-in-95 duration-500">
          <div className="text-8xl md:text-9xl mb-8">
            {isSpinning ? "🌀" : "🤤"}
          </div>
          <div className="min-h-[120px] flex items-center justify-center px-8 py-6 bg-white rounded-3xl shadow-inner w-full md:w-3/4 mx-auto border-2 border-pink-100 mb-10">
            <h2
              className={`text-3xl md:text-4xl font-black transition-all duration-100 ${isSpinning ? "text-slate-400 blur-[1px] scale-105" : "text-[#f43f5e] scale-100"}`}
            >
              {randomResult}
            </h2>
          </div>
          <button
            onClick={handleSpin}
            disabled={isSpinning}
            className={`px-12 py-6 bg-gradient-to-r from-[#f43f5e] to-rose-400 text-white rounded-full font-black text-2xl shadow-xl hover:shadow-2xl transition-all flex items-center gap-3 ${isSpinning ? "opacity-50 cursor-not-allowed scale-95" : "hover:scale-110 active:scale-95"}`}
          >
            {isSpinning ? "Đang chọn món..." : "Vy nhấn chọn món iii! 🎲"}
          </button>
        </div>
      )}
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
    date: "17/02/2026",
    title: "Tốt nghiệp của cục dàng",
    coverEmoji: "💐",
    content: `Chào em nha, cục dàng dễ thương của anh.

Anh thấy mình thật may mắn khi được cùng em đi qua một cột mốc rất đẹp trong cuộc đời – ngày em tốt nghiệp. Khoảnh khắc này không chỉ đáng nhớ với em, mà với anh cũng là một niềm tự hào rất lớn.

Sau này, dù con đường phía trước có như thế nào, anh vẫn luôn tin rằng em sẽ tiếp tục tỏa sáng theo cách riêng của mình. Hãy cứ trải nghiệm thật nhiều, học hỏi thật nhiều em nhé. Con đường sau giảng đường chắc chắn sẽ có những chông gai và thử thách, nhưng em đừng lo. Nếu có lúc mệt mỏi hay áp lực quá, cứ dựa vào anh. Anh sẽ luôn ở đây, ở cạnh em, bảo bọc em, và đưa em về “nhà” – nơi có cơm ngon đợi cửa, trà sữa luôn đầy ly.

Mệt thì cứ nhõng nhẽo với anh, buồn thì cứ than thở với anh, có chuyện gì không vui hay ai làm em buồn cũng méc cho anh nghe nha. Anh nói rồi mà, anh sẽ luôn là “đồng minh” đáng tin cậy nhất của cục dàng – chỉ sau ba mẹ thôi.

Anh thương em rất nhiều, Thanh Vy à – cục dàng của anh. Moahhh.

Từ Thiên Gia Bảo`,
    color: "from-rose-400 to-red-400",
  },
];

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

  if (isLocked) {
    return (
      <main className="min-h-screen bg-[#fff0f5] flex items-center justify-center p-6 md:p-12">
        <div
          className={`bg-white p-12 md:p-16 rounded-[3.5rem] shadow-2xl max-w-xl w-full text-center transition-all ${error ? "animate-shake border-4 border-red-300" : "border-4 border-white"}`}
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
            className="w-full p-6 bg-pink-50/50 rounded-3xl border-2 border-pink-200 focus:border-pink-500 outline-none text-center text-4xl font-black text-pink-600 mb-8 tracking-[1em]"
            onKeyDown={(e) => e.key === "Enter" && handleUnlock()}
          />
          <button
            onClick={handleUnlock}
            className="w-full py-6 bg-[#f43f5e] text-white rounded-3xl font-bold text-2xl hover:bg-rose-600 shadow-xl hover:shadow-2xl flex items-center justify-center gap-3 transition-all active:scale-95"
          >
            Vào thôiii! <Unlock size={28} />
          </button>
          {error && (
            <p className="text-red-500 text-lg mt-6 font-bold">
              Mật mã sai rồi nha Vy ơi! 😝
            </p>
          )}
        </div>
        <style jsx global>{`
          @keyframes shake {
            0%,
            100% {
              transform: translateX(0);
            }
            25% {
              transform: translateX(-15px);
            }
            75% {
              transform: translateX(15px);
            }
          }
          .animate-shake {
            animation: shake 0.3s ease-in-out 0s 2;
          }
        `}</style>
      </main>
    );
  }

  if (view === "home") {
    return (
      <main className="min-h-screen bg-[#fff0f5] flex items-center justify-center p-6 animate-in fade-in zoom-in duration-700">
        <div className="bg-white p-10 md:p-16 rounded-[4rem] shadow-2xl max-w-2xl w-full text-center border-2 border-pink-50">
          <h1 className="text-5xl md:text-6xl font-black text-[#f43f5e] mb-4 flex items-center justify-center gap-4">
            Góc nhỏ của Vy{" "}
            <Heart className="fill-[#f43f5e] text-[#f43f5e]" size={48} />
          </h1>
          <p className="text-slate-500 text-xl md:text-2xl italic mb-10">
            "Chào mừng Vy đã vào nhaa."
          </p>
          <div className="flex flex-col gap-6">
            <MenuBtn
              icon={<Calendar size={32} />}
              label="Dòng Thời Gian"
              onClick={() => setView("timeline")}
            />
            <MenuBtn
              icon={<Sparkles size={32} />}
              label="Thư Viện Cảm Xúc"
              onClick={() => setView("library")}
            />
            <MenuBtn
              icon={<Mail size={32} />}
              label="Những Bức Thư"
              onClick={() => setView("letters")}
            />
            <MenuBtn
              icon={<Coffee size={32} />}
              label="Ý Tưởng Hẹn Hò 💡"
              onClick={() => setView("dating")}
            />
          </div>
          <TramPhatSong />
        </div>
      </main>
    );
  }

  if (view === "library") {
    return (
      <main className="min-h-screen bg-[#fff0f5] p-6 md:p-12 flex flex-col items-center justify-center">
        <div className="max-w-6xl w-full mx-auto">
          {!selectedLibraryItem && (
            <button
              onClick={() => setView("home")}
              className="mb-10 text-[#f43f5e] text-2xl font-black flex items-center gap-3 hover:scale-105 transition-transform"
            >
              <ArrowLeft size={32} /> Quay về
            </button>
          )}
          {!selectedLibraryItem ? (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="text-center mb-16">
                <h2 className="text-5xl md:text-6xl font-black text-[#f43f5e] mb-4 flex items-center justify-center gap-4">
                  <Sparkles size={48} className="text-pink-400" /> Thư Viện Cảm
                  Xúc
                </h2>
                <p className="text-2xl text-slate-500 italic">
                  "Gửi em vào những ngày đặc biệt nhất..."
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {LIBRARY_DATA.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedLibraryItem(item)}
                    className={`group relative overflow-hidden rounded-[3rem] shadow-lg hover:shadow-2xl transition-all text-left border-4 border-white aspect-[2/1] md:aspect-auto md:h-64 flex flex-col justify-between p-10 bg-gradient-to-br ${item.color}`}
                  >
                    <div className="absolute top-0 right-0 -mt-8 -mr-8 text-9xl opacity-20 group-hover:scale-110 transition-transform duration-500">
                      {item.coverEmoji}
                    </div>
                    <div>
                      <span className="inline-block px-4 py-2 bg-white/30 backdrop-blur-md rounded-full text-white font-black text-sm mb-4 shadow-sm">
                        {item.date}
                      </span>
                      <h3 className="text-3xl font-black text-white leading-tight drop-shadow-md w-3/4">
                        {item.title}
                      </h3>
                    </div>
                    <div className="text-white/90 font-bold flex items-center gap-2 group-hover:translate-x-2 transition-transform">
                      Mở bưu thiếp <ChevronRight size={20} />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto bg-white rounded-[3.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-500 relative">
              <button
                onClick={() => setSelectedLibraryItem(null)}
                className="absolute top-8 right-8 z-10 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full backdrop-blur-md transition-all"
              >
                <ArrowLeft size={28} />
              </button>
              <div
                className={`bg-gradient-to-br ${selectedLibraryItem.color} p-16 md:p-20 text-center text-white relative`}
              >
                <span className="text-8xl block mb-6 drop-shadow-xl">
                  {selectedLibraryItem.coverEmoji}
                </span>
                <p className="text-xl font-bold opacity-80 mb-2 tracking-widest">
                  {selectedLibraryItem.date}
                </p>
                <h3 className="text-4xl md:text-5xl font-black">
                  {selectedLibraryItem.title}
                </h3>
              </div>
              <div className="p-12 md:p-16 text-slate-700 leading-relaxed text-2xl italic font-medium relative">
                <Typewriter text={selectedLibraryItem.content} />
                <div className="mt-16 pt-10 border-t-2 border-pink-50 text-right">
                  <p className="font-black text-[#f43f5e] text-3xl mt-2 tracking-tight">
                    Ký tên
                  </p>
                  <p className="font-bold text-slate-400 text-xl mt-1">
                    Từ Thiên Gia Bảo💌
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    );
  }

  if (view === "timeline") {
    return (
      <main className="min-h-screen bg-[#fff0f5] p-6 md:p-16">
        <div className="max-w-5xl mx-auto">
          <button
            onClick={() => setView("home")}
            className="mb-12 text-[#f43f5e] text-2xl font-black flex items-center gap-3 hover:scale-105 transition-transform"
          >
            <ArrowLeft size={32} /> Quay về
          </button>
          <div className="space-y-20 relative">
            <div className="absolute left-[27px] top-4 bottom-4 w-2 bg-pink-200 rounded-full"></div>
            {TIMELINE_DATA.map((yearBlock, idx) => (
              <div key={idx} className="relative pl-24">
                <div
                  className={`absolute left-0 w-16 h-16 rounded-full flex items-center justify-center border-4 border-white z-10 shadow-xl ${yearBlock.status === "unlocked" ? "bg-[#f43f5e]" : "bg-slate-300"}`}
                >
                  {yearBlock.status === "unlocked" ? (
                    <Star size={32} className="text-white fill-white" />
                  ) : (
                    <Clock size={32} className="text-white" />
                  )}
                </div>
                <h3
                  className={`text-5xl font-black mb-10 ${yearBlock.status === "unlocked" ? "text-[#f43f5e]" : "text-slate-400"}`}
                >
                  Năm {yearBlock.year} {yearBlock.status === "locked" && "🔒"}
                </h3>
                {yearBlock.status === "unlocked" ? (
                  <div className="grid gap-10">
                    {yearBlock.events.map((event, eIdx) => (
                      <div
                        key={eIdx}
                        className="bg-white p-12 rounded-[3.5rem] shadow-lg hover:shadow-2xl transition-all border border-pink-50"
                      >
                        <span className="bg-[#fff0f5] text-[#f43f5e] px-6 py-3 rounded-full text-lg font-black">
                          {event.date}
                        </span>
                        <h4 className="text-3xl font-bold text-slate-700 mt-6">
                          {event.title}
                        </h4>
                        <p className="text-slate-500 text-xl mt-4 leading-relaxed">
                          {event.desc}
                        </p>
                        <div className="mt-10 aspect-video bg-[#fff0f5] rounded-[2.5rem] flex items-center justify-center border-4 border-dashed border-pink-200">
                          <span className="text-pink-400 font-bold text-xl italic">
                            {event.img}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white/50 border-4 border-dashed border-slate-200 p-16 rounded-[3.5rem] text-center">
                    <p className="text-slate-400 text-2xl italic">
                      "Đang chờ tụi mình cùng viết tiếp..."
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (view === "letters") {
    return (
      <main className="min-h-screen bg-[#fff0f5] p-6 md:p-12">
        <div className="max-w-[90rem] mx-auto">
          {!selectedLetter && (
            <button
              onClick={() => setView("home")}
              className="mb-10 text-[#f43f5e] text-2xl font-black flex items-center gap-3 hover:scale-105 transition-transform"
            >
              <ArrowLeft size={32} /> Quay về trang chủ
            </button>
          )}
          {!selectedLetter ? (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="text-center mb-16">
                <h2 className="text-6xl md:text-7xl font-black text-[#f43f5e] mb-4">
                  Dành Cho Vy
                </h2>
                <p className="text-2xl text-slate-500 italic">
                  "Mở ra mỗi khi Vy thấy cần một chút vỗ về nha..."
                </p>
              </div>
              <div className="flex items-center gap-3 mb-8 text-[#f43f5e] text-2xl font-bold">
                <Mail size={32} /> Hãy chọn một bức thư:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                {LETTERS_DATA.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedLetter(item)}
                    className="group p-10 bg-white rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all text-left flex items-center gap-6 border border-pink-50"
                  >
                    <span className="text-6xl group-hover:scale-125 group-hover:rotate-12 transition-all duration-300 drop-shadow-sm">
                      {item.emoji}
                    </span>
                    <span className="font-bold text-xl md:text-2xl text-slate-700 leading-snug">
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto bg-white rounded-[4rem] shadow-2xl overflow-hidden border border-pink-50 animate-in zoom-in-95 duration-500 mt-10">
              <div className="bg-gradient-to-br from-[#f43f5e] to-rose-400 p-20 text-center text-white relative">
                <button
                  onClick={() => setSelectedLetter(null)}
                  className="absolute top-8 left-8 text-white/80 hover:text-white bg-white/20 p-4 rounded-full backdrop-blur-sm transition-all"
                >
                  <ArrowLeft size={32} />
                </button>
                <span className="text-9xl block mb-8 drop-shadow-2xl">
                  {selectedLetter.emoji}
                </span>
                <h3 className="text-4xl md:text-5xl font-black leading-tight">
                  {selectedLetter.label}
                </h3>
              </div>
              <div className="p-16 md:p-24 text-slate-700 leading-relaxed text-3xl italic font-medium">
                <Typewriter text={selectedLetter.content} />
                <div className="mt-20 pt-16 border-t-2 border-pink-50 text-right">
                  <p className="font-black text-[#f43f5e] text-3xl mt-2 tracking-tight">
                    Ký tên
                  </p>
                  <p className="font-bold text-slate-400 text-xl mt-1">
                    Từ Thiên Gia Bảo💌
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    );
  }

  // --- TRANG: GÓC HẸN HÒ ---
  if (view === "dating") {
    return (
      <main className="min-h-screen bg-[#fff0f5] p-6 md:p-12 flex flex-col items-center justify-center animate-in zoom-in duration-500">
        <GocHenHo onBack={() => setView("home")} />
      </main>
    );
  }

  return null;
}
