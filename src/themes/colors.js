/**
 * This file contains the application's colors.
 *
 * Define color here instead of duplicating them throughout the components.
 * That allows to change them more easily later on.
 */

const primary = '#af0974'; // pawly-fuchsia
const text = '#212529';
const secondary = '#00244f'; // pawly-blue
const success = '#28a745';
const error = '#dc3545';
const white = '#ffffff';
const whiteSmoke = '#f7f9fa';
const carmine = 'rgba(175, 9, 116, 0.1)';
const colors = {
  carmine,
  whiteSmoke,
  transparent: 'rgba(0,0,0,0)',
  darkFuchsia: '#af0974',
  lightGray: '#DDDDDD',
  pawlyBlue: '#00244f',
  pawlyBlue0: 'rgba(0, 36, 79, 0.5)',
  blueBackground: '#f7f9fa',
  vetBlue: 'rgba(0,36,79,0.7)',
  paleWhite: 'rgba(255, 255, 255, 0.1)',
  black: '#000000',
  text,
  primary,
  secondary,
  success,
  error,
  white,
  theme: {
    lightMode: {
      primary,
      secondary
    },
    darkMode: {
      primary: secondary,
      secondary: primary
    }
  }
};
export default colors;
