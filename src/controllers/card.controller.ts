import { Request, Response } from "express";
import { createToken, getCardData } from "../services/card.service";

export const createTokenHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await createToken(req);
    res.status(201).json(result);
  } catch (error: any) {
    let statusCode = 500;

    if (error.message === "Invalid credit card information.") {
      statusCode = 400;
    } else if (error.message === "Failed to create token.") {
      console.error("Error during token creation:", error);
      statusCode = 422;
    }

    res.status(statusCode).json({ error: error.message });
  }
};

export const getCardDataHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const token = req.header("Authorization");

    if (!token) {
      res.status(400).json({ error: "Token not provided in the Authorization header." });
      return;
    }

    const cardData = await getCardData(token);

    res.status(200).json(cardData);
  } catch (error: any) {
    let statusCode = 500;

    if (error.message === "Token not found.") {
      statusCode = 404;
    }

    res.status(statusCode).json({ error: error.message });
  }
};
