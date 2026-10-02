const topicStrip = document.getElementById("service-strip");
const topicFigures = [...topicStrip.querySelectorAll("figure")];
const topicInfo = document.querySelector(".service-info");
const topicDetails = [
  ["Living Room Lighting", "모이는 시간과 쉬는 시간이 겹치는 공간. 여러 활동에 맞춰 빛을 나누어 생각합니다."],
  ["Bedroom Lighting", "잠들기 전의 독서와 휴식. 눈부심과 손이 닿는 스위치 위치를 함께 살펴봅니다."],
  ["Task Lighting", "책상 위의 빛과 주변 밝기를 함께 확인해 집중하는 장면을 계획합니다."],
  ["Dining Lighting", "식탁의 크기와 앉는 위치를 기준으로 조명의 높이와 간격, 눈부심을 살펴봅니다."],
  ["Accent Lighting", "좋아하는 물건과 재료를 비추는 작은 빛으로 공간의 깊이를 살펴봅니다."],
  ["Supplementary Lighting", "천장등만으로 부족한 자리에 스탠드를 더하고 전원 위치와 이동 동선을 확인합니다."]
];
let selectedTopic = 0;
const selectTopic = (index) => {
  selectedTopic = Math.max(0, Math.min(index, topicFigures.length - 1));
  topicFigures.forEach((figure, i) => figure.querySelector("button").setAttribute("aria-pressed", String(i === selectedTopic)));
  const selected = topicFigures[selectedTopic];
  topicInfo.querySelector("h3").textContent = selected.querySelector("figcaption").textContent;
  topicInfo.querySelector("span").textContent = topicDetails[selectedTopic][0];
  topicInfo.querySelector("p").textContent = topicDetails[selectedTopic][1];
  document.querySelector('[data-topic-step="-1"]').disabled = selectedTopic === 0;
  document.querySelector('[data-topic-step="1"]').disabled = selectedTopic === topicFigures.length - 1;
  topicStrip.scrollTo({left: selected.offsetLeft - topicFigures[0].offsetLeft, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"});
};
topicFigures.forEach((figure, index) => {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "topic-select";
  button.setAttribute("aria-label", figure.querySelector("figcaption").textContent + " 설명 보기");
  button.append(figure.querySelector("img"));
  figure.prepend(button);
  button.addEventListener("click", () => selectTopic(index));
});
topicInfo.querySelector("h3").parentElement.setAttribute("aria-live", "polite");
document.querySelectorAll("[data-topic-step]").forEach(button => button.addEventListener("click", () => selectTopic(selectedTopic + Number(button.dataset.topicStep))));
selectTopic(0);
