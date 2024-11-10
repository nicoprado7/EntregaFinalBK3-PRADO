import { UserServices } from "../services/user.services.js";
import { PetServices } from "../services/pet.services.js";
import { AdoptionServices } from "../services/adoption.services.js";
import { NotFoundError } from "../utils/customErrors.js";

export class AdoptionsController {
  constructor() {
    this.adoptionsService = new AdoptionServices();
    this.usersService = new UserServices();
    this.petsService = new PetServices();
  }

  // Obtener todas las adopciones
  getAllAdoptions = async (req, res, next) => {
    try {
      const result = await this.adoptionsService.getAll();
      res.status(200).send({ status: "success", payload: result });
    } catch (error) {
      next(error); // Pasa el error al middleware de manejo de errores
    }
  };

  // Obtener una adopción por ID
  getAdoption = async (req, res, next) => {
    try {
      const adoptionId = req.params.aid;
      const adoption = await this.adoptionsService.getById(adoptionId);
      res.status(200).send({ status: "success", payload: adoption });
    } catch (error) {
      if (error instanceof NotFoundError) {  // Comprobamos si es un error NotFoundError
        return res.status(404).send({ status: "error", error: error.message });
      }
      next(error); // Pasa otros errores al middleware de manejo de errores
    }
  };

  // Crear una nueva adopción
  createAdoption = async (req, res, next) => {
    try {
      const { uid, pid } = req.params;

      // Obtener el usuario
      const user = await this.usersService.getById(uid);
      if (!user) {
        return res.status(404).send({ status: "error", error: "User not found" });
      }

      // Obtener la mascota
      const pet = await this.petsService.getById(pid);
      if (!pet) {
        return res.status(404).send({ status: "error", error: "Pet not found" });
      }

      // Verificar si la mascota ya ha sido adoptada
      if (pet.adopted) {
        return res.status(400).send({ status: "error", error: "Pet is already adopted" });
      }

      // Crear la adopción
      pet.adopted = true;
      pet.owner = user._id;
      await this.petsService.update(pet._id, { adopted: true, owner: user._id });

      // Asignar la mascota al usuario
      user.pets.push(pet._id);
      await this.usersService.update(user._id, { pets: user.pets });

      // Crear el registro de adopción
      const adoption = await this.adoptionsService.create({ owner: user._id, pet: pet._id });

      res.status(200).send({ status: "success", message: "Pet adopted", payload: adoption });
    } catch (error) {
      next(error);
    }
  };
}
