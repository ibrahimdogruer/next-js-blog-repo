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

    if (!userToken) {
      errorResponse(res, Boom.unauthorized("Unauthorized"));
    }
    if (!text || !url) {
      errorResponse(res, Boom.badRequest("Invalid paramaters"));
    }

    const userResponse = await fetch(
      `https://${process.env.NEXT_PUBLIC_AUTH0_DOMAIN}/userinfo`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      }
    );

    if (!userResponse) {
      errorResponse(res, Boom.unauthorized("Unauthorized"));
    }
    const { name, picture, email } = await userResponse.json();

    const newComment = {
      id: nanoid(),
      created_at: Date.now(),
      text,
      name,
      picture,
      email,
      url,
    };
    console.log(newComment);

    let redis = new Redis(process.env.REDIS_URL);
    await redis.lpush(url, JSON.stringify(newComment));
    await redis.quit();

    res.status(200).json(newComment);
  }

  // FETCH
  if (req.method === "GET") {
    const { url } = req.query;

    if (!url) {
      errorResponse(res, Boom.badRequest("Invalid paramaters"));
    }

    let redis = new Redis(process.env.REDIS_URL);
    const comments = await redis.lrange(url, 0, -1);
    await redis.quit();

    const data = comments.map((item) => JSON.parse(item));
    res.status(200).json(data);
  }

  // DELETE
  if (req.method === "DELETE") {
    const { url, comment, userToken } = req.body;
    if (!userToken) {
      errorResponse(res, Boom.unauthorized("Unauthorized"));
    }

    if (!url || !comment) {
      errorResponse(res, Boom.badRequest("Invalid paramaters"));
    }

    const userResponse = await fetch(
      `https://${process.env.NEXT_PUBLIC_AUTH0_DOMAIN}/userinfo`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
    let user = await userResponse.json();
    if (!user || user.email !== comment.email) {
      errorResponse(res, Boom.unauthorized("Unauthorized"));
    }

    let redis = new Redis(process.env.REDIS_URL);
    await redis.lrem(url, 1, JSON.stringify(comment));
    await redis.quit();

    res.status(200).json({ message: "Successful" });
  }
};
