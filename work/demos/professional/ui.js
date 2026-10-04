(() => {
  const menu = document.querySelector(".main-nav");
  const toggle = document.querySelector(".menu-toggle");
  const shade = document.querySelector(".menu-shade");
  const closeMenu = (restore = true) => {
    if (!menu?.classList.contains("is-open")) return;
    menu.classList.remove("is-open");
    toggle.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.textContent = "메뉴";
    shade.hidden = true;
    document.body.style.overflow = "";
    if (restore) toggle.focus();
  };
  toggle?.addEventListener("click", () => {
    if (menu.classList.contains("is-open")) return closeMenu();
    menu.classList.add("is-open");
    toggle.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.textContent = "닫기";
    shade.hidden = false;
    document.body.style.overflow = "hidden";
    menu.querySelector("a")?.focus();
  });
  shade?.addEventListener("click", () => closeMenu());
  menu?.querySelectorAll("a").forEach((link) =>
    link.addEventListener("click", () => {
      closeMenu(false);
      const target = document.querySelector(link.hash);
      if (target) {
        target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      }
    }),
  );
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
    if (event.key !== "Tab" || !menu?.classList.contains("is-open")) return;
    const links = [...menu.querySelectorAll("a")],
      first = links[0],
      last = links.at(-1);
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      toggle.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      toggle.focus();
    } else if (document.activeElement === toggle) {
      event.preventDefault();
      (event.shiftKey ? last : first).focus();
    }
  });
  matchMedia("(min-width:761px)").addEventListener("change", (event) => {
    if (event.matches) closeMenu(false);
  });
  document.querySelectorAll("[data-open-dialog]").forEach((button) =>
    button.addEventListener("click", () => {
      const dialog = document.getElementById(button.dataset.openDialog);
      dialog.dataset.opener = button.id;
      dialog.querySelector("[role=status]").hidden = true;
      dialog.querySelector("[data-demo-submit]").hidden = false;
      dialog.showModal();
    }),
  );
  document.querySelectorAll("dialog").forEach((dialog) => {
    dialog
      .querySelector("[data-close-dialog]")
      .addEventListener("click", () => dialog.close());
    dialog.addEventListener("close", () =>
      document.getElementById(dialog.dataset.opener)?.focus(),
    );
    dialog
      .querySelector("[data-demo-submit]")
      .addEventListener("click", (event) => {
        const status = dialog.querySelector("[role=status]");
        const chosen = dialog.querySelector("select");
        status.textContent = `${chosen.options[chosen.selectedIndex].text} 안내 시연이 끝났습니다. 실제 상담은 접수되지 않았으며 선택한 내용은 전송, 저장되지 않습니다.`;
        status.hidden = false;
        event.currentTarget.hidden = true;
        status.focus();
      });
  });
  document.querySelectorAll("[data-checklist]").forEach((list) => {
    const output = document.getElementById(list.dataset.checklist);
    const inputs = [...list.querySelectorAll("input")];
    const update = () => {
      output.textContent = `${inputs.filter((input) => input.checked).length} / ${inputs.length} 확인`;
    };
    list.addEventListener("change", update);
    update();
  });
})();
