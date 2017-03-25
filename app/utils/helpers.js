export default function getProfileData (id, data) {
    let result = data.filter(function( obj ) {
        return obj.id == id;
    });
    return result[0]
};