const photoDialog = document.getElementById('photo-dialog');
let photoOpener = null;
const zoomButton = photoDialog.querySelector('[data-photo-zoom]');
const photoViewport = photoDialog.querySelector('.photo-viewport');
const photoImage = photoViewport.querySelector('img');
const zoomHelp = photoDialog.querySelector('[data-zoom-help]');
function resetZoom() {
  photoDialog.classList.remove('is-zoomed');
  photoImage.style.width = '';
  zoomButton.setAttribute('aria-pressed', 'false');
  zoomButton.textContent = '2배 확대';
  zoomHelp.hidden = true;
  photoViewport.scrollTo(0, 0);
}
document.querySelectorAll('[data-photo]').forEach((button) => {
  button.addEventListener('click', () => {
    photoOpener = button;
    photoImage.src = button.dataset.photo;
    photoImage.alt = button.querySelector('img').alt;
    resetZoom();
    document.getElementById('photo-dialog-title').textContent = button.dataset.photoTitle;
    photoDialog.showModal();
  });
});
zoomButton.addEventListener('click', () => {
  if (photoDialog.classList.contains('is-zoomed')) {
    resetZoom();
    return;
  }
  const width = photoImage.getBoundingClientRect().width;
  photoImage.style.width = `${width * 2}px`;
  photoDialog.classList.add('is-zoomed');
  zoomButton.setAttribute('aria-pressed', 'true');
  zoomButton.textContent = '전체 보기';
  zoomHelp.hidden = false;
  photoViewport.focus({ preventScroll: true });
});
photoDialog.addEventListener('close', () => photoOpener?.focus({ preventScroll: true }));

const menuToggle = document.querySelector('[data-menu-toggle]');
const menuLabel = menuToggle.querySelector('[data-menu-label]');
new MutationObserver(() => {
  menuLabel.textContent = menuToggle.getAttribute('aria-expanded') === 'true' ? '닫기' : '메뉴';
}).observe(menuToggle, { attributes: true, attributeFilter: ['aria-expanded'] });

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const destination = document.getElementById(link.hash.slice(1));
    if (!destination) return;
    event.preventDefault();
    closeMenus();
    const title = destination.id === 'hero'
      ? destination.querySelector('button')
      : destination.matches('h1,h2') ? destination : destination.querySelector('h1,h2');
    if (title) {
      if (!title.matches('button,a')) title.setAttribute('tabindex', '-1');
      title.focus({ preventScroll: true });
    }
    if (destination.id === 'hero') window.scrollTo({ top: 0, behavior: motion });
    else destination.scrollIntoView({ behavior: motion, block: 'start' });
    history.replaceState(null, '', link.hash);
  });
});
