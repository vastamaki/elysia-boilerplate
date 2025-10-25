import { cors } from '@elysiajs/cors';
import { Elysia } from 'elysia';

export const corsPlugin = new Elysia().use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);
