import { object, string, number } from "yup";

export const validateOrder = async (Order) => {
  let orderSchema = object({
    details: object({
      factoryName: string().required(),
      styleNumber: string().required(),
      color: string().required(),
      quanitity: number().required().positive(),
      rate: number().required().positive(),
      total: number().required().positive(),
    }),
    driverName: string().required(),
    delivery_man: string().required(),
    van_number: string().required(),
    order_Status: string().required(),
  }).noUnknown(true);

  orderSchema
    .validate(Order, { strict: true })
    .then((value) => {
      return true;
    })
    .catch((err) => {
      console.log(err.message);
    });
};
