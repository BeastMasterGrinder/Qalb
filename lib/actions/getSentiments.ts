"use server"
import axios from "axios";

// Have to send the encoded prompt in future, make it end-to-end between client and my microservice

export async function getSentiments(prompt:string){
    try{
        // Get the api key and pass it to the header:
        const apiKey = process.env.NEXT_ML_SERVICE_API_KEY;
        const headers = {
            "x-api-key": apiKey
        }

        const response = await axios.get(`https://qalb-microservice.onrender.com/qalb/${prompt}`, {headers});

        if (response.status !== 200) {
            throw new Error("Failed to get sentiments. Response status: " + response.status);
        }

        const jsonSentiments = response?.data;

        //@TODO: Remove this console.log
        // console.log(jsonSentiments);
        return jsonSentiments;
    } catch (error) {
        console.error("Errro from getSentiments: ", error)
        return null;
    }
}