export const circularProgressColor = (score) => {
  if (score <= 10 && score > 6) return "green";
  if (score <= 6 && score > 4) return "yellow";
  if (score < 4) return "red";
};
