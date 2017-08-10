export default function getProfileData(id, data) {
  const result = data.filter(obj => obj.id == id);
  return result[0];
}
