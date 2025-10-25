import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";

export const corsPlugin = new Elysia().use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
