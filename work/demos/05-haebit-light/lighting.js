const rooms = {
  living: { image: 'assets/living-light-v20.webp', alt: '거실 의자 옆에 놓인 보조 조명 연출 사진', type: '보조 조명', title: '거실의 읽는 자리', name: '거실', description: '소파나 의자에 앉아 읽는 자리를 먼저 정합니다. 천장등과 보조등의 조합, 앉은 위치의 눈부심을 함께 살펴보세요.', position: '의자와 조명, 전원 사이의 거리', check: '앉는 위치의 눈부심과 통로' },
  dining: { image: 'assets/dining-light-v20.webp', alt: '식탁 위에 배치한 선형 펜던트등의 연출 사진', type: '식탁 조명', title: '식탁 위에 놓는 빛', name: '식탁', description: '식탁의 크기와 앉는 위치를 기준으로 기구와 배치를 살펴봅니다. 식탁면과 주변 밝기, 눈부심을 함께 확인하세요.', position: '식탁의 중심과 조명의 위치', check: '앉은 자리의 시야와 눈부심' },
  bedroom: { image: 'assets/bedroom-light-v20.webp', alt: '침대와 협탁, 켜진 보조등이 함께 보이는 침실 연출 사진', type: '침실 보조 조명', title: '침대 옆의 작은 조명', name: '침실', description: '잠들기 전 책을 읽거나 쉬는 자리를 생각합니다. 베개와 조명 사이의 위치, 손이 닿는 스위치를 살펴보세요.', position: '침대와 협탁, 조명의 위치', check: '조작하기 편한 위치와 눈부심' }
};
document.querySelectorAll('[data-room]').forEach((button) => {
  button.addEventListener('click', () => {
    const room = rooms[button.dataset.room];
    const image = document.getElementById('room-image'); image.src = room.image; image.alt = room.alt;
    document.getElementById('room-type').textContent = room.type;
    document.getElementById('room-title').textContent = room.title;
    document.getElementById('room-description').textContent = room.description;
    document.getElementById('room-position').textContent = room.position;
    document.getElementById('room-check').textContent = room.check;
    document.getElementById('room-consult').dataset.detail = '현재 선택한 공간: ' + room.name;
    document.getElementById('room-consult').textContent = room.name + ' 상담 준비 ↗';
    document.querySelectorAll('[data-room]').forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
  });
});
