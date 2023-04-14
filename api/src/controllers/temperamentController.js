const axios = require("axios");
const { URL, KEY } = process.env;

const getTemperament = async (req, res) => {
  const response = await axios.get(`${URL}?key=${KEY}`);
  const uniqueTemperaments = new Set();
  response.data.forEach(item => {
    if (item.temperament) {
        const temperaments = item.temperament.split(", ");
        temperaments.forEach(temp => uniqueTemperaments.add(temp));
    }
  });
  return uniqueTemperaments
};

module.exports = getTemperament;
