const baseURL = "https://getyouranime.onrender.com";

async function fetchAnime(url, containerSelector) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    const container = document.querySelector(containerSelector);

    container.innerHTML = ''; // Clear previous content

    data.data.slice(0, 6).forEach(anime => {
      const div = document.createElement('div');
      div.className = 'anime-card';
      div.style.backgroundImage = `url('${anime.images.jpg.large_image_url}')`;
      div.innerHTML = `<div class="anime-title">${anime.title}</div>`;

      div.onclick = () => {
        window.location.href = `anime-detail.html?id=${anime.mal_id}`;
      };

      container.appendChild(div);
    });
  } catch (error) {
    console.error("Error fetching anime:", error);
  }
}

// Load Top Anime
fetchAnime(`${baseURL}/anime`, "#popularAnime");

// Load Random Anime
fetchAnime(`${baseURL}/random`, "#randomAnime");
