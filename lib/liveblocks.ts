import { Liveblocks } from "@liveblocks/node";

let liveblocksInstance: Liveblocks | null = null;

export const getLiveblocks = () => {
  if (liveblocksInstance) return liveblocksInstance;

  const secret =
    process.env.LIVEBLOCKS_SECRET ?? process.env.LIVEBLOCKS_SECRET_KEY;

  if (!secret) {
    throw new Error(
      "Missing Liveblocks secret. Set LIVEBLOCKS_SECRET or LIVEBLOCKS_SECRET_KEY.",
    );
  }

  liveblocksInstance = new Liveblocks({ secret });
  return liveblocksInstance;
};
