import User from "../models/User";
import { connectToDB } from "../mongodb/mongoose";

export const createOrUpdateUser = async (id, first_name, last_name, image_url, email, username) => {
  try {
    await connectToDB();

    const user = await User.findOneAndUpdate(
      { clerkId: id },
      {
        $set: {
          firstName: first_name,
          lastName: last_name,
          profilePhoto: image_url,
          email: email, // Directly passing extracted email
          username: username,
        },
      },
      { upsert: true, new: true }
    );

    return user;
  } catch (error) {
    console.error("Error in createOrUpdateUser:", error);
    throw error; // Ensure errors are properly caught in the calling function
  }
};
export const deleteUser = async (id) => {
  try {
    await connectToDB();
    console.log(`Deleting user with ID: ${id}`);
    await User.findOneAndDelete({ clerkId: id });
  } catch (error) {
    console.error("Error in deleteUser:", error);
    throw error;
  }
};
