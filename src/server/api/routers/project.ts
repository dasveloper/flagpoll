import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import {
  GetProjectByIdSchema,
  GetProjectByApiKeySchema,
  UpdateProjectSchema,
  DeleteProjectSchema,
  ProjectSchema,
} from "~/utils/schemas";
import formatFlagResponse from "~/utils/formatFlagResponse";

export const projectRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.project.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
  }),

  getById: protectedProcedure
    .input(GetProjectByIdSchema)
    .query(({ ctx, input }) => {
      return ctx.prisma.project.findFirst({
        where: {
          id: input.id,
          userId: ctx.session.user.id,
        },
      });
    }),

  getByApiKey: publicProcedure
    .input(GetProjectByApiKeySchema)
    .query(async ({ ctx, input }) => {
      const project = await ctx.prisma.project.findFirst({
        where: {
          apiKey: input.apiKey,
        },
        include: {
          flags: true,
        },
      });

      if (project == null) {
        return {};
      }

      const formattedFlags = formatFlagResponse(project.flags);

      return formattedFlags;
    }),

  create: protectedProcedure.input(ProjectSchema).mutation(({ ctx, input }) => {
    return ctx.prisma.project.create({
      data: {
        name: input.name,
        userId: ctx.session.user.id,
      },
    });
  }),

  update: protectedProcedure
    .input(UpdateProjectSchema)
    .mutation(async ({ ctx, input }) => {
      const project = await ctx.prisma.project.findUnique({
        where: {
          id: input.id,
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
          message: "You are not uthorized to update this project",
        });
      }
      return ctx.prisma.project.updateMany({
        data: {
          name: input.name,
        },
        where: {
          id: input.id,
          userId: ctx.session.user.id,
        },
      });
    }),

  delete: protectedProcedure
    .input(DeleteProjectSchema)
    .mutation(async ({ ctx, input }) => {
      const project = await ctx.prisma.project.findUnique({
        where: {
          id: input.id,
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
          message: "You are not uthorized to delete this project",
        });
      }
      return ctx.prisma.project.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
