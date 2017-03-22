function getProfileData (id, data) {
    result = data.filter(function( obj ) {
        return obj.id == id;
    });
    return result[0]
}

let helpers = {
    getData: function(id, data){
        return getProfileData(id, data)
    }
};

module.exports = helpers;