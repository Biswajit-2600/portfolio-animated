// Sidebar elements //
const sideBar = document.querySelector(".sidebar");
const menu = document.querySelector(".menu-icon");
const closeIcon = document.querySelector(".close-icon");
// 3D Laptop Model Canvas
const laptopCanvas = document.getElementById("laptopCanvas");

let screenMesh3D = null;
let videoElement3D = null;
let videoTexture3D = null;

// Project Data
const projectsData = {
  personal: [
    {
      title: "Portfolio Website - Interactive 3D Experience",
      desc: "A cutting-edge personal portfolio showcasing modern web development skills with interactive 3D elements, smooth animations, and responsive design. Features include dynamic project showcases, skill visualizations, and contact forms.",
      video: "public/assets/videos/portfolio-demo.mp4",
      href: "https://biswajit-me-3d.vercel.app",
      github: "https://github.com/Biswajit-2600/portfolio-3d",
      logo: "public/assets/icons/favicon.svg",
      logoStyle: {
        backgroundColor: "#0E1F38",
        border: "0.2px solid #0E2D58",
        boxShadow: "0px 0px 60px 0px #2F67B64D",
      },
      spotlight: "public/assets/images/spotlight.png",
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
      video: "public/assets/videos/portfolio-demo.mp4",
      href: "https://website-under-construction.vercel.app/",
      github: "#",
      logo: "public/assets/icons/favicon.svg",
      logoStyle: {
        backgroundColor: "#0E1F38",
        border: "0.2px solid #0E2D58",
        boxShadow: "0px 0px 60px 0px #2F67B64D",
      },
      spotlight: "public/assets/images/spotlight.png",
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
      video: "public/assets/videos/portfolio-demo.mp4",
      href: "https://website-under-construction.vercel.app/",
      github: "#",
      logo: "public/assets/icons/favicon.svg",
      logoStyle: {
        backgroundColor: "#0E1F38",
        border: "0.2px solid #0E2D58",
        boxShadow: "0px 0px 60px 0px #2F67B64D",
      },
      spotlight: "public/assets/images/spotlight.png",
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
      video: "public/assets/videos/portfolio-demo.mp4",
      href: "https://website-under-construction.vercel.app/",
      github: "#",
      logo: "public/assets/icons/favicon.svg",
      logoStyle: {
        backgroundColor: "#0E1F38",
        border: "0.2px solid #0E2D58",
        boxShadow: "0px 0px 60px 0px #2F67B64D",
      },
      spotlight: "public/assets/images/spotlight.png",
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
  const modalTitle = document.getElementById("projectModalTitle");

  currentProjectType = type;
  currentProjectIndex = 0;

  modalTitle.textContent =
    type === "personal" ? "Personal Projects" : "Professional Projects";

  renderProject();

  modal.classList.add("show");
  setTimeout(() => (modal.style.opacity = "1"), 10);
  document.body.style.overflow = "hidden";
}

function renderProject() {
  const projects = projectsData[currentProjectType];
  const project = projects[currentProjectIndex];

  // Update spotlight image
  const spotlight = document.getElementById("projectSpotlight");
  if (spotlight) spotlight.src = project.spotlight;

  // Update logo container styles
  const logoContainer = document.getElementById("projectLogoContainer");
  if (logoContainer) {
    const logoStyleString = Object.entries(project.logoStyle)
      .map(([key, value]) => {
        const cssKey = key.replace(/([A-Z])/g, "-$1").toLowerCase();
        return `${cssKey}: ${value}`;
      })
      .join("; ");
    logoContainer.setAttribute("style", logoStyleString);
  }

  // Update logo image
  const logo = document.getElementById("projectLogo");
  if (logo) logo.src = project.logo;

  // Update project info
  const title = document.getElementById("projectTitle");
  if (title) title.textContent = project.title;

  const desc = document.getElementById("projectDesc");
  if (desc) desc.textContent = project.desc;

  const subdesc = document.getElementById("projectSubdesc");
  if (subdesc) subdesc.textContent = project.subdesc;

  // Update tags
  const tagsContainer = document.getElementById("projectTags");
  if (tagsContainer) {
    const tagsHTML = project.tags
      .map(
        (tag) => `
      <div class="tech-logo" title="${tag.name}">
        <img src="${tag.path}" alt="${tag.name}" />
      </div>
    `
      )
      .join("");
    tagsContainer.innerHTML = tagsHTML;
  }

  // Update View Code button link - hide for professional projects
  const btnViewCode = document.getElementById("btnViewCode");
  const btnViewLive = document.getElementById("btnViewLive");
  
  if (currentProjectType === "professional") {
    // Hide View Code button for professional projects
    if (btnViewCode) {
      btnViewCode.style.display = "none";
    }
    // Make View Live button take full width
    if (btnViewLive) {
      btnViewLive.href = project.href;
      btnViewLive.style.flex = "1";
      btnViewLive.style.width = "100%";
    }
  } else {
    // Show both buttons for personal projects
    if (btnViewCode) {
      btnViewCode.style.display = "flex";
      btnViewCode.href = project.github;
    }
    if (btnViewLive) {
      btnViewLive.href = project.href;
      btnViewLive.style.flex = "";
      btnViewLive.style.width = "";
    }
  }

  // Update project counter
  const counterElement = document.getElementById("projectCounter");
  if (counterElement) {
    counterElement.textContent = `${currentProjectIndex + 1} / ${
      projects.length
    }`;
  }

  // Initialize 3D model after DOM is updated
  setTimeout(() => init3DModel(), 350);

  // ---------------------------------------------
  // UPDATE LAPTOP SCREEN VIDEO ON PROJECT CHANGE
  // ---------------------------------------------
  if (videoElement3D && screenMesh3D) {
    const videoSrc = project.video;

    if (videoSrc) {
      videoElement3D.src = videoSrc;
      videoElement3D
        .play()
        .catch((err) => console.log("Autoplay blocked:", err));
    }
  }
}

function navigateProject(direction) {
  const projects = projectsData[currentProjectType];

  if (direction === "previous") {
    currentProjectIndex =
      currentProjectIndex === 0 ? projects.length - 1 : currentProjectIndex - 1;
  } else {
    currentProjectIndex =
      currentProjectIndex === projects.length - 1 ? 0 : currentProjectIndex + 1;
  }

  renderProject();
}

// 3D Model Variables
let scene3D, camera3D, renderer3D, laptop3D, controls3D;
let isModel3DInitialized = false;

function init3DModel() {
  const canvas = document.getElementById("laptopCanvas");
  const container = document.getElementById("project3DContainer");

  if (!canvas || !container) return;

  // 🔥 FIX: Wait until modal is fully opened (prevent size=0)
  const width = container.clientWidth;
  const height = container.clientHeight;

  if (width === 0 || height === 0) {
    setTimeout(init3DModel, 100);
    return;
  }

  // Clean up previous instance
  if (controls3D) controls3D.dispose();

  // Scene setup
  scene3D = new THREE.Scene();

  // Camera setup - front facing view
  camera3D = new THREE.PerspectiveCamera(
    45,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera3D.position.set(0, 0, 5); // Front facing position
  camera3D.lookAt(0, 0, 0);

  // Renderer setup
  renderer3D = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true,
  });
  renderer3D.setSize(container.clientWidth, container.clientHeight);
  renderer3D.setPixelRatio(window.devicePixelRatio);
  renderer3D.setClearColor(0x000000, 0);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
  scene3D.add(ambientLight);

  const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1.5);
  directionalLight1.position.set(5, 5, 5);
  scene3D.add(directionalLight1);

  const directionalLight2 = new THREE.DirectionalLight(0x72a1de, 0.8);
  directionalLight2.position.set(-5, 3, -5);
  scene3D.add(directionalLight2);

  const directionalLight3 = new THREE.DirectionalLight(0xffffff, 0.6);
  directionalLight3.position.set(0, -5, 0);
  scene3D.add(directionalLight3);

  // Load laptop model
  const loader = new THREE.GLTFLoader();
  loader.load(
    "public/assets/models/laptop-model.glb",
    function (gltf) {
      laptop3D = gltf.scene;

      const screenMesh = laptop3D.getObjectByName("Object_8");

      if (screenMesh) {
        const video = document.createElement("video");
        video.src = "public/assets/videos/sample.mp4"; // temporary placeholder
        video.loop = true;
        video.muted = true;
        video.playsInline = true;
        video.autoplay = true;

        video.addEventListener("loadeddata", () => {
          const videoTex = new THREE.VideoTexture(video);
          videoTex.minFilter = THREE.LinearFilter;
          videoTex.magFilter = THREE.LinearFilter;
          videoTex.format = THREE.RGBAFormat;

          screenMesh.material = new THREE.MeshBasicMaterial({
            map: videoTex,
            toneMapped: false,
          });

          video.play();
        });
      }

      // Center and scale the model
      const box = new THREE.Box3().setFromObject(laptop3D);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());

      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 2.5 / maxDim;
      laptop3D.scale.setScalar(scale);

      laptop3D.position.sub(center.multiplyScalar(scale));

      // Rotate to face front (adjust based on model orientation)
      laptop3D.rotation.y = 0;
      laptop3D.rotation.x = 0;
      laptop3D.rotation.z = 0;

      screenMesh3D = laptop3D.getObjectByName("Object_8");

      if (screenMesh3D) {
        console.log("Laptop screen found:", screenMesh3D);

        // Create HTML5 video element
        videoElement3D = document.createElement("video");
        videoElement3D.muted = true;
        videoElement3D.loop = true;
        videoElement3D.playsInline = true;
        videoElement3D.autoplay = true;

        // Create Three.js VideoTexture
        videoTexture3D = new THREE.VideoTexture(videoElement3D);
        videoTexture3D.minFilter = THREE.LinearFilter;
        videoTexture3D.magFilter = THREE.LinearFilter;
        videoTexture3D.format = THREE.RGBAFormat;

        // Apply video material to screen
        screenMesh3D.material = new THREE.MeshBasicMaterial({
          map: videoTexture3D,
          toneMapped: false,
        });
      }

      scene3D.add(laptop3D);

      // Setup drag controls
      controls3D = new THREE.OrbitControls(camera3D, renderer3D.domElement);
      controls3D.enableDamping = true;
      controls3D.dampingFactor = 0.05;
      controls3D.enableZoom = true;
      controls3D.enablePan = false;
      controls3D.minDistance = 3;
      controls3D.maxDistance = 10;
      controls3D.target.set(0, 0, 0);

      animate3D();
    },
    undefined,
    function (error) {
      console.error("Error loading 3D model:", error);
      // Show fallback message
      container.innerHTML =
        '<div class="project-preview-placeholder">3D Model Loading...</div>';
    }
  );

  // Handle window resize
  function onWindowResize() {
    if (!container || !camera3D || !renderer3D) return;

    camera3D.aspect = container.clientWidth / container.clientHeight;
    camera3D.updateProjectionMatrix();
    renderer3D.setSize(container.clientWidth, container.clientHeight);
  }

  window.addEventListener("resize", onWindowResize);

  isModel3DInitialized = true;
}

function animate3D() {
  if (!renderer3D || !scene3D || !camera3D) return;

  requestAnimationFrame(animate3D);

  if (controls3D) {
    controls3D.update();
  }

  renderer3D.render(scene3D, camera3D);
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
      
      // Initialize modal timeline animations after modal is visible
      setTimeout(() => {
        if (typeof ScrollTrigger !== 'undefined' && typeof reinitModalTimelineAnimations === 'function') {
          // Kill existing modal ScrollTriggers and reinitialize
          const modalSections = document.querySelectorAll('#modal-education-section');
          modalSections.forEach(section => {
            ScrollTrigger.getAll().forEach(st => {
              if (st.trigger && section.contains(st.trigger)) {
                st.kill();
              }
            });
          });
          
          reinitModalTimelineAnimations();
          ScrollTrigger.refresh();
        }
      }, 300);
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

// Modal Tab Switching
document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll(".modal-tab");
  const tabContents = document.querySelectorAll(".modal-tab-content");

  tabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      const targetTab = this.getAttribute("data-tab");

      // Remove active class from all tabs and contents
      tabs.forEach((t) => t.classList.remove("active"));
      tabContents.forEach((content) => content.classList.remove("active"));

      // Add active class to clicked tab and corresponding content
      this.classList.add("active");
      const targetContent = document.getElementById(targetTab + "-tab");
      if (targetContent) {
        targetContent.classList.add("active");
        
        // If academics tab is opened, refresh ScrollTrigger and reinitialize modal timelines
        if (targetTab === "academics") {
          setTimeout(() => {
            if (typeof ScrollTrigger !== 'undefined') {
              // Kill existing ScrollTrigger instances for modal sections to recreate them
              const modalSections = document.querySelectorAll('#modal-education-section');
              modalSections.forEach(section => {
                ScrollTrigger.getAll().forEach(st => {
                  if (st.trigger && section.contains(st.trigger)) {
                    st.kill();
                  }
                });
              });
              
              // Reinitialize animations for modal timeline sections
              reinitModalTimelineAnimations();
              
              // Refresh all ScrollTrigger instances
              ScrollTrigger.refresh();
            }
          }, 100);
        }
      }
    });
  });
});

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

// ============================================
// EXPERIENCE SECTION GSAP SCROLL ANIMATIONS
// ============================================
const experienceAnimations = [];
let glowCardEffectInitialized = false;
let experienceScrollSetupDone = false;

function registerExperienceAnimation(animation) {
  if (animation) {
    experienceAnimations.push(animation);
  }
}

function cleanupExperienceAnimations() {
  while (experienceAnimations.length) {
    const animation = experienceAnimations.pop();
    if (animation.scrollTrigger) {
      animation.scrollTrigger.kill();
    }
    animation.kill();
  }
}

function initExperienceAnimations() {
  // Initialize animations for every timeline-section (experience, education)
  // Skip modal sections - they will be initialized when modal opens
  const timelineSections = document.querySelectorAll('.timeline-section:not(#modal-education-section), .academic-timeline-section');
  if (!timelineSections || timelineSections.length === 0) return;

  timelineSections.forEach((section) => {
    const timelineWrapper = section.querySelector('.timeline-wrapper, .academic-timeline-wrapper');
    const timelineMask = section.querySelector('.timeline-line-mask, .academic-timeline-line-mask');
    const expCardsContainer = section.querySelector('.experience-cards-container, .academic-cards-container');
    const expCards = section.querySelectorAll('.exp-card-wrapper, .academic-card-wrapper');
    const timelineIcons = section.querySelectorAll('.timeline-icon, .academic-timeline-icon');

    if (timelineMask) {
      // Ensure the vertical line covers the full cards container (not just the visible viewport)
      if (timelineWrapper && expCardsContainer) {
        // Set wrapper top to align with the cards container and height to the full scrollable height
        timelineWrapper.style.top = expCardsContainer.offsetTop + 'px';
        const fullHeight = Math.max(expCardsContainer.scrollHeight, expCardsContainer.offsetHeight);
        timelineWrapper.style.height = fullHeight + 'px';
        // Also set the mask and line to match
        const line = timelineWrapper.querySelector('.timeline-line, .academic-timeline-line');
        if (line) line.style.height = fullHeight + 'px';
        timelineMask.style.height = fullHeight + 'px';
      }

      // Hide the mask and keep the timeline fully visible; ensure the line spans the full content
      try {
        if (timelineMask) timelineMask.style.display = 'none';
      } catch (e) {}

      // Prefer the internal scrollable container if present (used for layout sizing only)
      const scrollerEl = section.querySelector('.experience-content, .academic-content') || null;
      // We already set wrapper/line heights above; ensure the visual line fills the container
      if (timelineWrapper) {
        const line = timelineWrapper.querySelector('.timeline-line, .academic-timeline-line');
        if (line && expCardsContainer) {
          const fullHeight = Math.max(expCardsContainer.scrollHeight, expCardsContainer.offsetHeight);
          line.style.height = fullHeight + 'px';
        }
      }
    }

    // Animate each card in this section
    expCards.forEach((card, index) => {
      const glowCard = card.querySelector('.glow-card, .academic-glow-card');
      const icon = card.querySelector('.timeline-icon, .academic-timeline-icon');

    // Card slide in animation from right - each card animates independently on scroll
    const glowAnimation = gsap.fromTo(
      glowCard,
      { 
        xPercent: 100, 
        opacity: 0 
      },
      {
        xPercent: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          scroller: (section.querySelector('.experience-content, .academic-content') || section),
          start: "top 85%",
          end: "top 60%",
          scrub: false,
          toggleActions: "play none none reverse"
        }
      }
    );
    registerExperienceAnimation(glowAnimation);

    // Timeline icon pop in animation
    if (icon) {
      const iconAnimation = gsap.fromTo(
        icon,
        { 
          scale: 0, 
          opacity: 0 
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: card,
            scroller: (section.querySelector('.experience-content, .academic-content') || section),
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
      registerExperienceAnimation(iconAnimation);
    }

    // Text elements fade in
    const cardContent = card.querySelector('.card-content, .academic-card-content');
    if (cardContent) {
      const textElements = cardContent.querySelectorAll('h3, p, li');
      const textAnimation = gsap.fromTo(
        textElements,
        { 
          y: 20, 
          opacity: 0 
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            scroller: (section.querySelector('.experience-content, .academic-content') || section),
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        }
      );
      registerExperienceAnimation(textAnimation);
    }
  });
  });
}

// Reinitialize animations specifically for modal timeline sections
function reinitModalTimelineAnimations() {
  const modalSections = document.querySelectorAll('#modal-education-section');
  
  modalSections.forEach((section) => {
    const timelineWrapper = section.querySelector('.timeline-wrapper, .academic-timeline-wrapper');
    const timelineMask = section.querySelector('.timeline-line-mask, .academic-timeline-line-mask');
    const expCardsContainer = section.querySelector('.experience-cards-container, .academic-cards-container');
    const expCards = section.querySelectorAll('.exp-card-wrapper, .academic-card-wrapper');

    if (timelineMask) {
      // Recalculate and set wrapper heights now that elements are visible
      if (timelineWrapper && expCardsContainer) {
        timelineWrapper.style.top = expCardsContainer.offsetTop + 'px';
        const fullHeight = Math.max(expCardsContainer.scrollHeight, expCardsContainer.offsetHeight);
        timelineWrapper.style.height = fullHeight + 'px';
        
        const line = timelineWrapper.querySelector('.timeline-line, .academic-timeline-line');
        if (line) line.style.height = fullHeight + 'px';
        timelineMask.style.height = fullHeight + 'px';
      }

      // Hide mask and show full timeline
      if (timelineMask) timelineMask.style.display = 'none';
    }

    // Recreate animations for each card in this modal section
    expCards.forEach((card, index) => {
      const glowCard = card.querySelector('.glow-card, .academic-glow-card');
      const icon = card.querySelector('.timeline-icon, .academic-timeline-icon');

      // Card slide in animation
      const glowAnimation = gsap.fromTo(
        glowCard,
        { 
          xPercent: 100, 
          opacity: 0 
        },
        {
          xPercent: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            scroller: section.querySelector('.experience-content, .academic-content'),
            start: "top 85%",
            end: "top 60%",
            scrub: false,
            toggleActions: "play none none reverse"
          }
        }
      );
      registerExperienceAnimation(glowAnimation);

      // Timeline icon animation
      if (icon) {
        const iconAnimation = gsap.fromTo(
          icon,
          { 
            scale: 0, 
            opacity: 0 
          },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: card,
              scroller: section.querySelector('.experience-content, .academic-content'),
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
        registerExperienceAnimation(iconAnimation);
      }

      // Text elements fade in
      const cardContent = card.querySelector('.card-content, .academic-card-content');
      if (cardContent) {
        const textElements = cardContent.querySelectorAll('h3, p, li');
        const textAnimation = gsap.fromTo(
          textElements,
          { 
            y: 20, 
            opacity: 0 
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              scroller: section.querySelector('.experience-content, .academic-content'),
              start: "top 70%",
              toggleActions: "play none none reverse"
            }
          }
        );
        registerExperienceAnimation(textAnimation);
      }
    });
  });
}

// Rotating glow border effect for cards
function initGlowCardEffect() {
  if (glowCardEffectInitialized) return;
  glowCardEffectInitialized = true;

  const glowCards = document.querySelectorAll('.glow-card, .academic-glow-card');
  
  glowCards.forEach(card => {
    let rotation = 0;
    let animating = false;

    card.addEventListener('mouseenter', () => {
      animating = true;
      animateGlow();
    });

    card.addEventListener('mouseleave', () => {
      animating = false;
    });

    function animateGlow() {
      if (!animating) return;
      rotation = (rotation + 2) % 360;
      card.style.setProperty('--start', rotation);
      requestAnimationFrame(animateGlow);
    }
  });
}

function setupExperienceSectionAnimations({ forceReinit = false } = {}) {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  if (forceReinit) {
    cleanupExperienceAnimations();
  } else if (experienceScrollSetupDone) {
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  initExperienceAnimations();
  initGlowCardEffect();
  ScrollTrigger.refresh();
  experienceScrollSetupDone = true;
}

document.addEventListener('DOMContentLoaded', () => {
  setupExperienceSectionAnimations();
});

window.addEventListener('load', () => {
  setupExperienceSectionAnimations({ forceReinit: true });
});

window.addEventListener('pageshow', (event) => {
  if (event.persisted) {
    setupExperienceSectionAnimations({ forceReinit: true });
  }
});
