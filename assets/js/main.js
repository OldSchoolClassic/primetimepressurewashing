
document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.site-nav');
  const toggle = document.querySelector('.nav-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const closeBtn = document.querySelector('.mobile-close');

  const syncNav = () => {
    if (!nav) return;
    if (window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  syncNav();
  // Performance: rAF-throttled so this runs at most once per frame instead of on every
  // scroll event, which avoids layout thrashing during fast scrolling.
  let navScrollTicking = false;
  window.addEventListener('scroll', () => {
    if (navScrollTicking) return;
    navScrollTicking = true;
    requestAnimationFrame(() => {
      syncNav();
      navScrollTicking = false;
    });
  }, { passive: true });

  const openMobile = () => {
    if (!mobileNav) return;
    mobileNav.classList.add('open');
    document.body.style.overflow = 'hidden';
    if (toggle) toggle.setAttribute('aria-expanded', 'true');
  };
  const closeMobile = () => {
    if (!mobileNav) return;
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
  };

  if (toggle) toggle.addEventListener('click', openMobile);
  if (closeBtn) closeBtn.addEventListener('click', closeMobile);
  if (mobileNav) {
    mobileNav.addEventListener('click', (event) => {
      if (event.target === mobileNav) closeMobile();
    });
    mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMobile));
  }
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMobile();
  });

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealItems.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add('visible'));
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;
      event.preventDefault();
      const offset = nav ? nav.offsetHeight + 18 : 18;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  document.querySelectorAll('[data-share]').forEach((button) => {
    button.addEventListener('click', async () => {
      const payload = {
        title: 'Prime Time Pressure Washing',
        text: 'Check out Prime Time Pressure Washing — free quotes and before/after photos.',
        url: window.location.origin
      };
      if (navigator.share) {
        try {
          await navigator.share(payload);
        } catch (error) {}
      } else {
        try {
          await navigator.clipboard.writeText(payload.url);
          button.textContent = 'Link copied';
          setTimeout(() => { button.textContent = button.dataset.label || 'Share this site'; }, 1800);
        } catch (error) {}
      }
    });
  });

  // Click-to-play video embeds (performance: iframes only load on click)
  document.querySelectorAll('.video-wrap').forEach((wrap) => {
    const btn = wrap.querySelector('.video-play-btn');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const src = wrap.getAttribute('data-src');
      if (!src) return;
      const iframe = document.createElement('iframe');
      iframe.setAttribute('src', src + (src.includes('?') ? '&' : '?') + 'autoplay=1');
      iframe.setAttribute('frameborder', '0');
      iframe.setAttribute('allowfullscreen', '');
      iframe.setAttribute('allow', 'autoplay; encrypted-media; picture-in-picture');
      iframe.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;border:0;border-radius:inherit;';
      wrap.querySelector('.video-poster').replaceWith(iframe);
    });
  });

  // Lead magnet popup (homepage only)
  const leadPopup = document.getElementById('leadPopup');
  if (leadPopup) {
    const LEAD_KEY = 'ptpw_lead_popup_seen';
    const closeBtn = document.getElementById('leadPopupClose');
    const dismissBtn = document.getElementById('leadPopupDismiss');

    const openLeadPopup = () => {
      if (localStorage.getItem(LEAD_KEY)) return;
      leadPopup.classList.add('open');
      leadPopup.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    };
    const closeLeadPopup = () => {
      leadPopup.classList.remove('open');
      leadPopup.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      localStorage.setItem(LEAD_KEY, '1');
    };

    setTimeout(openLeadPopup, 6000);

    if (closeBtn) closeBtn.addEventListener('click', closeLeadPopup);
    if (dismissBtn) dismissBtn.addEventListener('click', closeLeadPopup);
    leadPopup.addEventListener('click', (event) => {
      if (event.target === leadPopup) closeLeadPopup();
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && leadPopup.classList.contains('open')) closeLeadPopup();
    });
    leadPopup.querySelector('form')?.addEventListener('submit', () => {
      localStorage.setItem(LEAD_KEY, '1');
    });
  }
});
