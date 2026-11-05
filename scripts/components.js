// Shared navigation: edit components/nav.html once for every page.
async function loadNavigation() {
  const target = document.getElementById('site-nav');
  if (!target) return;
  try {
    const response = await fetch('components/nav.html');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    target.innerHTML = await response.text();
    const page = location.pathname.split('/').pop() || 'home.html';
    const activePage = page === 'project.html' ? 'explore.html' : page;
    target.querySelectorAll('.links a').forEach(link => {
      if (link.getAttribute('href') === activePage) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      }
    });
  } catch (error) { console.error('Navigation failed to load:', error); }
}
loadNavigation();
