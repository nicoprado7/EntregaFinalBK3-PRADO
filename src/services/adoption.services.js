// adoption.services.js
import Adoption from "../dao/Adoption.js";
import { NotFoundError } from "../utils/customErrors.js"; // Importamos la excepción personalizada

export class AdoptionServices {
  constructor() {
    this.adoptionDao = new Adoption();
  }

  async getAll() {
    return await this.adoptionDao.get();
  }

  async getById(id) {
    const adoption = await this.adoptionDao.getBy({ _id: id });
    if (!adoption) throw new NotFoundError(`Adoption id ${id} not found`); // Lanzamos la excepción personalizada
    return adoption;
  }

  async create(data) {
    return await this.adoptionDao.save(data);
  }

  async update(id, data) {
    return await this.adoptionDao.update(id, data);
  }

  async remove(id) {
    await this.adoptionDao.delete(id);
    return "ok";
  }
}
