import request from "supertest";
import { app } from "../index";

describe("Card Routes", () => {
  it("should create a token", async () => {
    const response = await request(app).post("/api/cards/create-token").send({
      card_number: "4634021253197794",
      cvv: "634",
      expiration_month: "07",
      expiration_year: "2024",
      email: "test@gmail.com",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("token");
  });

});
