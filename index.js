const bodyEl = document.querySelector('body');
const hamburgerIconEl = document.getElementById('hamburger-icon');
const overlayEl = document.getElementById('overlay');
const navItemEl = document.querySelector('.nav');
const navItemsEl = Array.from(navItemEl.querySelectorAll('.nav__item'));

function animateNavItem(directionToRemove, directionToAdd) {
  function animate({ baseDelayTime, delayTimeMultiplier, navItemsElToProcess }) {
    navItemsElToProcess.forEach((navItemEl, index) => {
      const nthEl = index + 1;
      const animationDelay = baseDelayTime * (delayTimeMultiplier * nthEl);
      navItemEl.style.animationDelay = `${animationDelay}ms`;
      navItemEl.classList.replace(`nav__item--slide-${directionToRemove}`, `nav__item--slide-${directionToAdd}`);
    })
  }

  const isAnimateIn = directionToAdd === 'in';
  if (isAnimateIn) {
    animate({ baseDelayTime: 200, delayTimeMultiplier: 2, navItemsElToProcess: navItemsEl });
  } else {
    const navItemsElToProcess = [...navItemsEl].reverse();
    animate({ baseDelayTime: 100, delayTimeMultiplier: 1, navItemsElToProcess });
  }
}

function animateHamburgerIcon() {
  hamburgerIconEl.classList.toggle('hamburger-icon--state_close-menu');
}

function toggleBodyElScrollbar(overflowValue) {
  bodyEl.style.overflow = overflowValue;
}

function slideOverlay() {
  if (overlayEl.classList.contains('overlay--slide_left')) {
    overlayEl.classList.replace('overlay--slide_left', 'overlay--slide_right');
    animateNavItem('out', 'in');
    toggleBodyElScrollbar('hidden');
  } else {
    overlayEl.classList.replace('overlay--slide_right', 'overlay--slide_left');
    animateNavItem('in', 'out')
    toggleBodyElScrollbar('auto');
  }
}

function toggleNav() {
  animateHamburgerIcon();
  slideOverlay();
}

hamburgerIconEl.addEventListener('click', toggleNav);
navItemsEl.forEach((navItemEl) => {
  navItemEl.addEventListener('click', toggleNav);
});
