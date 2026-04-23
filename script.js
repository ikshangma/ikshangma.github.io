(function () {
  "use strict";

  // Footer year
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Navbar active section
  var navbar = document.getElementById("site-header");
  var navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  var sections = document.querySelectorAll("section[id]");

  function updateActive() {
    var scrollY = window.scrollY;
    var current = "";
    sections.forEach(function (sec) {
      if (scrollY >= sec.offsetTop - 140) current = sec.id;
    });
    navLinks.forEach(function (a) {
      a.classList.toggle("active", a.getAttribute("href") === "#" + current);
    });
  }

  window.addEventListener("scroll", updateActive, { passive: true });
  updateActive();

  // Mobile toggle
  var toggle = document.getElementById("navToggle");
  var linksEl = document.getElementById("navLinks");

  if (toggle && linksEl) {
    toggle.addEventListener("click", function () {
      var open = linksEl.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open);
    });
    linksEl.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        linksEl.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
    document.addEventListener("click", function (e) {
      if (!navbar.contains(e.target)) {
        linksEl.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Fade-in on scroll
  var fadeEls = document.querySelectorAll(".fade-in");

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -32px 0px" },
    );

    fadeEls.forEach(function (el) {
      io.observe(el);
    });
  } else {
    fadeEls.forEach(function (el) {
      el.classList.add("visible");
    });
  }
})();
