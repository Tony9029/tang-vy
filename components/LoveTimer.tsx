{
  /* MÀN HÌNH 3.2: THỜI GIAN YÊU (ĐỒNG HỒ CHỜ ĐỢI) */
}
{
  currentView === "timer" && (
    <motion.div
      key="timer"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="w-full max-w-lg z-10"
    >
      <Card className="p-8 text-center flex flex-col items-center relative">
        <button
          onClick={() => setCurrentView("home")}
          className="absolute top-4 left-4 p-2 bg-pink-50 rounded-full text-pink-500 hover:bg-pink-100 transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <Heart className="w-12 h-12 text-pink-400 fill-pink-100 mb-4 mt-4" />

        {/* SỬA DÒNG NÀY: */}
        <h2 className="text-xl font-bold text-gray-800 mb-6">
          Chờ ngày chung đôi
        </h2>

        <LoveTimer />
      </Card>
    </motion.div>
  );
}
