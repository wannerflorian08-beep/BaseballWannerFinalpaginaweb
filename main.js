// ==========================================================================
// Baseball Warner - main.js
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  initNavToggle();
  initCatalog();
  initContactForm();
});

/* ---------------------------- Menú móvil -------------------------------- */
function initNavToggle() {
  const toggle = document.querySelector('.navbar__toggle');
  const menu = document.querySelector('.navbar__menu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
}

/* -------------------- Catálogo dinámico (XML + XSLT) --------------------- */
function initCatalog() {
  const target = document.getElementById('catalog-container');
  if (!target) return; // Solo corre en catalog.html

  fetch('data/datos.xml')
    .then((res) => {
      if (!res.ok) throw new Error('No se pudo cargar datos.xml');
      return res.text();
    })
    .then((xmlText) => {
      fetch('data/catalogo.xslt')
        .then((res) => {
          if (!res.ok) throw new Error('No se pudo cargar catalogo.xslt');
          return res.text();
        })
        .then((xsltText) => {
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(xmlText, 'application/xml');
          const xsltDoc = parser.parseFromString(xsltText, 'application/xml');

          if (window.XSLTProcessor) {
            const xsltProcessor = new XSLTProcessor();
            xsltProcessor.importStylesheet(xsltDoc);
            const resultFragment = xsltProcessor.transformToFragment(xmlDoc, document);
            target.innerHTML = '';
            target.appendChild(resultFragment);
          } else {
            target.innerHTML = '<p class="catalog-status">Tu navegador no soporta transformaciones XSLT.</p>';
          }
        });
    })
    .catch((err) => {
      target.innerHTML = `<p class="catalog-status">No se pudo generar el catálogo: ${err.message}</p>`;
    });
}

/* ---------------------------- Formulario --------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const status = document.getElementById('form-status');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    form.querySelectorAll('[data-error-for]').forEach((el) => (el.textContent = ''));

    const fields = [
      { id: 'name', message: 'Por favor ingresa tu nombre.' },
      { id: 'email', message: 'Por favor ingresa un correo electrónico válido.' },
      { id: 'subject', message: 'Por favor selecciona un asunto.' },
      { id: 'message', message: 'Por favor escribe tu mensaje (mínimo 10 caracteres).' },
    ];

    fields.forEach(({ id, message }) => {
      const input = document.getElementById(id);
      const errorEl = form.querySelector(`[data-error-for="${id}"]`);
      if (!input.checkValidity()) {
        valid = false;
        if (errorEl) errorEl.textContent = message;
        input.setAttribute('aria-invalid', 'true');
      } else {
        input.removeAttribute('aria-invalid');
      }
    });

    if (valid) {
      status.textContent = '¡Gracias! Tu mensaje ha sido enviado correctamente.';
      status.classList.add('success');
      form.reset();
    } else {
      status.classList.remove('success');
      status.textContent = '';
    }
  });
}
