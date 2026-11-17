// Temos perjungiklis (sistema / sviesi / tamsi) - bendras visiems puslapiams; pasirinkimas localStorage "tema".
(function () {
  var mygtukai = document.querySelectorAll(".theme button");
  // Tema keliauja ir adresu: nuorodos i TinyOwl puslapius ir tinymakerwifi.com gauna ?theme=light|dark
  // (sistemos temai - be parametro), kaip tinymakerwifi.com nuorodos i cia (V 2026-11-17).
  function nuorodos(m) {
    document.querySelectorAll("a[href]").forEach(function (a) {
      var h = a.getAttribute("href"), u;
      if (h.charAt(0) === "#") return;
      try { u = new URL(h, location.href); } catch (e) { return; }
      if (u.protocol !== "https:" && u.protocol !== "http:") return;
      if (u.host !== location.host && !/(^|\.)tinymakerwifi\.com$/.test(u.hostname)) return;
      if (/\.(pdf|png|jpe?g|webp|svg|zip)$/i.test(u.pathname)) return;
      if (m === "light" || m === "dark") u.searchParams.set("theme", m);
      else u.searchParams.delete("theme");
      a.href = u.href;
    });
  }
  function rodyk(m) {
    if (m === "light" || m === "dark") document.documentElement.dataset.theme = m;
    else delete document.documentElement.dataset.theme;
    mygtukai.forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.mode === m); });
    nuorodos(m);
  }
  // ?theme=light|dark - is kito domeno atejusi tema (tinymakerwifi.com landingas,
  // V 2026-10-08): localStorage per domenus nepersiduoda, tad tema ateina adresu.
  var dabar = "system";
  try {
    var q = new URLSearchParams(location.search).get("theme");
    if (q === "light" || q === "dark") localStorage.setItem("tema", q);
    dabar = localStorage.getItem("tema") || "system";
  } catch (e) {}
  rodyk(dabar);
  mygtukai.forEach(function (b) {
    b.addEventListener("click", function () {
      try { localStorage.setItem("tema", b.dataset.mode); } catch (e) {}
      rodyk(b.dataset.mode);
    });
  });
})();
