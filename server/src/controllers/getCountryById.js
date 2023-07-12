const axios = require ('axios')

const {Country, Activity} = require('../db');



const getCountryById = async (req, res) => {
  try {
    const { id } = req.params;


    const countryById = await Country.findOne({
      where: {
        id: id
      },
      include: [Activity]
    });

    if (countryById) {
      res.status(200).json(countryById);
    } else {
      res.status(404).json({ message: 'tal pais fue eliminado por amenazas de los extraterrestres' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = getCountryById