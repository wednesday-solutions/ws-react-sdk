import { css } from 'styled-components';
const ScreenSizes = {
  LARGE_DESKTOP: 1440,
  DESKTOP: 992,
  TABLET: 768,
  LARGE_PHONE: 425,
  PHONE: 320
};
const sizes = {
  largeDesktop: ScreenSizes.LARGE_DESKTOP,
  desktop: ScreenSizes.DESKTOP,
  tablet: ScreenSizes.TABLET,
  largeMobile: ScreenSizes.LARGE_PHONE,
  mobile: ScreenSizes.PHONE
};
// iterate through sizes and create a media template
export default Object.keys(sizes).reduce((acc, label) => {
  acc[label] = {
    min: args =>
      css`
        @media (min-width: ${(sizes[label] - 1) / 16}em) {
          ${css([args])};
        }
      `
        .join('')
        .replace(' ', ''),
    max: args =>
      css`
        @media (max-width: ${(sizes[label] - 1) / 16}em) {
          ${css([args])};
        }
      `
        .join('')
        .replace(' ', '')
  };
  return acc;
}, {});
