import theme from "daisyui/src/theming/themes";

const daisyUIConfig = () => {
  return {
    themes: [
      {
        light: {
          ...theme.winter,

          "--rounded-box": "0.25rem",
          "--rounded-btn": "0.25rem",
          "--padding-card": "20px",

          "--main-content-background": "#f2f5f8",
          "--leftmenu-background": "#ffffff",
          "--topbar-background": "#ffffff",
        },
      },
    ],
  };
};

export { daisyUIConfig };
