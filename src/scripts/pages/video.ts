import type { Video } from "../type/video";
import { fetchData } from "../core/api";
import { VIDEOS_QUERY } from "../service/query";
import { getStartEnd } from "../utils/getStartEnd";

const PER_PAGE = 6;

export async function init() {
  const { start, end } = getStartEnd(1, PER_PAGE);

  const result = await fetchData<{ videos: Video[]; total: number }>({
    query: VIDEOS_QUERY,
    options: { start, end },
  });

  const container = document.querySelector<HTMLElement>("#videos-list");

  if (!container) return;

  if (!result.videos.length) {
    container.innerHTML = "<p>Відео не знайдено</p>";
    return;
  }

  result.videos.forEach((video: Video) => {
    container.innerHTML += createVideoCard(video);
  });

  setupPopup();
}

function createVideoCard(video: Video): string {
  return `
    <div class="video-card" data-video-url="${video.videoUrl}">
      <div class="video-card__cover">
        ${video.cover
          ? `<img src="${video.cover}" alt="${video.title}" />`
          : `<div class="video-card__no-cover"></div>`
        }
        <button class="video-card__play">▶</button>
      </div>
      <h3 class="video-card__title">${video.title}</h3>
    </div>
  `;
}

function setupPopup() {
  const popup = document.querySelector<HTMLElement>("#video-popup");
  const popupPlayer = document.querySelector<HTMLVideoElement>("#popup-player");
  const overlay = document.querySelector<HTMLElement>("#popup-close");       // клік на фон
  const closeBtn = document.querySelector<HTMLElement>("#popup-close-btn");  // клік на ✕

  if (!popup || !popupPlayer || !overlay || !closeBtn) return;

  // відкриваємо попап при кліку на картку
  document.querySelectorAll<HTMLElement>(".video-card").forEach((card) => {
    card.addEventListener("click", () => {
      const url = card.dataset.videoUrl;
      if (!url) return;

      popupPlayer.src = url;
      popupPlayer.play();
      popup.classList.add("is-open");
    });
  });

  // закриваємо при кліку на фон або на ✕
  function closePopup() {
    popupPlayer.pause();
    popupPlayer.src = "";
    popup.classList.remove("is-open");
  }

  //todo this fuunction 
  

  overlay.addEventListener("click", closePopup);
  closeBtn.addEventListener("click", closePopup);

  // закриваємо при натисканні Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closePopup();
  });
}