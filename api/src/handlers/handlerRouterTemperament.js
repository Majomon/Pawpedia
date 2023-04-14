const getTemperament= require("../controllers/temperamentController")

const handlerRouterTemperament = async (req, res) => {
  try {
    const temperament = await getTemperament();
    res.status(200).json(temperament);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = handlerRouterTemperament;


