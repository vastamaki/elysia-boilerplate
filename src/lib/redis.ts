import { RedisClient } from 'bun';
import { env } from 'src/lib/env';

export const redisClient = new RedisClient(env.REDIS_URL);
