const axios = require("axios");
const { URL, KEY } = process.env;

const getDogId = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(`${URL}?key=${KEY}`);

    const search = response.data.find((dog) => dog.id == id);

    if (!search) {
      // si no se encontró ningún perro con el id dado, respondemos con un error
      throw new Error(`No se encontró ningún perro con el ID ${id}`);
    }

    const dogId = {
      id: search.id,
      name: search.name,
      image: search.image.url,
      height: search.height,
      weight: search.weight,
      life_span: search.life_span,
      temperament: search.temperament,
    };
    res.status(200).json(dogId);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getDogId;
