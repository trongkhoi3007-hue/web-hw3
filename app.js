// app.js : 실습과제 #3 살아 움직이는 영화 보드 / 짠청코이 (2594067)

// ===== 데이터 및 저장 상태 =====

// liked : 없음 ⇒ 배열 (localStorage의 찜 영화 제목 목록)
const liked = JSON.parse(localStorage.getItem("liked") || "[]");

// saveLiked : 없음 ⇒ 없음 (현재 liked 배열을 localStorage에 저장)
function saveLiked() {
  localStorage.setItem("liked", JSON.stringify(liked));
}

// ===== 목록 가공 및 포스터 URL 함수 =====

// posterUrl : 포스터 경로, 크기 ⇒ TMDB 이미지 주소(문자열)
function posterUrl(path, size = "w342") {
  if (!path) return "";
  return "https://image.tmdb.org/t/p/" + size + path;
}

// sortBy : 영화 배열, 키 이름, 내림차순 여부 ⇒ 정렬한 새 배열(원본은 그대로)
function sortBy(list, key, desc) {
  const copy = [...list];
  copy.sort((a, b) => {
    if (typeof a[key] === "string") return a[key].localeCompare(b[key], "ko");
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

// getView : 검색어, 보기 필터, 정렬 기준 ⇒ 검색·필터·정렬이 적용된 새 영화 배열
function getView(keyword, typeFilter, sortKey) {
  let result = search(movies, keyword || "");

  if (typeFilter && typeFilter !== "all") {
    result = result.filter(m => m.type === typeFilter);
  }

  result = sortBy(result, sortKey, sortKey !== "title");
  return result;
}

// ===== 화면 렌더링 및 상세 대화상자 =====

// renderCards : 영화 배열 ⇒ 없음 (보드에 카드 생성, 찜 개수 및 빈 상태 반영)
function renderCards(list) {
  const board = document.querySelector(".board");
  const countEl = document.getElementById("count");
  const likeCountEl = document.getElementById("likeCount") || document.getElementById("LikeCount");

  board.innerHTML = "";

  for (const m of list) {
    const card = document.createElement("article");
    card.className = "card";
    if (Number(m.rating) >= 8) {
      card.classList.add("hot");
    }

    card.setAttribute("data-type", m.type);
    card.setAttribute("data-title", m.title);

    const isLiked = liked.includes(m.title);
    const likedClass = isLiked ? " liked" : "";

    const rankHtml = m.type === "boxoffice" && m.rank != null
      ? `<span class="rank">${m.rank}</span>`
      : "";

    let posterHtml = "";
    if (!m.poster) {
      card.classList.add("no-poster");
      posterHtml = `<div class="poster-fallback">${m.title[0]}</div>`;
    } else {
      posterHtml = `<img class="poster" src="${posterUrl(m.poster, "w342")}" alt="${m.title} 포스터" onerror="const c = this.closest('.card'); if (c) c.classList.add('no-poster'); const fb = document.createElement('div'); fb.className = 'poster-fallback'; fb.textContent = '${m.title[0]}'; this.replaceWith(fb);">`;
    }

    card.innerHTML = `
      ${rankHtml}
      <span class="badge">${m.rating}</span>
      ${posterHtml}
      <div class="info">
        <h3>${m.title}</h3>
        <p class="year">${m.year}</p>
        <button type="button" class="like${likedClass}" data-title="${m.title}" aria-pressed="${isLiked}">♥</button>
      </div>`;
    board.appendChild(card);
  }

  if (countEl) {
    countEl.textContent = list.length + "편";
  }
  if (likeCountEl) {
    likeCountEl.textContent = String(liked.length);
  }

  board.classList.toggle("is-empty", list.length === 0);
}

// refresh : 없음 ⇒ 없음 (현재 입력·필터·정렬 상태로 목록 다시 그리기)
function refresh() {
  const qInput = document.getElementById("q");
  const sortSelect = document.getElementById("sort");
  const checkedType = document.querySelector('#typeFilter input[name="type"]:checked');

  const keyword = qInput ? qInput.value : "";
  const typeFilter = checkedType ? checkedType.value : "all";
  const sortKey = sortSelect ? sortSelect.value : "rating";

  renderCards(getView(keyword, typeFilter, sortKey));
}

// openDetail : 영화 객체 ⇒ 없음 (#detailBody 채우고 모달 열기)
function openDetail(movie) {
  const dialog = document.getElementById("detail");
  const body = document.getElementById("detailBody");
  if (!dialog || !body || !movie) return;

  const posterBlock = movie.poster
    ? `<img src="${posterUrl(movie.poster, "w500")}" alt="${movie.title} 포스터">`
    : `<div class="poster-fallback">${movie.title[0]}</div>`;

  body.innerHTML = `
    ${posterBlock}
    <h2>${movie.title}</h2>
    <p>개봉일: ${movie.date} | 평점: ${movie.rating}</p>
    <p>${movie.overview || "줄거리 정보가 없습니다."}</p>
  `;

  if (typeof dialog.showModal === "function") {
    dialog.showModal();
  } else {
    dialog.setAttribute("open", "");
  }
}

// ===== 이벤트 리스너 등록(맨 아래 한 곳) =====

const qInput = document.getElementById("q");
const typeFilter = document.getElementById("typeFilter");
const sortSelect = document.getElementById("sort");
const board = document.querySelector(".board");
const dialog = document.getElementById("detail");
const closeBtn = document.getElementById("closeDetail");

if (qInput) {
  qInput.addEventListener("input", refresh);
}
if (typeFilter) {
  typeFilter.addEventListener("change", refresh);
}
if (sortSelect) {
  sortSelect.addEventListener("change", refresh);
}

if (board) {
  board.addEventListener("click", (event) => {
    const likeBtn = event.target.closest(".like");
    if (likeBtn) {
      const card = likeBtn.closest(".card");
      const title = likeBtn.getAttribute("data-title") || (card && card.getAttribute("data-title"));
      if (!title) return;

      const idx = liked.indexOf(title);
      if (idx === -1) {
        liked.push(title);
      } else {
        liked.splice(idx, 1);
      }
      saveLiked();
      refresh();
      return;
    }

    const card = event.target.closest(".card");
    if (!card) return;

    const title = card.getAttribute("data-title");
    const found = movies.find(m => m.title === title);
    if (found) {
      openDetail(found);
    }
  });
}

if (closeBtn && dialog) {
  closeBtn.addEventListener("click", () => {
    if (typeof dialog.close === "function") {
      dialog.close();
    } else {
      dialog.removeAttribute("open");
    }
  });
}

refresh();