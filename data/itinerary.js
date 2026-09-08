/**
 * Itinerary Data
 * Common item fields: id, type, time, title, titleZh, thumbnail, icon, details
 * Supported types: activity | restaurant | flight | park | other
 *
 * `park` items are for a day spent inside one theme park: the collapsed card
 * shows only the land's name, and Details opens its story, key characters
 * and one card per attraction. Shape:
 *   { id, type: "park", title, titleZh, icon,
 *     park: { story, characters: [], tip,
 *             rides: [{ name, nameZh, kind, description, howItWorks,
 *                       duration, height, intensity }] } }
 * Every ride field except `name` is optional and simply not rendered when
 * missing, so half-filled entries are safe to commit.
 *
 * A day may set `hideTimes: true` to drop the time column for that day only
 * (park days run on queue length, not on a clock). Items on such a day do
 * not need a `time` at all — their order in `items` is the running order.
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
    hideTimes: true,
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
        id: "d2-tomorrowland",
        type: "park",
        title: "Tomorrowland",
        titleZh: "明日世界",
        thumbnail: "",
        icon: "landmark",
        park: {
          story:
            "โซนอนาคตที่ออกแบบให้เหมือนเมืองพลังงานสะอาด เส้นสายโค้งมนสีขาว-น้ำเงิน กลางคืนไฟนีออนสวยที่สุดในสวน จุดสังเกตคือหลังคาโค้งเรืองแสงของ TRON ที่เห็นได้จากไกลๆ เป็นโซนที่คนแห่มาเป็นที่แรกตั้งแต่ประตูเปิด",
          characters: ["sam-flynn", "clu", "buzz", "zurg", "stitch", "darth-vader", "bb8"],
          tip:
            "TRON คือเครื่องเล่นที่คิวยาวที่สุดของสวนนี้ กลยุทธ์ที่ได้ผลคือมาที่นี่เป็นที่แรกตอนสวนเปิด หรือรอช่วงใกล้ปิดที่คิวมักสั้นลงมาก",
          rides: [
            {
              id: "d2-tron",
              name: "TRON Lightcycle Power Run",
              nameZh: "创极速光轮",
              image: "",
              kind: "รถไฟเหาะ พุ่งออกตัวเร็ว",
              kindEn: "Launch coaster",
              description:
                "รถไฟเหาะที่เร็วที่สุดในสวน พุ่งออกจากสถานีเข้าไปในอุโมงค์แสงนีออน ใช้เวลาสั้นแต่ตื่นเต้นที่สุดในวัน",
              howItWorks:
                "นั่งคร่อมเหมือนมอเตอร์ไซค์ ก้มตัวไปข้างหน้า มีที่ล็อกกดลงมาด้านหลัง ไม่มีการกลับหัว แต่แรงเหวี่ยงช่วงออกตัวสูงมาก",
              duration: "~2 นาที",
              intensity: "แรง"
            },
            {
              id: "d2-buzz",
              name: "Buzz Lightyear Planet Rescue",
              nameZh: "巴斯光年星际营救",
              image: "",
              kind: "นั่งรถยิงเป้าเก็บแต้ม",
              kindEn: "Interactive dark ride",
              description:
                "ยิงเป้าช่วยบัซซ์สู้กับจักรพรรดิเซิร์ก เก็บแต้มแข่งกับคนที่นั่งข้างๆ ได้",
              howItWorks:
                "แต่ละที่นั่งมีปืนเลเซอร์ถือได้อิสระ (ไม่ยึดติดกับตัวรถ) เล็งไปที่เป้ารูปตัว Z แล้วเหนี่ยวไก แต้มขึ้นบนจอตรงหน้า",
              duration: "~5 นาที",
              intensity: "เบา"
            },
            {
              id: "d2-jet-packs",
              name: "Jet Packs",
              nameZh: "喷气背包飞行器",
              image: "",
              kind: "เครื่องเล่นหมุนรอบเสา",
              kindEn: "Spinner",
              description:
                "บินวนรอบเสากลางด้วยเจ็ตแพ็ก มองเห็นวิวโซนอนาคตได้ทั้งโซน",
              howItWorks:
                "มีคันบังคับให้ปรับสูง-ต่ำและเอียงเองได้ระหว่างหมุน หมุนเร็วปานกลาง",
              duration: "~2 นาที",
              intensity: "กลาง"
            },
            {
              id: "d2-stitch",
              name: "Stitch Encounter",
              nameZh: "史迪奇宝宝",
              image: "",
              kind: "โชว์ที่คุยโต้ตอบกับคนดู",
              kindEn: "Interactive show",
              description:
                "สติชคุยกับคนดูสดๆ ผ่านจอ เลือกหยอกใครสักคนในห้องได้จริง",
              howItWorks:
                "นั่งในโรงเล็ก โชว์ดำเนินเป็นภาษาจีนกลางเป็นหลัก ฟังไม่ออกก็ยังดูสนุกจากภาพและปฏิกิริยาคนดู",
              duration: "~15 นาที",
              intensity: "เบา"
            },
            {
              id: "d2-star-wars",
              name: "Star Wars Launch Bay",
              nameZh: "星球大战远征基地",
              image: "",
              kind: "นิทรรศการ เดินชมและถ่ายรูป",
              kindEn: "Exhibit & meet",
              description:
                "นิทรรศการยานและชุดจากสตาร์วอร์ส พร้อมจุดถ่ายรูปกับตัวละคร",
              howItWorks:
                "เดินชมได้อิสระในอาคารแอร์เย็น ไม่ต้องต่อคิวเครื่องเล่น เป็นที่หลบร้อนช่วงบ่ายที่ดี",
              intensity: "เบา"
            }
          ]
        }
      },
      {
        id: "d2-adventure-isle",
        type: "park",
        title: "Adventure Isle",
        titleZh: "探险岛",
        thumbnail: "",
        icon: "park",
        park: {
          story:
            "เกาะของชนเผ่าโบราณสมมุติชื่อ Arbori มีภูเขา Roaring Mountain ตั้งเด่นเป็นแลนด์มาร์กของโซน บรรยากาศเป็นป่าดิบกับซากอารยธรรมที่ถูกทิ้งร้าง เป็นโซนที่มีเครื่องเล่นระดับต้องเล่นถึงสองอย่าง",
          characters: ["tarzan"],
          tip:
            "Soaring Over the Horizon คิวยาวตลอดวันและเป็นเครื่องเล่นที่เกือบทุกคนบอกว่าห้ามพลาด ถ้าไม่ได้เริ่มวันที่ TRON ให้เริ่มที่นี่แทน",
          rides: [
            {
              id: "d2-soaring",
              name: "Soaring Over the Horizon",
              nameZh: "翱翔·飞越地平线",
              image: "",
              kind: "โรงหนังจอโค้ง ยกที่นั่งลอย",
              kindEn: "Flying theater",
              description:
                "โรงหนังจอโค้งครึ่งวงกลม พาบินข้ามแลนด์มาร์กทั่วโลก มีลมและกลิ่นจริงพ่นเข้ามาตามฉาก",
              howItWorks:
                "นั่งเก้าอี้เป็นแถว แล้วแถวเก้าอี้ถูกยกลอยขึ้นไปกลางจอ ขาห้อยอิสระ ไม่มีการเหวี่ยง คนกลัวความสูงส่วนใหญ่ยังเล่นได้",
              duration: "~5 นาที",
              intensity: "กลาง"
            },
            {
              id: "d2-roaring-rapids",
              name: "Roaring Rapids",
              nameZh: "雷鸣山漂流",
              image: "",
              kind: "ล่องแก่ง เปียกน้ำแน่นอน",
              kindEn: "Water ride",
              description:
                "ล่องแก่งด้วยแพกลม วนรอบภูเขา Roaring Mountain ที่มีสัตว์ประหลาดซ่อนอยู่",
              howItWorks:
                "แพหมุนเองตามกระแสน้ำ ใครนั่งฝั่งไหนโดนน้ำไม่เท่ากัน เตรียมเสื้อกันฝนหรือถุงกันน้ำใส่มือถือไปด้วย",
              duration: "~5 นาที",
              intensity: "กลาง–แรง (เปียกทั้งตัว)"
            },
            {
              id: "d2-camp-discovery",
              name: "Camp Discovery – Challenge Trails",
              nameZh: "古迹探索营－探险家营地",
              image: "",
              kind: "ปีนป่ายผจญภัย ออกแรงเอง",
              kindEn: "Climbing course",
              description:
                "เส้นทางปีนป่ายบนหน้าผาจำลอง มีให้เลือกหลายระดับความยาก",
              howItWorks:
                "ใส่สายรัดนิรภัยแล้วเดินไต่ไปตามเส้นทางเอง มีเชือกเกี่ยวตลอดทาง ต้องไปรับคิวหน้าโซนในวันนั้น",
              duration: "~20 นาที",
              intensity: "กลาง (ออกแรงเยอะ)"
            },
            {
              id: "d2-tarzan-show",
              name: "Tarzan: Call of the Jungle",
              nameZh: "人猿泰山：丛林的呼唤",
              image: "",
              kind: "โชว์กายกรรมในโรงละคร",
              kindEn: "Acrobatic show",
              description:
                "โชว์กายกรรมจีนเล่าเรื่องทาร์ซาน โหนสลิงกลางอากาศเหนือหัวคนดู",
              howItWorks:
                "โรงละครในร่ม มีรอบเวลาแน่นอน เช็ครอบในแอปแล้วเข้าไปนั่งก่อนสัก 15 นาที",
              duration: "~25 นาที",
              intensity: "เบา"
            }
          ]
        }
      },
      {
        id: "d2-zootopia",
        type: "park",
        title: "Zootopia",
        titleZh: "疯狂动物城",
        thumbnail: "",
        icon: "landmark",
        park: {
          story:
            "โซนซูโทเปียแห่งแรกและแห่งเดียวในโลก เปิดปลายปี 2023 จำลองเมืองสัตว์ทั้งเมือง ทั้งย่าน Savanna Central และตึกที่ออกแบบให้สัตว์ทุกขนาดอยู่ร่วมกันได้ ยังเป็นโซนใหม่ที่คนแน่นที่สุดโซนหนึ่ง",
          characters: ["judy-hopps", "nick-wilde", "flash", "chief-bogo"],
          tip:
            "บางวันต้องรับบัตรคิวเข้าโซนผ่านแอป Shanghai Disney Resort ตั้งแต่เช้า เช็คตั้งแต่ก่อนเข้าสวนเลยจะปลอดภัยที่สุด",
          rides: [
            {
              id: "d2-zootopia-ride",
              name: "Zootopia: Hot Pursuit",
              nameZh: "疯狂动物城：热力追踪",
              image: "",
              kind: "รถไร้รางในอาคาร",
              kindEn: "Trackless dark ride",
              description:
                "ตามจูดี้กับนิคไล่ล่าคดีในเมืองสัตว์ ผ่านทุกย่านของเมืองรวมถึงย่านหนูจิ๋ว",
              howItWorks:
                "รถตำรวจวิ่งแบบไม่มีราง เคลื่อนที่อิสระและหมุนหันหน้าไปตามฉาก แต่ละรอบเส้นทางไม่เหมือนกันเป๊ะ ไม่มีช่วงตกหรือเหวี่ยงแรง",
              duration: "~5 นาที",
              intensity: "เบา–กลาง"
            }
          ]
        }
      },
      {
        id: "d2-treasure-cove",
        type: "park",
        title: "Treasure Cove",
        titleZh: "宝藏湾",
        thumbnail: "",
        icon: "landmark",
        park: {
          story:
            "โซนโจรสลัดเต็มรูปแบบแห่งแรกของโลกในสวนดิสนีย์ เป็นเมืองท่าเก่าของโจรสลัดแคริบเบียน มีเรือรบจอดอยู่กลางอ่าวให้เดินขึ้นไปได้จริง",
          characters: ["jack-sparrow", "davy-jones", "barbossa"],
          tip:
            "Pirates of the Caribbean ที่นี่คนละเวอร์ชันกับสวนอื่นในโลก ถือว่าเทคโนโลยีดีที่สุดในสวนนี้ ถ้าวันนั้นเล่นได้แค่สองอย่าง ให้อันนี้ติดโผ",
          rides: [
            {
              id: "d2-pirates",
              name: "Pirates of the Caribbean: Battle for the Sunken Treasure",
              nameZh: "加勒比海盗－沉落宝藏之战",
              image: "",
              kind: "นั่งเรือชมฉากในอาคาร",
              kindEn: "Boat dark ride",
              description:
                "ล่องเรือลงไปใต้ทะเลตามหาสมบัติ ฉากรอบตัวเป็นจอยักษ์ผสมหุ่นเคลื่อนไหวจนแยกไม่ออกว่าอันไหนจริงอันไหนจอ",
              howItWorks:
                "เรือวิ่งด้วยระบบแม่เหล็กใต้น้ำ เดินหน้า-ถอยหลัง-หมุนด้านข้างได้ ไม่มีช่วงตกแรง เปียกน้อยมาก",
              duration: "~6 นาที",
              intensity: "กลาง"
            },
            {
              id: "d2-canoes",
              name: "Explorer Canoes",
              nameZh: "探险家独木舟",
              image: "",
              kind: "พายเรือเอง ต้องออกแรง",
              kindEn: "Interactive ride",
              description:
                "พายเรือแคนูจริงๆ รอบอ่าวโจรสลัด",
              howItWorks:
                "ทุกคนบนเรือต้องช่วยพายตามจังหวะที่เจ้าหน้าที่นับ เหนื่อยพอสมควร เปิดเฉพาะบางช่วงเวลาและงดถ้าฝนตก",
              duration: "~10 นาที",
              intensity: "กลาง (ต้องออกแรง)"
            },
            {
              id: "d2-jack-stunt",
              name: "Eye of the Storm: Captain Jack's Stunt Spectacular",
              nameZh: "风暴来临－杰克船长之惊天特技大冒险",
              image: "",
              kind: "โชว์ผาดโผนในโรงละคร",
              kindEn: "Stunt show",
              description:
                "โชว์ผาดโผนของกัปตันแจ็ค มีไฟ น้ำ และฉากบู๊บนเวที",
              howItWorks:
                "โรงละครในร่ม มีรอบเวลาแน่นอน เช็ครอบในแอปแล้วไปนั่งก่อนเริ่มสัก 15 นาที",
              duration: "~20 นาที",
              intensity: "เบา"
            },
            {
              id: "d2-shipwreck",
              name: "Shipwreck Shore",
              nameZh: "沉船海滩",
              image: "",
              kind: "ลานน้ำให้เด็กเล่น",
              kindEn: "Play area",
              description:
                "ลานน้ำพุซากเรือให้เด็กวิ่งเล่น มีปืนฉีดน้ำและวงล้อให้หมุน",
              howItWorks:
                "เข้าเล่นได้อิสระไม่ต้องต่อคิว เตรียมเสื้อสำรองถ้าปล่อยเด็กลงเล่นจริงจัง",
              intensity: "เบา"
            }
          ]
        }
      },
      {
        id: "d2-fantasyland",
        type: "park",
        title: "Fantasyland",
        titleZh: "梦幻世界",
        thumbnail: "",
        icon: "landmark",
        park: {
          story:
            "โซนเทพนิยายรอบ Enchanted Storybook Castle ปราสาทที่ใหญ่ที่สุดในบรรดาสวนดิสนีย์ทั่วโลก และเป็นหลังเดียวที่ไม่ได้อุทิศให้เจ้าหญิงองค์ใดองค์หนึ่ง แต่รวมเจ้าหญิงทุกคนไว้ด้วยกัน ข้างในปราสาทเดินเข้าไปได้จริง",
          characters: ["snow-white", "peter-pan", "winnie-the-pooh", "alice", "cinderella", "elsa", "anna"],
          tip:
            "โซนนี้เครื่องเล่นเยอะที่สุดในสวน เล่นครบยากในวันเดียว ถ้าเวลาจำกัดให้เลือก Seven Dwarfs Mine Train กับ Voyage to the Crystal Grotto เป็นหลัก",
          rides: [
            {
              id: "d2-mine-train",
              name: "Seven Dwarfs Mine Train",
              nameZh: "七个小矮人矿山车",
              image: "",
              kind: "รถไฟเหาะ ระดับเบา-กลาง",
              kindEn: "Roller coaster",
              description:
                "รถรางเหมืองแร่ของคนแคระทั้งเจ็ด วิ่งสลับระหว่างกลางแจ้งกับในเหมืองที่มีฉากคนแคระร้องเพลงทำงาน",
              howItWorks:
                "ตัวรถแกว่งซ้าย-ขวาได้อิสระตามโค้ง ไม่มีหัวตีลังกาและไม่มีช่วงดิ่ง เหมาะเป็นรถไฟเหาะคันแรกสำหรับคนไม่ชอบแรงมาก",
              duration: "~3 นาที",
              intensity: "กลาง"
            },
            {
              id: "d2-peter-pan",
              name: "Peter Pan's Flight",
              nameZh: "小飞侠天空奇遇",
              image: "",
              kind: "นั่งชมฉากในอาคาร",
              kindEn: "Dark ride",
              description:
                "นั่งเรือเหาะลอยเหนือกรุงลอนดอนยามค่ำและเกาะเนเวอร์แลนด์",
              howItWorks:
                "เรือแขวนจากรางด้านบน ลอยผ่านฉากจำลองช้าๆ ไม่มีตกหรือหมุน เด็กเล็กนั่งได้",
              duration: "~3 นาที",
              intensity: "เบา"
            },
            {
              id: "d2-crystal-grotto",
              name: "Voyage to the Crystal Grotto",
              nameZh: "晶彩奇航",
              image: "",
              kind: "นั่งเรือชมฉากกลางแจ้ง",
              kindEn: "Boat ride",
              description:
                "ล่องเรือรอบปราสาทผ่านฉากจากหลายเรื่อง (อะลาดิน เงือกน้อย มู่หลาน) แล้วลอดเข้าถ้ำคริสตัลใต้ปราสาท",
              howItWorks:
                "นั่งเรือเปิดโล่ง มีน้ำพุพุ่งข้ามหัวเป็นจังหวะ เปียกเล็กน้อย ไม่มีข้อจำกัดใดๆ",
              duration: "~6 นาที",
              intensity: "เบา"
            },
            {
              id: "d2-pooh",
              name: "The Many Adventures of Winnie the Pooh",
              nameZh: "小熊维尼历险记",
              image: "",
              kind: "นั่งชมฉากในอาคาร",
              kindEn: "Dark ride",
              description:
                "นั่งกระถางน้ำผึ้งผ่านเรื่องราวคืนพายุในป่าร้อยเอเคอร์",
              howItWorks:
                "รถวิ่งบนรางในอาคาร มีช่วงหมุนเบาๆ ตอนฉากฝัน เหมาะกับเด็กมาก",
              duration: "~4 นาที",
              intensity: "เบา"
            },
            {
              id: "d2-hunny-pot",
              name: "Hunny Pot Spin",
              nameZh: "旋转疯蜜罐",
              image: "",
              kind: "ถ้วยหมุน หมุนเองได้",
              kindEn: "Spinner",
              description:
                "ถ้วยหมุนเวอร์ชันกระถางน้ำผึ้งของวินนี่",
              howItWorks:
                "มีพวงมาลัยกลางกระถาง ยิ่งหมุนเองยิ่งเวียนหัว จะปล่อยให้หมุนเองเฉยๆ ก็ได้",
              duration: "~1.5 นาที",
              intensity: "กลาง"
            },
            {
              id: "d2-alice-maze",
              name: "Alice in Wonderland Maze",
              nameZh: "爱丽丝梦游仙境迷宫",
              image: "",
              kind: "เดินชมเอง ไม่ใช่เครื่องเล่น",
              kindEn: "Walk-through",
              description:
                "เขาวงกตพุ่มไม้ธีมอลิซฉบับหนังคนแสดง มีราชินีโพแดงรออยู่ปลายทาง",
              howItWorks:
                "เดินเองตามทาง ไม่มีคิวจริงจัง ใช้เวลา 15–20 นาที กลางแจ้งทั้งหมด แดดแรงตอนบ่าย",
              intensity: "เบา"
            },
            {
              id: "d2-once-upon-a-time",
              name: "“Once Upon a Time” Adventure",
              nameZh: "漫游童话时光",
              image: "",
              kind: "เดินชมเอง ไม่ใช่เครื่องเล่น",
              kindEn: "Walk-through",
              description:
                "เดินเข้าไปข้างในปราสาท ชมเรื่องสโนว์ไวท์ผ่านฉากและภาพฉายบนผนัง มีเฉพาะที่เซี่ยงไฮ้",
              howItWorks:
                "เดินตามทางเดินในปราสาทเป็นรอบๆ ไม่มีที่นั่ง ใช้เวลาราว 10 นาที",
              intensity: "เบา"
            }
          ]
        }
      },
      {
        id: "d2-toy-story-land",
        type: "park",
        title: "Disney·Pixar Toy Story Land",
        titleZh: "迪士尼·皮克斯玩具总动员",
        thumbnail: "",
        icon: "park",
        park: {
          story:
            "ย่อส่วนให้เรารู้สึกตัวเล็กเท่าทหารพลาสติกในสวนหลังบ้านของแอนดี้ ทุกอย่างรอบตัวถูกขยายใหญ่ ทั้งไม้บล็อก ลูกเต๋า และกล่องของเล่น",
          characters: ["woody", "buzz", "jessie", "rex", "slinky"],
          tip:
            "โซนนี้เครื่องเล่นสั้นและคิวเดินเร็ว เหมาะแทรกช่วงบ่ายที่โซนอื่นคนแน่น",
          rides: [
            {
              id: "d2-rex-racer",
              name: "Rex's Racer",
              nameZh: "抱抱龙冲天赛车",
              image: "",
              kind: "รถวิ่งกลับไปกลับมา แรงกว่าที่เห็น",
              kindEn: "Shuttle ride",
              description:
                "รถแข่งของเร็กซ์วิ่งกลับไปกลับมาบนรางรูปตัว U จนเกือบตั้งฉากกับพื้น",
              howItWorks:
                "รถวิ่งขึ้นไปสุดปลายรางทั้งสองข้างสลับกัน มีช่วงตัวลอยตอนถึงยอด แรงกว่าหน้าตาที่เห็นมาก",
              duration: "~1.5 นาที",
              intensity: "แรง"
            },
            {
              id: "d2-slinky",
              name: "Slinky Dog Spin",
              nameZh: "弹簧狗团团转",
              image: "",
              kind: "เครื่องเล่นเบา เด็กเล่นได้",
              kindEn: "Family ride",
              description:
                "นั่งบนตัวสลิงกี้ที่ขดตัวหมุนวนรอบกองไม้บล็อก",
              howItWorks:
                "หมุนขึ้น-ลงเบาๆ ไม่มีเหวี่ยง เหมาะกับเด็กเล็กและคนที่ไม่เอาแรง",
              duration: "~2 นาที",
              intensity: "เบา"
            },
            {
              id: "d2-woody-roundup",
              name: "Woody's Round-Up",
              nameZh: "胡迪牛仔嘉年华",
              image: "",
              kind: "เครื่องเล่นหมุนเหวี่ยง",
              kindEn: "Family ride",
              description:
                "รถลากคาวบอยหมุนวนเป็นวงพร้อมเพลงประจำโซน",
              howItWorks:
                "หมุนเร็วปานกลางและเหวี่ยงออกด้านข้าง ถือกระเป๋าและแว่นให้แน่นหน่อย",
              duration: "~2 นาที",
              intensity: "กลาง"
            }
          ]
        }
      },
      {
        id: "d2-gardens-of-imagination",
        type: "park",
        title: "Gardens of Imagination",
        titleZh: "奇想花园",
        thumbnail: "",
        icon: "park",
        park: {
          story:
            "สวนวงกลมรอบปราสาทกลางสวนสนุก เป็นโซนที่เซี่ยงไฮ้มีที่เดียวในโลก แนวคิดคือสวนจีนผสมกับจินตนาการของดิสนีย์ ใช้เป็นทางผ่านไปโซนอื่นและเป็นจุดดูขบวนพาเหรดที่ดีที่สุด",
          characters: ["mickey", "dumbo"],
          tip:
            "“Garden of the Twelve Friends” เอาสัตว์ 12 ราศีจีนมาจับคู่กับตัวละครดิสนีย์/พิกซาร์ เช่น ปีชวด = มิกกี้ ปีขาล = ทิกเกอร์ เป็นมุมถ่ายรูปที่คนไทยชอบ",
          rides: [
            {
              id: "d2-carousel",
              name: "Fantasia Carousel",
              nameZh: "幻想曲旋转木马",
              image: "",
              kind: "เครื่องเล่นเบา เด็กเล่นได้",
              kindEn: "Family ride",
              description:
                "ม้าหมุนขนาดใหญ่กลางสวน ธีมจากการ์ตูนเรื่อง Fantasia",
              howItWorks:
                "เลือกม้าหรือรถม้าสำหรับคนนั่งรถเข็นได้ หมุนรอบเดียวประมาณ 2 นาที เด็กเล็กนั่งได้",
              duration: "~2 นาที",
              intensity: "เบา"
            },
            {
              id: "d2-dumbo",
              name: "Dumbo the Flying Elephant",
              nameZh: "小飞象",
              image: "",
              kind: "เครื่องเล่นหมุน ปรับสูงต่ำเองได้",
              kindEn: "Spinner",
              description:
                "นั่งดัมโบ้บินวนเป็นวงกลม เครื่องเล่นคลาสสิกที่มีในทุกสวนดิสนีย์",
              howItWorks:
                "มีคันโยกในตัวเครื่องให้กดขึ้น-ลงเองระหว่างหมุน เด็กต้องมีผู้ใหญ่นั่งด้วย",
              duration: "~2 นาที",
              intensity: "เบา"
            },
            {
              id: "d2-twelve-friends",
              name: "Garden of the Twelve Friends",
              nameZh: "十二朋友园",
              image: "",
              kind: "เดินชมเอง ไม่ใช่เครื่องเล่น",
              kindEn: "Walk-through",
              description:
                "สวนโมเสกที่จับคู่ 12 นักษัตรจีนกับตัวละครดิสนีย์และพิกซาร์",
              howItWorks:
                "เดินชมได้ตลอดเวลา ไม่ต้องต่อคิว หาปีเกิดตัวเองแล้วถ่ายรูปคู่",
              intensity: "เบา"
            }
          ]
        }
      },
      {
        id: "d2-mickey-avenue",
        type: "park",
        title: "Mickey Avenue",
        titleZh: "米奇大街",
        thumbnail: "",
        icon: "shopping",
        park: {
          story:
            "ถนนสายแรกหลังผ่านประตูสวนสนุก เป็นเมืองเล็กๆ ที่มิกกี้กับผองเพื่อนอาศัยอยู่ หน้าร้านแต่ละหลังออกแบบตามบุคลิกของตัวละครแต่ละตัว ไม่มีเครื่องเล่น แต่เป็นจุดเจอตัวละครและร้านของที่ระลึกใหญ่ที่สุดในสวน",
          characters: ["mickey", "minnie", "donald", "daisy", "goofy", "pluto"],
          tip:
            "ขาเข้าคนแน่นมากเพราะทุกคนหยุดถ่ายรูป แนะนำให้เดินผ่านไปเล่นเครื่องเล่นฮิตก่อนตอนเช้า แล้วค่อยย้อนมาช้อปตอนเย็น (ร้านยังเปิดต่ออีกพักหลังสวนปิด)",
          rides: [
            {
              id: "d2-meet-mickey",
              name: "Meet Mickey & Friends",
              nameZh: "与米奇和朋友们见面",
              image: "",
              kind: "ถ่ายรูปกับตัวละคร",
              kindEn: "Meet & greet",
              description:
                "จุดถ่ายรูปกับตัวละครหลัก กระจายอยู่ตามหน้าร้านต่างๆ บนถนนสายนี้",
              howItWorks:
                "ต่อคิวหน้าจุดที่มีป้ายตัวละคร เจ้าหน้าที่ช่วยถ่ายรูปให้ด้วยกล้องของเราได้ คิวละ 15–40 นาที",
              intensity: "เบา"
            },
            {
              id: "d2-avenue-shops",
              name: "Avenue M Arcade & shops",
              nameZh: "米奇大街商店",
              image: "",
              kind: "ช้อปปิ้ง",
              kindEn: "Shopping",
              description:
                "แถวร้านของที่ระลึกยาวตลอดสองฝั่ง ตั้งแต่หูมิกกี้ ตุ๊กตา ไปจนถึงขนมกล่องสวยไว้ฝากคนที่บ้าน",
              howItWorks:
                "จ่ายด้วย Alipay หรือ WeChat Pay สะดวกที่สุด บัตรต่างประเทศบางใบใช้ได้แต่ช้ากว่า",
              intensity: "เบา"
            }
          ]
        }
      },
      {
        id: "d2-shows",
        type: "park",
        title: "Parade & Nighttime Show",
        titleZh: "巡游与夜光幻影秀",
        thumbnail: "",
        icon: "ticket",
        park: {
          story:
            "อยู่ท้ายสุดเพราะผูกกับเวลาไม่ใช่ความฮิต ขบวนพาเหรดเป็นรอบบ่าย ส่วนโชว์ปิดสวนเป็นรอบกลางคืน ทั้งสองอย่างคนส่วนใหญ่บอกว่าคุ้มที่สุดของวัน จองที่นั่งด้วยการไปนั่งรอเท่านั้น ไม่มีบัตรจอง",
          characters: ["mickey"],
          tip:
            "รอบเวลาเปลี่ยนตามฤดูกาลและสภาพอากาศ เช็คในแอป Shanghai Disney Resort เช้าวันนั้นอีกครั้ง แล้ววางแผนเครื่องเล่นรอบๆ เวลาโชว์",
          rides: [
            {
              id: "d2-parade",
              name: "Mickey's Storybook Express",
              nameZh: "米奇童话专列",
              image: "",
              kind: "ขบวนพาเหรดกลางวัน",
              kindEn: "Parade",
              description:
                "ขบวนพาเหรดกลางวัน รถแต่ละคันเป็นตู้รถไฟของแต่ละเรื่อง",
              howItWorks:
                "เดินผ่านหลายโซน จุดที่ดีที่สุดคือ Gardens of Imagination ควรไปนั่งจองที่ริมทางล่วงหน้า 30–45 นาที",
              duration: "~20 นาที",
              intensity: "เบา"
            },
            {
              id: "d2-ignite-the-dream",
              name: "Ignite the Dream",
              nameZh: "点亮奇梦：夜光幻影秀",
              image: "",
              kind: "โชว์ปิดสวน ภาพฉายบนปราสาท",
              kindEn: "Night show",
              description:
                "โชว์ปิดสวน ยิงภาพลงบนปราสาททั้งหลังพร้อมเลเซอร์ น้ำพุ และพลุ เป็นไฮไลต์ของทั้งวัน",
              howItWorks:
                "ยืนดูได้ทั่วลานหน้าปราสาท ยิ่งใกล้กลางลานยิ่งเห็นเต็มตา ไปยืนรอราว 30 นาทีก่อนเริ่ม",
              duration: "~15 นาที",
              intensity: "เบา"
            }
          ]
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
