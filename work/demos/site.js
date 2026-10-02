const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const motion = reducedMotion ? "auto" : "smooth";
function closeMenus() {
  document
    .querySelectorAll("header nav.open")
    .forEach((nav) => nav.classList.remove("open"));
  document.querySelectorAll("[data-menu-toggle]").forEach((button) => {
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-label", "메뉴 열기");
  });
}
document.addEventListener("click", (event) => {
  const menu = event.target.closest("[data-menu-toggle]");
  if (menu) {
    const nav = document.getElementById(menu.getAttribute("aria-controls"));
    if (nav) {
      const open = nav.classList.toggle("open");
      menu.setAttribute("aria-expanded", String(open));
      menu.setAttribute("aria-label", open ? "메뉴 닫기" : "메뉴 열기");
    }
  }
  if (event.target.closest("header nav a")) closeMenus();
  const arrow = event.target.closest("[data-slide]");
  if (arrow) {
    const strip = document.querySelector(arrow.dataset.target);
    if (strip) {
      const first = strip.querySelector("article, figure, .slide");
      const gap = parseFloat(getComputedStyle(strip).columnGap) || 0;
      const step = (first?.getBoundingClientRect().width || 300) + gap;
      strip.dataset.manualUntil = String(Date.now() + 1200);
      strip.scrollBy({
        left: arrow.dataset.slide === "next" ? step : -step,
        behavior: motion,
      });
    }
  }
  const demo = event.target.closest("[data-demo]");
  if (demo) {
    event.preventDefault();
    const dialog = document.getElementById("demo-dialog");
    if (dialog) {
      dialog.querySelector("[data-dialog-title]").textContent =
        demo.dataset.demo;
      let detail = dialog.querySelector(".dialog-detail");
      if (!detail) {
        detail = document.createElement("div");
        detail.className = "dialog-detail";
        dialog.querySelector("[data-dialog-title]").after(detail);
      }
      detail.replaceChildren();
      detail.hidden = !demo.dataset.detail;
      if (demo.dataset.detail) {
        const lead = document.createElement("p");
        lead.textContent = demo.dataset.detail;
        detail.append(lead);
        const list = document.createElement("ol");
        (demo.dataset.items || "")
          .split("|")
          .filter(Boolean)
          .forEach((text) => {
            const item = document.createElement("li");
            item.textContent = text;
            list.append(item);
          });
        detail.append(list);
      }
      const form = dialog.querySelector("[data-demo-form]");
      if (form) form.hidden = Boolean(demo.dataset.detail);
      dialog.showModal();
    }
  }
  if (event.target.closest("[data-close-dialog]"))
    event.target.closest("dialog")?.close();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenus();
});
window.addEventListener("resize", () => {
  if (innerWidth > 700) closeMenus();
});
document.querySelectorAll("dialog").forEach((dialog) =>
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  }),
);
const header = document.querySelector("header");
const updateHeader = () =>
  header?.classList.toggle("is-scrolled", scrollY > 12);
window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

// Project images open a keyboard-accessible viewer with explicit concept context.
const projectImages = document.querySelectorAll(
  ".project-grid article > img, .journal-grid article > img",
);
if (projectImages.length) {
  const dialog = document.createElement("dialog");
  dialog.className = "image-dialog";
  dialog.setAttribute("aria-label", "공간 콘셉트 자세히 보기");
  dialog.innerHTML =
    '<img alt=""><h2></h2><p>가상 공간 제안 · 연출용 스톡 이미지이며 실제 시공 실적이 아닙니다.</p><button data-close-dialog>닫기</button>';
  dialog.querySelector("img").src = projectImages[0].src;
  dialog.querySelector("img").alt = projectImages[0].alt;
  document.body.append(dialog);
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
  projectImages.forEach((img) => {
    const article = img.closest("article");
    const title = article.querySelector("h3")?.textContent || img.alt;
    const button = document.createElement("button");
    button.className = "project-view";
    button.setAttribute("aria-label", title + " 크게 보기");
    img.before(button);
    button.append(img);
    button.addEventListener("click", () => {
      const large = dialog.querySelector("img");
      large.src = img.src;
      large.alt = img.alt;
      dialog.querySelector("h2").textContent = title;
      dialog.querySelector("p").textContent = [
        article.querySelector("p")?.textContent.trim(),
        "가상 공간 제안 · 연출용 스톡 이미지이며 실제 시공 실적이 아닙니다.",
      ]
        .filter(Boolean)
        .join(" ");
      dialog.showModal();
    });
  });
}

const strips = new Set(
  [...document.querySelectorAll("[data-target]")]
    .map((b) => document.querySelector(b.dataset.target))
    .filter(Boolean),
);
strips.forEach((strip) => {
  const update = () => {
    const first = strip.querySelector("article, figure, .slide");
    const gap = parseFloat(getComputedStyle(strip).columnGap) || 0;
    const step = (first?.getBoundingClientRect().width || 300) + gap;
    const index = Math.round(strip.scrollLeft / step);
    document.querySelectorAll(`[data-target="#${strip.id}"]`).forEach((b) => {
      const disabled =
        b.dataset.slide === "prev"
          ? strip.scrollLeft < 2
          : strip.scrollLeft >= strip.scrollWidth - strip.clientWidth - 2;
      b.disabled = disabled;
    });
    if (strip.classList.contains("gallery-strip")) {
      const counter = document.querySelector("[data-gallery-count]");
      if (counter) counter.textContent = String(index + 1).padStart(2, "0");
    }

  };
  strip.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  update();
});
const stickyGallery = document.querySelector(".gallery-sticky");
if (stickyGallery) {
  const section = stickyGallery.closest(".gallery");
  const strip = stickyGallery.querySelector(".gallery-strip");
  let scheduled = false;
  const moveWithPage = () => {
    scheduled = false;
    if (
      innerWidth <= 700 ||
      reducedMotion ||
      Date.now() < Number(strip.dataset.manualUntil || 0)
    )
      return;
    const progress = Math.max(
      0,
      Math.min(
        1,
        -section.getBoundingClientRect().top /
          Math.max(1, section.offsetHeight - stickyGallery.offsetHeight),
      ),
    );
    strip.scrollTo({
      left: progress * (strip.scrollWidth - strip.clientWidth),
      behavior: "instant",
    });
  };
  window.addEventListener(
    "scroll",
    () => {
      if (!scheduled) {
        scheduled = true;
        requestAnimationFrame(moveWithPage);
      }
    },
    { passive: true },
  );
  let drag = null;
  strip.addEventListener("pointerdown", (event) => {
    if (event.pointerType === "mouse") {
      drag = { x: event.clientX, left: strip.scrollLeft };
      strip.dataset.manualUntil = String(Date.now() + 60000);
      strip.setPointerCapture(event.pointerId);
    }
  });
  strip.addEventListener("pointermove", (event) => {
    if (drag)
      strip.scrollTo({
        left: drag.left - (event.clientX - drag.x),
        behavior: "instant",
      });
  });
  strip.addEventListener("pointerup", () => {
    drag = null;
  });
  strip.addEventListener("pointercancel", () => {
    drag = null;
  });
}

// Expose reading position in navigation without adding another visual component.
const sectionLinks = [
  ...document.querySelectorAll('header nav a[href^="#"]'),
].filter((link) => document.getElementById(link.hash.slice(1)));
let navFrame = false;
function updateCurrentSection() {
  navFrame = false;
  let active = null;
  sectionLinks.forEach((link) => {
    if (
      document.getElementById(link.hash.slice(1)).getBoundingClientRect().top <=
      160
    )
      active = link;
  });
  sectionLinks.forEach((link) => {
    if (link === active) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });
}
window.addEventListener(
  "scroll",
  () => {
    if (!navFrame) {
      navFrame = true;
      requestAnimationFrame(updateCurrentSection);
    }
  },
  { passive: true },
);
updateCurrentSection();
