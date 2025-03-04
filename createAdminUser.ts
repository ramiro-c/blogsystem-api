import { eq } from "drizzle-orm";
import { db } from "./src/db"; // Asegúrate de que la ruta sea correcta
import { users } from "./src/db/schema"; // Asegúrate de que la ruta sea correcta
import { hashPassword } from "./src/utils/password"; // Asegúrate de que la ruta sea correcta

async function createAdminUser() {
  const email = "rami992009@gmail.com"; // Cambia esto por el email que desees
  const password = "asdasdasasddasadsdasasd1234234234,la1!!#$@#"; // Cambia esto por una contraseña segura
  const name = "Ramiro Cerdá"; // Nombre del usuario

  // Verificar si el usuario ya existe
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .get();

  if (existingUser) {
    console.log("El usuario ya existe.");
    return;
  }

  // Hash de la contraseña
  const hashedPassword = await hashPassword(password);

  // Insertar el nuevo usuario
  await db
    .insert(users)
    .values({
      email,
      password: hashedPassword,
      name,
    })
    .run();

  console.log("Usuario admin creado con éxito.");
}

// Ejecutar la función
createAdminUser()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error al crear el usuario admin:", error);
    process.exit(1);
  });
