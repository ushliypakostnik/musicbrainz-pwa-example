import { createGlobalStyle } from 'styled-components';

const lineHeightStandart = 1.428571429;

const GUIDELINE = {
  // Sizes and layouts
  gutter: 20,

  // Media breackpoints
  breackpoint_mg: '1700px',
  breackpoint_xl_max: '1699px',
  breackpoint_xl: '1400px',
  breackpoint_lg_max: '1399px',
  breackpoint_lg: '1250px',
  breackpoint_md_max: '1249px',
  breackpoint_md: '1050px',
  breackpoint_sm_max: '1049px',
  breackpoint_sm: '761px',
  breackpoint_xs_max: '760px',
  breackpoint_xs: '460px',
  breackpoint_min: '320px',

  // Colors
  color_white: '#ffffff',
  color_black: '#000000',

  color_light: '#fafafa',

  color_text: '#6c7a89',

  color_border: '#eff2f5',

  // Typography
  fontfamily_sans: 'sans-serif',
  fontweight_sans_regular: 400,
  fontweight_sans_bold: 700,
  letterspacing_normal: 'normal',

  fontsize_large: 20,
  fontsize_normal: 16,
  fontsize_small: 14,

  // Effects
  transition_duration: '0.2s',
  transition_timingfunction: 'linear',
}

Object.assign(GUIDELINE, {
  color_link: GUIDELINE.color_text,
  color_link_hover: GUIDELINE.color_text,
  color_placeholder: GUIDELINE.color_border,

  // Good line height for all font sizes
  lineheight_large: Math.round(GUIDELINE.fontsize_large * lineHeightStandart),
  lineheight_normal: Math.round(GUIDELINE.fontsize_normal * lineHeightStandart),
  lineheight_small: Math.round(GUIDELINE.fontsize_small * lineHeightStandart),
});

Object.assign(GUIDELINE, {
  color_link: GUIDELINE.color_text,
  color_link_hover: GUIDELINE.color_text,
});

// console.log(GUIDELINE);

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0
    padding: 0;
    color: ${GUIDELINE.color_text};
    background-color: ${GUIDELINE.color_white};
    font-family:  ${GUIDELINE.fontfamily_sans};
    font-size:  ${GUIDELINE.fontsize_small}px;
    line-height: ${GUIDELINE.lineheight_small}px;
    letter-spacing: ${GUIDELINE.letterspacing_normal};
    overflow-x: hidden;
    backface-visibility: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a {
    color: ${GUIDELINE.color_link};
    text-decoration: none;

    &:hover {
      color: ${GUIDELINE.color_link_hover};
    }
  }

  ul {
    padding-left: 0;
    list-style: none;
  }

  button,
  input,
  textarea,
  select,
  a {
    outline: none !important;

    &:hover,
    &:active,
    &:focus {
      outline: none !important;
    }
  }

  // Placeholders
  ::-webkit-input-placeholder,
  ::-moz-placeholder,
  :-moz-placeholder,
  :-ms-input-placeholder {
    color: ${GUIDELINE.color_placeholder};
  }

  img {
    border-style: none; // Remove the border on images inside links in IE 10.
  }

  button,
  input {
    overflow: visible; // Show the overflow in Edge
  }

  button,
  select {
    text-transform: none; // Remove the inheritance of text transform in Firefox.
  }

  textarea {
    overflow: auto; // Remove the default vertical scrollbar in IE 10+.
  }
`

export default GUIDELINE;
