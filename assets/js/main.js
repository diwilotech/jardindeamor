/* Fundación Jardín de Amor — comportamiento compartido del sitio */
(function () {
  "use strict";

  var progressBar = document.getElementById("scrollProgress");
  var navbar = document.getElementById("mainNavbar");
  var backToTop = document.getElementById("backToTop");

  function updateProgress() {
    if (!progressBar) return;
    var h = document.documentElement;
    var max = h.scrollHeight - h.clientHeight;
    var pct = max > 0 ? (h.scrollTop / max) * 100 : 0;
    progressBar.style.width = pct + "%";
  }

  function updateNavbar() {
    if (!navbar) return;
    navbar.classList.toggle("navbar-scrolled", window.scrollY > 30);
  }

  function updateBackToTop() {
    if (!backToTop) return;
    backToTop.classList.toggle("show", window.scrollY > 500);
  }

  window.addEventListener(
    "scroll",
    function () {
      updateProgress();
      updateNavbar();
      updateBackToTop();
    },
    { passive: true }
  );
  updateProgress();
  updateNavbar();
  updateBackToTop();

  if (backToTop) {
    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Revelado de secciones al hacer scroll (con red de seguridad: el
  // contenido nunca debe quedar invisible si algo falla en el navegador)
  var reveals = document.querySelectorAll(".reveal");
  function revealAll() {
    reveals.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }
  try {
    if ("IntersectionObserver" in window && reveals.length) {
      var revealObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
      );
      reveals.forEach(function (el) {
        revealObserver.observe(el);
      });
      // Red de seguridad: si algún elemento nunca llega a intersecar
      // (anclas directas, navegadores atípicos, etc.), se revela solo.
      setTimeout(revealAll, 4000);
    } else {
      revealAll();
    }
  } catch (e) {
    revealAll();
  }

  // Contadores animados de impacto
  function animateCounter(el) {
    var target = parseFloat(el.getAttribute("data-count"));
    var decimals = el.getAttribute("data-decimals") ? parseInt(el.getAttribute("data-decimals"), 10) : 0;
    var suffix = el.getAttribute("data-suffix") || "";
    var duration = 1400;
    var start = null;

    function step(ts) {
      if (!start) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var value = target * eased;
      el.textContent =
        value.toLocaleString("es-CO", {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        }) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  var counters = document.querySelectorAll(".counter[data-count]");
  if ("IntersectionObserver" in window && counters.length) {
    var counterObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach(function (el) {
      counterObserver.observe(el);
    });
  } else {
    counters.forEach(function (el) {
      var suffix = el.getAttribute("data-suffix") || "";
      el.textContent = el.getAttribute("data-count") + suffix;
    });
  }

  // Calculadora de impacto de donación
  window.actualizarImpacto = function (valor) {
    var montoLabel = document.getElementById("montoLabel");
    if (montoLabel) montoLabel.textContent = Number(valor).toLocaleString("es-CO");
    var raciones = Math.round(valor / 5000);
    var kits = Math.max(1, Math.round(valor / 16666));
    var racionesLabel = document.getElementById("racionesLabel");
    var kitsLabel = document.getElementById("kitsLabel");
    if (racionesLabel) racionesLabel.textContent = raciones;
    if (kitsLabel) kitsLabel.textContent = kits;
  };

  // Copiar número de cuenta bancaria
  window.copiarCuenta = function (btn) {
    var numero = "002-102188-07";
    var finish = function () {
      var original = btn.innerHTML;
      btn.innerHTML = "✓ Copiado";
      setTimeout(function () {
        btn.innerHTML = original;
      }, 1800);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(numero).then(finish, finish);
    } else {
      finish();
    }
  };
})();
