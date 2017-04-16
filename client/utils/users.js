import axios from 'axios';

const getUsers = () => {
    return (axios.get('http://localhost:3001/search'));
};

export default getUsers;