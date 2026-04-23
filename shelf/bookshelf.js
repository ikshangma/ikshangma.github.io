document.addEventListener("DOMContentLoaded", () => {
  // Prevent double-execution if Live Server injects the script twice
  if (window.bookshelfLoaded) return;
  window.bookshelfLoaded = true;

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const tbrGrid = document.getElementById("tbr-grid");
  const extensions = ["webp", "jpg", "jpeg", "png"];

  async function loadTBRGrid() {
    let index = 1;
    let keepSearching = true;

    while (keepSearching) {
      let foundUrl = null;

      for (const ext of extensions) {
        const url = `_${index}.${ext}`;
        try {
          const response = await fetch(url);
          const contentType = response.headers.get("content-type");

          // Strictly verify the response is successful AND is actually an image file
          if (response.ok && contentType && contentType.includes("image")) {
            foundUrl = url;
            break;
          }
        } catch (error) {
          // Network error (e.g., file strictly not found), ignore and continue checking
        }
      }

      if (foundUrl) {
        const card = document.createElement("div");
        card.className = "book-card fade-in";

        const img = document.createElement("img");
        img.src = foundUrl;
        img.alt = `TBR Book ${index}`;
        img.loading = "lazy";

        card.appendChild(img);
        tbrGrid.appendChild(card);

        index++;
      } else {
        keepSearching = false;
        if (index === 1) {
          tbrGrid.innerHTML =
            '<p style="color: var(--fg-muted); font-style: italic; font-size: 0.9rem;">No TBR books found.</p>';
        }
      }
    }
  }

  loadTBRGrid();
});
