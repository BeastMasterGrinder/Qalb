"use server"
import axios from "axios";

// Have to send the encoded prompt in future, make it end-to-end between client and my microservice

export async function getSentiments(prompt:string){
    try{
        const response = await axios.get(`https://qalb-microservice.onrender.com/qalb/${prompt}`);
        const jsonSentiments = response?.data;

        //@TODO: Remove this console.log
        console.log(jsonSentiments);
        return jsonSentiments;
    } catch (error) {
        console.error("Errro from getSentiments: ", error)
        return null;
    }
}