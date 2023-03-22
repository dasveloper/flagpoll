import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const projectRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.project.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
  }),

  getById: protectedProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.project.findFirst({
      where: {
        id: input,
      },
    });
  }),

  create: protectedProcedure
    .input(z.object({ name: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.project.create({
        data: {
          name: input.name,
          userId: ctx.session.user.id,
        },
      });
    }),

  update: protectedProcedure
    .input(z.object({ name: z.string(), id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.project.update({
        data: {
          name: input.name,
        },
        where: {
          id: input.id,
        },
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.project.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
