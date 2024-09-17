import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../../../lib/prisma";
import { BadRequestError } from "../_errors/bad-request-error";

export async function getProfile(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/profile",
    {
      schema: {
        tags: ["auth"],
        summary: "Get user profile",
        response: {
          200: z.object({
            user: z.object({
              id: z.string(),
              name: z.string().nullable(),
              email: z.string(),
              avatarUrl: z.string().nullable(),
            }),
          }),
        },
      },
    },
    async (request, reply) => {
      const payload = await request.jwtVerify<{ sub: string }>();
      const user = await prisma.user.findUnique({
        select: {
          id: true,
          name: true,
          email: true,
          avatarUrl: true,
        },
        where: { id: payload.sub },
      });
      if (!user) {
        throw new BadRequestError("User not found");
      }
      return reply.send({ user });
    }
  );
}
