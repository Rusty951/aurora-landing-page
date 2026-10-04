const stories = {
  listening: {
    category: '01 / 음악 읽기', title: '다시 듣고 싶은 한 곡',
    image: 'assets/listening-korean-v15.jpg', width: 1200, height: 800,
    alt: '창가에서 헤드폰으로 음악을 듣는 한국인 설정의 가상 인물',
    lead: '좋았던 곡을 다시 찾고 싶을 때, 제목과 구간, 한 장면을 남겨두는 듣기 노트.',
    intro: '음악을 다 듣고 나면 곡의 이름과 다시 듣고 싶은 지점을 남겨봅니다. 메모의 모양을 미리 정해두면 나중에 같은 곡을 찾아 꺼낼 때도 도움이 됩니다.',
    sections: [
      { title: '곡과 음악가를 함께', text: '첫 줄에는 곡 제목과 음악가를 적습니다. 같은 제목의 곡이나 여러 버전이 있다면 앨범 이름도 보태세요. 제목이 길 때는 재생 화면을 개인 기록으로 보관하는 방법도 있습니다.' },
      { title: '돌아가고 싶은 구간', text: '둘째 줄에는 다시 듣고 싶은 구간을 남깁니다. 재생 시간을 적거나, 도입부의 소리와 후렴이 시작되는 지점처럼 구별하기 쉬운 단서를 써두세요. 곡 전체의 감상과 한 구간의 메모를 나누면 다시 찾기 편합니다.' },
      { title: '남은 장면 한 줄', text: '마지막 줄에는 그 구간에서 무엇을 다시 듣고 싶었는지 적습니다. 악기 이름을 정확히 몰라도 괜찮습니다. 처음 들린 낮은 소리처럼 자신의 말로 남긴 표현도 단서가 됩니다.' }
    ],
    ending: '메모를 다시 펼쳤다면 남겨둔 구간을 한 번 더 들어보세요. 처음과 다른 부분이 귀에 들어온다면 한 줄을 보탭니다. 한 곡을 여러 번 듣는 기록은 그렇게 조금씩 늘어납니다.'
  },
  craft: {
    category: '02 / 손작업, 짧은 기록', title: '완성 전에 남긴 조각',
    image: 'assets/pottery-korean-v15.jpg', width: 1100, height: 1374,
    alt: '작업대에서 작은 도자기 시편에 재료를 바르는 한국인 설정의 가상 인물',
    lead: '작업대의 작은 시편을 나란히 놓고, 표면과 색의 차이를 메모하는 짧은 기록.',
    intro: '작은 시험 조각은 다음 작업을 위한 단서가 됩니다. 여러 조각을 모았다면 번호를 붙이고, 재료의 이름과 작업한 순서를 함께 적어둡니다.',
    sections: [
      { title: '같은 빛, 같은 방향', text: '표면을 비교할 때는 비슷한 빛 아래에서 같은 방향으로 사진을 남겨보세요. 앞면만으로 구별하기 어렵다면 뒷면의 번호도 함께 찍습니다.' }
    ],
    ending: '사진 옆에는 눈에 띈 색과 표면, 다음에 비교할 부분을 한두 줄 남깁니다. 작은 조각과 메모를 함께 보관하면 다음 작업에서 다시 찾아보기 좋습니다.'
  }
};
const storyDialog = document.getElementById('story-dialog');
let storyOpener = null;
document.querySelectorAll('[data-story]').forEach((button) => {
  button.addEventListener('click', () => {
    const story = stories[button.dataset.story];
    storyOpener = button;
    storyDialog.querySelector('[data-story-category]').textContent = story.category;
    document.getElementById('story-dialog-title').textContent = story.title;
    const body = storyDialog.querySelector('[data-story-body]');
    body.replaceChildren();
    const lead = document.createElement('p'); lead.className = 'story-lead'; lead.textContent = story.lead; body.append(lead);
    const image = document.createElement('img'); image.src = story.image; image.alt = story.alt; image.width = story.width; image.height = story.height; image.className = 'reading-photo'; body.append(image);
    const intro = document.createElement('p'); intro.textContent = story.intro; body.append(intro);
    story.sections.forEach((section) => {
      const h = document.createElement('h3'); h.textContent = section.title;
      const p = document.createElement('p'); p.textContent = section.text; body.append(h, p);
    });
    const ending = document.createElement('p'); ending.className = 'story-ending'; ending.textContent = story.ending; body.append(ending);
    storyDialog.showModal(); storyDialog.scrollTop = 0;
  });
});
storyDialog.addEventListener('close', () => storyOpener?.focus({ preventScroll: true }));
