import { TopicsPayload } from "@/types/topic";

// start ------------------------------ generate ------------------------------
export const generate = async (topicsPayload: TopicsPayload) => {
  try {
    const generateUri = `${import.meta.env.VITE_APP_USER_BACKEND_MODEL_URL}/generate-questions`;
    console.log(generateUri);
    const generateResponse = await fetch(generateUri, {
      method: "POST",
      body: JSON.stringify(topicsPayload),
      headers: {
        "Content-Type": "application/json",
        "x-api-key": import.meta.env.VITE_APP_API_KEY,
      },
      credentials: "include",
      mode: "cors",
    });
    console.log(generateResponse);

    return generateResponse;
  } catch (error) {
    console.error("Auth generate error - model.server.tsx", error);
    throw new Error("Backend Server did not respond correctly");
  }
};
// end ------------------------------ signup ------------------------------