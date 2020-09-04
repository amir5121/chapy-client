const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "#fb3958",
              "@body-background": "#EEEEEE",
              "@layout-header-background": "#fff",
              "typography-title-margin-bottom": 0,
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
