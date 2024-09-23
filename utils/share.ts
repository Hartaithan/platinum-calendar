export const getRedditLink = (image: string, name: string | undefined) => {
  const link = new URL("https://www.reddit.com/web/r/Trophies/submit");
  link.searchParams.set("url", image);
  if (name) {
    link.searchParams.set("title", `[Showcase] ${name}'s Platinum Calendar`);
  } else {
    link.searchParams.set("title", "[Showcase] Platinum Calendar");
  }
  return link;
};
