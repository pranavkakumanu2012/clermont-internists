document.addEventListener('DOMContentLoaded', function () {
  // 1. Dynamic Footer Year
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Mobile Navigation Toggle
  var menuToggle = document.getElementById('menuToggle');
  var navMenu = document.getElementById('navMenu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', function () {
      navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.main-nav a').forEach(function (link) {
      link.addEventListener('click', function () {
        navMenu.classList.remove('active');
      });
    });
  }

  // 3. Clinical Services Switcher Tabs
  var tabs = document.querySelectorAll('.switcher-tab');
  var panels = document.querySelectorAll('.switcher-panel');

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var target = tab.getAttribute('data-tab');

      tabs.forEach(function (t) { t.classList.remove('active'); });
      panels.forEach(function (p) { p.classList.remove('active'); });

      tab.classList.add('active');
      var activePanel = document.getElementById('tab-' + target);
      if (activePanel) {
        activePanel.classList.add('active');
      }
    });
  });

  // 4. Interactive Visit Preparation Checklist
  var prepChecklists = {
    new: {
      title: 'New Patient Appointment Checklist',
      items: [
        'Valid government-issued photo ID (Driver’s License or State ID).',
        'Current primary and secondary health insurance cards.',
        'A complete list of all prescription medications, dosages, and over-the-counter supplements.',
        'Contact information or recent records from your previous primary care provider.',
        'Please arrive 15 minutes early to complete new patient registration forms.'
      ]
    },
    annual: {
      title: 'Annual Physical Exam Preparation',
      items: [
        'Fast (water only) for 8 to 12 hours prior if morning blood work was ordered.',
        'Bring an updated list of any medication changes made by specialists.',
        'Write down any new symptoms, health questions, or screening requests.',
        'Bring records of any recent vaccinations, colonoscopies, or mammograms.'
      ]
    },
    followup: {
      title: 'Chronic Condition Follow-Up Checklist',
      items: [
        'Bring your home blood pressure log or blood glucose readings.',
        'Bring your current prescription bottles or a list of refills needed.',
        'Note any side effects or changes in symptoms since your last office visit.',
        'Confirm your preferred local or mail-order pharmacy details.'
      ]
    }
  };

  var prepOutput = document.getElementById('prepOutput');
  var prepChoices = document.querySelectorAll('.prep-choice');

  function updatePrepCard(visitKey) {
    var data = prepChecklists[visitKey];
    if (!data || !prepOutput) return;

    var listHtml = '<h3>' + data.title + '</h3><ul>';
    data.items.forEach(function (item) {
      listHtml += '<li>' + item + '</li>';
    });
    listHtml += '</ul>';
    prepOutput.innerHTML = listHtml;
  }

  prepChoices.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var visitKey = btn.getAttribute('data-visit');
      prepChoices.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      updatePrepCard(visitKey);
    });
  });

  // Load initial checklist
  updatePrepCard('new');

  // 5. Copy Street Address Button
  var copyBtn = document.getElementById('copyAddrBtn');
  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      var address = '2055 Hospital Dr, Suite 300, Batavia, OH 45103';
      navigator.clipboard.writeText(address).then(function () {
        var originalHtml = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fa-solid fa-check"></i> Address Copied to Clipboard';
        setTimeout(function () {
          copyBtn.innerHTML = originalHtml;
        }, 2500);
      });
    });
  }

  // 6. Physician Bio Modal
  var physicianData = {
    kakumanu: {
      name: 'Dr. Anil Kakumanu, M.D.',
      specialty: 'Internal Medicine • Adult Primary Care',
      details: 'Dr. Anil Kakumanu practices internal medicine in Batavia, Ohio, focusing on comprehensive adult primary care, preventative screenings, diagnostic evaluations, and ongoing management of chronic illnesses including diabetes and hypertension.'
    },
    vaidyanathan: {
      name: 'Dr. Chandrasekar Vaidyanathan, M.D.',
      specialty: 'Internal Medicine • Adult Primary Care',
      details: 'Dr. Chandrasekar Vaidyanathan provides patient-centered internal medicine care with an emphasis on preventative wellness, cardiovascular risk management, routine physicals, and long-term adult health maintenance.'
    },
    hariharan: {
      name: 'Dr. Parameswaran Hariharan, M.D.',
      specialty: 'Internal Medicine • Adult Primary Care',
      details: 'Dr. Parameswaran Hariharan specializes in adult primary healthcare, metabolic and endocrine condition oversight, diagnostic workups, and coordinated outpatient care.'
    }
  };

  var docModal = document.getElementById('docModal');
  var modalBody = document.getElementById('modalBody');
  var modalClose = document.getElementById('modalClose');

  document.querySelectorAll('.doc-modal-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var key = btn.getAttribute('data-doc');
      var doc = physicianData[key];
      if (doc && docModal && modalBody) {
        modalBody.innerHTML =
          '<h3 style="font-family: var(--font-serif); font-size: 21px; color: var(--navy); margin-bottom: 4px;">' + doc.name + '</h3>' +
          '<p style="font-size: 13px; font-weight: 600; color: var(--teal); margin-bottom: 14px;">' + doc.specialty + '</p>' +
          '<p style="font-size: 14px; color: var(--text-body); line-height: 1.7;">' + doc.details + '</p>';
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
