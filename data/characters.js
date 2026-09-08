/**
 * Character Master Data
 * Single source of truth for the characters a theme park day talks about.
 * Lands in itinerary.js reference these by key only (`park.characters`),
 * so a character that shows up in three lands is written once here.
 *
 * Fields: id (same as the key - it is what tools/add-image.js targets),
 * name (English, shown on the chip), nameZh (optional, shown in the popup),
 * image (photo shown beside the name in the popup; empty is fine, the popup
 * falls back to the initial), bio (2-3 sentences: who they are and what they
 * are like).
 *
 * Tapping a character chip inside a land's Details opens a popup with this
 * record. A key that no land references costs nothing — nothing renders it.
 * A land referencing a key that is missing here still renders the chip with
 * the raw key as its label and logs a console warning, the same way a
 * dangling restaurantId behaves.
 *
 * To add one, copy a block and fill it in:
 *   character-key: {
 *     id: "character-key",
 *     image: "",
 *     name: "Name",
 *     nameZh: "中文名",
 *     bio: "..."
 *   },
 */
window.CHARACTERS_DATA = {
  /* ----- Mickey & friends ----- */
  mickey: {
    id: "mickey",
    image: "",
    name: "Mickey Mouse",
    nameZh: "米奇",
    bio: "หนูตัวแรกของดิสนีย์ ปรากฏตัวครั้งแรกปี 1928 ในการ์ตูนเรื่อง Steamboat Willie จนกลายเป็นสัญลักษณ์ของบริษัททั้งบริษัท นิสัยร่าเริง มองโลกในแง่ดี และเป็นคนที่เพื่อนทุกตัวเชื่อใจให้เป็นหัวหน้าเสมอ"
  },
  minnie: {
    id: "minnie",
    image: "",
    name: "Minnie Mouse",
    nameZh: "米妮",
    bio: "แฟนสาวของมิกกี้ที่เกิดในการ์ตูนเรื่องเดียวกันเมื่อปี 1928 จำง่ายจากโบว์จุดบนหัว เป็นสายแฟชั่นและใจดี แต่เอาจริงเวลาต้องตัดสินใจก็เด็ดขาดกว่ามิกกี้"
  },
  donald: {
    id: "donald",
    image: "",
    name: "Donald Duck",
    nameZh: "唐老鸭",
    bio: "เป็ดอารมณ์ร้อนเสียงแหบที่โมโหง่ายที่สุดในแก๊ง เปิดตัวปี 1934 เสน่ห์ของโดนัลด์คือความพยายามไม่เลิกทั้งที่ทำอะไรก็พังทุกครั้ง"
  },
  daisy: {
    id: "daisy",
    image: "",
    name: "Daisy Duck",
    nameZh: "黛西",
    bio: "แฟนสาวของโดนัลด์ เป็ดสาวที่มีสไตล์และมั่นใจในตัวเอง เป็นคนเดียวที่ดึงโดนัลด์ให้ใจเย็นลงได้เวลาเขาระเบิดอารมณ์"
  },
  goofy: {
    id: "goofy",
    image: "",
    name: "Goofy",
    nameZh: "高飞",
    bio: "หมาตัวสูงซุ่มซ่ามที่ทำอะไรก็พลาด แต่ใจดีและซื่อสัตย์กับเพื่อนที่สุด เสียงหัวเราะและคำอุทาน \"A-hyuck!\" เป็นเอกลักษณ์ประจำตัว"
  },
  pluto: {
    id: "pluto",
    image: "",
    name: "Pluto",
    nameZh: "布鲁托",
    bio: "หมาเลี้ยงของมิกกี้ ต่างจากกูฟฟี่ตรงที่พลูโตเป็นหมาจริงๆ พูดไม่ได้ สื่อสารด้วยท่าทางและเสียงเห่าล้วนๆ"
  },
  dumbo: {
    id: "dumbo",
    image: "",
    name: "Dumbo",
    nameZh: "小飞象",
    bio: "ลูกช้างจากหนังปี 1941 ที่ถูกล้อเพราะหูใหญ่ผิดปกติ ก่อนจะค้นพบว่าหูคู่นั้นทำให้บินได้ เป็นเรื่องของการเปลี่ยนปมด้อยให้เป็นจุดแข็ง"
  },

  /* ----- Tomorrowland ----- */
  "sam-flynn": {
    id: "sam-flynn",
    image: "",
    name: "Sam Flynn",
    nameZh: "山姆·弗林",
    bio: "ตัวเอกจากหนัง TRON: Legacy (2010) ลูกชายของนักสร้างเกมที่หายตัวเข้าไปในโลกดิจิทัลชื่อ The Grid แซมตามพ่อเข้าไปแล้วต้องเอาชีวิตรอดด้วยการแข่งไลท์ไซเคิล ซึ่งเป็นที่มาของเครื่องเล่น TRON"
  },
  clu: {
    id: "clu",
    image: "",
    name: "CLU",
    nameZh: "克鲁",
    bio: "โปรแกรมที่ถูกสร้างให้หน้าตาเหมือนพ่อของแซม แต่กลายเป็นผู้ปกครองเผด็จการของ The Grid เป็นตัวร้ายที่ไล่ล่าแซมในหนัง"
  },
  buzz: {
    id: "buzz",
    image: "",
    name: "Buzz Lightyear",
    nameZh: "巴斯光年",
    bio: "ของเล่นนักบินอวกาศจาก Toy Story ที่ตอนแรกเชื่อสนิทใจว่าตัวเองเป็นเจ้าหน้าที่อวกาศจริงๆ ไม่ใช่ของเล่น ประโยคติดปากคือ \"To infinity and beyond!\""
  },
  zurg: {
    id: "zurg",
    image: "",
    name: "Emperor Zurg",
    nameZh: "扎克天王",
    bio: "จักรพรรดิผู้ชั่วร้ายที่เป็นศัตรูตลอดกาลของบัซซ์ในจักรวาลของเล่น เป็นเป้าหมายที่ต้องยิงให้ได้ในเครื่องเล่น Buzz Lightyear Planet Rescue"
  },
  stitch: {
    id: "stitch",
    image: "",
    name: "Stitch",
    nameZh: "史迪奇",
    bio: "เอเลี่ยนทดลองหมายเลข 626 จากเรื่อง Lilo & Stitch ถูกออกแบบมาให้ทำลายทุกอย่าง แต่หลังตกมาอยู่ฮาวายก็เรียนรู้เรื่องครอบครัวจากลีโล ซนแต่ขี้เหงา"
  },
  "darth-vader": {
    id: "darth-vader",
    image: "",
    name: "Darth Vader",
    nameZh: "达斯·维达",
    bio: "อัศวินเจไดที่ตกไปอยู่ฝ่ายมืดในจักรวาล Star Wars สวมหน้ากากดำและหายใจเป็นจังหวะจนกลายเป็นเสียงที่จำได้ทั่วโลก ที่ Launch Bay มักออกมาถ่ายรูปกับผู้เข้าชม"
  },
  bb8: {
    id: "bb8",
    image: "",
    name: "BB-8",
    nameZh: "BB-8",
    bio: "หุ่นยนต์ทรงลูกบอลกลิ้งจาก Star Wars ภาคใหม่ สื่อสารด้วยเสียงบี๊บและการเอียงหัว เป็นตัวที่เด็กชอบที่สุดในโซนสตาร์วอร์ส"
  },

  /* ----- Adventure Isle ----- */
  tarzan: {
    id: "tarzan",
    image: "",
    name: "Tarzan",
    nameZh: "泰山",
    bio: "เด็กชายที่ถูกลิงกอริลลาเลี้ยงมาในป่าแอฟริกา จากหนังปี 1999 เรื่องราวว่าด้วยการค้นหาว่าตัวเองเป็นใครระหว่างโลกของคนกับโลกของสัตว์ ในสวนสนุกเล่าใหม่เป็นโชว์กายกรรมจีน"
  },

  /* ----- Zootopia ----- */
  "judy-hopps": {
    id: "judy-hopps",
    image: "",
    name: "Judy Hopps",
    nameZh: "朱迪·霍普斯",
    bio: "กระต่ายตัวแรกที่ได้เป็นตำรวจในเมืองซูโทเปีย ตัวเล็กที่สุดในกรมแต่ดื้อรั้นและไม่ยอมแพ้ ต้องพิสูจน์ตัวเองในเมืองที่ตัดสินสัตว์จากสายพันธุ์"
  },
  "nick-wilde": {
    id: "nick-wilde",
    image: "",
    name: "Nick Wilde",
    nameZh: "尼克·王尔德",
    bio: "จิ้งจอกนักต้มตุ๋นปากดีที่กลายมาเป็นคู่หูของจูดี้ ภายนอกเหมือนไม่แคร์อะไร แต่ที่จริงเคยเจ็บจากการถูกตัดสินว่าจิ้งจอกต้องเจ้าเล่ห์ตั้งแต่เด็ก"
  },
  flash: {
    id: "flash",
    image: "",
    name: "Flash",
    nameZh: "闪电",
    bio: "สลอธพนักงานกรมขนส่งที่ทำทุกอย่างช้าอย่างทรมาน เป็นฉากที่คนจำได้มากที่สุดของหนัง และเป็นมุกที่โผล่มาในเครื่องเล่นด้วย"
  },
  "chief-bogo": {
    id: "chief-bogo",
    image: "",
    name: "Chief Bogo",
    nameZh: "波哥局长",
    bio: "ควายป่าหัวหน้าสถานีตำรวจซูโทเปีย เสียงดังและเข้มงวด ไม่เชื่อว่ากระต่ายจะเป็นตำรวจได้ในตอนแรก"
  },

  /* ----- Treasure Cove ----- */
  "jack-sparrow": {
    id: "jack-sparrow",
    image: "",
    name: "Captain Jack Sparrow",
    nameZh: "杰克船长",
    bio: "กัปตันโจรสลัดจาก Pirates of the Caribbean เดินเซตลอดเวลาและพูดจาวกวน แต่เอาตัวรอดได้ทุกสถานการณ์ด้วยแผนที่ไม่มีใครตามทัน"
  },
  "davy-jones": {
    id: "davy-jones",
    image: "",
    name: "Davy Jones",
    nameZh: "戴维·琼斯",
    bio: "กัปตันเรือ Flying Dutchman ที่มีหนวดปลาหมึกทั้งใบหน้า ควบคุมทะเลและเก็บวิญญาณลูกเรือไว้ใช้งาน เป็นตัวร้ายหลักที่โผล่มาในเครื่องเล่น"
  },
  barbossa: {
    id: "barbossa",
    image: "",
    name: "Captain Barbossa",
    nameZh: "巴博萨船长",
    bio: "โจรสลัดรุ่นเก๋าที่สลับข้างไปมาระหว่างศัตรูกับพันธมิตรของแจ็ค ในเครื่องเล่นที่เซี่ยงไฮ้เป็นคนพาเราลงไปหาสมบัติใต้ทะเล"
  },

  /* ----- Fantasyland ----- */
  "snow-white": {
    id: "snow-white",
    image: "",
    name: "Snow White",
    nameZh: "白雪公主",
    bio: "เจ้าหญิงจากหนังยาวเรื่องแรกของดิสนีย์ (1937) หนีราชินีใจร้ายมาอยู่กับคนแคระทั้งเจ็ดในป่า เรื่องของเธอคือเรื่องที่เล่าอยู่ในปราสาทกลางสวน"
  },
  "peter-pan": {
    id: "peter-pan",
    image: "",
    name: "Peter Pan",
    nameZh: "小飞侠彼得潘",
    bio: "เด็กชายที่ไม่ยอมโต อาศัยอยู่บนเกาะเนเวอร์แลนด์กับกลุ่มเด็กหลงทาง บินได้ด้วยผงวิเศษของทิงเกอร์เบลล์ และมีศัตรูคือกัปตันฮุก"
  },
  "winnie-the-pooh": {
    id: "winnie-the-pooh",
    image: "",
    name: "Winnie the Pooh",
    nameZh: "小熊维尼",
    bio: "หมีสีเหลืองที่คิดถึงแต่น้ำผึ้งตลอดเวลา อาศัยอยู่ในป่าร้อยเอเคอร์กับพิกเล็ต ทิกเกอร์ และอียอร์ ใจดี เชื่องช้า และพูดจาตรงไปตรงมาแบบเด็กๆ"
  },
  alice: {
    id: "alice",
    image: "",
    name: "Alice",
    nameZh: "爱丽丝",
    bio: "เด็กหญิงที่ตกลงไปในโพรงกระต่ายแล้วเจอดินแดนมหัศจรรย์ที่ทุกอย่างไร้เหตุผล ทั้งแมวเชสเชียร์และราชินีโพแดงที่สั่งตัดหัวคนไปทั่ว"
  },
  cinderella: {
    id: "cinderella",
    image: "",
    name: "Cinderella",
    nameZh: "灰姑娘",
    bio: "เด็กสาวที่ถูกแม่เลี้ยงกดขี่ ได้ไปงานเต้นรำด้วยเวทมนตร์ของนางฟ้าแม่ทูนหัว และทิ้งรองเท้าแก้วไว้ข้างหนึ่งตอนเที่ยงคืน"
  },
  elsa: {
    id: "elsa",
    image: "",
    name: "Elsa",
    nameZh: "艾莎",
    bio: "ราชินีจาก Frozen ที่เกิดมาพร้อมพลังเสกน้ำแข็งซึ่งควบคุมไม่ได้ตอนเด็ก เรื่องของเธอคือการเลิกกลัวตัวเองและยอมรับสิ่งที่ตัวเองเป็น"
  },
  anna: {
    id: "anna",
    image: "",
    name: "Anna",
    nameZh: "安娜",
    bio: "น้องสาวของเอลซ่า ตรงข้ามกับพี่สาวโดยสิ้นเชิง คือพูดมาก กล้าได้กล้าเสีย และเป็นคนที่ออกตามหาพี่สาวจนถึงยอดเขาน้ำแข็ง"
  },

  /* ----- Toy Story Land ----- */
  woody: {
    id: "woody",
    image: "",
    name: "Woody",
    nameZh: "胡迪",
    bio: "ตุ๊กตาคาวบอยตัวโปรดของแอนดี้ และเป็นหัวหน้าของเล่นทั้งห้อง ยึดมั่นเรื่องความภักดีต่อเจ้าของมากจนบางครั้งกลายเป็นความหึงหวง"
  },
  jessie: {
    id: "jessie",
    image: "",
    name: "Jessie",
    nameZh: "翠丝",
    bio: "คาวเกิร์ลผมแดงพลังงานล้นจากชุดของเล่น Woody's Round-Up มีปมเรื่องเคยถูกเจ้าของคนเก่าทิ้ง เลยกลัวการถูกเก็บเข้ากล่องเป็นพิเศษ"
  },
  rex: {
    id: "rex",
    image: "",
    name: "Rex",
    nameZh: "抱抱龙",
    bio: "ไดโนเสาร์พลาสติกตัวเขียวที่หน้าตาน่ากลัวแต่ขี้กลัวที่สุดในกลุ่ม กังวลว่าตัวเองไม่น่ากลัวพอจะเป็นไดโนเสาร์ที่ดี"
  },
  slinky: {
    id: "slinky",
    image: "",
    name: "Slinky Dog",
    nameZh: "弹簧狗",
    bio: "หมาของเล่นลำตัวเป็นสปริง เพื่อนซี้ที่เชื่อใจวู้ดดี้เสมอ ตัวยืดได้เลยมักถูกใช้เป็นสะพานหรือเชือกช่วยเพื่อนในทุกภารกิจ"
  }
};
