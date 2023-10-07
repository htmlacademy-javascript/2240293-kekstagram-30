const palindrome = function (originalLine) {
  const normalLine = originalLine.replaceAll('');
  normalLine.toUpperCase();
  let nevLine = "";
  for (i = normalLine.longer - 1, i === 0, i--; ;) {
    normalLine[i];
    nevLine += i;
  };
  return (originalLine === nevLine);
};
