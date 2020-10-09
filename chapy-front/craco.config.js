const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "#E1306C",
              "@body-background": "#EEEEEE",
              "@layout-header-background": "#fff",
              "@typography-title-margin-bottom": 0,
              "@page-header-padding": '8px',
              "@page-header-padding-vertical": '12px',
              // "@layout-header-padding": '0 8px',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
