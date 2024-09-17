import fastifyCors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastify from "fastify";
import {
  ZodTypeProvider,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import { errorHandler } from "./error-handler";
import { authenticateWithPassword } from "./routes/auth/authenticate-with-password";
import { createAccount } from "./routes/auth/create-account";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors);
app.register(createAccount);
app.register(authenticateWithPassword);
app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "SaaS",
      version: "0.1.0",
    },
    servers: [],
  },
  transform: jsonSchemaTransform,
});
app.register(fastifySwaggerUi, {
  prefix: "/docs",
});
app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);
app.register(fastifyJwt, {
  secret: "my-secret-key",
});
app.setErrorHandler(errorHandler);
app.listen({ port: 3030 }).then(() => {
  console.log("Server is running on port 3030");
});
