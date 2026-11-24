// app.js : 실습과제 #3 출발선 키트(교수 제공, https://github.com/martin-yeo/web-hw3a) / 이름(학번)
// Step 0이 끝난 상태입니다. #2의 sortBy, search와 12주차 저장소의 posterUrl, renderCards만 있고 실행하는 줄은 없습니다.
// Step 1부터 안내문대로 합니다(renderCards 네 군데 고치기 ⇒ 맨 아래에 renderCards(movies);로 그려 보기).

// ===== 실습과제 #2와 12주차 저장소에서 가져온 함수 =====

// posterUrl : 포스터 경로, 크기 ⇒ TMDB 이미지 주소(문자열)
function posterUrl(path, size) {
  return "https://image.tmdb.org/t/p/" + size + path;
}

// sortBy : 영화 배열, 키 이름, 내림차순 여부 ⇒ 정렬한 새 배열(원본은 그대로)
function sortBy(list, key, desc) {
  const copy = [...list];
  copy.sort((a, b) => {
    if (typeof a[key] === "string") return a[key].localeCompare(b[key]);
    return a[key] - b[key];
  });
  if (desc) copy.reverse();
  return copy;
}

// search : 배열, 검색어 ⇒ 제목에 검색어가 든 새 배열(대소문자, 앞뒤 공백 무시)
function search(list, keyword) {
  const k = keyword.trim().toLowerCase();
  return list.filter(m => m.title.toLowerCase().includes(k));
}

// renderCards : 영화 배열 ⇒ 보드에 카드 생성(반환값 없음)
function renderCards(list) {
  const board = document.querySelector(".board");
  board.innerHTML = "";
  for (const m of list) {
    const card = document.createElement("article");
    card.className = "card";
    if (m.rating >= 8) {
      card.classList.add("hot");
    }
    // TODO Step 1 (가): 아래 카드 제목 <h2>를 <h3>으로(#1의 .info h3에 맞춤)
    // TODO Step 1 (나): 카드에 data-type, data-title 속성 붙이기(setAttribute)
    // TODO Step 1 (다): 박스오피스 카드(m.type === "boxoffice")에만 순위 배지 <span class="rank">
    // TODO Step 1 (라): m.poster가 null이면 card에 no-poster, <img> 대신 대체 표지 <div class="poster-fallback">
    card.innerHTML = `
      <img class="poster" src="${posterUrl(m.poster, "w342")}" alt="${m.title} 포스터">
      <span class="badge">${m.rating}</span>
      <div class="info">
        <h2>${m.title}</h2>
        <p class="year">${m.year}</p>
      </div>`;
    board.appendChild(card);
  }
  document.getElementById("count").textContent = list.length + "편";
}

// ===== Step 1부터 이 아래에 더합니다(끝낸 TODO 줄은 지움) =====
// TODO Step 1: 맨 아래에서 renderCards(movies);로 카드 10장을 그려 보기
// TODO Step 2: getView(검색 ⇒ 보기 필터 ⇒ 정렬)와 refresh, 리스너 3개(#q input, #sort change, #typeFilter change)
// TODO Step 3: liked와 saveLiked(안내문 5줄), ♥ 버튼과 찜 개수, 보드 클릭 리스너 하나(이벤트 위임)
// TODO Step 4: 0건이면 보드에 .is-empty, openDetail로 <dialog> 채워 열기, 닫기 버튼
// TODO Step 5: 리스너가 모두 맨 아래 한 곳에, 함수마다 "입력 ⇒ 출력" 주석, README.md는 안내문 양식으로