import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const flagRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(z.object({ projectId: z.string() }))
    .query(async ({ ctx, input }) => {
      const project = await ctx.prisma.project.findUnique({
        where: {
          id: input.projectId,
        },
      });
      if (!project) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Project does not exist",
        });
      }
      if (project.userId !== ctx.session.user.id) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You are not uthorized to get the flags for this project",
        });
      }
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
        description: z.string().nullable(),
        projectId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const project = await ctx.prisma.project.findUnique({
        where: {
          id: input.projectId,
        },
      });
      if (!project) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Project does not exist",
        });
      }
      if (project.userId !== ctx.session.user.id) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You are not uthorized to create a flag for this project",
        });
      }
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
        description: z.string().nullable(),
        status: z.boolean(),
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const flag = await ctx.prisma.flag.findUnique({
        where: {
          id: input.id,
        },
        include: { project: true },
      });

      if (!flag || !flag.project) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Flag does not exist",
        });
      }

      if (flag.project.userId !== ctx.session.user.id) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You are not uthorized to update this flag",
        });
      }

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
    .mutation(async ({ ctx, input }) => {
      const flag = await ctx.prisma.flag.findUnique({
        where: {
          id: input.id,
        },
        include: { project: true },
      });

      if (!flag || !flag.project) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Flag does not exist",
        });
      }

      if (flag.project.userId !== ctx.session.user.id) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You are not uthorized to delete this flag",
        });
      }
      return ctx.prisma.flag.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
