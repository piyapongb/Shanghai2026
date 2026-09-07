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
 * MOCK DATA: these are real, well-known Shanghai restaurants used as
 * placeholders so the app has something to render. Addresses, prices and
 * ratings are approximate and the links point at search-engine home pages,
 * not at the specific listing — replace them before relying on any of it.
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
    image: "",
    gallery: [],
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
    id: "restaurant-006",
    zone: "Qingpu",
    name: "Zhujiajiao Old Street Eats",
    nameZh: "朱家角老街小吃",
    image: "",
    gallery: [],
    cuisine: ["Street Food", "Local"],
    description:
      "แผงของกินตลอดถนนเก่าในเมืองน้ำจูเจียเจี่ยว ขาหมูตุ๋น บะจ่างใบไผ่ และขนมท้องถิ่น กินเดินไปตามคลองได้เลย",
    address: "North Street, Zhujiajiao Ancient Town, Qingpu District, Shanghai",
    price: "¥30–80",
    recommendedDishes: ["Zongzi (Bamboo Leaf Rice)", "Braised Pork Knuckle", "Sweet Osmanthus Cake"],
    links: []
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
  }
];
