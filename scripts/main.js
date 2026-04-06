const container = document.querySelector(".docs-grid");

fetch("data/projects.json")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((project) => {
      const card = document.createElement("a");
      card.className = "doc-card";
      card.href = `project.html?id=${project.id}`;

      card.innerHTML = `
        <div class="card-image-wrap">
          <img src="${project.image}" alt="${project.title}" class="card-image" />
          <div class="card-tag">${project.category}</div>

          <div class="card-hover-info">
            <div>${project.author.toUpperCase()}</div>
            <div>${project.year} • ${project.location}</div>
            <div class="card-view">VIEW →</div>
          </div>
        </div>

        <div class="card-body">
          <h3>${project.title}</h3>
          <div class="card-meta">
            <span>${project.location}</span>
            <span>${project.year}</span>
          </div>
        </div>
      `;

      container.appendChild(card);
    });
  });



  const sections = document.querySelectorAll("section:not(:first-of-type)");

sections.forEach((section) => {
  section.classList.add("reveal-section");
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      } else {
        entry.target.classList.remove("is-visible");
      }
    });
  },
  {
    threshold: 0.2
  }
);

sections.forEach((section) => observer.observe(section));
