import { User } from "../models/user.model.js";
import { handleValidationError } from "../utils/handleValidationError.js";
import { userSchema } from "../validation/validation.js";

export const authCallback = async (req, res, next) => {
  try {
    const parsed = userSchema.parse(req.body);
    const { id, firstName, lastName, imageUrl } = parsed;

    const existingUser = await User.findOne({ clerkId: id });

    if (!existingUser) {
      const nameParts = [];
      if (firstName) nameParts.push(firstName);
      if (lastName) nameParts.push(lastName);
      const fullName = nameParts.join(" ");

      await User.create({
        clerkId: id,
        fullName,
        imageUrl,
      });
    }

    res.status(201).json({ success: true });
  } catch (error) {
    const result = handleValidationError(error, res);
    if (!result) next(error);
  }
};
