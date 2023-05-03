var searchInput = document.querySelector("#showName");
function performSearch() {
  let e = searchInput.value,
    t = document.querySelector("#loader");
  (t.style.display = "block"),
    fetch("https://api.tvmaze.com/search/shows?q=" + e)
      .then((e) => e.json())
      .then((e) => {
        let r = document.querySelector("#results tbody");
        r.innerHTML = "";
        let n = document.querySelector("#errorMessage");
        (n.innerText = ""),
          (t.style.display = "none"),
          0 === e.length
            ? (n.innerText = "Sorry. No results found.")
            : e.forEach((e) => {
                let t = document.createElement("tr"),
                  n = document.createElement("td");
                n.innerText = e.show.name;
                let a = document.createElement("td");
                a.innerText = e.show.rating.average || "-";
                let l = document.createElement("td");
                l.innerText = e.show.genres.join(", ") || "-";
                let s = document.createElement("td");
                (s.innerHTML = e.show.summary),
                  t.appendChild(n),
                  t.appendChild(a),
                  t.appendChild(l),
                  t.appendChild(s),
                  r.appendChild(t);
              });
      })
      .catch((e) => console.error(e));
}
searchInput.addEventListener("input", () => {
  performSearch();
});
