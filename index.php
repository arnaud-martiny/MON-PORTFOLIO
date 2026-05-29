<?php
// Cache busting automatique basé sur la date de modification des fichiers
$cssVersion = file_exists(__DIR__ . '/style.css') ? filemtime(__DIR__ . '/style.css') : '1.0.0';
$jsVersion = file_exists(__DIR__ . '/code.js') ? filemtime(__DIR__ . '/code.js') : '1.0.0';
?>
<!DOCTYPE html>
<html lang="fr">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <!-- SEO & Performance -->
  <title>Arnaud Martiny | Développeur web Full-Stack – Portfolio & Créations sur mesure</title>
  <meta name="description"
    content="Développeur Full-Stack basé à Bruxelles. Je conçois des expériences web modernes et performantes. Découvrez mes projets (Snoussi Studio, Nowa...)." />
  <link rel="canonical" href="https://www.arnaud-martiny.be/" />

  <!-- STRUCTURED DATA (JSON-LD) POUR SEO ET GEO -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Arnaud Martiny",
    "jobTitle": "Développeur Full-Stack & Expert SEO/GEO",
    "url": "https://www.arnaud-martiny.be/",
    "sameAs": [
      "https://www.linkedin.com/in/arnaud-martiny/",
      "https://github.com/arnaud-martiny"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Bruxelles",
      "addressCountry": "BE"
    },
    "description": "Développeur web Full-Stack basé à Bruxelles, spécialisé dans les expériences web performantes, le design interactif (GSAP, Three.js) et l'optimisation pour les IA."
  }
  </script>

  <!-- 1. PRÉ-CONNEXIONS & RESOURCE HINTS -->
  <link rel="preconnect" href="https://www.googletagmanager.com">
  <link rel="preconnect" href="https://cdnjs.cloudflare.com">

  <!-- 2. PRELOAD CRITIQUE (Polices & Fonts) -->
  <link rel="preload" href="assets/fonts/space-grotesk/space-grotesk-v22-latin-700.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="assets/fonts/space-grotesk/space-grotesk-v22-latin-regular.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="assets/fonts/VT323/vt323-v18-latin-regular.woff2" as="font" type="font/woff2" crossorigin>
  
  <!-- Preload Image LCP (About section) -->
  <link rel="preload" href="assets/img/myself_1.webp" as="image" fetchpriority="high">

  <!-- Favicons -->
  <link rel="icon" href="assets/img/FAVICON/FAVICON.jpg" type="image/x-icon" />
  <link rel="apple-touch-icon" sizes="180x180" href="/assets/img/FAVICON/apple-touch-icon.png" />
  <link rel="icon" type="image/png" sizes="96x96" href="/assets/img/FAVICON/favicon-96x96.png" />
  <link rel="manifest" href="/assets/img/FAVICON/site.webmanifest" />

  <!-- Open Graph -->
  <meta property="og:title" content="Arnaud Martiny | Développeur Web" />
  <meta property="og:description" content="Portfolio et réalisations web sur mesure." />
  <meta property="og:image" content="https://www.arnaud-martiny.be/assets/img/preview-portfolio_1.webp" />
  <meta property="og:url" content="https://www.arnaud-martiny.be/" />
  <meta property="og:type" content="website" />

  <!-- CSS CRITIQUE INLINÉ (Pour affichage immédiat du Loader et du fond) -->
  <style>
    :root {
      --primary: #ffffff;
      --secondary: #000000;
      --accent: #333333;
    }

    body {
      background-color: var(--secondary);
      margin: 0;
      padding: 0;
      font-family: "Space Grotesk", sans-serif;
      overflow-x: hidden;
      color: var(--primary);
    }

    .loader-text {
      font-size: 5rem; 
      font-weight: 700; 
      font-family: 'Space Grotesk', sans-serif; /* Force la police épaisse */
      text-transform: uppercase; /* Les majuscules renforcent l'effet "bloc" */
      overflow: hidden;
      color: var(--primary);
      letter-spacing: 2px; /* Un peu d'espacement pour le style */
    }

    .loader.hidden {
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
    }

    .loader-text {
      font-size: 1.5rem;
      font-weight: 700;
      overflow: hidden;
      color: var(--primary);
    }

    .loader-text span {
      display: inline-block;
      transform: translateY(100%);
      animation: revealText 1.5s forwards;
    }

    @keyframes revealText {
      to {
        transform: translateY(0);
      }
    }

    /* Layout Utility */
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      border: 0;
    }

    /* Privacy Modal Specifics (Inline pour garantir le style sans fichier externe chargé) */
    .privacy-section {
      margin-bottom: 2rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      padding-bottom: 1rem;
    }

    .privacy-section:last-child {
      border-bottom: none;
    }

    .privacy-section h4 {
      color: #8A2BE2;
      font-size: 1.2rem;
      margin-bottom: 0.5rem;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .privacy-section ul {
      background: rgba(255, 255, 255, 0.05);
      padding: 1rem 1rem 1rem 2rem;
      border-radius: 8px;
      margin: 1rem 0;
    }

    .privacy-purpose {
      font-style: italic;
      opacity: 0.8;
      font-size: 0.9rem;
      border-left: 2px solid #8A2BE2;
      padding-left: 10px;
    }
  </style>

  <!-- CSS GLOBAL (Optimisé pour éviter le render-blocking et le FOUC) -->
  <link rel="stylesheet" href="style.css?v=<?= $cssVersion ?>" media="print" onload="this.media='all'">
  <noscript><link rel="stylesheet" href="style.css?v=<?= $cssVersion ?>"></noscript>

  <!-- FontAwesome (Chargement différé) -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" media="print"
    onload="this.media='all'">

  <!-- Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-9EWQ5ES7H5"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', 'G-9EWQ5ES7H5');
  </script>
</head>

<body>
  <!-- LOADER -->
  <div class="loader">
    <div class="loader-text">
      <span data-i18n="loader.welcome">BIENVENUE DANS MON UNIVERS</span>
    </div>
  </div>

  <div class="cursor"></div>
  <div class="cursor-follower"></div>

  <!-- NAVIGATION -->
  <div class="nav-container">
    <div class="logo" data-i18n="nav.logo">AM.</div>

    <div class="nav-desktop-group">
      <div class="language-switcher">
        <button id="lang-fr" class="lang-btn active" data-lang="fr" aria-label="Français">FR</button>
        <button id="lang-en" class="lang-btn" data-lang="en" aria-label="English">EN</button>
      </div>
      <div class="nav-right-group">
        <div class="cursor-selector-container">
          <button id="cursor-menu-btn" class="nav-icon-btn" aria-label="Choisir le curseur">
            <i class="fas fa-mouse-pointer" aria-hidden="true"></i>
          </button>
          <div class="cursor-dropdown">
            <button class="cursor-option active" data-cursor="modern">
              <span class="dot-preview modern"></span><span data-i18n="nav.cursor.modern">Moderne</span>
            </button>
            <button class="cursor-option" data-cursor="windows98">
              <img src="assets/img/curseur/curseur-windows-98.png" alt="" class="img-preview" width="16" height="16">
              <span data-i18n="nav.cursor.windows98">Win 98</span>
            </button>
            <button class="cursor-option" data-cursor="retro">
              <img src="assets/img/curseur/curseur-vintage.png" alt="" class="img-preview" width="16" height="16">
              <span data-i18n="nav.cursor.retro">Rétro</span>
            </button>
          </div>
        </div>
        <button id="wtf-btn" class="nav-wtf-btn" data-i18n="nav.wtfButton">Ne pas cliquer</button>
        <a href="assets/CV/CV-Arnaud-Martiny-FR.pdf" id="nav-cv-link" target="_blank" class="nav-cv-btn cv-link">
          <i class="fas fa-file-lines" aria-hidden="true"></i><span data-i18n="nav.cvLink">Mon CV</span>
        </a>
        <div class="nav-socials">
          <a href="https://github.com/arnaud-martiny" target="_blank" rel="noopener" aria-label="GitHub"><i
              class="fab fa-github"></i></a>
          <a href="https://www.linkedin.com/in/arnaud-martiny/" target="_blank" rel="noopener" aria-label="LinkedIn"><i
              class="fab fa-linkedin-in"></i></a>
          <a href="mailto:arnaudmartiny0@gmail.com" aria-label="Email"><i class="fas fa-envelope"></i></a>
        </div>
        <button id="theme-switcher" class="theme-btn" aria-label="Changer thème"><i class="fas fa-sun"></i></button>
        <div class="nav-links">
          <a href="#apropos" data-i18n="nav.about">À propos</a>
          <a href="#competences" data-i18n="nav.skills">Compétences</a>
          <a href="#portfolio" data-i18n="nav.portfolio">Portfolio</a>
          <a href="#contact" data-i18n="nav.contact">Contact</a>
        </div>
      </div>
    </div>

    <div class="nav-mobile-group">
      <div class="language-switcher">
        <button id="lang-fr-topnav" class="lang-btn active" data-lang="fr">FR</button>
        <button id="lang-en-topnav" class="lang-btn" data-lang="en">EN</button>
      </div>
      <a href="assets/CV/CV-Arnaud-Martiny-FR.pdf" target="_blank" class="nav-cv-btn cv-link mobile-cv-btn">
        <i class="fas fa-file-lines"></i>
      </a>
      <button id="theme-switcher-mobile-nav" class="theme-btn"><i class="fas fa-sun"></i></button>
      <button id="hamburger-btn" aria-label="Menu"><span></span><span></span><span></span></button>
    </div>
  </div>

  <!-- MENU MOBILE -->
  <div id="mobile-menu">
    <button id="mobile-menu-close-btn" aria-label="Fermer">&times;</button>
    <div class="mobile-menu-content">
      <div class="mobile-menu-links">
        <a href="#accueil" data-i18n="nav.home_special">Accueil</a>
        <a href="#apropos" data-i18n="nav.about">À propos</a>
        <a href="#competences" data-i18n="nav.skills">Compétences</a>
        <a href="#portfolio" data-i18n="nav.portfolio">Portfolio</a>
        <a href="#contact" data-i18n="nav.contact">Contact</a>
      </div>
      <div class="mobile-menu-footer">
        <div class="nav-socials">
          <a href="mailto:arnaudmartiny0@gmail.com"><i class="fas fa-envelope"></i></a>
        </div>
      </div>
    </div>
  </div>

  <!-- HEADER / HERO -->
  <header id="accueil">
    <div id="hero-canvas"></div>
    <div class="hero">
      <h1 class="hero-title-modern">
        <div class="hero-line"><span class="outline-text" data-text="ARNAUD">ARNAUD</span></div>
        <div class="hero-line"><span class="outline-text" data-text="MARTINY">MARTINY</span></div>
      </h1>
      <p class="hero-subtitle reveal" data-i18n="hero.subtitle">Développeur Full-Stack & Créatif Digital</p>
      <div class="hero-buttons reveal">
        <a href="#contact" class="btn btn-hero" data-i18n="hero.contactButton">Contactez-moi</a>
      </div>
    </div>
    <div class="scroll-down"><i class="fas fa-chevron-down"></i></div>
  </header>

  <!-- À PROPOS -->
  <section id="apropos" class="about-section">
    <div class="about-grid">
      <div class="about-image reveal">
        <div class="about-image-placeholder">
          <img src="assets/img/myself_1.webp" alt="Portrait d'Arnaud Martiny" data-i18n-attr-alt="about.imageAlt"
            class="image-miroir" fetchpriority="high" decoding="async" width="649" height="865"
            style="object-position: 50% 70%;">
        </div>
      </div>
      <div class="about-content reveal">
        <h2 class="section-heading" data-i18n="about.title">À PROPOS DE MOI</h2>
        <p class="about-text" data-i18n="about.paragraph1" data-i18n-html></p>
        <p class="about-text" data-i18n="about.paragraph2" data-i18n-html></p>
        <p class="about-text" data-i18n="about.paragraph3" data-i18n-html></p>
        <div class="skills-container" id="about-skills-tags"></div>
      </div>
    </div>
  </section>

  <!-- TERMINAL -->
  <section id="terminal-section" class="terminal-section reveal">
    <h2 class="section-heading" data-i18n="terminal.sectionTitle">MON IA RÉPOND À VOS QUESTIONS</h2>
    <div class="terminal-window">
      <div class="terminal-title-bar">
        <div class="terminal-dots">
          <div class="dot red"></div>
          <div class="dot yellow"></div>
          <div class="dot green"></div>
        </div>
        <span data-i18n="terminal.title">AM_os - /bin/zsh</span>
      </div>
      <div class="terminal-body" id="terminal-body">
        <div id="terminal-output"></div>
        <form id="terminal-form" class="terminal-input-line">
          <span class="terminal-prompt" data-i18n="terminal.prompt">user@arnaud-martiny.be:~$</span>
          <input type="text" id="terminal-input" class="terminal-input" autocomplete="off" spellcheck="false" />
        </form>
        <div id="terminal-suggestions" class="terminal-suggestions"></div>
      </div>
    </div>
  </section>

  <!-- COLLABORATIONS -->
  <section id="experiences-pro" class="professional-experiences-section">
    <h2 class="section-heading reveal" data-i18n="professionalExperiences.title">COLLABORATIONS</h2>
    <div class="experience-layout-wrapper" id="experience-layout-wrapper">
      <div class="experience-grid-container reveal" id="experience-grid-container">
      </div>
      <div id="experience-details-display" class="experience-details-display">
        <div class="details-content">
          <h4 id="details-company-name"></h4>
          <span id="details-role" class="details-role-tag"></span>
          <div class="details-divider"></div>
          <p id="details-description"></p>
        </div>
      </div>
    </div>
  </section>

  <!-- COMPTEURS -->
  <section class="counter-section">
    <div class="counter-item reveal">
      <div class="counter-number" data-count="6">0</div>
      <div class="counter-text" data-i18n="counters.projects">Projets</div>
    </div>
    <div class="counter-item reveal">
      <div class="counter-number" data-count="150">0</div>
      <div class="counter-text" data-i18n="counters.commits">Commits</div>
    </div>
    <div class="counter-item reveal">
      <div class="counter-number" data-count="999">0</div>
      <div class="counter-text" data-i18n="counters.coffee">Café</div>
    </div>
  </section>

  <!-- COMPÉTENCES (Système Solaire) -->
  <section id="competences" class="skills-section">
    <h2 class="section-heading reveal" data-i18n="skillsSection.title">GALAXIE DE COMPÉTENCES</h2>
    <button id="gravity-btn" class="btn btn-outline">Activer la Gravité</button>
    <div id="skills-scene-container" class="reveal">
      <canvas id="starfield-canvas"></canvas>
      <div id="skills-solar-system"></div>
    </div>
    <div id="skills-infobox"></div>
  </section>

  <!-- JSON LANGUES -->
  <section id="language-section-json" class="language-section-v2 reveal">
    <h3 class="skills-subheading" data-i18n="skillsSection.languagesTitle">Langues</h3>
    <div class="code-block-container">
      <div class="code-block">
        <div class="code-block-header">
          <div class="dot red"></div>
          <div class="dot yellow"></div>
          <div class="dot green"></div>
          <span id="code-block-title" class="code-block-title"></span>
        </div>
        <pre contenteditable="true"><code id="language-json-content"></code></pre>
      </div>
    </div>
  </section>

  <!-- PORTFOLIO -->
  <section id="portfolio" class="featured-projects-section">
    <h2 class="section-heading reveal" data-i18n="featuredProjects.title">Mes Réalisations Web</h2>
    <div class="featured-projects-grid" id="featured-projects-container"></div>
  </section>

  <!-- EXPÉRIENCE TIMELINE -->
  <section id="experience" class="experience-section">
    <h2 class="section-heading reveal" data-i18n="experienceSection.title">EXPÉRIENCE & FORMATION</h2>
    <div class="timeline reveal" id="timeline-content"></div>
  </section>

  <!-- CONTACT -->
  <section id="contact" class="contact-section">
    <div class="bg-shape shape4"></div>
    <h2 class="section-heading reveal" data-i18n="contactSection.title">ME CONTACTER</h2>
    <div class="contact-container">
      <div class="contact-info reveal">
        <div class="contact-item"><i class="fas fa-map-marker-alt"></i>
          <p data-i18n="contactSection.address">Bruxelles, Belgique</p>
        </div>
        <div class="contact-item"><i class="fas fa-phone"></i><a href="tel:+32492451456"
            data-i18n="contactSection.phone">+32 0492 451 456</a></div>
        <div class="contact-item"><i class="fas fa-envelope"></i><a href="mailto:arnaudmartiny0@gmail.com"
            data-i18n="contactSection.email">arnaudmartiny0@gmail.com</a></div>
            <div class="social-icons">
              <a href="https://www.linkedin.com/in/arnaud-martiny/" target="_blank" class="social-icon" aria-label="LinkedIn">
                <i class="fab fa-linkedin-in"></i>
              </a>
              <a href="https://github.com/arnaud-martiny" target="_blank" class="social-icon" aria-label="GitHub">
                <i class="fab fa-github"></i>
              </a>
            </div>
      </div>
      <div class="contact-form reveal">
        <!-- ACTION MIS À JOUR POUR /api/ -->
        <form id="contact-form" action="api/traitement-formulaire.php" method="POST">
          <!-- HONEYPOT FIELD (ANTISPAM) -->
          <div style="display:none;">
            <label for="website_url">Laissez ce champ vide</label>
            <input type="text" id="website_url" name="website_url" tabindex="-1" autocomplete="off">
          </div>
          
          <div class="form-group">
            <input type="text" id="contact-name" name="name" required placeholder="Nom"
              data-i18n-attr-placeholder="contactSection.form.namePlaceholder">
          </div>
          <div class="form-group">
            <input type="email" id="contact-email" name="email" required placeholder="Email"
              data-i18n-attr-placeholder="contactSection.form.emailPlaceholder">
          </div>
          <div class="form-group">
            <input type="text" id="contact-subject" name="subject" placeholder="Sujet"
              data-i18n-attr-placeholder="contactSection.form.subjectPlaceholder">
          </div>
          <div class="form-group">
            <textarea id="contact-message" name="message" required placeholder="Message"
              data-i18n-attr-placeholder="contactSection.form.messagePlaceholder"></textarea>
          </div>
          <button type="submit" class="btn" data-i18n="contactSection.form.submitButton">Envoyer</button>
        </form>
      </div>
    </div>
  </section>

  <footer class="footer">
    <div class="footer-content">
      <div class="logo" data-i18n="nav.logo">AM.</div>
      <div class="footer-links"><a href="#" id="open-privacy-modal-btn">Politique de Confidentialité</a></div>
      <p data-i18n="footer.copyright">© 2026 Arnaud Martiny. Tous droits réservés.</p>
    </div>
  </footer>

  <a href="#accueil" class="back-to-top" aria-label="Retour en haut"><i class="fas fa-arrow-up"></i></a>
  <a href="#contact" class="liquid-contact-btn">
    <span data-i18n="hero.contactButton">Contactez-moi</span>
    <div class="liquid-bg"></div>
  </a>

  <!-- MODALES -->

  <!-- Evolution Popup -->
  <div id="evolution-popup-overlay" class="evolution-popup-overlay">
    <div id="evolution-popup" class="evolution-popup" data-last-updated="29/05/2026">
      <button id="evolution-popup-close" class="evolution-popup-close">&times;</button>
      <h4 data-i18n="evolutionPopup.title">Site en évolution</h4>
      <p data-i18n="evolutionPopup.message" data-i18n-html></p>
    </div>
  </div>

  <!-- Case Study Overlay (Matrix Style) -->
  <div id="case-study-overlay">
    <canvas id="binary-rain-canvas"></canvas>
    <div id="boot-sequence"></div>
    <div id="case-study-window" class="case-study-window">
      <div class="case-study-title-bar" id="window-title-bar">
        <span id="case-study-window-title">System32...</span>
        <div class="title-bar-controls"><button class="case-study-close-btn">X</button></div>
      </div>
      <div class="case-study-window-body">
        <div id="case-study-content"></div>
      </div>
    </div>
    <div id="contact-popup" class="case-study-popup-window">
      <div class="case-study-title-bar"><span data-i18n="caseStudyPopup.authorMessageTitle">Note</span></div>
      <div class="popup-body">
        <i class="fas fa-info-circle" style="font-size: 2rem;"></i>
        <p data-i18n="caseStudyPopup.authorMessageText"></p>
      </div>
      <div class="popup-footer">
        <button id="contact-link-btn" data-i18n="caseStudyPopup.contactButton">Contact</button>
        <button id="close-popup-btn" data-i18n="caseStudyPopup.closeButton">Fermer</button>
      </div>
    </div>
  </div>

  <!-- MODALE CONFIDENTIALITÉ -->
  <div id="privacy-modal" class="modal-overlay">
    <div class="modal-content privacy-content">
      <button id="close-privacy-modal-btn" class="modal-close-btn" aria-label="Fermer">&times;</button>

      <h3 data-i18n="privacyModal.title">Politique de Confidentialité</h3>
      <div style="text-align: center; margin-bottom: 2rem; opacity: 0.6; font-style: italic;">
        <span data-i18n="privacyModal.lastUpdated"></span>
      </div>

      <p data-i18n="privacyModal.intro" style="margin-bottom: 2rem;"></p>

      <div class="privacy-section">
        <h4 data-i18n="privacyModal.contactFormTitle">1. Formulaire de Contact</h4>
        <p data-i18n="privacyModal.contactFormIntro">Données collectées :</p>
        <ul id="privacy-contact-points"></ul>
        <p class="privacy-purpose" data-i18n="privacyModal.contactFormPurpose" data-i18n-html></p>
      </div>

      <div class="privacy-section">
        <h4 data-i18n="privacyModal.aiAssistantTitle">2. Assistant IA</h4>
        <p data-i18n="privacyModal.aiAssistantIntro">Données de conversation :</p>
        <ul id="privacy-ai-points"></ul>
        <p class="privacy-purpose" data-i18n="privacyModal.aiAssistantPurpose" data-i18n-html></p>
      </div>

      <div class="privacy-section">
        <h4 data-i18n="privacyModal.landingPageTitle">3. Analyse de Trafic</h4>
        <p data-i18n="privacyModal.landingPageIntro">Données techniques anonymes :</p>
        <ul id="privacy-landing-page-points"></ul>
        <p class="privacy-purpose" data-i18n="privacyModal.landingPagePurpose" data-i18n-html></p>
      </div>

      <div class="privacy-section">
        <h4 data-i18n="privacyModal.yourRightsTitle">Vos Droits</h4>
        <p data-i18n="privacyModal.yourRightsText" data-i18n-html></p>
      </div>
    </div>
  </div>

  <!-- Rating Popup -->
  <div id="rating-popup-overlay" class="rating-overlay">
    <div class="rating-modal">
      <button id="rating-close-btn" class="rating-close">&times;</button>
      <h3>Votre avis ?</h3>
      <div class="stars-container" id="stars-container">
        <i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i
          class="far fa-star"></i>
      </div>
      <div class="rating-score">Note : <span id="rating-value">0</span>/5</div>
      <button id="rating-submit-btn" class="btn btn-primary" disabled>Envoyer</button>
    </div>
  </div>

  <!-- Scripts -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js" defer></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js" defer></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/TextPlugin.min.js" defer></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.19.0/matter.min.js" defer></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/hover-effect/1.0.2/hover-effect.min.js" defer></script>
  <script src="code.js?v=<?= $jsVersion ?>" defer></script>
</body>

</html>
