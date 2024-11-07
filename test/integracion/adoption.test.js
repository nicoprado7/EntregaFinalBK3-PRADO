import { expect } from "chai";
import supertest from "supertest";

// Endpoint de las adopciones
const request = supertest("http://localhost:8080/api/adoptions");

describe("Test de integración Adoptions", () => {
  let testAdoption;
  let testUser;
  let testPet;

  // Crear un usuario y una mascota antes de las pruebas
  before(async () => {
    // Crear un usuario para la adopción
    const userResponse = await supertest("http://localhost:8080/api/users").post("/").send({
      first_name: "Test",
      last_name: "User",
      email: "testuser@example.com",
      password: "password",
      role: "user",
    });
    testUser = userResponse.body.payload;

    // Crear una mascota para la adopción
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
    // Intentar adoptar la misma mascota de nuevo
    const { status, body } = await request.post(`/${testUser._id}/${testPet._id}`);
    expect(status).to.be.equal(400);
    expect(body.status).to.be.equal("error");
    expect(body.error).to.be.equal("Pet is already adopted");
  });

  it("[GET] /api/adoptions/:aid - Debe devolver un error 404 si la adopción no se encuentra", async () => {
    const { status, body } = await request.get("/invalidAdoptionId");
    expect(status).to.be.equal(404);
    expect(body.status).to.be.equal("error");
    expect(body.error).to.be.equal("Adoption not found");
  });

  // Limpiar la base de datos o realizar cualquier tarea de limpieza
  after(async () => {
    // Aquí deberías eliminar el usuario, mascota y adopción para que la base de datos quede limpia
    await supertest("http://localhost:8080/api/adoptions").delete(`/${testAdoption._id}`);
    await supertest("http://localhost:8080/api/pets").delete(`/${testPet._id}`);
    await supertest("http://localhost:8080/api/users").delete(`/${testUser._id}`);
  });
});
