declare const SanitizeHtmlService: {
    sanitizeHtml: (dirtyHtml: string) => Promise<string>;
};
export default SanitizeHtmlService;
