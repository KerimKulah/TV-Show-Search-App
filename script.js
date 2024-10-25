const form = document.querySelector("#searchForm");
const imgDiv = document.querySelector("#imgDiv");

form.addEventListener("submit", async (e) => {
    imgDiv.innerHTML = ""; // Önceki arama sonuçlarını temizler
    e.preventDefault();
    const searchBar = form.elements.searchBar.value;

    try {
        const res = await axios.get(`http://api.tvmaze.com/search/shows?q=${searchBar}`);

        for (const result of res.data) {
            if (result.show.image) {
                // Kart yapısı oluşturma
                const col = document.createElement("div");
                col.classList.add("mb-4");

                const card = document.createElement("div");
                card.classList.add("bg-white", "rounded-lg", "shadow-md", "overflow-hidden", "transition", "transform", "hover:scale-105");

                const img = document.createElement("img");
                img.src = result.show.image.medium;
                img.classList.add("w-full", "h-full", "object-cover", "rounded-t-lg");

                const cardBody = document.createElement("div");
                cardBody.classList.add("p-4");

                const title = document.createElement("h5");
                title.innerText = result.show.name;
                title.classList.add("text-lg", "font-semibold", "text-gray-800", "text-center");

                // Kart yapısını oluştur
                cardBody.append(title);
                card.append(img);
                card.append(cardBody);
                col.append(card);
                imgDiv.append(col);
            }
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        const errorMsg = document.createElement("p");
        errorMsg.classList.add("text-red-500", "mt-4");
        errorMsg.innerText = "Sorry, an error occurred while fetching the TV shows.";
        imgDiv.append(errorMsg);
    }
});
