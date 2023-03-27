import { type NextApiRequest, type NextApiResponse } from "next";
import { appRouter } from "~/server/api/root";
import { createTRPCContext } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import cors from "nextjs-cors";
import { getHTTPStatusCodeFromError } from "@trpc/server/http";

const projectByApiKeyHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  await cors(req, res);

  const ctx = await createTRPCContext({ req, res });
  const caller = appRouter.createCaller(ctx);

  try {
    const apiKey = req.query.apiKey as string;
    const userId = req.query.userId as string;

    const project = await caller.project.getByApiKey({ apiKey, userId });

    res.status(200).json(project);
  } catch (cause) {
    if (cause instanceof TRPCError) {
      // An error from tRPC occured
      const httpCode = getHTTPStatusCodeFromError(cause);
      return res.status(httpCode).json(cause);
    }
    // Another error occured
    res.status(500).json({ message: "Internal server error" });
  }
};

export default projectByApiKeyHandler;
