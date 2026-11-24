// data.js : 내 영화 5편 + 박스오피스 5편(총 10편) / 짠청코이(09) / hw3

const movies = [
  // ===== 내 영화 (type: "mine") 5편 =====
  {
    id: 1,
    title: "극장판 치이카와: 인어 섬의 비밀",
    year: 2026,
    date: "2026-07-24",
    rating: 7.1,
    type: "mine",
    poster: "/5TMyytCI5Pfc9c1eNsljiCdiB05.jpg",
    overview: "보수 100배 토벌 의뢰와 달콤한 음식에 이끌려 신비한 섬으로 향한 치이카와와 친구들이 섬에 숨겨진 비밀과 마주하는 이야기."
  },
  {
    id: 2,
    title: "너의 이름은",
    year: 2016,
    date: "2016-07-01",
    rating: 8.4,
    type: "mine",
    poster: "/2DJCufz3Oa703PbLjNX1pM6MCG2.jpg",
    overview: "꿈속에서 몸이 뒤바뀌는 기이한 경험을 이어가던 시골 소녀 미츠하와 도쿄 소년 타키가 서로를 찾아 나서는 이야기."
  },
  {
    id: 3,
    title: "엔드 오브 에반게리온",
    year: 1997,
    date: "1997-07-19",
    rating: 8.2,
    type: "mine",
    poster: "/AfyuI3glMCBDFmNPj9PY6DwbgGp.jpg",
    overview: "인류보완계획과 최후의 결전을 앞둔 네르프 본부를 둘러싸고 신지와 파일럿들의 운명이 극단으로 치닫는 결말부 극장판."
  },
  {
    id: 4,
    title: "명탐정 코난: 100만 달러의 펜타그램",
    year: 2024,
    date: "2024-04-12",
    rating: 6.9,
    type: "mine",
    poster: "/4TMkOnI6rCYxqD059aeeQSBv5mc.jpg",
    overview: "홋카이도 하코다테를 무대로 괴도 키드와 헤이지, 코난이 전설의 일본도를 두고 벌이는 추리와 쟁탈전."
  },
  {
    id: 5,
    title: "모노노케 히메",
    year: 1997,
    date: "1997-07-12",
    rating: 8.3,
    type: "mine",
    poster: "/gl0jzn4BupSbL2qMVeqrjKkF9Js.jpg",
    overview: "재앙신의 저주를 받은 소년 아시타카가 숲의 신들을 지키는 소녀 산과 타타라 마을의 대립 속에서 공존의 길을 모색하는 대서사극."
  },

  // ===== 박스오피스 (type: "boxoffice") 5편 =====
  {
    id: 6,
    title: "극장판 귀멸의 칼날: 무한성편",
    year: 2025,
    date: "2025-07-18",
    rating: 8.7,
    type: "boxoffice",
    rank: 1,
    poster: "/s638yV17p4h0y5y2y6x7w8v9u0t.jpg",
    overview: "귀살대와 혈귀의 본거지 무한성에서 펼쳐지는 치열한 최종 결전을 그린 극장판 시리즈."
  },
  {
    id: 7,
    title: "체인소 맨: 레제편",
    year: 2025,
    date: "2025-09-19",
    rating: 8.5,
    type: "boxoffice",
    rank: 2,
    poster: "/r537xU06o3g9x4x1x5w6v7u8t9s.jpg",
    overview: "덴지 앞에 나타난 수수께끼의 소녀 레제와의 만남과 예측할 수 없는 전개를 담은 극장판."
  },
  {
    id: 8,
    title: "주술회전 0",
    year: 2021,
    date: "2021-12-24",
    rating: 8.3,
    type: "boxoffice",
    rank: 3,
    poster: "/3faJ67FdeFQXyug8539HK8xZW9O.jpg",
    overview: "어린 시절 약속을 지키려 강력한 원령과 함께 살아가던 옷코츠 유타가 주술고전에 입학하며 시작되는 전일담."
  },
  {
    id: 9,
    title: "스즈메의 문단속",
    year: 2022,
    date: "2022-11-11",
    rating: 8.1,
    type: "boxoffice",
    rank: 4,
    poster: "/vIeu8hmyPP4HLjpWLA9Pw6SOeo3.jpg",
    overview: "재앙을 부르는 문을 닫기 위해 일본 각지의 폐허를 여행하는 소녀 스즈메와 닫는 사제의 여정."
  },
  {
    id: 10,
    title: "더 퍼스트 슬램덩크",
    year: 2022,
    date: "2022-12-03",
    rating: 8.6,
    type: "boxoffice",
    rank: 5,
    poster: "/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg",
    overview: "전국 제패를 꿈꾸는 북산고 농구부 5인방이 최강 산왕공고를 상대로 벌이는 운명의 경기를 그린 작품."
  }
];