import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { createOrUpdateUser, deleteUser } from "@/lib/actions/user";

export async function POST(req) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET;
  if (!SIGNING_SECRET) {
    console.error("Error: SIGNING_SECRET is missing from environment variables.");
    return new Response("Error: Missing SIGNING_SECRET", { status: 500 });
  }

  // Initialize Svix Webhook instance
  const wh = new Webhook(SIGNING_SECRET);

  // Retrieve headers safely
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error("Error: Missing Svix headers");
    return new Response("Error: Missing Svix headers", { status: 400 });
  }

  try {
    // Parse and verify request body
    const body = await req.text(); // Use raw body instead of JSON
    const evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });

    const eventType = evt.type;
    console.log(`Received webhook with event type: ${eventType}`);
    console.log("Webhook payload:", JSON.stringify(evt.data, null, 2));

    if (eventType === "user.created" || eventType === "user.updated") {
      const { id, first_name, last_name, image_url, email_addresses, username } = evt?.data;
      try {
        await createOrUpdateUser(id, first_name, last_name, image_url, email_addresses, username);
        return new Response("User is created or updated", { status: 200 });
      } catch (err) {
        console.error("Error creating or updating user:", err);
        return new Response("Error occurred", { status: 500 });
      }
    }

    if (eventType === "user.deleted") {
      try {
        const { id } = evt?.data;
        await deleteUser(id);
        return new Response("User is deleted", { status: 200 });
      } catch (err) {
        console.error("Error deleting user:", err);
        return new Response("Error occurred", { status: 500 });
      }
    }
  } catch (error) {
    console.error("Error processing webhook:", error);
    return new Response("Error processing webhook", { status: 400 });
  }
}

import User from "../models/User";
import { connectToDB } from "../mongodb/mongoose";

export const createOrUpdateUser = async (id, first_name, last_name, image_url, email_addresses, username) => {
  try {
    await connectToDB();

    const user = await User.findOneAndUpdate(
      { clerkId: id },
      {
        $set: {
          firstName: first_name,
          lastName: last_name,
          profilePhoto: image_url,
          email: email_addresses[0]?.email_address || "", // Ensure email extraction is safe
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
