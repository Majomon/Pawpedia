const { createDog, getDogId, getDogName, getAllDogs,} = require("../controllers/dogControllers");

const getDogHandler = async (req, res) => {
  try {
    const allDogs = await getAllDogs();
    res.status(200).json(allDogs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getDogHanlderQuery = async (req, res) => {
  const { name } = req.query;
  const source= isNaN(id)?"bdd":"api"

  try {
    const dogName = await getDogName(name);
    res.status(200).json(dogName);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getDogHanlderId = async (req, res) => {
  const { id } = req.params;
  const source= isNaN(id)?"bdd":"api"
  try {
    const dogId = await getDogId(id,source);
    res.status(200).json(dogId);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getDogHanlderPost = async (req, res) => {
  try {
    const { name, image, height, weight, life_span } = req.body;
    const newDog = await createDog({ name, image, height, weight, life_span });
    res.status(201).json(newDog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getDogHandler,
  getDogHanlderQuery,
  getDogHanlderId,
  getDogHanlderPost,
};
