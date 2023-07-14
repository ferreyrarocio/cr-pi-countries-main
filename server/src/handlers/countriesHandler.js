const {getCountriesApi} = require('../controllers/getCountries')

const getAllCountries = async (req, res) => {
  try {
    const countriesApi = await getCountriesApi();

    res.status(200).json(countriesApi);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = getAllCountries;
