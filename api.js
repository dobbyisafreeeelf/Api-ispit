var searchInput = document.querySelector("#showName");
searchInput.addEventListener("input", () => {
  performSearch();
});
// selektiramo html id element i spremamo ga u varijablu
// dodajemo event listener u taj input element koji provjerava svaku promjenu (preformSearch funkcijom)

function performSearch() {
  const showName = searchInput.value;
  const apiURL = "https://api.tvmaze.com/search/shows?q=" + showName; //link na api

  const loader = document.querySelector("#loader");
  loader.style.display = "block"; // loader

  fetch(apiURL)
    .then((response) => response.json())
    .then((data) => {
      const tbody = document.querySelector("#results tbody");
      tbody.innerHTML = "";
      const errorMessage = document.querySelector("#errorMessage");
      errorMessage.innerText = "";
      loader.style.display = "none";
      if (data.length === 0) {
        errorMessage.innerText = "Sorry. No results found.";
      } else {
        data.forEach((result) => {
          const row = document.createElement("tr"); // Ako ima rezultata, prolazi kroz svaki rezultat i za svaki stvara novi red tablice
          const nameElement = document.createElement("td"); // novi stupac u tablici
          nameElement.innerText = result.show.name; //dohvaćamo name iz api zahtjeva i upisujemo ga
          const averageRatingElement = document.createElement("td");
          averageRatingElement.innerText = result.show.rating.average || "-";
          const genresElement = document.createElement("td");
          genresElement.innerText = result.show.genres.join(", ") || "-";
          const descriptionElement = document.createElement("td");
          descriptionElement.innerHTML = result.show.summary;

          row.appendChild(nameElement); //dodavanje stupaca kreiranom retku
          row.appendChild(averageRatingElement);
          row.appendChild(genresElement);
          row.appendChild(descriptionElement);
          tbody.appendChild(row); //dodavanje retka u tablicu
        });
      }
    })
    .catch((error) => console.error(error));
}
