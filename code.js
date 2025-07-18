// =========================================================================
//                  SCRIPT.JS - FICHIER COMPLET (CORRIGÉ)
// =========================================================================

document.addEventListener("DOMContentLoaded", () => {
  let jsonAnimated = false; // Pour l'animation JSON
  let wavesAnimated = false; // Pour les vagues

  // NOUVEAU : Création dynamique de l'info-bulle pour Nowa Logistics
  const nowaTooltip = document.createElement('div');
  nowaTooltip.id = 'nowa-tooltip';
  document.body.appendChild(nowaTooltip);

   // NOUVEAU : Création dynamique de l'info-bulle pour le Case Study
  const caseStudyTooltip = document.createElement('div');
  caseStudyTooltip.id = 'case-study-tooltip';
  document.body.appendChild(caseStudyTooltip);

  const themeSwitcher = document.getElementById("theme-switcher");
  const body = document.body;

  // On a besoin de cibler l'icône pour la changer
  const themeIcon = themeSwitcher.querySelector("i");

  // Fonction pour appliquer un thème (light ou dark)
  const applyTheme = (theme) => {
    body.classList.remove("light-mode", "dark-mode"); // On nettoie les classes d'abord
    body.classList.add(`${theme}-mode`); // On ajoute la bonne classe (ex: 'light-mode')

    // On met à jour l'icône et on sauvegarde dans le localStorage
    if (theme === "light") {
      themeIcon.classList.replace("fa-sun", "fa-moon"); // Si mode clair, afficher lune
      localStorage.setItem("theme", "light");
    } else {
      themeIcon.classList.replace("fa-moon", "fa-sun"); // Si mode sombre, afficher soleil
      localStorage.setItem("theme", "dark");
    }
  };

  // Au chargement de la page, on vérifie si un thème a été sauvegardé
  const savedTheme = localStorage.getItem("theme") || "dark"; // Par défaut, on met le thème sombre
  applyTheme(savedTheme);

  // On ajoute l'écouteur d'événement sur le bouton
  themeSwitcher.addEventListener("click", () => {
    // On vérifie quel est le thème actuel pour basculer vers l'autre
    const currentTheme = localStorage.getItem("theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    applyTheme(newTheme);
  });

  // --- I18N - GESTION MULTILINGUE ---
  const translations = {};
  let currentLang = localStorage.getItem("language") || "fr";
  let langDataLoaded = false;
  const langFrBtn = document.getElementById("lang-fr");
  const langEnBtn = document.getElementById("lang-en");

  async function fetchTranslations(lang) {
    try {
      const response = await fetch(`${lang}.json?v=${new Date().getTime()}`);
      if (!response.ok) throw new Error(`Failed to load ${lang}.json`);
      translations[lang] = await response.json();
      if (lang === currentLang) langDataLoaded = true;
    } catch (error) {
      console.error(`Error fetching translation file ${lang}.json:`, error);
    }
  }

  function getNestedTranslation(obj, key) {
    if (!obj || typeof key !== "string") return undefined;
    return key.split(".").reduce((o, i) => (o ? o[i] : undefined), obj);
  }

  function applyTranslations(lang) {
    const langData = translations[lang];
    if (!langData) {
      console.warn(`No translation data for ${lang}.`);
      return;
    }

    document.documentElement.lang = lang;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const translation = getNestedTranslation(langData, key);
      if (translation !== undefined) {
        if (el.hasAttribute("data-i18n-html")) el.innerHTML = translation;
        else el.textContent = translation;
      }
    });

    document.querySelectorAll("[data-i18n-attr-content]").forEach((el) => {
      const key = el.getAttribute("data-i18n-attr-content");
      const translation = getNestedTranslation(langData, key);
      if (translation !== undefined) el.setAttribute("content", translation);
    });

    document.querySelectorAll("[data-i18n-attr-alt]").forEach((el) => {
      const key = el.getAttribute("data-i18n-attr-alt");
      const translation = getNestedTranslation(langData, key);
      if (translation !== undefined) el.setAttribute("alt", translation);
    });

    document.querySelectorAll("[data-i18n-attr-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-attr-placeholder");
      const translation = getNestedTranslation(langData, key);
      if (translation !== undefined)
        el.setAttribute("placeholder", translation);
    });

    // --- GESTION DU FORMULAIRE DE CONTACT AVEC AJAX (SANS REDIRECTION) ---
const contactForm = document.getElementById('contact-form');
const resultMessage = document.getElementById('form-result-message');

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault(); // Empêche l'envoi classique du formulaire

    const formData = new FormData(contactForm);
    const object = {};
    formData.forEach((value, key) => {
      object[key] = value;
    });
    const json = JSON.stringify(object);

    resultMessage.innerHTML = "Envoi en cours...";
    resultMessage.classList.add('visible');
    resultMessage.classList.remove('success', 'error');

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: json
    })
    .then(async (response) => {
      let jsonResponse = await response.json();
      if (response.status == 200) {
        resultMessage.innerHTML = "Message envoyé avec succès !";
        resultMessage.classList.add('success');
      } else {
        console.log(response);
        resultMessage.innerHTML = jsonResponse.message || "Une erreur est survenue.";
        resultMessage.classList.add('error');
      }
    })
    .catch(error => {
      console.log(error);
      resultMessage.innerHTML = "Oups ! Il y a eu un problème.";
      resultMessage.classList.add('error');
    })
    .then(function () {
      contactForm.reset(); // Vide les champs du formulaire
      // Fait disparaître le message après 5 secondes
      setTimeout(() => {
        resultMessage.classList.remove('visible');
      }, 5000);
    });
  });
}
   
    // ==========================================================
    //    NOUVEAU : MISE À JOUR DYNAMIQUE DU LIEN DU CV
    // ==========================================================
    const cvLink = document.getElementById('nav-cv-link');
    if (cvLink) {
        // Définissez ici les noms de vos fichiers CV
        const cvFileNameFR = 'CV-Arnaud-Martiny-FR.pdf';
        const cvFileNameEN = 'CV-Arnaud-Martiny-EN.pdf';

        // Mettez à jour le lien en fonction de la langue
        const filePath = lang === 'fr' 
            ? `assets/CV/${cvFileNameFR}` // <-- ON A AJOUTÉ /CV/ ICI
            : `assets/CV/${cvFileNameEN}`; // <-- ET ICI AUSSI
            
        cvLink.setAttribute('href', filePath);
    }

    
    // --- PRÉPARATION DU BLOC JSON POUR L'ANIMATION DE FRAPPE ---
    const jsonContentEl = document.getElementById("language-json-content");
    if (
      jsonContentEl &&
      langData.skillsSection &&
      langData.skillsSection.languages
    ) {
      jsonContentEl.innerHTML = "";
      jsonContentEl.dataset.languages = JSON.stringify(
        langData.skillsSection.languages
      );

      const codeBlockTitle = document.getElementById("code-block-title");
      if (codeBlockTitle) {
        codeBlockTitle.textContent = "language.json";
      }
    }

    // --- GÉNÉRATION DES VAGUES ---
    const wavesContainer = document.querySelector(".waves-container");
    if (
      wavesContainer &&
      langData.skillsSection &&
      langData.skillsSection.languages
    ) {
      wavesContainer.innerHTML = "";
      langData.skillsSection.languages.forEach((lang) => {
        const waveItem = document.createElement("div");
        waveItem.className = "wave-item";
        const isNative = lang.activeDots === 5;
        const amplitude = isNative ? 20 : 15;
        const frequency = isNative ? 0.02 : 0.03;
        const speed = isNative ? 0.03 : 0.05;

        waveItem.innerHTML = `
              <div class="wave-info">
                  <span class="language-name">${lang.name}</span>
                  <span class="language-level">${lang.levelText}</span>
              </div>
              <canvas class="wave-canvas" data-amplitude="${amplitude}" data-frequency="${frequency}" data-speed="${speed}"></canvas>
          `;
        wavesContainer.appendChild(waveItem);
      });
    }

    // --- TAGS DE COMPÉTENCES ---
    const aboutSkillsContainer = document.getElementById("about-skills-tags");
    if (aboutSkillsContainer && langData.about && langData.about.skillsTags) {
      aboutSkillsContainer.innerHTML = "";
      langData.about.skillsTags.forEach((skill) => {
        const skillTagDiv = document.createElement("div");
        skillTagDiv.className = "skill-tag";
        skillTagDiv.textContent = skill;
        aboutSkillsContainer.appendChild(skillTagDiv);
      });
    }

    // --- GESTION DE LA NAVBAR AU SCROLL ---
    const navContainer = document.querySelector(".nav-container");
    if (navContainer) {
      window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
          navContainer.classList.add("scrolled");
        } else {
          navContainer.classList.remove("scrolled");
        }
      });
    }

    // --- LOGIQUE "SYSTÈME SOLAIRE PULSANT" ---
    const sceneContainer = document.getElementById("skills-scene-container");
    const solarSystem = document.getElementById("skills-solar-system");
    const infobox = document.getElementById("skills-infobox");
    const canvas = document.getElementById("starfield-canvas");

    if (
      sceneContainer &&
      solarSystem &&
      infobox &&
      canvas &&
      langData.skillsSection &&
      langData.skillsSection.planets
    ) {
      solarSystem.innerHTML = `
      <div id="skill-sun">
          <div class="sun-flare"></div>
          <div class="sun-core">AM.</div>
      </div>
    `;
      const ctx = canvas.getContext("2d");
      canvas.width = sceneContainer.offsetWidth;
      canvas.height = sceneContainer.offsetHeight;

      if (!canvas.animationId) {
        let stars = [];
        for (let i = 0; i < 200; i++) {
          stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1.5,
            alpha: Math.random() * 0.5 + 0.5,
            speed: Math.random() * 0.5 + 0.1,
          });
        }
        function drawStars() {
          if (!document.contains(canvas)) return;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          stars.forEach((star) => {
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
            ctx.fill();
            star.x -= star.speed;
            if (star.x < 0) star.x = canvas.width;
          });
          canvas.animationId = requestAnimationFrame(drawStars);
        }
        drawStars();
      }

      const skillPlanetsData = langData.skillsSection.planets;
      skillPlanetsData.forEach((planetData, i) => {
        const orbitRadius = 100 + i * 60;
        const duration = 25 + i * 15;
        const direction = i % 2 === 0 ? "normal" : "reverse";
        const orbitPath = document.createElement("div");
        orbitPath.className = "orbit-path";
        orbitPath.style.width = `${orbitRadius * 2}px`;
        orbitPath.style.height = `${orbitRadius * 2}px`;
        const planetContainer = document.createElement("div");
        planetContainer.className = "skill-planet-container";
        const skillPlanet = document.createElement("div");
        skillPlanet.id = planetData.id;
        skillPlanet.className = "skill-planet";
        skillPlanet.textContent = planetData.name;
        skillPlanet.style.setProperty("--duration", `${duration}s`);
        skillPlanet.style.setProperty("--direction", direction);
        planetContainer.appendChild(skillPlanet);
        orbitPath.appendChild(planetContainer);
        solarSystem.appendChild(orbitPath);
        gsap.to(orbitPath, {
          rotation: direction === "normal" ? 360 : -360,
          duration: duration,
          ease: "none",
          repeat: -1,
        });
        planetContainer.addEventListener("mouseenter", () => {
          infobox.innerHTML = `<h4>${planetData.name}</h4><p>${planetData.description}</p>`;
          infobox.classList.add("visible");
        });
        planetContainer.addEventListener("mouseleave", () => {
          infobox.classList.remove("visible");
        });
      });
    }
    
    // ===== BLOC TIMELINE CORRIGÉ =====
    const timelineContainer = document.getElementById("timeline-content");
    if (
      timelineContainer &&
      langData.experienceSection &&
      langData.experienceSection.items
    ) {
      timelineContainer.innerHTML = "";
      langData.experienceSection.items.forEach((item) => {
        const timelineItemDiv = document.createElement("div");
        timelineItemDiv.className = "timeline-item reveal";

        let titleHtml;
        if (item.link) {
          titleHtml = `<h3><a href="${item.link}" target="_blank" rel="noopener noreferrer">${item.title}</a></h3>`;
        } else {
          titleHtml = `<h3>${item.title}</h3>`;
        }

        let descriptionHtml = `<p>${item.description}</p>`;
        if (item.description2) {
          descriptionHtml += `<br><p>${item.description2}</p>`;
        }
        
        timelineItemDiv.innerHTML = `
          <div class="timeline-dot"></div>
          <div class="timeline-content" data-i18n-html>
              ${titleHtml}
              <span class="timeline-date">${item.date}</span>
              ${descriptionHtml}
          </div>`;
        timelineContainer.appendChild(timelineItemDiv);
      });
    }

    // --- GÉNÉRATION DES PROJETS DÉTAILLÉS (AVEC BOUTON CASE STUDY) ---
    const projectsContainer = document.getElementById(
      "featured-projects-container"
    );
    if (
      projectsContainer &&
      langData.featuredProjects &&
      langData.featuredProjects.items
    ) {
      projectsContainer.innerHTML = "";
      langData.featuredProjects.items.forEach((project) => {
        const projectCard = document.createElement("div");
        projectCard.className = "project-card reveal";
        
        if (project.id) {
          projectCard.id = project.id;
        }

        let techHtml = "";
        project.tech.forEach((tech) => {
          techHtml += `<div class="project-tech-item">${tech}</div>`;
        });

        const liveLinkBtnId = project.id ? `id="live-link-${project.id}"` : '';
        const caseStudyButtonText = getNestedTranslation(langData, "featuredProjects.caseStudyButton") || "View Case Study";

        const contentHtml = `
                <div class="project-content">
                    <p class="project-category">${project.category}</p>
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <div class="project-tech-list">${techHtml}</div>
                    <div class="project-links">
                        <a href="${
                          project.liveLink
                        }" class="btn" target="_blank" ${liveLinkBtnId} ${
          project.liveLink === "#"
            ? 'style="pointer-events: none; opacity: 0.5;"'
            : ""
        }>Voir le site</a>
                        <a href="${
                          project.codeLink
                        }" class="btn btn-outline" target="_blank" ${ // <-- LA MODIFICATION EST ICI
          project.codeLink === "#"
            ? 'style="pointer-events: none; opacity: 0.5;"'
            : ""
        }>Voir le code</a>
                        <button class="btn btn-case-study" data-project-id="${project.id}">
                            <span>${caseStudyButtonText}</span>
                        </button>
                    </div>
                </div>`;

        const imageHtml = `
                <div class="project-image">
                    <a href="${project.liveLink}" target="_blank">
                        <img src="${project.imageSrc}" alt="${project.imageAlt}">
                    </a>
                </div>`;

        projectCard.innerHTML = imageHtml + contentHtml;
        projectsContainer.appendChild(projectCard);
      });
    }


    // --- NOUVEAU : GESTION DE L'INFO-BULLE POUR NOWA LOGISTICS ---
    const nowaLiveLinkBtn = document.getElementById('live-link-nowa-logistics');
    if (nowaLiveLinkBtn) {
        const tooltipText = getNestedTranslation(langData, "featuredProjects.nowaTooltip");
        nowaLiveLinkBtn.addEventListener('mouseenter', () => {
            nowaTooltip.textContent = tooltipText;
            nowaTooltip.style.display = 'block';
        });
        document.addEventListener('mousemove', (e) => {
             if (nowaTooltip.style.display === 'block') {
                nowaTooltip.style.left = `${e.clientX + 15}px`;
                nowaTooltip.style.top = `${e.clientY + 15}px`;
             }
        });
        nowaLiveLinkBtn.addEventListener('mouseleave', () => {
            nowaTooltip.style.display = 'none';
        });
    }

    // =======================================================
    //   APPEL À LA FONCTION D'ANIMATION RÉTRO (CORRIGÉ)
    // =======================================================
    // On appelle la fonction pour la première fois avec les données de la langue actuelle.
    initializeRetroAnimation(langData);

    // --- NOUVEAU : GESTION DE LA DATE DANS LE POP-UP D'ÉVOLUTION ---
    const evolutionPopupMessage = document.querySelector('#evolution-popup p[data-i18n="evolutionPopup.message"]');
    const evolutionPopupEl = document.getElementById('evolution-popup');
    if (evolutionPopupMessage && evolutionPopupEl && evolutionPopupEl.dataset.lastUpdated) {
        const lastUpdatedDate = evolutionPopupEl.dataset.lastUpdated;
        // Le texte est déjà défini par la logique i18n, on remplace juste le placeholder
        evolutionPopupMessage.innerHTML = evolutionPopupMessage.innerHTML.replace('{{date}}', `<b>${lastUpdatedDate}</b>`);
    }

    updateLangButtons();
    if (typeof reveal === "function") reveal();
  }

  async function setLanguage(lang, force = false) {
    if (currentLang === lang && !force) return;
    if (!translations[lang]) {
      await fetchTranslations(lang);
    }
    currentLang = lang;
    localStorage.setItem("language", lang);
    applyTranslations(lang);
  }

  function updateLangButtons() {
    if (langFrBtn) langFrBtn.classList.toggle("active", currentLang === "fr");
    if (langEnBtn) langEnBtn.classList.toggle("active", currentLang === "en");
  }

  if (langFrBtn) langFrBtn.addEventListener("click", () => setLanguage("fr"));
  if (langEnBtn) langEnBtn.addEventListener("click", () => setLanguage("en"));

  (async () => {
    await Promise.all([fetchTranslations("fr"), fetchTranslations("en")]);
    let langToApply = localStorage.getItem("language") || "fr";
    if (!translations[langToApply]) {
      langToApply = langToApply === "fr" && translations["en"] ? "en" : "fr";
    }
    await setLanguage(langToApply, true);
    reveal();
  })();
  // --- FIN DU SCRIPT I18N ---

  // --- GESTION DU CURSEUR PERSONNALISÉ ---
  const cursor = document.querySelector(".cursor");
  const cursorFollower = document.querySelector(".cursor-follower");

  if (cursor && cursorFollower) {
    document.addEventListener("mousemove", (e) => {
      gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1 });
      gsap.to(cursorFollower, { x: e.clientX, y: e.clientY, duration: 0.3 });
    });

    const interactableElements = "a, button, input, textarea";

    document.addEventListener("mouseover", (e) => {
      const target = e.target.closest(interactableElements);
      if (target) {
        gsap.to(cursor, { scale: 1.5 });
        gsap.to(cursorFollower, { scale: 0.7 });

        if (body.classList.contains("light-mode")) {
          cursor.style.mixBlendMode = "difference";
        }
      }
    });

    document.addEventListener("mouseout", (e) => {
      const target = e.target.closest(interactableElements);
      if (target) {
        gsap.to(cursor, { scale: 1 });
        gsap.to(cursorFollower, { scale: 1 });

        if (body.classList.contains("light-mode")) {
          cursor.style.mixBlendMode = "normal";
        }
      }
    });
  }

  const homeLink = document.getElementById("home-link");
  if (homeLink) {
    homeLink.addEventListener("mouseenter", () => {
      if (body.classList.contains("light-mode")) {
        cursor.style.mixBlendMode = "difference";
      }
    });

    homeLink.addEventListener("mouseleave", () => {
      if (body.classList.contains("light-mode")) {
        cursor.style.mixBlendMode = "normal";
      }
    });
  }

  // --- ANIMATIONS AU SCROLL ---
  let skillsAnimated = false;
  let countersAnimated = false;
  const skillsSection = document.querySelector(".skills-section");
  const counterSection = document.querySelector(".counter-section");

  // AJOUT DE LA FONCTION `backspace`
  async function backspace(count) {
    const codeEl = document.getElementById("language-json-content");
    const backspaceSpeed = 40;
    const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    for (let i = 0; i < count; i++) {
      let currentHtml = codeEl.innerHTML.replace(
        /<span class="typing-caret"><\/span>$/,
        ""
      );
      const lastTagOpen = currentHtml.lastIndexOf("<");
      const lastTagClose = currentHtml.lastIndexOf(">");
      let textPart;
      let tagPart = "";
      if (lastTagOpen > lastTagClose) {
        textPart = currentHtml;
      } else {
        tagPart = currentHtml.substring(lastTagOpen);
        textPart = currentHtml.substring(0, lastTagOpen);
      }
      if (textPart) {
        textPart = textPart.slice(0, -1);
      }
      codeEl.innerHTML =
        textPart + tagPart + '<span class="typing-caret"></span>';
      await pause(backspaceSpeed);
    }
  }

  async function animateJsonTypingAdvanced() {
    const codeEl = document.getElementById("language-json-content");
    if (!codeEl || !codeEl.dataset.languages) return;

    const languages = JSON.parse(codeEl.dataset.languages);
    const lang1 = languages[0];
    const lang2 = languages[1];

    const baseTypingSpeed = 15;
    const mistakeSpeed = 25;
    const backspaceSpeed = 20;
    const pauseDuration = 250;

    const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const addCaret = () => `<span class="typing-caret"></span>`;
    const updateContent = (content) => {
      codeEl.innerHTML = content + addCaret();
    };
    const removeCaret = () => {
      const caret = codeEl.querySelector(".typing-caret");
      if (caret) caret.remove();
    };

    async function type(text) {
      let currentContent = codeEl.innerHTML.replace(addCaret(), "");
      for (const char of text) {
        const randomSpeed = baseTypingSpeed + (Math.random() - 0.5) * 30;
        currentContent += char;
        updateContent(currentContent);
        await pause(randomSpeed);
      }
    }

    async function typeColoredText(text, className, speed = baseTypingSpeed) {
      let currentContent = codeEl.innerHTML.replace(addCaret(), "");
      let builtString = "";
      const openTag = `<span class="${className}">"`;
      const closeTag = '"</span>';
      for (const char of text) {
        const randomSpeed = speed + (Math.random() - 0.5) * 40;
        builtString += char;
        updateContent(currentContent + openTag + builtString + closeTag);
        await pause(randomSpeed);
      }
      codeEl.innerHTML = currentContent + openTag + text + closeTag;
      updateContent(codeEl.innerHTML);
    }

    updateContent("");
    const punc = (char) => `<span class="json-punctuation">${char}</span>`;
    const key = (text) => `<span class="json-key">"${text}"</span>`;
    const comment = (text) => `<span class="json-comment">${text}</span>`;
    const openBrace = punc("{");
    const closeBrace = punc("}");
    const comma = punc(",");
    const colon = punc(":");
    const newLine = (indent = 1) => "\n" + "  ".repeat(indent);

    await type(openBrace + newLine());
    await type(key("languages") + colon + " " + punc("[") + newLine(2));
    await type(openBrace + newLine(3));
    await type(
      key("name") +
        colon +
        " " +
        `<span class="json-string">"${lang1.name}"</span>` +
        comma +
        newLine(3)
    );
    await type(key("level") + colon + " ");
    await typeColoredText(lang1.levelMistake, "json-string", mistakeSpeed);
    await pause(pauseDuration);
    await backspace(lang1.levelMistake.length + 2);
    await typeColoredText(lang1.levelText, "json-string");
    await type(comma + newLine(3));
    await type(
      key("comment") +
        colon +
        " " +
        comment(`"${lang1.jsonComment}"`) +
        newLine(2)
    );
    await type(closeBrace + comma);
    await type(newLine(2) + openBrace + newLine(3));
    await type(
      key("name") +
        colon +
        " " +
        `<span class="json-string">"${lang2.name}"</span>` +
        comma +
        newLine(3)
    );
    await type(key("level") + colon + " ");
    await typeColoredText(lang2.levelMistake, "json-string", mistakeSpeed);
    await pause(pauseDuration);
    await backspace(lang2.levelMistake.length + 2);
    await typeColoredText(lang2.levelText, "json-string");
    await type(comma + newLine(3));
    await type(
      key("comment") +
        colon +
        " " +
        comment(`"${lang2.jsonComment}"`) +
        newLine(2)
    );
    await type(closeBrace);
    await type(newLine(1) + punc("]"));
    await type(newLine(0) + closeBrace);
    removeCaret();
  }

  function startWaveAnimations() {
    const waveItems = document.querySelectorAll(".wave-item");
    if (waveItems.length === 0) return;

    waveItems.forEach((item) => {
      const canvas = item.querySelector(".wave-canvas");
      if (!canvas) return;

      const amplitude = parseFloat(canvas.dataset.amplitude);
      const frequency = parseFloat(canvas.dataset.frequency);
      const speed = parseFloat(canvas.dataset.speed);
      const ctx = canvas.getContext("2d");
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
      const waveColor = "#8A2BE2";
      const waveColorEnd = "#5eead4";
      let time = 0;
      function animateWave() {
        if (!document.body.contains(canvas)) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const gradient = ctx.createLinearGradient(0, 0, canvas.offsetWidth, 0);
        gradient.addColorStop(0, waveColor);
        gradient.addColorStop(1, waveColorEnd);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2.5;
        ctx.shadowColor = "rgba(138, 43, 226, 0.5)";
        ctx.shadowBlur = 10;
        ctx.beginPath();
        for (let x = 0; x < canvas.offsetWidth; x++) {
          const y =
            canvas.offsetHeight / 2 +
            Math.sin(x * frequency + time) * amplitude;
          ctx.lineTo(x, y);
        }
        ctx.stroke();
        time += speed;
        requestAnimationFrame(animateWave);
      }
      animateWave();
    });
  }

  function reveal() {
    const reveals = document.querySelectorAll(".reveal");
    reveals.forEach((element) => {
      const windowHeight = window.innerHeight;
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 100;
      if (elementTop < windowHeight - elementVisible) {
        element.classList.add("active");
      }
    });

    if (counterSection && !countersAnimated) {
      const counterTop = counterSection.getBoundingClientRect().top;
      if (counterTop < window.innerHeight * 0.85) {
        animateCounters();
        countersAnimated = true;
      }
    }

    const jsonSection = document.getElementById("language-section-json");
    if (jsonSection && !jsonAnimated) {
      const jsonTop = jsonSection.getBoundingClientRect().top;
      if (jsonTop < window.innerHeight * 0.85) {
        if (typeof animateJsonTypingAdvanced === "function") {
          animateJsonTypingAdvanced();
        }
        jsonAnimated = true;
      }
    }

    const wavesSection = document.getElementById("language-section-waves");
    if (wavesSection && !wavesAnimated) {
      const wavesTop = wavesSection.getBoundingClientRect().top;
      if (wavesTop < window.innerHeight * 0.85) {
        if (typeof startWaveAnimations === "function") startWaveAnimations();
        wavesAnimated = true;
      }
    }
  }

  function animateCounters() {
    const counterNumbers = document.querySelectorAll(".counter-number");
    counterNumbers.forEach((counter) => {
      const target = +counter.getAttribute("data-count");
      let count = 0;
      const increment = target / 100;
      const updateCount = () => {
        if (count < target) {
          count += increment;
          counter.innerText = Math.ceil(count);
          setTimeout(updateCount, 20);
        } else {
          counter.innerText = target;
        }
      };
      updateCount();
    });
  }

  window.addEventListener("scroll", reveal);

  const backToTopBtn = document.querySelector(".back-to-top");
  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      backToTopBtn.classList.toggle("visible", window.scrollY > 300);
    });
  }

  document.querySelectorAll('a[href^="#"]:not(#nav-cv-link)').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      try {
        document.querySelector(targetId).scrollIntoView({ behavior: "smooth" });
      } catch (error) {
        console.error("Smooth scroll target not found:", targetId, error);
      }
    });
  });
  

  // --- GESTION DU MENU HAMBURGER ---
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileMenuLinks = mobileMenu.querySelectorAll("a");
  const bodyEl = document.body;
  
  // ===== AJOUTEZ LE CODE CI-DESSOUS =====
  const mobileMenuCloseBtn = document.getElementById('mobile-menu-close-btn');

  if (hamburgerBtn && mobileMenu) {
    hamburgerBtn.addEventListener("click", () => {
      bodyEl.classList.toggle("mobile-menu-open");
    });

    // On fait fonctionner le nouveau bouton "X"
    if (mobileMenuCloseBtn) {
      mobileMenuCloseBtn.addEventListener('click', () => {
        bodyEl.classList.remove('mobile-menu-open');
      });
    }
    // ===================================

    mobileMenuLinks.forEach((link) => {
      link.addEventListener("click", () => {
        bodyEl.classList.remove("mobile-menu-open");
      });
    });
  }



  // --- SYNCHRONISATION DES BOUTONS DE THÈME ET LANGUE ---
  const mobileThemeSwitcher = document.getElementById("theme-switcher-mobile");
  const mobileLangFrBtn = document.getElementById("lang-fr-mobile");
  const mobileLangEnBtn = document.getElementById("lang-en-mobile");

  if (mobileThemeSwitcher) {
    const mobileThemeIcon = mobileThemeSwitcher.querySelector("i");
    if (localStorage.getItem("theme") === "light") {
      mobileThemeIcon.classList.replace("fa-sun", "fa-moon");
    }
    mobileThemeSwitcher.addEventListener("click", () => {
      themeSwitcher.click();
      if (bodyEl.classList.contains("light-mode")) {
        mobileThemeIcon.classList.replace("fa-sun", "fa-moon");
      } else {
        mobileThemeIcon.classList.replace("fa-moon", "fa-sun");
      }
    });
  }

  if (mobileLangFrBtn && mobileLangEnBtn) {
    mobileLangFrBtn.classList.toggle("active", currentLang === "fr");
    mobileLangEnBtn.classList.toggle("active", currentLang === "en");
    mobileLangFrBtn.addEventListener("click", () => {
      setLanguage("fr");
      mobileLangFrBtn.classList.add("active");
      mobileLangEnBtn.classList.remove("active");
    });
    mobileLangEnBtn.addEventListener("click", () => {
      setLanguage("en");
      mobileLangEnBtn.classList.add("active");
      mobileLangFrBtn.classList.remove("active");
    });
  }

  // --- GESTION DU POP-UP D'ÉVOLUTION ---
  const evolutionPopupOverlay = document.getElementById("evolution-popup-overlay");
  const evolutionPopup = document.getElementById("evolution-popup");
  const evolutionPopupCloseBtn = document.getElementById("evolution-popup-close");

  if (evolutionPopupOverlay && evolutionPopup && evolutionPopupCloseBtn) {
    const closePopup = () => {
      evolutionPopup.classList.add('exploding');
      evolutionPopup.addEventListener('animationend', () => {
        evolutionPopupOverlay.classList.remove('visible');
        evolutionPopup.classList.remove('exploding');
      }, { once: true });
    };

    if (!sessionStorage.getItem('evolutionPopupShown')) {
      setTimeout(() => {
        evolutionPopupOverlay.classList.add('visible');
        sessionStorage.setItem('evolutionPopupShown', 'true');
      }, 4000);
    }

    evolutionPopupCloseBtn.addEventListener('click', closePopup);
    evolutionPopupOverlay.addEventListener('click', (e) => {
        if (e.target === evolutionPopupOverlay) {
            closePopup();
        }
    });

    evolutionPopup.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }

  // --- NOUVEAU : LOGIQUE DE LA MODALE CASE STUDY ---
  const caseStudyOverlay = document.getElementById('case-study-overlay');
  if (caseStudyOverlay) {
    const bootSequenceEl = document.getElementById('boot-sequence');
    const binaryRainCanvas = document.getElementById('binary-rain-canvas');
    const caseStudyWindowEl = document.getElementById('case-study-window');
    const windowTitleBar = document.getElementById('window-title-bar');
    const caseStudyWindowTitle = document.getElementById('case-study-window-title');
    const caseStudyContentEl = document.getElementById('case-study-content');
    const contactPopup = document.getElementById('contact-popup');
    const closePopupBtn = document.getElementById('close-popup-btn');
    const contactLinkBtn = document.getElementById('contact-link-btn');

    let popupTimerId;
    let rainIntervalId;

    const setupRain = () => {
        if (rainIntervalId) clearInterval(rainIntervalId);
        const ctx = binaryRainCanvas.getContext('2d');
        binaryRainCanvas.width = window.innerWidth;
        binaryRainCanvas.height = window.innerHeight;
        const characters = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン01';
        const fontSize = 16;
        const columns = binaryRainCanvas.width / fontSize;
        const rainDrops = Array.from({ length: Math.floor(columns) }).map(() => 1);
        
        const drawRain = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, binaryRainCanvas.width, binaryRainCanvas.height);
            ctx.fillStyle = '#0F0';
            ctx.font = `${fontSize}px monospace`;
            rainDrops.forEach((y, i) => {
                const text = characters.charAt(Math.floor(Math.random() * characters.length));
                ctx.fillText(text, i * fontSize, y * fontSize);
                if (y * fontSize > binaryRainCanvas.height && Math.random() > 0.975) {
                    rainDrops[i] = 0;
                }
                rainDrops[i]++;
            });
        };
        rainIntervalId = setInterval(drawRain, 40);
    };

    const runBootSequence = () => {
        const bootLines = ['AM_BIOS v4.2.1...', 'Initializing Kernel...', 'Memory Test: OK', 'Loading OS...', 'Authenticating user: A.Martiny...', 'LAUNCHING APPLICATION...'];
        bootSequenceEl.innerHTML = '';
        let delay = 0;
        bootLines.forEach(line => {
            setTimeout(() => {
                const p = document.createElement('p');
                p.className = 'boot-line';
                p.textContent = line;
                bootSequenceEl.appendChild(p);
            }, delay);
            delay += (Math.random() * 200 + 100);
        });
        return delay + 1000;
    };

    const launchCaseStudy = (projectId) => {
        const langData = translations[currentLang];
        const projectData = langData.featuredProjects.items.find(p => p.id === projectId);

        if (!projectData || !projectData.caseStudy) {
            console.error("No case study data for project:", projectId);
            return;
        }

        const cs = projectData.caseStudy;
        
        // On remplit la fenêtre avec les BONNES informations
        caseStudyWindowTitle.textContent = cs.title;
        caseStudyContentEl.innerHTML = `
            <h4>${cs.briefTitle}</h4>
            <p>${cs.brief}</p>
            <h4>${cs.roleTitle}</h4>
            <p>${cs.role}</p>
            <h4>${cs.techTitle}</h4>
            <p>${projectData.tech.join(' | ')}</p>
            <h4>${cs.resultsTitle}</h4>
            <p>${cs.results}</p>
        `;

        // Le reste de la fonction qui gère l'affichage est déjà correct
        caseStudyOverlay.style.display = 'block';
        bootSequenceEl.style.display = 'block';
        caseStudyWindowEl.style.display = 'none';
        contactPopup.style.display = 'none';
        document.body.style.overflow = 'hidden';
        
        setupRain();
        const bootDuration = runBootSequence();

        setTimeout(() => {
            bootSequenceEl.style.display = 'none';
            caseStudyWindowEl.style.display = 'flex';
            popupTimerId = setTimeout(() => {
                contactPopup.style.display = 'block';
            }, 8000);
        }, bootDuration);
    };

    const closeCaseStudy = () => {
        caseStudyOverlay.style.display = 'none';
        document.body.style.overflow = 'auto';
        clearInterval(rainIntervalId);
        clearTimeout(popupTimerId);
    };

    document.addEventListener('click', (event) => {
        const caseStudyBtn = event.target.closest('.btn-case-study');
        if (caseStudyBtn) {
            const projectId = caseStudyBtn.dataset.projectId;
            launchCaseStudy(projectId);
        }
    });

    document.querySelectorAll('.case-study-close-btn').forEach(btn => {
        btn.addEventListener('click', closeCaseStudy);
    });

    closePopupBtn.addEventListener('click', () => {
        contactPopup.style.display = 'none';
    });

    contactLinkBtn.addEventListener('click', () => {
        closeCaseStudy();
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && caseStudyOverlay.style.display === 'block') {
            closeCaseStudy();
        }
    });

    let isDragging = false, offsetX, offsetY;
    windowTitleBar.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - caseStudyWindowEl.offsetLeft;
        offsetY = e.clientY - caseStudyWindowEl.offsetTop;
        e.preventDefault();
    });
    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            caseStudyWindowEl.style.left = `${e.clientX - offsetX}px`;
            caseStudyWindowEl.style.top = `${e.clientY - offsetY}px`;
        }
    });
    document.addEventListener('mouseup', () => {
        isDragging = false;
    });
  }

  // --- NOUVEAU : GESTION DE L'INFO-BULLE POUR LE BOUTON CASE STUDY ---
  const caseStudyTooltipEl = document.getElementById('case-study-tooltip');

  if (caseStudyTooltipEl) {
    let currentCaseStudyBtn = null;

    document.addEventListener('mouseover', (e) => {
      const btn = e.target.closest('.btn-case-study');
      if (btn) {
        currentCaseStudyBtn = btn;
        const tooltipText = getNestedTranslation(translations[currentLang], "featuredProjects.caseStudyTooltip");
        caseStudyTooltipEl.textContent = tooltipText || "You won't regret the trip ;-)";
        caseStudyTooltipEl.style.display = 'block';
      }
    });

    document.addEventListener('mousemove', (e) => {
      if (caseStudyTooltipEl.style.display === 'block') {
        caseStudyTooltipEl.style.left = `${e.clientX + 20}px`;
        caseStudyTooltipEl.style.top = `${e.clientY - 30}px`;
      }
    });

    document.addEventListener('mouseout', (e) => {
      const btn = e.target.closest('.btn-case-study');
      if (btn) {
        caseStudyTooltipEl.style.display = 'none';
        currentCaseStudyBtn = null;
      }
    });
  }

  // =======================================================
  //   ANIMATION DE LA SECTION RÉTRO METHODOLOGIE (VERSION CORRIGÉE ET ROBUSTE)
  // =======================================================

  // On enregistre les plugins une seule fois au début du script
  gsap.registerPlugin(ScrollTrigger, TextPlugin);

  // On garde une référence à notre animation pour pouvoir la détruire et la reconstruire
  let retroTimeline; 

  function initializeRetroAnimation(langData) {
      // Si une animation précédente existe (ex: changement de langue), on la détruit proprement
      if (retroTimeline) {
          retroTimeline.kill();
      }

      const retroSection = document.getElementById('retro-methodology');
      if (!retroSection || !langData.retroMethodologySection) {
          console.error("Section Rétro ou données de traduction manquantes.");
          return; // On arrête si la section ou les données n'existent pas
      }

      const searchWindow = document.getElementById('google-search-window');
      const resultsWindow = document.getElementById('search-results-window');
      const downloadWindow = document.getElementById('download-box-window');
      const finalWindow = document.getElementById('final-report-window');

      // On s'assure que tout est à son état initial
      gsap.set([searchWindow, resultsWindow, downloadWindow, finalWindow], { display: 'none', opacity: 0 });
      gsap.set('#typing-caret', { display: 'inline' });
      gsap.set('#retro-search-input', { text: "" });

      // On crée la timeline d'animation
      retroTimeline = gsap.timeline({
          scrollTrigger: {
              trigger: retroSection,
              start: "top top",
              end: "+=6000", // Augmenté pour donner plus de temps
              pin: true,
              scrub: 1.5,
          }
      });

      // Séquence d'animation
      retroTimeline.to(searchWindow, { display: 'block', opacity: 1, duration: 0.5 })
        .to('#retro-search-input', {
            duration: 2,
            text: {
                value: langData.retroMethodologySection.searchQuery,
            },
            ease: "none"
        })
        .set('#typing-caret', { display: 'none' })
        .to('#retro-search-btn', { scale: 0.95, duration: 0.1, repeat: 1, yoyo: true })
        .to(searchWindow, { opacity: 0, display: 'none', duration: 0.5, delay: 0.5 })
        .call(() => { 
            const resultsData = langData.retroMethodologySection.results;
            const resultsContainer = resultsWindow.querySelector('.retro-window-body');
            resultsContainer.innerHTML = resultsData.map(r => `
              <div class="search-result">
                  <a href="#">${r.title}</a>
                  <p>${r.description}</p>
                  <span>${r.url}</span>
              </div>
            `).join('');
        })
        .to(resultsWindow, { display: 'block', opacity: 1, duration: 0.5 });
        
      // Boucle pour les téléchargements
      const downloadsData = langData.retroMethodologySection.downloads;
      downloadsData.forEach((download, index) => {
          retroTimeline.to(downloadWindow, { display: 'block', opacity: 1, duration: 0.5, delay: 1 })
            .call(() => {
                document.getElementById('download-filename').textContent = download.filename;
                document.getElementById('time-left').textContent = download.time;
                gsap.set('#download-progress-fill', { width: '0%' });
            })
            .to('#download-progress-fill', { width: '100%', duration: 2, ease: "power1.inOut" })
            .to(downloadWindow, { opacity: 0, display: 'none', duration: 0.5 });
      });

      retroTimeline.to(resultsWindow, { opacity: 0, display: 'none', duration: 0.5 })
        .to(finalWindow, { display: 'block', opacity: 1, duration: 1 });
  }

});