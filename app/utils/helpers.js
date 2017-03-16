function getProfileData (id, data) {
    return data.filter(function( obj ) {
        return obj.id == id;
    });
}

let helpers = {
    getData: function(id, data){
        return getProfileData(id, data)
    }
};

module.exports = helpers;