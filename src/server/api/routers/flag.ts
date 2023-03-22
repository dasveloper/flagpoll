import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const flagRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(z.object({ projectId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.flag.findMany({
        where: {
          projectId: input.projectId,
        },
      });
    }),

  create: protectedProcedure
    .input(
      z.object({
        key: z.string(),
        description: z.string(),
        projectId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.flag.create({
        data: {
          key: input.key,
          description: input.description,
          projectId: input.projectId,
          status: false,
        },
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        key: z.string(),
        description: z.string(),
        status: z.boolean(),
        id: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.flag.update({
        data: {
          key: input.key,
          description: input.description,
          status: input.status,
        },
        where: {
          id: input.id,
        },
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.flag.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
