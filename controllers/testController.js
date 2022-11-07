import { DateTime } from "luxon";

export const testController = async (req, res, next) => {
  const dt = DateTime.now().setZone("Asia/Dhaka").toISO();
  res.status(200).json({ date: dt });
};

// {arrival_date: {$gte: ISODate(startDate), $lte: ISODate(finishDate)} }
