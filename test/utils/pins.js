import stringToColor from '../../src/stringToColor';

export const getRandomColor = () => stringToColor(`${Math.floor(Math.random() * 10000)}`);

export const classicPins = Array.from({ length: 20 }).map((_, i) => ({
  name: `foo ${i}`,
  height: Math.floor(Math.random() * 200) + 300,
  color: getRandomColor(),
}));

export const boxPackingPins = Array.from({ length: 20 }).map((_, i) => {
  const r = Math.random();
  let colSpan;
  if (r > 0.95) colSpan = 4;
  else if (r > 0.9) colSpan = 3;
  else if (r > 0.7) colSpan = 2;
  else colSpan = 1;
  return {
    name: `foo ${i}`,
    height: Math.floor(Math.random() * 200) + 300,
    color: getRandomColor(),
    colSpan,
  };
});
