(function () {
  "use strict";

  /* ---------- email links (assembled here so spam bots can't read them) ---------- */
  document.querySelectorAll("[data-user][data-domain]").forEach(function (el) {
    var addr = el.getAttribute("data-user") + "@" + el.getAttribute("data-domain");
    el.setAttribute("href", "mailto:" + addr);
    el.textContent = addr;
  });

  /* ---------- home: a row of images, swapped one frame at a time in a staggered rotation ---------- */
  var frames = document.querySelectorAll(".home-frame");
  var pics = window.HOME_IMAGES || [];
  if (frames.length && pics.length > frames.length) {
    var STEP = 1600; // ms between swaps; each fade takes 1.4 s, so one is almost always in motion
    var showing = [];
    for (var f = 0; f < frames.length; f++) showing.push(f);
    var next = frames.length;
    var side = 0;

    var place = function (frame, idx, fade) {
      var img = new Image();
      img.src = "images/home/" + pics[idx].file;
      img.alt = pics[idx].alt;
      if (fade) img.className = "is-hidden";
      frame.appendChild(img);
      var old = frame.querySelectorAll("img");
      var reveal = function () {
        requestAnimationFrame(function () {
          img.classList.remove("is-hidden");
          setTimeout(function () {
            old.forEach(function (o) { if (o !== img) o.remove(); });
          }, 1500);
        });
      };
      if (img.complete) reveal(); else img.onload = reveal;
    };

    frames.forEach(function (fr, i) { place(fr, i, false); });

    setInterval(function () {
      if (document.hidden) return;
      while (showing.indexOf(next) !== -1) next = (next + 1) % pics.length;
      showing[side] = next;
      place(frames[side], next, true);
      next = (next + 1) % pics.length;
      side = (side + 1) % frames.length;
    }, STEP);
  }

  /* ---------- work: grids + enlarged view ---------- */
  var works = window.WORKS || [];
  var viewer = document.getElementById("viewer");
  if (!viewer) return;

  var fig = viewer.querySelector(".viewer-figure img");
  var caption = viewer.querySelector(".viewer-caption");
  var views = viewer.querySelector(".viewer-views");
  var current = 0;
  var view = 0;
  var opener = null;

  ["sculptural", "functional"].forEach(function (cat) {
    var list = document.getElementById("grid-" + cat);
    if (!list) return;
    works.forEach(function (w, i) {
      if (w.category !== cat) return;
      var li = document.createElement("li");
      var b = document.createElement("button");
      b.type = "button";
      b.className = "tile";
      b.setAttribute("aria-label", "Open larger view: " + w.alt);
      var img = document.createElement("img");
      img.src = "images/thumbs/" + w.images[0];
      img.alt = "";
      img.loading = "lazy";
      img.width = 800;
      img.height = 800;
      b.appendChild(img);
      b.addEventListener("click", function () { opener = b; open(i); });
      li.appendChild(b);
      list.appendChild(li);
    });
  });

  var order = works.map(function (_, i) { return i; });

  function show() {
    var w = works[current];
    fig.src = "images/large/" + w.images[view];
    fig.alt = w.alt + (w.images.length > 1 ? " (view " + (view + 1) + " of " + w.images.length + ")" : "");

    caption.innerHTML = "";
    [["Year", w.year], ["Material", w.material], ["Size", w.size]].forEach(function (row) {
      if (!row[1]) return;
      var dt = document.createElement("dt");
      dt.textContent = row[0];
      var dd = document.createElement("dd");
      dd.textContent = row[1];
      caption.appendChild(dt);
      caption.appendChild(dd);
    });

    views.innerHTML = "";
    if (w.images.length > 1) {
      w.images.forEach(function (f, n) {
        var b = document.createElement("button");
        b.type = "button";
        b.setAttribute("aria-label", "View " + (n + 1));
        b.setAttribute("aria-pressed", n === view ? "true" : "false");
        var t = document.createElement("img");
        t.src = "images/thumbs/" + f;
        t.alt = "";
        b.appendChild(t);
        b.addEventListener("click", function () { view = n; show(); });
        views.appendChild(b);
      });
    }
  }

  function open(i) {
    current = i;
    view = 0;
    show();
    if (typeof viewer.showModal === "function") viewer.showModal();
    else viewer.setAttribute("open", "");
    viewer.querySelector(".viewer-close").focus();
  }

  function step(d) {
    var pos = order.indexOf(current);
    current = order[(pos + d + order.length) % order.length];
    view = 0;
    show();
  }

  function close() {
    if (typeof viewer.close === "function") viewer.close();
    else viewer.removeAttribute("open");
  }

  viewer.addEventListener("close", function () { if (opener) opener.focus(); });
  viewer.querySelector(".viewer-close").addEventListener("click", close);
  viewer.querySelector("[data-step='-1']").addEventListener("click", function () { step(-1); });
  viewer.querySelector("[data-step='1']").addEventListener("click", function () { step(1); });
  viewer.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") step(1);
    if (e.key === "ArrowLeft") step(-1);
  });
  viewer.addEventListener("click", function (e) { if (e.target === viewer) close(); });
})();
