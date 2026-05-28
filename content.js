(() => {
    if (!document.body) return;

    const offices = window.RoviSysOffices || [];
    const matcher = window.RoviSysMatcher;
    const highlighter = window.RoviSysHighlighter;
    const ui = window.RoviSysUI;

    if (!matcher || !highlighter || !ui) return;

    const pageText = document.body.innerText || "";
    const foundCities = matcher.findMatchingOffices(pageText, offices);

    if (foundCities.length === 0) return;

    highlighter.highlightCities(foundCities, matcher.escapeRegExp);
    ui.renderPopup(foundCities);
})();
