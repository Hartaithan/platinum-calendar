"use server";

export const fetchPage = async (url: URL): Promise<string | null> => {
  try {
    const request = await fetch(url);
    const contentType = request.headers.get("content-type");
    const isJSON = contentType && contentType.includes("application/json");
    const response = isJSON ? await request.json() : await request.text();
    if (!request.ok) throw Error(response?.message ?? "Unknown error");
    return response;
  } catch (error) {
    console.error("unable to fetch data", url.toString(), error);
    return null;
  }
};
