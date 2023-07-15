const locationRepository = require('../repositories/locationRepository');
const userRepository = require('../repositories/userRepository');
const {dtoError} = require('../dto/dtoError');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


class LocationService {
    constructor(locationRepository, userRepository) {
        this.locationRepository = locationRepository;
        this.userRepository = userRepository;
    }

    async createLocation(user, locationData){
        //get user by id
        const [userLog, errUserLog] = await this.userRepository.getUserByUserId(user.id);
        if (errUserLog != null) {
            const jsonData = dtoError(500, 'Internal server error');
            return jsonData;
        }

        //check if user is not admin
        if (!userLog.isAdmin) {
            const jsonData = dtoError(401, 'Unauthorized User');
            return jsonData;
        }
            //create location
        const errCreateLocation = await this.locationRepository.createLocation(locationData);
        if (errCreateLocation != null){   // check if error occured when registering new user
            const jsonData = dtoError(500, 'Internal server error');
            return jsonData;
        }
            return null;
    }

    async updateLocation(user, locationData, locationId){
        //get user by id
        const [userLog, errUserLog] = await this.userRepository.getUserByUserId(user.id);
        if (errUserLog != null) {
            const jsonData = dtoError(500, 'Internal server error');
            return jsonData;
        }

        //check if user is not admin
        if (!userLog.isAdmin) {
            const jsonData = dtoError(401, 'Unauthorized User');
            return jsonData;
        }
        
        //update location
        const [checkById, errCheckLocationById] = await this.locationRepository.getLocationById(locationId)
        if(errCheckLocationById != null){
            const jsonData = dtoError(500, 'Internal server error');
            return jsonData;
        }

        const errUpdateLocation = await this.locationRepository.updateLocation(locationData, locationId);
        if (errUpdateLocation != null){   // check if error occured when registering new user
            const jsonData = dtoError(500, 'Internal server error');
            return jsonData;
        }
        return null;
        
    }

    async deleteLocation(user, locationId){
        //get user by id
        const [userLog, errUserLog] = await this.userRepository.getUserByUserId(user.id);
        if (errUserLog != null) {
            const jsonData = dtoError(500, 'Internal server error');
            return jsonData;
        }

        //check if user is not admin
        if (!userLog.isAdmin) {
            const jsonData = dtoError(401, 'Unauthorized User');
            return jsonData;
        }

        const errDeleteLocation = await this.locationRepository.deleteLocation(locationId);
        if (errDeleteLocation != null){   
            const jsonData = dtoError(500, 'Internal server error');
            return jsonData;
        }
        return null;

    }

    async getAllLocation(search){
        if (search == undefined) {
            search = "";
        }

        const [allLocation, errAllLocation] = await this.locationRepository.getAllLocation(search)
        if (errAllLocation != null) {
            const jsonData = dtoError(500, 'Internal Server Error');
            return [null, jsonData];
        }
        return[allLocation, null];

    }

    async getLocationById(locationId){
        const [locationById, errLocationById] = await this.locationRepository.getLocationById(locationId)
        if (errLocationById != null) {
            const jsonData = dtoError(500, 'Internal Server Error');
            return [null, jsonData];
        }
        if (locationById == null){
            const jsonData = dtoError(404, 'Not Found');
            return [null, jsonData];
        }
        return[locationById, null]
    }
}

module.exports = LocationService;