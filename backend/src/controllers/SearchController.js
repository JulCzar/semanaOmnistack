const Dev = require('../models/Dev')
const parseStrAsArr = require('../utils/parseStrAsArr')

module.exports = {
   async index(req, res) {
      const { latitude, longitude, techs } = req.query

      const techAsArr = parseStrAsArr(techs)

      const dev = await Dev
         .find({
            techs: {
               $in: techAsArr,
            },
            location: {
               $near: {
                  $geometry: {
                     type: 'Point',
                     coordinates: [longitude, latitude]
                  },
                  $maxDistance: 10000,
               }
            }
         })

      return res.json(dev)
   }
}