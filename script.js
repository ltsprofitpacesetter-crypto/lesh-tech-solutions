
document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Navigation Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinkItems = document.querySelectorAll('.nav-link');

    const toggleMenu = () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    };

    hamburger.addEventListener('click', toggleMenu);

    // Close menu when a link is clicked
    navLinkItems.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                toggleMenu();
            }
            
            // Set active class on clicked link
            navLinkItems.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // --- Header Background Scroll Effect ---
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(17, 17, 17, 0.98)';
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.2)';
        } else {
            header.style.background = 'rgba(17, 17, 17, 0.95)';
            header.style.boxShadow = 'none';
        }
    });

    // --- Scroll Reveal Animation ---
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    // Add reveal class to all major sections and grid items
    const selectors = [
        '.section-header', 
        '.about-grid', 
        '.service-card', 
        '.portfolio-card',
        '.feature-item', 
        '.step', 
        '.value-card', 
        '.cta-content'
    ];

    selectors.forEach(selector => {
        document.querySelectorAll(selector).forEach((el, index) => {
            el.classList.add('reveal');
            
            // Add staggered delay to grid items
            if (el.classList.contains('service-card') || 
                el.classList.contains('portfolio-card') ||
                el.classList.contains('feature-item') || 
                el.classList.contains('step') || 
                el.classList.contains('value-card')) {
                const delay = (index % 3) + 1; // Stagger 1, 2, 3
                el.classList.add(`reveal-delay-${delay}`);
            }
            
            revealObserver.observe(el);
        });
    });

    // --- Active Link Highlight on Scroll ---
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 150;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                current = sectionId;
            }
        });

        navLinkItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // --- Smooth Scroll for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const headerHeight = 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Chatbot Logic ---
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotClose = document.getElementById('chatbot-close');
    const chatbotContainer = document.getElementById('chatbot-container');
    const chatbotMessages = document.getElementById('chatbot-messages');
    const chatbotInput = document.getElementById('chatbot-input-field');
    const chatbotSend = document.getElementById('chatbot-send');
    const quickReplies = document.querySelectorAll('.quick-reply');

    // Toggle Chatbot
    chatbotToggle.addEventListener('click', () => {
        chatbotContainer.classList.add('active');
        chatbotToggle.style.display = 'none';
    });

    chatbotClose.addEventListener('click', () => {
        chatbotContainer.classList.remove('active');
        setTimeout(() => {
            chatbotToggle.style.display = 'flex';
        }, 400);
    });

    // Handle Messages
    const addMessage = (text, sender) => {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', `${sender}-message`);
        messageDiv.textContent = text;
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    };

    const handleBotResponse = (userText) => {
        const text = userText.toLowerCase();
        let response = "Hmm, I’m not sure about that yet 🤔 But I’d love to help! You can ask in another way or contact us directly on WhatsApp: 079-071-9568.";

        // 1. Greeting
        if (text.includes('hello') || text.includes('hi') || text.includes('hey')) {
            response = "Hello! 👋 Welcome to Lesh Tech Solutions. I'm Mogale, your AI assistant. How can I help you grow your business today?";
        } 
        // 2. Services Summary / What do you provide?
        else if (text.includes('provide') || text.includes('offer') || text.includes('services') || text.includes('what do you do')) {
            response = "We provide a range of digital solutions including Web Development, Mobile App Development, AI Solutions, and Business Automation. Which one would you like to know more about?";
        }
        // 2.5 Portfolio / Projects
        else if (text.includes('portfolio') || text.includes('projects') || text.includes('show') || text.includes('work') || text.includes('done') || text.includes('example')) {
            response = "We've worked on some exciting projects! 🚀 One of our latest is RM Pro Films (https://rmpro-films.co.za), a professional video production website. You can see more in our Portfolio section!";
        }
        // 3. Website Specifics & Definition
        else if (text.includes('website') || text.includes('web') || text.includes('design')) {
            if (text.includes('what is') || text.includes('definition')) {
                response = "A website is your business's digital home! 🏠 It allows customers to find you, learn about your services, and contact you 24/7 from anywhere in the world.";
            } else if (text.includes('fast') || text.includes('speed')) {
                response = "Speed is our priority! We build lightning-fast websites that keep users engaged and improve your SEO rankings.";
            } else if (text.includes('mobile') || text.includes('phone')) {
                response = "All our websites are built with a 'Mobile-First' approach, ensuring they look and work perfectly on every screen size.";
            } else if (text.includes('update') || text.includes('change')) {
                response = "Yes! We build websites that are easy to manage, so you can update your content without any coding knowledge.";
            } else if (text.includes('own')) {
                response = "Yes! Once the project is complete and paid, your website is fully yours. We provide all necessary files and access.";
            } else {
                response = "We build modern, fast, and responsive websites designed to convert visitors into customers. Want to discuss a web project on WhatsApp?";
            }
        } 
        // 4. App Development & Definition
        else if (text.includes('app') || text.includes('mobile') || text.includes('android') || text.includes('ios')) {
            if (text.includes('what is') || text.includes('definition')) {
                response = "An app (application) is a specialized software tool for mobile or web! 📱 It provides a more interactive and powerful experience for your users compared to a standard website.";
            } else if (text.includes('own')) {
                response = "Absolutely! Once the project is finished and paid for, you have full ownership of your app and its code.";
            } else {
                response = "We specialize in custom mobile and web applications built with cutting-edge tech like React and Node.js. We build for both Android and iOS!";
            }
        } 
        // 5. AI Solutions & Definition
        else if (text.includes('ai') || text.includes('artificial') || text.includes('bot') || text.includes('automate')) {
            if (text.includes('what is') || text.includes('definition')) {
                response = "AI (Artificial Intelligence) refers to smart systems that can perform tasks that normally require human intelligence! 🤖 In business, it helps automate repetitive work and provides intelligent insights.";
            } else {
                response = "AI is our specialty! We help businesses automate tasks, build smart chatbots (like me!), and create intelligent systems to improve efficiency.";
            }
        } 
        // 6. Pricing & Quotes
        else if (text.includes('price') || text.includes('cost') || text.includes('quote') || text.includes('how much')) {
            response = "We don't have fixed or stationary prices. Instead, we charge according to the specific services and requirements you need. Click 'Get a Free Quote' to chat with us on WhatsApp for a custom quote!";
        } 
        // 7. Payment & Trust
        else if (text.includes('pay') || text.includes('deposit') || text.includes('method') || text.includes('invoice')) {
            if (text.includes('method') || text.includes('how')) {
                response = "We accept secure payments via EFT and other agreed methods. We usually work with a deposit upfront and the balance after milestones are completed.";
            } else if (text.includes('invoice')) {
                response = "Yes, we provide professional invoices for all transactions to ensure transparency and trust.";
            } else {
                response = "Our payment process is clear and secure. We work with deposits and milestones, and provide invoices for everything.";
            }
        }
        // 8. Process & Timing
        else if (text.includes('how long') || text.includes('time') || text.includes('process') || text.includes('start')) {
            if (text.includes('start') || text.includes('soon')) {
                response = "We can start as soon as we finalize your requirements and receive the initial deposit. Message us on WhatsApp to get moving!";
            } else {
                response = "Our process is simple: Contact us -> Define Requirements -> Build & Launch. We keep you updated at every stage! Websites usually take 1–3 weeks and apps 4–8 weeks.";
            }
        }
        // 9. Location & Online-First Positioning
        else if (text.includes('location') || text.includes('where') || text.includes('based') || text.includes('office') || text.includes('limpopo')) {
            response = "We are a modern, online-first tech company based in Limpopo, South Africa! 🇿🇦 This allows us to work flexibly and serve clients locally and internationally with speed.";
        }
        // 10. Working Remotely / Safety
        else if (text.includes('remote') || text.includes('online') || text.includes('safe') || text.includes('trust')) {
            response = "Working with us online is 100% safe! 🛡️ We communicate clearly via WhatsApp, email, or calls and provide regular updates so you're involved every step of the way.";
        }
        // 11. Why Us / Benefits
        else if (text.includes('why') || text.includes('benefit') || text.includes('good') || text.includes('different')) {
            response = "We combine creativity, technology, and a personal touch. We focus on Reliability, Speed, and Scalability to ensure your solution actually grows your business.";
        }
        // 12. Contact Info
        else if (text.includes('contact') || text.includes('phone') || text.includes('whatsapp') || text.includes('call') || text.includes('touch')) {
            response = "You can reach us directly at 079 071 9568, via WhatsApp, or email us at info@leshtechsolutions.com. You can even chat with our founder, Leshilo Mogalatjane Tetelo, directly!";
        }
        // 13. About the company & Founder
        else if (text.includes('who') || text.includes('about') || text.includes('lesh') || text.includes('founder')) {
            response = "Lesh Tech Solutions was founded in 2026 by Leshilo Mogalatjane Tetelo, a tech enthusiast passionate about creating innovative solutions for businesses. We're based in Limpopo and dedicated to helping you move forward with confidence!";
        }
        // 14. Support & Troubleshooting
        else if (text.includes('issue') || text.includes('help') || text.includes('problem') || text.includes('support') || text.includes('fix')) {
            response = "Having an issue? We're here to help! Please message us on WhatsApp with details about the problem, and our technical team will assist you immediately.";
        }
        // 15. Personality & Fun
        else if (text.includes('personality') || text.includes('who are you') || text.includes('real')) {
            response = "I'm Mogale, your tech assistant! I'm not a human, but I'm here 24/7 to help you find the best tech solutions for your business. 🤖";
        } else if (text.includes('trend') || text.includes('cool') || text.includes('future')) {
            response = "Right now, we're very excited about AI-driven automation and Progressive Web Apps (PWAs). They're changing the game for small businesses!";
        } else if (text.includes('tip')) {
            response = "Tech Tip: Always prioritize mobile-friendliness. Over 60% of web traffic now comes from mobile devices!";
        }

        setTimeout(() => {
            addMessage(response, 'bot');
        }, 600);
    };

    const sendMessage = (customText = null) => {
        const text = customText || chatbotInput.value.trim();
        if (text) {
            addMessage(text, 'user');
            if (!customText) chatbotInput.value = '';
            handleBotResponse(text);
        }
    };

    chatbotSend.addEventListener('click', () => sendMessage());
    chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    // Quick Reply Click Handling
    quickReplies.forEach(button => {
        button.addEventListener('click', () => {
            const msg = button.getAttribute('data-msg');
            sendMessage(msg);
        });
    });
});
