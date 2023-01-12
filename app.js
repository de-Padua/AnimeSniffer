const images_container = document.querySelector(".images");
const form = document.querySelector(".myForm");
const search_url = document.querySelector(".urlSearch");

class Data {
  async getDataFromImage() {
    const formData = new FormData(form);
    const result = await fetch("https://api.trace.moe/search", {
      method: "POST",
      body: formData,
    });
    const data = await result.json();
    const anime = data.result.map((item) => {
      console.log(item);
      const { image, video, filename, anilist, similarity, episode } = item;
      return { image, video, filename, anilist, similarity, episode };
    });
    return anime;
  }
  async getDataFromUrl(url) {
    const result = await fetch(
      `https://api.trace.moe/search?url=${encodeURIComponent(url)}`
    );
    const data = await result.json();
    const anime = data.result.map((item) => {
      console.log(item);
      const { image, video, filename, anilist, similarity, episode } = item;
      return { image, video, filename, anilist, similarity, episode };
    });
    return anime;
  }
}
class UI {
  displayAnime(animes) {
    images_container.innerHTML = "";
    animes.forEach((anime) => {
      images_container.innerHTML += `
      <div class="anime">
                    <div class="header-anime">
                        <span>Anilist:${anime.anilist}</span>
                        <span>Probability :${this.formatAsPercentage(
                          anime.similarity
                        )}</span>
                    </div>
                     <div class="body-anime">
                        <img src="${anime.image}" alt="" class="img">
                        <h3>${anime.filename}</h3>
                        <p>Episode ${anime.episode}</p>
                     </div>
                </div>
      `;
    });
  }
  formatAsPercentage(num) {
    return new Intl.NumberFormat("default", {
      style: "percent",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num / 1);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const ui = new UI();
  const data = new Data();

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (search_url.value === "") {
      data.getDataFromImage().then((data) => {
        ui.displayAnime(data);
      });
    } else {
     
      data.getDataFromUrl(search_url.value).then((data) => {
        ui.displayAnime(data);
      });
      
    }
  });
});
