(function () {
  "use strict";

  // Detects current language from the URL path.
  // Russian lives at /APS/...  English lives at /APS/en/...
  function currentLang() {
    return /\/en\//.test(window.location.pathname) ? "en" : "ru";
  }

  function switchLanguage() {
    var path = window.location.pathname;
    var newPath;

    if (currentLang() === "en") {
      // /APS/en/foo/bar.html  →  /APS/foo/bar.html
      newPath = path.replace("/en/", "/");
    } else {
      // /APS/foo/bar.html  →  /APS/en/foo/bar.html
      // Insert "en/" after the first path segment (the repo root, e.g. /APS/)
      newPath = path.replace(/^(\/[^\/]+\/)/, "$1en/");
    }

    window.location.href =
      newPath + window.location.search + window.location.hash;
  }

  function addSwitcher() {
    var lang = currentLang();

    var btn = document.createElement("button");
    btn.id = "language-switcher";
    btn.setAttribute(
      "title",
      lang === "ru" ? "Switch to English" : "Переключить на русский"
    );
    btn.setAttribute("aria-label", btn.getAttribute("title"));

    // Flag + label
    var icon = document.createElement("span");
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = lang === "ru" ? "🇬🇧" : "🇷🇺";

    var label = document.createElement("span");
    label.className = "lang-label";
    label.textContent = lang === "ru" ? "EN" : "RU";

    btn.appendChild(icon);
    btn.appendChild(label);
    btn.addEventListener("click", switchLanguage);

    // mdBook places theme/print/search buttons in .right-buttons
    var target = document.querySelector(".right-buttons");
    if (target) {
      target.insertBefore(btn, target.firstChild);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", addSwitcher);
  } else {
    addSwitcher();
  }
})();
