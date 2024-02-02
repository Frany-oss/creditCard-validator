import express from "express";
import { createTokenHandler, getCardDataHandler } from "../controllers/card.controller";

const router = express.Router();

/**
 * @swagger
 * /api/cards/create-token:
 *   post:
 *     description: Create a card token
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: requestBody
 *         description: JSON request body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             card_number:
 *               type: number
 *             cvv:
 *               type: number
 *             expiration_month:
 *               type: string
 *             expiration_year:
 *               type: string
 *             email:
 *               type: string
 *     responses:
 *       201:
 *         description: Token created successfully
 *       400:
 *         description: Invalid credit card information
 *       422:
 *         description: Failed to create token
 */
router.post('/create-token', createTokenHandler);

/**
 * @swagger
 * /api/cards/get-card-data:
 *   get:
 *     description: Get card data based on token
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Bearer token for authentication
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         schema:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *             cardNumber:
 *               type: string
 *             expirationMonth:
 *               type: string
 *             expirationYear:
 *               type: string
 *             email:
 *               type: string
 *       401:
 *         description: Unauthorized - Token missing or invalid
 *       404:
 *         description: Token not found
 */
router.get("/get-card-data", getCardDataHandler);

export default router;
