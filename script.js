document.addEventListener('DOMContentLoaded', async () => {
    await loadSections();
    initScrollingSections();
    // initGreetings();
    initScrollers();
});

async function loadSections() {
  const sectionsFolder = 'sections';
  const contentContainer = document.getElementById('content');

  try {
    const sectionNames = [
      'introduction',
      'projects',
    ];

    for (const name of sectionNames) {
      const res = await fetch(`${sectionsFolder}/${name}/main.html`);
      const html = await res.text();

      const sectionWrapper = document.createElement('div');
      sectionWrapper.classList.add('section');
      sectionWrapper.classList.add('hidden');
      sectionWrapper.innerHTML = html;
      contentContainer.appendChild(sectionWrapper);

      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = `${sectionsFolder}/${name}/styles.css`;
      document.head.appendChild(link);
    }
  } catch (error) {
    console.error('Error loading sections:', error);
    contentContainer.innerHTML = '<p>Failed to load sections.</p>';
  }
}

const initScrollingSections = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      } else {
        entry.target.classList.remove('show');
      }
    })
  })

  const hiddenElements = document.querySelectorAll('.hidden');
  hiddenElements.forEach((el) => observer.observe(el));
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
