// ==========================================================================
// Jan Pouw Schilderwerken — Interactie, Formulieren & Stijlwisselaar (V1 / V2)
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // 0. Extra Google Fonts laden voor Versie 2 (Dorps & Speels: Fraunces, Nunito, Caveat)
  const fontLink = document.createElement('link');
  fontLink.rel = 'stylesheet';
  fontLink.href =
    'https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Nunito:wght@400;600;700;800&display=swap';
  document.head.appendChild(fontLink);

  // 1. Stijlwisselaar (Versie 1: Strak & Modern vs. Versie 2: Dorps & Speels)
  const switcher = document.createElement('div');
  switcher.className = 'theme-switcher';
  switcher.setAttribute('aria-label', 'Kies website-uitstraling');
  switcher.innerHTML = `
    <span class="theme-switcher-label">Kies stijl:</span>
    <button type="button" class="theme-btn" data-theme="modern">🏢 1. Strak &amp; Modern</button>
    <button type="button" class="theme-btn" data-theme="dorps">🏡 2. Dorps &amp; Speels</button>
  `;
  document.body.appendChild(switcher);

  // Vriendelijke, dorpse teksten (je/jij-vorm) per pagina
  const dorpsTranslations = [
    {
      selector: '.hero-content .eyebrow',
      dorps: '☕ Gewoon Jan uit de buurt • Eerlijk vakwerk',
    },
    {
      selector: '.hero-content h1',
      dorps: 'Jouw huis weer <span>fris in de verf</span>, precies zoals het hoort!',
    },
    {
      selector: '.hero-lead',
      dorps:
        'Hoi! Ik ben <strong>Jan Pouw</strong>. Zoek je een schilder die nog écht de tijd neemt voor je huis, alleen met de allerbeste verf werkt en na afloop alles weer keurig opruimt? Van je woonkamer en buitenkozijnen tot dat ene losse klusje in huis: ik kom graag even bij je langs!',
    },
    {
      selector: '.hero-actions .btn-primary',
      dorps: '☕ Nodig Jan uit voor een prijsopgave',
    },
    {
      selector: '.hero-floating-card strong',
      dorps: 'Gewoon goed geregeld!',
    },
    {
      selector: '.hero-floating-card span',
      dorps: 'Eerst een kop koffie, duidelijke afspraak en topverf van Sikkens & Sigma.',
    },
    {
      selector: '.cta-strip h2',
      dorps: 'Zullen we samen even naar jouw schilderklus kijken?',
    },
    {
      selector: '.cta-strip p',
      dorps:
        'Bel me gerust of stuur een berichtje. Ik loop graag vrijblijvend een rondje met je om het huis voor eerlijk advies en een heldere prijs.',
    },
  ];

  // Bewaar originele teksten zodat terugschakelen naar Versie 1 naadloos werkt
  dorpsTranslations.forEach((item) => {
    const el = document.querySelector(item.selector);
    if (el) {
      item.modern = el.innerHTML;
    }
  });

  // Algemene u -> je/jij vervanging voor subpagina-koppen en paragrafen
  const textNodesToToggle = [];
  document.querySelectorAll('.page-hero h1, .page-hero p, .section-header h2, .section-header p, .spain-banner-content h2, .spain-banner-content p').forEach((el) => {
    textNodesToToggle.push({
      el,
      modern: el.innerHTML,
      dorps: el.innerHTML
        .replace(/\bUw\b/g, 'Jouw')
        .replace(/\buw\b/g, 'je')
        .replace(/\bU\b/g, 'Je')
        .replace(/\bu\b/g, 'je')
        .replace('Heeft je een woning', 'Heb je een fijn plekje')
        .replace('wat ik voor je kan betekenen', 'waar ik je mee kan helpen'),
    });
  });

  function applyTheme(theme) {
    const isDorps = theme === 'dorps';
    document.body.classList.toggle('theme-dorps', isDorps);
    localStorage.setItem('janPouwTheme', theme);

    switcher.querySelectorAll('.theme-btn').forEach((btn) => {
      btn.classList.toggle('active', btn.getAttribute('data-theme') === theme);
    });

    dorpsTranslations.forEach((item) => {
      const el = document.querySelector(item.selector);
      if (el && item.modern) {
        el.innerHTML = isDorps ? item.dorps : item.modern;
      }
    });

    textNodesToToggle.forEach((item) => {
      item.el.innerHTML = isDorps ? item.dorps : item.modern;
    });
  }

  // Lees opgeslagen voorkeur (standaard 'dorps' tonen zodat de gebruiker meteen versie 2 ziet!)
  const savedTheme = localStorage.getItem('janPouwTheme') || 'dorps';
  applyTheme(savedTheme);

  switcher.querySelectorAll('.theme-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      applyTheme(btn.getAttribute('data-theme'));
    });
  });

  // 2. Mobiel menu openen / sluiten
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });
  }

  // 3. Portfolio filter op Over Jan & Projecten pagina
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (filterButtons.length > 0 && galleryItems.length > 0) {
    filterButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');
        galleryItems.forEach((item) => {
          const category = item.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            item.classList.remove('hidden');
          } else {
            item.classList.add('hidden');
          }
        });
      });
    });
  }

  // 4. URL-parameter uitlezen op Contactpagina
  const urlParams = new URLSearchParams(window.location.search);
  const preselectedType = urlParams.get('onderwerp');
  const typeSelect = document.getElementById('klus-type');
  const locationSelect = document.getElementById('locatie');

  if (preselectedType && typeSelect) {
    for (const option of typeSelect.options) {
      if (option.value === preselectedType) {
        option.selected = true;
      }
    }
  }
  if (preselectedType === 'spanje' && locationSelect) {
    locationSelect.value = 'Spanje (Costa Blanca / Costa del Sol)';
  }

  // 5. Offerteformulier afhandeling
  const contactForm = document.getElementById('offerte-form');
  const successBox = document.getElementById('form-success');

  if (contactForm && successBox) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const naam = document.getElementById('naam')?.value || 'klant';
      successBox.innerHTML = `Bedankt <strong>${naam}</strong>! Je bericht is goed ontvangen. Jan Pouw neemt binnen 24 uur persoonlijk contact met je op.`;
      successBox.style.display = 'block';
      contactForm.reset();
      successBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }
});
