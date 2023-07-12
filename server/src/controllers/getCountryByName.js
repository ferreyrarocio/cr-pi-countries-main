const { Country } = require("../db");
const { Op } = require('sequelize');


const getCountryByName = async (req, res) => {
  try {
    const { name } = req.query;

    
if (name==='') {
      res.status(200).json(Country);
      return;
    }
    const countries = await Country.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`
        }
      }
    });

    if (countries.length > 0) {
      res.status(200).json(countries);
    } else {
      res.status(404).json({ message: 'tal pais fue eliminado por amenazas de los extraterrestres' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = getCountryByName