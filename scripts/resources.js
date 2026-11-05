// Resources are independent of data/projects.json.
const grid = document.getElementById('resourcesGrid');
const search = document.querySelector('.filter-bar input');
const buttons = document.querySelectorAll('.filters button');
const count = document.querySelector('.project-count');
let resources = [];
let category = 'all';
let query = '';

const safe = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));

function render() {
  const filtered = resources.filter(item => {
    const matchesCategory = category === 'all' || String(item.category || '').toLowerCase() === category;
    const matchesSearch = [item.title, item.category, item.description, item.format].some(value => String(value || '').toLowerCase().includes(query));
    return matchesCategory && (!query || matchesSearch);
  });
  count.textContent = `${filtered.length} RESOURCE${filtered.length === 1 ? '' : 'S'}`;
  grid.replaceChildren();
  if (!filtered.length) { grid.innerHTML = '<div class="no-results">No resources found.</div>'; return; }
  filtered.forEach(item => {
    const card = document.createElement('article');
    card.className = 'project-card' + (item.file ? ' has-download' : '');
    card.innerHTML = `<div class="project-image-wrap">${item.image ? `<img src="${safe(item.image)}" alt="${safe(item.title || 'Resource preview')}" loading="lazy">` : ''}</div><div class="project-info"><div class="project-category">${safe(item.category)}</div><div class="project-title">${safe(item.title || 'Untitled Resource')}</div><div class="project-location">${safe(item.description)}</div><div class="project-meta"><span>${safe(item.format)}</span><span>${safe(item.year)}</span></div></div>`;
    if (item.file) {
      card.tabIndex = 0;
      card.setAttribute('role', 'link');
      card.setAttribute('aria-label', `Open ${item.title || 'resource'}`);
      const open = () => window.open(item.file, '_blank', 'noopener');
      card.addEventListener('click', open);
      card.addEventListener('keydown', event => { if (event.key === 'Enter') open(); });
    }
    grid.appendChild(card);
  });
}
buttons.forEach(button => button.addEventListener('click', () => {
  buttons.forEach(other => other.classList.remove('active'));
  button.classList.add('active');
  category = button.textContent.trim().toLowerCase();
  render();
}));
search.addEventListener('input', () => { query = search.value.trim().toLowerCase(); render(); });
fetch('data/resources.json').then(response => { if (!response.ok) throw new Error(response.status); return response.json(); }).then(data => { if (!Array.isArray(data)) throw new Error('Expected array'); resources = data; render(); }).catch(error => { console.error('Failed to load resources', error); grid.innerHTML = '<div class="no-results">Could not load resources.</div>'; });
