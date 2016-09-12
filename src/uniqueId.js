let idCounter = 0;

export default function uniqueId(prefix = 'id_') {
  const id = ++idCounter;
  return prefix + id;
}
