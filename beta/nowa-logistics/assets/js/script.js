document.addEventListener("DOMContentLoaded", () => {
  // Register GSAP plugins
  gsap.registerPlugin(ScrollTrigger);

  // Helper: Check for prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  // --- Common Animations / Initializations ---

  // Initial page load animation
  if (!prefersReducedMotion.matches) {
    gsap.from("body", {
      opacity: 0,
      duration: 0.8,
      delay: 0.2,
      ease: "power2.out",
    });
  }

  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const navLinks = document.querySelector(".nav-links");

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener("click", () => {
      const isExpanded =
        mobileMenuBtn.getAttribute("aria-expanded") === "true" || false;
      mobileMenuBtn.setAttribute("aria-expanded", !isExpanded);
      navLinks.classList.toggle("active");
      mobileMenuBtn.querySelector("i").classList.toggle("fa-bars");
      mobileMenuBtn.querySelector("i").classList.toggle("fa-times");
      if (!isExpanded) {
        mobileMenuBtn.setAttribute("aria-label", "Fermer le menu");
      } else {
        mobileMenuBtn.setAttribute("aria-label", "Ouvrir le menu");
      }
    });
  }

  // Set current year in footer
  const currentYearSpan = document.getElementById("currentYear");
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // Universal Fade-up animation for sections with .gsap-section-fade-up
  if (!prefersReducedMotion.matches) {
    gsap.utils.toArray(".gsap-section-fade-up").forEach((section) => {
      gsap.from(section.children, {
        opacity: 0,
        y: 50,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    });
  }

  // Footer Animations (applied to all pages with the footer)
  if (!prefersReducedMotion.matches) {
    const footerCols = gsap.utils.toArray(".footer-col-gsap");
    if (footerCols.length > 0) {
      gsap.from(footerCols, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "footer .footer-grid",
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });
    }
    const footerBottom = document.querySelector(".footer-bottom-gsap");
    if (footerBottom) {
      gsap.from(footerBottom, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        delay: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "footer .footer-grid",
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    }
  }

      // --- ANIMATIONS SPÉCIFIQUES À LA PAGE "À PROPOS" / SECTION ÉQUIPE ---
    const aboutTeamSection = document.querySelector('.about-team-section'); // Sélecteur de la section principale

    if (aboutTeamSection) { // S'exécute seulement si la section équipe existe
        console.log("About Us / Team page section detected - Applying team animations");

        // Animation du titre et du sous-titre de la section
        const teamSectionTitle = aboutTeamSection.querySelector('.section-title');
        const teamSectionSubtitle = aboutTeamSection.querySelector('.about-team-subtitle');

        if (!prefersReducedMotion.matches) {
            if (teamSectionTitle) {
                gsap.from(teamSectionTitle, {
                    opacity: 0,
                    y: 30,
                    duration: 0.8,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: teamSectionTitle,
                        start: "top 85%", // Déclenche quand le haut du titre est à 85% de la fenêtre
                        toggleActions: "play none none none"
                    }
                });
            }

            if (teamSectionSubtitle) {
                gsap.from(teamSectionSubtitle, {
                    opacity: 0,
                    y: 30,
                    duration: 0.8,
                    delay: 0.2, // Léger décalage par rapport au titre
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: teamSectionSubtitle,
                        start: "top 88%", // Un peu plus bas pour s'assurer que le titre a commencé
                        toggleActions: "play none none none"
                    }
                });
            }

            // Animation des cartes des membres de l'équipe
            const teamMemberCards = gsap.utils.toArray('.team-member-card');

            if (teamMemberCards.length > 0) {
                gsap.from(teamMemberCards, {
                    opacity: 0,
                    y: 50,
                    scale: 0.95, // Léger effet de zoom en entrée
                    duration: 0.7,
                    stagger: 0.15, // Délai entre l'apparition de chaque carte
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: '.team-grid', // Déclencheur sur la grille contenant les cartes
                        start: 'top 75%', // Déclenche quand le haut de la grille est à 75% de la fenêtre
                        toggleActions: 'play none none none',
                        // markers: true // Décommentez pour déboguer les positions de déclenchement
                    }
                });
            }
        }
    } // Fin des animations spécifiques à la section équipe

  // --- Index Page Specific Animations ---
  if (document.body.classList.contains("index-page")) {
    // Add a class to your body tag for index.html like <body class="index-page">
    const heroContentElements = document.querySelectorAll(
      ".hero-content > *:not(#typing-effect)"
    );
    const heroImage = document.querySelector(".hero-image");
    const typingEffectElement = document.getElementById("typing-effect");
    const heroFloatingShapes = document.querySelectorAll(
      ".hero .floating-shapes .shape"
    );

    let typingDone = false;
    if (typingEffectElement) {
      const originalTextWithHTML = typingEffectElement.innerHTML;
      typingEffectElement.innerHTML = "";

      let charIndex = 0;
      const typingSpeed = 30;
      const cursorElement = document.createElement("span");
      cursorElement.classList.add("typing-cursor");
      cursorElement.innerHTML = "|";

      function typeText() {
        if (charIndex < originalTextWithHTML.length) {
          let appendChar = originalTextWithHTML.charAt(charIndex);
          if (originalTextWithHTML.substring(charIndex).startsWith("<span")) {
            const closingTagIndex =
              originalTextWithHTML.indexOf("</span>", charIndex) + 7;
            appendChar = originalTextWithHTML.substring(
              charIndex,
              closingTagIndex
            );
            charIndex = closingTagIndex - 1;
          }
          typingEffectElement.innerHTML += appendChar;
          charIndex++;
          if (typingEffectElement.contains(cursorElement)) {
            typingEffectElement.removeChild(cursorElement);
          }
          typingEffectElement.appendChild(cursorElement);
          setTimeout(typeText, typingSpeed);
        } else {
          gsap.to(cursorElement, {
            opacity: 0,
            repeat: -1,
            yoyo: true,
            duration: 0.7,
            ease: "power2.inOut",
          });
          typingDone = true;
          if (heroContentElements.length > 0 && !prefersReducedMotion.matches) {
            gsap.to(heroContentElements, {
              opacity: 1,
              y: 0,
              stagger: 0.2,
              duration: 0.8,
              ease: "power2.out",
              delay: 0.3,
            });
          }
        }
      }
      if (!prefersReducedMotion.matches) {
        setTimeout(typeText, 1000);
      } else {
        typingEffectElement.innerHTML = originalTextWithHTML;
        typingDone = true;
        if (heroContentElements.length > 0) {
          gsap.set(heroContentElements, { opacity: 1, y: 0 });
        }
      }
    } else {
      console.warn(
        "Hero title element with id 'typing-effect' not found for typing animation."
      );
      typingDone = true;
      if (heroContentElements.length > 0 && !prefersReducedMotion.matches) {
        gsap.to(heroContentElements, {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 0.8,
          ease: "power2.out",
          delay: 0.5,
        });
      } else if (heroContentElements.length > 0) {
        gsap.set(heroContentElements, { opacity: 1, y: 0 });
      }
    }

    if (heroContentElements.length > 0 && !prefersReducedMotion.matches) {
      gsap.set(heroContentElements, { opacity: 0, y: 30 });
    }

    if (heroImage && !prefersReducedMotion.matches) {
      gsap.fromTo(
        heroImage,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          delay: typingDone ? 0.5 : 2.0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".hero",
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        }
      );
    } else if (heroImage) {
      gsap.set(heroImage, { opacity: 1, y: 0 });
    }

    if (heroFloatingShapes.length > 0 && !prefersReducedMotion.matches) {
      heroFloatingShapes.forEach((shape, index) => {
        gsap.to(shape, {
          y:
            index % 2 === 0
              ? gsap.utils.random(-25, -40, 1)
              : gsap.utils.random(25, 40, 1),
          x:
            index % 2 === 0
              ? gsap.utils.random(-15, -30, 1)
              : gsap.utils.random(15, 30, 1),
          rotation: gsap.utils.random(-45, 45, 1),
          scale: gsap.utils.random(0.8, 1.2, 0.1),
          duration: gsap.utils.random(4, 7, 1),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.3 + (typingDone ? 0.8 : 2.5),
        });
      });
    }

    // Process Section (FIXED ANIMATION)
    const processSection = document.querySelector(".process-section");
    if (processSection && !prefersReducedMotion.matches) {
      const processTitle = processSection.querySelector(".section-title");
      const processSteps = processSection.querySelectorAll(".step");

      if (processTitle) {
        gsap.from(processTitle, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: processTitle,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      }

      if (processSteps.length > 0) {
        gsap.set(processSteps, { opacity: 0, y: 50 });
        gsap.to(processSteps, {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".process-steps",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      } else {
        console.warn(
          "No '.step' elements found in '.process-section' for animation."
        );
      }
    }

    // Features Section
    const featuresSection = document.querySelector(".features-section");
    if (featuresSection && !prefersReducedMotion.matches) {
      const featuresTitle = featuresSection.querySelector(
        ".gsap-features-title"
      );
      if (featuresTitle) {
        gsap.from(featuresTitle, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: featuresTitle,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      }
      const features = featuresSection.querySelectorAll(".feature");
      features.forEach((feature, index) => {
        const content = feature.querySelector(".feature-content");
        const visual = feature.querySelector(".feature-visual");
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: feature,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        });
        if (content)
          tl.from(
            content.children,
            {
              opacity: 0,
              y: 30,
              stagger: 0.15,
              duration: 0.6,
              ease: "power2.out",
            },
            "+=0.2"
          );
        if (visual)
          tl.from(
            visual,
            {
              opacity: 0,
              x: index % 2 === 0 ? -50 : 50,
              duration: 0.7,
              ease: "power2.out",
            },
            "-=0.5"
          );
      });
    }

    // Modules Section (Solutions)
    const modulesSection = document.querySelector(".modules-section");
    if (modulesSection && !prefersReducedMotion.matches) {
      const modulesHeader = modulesSection.querySelector(".section-header");
      if (modulesHeader) {
        gsap.from(modulesHeader.children, {
          opacity: 0,
          y: 30,
          stagger: 0.15,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: modulesHeader,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      }
      gsap.utils.toArray(".modules-grid .module-card").forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          y: 50,
          scale: 0.95,
          duration: 0.7,
          delay: i * 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".modules-grid",
            start: "top 75%",
            toggleActions: "play none none none",
          },
        });
      });
    }

    // Partners Section (Logo Slider)
    const logoSlider = document.querySelector(".logo-slider");
    if (logoSlider && !prefersReducedMotion.matches) {
      const originalLogos = logoSlider.innerHTML;
      logoSlider.innerHTML += originalLogos;
      gsap.to(".logo-slider", {
        x: () => `-${logoSlider.scrollWidth / 2}px`,
        duration: 40,
        ease: "none",
        repeat: -1,
      });
    }

    // Local Section & Final CTA - Floating Elements (for index-page specific CTA)
    if (!prefersReducedMotion.matches) {
      const localFloatingShape = document.querySelector(
        ".local-section .local-floating-shape-1"
      );
      if (localFloatingShape) {
        gsap.to(localFloatingShape, {
          y: gsap.utils.random(-20, 20, 1),
          x: gsap.utils.random(-15, 15, 1),
          rotation: gsap.utils.random(-30, 30, 1),
          duration: 5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
      // These shapes are for the main index final CTA, not the pricing specific one
      const ctaFloatingShapes = document.querySelectorAll(
        ".final-cta-section .final-cta-shape"
      );
      ctaFloatingShapes.forEach((shape, index) => {
        let xMove = 0,
          yMove = 0;
        if (shape.classList.contains("final-cta-shape-top-left")) {
          xMove = -25;
          yMove = -25;
        }
        if (shape.classList.contains("final-cta-shape-bottom-right")) {
          xMove = 25;
          yMove = 25;
        }
        if (shape.classList.contains("final-cta-shape-middle-left-orange")) {
          xMove = -20;
          yMove = 15;
        }
        gsap.to(shape, {
          x: `+=${xMove}`,
          y: `+=${yMove}`,
          rotation: gsap.utils.random(-25, 25, 1),
          scale: gsap.utils.random(0.9, 1.1, 0.1),
          duration: gsap.utils.random(4, 7, 1),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.2,
        });
      });
    }
  }

  // --- Pricing Page Specific Animations ---
  if (document.body.classList.contains("pricing-page")) {
    // Add a class to your body tag for pricing.html like <body class="pricing-page">

    // Pricing Hero Section Animations
    const pricingHeroTitle = document.querySelector(".gsap-pricing-hero-title");
    const pricingHeroDesc = document.querySelector(".gsap-pricing-hero-desc");
    const pricingHeroCta = document.querySelector(".gsap-pricing-hero-cta");

    if (!prefersReducedMotion.matches) {
      // Initialisation à opacity: 0 et y: 20 pour que l'animation "from" fonctionne
      if (pricingHeroTitle) gsap.set(pricingHeroTitle, { opacity: 0, y: 20 });
      if (pricingHeroDesc) gsap.set(pricingHeroDesc, { opacity: 0, y: 20 });
      if (pricingHeroCta) gsap.set(pricingHeroCta, { opacity: 0, y: 20 });

      const tlHero = gsap.timeline({ delay: 0.4 });
      if (pricingHeroTitle)
        tlHero.to(pricingHeroTitle, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
        });
      if (pricingHeroDesc)
        tlHero.to(
          pricingHeroDesc,
          { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
          "-=0.5"
        );
      if (pricingHeroCta)
        tlHero.to(
          pricingHeroCta,
          { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
          "-=0.5"
        );
    } else {
      // Afficher directement si le mouvement réduit est préféré
      if (pricingHeroTitle) gsap.set(pricingHeroTitle, { opacity: 1, y: 0 });
      if (pricingHeroDesc) gsap.set(pricingHeroDesc, { opacity: 1, y: 0 });
      if (pricingHeroCta) gsap.set(pricingHeroCta, { opacity: 1, y: 0 });
    }

    // Pricing Offers Section Animations
    const pricingSectionTitle = document.querySelector(
      ".gsap-pricing-section-title"
    );
    const pricingSectionSubtitle = document.querySelector(
      ".gsap-pricing-section-subtitle"
    );
    const pricingCards = gsap.utils.toArray(".gsap-pricing-card");

    if (!prefersReducedMotion.matches) {
      if (pricingSectionTitle) {
        gsap.from(pricingSectionTitle, {
          opacity: 0,
          y: 30,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: pricingSectionTitle,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      }
      if (pricingSectionSubtitle) {
        gsap.from(pricingSectionSubtitle, {
          opacity: 0,
          y: 30,
          duration: 0.7,
          delay: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: pricingSectionSubtitle,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      }

      if (pricingCards.length > 0) {
        // Initialise les cartes comme invisibles au début pour l'animation
        gsap.set(pricingCards, { opacity: 0, y: 50, scale: 0.95 });

        pricingCards.forEach((card) => {
          const cardHeader = card.querySelector(".gsap-pricing-card-header");
          const cardFeatures = card.querySelector(
            ".gsap-pricing-card-features"
          );
          const cardCta = card.querySelector(".gsap-pricing-card-cta");
          const delay = parseFloat(card.dataset.gsapDelay) || 0; // Utiliser un data-attribute pour le délai

          const tlCard = gsap.timeline({
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              toggleActions: "play none none none",
            },
            delay: delay, // Appliquer le délai à la timeline de la carte
          });

          // Animation de la carte elle-même
          tlCard
            .to(card, {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
            })
            // Animation des éléments internes de la carte, après la carte elle-même
            .from(
              [cardHeader, cardFeatures, cardCta],
              {
                opacity: 0,
                y: 20,
                stagger: 0.1,
                duration: 0.5,
                ease: "power2.out",
              },
              "-=0.3"
            );
        });
      } else {
        console.warn(
          "No '.gsap-pricing-card' elements found for animation in pricing section."
        );
      }
    } else {
      // Si le mouvement réduit est préféré, assurez-vous que les cartes sont visibles
      if (pricingCards.length > 0) {
        gsap.set(pricingCards, { opacity: 1, y: 0, scale: 1 });
      }
    }

    // Features Included Section Animations
    const includedFeaturesTitle = document.querySelector(
      ".gsap-included-features-title"
    );
    const includedFeatureItems = gsap.utils.toArray(
      ".gsap-included-feature-item"
    );

    if (!prefersReducedMotion.matches) {
      if (includedFeaturesTitle) {
        gsap.from(includedFeaturesTitle, {
          opacity: 0,
          y: 30,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: includedFeaturesTitle,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      }
      if (includedFeatureItems.length > 0) {
        gsap.from(includedFeatureItems, {
          opacity: 0,
          y: 40,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".features-included-container",
            start: "top 75%",
            toggleActions: "play none none none",
          },
        });
      }
    }

    // Final CTA Section Animations for Pricing Page
    const pricingCtaTitle = document.querySelector(".gsap-pricing-cta-title");
    const pricingCtaText = document.querySelector(".gsap-pricing-cta-text");
    const pricingCtaButton = document.querySelector(".gsap-pricing-cta-button");
    const pricingCtaShapes = gsap.utils.toArray(".gsap-pricing-cta-shape");

    if (!prefersReducedMotion.matches) {
      const ctaTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".pricing-final-cta",
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      if (pricingCtaTitle)
        ctaTimeline.from(pricingCtaTitle, {
          opacity: 0,
          y: 30,
          duration: 0.7,
          ease: "power2.out",
        });
      if (pricingCtaText)
        ctaTimeline.from(
          pricingCtaText,
          { opacity: 0, y: 30, duration: 0.7, ease: "power2.out" },
          "-=0.4"
        );
      if (pricingCtaButton)
        ctaTimeline.from(
          pricingCtaButton,
          { opacity: 0, y: 30, duration: 0.7, ease: "power2.out" },
          "-=0.4"
        );

      if (pricingCtaShapes.length > 0) {
        pricingCtaShapes.forEach((shape, index) => {
          gsap.to(shape, {
            y: gsap.utils.random(-20, 20, 1),
            x: gsap.utils.random(-20, 20, 1),
            rotation: gsap.utils.random(-45, 45, 1),
            scale: gsap.utils.random(0.8, 1.2, 0.1),
            duration: gsap.utils.random(4, 7, 1),
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: index * 0.2,
          });
        });
      }
    }
  }
});

// Année actuelle pour le footer
const currentYearSpan = document.getElementById("currentYear");
if (currentYearSpan) {
  currentYearSpan.textContent = new Date().getFullYear();
}

// GSAP Animations pour about-us.html
document.addEventListener("DOMContentLoaded", () => {
  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);

    const defaultStart = "top 85%";

    gsap.utils.toArray(".animate-title").forEach((title) => {
      gsap.from(title, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: title,
          start: defaultStart,
          toggleActions: "play none none none",
        },
      });
    });

    gsap.utils.toArray(".animate-subtitle").forEach((subtitle) => {
      gsap.from(subtitle, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        delay: parseFloat(subtitle.dataset.delay) || 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: subtitle,
          start: defaultStart,
          toggleActions: "play none none none",
        },
      });
    });

    gsap.utils.toArray(".animate-text-block-fade-in").forEach((textBlock) => {
      gsap.from(textBlock, {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: parseFloat(textBlock.dataset.delay) || 0.2,
        ease: "power1.out",
        scrollTrigger: {
          trigger: textBlock,
          start: defaultStart,
          toggleActions: "play none none none",
        },
      });
    });

    gsap.utils
      .toArray(".animate-image-slide-in")
      .forEach((imageWrapper, index) => {
        const xFrom =
          index % 2 === 0 && window.innerWidth >= 992
            ? 60
            : window.innerWidth >= 992
            ? -60
            : 0;
        gsap.from(imageWrapper, {
          opacity: 0,
          x: xFrom,
          duration: 1,
          delay: parseFloat(imageWrapper.dataset.delay) || 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: imageWrapper,
            start: defaultStart,
            toggleActions: "play none none none",
          },
        });
      });

    gsap.utils.toArray(".animate-grid-items").forEach((item) => {
      // Changement ici pour le stagger
      gsap.from(item, {
        opacity: 0,
        scale: 0.9,
        y: 50,
        duration: 0.6,
        ease: "back.out(1.4)",
        scrollTrigger: {
          trigger: item, // Le trigger est l'item lui-même
          start: "top 90%",
          toggleActions: "play none none none",
        },
        delay: parseFloat(item.dataset.staggerDelay) || 0, // Utiliser un data-attribute pour un stagger manuel si besoin
      });
    });
    // Pour un stagger sur un groupe d'items si .animate-grid-items est sur les enfants d'un conteneur unique:
    // const gridContainers = document.querySelectorAll('.about-values-grid, .team-grid, .stats-cards-grid, .about-commitment-content');
    // gridContainers.forEach(container => {
    //     gsap.from(container.querySelectorAll('.animate-grid-items'), {
    //         opacity:0, y:30, scale:0.95, duration:0.5, ease:"power1.out", stagger:0.1,
    //         scrollTrigger: { trigger: container, start:"top 85%", toggleActions:"play none none none"}
    //     });
    // });

    const timelineSection = document.querySelector(".clean-timeline-section");
    if (timelineSection) {
      const centralLine = timelineSection.querySelector(
        ".timeline-central-line"
      );
      if (centralLine) {
        gsap.fromTo(
          centralLine,
          { scaleY: 0, opacity: 0 },
          {
            scaleY: 1,
            opacity: 0.5,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".clean-timeline",
              start: "top 70%",
              end: "bottom 70%",
              scrub: 0.5,
            },
          }
        );
      } else {
        const timelineContainer =
          historySection.querySelector(".clean-timeline");
        if (timelineContainer) {
          // S'assurer que timelineContainer est défini
          gsap.from(timelineContainer, {
            opacity: 0,
            duration: 1,
            delay: 0.2,
            scrollTrigger: {
              trigger: timelineContainer,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          });
        }
      }

      const timelineItems = gsap.utils.toArray(".clean-timeline-item");
      timelineItems.forEach((item, index) => {
        const year = item.querySelector(".timeline-year");
        const card = item.querySelector(".timeline-card");
        const cardIcon = item.querySelector(".card-icon");
        const cardTitle = card.querySelector(".card-content h3"); // Cible plus précise
        const cardText = card.querySelector(".card-content p"); // Cible plus précise
        const marker = item.querySelector(".timeline-marker");

        let xFromCard = index % 2 === 0 && window.innerWidth >= 768 ? -60 : 60;
        if (window.innerWidth < 768) xFromCard = 0;

        const tlItem = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });

        gsap.set(item, { opacity: 0 }); // Masquer avant
        tlItem.to(item, { opacity: 1, duration: 0.01 });

        if (marker)
          tlItem.from(
            marker,
            {
              scale: 0,
              opacity: 0,
              duration: 0.4,
              ease: "back.out(1.7)",
            },
            "+=0.1"
          );
        if (year)
          tlItem.from(
            year,
            { opacity: 0, y: -20, duration: 0.4, ease: "power2.out" },
            marker ? "-=0.3" : "+=0.1"
          );
        if (card)
          tlItem.from(
            card,
            {
              opacity: 0,
              x: xFromCard,
              y: 30,
              duration: 0.6,
              ease: "power2.out",
            },
            "-=0.3"
          );
        if (cardIcon)
          tlItem.from(
            cardIcon,
            {
              opacity: 0,
              scale: 0.5,
              rotate: -25,
              duration: 0.5,
              ease: "back.out(1.4)",
            },
            "-=0.4"
          );
        if (cardTitle)
          tlItem.from(
            cardTitle,
            { opacity: 0, x: xFromCard > 0 ? -20 : 20, duration: 0.4 },
            "-=0.3"
          );
        if (cardText)
          tlItem.from(cardText, { opacity: 0, y: 15, duration: 0.4 }, "-=0.3");
      });
    }

    const statCards = gsap.utils.toArray(".stat-card-item.animate-grid-items");
    statCards.forEach((card) => {
      const numberElement = card.querySelector(".stat-card-number");
      if (numberElement) {
        const targetText = numberElement.textContent;
        const targetNumber = parseInt(targetText.replace(/\D/g, ""));
        const suffix = targetText.replace(/[0-9]/g, "");
        if (!isNaN(targetNumber)) {
          gsap.fromTo(
            numberElement,
            { textContent: 0 },
            {
              textContent: targetNumber,
              duration: 2,
              ease: "power1.inOut",
              snap: { textContent: 1 },
              onUpdate: function () {
                numberElement.textContent =
                  Math.round(this.targets()[0].textContent) + suffix;
              },
              scrollTrigger: {
                trigger: card,
                start: "top 80%",
                toggleActions: "play none none none",
              },
            }
          );
        }
      }
    });

    const finalCtaSection = document.querySelector(
      ".final-cta.about-final-cta"
    );
    if (finalCtaSection) {
      gsap.utils
        .toArray(".final-cta .floating-shape")
        .forEach((shape, index) => {
          gsap.to(shape, {
            y: (Math.random() - 0.5) * 50,
            x: (Math.random() - 0.5) * 30,
            opacity: 0.05 + Math.random() * 0.05,
            repeat: -1,
            yoyo: true,
            duration: 4 + Math.random() * 4,
            ease: "sine.inOut",
            delay: index * 0.3,
          });
        });
    }
  } else {
    console.warn("GSAP ou ScrollTrigger n'est pas chargé.");
  }

  // GSAP Animations pour about-us.html
  document.addEventListener("DOMContentLoaded", () => {
    if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);

      const defaultStart = "top 85%";

      gsap.utils.toArray(".animate-title").forEach((title) => {
        gsap.from(title, {
          opacity: 0,
          y: 50,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: title,
            start: defaultStart,
            toggleActions: "play none none none",
          },
        });
      });

      gsap.utils.toArray(".animate-subtitle").forEach((subtitle) => {
        gsap.from(subtitle, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          delay: parseFloat(subtitle.dataset.delay) || 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: subtitle,
            start: defaultStart,
            toggleActions: "play none none none",
          },
        });
      });

      gsap.utils.toArray(".animate-text-block-fade-in").forEach((textBlock) => {
        gsap.from(textBlock, {
          opacity: 0,
          y: 30,
          duration: 1,
          delay: parseFloat(textBlock.dataset.delay) || 0.2,
          ease: "power1.out",
          scrollTrigger: {
            trigger: textBlock,
            start: defaultStart,
            toggleActions: "play none none none",
          },
        });
      });

      gsap.utils
        .toArray(".animate-image-slide-in")
        .forEach((imageWrapper, index) => {
          const xFrom =
            index % 2 === 0 && window.innerWidth >= 992
              ? 60
              : window.innerWidth >= 992
              ? -60
              : 0;
          gsap.from(imageWrapper, {
            opacity: 0,
            x: xFrom,
            duration: 1,
            delay: parseFloat(imageWrapper.dataset.delay) || 0.3,
            ease: "power2.out",
            scrollTrigger: {
              trigger: imageWrapper,
              start: defaultStart,
              toggleActions: "play none none none",
            },
          });
        });

      gsap.utils.toArray(".animate-grid-items").forEach((item) => {
        // Changement ici pour le stagger
        gsap.from(item, {
          opacity: 0,
          scale: 0.9,
          y: 50,
          duration: 0.6,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: item, // Le trigger est l'item lui-même
            start: "top 90%",
            toggleActions: "play none none none",
          },
          delay: parseFloat(item.dataset.staggerDelay) || 0, // Utiliser un data-attribute pour un stagger manuel si besoin
        });
      });
      // Pour un stagger sur un groupe d'items si .animate-grid-items est sur les enfants d'un conteneur unique:
      // const gridContainers = document.querySelectorAll('.about-values-grid, .team-grid, .stats-cards-grid, .about-commitment-content');
      // gridContainers.forEach(container => {
      //     gsap.from(container.querySelectorAll('.animate-grid-items'), {
      //         opacity:0, y:30, scale:0.95, duration:0.5, ease:"power1.out", stagger:0.1,
      //         scrollTrigger: { trigger: container, start:"top 85%", toggleActions:"play none none none"}
      //     });
      // });

      

      const timelineSection = document.querySelector(".clean-timeline-section");
      if (timelineSection) {
        const centralLine = timelineSection.querySelector(
          ".timeline-central-line"
        );
        if (centralLine) {
          gsap.fromTo(
            centralLine,
            { scaleY: 0, opacity: 0 },
            {
              scaleY: 1,
              opacity: 0.5,
              duration: 1.5,
              ease: "power2.out",
              scrollTrigger: {
                trigger: ".clean-timeline",
                start: "top 70%",
                end: "bottom 70%",
                scrub: 0.5,
              },
            }
          );
        } else {
          const timelineContainer =
            historySection.querySelector(".clean-timeline");
          if (timelineContainer) {
            // S'assurer que timelineContainer est défini
            gsap.from(timelineContainer, {
              opacity: 0,
              duration: 1,
              delay: 0.2,
              scrollTrigger: {
                trigger: timelineContainer,
                start: "top 80%",
                toggleActions: "play none none none",
              },
            });
          }
        }

        const timelineItems = gsap.utils.toArray(".clean-timeline-item");
        timelineItems.forEach((item, index) => {
          const year = item.querySelector(".timeline-year");
          const card = item.querySelector(".timeline-card");
          const cardIcon = item.querySelector(".card-icon");
          const cardTitle = card.querySelector(".card-content h3"); // Cible plus précise
          const cardText = card.querySelector(".card-content p"); // Cible plus précise
          const marker = item.querySelector(".timeline-marker");

          let xFromCard =
            index % 2 === 0 && window.innerWidth >= 768 ? -60 : 60;
          if (window.innerWidth < 768) xFromCard = 0;

          const tlItem = gsap.timeline({
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          });

          gsap.set(item, { opacity: 0 }); // Masquer avant
          tlItem.to(item, { opacity: 1, duration: 0.01 });

          if (marker)
            tlItem.from(
              marker,
              {
                scale: 0,
                opacity: 0,
                duration: 0.4,
                ease: "back.out(1.7)",
              },
              "+=0.1"
            );
          if (year)
            tlItem.from(
              year,
              { opacity: 0, y: -20, duration: 0.4, ease: "power2.out" },
              marker ? "-=0.3" : "+=0.1"
            );
          if (card)
            tlItem.from(
              card,
              {
                opacity: 0,
                x: xFromCard,
                y: 30,
                duration: 0.6,
                ease: "power2.out",
              },
              "-=0.3"
            );
          if (cardIcon)
            tlItem.from(
              cardIcon,
              {
                opacity: 0,
                scale: 0.5,
                rotate: -25,
                duration: 0.5,
                ease: "back.out(1.4)",
              },
              "-=0.4"
            );
          if (cardTitle)
            tlItem.from(
              cardTitle,
              { opacity: 0, x: xFromCard > 0 ? -20 : 20, duration: 0.4 },
              "-=0.3"
            );
          if (cardText)
            tlItem.from(
              cardText,
              { opacity: 0, y: 15, duration: 0.4 },
              "-=0.3"
            );
        });
      }

      const statCards = gsap.utils.toArray(
        ".stat-card-item.animate-grid-items"
      );
      statCards.forEach((card) => {
        const numberElement = card.querySelector(".stat-card-number");
        if (numberElement) {
          const targetText = numberElement.textContent;
          const targetNumber = parseInt(targetText.replace(/\D/g, ""));
          const suffix = targetText.replace(/[0-9]/g, "");
          if (!isNaN(targetNumber)) {
            gsap.fromTo(
              numberElement,
              { textContent: 0 },
              {
                textContent: targetNumber,
                duration: 2,
                ease: "power1.inOut",
                snap: { textContent: 1 },
                onUpdate: function () {
                  numberElement.textContent =
                    Math.round(this.targets()[0].textContent) + suffix;
                },
                scrollTrigger: {
                  trigger: card,
                  start: "top 80%",
                  toggleActions: "play none none none",
                },
              }
            );
          }
        }
      });

      const finalCtaSection = document.querySelector(
        ".final-cta.about-final-cta"
      );
      if (finalCtaSection) {
        gsap.utils
          .toArray(".final-cta .floating-shape")
          .forEach((shape, index) => {
            gsap.to(shape, {
              y: (Math.random() - 0.5) * 50,
              x: (Math.random() - 0.5) * 30,
              opacity: 0.05 + Math.random() * 0.05,
              repeat: -1,
              yoyo: true,
              duration: 4 + Math.random() * 4,
              ease: "sine.inOut",
              delay: index * 0.3,
            });
          });
      }
    } else {
      console.warn("GSAP ou ScrollTrigger n'est pas chargé.");
    }
  });
  
});

      document.addEventListener("DOMContentLoaded", () => {
        // --- SCRIPT DE LA MODALE POUR LA CARTE ---
        const addressClickable = document.getElementById("addressClickable");
        const mapModal = document.getElementById("mapModal");
        const mapModalCloseButton = mapModal
          ? mapModal.querySelector(".close-button")
          : null;

        if (mapModal) {
          // Assurer que la modale est bien cachée au début par JavaScript,
          // en complément du CSS. Utile si le CSS met du temps à charger ou est surchargé.
          // Cependant, la méthode CSS `display: none;` est la plus fiable pour l'état initial.
          if (getComputedStyle(mapModal).display !== "none") {
            // console.log("Modal was not initially hidden by CSS, hiding with JS.");
            mapModal.style.display = "none";
          }
        }

        if (addressClickable && mapModal && mapModalCloseButton) {
          addressClickable.addEventListener("click", (event) => {
            event.preventDefault(); // Empêcher tout comportement par défaut si addressClickable est un lien <a>
            // console.log("Address clicked, showing modal.");
            mapModal.style.display = "flex";
          });

          mapModalCloseButton.addEventListener("click", () => {
            // console.log("Modal close button clicked, hiding modal.");
            mapModal.style.display = "none";
          });

          window.addEventListener("click", (event) => {
            if (event.target === mapModal) {
              // console.log("Clicked outside modal content, hiding modal.");
              mapModal.style.display = "none";
            }
          });
        } else {
          // console.warn("Modal elements for map not found. Map functionality will be limited.");
        }

        // --- SCRIPTS SPÉCIFIQUES AU FORMULAIRE DE CONTACT ---
        const contactFormElement = document.getElementById("contactForm");
        const phoneInputField = document.getElementById("phone");
        const countryCodeSelectElement = document.getElementById("countryCode");
        let flagSpanElement; // Pour l'icône du drapeau

        // Fonction pour mettre à jour le drapeau du pays
        function updateCountryFlagDisplay() {
          // Renommée pour plus de clarté
          if (!countryCodeSelectElement || !flagSpanElement) return;
          const selectedOption =
            countryCodeSelectElement.options[
              countryCodeSelectElement.selectedIndex
            ];
          const countryIconCode = selectedOption.getAttribute("data-icon");
          if (countryIconCode) {
            flagSpanElement.className = "fi fi-" + countryIconCode;
            flagSpanElement.style.display = "inline-block";
          } else {
            flagSpanElement.className = "";
            flagSpanElement.style.display = "none";
          }
        }

        // Initialisation du sélecteur de pays avec drapeau
        if (countryCodeSelectElement) {
          const phoneInputContainerElement = countryCodeSelectElement.closest(
            ".phone-input-container"
          );
          if (phoneInputContainerElement) {
            flagSpanElement = document.createElement("span");
            flagSpanElement.style.position = "absolute";
            flagSpanElement.style.left = "12px";
            flagSpanElement.style.top = "50%";
            flagSpanElement.style.transform = "translateY(-50%)";
            flagSpanElement.style.zIndex = "1";
            flagSpanElement.style.pointerEvents = "none";
            flagSpanElement.style.fontSize = "1.1em";
            phoneInputContainerElement.style.position = "relative"; // Important pour le positionnement absolu du drapeau
            phoneInputContainerElement.insertBefore(
              flagSpanElement,
              countryCodeSelectElement
            );

            countryCodeSelectElement.addEventListener(
              "change",
              updateCountryFlagDisplay
            );
            updateCountryFlagDisplay(); // Appel initial pour afficher le drapeau par défaut
          }
        }

        // Gestion des astérisques pour les champs requis
        const formFieldsToAnimateAsterisk = [
          "name",
          "email",
          "company",
          "phone",
          "message",
        ];
        formFieldsToAnimateAsterisk.forEach((fieldId) => {
          const field = document.getElementById(fieldId);
          const requiredAsterisk = document.getElementById(
            fieldId + "Required"
          ); // Renommé pour clarté
          if (field && requiredAsterisk) {
            field.addEventListener("focus", () => {
              requiredAsterisk.classList.add("show");
            });
            // Optionnel: cacher si le champ est vide au blur
            // field.addEventListener("blur", () => {
            //   if (!field.value.trim()) { requiredAsterisk.classList.remove("show"); }
            // });
          }
        });

        // Restriction numérique pour le champ téléphone
        if (phoneInputField) {
          phoneInputField.addEventListener("input", function () {
            this.value = this.value.replace(/[^0-9]/g, "");
          });
          phoneInputField.addEventListener("keypress", function (e) {
            if (
              !/[0-9]/.test(e.key) &&
              ![
                "Backspace",
                "Delete",
                "Tab",
                "Escape",
                "Enter",
                "ArrowLeft",
                "ArrowRight",
              ].includes(e.key)
            ) {
              e.preventDefault();
            }
          });
          phoneInputField.addEventListener("paste", function (e) {
            e.preventDefault();
            const pastedText = (
              e.clipboardData || window.clipboardData
            ).getData("text");
            this.value = pastedText.replace(/[^0-9]/g, "");
          });
        }

        // Logique de validation et de soumission du formulaire
        if (contactFormElement) {
          contactFormElement.addEventListener("submit", function (e) {
            e.preventDefault(); // Toujours prévenir la soumission par défaut pour gérer avec fetch

            let isValid = true;
            const fieldsToValidate = [
              {
                id: "name",
                value: document.getElementById("name").value.trim(),
              },
              {
                id: "email",
                value: document.getElementById("email").value.trim(),
              },
              {
                id: "company",
                value: document.getElementById("company").value.trim(),
              },
              {
                id: "phone",
                value: phoneInputField ? phoneInputField.value.trim() : "",
              },
              {
                id: "message",
                value: document.getElementById("message").value.trim(),
              },
            ];

            // Réinitialiser les erreurs visuelles
            fieldsToValidate.forEach((fieldInfo) => {
              const element = document.getElementById(fieldInfo.id);
              if (element) {
                const container =
                  fieldInfo.id === "phone"
                    ? element.closest(".phone-input-container")
                    : element;
                if (container) container.classList.remove("error-border");
              }
            });
            document.getElementById("email")?.classList.remove("error-border"); // Spécifique pour l'email

            // Validation
            fieldsToValidate.forEach((fieldInfo) => {
              if (!fieldInfo.value) {
                isValid = false;
                const element = document.getElementById(fieldInfo.id);
                if (element) {
                  const container =
                    fieldInfo.id === "phone"
                      ? element.closest(".phone-input-container")
                      : element;
                  if (container) container.classList.add("error-border");
                  const requiredAsterisk = document.getElementById(
                    fieldInfo.id + "Required"
                  );
                  if (
                    requiredAsterisk &&
                    !requiredAsterisk.classList.contains("show")
                  ) {
                    requiredAsterisk.classList.add("show");
                  }
                }
              }
            });

            const emailField = document.getElementById("email");
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (
              emailField &&
              emailField.value.trim() &&
              !emailRegex.test(emailField.value)
            ) {
              isValid = false;
              emailField.classList.add("error-border");
            }

            if (isValid) {
              // console.log("Form is valid, submitting to UseBasin...");
              const formData = new FormData(contactFormElement);

              // Assurer que le numéro de téléphone complet est envoyé
              const countryCodeVal = countryCodeSelectElement
                ? countryCodeSelectElement.value
                : "";
              const phoneVal = phoneInputField ? phoneInputField.value : "";

              // UseBasin utilise les 'name' des inputs. Si name="phone" est sur l'input numérique,
              // et name="country_code" sur le select, il les recevra séparément.
              // Si vous voulez les combiner en un seul champ pour Basin (ex: "full_phone"), faites-le ici :
              // formData.append("full_phone", countryCodeVal + phoneVal);
              // Ou si Basin attend un champ nommé "phone" avec la valeur combinée :
              if (formData.has("phone") && countryCodeVal) {
                // S'il y a un champ 'phone' (l'input numérique)
                formData.set("phone", countryCodeVal + " " + phoneVal); // Remplacer sa valeur par la valeur combinée
              }

              fetch(contactFormElement.action, {
                method: "POST",
                body: formData,
                headers: { Accept: "application/json" },
              })
                .then((response) => {
                  // UseBasin peut rediriger (status 30x) ou renvoyer 200 avec JSON pour AJAX.
                  if (
                    response.ok ||
                    response.type === "opaqueredirect" ||
                    response.redirected
                  ) {
                    // Si c'est une redirection opaque ou explicite, on ne peut pas lire le corps.
                    // On suppose que c'est un succès.
                    if (
                      response.type === "opaqueredirect" ||
                      response.redirected
                    ) {
                      return {
                        success: true,
                        message: "Soumission réussie, redirection en cours.",
                      };
                    }
                    // Sinon, essayer de parser comme JSON
                    return response
                      .json()
                      .catch(() => ({
                        success: true,
                        message: "Soumission réussie (pas de JSON).",
                      }));
                  }
                  // Si ce n'est pas ok et pas une redirection, c'est une erreur
                  return response.json().then((errData) => {
                    throw errData;
                  });
                })
                .then((data) => {
                  // console.log("UseBasin response data:", data);
                  // Si UseBasin redirige, l'alerte ne sera peut-être pas vue.
                  // Il est préférable de configurer une page de remerciement via UseBasin.
                  alert("Message envoyé avec succès !");
                  contactFormElement.reset();
                  document
                    .querySelectorAll(".required.show")
                    .forEach((req) => req.classList.remove("show"));
                  document
                    .querySelectorAll(".error-border")
                    .forEach((el) => el.classList.remove("error-border"));
                  if (countryCodeSelectElement)
                    countryCodeSelectElement.value = "+32"; // Valeur par défaut pour la Belgique
                  updateCountryFlagDisplay();
                })
                .catch((error) => {
                  console.error("Erreur de soumission UseBasin:", error);
                  let errorMessage = "Erreur lors de l'envoi. ";
                  if (
                    error &&
                    error.errors &&
                    typeof error.errors === "object"
                  ) {
                    errorMessage += Object.values(error.errors)
                      .flat()
                      .join(" ");
                  } else if (
                    error &&
                    error.message &&
                    !error.message.includes("JSON.parse") &&
                    !error.message.includes("Failed to fetch")
                  ) {
                    errorMessage += error.message;
                  } else {
                    errorMessage +=
                      "Veuillez vérifier votre connexion et réessayer.";
                  }
                  alert(errorMessage);
                });
            } else {
              // console.log("Form is invalid.");
              // alert("Veuillez corriger les erreurs dans le formulaire."); // Optionnel
            }
          });

          // Retirer la bordure d'erreur à la saisie
          ["name", "email", "company", "phone", "message"].forEach((id) => {
            const field = document.getElementById(id);
            if (field) {
              field.addEventListener("input", function () {
                const container =
                  id === "phone"
                    ? this.closest(".phone-input-container")
                    : this;
                if (container) container.classList.remove("error-border");
                if (id === "email") this.classList.remove("error-border"); // Spécifique pour email
              });
            }
          });
          if (countryCodeSelectElement) {
            countryCodeSelectElement.addEventListener("change", function () {
              const phoneContainer = this.closest(".phone-input-container");
              if (phoneContainer)
                phoneContainer.classList.remove("error-border");
            });
          }
        } // Fin de if (contactFormElement)
      }); // Fin de DOMContentLoaded