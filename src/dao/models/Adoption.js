import mongoose from "mongoose";

const collection = "Adoptions";

const schema = new mongoose.Schema({
  owner: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Users', // Asegúrate de que 'Users' esté bien definido en tu modelo de Usuario
    required: true // Se puede agregar 'required' si siempre debe haber un dueño
  },
  pet: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Pets', // Asegúrate de que 'Pets' esté bien definido en tu modelo de Mascota
    required: true // Se puede agregar 'required' si siempre debe haber una mascota
  }
}, {
  timestamps: true // Puedes agregar timestamps si deseas almacenar las fechas de creación y modificación
});

const adoptionModel = mongoose.model(collection, schema);

export default adoptionModel;
