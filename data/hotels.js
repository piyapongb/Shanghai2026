/**
 * Hotel Master Data
 * Fields: id, stayFrom, stayTo, name, nameZh, address, checkIn, checkOut, image
 *
 * checkIn / checkOut are the hotel's stated policy times, not what the
 * itinerary shows for an actual arrival — a 02:30 check-in after a red-eye
 * can sit alongside a 14:00 policy time without either being wrong.
 *
 * MOCK DATA: placeholder Shanghai hotels, nothing is booked. `image` is
 * empty until a photo is added with
 *   node tools/add-image.js <local-file> hotel-00N
 */
window.HOTELS_DATA = [
  {
    id: "hotel-001",
    stayFrom: "2026-11-12",
    stayTo: "2026-11-13",
    name: "Jinjiang Inn (Shanghai Pudong Airport)",
    nameZh: "锦江之星(上海浦东机场店)",
    image: "",
    address: "Near Shanghai Pudong International Airport, Pudong New Area, Shanghai (free airport shuttle)",
    checkIn: "14:00",
    checkOut: "12:00"
  },
  {
    id: "hotel-002",
    stayFrom: "2026-11-13",
    stayTo: "2026-11-16",
    name: "Hanting Hotel (Shanghai Nanjing East Road)",
    nameZh: "汉庭酒店(上海南京东路店)",
    image: "",
    address: "Near Nanjing East Road Metro Station, Huangpu District, Shanghai",
    checkIn: "14:00",
    checkOut: "12:00"
  }
];
