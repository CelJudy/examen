import axios from "axios";

//const ip="http://localhost:3000/api/";
const ip="http://192.168.1.11:3000/api/";

export const saveName=async(name)=>{
    try{
        const options={
            url:`${ip}examen/nombre`,
            method:"POST",
            headers:{
                'Content-Type':'application/json',
            },
            data:{
                nombre:name
            }
        }
        const response=await axios.request(options);
        return {status:response.status, data:response.data}
    }catch(error){
        console.log(error);
    }
}
export const saveAnswer=async(id, data)=>{
    try{
        const options={
            url:`${ip}examen/respuesta/${id}`,
            method:"PATCH",
            headers:{
                'Content-Type':'application/json',
            },
            data:data
        }
        const response=await axios.request(options);
        return {status:response.status, data:response.data}
    }catch(error){
        console.log(error);
    }
}
export const selectAnswers=async(id)=>{
    try{
        const options={
            url:`${ip}select/id/respuestas/${id}`,
            method:"GET",
            headers:{
                'Content-Type':'application/json',
            }
        }
        const response=await axios.request(options);
        return {status:response.status, data:response.data}
    }catch(error){
        console.log(error);
    }
}