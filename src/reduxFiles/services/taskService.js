import axios from "axios"

const API_URL = "https://mern-task-recorder-api.onrender.com/api/tasks"

const get = async(token) => {
    const res = await axios.get(API_URL,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    
    return res.data;
}

const post = async(data,token) => {
    const res = await axios.post(API_URL, {data:data}, {
        headers:{
            Authorization:`Bearer ${token}`
        }
    })

    return res.data;
}

const taskService = {
    get,
    post
}

export default taskService