import fastifyCors from "@fastify/cors";
import fastify from "fastify";
import {
  ZodTypeProvider,
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import { createAccount } from "./routes/auth/create-account";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors);
app.register(createAccount);

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.listen({ port: 3030 }).then(() => {
  console.log("Server is running on port 3030");
});
