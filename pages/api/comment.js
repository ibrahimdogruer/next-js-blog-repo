import Boom from "@hapi/boom";
import Redis from "ioredis";
import { nanoid } from "nanoid";

function errorResponse(res, error) {
  const { output } = error;
  return res.status(output.statusCode).json(output.payload);
}

export default async (req, res) => {
  // CREATE
  if (req.method === "POST") {
    const { url, userToken, text } = req.body;

    if (!token) {
      return res.status(403).send('Unauthorized')
    }
    if (!text || !url) {
      return res.status(400).send('Invalid paramaters')
    }

    try {
      const userResponse = await fetch(
        `https://${process.env.NEXT_PUBLIC_AUTH0_DOMAIN}/userinfo`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      const { name, picture } = await response.json()

      if (!user) {
        return errorResponse(res, Boom.unauthorized());
      }

      const newComment = {
          id: nanoid(),
          created_at: Date.now(),
          text,
          name,
          picture,
          url
        }

      let redis = new Redis(process.env.REDIS_URL);
      await redis.lpush(url, JSON.stringify(newComment));
      await redis.quit();

      return res.status(200).json(newComment);
    } catch (err) {
      return res.status(400).json({ error: err.message })
    }
  }

  // FETCH
  if (req.method === "GET") {
    const { url } = req.query;

    if (!url) {
      return res.status(400).send('Invalid paramaters')
    }

    try {
      let redis = new Redis(process.env.REDIS_URL);
      const comments = await redis.lrange(url, 0, -1);
      await redis.quit();

      const data = comments.map((item) => JSON.parse(item));
      return res.status(200).json(data);
    } catch (err) {
      return res.status(400).json({ error: err.message })
    }
  }
}
