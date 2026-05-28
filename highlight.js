(() => {
    function highlightCities(cities, escapeRegExp) {
        if (!cities || cities.length === 0) return;

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
            const parent = node.parentElement;

            if (!parent) continue;
            if (["SCRIPT", "STYLE", "NOSCRIPT", "TEXTAREA", "INPUT"].includes(parent.tagName)) continue;
            if (parent.closest("#rovisys-city-popup") || parent.closest("#rovisys-city-overlay")) continue;

            if (pattern.test(node.nodeValue)) {
                nodesToReplace.push(node);
            }
            pattern.lastIndex = 0;
        }

        for (const node of nodesToReplace) {
            const span = document.createElement("span");
            span.innerHTML = node.nodeValue.replace(
                pattern,
                '<mark class="rovisys-city-highlight">$1</mark>'
            );
            node.parentElement.replaceChild(span, node);
        }
    }

    window.RoviSysHighlighter = {
        highlightCities,
    };
})();
