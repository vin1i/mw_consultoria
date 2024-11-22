import { createGlobalStyle } from 'styled-components';
import LatoBold from '../assets/fonts/Lato-Bold.ttf';
import LatoExtraLight from '../assets/fonts/Lato-ExtraLight.ttf';
import LatoLight from '../assets/fonts/Lato-Light.ttf';
import LatoRegular from '../assets/fonts/Lato-Regular.ttf';
import MyriadProCondensed from '../assets/fonts/Myriad Pro Condensed.ttf';
import MyriadProLightCondensed from '../assets/fonts/Myriad Pro Light Condensed.otf';

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
        overflow-x: hidden;
        font-size: var(--font-size-large);
        font-weight: 400;
        font-family: 'Lato', 'Myriad Pro Condensed', sans-serif;

        p, h2 {
            line-height: 1.6;
        }
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

    /* Media Queries */
    @media (max-width: 768px) {
        body {
            font-size: var(--font-size-medium);
        }

        p, h2 {
            line-height: 1.5;
        }
    }

    @media (max-width: 480px) {
        body {
            font-size: var(--font-size-small);
        }

        p, h2 {
            line-height: 1.4;
        }
    }
`;
