import Vazir from '../../assets/fonts/Vazir/Vazir.woff2';
import VazirThin from '../../assets/fonts/Vazir/Vazir-Thin.woff2';
import VazirLight from '../../assets/fonts/Vazir/Vazir-Light.woff2';
import VazirMedium from '../../assets/fonts/Vazir/Vazir-Medium.woff2';
import VazirBold from '../../assets/fonts/Vazir/Vazir-Bold.woff2';
import VazirBlack from '../../assets/fonts/Vazir/Vazir-Black.woff2';

const vazir = {
  fontFamily: 'Vazir',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `
    local('Vazir'),
    local('Vazir'),
    url(${Vazir}) format('woff2')
  `,
};

const vazirThin = {
  fontFamily: 'Vazir',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 100,
  src: `
    local('Vazir'),
    local('Vazir-Thin'),
    url(${VazirThin}) format('woff2')
  `,
};

const vazirLight = {
  fontFamily: 'Vazir',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 300,
  src: `
    local('Vazir'),
    local('Vazir-Light'),
    url(${VazirLight}) format('woff2')
  `,
};

const vazirMedium = {
  fontFamily: 'Vazir',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 500,
  src: `
    local('Vazir'),
    local('Vazir-Medium'),
    url(${VazirMedium}) format('woff2')
  `,
};

const vazirBold = {
  fontFamily: 'Vazir',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 700,
  src: `
    local('Vazir'),
    local('Vazir-Bold'),
    url(${VazirBold}) format('woff2')
  `,
};

const vazirBlack = {
  fontFamily: 'Vazir',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `
    local('Vazir'),
    local('Vazir-Black'),
    url(${VazirBlack}) format('woff2')
  `,
};

export default {
  vazir,
  vazirThin,
  vazirLight,
  vazirMedium,
  vazirBold,
  vazirBlack
}
