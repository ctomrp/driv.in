export const getRandomLocation = () => {
  const latitude = -33.478388 + Math.random() * 0.1 - 0.05;
  const longitude = -70.5474423 + Math.random() * 0.1 - 0.05;
  return [latitude, longitude];
};