(() => {
    function escapeRegExp(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }

    function isOfficeMentioned(text, office) {
        const cityRegex = new RegExp(`\\b${escapeRegExp(office.city)}\\b`, "gi");

        if (!office.qualifiers || office.qualifiers.length === 0) {
            return cityRegex.test(text);
        }

        const lowerText = text.toLowerCase();
        const qualifierRegexes = office.qualifiers.map(
            (qualifier) => new RegExp(`\\b${escapeRegExp(qualifier.toLowerCase())}\\b`, "i")
        );

        let match;
        while ((match = cityRegex.exec(text)) !== null) {
            const start = Math.max(0, match.index - 60);
            const end = Math.min(text.length, match.index + match[0].length + 60);
            const context = lowerText.slice(start, end);

            if (qualifierRegexes.some((regex) => regex.test(context))) {
                return true;
            }
        }

        return false;
    }

    function findMatchingOffices(text, offices) {
        return offices
            .filter((office) => isOfficeMentioned(text, office))
            .map((office) => office.city)
            .filter((city, index, allCities) => allCities.indexOf(city) === index);
    }

    window.RoviSysMatcher = {
        escapeRegExp,
        findMatchingOffices,
    };
})();
