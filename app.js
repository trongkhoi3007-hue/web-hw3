// app.js : 실습과제 #3 출발선 키트(교수 제공, https://github.com/martin-yeo/web-hw3a) / 짠청코이 (2594067)
// Step 0이 끝난 상태입니다. #2의 sortBy, search와 12주차 저장소의 posterUrl, renderCards만 있고 실행하는 줄은 없습니다.

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

    // Step 1 (나): 카드에 data-type, data-title 속성 붙이기(setAttribute)
    card.setAttribute("data-type", m.type);
    card.setAttribute("data-title", m.title);

    const isLiked = liked.includes(m.id);
    const likedClass = isLiked ? " liked" : "";

    // Step 1 (다): 박스오피스 카드(m.type === "boxoffice")에만 순위 배지 <span class="rank">
    const rankHtml = m.type === "boxoffice" && m.rank != null
      ? `<span class="rank">${m.rank}</span>`
      : "";

    // Step 1 (라): m.poster가 null이면 card에 no-poster, <img> 대신 대체 표지 <div class="poster-fallback">
    let posterHtml = "";
    if (!m.poster) {
      card.classList.add("no-poster");
      posterHtml = `<div class="poster-fallback">${m.title}</div>`;
    } else {
      posterHtml = `<img class="poster" src="${posterUrl(m.poster, "w342")}" alt="${m.title} 포스터">`;
    }

    // Step 1 (가): 아래 카드 제목 <h2>를 <h3>으로(#1의 .info h3에 맞춤)
    card.innerHTML = `
      ${posterHtml}
      ${rankHtml}
      <span class="badge">${m.rating}</span>
      <div class="info">
        <h3>${m.title}</h3>
        <p class="year">${m.year}</p>
        <button type="button" class="like${likedClass}" data-id="${m.id}" aria-pressed="${isLiked}">♥</button>
      </div>`;
    board.appendChild(card);
  }
  document.getElementById("count").textContent = list.length + "편";
}

// ===== Step 1 ~ Step 5 추가 구현 =====

const STORAGE_KEY = "web_hw3_liked_movies";
let liked = loadLiked();

// loadLiked : 없음 ⇒ 저장된 찜 영화 ID 배열
function loadLiked() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    return [];
  }
}

// saveLiked : 찜 영화 ID 배열 ⇒ 없음(localStorage 저장 및 찜 개수 갱신)
function saveLiked(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  updateLikeCount();
}

// updateLikeCount : 없음 ⇒ 없음(#likeCount 숫자 갱신)
function updateLikeCount() {
  const el = document.getElementById("likeCount");
  if (el) {
    el.textContent = String(liked.length);
  }
}

// toggleLike : 영화 ID ⇒ 갱신된 찜 배열
function toggleLike(id) {
  const exists = liked.includes(id);
  liked = exists ? liked.filter(item => item !== id) : [...liked, id];
  saveLiked(liked);
  return liked;
}

// getSelectedType : 없음 ⇒ 선택된 보기 필터 값("all" | "mine" | "boxoffice")
function getSelectedType() {
  const checked = document.querySelector('#typeFilter input[name="type"]:checked');
  return checked ? checked.value : "all";
}

// getView : 검색어, 보기 필터, 정렬 기준 ⇒ 필터 및 정렬이 적용된 새 영화 배열
function getView(keyword, typeFilter, sortKey) {
  let result = search(movies, keyword || "");

  if (typeFilter && typeFilter !== "all") {
    result = result.filter(m => m.type === typeFilter);
  }

  if (sortKey === "rating" || sortKey === "year") {
    result = sortBy(result, sortKey, true);
  } else if (sortKey === "title") {
    result = sortBy(result, "title", false);
  }

  return result;
}

// openDetail : 영화 객체 ⇒ 없음(#detailBody 채우고 #detail 모달 열기)
function openDetail(movie) {
  const dialog = document.getElementById("detail");
  const body = document.getElementById("detailBody");
  if (!dialog || !body || !movie) return;

  const posterBlock = movie.poster
    ? `<img src="${posterUrl(movie.poster, "w500")}" alt="${movie.title} 포스터">`
    : `<div class="poster-fallback">${movie.title}</div>`;

  const rankText = movie.type === "boxoffice" && movie.rank != null
    ? `<p>박스오피스 순위: ${movie.rank}위</p>`
    : "";

  body.innerHTML = `
    ${posterBlock}
    <h3>${movie.title}</h3>
    <p>개봉연도: ${movie.year}</p>
    <p>평점: ${movie.rating}</p>
    <p>구분: ${movie.type === "mine" ? "내 영화" : "박스오피스"}</p>
    ${rankText}
    <p>${movie.overview || "줄거리 정보가 없습니다."}</p>
  `;

  if (typeof dialog.showModal === "function") {
    dialog.showModal();
  } else {
    dialog.setAttribute("open", "");
  }
}

// refresh : 없음 ⇒ 없음(현재 검색·필터·정렬 상태로 보드와 빈 결과 상태 갱신)
function refresh() {
  const qInput = document.getElementById("q");
  const sortSelect = document.getElementById("sort");
  const board = document.querySelector(".board");

  const keyword = qInput ? qInput.value : "";
  const typeFilter = getSelectedType();
  const sortKey = sortSelect ? sortSelect.value : "rating";

  const viewList = getView(keyword, typeFilter, sortKey);
  renderCards(viewList);

  if (board) {
    board.classList.toggle("is-empty", viewList.length === 0);
  }
}

// ===== 이벤트 리스너 모음(맨 아래 한 곳) =====
function bindEvents() {
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
        event.stopPropagation();
        const rawId = likeBtn.dataset.id;
        const numId = Number(rawId);
        toggleLike(Number.isNaN(numId) ? rawId : numId);
        refresh();
        return;
      }

      const card = event.target.closest(".card");
      if (card) {
        const title = card.getAttribute("data-title");
        const found = movies.find(m => m.title === title);
        if (found) {
          openDetail(found);
        }
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
}

updateLikeCount();
bindEvents();
refresh();