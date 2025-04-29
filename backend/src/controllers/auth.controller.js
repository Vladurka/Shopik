import { User } from "../models/user.model.js";

export const authCallback = async (req, res, next) => {
  try {
    const { id, firstName, lastName, imageUrl } = req.body;

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
    next(error);
  }
};
