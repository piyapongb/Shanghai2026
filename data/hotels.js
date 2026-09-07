/**
 * Hotel Master Data
 * Fields: id, stayFrom, stayTo, name, nameZh, address, checkIn, checkOut, image
 *
 * checkIn / checkOut are the hotel's stated policy times, not what the
 * itinerary shows for an actual arrival — the two can legitimately differ.
 *
 * MOCK DATA: placeholder hotel, nothing is booked. Only the 3 nights
 * (5–8 Nov) are fixed, by the flights. `image` is empty until a photo is
 * added with
 *   node tools/add-image.js <local-file> hotel-001
 */
window.HOTELS_DATA = [
  {
    id: "hotel-001",
    stayFrom: "2026-11-05",
    stayTo: "2026-11-08",
    name: "Hanting Hotel (Shanghai Nanjing East Road)",
    nameZh: "汉庭酒店(上海南京东路店)",
    image: "",
    address: "Near Nanjing East Road Metro Station, Huangpu District, Shanghai",
    checkIn: "14:00",
    checkOut: "12:00"
  }
];
