const experts = [
  {
    name: "Amina Diallo",
    country: "Sénégal · France",
    rating: "4,9",
    nextSlot: "Aujourd'hui 16:30 UTC",
    specialties: ["Fiscalité FR/SN", "Création SAS", "Français"],
    price: "89 € / consultation",
  },
  {
    name: "Julien Moreau",
    country: "Canada · Belgique",
    rating: "4,8",
    nextSlot: "Demain 09:00 UTC-5",
    specialties: ["TVA", "E-commerce", "Anglais"],
    price: "120 CAD / consultation",
  },
  {
    name: "Nadia Benali",
    country: "Maroc · Suisse",
    rating: "5,0",
    nextSlot: "Vendredi 11:00 UTC+1",
    specialties: ["Audit", "Holding", "Arabe"],
    price: "95 CHF / consultation",
  },
];

const serviceLabels = {
  creation: "création d'entreprise",
  tax: "déclaration fiscale internationale",
  payroll: "paie et RH à distance",
  audit: "audit et conformité",
};

function initials(name) {
  return name
    .split(" ")
    .map((part) => part.at(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function renderExperts() {
  const list = document.querySelector("#experts-list");

  list.innerHTML = experts
    .map(
      (expert) => `
        <article class="expert-card">
          <div class="expert-card__header">
            <span class="expert-card__avatar" aria-hidden="true">${initials(expert.name)}</span>
            <div>
              <h3>${expert.name}</h3>
              <p>${expert.country}</p>
            </div>
          </div>
          <div class="expert-card__meta">
            <span class="pill">⭐ ${expert.rating}/5</span>
            <span class="pill">${expert.nextSlot}</span>
          </div>
          <div class="expert-card__tags">
            ${expert.specialties.map((specialty) => `<span class="pill">${specialty}</span>`).join("")}
          </div>
          <strong>${expert.price}</strong>
        </article>
      `,
    )
    .join("");
}

function handleSearch(event) {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);
  const service = serviceLabels[formData.get("service")];
  const clientCountry = formData.get("clientCountry");
  const accountantCountry = formData.get("accountantCountry");
  const matchCount = accountantCountry === "Peu importe" ? experts.length : 1;
  const result = document.querySelector("#search-result");

  result.textContent = `${matchCount} comptable${matchCount > 1 ? "s" : ""} disponible${
    matchCount > 1 ? "s" : ""
  } pour ${service}, client basé en ${clientCountry}, comptable: ${accountantCountry}.`;
}

renderExperts();
document.querySelector("#booking").addEventListener("submit", handleSearch);
