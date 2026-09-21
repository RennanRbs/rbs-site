/**
 * RBS Tech — contact form (V1 mailto + copy)
 * Change CONTACT_EMAIL below to update the destination inbox.
 */
const CONTACT_EMAIL = "rennan@icloud.com";

(function () {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  const toggle = document.querySelector(".nav-toggle");
  const mobileNav = document.getElementById("nav-mobile");
  if (toggle && mobileNav) {
    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      toggle.setAttribute("aria-label", open ? "Abrir menu" : "Fechar menu");
      mobileNav.hidden = open;
    });
    mobileNav.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Abrir menu");
        mobileNav.hidden = true;
      });
    });
  }

  const form = document.getElementById("contact-form");
  const statusEl = document.getElementById("form-status");
  const btnCopy = document.getElementById("btn-copy");

  function getValues() {
    return {
      nome: (document.getElementById("nome")?.value || "").trim(),
      empresa: (document.getElementById("empresa")?.value || "").trim(),
      email: (document.getElementById("email")?.value || "").trim(),
      telefone: (document.getElementById("telefone")?.value || "").trim(),
      mensagem: (document.getElementById("mensagem")?.value || "").trim(),
    };
  }

  function validate(v) {
    if (!v.nome) return "Informe seu nome.";
    if (!v.empresa) return "Informe a empresa.";
    if (!v.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) {
      return "Informe um email válido.";
    }
    if (!v.mensagem) return "Descreva sua necessidade na mensagem.";
    return null;
  }

  function buildBody(v) {
    const lines = [
      `Nome: ${v.nome}`,
      `Empresa: ${v.empresa}`,
      `Email: ${v.email}`,
      `Telefone: ${v.telefone || "(não informado)"}`,
      "",
      "Mensagem:",
      v.mensagem,
      "",
      "— Enviado pelo formulário do site RBS Tech",
    ];
    return lines.join("\n");
  }

  function buildMailto(v) {
    const subject = encodeURIComponent(`Proposta RBS Tech — ${v.empresa}`);
    const body = encodeURIComponent(buildBody(v));
    return `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  }

  function showStatus(message, isError) {
    if (!statusEl) return;
    statusEl.hidden = false;
    statusEl.textContent = message;
    statusEl.classList.toggle("error", Boolean(isError));
  }

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const v = getValues();
      const err = validate(v);
      if (err) {
        showStatus(err, true);
        return;
      }
      const href = buildMailto(v);
      showStatus(
        "Abrindo seu cliente de email… Se nada abrir, use “Copiar texto do email”.",
        false
      );
      window.location.href = href;
    });
  }

  if (btnCopy) {
    btnCopy.addEventListener("click", async () => {
      const v = getValues();
      const err = validate(v);
      if (err) {
        showStatus(err, true);
        return;
      }
      const text = `Para: ${CONTACT_EMAIL}\nAssunto: Proposta RBS Tech — ${v.empresa}\n\n${buildBody(v)}`;
      try {
        await navigator.clipboard.writeText(text);
        showStatus("Texto do email copiado. Cole em qualquer cliente de email.", false);
      } catch {
        showStatus(
          `Não foi possível copiar automaticamente. Destino: ${CONTACT_EMAIL}`,
          true
        );
      }
    });
  }
})();
