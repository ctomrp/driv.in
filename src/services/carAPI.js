import { axiosInstance } from "../utils/axiosInstance";

const carEndPoint = 'cars';

export class CarAPI {

    static async getAllCars(limit) {
        try {
            const response = await axiosInstance.get(carEndPoint, {
                params: {
                    drive: 'fwd',
                    limit: limit
                }
            });
            if (response.status === 200) return response.data;
        } catch (error) {
            console.error('CarAPI.getCarsByFilters:: ', error);
            throw error;
        }
    }

}