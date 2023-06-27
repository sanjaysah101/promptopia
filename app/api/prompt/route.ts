import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (request: Request) => {
  try {
    await connectToDB();
    const prompts = await Prompt.find({}).populate('creator');
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to Fetch all prompts", { status: 500 });
  }
};
