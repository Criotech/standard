const sanitizeHtml = async (dirtyHtml) => {
    const { default: sanitize } = await import("sanitize-html");
    return sanitize(dirtyHtml, {
        allowedTags: [
            "b",
            "i",
            "em",
            "strong",
            "a",
            "p",
            "ul",
            "li",
            "div",
            "br",
            "hr",
        ],
        allowedAttributes: {
            a: ["href", "target"],
        },
    });
};
const SanitizeHtmlService = {
    sanitizeHtml,
};
export default SanitizeHtmlService;
