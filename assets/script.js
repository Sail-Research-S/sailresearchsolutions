
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.navlinks');
if(toggle && nav){
  toggle.addEventListener('click', () => nav.classList.toggle('open'));
}
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if(target){
      e.preventDefault();
      target.scrollIntoView({behavior:'smooth'});
      if(nav) nav.classList.remove('open');
    }
  });
});


// Modern top navigation mobile toggle
const modernMenuToggle = document.querySelector('.menu-toggle');
const modernMainNav = document.querySelector('.main-nav');
if(modernMenuToggle && modernMainNav){
  modernMenuToggle.addEventListener('click', () => {
    modernMainNav.classList.toggle('open');
  });
}


// Premium polish nav toggle
const premiumMenuToggle = document.querySelector('.menu-toggle');
const premiumMainNav = document.querySelector('.main-nav');
if(premiumMenuToggle && premiumMainNav){
  premiumMenuToggle.addEventListener('click', () => {
    premiumMainNav.classList.toggle('open');
  });
}
