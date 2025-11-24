// Project video elements removed - no longer used in new layout
// const video1 = document.getElementById("projectVideo1");
// const video2 = document.getElementById("projectVideo2");
// const video3 = document.getElementById("projectVideo3");

// Sidebar elements //
const sideBar = document.querySelector(".sidebar");
const menu = document.querySelector(".menu-icon");
const closeIcon = document.querySelector(".close-icon");

// const hoverSign = document.querySelector(".hover-sign");

// const videoList = [video1, video2, video3];

// videoList.forEach(function (video) {
//   video.addEventListener("mouseover", function () {
//     video.play();
//     hoverSign.classList.add("active");
//   });
//   video.addEventListener("mouseout", function () {
//     video.pause();
//     hoverSign.classList.remove("active");
//   });
// });

// Project Data
const projectsData = {
  personal: [
    {
      title: "Portfolio Website - Interactive 3D Experience",
      desc: "A cutting-edge personal portfolio showcasing modern web development skills with interactive 3D elements, smooth animations, and responsive design. Features include dynamic project showcases, skill visualizations, and contact forms.",
      subdesc: "Built with HTML5, CSS3, JavaScript, and Matter.js for physics-based animations. Incorporates AOS (Animate On Scroll) library and custom canvas animations for an immersive user experience.",
      href: "#",
      logo: "public/assets/icons/favicon.svg",
      logoStyle: {
        backgroundColor: "#2A1816",
        border: "0.2px solid #36201D",
        boxShadow: "0px 0px 60px 0px #AA3C304D",
      },
      spotlight: "public/assets/images/1.png",
      tags: [
        { name: "HTML5", path: "public/assets/images/1.png" },
        { name: "CSS3", path: "public/assets/images/2.png" },
        { name: "JavaScript", path: "public/assets/images/3.webp" },
        { name: "Matter.js", path: "public/assets/images/4.webp" },
      ],
      texture: null,
    },
    {
      title: "Weather Dashboard - Real-time Updates",
      desc: "A comprehensive weather application providing real-time weather data, forecasts, and interactive maps. Features location-based weather updates, hourly and weekly forecasts, and beautiful weather visualizations.",
      subdesc: "Developed using React.js, OpenWeather API, and Chart.js for data visualization. Implements responsive design principles and local storage for saved locations.",
      href: "#",
      logo: "public/assets/icons/favicon.svg",
      logoStyle: {
        backgroundColor: "#13202F",
        border: "0.2px solid #17293E",
        boxShadow: "0px 0px 60px 0px #2F6DB54D",
      },
      spotlight: "public/assets/images/5.png",
      tags: [
        { name: "React", path: "public/assets/images/5.png" },
        { name: "JavaScript", path: "public/assets/images/3.webp" },
        { name: "API", path: "public/assets/images/6.png" },
      ],
      texture: null,
    },
  ],
  professional: [
    {
      title: "E-Commerce Platform - Full Stack Solution",
      desc: "A comprehensive e-commerce platform with product management, shopping cart functionality, secure payment integration, and order tracking. Features include user authentication, product search, and admin dashboard.",
      subdesc: "Built with React.js frontend, Node.js/Express backend, MongoDB database, and Stripe payment integration. Implements JWT authentication and RESTful API architecture.",
      href: "#",
      logo: "public/assets/icons/favicon.svg",
      logoStyle: {
        backgroundColor: "#60f5a1",
        background: "linear-gradient(0deg, #60F5A150, #60F5A150), linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(208, 213, 221, 0.8) 100%)",
        border: "0.2px solid rgba(208, 213, 221, 1)",
        boxShadow: "0px 0px 60px 0px rgba(35, 131, 96, 0.3)",
      },
      spotlight: "public/assets/images/7.png",
      tags: [
        { name: "React", path: "public/assets/images/5.png" },
        { name: "Node.js", path: "public/assets/images/6.png" },
        { name: "MongoDB", path: "public/assets/images/7.png" },
        { name: "Express", path: "public/assets/images/8.png" },
      ],
      texture: null,
    },
    {
      title: "CRM Dashboard - Business Management",
      desc: "A sophisticated Customer Relationship Management system designed to streamline business operations. Features include client management, sales tracking, analytics dashboard, and automated reporting.",
      subdesc: "Developed with Vue.js, Laravel backend, MySQL database, and Chart.js for data visualization. Implements role-based access control and real-time notifications.",
      href: "#",
      logo: "public/assets/icons/favicon.svg",
      logoStyle: {
        backgroundColor: "#0E1F38",
        border: "0.2px solid #0E2D58",
        boxShadow: "0px 0px 60px 0px #2F67B64D",
      },
      spotlight: "public/assets/images/9.png",
      tags: [
        { name: "Vue.js", path: "public/assets/images/8.png" },
        { name: "Laravel", path: "public/assets/images/7.png" },
        { name: "MySQL", path: "public/assets/images/9.png" },
      ],
      texture: null,
    },
  ],
};

let currentProjectIndex = 0;
let currentProjectType = "personal";

// Project Modal Logic
function openProjectModal(type) {
  const modal = document.getElementById("projectModal");
  const modalBody = document.getElementById("projectModalBody");
  const modalTitle = document.getElementById("projectModalTitle");

  currentProjectType = type;
  currentProjectIndex = 0;

  modalTitle.textContent = type === "personal" ? "Personal Projects" : "Professional Projects";

  renderProject();

  modal.classList.add("show");
  setTimeout(() => {
    modal.style.opacity = "1";
  }, 10);
  document.body.style.overflow = "hidden";
}

function renderProject() {
  const modalBody = document.getElementById("projectModalBody");
  const projects = projectsData[currentProjectType];
  const project = projects[currentProjectIndex];

  const logoStyleString = Object.entries(project.logoStyle)
    .map(([key, value]) => {
      const cssKey = key.replace(/([A-Z])/g, "-$1").toLowerCase();
      return `${cssKey}: ${value}`;
    })
    .join("; ");

  const tagsHTML = project.tags
    .map(
      (tag) => `
    <div class="tech-logo" title="${tag.name}">
      <img src="${tag.path}" alt="${tag.name}" />
    </div>
  `
    )
    .join("");

  const previewHTML = project.texture
    ? `<video autoplay loop muted playsinline>
         <source src="${project.texture}" type="video/mp4" />
       </video>`
    : `<div class="project-preview-placeholder">Project Preview Coming Soon</div>`;

  modalBody.innerHTML = `
    <div class="project-details-side">
      <img src="${project.spotlight}" alt="spotlight" class="project-spotlight" />
      
      <div class="project-logo-container" style="${logoStyleString}">
        <img class="project-logo" src="${project.logo}" alt="logo" />
      </div>

      <div class="project-info">
        <h2 class="project-title">${project.title}</h2>
        <p class="project-desc">${project.desc}</p>
        <p class="project-subdesc">${project.subdesc}</p>
      </div>

      <div class="project-tags">
        ${tagsHTML}
      </div>

      <a class="project-link" href="${project.href}" target="_blank" rel="noreferrer">
        <p>Check Live Site</p>
        <img src="public/assets/icons/arrow-up.png" alt="arrow" />
      </a>

      <div class="project-navigation">
        <button class="arrow-btn" onclick="navigateProject('previous')">
          <img src="public/assets/icons/left-arrow.png" alt="previous" />
        </button>
        <span style="color: #888;">${currentProjectIndex + 1} / ${projects.length}</span>
        <button class="arrow-btn" onclick="navigateProject('next')">
          <img src="public/assets/icons/right-arrow.png" alt="next" />
        </button>
      </div>
    </div>

    <div class="project-preview-side">
      ${previewHTML}
    </div>
  `;
}

function navigateProject(direction) {
  const projects = projectsData[currentProjectType];
  
  if (direction === "previous") {
    currentProjectIndex = currentProjectIndex === 0 ? projects.length - 1 : currentProjectIndex - 1;
  } else {
    currentProjectIndex = currentProjectIndex === projects.length - 1 ? 0 : currentProjectIndex + 1;
  }
  
  renderProject();
}

function closeProjectModal() {
  const modal = document.getElementById("projectModal");
  modal.style.opacity = "0";
  setTimeout(() => {
    modal.classList.remove("show");
    document.body.style.overflow = "auto";
  }, 300);
}

document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".project-category-card");
  const modalClose = document.getElementById("closeProjectModal");
  const modal = document.getElementById("projectModal");
  const modalBody = document.getElementById("projectModalBody");

  const projectDetails = {
    personal: {
      title: "Personal Projects",
      content: `<h2>Personal Projects</h2>
        <p>Here are some random details about personal projects. You can add your own content here later.</p>
        <ul>
          <li>Project Alpha: A cool web app for fun.</li>
          <li>Project Beta: Learning new tech.</li>
        </ul>`,
    },
    professional: {
      title: "Professional Projects",
      content: `<h2>Professional Projects</h2>
        <p>Here are some random details about professional projects. You can add your own content here later.</p>
        <ul>
          <li>ClientX Dashboard: Enterprise solution.</li>
          <li>StartupY Platform: Scalable SaaS.</li>
        </ul>`,
    },
  };

  cards.forEach((card) => {
    card.addEventListener("click", function () {
      const type = card.getAttribute("data-project");
      openProjectModal(type);
    });
  });

  modalClose.addEventListener("click", function () {
    closeProjectModal();
  });

  window.addEventListener("click", function (e) {
    if (e.target === modal) {
      closeProjectModal();
    }
  });
});

// Sidebar elements //
menu.addEventListener("click", function () {
  sideBar.classList.remove("close-sidebar");
  sideBar.classList.add("open-sidebar");
});

closeIcon.addEventListener("click", function () {
  sideBar.classList.remove("open-sidebar");
  sideBar.classList.add("close-sidebar");
});

// Initialize AOS (Animate On Scroll)
if (typeof AOS !== "undefined") {
  AOS.init();
}

// Manual blur control for hero-skills-animation to match hero-info behavior
const heroSkillsAnimation = document.querySelector(".hero-skills-animation");
const heroSection = document.querySelector(".hero-section");

if (heroSkillsAnimation && heroSection) {
  let currentBlur = 0;
  let targetBlur = 0;
  let isAnimating = false;
  let lastTime = performance.now();

  // Smooth interpolation with variable speed
  function lerp(start, end, factor) {
    return start + (end - start) * factor;
  }

  // Animate blur smoothly with frame-rate independence
  function animateBlur(currentTime) {
    const deltaTime = (currentTime - lastTime) / 16.67; // Normalize to 60fps
    lastTime = currentTime;

    // Faster interpolation for more responsive feel (0.2 instead of 0.1)
    const lerpFactor = Math.min(1 * deltaTime, 1);
    currentBlur = lerp(currentBlur, targetBlur, lerpFactor);

    // Smaller threshold for smoother animation
    if (Math.abs(currentBlur - targetBlur) > 0.05) {
      heroSkillsAnimation.style.filter = `blur(${currentBlur.toFixed(2)}px)`;
      requestAnimationFrame(animateBlur);
    } else {
      heroSkillsAnimation.style.filter = `blur(${targetBlur}px)`;
      currentBlur = targetBlur; // Snap to target
      isAnimating = false;
    }
  }

  // Create intersection observer for the hero section
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const scrollProgress = entry.intersectionRatio;

        // Calculate blur based on how much of hero is visible (smoother curve with more breakpoints)
        if (scrollProgress > 0.75) {
          // Fully in view - crystal clear
          targetBlur = 0;
        } else if (scrollProgress > 0.65) {
          // Slight blur as it starts to exit
          targetBlur = ((0.75 - scrollProgress) / 0.1) * 5;
        } else if (scrollProgress > 0.5) {
          // Moderate blur
          targetBlur = 5 + ((0.65 - scrollProgress) / 0.15) * 10;
        } else if (scrollProgress > 0.35) {
          // Increasing blur
          targetBlur = 13 + ((0.5 - scrollProgress) / 0.15) * 15;
        } else if (scrollProgress > 0.25) {
          // Heavy blur
          targetBlur = 23 + ((0.35 - scrollProgress) / 0.1) * 20;
        } else {
          // Maximum blur when mostly out of view
          targetBlur = 40;
        }

        heroSkillsAnimation.style.opacity = scrollProgress < 0.1 ? 0 : 1;

        // Start animation if not already running
        if (!isAnimating) {
          isAnimating = true;
          lastTime = performance.now();
          requestAnimationFrame(animateBlur);
        }
      });
    },
    {
      threshold: Array.from({ length: 41 }, (_, i) => i / 40), // More granular updates (every 2.5%)
      rootMargin: "0px",
    }
  );

  observer.observe(heroSection);
}

// General Modal Functionality
const modalBtn = document.getElementById("modalOpen");
const modal = document.getElementById("allModal");
const closeModalBtn = document.getElementById("closeModal");
const modalOverlay = modal?.querySelector(".modal-overlay");

if (modalBtn && modal) {
  // Open modal with delayed fade in
  modalBtn.addEventListener("click", function (e) {
    e.preventDefault();

    // Show modal with delayed fade
    modal.style.display = "flex";
    setTimeout(() => {
      modal.classList.add("show");
    }, 10);

    // Prevent body scroll
    document.body.style.overflow = "hidden";
  });

  // Close modal function
  function closeModal() {
    modal.classList.remove("show");
    setTimeout(() => {
      modal.style.display = "none";
      document.body.style.overflow = "";
    }, 500);
  }

  // Close on X button click
  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", closeModal);
  }

  // Close on overlay click
  if (modalOverlay) {
    modalOverlay.addEventListener("click", closeModal);
  }
}

// Ensure tooltip arrows match their background colors
document.addEventListener("DOMContentLoaded", function () {
  const tooltips = document.querySelectorAll(".icon-tooltip");
  tooltips.forEach((tooltip) => {
    const bgColor = tooltip.style.backgroundColor;
    if (bgColor) {
      tooltip.style.setProperty("--tooltip-bg", bgColor);
      // Set the arrow color to match by updating the border-top-color
      const afterStyle = document.createElement("style");
      const tooltipId = "tooltip-" + Math.random().toString(36).substr(2, 9);
      tooltip.classList.add(tooltipId);
      afterStyle.textContent = `.${tooltipId}::after { border-top-color: ${bgColor} !important; }`;
      document.head.appendChild(afterStyle);
    }
  });
});
