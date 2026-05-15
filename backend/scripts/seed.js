import "dotenv/config";
import bcrypt from "bcryptjs";
import { connectToDatabase, getDatabase } from "../lib/mongodb.js";

const seedUsers = [
  {
    id: "user-1",
    email: "user@example.com",
    password: "User12345",
    full_name: "Nguyen Van An",
    role: "user",
    avatar_url: "",
    is_active: true,
    created_at: "2026-05-01T08:00:00.000Z",
  },
  {
    id: "admin-1",
    email: "admin@example.com",
    password: "Admin12345",
    full_name: "Admin User",
    role: "admin",
    avatar_url: "",
    is_active: true,
    created_at: "2026-05-01T08:00:00.000Z",
  },
];

const seedCategories = [
  { id: "cat-phone", name: "Dien thoai", slug: "dien-thoai" },
  { id: "cat-laptop", name: "Laptop", slug: "laptop" },
  { id: "cat-tablet", name: "Tablet", slug: "tablet" },
  { id: "cat-accessory", name: "Phu kien", slug: "phu-kien" },
  { id: "cat-watch", name: "Dong ho", slug: "dong-ho" },
];

const seedProducts = [
  // --- DIEN THOAI (5) ---
  {
    id: "iphone-15-pro-max",
    name: "iPhone 15 Pro Max 256GB",
    slug: "iphone-15-pro-max",
    category: "Dien thoai",
    price: 34990000,
    discount_price: 29990000,
    stock: 50,
    rating: 4.9,
    review_count: 850,
    image_url: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=900&q=80",
    description: "Sieu pham titan voi chip A17 Pro va camera zoom quang hoc 5x.",
    is_featured: true,
    specs: {
      "He dieu hanh": "iOS 17",
      "Chip xu ly": "Apple A17 Pro 6 nhan",
      "RAM": "8 GB",
      "Dung luong": "256 GB",
      "Man hinh": "6.7 inch, Super Retina XDR, 120Hz",
      "Camera sau": "Chinh 48 MP & Phu 12 MP, 12 MP",
      "Pin": "4,422 mAh"
    }
  },
  {
    id: "samsung-s24-ultra",
    name: "Samsung Galaxy S24 Ultra",
    slug: "samsung-s24-ultra",
    category: "Dien thoai",
    price: 33990000,
    discount_price: 26990000,
    stock: 30,
    rating: 4.8,
    review_count: 620,
    image_url: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=900&q=80",
    description: "Quyen nang Galaxy AI voi S Pen va camera 200MP.",
    is_featured: true,
    specs: {
      "He dieu hanh": "Android 14 (One UI 6.1)",
      "Chip xu ly": "Snapdragon 8 Gen 3 for Galaxy",
      "RAM": "12 GB",
      "Dung luong": "256 GB",
      "Man hinh": "6.8 inch, Dynamic AMOLED 2X, 120Hz",
      "Camera sau": "Chinh 200 MP & Phu 50 MP, 12 MP, 10 MP",
      "Pin": "5,000 mAh"
    }
  },
  {
    id: "xiaomi-14-ultra",
    name: "Xiaomi 14 Ultra 5G",
    slug: "xiaomi-14-ultra",
    category: "Dien thoai",
    price: 32990000,
    discount_price: 31490000,
    stock: 15,
    rating: 4.7,
    review_count: 120,
    image_url: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=900&q=80",
    description: "Dinh cao nhiep anh voi ong kinh Leica Summilux.",
    is_featured: false,
    specs: {
      "He dieu hanh": "HyperOS (Android 14)",
      "Chip xu ly": "Snapdragon 8 Gen 3",
      "RAM": "16 GB",
      "Dung luong": "512 GB",
      "Man hinh": "6.73 inch, LTPO AMOLED, 120Hz",
      "Camera sau": "4 camera 50 MP (Ong kinh Leica)",
      "Pin": "5,000 mAh, sac nhanh 90W"
    }
  },
  {
    id: "oppo-find-x7-ultra",
    name: "Oppo Find X7 Ultra",
    slug: "oppo-find-x7-ultra",
    category: "Dien thoai",
    price: 24500000,
    discount_price: 23000000,
    stock: 10,
    rating: 4.6,
    review_count: 85,
    image_url: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80",
    description: "He thong camera kep tiem vong dau tien tren the gioi.",
    is_featured: false,
    specs: {
      "He dieu hanh": "ColorOS 14",
      "Chip xu ly": "Snapdragon 8 Gen 3",
      "RAM": "12 GB",
      "Dung luong": "256 GB",
      "Man hinh": "6.82 inch, AMOLED 2K, 120Hz",
      "Camera sau": "4 camera 50 MP (Hasselblad)",
      "Pin": "5,000 mAh, sac nhanh 100W"
    }
  },
  {
    id: "google-pixel-8-pro",
    name: "Google Pixel 8 Pro",
    slug: "google-pixel-8-pro",
    category: "Dien thoai",
    price: 22000000,
    discount_price: 21000000,
    stock: 12,
    rating: 4.8,
    review_count: 340,
    image_url: "https://images.unsplash.com/photo-1565849906461-0e443530e201?auto=format&fit=crop&w=900&q=80",
    description: "Trai nghiem Android thuan khiet voi chip Google Tensor G3.",
    is_featured: false,
    specs: {
      "He dieu hanh": "Android 14",
      "Chip xu ly": "Google Tensor G3",
      "RAM": "12 GB",
      "Dung luong": "128 GB",
      "Man hinh": "6.7 inch, LTPO OLED, 120Hz",
      "Camera sau": "50 MP + 48 MP + 48 MP",
      "Pin": "5,050 mAh"
    }
  },

  // --- LAPTOP (5) ---
  {
    id: "macbook-pro-m3-pro",
    name: "MacBook Pro 14 M3 Pro 18GB/512GB",
    slug: "macbook-pro-m3-pro",
    category: "Laptop",
    price: 49990000,
    discount_price: 46990000,
    stock: 20,
    rating: 4.9,
    review_count: 215,
    image_url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80",
    description: "Hieu nang chuyen nghiep voi mau Space Black moi.",
    is_featured: true,
    specs: {
      "CPU": "Apple M3 Pro 11-core",
      "GPU": "14-core GPU",
      "RAM": "18 GB",
      "SSD": "512 GB",
      "Man hinh": "14.2 inch, Liquid Retina XDR, 120Hz",
      "Cong nghe am thanh": "Spatial Audio, Dolby Atmos",
      "Trong luong": "1.61 kg"
    }
  },
  {
    id: "dell-xps-15-9530",
    name: "Dell XPS 15 9530 i7-13700H",
    slug: "dell-xps-15-9530",
    category: "Laptop",
    price: 55000000,
    discount_price: 52000000,
    stock: 8,
    rating: 4.7,
    review_count: 110,
    image_url: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=900&q=80",
    description: "Laptop cao cap cho do hoa va sang tao noi dung.",
    is_featured: false,
    specs: {
      "CPU": "Intel Core i7-13700H",
      "Card do hoa": "NVIDIA RTX 4050 6GB",
      "RAM": "16 GB DDR5",
      "SSD": "512 GB NVMe",
      "Man hinh": "15.6 inch, FHD+ IPS 500 nits",
      "Pin": "86 Wh",
      "Trong luong": "1.9 kg"
    }
  },
  {
    id: "hp-spectre-x360-14",
    name: "HP Spectre x360 14 (2024) Ultra 7",
    slug: "hp-spectre-x360-14",
    category: "Laptop",
    price: 42000000,
    discount_price: 39500000,
    stock: 15,
    rating: 4.8,
    review_count: 95,
    image_url: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=900&q=80",
    description: "Laptop xoay gap 360 do sang trong voi man hinh OLED.",
    is_featured: false,
    specs: {
      "CPU": "Intel Core Ultra 7 155H",
      "RAM": "32 GB LPDDR5x",
      "SSD": "1 TB Gen4",
      "Man hinh": "14 inch 2.8K OLED Cam ung",
      "Webcam": "9MP AI Camera",
      "Trong luong": "1.45 kg"
    }
  },
  {
    id: "lenovo-yoga-9i-gen-8",
    name: "Lenovo Yoga 9i Gen 8",
    slug: "lenovo-yoga-9i-gen-8",
    category: "Laptop",
    price: 38000000,
    discount_price: 36000000,
    stock: 10,
    rating: 4.7,
    review_count: 65,
    image_url: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=900&q=80",
    description: "Am thanh song dong voi loa xoay Soundbar.",
    is_featured: false,
    specs: {
      "CPU": "Intel Core i7-1360P",
      "RAM": "16 GB LPDDR5",
      "SSD": "512 GB",
      "Man hinh": "14 inch 4K OLED Cam ung",
      "Am thanh": "Bowers & Wilkins Speakers",
      "Trong luong": "1.4 kg"
    }
  },
  {
    id: "asus-rog-zephyrus-g14-2024",
    name: "ASUS ROG Zephyrus G14 (2024)",
    slug: "asus-rog-zephyrus-g14-2024",
    category: "Laptop",
    price: 45000000,
    discount_price: 43500000,
    stock: 5,
    rating: 4.9,
    review_count: 45,
    image_url: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=900&q=80",
    description: "Laptop gaming mong nhe nhat voi man hinh OLED.",
    is_featured: true,
    specs: {
      "CPU": "AMD Ryzen 9 8945HS",
      "Card do hoa": "NVIDIA RTX 4060 8GB",
      "RAM": "16 GB LPDDR5x",
      "SSD": "1 TB NVMe",
      "Man hinh": "14 inch 3K OLED 120Hz",
      "Trong luong": "1.5 kg"
    }
  },

  // --- TABLET (5) ---
  {
    id: "ipad-pro-m4-11",
    name: "iPad Pro 11 inch (M4) WiFi 256GB",
    slug: "ipad-pro-m4-11",
    category: "Tablet",
    price: 28990000,
    discount_price: 27490000,
    stock: 25,
    rating: 5.0,
    review_count: 150,
    image_url: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=900&q=80",
    description: "Tablet mong nhat cua Apple voi man hinh Ultra Retina XDR.",
    is_featured: true,
    specs: {
      "Chip": "Apple M4 9-core",
      "Man hinh": "11 inch Tandem OLED, 120Hz",
      "Dung luong": "256 GB",
      "Camera": "12MP Wide, LiDAR Scanner",
      "Ket noi": "Wi-Fi 6E, Bluetooth 5.3",
      "Trong luong": "444 g"
    }
  },
  {
    id: "samsung-tab-s9-ultra",
    name: "Samsung Galaxy Tab S9 Ultra",
    slug: "samsung-tab-s9-ultra",
    category: "Tablet",
    price: 32000000,
    discount_price: 25990000,
    stock: 12,
    rating: 4.8,
    review_count: 180,
    image_url: "https://images.unsplash.com/photo-1589739900243-4b123b729470?auto=format&fit=crop&w=900&q=80",
    description: "Man hinh cuc dai 14.6 inch, khang nuoc IP68.",
    is_featured: false,
    specs: {
      "Chip": "Snapdragon 8 Gen 2 for Galaxy",
      "Man hinh": "14.6 inch Dynamic AMOLED 2X, 120Hz",
      "RAM": "12 GB",
      "Dung luong": "256 GB",
      "Phu kien": "Kem But S Pen",
      "Trong luong": "732 g"
    }
  },
  {
    id: "microsoft-surface-pro-9",
    name: "Microsoft Surface Pro 9 i5/8GB/256GB",
    slug: "microsoft-surface-pro-9",
    category: "Tablet",
    price: 26000000,
    discount_price: 23500000,
    stock: 10,
    rating: 4.6,
    review_count: 90,
    image_url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=900&q=80",
    description: "Su ket hop hoan hao giua laptop va tablet chạy Windows.",
    is_featured: false,
    specs: {
      "CPU": "Intel Core i5-1235U",
      "RAM": "8 GB LPDDR5",
      "SSD": "256 GB (Co the nang cap)",
      "Man hinh": "13 inch PixelSense Flow, 120Hz",
      "He dieu hanh": "Windows 11 Home",
      "Trong luong": "879 g"
    }
  },
  {
    id: "ipad-mini-6-wifi",
    name: "iPad Mini 6 WiFi 64GB",
    slug: "ipad-mini-6-wifi",
    category: "Tablet",
    price: 12990000,
    discount_price: 11490000,
    stock: 40,
    rating: 4.9,
    review_count: 520,
    image_url: "https://images.unsplash.com/photo-1542751110-97427bbecf20?auto=format&fit=crop&w=900&q=80",
    description: "Nho gon, manh me voi chip A15 Bionic.",
    is_featured: false,
    specs: {
      "Chip": "Apple A15 Bionic",
      "Man hinh": "8.3 inch Liquid Retina",
      "Dung luong": "64 GB",
      "Camera": "12MP truoc va sau",
      "Bao mat": "Touch ID canh ben",
      "Trong luong": "293 g"
    }
  },
  {
    id: "xiaomi-pad-6",
    name: "Xiaomi Pad 6 8GB/256GB",
    slug: "xiaomi-pad-6",
    category: "Tablet",
    price: 9990000,
    discount_price: 8990000,
    stock: 60,
    rating: 4.7,
    review_count: 310,
    image_url: "https://images.unsplash.com/photo-1527698266440-12104e498b76?auto=format&fit=crop&w=900&q=80",
    description: "Tablet giai tri gia re voi man hinh 144Hz.",
    is_featured: false,
    specs: {
      "Chip": "Snapdragon 870",
      "Man hinh": "11 inch WQHD+, 144Hz",
      "RAM": "8 GB",
      "Dung luong": "256 GB",
      "Pin": "8840 mAh, sac 33W",
      "Trong luong": "490 g"
    }
  },

  // --- PHU KIEN (5) ---
  {
    id: "airpods-pro-2-usb-c",
    name: "Apple AirPods Pro (Gen 2) MagSafe USB-C",
    slug: "airpods-pro-2-usb-c",
    category: "Phu kien",
    price: 6190000,
    discount_price: 4990000,
    stock: 100,
    rating: 4.9,
    review_count: 1250,
    image_url: "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?auto=format&fit=crop&w=900&q=80",
    description: "Chong on chu dong thong minh hon, am thanh thich ung.",
    is_featured: true,
    specs: {
      "Chip": "Apple H2",
      "Ket noi": "Bluetooth 5.3",
      "Chong nuoc": "IP54 (Tai nghe va hop sac)",
      "Thoi luong pin": "Len den 30 gio (kem hop sac)",
      "Tinh nang": "Xuyen am, Khu tieng on chu dong"
    }
  },
  {
    id: "sony-wh-1000xm5",
    name: "Tai nghe Sony WH-1000XM5",
    slug: "sony-wh-1000xm5",
    category: "Phu kien",
    price: 8490000,
    discount_price: 6490000,
    stock: 35,
    rating: 4.8,
    review_count: 420,
    image_url: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=900&q=80",
    description: "Tai nghe chong on tot nhat the gioi.",
    is_featured: true,
    specs: {
      "Loai tai nghe": "Chup tai (Over-ear)",
      "Ket noi": "Bluetooth 5.2, Jack 3.5mm",
      "Thoi luong pin": "30 gio (bat ANC), 40 gio (tat ANC)",
      "Sac nhanh": "3 phut cho 3 gio su dung",
      "Cong nghe am thanh": "Hi-Res Audio, LDAC, DSEE Extreme"
    }
  },
  {
    id: "logitech-mx-master-3s",
    name: "Chuot Logitech MX Master 3S",
    slug: "logitech-mx-master-3s",
    category: "Phu kien",
    price: 2490000,
    discount_price: 2190000,
    stock: 80,
    rating: 4.9,
    review_count: 850,
    image_url: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=900&q=80",
    description: "Chuot cao cap cho lap trinh vien va designer.",
    is_featured: false,
    specs: {
      "Do phan giai": "8000 DPI",
      "So nut": "7 nut",
      "Ket noi": "Bluetooth Low Energy, Logi Bolt",
      "Pin": "Sac lai (70 ngay su dung)",
      "Tinh nang": "Cuon sieu nhanh MagSpeed"
    }
  },
  {
    id: "anker-ganprime-65w",
    name: "Cu sac Anker 735 GaNPrime 65W",
    slug: "anker-ganprime-65w",
    category: "Phu kien",
    price: 1200000,
    discount_price: 950000,
    stock: 120,
    rating: 4.7,
    review_count: 240,
    image_url: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=900&q=80",
    description: "Sac nhanh 3 thiet bi cung luc, nho gon.",
    is_featured: false,
    specs: {
      "Cong suat": "65W Max",
      "Cong dau ra": "2 x USB-C, 1 x USB-A",
      "Cong nghe": "GaNPrime, PowerIQ 4.0",
      "Kich thuoc": "Sieu nho gon",
      "Bao ve": "ActiveShield 2.0"
    }
  },
  {
    id: "keychron-k2-v2",
    name: "Ban phim co Keychron K2 V2 (Hot-swap)",
    slug: "keychron-k2-v2",
    category: "Phu kien",
    price: 1850000,
    discount_price: 1650000,
    stock: 25,
    rating: 4.8,
    review_count: 185,
    image_url: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=900&q=80",
    description: "Ban phim co khong day layout 75% pho bien nhat.",
    is_featured: false,
    specs: {
      "Switch": "Gateron G Pro (Red/Blue/Brown)",
      "Ket noi": "Bluetooth 5.1 / Cap USB-C",
      "Pin": "4000 mAh",
      "Tuong thich": "Windows, macOS, Android, iOS",
      "Den nen": "RGB 18 che do"
    }
  },

  // --- DONG HO (5) ---
  {
    id: "apple-watch-ultra-2",
    name: "Apple Watch Ultra 2 Titanium",
    slug: "apple-watch-ultra-2",
    category: "Dong ho",
    price: 21990000,
    discount_price: 19990000,
    stock: 15,
    rating: 4.9,
    review_count: 145,
    image_url: "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?auto=format&fit=crop&w=900&q=80",
    description: "Dong ho the thao chuyen nghiep, ben bi nhat cua Apple.",
    is_featured: true,
    specs: {
      "Chat lieu": "Titanium hang khong",
      "Man hinh": "Retina luon bat, 3000 nits",
      "Chip": "S9 SiP",
      "Thoi luong pin": "36 gio (che do thuong), 72 gio (tiet kiem pin)",
      "Chong nuoc": "Do sau 100m",
      "Cam bien": "Nhiet do, Oxy trong mau, ECG"
    }
  },
  {
    id: "samsung-watch-6-classic",
    name: "Samsung Galaxy Watch 6 Classic 43mm",
    slug: "samsung-watch-6-classic",
    category: "Dong ho",
    price: 8990000,
    discount_price: 5490000,
    stock: 20,
    rating: 4.7,
    review_count: 320,
    image_url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80",
    description: "Vong xoay bezel vat ly huyen thoai tro lai.",
    is_featured: false,
    specs: {
      "Man hinh": "1.3 inch Super AMOLED",
      "He dieu hanh": "Wear OS Powered by Samsung",
      "RAM/ROM": "2 GB / 16 GB",
      "Theo doi suc khoe": "BIA, ECG, Huyet ap, Giac ngu",
      "Chong nuoc": "5ATM + IP68"
    }
  },
  {
    id: "garmin-fenix-7-sapphire",
    name: "Garmin Fenix 7 Sapphire Solar",
    slug: "garmin-fenix-7-sapphire",
    category: "Dong ho",
    price: 22490000,
    discount_price: 20990000,
    stock: 10,
    rating: 4.8,
    review_count: 85,
    image_url: "https://images.unsplash.com/photo-1517502474097-f9b30659dadb?auto=format&fit=crop&w=900&q=80",
    description: "Dong ho GPS cao cap voi kha nang sac pin bang nang luong mat troi.",
    is_featured: false,
    specs: {
      "Kinh": "Sapphire Power Glass",
      "Man hinh": "1.3 inch MIP (Chong choi)",
      "Pin": "Len den 22 ngay (che do smartwatch)",
      "Dinh vi": "Da bang tan GNSS",
      "Tinh nang dac biet": "Ban do Topo, den pin LED"
    }
  },
  {
    id: "huawei-watch-gt-4",
    name: "Huawei Watch GT 4 46mm",
    slug: "huawei-watch-gt-4",
    category: "Dong ho",
    price: 5990000,
    discount_price: 4490000,
    stock: 45,
    rating: 4.7,
    review_count: 210,
    image_url: "https://images.unsplash.com/photo-1617043786394-f977fa12eddf?auto=format&fit=crop&w=900&q=80",
    description: "Thiet ke thoi trang, pin cuc khung 14 ngay.",
    is_featured: false,
    specs: {
      "Man hinh": "1.43 inch AMOLED",
      "Pin": "Len den 14 ngay",
      "Ket noi": "Bluetooth 5.2, ho tro nghe goi",
      "Suc khoe": "TruSeen 5.5+, do SpO2 24/7",
      "Tuong thich": "Android va iOS"
    }
  },
  {
    id: "amazfit-gtr-4",
    name: "Amazfit GTR 4",
    slug: "amazfit-gtr-4",
    category: "Dong ho",
    price: 4990000,
    discount_price: 3990000,
    stock: 50,
    rating: 4.5,
    review_count: 140,
    image_url: "https://images.unsplash.com/photo-1510017098667-27dfc7150acb?auto=format&fit=crop&w=900&q=80",
    description: "GPS bang tan kep, pin 14 ngay, gia hop ly.",
    is_featured: false,
    specs: {
      "Man hinh": "1.43 inch AMOLED",
      "He dieu hanh": "Zepp OS 2.0",
      "Pin": "14 ngay su dung binh thuong",
      "GPS": "6 he thong dinh vi ve tinh",
      "Luyen tap": "150+ che do the thao"
    }
  },
];

const seedOrders = [
  {
    id: "ORD-24051",
    user_id: "user-1",
    total_amount: 30480000,
    status: "shipped",
    shipping_address: "12 Nguyen Hue, Quan 1, TP HCM",
    payment_method: "cod",
    items: [{ product_id: "iphone-15-pro-max", quantity: 1, price_at_purchase: 29990000 }],
    created_at: "2026-05-12T08:00:00.000Z",
  },
];

async function seed() {
  const client = await connectToDatabase();
  const db = await getDatabase();

  console.log("Cleaning database...");
  await Promise.all([
    db.collection("users").deleteMany({}),
    db.collection("categories").deleteMany({}),
    db.collection("products").deleteMany({}),
    db.collection("cart_items").deleteMany({}),
    db.collection("orders").deleteMany({}),
  ]);

  console.log("Seeding users...");
  const hashedUsers = await Promise.all(
    seedUsers.map(async (user) => {
      const { password, ...userWithoutPassword } = user;
      return {
        ...userWithoutPassword,
        password_hash: await bcrypt.hash(password, 10),
        updated_at: user.created_at,
      };
    })
  );
  await db.collection("users").insertMany(hashedUsers);

  console.log("Seeding categories...");
  await db.collection("categories").insertMany(seedCategories);

  console.log("Seeding products...");
  const now = new Date().toISOString();
  await db.collection("products").insertMany(seedProducts.map((product) => ({ ...product, updated_at: now })));

  console.log("Seeding orders...");
  await db.collection("orders").insertMany(seedOrders);

  console.log("Creating indexes...");
  await Promise.all([
    db.collection("users").createIndex({ email: 1 }, { unique: true }),
    db.collection("products").createIndex({ id: 1 }, { unique: true }),
    db.collection("products").createIndex({ slug: 1 }, { unique: true }),
    db.collection("products").createIndex({ category: 1 }),
    db.collection("products").createIndex({ name: "text", description: "text" }),
    db.collection("cart_items").createIndex({ user_id: 1, product_id: 1 }, { unique: true }),
    db.collection("orders").createIndex({ user_id: 1 }),
    db.collection("orders").createIndex({ status: 1 }),
    db.collection("orders").createIndex({ created_at: -1 }),
  ]);

  console.log("MongoDB seeded successfully");
  console.table({
    users: hashedUsers.length,
    categories: seedCategories.length,
    products: seedProducts.length,
    orders: seedOrders.length,
  });

  await client.close();
}

seed().catch((error) => {
  console.error("MongoDB seed failed");
  console.error(error.message);
  process.exit(1);
});
