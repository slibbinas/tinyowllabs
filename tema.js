// Temos perjungiklis (sistema / sviesi / tamsi) - bendras visiems puslapiams; pasirinkimas localStorage "tema".
(function () {
  var mygtukai = document.querySelectorAll(".theme button");
  function rodyk(m) {
    if (m === "light" || m === "dark") document.documentElement.dataset.theme = m;
    else delete document.documentElement.dataset.theme;
    mygtukai.forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.mode === m); });
  }
  var dabar = "system";
  try { dabar = localStorage.getItem("tema") || "system"; } catch (e) {}
  rodyk(dabar);
  mygtukai.forEach(function (b) {
    b.addEventListener("click", function () {
      try { localStorage.setItem("tema", b.dataset.mode); } catch (e) {}
      rodyk(b.dataset.mode);
    });
  });
})();
