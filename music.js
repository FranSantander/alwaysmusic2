const { Pool } = require("pg");

//aqui obtenemos los argumentos por la linea de comandos
const args = process.argv.slice(2);
let funcion = args[0];
let nombre = args[1];
let rut = args[2];
let curso = args[3];
let nivel = args[4];

const config = {
  user: "postgres",
  host: "localhost",
  database: "alwaysmusic",
  password: "postgresql",
  port: 5432,
  max: 20,
  idleTimeoutMillis: 5000,
  connectionTimeoutMillis: 2000,
};

const pool = new Pool(config);

//función asíncrona para registrar un nuevo estudiante en la base de datos
if (funcion == "nuevo") {
  async function ingresar(nombre, rut, curso, nivel) {
    pool.connect(async (error_conexion, client, release) => {
      if (error_conexion) return console.error(error_conexion.code);

      const SQLQuery = {
        name: "Ingresar",
        text: "insert into estudiante (nombre, rut, curso, nivel) values ($1, $2, $3, $4) RETURNING *;",
        values: [nombre, rut, curso, nivel],
      };

      //captura de errores
      try {
        const res = await client.query(SQLQuery);
        console.log(`Estudiante ${res.rows[0].nombre} agregado con éxito.`);
      } catch (error_consulta) {
        console.log("Error de conexion: ", error_consulta.code);
      }

      release();

      pool.end();
    });
  }

  ingresar(nombre, rut, curso, nivel);
}

//función asíncrona para obtener por consola el registro de un estudiante por medio de su rut.
if (funcion == "rut") {
  async function consultarut(rut) {
    pool.connect(async (error_conexion, client, release) => {
      if (error_conexion) return console.error(error_conexion.code);

      const SQLQuery = {
        name: "consultaRut",
        text: "SELECT * FROM estudiante WHERE rut = $1",
        values: [rut],
      };
      //captura de errores
      try {
        const res = await client.query(SQLQuery);
        console.log("Registros actual: ", res.rows[0]);
      } catch (error_consulta) {
        console.log("Error de conexion: ", error_consulta.code);
      }

      release();

      pool.end();
    });
  }

  consultarut(nombre);
}

//función asíncrona para obtener por consola todos los estudiantes registrados en formato de arreglos.
if (funcion == "consulta") {
  async function consultaall() {
    pool.connect(async (error_conexion, client, release) => {
      if (error_conexion) return console.error(error_conexion.code);

      const SQLQuery = {
        rowMode: "array",
        text: "SELECT * FROM estudiante",
      };

      //captura de errores
      try {
        const res = await client.query(SQLQuery);
        console.log("Registros actual: ", res.rows);
      } catch (error_consulta) {
        console.log("Error de conexion: ", error_consulta.code);
      }

      release();

      pool.end();
    });
  }

  consultaall();
}

//función asíncrona para actualizar los datos de un estudiante en la base de datos
if (funcion == "editar") {
  async function editar(nombre, rut, curso, nivel) {
    pool.connect(async (error_conexion, client, release) => {
      if (error_conexion) return console.error(error_conexion.code);

      const SQLQuery = {
        name: "editar",
        text: "UPDATE estudiante SET nombre = $1, nivel = $3, rut = $4 WHERE rut = $2 RETURNING *",
        values: [nombre, rut, curso, nivel],
      };

      //captura de errores
      try {
        const res = await client.query(SQLQuery);
        console.log(`Estudiante ${res.rows[0].nombre} editado con éxito`);
      } catch (error_consulta) {
        console.log("Error de conexion: ", error_consulta.code);
      }

      release();

      pool.end();
    });
  }
  editar(nombre, rut, curso, nivel);
}

//función asíncrona para eliminar el registro de un estudiante de la base de datos
if (funcion == "eliminar") {
  async function eliminar(rut) {
    pool.connect(async (error_conexion, client, release) => {
      if (error_conexion)
        return console.error("Error de consulta: ", error_conexion.code);

      const SQLQuery = {
        name: "eliminar",
        text: "DELETE FROM estudiantes WHERE rut = $1 RETURNING *",
        values: [rut],
      };

      //captura de errores
      try {
        const res = await client.query(SQLQuery);
        console.log(
          `Registro de estudiante con rut ${res.rows[0].rut} eliminado con éxito`
        );
      } catch (error_consulta) {
        console.log("Error de consulta: ", error_consulta.code);
      }

      release();

      pool.end();
    });
  }
  eliminar(nombre);
}
