document.addEventListener("DOMContentLoaded", () => {
  const navs = document.querySelectorAll(".nav");

  navs.forEach((nav) => {
    const toggle = nav.querySelector(".menu-toggle");
    const links = nav.querySelector(".links");

    if (!toggle || !links) return;

    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    links.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  });
});
