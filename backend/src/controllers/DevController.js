const axios = require('axios')
const Dev = require('../models/Dev')
const parseStrAsArr = require('../utils/parseStrAsArr')
const { findConnections, sendMessage } = require('../websocket')

module.exports = {
    async index (req, res) {
        const dev = await Dev
            .find()
        
        return res.json(dev)
    },
    
    async store(req, res) {
        const { github_username, techs, latitude, longitude } = req.body

        let dev = await Dev
            .findOne({ github_username })

        if(!dev) {
            const response = await axios
                .get(`https://api.github.com/users/${github_username}`)

            const { name = login, avatar_url, bio} = response.data

            
            const techsArr = parseStrAsArr(techs)

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            }

            dev = await Dev
                .create({
                    github_username,
                    name,
                    avatar_url,
                    bio,
                    techs: techsArr,
                    location
                })

            const sendSocketMsgTo = findConnections(
                { latitude, longitude },
                techsArr
            )

            sendMessage(sendSocketMsgTo, 'newDev', dev)
        }
        
        return res.json(dev)
    }
}