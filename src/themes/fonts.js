import { css } from 'styled-components';
import media from '@themes/media';

// sizes
const dynamicFontSize = (font, largeDesktopDelta = 0, desktopDelta = 0, tabletDelta = 0) => css`
  ${font()}
  ${media.tablet.min(
    `font-size: ${tabletDelta +
      parseInt(
        font()[0]
          .replace('font-size:', '')
          .replace('rem;', '')
          .replace(/\s+/g, '')
      )}rem;`
  )};
  ${media.desktop.min(
    `font-size: ${desktopDelta +
      parseInt(
        font()[0]
          .replace('font-size:', '')
          .replace('rem;', '')
          .replace(/\s+/g, '')
      )}rem;`
  )};
  ${media.largeDesktop.min(
    `font-size: ${largeDesktopDelta +
      parseInt(
        font()[0]
          .replace('font-size:', '')
          .replace('rem;', '')
          .replace(/\s+/g, '')
      )}rem;`
  )};
`;

const regular = () => css`
  font-size: 1rem;
`;

const xRegular = () => css`
  font-size: 1.125rem;
`;
const small = () => css`
  font-size: 0.875rem;
`;
const xSmall = () => css`
  font-size: 0.75rem;
`;
const big = () => css`
  font-size: 1.25rem;
`;
const tiny = () => css`
  font-size: 0.625rem;
`;
const large = () => css`
  font-size: 1.5rem;
`;
const extraLarge = () => css`
  font-size: 1.875rem;
`;

// weights
const light = () => css`
  font-weight: 100;
`;
const bold = () => css`
  font-weight: 600;
`;

const fw600 = () =>
  css`
    font-weight: 600;
  `;
const normal = () => css`
  font-weight: 300;
`;

// styles
const heading = () => css`
  ${large()}
  ${bold()}
`;

const subheading = () => css`
  ${big()}
  ${bold()}
`;

const xRegularFW600 = () =>
  css`
    ${xRegular()};
    ${fw600}
  `;
const subTitleHeading = () => css`
  ${big()}
  ${fw600()}
`;

const standard = () => css`
  ${regular()}
  ${normal()}
`;

const subText = () => css`
  ${small()}
  ${normal()}
`;
const largeFW600 = () =>
  css`
    ${large()};
    ${fw600()}
  `;

const tinyNote = () => css`
  ${tiny()}
`;

const signUpStepBadge = () => css`
  ${xSmall()}
  ${bold()}
  line-height: 1.5;
  text-align: center;
`;

const formTitle = () => css`
  ${extraLarge()}
  ${bold()}
  line-height: 1.53;
  text-align: center;
`;

const custom = weight =>
  css`
    font-weight: ${weight};
  `;
const registrationFooter = () => css`
  ${xSmall()}
  ${normal()}
  line-height: 1.5;
  text-align: center;
`;

export default {
  dynamicFontSize,
  size: {
    regular,
    small,
    tiny,
    big,
    large,
    extraLarge,
    xRegular,
    xSmall
  },
  style: {
    heading,
    subheading,
    standard,
    subText,
    tinyNote,
    signUpStepBadge,
    formTitle,
    registrationFooter,
    subTitleHeading,
    xRegularFW600,
    largeFW600
  },
  weights: {
    light,
    bold,
    normal,
    custom,
    fw600
  }
};
