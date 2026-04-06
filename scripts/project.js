const params = new URLSearchParams(window.location.search);
const projectId = params.get("id");

fetch("data/projects.json")
  .then((res) => res.json())
  .then((projects) => {
    const project = projects.find((item) => item.id === projectId) || projects[0];

    document.title = project.title;

    document.getElementById("project-hero-image").src = project.image;
    document.getElementById("project-hero-image").alt = project.title;

    document.getElementById("project-category").textContent = project.category;
    document.getElementById("project-title").textContent = project.title;
    document.getElementById(
      "project-meta"
    ).textContent = `${project.author} • ${project.year} • ${project.location}`;

    document.getElementById("project-concept").textContent = project.concept || "";
    document.getElementById("project-process").textContent = project.process || "";
    document.getElementById("project-final").textContent = project.final || "";

    const videoBox = document.getElementById("project-video");

    if (project.video && project.video.trim() !== "") {
      videoBox.innerHTML = `
        <video controls>
          <source src="${project.video}" type="video/mp4" />
        </video>
      `;
    }
  })
  .catch((error) => {
    console.error("Failed to load project data:", error);
  });