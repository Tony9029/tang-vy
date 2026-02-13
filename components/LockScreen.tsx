"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Lock, KeyRound } from "lucide-react";
import Card from "./Card";

export default function LockScreen({ onUnlock }: { onUnlock: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  // Mật khẩu là sinh nhật của Vy
  const CORRECT_PASSWORD = "1702";

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === CORRECT_PASSWORD) {
      setError(false);
      onUnlock();
    } else {
      setError(true);
      setPassword("");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50, filter: "blur(10px)" }}
      className="flex flex-col items-center justify-center z-20"
    >
      <Card className="w-[90vw] max-w-md p-8 text-center flex flex-col items-center">
        <div className="bg-pink-100 p-4 rounded-full mb-6">
          <Lock className="w-8 h-8 text-pink-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Chỉ dành cho Vy
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          Vy nhập ngày sinh nhật của mình để vào nha (Ví dụ: 1702)
        </p>

        <form onSubmit={handleUnlock} className="w-full">
          <div className="relative mb-4">
            <KeyRound className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full bg-white/50 border ${
                error
                  ? "border-red-400 focus:ring-red-400"
                  : "border-pink-200 focus:ring-pink-400"
              } rounded-xl py-3 pl-10 pr-4 outline-none focus:ring-2 transition-all text-center tracking-widest text-lg`}
              placeholder="Nhập mật khẩu..."
            />
          </div>

          {error && (
            <p className="text-red-500 text-xs text-left mb-4">
              Sai mất tiêu rồi Vy ơi!
            </p>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-gradient-to-r from-pink-400 to-rose-400 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            Mở Cửa
          </motion.button>
        </form>
      </Card>
    </motion.div>
  );
}
