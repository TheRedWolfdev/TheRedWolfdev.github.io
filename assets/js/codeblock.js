/* ================================================
   CODEBLOCK.JS — Terminal wrapper para bloques de código
   Inyecta barra superior (círculos macOS + botón copiar)
   en cada <pre> dentro de article#post-content
   ================================================ */

(function () {
    const content = document.getElementById('post-content');
    if (!content) return;

    const blocks = content.querySelectorAll('pre');

    blocks.forEach(function (pre) {

        // Crear wrapper externo
        const wrapper = document.createElement('div');
        wrapper.className = 'code-block-wrapper';

        // Crear barra superior
        const header = document.createElement('div');
        header.className = 'code-block-header';

        // Círculos estilo macOS
        const dots = document.createElement('div');
        dots.className = 'code-dots';
        dots.innerHTML =
            '<span class="dot-red"></span>'    +
            '<span class="dot-yellow"></span>' +
            '<span class="dot-green"></span>';

        // Botón copiar
        const btn = document.createElement('button');
        btn.className   = 'code-copy-btn';
        btn.textContent = '[ copiar ]';
        btn.setAttribute('aria-label', 'Copiar código');

        btn.addEventListener('click', function () {
            const code = pre.querySelector('code');
            const text = code ? code.innerText : pre.innerText;

            // Clipboard API (navegadores modernos)
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(text).then(function () {
                    setCopied(btn);
                }).catch(function () {
                    fallbackCopy(text, btn);
                });
            } else {
                fallbackCopy(text, btn);
            }
        });

        header.appendChild(dots);
        header.appendChild(btn);

        // Insertar wrapper en el DOM reemplazando al <pre>
        pre.parentNode.insertBefore(wrapper, pre);
        wrapper.appendChild(header);
        wrapper.appendChild(pre);
    });

    /* ── Helpers ── */

    function setCopied(btn) {
        btn.textContent = '[ copiado ✓ ]';
        btn.classList.add('copied');
        setTimeout(function () {
            btn.textContent = '[ copiar ]';
            btn.classList.remove('copied');
        }, 2000);
    }

    function fallbackCopy(text, btn) {
        const ta = document.createElement('textarea');
        ta.value          = text;
        ta.style.position = 'fixed';
        ta.style.opacity  = '0';
        document.body.appendChild(ta);
        ta.select();
        try {
            document.execCommand('copy');
            setCopied(btn);
        } catch (err) {
            console.warn('No se pudo copiar:', err);
        }
        document.body.removeChild(ta);
    }
})();
