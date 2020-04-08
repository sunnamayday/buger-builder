import axios from 'axios';


const instance = axios.create({
    baseURL: "https://burger-builder-73e36.firebaseio.com/"
})

export default instance;