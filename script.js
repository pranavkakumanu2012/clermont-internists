document.addEventListener('DOMContentLoaded', function () {
  // Set copyright year automatically
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Mobile Menu Toggle
  var menuToggle = document.getElementById('menuToggle');
  var navMenu = document.getElementById('navMenu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', function () {
      navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        navMenu.classList.remove('active');
      });
    });
  }

  // Interactive Clinical Services Tabs
  var tabBtns = document.querySelectorAll('.tab-btn');
  var tabPanels = document.querySelectorAll('.tab-panel');

  tabBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var target = btn.getAttribute('data-tab');

      tabBtns.forEach(function (b) { b.classList.remove('active'); });
      tabPanels.forEach(function (p) { p.classList.remove('active'); });

      btn.classList.add('active');
      var activePanel = document.getElementById('tab-' + target);
      if (activePanel) {
        activePanel.classList.add('active');
      }
    });
  });

  // Interactive Patient Visit Helper Checklist Data
  var helperData = {
    new: {
      title: "New Patient Appointment Requirements",
      items: [
        "Government-issued photo ID (Driver's License or State ID)",
        "Active health insurance card(s)",
        "Complete list of current prescription medications and supplements",
        "Previous medical records or contact details from your prior practice",
        "Please arrive 15 minutes prior to your scheduled appointment"
      ]
    },
    annual: {
      title: "Annual Physical Checkup Guidelines",
      items: [
        "Fast for 8–12 hours prior if fasting lab work was requested",
        "Updated list of current prescription medications",
        "Notes regarding specific health questions or preventative screening concerns",
        "Copy of recent specialist reports or emergency room visits in the past year"
      ]
    },
    followup: {
      title: "Chronic Condition Follow-Up Checklist",
      items: [
        "Home blood pressure or blood glucose logs (if applicable)",
        "Current medication bottles or updated list for refill authorizations",
        "Summary of new or changing symptoms since your last checkup",
        "Pharmacy address and phone number for electronic prescriptions"
      ]
    }
  };

  var helperContent = document.getElementById('helperContent');
  var helperBtns = document.querySelectorAll('.helper-btn');

  function renderHelper(type) {
    var data = helperData[type];
    if (!data || !helperContent) return;

    var html = '<h3>' + data.title + '</h3><ul>';
    data.items.forEach(function (item) {
      html += '<li>' + item + '</li>';
    });
    html += '</ul>';
    helperContent.innerHTML = html;
  }

  helperBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var type = btn.getAttribute('data-type');
      helperBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      renderHelper(type);
    });
  });

  // Default initialize helper
  renderHelper('new');

  // Copy Address Button
  var copyAddrBtn = document.getElementById('copyAddrBtn');
  if (copyAddrBtn) {
    copyAddrBtn.addEventListener('click', function () {
      var fullAddress = "2055 Hospital Dr, Suite 300, Batavia, OH 45103";
      navigator.clipboard.writeText(fullAddress).then(function () {
        var origText = copyAddrBtn.innerHTML;
        copyAddrBtn.innerHTML = '<i class="fa-solid fa-check"></i> Address Copied!';
        setTimeout(function () {
          copyAddrBtn.innerHTML = origText;
        }, 2500);
      });
    });
  }

  // Doctor Profiles Modal Data
  var doctorProfiles = {
    kakumanu: {
      name: "Dr. Anil Kakumanu, M.D.",
      spec: "Board Certified in Internal Medicine",
      bio: "Dr. Kakumanu specializes in adult primary healthcare, complex diagnostic evaluations, chronic condition oversight (diabetes, hypertension), and preventative care."
    },
    vaidyanathan: {
      name: "Dr. Chandrasekar Vaidyanathan, M.D.",
      spec: "Board Certified in Internal Medicine",
      bio: "Dr. Vaidyanathan provides expert internal medicine care with an emphasis on preventative health assessments, cardiovascular risk monitoring, and individual wellness planning."
    },
    hariharan: {
      name: "Dr. Parameswaran Hariharan, M.D.",
      spec: "Board Certified in Internal Medicine",
      bio: "Dr. Hariharan focuses on adult health maintenance, metabolic disease management, long-term condition monitoring, and coordinating complete patient care plans."
    }
  };

  var docModal = document.getElementById('docModal');
  var modalBody = document.getElementById('modalBody');
  var modalClose = document.getElementById('modalClose');

  document.querySelectorAll('.doc-card').forEach(function (card) {
    card.addEventListener('click', function () {
      var key = card.getAttribute('data-doc');
      var doc = doctorProfiles[key];
      if (doc && docModal && modalBody) {
        modalBody.innerHTML = '<h3 style="font-family:var(--font-serif); font-size:22px; color:#fff; margin-bottom:8px;">' + doc.name + '</h3><p class="doc-spec" style="margin-bottom:12px;">' + doc.spec + '</p><p style="color:var(--text-muted); font-size:14px;">' + doc.bio + '</p>';
        docModal.classList.add('active');
      }
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', function () {
      docModal.classList.remove('active');
    });
  }

  if (docModal) {
    docModal.addEventListener('click', function (e) {
      if (e.target === docModal) {
        docModal.classList.remove('active');
      }
    });
  }
});
