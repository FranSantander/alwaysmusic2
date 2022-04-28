const agregarEstudiante = async (nombre, rut, curso, nivel, client) => {
  const consulta = {
    text: "INSERT INTO estudiante (nombre, rut, curso, nivel) VALUES ($1, $2, $3, $4) RETURNING *;",
    values: [nombre, rut, curso, nivel],
    name: "Agregar Estudiante",
  };
  try {
    const res = await client.query(consulta);
    console.log(
      `Cantidad de estudiante registrados, ${res.rowCount}, siendo el último estudiante ${res.rows[0].nombre}`
    );
  } catch (e) {
    console.log(
      `No se ha podido agregar estudiante debido al siguiente error, ${e.code}`
    );
  }
};
module.exports = agregarEstudiante;
