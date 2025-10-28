// ⚡ Floating Particle Network Background
const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

let w, h;
let particles = [];
const num = 80;
const maxDist = 150;

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

for (let i = 0; i < num; i++) {
  particles.push({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.7,
    vy: (Math.random() - 0.5) * 0.7,
  });
}

function draw() {
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "rgba(0, 229, 255, 0.7)";

  for (let i = 0; i < num; i++) {
    const p = particles[i];
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > w) p.vx *= -1;
    if (p.y < 0 || p.y > h) p.vy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
    ctx.fill();

    for (let j = i + 1; j < num; j++) {
      const p2 = particles[j];
      const dx = p.x - p2.x;
      const dy = p.y - p2.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < maxDist) {
        ctx.strokeStyle = `rgba(0, 229, 255, ${1 - dist / maxDist})`;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(draw);
}
draw();
// 🔹 Smooth Scroll + Active Link on Scroll
const navLinks = document.querySelectorAll("nav a");
const sections = document.querySelectorAll("section");

// Add click event for smooth scroll & active highlight
// Add click event for smooth scroll & active highlight
navLinks.forEach(link => {
  link.addEventListener("click", function(e) {
    const href = this.getAttribute("href");

    // ✅ Only prevent default for same-page links (anchors starting with "#")
    if (href.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80, // adjust for fixed header
          behavior: "smooth",
        });
      }
    }
    // else → normal navigation (e.g. multimedia.html) will happen automatically
  });
});


// Intersection Observer to highlight link on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const id = entry.target.getAttribute("id");
    const activeLink = document.querySelector(`nav a[href="#${id}"]`);
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.remove("active"));
      activeLink.classList.add("active");
    }
  });
}, {
  threshold: 0.6 // 60% visible
});

sections.forEach(section => observer.observe(section));

// 🔹 Hobbies Lightbox
const hobbyImages = document.querySelectorAll(".hobby-gallery img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const closeLightbox = document.getElementById("closeLightbox");

hobbyImages.forEach(img => {
  img.addEventListener("click", () => {
    lightbox.classList.add("active");
    lightboxImg.src = img.src;
  });
});

closeLightbox.addEventListener("click", () => {
  lightbox.classList.remove("active");
});

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lightbox.classList.remove("active");
  }
});

// 🔹 Photography Lightbox
const photoCards = document.querySelectorAll(".photo-card img");
const lightboxPhoto = document.getElementById("lightbox");
const lightboxImgPhoto = document.getElementById("lightboxImg");
const lightboxCaption = document.getElementById("lightboxCaption");
const closeLightboxPhoto = document.getElementById("closeLightbox");

photoCards.forEach(img => {
  img.addEventListener("click", () => {
    lightboxPhoto.classList.add("active");
    lightboxImgPhoto.src = img.src;
    lightboxCaption.textContent = img.alt;
  });
});

closeLightboxPhoto.addEventListener("click", () => {
  lightboxPhoto.classList.remove("active");
});

lightboxPhoto.addEventListener("click", (e) => {
  if (e.target === lightboxPhoto) {
    lightboxPhoto.classList.remove("active");
  }
});
