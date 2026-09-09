(function () {
  const links = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.content > div');
  const jumpLinks = document.querySelectorAll('.nav-jump');

  function activateSection(targetId) {
    links.forEach((l) => {
      l.classList.toggle('active', l.dataset.target === targetId);
    });
    sections.forEach((sec) => {
      sec.classList.toggle('active', sec.id === targetId);
    });
  }

  links.forEach((link) => {
    link.addEventListener('click', () => {
      const target = link.dataset.target;
      activateSection(target);
      history.replaceState(null, null, `#${target}`);
      window.scrollTo(0, 0);
    });
  });

  // Inline links within a section (e.g. "see my projects") that jump tabs
  jumpLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = link.dataset.target;
      activateSection(target);
      history.replaceState(null, null, `#${target}`);
      window.scrollTo(0, 0);
    });
  });

  window.addEventListener('load', () => {
    const hash = window.location.hash.slice(1);
    const target = hash && document.getElementById(hash) ? hash : 'home';
    activateSection(target);
  });

  // ---- Theme toggle ----
  const toggleButton = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;

  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
  htmlElement.setAttribute('data-theme', initialTheme);

  toggleButton.addEventListener('click', () => {
    const newTheme = htmlElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });
})();
