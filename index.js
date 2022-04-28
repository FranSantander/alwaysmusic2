const { Pool } = require("pg");
const ingresarEstudiante = require("./nuevoEstudiante");
const { consultar, consultarRut } = require("./consulta");
const actualizar = require("./actualizarRegistro");
const { eliminarEstudiante } = require("./delete");

const [seleccion, nombreRut, rut, curso, nivel] = process.argv.slice(2);

const config = {
  user: "postgres",
  host: "localhost",
  password: "postgresql",
  database: "alwaysmusic",
  port: 5432,
  max: 20,
  idleTimeoutMillis: 5000,
  connectionTimeoutMillis: 2000,
};
const pool = new Pool(config);

pool.connect(async (err, client, release) => {
  if (err) return console.log(err);

  try {
    if (seleccion == "nuevo") {
      await ingresarEstudiante(nombreRut, rut, curso, nivel, client);
    } else if (seleccion == "consulta") {
      const res = await consultar(client);
      console.log(res);
    } else if (seleccion == "rut") {
      const res = await consultarRut(nombreRut, client);
      res.rowCount == 0
        ? console.log("Estudiante no existe")
        : console.log("Registro Actual: ", res.rows);
    } else if (seleccion == "editar") {
      await actualizar(nombreRut, curso, nivel, rut, client);
    } else if (seleccion == "eliminar") {
      await eliminarEstudiante(nombreRut, client);
    }
  } catch (e) {
    console.log(e);
  } finally {
    release();
    pool.end();
  }
});
