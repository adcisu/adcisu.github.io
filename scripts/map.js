const documentedLocations = [
  {
    id: "chicago",
    title: "Chicago, Illinois",
    region: "North America",
    lat: 41.8781,
    lng: -87.6298,
    count: 1,
    projects: [
      {
        title: "Heartland Urban Edge",
        author: "Antony Dawson",
        year: "2026",
        category: "Building Analysis",
        image: "assets/logo.jpg",
        link: "project.html?id=project_2"
      }
    ]
  },
  {
    id: "kansas-city",
    title: "Kansas City, Missouri",
    region: "North America",
    lat: 39.0997,
    lng: -94.5786,
    count: 2,
    projects: [
      {
        title: "Heartland Urban Edge",
        author: "Antony Dawson",
        year: "2026",
        category: "Building Analysis",
        image: "assets/logo.jpg",
        link: "project.html?id=project_2"

      }
    ]
  },
  {
    id: "bentonville",
    title: "Bentonville, Arkansas",
    region: "North America",
    lat: 36.0704,
    lng: -94.1480,
    count: 3,
    projects: [
      {
        title: "Heartland Urban Edge",
        author: "Antony Dawson",
        year: "2026",
        category: "Building Analysis",
        image: "assets/logo.jpg",
        link: "project.html?id=project_2"
      },
      {
        title: "Razorback Stadium",
        author: "Antony Dawson",
        year: "2026",
        category: "Freeform",
        image: "assets/logo.jpg",
        link: "project.html?id=project_2"
      }
    ]
  }
];

const map = L.map("map", {
  zoomControl: true,
  attributionControl: false
}).setView([39.5, -98.35], 4);

L.tileLayer("https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png", {
  subdomains: "abcd",
  maxZoom: 19,
  noWrap: true
}).addTo(map);

const worldBounds = L.latLngBounds(
  [-85, -180],
  [85, 180]
);

map.setMaxBounds(worldBounds);
map.setMinZoom(2);

map.on("drag", function () {
  map.panInsideBounds(worldBounds, { animate: false });
});

const panelEmpty = document.getElementById("panel-empty");
const panelContent = document.getElementById("panel-content");
const panelRegionTitle = document.getElementById("panel-region-title");
const panelCount = document.getElementById("panel-count");
const panelList = document.getElementById("panel-list");
const panelClose = document.getElementById("panel-close");

const markerRefs = [];

function markerHTML(count, active = false) {
  return `
    <div class="marker-wrap ${active ? "active" : ""}">
      <div class="marker-dot">${count}</div>
    </div>
  `;
}

function setActiveMarker(activeId) {
  markerRefs.forEach(({ location, marker }) => {
    marker.setIcon(
      L.divIcon({
        className: "custom-marker",
        html: markerHTML(location.count, location.id === activeId),
        iconSize: [34, 34],
        iconAnchor: [17, 17]
      })
    );
  });
}

function renderPanel(location) {
  panelEmpty.style.display = "none";
  panelContent.classList.remove("hidden");

  panelRegionTitle.textContent = location.region;
  panelCount.textContent = `${location.projects.length} PROJECTS`;
  panelList.innerHTML = "";

  location.projects.forEach((project) => {
    const card = document.createElement("a");
    card.className = "panel-card";
    card.href = project.link;

    card.innerHTML = `
      <img src="${project.image}" alt="${project.title}">
      <div class="panel-card-copy">
        <h3>${project.title}</h3>
        <div class="panel-card-meta">${project.author} · ${project.year}</div>
        <div class="panel-card-tag">${project.category}</div>
      </div>
      <div class="panel-card-arrow">→</div>
    `;

    panelList.appendChild(card);
  });
}

documentedLocations.forEach((location) => {
  const marker = L.marker([location.lat, location.lng], {
    icon: L.divIcon({
      className: "custom-marker",
      html: markerHTML(location.count, false),
      iconSize: [34, 34],
      iconAnchor: [17, 17]
    })
  }).addTo(map);

  marker.on("click", () => {
    setActiveMarker(location.id);
    renderPanel(location);
    map.flyTo([location.lat, location.lng], 5, {
      duration: 0.8
    });
  });

  markerRefs.push({ location, marker });
});

panelClose.addEventListener("click", () => {
  panelContent.classList.add("hidden");
  panelEmpty.style.display = "flex";
  setActiveMarker(null);
  map.flyTo([39.5, -98.35], 4, { duration: 0.8 });
});