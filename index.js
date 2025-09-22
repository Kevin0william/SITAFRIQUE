// Variables globales
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');
const modal = document.getElementById('formModal');
const modalBody = document.getElementById('modalBody');
const closeModal = document.querySelector('.close');

// Variables pour les nouveaux modaux
const advantagesModal = document.getElementById('advantagesModal');
const advantagesClose = document.querySelector('.advantages-close');

// Variables pour le formulaire de contact
let currentContactData = {};
let selectedAgency = null;

// Variables pour le carrousel d'avantages
let currentSlide = 0;
let slideInterval;
const advantages = [
    {
        icon: '<i class="fas fa-seedling"></i>',
        title: 'Modèle Éthique et Durable',
        description: 'Participez à une initiative exemplaire, fondée sur des principes éthiques solides, une transparence totale et un engagement pour un développement équitable. SITAFRIQUE garantit une collaboration saine, loin des circuits corrompus ou destructeurs.'
},
    {
        icon: '<i class="fas fa-store-alt"></i>',
        title: 'Vitrine Internationale pour les Produits Africains',
        description: 'Accédez à une vitrine mondiale pour vos produits, avec une présence stratégique sur les marchés européens, américains et asiatiques. SITAFRIQUE propulse votre visibilité et booste vos ventes à l’international.'
},
    {
        icon: '<i class="fas fa-network-wired"></i>',
        title: 'Accès à un Réseau Multisectoriel en Afrique',
        description: 'Bénéficiez d’un réseau puissant et structuré de producteurs, artisans, ingénieurs et entrepreneurs dans des secteurs clés: agriculture, énergie, recyclage, tech. Une passerelle directe vers les opportunités africaines les plus prometteuses.'
},
    {
        icon: '<i class="fas fa-leaf"></i>',
        title: 'Développement des Énergies Vertes',
        description: 'Investissez dans des projets innovants à fort impact: production solaire, valorisation des déchets plastiques, solutions énergétiques alternatives. Un levier concret pour répondre aux défis énergétiques du continent.'
},
    {
        icon: '<i class="fas fa-hand-holding-usd"></i>',
        title: 'Modèle Rentable à Fort Potentiel',
        description: 'Profitez d’un modèle économique performant, avec des revenus générés sur chaque commande exportée. Un système de commissions optimisé, des marges récurrentes et une croissance rapide dès le démarrage.'
},
    {
        icon: '<i class="fas fa-users-cog"></i>',
        title: 'Impact Social et Transformation Locale',
        description: 'Devenez acteur d’un changement durable en Afrique: insertion professionnelle massive, formations qualifiantes, création d’emplois pérennes et transfert de compétences. Un impact mesurable et valorisant pour chaque investisseur.'
}
];
// Menu mobile
if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Fermer le menu mobile lors du clic sur un lien
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (hamburger) hamburger.classList.remove('active');
        if (navMenu) navMenu.classList.remove('active');
    });
});

// Animation hamburger
if (hamburger) {
    hamburger.addEventListener('click', () => {
        const spans = hamburger.querySelectorAll('span');
        spans.forEach((span, index) => {
            if (hamburger.classList.contains('active')) {
                if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                if (index === 1) span.style.opacity = '0';
                if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                span.style.transform = 'none';
                span.style.opacity = '1';
            }
        });
    });
}

// Smooth scroll pour les liens internes
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Animations au scroll avec Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
        }
    });
}, observerOptions);

// Observer les éléments à animer
const animatedElements = document.querySelectorAll('.objectif-card, .service-card, .produit-item, .showcase-card');
animatedElements.forEach(el => observer.observe(el));

// Fonction pour obtenir le message de salutation selon l'heure
function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bonjour';
    if (hour < 18) return 'Bon après-midi';
    return 'Bonsoir';
}

// Fonction pour créer le formulaire de contact en 4 étapes
function createContactForm() {
    return `
        <div class="form-step active" id="contactStep1">
            <h3>${getGreeting()} !</h3>
            <p>Merci de bien vouloir contacter SITAFRIQUE. Nous sommes ravis de pouvoir échanger avec vous sur nos solutions technologiques innovantes.</p>
            <div class="form-buttons">
                <button class="btn-next" onclick="nextContactStep(2)">
                    <i class="fas fa-arrow-right"></i> Suivant
                </button>
            </div>
        </div>

        <div class="form-step" id="contactStep2">
            <h3>Nos Agences</h3>
            <p>SITAFRIQUE dispose de 3 agences dans le monde. Laquelle souhaitez-vous contacter ?</p>
            <div class="agency-buttons">
                <button class="btn-agency" onclick="selectAgency('france')">
                    <i class="fas fa-flag"></i>
                    <div class="agency-info">
                        <div class="agency-name"> Agence Française</div>
                        <div class="agency-desc">Bureau principal en France</div>
                    </div>
                </button>
                <button class="btn-agency" onclick="selectAgency('allemagne')">
                    <i class="fas fa-flag"></i>
                    <div class="agency-info">
                        <div class="agency-name"> Agence Allemande</div>
                        <div class="agency-desc">Bureau européen en Allemagne</div>
                    </div>
                </button>
                <button class="btn-agency" onclick="selectAgency('afrique')">
                    <i class="fas fa-flag"></i>
                    <div class="agency-info">
                        <div class="agency-name"> Agence Africaine</div>
                        <div class="agency-desc">Bureau africain au Cameroun</div>
                    </div>
                </button>
            </div>
        </div>

        <div class="form-step" id="contactStep3">
            <h3>Merci de contacter <span id="selectedAgencyName"></span> !</h3>
            <p>Pour mieux vous servir, nous aimerions connaître vos coordonnées.</p>
            <div class="form-group">
                <label for="contactName">Votre nom complet *</label>
                <input type="text" id="contactName" placeholder="Entrez votre nom complet" required>
            </div>
            <div class="form-group">
                <label for="contactPhone">Votre numéro de téléphone *</label>
                <div class="phone-input">
                    <select id="contactCountryCode">
                        <option value="+33"> +33</option>
                        <option value="+49"> +49</option>
                        <option value="+237"> +237</option>
                        <option value="+1"> +1</option>
                        <option value="+44"> +44</option>
                        <option value="+39"> +39</option>
                        <option value="+34"> +34</option>
                    </select>
                    <input type="tel" id="contactPhone" placeholder="Votre numéro de téléphone" required>
                </div>
            </div>
            <div class="form-buttons">
                <button class="btn-next" onclick="nextContactStep(4)">
                    <i class="fas fa-arrow-right"></i> Suivant
                </button>
            </div>
        </div>

        <div class="form-step" id="contactStep4">
            <h3>Salut <span id="contactUserName"></span> !</h3>
            <p>Merci de nous faire confiance. Pouvez-vous nous en dire plus sur la raison de votre contact ?</p>
            <div class="form-group">
                <label for="contactMessage">Votre message *</label>
                <textarea id="contactMessage" class="auto-resize-textarea" placeholder="Décrivez votre demande, vos besoins ou toute question que vous souhaitez nous poser..." required></textarea>
            </div>
            <div class="form-buttons">
                <button class="btn-contact btn-email" onclick="sendContactEmail()">
                    <i class="fas fa-envelope"></i> Envoyer par Email
                </button>
                <button class="btn-contact btn-whatsapp" onclick="sendContactWhatsApp()">
                    <i class="fab fa-whatsapp"></i> Envoyer via WhatsApp
                </button>
            </div>
        </div>
    `;
}

// Fonction pour créer le formulaire partenaire (existant)
function createPartnerForm() {
    return `
        <div class="form-step active" id="step1">
            <h3>${getGreeting()} !</h3>
            <p>Merci de vouloir devenir partenaire avec SITAFRIQUE. Ensemble, bâtissons main dans la main un avenir prospère pour la jeunesse et un emploi durable.</p>
            <div class="form-buttons">
                <button class="btn-next" onclick="nextStep(2)">Suivant</button>
            </div>
        </div>

        <div class="form-step" id="step2">
            <h3>Faisons connaissance</h3>
            <p>Nous aimerions mieux vous connaître pour établir un partenariat fructueux.</p>
            <div class="form-group">
                <label for="partnerName">Nom complet *</label>
                <input type="text" id="partnerName" placeholder="Votre nom complet" required>
            </div>
            <div class="form-group">
                <label for="partnerPhone">Numéro de téléphone *</label>
                <div class="phone-input">
                    <select id="countryCode">
                        <option value="+33"> +33</option>
                        <option value="+237"> +237</option>
                        <option value="+1"> +1</option>
                        <option value="+44"> +44</option>
                        <option value="+49"> +49</option>
                        <option value="+39"> +39</option>
                        <option value="+34"> +34</option>
                    </select>
                    <input type="tel" id="partnerPhone" placeholder="Votre numéro" required>
                </div>
            </div>
            <div class="form-buttons">
                <button class="btn-next" onclick="nextStep(3)">Suivant</button>
            </div>
        </div>

        <div class="form-step" id="step3">
            <h3>Merci <span id="userName"></span> !</h3>
            <p>Quel type de partenariat souhaitez-vous développer avec SITAFRIQUE ? Décrivez-nous votre projet et vos attentes.</p>
            <div class="form-group">
                <label for="partnershipType">Votre message *</label>
                <textarea id="partnershipType" class="auto-resize-textarea" placeholder="Décrivez le type de partenariat que vous envisagez, vos objectifs, et comment nous pourrions collaborer ensemble..." required></textarea>
            </div>
            <div class="form-buttons">
                <button class="btn-contact btn-email" onclick="sendPartnerEmail()">
                    <i class="fas fa-envelope"></i> Envoyer par Email
                </button>
                <button class="btn-contact btn-whatsapp" onclick="sendPartnerWhatsApp()">
                    <i class="fab fa-whatsapp"></i> Envoyer via WhatsApp
                </button>
            </div>
        </div>
    `;
}

// Fonctions pour le modal des avantages
function showAdvantagesModal() {
    advantagesModal.style.display = 'flex';
    createAdvantagesSlides();
    startSlideshow();
}

function closeAdvantagesModal() {
    advantagesModal.style.display = 'none';
    stopSlideshow();
    currentSlide = 0;
}

function createAdvantagesSlides() {
    const slidesContainer = document.getElementById('advantagesSlides');
    const indicatorsContainer = document.getElementById('carouselIndicators');

    // Créer les slides
    slidesContainer.innerHTML = advantages.map((advantage, index) => `
        <div class="advantage-slide ${index === 0 ? 'active' : ''}" data-slide="${index}">
            <div class="advantage-icon">${advantage.icon}</div>
            <h4 class="advantage-title">${advantage.title}</h4>
            <p class="advantage-description">${advantage.description}</p>
        </div>
    `).join('');

    // Créer les indicateurs
    indicatorsContainer.innerHTML = advantages.map((_, index) => `
        <div class="indicator ${index === 0 ? 'active' : ''}" data-slide="${index}"></div>
    `).join('');

    // Ajouter les événements aux indicateurs
    document.querySelectorAll('.indicator').forEach((indicator, index) => {
        indicator.addEventListener('click', () => goToSlide(index));
    });
}

function goToSlide(slideIndex) {
    const slides = document.querySelectorAll('.advantage-slide');
    const indicators = document.querySelectorAll('.indicator');

    // Supprimer les classes actives
    slides[currentSlide].classList.remove('active');
    indicators[currentSlide].classList.remove('active');

    // Ajouter la classe prev à l'ancienne slide
    if (slideIndex !== currentSlide) {
        slides[currentSlide].classList.add('prev');
        setTimeout(() => {
            slides[currentSlide].classList.remove('prev');
        }, 600);
    }

    // Mettre à jour l'index
    currentSlide = slideIndex;

    // Ajouter les nouvelles classes actives
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
}

function nextSlide() {
    const nextIndex = (currentSlide + 1) % advantages.length;
    goToSlide(nextIndex);
}

function prevSlide() {
    const prevIndex = (currentSlide - 1 + advantages.length) % advantages.length;
    goToSlide(prevIndex);
}

function startSlideshow() {
    slideInterval = setInterval(nextSlide, 20000); // Change toutes les 4 secondes
}

function stopSlideshow() {
    if (slideInterval) {
        clearInterval(slideInterval);
        slideInterval = null;
    }
}

// Fonction pour passer à l'étape suivante du contact
function nextContactStep(stepNumber) {
    const currentStep = document.querySelector('.form-step.active');
    const nextStep = document.getElementById(`contactStep${stepNumber}`);

    // Validation des champs selon l'étape
    if (stepNumber === 4) {
        const name = document.getElementById('contactName');
        const phone = document.getElementById('contactPhone');

        if (!name.value.trim() || !phone.value.trim()) {
            alert('Veuillez remplir tous les champs obligatoires.');
            return;
        }

        // Sauvegarder les données
        currentContactData.name = name.value.trim();
        currentContactData.countryCode = document.getElementById('contactCountryCode').value;
        currentContactData.phone = phone.value.trim();

        // Mettre à jour le nom dans l'étape finale
        const userNameSpan = document.getElementById('contactUserName');
        if (userNameSpan) {
            userNameSpan.textContent = currentContactData.name;
        }
    }

    // Animation de transition
    currentStep.style.animation = 'slideOutLeft 0.3s ease-out';

    setTimeout(() => {
        currentStep.classList.remove('active');
        nextStep.classList.add('active');
        nextStep.style.animation = 'slideInRight 0.3s ease-out';
    }, 300);
}

// Fonction pour sélectionner une agence
function selectAgency(agency) {
    selectedAgency = agency;
    currentContactData.agency = agency;

    let agencyName;
    switch (agency) {
        case 'france':
            agencyName = 'l\'agence française';
            break;
        case 'allemagne':
            agencyName = 'l\'agence allemande';
            break;
        case 'afrique':
            agencyName = 'l\'agence africaine';
            break;
    }

    // Animation de sélection
    const buttons = document.querySelectorAll('.btn-agency');
    buttons.forEach(btn => {
        btn.style.opacity = '0.5';
        btn.style.transform = 'scale(0.95)';
    });

    setTimeout(() => {
        nextContactStep(3);
        // Mettre à jour le nom de l'agence sélectionnée
        const agencyNameSpan = document.getElementById('selectedAgencyName');
        if (agencyNameSpan) {
            agencyNameSpan.textContent = agencyName;
        }
    }, 500);
}

// Fonction pour envoyer le contact par email
function sendContactEmail() {
    const message = document.getElementById('contactMessage').value.trim();
    if (!message) {
        alert('Veuillez décrire la raison de votre contact.');
        return;
    }

    let email, agencyName;
    switch (selectedAgency) {
        case 'france':
            email = 'regineyiki77@gmail.com';
            agencyName = 'France';
            break;
        case 'allemagne':
            email = 'youbisaac@gmail.com';
            agencyName = 'Allemagne';
            break;
        case 'afrique':
            email = 'kevinwilliammkd@gmail.com';
            agencyName = 'Cameroun (Afrique)';
            break;
    }

    const subject = encodeURIComponent(`Contact SITAFRIQUE - Agence ${agencyName}`);
    const body = encodeURIComponent(`${getGreeting()},

Je vous contacte depuis le site web de SITAFRIQUE.

Mes informations :
- Nom : ${currentContactData.name}
- Téléphone : ${currentContactData.countryCode} ${currentContactData.phone}
- Agence contactée : ${agencyName}

Mon message :
${message}

Cordialement,
${currentContactData.name}`);

    window.open(`mailto:${email}?subject=${subject}&body=${body}`);
    closeModalFunction();
}

// Fonction pour envoyer le contact par WhatsApp
function sendContactWhatsApp() {
    const message = document.getElementById('contactMessage').value.trim();
    if (!message) {
        alert('Veuillez décrire la raison de votre contact.');
        return;
    }

    let whatsappNumber, agencyName;
    switch (selectedAgency) {
        case 'france':
            whatsappNumber = '33641286657';
            agencyName = 'France';
            break;
        case 'allemagne':
            whatsappNumber = '491744945674';
            agencyName = 'Allemagne';
            break;
        case 'afrique':
            whatsappNumber = '237678208073';
            agencyName = 'Cameroun (Afrique)';
            break;
    }

    const whatsappMessage = encodeURIComponent(`${getGreeting()},

Je vous contacte depuis le site web de SITAFRIQUE.

Mes informations :
- Nom : ${currentContactData.name}
- Téléphone : ${currentContactData.countryCode} ${currentContactData.phone}
- Agence contactée : ${agencyName}

Mon message :
${message}

Cordialement,
${currentContactData.name}`);

    window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`);
    closeModalFunction();
}

// Fonction pour passer à l'étape suivante (partenaire - existant)
function nextStep(stepNumber) {
    const currentStep = document.querySelector('.form-step.active');
    const nextStep = document.getElementById(`step${stepNumber}`);

    // Validation des champs requis
    if (stepNumber === 2) {
        // Pas de validation pour l'étape 1 (juste salutation)
    } else if (stepNumber === 3) {
        const name = document.getElementById('partnerName');
        const phone = document.getElementById('partnerPhone');

        if (!name.value.trim() || !phone.value.trim()) {
            alert('Veuillez remplir tous les champs obligatoires.');
            return;
        }

        // Sauvegarder les données
        currentFormData.name = name.value.trim();
        currentFormData.countryCode = document.getElementById('countryCode').value;
        currentFormData.phone = phone.value.trim();

        // Mettre à jour le nom dans l'étape suivante
        const userNameSpan = document.getElementById('userName');
        if (userNameSpan) {
            userNameSpan.textContent = currentFormData.name;
        }
    }

    currentStep.classList.remove('active');
    nextStep.classList.add('active');
}

// Fonction pour envoyer email partenaire
function sendPartnerEmail() {
    const message = document.getElementById('partnershipType').value.trim();
    if (!message) {
        alert('Veuillez décrire votre projet de partenariat.');
        return;
    }

    const subject = encodeURIComponent('Demande de Partenariat - SITAFRIQUE');
    const body = encodeURIComponent(`Bonjour,

Je souhaite devenir partenaire de SITAFRIQUE.

Mes informations :
- Nom : ${currentFormData.name}
- Téléphone : ${currentFormData.countryCode} ${currentFormData.phone}

Type de partenariat souhaité :
${message}

Cordialement,
${currentFormData.name}`);

    window.open(`mailto:regineyiki77@gmail.com?subject=${subject}&body=${body}`);
    closeModalFunction();
}

// Fonction pour envoyer WhatsApp partenaire
function sendPartnerWhatsApp() {
    const message = document.getElementById('partnershipType').value.trim();
    if (!message) {
        alert('Veuillez décrire votre projet de partenariat.');
        return;
    }

    const whatsappMessage = encodeURIComponent(`Bonjour,

Je souhaite devenir partenaire de SITAFRIQUE.

Mes informations :
- Nom : ${currentFormData.name}
- Téléphone : ${currentFormData.countryCode} ${currentFormData.phone}

Type de partenariat souhaité :
${message}

Cordialement,
${currentFormData.name}`);

    window.open(`https://wa.me/33641286657?text=${whatsappMessage}`);
    closeModalFunction();
}

// Fonction pour fermer le modal
function closeModalFunction() {
    modal.style.display = 'none';
    currentFormData = {};
    currentContactData = {};
    selectedAgency = null;
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Variables globales pour partenaire
    window.currentFormData = {};

    // Bouton "En savoir plus" pour les avantages
    const learnMoreBtn = document.getElementById('learnMoreBtn');
    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', showAdvantagesModal);
    }

    // Bouton "Devenir Partenaire"
    const becomePartnerBtn = document.getElementById('becomePartnerBtn');
    if (becomePartnerBtn) {
        becomePartnerBtn.addEventListener('click', () => {
            modalBody.innerHTML = createPartnerForm();
            modal.style.display = 'block';
            setupTextareaAutoResize();
        });
    }

    // Carte de contact principale
    const contactMainCard = document.getElementById('contactMainCard');
    if (contactMainCard) {
        contactMainCard.addEventListener('click', () => {
            modalBody.innerHTML = createContactForm();
            modal.style.display = 'block';
            setupTextareaAutoResize();
        });
    }

    // Contrôles du carrousel d'avantages
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');

    if (nextBtn) nextBtn.addEventListener('click', () => {
        stopSlideshow();
        nextSlide();
        startSlideshow();
    });

    if (prevBtn) prevBtn.addEventListener('click', () => {
        stopSlideshow();
        prevSlide();
        startSlideshow();
    });

    // Fermer les modaux
    if (closeModal) closeModal.addEventListener('click', closeModalFunction);
    if (advantagesClose) advantagesClose.addEventListener('click', closeAdvantagesModal);

    // Fermer les modaux en cliquant à l'extérieur
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModalFunction();
        }
        if (e.target === advantagesModal) {
            closeAdvantagesModal();
        }
    });

    // Créer des bulles animées supplémentaires
    createAnimatedBubbles();

    // Créer des étincelles supplémentaires
    createSparkles();
});

// Fonction pour configurer le redimensionnement automatique des textarea
function setupTextareaAutoResize() {
    const textareas = document.querySelectorAll('.auto-resize-textarea');
    textareas.forEach(textarea => {
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + 'px';
        });
    });
}

// Fonction pour créer des bulles animées
function createAnimatedBubbles() {
    const bubblesContainer = document.querySelector('.bubbles');
    if (!bubblesContainer) return;

    for (let i = 0; i < 10; i++) {
        const bubble = document.createElement('div');
        bubble.style.cssText = `
            position: absolute;
            width: ${Math.random() * 60 + 20}px;
            height: ${Math.random() * 60 + 20}px;
            background: rgba(255, 255, 255, ${Math.random() * 0.1 + 0.05});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 6 + 4}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
        `;
        bubblesContainer.appendChild(bubble);
    }
}

// Fonction pour créer des étincelles
function createSparkles() {
    const sparklesContainer = document.querySelector('.sparkles');
    if (!sparklesContainer) return;

    const sparkleSymbols = ['✨', '⭐', '💫', '🌟'];

    for (let i = 0; i < 15; i++) {
        const sparkle = document.createElement('div');
        sparkle.textContent = sparkleSymbols[Math.floor(Math.random() * sparkleSymbols.length)];
        sparkle.style.cssText = `
            position: absolute;
            font-size: ${Math.random() * 20 + 15}px;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: sparkle ${Math.random() * 4 + 3}s ease-in-out infinite;
            animation-delay: ${Math.random() * 3}s;
            pointer-events: none;
        `;
        sparklesContainer.appendChild(sparkle);
    }
}

// Effet parallax léger
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
});

// Animation des cartes au survol
document.querySelectorAll('.showcase-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-15px) scale(1.02)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Animations CSS supplémentaires pour les transitions
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOutLeft {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(-50px);
        }
    }

    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(style);

console.log(`
🚀 SITAFRIQUE - Section Partenaires Complètement Restructurée !

✨ Nouvelles fonctionnalités de la section partenaire :
- Question stratégique accrocheuse pour attirer les investisseurs
- Bouton "En savoir plus" avec animations premium
- Modal des avantages avec carrousel automatique (6 avantages)
- Navigation manuelle avec flèches et indicateurs
- Appel à l'action professionnel "Devenir Partenaire"
- Design différencié des autres modaux
- Animations fluides et transitions élégantes
- Interface 100% responsive

🎯 Avantages présentés aux investisseurs :
1. Retour sur Investissement Exceptionnel
2. Accès Privilégié au Marché Africain
3. Partenariats Stratégiques Exclusifs
4. Innovation Technologique de Pointe
5. Sécurité et Transparence Garanties
6. Impact Social Mesurable

💎 La section partenaire est maintenant optimisée pour convertir les visiteurs en investisseurs !
`);



