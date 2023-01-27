import { DateTime } from "luxon";

export const testController = async (req, res, next) => {
  const dt = DateTime.now().setZone("Asia/Dhaka").toISO();
  res.status(200).json({ date: dt });
};

const fixArray = (arr) => {
  const sortedArr = arr.sort((a, b) => a - b);
  const fixedArr = [];
  sortedArr.forEach((item) => {
    if (!fixedArr.includes(item)) {
      fixedArr.push(item);
    }
  });
  return fixedArr;
};

// {arrival_date: {$gte: ISODate(startDate), $lte: ISODate(finishDate)} }
