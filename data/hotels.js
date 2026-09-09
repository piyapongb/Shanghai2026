/**
 * Hotel Master Data
 * Fields: id, stayFrom, stayTo, name, nameZh, address, checkIn, checkOut, image
 *
 * checkIn / checkOut are the hotel's stated policy times, not what the
 * itinerary shows for an actual arrival — the two can legitimately differ.
 *
 * The 3 nights (5–8 Nov) are fixed by the flights. `image` is empty until a
 * photo is added with
 *   node tools/add-image.js <local-file> hotel-001
 */
window.HOTELS_DATA = [
  {
    id: "hotel-001",
    stayFrom: "2026-11-05",
    stayTo: "2026-11-08",
    name: "Lechao Hotel (Shanghai People's Square Changzheng Hospital)",
    nameZh: "乐巢酒店(上海人民广场长征医院店)",
    image: "",
    address: "333 Huanghe Road, Huangpu District, Shanghai",
    checkIn: "14:00",
    checkOut: "12:00"
  }
];
