// NOTE: Keep in sync with src/i18n & next.config.js
/** @type {import('@lingui/conf').LinguiConfig} */
const linguiConfig = {
  locales: ["en-US"],
  sourceLocale: "en-US",
  fallbackLocales: {
    default: "en-US",
  },
  catalogs: [
    {
      path: "translations/locales/{locale}/messages",
      include: ["src"],
    },
  ],
  compileNamespace: "ts",
  format: "po",
};

module.exports = linguiConfig;
