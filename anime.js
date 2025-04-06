document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const animeId = params.get("id");

  if (!animeId) {
    document.getElementById("animeTitle").textContent = "Anime ID not found!";
    return;
  }

  try {
    const baseURL = "https://getyouranime.onrender.com";

    const response = await fetch(`${baseURL}/anime/${animeId}`);
    //const response = await fetch(`http://localhost:5000/anime/${animeId}`);
    const data = await response.json();
    const anime = data.data;

    document.getElementById("animeTitle").textContent = anime.title;
    document.getElementById("animeSynopsis").textContent = anime.synopsis || "No synopsis available.";

    // Set banner background image
    const banner = document.getElementById("animeBanner");
    banner.style.backgroundImage = `url('${anime.images.jpg.large_image_url}')`;
    banner.style.backgroundSize = "700px";
    banner.style.backgroundPosition = "right";

    // Trailer Button
    document.getElementById("Trailer").addEventListener("click", () => {
      if (anime.trailer && anime.trailer.embed_url) {
        window.open(anime.trailer.embed_url, "_blank");
      } else {
        alert("Trailer not available.");
      }
    });

    // More Details Button
    document.getElementById("moreDetails").addEventListener("click", () => {
      window.open(anime.url, "_blank"); // Redirect to MAL page
    });

  } catch (err) {
    document.getElementById("animeTitle").textContent = "Error loading anime.";
    console.error("Error:", err);
  }
});
