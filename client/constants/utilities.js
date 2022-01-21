export const generateRandomInteger = () => {
  const max = 100;
  const min = 0;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
//======================================================
export const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}