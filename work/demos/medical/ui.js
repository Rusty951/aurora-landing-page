document.querySelectorAll("[data-tabs]").forEach((group) => {
  const tabs = [...group.querySelectorAll('[role="tab"]')];
  const select = (tab) => {
    tabs.forEach((item) => {
      const active = item === tab;
      item.setAttribute("aria-selected", String(active));
      item.tabIndex = active ? 0 : -1;
      document.getElementById(item.getAttribute("aria-controls")).hidden =
        !active;
    });
  };
  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => select(tab));
    tab.addEventListener("keydown", (event) => {
      let next = index;
      if (event.key === "ArrowRight" || event.key === "ArrowDown")
        next = (index + 1) % tabs.length;
      else if (event.key === "ArrowLeft" || event.key === "ArrowUp")
        next = (index - 1 + tabs.length) % tabs.length;
      else if (event.key === "Home") next = 0;
      else if (event.key === "End") next = tabs.length - 1;
      else return;
      event.preventDefault();
      select(tabs[next]);
      tabs[next].focus();
    });
  });
});
document.querySelectorAll("[data-region-target]").forEach((link) => {
  link.addEventListener("click", () => {
    document.getElementById(link.dataset.regionTarget)?.click();
  });
});
document.querySelectorAll("[data-checklist]").forEach((list) => {
  const items = [...list.querySelectorAll('input[type="checkbox"]')];
  const status = list.querySelector('[role="status"]');
  const update = () => {
    status.textContent = `준비 항목 ${items.filter((item) => item.checked).length}/${items.length} 확인`;
  };
  items.forEach((item) => item.addEventListener("change", update));
  update();
});
document.querySelectorAll("[data-reading]").forEach((button) =>
  button.addEventListener("click", () => {
    if (button.dataset.reading === "large") {
      document.body.style.setProperty("--reading-size", "20px");
    } else {
      document.body.style.removeProperty("--reading-size");
    }
    document
      .querySelectorAll("[data-reading]")
      .forEach((item) =>
        item.setAttribute("aria-pressed", String(item === button)),
      );
  }),
);
document.querySelectorAll("[data-demo-form]").forEach((form) =>
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const result = form.parentElement.querySelector(".demo-result");
    result.hidden = false;
    const choice = form.querySelector("select").selectedIndex;
    let content;
    if (choice === 1) {
      content = [...document.querySelectorAll("#visit .hours > div")]
        .map((row) => row.textContent.trim().replace(/\s+/g, " "))
        .join(" · ");
    } else if (choice === 2) {
      content =
        "진료 정보는 본문의 안내와 참고 자료에서 확인해 주세요. 개인에게 맞는 진단과 계획은 실제 의료기관에서 평가해야 합니다.";
    } else {
      const preparations = [
        ...document.querySelectorAll(
          "[data-checklist] label, #prepare article h3",
        ),
      ].map((item) => item.textContent.trim());
      content = preparations.length
        ? preparations.join(" · ")
        : "기존 진료 기록과 복용 중인 약, 궁금한 점을 정리해 주세요. 개인별 준비 사항은 실제 방문기관에 확인해 주세요.";
    }
    result.textContent =
      content + " — 가상 안내입니다. 예약·상담은 접수되지 않았습니다.";
  }),
);
document.querySelectorAll("[data-demo]").forEach((button) =>
  button.addEventListener("click", () => {
    const result = document.querySelector("#demo-dialog .demo-result");
    if (result) result.hidden = true;
  }),
);
const zooms = [...document.querySelectorAll("[data-zoom]")];
if (zooms.length) {
  const dialog = document.createElement("dialog");
  dialog.className = "image-dialog";
  dialog.setAttribute("aria-label", "이미지 크게 보기");
  const img = document.createElement("img");
  img.src = zooms[0].querySelector("img").src;
  img.alt = zooms[0].querySelector("img").alt;
  const note = document.createElement("p");
  note.textContent =
    "연출용 스톡 이미지입니다. 실제 의료진·환자·시설 또는 치료 결과를 나타내지 않습니다.";
  const close = document.createElement("button");
  close.dataset.closeDialog = "";
  close.textContent = "닫기";
  dialog.append(img, note, close);
  document.body.append(dialog);
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
  zooms.forEach((button) =>
    button.addEventListener("click", () => {
      const source = button.querySelector("img");
      img.src = source.src;
      img.alt = source.alt;
      dialog.showModal();
    }),
  );
}
