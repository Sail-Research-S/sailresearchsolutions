document.querySelectorAll('.menu-btn').forEach(btn=>btn.addEventListener('click',()=>document.querySelector('.navbar')?.classList.toggle('open')));
document.querySelectorAll('.accordion button').forEach(btn=>btn.addEventListener('click',()=>{const box=btn.closest('.accordion');box.classList.toggle('open');const s=btn.querySelector('[data-symbol]');if(s)s.textContent=box.classList.contains('open')?'−':'+';}));


// Mega/dropdown navigation: main labels reveal; specific items navigate.
document.querySelectorAll('.nav-trigger').forEach(trigger=>{
  trigger.addEventListener('click',e=>{
    e.preventDefault();
    e.stopPropagation();
    const menu=trigger.closest('.nav-menu');
    document.querySelectorAll('.nav-menu.open').forEach(other=>{if(other!==menu){other.classList.remove('open');other.querySelector('.nav-trigger')?.setAttribute('aria-expanded','false')}});
    const open=menu.classList.toggle('open');
    trigger.setAttribute('aria-expanded',open?'true':'false');
  });
});
document.addEventListener('click',e=>{
  if(!e.target.closest('.nav-menu')) document.querySelectorAll('.nav-menu.open').forEach(menu=>{menu.classList.remove('open');menu.querySelector('.nav-trigger')?.setAttribute('aria-expanded','false')});
});
document.addEventListener('keydown',e=>{if(e.key==='Escape')document.querySelectorAll('.nav-menu.open').forEach(menu=>{menu.classList.remove('open');menu.querySelector('.nav-trigger')?.setAttribute('aria-expanded','false')})});

function getStickyNavigationOffset(){
  const navbar=document.querySelector('.navbar');
  let offset=navbar ? navbar.getBoundingClientRect().height : 0;
  const serviceNav=document.querySelector('.service-category-nav');
  if(serviceNav && getComputedStyle(serviceNav).position==='sticky'){
    offset += serviceNav.getBoundingClientRect().height;
  }
  return offset + 18;
}

function positionHashTarget(target,behavior='auto'){
  // Two animation frames allow opened details/accordions to complete layout first.
  requestAnimationFrame(()=>requestAnimationFrame(()=>{
    const top=target.getBoundingClientRect().top + window.scrollY - getStickyNavigationOffset();
    window.scrollTo({top:Math.max(0,top),behavior});
  }));
}

function openHashTarget(behavior='auto'){
  const id=decodeURIComponent(location.hash.replace('#',''));
  if(!id) return;
  const target=document.getElementById(id);
  if(!target) return;

  if(target.matches('details.service-tile')){
    target.open=true;
    document.querySelectorAll('.service-tile.hash-target').forEach(x=>x.classList.remove('hash-target'));
    target.classList.add('hash-target');
  }
  if(target.classList.contains('accordion')){
    target.classList.add('open');
    const s=target.querySelector('[data-symbol]');
    if(s)s.textContent='−';
  }

  positionHashTarget(target,behavior);
}

window.addEventListener('hashchange',()=>openHashTarget('smooth'));
window.addEventListener('DOMContentLoaded',()=>{
  if(location.hash) openHashTarget('auto');
});



// Close dropdowns immediately after selecting a specific item, then navigate.
function closeAllNavMenus(){
  document.querySelectorAll('.nav-menu.open').forEach(menu=>{
    menu.classList.remove('open');
    menu.querySelector('.nav-trigger')?.setAttribute('aria-expanded','false');
  });
  document.querySelector('.navbar')?.classList.remove('open');
}

document.querySelectorAll('.nav-menu a:not(.nav-trigger)').forEach(link=>{
  link.addEventListener('click',e=>{
    const rawHref=link.getAttribute('href')||'';
    closeAllNavMenus();

    if(rawHref.startsWith('#')){
      e.preventDefault();
      history.pushState(null,'',rawHref);
      openHashTarget('smooth');
      return;
    }

    try{
      const destination=new URL(link.href,location.href);
      const current=new URL(location.href);
      if(destination.pathname===current.pathname && destination.hash){
        e.preventDefault();
        history.pushState(null,'',destination.hash);
        openHashTarget('smooth');
      }
    }catch(_){ }
  });
});


// Mark the relevant top-level menu for the current page.
(()=>{const file=(location.pathname.split('/').pop()||'index.html').toLowerCase();if(file==='services.html')document.querySelector('.nav-menu-services>.nav-trigger')?.classList.add('current');if(file==='publication.html')document.querySelector('.publication-dropdown')?.closest('.nav-menu')?.querySelector('.nav-trigger')?.classList.add('current');if(file==='resources.html')document.querySelector('.resources-dropdown')?.closest('.nav-menu')?.querySelector('.nav-trigger')?.classList.add('current');})();
