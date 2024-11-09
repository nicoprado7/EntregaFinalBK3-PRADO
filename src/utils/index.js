import bcrypt from 'bcryptjs';  // Usar bcryptjs si tienes problemas con bcrypt
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Función para crear el hash de la contraseña
export const createHash = async (password) => {
  const salt = await bcrypt.genSalt(10);  // Generar salt
  return bcrypt.hash(password, salt);  // Hashear la contraseña con el salt
};

// Función para validar la contraseña
export const passwordValidation = async (user, password) => bcrypt.compare(password, user.password);

// Para obtener el __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;
