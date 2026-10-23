// ==========================================================================
// Jan Pouw Schilderwerken — Interactie & Formulieren
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // Zorg dat eventuele oude 'dorps' class uit localStorage verwijderd is (Versie 1 is nu de standaard)
  document.body.classList.remove('theme-dorps');
  localStorage.removeItem('janPouwTheme');

  // 1. Mobiel menu openen / sluiten
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });
  }

  // 2. Portfolio filter op Over Jan & Projecten pagina
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

  // 3. URL-parameter uitlezen op Contactpagina
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

  // 4. Offerteformulier afhandeling
  const contactForm = document.getElementById('offerte-form');
  const successBox = document.getElementById('form-success');

  if (contactForm && successBox) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const naam = document.getElementById('naam')?.value || 'je';
      successBox.innerHTML = `Bedankt <strong>${naam}</strong>! Ik heb je bericht goed ontvangen en neem binnen 24 uur persoonlijk contact met je op. — <em>Jan Pouw</em>`;
      successBox.style.display = 'block';
      contactForm.reset();
      successBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }
});
