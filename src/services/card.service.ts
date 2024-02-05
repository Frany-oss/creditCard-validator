import { Request } from "express";
import { generateToken, isValidEmail, isValidExpirationYear, isValidLuhn } from "../utils/funtions";
import { ICard } from "../dto/card.dto";
import Card from "../dto/card.dto";
import { CardViewModel } from "../models/card.model";

export const createToken = async (req: Request): Promise<{ token: string }> => {
  try {
    const { card_number, cvv, expiration_month, expiration_year, email } =
      req.body;
    if (
      !card_number ||
      !isValidLuhn(card_number) ||
      !cvv ||
      expiration_month > 12 ||
      !isValidExpirationYear(expiration_year) ||
      !email ||
      !isValidEmail(email)
    ) {
      throw new Error("Invalid credit card information.");
    }

    const token = generateToken();

    const newCard: ICard = new Card({
      token,
      cardNumber: card_number,
      cvv,
      expirationMonth: expiration_month,
      expirationYear: expiration_year,
      email,
    });

    await newCard.save();

    return { token };
  } catch (error) {
    console.error("Error creating token:", error);
    throw new Error("Failed to create token.");
  }
};

export const getCardData = async (token: string): Promise<CardViewModel> => {
  const card = await Card.findOne({ token }).exec();

  if (!card) {
    throw new Error("Card not found. It has expired.");
  }

  const cardDataWithoutCVV: CardViewModel = {
    cardNumber: card.cardNumber,
    expirationMonth: card.expirationMonth,
    expirationYear: card.expirationYear,
    email: card.email,
  };

  return cardDataWithoutCVV;
};
