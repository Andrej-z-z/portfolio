window.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('loaded');
});

window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

window.addEventListener('pageshow', (event) => {
  document.body.classList.remove('fade-out');
  document.body.classList.add('loaded');

  setTimeout(() => {
    document.body.classList.remove('fade-out');
    document.body.classList.add('loaded');
  }, 50);
});

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });
}

const mainTextElem = document.getElementById('typewriter-main');
const loopTextElem = document.getElementById('typewriter-loop');

let mainText = "Hello, I'm Andrej.";
let loopPhrases = [
  'Graphic Designer.',
  'Frontend Developer.',
  'Photographer.',
  'UI/UX Designer.',
];

let loopIndex = 0;
let charIndex = 0;
let isDeleting = false;
let isLooping = false;
let heroCursor = null;

if (mainTextElem && loopTextElem) {
  mainTextElem.innerHTML = '';
  heroCursor = createCursor();
  mainTextElem.appendChild(heroCursor);
}

function typeWriter() {
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
      mainTextElem.removeChild(heroCursor);
      isLooping = true;
      charIndex = 0;

      loopTextElem.innerHTML = '';
      heroCursor = createCursor();
      loopTextElem.appendChild(heroCursor);

      setTimeout(typeWriter, 250);
    }
    return;
  }

  const currentPhrase = loopPhrases[loopIndex];

  if (isDeleting) {
    if (heroCursor.previousSibling) {
      loopTextElem.removeChild(heroCursor.previousSibling);
      charIndex--;
    }
  } else {
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

  let typeSpeed = 50;
  if (isDeleting) typeSpeed = 25;

  if (!isDeleting && charIndex === currentPhrase.length) {
    typeSpeed = 1000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    loopIndex = (loopIndex + 1) % loopPhrases.length;
    typeSpeed = 250;
  }

  setTimeout(typeWriter, typeSpeed);
}

window.addEventListener('load', () => {
  if (mainTextElem && loopTextElem) {
    mainTextElem.innerHTML = '';
    heroCursor = createCursor();
    mainTextElem.appendChild(heroCursor);
    loopTextElem.innerHTML = '';

    typeWriter();
  }
});

document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
  });
});

const categoryCards = document.querySelectorAll('.category-card');

function handleTransition(e) {
  e.preventDefault();
  const targetUrl = e.currentTarget.href;

  document.body.classList.add('fade-out');

  setTimeout(() => {
    window.location.href = targetUrl;
  }, 300);
}

categoryCards.forEach((card) => {
  card.addEventListener('click', handleTransition);
});

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px',
};

const aboutTitleElem = document.getElementById('about-title');
const aboutBioElem = document.getElementById('about-bio');
let aboutTitleText = 'About Me';
let aboutBioLines = [
  'Hi, I’m Andrej, a graphic designer and front-end focused creative from Belgrade, Serbia. I’ve always been interested in technology and computers, from web standards and interface design to networking and how systems work behind the scenes.',
  'I work at the intersection of graphic design, front-end development, and photography, with a style rooted in minimalism. I design clear, structured interfaces and build them using HTML, CSS, and JavaScript, currently strengthening my foundation in JS. My design workflow is based in the Adobe suite, with a strong emphasis on Photoshop, Illustrator and Lightroom.',
  'Photography influences how I see and design, especially when it comes to composition, light, and attention to detail. Whether I’m designing, coding, or shooting, I focus on clarity, usability, and a clean, modern result.',
  'Always learning. Always refining.',
];

let aboutTyped = false;

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
      if (text.substring(i, i + 4) === '<br>') {
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
      element.removeChild(cursor);
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
      element.removeChild(cursor);
    }
  }
  if (text.length > 0) type();
  else {
    element.removeChild(cursor);
    element.innerHTML = '&nbsp;';
  }
}

const translations = {
  en: {
    nav_design: 'Graphic Design',
    nav_photo: 'Photography',
    nav_about: 'About',
    hero_main: "Hello, I'm Andrej.",
    hero_loop: [
      'Graphic Designer.',
      'Frontend Developer.',
      'Photographer.',
      'UI/UX Designer.',
    ],
    about_title: 'About Me',
    about_bio: [
      'Hi, I’m Andrej, a graphic designer and front-end focused creative from Belgrade, Serbia. I’ve always been interested in technology and computers, from web standards and interface design to networking and how systems work behind the scenes.',
      'I work at the intersection of graphic design, front-end development, and photography, with a style rooted in minimalism. I design clear, structured interfaces and build them using HTML, CSS, and JavaScript, currently strengthening my foundation in JS. My design workflow is based in the Adobe suite, with a strong emphasis on typography, layout, and consistency.',
      'Photography influences how I see and design, especially when it comes to composition, light, and attention to detail. Whether I’m designing, coding, or shooting, I focus on clarity, usability, and a clean, modern result.',
      'Always learning. Always refining.',
    ],
    cat_design: 'Graphic Design',
    cat_photo: 'Photography',
    lang_label: 'Language',
    page_graphic_title: 'Graphic Design',
    page_graphic_subtitle: 'Select a Category',
    page_photo_title: 'Photography',
    page_photo_subtitle: 'Equipment /// Fujifilm X-S10 23mm 1.4, 15-45mm',
    page_frontend_title: 'Frontend Projects',
    card_gallery: 'Gallery',
    card_projects: 'Frontend Projects',
    page_gallery_title: 'Gallery',
    page_gallery_subtitle: 'Selected works 2021-2025',
    photo_desc_1: 'Urban Shadows',
    photo_desc_2: 'Portraits',
    photo_desc_3: 'Architecture',
    photo_desc_4: 'Nature',

    nav_fashion: 'Fashion/Studio',
    nav_portraits: 'Portraits',
    nav_protests: 'Protests',
    nav_street: 'Street/Casual',

    title_fashion: 'Fashion/Studio',
    desc_fashion: 'Photoshoots for brands and fashion photography.',
    title_portraits: 'Portraits',
    desc_portraits: 'Faces and emotions.',
    title_protests: 'Protests',
    desc_protests: 'Lines, angles and protests.',
    title_street: 'Street/Casual',
    desc_street: 'The wild and the serene.',

    gallery_desc_1: 'Floating Island',
    gallery_desc_2: 'Typography Layout',
    gallery_desc_3: 'Poster Design',
    gallery_desc_4: 'Book Cover',
  },
  sr: {
    nav_design: 'Grafički Dizajn',
    nav_photo: 'Fotografija',
    nav_about: 'O Meni',
    hero_main: 'Zdravo, ja sam Andrej.',
    hero_loop: [
      'Grafički Dizajner.',
      'Frontend Developer.',
      'Fotograf.',
      'UI/UX Dizajner.',
    ],
    about_title: 'O Meni',
    about_bio: [
      'Zdravo, ja sam Andrej, grafički dizajner sa fokusom na front-end iz Beograda, Srbija. Uvek su me zanimale tehnologija i računari, od web standarda i dizajna interfejsa do umrežavanja i načina na koji sistemi funkcionišu iza kulisa.',
      'Radim na preseku grafičkog dizajna, front-end razvoja i fotografije, sa stilom utemeljenim u minimalizmu. Dizajniram jasne, strukturirane interfejse i gradim ih koristeći HTML, CSS i JavaScript, trenutno jačajući svoju osnovu u JS-u. Moj dizajnerski tok rada je zasnovan na Adobe paketu, sa jakim naglaskom na Photoshop, Illustrator i Lightroom.',
      'Fotografija utiče na to kako vidim i dizajniram, posebno kada je reč o kompoziciji, svetlu i posvećenosti detaljima. Bilo da dizajniram, kodiram ili fotografišem, fokusiram se na jasnoću, upotrebljivost i čist, moderan rezultat.',
      'Uvek učim. Uvek se usavršavam.',
    ],
    cat_design: 'Grafički Dizajn',
    cat_photo: 'Fotografija',
    lang_label: 'Jezik',
    page_graphic_title: 'Grafički Dizajn',
    page_graphic_subtitle: 'Izaberite Kategoriju',
    page_photo_title: 'Fotografija',
    page_photo_subtitle: 'Oprema /// Fujifilm X-S10 23mm 1.4, 15-45mm',
    page_frontend_title: 'Frontend Projekti',
    card_gallery: 'Galerija',
    card_projects: 'Frontend Projekti',
    page_gallery_title: 'Galerija',
    page_gallery_subtitle: 'Izabrani radovi 2023-2025',

    photo_desc_1: 'Urbane Senke',
    photo_desc_2: 'Portreti',
    photo_desc_3: 'Arhitektura',
    photo_desc_4: 'Priroda',

    nav_fashion: 'Moda/Studio',
    nav_portraits: 'Portreti',
    nav_protests: 'Protesti',
    nav_street: 'Ulična/Kežual',

    title_fashion: 'Moda/Studio',
    desc_fashion: 'Fotografisanje za brendove i modna fotografija.',
    title_portraits: 'Portreti',
    desc_portraits: 'Lica i emocije.',
    title_protests: 'Protesti',
    desc_protests: 'Linije, uglovi i protesti.',
    title_street: 'Ulična/Kežual',
    desc_street: 'Divlje i spokojno.',

    gallery_desc_1: 'Brend Identitet',
    gallery_desc_2: 'Tipografski Raspored',
    gallery_desc_3: 'Dizajn Postera',
    gallery_desc_4: 'Korice Knjige',
  },
};

let currentLang = 'en';

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('language', lang);
  const content = translations[lang];

  const navLinksList = document.querySelectorAll('.nav-links a');
  if (navLinksList.length >= 3) {
    navLinksList[0].textContent = content.nav_design;
    navLinksList[1].textContent = content.nav_photo;
    navLinksList[2].textContent = content.nav_about;
  }

  const designCard = document.querySelector('.design-card h2');
  if (designCard) designCard.textContent = content.cat_design;

  const photoCard = document.querySelector('.photo-card h2');
  if (photoCard) photoCard.textContent = content.cat_photo;

  const pageTitle = document.getElementById('page-title');
  if (pageTitle) {
    if (window.location.href.includes('graphic-design')) {
      pageTitle.childNodes[0].nodeValue = content.page_graphic_title + ' ';
    } else if (window.location.href.includes('photography')) {
      pageTitle.childNodes[0].nodeValue = content.page_photo_title + ' ';
    } else if (window.location.href.includes('frontend-projects')) {
      pageTitle.textContent = content.page_frontend_title;
    } else if (window.location.href.includes('gallery')) {
      if (
        pageTitle.childNodes[0] &&
        pageTitle.childNodes[0].nodeType === Node.TEXT_NODE
      ) {
        pageTitle.childNodes[0].nodeValue = content.page_gallery_title;
      }
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

  const photographyIds = [
    'nav-fashion',
    'nav-portraits',
    'nav-protests',
    'nav-street',
    'title-fashion',
    'title-portraits',
    'title-protests',
    'title-street',
    'desc-fashion',
    'desc-portraits',
    'desc-protests',
    'desc-street',
  ];

  photographyIds.forEach((id) => {
    const el = document.getElementById(id);
    const key = id.replace(/-/g, '_');
    if (el && content[key]) {
      el.textContent = content[key];
      el.setAttribute('data-text', content[key]);
    }
  });

  const photoDesc1 = document.getElementById('photo-desc-1');
  if (photoDesc1) photoDesc1.textContent = content.photo_desc_1;
  const photoDesc2 = document.getElementById('photo-desc-2');
  if (photoDesc2) photoDesc2.textContent = content.photo_desc_2;
  const photoDesc3 = document.getElementById('photo-desc-3');
  if (photoDesc3) photoDesc3.textContent = content.photo_desc_3;
  const photoDesc4 = document.getElementById('photo-desc-4');
  if (photoDesc4) photoDesc4.textContent = content.photo_desc_4;

  const galleryDesc1 = document.getElementById('gallery-desc-1');
  if (galleryDesc1) galleryDesc1.textContent = content.gallery_desc_1;
  const galleryDesc2 = document.getElementById('gallery-desc-2');
  if (galleryDesc2) galleryDesc2.textContent = content.gallery_desc_2;
  const galleryDesc3 = document.getElementById('gallery-desc-3');
  if (galleryDesc3) galleryDesc3.textContent = content.gallery_desc_3;
  const galleryDesc4 = document.getElementById('gallery-desc-4');
  if (galleryDesc4) galleryDesc4.textContent = content.gallery_desc_4;

  const galleryLink = document.querySelector('a[href="gallery.html"]');
  if (galleryLink) {
    const h2 = galleryLink.querySelector('h2');
    const wrapper = galleryLink.querySelector('.matrix-wrapper');
    if (h2) {
      h2.textContent = content.card_gallery;
    } else if (wrapper) {
      wrapper.innerHTML = content.card_gallery;
      galleryLink.dataset.originalText = content.card_gallery;
    } else {
      let textNodeFound = false;
      galleryLink.childNodes.forEach((node) => {
        if (
          node.nodeType === Node.TEXT_NODE &&
          node.nodeValue.trim().length > 0
        ) {
          node.nodeValue = content.card_gallery;
          textNodeFound = true;
        }
      });
      if (!textNodeFound) galleryLink.textContent = content.card_gallery;
    }
  }

  const projectsLink = document.querySelector(
    'a[href="frontend-projects.html"]',
  );
  if (projectsLink) {
    const h2 = projectsLink.querySelector('h2');
    const wrapper = projectsLink.querySelector('.matrix-wrapper');
    if (h2) {
      h2.textContent = content.card_projects;
    } else if (wrapper) {
      wrapper.innerHTML = content.card_projects;
      projectsLink.dataset.originalText = content.card_projects;
    } else {
      let textNodeFound = false;
      projectsLink.childNodes.forEach((node) => {
        if (
          node.nodeType === Node.TEXT_NODE &&
          node.nodeValue.trim().length > 0
        ) {
          node.nodeValue = content.card_projects;
          textNodeFound = true;
        }
      });
      if (!textNodeFound) projectsLink.textContent = content.card_projects;
    }
  }

  mainText = content.hero_main;
  loopPhrases = content.hero_loop;
  aboutTitleText = content.about_title;
  aboutBioLines = content.about_bio;

  if (mainTextElem && loopTextElem) {
    isLooping = false;
    isDeleting = false;
    charIndex = 0;
    loopIndex = 0;
    mainTextElem.innerHTML = '';
    loopTextElem.innerHTML = '';

    if (heroCursor && heroCursor.parentNode) {
      heroCursor.parentNode.removeChild(heroCursor);
    }
    heroCursor = createCursor();
    mainTextElem.appendChild(heroCursor);
  }

  if (aboutTyped && aboutTitleElem && aboutBioElem) {
    typeGeneric(aboutTitleElem, aboutTitleText, 50);
    aboutBioElem.innerHTML = '';
    aboutBioLines.forEach((line) => {
      const lineContainer = document.createElement('div');
      lineContainer.style.marginBottom = line === '' ? '1.5rem' : '0.5rem';
      lineContainer.style.minHeight = '1.5rem';
      aboutBioElem.appendChild(lineContainer);
      setTimeout(() => {
        typeLine(lineContainer, line, 10);
      }, 100);
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('language');
  if (savedLang && translations[savedLang]) {
    setLanguage(savedLang);

    const langToggle = document.getElementById('lang-toggle');
    const activeBtn = document.querySelector(
      `.lang-option[data-lang="${savedLang}"]`,
    );
    if (langToggle && activeBtn) {
      const selectedSvg = activeBtn.querySelector('svg').cloneNode(true);
      langToggle.innerHTML = '';
      langToggle.appendChild(selectedSvg);
    }
  }
});

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

  langOptions.forEach((btn) => {
    btn.addEventListener('click', () => {
      const selectedLang = btn.getAttribute('data-lang');
      setLanguage(selectedLang);

      const selectedSvg = btn.querySelector('svg').cloneNode(true);
      langToggle.innerHTML = '';
      langToggle.appendChild(selectedSvg);

      langMenu.classList.remove('active');
    });
  });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');

      if (entry.target.id === 'about' && !aboutTyped) {
        aboutTyped = true;
        typeGeneric(aboutTitleElem, aboutTitleText, 80);

        aboutBioElem.innerHTML = '';
        aboutBioLines.forEach((line, index) => {
          const lineContainer = document.createElement('div');
          lineContainer.style.marginBottom = line === '' ? '1.5rem' : '0.5rem';
          lineContainer.style.minHeight = '1.5rem';
          aboutBioElem.appendChild(lineContainer);

          setTimeout(() => {
            typeLine(lineContainer, line, 15);
          }, 100);
        });
      }
    }
  });
}, observerOptions);

document.querySelectorAll('.scroll-reveal').forEach((el) => {
  observer.observe(el);
});

const localNavLinks = document.querySelectorAll('.local-nav a');
const sections = document.querySelectorAll('.collection-section');

if (localNavLinks.length > 0) {
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });

    localNavLinks.forEach((link) => {
      link.classList.remove('active');
      const href = link.getAttribute('href').substring(1);
      if (current && href === current) {
        link.classList.add('active');
      }
    });
  });
}

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
      behavior: 'smooth',
    });
  });
}

const lightbox = document.getElementById('lightbox');
if (lightbox) {
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const closeBtn = document.querySelector('.lightbox-close');
  const prevBtn = document.querySelector('.lightbox-prev');
  const nextBtn = document.querySelector('.lightbox-next');

  let currentCollectionItems = [];
  let currentIndex = -1;

  document.querySelectorAll('.grid-item').forEach((item) => {
    item.addEventListener('click', () => {
      const collectionName = item.parentElement.getAttribute('data-collection');

      currentCollectionItems = Array.from(
        document.querySelectorAll(
          `.portfolio-grid[data-collection="${collectionName}"] .grid-item`,
        ),
      );

      currentIndex = currentCollectionItems.indexOf(item);

      updateLightboxContent();
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  closeBtn.addEventListener('click', closeLightbox);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  let zoomLevel = 1;
  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let translateX = 0;
  let translateY = 0;
  const MIN_ZOOM = 1;
  const MAX_ZOOM = 5;

  let initialPinchDistance = 0;
  let initialZoom = 1;
  let lastTouchX = 0;
  let lastTouchY = 0;
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

  lightbox.addEventListener(
    'wheel',
    (e) => {
      if (!e.target.closest('.lightbox-content-wrapper')) return;

      e.preventDefault();
      const delta = e.deltaY * -0.001;
      const newZoom = Math.min(Math.max(zoomLevel + delta, MIN_ZOOM), MAX_ZOOM);

      if (newZoom === 1) {
        translateX = 0;
        translateY = 0;
      }

      zoomLevel = newZoom;
      updateTransform();
    },
    { passive: false },
  );

  lightboxImg.addEventListener('mousedown', (e) => {
    if (zoomLevel > 1) {
      isDragging = true;
      startX = e.clientX - translateX;
      startY = e.clientY - translateY;
      lightboxImg.style.cursor = 'grabbing';
      e.preventDefault();
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

  lightbox.addEventListener(
    'touchstart',
    (e) => {
      if (e.touches.length === 2) {
        isDragging = false;
        const t1 = e.touches[0];
        const t2 = e.touches[1];
        initialPinchDistance = Math.hypot(
          t2.clientX - t1.clientX,
          t2.clientY - t1.clientY,
        );
        initialZoom = zoomLevel;
      } else if (e.touches.length === 1) {
        if (zoomLevel > 1) {
          isDragging = true;
          lastTouchX = e.touches[0].clientX;
          lastTouchY = e.touches[0].clientY;
        } else {
          isSwipeDetection = true;
          swipeStartX = e.touches[0].clientX;
          swipeStartY = e.touches[0].clientY;
        }
      }
    },
    { passive: false },
  );

  lightbox.addEventListener(
    'touchmove',
    (e) => {
      if (e.touches.length === 2) {
        e.preventDefault();
        const t1 = e.touches[0];
        const t2 = e.touches[1];
        const currentDistance = Math.hypot(
          t2.clientX - t1.clientX,
          t2.clientY - t1.clientY,
        );

        if (initialPinchDistance > 0) {
          const scaleChange = currentDistance / initialPinchDistance;
          const newZoom = Math.min(
            Math.max(initialZoom * scaleChange, MIN_ZOOM),
            MAX_ZOOM,
          );
          zoomLevel = newZoom;

          if (zoomLevel === 1) {
            translateX = 0;
            translateY = 0;
          }
          updateTransform();
        }
      } else if (e.touches.length === 1) {
        if (zoomLevel > 1 && isDragging) {
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
          const currentX = e.touches[0].clientX;
          const currentY = e.touches[0].clientY;
          const diffX = currentX - swipeStartX;
          const diffY = currentY - swipeStartY;

          if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 10) {
            e.preventDefault();
          }
        }
      }
    },
    { passive: false },
  );

  lightbox.addEventListener('touchend', (e) => {
    if (e.touches.length < 2) {
      initialPinchDistance = 0;
    }
    if (e.touches.length === 0) {
      isDragging = false;

      if (isSwipeDetection) {
        const endX = e.changedTouches[0].clientX;
        const diffX = endX - swipeStartX;

        if (Math.abs(diffX) > 50) {
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

  function updateLightboxContent() {
    if (currentIndex < 0 || currentIndex >= currentCollectionItems.length)
      return;

    resetZoom();

    const item = currentCollectionItems[currentIndex];

    const img = item.querySelector('img');
    const placeholder = item.querySelector('.placeholder-image');
    const titleElement = item.querySelector('h3');
    const title = titleElement ? titleElement.textContent : '';

    if (img) {
      lightboxImg.src = img.src;
      lightboxImg.style.backgroundColor = '';
    } else if (placeholder) {
      lightboxImg.src = '';
      lightboxImg.style.backgroundColor = placeholder.style.backgroundColor;
      lightboxImg.style.width = '800px';
      lightboxImg.style.height = '600px';
    }

    lightboxCaption.textContent = title;

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
    e.stopPropagation();
    if (currentIndex < currentCollectionItems.length - 1) {
      showNext();
    }
  });

  prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (currentIndex > 0) {
      showPrev();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;

    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const pageTitle = document.getElementById('page-title');
  const pageSubtitle = document.getElementById('page-subtitle');

  if (
    document.body.classList.contains('static-nav-page') &&
    pageTitle &&
    pageSubtitle
  ) {
    pageTitle.style.visibility = 'hidden';
    pageTitle.style.opacity = '0';

    setTimeout(() => {
      const titleText = pageTitle.childNodes[0].nodeValue.trim();
      const subtitleText = pageSubtitle.textContent.trim();

      const titleHeight = pageTitle.getBoundingClientRect().height;
      pageTitle.style.height = `${titleHeight}px`;

      pageTitle.style.visibility = 'visible';
      pageTitle.style.opacity = '1';

      pageTitle.childNodes[0].nodeValue = '';

      pageTitle.innerHTML = '';

      const cursor = createCursor();
      pageTitle.appendChild(cursor);

      let i = 0;
      function typeTitle() {
        if (i < titleText.length) {
          const char = titleText.charAt(i);
          const charSpan = document.createElement('span');
          charSpan.textContent = char;
          charSpan.className = 'matrix-char';
          pageTitle.insertBefore(charSpan, cursor);
          i++;
          setTimeout(typeTitle, 25);
        } else {
          pageTitle.removeChild(cursor);
          pageTitle.appendChild(document.createElement('br'));

          const newSubtitle = document.createElement('span');
          newSubtitle.className = 'subtitle';
          newSubtitle.id = 'page-subtitle';
          pageTitle.appendChild(newSubtitle);

          typeGeneric(newSubtitle, subtitleText, 20, () => {
            pageTitle.style.height = '';
          });
        }
      }

      typeTitle();
    }, 500);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  if (document.body.classList.contains('graphic-design-page')) {
    const pageTitle = document.getElementById('page-title');
    const pageSubtitle = document.getElementById('page-subtitle');

    const categoryHeaders = document.querySelectorAll('.category-card');

    categoryHeaders.forEach((header) => {
      const text = header.textContent.trim();

      const clone = document.createElement('span');
      clone.style.font = getComputedStyle(header).font;
      clone.style.textTransform = getComputedStyle(header).textTransform;
      clone.style.visibility = 'hidden';
      clone.style.position = 'absolute';
      clone.style.left = '-9999px';
      clone.style.whiteSpace = 'nowrap';
      clone.textContent = text;
      document.body.appendChild(clone);
      const textWidth = clone.offsetWidth;
      document.body.removeChild(clone);

      header.dataset.originalText = text;
      header.innerHTML = '';

      const wrapper = document.createElement('span');

      if (window.innerWidth > 768) {
        wrapper.style.width = `${textWidth + 10}px`;
        wrapper.style.textAlign = 'center';
        wrapper.style.whiteSpace = 'nowrap';
      } else {
        wrapper.style.textAlign = 'center';
        wrapper.style.width = 'auto';
        wrapper.style.whiteSpace = 'normal';
      }

      wrapper.style.display = 'inline-block';
      wrapper.style.overflow = 'hidden';
      wrapper.style.verticalAlign = 'top';
      wrapper.className = 'matrix-wrapper';
      header.appendChild(wrapper);
      header.dataset.wrapperRef = 'true';
    });

    if (pageTitle) {
      pageTitle.style.visibility = 'hidden';
      pageTitle.style.opacity = '0';
    }

    categoryHeaders.forEach((header) => {
      header.style.visibility = 'hidden';
      header.style.opacity = '0';
    });

    setTimeout(() => {
      if (pageTitle) {
        const titleText = pageTitle.childNodes[0].nodeValue.trim();
        const subtitleText = pageSubtitle
          ? pageSubtitle.textContent.trim()
          : '';

        pageTitle.style.visibility = 'visible';
        pageTitle.style.opacity = '1';
        pageTitle.innerHTML = '';

        const titleSpan = document.createElement('span');
        pageTitle.appendChild(titleSpan);
        typeGeneric(titleSpan, titleText, 50);

        if (subtitleText) {
          pageTitle.appendChild(document.createElement('br'));
          const subtitleSpan = document.createElement('span');
          subtitleSpan.className = 'subtitle';
          subtitleSpan.id = 'page-subtitle';
          pageTitle.appendChild(subtitleSpan);
          typeGeneric(subtitleSpan, subtitleText, 30);
        }
      }

      categoryHeaders.forEach((header, index) => {
        header.style.visibility = 'visible';
        header.style.opacity = '1';
        const text = header.dataset.originalText;
        const wrapper = header.querySelector('.matrix-wrapper');
        typeGeneric(wrapper, text, 40, () => {
          wrapper.innerHTML = text;
          wrapper.style.width = 'fit-content';
          wrapper.style.whiteSpace = 'normal';
          wrapper.style.overflow = 'visible';
          wrapper.classList.add('fire-gradient-text');
        });
      });
    }, 100);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const gridItems = document.querySelectorAll('.grid-item');

  if (gridItems.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const descriptions = document.querySelectorAll('.item-info h3');
    descriptions.forEach((desc) => {
      desc.dataset.originalText = desc.textContent;
      desc.style.visibility = 'hidden';
    });

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target;
          target.classList.add('visible');

          const desc = target.querySelector('.item-info h3');
          if (desc && !desc.dataset.typed) {
            desc.dataset.typed = 'true';
            const height = desc.getBoundingClientRect().height;
            desc.style.height = `${height}px`;
            desc.style.visibility = 'visible';
            const text = desc.dataset.originalText;
            typeGeneric(desc, text, 45, () => {
              desc.style.height = '';
            });
          }

          observer.unobserve(target);
        }
      });
    }, observerOptions);

    gridItems.forEach((item) => {
      observer.observe(item);
    });
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.tech-track');
  if (!track) return;

  let currentPos = -50;

  const baseSpeed = 0.0115;
  let speed = baseSpeed;
  let targetSpeed = baseSpeed;

  track.addEventListener('mouseenter', () => {
    targetSpeed = 0;
  });

  track.addEventListener('mouseleave', () => {
    targetSpeed = baseSpeed;
  });

  function animate() {
    speed += (targetSpeed - speed) * 0.05;

    currentPos += speed;
    if (currentPos >= 0) {
      currentPos = -50;
    }

    track.style.transform = `translateX(${currentPos}%)`;
    requestAnimationFrame(animate);
  }

  animate();
});
