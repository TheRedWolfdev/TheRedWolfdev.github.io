/* ================================================
   TOC.JS — Generador dinámico de tabla de contenidos
   Lee h1–h4 del article#post-content y construye
   el sidebar de navegación con scroll activo
   ================================================ */

(function () {
    const content = document.getElementById('post-content');
    const toc     = document.getElementById('toc');
    if (!content || !toc) return;

    const headings = content.querySelectorAll('h1, h2, h3, h4');
       
    if (headings.length === 0) {
        toc.innerHTML = '<span class="toc-empty">Sin secciones</span>';
        return;
    }

    const ul = document.createElement('ul')
    
    headings.forEach(function (heading, index) {
        // Asignar id si no tiene
        if (!heading.id) {
            heading.id = 'sec-' + index + '-' +
                heading.textContent.toLowerCase()
                    .replace(/\s+/g, '-')
                    .replace(/[^\w-]/g, '');
        }

        const li = document.createElement('li');
        li.className = 'toc-item toc-' + heading.tagName.toLowerCase();

        const a = document.createElement('a');
        a.href        = '#' + heading.id;
        a.textContent = heading.textContent;

        // Scroll suave al hacer click
        a.addEventListener('click', function (e) {
            e.preventDefault();
            document.getElementById(heading.id)
                .scrollIntoView({ behavior: 'smooth', block: 'start' });
            ul.querySelectorAll('a').forEach(function (x) {
                x.classList.remove('active');
            });
            a.classList.add('active');
        });

        li.appendChild(a);
        ul.appendChild(li);
    });

    toc.appendChild(ul);

    // Resaltar sección activa al hacer scroll
    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                ul.querySelectorAll('a').forEach(function (link) {
                    link.classList.toggle(
                        'active',
                        link.getAttribute('href') === '#' + id
                    );
                });
            }
        });
    }, { rootMargin: '0px 0px -65% 0px', threshold: 0 });

    headings.forEach(function (h) { observer.observe(h); });
})();
