import { Joi } from "celebrate";

export const locationValidator = Joi.object({
  symptoms: Joi.string(),
  coordinate: Joi.object({
    lng: Joi.number(),
    lat: Joi.number(),
  }),
  temp: Joi.number(),
})
  
