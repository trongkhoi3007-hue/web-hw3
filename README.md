# 살아 움직이는 영화 보드 (web-hw3)

- 출발점 : 출발선 키트(web-hw3a)

## 프로젝트 정보
- 작성자: 짠청코이(2594067)
- GitHub Repository: `https://github.com/trongkhoi3007-hue/web-hw3`
- GitHub Pages: `https://trongkhoi3007-hue.github.io/web-hw3/`

## 구현 내용 요약
- **데이터 구성 (`data.js`)**: 내 영화(`mine`) 5편과 박스오피스(`boxoffice`) 5편, 총 10편의 영화 데이터를 구성했습니다.
- **보드 렌더링 (`Step 1`)**: `renderCards`에서 제목 태그를 `h3`으로 수정하고, `data-type`·`data-title` 속성을 추가했으며, 박스오피스 순위 배지(`.rank`)와 포스터 누락 시 대체 표지(`.poster-fallback`)를 처리했습니다.
- **검색·필터·정렬 (`Step 2`)**: `getView`와 `refresh`를 통해 제목 검색(`#q`), 보기 필터(`#typeFilter`), 정렬 기준(`#sort`)이 함께 동작하도록 구현했습니다.
- **찜 기능 (`Step 3`)**: `localStorage`를 이용해 찜 목록을 저장·복원하고, 이벤트 위임 방식으로 `♥` 토글 및 찜 개수(`#likeCount`)를 갱신합니다.
- **빈 결과 및 상세 보기 (`Step 4`)**: 검색/필터 결과가 0건일 때 `.is-empty`로 안내 문구를 띄우고, 카드 클릭 시 `openDetail`로 `#detail` `<dialog>`에 영화 정보를 채워 엽니다.
- **구조 정리 (`Step 5`)**: 이벤트 리스너를 아래쪽에 모아 관리하고, 주요 함수에 `입력 ⇒ 출력` 주석을 정리했습니다.

## 질문 및 참고 기록
- **질문 1**: `app.js`에서 `index.html`의 라디오 필터(`#typeFilter`)와 `#detail` 모달, `style.css`의 `.like`·`.is-empty` 규칙을 어떻게 연결해야 하는지 확인했습니다.
  - **답변 요약**: `input[name="type"]:checked` 값으로 `typeFilter`를 읽고, `toggleLike`와 `refresh`를 거쳐 `.like.liked`와 `.board.is-empty` 상태가 CSS 규칙과 맞물리도록 구성한 뒤 직접 손코딩으로 작성·검증했습니다.
- **질문 2**: `data.js`의 영화 객체 구조와 누락된 필드(`id`, `type`, `rank`, `overview`) 및 날짜 표기 오류를 점검했습니다.
  - **답변 요약**: `mine`과 `boxoffice` 구분이 명확히 드러나도록 필드를 정리하고, 실제 화면과 동작을 직접 확인하며 수정했습니다.

## 데이터 출처
- 포스터 및 영화 정보: TMDB (https://www.themoviedb.org) — *This product uses the TMDB API but is not endorsed or certified by TMDB.*
- 박스오피스 기준 정보: 영화진흥위원회 영화관입장권통합전산망(KOBIS), 기준일 2026-10-26