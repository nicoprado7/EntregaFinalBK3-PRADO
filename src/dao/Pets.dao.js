import petModel from "./models/Pet.js"; // Importamos el modelo de Pet

export default class Pet {
  // Obtener mascotas por parámetros
  get(params) {
    return petModel.find(params); // Devuelve todas las mascotas que coincidan con los parámetros
  }

  // Obtener una mascota por parámetros (único)
  getBy(params) {
    return petModel.findOne(params); // Devuelve una sola mascota que coincida
  }

  // Guardar una mascota nueva
  save(doc) {
    return petModel.create(doc); // Crea una nueva mascota
  }

  // Guardar varias mascotas
  saveMany(docs) {
    return petModel.insertMany(docs); // Inserta muchas mascotas
  }

  // Actualizar una mascota por ID
  update(id, doc) {
    return petModel.findByIdAndUpdate(id, { $set: doc }, { new: true }); // Actualiza y devuelve la mascota actualizada
  }

  // Eliminar una mascota por ID
  delete(id) {
    return petModel.findByIdAndDelete(id); // Elimina la mascota
  }
}
