// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ["dist/*"],
    settings: {
      "import/resolver": {
        node: {
          extensions: [
            ".js",
            ".jsx",
            ".ts",
            ".tsx",
            ".json",
            ".css",
            ".scss",
            ".sass",
          ],
        },
      },
    },
    rules: {
      // Allow CSS imports without throwing unresolved errors
      "import/no-unresolved": [
        "error",
        {
          ignore: ["\\.css$", "\\.scss$", "\\.sass$", "\\.less$", "\\.styl$"],
        },
      ],
    },
  },
]);
