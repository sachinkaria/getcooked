import axios from 'axios';

const getUsers = () => (axios.get('http://localhost:3001/chefs'));

export default getUsers;
