function stringLength (line, maxLength) {
  return (line.length <= maxLength);
}

stringLength('проверяемая строка', 20);

function palindrome (originalLine) {
  let normalLine = originalLine.replaceAll(' ','');
  normalLine = normalLine.toUpperCase();
  let newLine = '';
  for (let i = normalLine.length - 1; i >= 0; i--) {
    newLine += normalLine[i];
  }

  return normalLine === newLine;
}

palindrome('топот');

function number (line) {
  line = line.toString();
  let newNumber = '';
  for (let i = 0; i <= line.length - 1; i++) {
    let symbol = '';
    symbol = parseInt(line[i], 10);
    if (Number.isNaN(symbol)) {
      continue;
    }
    newNumber += symbol;
  }
  if (Number(newNumber) <= 0) {
    return 'NaN';
  }
  return Number(newNumber);
}

number('Лёша на полке клопа нашёл ');

function isWorkingHours (gettingStarted, endWork, beginningMeeting, durationMeeting) {
  const arrayGettingStarted = gettingStarted.split(':');
  const arrayBeginningMeeting = beginningMeeting.split(':');
  if (Number(arrayGettingStarted[0]) <= Number(arrayBeginningMeeting[0])) {
    const endMeeting = `${parseInt(arrayBeginningMeeting[0], 10) + Math.floor (durationMeeting / 60)}:${parseInt(arrayBeginningMeeting[1], 10) + durationMeeting % 60}`;
    return endMeeting <= endWork;
  } else {
    return false;
  }
}

window.console.log(isWorkingHours('8:00', '17:30', '08:00', 900));
