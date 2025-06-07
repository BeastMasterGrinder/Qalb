'use server';
import axios from 'axios';

export async function pingMicroservice() {
    try {
        const baseUrl = process.env.QALB_MICRO_SERVICE;
        if (!baseUrl) {
            console.warn('QALB_MICRO_SERVICE environment variable is not set');
            return;
        }

        const response = await axios.get(`${baseUrl}/ping`);
        console.log('Microservice ping successful:', response.status);
        return response.data;
    } catch (error) {
        console.error('Failed to ping microservice:', error);
        // Don't throw the error as this is not critical for app function
        return null;
    }
} 