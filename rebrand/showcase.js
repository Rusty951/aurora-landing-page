// Own-brand concept studies. The images are authored assets, not client cases.
const studies = {
  identity: {
    image: "/rebrand/assets/showcase-identity.webp",
    title: "Aurora, in print.",
    kind: "01 / BRAND IDENTITY · 자체 시안",
    alt: "진주빛 실크가 인쇄된 오로라 북 커버와 라벤더 명함의 콘셉트 이미지",
    description:
      "화면 속 진주빛을 종이와 인쇄물의 감각으로 옮겼습니다. 표지의 소재, 명함의 색, 타이포그래피가 하나의 인상으로 이어지도록 만든 브랜드 콘셉트입니다.",
  },
  digital: {
    image: "/rebrand/assets/showcase-digital.webp",
    title: "Aura archive.",
    kind: "02 / DIGITAL EXPERIENCE · 콘셉트 시안",
    alt: "빛과 소재를 아카이브하는 AURA 디지털 화면의 콘셉트 이미지",
    description:
      "빛과 소재를 수집하는 가상의 디지털 아카이브입니다. 넓은 여백과 큰 타이포, 한 장의 강한 이미지가 함께 작동하는 화면을 탐구했습니다.",
  },
  material: {
    image: "/rebrand/assets/showcase-material.webp",
    title: "Soft resonance.",
    kind: "03 / VISUAL DIRECTION · 소재 연구",
    alt: "진주빛 유리와 실크의 섬세한 주름을 확대한 비주얼 스터디",
    description:
      "실크의 주름과 유리의 투명함, 빛이 겹치는 순간을 가까이 들여다봅니다. 브랜드의 감각을 사진과 비주얼 콘텐츠로 확장하기 위한 자체 소재 연구입니다.",
  },
};

export function initShowcase({ motionAllowed }) {
  const dialog = document.querySelector("#project-dialog");
  if (!dialog) return;
  const image = dialog.querySelector("#project-dialog-image");
  const title = dialog.querySelector("#project-dialog-title");
  const kind = dialog.querySelector("#project-dialog-kind");
  const description = dialog.querySelector("#project-dialog-description");
  let opener = null;
  document.querySelectorAll("[data-project]").forEach((link) => {
    const visual = link.querySelector(".project-visual");
    link.addEventListener("click", (event) => {
      const study = studies[link.dataset.project];
      // The original image URL remains a working fallback without dialog support.
      if (!study || typeof dialog.showModal !== "function") return;
      event.preventDefault();
      opener = link;
      image.src = study.image;
      image.alt = study.alt;
      title.textContent = study.title;
      kind.textContent = study.kind;
      description.textContent = study.description;
      dialog.showModal();
      dialog.scrollTop = 0;
      document.body.classList.add("project-open");
    });
    visual.addEventListener(
      "pointermove",
      (event) => {
        if (!motionAllowed() || event.pointerType === "touch") return;
        const bounds = visual.getBoundingClientRect();
        visual.style.setProperty(
          "--image-x",
          `${((event.clientX - bounds.left) / bounds.width - 0.5) * -12}px`,
        );
        visual.style.setProperty(
          "--image-y",
          `${((event.clientY - bounds.top) / bounds.height - 0.5) * -12}px`,
        );
      },
      { passive: true },
    );
    visual.addEventListener("pointerleave", () => {
      visual.style.setProperty("--image-x", "0px");
      visual.style.setProperty("--image-y", "0px");
    });
  });
  dialog
    .querySelector(".project-dialog-close")
    .addEventListener("click", () => dialog.close());
  let backdropPressed = false;
  dialog.addEventListener("pointerdown", (event) => {
    backdropPressed = event.target === dialog;
  });
  dialog.addEventListener("click", (event) => {
    if (backdropPressed && event.target === dialog) dialog.close();
    backdropPressed = false;
  });
  dialog.addEventListener("close", () => {
    document.body.classList.remove("project-open");
    if (opener?.isConnected) opener.focus({ preventScroll: true });
  });
}
