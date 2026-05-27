(() => {
    const CITIES = ["Kalamazoo", "Cleveland", "Houston", "Chicago", "Boston"];

    const MAPS_LINKS = {
        kalamazoo: "https://www.google.com/maps/search/RoviSys+Kalamazoo",
        cleveland: "https://www.google.com/maps/search/RoviSys+Cleveland",
        houston: "https://www.google.com/maps/search/RoviSys+Houston",
        chicago: "https://www.google.com/maps/search/RoviSys+Chicago",
        boston: "https://www.google.com/maps/search/RoviSys+Boston",
    };

    const pageText = document.body.innerText;
    const foundCities = CITIES.filter((city) =>
        new RegExp(`\\b${city}\\b`, "i").test(pageText)
    );

    if (foundCities.length === 0) return;

    // Highlight matched cities in the page
    highlightCities(foundCities);

    // Inject animation styles
    const style = document.createElement("style");
    style.textContent = `
      @keyframes rovisys-pop-in {
        0% { transform: translate(-50%, -50%) scale(0.7); opacity: 0; }
        70% { transform: translate(-50%, -50%) scale(1.05); opacity: 1; }
        100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
      }
      @keyframes rovisys-fade-bg {
        from { opacity: 0; }
        to { opacity: 1; }
      }
    `;
    document.head.appendChild(style);

    // Build overlay backdrop
    const overlay = document.createElement("div");
    overlay.id = "rovisys-city-overlay";
    Object.assign(overlay.style, {
        position: "fixed",
        top: "0",
        left: "0",
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.5)",
        zIndex: "99998",
        animation: "rovisys-fade-bg 0.3s ease-out forwards",
    });

    // Build popup
    const popup = document.createElement("div");
    popup.id = "rovisys-city-popup";

    const cityLines = foundCities.map((city) => {
        const key = city.toLowerCase();
        return `<div style="margin-bottom:8px;">🏢 RoviSys has an office in <strong>${city}</strong>! <a href="${MAPS_LINKS[key]}" target="_blank" rel="noopener noreferrer" style="color:#4fc3f7;margin-left:4px;">📍 Map</a></div>`;
    });

    popup.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
        <span style="font-size:16px;font-weight:bold;">🔔 RoviSys Office Detected!</span>
        <button id="rovisys-close-btn" style="background:none;border:none;color:#aaa;font-size:20px;cursor:pointer;padding:0 4px;">✕</button>
      </div>
      ${cityLines.join("")}
    `;

    Object.assign(popup.style, {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%) scale(0.7)",
        background: "#111",
        color: "white",
        padding: "20px 24px",
        borderRadius: "12px",
        boxShadow: "0 8px 30px rgba(0,0,0,0.5)",
        fontSize: "14px",
        zIndex: "99999",
        fontFamily: "system-ui, sans-serif",
        maxWidth: "400px",
        minWidth: "280px",
        animation: "rovisys-pop-in 0.4s ease-out forwards",
    });

    document.body.appendChild(overlay);
    document.body.appendChild(popup);

    // Close handler
    const dismiss = () => {
        popup.remove();
        overlay.remove();
    };
    popup.querySelector("#rovisys-close-btn").addEventListener("click", dismiss);
    overlay.addEventListener("click", dismiss);

    function highlightCities(cities) {
        const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT,
            null
        );

        const pattern = new RegExp(
            `\\b(${cities.map(escapeRegExp).join("|")})\\b`,
            "gi"
        );

        const nodesToReplace = [];
        while (walker.nextNode()) {
            const node = walker.currentNode;
            if (
                node.parentElement &&
                !["SCRIPT", "STYLE", "NOSCRIPT", "TEXTAREA", "INPUT"].includes(
                    node.parentElement.tagName
                ) &&
                pattern.test(node.nodeValue)
            ) {
                nodesToReplace.push(node);
            }
            pattern.lastIndex = 0;
        }

        for (const node of nodesToReplace) {
            const span = document.createElement("span");
            span.innerHTML = node.nodeValue.replace(
                pattern,
                '<mark style="background:#ffe082;padding:0 2px;border-radius:3px;">$1</mark>'
            );
            node.parentElement.replaceChild(span, node);
        }
    }

    function escapeRegExp(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }
})();
