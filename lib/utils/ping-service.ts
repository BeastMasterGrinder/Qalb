'use server';
import axios from 'axios';

export async function pingMicroservice() {
    try {
        const baseUrl = process.env.QALB_MICRO_SERVICE;
        if (!baseUrl) {
            return; // Silently return if no URL configured
        }

        const response = await axios.get(`${baseUrl}/ping`);
        return response.data;
    } catch (error) {
        // Silently handle errors - we don't want to affect the main application
        return null;
    }
} 