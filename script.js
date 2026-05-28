const track = document.querySelector(".hero-track");
const slides = document.querySelectorAll(".hero-slide");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const dotsWrap = document.getElementById("dots");

let index = 0;
let timer;

function renderDots() {
  dotsWrap.innerHTML = "";
  slides.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.className = "dot" + (i === 0 ? " active" : "");
    dot.addEventListener("click", () => goToSlide(i));
    dotsWrap.appendChild(dot);
  });
}

function updateDots() {
  document.querySelectorAll(".dot").forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });
}

function goToSlide(i) {
  index = (i + slides.length) % slides.length;
  track.style.transform = `translateX(-${index * 100}%)`;
  updateDots();
}

function nextSlide() {
  goToSlide(index + 1);
}

function prevSlide() {
  goToSlide(index - 1);
}

function startAuto() {
  clearInterval(timer);
  timer = setInterval(nextSlide, 3500);
}

prevBtn.addEventListener("click", () => {
  prevSlide();
  startAuto();
});

nextBtn.addEventListener("click", () => {
  nextSlide();
  startAuto();
});

renderDots();
goToSlide(0);
startAuto();

// ==================== CTA BUTTON SCROLL ====================
const ctaButtons = document.querySelectorAll(".hero-actions .btn");
ctaButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const productsSection = document.querySelector(".products-section");
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// ====================
const tabPanels = document.querySelectorAll(".tab-panel");

tabButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const tabId = e.target.getAttribute("aria-controls");
    
    tabButtons.forEach(btn => {
      btn.classList.remove("active");
      btn.setAttribute("aria-selected", "false");
    });
    tabPanels.forEach(panel => panel.classList.remove("active"));
    
    e.target.classList.add("active");
    e.target.setAttribute("aria-selected", "true");
    document.getElementById(tabId).classList.add("active");
  });
});

tabButtons.forEach((button, index) => {
  button.addEventListener("keydown", (e) => {
    let targetIndex = index;
    
    if (e.key === "ArrowRight") {
      e.preventDefault();
      targetIndex = (index + 1) % tabButtons.length;
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      targetIndex = (index - 1 + tabButtons.length) % tabButtons.length;
    } else if (e.key === "Home") {
      e.preventDefault();
      targetIndex = 0;
    } else if (e.key === "End") {
      e.preventDefault();
      targetIndex = tabButtons.length - 1;
    }
    
    if (e.key === "ArrowRight" || e.key === "ArrowLeft" || e.key === "Home" || e.key === "End") {
      tabButtons[targetIndex].click();
      tabButtons[targetIndex].focus();
    }
  });
});

const accordionHeaders = document.querySelectorAll(".accordion-header");

accordionHeaders.forEach((header) => {
  header.addEventListener("click", (e) => {
    const currentItem = e.target.closest(".accordion-item");
    const contentId = e.target.getAttribute("aria-controls");
    const content = document.getElementById(contentId);
    const isExpanded = header.getAttribute("aria-expanded") === "true";
    
    accordionHeaders.forEach(h => {
      h.setAttribute("aria-expanded", "false");
      const id = h.getAttribute("aria-controls");
      const el = document.getElementById(id);
      el.style.maxHeight = "0";
    });
    
    if (!isExpanded) {
      header.setAttribute("aria-expanded", "true");
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
});

accordionHeaders.forEach((header, index) => {
  header.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextHeader = accordionHeaders[(index + 1) % accordionHeaders.length];
      nextHeader.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prevHeader = accordionHeaders[(index - 1 + accordionHeaders.length) % accordionHeaders.length];
      prevHeader.focus();
    } else if (e.key === "Home") {
      e.preventDefault();
      accordionHeaders[0].focus();
    } else if (e.key === "End") {
      e.preventDefault();
      accordionHeaders[accordionHeaders.length - 1].focus();
    }
  });
});