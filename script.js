A(function () {
  'use strict';

  var hamburger = document.getElementById('hamburger');
  var navLinks = document.getElementById('navLinks');
  var backToTop = document.getElementById('backToTop');
  var navbar = document.getElementById('navbar');
  var contactForm = document.getElementById('contactForm');
  var sections = document.querySelectorAll('section[id]');
  var navItems = document.querySelectorAll('.nav-link');

  function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  }

  function closeMobileMenu() {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
  }

  if (hamburger) {
    hamburger.addEventListener('click', toggleMobileMenu);
  }

  navItems.forEach(function (item) {
    item.addEventListener('click', closeMobileMenu);
  });

  function handleScroll() {
    var scrollY = window.scrollY;

    if (scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }

    if (scrollY > 50) {
      navbar.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08)';
    } else {
      navbar.style.boxShadow = 'none';
    }

    var current = '';
    sections.forEach(function (section) {
      var sectionTop = section.offsetTop - 100;
      if (scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navItems.forEach(function (link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', handleScroll);

  backToTop.addEventListener('click', function (e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = contactForm.querySelector('button[type="submit"]');
      var originalText = btn.textContent;
      btn.textContent = 'Message Sent!';
      btn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
      btn.style.boxShadow = '0 4px 14px rgba(34, 197, 94, 0.4)';
      btn.disabled = true;

      setTimeout(function () {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.style.boxShadow = '';
        btn.disabled = false;
        contactForm.reset();
      }, 3000);
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var offset = target.offsetTop - 70;
        window.scrollTo({ top: offset, behavior: 'smooth' });
      }
    });
  });
})();