
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


/* Mobile navigation fix */
(function(){
  function ready(fn){
    if(document.readyState !== "loading"){ fn(); }
    else{ document.addEventListener("DOMContentLoaded", fn); }
  }

  ready(function(){
    var toggles = Array.prototype.slice.call(document.querySelectorAll(
      ".nav-toggle, .menu-toggle, .hamburger, button[aria-label*='menu' i], button[aria-label*='navigation' i]"
    ));

    var nav = document.querySelector(".nav-links") ||
              document.querySelector(".primary-nav") ||
              document.querySelector(".main-nav") ||
              document.querySelector(".menu");

    if(!toggles.length || !nav){ return; }

    function openMenu(){
      nav.classList.add("open");
      nav.classList.add("active");
      document.body.classList.add("mobile-menu-open");
      toggles.forEach(function(btn){
        btn.classList.add("active");
        btn.setAttribute("aria-expanded", "true");
      });
    }

    function closeMenu(){
      nav.classList.remove("open");
      nav.classList.remove("active");
      document.body.classList.remove("mobile-menu-open");
      toggles.forEach(function(btn){
        btn.classList.remove("active");
        btn.setAttribute("aria-expanded", "false");
      });
    }

    function toggleMenu(event){
      if(event){
        event.preventDefault();
        event.stopPropagation();
      }
      if(document.body.classList.contains("mobile-menu-open")){
        closeMenu();
      }else{
        openMenu();
      }
    }

    toggles.forEach(function(btn){
      btn.setAttribute("type", "button");
      btn.setAttribute("aria-expanded", "false");
      btn.addEventListener("click", toggleMenu, true);
      btn.addEventListener("touchend", toggleMenu, true);
    });

    nav.querySelectorAll("a").forEach(function(link){
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", function(event){
      if(!document.body.classList.contains("mobile-menu-open")){ return; }
      var clickedToggle = toggles.some(function(btn){ return btn.contains(event.target); });
      if(!nav.contains(event.target) && !clickedToggle){
        closeMenu();
      }
    });

    document.addEventListener("keydown", function(event){
      if(event.key === "Escape"){ closeMenu(); }
    });

    window.addEventListener("resize", function(){
      if(window.innerWidth > 900){ closeMenu(); }
    });
  });
})();
