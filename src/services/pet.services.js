import Pet from "../dao/Pets.dao.js"; // Importamos el DAO de mascotas

export class PetServices {
  constructor() {
    this.petDao = new Pet(); // Inicializamos el DAO de Pet
  }

  // Obtener todas las mascotas
  async getAll() {
    const pets = await this.petDao.get();
    return pets;
  }

  // Obtener una mascota por ID
  async getById(id) {
    const pet = await this.petDao.getBy({ _id: id }); // Buscar por ID de MongoDB
    if (!pet) throw new Error(`Pet with id ${id} not found`); // Lanzamos un error si no existe
    return pet;
  }

  // Crear una nueva mascota
  async create(data) {
    const pet = await this.petDao.save(data);
    return pet;
  }

  // Crear muchas mascotas
  async createMany(data) {
    const pets = await this.petDao.saveMany(data);
    return pets;
  }

  // Actualizar una mascota
  async update(id, data) {
    const pet = await this.petDao.update(id, data);
    return pet;
  }

  // Eliminar una mascota
  async remove(id) {
    await this.petDao.delete(id);
    return "ok";
  }
}
