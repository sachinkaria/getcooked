import axios from 'axios';

const getUsers = () => (axios.get('http://localhost:3000/chefs'));

export default getUsers;
