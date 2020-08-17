import sanitizeHtml from "sanitize-html";
const params = {
  allowedTags: [
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "b",
    "i",
    "em",
    "strong",
    "a",
    "u",
    "ol",
    "ul",
    "li",
    "p",
  ],
  allowedAttributes: {
    a: ["href"],
  },
  allowedIframeHostnames: ["www.youtube.com"],
};

export const sanitize = (html) => sanitizeHtml(html, params);

export default sanitize;
