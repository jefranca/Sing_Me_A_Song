import joi from "joi";

const recommendationsSchema = joi.object({
  name: joi.string().required().min(3),
  youtubeLink: joi
    .string()
    .pattern(
      /(http(?:s?):\/\/)?(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/
    )
    .max(255)
    .required(),
});

export { recommendationsSchema };
