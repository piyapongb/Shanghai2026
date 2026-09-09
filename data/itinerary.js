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
            "ผ่าน ตม. รับกระเป๋าแล้วนั่ง Metro สาย 2 จากสนามบินผู่ตงเข้าเมือง (เปลี่ยนขบวนที่สถานี Guanglan Road) ลงที่ People's Square แล้วต่อสาย 1 อีกสถานีเดียวถึง Xinzha Road ออกทางออก 6 เดินอีก 170 เมตรถึงโรงแรม รวมราว 1 ชม. ครึ่ง",
          location: "Lechao Hotel, 333 Huanghe Road, Huangpu District",
          metroStation: "Xinzha Road",
          metroExit: "6"
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
            "ทางเดินเลียบแม่น้ำหวงผู่ ฝั่งหนึ่งเป็นตึกยุโรปเก่า อีกฝั่งเป็นตึกระฟ้าผู่ตง จุดถ่ายรูปหลักของเซี่ยงไฮ้ ไฟเปิดครบตั้งแต่ราวหกโมงเย็น จากโรงแรมนั่งสาย 1 ไป People's Square ต่อสาย 2 อีกสถานีเดียวถึง East Nanjing Road หรือเดินเล่นไปตามถนนหนานจิงราว 2.5 กม. ก็ได้",
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
            "ถนนคนเดินสายช้อปปิ้งหลัก ป้ายไฟนีออนเต็มสองข้างทาง เดินจากเดอะบันด์มาทางตะวันตกจนสุดถนนที่ People's Square แล้วขึ้นเหนืออีกราว 700 เมตรถึงโรงแรม",
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
    briefing: {
      title: "Shanghai Disneyland Guide",
      points: [
        {
          label: "ตั๋ว",
          text: "ซื้อล่วงหน้าในแอป Shanghai Disney Resort หรือตัวแทน (Trip.com/Klook) ตั๋วผูกกับพาสปอร์ตรายคน วันเข้าสวนต้องพกพาสปอร์ตเล่มจริงไปสแกนที่ประตู"
        },
        {
          label: "แอปที่ต้องมี",
          text: "โหลด Shanghai Disney Resort ก่อนไป ใช้ดูเวลารอแบบเรียลไทม์ รอบโชว์ แผนที่ สั่งอาหาร และบัตรคิวเข้าโซน — สวนนี้แทบทุกอย่างอยู่ในแอป"
        },
        {
          label: "ไปถึงกี่โมง",
          text: "ถึงหน้าประตูก่อนเวลาเปิด 45–60 นาที เพราะต้องผ่านตรวจกระเป๋าและสแกนพาสปอร์ต แล้วตรงไปเครื่องเล่นที่อยากเล่นที่สุดทันที ชั่วโมงแรกคิวสั้นที่สุดของวัน"
        },
        {
          label: "จ่ายเงิน",
          text: "Alipay หรือ WeChat Pay ผูกบัตรต่างประเทศได้และสะดวกที่สุด ร้านส่วนใหญ่รับบัตรต่างประเทศแต่ช้ากว่า พกเงินสดหยวนไว้บ้างเผื่อร้านเล็ก"
        },
        {
          label: "อาหารและน้ำ",
          text: "เอาขนมและน้ำเปล่าเข้าไปได้ มีจุดเติมน้ำในสวน ห้ามของที่ต้องอุ่น กลิ่นแรง แอลกอฮอล์ และภาชนะกระป๋อง/ขวดแก้ว"
        },
        {
          label: "กระเป๋าและสภาพอากาศ",
          text: "กระเป๋าห้ามใหญ่เกิน 56×36×23 ซม. มีล็อกเกอร์เช่าใกล้ทางเข้า ต้นเดือน พ.ย. กลางวัน ~20°C แต่กลางคืนเหลือ ~14°C ให้พกเสื้อกันหนาวบางๆ ไว้ดูโชว์ตอนค่ำ"
        }
      ],
      dialogs: [
        {
          id: "d2-glossary",
          label: "ศัพท์เครื่องเล่นในการ์ด",
          icon: "search",
          title: "ศัพท์เครื่องเล่นที่จะเจอในการ์ดด้านล่าง",
          intro:
            "การ์ดเครื่องเล่นเขียนประเภทเป็นภาษาอังกฤษ (คำเดียวกับที่ขึ้นในแอปของสวนและในรีวิว) ตารางนี้แปลไว้ให้ครบ",
          glossary: [
            { term: "Dark ride", meaning: "นั่งรถชมฉากในอาคาร แสงสลัว ไม่มีตกหรือเหวี่ยง" },
            { term: "Trackless dark ride", meaning: "แบบเดียวกันแต่รถไม่มีราง วิ่งอิสระและหมุนหันตามฉาก" },
            { term: "Boat ride", meaning: "นั่งเรือชมฉาก ส่วนใหญ่กลางแจ้ง" },
            { term: "Boat dark ride", meaning: "นั่งเรือชมฉากในอาคาร" },
            { term: "Roller coaster", meaning: "รถไฟเหาะ" },
            { term: "Launch coaster", meaning: "รถไฟเหาะที่ดีดออกตัวเร็วตั้งแต่ต้น ไม่ค่อยๆ ไต่ขึ้น" },
            { term: "Shuttle ride", meaning: "รถวิ่งกลับไปกลับมาบนรางสั้น ไม่วิ่งครบวง" },
            { term: "Water ride", meaning: "เครื่องเล่นทางน้ำ เปียกแน่นอน" },
            { term: "Flying theater", meaning: "โรงหนังจอโค้ง ยกแถวที่นั่งลอยขึ้นกลางจอ ขาห้อย" },
            { term: "Spinner", meaning: "เครื่องเล่นหมุนรอบแกน มักปรับสูง-ต่ำเองได้" },
            { term: "Family ride", meaning: "เครื่องเล่นเบา เด็กเล็กเล่นได้" },
            { term: "Interactive dark ride", meaning: "นั่งรถชมฉาก + มีปืนให้ยิงเป้าเก็บแต้ม" },
            { term: "Interactive ride", meaning: "ต้องลงแรงเองระหว่างเล่น เช่น พายเรือ" },
            { term: "Walk-through", meaning: "เดินชมเอง ไม่ต้องขึ้นเครื่องเล่น มักไม่มีคิว" },
            { term: "Exhibit & meet", meaning: "นิทรรศการเดินชม มีจุดถ่ายรูปกับตัวละคร" },
            { term: "Climbing course", meaning: "เส้นทางปีนป่าย ใส่สายรัดนิรภัยเดินไต่เอง" },
            { term: "Meet & greet", meaning: "จุดต่อคิวถ่ายรูปกับตัวละคร" },
            { term: "Play area", meaning: "ลานให้เด็กวิ่งเล่น เข้าออกได้อิสระ" },
            { term: "Shopping", meaning: "ร้านของที่ระลึก ไม่ใช่เครื่องเล่น" },
            { term: "Parade", meaning: "ขบวนพาเหรดเคลื่อนผ่านหลายโซน ดูริมทาง" },
            { term: "Castle stage show", meaning: "โชว์บนเวทีหน้าปราสาท ยืนดูกลางแจ้ง" },
            { term: "Night show", meaning: "โชว์ปิดสวนตอนกลางคืน ภาพฉายบนปราสาท + พลุ" },
            { term: "Stunt show", meaning: "โชว์ผาดโผน มีไฟและฉากบู๊ ในโรงละคร" },
            { term: "Acrobatic show", meaning: "โชว์กายกรรม โหนสลิงกลางอากาศ ในโรงละคร" },
            { term: "Interactive show", meaning: "โชว์ที่ตัวละครคุยโต้ตอบกับคนดูสดๆ" }
          ]
        },
        {
          id: "d2-prohibited",
          label: "ของต้องห้าม ห้ามเอาเข้าสวน",
          icon: "close",
          title: "ของที่ห้ามนำเข้า Shanghai Disneyland",
          intro:
            "ตรวจกระเป๋าทุกคนที่ประตู ถ้ามีของต้องห้ามจะต้องเอาไปฝากล็อกเกอร์หรือทิ้ง เสียเวลาตรงนี้บ่อยที่สุด",
          groups: [
            {
              label: "อาวุธและของอันตราย",
              items: [
                "มีดทุกชนิด และของที่มีลักษณะเป็นอาวุธ",
                "ปืนของเล่นและปืนฉีดน้ำ รวมถึงของที่ดูเหมือนอาวุธ",
                "ประทัด ดอกไม้ไฟ และของไวไฟทุกชนิด"
              ]
            },
            {
              label: "อุปกรณ์ถ่ายรูป",
              items: [
                "ไม้เซลฟี ขาตั้งกล้อง gimbal และไม้กันสั่น",
                "แฟลชแยกสำหรับกล้อง (สวนนี้ห้าม ต่างจากดิสนีย์ที่อื่น)",
                "โดรนทุกชนิด"
              ]
            },
            {
              label: "อาหารและเครื่องดื่ม",
              items: [
                "ของที่ต้องอุ่นหรือเติมน้ำร้อน เช่น บะหมี่ถ้วย",
                "ของกลิ่นแรง เช่น ทุเรียน",
                "เครื่องดื่มแอลกอฮอล์",
                "กระป๋องและขวดแก้ว (ขวดน้ำพลาสติกเอาเข้าได้)"
              ]
            },
            {
              label: "กระเป๋าและพาหนะ",
              items: [
                "กระเป๋าใหญ่เกิน 56 × 36 × 23 ซม. รวมกระเป๋าเดินทางล้อลาก",
                "สเก็ต สกู๊ตเตอร์ สเก็ตบอร์ด",
                "เก้าอี้พับและร่มขนาดใหญ่แบบปักพื้น"
              ]
            },
            {
              label: "อื่นๆ",
              items: [
                "สัตว์เลี้ยง ยกเว้นสุนัขนำทางที่มีใบรับรอง",
                "ของที่ตั้งใจเอาไปขายในสวน"
              ]
            }
          ],
          note:
            "รายการนี้อ้างอิงกฎที่ประกาศไว้ ณ ปี 2026 กฎเปลี่ยนได้ — เช็คหน้า Rules ของ shanghaidisneyresort.com อีกครั้งก่อนเดินทาง"
        }
      ]
    },
    items: [
      {
        id: "d2-tomorrowland",
        type: "park",
        title: "Tomorrowland",
        titleZh: "明日世界",
        thumbnail: "assets/images/activities/d2-tomorrowland.webp",
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
              image: "assets/images/rides/d2-tron.jpg",
              kind: "Launch coaster",
              description:
                "รถไฟเหาะที่เร็วที่สุดในสวน พุ่งออกจากสถานีเข้าไปในอุโมงค์แสงนีออน ใช้เวลาสั้นแต่ตื่นเต้นที่สุดในวัน",
              howItWorks:
                "นั่งคร่อมเหมือนมอเตอร์ไซค์ ก้มตัวไปข้างหน้า มีที่ล็อกกดลงมาด้านหลัง ไม่มีการกลับหัว แต่แรงเหวี่ยงช่วงออกตัวสูงมาก",
              warning:
                "ห้ามถือของขึ้นเครื่อง มีล็อกเกอร์ฟรีหน้าทางเข้า ท่านั่งคร่อมโน้มตัวไปข้างหน้า คนปวดหลัง-คอ ตั้งครรภ์ หรือมีโรคหัวใจ/ความดัน ไม่ควรเล่น และอย่าเล่นตอนเพิ่งกินอิ่ม",
              duration: "~2 นาที",
              wait: "90–150 นาที",
              intensity: "แรง"
            },
            {
              id: "d2-buzz",
              name: "Buzz Lightyear Planet Rescue",
              nameZh: "巴斯光年星际营救",
              image: "assets/images/rides/d2-buzz.jpg",
              kind: "Interactive dark ride",
              description:
                "ยิงเป้าช่วยบัซซ์สู้กับจักรพรรดิเซิร์ก เก็บแต้มแข่งกับคนที่นั่งข้างๆ ได้",
              howItWorks:
                "แต่ละที่นั่งมีปืนเลเซอร์ถือได้อิสระ (ไม่ยึดติดกับตัวรถ) เล็งไปที่เป้ารูปตัว Z แล้วเหนี่ยวไก แต้มขึ้นบนจอตรงหน้า",
              warning:
                "ในอาคารมืดและมีแสงเลเซอร์กะพริบตลอด เด็กเล็กบางคนกลัวช่วงแรก",
              duration: "~5 นาที",
              wait: "15–30 นาที",
              intensity: "เบา"
            },
            {
              id: "d2-jet-packs",
              name: "Jet Packs",
              nameZh: "喷气背包飞行器",
              image: "assets/images/rides/d2-jet-packs.jpg",
              kind: "Spinner",
              description:
                "บินวนรอบเสากลางด้วยเจ็ตแพ็ก มองเห็นวิวโซนอนาคตได้ทั้งโซน",
              howItWorks:
                "มีคันบังคับให้ปรับสูง-ต่ำและเอียงเองได้ระหว่างหมุน หมุนเร็วปานกลาง",
              warning:
                "หมุนพร้อมเหวี่ยงออกด้านนอก คนเมาง่ายให้เลี่ยง ของในกระเป๋าเสื้อร่วงง่าย",
              duration: "~2 นาที",
              wait: "20–40 นาที",
              intensity: "กลาง"
            },
            {
              id: "d2-stitch",
              name: "Stitch Encounter",
              nameZh: "史迪奇宝宝",
              image: "assets/images/rides/d2-stitch.jpg",
              kind: "Interactive show",
              when: "รอบต่อเนื่องเกือบทั้งวัน",
              description:
                "สติชคุยกับคนดูสดๆ ผ่านจอ เลือกหยอกใครสักคนในห้องได้จริง",
              howItWorks:
                "นั่งในโรงเล็ก โชว์ดำเนินเป็นภาษาจีนกลางเป็นหลัก ฟังไม่ออกก็ยังดูสนุกจากภาพและปฏิกิริยาคนดู",
              duration: "~15 นาที",
              wait: "10–20 นาที",
              intensity: "เบา"
            },
            {
              id: "d2-star-wars",
              name: "Star Wars Launch Bay",
              nameZh: "星球大战远征基地",
              image: "assets/images/rides/d2-star-wars.jpg",
              kind: "Exhibit & meet",
              description:
                "นิทรรศการยานและชุดจากสตาร์วอร์ส พร้อมจุดถ่ายรูปกับตัวละคร",
              howItWorks:
                "เดินชมได้อิสระในอาคารแอร์เย็น ไม่ต้องต่อคิวเครื่องเล่น เป็นที่หลบร้อนช่วงบ่ายที่ดี",
              wait: "เดินเข้าได้เลย",
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
        thumbnail: "assets/images/activities/d2-adventure-isle.jpg",
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
              image: "assets/images/rides/d2-soaring.jpg",
              kind: "Flying theater",
              description:
                "โรงหนังจอโค้งครึ่งวงกลม พาบินข้ามแลนด์มาร์กทั่วโลก มีลมและกลิ่นจริงพ่นเข้ามาตามฉาก",
              howItWorks:
                "นั่งเก้าอี้เป็นแถว แล้วแถวเก้าอี้ถูกยกลอยขึ้นไปกลางจอ ขาห้อยอิสระ ไม่มีการเหวี่ยง คนกลัวความสูงส่วนใหญ่ยังเล่นได้",
              warning:
                "ที่นั่งลอยขึ้นกลางจอโค้ง ขาห้อย คนกลัวความสูงหรือเมาภาพอาจเวียนหัว หลับตาช่วงแรกได้ ห้ามถือของหลวมๆ เพราะจะร่วงใส่แถวล่าง",
              duration: "~5 นาที",
              wait: "70–120 นาที",
              intensity: "กลาง"
            },
            {
              id: "d2-roaring-rapids",
              name: "Roaring Rapids",
              nameZh: "雷鸣山漂流",
              image: "assets/images/rides/d2-roaring-rapids.jpg",
              kind: "Water ride",
              wet: "เปียกทั้งตัว",
              description:
                "ล่องแก่งด้วยแพกลม วนรอบภูเขา Roaring Mountain ที่มีสัตว์ประหลาดซ่อนอยู่",
              howItWorks:
                "แพกลมหมุนเองตามกระแสน้ำ ใครนั่งฝั่งไหนโดนน้ำไม่เท่ากัน ไม่มีช่วงดิ่งแรง",
              warning:
                "เปียกแน่นอนทั้งตัว มีเสื้อกันฝนขายหน้าทางเข้าราว ¥10 นั่งกลางแพเปียกน้อยกว่าริมแพ เก็บมือถือใส่ถุงกันน้ำหรือฝากล็อกเกอร์",
              duration: "~5 นาที",
              wait: "60–100 นาที",
              intensity: "กลาง–แรง"
            },
            {
              id: "d2-camp-discovery",
              name: "Camp Discovery – Challenge Trails",
              nameZh: "古迹探索营－探险家营地",
              image: "assets/images/rides/d2-camp-discovery.jpg",
              kind: "Climbing course",
              description:
                "เส้นทางปีนป่ายบนหน้าผาจำลอง มีให้เลือกหลายระดับความยาก",
              howItWorks:
                "ใส่สายรัดนิรภัยแล้วเดินไต่ไปตามเส้นทางเอง มีเชือกเกี่ยวตลอดทาง ต้องไปรับคิวหน้าโซนในวันนั้น",
              warning:
                "ต้องออกแรงปีนเอง ใส่รองเท้าผ้าใบและกางเกงที่เคลื่อนไหวสะดวก ของในกระเป๋าต้องเก็บให้มิดก่อนขึ้น",
              duration: "~20 นาที",
              wait: "ต้องรับคิวหน้าโซน",
              intensity: "กลาง (ออกแรงเยอะ)"
            },
            {
              id: "d2-tarzan-show",
              name: "Tarzan: Call of the Jungle",
              nameZh: "人猿泰山：丛林的呼唤",
              image: "assets/images/rides/d2-tarzan-show.jpg",
              kind: "Acrobatic show",
              when: "หลายรอบต่อวัน ช่วงสาย–บ่าย",
              description:
                "โชว์กายกรรมจีนเล่าเรื่องทาร์ซาน โหนสลิงกลางอากาศเหนือหัวคนดู",
              howItWorks:
                "โรงละครในร่ม มีรอบเวลาแน่นอน เช็ครอบในแอปแล้วเข้าไปนั่งก่อนสัก 15 นาที",
              duration: "~25 นาที",
              wait: "ไปก่อนรอบ 15–20 นาที",
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
        thumbnail: "assets/images/activities/d2-zootopia.jpg",
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
              image: "assets/images/rides/d2-zootopia-ride.jpg",
              kind: "Trackless dark ride",
              description:
                "ตามจูดี้กับนิคไล่ล่าคดีในเมืองสัตว์ ผ่านทุกย่านของเมืองรวมถึงย่านหนูจิ๋ว",
              howItWorks:
                "รถตำรวจวิ่งแบบไม่มีราง เคลื่อนที่อิสระและหมุนหันหน้าไปตามฉาก แต่ละรอบเส้นทางไม่เหมือนกันเป๊ะ ไม่มีช่วงตกหรือเหวี่ยงแรง",
              warning:
                "รถหมุนหันเปลี่ยนทิศเร็วในห้องมืดและเสียงดัง เด็กเล็กอาจตกใจช่วงฉากไล่ล่า",
              duration: "~5 นาที",
              wait: "90–150 นาที",
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
        thumbnail: "assets/images/activities/d2-treasure-cove.jpg",
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
              image: "assets/images/rides/d2-pirates.jpg",
              kind: "Boat dark ride",
              wet: "ละอองน้ำเล็กน้อย",
              description:
                "ล่องเรือลงไปใต้ทะเลตามหาสมบัติ ฉากรอบตัวเป็นจอยักษ์ผสมหุ่นเคลื่อนไหวจนแยกไม่ออกว่าอันไหนจริงอันไหนจอ",
              howItWorks:
                "เรือวิ่งด้วยระบบแม่เหล็กใต้น้ำ เดินหน้า-ถอยหลัง-หมุนด้านข้างได้ ไม่มีช่วงตกแรง เปียกน้อยมาก",
              warning:
                "ฉากมืดสลับเสียงดังและหุ่นขนาดใหญ่โผล่ใกล้ตัว เด็กเล็กบางคนกลัว เปียกแค่ละอองน้ำ",
              duration: "~6 นาที",
              wait: "40–70 นาที",
              intensity: "กลาง"
            },
            {
              id: "d2-canoes",
              name: "Explorer Canoes",
              nameZh: "探险家独木舟",
              image: "assets/images/rides/d2-canoes.jpg",
              kind: "Interactive ride",
              wet: "ละอองน้ำจากไม้พาย",
              description:
                "พายเรือแคนูจริงๆ รอบอ่าวโจรสลัด",
              howItWorks:
                "ทุกคนบนเรือต้องช่วยพายตามจังหวะที่เจ้าหน้าที่นับ เหนื่อยพอสมควร เปิดเฉพาะบางช่วงเวลาและงดถ้าฝนตก",
              warning:
                "ต้องช่วยกันพายจริง ไม่เหมาะถ้าปวดไหล่หรือแขน และงดให้บริการเมื่อฝนตกหรือลมแรง",
              duration: "~10 นาที",
              wait: "20–40 นาที",
              intensity: "กลาง (ต้องออกแรง)"
            },
            {
              id: "d2-jack-stunt",
              name: "Eye of the Storm: Captain Jack's Stunt Spectacular",
              nameZh: "风暴来临－杰克船长之惊天特技大冒险",
              image: "assets/images/rides/d2-jack-stunt.jpg",
              kind: "Stunt show",
              wet: "แถวหน้าอาจโดนละอองน้ำ",
              when: "หลายรอบต่อวัน ช่วงบ่าย",
              description:
                "โชว์ผาดโผนของกัปตันแจ็ค มีไฟ น้ำ และฉากบู๊บนเวที",
              howItWorks:
                "โรงละครในร่ม มีรอบเวลาแน่นอน เช็ครอบในแอปแล้วไปนั่งก่อนเริ่มสัก 15 นาที",
              warning:
                "มีเอฟเฟกต์ไฟและระเบิดเสียงดัง แถวหน้าโดนละอองน้ำ เด็กเล็กควรนั่งไกลเวทีหน่อย",
              duration: "~20 นาที",
              wait: "ไปก่อนรอบ 15–20 นาที",
              intensity: "เบา"
            },
            {
              id: "d2-shipwreck",
              name: "Shipwreck Shore",
              nameZh: "沉船海滩",
              image: "assets/images/rides/d2-shipwreck.jpg",
              kind: "Play area",
              wet: "เปียกแน่ ถ้าลงเล่น",
              description:
                "ลานน้ำพุซากเรือให้เด็กวิ่งเล่น มีปืนฉีดน้ำและวงล้อให้หมุน",
              howItWorks:
                "เข้าเล่นได้อิสระไม่ต้องต่อคิว เตรียมเสื้อสำรองถ้าปล่อยเด็กลงเล่นจริงจัง",
              warning:
                "เป็นลานน้ำสำหรับเด็ก เตรียมชุดเปลี่ยนหรือผ้าเช็ดตัวไปด้วย",
              wait: "เข้าเล่นได้เลย",
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
        thumbnail: "assets/images/activities/d2-fantasyland.jpg",
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
              image: "assets/images/rides/d2-mine-train.jpg",
              kind: "Roller coaster",
              description:
                "รถรางเหมืองแร่ของคนแคระทั้งเจ็ด วิ่งสลับระหว่างกลางแจ้งกับในเหมืองที่มีฉากคนแคระร้องเพลงทำงาน",
              howItWorks:
                "ตัวรถแกว่งซ้าย-ขวาได้อิสระตามโค้ง ไม่มีหัวตีลังกาและไม่มีช่วงดิ่ง เหมาะเป็นรถไฟเหาะคันแรกสำหรับคนไม่ชอบแรงมาก",
              warning:
                "ตัวรถแกว่งซ้าย-ขวาแรงกว่ารถไฟเหาะทั่วไป คนปวดหลังหรือคอควรเลี่ยง",
              duration: "~3 นาที",
              wait: "60–140 นาที",
              intensity: "กลาง"
            },
            {
              id: "d2-peter-pan",
              name: "Peter Pan's Flight",
              nameZh: "小飞侠天空奇遇",
              image: "",
              kind: "Dark ride",
              description:
                "นั่งเรือเหาะลอยเหนือกรุงลอนดอนยามค่ำและเกาะเนเวอร์แลนด์",
              howItWorks:
                "เรือแขวนจากรางด้านบน ลอยผ่านฉากจำลองช้าๆ ไม่มีตกหรือหมุน เด็กเล็กนั่งได้",
              duration: "~3 นาที",
              wait: "40–60 นาที",
              intensity: "เบา"
            },
            {
              id: "d2-crystal-grotto",
              name: "Voyage to the Crystal Grotto",
              nameZh: "晶彩奇航",
              image: "assets/images/rides/d2-crystal-grotto.jpg",
              kind: "Boat ride",
              wet: "ละอองน้ำจากน้ำพุ",
              description:
                "ล่องเรือรอบปราสาทผ่านฉากจากหลายเรื่อง (อะลาดิน เงือกน้อย มู่หลาน) แล้วลอดเข้าถ้ำคริสตัลใต้ปราสาท",
              howItWorks:
                "นั่งเรือเปิดโล่ง มีน้ำพุพุ่งข้ามหัวเป็นจังหวะ เปียกเล็กน้อย ไม่มีข้อจำกัดใดๆ",
              warning:
                "น้ำพุพุ่งข้ามหัวเรือเป็นจังหวะ นั่งริมอาจโดนละออง",
              duration: "~6 นาที",
              wait: "25–40 นาที",
              intensity: "เบา"
            },
            {
              id: "d2-pooh",
              name: "The Many Adventures of Winnie the Pooh",
              nameZh: "小熊维尼历险记",
              image: "assets/images/rides/d2-pooh.jpg",
              kind: "Dark ride",
              description:
                "นั่งกระถางน้ำผึ้งผ่านเรื่องราวคืนพายุในป่าร้อยเอเคอร์",
              howItWorks:
                "รถวิ่งบนรางในอาคาร มีช่วงหมุนเบาๆ ตอนฉากฝัน เหมาะกับเด็กมาก",
              duration: "~4 นาที",
              wait: "30–45 นาที",
              intensity: "เบา"
            },
            {
              id: "d2-hunny-pot",
              name: "Hunny Pot Spin",
              nameZh: "旋转疯蜜罐",
              image: "assets/images/rides/d2-hunny-pot.jpg",
              kind: "Spinner",
              description:
                "ถ้วยหมุนเวอร์ชันกระถางน้ำผึ้งของวินนี่",
              howItWorks:
                "มีพวงมาลัยกลางกระถาง ยิ่งหมุนเองยิ่งเวียนหัว จะปล่อยให้หมุนเองเฉยๆ ก็ได้",
              warning:
                "ยิ่งหมุนพวงมาลัยยิ่งแรง คนเมาง่ายให้ปล่อยหมุนเองอย่างเดียว",
              duration: "~1.5 นาที",
              wait: "15–30 นาที",
              intensity: "กลาง"
            },
            {
              id: "d2-alice-maze",
              name: "Alice in Wonderland Maze",
              nameZh: "爱丽丝梦游仙境迷宫",
              image: "assets/images/rides/d2-alice-maze.jpg",
              kind: "Walk-through",
              description:
                "เขาวงกตพุ่มไม้ธีมอลิซฉบับหนังคนแสดง มีราชินีโพแดงรออยู่ปลายทาง",
              howItWorks:
                "เดินเองตามทาง ไม่มีคิวจริงจัง ใช้เวลา 15–20 นาที กลางแจ้งทั้งหมด แดดแรงตอนบ่าย",
              warning:
                "กลางแจ้งทั้งหมด ไม่มีร่มเงา เลี่ยงช่วงเที่ยง-บ่ายที่แดดแรง",
              wait: "เดินเข้าได้เลย",
              intensity: "เบา"
            },
            {
              id: "d2-once-upon-a-time",
              name: "“Once Upon a Time” Adventure",
              nameZh: "漫游童话时光",
              image: "assets/images/rides/d2-once-upon-a-time.jpg",
              kind: "Walk-through",
              description:
                "เดินเข้าไปข้างในปราสาท ชมเรื่องสโนว์ไวท์ผ่านฉากและภาพฉายบนผนัง มีเฉพาะที่เซี่ยงไฮ้",
              howItWorks:
                "เดินตามทางเดินในปราสาทเป็นรอบๆ ไม่มีที่นั่ง ใช้เวลาราว 10 นาที",
              wait: "10–20 นาที",
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
        thumbnail: "assets/images/activities/d2-toy-story-land.jpg",
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
              image: "assets/images/rides/d2-rex-racer.jpg",
              kind: "Shuttle ride",
              description:
                "รถแข่งของเร็กซ์วิ่งกลับไปกลับมาบนรางรูปตัว U จนเกือบตั้งฉากกับพื้น",
              howItWorks:
                "รถวิ่งขึ้นไปสุดปลายรางทั้งสองข้างสลับกัน มีช่วงตัวลอยตอนถึงยอด แรงกว่าหน้าตาที่เห็นมาก",
              warning:
                "มีช่วงตัวลอยแรงกว่าที่หน้าตาเครื่องเล่นบอก คนปวดหลังหรือกลัวความสูงเลี่ยง ถือแว่นและหมวกให้แน่น",
              duration: "~1.5 นาที",
              wait: "40–60 นาที",
              intensity: "แรง"
            },
            {
              id: "d2-slinky",
              name: "Slinky Dog Spin",
              nameZh: "弹簧狗团团转",
              image: "assets/images/rides/d2-slinky.jpg",
              kind: "Family ride",
              description:
                "นั่งบนตัวสลิงกี้ที่ขดตัวหมุนวนรอบกองไม้บล็อก",
              howItWorks:
                "หมุนขึ้น-ลงเบาๆ ไม่มีเหวี่ยง เหมาะกับเด็กเล็กและคนที่ไม่เอาแรง",
              duration: "~2 นาที",
              wait: "30–45 นาที",
              intensity: "เบา"
            },
            {
              id: "d2-woody-roundup",
              name: "Woody's Round-Up",
              nameZh: "胡迪牛仔嘉年华",
              image: "assets/images/rides/d2-woody-roundup.jpg",
              kind: "Family ride",
              description:
                "รถลากคาวบอยหมุนวนเป็นวงพร้อมเพลงประจำโซน",
              howItWorks:
                "หมุนเร็วปานกลางและเหวี่ยงออกด้านข้าง ถือกระเป๋าและแว่นให้แน่นหน่อย",
              warning:
                "เหวี่ยงออกด้านข้างตลอดรอบ ของในกระเป๋ากางเกงหลุดง่าย",
              duration: "~2 นาที",
              wait: "20–35 นาที",
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
        thumbnail: "assets/images/activities/d2-gardens-of-imagination.png",
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
              image: "assets/images/rides/d2-carousel.jpg",
              kind: "Family ride",
              description:
                "ม้าหมุนขนาดใหญ่กลางสวน ธีมจากการ์ตูนเรื่อง Fantasia",
              howItWorks:
                "เลือกม้าหรือรถม้าสำหรับคนนั่งรถเข็นได้ หมุนรอบเดียวประมาณ 2 นาที เด็กเล็กนั่งได้",
              duration: "~2 นาที",
              wait: "10–20 นาที",
              intensity: "เบา"
            },
            {
              id: "d2-dumbo",
              name: "Dumbo the Flying Elephant",
              nameZh: "小飞象",
              image: "assets/images/rides/d2-dumbo.jpg",
              kind: "Spinner",
              description:
                "นั่งดัมโบ้บินวนเป็นวงกลม เครื่องเล่นคลาสสิกที่มีในทุกสวนดิสนีย์",
              howItWorks:
                "มีคันโยกในตัวเครื่องให้กดขึ้น-ลงเองระหว่างหมุน เด็กต้องมีผู้ใหญ่นั่งด้วย",
              warning:
                "แดดแรงตอนกลางวันเพราะเป็นคิวกลางแจ้ง ไปช่วงเช้าหรือหลังพระอาทิตย์ตกจะสบายกว่า",
              duration: "~2 นาที",
              wait: "20–35 นาที",
              intensity: "เบา"
            },
            {
              id: "d2-twelve-friends",
              name: "Garden of the Twelve Friends",
              nameZh: "十二朋友园",
              image: "assets/images/rides/d2-twelve-friends.jpg",
              kind: "Walk-through",
              description:
                "สวนโมเสกที่จับคู่ 12 นักษัตรจีนกับตัวละครดิสนีย์และพิกซาร์",
              howItWorks:
                "เดินชมได้ตลอดเวลา ไม่ต้องต่อคิว หาปีเกิดตัวเองแล้วถ่ายรูปคู่",
              wait: "เดินชมได้เลย",
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
        thumbnail: "assets/images/activities/d2-mickey-avenue.webp",
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
              image: "assets/images/rides/d2-meet-mickey.jpg",
              kind: "Meet & greet",
              description:
                "จุดถ่ายรูปกับตัวละครหลัก กระจายอยู่ตามหน้าร้านต่างๆ บนถนนสายนี้",
              howItWorks:
                "ต่อคิวหน้าจุดที่มีป้ายตัวละคร เจ้าหน้าที่ช่วยถ่ายรูปให้ด้วยกล้องของเราได้",
              warning:
                "คิวกลางแจ้งและยาว เตรียมร่มหรือหมวกถ้ามาช่วงบ่าย",
              wait: "20–45 นาที",
              intensity: "เบา"
            },
            {
              id: "d2-avenue-shops",
              name: "Avenue M Arcade & shops",
              nameZh: "米奇大街商店",
              image: "assets/images/rides/d2-avenue-shops.jpg",
              kind: "Shopping",
              description:
                "แถวร้านของที่ระลึกยาวตลอดสองฝั่ง ตั้งแต่หูมิกกี้ ตุ๊กตา ไปจนถึงขนมกล่องสวยไว้ฝากคนที่บ้าน",
              howItWorks:
                "จ่ายด้วย Alipay หรือ WeChat Pay สะดวกที่สุด บัตรต่างประเทศบางใบใช้ได้แต่ช้ากว่า",
              wait: "เข้าได้เลย",
              intensity: "เบา"
            }
          ]
        }
      },
      {
        id: "d2-shows",
        type: "park",
        title: "Shows & Parade — 6 รายการ",
        titleZh: "巡游与演出",
        thumbnail: "assets/images/activities/d2-shows.jpg",
        icon: "ticket",
        park: {
          tip:
            "ปี 2026 เป็นปีครบรอบ 10 ปีของสวน (“With You, It's Magic+” เริ่ม 20 มี.ค. 2026) พาเหรดและโชว์ปิดสวนมีฉากพิเศษเพิ่ม รอบเวลาด้านล่างเป็นค่าประมาณ ให้ยึดรอบจริงในแอป Shanghai Disney Resort ของวันนั้นเป็นหลัก",
          rides: [
            {
              id: "d2-parade",
              name: "Mickey's Storybook Express",
              nameZh: "米奇童话专列",
              image: "assets/images/rides/d2-parade.jpg",
              kind: "Parade",
              when: "ประมาณ 12:15 และ 15:15 (วันละ 2 รอบ)",
              description:
                "ขบวนพาเหรดกลางวัน รถแต่ละคันเป็นตู้รถไฟของแต่ละเรื่อง ปี 2026 เพิ่มขบวนธีม Zootopia และ Duffy & Friends พร้อมพรีพาเหรด “FriendSHIP!”",
              howItWorks:
                "เดินผ่านหลายโซน จุดที่ดีที่สุดคือ Gardens of Imagination ไปนั่งจองที่ริมทางล่วงหน้า 30–45 นาที",
              warning:
                "ต้องนั่งรอริมทางบนพื้นแข็ง เอาผ้าหรือถุงรองนั่งไปด้วย และห้ามกั้นพื้นที่ทิ้งไว้ก่อนเวลา",
              duration: "~20 นาที",
              wait: "ไปจองที่ 30–45 นาที",
              intensity: "เบา"
            },
            {
              id: "d2-heart-of-magic",
              name: "The Heart of Magic",
              nameZh: "心之魔法",
              image: "assets/images/rides/d2-heart-of-magic.jpg",
              kind: "Castle stage show",
              when: "หลายรอบต่อวัน ช่วงสาย–บ่าย",
              description:
                "โชว์เวทีหน้าปราสาท เปิดตัว 20 มี.ค. 2026 ฉลองครบรอบ 10 ปี เล่าเป็น 4 องก์ มีตัวละครจาก 9 เรื่อง ทั้ง Cinderella, Frozen, Mulan, Hercules, Coco และ Turning Red",
              howItWorks:
                "ยืนดูที่ลานหน้าปราสาท ไม่ต้องจองบัตร ไปยืนก่อนรอบ 20–30 นาทีถ้าอยากได้มุมกลาง",
              duration: "~20 นาที",
              wait: "ไปยืนก่อน 20–30 นาที",
              intensity: "เบา"
            },
            {
              id: "d2-illuminate",
              name: "ILLUMINATE! A Nighttime Celebration",
              nameZh: "点亮奇梦：夜光幻影秀",
              image: "assets/images/rides/d2-illuminate.jpg",
              kind: "Night show",
              when: "รอบเดียว ก่อนสวนปิด (ราว 20:00–21:00)",
              description:
                "โชว์ปิดสวน ยิงภาพลงบนปราสาททั้งหลังพร้อมเลเซอร์ น้ำพุ และพลุ ปี 2026 เพิ่มช่วงจบพิเศษฉลอง 10 ปี เป็นไฮไลต์ของทั้งวัน",
              howItWorks:
                "ยืนดูได้ทั่วลานหน้าปราสาท ยิ่งใกล้กลางลานยิ่งเห็นเต็มตา ไปยืนรอราว 30 นาทีก่อนเริ่ม",
              warning:
                "มีพลุและเสียงดัง เด็กเล็กอาจตกใจ พอจบคนออกพร้อมกันทั้งสวน เผื่อเวลาออกจากสวนอีก 30–45 นาที",
              duration: "~15 นาที",
              wait: "ไปยืนก่อน 30 นาที",
              intensity: "เบา"
            },
            {
              id: "d2-show-jack",
              name: "Eye of the Storm: Captain Jack's Stunt Spectacular",
              nameZh: "风暴来临－杰克船长之惊天特技大冒险",
              image: "assets/images/rides/d2-show-jack.jpg",
              kind: "Stunt show",
              when: "หลายรอบต่อวัน ช่วงบ่าย",
              description:
                "โชว์ผาดโผนในโรงละครที่ Treasure Cove (รายละเอียดเต็มอยู่ในโซน Treasure Cove ด้านบน)",
              howItWorks:
                "โรงในร่ม มีที่นั่ง เช็ครอบในแอปแล้วไปก่อนเริ่ม 15 นาที",
              duration: "~20 นาที",
              wait: "ไปก่อนรอบ 15 นาที",
              intensity: "เบา"
            },
            {
              id: "d2-show-tarzan",
              name: "Tarzan: Call of the Jungle",
              nameZh: "人猿泰山：丛林的呼唤",
              image: "assets/images/rides/d2-show-tarzan.jpg",
              kind: "Acrobatic show",
              when: "หลายรอบต่อวัน ช่วงสาย–บ่าย",
              description:
                "โชว์กายกรรมจีนที่ Adventure Isle (รายละเอียดเต็มอยู่ในโซน Adventure Isle ด้านบน)",
              howItWorks:
                "โรงในร่ม มีที่นั่ง เช็ครอบในแอปแล้วไปก่อนเริ่ม 15 นาที",
              duration: "~25 นาที",
              wait: "ไปก่อนรอบ 15 นาที",
              intensity: "เบา"
            },
            {
              id: "d2-show-stitch",
              name: "Stitch Encounter",
              nameZh: "史迪奇宝宝",
              image: "assets/images/rides/d2-show-stitch.jpg",
              kind: "Interactive show",
              when: "รอบต่อเนื่องเกือบทั้งวัน",
              description:
                "โชว์คุยโต้ตอบกับสติชที่ Tomorrowland (รายละเอียดเต็มอยู่ในโซน Tomorrowland ด้านบน)",
              howItWorks:
                "โรงเล็กในร่ม เดินเข้าได้เกือบทุกรอบ ใช้เป็นที่พักขาช่วงบ่ายได้ดี",
              duration: "~15 นาที",
              wait: "เดินเข้าได้เกือบทุกรอบ",
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
          location: "Lechao Hotel, 333 Huanghe Road, Huangpu District"
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
            "รับกระเป๋าที่โรงแรมแล้วออกไปสนามบิน เผื่อเวลา 3 ชม. ก่อนบิน ตั้งต้นที่ Xinzha Road นั่งสาย 1 หนึ่งสถานีไป People's Square แล้วเลือกได้ระหว่าง Metro สาย 2 ตรงไปสนามบิน (ถูกกว่า ~1 ชม.) หรือสาย 2 ไปลงหลงหยางลู่แล้วต่อ Maglev (8 นาที)",
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
