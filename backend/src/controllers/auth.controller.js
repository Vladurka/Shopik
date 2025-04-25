import { User } from "../models/user.model.js";

export const authCallback = async (req, res, next) => {
  try {
    console.log("BODY:", req.body); // idk why, but the code doesn't work without this
    const { id, firstName, lastName, imageUrl } = req.body;

    const existingUser = await User.findOne({ clerkId: id });

    if (!existingUser) {
      await User.create({
        clerkId: id,
        fullName: `${firstName} ${lastName}`,
        imageUrl,
      });
    }

    res.status(201).json({ success: true });
  } catch (error) {
    console.error("Error in authCallback:", error); // idk why, but the code doesn't work without this
    next(error);
  }
};
