const dtoLocation = (location) => {
    const location = {
        id: location.id,
        name: location.name,
        address: location.address,
        description: location.description,
        photo: location.photo,
        label: location.label
    }

    return location;
}

exports.dtoLocation = dtoLocation;