const yOffset = 0;


document.addEventListener('DOMContentLoaded', async () => {
    await loadSections();
    initHamburgerMenu();
    initScrollSuggestion();
    initScrollingSections();
    initNavBar();
    initGreetings();
    initScrollers();
    initExperienceSection();
    loadContact();
});

async function loadSections() {
  const sectionsFolder = 'sections';
  const contentContainer = document.getElementById('content');
  const sectionPointer = document.getElementById('sectionPointer');

  try {
    const sectionNames = [
      'introduction',
      'projects',
      'experience',
      'about-me',
    ];

    for (const name of sectionNames) {
      const res = await fetch(`${sectionsFolder}/${name}/main.html`);
      const html = await res.text();

      const sectionWrapper = document.createElement('div');
      sectionWrapper.id = name;
      sectionWrapper.classList.add('section');
      sectionWrapper.classList.add('hidden');
      sectionWrapper.innerHTML = html;
      contentContainer.appendChild(sectionWrapper);

      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = `${sectionsFolder}/${name}/styles.css`;
      document.head.appendChild(link);

      // section pointer
      const circle = document.createElement('div');
      circle.id = `pointer_${name}`;
      circle.classList.add('circle');
      sectionPointer.appendChild(circle);

    }
  } catch (error) {
    console.error('Error loading sections:', error);
    contentContainer.innerHTML = '<p>Failed to load sections.</p>';
  }
  // introduction contact
  const contactButton = document.getElementById('contactButton');
  const contactSection = document.getElementById('about-me');
  contactButton.addEventListener('click', () => {
    const y = contactSection.getBoundingClientRect().top + window.scrollY + yOffset;
    window.scrollTo({top: y, behavior: 'smooth'});
  })
}

const initHamburgerMenu = () => {
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navCenter');

  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
  });
};

const initScrollSuggestion = () => {
  const scroller = document.getElementById('scroll-suggestion');
  const nextSection = document.querySelectorAll('#content .section')[1];
  scroller.addEventListener('click', () => {
    const y = nextSection.getBoundingClientRect().top + window.scrollY + yOffset;
    window.scrollTo({top: y, behavior: 'smooth'});
  })
}

const initScrollingSections = () => {
  // Observer just handles adding/removing 'show' for sections
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      } else {
        entry.target.classList.remove('show');
      }
    });
  });

  const hiddenElements = document.querySelectorAll('.hidden');
  hiddenElements.forEach((el) => observer.observe(el));

  const updatePointers = () => {
    let mostVisible = null;
    let maxVisibleHeight = 0;

    hiddenElements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);

      if (visibleHeight > maxVisibleHeight) {
        maxVisibleHeight = visibleHeight;
        mostVisible = el;
      }
    });

    document.querySelectorAll('.section-pointer .circle').forEach((c) => c.classList.remove('full'));
    document.querySelectorAll('.nav-section').forEach((c) => c.classList.remove('selected'));

    if (mostVisible) {
      const circle = document.getElementById(`pointer_${mostVisible.id}`);
      if (circle) circle.classList.add('full');
      const navSection = document.querySelector(`.nav-section[section="${mostVisible.id}"]`);
      if (navSection) navSection.classList.add('selected');
    }
  };

  window.addEventListener('scroll', updatePointers);
  window.addEventListener('resize', updatePointers);
  
  updatePointers();
};

const initNavBar = () => {
  const navSections = document.querySelectorAll('.nav-section');
  navSections.forEach(navSection => {
      const assignedSection = document.getElementById(navSection.getAttribute('section'));
      navSection.addEventListener('click', () => {
        const y = assignedSection.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({top: y, behavior: 'smooth'});
      })
  });
};

const initGreetings = () => {
  const possibleGreetings = [
    "hello",
    "hi",
    "bonjour",
    "cześć",
    "hola",
    "hallo",
    "ciao",
    "namaste",
    "salut",
    "hey"
  ];

  const greetingsText = document.getElementById("greeting");
  let lastIndex = -1;

  const updateGreeting = () => {
    let randomIndex;

    do {
      randomIndex = Math.floor(Math.random() * possibleGreetings.length);
    } while (randomIndex === lastIndex);

    lastIndex = randomIndex;

    const newGreeting = `${possibleGreetings[randomIndex]},`;
    greetingsText.textContent = newGreeting;
  };

  updateGreeting();
  setInterval(updateGreeting, 3000);
};

const initScrollers = () => {
    const scrollers = document.querySelectorAll(".scroller");
    
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      addAnimation();
      addOnHover();
    }
    
    function addAnimation() {
      scrollers.forEach((scroller) => {
        scroller.setAttribute("data-animated", true);
    
        const scrollerInner = scroller.querySelector(".scroller__inner");
        const scrollerContent = Array.from(scrollerInner.children);
    
        scrollerContent.forEach((item) => {
          const duplicatedItem = item.cloneNode(true);
          duplicatedItem.setAttribute("aria-hidden", true);
          scrollerInner.appendChild(duplicatedItem);
        });
      });
    }

    function addOnHover() {
      const scrollerCards = document.querySelectorAll('.scroller__card');
      scrollerCards.forEach((card) => {
        card.addEventListener('mouseover', () => {
          card.classList.add('highlighted');
        });
        card.addEventListener('mouseleave', () => {
          card.classList.remove('highlighted');
        })
      })
    }
};

const initExperienceSection = () => {
  const experienceSwitch = document.getElementById('experienceSwitch');
  const sections = document.querySelectorAll('.experience-main');

  experienceSwitch.addEventListener('click', () => {
    experienceSwitch.classList.toggle('rotated');

    sections.forEach(section => {
      if (section.classList.contains('contracted')) {
        section.classList.remove('contracted');
      } else {
        section.classList.add('contracted')
      }
    }); 
  });
};

const loadContact = () => {
  const e = [['latosek.bar', 'gmail'].join('@'), 'com'].join('.');
  const p = '(+48) 728 248 145';

  document.getElementById('email').innerHTML += e;
  document.getElementById('phone').innerHTML += p;
};