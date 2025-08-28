// Variables globales
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');
const modal = document.getElementById('formModal');
const modalBody = document.getElementById('modalBody');
const closeModal = document.querySelector('.close');

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
const animatedElements = document.querySelectorAll('.objectif-card, .service-card, .produit-item, .contact-card, .showcase-card');
animatedElements.forEach(el => observer.observe(el));

// Gestion des formulaires
let currentFormData = {};

// Fonction pour obtenir le message de salutation selon l'heure
function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bonjour';
    if (hour < 18) return 'Bon après-midi';
    return 'Bonsoir';
}

// Fonction pour créer le formulaire partenaire
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
                        <option value="+33">🇫🇷 +33</option>
                        <option value="+237">🇨🇲 +237</option>
                        <option value="+1">🇺🇸 +1</option>
                        <option value="+44">🇬🇧 +44</option>
                        <option value="+49">🇩🇪 +49</option>
                        <option value="+39">🇮🇹 +39</option>
                        <option value="+34">🇪🇸 +34</option>
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

// Fonction pour créer le formulaire de contact
function createContactForm(country, method) {
    const countryName = country === 'france' ? 'France' : 'Cameroun';
    const methodName = method === 'email' ? 'Email' : 'WhatsApp';

    return `
        <div class="form-step active" id="step1">
            <h3>${getGreeting()} !</h3>
            <p>Merci de prendre contact avec SITAFRIQUE pour plus d'informations sur nos services et solutions technologiques.</p>
            <div class="form-buttons">
                <button class="btn-next" onclick="nextStep(2)">Suivant</button>
            </div>
        </div>

        <div class="form-step" id="step2">
            <h3>Vos informations</h3>
            <p>Partagez-nous vos coordonnées pour que nous puissions vous recontacter rapidement.</p>
            <div class="form-group">
                <label for="contactName">Nom complet *</label>
                <input type="text" id="contactName" placeholder="Votre nom complet" required>
            </div>
            <div class="form-group">
                <label for="contactPhone">Numéro de téléphone *</label>
                <div class="phone-input">
                    <select id="contactCountryCode">
                        <option value="+33" ${country === 'france' ? 'selected' : ''}>🇫🇷 +33</option>
                        <option value="+237" ${country === 'cameroun' ? 'selected' : ''}>🇨🇲 +237</option>
                        <option value="+1">🇺🇸 +1</option>
                        <option value="+44">🇬🇧 +44</option>
                        <option value="+49">🇩🇪 +49</option>
                        <option value="+39">🇮🇹 +39</option>
                        <option value="+34">🇪🇸 +34</option>
                    </select>
                    <input type="tel" id="contactPhone" placeholder="Votre numéro" required>
                </div>
            </div>
            <div class="form-buttons">
                <button class="btn-next" onclick="nextStep(3)">Suivant</button>
            </div>
        </div>

        <div class="form-step" id="step3">
            <h3>Merci <span id="contactUserName"></span> !</h3>
            <p>Décrivez-nous vos besoins et les services qui vous intéressent. Notre équipe vous recontactera rapidement.</p>
            <div class="form-group">
                <label for="contactMessage">Votre message *</label>
                <textarea id="contactMessage" class="auto-resize-textarea" placeholder="Décrivez vos besoins, les services qui vous intéressent, ou toute question que vous souhaitez nous poser..." required></textarea>
            </div>
            <div class="form-buttons">
                <button class="btn-contact btn-email" onclick="sendContactEmail('${country}')">
                    <i class="fas fa-envelope"></i> Contacter SITAFRIQUE depuis ${countryName}
                </button>
                <button class="btn-contact btn-whatsapp" onclick="sendContactWhatsApp('${country}')">
                    <i class="fab fa-whatsapp"></i> Contacter SITAFRIQUE depuis ${countryName}
                </button>
            </div>
        </div>
    `;
}

// Fonction pour passer à l'étape suivante
function nextStep(stepNumber) {
    const currentStep = document.querySelector('.form-step.active');
    const nextStep = document.getElementById(`step${stepNumber}`);

    // Validation des champs requis
    if (stepNumber === 2) {
        // Pas de validation pour l'étape 1 (juste salutation)
    } else if (stepNumber === 3) {
        const name = document.getElementById('partnerName') || document.getElementById('contactName');
        const phone = document.getElementById('partnerPhone') || document.getElementById('contactPhone');

        if (!name.value.trim() || !phone.value.trim()) {
            alert('Veuillez remplir tous les champs obligatoires.');
            return;
        }

        // Sauvegarder les données
        currentFormData.name = name.value.trim();
        currentFormData.countryCode = (document.getElementById('countryCode') || document.getElementById('contactCountryCode')).value;
        currentFormData.phone = phone.value.trim();

        // Mettre à jour le nom dans l'étape suivante
        const userNameSpan = document.getElementById('userName') || document.getElementById('contactUserName');
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

// Fonction pour envoyer email contact
function sendContactEmail(country) {
    const message = document.getElementById('contactMessage').value.trim();
    if (!message) {
        alert('Veuillez décrire vos besoins.');
        return;
    }

    const email = country === 'france' ? 'regineyiki77@gmail.com' : 'kevinwilliammkd@gmail.com';
    const countryName = country === 'france' ? 'France' : 'Cameroun';

    const subject = encodeURIComponent(`Demande d'Information - SITAFRIQUE depuis ${countryName}`);
    const body = encodeURIComponent(`Bonjour,

Je souhaite obtenir plus d'informations sur les services de SITAFRIQUE.

Mes informations :
- Nom : ${currentFormData.name}
- Téléphone : ${currentFormData.countryCode} ${currentFormData.phone}
- Pays : ${countryName}

Mon message :
${message}

Cordialement,
${currentFormData.name}`);

    window.open(`mailto:${email}?subject=${subject}&body=${body}`);
    closeModalFunction();
}

// Fonction pour envoyer WhatsApp contact
function sendContactWhatsApp(country) {
    const message = document.getElementById('contactMessage').value.trim();
    if (!message) {
        alert('Veuillez décrire vos besoins.');
        return;
    }

    const whatsappNumber = country === 'france' ? '33641286657' : '237678208073';
    const countryName = country === 'france' ? 'France' : 'Cameroun';

    const whatsappMessage = encodeURIComponent(`Bonjour,

Je souhaite obtenir plus d'informations sur les services de SITAFRIQUE.

Mes informations :
- Nom : ${currentFormData.name}
- Téléphone : ${currentFormData.countryCode} ${currentFormData.phone}
- Pays : ${countryName}

Mon message :
${message}

Cordialement,
${currentFormData.name}`);

    window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`);
    closeModalFunction();
}

// Fonction pour fermer le modal
function closeModalFunction() {
    modal.style.display = 'none';
    currentFormData = {};
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Bouton devenir partenaire
    const becomePartnerBtn = document.getElementById('becomePartnerBtn');
    if (becomePartnerBtn) {
        becomePartnerBtn.addEventListener('click', () => {
            modalBody.innerHTML = createPartnerForm();
            modal.style.display = 'block';
            setupTextareaAutoResize();
        });
    }

    // Cartes de contact
    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach(card => {
        card.addEventListener('click', () => {
            const type = card.dataset.type;
            const country = card.dataset.country;
            const method = card.dataset.method;

            if (type === 'contact') {
                modalBody.innerHTML = createContactForm(country, method);
                modal.style.display = 'block';
                setupTextareaAutoResize();
            }
        });
    });

    // Fermer le modal
    if (closeModal) closeModal.addEventListener('click', closeModalFunction);

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModalFunction();
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
document.querySelectorAll('.contact-card, .showcase-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-15px) scale(1.02)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

console.log(`
🚀 Site SITAFRIQUE redesigné avec succès !

✨ Nouvelles fonctionnalités :
- Design moderne avec thème gold/orange
- Animations fluides et effets visuels
- Formulaires dynamiques pour partenaires et contacts
- Interface responsive complète
- Background animé avec bulles, vagues et étincelles

📞 Contacts disponibles :
France:
- Email : regineyiki77@gmail.com
- WhatsApp : +33 6 41 28 66 57

Cameroun:
- Email : kevinwilliammkd@gmail.com
- WhatsApp : +237 6 78 20 80 73

💎 Développé avec passion pour SITAFRIQUE
`);