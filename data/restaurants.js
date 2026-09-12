/**
 * Restaurant Master Data
 * Single source of truth for every restaurant. Itinerary items reference
 * these records by id only (restaurantId / nearbyRestaurantIds) and must
 * never embed a duplicate copy of a restaurant object.
 *
 * Fields: id, zone, name, nameZh, image, gallery, cuisine, description,
 * address, price, recommendedDishes, links
 *
 * `links` is an array of { label, url, type: "review"|"website", rating? }
 * rendered as a "Reviews & Links" list — use it to attach one or many
 * review sites / official sites per restaurant.
 *
 * These are real Shanghai restaurants chosen to match the itinerary, but
 * prices are indicative only and restaurant-001..007 still carry the
 * original placeholder links (search-engine home pages, not the actual
 * listing) — swap those before relying on them. Records added later have
 * an empty `links` array rather than a fake one.
 *
 * restaurant-006 was Zhujiajiao Water Town and was dropped when the Day 3
 * plan changed to a city walk; the id is deliberately left unused.
 *
 * `gallery` needs at least 2 photos before the gallery section renders at
 * all, so a single-photo gallery is invisible. `image` is left empty here
 * because no Shanghai photos have been added yet; add one per restaurant
 * with `node tools/add-image.js <local-file> restaurant-00N`.
 */
window.RESTAURANTS_DATA = [
  {
    id: "restaurant-001",
    zone: "Huangpu",
    name: "Yang's Fried Dumplings",
    nameZh: "小杨生煎",
    image: "assets/images/restaurants/restaurant-001.jpg",
    gallery: [
      "assets/images/restaurants/restaurant-001-2.jpg",
      "assets/images/restaurants/restaurant-001-3.jpg"
    ],
    cuisine: ["Shanghainese", "Street Food"],
    description:
      "ร้านเสี่ยวหลงเปาทอด (เชิงเจียน) ชื่อดังของเซี่ยงไฮ้ แป้งกรอบก้น น้ำซุปข้างในเยอะ ราคาไม่แพง เหมาะเป็นมื้อเช้าหรือของว่าง",
    address: "Huanghe Road, Huangpu District, Shanghai",
    price: "¥20–40",
    recommendedDishes: ["Pork Sheng Jian Bao", "Beef Curry Soup", "Vermicelli Soup"],
    links: [
      { label: "TripAdvisor", url: "https://www.tripadvisor.com/", type: "review", rating: "4.2" },
      { label: "Dianping (大众点评)", url: "https://www.dianping.com/", type: "review", rating: "4.4" }
    ]
  },
  {
    id: "restaurant-002",
    zone: "Huangpu",
    name: "Jia Jia Tang Bao",
    nameZh: "佳家汤包",
    image: "",
    gallery: [],
    cuisine: ["Shanghainese", "Dim Sum"],
    description:
      "ร้านเสี่ยวหลงเปาเล็กๆ แต่คนต่อคิวยาว ขึ้นชื่อว่าน้ำซุปในตัวแป้งหวานกลมกล่อมที่สุดร้านหนึ่งในเมือง",
    address: "90 Huanghe Road, Huangpu District, Shanghai",
    price: "¥40–80",
    recommendedDishes: ["Crab Roe Xiao Long Bao", "Pork Xiao Long Bao", "Wonton Soup"],
    links: [
      { label: "Dianping (大众点评)", url: "https://www.dianping.com/", type: "review", rating: "4.5" }
    ]
  },
  {
    id: "restaurant-003",
    zone: "Yu Garden",
    name: "Nanxiang Steamed Bun Restaurant",
    nameZh: "南翔馒头店",
    image: "",
    gallery: [],
    cuisine: ["Shanghainese", "Dim Sum"],
    description:
      "ร้านซาลาเปาน้ำซุปในตลาดสวนอวี้หยวน อายุกว่าร้อยปี ชั้นล่างซื้อกลับ ชั้นบนนั่งทานแบบสบายกว่า",
    address: "85 Yuyuan Old Road, Huangpu District, Shanghai",
    price: "¥60–150",
    recommendedDishes: ["Crab Roe Bun", "Pork Xiao Long Bao", "Chicken Soup"],
    links: [
      { label: "TripAdvisor", url: "https://www.tripadvisor.com/", type: "review", rating: "4.0" },
      { label: "Dianping (大众点评)", url: "https://www.dianping.com/", type: "review", rating: "4.3" }
    ]
  },
  {
    id: "restaurant-004",
    zone: "Xintiandi",
    name: "Din Tai Fung (Xintiandi)",
    nameZh: "鼎泰丰(新天地店)",
    image: "",
    gallery: [],
    cuisine: ["Taiwanese", "Dim Sum"],
    description:
      "ร้านเสี่ยวหลงเปาระดับสากล สะอาด นั่งสบาย เหมาะเวลาที่ไม่อยากเสี่ยงกับคิวหรือความสะอาดของร้านท้องถิ่น",
    address: "South Block Xintiandi, Lane 123 Xingye Road, Huangpu District, Shanghai",
    price: "¥150–250",
    recommendedDishes: ["Truffle Xiao Long Bao", "Shrimp & Pork Wonton", "Braised Beef Noodle Soup"],
    links: [
      { label: "Official Website", url: "https://www.dintaifung.com.tw/", type: "website" },
      { label: "TripAdvisor", url: "https://www.tripadvisor.com/", type: "review", rating: "4.5" }
    ]
  },
  {
    id: "restaurant-005",
    zone: "The Bund",
    name: "Lost Heaven (Bund)",
    nameZh: "花马天堂(外滩店)",
    image: "",
    gallery: [],
    cuisine: ["Yunnan", "Southeast Asian"],
    description:
      "อาหารยูนนานในตึกเก่าย่านเดอะบันด์ บรรยากาศไฟสลัวสวย เหมาะเป็นมื้อเย็นก่อนออกไปเดินริมน้ำ ควรจองล่วงหน้า",
    address: "17 Yan'an East Road, Huangpu District, Shanghai",
    price: "¥200–350",
    recommendedDishes: ["Dai Style Grilled Fish", "Bamboo Chicken", "Yunnan Mint Salad"],
    links: [
      { label: "TripAdvisor", url: "https://www.tripadvisor.com/", type: "review", rating: "4.4" }
    ]
  },
  {
    id: "restaurant-007",
    zone: "Xuhui",
    name: "Jian Guo 328",
    nameZh: "建国328小馆",
    image: "",
    gallery: [],
    cuisine: ["Shanghainese", "Home-style"],
    description:
      "ร้านอาหารเซี่ยงไฮ้แบบบ้านๆ ในย่านฝรั่งเศสเก่า ราคาไม่แรง รสจัดกำลังดี เหมาะลองอาหารเซี่ยงไฮ้แท้ๆ สักมื้อ",
    address: "328 Jianguo West Road, Xuhui District, Shanghai",
    price: "¥100–180",
    recommendedDishes: ["Red-braised Pork", "Crispy Duck", "Stir-fried Rice Cake"],
    links: [
      { label: "Dianping (大众点评)", url: "https://www.dianping.com/", type: "review", rating: "4.4" }
    ]
  },
  {
    id: "restaurant-008",
    zone: "Huanghe Rd",
    name: "Huanghe Road Food Street",
    nameZh: "黄河路美食街",
    image: "",
    gallery: [],
    cuisine: ["Shanghainese", "Street Food"],
    description:
      "ถนนสายอาหารที่โรงแรมตั้งอยู่ ออกจากล็อบบี้เดินถึงเลย มีตั้งแต่ร้านเสี่ยวหลงเปา-เชิงเจียนกินเร็ว ไปจนถึงร้านเซี่ยงไฮ้แบบสั่งทั้งโต๊ะ (ปลาตุ๋นซีอิ๊ว กุ้งแม่น้ำ) ดังขึ้นอีกรอบหลังละคร 繁花 ปี 2024 — ต้นเดือน พ.ย. ตรงฤดูปูขนพอดี",
    address: "Huanghe Road, Huangpu District, Shanghai",
    price: "¥30–150",
    recommendedDishes: ["Sheng Jian Bao", "Xiao Long Bao", "ปูขน (ตามฤดู)", "ปลาตุ๋นซีอิ๊ว"],
    links: []
  },
  {
    id: "restaurant-009",
    zone: "Disneytown",
    name: "Shanghai Min (Disneytown)",
    nameZh: "小南国(迪士尼小镇店)",
    image: "",
    gallery: [],
    cuisine: ["Shanghainese"],
    description:
      "ร้านอาหารเซี่ยงไฮ้ในดิสนีย์ทาวน์ ซึ่งอยู่นอกประตูสวน ไม่ต้องใช้บัตรเข้าสวนก็กินได้ ราคาสมเหตุสมผลกว่าร้านในสวนและนั่งสบายกว่า สั่งแบ่งกันทั้งโต๊ะได้",
    address: "Disneytown, Shanghai Disney Resort, Pudong New Area, Shanghai",
    price: "¥100–200",
    recommendedDishes: ["ลูกชิ้นหมูน้ำซุป", "หมูตุ๋นซีอิ๊ว", "ผัดผักตามฤดู"],
    links: []
  },
  {
    id: "restaurant-010",
    zone: "Disneytown",
    name: "The Cheesecake Factory (Disneytown)",
    nameZh: "芝乐坊餐厅(迪士尼小镇店)",
    image: "",
    gallery: [],
    cuisine: ["American"],
    description:
      "ร้านอเมริกันจานใหญ่ในดิสนีย์ทาวน์ เหมาะถ้าอยากพักจากอาหารจีนสักมื้อ พอร์ชั่นใหญ่สั่งแบ่งกันได้ ชีสเค้กเป็นของหวานประจำร้าน คนเยอะช่วงเที่ยง-เย็น",
    address: "Disneytown, Shanghai Disney Resort, Pudong New Area, Shanghai",
    price: "¥150–300",
    recommendedDishes: ["Cheesecake", "Pasta", "Burger"],
    links: []
  },
  {
    id: "restaurant-011",
    zone: "Jing'an",
    name: "Huxilao Longtang Noodle House (Maoming North Rd)",
    nameZh: "沪西老弄堂面馆(茂名北路)",
    image: "",
    gallery: [],
    cuisine: ["Shanghainese", "Noodles"],
    description:
      "ร้านบะหมี่เซี่ยงไฮ้แบบเปิ่นปังที่คนท้องถิ่นต่อคิว เมนูขึ้นชื่อคือบะหมี่ตับหมูผัดกับหอยลาย ซีอิ๊วเข้มข้น สาขานี้เดินจากสถานี West Nanjing Road ได้ อยู่บนเส้นทางวันสุดท้ายพอดี",
    address: "107 Maoming North Road, Jing'an District, Shanghai",
    price: "¥30–60",
    recommendedDishes: ["บะหมี่ตับหมู-หอยลาย (蛤蜊猪肝面)", "บะหมี่น้ำมันต้นหอม (葱油面)"],
    links: []
  },
  {
    id: "restaurant-012",
    zone: "Anfu Rd",
    name: "Baker & Spice (Anfu Road)",
    nameZh: "Baker & Spice(安福路店)",
    image: "",
    gallery: [],
    cuisine: ["Bakery", "Brunch"],
    description:
      "เบเกอรี่-คาเฟ่บนถนนอันฝู มีระเบียงชั้นสองมองลงมาเห็นถนน ซินนามอนโรลกับสโคนแครนเบอร์รีเป็นของขึ้นชื่อ เหมาะเป็นมื้อเที่ยงเบาๆ ระหว่างเดินย่านเก่า",
    address: "Anfu Road, Xuhui District, Shanghai",
    price: "¥60–120",
    recommendedDishes: ["Cinnamon Roll", "Cranberry Scone", "Sourdough Sandwich"],
    links: []
  },
  {
    id: "restaurant-013",
    zone: "Anfu Rd",
    name: "Lokal by Wagas (Anfu Road)",
    nameZh: "Lokal(安福路店)",
    image: "",
    gallery: [],
    cuisine: ["Western", "Vietnamese"],
    description:
      "ห้องกระจกมีคอร์ทยาร์ดนั่งกลางแจ้ง อาหารฝรั่งผสมเอเชีย มีเฝอเวียดนามและชีสเค้กบลูเบอร์รี เป็นร้านที่คนแวะกินและถ่ายรูประหว่างเดินอันฝูลู่",
    address: "Anfu Road, Xuhui District, Shanghai",
    price: "¥80–150",
    recommendedDishes: ["Vietnamese Pho", "Blueberry Cheesecake", "Brunch Plate"],
    links: []
  },
  {
    id: "restaurant-014",
    zone: "Wukang Rd",
    name: "% Arabica (Wukang Road)",
    nameZh: "% Arabica(武康路店)",
    image: "",
    gallery: [],
    cuisine: ["Coffee"],
    description:
      "ร้านกาแฟบนถนนอู่คัง ร้านเล็กคนเยอะ ซื้อแล้วถือเดินต่อได้ ใช้เป็นจุดจับกาแฟระหว่างเดินอู่คังลู่-อันฝูลู่ (อีกร้านที่คนแวะคือ Old Mai Cafe ที่ชั้นล่างตึกอู่คัง)",
    address: "Wukang Road, Xuhui District, Shanghai",
    price: "¥30–50",
    recommendedDishes: ["Spanish Latte", "Caffè Latte"],
    links: []
  },
  {
    id: "restaurant-015",
    zone: "Yu Garden",
    name: "Lü Bo Lang",
    nameZh: "绿波廊",
    image: "",
    gallery: [],
    cuisine: ["Shanghainese"],
    description:
      "ร้านเซี่ยงไฮ้เก่าแก่ในสวนหยูหยวน บรรยากาศจีนโบราณ มองเห็นสวน ราคาสูงกว่าแผงข้างนอกแต่ได้นั่งสบายและไม่ต้องยืนต่อคิว เหมาะเป็นมื้อเย็นถ้าไม่อยากแย่งที่นั่งกับนักท่องเที่ยว",
    address: "115 Yuyuan Road, Huangpu District, Shanghai",
    price: "¥200–400",
    recommendedDishes: ["ซาลาเปาไส้ปู", "เต้าหู้ปู", "ขนมทอดกรอบ"],
    links: []
  },
  {
    id: "restaurant-016",
    zone: "Huangpu",
    name: "Huxilao Longtang Noodle House (Guangdong Rd)",
    nameZh: "沪西老弄堂面馆(广东路店)",
    image: "",
    gallery: [],
    cuisine: ["Shanghainese", "Noodles"],
    description:
      "สาขาถนนกวางตุ้งของร้านบะหมี่เจ้าเดียวกัน อยู่ห่างจาก M1NT (ถนนฝูโจว) แค่บล็อกเดียว กินเร็วก่อนไปคลับได้พอดี เมนูเหมือนสาขาหลัก",
    address: "Room 02, 1F World Trade Building, 500 Guangdong Road, Huangpu District, Shanghai",
    price: "¥30–60",
    recommendedDishes: ["บะหมี่ตับหมู-หอยลาย (蛤蜊猪肝面)", "บะหมี่น้ำมันต้นหอม (葱油面)"],
    links: []
  }
];
