import { expect } from "chai";
import supertest from "supertest";

const request = supertest("http://localhost:8080/api/sessions");
const userRequest = supertest("http://localhost:8080/api/users");

describe("Test Integrales de Sessions", () => {
  let userTest;

  it("[POST] /api/sessions/register - Debe registrar un usuario", async () => {
    const newUser = {
      first_name: "User",
      last_name: "Test",
      email: "usertest1@gmail.com",
      password: "123",
    };

    const { status, body } = await request.post("/register").send(newUser);
    console.log("Respuesta del registro:", body); // Agregar más información en consola para depuración

    if (status === 201) {
      userTest = body.payload;
      console.log("Usuario registrado:", userTest);
    }
    
    expect(status).to.be.equal(201);
    expect(body.status).to.be.equal("success");
    expect(body.payload).to.be.an("object");
    expect(body.payload.email).to.be.equal(newUser.email);
    expect(body.payload.first_name).to.be.equal(newUser.first_name);
    expect(body.payload.last_name).to.be.equal(newUser.last_name);
    expect(body.payload.password).to.not.be.equal(newUser.password);
  });

  it("[POST] /api/sessions/login - Debe iniciar sesión con credenciales válidas", async () => {
    const loginData = {
      email: userTest.email,
      password: "123",
    };
  
    const { status, body } = await request.post("/login").send(loginData);
    
    console.log(body);  // Verifica qué contiene el cuerpo de la respuesta
    
    expect(status).to.be.equal(200);
    expect(body.status).to.be.equal("success");
    expect(body.payload).to.have.property("token");  // Aquí es donde esperamos que haya un "token"
  });
  

  after(async () => {
    if (userTest && userTest._id) {
      await userRequest.delete(`/${userTest._id}`);
    }
  });
});
