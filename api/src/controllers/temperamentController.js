const axios = require("axios");
const { URL, KEY } = process.env;

const getTemperament = async (req, res) => {
  const response = await axios.get(`${URL}?key=${KEY}`);

  // Obtener todos los valores de la propiedad "temperamento"
  const temperamentos = [];
  for (const perro of response.data) {
    if (perro.temperament) {
      const valores = perro.temperament
        .split(",")
        .map((temperamento) => temperamento.trim());
        
      for (const valor of valores) {
        if (!temperamentos.includes(valor)) {
          temperamentos.push(valor);
        }
      }
    }
  }

  return temperamentos; // Retornar el arreglo resultante

  /*   // Eliminar valores duplicados del arreglo de temperamentos
  const temperamentosUnicos = [...new Set(temperamentos)];

  return temperamentosUnicos; // Retornar el arreglo resultante */
};

module.exports = getTemperament;
