import { expect } from "chai";
import supertest from "supertest";
import mongoose from "mongoose";

const request = supertest("http://localhost:8080/api/adoptions");

describe("Test de integración Adoptions", () => {
  let testAdoption;
  let testUser;
  let testPet;


  before(async () => {
    const userResponse = await supertest("http://localhost:8080/api/users").post("/").send({
        first_name: "Test",
        last_name: "User",
        email: `testuser${Date.now()}@example.com`,
        password: "password",
        role: "user",
      });
    testUser = userResponse.body.payload;

    const petResponse = await supertest("http://localhost:8080/api/pets").post("/").send({
      name: "Pet Test",
      specie: "Gato",
      birthDate: "10/10/2023",
      image: "imageurl",
    });
    testPet = petResponse.body.payload;
  });

  it("[GET] /api/adoptions - Debe devolver un array de adopciones", async () => {
    const { status, body } = await request.get("/");
    expect(status).to.be.equal(200);
    expect(body.payload).to.be.an("array");
  });

  it("[POST] /api/adoptions/:uid/:pid - Debe crear una adopción", async () => {
    const { status, body } = await request.post(`/${testUser._id}/${testPet._id}`);
    testAdoption = body.payload;
    expect(status).to.be.equal(200);
    expect(body.status).to.be.equal("success");
    expect(body.message).to.be.equal("Pet adopted");
  });

  it("[GET] /api/adoptions/:aid - Debe obtener una adopción por id", async () => {
    const { status, body } = await request.get(`/${testAdoption._id}`);
    expect(status).to.be.equal(200);
    expect(body.status).to.be.equal("success");
    expect(body.payload._id).to.be.equal(testAdoption._id);
  });

  it("[POST] /api/adoptions/:uid/:pid - No debe permitir adoptar una mascota que ya está adoptada", async () => {
    const { status, body } = await request.post(`/${testUser._id}/${testPet._id}`);
    expect(status).to.be.equal(400);
    expect(body.status).to.be.equal("error");
    expect(body.error).to.be.equal("Pet is already adopted");
  });

  it("[GET] /api/adoptions/:aid - Debe devolver un error 404 si la adopción no se encuentra", async () => {
    const fakeAdoptionId = new mongoose.Types.ObjectId();
    const { status, body } = await request.get(`/${fakeAdoptionId}`);
    expect(status).to.be.equal(404);
    expect(body.status).to.be.equal("error");
    expect(body.error).to.include("Adoption id");
});

  after(async () => {
    await supertest("http://localhost:8080/api/adoptions").delete(`/${testAdoption._id}`);
    await supertest("http://localhost:8080/api/pets").delete(`/${testPet._id}`);
    await supertest("http://localhost:8080/api/users").delete(`/${testUser._id}`);
  });
});
