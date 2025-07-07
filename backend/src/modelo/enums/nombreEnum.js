export function nombreEnum(enumObj, valor) {
  return Object.keys(enumObj).find(key => enumObj[key] === valor && typeof enumObj[key] === 'number');
}
