// install dependencies
const { execSync } = require("child_process");
execSync("npm install");
execSync("npm run seed");

const request = require("supertest");
const { db } = require("./db/connection");
const { Musician } = require("./models/index");
const app = require("./src/app");
const { seedMusician } = require("./seedData");
const { json } = require("sequelize");

describe("./musicians endpoint", () => {
  // Write your tests here
  test("Testing musicians endpoint", async () => {
    const response = await request(app).get("/musicians");
    expect(response.statusCode).toBe(200);
  });

  test("Testing musicians endpoint returns back data in json format", async () => {
    const response = await request(app).get("/musicians");
    expect(response.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );
  });

  test("Musicians endpoint returns data with expected structure", async () => {
    const response = await request(app).get("/musicians");
    const musicians = JSON.parse(response.text);
    expect(Array.isArray(musicians)).toBe(true);
    musicians.forEach(musician => {
        expect(musician).toHaveProperty('id');
        expect(musician).toHaveProperty('name');
        expect(musician).toHaveProperty('instrument');
    });

});
});
