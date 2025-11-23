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

// Project Modal Logic
function openProjectModal(type) {
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
        </ul>`
    },
    professional: {
      title: "Professional Projects",
      content: `<h2>Professional Projects</h2>
        <p>Here are some random details about professional projects. You can add your own content here later.</p>
        <ul>
          <li>ClientX Dashboard: Enterprise solution.</li>
          <li>StartupY Platform: Scalable SaaS.</li>
        </ul>`
    }
  };
  if (projectDetails[type]) {
    modalBody.innerHTML = projectDetails[type].content;
    modal.classList.add("show");
    setTimeout(() => {
      modal.style.opacity = "1";
    }, 10);
    document.body.style.overflow = "hidden";
  }
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
        </ul>`
    },
    professional: {
      title: "Professional Projects",
      content: `<h2>Professional Projects</h2>
        <p>Here are some random details about professional projects. You can add your own content here later.</p>
        <ul>
          <li>ClientX Dashboard: Enterprise solution.</li>
          <li>StartupY Platform: Scalable SaaS.</li>
        </ul>`
    }
  };

  cards.forEach(card => {
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

  // Close on Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.classList.contains("show")) {
      closeModal();
    }
  });
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
