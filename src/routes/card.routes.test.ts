import request from "supertest";
import { app } from "..";

describe("Card Routes", () => {
  it("should create a token", async () => {
    const response = await request(app).post("/api/cards/create-token").send({
      card_number: 4634021253197794,
      cvv: 634,
      expiration_month: "07",
      expiration_year: "2024",
      email: "test@gmail.com",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("token");
  });

  it("should fail with invalid email", async () => {
    const response = await request(app).post("/api/cards/create-token").send({
      card_number: 4634021253197794,
      cvv: 634,
      expiration_month: "07",
      expiration_year: "2024",
      email: "test@example.com",
    });

    expect(response.status).toBe(400);
  });

  it("should fail with invalid cvv (more than 4)", async () => {
    const response = await request(app).post("/api/cards/create-token").send({
      card_number: 4634021253197794,
      cvv: 123454,
      expiration_month: "07",
      expiration_year: "2024",
      email: "francesco@gmail.com",
    });

    expect(response.status).toBe(400);
  });

  it("should fail with invalid cvv (less than 3)", async () => {
    const response = await request(app).post("/api/cards/create-token").send({
      card_number: 4634021253197794,
      cvv: 12,
      expiration_month: "07",
      expiration_year: "2024",
      email: "francesco@gmail.com",
    });

    expect(response.status).toBe(400);
  });

  it("should fail with invalid expiration_month (more than 12)", async () => {
    const response = await request(app).post("/api/cards/create-token").send({
      card_number: 4634021253197794,
      cvv: 634,
      expiration_month: "32",
      expiration_year: "2024",
      email: "francesco@gmail.com",
    });

    expect(response.status).toBe(400);
  });

  it("should fail with invalid expiration_month (less than 1)", async () => {
    const response = await request(app).post("/api/cards/create-token").send({
      card_number: 4634021253197794,
      cvv: 634,
      expiration_month: "0",
      expiration_year: "2024",
      email: "francesco@gmail.com",
    });

    expect(response.status).toBe(400);
  });

  it("should fail with invalid expiration_year (more than 5 years)", async () => {
    const response = await request(app).post("/api/cards/create-token").send({
      card_number: 4634021253197794,
      cvv: 634,
      expiration_month: "03",
      expiration_year: "2060",
      email: "francesco@gmail.com",
    });

    expect(response.status).toBe(400);
  });

  it("should fail with invalid expiration_year (less than the current year)", async () => {
    const response = await request(app).post("/api/cards/create-token").send({
      card_number: 4634021253197794,
      cvv: 634,
      expiration_month: "03",
      expiration_year: "2012",
      email: "francesco@gmail.com",
    });

    expect(response.status).toBe(400);
  });

  it("should fail with invalid card_number", async () => {
    const response = await request(app).post("/api/cards/create-token").send({
      card_number: 4242424242424242,
      cvv: 634,
      expiration_month: "03",
      expiration_year: "2060",
      email: "francesco@gmail.com",
    });

    expect(response.status).toBe(400);
  });

});
