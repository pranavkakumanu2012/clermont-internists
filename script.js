(function () {
  "use strict";

  // Edit these if office hours change. Keys: 0 = Sunday ... 6 = Saturday.
  // Values are [open hour, close hour] in 24-hour time, Eastern time.
  var HOURS = { 1: [8, 17], 2: [8, 17], 3: [8, 17], 4: [8, 17], 5: [8, 17] };
  var DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var TIMEZONE = "America/New_York";

  function easternNow() {
    var parts = new Intl.DateTimeFormat("en-US", {
      timeZone: TIMEZONE,
      weekday: "short",
      hour: "numeric",
      minute: "numeric",
      hour12: false
    }).formatToParts(new Date());
    var out = {};
    parts.forEach(function (p) { out[p.type] = p.value; });
    var short = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return {
      day: short.indexOf(out.weekday),
      minutes: (parseInt(out.hour, 10) % 24) * 60 + parseInt(out.minute, 10)
    };
  }

  function clock(hour) {
    var suffix = hour >= 12 ? "pm" : "am";
    var h = hour % 12 || 12;
    return h + ":00 " + suffix;
  }

  function statusMessage(now) {
    var today = HOURS[now.day];
    if (today) {
      var open = today[0] * 60;
      var close = today[1] * 60;
      if (now.minutes >= open && now.minutes < close) {
        return { open: true, text: "Open now, until " + clock(today[1]) };
      }
      if (now.minutes < open) {
        return { open: false, text: "Closed. Opens today at " + clock(today[0]) };
      }
    }
    for (var i = 1; i <= 7; i++) {
      var d = (now.day + i) % 7;
      if (HOURS[d]) {
        var label = i === 1 ? "tomorrow" : DAYS[d];
        return { open: false, text: "Closed. Opens " + label + " at " + clock(HOURS[d][0]) };
      }
    }
    return { open: false, text: "Please call for office hours" };
  }

  function updateStatus() {
    var box = document.getElementById("status");
    var text = document.getElementById("status-text");
    if (!box || !text) return;
    var now;
    try {
      now = easternNow();
    } catch (e) {
      text.textContent = "Call for office hours";
      return;
    }
    var s = statusMessage(now);
    text.textContent = s.text;
    box.classList.toggle("is-open", s.open);

    var rows = document.querySelectorAll(".hours tr");
    rows.forEach(function (row) {
      row.classList.toggle("today", parseInt(row.getAttribute("data-day"), 10) === now.day);
    });
  }

  function setupMenu() {
    var btn = document.querySelector(".menu-btn");
    var nav = document.getElementById("nav");
    if (!btn || !nav) return;
    function close() {
      nav.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
    }
    btn.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", String(isOpen));
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") close();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });
  }

  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  function setupCopy() {
    var b = document.getElementById("copy-address");
    var m = document.getElementById("copy-msg");
    if (!b || !m) return;
    b.addEventListener("click", function () {
      var addr = "2055 Hospital Dr, Suite 300, Batavia, OH 45103";
      var done = function (ok) { m.textContent = ok ? "Address copied." : "Could not copy. Please select the address above."; };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(addr).then(function () { done(true); }, function () { done(false); });
      } else { done(false); }
    });
  }

  setupMenu();
  setupCopy();
  updateStatus();
  setInterval(updateStatus, 60000);
})();
