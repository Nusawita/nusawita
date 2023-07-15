const Location = require('../models/Location');
const { Op } = require('sequelize')

class LocationRepository {
    async createLocation(locationData) {
        try {
            const createdLocation = await Location.create(locationData);
            return null;
        } catch (error) {
            return error
        }
    }

    async getLocationById(locationId) {
        try{
            const location = await Location.findOne({where: {id: `${locationId}`}});
            return [location, null];
        } catch (error) {
            return [null, error];
        }
    }

    async getLocationByName(locationName) {
        try{
            const location = await Location.findOne({where: {name: `${locationName}`}});
            return [location, null];
        } catch (error) {
            return [null, error];
        }
    }

    async getAllLocation(search) {
        try{
            const allLocation = await Location.findAll({where: 
                {
                    [Op.or] : [
                        {name: {[Op.substring]: `${search}`}},
                        {address: {[Op.substring]: `${search}`}}
                    ]
                }});
            return [allLocation, null];
        }catch (error) {
            return [null, error]
        }
    }

    async updateLocation(updateData, locationId) {
        try {
            const updatedLocation = await Location.update(updateData, {
                where: { id: `${locationId}` },
              });
            return null;
        } catch (error) {
            return error
        }
    }

    async deleteLocation(locationId) {
        try {
            await Location.destroy({
                where: {
                  id: locationId
                }
              });
            return null;
        } catch (error) {
            return error
        }
    }
}
  
module.exports = LocationRepository;