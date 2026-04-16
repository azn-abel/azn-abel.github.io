/* ══════════════════════════════════════
   Spotify Now Playing — Script
   ══════════════════════════════════════ */

(function () {
  "use strict";

  const ENDPOINT = "https://calm-firefly-0910.aluprof4.workers.dev/";

  const POLL_INTERVAL = 10000; // 10 seconds

  const container = document.getElementById("now-playing");

  // ── SVG helpers ──

  function makeSpotifyIcon() {
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "sp-icon");
    svg.setAttribute("width", "21");
    svg.setAttribute("height", "21");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("fill", "#1db954");
    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute(
      "d",
      "M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm5.521 " +
        "17.34a.75.75 0 01-1.03.25c-2.82-1.724-6.37-2.114-10.554-1.158a.749.749 0 11-.334" +
        "-1.462c4.576-1.046 8.504-.596 11.668 1.34a.748.748 0 01.25 1.03zm1.474-3.267a.934" +
        ".934 0 01-1.287.308c-3.225-1.982-8.142-2.557-11.958-1.399a.934.934 0 11-.542-1.79" +
        "c4.354-1.322 9.776-.682 13.48 1.595.44.27.578.846.307 1.286zm.127-3.403C15.688 " +
        "8.554 9.117 8.337 5.315 9.493a1.12 1.12 0 11-.65-2.143c4.37-1.327 11.63-1.07 " +
        "16.216 1.605a1.12 1.12 0 01-.39 2.116z",
    );
    svg.appendChild(path);
    return svg;
  }

  function makePlayPlaceholder() {
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "24");
    svg.setAttribute("height", "24");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("fill", "none");
    svg.setAttribute("stroke", "#52525b");
    svg.setAttribute("stroke-width", "1.5");
    var circle = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle",
    );
    circle.setAttribute("cx", "12");
    circle.setAttribute("cy", "12");
    circle.setAttribute("r", "10");
    var polygon = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "polygon",
    );
    polygon.setAttribute("points", "10,8 16,12 10,16");
    polygon.setAttribute("fill", "#52525b");
    polygon.setAttribute("stroke", "none");
    svg.appendChild(circle);
    svg.appendChild(polygon);
    return svg;
  }

  function makeEq() {
    var eq = document.createElement("span");
    eq.className = "eq";
    eq.appendChild(document.createElement("span"));
    eq.appendChild(document.createElement("span"));
    eq.appendChild(document.createElement("span"));
    return eq;
  }

  // ── Render states ──

  function renderPlaying(data) {
    container.classList.remove("loading");
    container.classList.add("playing");
    container.replaceChildren();

    var art = document.createElement("a");
    art.className = "np__art";
    if (data.songUrl) {
      art.href = data.songUrl;
      art.target = "_blank";
      art.rel = "noopener";
    }
    var img = document.createElement("img");
    img.src = data.albumArt;
    img.alt = data.album;
    art.appendChild(img);

    var info = document.createElement("div");
    info.className = "np__info";

    var label = document.createElement("div");
    label.className = "np__label";
    label.appendChild(makeEq());
    label.appendChild(document.createTextNode("Now playing"));

    var title = document.createElement("a");
    title.className = "np__title";
    title.textContent = data.title;
    if (data.songUrl) {
      title.href = data.songUrl;
      title.target = "_blank";
      title.rel = "noopener";
    }

    var artist = document.createElement("div");
    artist.className = "np__artist";
    artist.textContent = data.artist;

    info.appendChild(label);
    info.appendChild(title);
    info.appendChild(artist);

    container.appendChild(art);
    container.appendChild(info);

    if (data.songUrl) {
      var iconLink = document.createElement("a");
      iconLink.href = data.songUrl;
      iconLink.target = "_blank";
      iconLink.rel = "noopener";
      iconLink.className = "np__sp-link";
      iconLink.setAttribute("aria-label", "Open in Spotify");
      iconLink.appendChild(makeSpotifyIcon());
      container.appendChild(iconLink);
    } else {
      container.appendChild(makeSpotifyIcon());
    }
  }

  function renderIdle() {
    container.classList.remove("loading", "playing");
    container.replaceChildren();

    var art = document.createElement("div");
    art.className = "np__art";
    var placeholder = document.createElement("div");
    placeholder.className = "np__art-placeholder";
    placeholder.appendChild(makePlayPlaceholder());
    art.appendChild(placeholder);

    var info = document.createElement("div");
    info.className = "np__info";

    var label = document.createElement("div");
    label.className = "np__label";
    label.appendChild(makeEq());
    label.appendChild(document.createTextNode("Offline"));

    var idle = document.createElement("div");
    idle.className = "np__idle";
    idle.textContent = "Not playing anything right now";

    info.appendChild(label);
    info.appendChild(idle);

    container.appendChild(art);
    container.appendChild(info);
    container.appendChild(makeSpotifyIcon());
  }

  function render(data) {
    if (data && data.isPlaying) {
      renderPlaying(data);
    } else {
      renderIdle();
    }
  }

  // ── Fetch ──

  async function fetchNowPlaying() {
    try {
      var res = await fetch(ENDPOINT);
      if (!res.ok) throw new Error(res.statusText);
      var data = await res.json();
      render(data);
    } catch (err) {
      console.warn("[now-playing]", err);
      render(null);
    }
  }

  // ── Init ──

  // The HTML already shows the skeleton — just kick off the first fetch
  fetchNowPlaying();
  setInterval(fetchNowPlaying, POLL_INTERVAL);
})();
