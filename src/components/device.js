const size = {
  mobileL: '640px',
  tablet: '768px',
  laptopL: '1024px',
  desktop: '1280px',
};

const device = {
  mobileL: `(min-width: ${size.mobileL})`,
  tablet: `(min-width: ${size.tablet})`,
  laptopL: `(min-width: ${size.laptopL})`,
  desktop: `(min-width: ${size.desktop})`,
};

export default device;
