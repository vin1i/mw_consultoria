import { createGlobalStyle } from "styled-components";
import LatoBold from "../assets/fonts/Lato-Bold.ttf";
import LatoExtraLight from "../assets/fonts/Lato-ExtraLight.ttf";
import LatoLight from "../assets/fonts/Lato-Light.ttf";
import LatoRegular from "../assets/fonts/Lato-Regular.ttf";
import MyriadProCondensed from "../assets/fonts/Myriad Pro Condensed.ttf";
import MyriadProLightCondensed from "../assets/fonts/Myriad Pro Light Condensed.otf";

export default createGlobalStyle`
    @font-face {
        font-family: 'Lato';
        src: url(${LatoBold}) format('truetype');
        font-weight: bold;
    }
    @font-face {
        font-family: 'Lato';
        src: url(${LatoExtraLight}) format('truetype');
        font-weight: 200;
    }
    @font-face {
        font-family: 'Lato';
        src: url(${LatoLight}) format('truetype');
        font-weight: 300;
    }
    @font-face {
        font-family: 'Lato';
        src: url(${LatoRegular}) format('truetype');
        font-weight: normal;
    }
    @font-face {
        font-family: 'Myriad Pro';
        src: url(${MyriadProCondensed}) format('truetype');
        font-weight: normal;
        font-stretch: condensed;
    }
    @font-face {
        font-family: 'Myriad Pro';
        src: url(${MyriadProLightCondensed}) format('truetype');
        font-weight: 300;
        font-stretch: condensed;
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    :root {
        --white: #FFFFFF;
        --black: #333333;
        --grey: #E6E6E6;
        --red: #9C192B;
        --dark-red: #6B0D1A;
        --light-green: #32D951;

        --font-size-large: 1.2rem;
        --font-size-medium: 1rem;
        --font-size-small: 0.9rem;
    }

    body {
        background-color: var(--white);
        color: var(--black);
        font-size: var(--font-size-large);
        font-weight: 400;
        font-family: 'Lato', 'Myriad Pro Condensed', sans-serif;
        overflow-x: hidden;
    }

    html, body, #root {
        height: 100%;
        width: 100%;
        overflow-x: hidden;
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }

    img {
        max-width: 100%;
        height: auto;
        display: block;
    }

    ul {
        list-style: none;
    }

    a {
        text-decoration: none;
    }

    /* Estilização do Scrollbar */
    ::-webkit-scrollbar {
        width: 8px; /* Largura da barra de rolagem */
    }

    ::-webkit-scrollbar-track {
        background: transparent; /* Fundo transparente */
    }

    ::-webkit-scrollbar-thumb {
        background-color: var(--red); /* Cor da barra */
    }

    ::-webkit-scrollbar-thumb:hover {
        background-color: var(--dark-red); /* Cor ao passar o mouse */
    }

    ::-webkit-scrollbar-corner {
        background: transparent; /* Remove canto inferior em telas pequenas */
    }

    /* Media Queries */
    @media (max-width: 768px) {
        ::-webkit-scrollbar {
            display: none; /* Oculta a barra de rolagem no Chrome, Safari e Edge */
        }

        -ms-overflow-style: none; /* Oculta a barra no IE e Edge */
        scrollbar-width: none; /* Oculta a barra no Firefox */

        body {
            font-size: var(--font-size-medium);
            padding: 0 10px; /* Garante espaçamento lateral em telas pequenas */
        }

        h1, h2, h3 {
            font-size: 1.2em; /* Ajusta o tamanho dos headings */
        }

        p {
            font-size: var(--font-size-medium);
        }
    }

    @media (max-width: 480px) {
        ::-webkit-scrollbar {
            display: none; /* Oculta a barra de rolagem no Chrome, Safari e Edge */
        }

        -ms-overflow-style: none; /* Oculta a barra no IE e Edge */
        scrollbar-width: none; /* Oculta a barra no Firefox */

        body {
            font-size: var(--font-size-small);
            padding: 0 5px;
        }

        h1, h2, h3 {
            font-size: 1em;
        }

        img {
            max-width: 100%;
            height: auto;
        }

        button {
            font-size: var(--font-size-small);
            padding: 10px 15px; /* Reduz tamanho de botões */
        }
    }
`;
