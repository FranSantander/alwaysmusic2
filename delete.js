const eliminarEstudiante = async (rut, client) => {
  const consulta = {
    text: "DELETE FROM estudiante where rut = $1",
    values: [rut],
    name: "eliminar-estudiante",
  };
  try {
    const res = await client.query(consulta);
    res.rowCount > 1
      ? console.log("Estudiante eliminado")
      : console.log("El rut ingresado no existe, vuelve a intentar");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  eliminarEstudiante,
};
