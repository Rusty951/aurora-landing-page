(() => {
  const header = document.querySelector(".site-header");
  const syncHeader = () =>
    header.classList.toggle("is-scrolled", window.scrollY > 120);
  window.addEventListener("scroll", syncHeader, { passive: true });
  syncHeader();
  const tabs = [...document.querySelectorAll("[role=tab]")];
  const mobileTabs = matchMedia("(max-width:760px)");
  const syncOrientation = () =>
    tabs[0].parentElement.setAttribute(
      "aria-orientation",
      mobileTabs.matches ? "horizontal" : "vertical",
    );
  mobileTabs.addEventListener("change", syncOrientation);
  syncOrientation();
  const activate = (tab) => {
    tabs.forEach((item) => {
      const selected = item === tab;
      item.setAttribute("aria-selected", String(selected));
      item.tabIndex = selected ? 0 : -1;
      document.getElementById(item.getAttribute("aria-controls")).hidden =
        !selected;
    });
  };
  document
    .querySelectorAll("[data-practice]")
    .forEach((link) =>
      link.addEventListener("click", () =>
        activate(document.getElementById(link.dataset.practice)),
      ),
    );
  document.querySelectorAll("[data-open-dialog]").forEach((button) =>
    button.addEventListener("click", () => {
      document.getElementById("demo-topic").selectedIndex = tabs.findIndex(
        (tab) => tab.getAttribute("aria-selected") === "true",
      );
    }),
  );
  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => activate(tab));
    tab.addEventListener("keydown", (event) => {
      let target;
      if (event.key === "ArrowDown" || event.key === "ArrowRight")
        target = tabs[(index + 1) % tabs.length];
      if (event.key === "ArrowUp" || event.key === "ArrowLeft")
        target = tabs[(index + tabs.length - 1) % tabs.length];
      if (event.key === "Home") target = tabs[0];
      if (event.key === "End") target = tabs.at(-1);
      if (target) {
        event.preventDefault();
        activate(target);
        target.focus();
      }
    });
  });
})();
