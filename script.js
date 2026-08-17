/* =======================================================
   OFICINA DO TUTUBA — script.js
   ---------------------------------------------------------
   TUDO que você provavelmente vai querer editar no dia a dia
   (número de WhatsApp, serviços, bairros) está no objeto
   CONFIG logo abaixo. Não precisa mexer no resto do arquivo.
   ======================================================= */

const CONFIG = {
  // Número no formato internacional, só dígitos: 55 + DDD + número
  whatsappNumber: "5521972260411",

  // Seu @ do Instagram, sem o @ (só o texto que vem depois)
  instagramHandle: "oficinadotutuba",

  // Mensagens pré-preenchidas usadas pelos botões (data-msg="chave")
  messages: {
    ola: "Olá! Vi o site da Oficina do Tutuba e queria saber mais sobre os serviços.",
    orcamento: "Olá! Queria pedir um orçamento para o meu computador/notebook.",
  },

  // Serviços exibidos como "etiquetas de ordem de serviço" na seção #servicos
  // cor: mostarda | telha | terracota | bordo | verde
  services: [
    {
      codigo: "OS-02",
      titulo: "Formatação e reinstalação",
      desc: "Windows ou macOS do zero, com seus programas de volta no lugar.",
      cor: "mostarda",
    },
    {
      codigo: "OS-03",
      titulo: "Remoção de vírus e malware",
      desc: "Limpeza completa e dicas pra não pegar de novo.",
      cor: "telha",
    },
    {
      codigo: "OS-04",
      titulo: "Manutenção preventiva",
      desc: "Limpeza interna, pasta térmica e troca de peças com desgaste.",
      cor: "terracota",
    },
    {
      codigo: "OS-05",
      titulo: "Montagem de PC",
      desc: "Escolha de peças e montagem do zero, sob medida pro seu uso.",
      cor: "bordo",
    },
    {
      codigo: "OS-06",
      titulo: "Upgrade de hardware",
      desc: "Mais memória, SSD ou placa de vídeo — mais vida útil pra máquina.",
      cor: "verde",
    },
    {
      codigo: "OS-07",
      titulo: "Diagnóstico e orçamento",
      desc: "Não sabe o que é? Eu identifico o problema antes de cobrar qualquer coisa.",
      cor: "mostarda",
    },
  ],

  // Bairros / regiões de atendimento exibidos na seção #area
  zones: [
    "Zona Sul", "Zona Norte", "Zona Oeste", "Centro",
    "Barra da Tijuca", "Tijuca", "Copacabana", "Ilha do Governador",
  ],
};

// Logica de renderização
function buildWhatsappUrl(msgKey) {
  const text = CONFIG.messages[msgKey] || CONFIG.messages.ola;
  return `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

function buildInstagramUrl() {
  return `https://instagram.com/${CONFIG.instagramHandle}`;
}

function wireWhatsappButtons() {
  document.querySelectorAll(".js-whatsapp").forEach((el) => {
    const key = el.dataset.msg || "ola";
    el.setAttribute("href", buildWhatsappUrl(key));
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener");
  });
}

function wireInstagramButtons() {
  const url = buildInstagramUrl();
  document.querySelectorAll(".js-instagram").forEach((el) => {
    el.setAttribute("href", url);
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener");
  });
}

function renderServiceTickets() {
  const grid = document.getElementById("ticketGrid");
  if (!grid) return;

  grid.innerHTML = CONFIG.services.map((s) => `
    <div class="ticket ticket--${s.cor}">
      <span class="ticket__hole"></span>
      <span class="ticket__code">${s.codigo}</span>
      <span class="ticket__label">${s.titulo}</span>
      <span class="ticket__desc">${s.desc}</span>
    </div>
  `).join("");
}

function renderZoneChips() {
  const wrap = document.getElementById("areaChips");
  if (!wrap) return;

  wrap.innerHTML = CONFIG.zones.map((z) => `<span class="chip">${z}</span>`).join("");
}

function wireMobileNav() {
  const toggle = document.getElementById("navToggle");
  const nav = document.getElementById("nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function wireHeaderShadow() {
  const header = document.getElementById("header");
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

function wireScrollReveal() {
  const items = document.querySelectorAll("[data-reveal]");
  if (!items.length) return;

  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  items.forEach((el) => observer.observe(el));
}

document.addEventListener("DOMContentLoaded", () => {
  renderServiceTickets();
  renderZoneChips();
  wireWhatsappButtons(); // depois de renderizar os cards, pra garantir que os links existam
  wireInstagramButtons();
  wireMobileNav();
  wireHeaderShadow();
  wireScrollReveal();
});