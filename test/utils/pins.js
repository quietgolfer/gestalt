const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i += 1) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const classicPins = Array.from({ length: 20 }).map((_, i) => ({
  name: `foo ${i}`,
  height: 200 + i,
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
    height: 200 + i,
    color: getRandomColor(),
    colSpan,
  };
});
