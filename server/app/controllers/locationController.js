const locationService = require('../services/locationService');

class LocationController {
    constructor(locationService) {
        this.locationService = locationService;
    }

    //create location
    async createLocation(req, res) {
        const locationData = req.body;
        const user = req.user;
        const errCreateLocation = await this.locationService.createLocation(user, locationData);
        //if error occured
        if (errCreateLocation != null) {
            return res.status(errCreateLocation.status).json({message: errCreateLocation.message});
        }

        //json message
        res.status(201).json({message: 'Location created'});
    }

    //
    async updateLocation(req, res) {
        const locationData = req.body;
        const user = req.user;
        const locationId = req.params.id;
        const errUpdateLocation = await this.locationService.updateLocation(user, locationData, locationId);
        //if error occured
        if (errUpdateLocation != null) {
            return res.status(errUpdateLocation.status).json({message: errUpdateLocation.message});
        }
        //return success
        res.status(200).json({message: 'Location updated'});
    }


    async getAllLocation(req, res) {
        //get query params
        const search = req.query.search;

        //get all location
        const [allLocation, errAllLocation] = await this.locationService.getAllLocation(search);
        if (errAllLocation != null) {
            return res.status(errAllLocation.status).json({
                message: errAllLocation.message,
                data: null
            });
        }

        res.status(200).json({
            message: "success get all location",
            data: allLocation});
    }

    async deleteLocation(req, res) {
        //get user auth
        const user = req.user;
        //get location id
        const locationId = req.params.id;
        //delete location
        const errDeleteLocation = await this.locationService.deleteLocation(user, locationId);
        if (errDeleteLocation != null) {
            return res.status(errDeleteLocation.status).json({message: errDeleteLocation.message});
        }

        res.status(200).json({message: 'Location deleted'});
    }

    async getLocationById(req, res){
        const locationId = req.params.id;

        const [location, errGetLocation] = await this.locationService.getLocationById(locationId);
        if (errGetLocation != null){
            return res.status(errGetLocation.status).json({
                message: errGetLocation.message,
                data: null
            });
        }
        res.status(200).json({
            message: "success get location",
            data: location});
    }
}

module.exports = LocationController;