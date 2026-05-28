(() => {
    function buildCityLine(city) {
        const mapLink = `https://www.google.com/maps/search/${encodeURIComponent(`RoviSys ${city}`)}`;
        return `<div class="rovisys-city-row">🏢 RoviSys has an office in <strong>${city}</strong>! <a href="${mapLink}" target="_blank" rel="noopener noreferrer" class="rovisys-map-link">📍 Map</a></div>`;
    }

    function renderPopup(cities) {
        if (!cities || cities.length === 0) return;
        if (document.getElementById("rovisys-city-popup")) return;

        const overlay = document.createElement("div");
        overlay.id = "rovisys-city-overlay";
        overlay.className = "rovisys-overlay";

        const popup = document.createElement("div");
        popup.id = "rovisys-city-popup";
        popup.className = "rovisys-popup";

        popup.innerHTML = `
            <div class="rovisys-popup-header">
                <span class="rovisys-popup-title">RoviSys Office Detected</span>
                <button id="rovisys-close-btn" class="rovisys-close-btn" aria-label="Close notification">x</button>
            </div>
            ${cities.map(buildCityLine).join("")}
        `;

        document.body.appendChild(overlay);
        document.body.appendChild(popup);

        const dismiss = () => {
            popup.remove();
            overlay.remove();
        };

        popup.querySelector("#rovisys-close-btn").addEventListener("click", dismiss);
        overlay.addEventListener("click", dismiss);
    }

    window.RoviSysUI = {
        renderPopup,
    };
})();
