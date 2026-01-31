// Page Load Animation
// Optimized: Show content as soon as DOM is ready, don't wait for all images
window.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('loaded');
});

// Backup: Ensure it runs on load just in case
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

// Fix for blank page issue on back button (bfcache)
window.addEventListener('pageshow', (event) => {
  // Always force reset the state
  document.body.classList.remove('fade-out');
  document.body.classList.add('loaded');

  // Backup: Force it again after a short delay
  setTimeout(() => {
    document.body.classList.remove('fade-out');
    document.body.classList.add('loaded');
  }, 50);
});


// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });
}

// Typewriter Effect (Hero)
const mainTextElem = document.getElementById('typewriter-main');
const loopTextElem = document.getElementById('typewriter-loop');

let mainText = "Hello, I'm Andrej.";
let loopPhrases = [
  "Graphic Designer.",
  "Frontend Developer.",
  "Photographer.",
  "UI/UX Designer.",
];

let loopIndex = 0;
let charIndex = 0;
let isDeleting = false;
let isLooping = false;
let heroCursor = null;

// Initialize cursors
if (mainTextElem && loopTextElem) {
  mainTextElem.innerHTML = '';
  heroCursor = createCursor();
  mainTextElem.appendChild(heroCursor);
}

function typeWriter() {
  // 1. Type Main Text First
  if (!isLooping) {
    if (charIndex < mainText.length) {
      if (mainText.charAt(charIndex) === ' ') {
        mainTextElem.insertBefore(document.createTextNode(' '), heroCursor);
      } else {
        const charSpan = document.createElement('span');
        charSpan.textContent = mainText.charAt(charIndex);
        charSpan.className = 'matrix-char';
        mainTextElem.insertBefore(charSpan, heroCursor);
      }
      charIndex++;
      setTimeout(typeWriter, 50);
    } else {
      // Main text finished
      mainTextElem.removeChild(heroCursor); // Remove main cursor
      isLooping = true;
      charIndex = 0;

      // Setup loop cursor
      loopTextElem.innerHTML = '';
      heroCursor = createCursor();
      loopTextElem.appendChild(heroCursor);

      setTimeout(typeWriter, 250);
    }
    return;
  }

  // 2. Loop Subtitles
  const currentPhrase = loopPhrases[loopIndex];

  if (isDeleting) {
    // Deleting - Remove last child before cursor
    // The cursor is the last child, so we remove the one before it
    if (heroCursor.previousSibling) {
      loopTextElem.removeChild(heroCursor.previousSibling);
      charIndex--;
    }
  } else {
    // Typing
    if (currentPhrase.charAt(charIndex) === ' ') {
      loopTextElem.insertBefore(document.createTextNode(' '), heroCursor);
    } else {
      const charSpan = document.createElement('span');
      charSpan.textContent = currentPhrase.charAt(charIndex);
      charSpan.className = 'matrix-char';
      loopTextElem.insertBefore(charSpan, heroCursor);
    }
    charIndex++;
  }

  // Speed Logic
  let typeSpeed = 50;
  if (isDeleting) typeSpeed = 25;

  // Logic to switch states
  if (!isDeleting && charIndex === currentPhrase.length) {
    // Finished typing phrase
    typeSpeed = 1000; // Pause at end
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    // Finished deleting phrase
    isDeleting = false;
    loopIndex = (loopIndex + 1) % loopPhrases.length;
    typeSpeed = 250; // Pause before new word
  }

  setTimeout(typeWriter, typeSpeed);
}

// Start Typewriter on Load
window.addEventListener('load', () => {
  if (mainTextElem && loopTextElem) {
    // Reset and start
    mainTextElem.innerHTML = '';
    heroCursor = createCursor();
    mainTextElem.appendChild(heroCursor);
    // Clear loop text
    loopTextElem.innerHTML = '';

    typeWriter();
  }
});

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
  });
});

// Category Transitions
const categoryCards = document.querySelectorAll('.category-card');

function handleTransition(e) {
  e.preventDefault();
  const targetUrl = e.currentTarget.href;

  // Add fade-out class
  document.body.classList.add('fade-out');

  // Wait for animation then navigate
  setTimeout(() => {
    window.location.href = targetUrl;
  }, 300); // Matches CSS duration
}

categoryCards.forEach(card => {
  card.addEventListener('click', handleTransition);
});

// Scroll Reveal Animation & About Typewriter
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};

const aboutTitleElem = document.getElementById('about-title');
const aboutBioElem = document.getElementById('about-bio');
let aboutTitleText = "About Me";
// Bio text split by lines
let aboutBioLines = [
  "I craft digital experiences with a focus on minimalism, fluid motion, and timeless aesthetics.",
  "With a background in both graphic design and photography, I bring a unique perspective to every project.",
  "My work is driven by a passion for storytelling and a dedication to detail.",
];

let aboutTyped = false;

// Helper to create cursor
function createCursor() {
  const span = document.createElement('span');
  span.className = 'cursor';
  span.innerHTML = '&nbsp;';
  return span;
}

function typeGeneric(element, text, speed, callback) {
  element.innerHTML = '';
  const cursor = createCursor();
  element.appendChild(cursor);

  let i = 0;
  function type() {
    if (i < text.length) {
      if (text.substring(i, i + 4) === "<br>") {
        element.insertBefore(document.createElement('br'), cursor);
        i += 4;
      } else {
        const char = text.charAt(i);
        if (char === ' ') {
          element.insertBefore(document.createTextNode(' '), cursor);
        } else {
          const charSpan = document.createElement('span');
          charSpan.textContent = char;
          charSpan.className = 'matrix-char';
          element.insertBefore(charSpan, cursor);
        }
        i++;
      }
      setTimeout(type, speed);
    } else {
      element.removeChild(cursor); // Remove cursor at end
      if (callback) callback();
    }
  }
  type();
}

function typeLine(element, text, speed) {
  element.innerHTML = '';
  const cursor = createCursor();
  element.appendChild(cursor);

  let i = 0;
  function type() {
    if (i < text.length) {
      const char = text.charAt(i);
      if (char === ' ') {
        element.insertBefore(document.createTextNode(' '), cursor);
      } else {
        const charSpan = document.createElement('span');
        charSpan.textContent = char;
        charSpan.className = 'matrix-char';
        element.insertBefore(charSpan, cursor);
      }
      i++;
      setTimeout(type, speed);
    } else {
      element.removeChild(cursor); // Remove cursor at end
    }
  }
  if (text.length > 0) type();
  else {
    element.removeChild(cursor);
    element.innerHTML = "&nbsp;";
  }
}

// ------------------------------------
// Language Switcher Logic
// ------------------------------------
const translations = {
  en: {
    nav_design: "Graphic Design",
    nav_photo: "Photography",
    nav_about: "About",
    hero_main: "Hello, I'm Andrej.",
    hero_loop: [
      "Graphic Designer.",
      "Frontend Developer.",
      "Photographer.",
      "UI/UX Designer."
    ],
    about_title: "About Me",
    about_bio: [
      "I craft digital experiences with a focus on minimalism, fluid motion, and timeless aesthetics.",
      "With a background in both graphic design and photography, I bring a unique perspective to every project.",
      "My work is driven by a passion for storytelling and a dedication to detail."
    ],
    cat_design: "Graphic Design",
    cat_photo: "Photography",
    lang_label: "Language",
    // New Page Translations
    page_graphic_title: "Graphic Design",
    page_graphic_subtitle: "Select a Category",
    page_photo_title: "Photography",
    page_photo_subtitle: "Equipment /// Fujifilm X-S10 23mm 1.4, 15-45mm",
    page_frontend_title: "Frontend Projects",
    card_gallery: "Gallery",
    card_projects: "Frontend Projects",
    // Gallery Page
    page_gallery_title: "Gallery",
    page_gallery_subtitle: "Selected works 2023-2025",
    // Photo Descriptions (Photography Page)
    photo_desc_1: "Urban Shadows",
    photo_desc_2: "Portraits",
    photo_desc_3: "Architecture",
    photo_desc_4: "Nature",

    // New Photography Sections
    nav_fashion: "Fashion/Studio",
    nav_portraits: "Portraits",
    nav_protests: "Protests",
    nav_street: "Street/Casual",

    title_fashion: "Fashion/Studio",
    desc_fashion: "Photoshoots for brands and fashion photography.",
    title_portraits: "Portraits",
    desc_portraits: "Faces and emotions.",
    title_protests: "Protests",
    desc_protests: "Lines, angles and protests.",
    title_street: "Street/Casual",
    desc_street: "The wild and the serene.",

    // Gallery Descriptions
    gallery_desc_1: "Brand Identity",
    gallery_desc_2: "Typography Layout",
    gallery_desc_3: "Poster Design",
    gallery_desc_4: "Book Cover"
  },
  sr: {
    nav_design: "Grafički Dizajn",
    nav_photo: "Fotografija",
    nav_about: "O Meni",
    hero_main: "Zdravo, ja sam Andrej.",
    hero_loop: [
      "Grafički Dizajner.",
      "Frontend Developer.",
      "Fotograf.",
      "UI/UX Dizajner."
    ],
    about_title: "O Meni",
    about_bio: [
      "Stvaram digitalna iskustva sa fokusom na minimalizam, fluidnost i bezvremensku estetiku.",
      "Sa iskustvom u grafičkom dizajnu i fotografiji, donosim jedinstvenu perspektivu svakom projektu.",
      "Moj rad pokreće strast prema pripovedanju i posvećenost detaljima.",
    ],
    cat_design: "Grafički Dizajn",
    cat_photo: "Fotografija",
    lang_label: "Jezik",
    // New Page Translations
    page_graphic_title: "Grafički Dizajn",
    page_graphic_subtitle: "Izaberite Kategoriju",
    page_photo_title: "Fotografija",
    page_photo_subtitle: "Oprema /// Fujifilm X-S10 23mm 1.4, 15-45mm",
    page_frontend_title: "Frontend Projekti",
    card_gallery: "Galerija",
    card_projects: "Frontend Projekti",
    // Gallery Page
    page_gallery_title: "Galerija",
    page_gallery_subtitle: "Izabrani radovi 2023-2025",

    // Photo Descriptions (Old - kept for reference if needed)
    photo_desc_1: "Urbane Senke",
    photo_desc_2: "Portreti",
    photo_desc_3: "Arhitektura",
    photo_desc_4: "Priroda",

    // New Photography Sections
    nav_fashion: "Moda/Studio",
    nav_portraits: "Portreti",
    nav_protests: "Protesti",
    nav_street: "Ulična/Kežual",

    title_fashion: "Moda/Studio",
    desc_fashion: "Fotografisanje za brendove i modna fotografija.",
    title_portraits: "Portreti",
    desc_portraits: "Lica i emocije.",
    title_protests: "Protesti",
    desc_protests: "Linije, uglovi i protesti.",
    title_street: "Ulična/Kežual",
    desc_street: "Divlje i spokojno.",

    // Gallery Descriptions
    gallery_desc_1: "Brend Identitet",
    gallery_desc_2: "Tipografski Raspored",
    gallery_desc_3: "Dizajn Postera",
    gallery_desc_4: "Korice Knjige"
  }
};

let currentLang = 'en';

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('language', lang); // Save preference
  const content = translations[lang];

  // 1. Static Text Updates
  // Nav
  const navLinksList = document.querySelectorAll('.nav-links a');
  if (navLinksList.length >= 3) {
    navLinksList[0].textContent = content.nav_design;
    navLinksList[1].textContent = content.nav_photo;
    // The About link might refer to #about or a separate page depending on context,
    // but for index.html it is typically the 3rd link.
    // We check href to be safe if possible, or assume order.
    navLinksList[2].textContent = content.nav_about;
  }

  // Category Cards (Index & Graphic Design page)
  const designCard = document.querySelector('.design-card h2');
  if (designCard) designCard.textContent = content.cat_design; // Index

  const photoCard = document.querySelector('.photo-card h2');
  if (photoCard) photoCard.textContent = content.cat_photo; // Index

  // Page Titles & Subtitles
  const pageTitle = document.getElementById('page-title');
  if (pageTitle) {
    // Check which page by content or URL, but simpler: check ID presence
    // We might need distinct IDs or logic.
    // For now, let's assume specific IDs or use text injection carefully.
    // Better: Use specific IDs for each page's title if they differ, or update based on current page.
    if (window.location.href.includes('graphic-design')) {
      pageTitle.childNodes[0].nodeValue = content.page_graphic_title + " "; // Keep space for <br>
    } else if (window.location.href.includes('photography')) {
      pageTitle.childNodes[0].nodeValue = content.page_photo_title + " ";
    } else if (window.location.href.includes('frontend-projects')) {
      pageTitle.textContent = content.page_frontend_title;
    } else if (window.location.href.includes('gallery')) {
      pageTitle.textContent = content.page_gallery_title;
    }
  }

  const pageSubtitle = document.getElementById('page-subtitle');
  if (pageSubtitle) {
    if (window.location.href.includes('graphic-design')) {
      pageSubtitle.textContent = content.page_graphic_subtitle;
    } else if (window.location.href.includes('photography')) {
      pageSubtitle.textContent = content.page_photo_subtitle;
    } else if (window.location.href.includes('gallery')) {
      pageSubtitle.textContent = content.page_gallery_subtitle;
    }
  }

  // Photo Descriptions (Photography Page)
  // New Generic Logic for Photography Page Sections
  const photographyIds = [
    'nav-fashion', 'nav-portraits', 'nav-protests', 'nav-street',
    'title-fashion', 'title-portraits', 'title-protests', 'title-street',
    'desc-fashion', 'desc-portraits', 'desc-protests', 'desc-street'
  ];

  photographyIds.forEach(id => {
    const el = document.getElementById(id);
    // Key format: id with underscores instead of hyphens
    const key = id.replace(/-/g, '_');
    if (el && content[key]) {
      el.textContent = content[key];
    }
  });

  // Old specific IDs (Keep if needed for compatibility or remove if unused)
  const photoDesc1 = document.getElementById('photo-desc-1');
  if (photoDesc1) photoDesc1.textContent = content.photo_desc_1;
  const photoDesc2 = document.getElementById('photo-desc-2');
  if (photoDesc2) photoDesc2.textContent = content.photo_desc_2;
  const photoDesc3 = document.getElementById('photo-desc-3');
  if (photoDesc3) photoDesc3.textContent = content.photo_desc_3;
  const photoDesc4 = document.getElementById('photo-desc-4');
  if (photoDesc4) photoDesc4.textContent = content.photo_desc_4;

  // Gallery Descriptions (Gallery Page)
  const galleryDesc1 = document.getElementById('gallery-desc-1');
  if (galleryDesc1) galleryDesc1.textContent = content.gallery_desc_1;
  const galleryDesc2 = document.getElementById('gallery-desc-2');
  if (galleryDesc2) galleryDesc2.textContent = content.gallery_desc_2;
  const galleryDesc3 = document.getElementById('gallery-desc-3');
  if (galleryDesc3) galleryDesc3.textContent = content.gallery_desc_3;
  const galleryDesc4 = document.getElementById('gallery-desc-4');
  if (galleryDesc4) galleryDesc4.textContent = content.gallery_desc_4;

  // Cards on Graphic Design Page
  // We can target them by href or specific class if added.
  // Using selector for specific links:
  const galleryCard = document.querySelector('a[href="gallery.html"] h2');
  if (galleryCard) galleryCard.textContent = content.card_gallery;

  const projectsCard = document.querySelector('a[href="frontend-projects.html"] h2');
  if (projectsCard) projectsCard.textContent = content.card_projects;


  // 2. Typewriter Updates (Variables)
  // We need to update the global variables used by typeWriter()
  // Note: const cannot be reassigned. We should have defined them with let if we wanted to change them.
  // BUT: We can't change 'const mainText'.
  // FIX: We will modify the typeWriter function to read from a 'currentText' object or simpler,
  // just re-assign the logic if we refactor variables to 'let'.
  //
  // Since I cannot change 'const' declarations at the top of the file without a full rewrite,
  // I will rely on reloading the page or handling it differently?
  // NO, reloading is bad. I must refactor the variables to 'let' at the top of the file first.

  // See next step for refactoring 'const' to 'let'.
  mainText = content.hero_main;
  loopPhrases = content.hero_loop;
  aboutTitleText = content.about_title;
  aboutBioLines = content.about_bio;

  // Restart Hero Typewriter
  if (mainTextElem && loopTextElem) {
    // Clear timeouts? ideally yes but simplistic restart:
    // We might need to implement a 'reset' method, or just rely on overwriting
    // For now, let's just clear and reset state if possible.
    // A full reset is complex without global timer IDs.
    // Let's at least update the current loop logic if it's running.

    // Force reset of hero
    isLooping = false;
    isDeleting = false;
    charIndex = 0;
    loopIndex = 0;
    mainTextElem.innerHTML = '';
    loopTextElem.innerHTML = '';

    // Remove old cursor if present
    if (heroCursor && heroCursor.parentNode) {
      heroCursor.parentNode.removeChild(heroCursor);
    }
    heroCursor = createCursor();
    mainTextElem.appendChild(heroCursor);

    // Note: Existing timeouts will still fire! This is a potential bug source.
    // ideally we track the timeout ID.
    // For this task, assuming user won't spam click, we can just hope or
    // add a global 'timeoutId' variable.
  }

  // Restart About Typewriter
  // Only if it was already visible/typed would we want to re-type it?
  // Or just update content?
  // If we re-type it might be annoying.
  // Let's just reset the flag so it types again if we scroll away and back?
  // Or actually re-trigger it immediately if visible.
  if (aboutTyped && aboutTitleElem && aboutBioElem) { // if already typed
    // Re-trigger typing
    typeGeneric(aboutTitleElem, aboutTitleText, 50);
    aboutBioElem.innerHTML = '';
    aboutBioLines.forEach((line) => {
      const lineContainer = document.createElement('div');
      lineContainer.style.marginBottom = line === "" ? "1.5rem" : "0.5rem";
      lineContainer.style.minHeight = "1.5rem";
      aboutBioElem.appendChild(lineContainer);
      setTimeout(() => {
        typeLine(lineContainer, line, 10);
      }, 100);
    });
  }
}

// Check LocalStorage on Load
window.addEventListener('load', () => {
  const savedLang = localStorage.getItem('language');
  if (savedLang && translations[savedLang]) {
    setLanguage(savedLang);

    // Update toggle icon
    const langToggle = document.getElementById('lang-toggle');
    const activeBtn = document.querySelector(`.lang-option[data-lang="${savedLang}"]`);
    if (langToggle && activeBtn) {
      const selectedSvg = activeBtn.querySelector('svg').cloneNode(true);
      langToggle.innerHTML = '';
      langToggle.appendChild(selectedSvg);
    }
  }
});

// Language Dropdown Toggle
const langToggle = document.getElementById('lang-toggle');
const langMenu = document.getElementById('lang-menu');
const langOptions = document.querySelectorAll('.lang-option');

if (langToggle && langMenu) {
  langToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    langMenu.classList.toggle('active');
  });

  document.addEventListener('click', (e) => {
    if (!langToggle.contains(e.target) && !langMenu.contains(e.target)) {
      langMenu.classList.remove('active');
    }
  });

  langOptions.forEach(btn => {
    btn.addEventListener('click', () => {
      const selectedLang = btn.getAttribute('data-lang');
      setLanguage(selectedLang);

      // Update toggle icon to match selected
      const selectedSvg = btn.querySelector('svg').cloneNode(true);
      langToggle.innerHTML = '';
      langToggle.appendChild(selectedSvg);

      langMenu.classList.remove('active');
    });
  });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');

      // Trigger About Typewriter
      if (entry.target.id === 'about' && !aboutTyped) {
        aboutTyped = true;
        // Start with Title
        typeGeneric(aboutTitleElem, aboutTitleText, 80);

        // Prepare Bio Lines
        aboutBioElem.innerHTML = ''; // Clear
        aboutBioLines.forEach((line, index) => {
          const lineContainer = document.createElement('div');
          lineContainer.style.marginBottom = line === "" ? "1.5rem" : "0.5rem"; // Spacing for empty line
          lineContainer.style.minHeight = "1.5rem"; // Reserve space
          aboutBioElem.appendChild(lineContainer);

          // Type all lines simultaneously (slightly staggered start if desired, or pure simultaneous)
          setTimeout(() => {
            typeLine(lineContainer, line, 15);
          }, 100); // Start bio shortly after title starts
        });
      }
    }
  });
}, observerOptions);


document.querySelectorAll('.scroll-reveal').forEach(el => {
  observer.observe(el);
});

// ------------------------------------
// Local Navbar Active State
// ------------------------------------
const localNavLinks = document.querySelectorAll('.local-nav a');
const sections = document.querySelectorAll('.collection-section');

if (localNavLinks.length > 0) {
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= (sectionTop - 200)) {
        current = section.getAttribute('id');
      }
    });

    localNavLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href').substring(1); // Remove #
      if (current && href === current) {
        link.classList.add('active');
      }
    });
  });
}

// ------------------------------------
// Back to Top functionality
// ------------------------------------
const backToTopBtn = document.getElementById('back-to-top');

if (backToTopBtn) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ------------------------------------
// Lightbox Logic
// ------------------------------------
const lightbox = document.getElementById('lightbox');
if (lightbox) {
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const closeBtn = document.querySelector('.lightbox-close');
  const prevBtn = document.querySelector('.lightbox-prev');
  const nextBtn = document.querySelector('.lightbox-next');

  let currentCollectionItems = [];
  let currentIndex = -1;

  // Open Lightbox
  document.querySelectorAll('.grid-item').forEach(item => {
    item.addEventListener('click', () => {
      const collectionName = item.parentElement.getAttribute('data-collection');

      // Get all items in this specific collection
      currentCollectionItems = Array.from(document.querySelectorAll(`.portfolio-grid[data-collection="${collectionName}"] .grid-item`));

      currentIndex = currentCollectionItems.indexOf(item);

      updateLightboxContent();
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    });
  });

  // Close Lightbox
  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  closeBtn.addEventListener('click', closeLightbox);

  // Close on outside click
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Zoom & Pan Variables
  let zoomLevel = 1;
  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let translateX = 0;
  let translateY = 0;
  const MIN_ZOOM = 1;
  const MAX_ZOOM = 5;

  // Touch Variables
  let initialPinchDistance = 0;
  let initialZoom = 1;
  let lastTouchX = 0;
  let lastTouchY = 0;
  // Swipe Variables
  let swipeStartX = 0;
  let swipeStartY = 0;
  let isSwipeDetection = false;

  function resetZoom() {
    zoomLevel = 1;
    translateX = 0;
    translateY = 0;
    updateTransform();
    lightboxImg.style.cursor = 'grab';
  }

  function updateTransform() {
    lightboxImg.style.transform = `translate(${translateX}px, ${translateY}px) scale(${zoomLevel})`;
  }

  // Zoom on Wheel
  lightbox.addEventListener('wheel', (e) => {
    // Only zoom if hovering over the image or wrapper
    if (!e.target.closest('.lightbox-content-wrapper')) return;

    e.preventDefault();
    const delta = e.deltaY * -0.001; // Scale factor
    const newZoom = Math.min(Math.max(zoomLevel + delta, MIN_ZOOM), MAX_ZOOM);

    // If zooming out to 1, reset translate to keep it centered
    if (newZoom === 1) {
      translateX = 0;
      translateY = 0;
    }

    zoomLevel = newZoom;
    updateTransform();
  }, { passive: false });

  // Panning Support (Mouse)
  lightboxImg.addEventListener('mousedown', (e) => {
    if (zoomLevel > 1) {
      isDragging = true;
      startX = e.clientX - translateX;
      startY = e.clientY - translateY;
      lightboxImg.style.cursor = 'grabbing';
      e.preventDefault(); // Prevent default drag behavior
    }
  });

  window.addEventListener('mousemove', (e) => {
    if (isDragging && zoomLevel > 1) {
      translateX = e.clientX - startX;
      translateY = e.clientY - startY;
      updateTransform();
    }
  });

  window.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      lightboxImg.style.cursor = 'grab';
    }
  });

  // Touch Support (Pinch & Pan)
  lightbox.addEventListener('touchstart', (e) => {
    if (e.touches.length === 2) {
      // Pinch Start
      isDragging = false;
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      initialPinchDistance = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
      initialZoom = zoomLevel;
    } else if (e.touches.length === 1) {
      if (zoomLevel > 1) {
        // Pan Start (only if zoomed in)
        isDragging = true;
        lastTouchX = e.touches[0].clientX;
        lastTouchY = e.touches[0].clientY;
      } else {
        // Swipe Start (if not zoomed)
        isSwipeDetection = true;
        swipeStartX = e.touches[0].clientX;
        swipeStartY = e.touches[0].clientY;
      }
    }
  }, { passive: false });

  lightbox.addEventListener('touchmove', (e) => {
    if (e.touches.length === 2) {
      // Pinch Move
      e.preventDefault(); // Prevent page scroll
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const currentDistance = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);

      if (initialPinchDistance > 0) {
        const scaleChange = currentDistance / initialPinchDistance;
        const newZoom = Math.min(Math.max(initialZoom * scaleChange, MIN_ZOOM), MAX_ZOOM);
        zoomLevel = newZoom;

        if (zoomLevel === 1) {
          translateX = 0;
          translateY = 0;
        }
        updateTransform();
      }
    } else if (e.touches.length === 1) {
      if (zoomLevel > 1 && isDragging) {
        // Pan Move
        e.preventDefault();
        const currentX = e.touches[0].clientX;
        const currentY = e.touches[0].clientY;
        const deltaX = currentX - lastTouchX;
        const deltaY = currentY - lastTouchY;

        translateX += deltaX;
        translateY += deltaY;

        lastTouchX = currentX;
        lastTouchY = currentY;
        updateTransform();
      } else if (isSwipeDetection) {
        // Swipe Move
        const currentX = e.touches[0].clientX;
        const currentY = e.touches[0].clientY;
        const diffX = currentX - swipeStartX;
        const diffY = currentY - swipeStartY;

        // If horizontal movement is dominant, prevent scrolling
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 10) {
          e.preventDefault();
        }
      }
    }
  }, { passive: false });

  lightbox.addEventListener('touchend', (e) => {
    if (e.touches.length < 2) {
      initialPinchDistance = 0;
    }
    if (e.touches.length === 0) {
      isDragging = false;

      if (isSwipeDetection) {
        const endX = e.changedTouches[0].clientX;
        const diffX = endX - swipeStartX;

        if (Math.abs(diffX) > 50) { // 50px threshold
          if (diffX > 0) {
            showPrev();
          } else {
            showNext();
          }
        }
        isSwipeDetection = false;
      }
    }
  });

  // Navigation
  function updateLightboxContent() {
    if (currentIndex < 0 || currentIndex >= currentCollectionItems.length) return;

    // Reset Zoom State on change
    resetZoom();

    const item = currentCollectionItems[currentIndex];
    // In a real scenario, you'd swap for a high-res image. 
    // Here we might just use the placeholder color or a real image if it existed.
    // For now, let's look for an img tag or use the placeholder color.

    const img = item.querySelector('img');
    const placeholder = item.querySelector('.placeholder-image');
    const titleElement = item.querySelector('h3');
    const title = titleElement ? titleElement.textContent : '';

    if (img) {
      lightboxImg.src = img.src;
      lightboxImg.style.backgroundColor = '';
    } else if (placeholder) {
      // Create a dummy colored image or just set background
      // Since lightbox-img is an IMG tag, we can set a data URI or just styling style.
      lightboxImg.src = '';
      lightboxImg.style.backgroundColor = placeholder.style.backgroundColor;
      // We need it to have dimensions to be visible if src is empty
      lightboxImg.style.width = '800px';
      lightboxImg.style.height = '600px';
    }

    lightboxCaption.textContent = title;

    // Update Arrow State
    if (currentIndex <= 0) {
      prevBtn.classList.add('disabled');
    } else {
      prevBtn.classList.remove('disabled');
    }

    if (currentIndex >= currentCollectionItems.length - 1) {
      nextBtn.classList.add('disabled');
    } else {
      nextBtn.classList.remove('disabled');
    }
  }

  const lightboxWrapper = document.querySelector('.lightbox-content-wrapper');

  function showNext() {
    if (currentIndex < currentCollectionItems.length - 1) {
      lightboxWrapper.classList.add('switching');
      setTimeout(() => {
        currentIndex++;
        updateLightboxContent();
        lightboxWrapper.classList.remove('switching');
      }, 200);
    }
  }

  function showPrev() {
    if (currentIndex > 0) {
      lightboxWrapper.classList.add('switching');
      setTimeout(() => {
        currentIndex--;
        updateLightboxContent();
        lightboxWrapper.classList.remove('switching');
      }, 200);
    }
  }

  nextBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent closing lightbox
    if (currentIndex < currentCollectionItems.length - 1) {
      showNext();
    }
  });

  prevBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent closing lightbox
    if (currentIndex > 0) {
      showPrev();
    }
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;

    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
  });
}

// ------------------------------------
// Photography Page Header Typewriter
// ------------------------------------
window.addEventListener('load', () => {
  // Check if we are on the photography page
  const pageTitle = document.getElementById('page-title');
  const pageSubtitle = document.getElementById('page-subtitle');

  // Use a class or ID check on body or URL to confirm page
  if (document.body.classList.contains('static-nav-page') && pageTitle && pageSubtitle) {

    // Prevent flash of text: hide immediately
    pageTitle.style.visibility = 'hidden';
    pageTitle.style.opacity = '0';

    // We wait a moment for the initial static text to be set by setLanguage (if applicable)
    // Then we overwrite it with the typewriter effect.
    setTimeout(() => {
      // Get the text to type (from current content or specific request)
      // The user wants "Photography" then "Equipment..."

      const titleText = pageTitle.childNodes[0].nodeValue.trim(); // "Photography"
      const subtitleText = pageSubtitle.textContent.trim(); // "Equipment..."

      // Reset visibility for typing
      pageTitle.style.visibility = 'visible';
      pageTitle.style.opacity = '1';

      // Clear and Type Title
      // Helper to clear text node but keep subtitle span
      pageTitle.childNodes[0].nodeValue = "";

      // We need a custom typer for the text node part to avoid wiping the span
      // Actually typeGeneric wipes innerHTML.
      // So we must handle the span separately or reconstruct it.

      // Strategy: Wipe everything, type Title, then append Subtitle span and type it.
      pageTitle.innerHTML = "";

      const cursor = createCursor();
      pageTitle.appendChild(cursor);

      let i = 0;
      function typeTitle() {
        if (i < titleText.length) {
          const char = titleText.charAt(i);
          const charSpan = document.createElement('span');
          charSpan.textContent = char;
          charSpan.className = 'matrix-char';
          // Insert before cursor
          pageTitle.insertBefore(charSpan, cursor);
          i++;
          setTimeout(typeTitle, 25);
        } else {
          // Title done.
          pageTitle.removeChild(cursor);
          pageTitle.appendChild(document.createElement('br'));

          // Create Subtitle Span
          const newSubtitle = document.createElement('span');
          newSubtitle.className = 'subtitle';
          newSubtitle.id = 'page-subtitle';
          pageTitle.appendChild(newSubtitle);

          // Type Subtitle
          typeGeneric(newSubtitle, subtitleText, 20);
        }
      }

      typeTitle();

    }, 500); // Small delay after load
  }
});
