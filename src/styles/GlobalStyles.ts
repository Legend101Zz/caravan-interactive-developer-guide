import { createGlobalStyle } from "styled-components";
import "@fontsource/roboto";
import "@fontsource/playfair-display";

export const GlobalStyles = createGlobalStyle`
  body {
    font-family: ${(props) => props.theme.fonts.body};
    background-color: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.text};
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${(props) => props.theme.fonts.heading};
  }
`;
