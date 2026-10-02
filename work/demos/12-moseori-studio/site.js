const header = document.querySelector(".site-header");
const menu = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");
const updateHeader = () => header.classList.toggle("scrolled", scrollY > 24);
window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();
const setMenuOpen = (open) => {
  nav.classList.toggle("open", open);
  menu.setAttribute("aria-expanded", String(open));
  menu.setAttribute("aria-label", open ? "메뉴 닫기" : "메뉴 열기");
};
menu.addEventListener("click", () => {
  setMenuOpen(!nav.classList.contains("open"));
});
nav.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => {
    setMenuOpen(false);
  }),
);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setMenuOpen(false);
  }
});
window.addEventListener("resize", () => {
  if (innerWidth > 760) {
    setMenuOpen(false);
  }
});

const cards = document.getElementById("project-cards");
if (cards) {
  window.moseoriProjects.forEach((project, index) => {
    const link = document.createElement("a");
    link.className = "project-card";
    link.hidden = index >= 6;
    link.href = `detail.html?id=${project.id}`;
    const image = document.createElement("img");
    image.src = project.image;
    image.alt = `${project.title}의 분위기를 보여주는 연출용 공간 사진`;
    image.loading = project.id <= 2 ? "eager" : "lazy";
    image.decoding = "async";
    const title = document.createElement("span");
    title.className = "project-card-title";
    title.textContent = `${project.title} ${project.area}평`;
    link.append(image, title);
    cards.append(link);
  });
  let shown = 6;
  const more = document.createElement("button");
  more.className = "projects-more";
  more.type = "button";
  more.textContent = `공간 더 보기 · ${shown} / ${window.moseoriProjects.length}`;
  more.addEventListener("click", () => {
    const firstNew = cards.children[shown];
    shown = Math.min(shown + 6, cards.children.length);
    [...cards.children].forEach((card, index) => { card.hidden = index >= shown; });
    more.textContent = `공간 더 보기 · ${shown} / ${cards.children.length}`;
    more.hidden = shown === cards.children.length;
    firstNew?.focus({preventScroll:true});
  });
  cards.after(more);
}

const detailTitle = document.getElementById("detail-title");
if (detailTitle) {
  const wanted = Number(new URLSearchParams(location.search).get("id"));
  const project =
    window.moseoriProjects.find((item) => item.id === wanted) ||
    window.moseoriProjects[0];
  detailTitle.textContent = `${project.title} ${project.area}평`;
  document.getElementById("detail-area").textContent = `${project.area}평`;
  document.title = `${project.title} | 모서리 디자인 스튜디오`;
  const gallery = document.getElementById("detail-gallery");
  const groups = [
    [1, 3, 9, 14, 22, 30],
    [2, 5, 11, 17, 25],
    [4, 12, 18, 24, 29],
    [6, 7, 10, 15, 20],
    [8, 16, 21, 27, 31],
    [13, 19, 23, 26, 28],
  ];
  const relatedIds =
    groups.find((ids) => ids.includes(project.id)) || groups[0];
  const images = [
    project,
    ...relatedIds
      .filter((id) => id !== project.id)
      .slice(0, 4)
      .map((id) => window.moseoriProjects[id - 1]),
  ];
  if (project.id !== 1) document.querySelector(".detail-film").hidden = true;
  const dialog = document.getElementById("lightbox");
  const large = document.getElementById("lightbox-image");
  const counter = document.getElementById("lightbox-count");
  let current = 0;
  const display = (index) => {
    current = (index + images.length) % images.length;
    large.src = images[current].image;
    large.alt = `가상 콘셉트를 위한 연출용 참고 이미지 ${current + 1}`;
    counter.textContent = `${current + 1} / ${images.length} · 가상 공간 콘셉트`;
  };
  display(0);
  images.forEach((item, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.setAttribute("aria-label", `공간 이미지 ${index + 1} 크게 보기`);
    const image = document.createElement("img");
    image.src = item.image;
    image.alt = `서로 다른 공간의 연출용 참고 이미지 ${index + 1}`;
    image.loading = index < 2 ? "eager" : "lazy";
    button.append(image);
    button.addEventListener("click", () => {
      display(index);
      dialog.showModal();
    });
    gallery.append(button);
  });
  dialog
    .querySelector(".lightbox-close")
    .addEventListener("click", () => dialog.close());
  dialog
    .querySelector(".lightbox-prev")
    .addEventListener("click", () => display(current - 1));
  dialog
    .querySelector(".lightbox-next")
    .addEventListener("click", () => display(current + 1));
  dialog.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") display(current - 1);
    if (event.key === "ArrowRight") display(current + 1);
  });
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
}

const demoForm = document.getElementById("demo-form");
if (demoForm) {
  const first = document.getElementById("step-one");
  const second = document.getElementById("step-two");
  const progress = document.getElementById("form-progress-line");
  const number = document.getElementById("form-step-number");
  const setStep = (step) => {
    first.hidden = step !== 1;
    second.hidden = step !== 2;
    progress.style.width = step === 1 ? "50%" : "100%";
    number.textContent = String(step);
    document.querySelector(".form-inner h1").focus?.();
  };
  document.getElementById("go-step-two").addEventListener("click", () => {
    const required = [...first.querySelectorAll("[required]")];
    const invalid = required.find((field) => !field.checkValidity());
    let message = first.querySelector(".field-error");
    if (invalid) {
      if (!message) {
        message = document.createElement("p");
        message.className = "field-error";
        message.setAttribute("role", "alert");
        first.querySelector(".form-next").before(message);
      }
      message.textContent =
        "필수 항목을 확인해 주세요. 이 화면의 내용은 전송되지 않습니다.";
      invalid.focus();
      return;
    }
    if (message) message.remove();
    setStep(2);
    second.querySelector("select").focus();
  });
  document
    .getElementById("back-step-one")
    .addEventListener("click", () => setStep(1));
  demoForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const space = second.querySelector("select[required]");
    if (!space.value) {
      space.focus();
      return;
    }
    demoForm.hidden = true;
    document.getElementById("demo-complete").hidden = false;
    // Demo entries live only in the controls and are never persisted or transmitted.
    demoForm.reset();
  });
}

const heroVideo = document.querySelector(".hero-video");
const videoToggle = document.querySelector(".video-toggle");
if (heroVideo && videoToggle) {
  const preference = matchMedia("(prefers-reduced-motion: reduce)");
  const syncVideo = () => {
    videoToggle.textContent = heroVideo.paused ? "영상 재생 ▷" : "영상 정지 Ⅱ";
    videoToggle.setAttribute("aria-label", heroVideo.paused ? "배경 영상 재생" : "배경 영상 일시 정지");
  };
  const syncPreference = () => {
    if (preference.matches) heroVideo.pause();
    videoToggle.hidden = preference.matches;
    syncVideo();
  };
  videoToggle.addEventListener("click", () => {
    if (heroVideo.paused) heroVideo.play().catch(syncVideo);
    else heroVideo.pause();
  });
  heroVideo.addEventListener("play", syncVideo);
  heroVideo.addEventListener("pause", syncVideo);
  preference.addEventListener("change", syncPreference);
  syncPreference();
}
