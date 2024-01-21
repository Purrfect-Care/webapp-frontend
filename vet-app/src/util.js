import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
dayjs.extend(isoWeek);

export function getMonth(month = dayjs().month()) {
  month = Math.floor(month);
  const year = dayjs().year();
  const firstDayOfTheMonth = dayjs(new Date(year, month, 1)).day();

  let currentMonthCount = 1 - firstDayOfTheMonth;

  const daysMatrix = new Array(5).fill([]).map(() => {
    return new Array(7).fill(null).map(() => {
      currentMonthCount++;
      return dayjs(new Date(year, month, currentMonthCount));
    });
  });
  return daysMatrix;
}

export function getWeek(year = dayjs().year(), week = dayjs().isoWeek()) {
  const startOfWeek = dayjs().year(year).isoWeek(week).startOf("isoWeek");
  const daysArray = Array.from({ length: 7 }, (_, i) =>
    startOfWeek.add(i, "day")
  );
  return daysArray;
}
