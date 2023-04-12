const axios = require("axios");
const { URL, KEY } = process.env;

const getDogs = async (req, res) => {
  try {
    const response = await axios.get(`${URL}?key=${KEY}`);
    const dogs = response.data.map(
      ({ id, name, image, height, weight, life_span }) => ({
        id,
        name,
        image:image.url,
        height,
        weight,
        life_span,
      })
    );
    res.status(200).json(dogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = getDogs;
