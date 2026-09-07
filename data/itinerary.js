/**
 * Itinerary Data
 * Common item fields: id, type, time, title, titleZh, thumbnail, icon, details
 * Supported types: activity | restaurant | flight | other
 *
 * Restaurant items never embed a full restaurant record — they reference
 * restaurants.js by id (restaurantId / nearbyRestaurantIds).
 *
 * Activity details only surface the destination's metroStation / metroExit
 * (no in-between commuting steps) plus entranceFee where relevant.
 *
 * Keep items within a day in ascending `time` order — nothing enforces it,
 * it is what makes the timeline read top-to-bottom.
 *
 * REAL: the 4 days and both flights (9C8512 out, 9C8511 back) are booked.
 * All times are local to the airport shown — the 09:30 → 14:30 outbound is
 * 4h in the air plus the +1h Bangkok→Shanghai time difference.
 * MOCK: every stop, meal time and entrance fee in between is a placeholder
 * plan, not a booking. The `weather` block on each day is only the offline
 * fallback — live values come from Open-Meteo at page load and replace it.
 *
 * `thumbnail` is omitted everywhere because no Shanghai photos have been
 * added yet; each stop shows its icon instead. Add photos per item with
 *   node tools/add-image.js <local-file> <item-id>
 */
window.ITINERARY_DATA = [
  {
    id: "day-1",
    dayNumber: 1,
    date: "2026-11-05",
    locationId: "shanghai",
    weather: {
      forecast: "Partly cloudy",
      temperature: "14–21°C",
      rain: "20%",
      humidity: "70%",
      wind: "13 km/h",
      feelsLike: "20°C",
      uvIndex: 4
    },
    items: [
      {
        id: "d1-flight-in",
        type: "flight",
        time: "09:30",
        title: "Flight to Shanghai",
        titleZh: "飞往上海",
        icon: "flight",
        airline: "Spring Airlines",
        flightNumber: "9C8512",
        departureAirport: "CNX",
        arrivalAirport: "PVG",
        departureTime: "09:30",
        departureDateNote: "Thu 5 Nov 2026",
        arrivalTime: "14:30",
        arrivalDateNote: "Thu 5 Nov 2026",
        arrivalTerminal: "Terminal 2"
      },
      {
        id: "d1-to-hotel",
        type: "other",
        time: "15:30",
        title: "Metro to Hotel & Check-in",
        titleZh: "地铁前往酒店 · 入住",
        icon: "metro",
        details: {
          description:
            "ผ่าน ตม. รับกระเป๋าแล้วนั่ง Metro สาย 2 จากสนามบินผู่ตงเข้าเมือง ประมาณ 1 ชม. (ต้องเปลี่ยนขบวนที่สถานี Guanglan Road) เช็คอินโรงแรมย่านหนานจิงตะวันออก",
          location: "Hanting Hotel, near Nanjing East Road Metro Station",
          metroStation: "Nanjing East Road",
          metroExit: "3"
        }
      },
      {
        id: "d1-dinner",
        type: "restaurant",
        time: "18:00",
        title: "Dinner",
        titleZh: "晚餐",
        icon: "food",
        restaurantId: "restaurant-001",
        nearbyRestaurantIds: ["restaurant-001", "restaurant-002"]
      },
      {
        id: "d1-the-bund",
        type: "activity",
        time: "19:30",
        title: "The Bund",
        titleZh: "外滩",
        icon: "landmark",
        details: {
          description:
            "ทางเดินเลียบแม่น้ำหวงผู่ ฝั่งหนึ่งเป็นตึกยุโรปเก่า อีกฝั่งเป็นตึกระฟ้าผู่ตง จุดถ่ายรูปหลักของเซี่ยงไฮ้ ไฟเปิดครบตั้งแต่ราวหกโมงเย็น เดินจากโรงแรมได้",
          location: "Zhongshan East 1st Road, Huangpu District",
          metroStation: "East Nanjing Road",
          metroExit: "7",
          entranceFee: "ฟรี"
        }
      },
      {
        id: "d1-nanjing-road",
        type: "activity",
        time: "21:00",
        title: "Nanjing Road Pedestrian Street",
        titleZh: "南京路步行街",
        icon: "shopping",
        details: {
          description:
            "ถนนคนเดินสายช้อปปิ้งหลัก ป้ายไฟนีออนเต็มสองข้างทาง เดินต่อจากเดอะบันด์กลับโรงแรมได้พอดี",
          location: "Nanjing East Road, Huangpu District",
          metroStation: "East Nanjing Road",
          metroExit: "2"
        }
      }
    ]
  },
  {
    id: "day-2",
    dayNumber: 2,
    date: "2026-11-06",
    locationId: "shanghai",
    weather: {
      forecast: "Sunny",
      temperature: "15–22°C",
      rain: "10%",
      humidity: "63%",
      wind: "12 km/h",
      feelsLike: "21°C",
      uvIndex: 5
    },
    items: [
      {
        id: "d2-yu-garden",
        type: "activity",
        time: "09:00",
        title: "Yu Garden & Old Town Bazaar",
        titleZh: "豫园 · 城隍庙",
        icon: "park",
        details: {
          description:
            "สวนจีนสมัยราชวงศ์หมิงกลางเมืองเก่า รอบๆ เป็นตลาดเฉิงหวงเมี่ยวที่มีของกินและของฝาก ไปเช้าคนน้อยกว่ามาก",
          location: "279 Yuyuan Old Road, Huangpu District",
          metroStation: "Yuyuan Garden",
          metroExit: "1",
          entranceFee: "¥40"
        }
      },
      {
        id: "d2-lunch",
        type: "restaurant",
        time: "12:00",
        title: "Lunch",
        titleZh: "午餐",
        icon: "food",
        restaurantId: "restaurant-003",
        nearbyRestaurantIds: ["restaurant-003", "restaurant-002"]
      },
      {
        id: "d2-shanghai-tower",
        type: "activity",
        time: "14:00",
        title: "Shanghai Tower Observation Deck",
        titleZh: "上海中心大厦观光厅",
        icon: "landmark",
        details: {
          description:
            "จุดชมวิวชั้น 118 ของตึกที่สูงที่สุดในจีน ลิฟต์เร็วที่สุดในโลก ควรซื้อบัตรออนไลน์ล่วงหน้าเพื่อเลี่ยงคิว",
          location: "501 Yincheng Middle Road, Pudong New Area",
          metroStation: "Lujiazui",
          metroExit: "6",
          entranceFee: "¥180"
        }
      },
      {
        id: "d2-tianzifang",
        type: "activity",
        time: "16:30",
        title: "Tianzifang",
        titleZh: "田子坊",
        icon: "shopping",
        details: {
          description:
            "ตรอกซอกซอยบ้านเก่าสไตล์ shikumen ที่กลายเป็นร้านงานคราฟต์ คาเฟ่ และแกลเลอรี เดินเล่นถ่ายรูปได้เพลิน",
          location: "Lane 210, Taikang Road, Huangpu District",
          metroStation: "Dapuqiao",
          metroExit: "1",
          entranceFee: "ฟรี"
        }
      },
      {
        id: "d2-dinner",
        type: "restaurant",
        time: "18:30",
        title: "Dinner",
        titleZh: "晚餐",
        icon: "food",
        restaurantId: "restaurant-007",
        nearbyRestaurantIds: ["restaurant-007", "restaurant-004"]
      },
      {
        id: "d2-xintiandi",
        type: "activity",
        time: "20:30",
        title: "Xintiandi",
        titleZh: "新天地",
        icon: "landmark",
        details: {
          description:
            "ย่านตึกอิฐเก่าที่รีโนเวตเป็นร้านอาหารและบาร์ บรรยากาศกลางคืนดี ห่างจากเทียนจื่อฟางแค่ไม่กี่สถานี",
          location: "Lane 181, Taicang Road, Huangpu District",
          metroStation: "South Huangpi Road",
          metroExit: "1"
        }
      }
    ]
  },
  {
    id: "day-3",
    dayNumber: 3,
    date: "2026-11-07",
    locationId: "shanghai",
    weather: {
      forecast: "Cloudy",
      temperature: "14–20°C",
      rain: "30%",
      humidity: "72%",
      wind: "15 km/h",
      feelsLike: "19°C",
      uvIndex: 3
    },
    items: [
      {
        id: "d3-zhujiajiao",
        type: "activity",
        time: "08:30",
        title: "Zhujiajiao Water Town",
        titleZh: "朱家角古镇",
        icon: "landmark",
        details: {
          description:
            "เมืองน้ำเก่าอายุกว่า 1,700 ปี นั่ง Metro สาย 17 จากใจกลางเมืองราวหนึ่งชั่วโมง มีสะพานหินฟั่งเซิงและล่องเรือในคลอง ครึ่งวันกำลังพอดี",
          location: "Zhujiajiao Ancient Town, Qingpu District",
          metroStation: "Zhujiajiao (Line 17)",
          metroExit: "2",
          entranceFee: "ฟรี (ค่าเข้าบางจุด ¥30–80)"
        }
      },
      {
        id: "d3-lunch",
        type: "restaurant",
        time: "12:30",
        title: "Lunch",
        titleZh: "午餐",
        icon: "food",
        restaurantId: "restaurant-006",
        nearbyRestaurantIds: ["restaurant-006"]
      },
      {
        id: "d3-french-concession",
        type: "activity",
        time: "16:00",
        title: "Former French Concession Walk",
        titleZh: "法租界漫步",
        icon: "walk",
        details: {
          description:
            "เดินเล่นถนนอู่คังลู่และหวยไห่ลู่ ต้นไม้สองข้างทางกับตึกเก่าสไตล์ยุโรป ย่านคาเฟ่และร้านเล็กๆ ของเซี่ยงไฮ้",
          location: "Wukang Road / Huaihai Middle Road, Xuhui District",
          metroStation: "Shanghai Library",
          metroExit: "3"
        }
      },
      {
        id: "d3-dinner",
        type: "restaurant",
        time: "18:30",
        title: "Dinner",
        titleZh: "晚餐",
        icon: "food",
        restaurantId: "restaurant-005",
        nearbyRestaurantIds: ["restaurant-005", "restaurant-004"]
      },
      {
        id: "d3-river-cruise",
        type: "activity",
        time: "20:30",
        title: "Huangpu River Night Cruise",
        titleZh: "黄浦江夜游",
        icon: "ticket",
        details: {
          description:
            "ล่องเรือชมไฟสองฝั่งแม่น้ำหวงผู่ ราว 50 นาที ขึ้นเรือที่ท่าเรือสิบหกผู่ ซื้อตั๋วหน้าท่าได้",
          location: "Shiliupu Wharf, Zhongshan East 2nd Road, Huangpu District",
          metroStation: "Yuyuan Garden",
          metroExit: "1",
          entranceFee: "¥120"
        }
      }
    ]
  },
  {
    id: "day-4",
    dayNumber: 4,
    date: "2026-11-08",
    locationId: "shanghai",
    weather: {
      forecast: "Partly cloudy",
      temperature: "14–21°C",
      rain: "20%",
      humidity: "68%",
      wind: "13 km/h",
      feelsLike: "20°C",
      uvIndex: 4
    },
    items: [
      {
        id: "d4-hotel-checkout",
        type: "other",
        time: "09:00",
        title: "Hotel Check-out",
        titleZh: "退房",
        icon: "hotel",
        details: {
          description:
            "เช็คเอาท์ตามเวลาโรงแรม (12:00) แต่ออกเช้าหน่อยแล้วฝากกระเป๋าไว้ที่ล็อบบี้ จะได้เที่ยวต่อได้ก่อนไปสนามบิน",
          location: "Hanting Hotel, near Nanjing East Road Metro Station"
        }
      },
      {
        id: "d4-jingan-temple",
        type: "activity",
        time: "09:30",
        title: "Jing'an Temple",
        titleZh: "静安寺",
        icon: "landmark",
        details: {
          description:
            "วัดทองกลางย่านธุรกิจ ตัดกับตึกกระจกรอบๆ อย่างชัดเจน ใช้เวลาไม่นานและอยู่บนเส้นทางกลับสนามบิน (Metro สาย 2 สายเดียวกัน)",
          location: "1686 Nanjing West Road, Jing'an District",
          metroStation: "Jing'an Temple",
          metroExit: "1",
          entranceFee: "¥50"
        }
      },
      {
        id: "d4-lunch",
        type: "restaurant",
        time: "11:30",
        title: "Farewell Lunch",
        titleZh: "最后一餐",
        icon: "food",
        restaurantId: "restaurant-002",
        nearbyRestaurantIds: ["restaurant-002", "restaurant-001"]
      },
      {
        id: "d4-to-airport",
        type: "other",
        time: "13:00",
        title: "Transfer to Pudong Airport",
        titleZh: "前往浦东机场",
        icon: "train",
        details: {
          description:
            "รับกระเป๋าที่โรงแรมแล้วออกไปสนามบิน เผื่อเวลา 3 ชม. ก่อนบิน เลือกได้ระหว่าง Metro สาย 2 (ถูกกว่า ~1 ชม.) หรือ Maglev จากสถานีหลงหยางลู่ (8 นาที)",
          location: "Shanghai Pudong International Airport, Terminal 2",
          metroStation: "Longyang Road (Maglev)",
          metroExit: "4"
        }
      },
      {
        id: "d4-flight-out",
        type: "flight",
        time: "16:10",
        title: "Flight back to Chiang Mai",
        titleZh: "飞回清迈",
        icon: "flight",
        airline: "Spring Airlines",
        flightNumber: "9C8511",
        departureAirport: "PVG",
        arrivalAirport: "CNX",
        departureTime: "16:10",
        departureDateNote: "Sun 8 Nov 2026",
        departureTerminal: "Terminal 2",
        arrivalTime: "20:10",
        arrivalDateNote: "Sun 8 Nov 2026"
      }
    ]
  }
];
