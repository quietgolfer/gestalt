// Generate a semi-random color based on
// a string from a specified list of colors
// e.g. 'Julia' returns '#a9ba95'

export const colorList = [
  'b1abbe', 'ada6bb', 'a69eb7', 'a8a4ae', 'aea8b8',
  'afa7ba', 'b5afbf', 'bfb8ca', 'aaa3b4', 'b8b4bf',
  'a2bcc4', '8ea8b0', 'a2b5ba', '9ca9ad', 'a4b7bc',
  '93b6c1', 'a7b8bd', 'b4cad0', 'b1bdc0', 'a5bbc2',
  'bed1a8', 'a9ba95', 'a7b299', '949a8d', 'b6c4a7',
  'a7b597', 'aeb7a4', 'a1a79a', '9fa994', 'a9ba97',
  'cbc4a9', 'c7bd94', 'd5c99a', 'c2bf9d', 'c2ba9d',
  'c0b68d', 'c5bc97', 'c2bb9f', 'bebbaf', 'c9bf99',
  'c9b499', 'c2aa8d', 'd1bca2', 'c6aa86', 'd7c5a7',
  'c2b195', 'd5c3a4', 'd3be9c', 'c0b19a', 'cfbfa4',
  'd3b3ab', 'bf9d94', 'caa89e', 'd19e90', 'd4b6ae',
  'ceaba1', 'dbb6ab', 'e8bcaf', 'e6a299', 'c99e92'];

export default function stringToColor(input = '') {
  if (input === '') {
    return '#efefef';
  }

  // Generate a hash based on the input string
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = input.charCodeAt(i) + ((hash << 5) - hash); // eslint-disable-line no-bitwise
  }

  // Take the modulo based on the hash & length of the specified list of colors
  const mod = hash % colorList.length;

  return `#${colorList[mod]}`;
}
