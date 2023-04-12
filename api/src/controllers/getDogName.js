const axios = require("axios");
const { URL, KEY } = process.env;

const getDogName = async (req, res) => {
  const { name } = req.query;
  console.log(name);
  //?key=${KEY}
  try {
    const response = await axios.get(`${URL}/search?q=${name}`);
    console.log(response.data);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = getDogName;
