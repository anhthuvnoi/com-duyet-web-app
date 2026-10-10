export interface CityWeather {
  cityName: string;
  region: string;
  temp: string;
  weatherDesc: string;
  iconName: string;
  humidity: string;
  fabricAdvice: string;
  tips: string;
}

export const citiesData: Record<string, CityWeather> = {
  "Hà Nội": {
    cityName: "Hà Nội",
    region: "Bắc Bộ",
    temp: "24°C",
    weatherDesc: "Gió heo may se lạnh, lất phất mưa bụi nhẹ",
    iconName: "CloudSun",
    humidity: "75%",
    fabricAdvice: "Khuyên dùng lụa tơ tằm Vạn Phúc dày dặn hoặc vải đũi hai lớp giữ nhiệt tốt, lịch lãm quý phái.",
    tips: "Khoác thêm áo tấc hoặc khăn quàng lụa mỏng khi dạo Hoàng thành Thăng Long hoặc Hồ Gươm."
  },
  "Huế": {
    cityName: "Huế",
    region: "Trung Bộ",
    temp: "27°C",
    weatherDesc: "Nắng nhẹ, gió thoảng sông Hương thanh bình",
    iconName: "Sun",
    humidity: "80%",
    fabricAdvice: "Hợp nhất với gấm sa mỏng, lụa cát nhẹ nhàng, thoáng mát đậm chất thơ cố đô.",
    tips: "Chọn nón bài thơ hoặc quạt giấy đề thơ khi check-in Đại Nội, Lăng Khải Định."
  },
  "TP. Hồ Chí Minh": {
    cityName: "TP. Hồ Chí Minh",
    region: "Nam Bộ",
    temp: "33°C",
    weatherDesc: "Nắng vàng rực rỡ, thời tiết nhiệt đới ấm áp",
    iconName: "SunMedium",
    humidity: "65%",
    fabricAdvice: "Nên chọn vải đũi tơ tằm mát lạnh, linen cao cấp hoặc voan tơ thoáng khí, thấm hút mồ hôi tốt.",
    tips: "Phối thêm kính râm thời trang và quạt xếp tay để vừa mát vừa thời thượng khi dạo phố đi bộ Nguyễn Huệ."
  },
  "Đà Nẵng": {
    cityName: "Đà Nẵng",
    region: "Duyên hải Miền Trung",
    temp: "29°C",
    weatherDesc: "Gió biển mát lộng, trời trong xanh nắng đẹp",
    iconName: "Wind",
    humidity: "70%",
    fabricAdvice: "Chọn tơ sống hoặc đũi mềm mát mẻ, tà áo bay bổng đón gió biển Mỹ Khê.",
    tips: "Đi guốc mộc quai nhung hoặc sandal quai mảnh thoải mái đi dạo cầu Rồng."
  },
  "Sa Pa": {
    cityName: "Sa Pa",
    region: "Tây Bắc",
    temp: "17°C",
    weatherDesc: "Sương mù bảng lảng, tiết trời se lạnh vùng cao",
    iconName: "CloudFog",
    humidity: "88%",
    fabricAdvice: "Lựa chọn gấm thêu lót nỉ hoặc đũi dệt sợi dày phối khăn lụa tơ tằm ấm áp.",
    tips: "Rất thích hợp mặc áo Giao Lĩnh hoặc Áo Tấc nhiều lớp vừa ấm áp vừa uy nghi giữa mây ngàn."
  },
  "Cần Thơ": {
    cityName: "Cần Thơ",
    region: "Tây Nam Bộ",
    temp: "31°C",
    weatherDesc: "Nắng ấm miền sông nước Cửu Long",
    iconName: "Sun",
    humidity: "78%",
    fabricAdvice: "Vải đũi xước, lụa lãnh Mỹ A hoặc linen mỏng nhẹ, thoải mái vận động sông nước.",
    tips: "Thắt thêm khăn rằn cách điệu bên hông áo để giao hòa nét Nam Bộ thân thương."
  }
};

// Object mapping ảnh phong cảnh danh thắng tương ứng với từng địa điểm
export const backgroundMap: Record<string, string> = {
  "Hà Nội": "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80",
  "Huế": "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=800&q=80",
  "TP. Hồ Chí Minh": "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=800&q=80",
  "TP.HCM": "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=800&q=80",
  "Đà Nẵng": "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=800&q=80",
  "Sa Pa": "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=800&q=80",
  "Cần Thơ": "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80",
  "Đà Lạt": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
  "Hội An": "https://images.unsplash.com/photo-1552554014-98448a609d73?auto=format&fit=crop&w=800&q=80",
  "Ninh Bình": "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80",
  default: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80"
};

