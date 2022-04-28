const consultar = async (client) => {
  try {
    const consulta = {
      text: "SELECT * FROM estudiante",
      rowMode: "array",
      name: "consultaTodo",
    };
    const result = await client.query(consulta);
    return result.rows;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const consultarRut = async (nombreRut, client) => {
  try {
    const consultaRut = {
      text: "SELECT * FROM estudiante WHERE rut = $1;",
      values: [nombreRut],
      name: "consulta Rut",
    };
    const result = await client.query(consultaRut);
    return result;
  } catch (error) {
    console.log(error.code);
    return error;
  }
};

module.exports = { consultar, consultarRut };
