"use server";

import { Redis } from "@upstash/redis";
import { revalidatePath } from "next/cache";

// Khởi tạo kết nối Upstash Redis bằng cấu hình biến môi trường của ông
const redis = new Redis({
  url: process.env.KV_REST_API_URL || "",
  token: process.env.KV_REST_API_TOKEN || "",
});

export type DateItem = {
  id: string;
  text: string;
  icon: string;
  done: boolean;
};

// Key chung lưu trữ toàn bộ dữ liệu của ông và Vy
const KV_DATA_KEY = "goc_hen_ho_combined_data";

/**
 * 1. LẤY DỮ LIỆU (Hoặc tự nạp đống data ông muốn làm ban đầu nếu DB trống)
 */
export async function getGocHenHoItems() {
  try {
    const data = await redis.get<{
      bucketList: DateItem[];
      foodList: string[];
    }>(KV_DATA_KEY);

    if (!data) {
      // Đống hoạt động và đồ ăn ông chuẩn bị sẵn, Vy vào là thấy luôn!
      const defaultBucket: DateItem[] = [
        { id: "1", text: "Đi Đà Lạt săn mây", icon: "🌲", done: false },
        { id: "2", text: "Đi Vũng Tàu ăn hải sản", icon: "🌊", done: false },
        { id: "3", text: "Đi Vĩnh Hy ngắm biển", icon: "🏝️", done: false },
        { id: "4", text: "Đi Đà Nẵng qua cầu Rồng", icon: "🌉", done: false },
        {
          id: "5",
          text: "Xem phim kinh dị cùng nhau",
          icon: "👻",
          done: false,
        },
        { id: "6", text: "Đi dạo buổi tối hóng gió", icon: "🌙", done: false },
        { id: "7", text: "Đi workshop làm gốm", icon: "🏺", done: false },
        { id: "8", text: "Đi bắn cung giải trí", icon: "🏹", done: false },
        { id: "9", text: "Đi đua xe Go-kart", icon: "🏎️", done: false },
        {
          id: "10",
          text: "Đi bắn súng paintball/laser",
          icon: "🔫",
          done: false,
        },
        { id: "11", text: "Đi dạo chợ hoa", icon: "🌻", done: false },
        { id: "12", text: "Quẩy ở Lễ hội âm nhạc", icon: "🎵", done: false },
        { id: "13", text: "Đi công viên dã ngoại", icon: "🧺", done: false },
        { id: "14", text: "Đi chụp hình Photobooth", icon: "📸", done: false },
        { id: "15", text: "Chơi nhà ma Escape Room", icon: "🧟‍♂️", done: false },
        { id: "16", text: "Đi trượt tuyết", icon: "⛷️", done: false },
        { id: "17", text: "Đi trượt patin", icon: "🛼", done: false },
        { id: "18", text: "Đi tô tượng thư giãn", icon: "🎨", done: false },
      ];

      const defaultFood = [
        "Ăn Bún bò Huế 🍜",
        "Ăn Phở bò ngon ngon 🍜",
        "Ăn Cơm tấm sườn bì chả 🍛",
        "Ăn Cơm gà xối mỡ 🍗",
        "Ăn Gà rán giòn rụm 🍗",
        "Ăn Hủ tiếu Nam Vang 🍲",
        "Đi ăn Đồ Hàn 🥘",
        "Đi ăn Đồ Âu 🍝",
        "Đi ăn Đồ Nhật 🍣",
        "Đi ăn Đồ Thái 🍲",
        "Đi ăn Há Cảo / Dimsum 🥟",
        "Thách thức Mì cay 7 cấp độ 🌶️",
        "Ăn Lẩu chay thanh tịnh 🌱",
        "nem nướng",
        "món thái",
        "cơm tấm",
      ];

      // Lưu đống mặc định này vào Redis luôn để lần sau không bị trống
      await redis.set(KV_DATA_KEY, {
        bucketList: defaultBucket,
        foodList: defaultFood,
      });
      return { bucketList: defaultBucket, foodList: defaultFood };
    }
    return data;
  } catch (error) {
    console.error("Lỗi lấy dữ liệu Redis:", error);
    return { bucketList: [], foodList: [] };
  }
}

/**
 * 2. LƯU DỮ LIỆU
 */
export async function saveGocHenHoItems(
  bucketList: DateItem[],
  foodList: string[],
) {
  try {
    await redis.set(KV_DATA_KEY, { bucketList, foodList });
    return { success: true };
  } catch (error) {
    console.error("Lỗi ghi dữ liệu Redis:", error);
    return { success: false };
  }
}

/**
 * 3. XÓA PHẦN TỬ (Đã sửa đổi đồng bộ với Key chung)
 */
export async function deleteItemAction(
  type: "food" | "bucket",
  payload: { foodName?: string; bucketId?: string }, // Đổi bucketId sang string cho đồng bộ với type ID ở trên
) {
  try {
    // Lấy cục data tổng hiện tại xuống trước
    const data = await redis.get<{
      bucketList: DateItem[];
      foodList: string[];
    }>(KV_DATA_KEY);
    if (!data)
      return { success: false, error: "Không tìm thấy dữ liệu để xóa" };

    let updatedBucketList = data.bucketList || [];
    let updatedFoodList = data.foodList || [];

    // Nếu xóa món ăn
    if (type === "food" && payload.foodName) {
      updatedFoodList = updatedFoodList.filter(
        (food) => food !== payload.foodName,
      );
    }
    // Nếu xóa hoạt động trong Bucket List
    else if (type === "bucket" && payload.bucketId) {
      updatedBucketList = updatedBucketList.filter(
        (item) => item.id !== payload.bucketId,
      );
    }

    // Ghi đè lại cục data mới đã lọc bỏ phần tử cần xóa lên Redis
    await redis.set(KV_DATA_KEY, {
      bucketList: updatedBucketList,
      foodList: updatedFoodList,
    });

    // Cập nhật lại giao diện Next.js ngay lập tức
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Lỗi khi xóa:", error);
    return { success: false, error: "Không thể kết nối database" };
  }
}
