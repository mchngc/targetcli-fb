document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('pre code.language-python').forEach((el) => {
    hljs.highlightElement(el);
  });
  
  // ---------------- Sidebar dropdowns ----------------
  document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
    toggle.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('data-target');
      const dropdown = document.getElementById(targetId);
      if (dropdown) dropdown.classList.toggle('open');
    });
  });

  // ---------------- Header "Code ▾" dropdown ----------------
  const codeToggle = document.getElementById('code-toggle');
  const codeDropdown = document.querySelector('header nav .dropdown');
  document.addEventListener('click', (e) => {
    if (codeToggle && codeToggle.contains(e.target)) {
      e.preventDefault();
      codeDropdown?.classList.toggle('open');
    } else if (codeDropdown && !codeDropdown.contains(e.target)) {
      codeDropdown.classList.remove('open');
    }
  });

  // ---------------- Dark mode toggle ----------------
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  const prismLight = document.getElementById('prism-light');
  const prismDark = document.getElementById('prism-dark');

  function setTheme(mode) {
    if (mode === 'dark') {
      body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
      if (themeToggle) themeToggle.innerHTML = '<i data-lucide="sun"></i>';
      if (prismLight) prismLight.disabled = true;
      if (prismDark) prismDark.disabled = false;
    } else {
      body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
      if (themeToggle) themeToggle.innerHTML = '<i data-lucide="moon"></i>';
      if (prismLight) prismLight.disabled = false;
      if (prismDark) prismDark.disabled = true;
    }
    if (window.lucide && lucide.createIcons) lucide.createIcons();
  }

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) setTheme(savedTheme);
  else if (window.matchMedia('(prefers-color-scheme: dark)').matches) setTheme('dark');
  else setTheme('light');

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      if (body.classList.contains('dark-mode')) setTheme('light');
      else setTheme('dark');
    });
  }

  // ---------------- Back to Top button ----------------
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      backToTopBtn.style.display = (window.scrollY > 200) ? 'flex' : 'none';
    });
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  

});

