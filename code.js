// =========================================================================
//                  SCRIPT.JS - VERSION FINALE ET CORRIGÉE
// =========================================================================

document.addEventListener("DOMContentLoaded", () => {
  let jsonAnimated = false; // Pour l'animation JSON
  let wavesAnimated = false; // Pour les vagues

  // --- AJOUT --- : On déclare le journal de la conversation ici pour qu'il soit accessible
  // à la fois par le terminal et par l'événement de fermeture de la page.
  let conversationLog = [];

  const universalTooltip = document.createElement('div');
  universalTooltip.id = 'universal-tooltip';
  document.body.appendChild(universalTooltip);


  // Sélectionne TOUS les boutons de thème et l'élément body
  const themeSwitchers = document.querySelectorAll("#theme-switcher, #theme-switcher-mobile, #theme-switcher-mobile-nav");
  const body = document.body;

  const applyTheme = (theme) => {
    body.classList.remove("light-mode", "dark-mode");
    body.classList.add(`${theme}-mode`);
    localStorage.setItem("theme", theme);
    themeSwitchers.forEach(switcher => {
      const icon = switcher.querySelector("i");
      if (theme === "light") {
        icon.classList.replace("fa-sun", "fa-moon");
      } else {
        icon.classList.replace("fa-moon", "fa-sun");
      }
    });
  };

  const savedTheme = localStorage.getItem("theme") || "dark";
  applyTheme(savedTheme);

  themeSwitchers.forEach(switcher => {
    switcher.addEventListener("click", () => {
      const currentTheme = localStorage.getItem("theme");
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      applyTheme(newTheme);
    });
  });

  const translations = {};
  let currentLang = localStorage.getItem("language") || "fr";

  const langFrBtn = document.getElementById("lang-fr");
  const langEnBtn = document.getElementById("lang-en");
  const mobileLangFrBtn = document.getElementById("lang-fr-topnav");
  const mobileLangEnBtn = document.getElementById("lang-en-topnav");

  async function fetchTranslations(lang) {
    try {
      // ✅ MODIFICATION : Ajout du "cache busting" pour les fichiers de traduction
      const response = await fetch(`${lang}.json?v=${new Date().getTime()}`);
      if (!response.ok) throw new Error(`Failed to load ${lang}.json`);
      translations[lang] = await response.json();
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

    const cvLinks = document.querySelectorAll('.cv-link');
    if (cvLinks.length > 0) {
      const cvFileNameFR = 'CV-Arnaud-Martiny-FR.pdf';
      const cvFileNameEN = 'CV-Arnaud-Martiny-EN.pdf';
      const filePath = lang === 'fr'
        ? `assets/CV/${cvFileNameFR}`
        : `assets/CV/${cvFileNameEN}`;
      cvLinks.forEach(link => link.setAttribute('href', filePath));
    }

    const jsonContentEl = document.getElementById("language-json-content");
    if (jsonContentEl && langData.skillsSection && langData.skillsSection.languages) {
      jsonContentEl.innerHTML = "";
      jsonContentEl.dataset.languages = JSON.stringify(langData.skillsSection.languages);
      const codeBlockTitle = document.getElementById("code-block-title");
      if (codeBlockTitle) {
        codeBlockTitle.textContent = "language.json";
      }
    }

    const wavesContainer = document.querySelector(".waves-container");
    if (wavesContainer && langData.skillsSection && langData.skillsSection.languages) {
      wavesContainer.innerHTML = "";
      langData.skillsSection.languages.forEach((lang) => {
        const waveItem = document.createElement("div");
        waveItem.className = "wave-item";
        const isNative = lang.activeDots === 5;
        const amplitude = isNative ? 20 : 15;
        const frequency = isNative ? 0.02 : 0.03;
        const speed = isNative ? 0.03 : 0.05;
        waveItem.innerHTML = `<div class="wave-info"><span class="language-name">${lang.name}</span><span class="language-level">${lang.levelText}</span></div><canvas class="wave-canvas" data-amplitude="${amplitude}" data-frequency="${frequency}" data-speed="${speed}"></canvas>`;
        wavesContainer.appendChild(waveItem);
      });
    }

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

    const sceneContainer = document.getElementById("skills-scene-container");
    const solarSystem = document.getElementById("skills-solar-system");
    const infobox = document.getElementById("skills-infobox");
    const canvas = document.getElementById("starfield-canvas");
    if (sceneContainer && solarSystem && infobox && canvas && langData.skillsSection && langData.skillsSection.planets) {
      solarSystem.innerHTML = `<div id="skill-sun"><div class="sun-flare"></div><div class="sun-core">AM.</div></div>`;
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

    const timelineContainer = document.getElementById("timeline-content");
    if (timelineContainer && langData.experienceSection && langData.experienceSection.items) {
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
        timelineItemDiv.innerHTML = `<div class="timeline-dot"></div><div class="timeline-content" data-i18n-html>${titleHtml}<span class="timeline-date">${item.date}</span>${descriptionHtml}</div>`;
        timelineContainer.appendChild(timelineItemDiv);
      });
    }

    const projectsContainer = document.getElementById("featured-projects-container");
    if (projectsContainer && langData.featuredProjects && langData.featuredProjects.items) {
      projectsContainer.innerHTML = "";
      langData.featuredProjects.items.forEach((project) => {
        const projectCard = document.createElement("div");
        projectCard.className = "project-card reveal";
        let techHtml = "";
        project.tech.forEach((tech) => {
          techHtml += `<div class="project-tech-item">${tech}</div>`;
        });
        const caseStudyButtonText = getNestedTranslation(langData, "featuredProjects.caseStudyButton") || "View Case Study";
        let liveLinkTooltip = '';
        if (project.id === 'theatre-des-poetes') {
          liveLinkTooltip = 'data-tooltip-key="featuredProjects.poetesTooltip"';
        }
        let codeLinkTooltip = '';
        if (project.id === 'nowa-logistics') {
          codeLinkTooltip = 'data-tooltip-key="featuredProjects.noCodeTooltip"';
        } else if (project.id === 'theatre-des-poetes') {
          codeLinkTooltip = 'data-tooltip-key="featuredProjects.poetesCodeTooltip"';
        }
        const disabledState = 'style="opacity: 0.5; cursor: not-allowed;" onclick="event.preventDefault();"';
        projectCard.innerHTML = `<div class="project-image"><a href="${project.liveLink}" target="_blank" ${project.liveLink === "#" ? disabledState : ''}><img src="${project.imageSrc}" alt="${project.imageAlt}" loading="lazy"></a></div><div class="project-content"><p class="project-category">${project.category}</p><h3 class="project-title">${project.title}</h3><p class="project-description">${project.description}</p><div class="project-tech-list">${techHtml}</div><div class="project-links"><a href="${project.liveLink}" class="btn" target="_blank" ${liveLinkTooltip} ${project.liveLink === "#" ? disabledState : ''}>Voir le site</a><a href="${project.codeLink}" class="btn btn-outline" target="_blank" ${codeLinkTooltip} ${project.codeLink === "#" ? disabledState : ''}>Voir le code</a><button class="btn btn-case-study" data-project-id="${project.id}" data-tooltip-key="featuredProjects.caseStudyTooltip"><span>${caseStudyButtonText}</span></button></div></div>`;
        projectsContainer.appendChild(projectCard);
      });
    }

    function moveTooltip(e) {
      if (universalTooltip.style.display === 'block') {
        universalTooltip.style.left = `${e.clientX + 20}px`;
        universalTooltip.style.top = `${e.clientY - 30}px`;
      }
    }
    const tooltipButtons = document.querySelectorAll('[data-tooltip-key]');
    tooltipButtons.forEach(button => {
      button.addEventListener('mouseenter', (e) => {
        const tooltipKey = button.getAttribute('data-tooltip-key');
        const tooltipText = getNestedTranslation(langData, tooltipKey);
        if (tooltipText) {
          universalTooltip.textContent = tooltipText;
          universalTooltip.style.display = 'block';
          moveTooltip(e);
        }
      });
      button.addEventListener('mouseleave', () => {
        universalTooltip.style.display = 'none';
      });
      button.addEventListener('mousemove', moveTooltip);
    });

    initializeRetroAnimation(langData);
    initializeTestimonialsTerminal(langData);
    initializeSlotMachine(langData);
    initializeExperienceGrid(langData);
    initializeTerminal(langData);
    initializeSkillsSandbox(langData);

    const evolutionPopupMessage = document.querySelector('#evolution-popup p[data-i18n="evolutionPopup.message"]');
    const evolutionPopupEl = document.getElementById('evolution-popup');
    if (evolutionPopupMessage && evolutionPopupEl && evolutionPopupEl.dataset.lastUpdated) {
      const lastUpdatedDate = evolutionPopupEl.dataset.lastUpdated;
      const messageTemplate = getNestedTranslation(langData, "evolutionPopup.message") || "Last update on {{date}}.";
      evolutionPopupMessage.innerHTML = messageTemplate.replace('{{date}}', `<b>${lastUpdatedDate}</b>`);
    }

    // ✅ NOUVEAU BLOC À AJOUTER À LA FIN DE applyTranslations
    // Génération des listes pour la modale de confidentialité
    function generateList(listId, pointsKey) {
      const listElement = document.getElementById(listId);
      const listPoints = getNestedTranslation(langData, pointsKey);
      if (listElement && Array.isArray(listPoints)) {
        listElement.innerHTML = ''; // On vide la liste
        listPoints.forEach(point => {
          const li = document.createElement('li');
          li.textContent = point;
          listElement.appendChild(li);
        });
      }
    }
    generateList('privacy-contact-points', 'privacyModal.contactFormPoints');
    generateList('privacy-ai-points', 'privacyModal.aiAssistantPoints');

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
    const isFr = currentLang === "fr";
    if (langFrBtn) langFrBtn.classList.toggle("active", isFr);
    if (langEnBtn) langEnBtn.classList.toggle("active", !isFr);
    if (mobileLangFrBtn) mobileLangFrBtn.classList.toggle("active", isFr);
    if (mobileLangEnBtn) mobileLangEnBtn.classList.toggle("active", !isFr);
  }

  if (langFrBtn) langFrBtn.addEventListener("click", () => setLanguage("fr"));
  if (langEnBtn) langEnBtn.addEventListener("click", () => setLanguage("en"));
  if (mobileLangFrBtn) mobileLangFrBtn.addEventListener("click", () => setLanguage("fr"));
  if (mobileLangEnBtn) mobileLangEnBtn.addEventListener("click", () => setLanguage("en"));

  (async () => {
    await Promise.all([fetchTranslations("fr"), fetchTranslations("en")]);
    let langToApply = localStorage.getItem("language") || "fr";
    if (!translations[langToApply]) {
      langToApply = langToApply === "fr" && translations["en"] ? "en" : "fr";
    }
    await setLanguage(langToApply, true);
    reveal();
  })();

  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const formData = new FormData(contactForm);
      const submitButton = contactForm.querySelector('button[type="submit"]');
      const sendingText = getNestedTranslation(translations[currentLang], "contactSection.form.sending") || "Envoi...";
      const originalButtonText = getNestedTranslation(translations[currentLang], "contactSection.form.submitButton") || "Envoyer";
      submitButton.disabled = true;
      submitButton.textContent = sendingText;
      fetch('traitement-formulaire.php', {
        method: 'POST',
        body: formData
      })
        .then(response => response.json())
        .then(data => {
          const messageKey = data.messageKey;
          const status = data.status;
          const translatedMessage = getNestedTranslation(translations[currentLang], messageKey) || "Un problème est survenu.";
          showPopupNotification(translatedMessage, status);
          if (status === 'success') {
            contactForm.reset();
          }
        })
        .catch(error => {
          console.error('Erreur:', error);
          const fallbackMessage = getNestedTranslation(translations[currentLang], 'contactSection.form.results.error_unknown') || "Oups ! Une erreur réseau est survenue.";
          showPopupNotification(fallbackMessage, 'error');
        })
        .finally(() => {
          submitButton.disabled = false;
          submitButton.textContent = originalButtonText;
        });
    });
  }

  const cursor = document.querySelector(".cursor");
  const cursorFollower = document.querySelector(".cursor-follower");
  if (cursor && cursorFollower) {
    document.addEventListener("mousemove", (e) => {
      gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1 });
      gsap.to(cursorFollower, { x: e.clientX, y: e.clientY, duration: 0.3 });
    });
    const interactableElements = "a, button, input, textarea, .skill-card, #slot-lever";
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

  let skillsAnimated = false;
  let countersAnimated = false;
  const skillsSection = document.querySelector(".skills-section");
  const counterSection = document.querySelector(".counter-section");

  async function animateJsonTypingAdvanced() {
    const codeEl = document.getElementById("language-json-content");
    if (!codeEl || !codeEl.dataset.languages) return;
    const languages = JSON.parse(codeEl.dataset.languages);
    const lang1 = languages[0];
    const lang2 = languages[1];
    const baseTypingSpeed = 25;
    const pauseDuration = 400;
    const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    let currentContent = "";
    const render = () => {
      codeEl.innerHTML = currentContent.replace(/\n/g, '<br>') + '<span class="typing-caret"></span>';
    };
    const removeCaret = () => {
      codeEl.innerHTML = currentContent.replace(/\n/g, '<br>');
    };
    async function type(text) {
      for (const char of text) {
        currentContent += char;
        render();
        await pause(baseTypingSpeed + (Math.random() - 0.5) * 20);
      }
    }
    function addHtml(html) {
      currentContent += html;
      render();
    }
    async function backspace(count) {
      for (let i = 0; i < count; i++) {
        currentContent = currentContent.slice(0, -1);
        render();
        await pause(25);
      }
    }
    const punc = (char) => `<span class="json-punctuation">${char}</span>`;
    const key = (text) => `<span class="json-key">"${text}"</span>`;
    const str = (text) => `<span class="json-string">"${text}"</span>`;
    const comment = (text) => `<span class="json-comment">${text}</span>`;
    const nl = (indent = 1) => "\n" + "  ".repeat(indent);
    codeEl.innerHTML = "";
    addHtml(punc('{') + nl());
    await type("  ");
    addHtml(key('languages') + punc(':') + ' ' + punc('[') + nl(2));
    await type("    ");
    addHtml(punc('{') + nl(3));
    await type("      ");
    addHtml(key('name') + punc(':') + ' ' + str(lang1.name) + punc(',') + nl(3));
    await type("      ");
    addHtml(key('level') + punc(':') + ' ');
    addHtml('<span class="json-string">"');
    await type(lang1.levelMistake);
    await pause(pauseDuration);
    await backspace(lang1.levelMistake.length);
    await type(lang1.levelText);
    addHtml('"</span>' + punc(',') + nl(3));
    await type("      ");
    addHtml(key('comment') + punc(':') + ' ' + comment(`"${lang1.jsonComment}"`) + nl(2));
    await type("    ");
    addHtml(punc('}') + punc(','));
    addHtml(nl(2));
    await type("    ");
    addHtml(punc('{') + nl(3));
    await type("      ");
    addHtml(key('name') + punc(':') + ' ' + str(lang2.name) + punc(',') + nl(3));
    await type("      ");
    addHtml(key('level') + punc(':') + ' ');
    addHtml('<span class="json-string">"');
    await type(lang2.levelMistake);
    await pause(pauseDuration);
    await backspace(lang2.levelMistake.length);
    await type(lang2.levelText);
    addHtml('"</span>' + punc(',') + nl(3));
    await type("      ");
    addHtml(key('comment') + punc(':') + ' ' + comment(`"${lang2.jsonComment}"`) + nl(2));
    await type("    ");
    addHtml(punc('}'));
    addHtml(nl(1));
    await type("  ");
    addHtml(punc(']'));
    addHtml(nl(0) + punc('}'));
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

  document.querySelectorAll('a[href^="#"]:not(.cv-link)').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      try {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
      } catch (error) {
        console.error("Smooth scroll target not found:", targetId, error);
      }
    });
  });

  const hamburgerBtn = document.getElementById("hamburger-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const bodyEl = document.body;
  if (hamburgerBtn && mobileMenu) {
    const mobileMenuLinks = mobileMenu.querySelectorAll("a");
    const mobileMenuCloseBtn = document.getElementById('mobile-menu-close-btn');
    hamburgerBtn.addEventListener("click", () => {
      bodyEl.classList.add("mobile-menu-open");
    });
    if (mobileMenuCloseBtn) {
      mobileMenuCloseBtn.addEventListener('click', () => {
        bodyEl.classList.remove('mobile-menu-open');
      });
    }
    mobileMenuLinks.forEach((link) => {
      link.addEventListener("click", () => {
        bodyEl.classList.remove("mobile-menu-open");
      });
    });
  }

  const evolutionPopupOverlay = document.getElementById("evolution-popup-overlay");
  const evolutionPopup = document.getElementById("evolution-popup");
  const evolutionPopupCloseBtn = document.getElementById("evolution-popup-close");
  if (evolutionPopupOverlay && evolutionPopup && evolutionPopupCloseBtn) {
    const closeEvolutionPopup = () => {
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
    evolutionPopupCloseBtn.addEventListener('click', closeEvolutionPopup);
    evolutionPopupOverlay.addEventListener('click', (e) => {
      if (e.target === evolutionPopupOverlay) {
        closeEvolutionPopup();
      }
    });
    evolutionPopup.addEventListener('click', (e) => e.stopPropagation());
  }

  const projectsUpdatePopupOverlay = document.getElementById("projects-update-popup-overlay");
  if (projectsUpdatePopupOverlay) {
    const projectsUpdatePopupCloseBtn = document.getElementById("projects-update-popup-close");
    const projectsSectionTrigger = document.getElementById("portfolio");
    const closeProjectsPopup = () => {
      projectsUpdatePopupOverlay.classList.remove('visible');
      sessionStorage.setItem('projectsUpdatePopupClosed', 'true');
    };
    if (projectsUpdatePopupCloseBtn) {
      projectsUpdatePopupCloseBtn.addEventListener('click', closeProjectsPopup);
    }
    projectsUpdatePopupOverlay.addEventListener('click', (e) => {
      if (e.target === projectsUpdatePopupOverlay) {
        closeProjectsPopup();
      }
    });
    document.getElementById('projects-update-popup').addEventListener('click', e => e.stopPropagation());
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: [0.1, 0.9]
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const isClosedManually = sessionStorage.getItem('projectsUpdatePopupClosed');
        if (entry.isIntersecting && !isClosedManually) {
          projectsUpdatePopupOverlay.classList.add('visible');
        } else {
          projectsUpdatePopupOverlay.classList.remove('visible');
        }
      });
    }, observerOptions);
    if (projectsSectionTrigger) {
      observer.observe(projectsSectionTrigger);
    }
  }

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
      if (!langData || !langData.featuredProjects || !langData.featuredProjects.items) return;
      const projectData = langData.featuredProjects.items.find(p => p.id === projectId);
      if (!projectData || !projectData.caseStudy) {
        console.error("No case study data for project:", projectId);
        return;
      }
      const caseStudyData = projectData.caseStudy;
      let techHtml = (projectData.tech || []).join(' | ');
      const technologiesTitle = getNestedTranslation(langData, "caseStudyPopup.technologiesTitle") || "Technologies";
      caseStudyWindowTitle.textContent = caseStudyData.title || "Case Study";
      caseStudyContentEl.innerHTML = `<h4>${caseStudyData.briefTitle || "Brief"}</h4><p>${caseStudyData.brief || ""}</p><h4>${caseStudyData.roleTitle || "My Role"}</h4><p>${caseStudyData.role || ""}</p><h4>${technologiesTitle}</h4><p>${techHtml}</p><h4>${caseStudyData.resultsTitle || "Results"}</h4><p>${caseStudyData.results || ""}</p>`;
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

  gsap.registerPlugin(ScrollTrigger, TextPlugin);
  let retroTimeline;
  function initializeRetroAnimation(langData) {
    if (retroTimeline) {
      retroTimeline.kill();
    }
    const retroSection = document.getElementById('retro-methodology');
    if (!retroSection || !langData.retroMethodologySection) {
      return;
    }
    const searchWindow = document.getElementById('google-search-window');
    const resultsWindow = document.getElementById('search-results-window');
    const downloadWindow = document.getElementById('download-box-window');
    const finalWindow = document.getElementById('final-report-window');
    gsap.set([searchWindow, resultsWindow, downloadWindow, finalWindow], { display: 'none', opacity: 0 });
    gsap.set('#typing-caret', { display: 'inline' });
    gsap.set('#retro-search-input', { text: "" });
    retroTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: retroSection,
        start: "top top",
        end: "+=6000",
        pin: true,
        scrub: 1.5,
      }
    });
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
        resultsContainer.innerHTML = resultsData.map(r => `<div class="search-result"><a href="#">${r.title}</a><p>${r.description}</p><span>${r.url}</span></div>`).join('');
      })
      .to(resultsWindow, { display: 'block', opacity: 1, duration: 0.5 });
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

  function initializeExperienceGrid(langData) {
    const container = document.getElementById('experience-grid-container');
    const detailsDisplayDesktop = document.getElementById('experience-details-display');
    if (!container || !detailsDisplayDesktop || !langData.professionalExperiences?.items) {
      console.error("Éléments manquants pour la grille des collaborations.");
      return;
    }
    const experiences = langData.professionalExperiences.items;
    container.innerHTML = '';
    if (window.matchMedia("(max-width: 992px)").matches) {
      detailsDisplayDesktop.style.display = 'none';
      experiences.forEach(exp => {
        const itemWrapper = document.createElement('div');
        itemWrapper.className = 'experience-item-mobile';
        itemWrapper.innerHTML = `<div class="experience-card" id="${exp.id}"><img src="${exp.logoSrc}" alt="Logo ${exp.companyName}" class="experience-card-logo" loading="lazy"></div><div class="experience-details-mobile"><h4>${exp.companyName}</h4><span class="role">${exp.role}</span><p class="description">${exp.description}</p></div>`;
        container.appendChild(itemWrapper);
      });
    } else {
      detailsDisplayDesktop.style.display = 'block';
      const companyNameEl = document.getElementById('details-company-name');
      const roleEl = document.getElementById('details-role');
      const descriptionEl = document.getElementById('details-description');
      detailsDisplayDesktop.classList.add('hidden');
      experiences.forEach(exp => {
        const card = document.createElement('div');
        card.className = 'experience-card';
        card.id = exp.id;
        card.innerHTML = `<img src="${exp.logoSrc}" alt="Logo ${exp.companyName}" class="experience-card-logo" loading="lazy">`;
        container.appendChild(card);
        card.addEventListener('mouseenter', () => {
          companyNameEl.textContent = exp.companyName;
          roleEl.textContent = exp.role;
          descriptionEl.textContent = exp.description;
          detailsDisplayDesktop.classList.remove('hidden');
          document.querySelectorAll('.experience-card.active').forEach(c => c.classList.remove('active'));
          card.classList.add('active');
        });
      });
      container.addEventListener('mouseleave', () => {
        detailsDisplayDesktop.classList.add('hidden');
        document.querySelectorAll('.experience-card.active').forEach(c => c.classList.remove('active'));
      });
    }
  }

  function initializeSlotMachine(langData) {
    const lever = document.getElementById('slot-lever');
    const reels = [document.getElementById('reel1'), document.getElementById('reel2'), document.getElementById('reel3')];
    const payoutDisplay = document.getElementById('slot-payout-display');
    if (!lever || reels.some(r => !r) || !payoutDisplay || !langData.softSkillsSlot) {
      return;
    }
    const skills = langData.softSkillsSlot.skills;
    let isSpinning = false;
    reels.forEach(reel => {
      reel.innerHTML = '';
      const symbolContainer = document.createElement('div');
      symbolContainer.className = 'reel-symbols';
      const repeatedSkills = [...skills, ...skills, ...skills];
      repeatedSkills.forEach(skill => {
        symbolContainer.innerHTML += `<div class="reel-symbol"><i class="fas ${skill.icon}"></i></div>`;
      });
      reel.appendChild(symbolContainer);
    });
    const spin = () => {
      if (isSpinning) return;
      isSpinning = true;
      lever.classList.add('pulled');
      payoutDisplay.innerHTML = `<p>...</p>`;
      const results = [];
      reels.forEach((reel, index) => {
        const symbolContainer = reel.querySelector('.reel-symbols');
        const symbolHeight = 100;
        const randomIndex = Math.floor(Math.random() * skills.length);
        results.push(skills[randomIndex]);
        const targetPosition = -(randomIndex + skills.length) * symbolHeight;
        symbolContainer.style.transition = 'none';
        symbolContainer.style.transform = `translateY(0)`;
        symbolContainer.offsetHeight;
        symbolContainer.style.transition = `transform ${2.5 + index * 0.5}s cubic-bezier(0.25, 0.1, 0.25, 1)`;
        symbolContainer.style.transform = `translateY(${targetPosition}px)`;
      });
      setTimeout(() => {
        lever.classList.remove('pulled');
        let payoutText = langData.softSkillsSlot.payoutText;
        payoutText = payoutText.replace('{0}', results[0].name)
          .replace('{1}', results[1].name)
          .replace('{2}', results[2].name);
        payoutDisplay.innerHTML = `<p>${payoutText}</p>`;
        isSpinning = false;
      }, 3500);
    };
    lever.addEventListener('click', spin);
  }

  const wtfButton = document.getElementById('wtf-btn');
  if (wtfButton) {
    const getRandomHorribleColor = () => {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    };
    const unleashVisualCarnage = () => {
      document.body.style.fontFamily = 'Comic Sans MS, cursive, sans-serif';
      const elementsToRuin = document.querySelectorAll('body, header, section, .btn, h1, h2, h3, p, .logo, .skill-tag, .project-card, .timeline-content, footer, .about-image-placeholder, .nav-container');
      elementsToRuin.forEach(el => {
        el.style.backgroundColor = getRandomHorribleColor();
        el.style.color = getRandomHorribleColor();
        el.style.borderColor = getRandomHorribleColor();
      });
      const helpText = getNestedTranslation(translations[currentLang], "nav.wtfButtonHelp") || "HELP ME!";
      wtfButton.textContent = helpText;
      wtfButton.style.backgroundColor = 'white';
      wtfButton.style.color = 'black';
      wtfButton.onclick = () => {
        location.reload();
      };
    };
    wtfButton.onclick = unleashVisualCarnage;
  }

  function initializeTestimonialsTerminal(langData) {
    const terminal = document.getElementById('testimonial-terminal');
    const sourcesList = document.getElementById('testimonial-sources-list');
    const display = document.getElementById('testimonial-display');
    if (!terminal || !sourcesList || !display || !langData.decryptionTestimonials) {
      return;
    }
    const testimonials = langData.decryptionTestimonials.items;
    const placeholderHint = sourcesList.querySelector('.placeholder-prompt');
    const placeholderDisplay = display.querySelector('.placeholder');
    sourcesList.innerHTML = '';
    if (placeholderHint) {
      sourcesList.appendChild(placeholderHint);
      placeholderHint.style.display = 'block';
    }
    display.innerHTML = '';
    if (placeholderDisplay) {
      display.appendChild(placeholderDisplay);
      placeholderDisplay.style.display = 'block';
    }
    testimonials.forEach((item, index) => {
      const menuItem = document.createElement('button');
      menuItem.className = 'testimonial-source-item';
      menuItem.innerHTML = `<strong>${item.name}</strong><span>${item.project}</span>`;
      menuItem.dataset.index = index;
      sourcesList.appendChild(menuItem);
    });
    let isTyping = false;
    let activeMenuItem = null;
    sourcesList.addEventListener('click', (e) => {
      const clickedItem = e.target.closest('.testimonial-source-item');
      if (!clickedItem || isTyping) return;
      if (placeholderHint) placeholderHint.style.display = 'none';
      isTyping = true;
      if (activeMenuItem) {
        activeMenuItem.classList.remove('active');
      }
      activeMenuItem = clickedItem;
      activeMenuItem.classList.add('active');
      const index = clickedItem.dataset.index;
      const testimonialData = testimonials[index];
      runTestimonialSequence(testimonialData, langData, display)
        .finally(() => {
          isTyping = false;
        });
    });
  }

  async function runTestimonialSequence(testimonial, langData, display) {
    const pause = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    const caret = `<span id="testimonial-caret"></span>`;
    async function type(element, text, speed = 25) {
      const existingCaret = element.querySelector('#testimonial-caret');
      if (existingCaret) existingCaret.remove();
      let currentText = element.innerHTML;
      for (const char of text) {
        currentText += char;
        element.innerHTML = currentText + caret;
        await pause(speed + (Math.random() - 0.5) * 15);
      }
      element.innerHTML = currentText;
    }
    const headerText = langData.decryptionTestimonials.transmission_header || "TRANSMISSION...";
    display.innerHTML = `<h4 id="testimonial-transmission-header">${headerText}${caret}</h4>`;
    await pause(800);
    display.innerHTML = `<div id="testimonial-meta"><p id="meta-from">FROM: </p><p id="meta-project">PROJECT: </p><p id="meta-date">DATE: </p></div><p id="testimonial-quote"></p>`;
    const fromEl = document.getElementById('meta-from');
    const projectEl = document.getElementById('meta-project');
    const dateEl = document.getElementById('meta-date');
    const quoteEl = document.getElementById('testimonial-quote');
    await type(fromEl, testimonial.name);
    await type(projectEl, testimonial.project);
    await type(dateEl, testimonial.date);
    quoteEl.innerHTML = `> ${caret}`;
    await type(quoteEl, testimonial.quote);
    const finalCaret = display.querySelector('#testimonial-caret');
    if (finalCaret) finalCaret.remove();
  }

  function initializeTerminal(langData) {
    const terminalSection = document.getElementById('terminal-section');
    const terminalBody = document.getElementById('terminal-body');
    const terminalOutput = document.getElementById('terminal-output');
    const terminalInput = document.getElementById('terminal-input');
    const terminalForm = document.getElementById('terminal-form');
    const suggestionsContainer = document.getElementById('terminal-suggestions');
    const terminalWindow = document.querySelector('.terminal-window');

    if (!terminalSection || !terminalBody || !terminalOutput || !terminalInput || !terminalForm || !langData.terminal) {
      return;
    }

    // --- MODIFICATION --- : On réinitialise le log à chaque chargement du terminal.
    conversationLog = [];

    if (terminalWindow) {
      terminalWindow.addEventListener('mouseenter', () => document.body.classList.add('terminal-hover'));
      terminalWindow.addEventListener('mouseleave', () => document.body.classList.remove('terminal-hover'));
    }

    terminalOutput.innerHTML = '';

    if (suggestionsContainer && langData.terminal.suggestions) {
      suggestionsContainer.innerHTML = '';
      const label = document.createElement('span');
      label.textContent = getNestedTranslation(langData, "terminal.suggestionsLabel") || 'Suggestions :';
      suggestionsContainer.appendChild(label);

      langData.terminal.suggestions.forEach(suggestion => {
        const button = document.createElement('button');
        button.textContent = suggestion.display;
        button.dataset.command = suggestion.command;
        suggestionsContainer.appendChild(button);
      });

      suggestionsContainer.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON' && !isWaitingForAi) {
          terminalInput.value = e.target.dataset.command;
          terminalForm.dispatchEvent(new Event('submit', { cancelable: true }));
        }
      });
    }

    const conversationId = 'user-' + Date.now();
    let commandHistory = [], historyIndex = -1, isWaitingForAi = false, hasAiStarted = false;

    const promptText = getNestedTranslation(langData, "terminal.prompt") || "user@arnaud-martiny.be:~$";
    document.querySelector('.terminal-prompt').textContent = promptText;

    // GESTIONNAIRE DE CLICS FUSIONNÉ ET CORRIGÉ
    if (terminalBody) {
      terminalBody.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (link) {
          if (link.getAttribute('href') === '#privacy-modal') {
            e.preventDefault();
            if (typeof openPrivacyModal === 'function') {
              openPrivacyModal();
            }
          }
        } else {
          if (terminalInput) terminalInput.focus();
        }
      });
    }

    // ========== MODIFICATION 3 ==========
    const startAiConversation = () => {
      if (hasAiStarted) return;
      hasAiStarted = true;
      // On envoie un premier message ("Bonjour" ou sa traduction) pour que l'IA se présente.
      sendToGoogleAI(getNestedTranslation(langData, "terminal.initialGreeting") || "Bonjour");
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        startAiConversation();
        observer.disconnect();
      }
    }, { threshold: 0.5 });
    observer.observe(terminalSection);

    terminalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (isWaitingForAi) return;

      const command = terminalInput.value.trim();
      if (command) {
        processUserInput(command);
        commandHistory.push(command);
        historyIndex = commandHistory.length;
      }
      terminalInput.value = '';
    });

    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowUp' && commandHistory.length > 0) {
        e.preventDefault();
        historyIndex = Math.max(0, historyIndex - 1);
        terminalInput.value = commandHistory[historyIndex];
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        historyIndex = Math.min(commandHistory.length, historyIndex + 1);
        terminalInput.value = (historyIndex === commandHistory.length) ? '' : commandHistory[historyIndex];
      }
    });

    function showAiTyping(show) {
      let typingIndicator = terminalOutput.querySelector('.ai-typing');
      if (show && !typingIndicator) {
        typingIndicator = document.createElement('p');
        typingIndicator.className = 'ai-typing';
        typingIndicator.innerHTML = '<span>.</span><span>.</span><span>.</span>';
        terminalOutput.appendChild(typingIndicator);
        terminalBody.scrollTop = terminalBody.scrollHeight;
      } else if (!show && typingIndicator) {
        typingIndicator.remove();
      }
    }

    async function typeAiResponse(message) {
      const typingSpeed = 15;
      const responseElement = document.createElement('div');
      responseElement.className = 'ai-response';
      terminalOutput.appendChild(responseElement);

      const pause = (ms) => new Promise(resolve => setTimeout(resolve, ms));

      for (let i = 0; i < message.length; i++) {
        if (message[i] === '<') {
          const tagEnd = message.indexOf('>', i);
          if (tagEnd !== -1) {
            responseElement.innerHTML += message.substring(i, tagEnd + 1);
            i = tagEnd;
            continue;
          }
        }
        responseElement.innerHTML += message[i];
        terminalBody.scrollTop = terminalBody.scrollHeight;
        await pause(typingSpeed);
      }
    }

    function formatMessage(message) {
      let formattedMessage = message.replace(/\\n|\n/g, '<br>');
      formattedMessage = formattedMessage.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      formattedMessage = formattedMessage.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
      formattedMessage = formattedMessage.replace(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi, '<a href="mailto:$1">$1</a>');
      return formattedMessage;
    }

    // ========== MODIFICATION 1 ==========
    async function sendToGoogleAI(userInput) {
      isWaitingForAi = true;
      terminalInput.disabled = true;
      showAiTyping(true);

      // On ajoute la nouvelle question de l'utilisateur à l'historique
      // On s'assure de ne pas envoyer la réponse précédente de l'IA deux fois.
      const lastMessage = conversationLog[conversationLog.length - 1];
      if (!lastMessage || lastMessage.author !== 'User' || lastMessage.message !== userInput) {
          conversationLog.push({ author: 'User', message: userInput });
      }

      try {
        // On appelle notre NOUVEAU script PHP : proxy-google-ai.php
        const response = await fetch('proxy-cloudflare-ai.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            history: conversationLog, // On envoie tout l'historique de la conversation
            locale: currentLang
          })
        });

        if (!response.ok) {
           const errorData = await response.json();
           const errorMessage = errorData.error || `Erreur du serveur: ${response.statusText}`;
           throw new Error(errorMessage);
        }

        const data = await response.json();
        showAiTyping(false);

        if (data.response) {
            const formattedMessage = formatMessage(data.response);
            await typeAiResponse(formattedMessage);
            // On ajoute la réponse de l'IA à l'historique pour le prochain tour
            conversationLog.push({ author: 'AI', message: data.response });
        } else {
            throw new Error("La réponse de l'IA est vide.");
        }

      } catch (error) {
        console.error("Erreur de communication avec Google AI:", error);
        showAiTyping(false);
        await typeAiResponse("Oups... Il y a eu une erreur de connexion avec le modèle d'IA. Veuillez réessayer. Détail : " + error.message);
      } finally {
        const separator = document.createElement('p');
        separator.className = 'terminal-separator';
        separator.innerHTML = '---';
        terminalOutput.appendChild(separator);
        isWaitingForAi = false;
        terminalInput.disabled = false;
        terminalInput.focus();
        terminalBody.scrollTop = terminalBody.scrollHeight;
      }
    }

    // ========== MODIFICATION 2 ==========
    function processUserInput(input) {
      const prompt = `<span class="terminal-prompt">${promptText}</span>`;
      const commandLine = `<p class="user-command">${prompt} ${input}</p>`;
      terminalOutput.innerHTML += commandLine;
      terminalBody.scrollTop = terminalBody.scrollHeight;

      if (input.toLowerCase() === 'clear') {
        terminalOutput.innerHTML = ''; // Vide l'affichage
        conversationLog = []; // Vide la mémoire de la conversation
        // On relance une nouvelle conversation pour que l'IA se présente à nouveau
        startAiConversation();
      } else {
        // On appelle notre NOUVELLE fonction
        sendToGoogleAI(input);
      }
    }
  }


  // ✅ AJOUTEZ CE BLOC COMPLET POUR LA GESTION DE LA MODALE
  const privacyModal = document.getElementById('privacy-modal');
  const openModalBtn = document.getElementById('open-privacy-modal-btn');
  const closeModalBtn = document.getElementById('close-privacy-modal-btn');

  const openPrivacyModal = () => {
    if (privacyModal) {
      privacyModal.classList.add('visible');
      document.body.style.overflow = 'hidden';
    }
  };
  // On rend la fonction accessible globalement pour que le terminal puisse l'appeler
  window.openPrivacyModal = openPrivacyModal;

  const closePrivacyModal = () => {
    if (privacyModal) {
      privacyModal.classList.remove('visible');
      document.body.style.overflow = '';
    }
  };

  if (openModalBtn) {
    openModalBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openPrivacyModal();
    });
  }
  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closePrivacyModal);
  }
  if (privacyModal) {
    privacyModal.addEventListener('click', (e) => {
      if (e.target === privacyModal) {
        closePrivacyModal();
      }
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && privacyModal && privacyModal.classList.contains('visible')) {
      closePrivacyModal();
    }
  });

  let matterInstance = null;
  function initializeSkillsSandbox(langData) {
    if (typeof Matter === 'undefined') {
      console.error("Matter.js is not loaded.");
      return;
    }

    const container = document.getElementById('sandbox-container');
    if (!container || !langData.skillsSandbox || !langData.skillsSandbox.skills) {
      return;
    }

    if (matterInstance) {
      Matter.Render.stop(matterInstance.render);
      Matter.World.clear(matterInstance.engine.world);
      Matter.Engine.clear(matterInstance.engine);
      container.innerHTML = '';
    }

    const skills = langData.skillsSandbox.skills;

    const { Engine, Render, Runner, World, Bodies, Mouse, MouseConstraint } = Matter;

    const engine = Engine.create({ gravity: { y: 0.4 } });
    const render = Render.create({
      element: container,
      engine: engine,
      options: {
        width: container.clientWidth,
        height: container.clientHeight,
        wireframes: false,
        background: 'transparent'
      }
    });

    matterInstance = { engine, render };

    const ground = Bodies.rectangle(container.clientWidth / 2, container.clientHeight + 25, container.clientWidth, 50, { isStatic: true, render: { visible: false } });
    const wallLeft = Bodies.rectangle(-25, container.clientHeight / 2, 50, container.clientHeight, { isStatic: true, render: { visible: false } });
    const wallRight = Bodies.rectangle(container.clientWidth + 25, container.clientHeight / 2, 50, container.clientHeight, { isStatic: true, render: { visible: false } });
    const roof = Bodies.rectangle(container.clientWidth / 2, -25, container.clientWidth, 50, { isStatic: true, render: { visible: false } });

    World.add(engine.world, [ground, wallLeft, wallRight, roof]);

    const skillBodies = skills.map(skill => {
      const width = 180;
      const height = 60;
      const body = Bodies.rectangle(
        Math.random() * (container.clientWidth - width) + width / 2,
        Math.random() * (container.clientHeight / 2),
        width, height,
        {
          restitution: 0.5,
          friction: 0.3,
          render: {
            fillStyle: 'transparent',
            strokeStyle: 'transparent'
          }
        }
      );
      body.skillData = skill;
      return body;
    });

    World.add(engine.world, skillBodies);

    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false
        }
      }
    });
    World.add(engine.world, mouseConstraint);

    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);

    const skillElements = {};
    skillBodies.forEach(body => {
      const el = document.createElement('div');
      el.className = 'sandbox-skill-item';
      el.innerHTML = `<i class="fas ${body.skillData.icon}"></i><span>${body.skillData.name}</span>`;
      container.appendChild(el);
      skillElements[body.id] = el;

      el.addEventListener('click', () => {
        showSandboxModal(body.skillData);
      });
    });

    function updateElements() {
      skillBodies.forEach(body => {
        const el = skillElements[body.id];
        el.style.transform = `translate(${body.position.x - el.offsetWidth / 2}px, ${body.position.y - el.offsetHeight / 2}px) rotate(${body.angle}rad)`;
      });
      requestAnimationFrame(updateElements);
    }
    updateElements();

    function showSandboxModal(skillData) {
      const modal = document.getElementById('sandbox-modal');
      document.getElementById('sandbox-modal-title').textContent = skillData.name;
      document.getElementById('sandbox-modal-description').textContent = skillData.description;
      modal.classList.add('visible');
    }

    const modal = document.getElementById('sandbox-modal');
    const closeModalBtn = document.getElementById('sandbox-modal-close');
    closeModalBtn.addEventListener('click', () => modal.classList.remove('visible'));
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('visible');
      }
    });
  }

  // --- AJOUT --- : Cet événement s'exécutera lorsque l'utilisateur quitte la page.
  window.addEventListener('unload', function () {
    // On vérifie s'il y a eu une conversation (au moins une question et une réponse).
    if (conversationLog.length > 1) {
      // On prépare les données à envoyer. C'est plus robuste d'utiliser un Blob.
      const dataToSend = new Blob([JSON.stringify(conversationLog)], { type: 'application/json' });

      // On envoie les données à un nouveau script PHP de manière asynchrone et fiable,
      // sans retarder la fermeture de la page.
      navigator.sendBeacon('send-conversation-summary.php', dataToSend);
    }
  });

}); // Fin de document.addEventListener("DOMContentLoaded")

function showPopupNotification(message, type) {
  const existingPopup = document.querySelector('.popup-notification');
  if (existingPopup) {
    existingPopup.remove();
  }

  const popup = document.createElement('div');
  popup.className = `popup-notification ${type}`;
  popup.textContent = message;

  document.body.appendChild(popup);

  setTimeout(() => {
    popup.classList.add('show');
  }, 10);

  setTimeout(() => {
    popup.classList.remove('show');
    popup.addEventListener('transitionend', () => {
      popup.remove();
    }, { once: true });
  }, 5000);
}