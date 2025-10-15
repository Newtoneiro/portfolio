document.addEventListener('DOMContentLoaded', async () => {
    await loadSections();
    initScrollingSections();
});

async function loadSections() {
  const sectionsFolder = 'sections';
  const contentContainer = document.getElementById('content');

  try {
    const sectionNames = [
      'introduction',
      // 'carousel',
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
