import axios from "axios";

const API_URL = "http://localhost:8080";

export const getTasks = async () => {
    try {
        const response = await axios.get(`${API_URL}/task`);
        return response.data;
    } catch (error) {
        console.error("Error fetching tasks:", error);
        return [];
    }
};

export const addTask = async (task) => {
    try {
        const response = await axios.post(`${API_URL}/task`, task);
        return response.data;
    } catch (error) {
        console.error("Error adding task:", error);
        return null;
    }
};

export const updateTask = async (id, task) => {
    try {
        const response = await axios.put(`${API_URL}/task/${id}`, task);
        return response.data;
    } catch (error) {
        console.error("Error updating task:", error);
        return null;
    }
};

export const deleteTask = async (id) => {
    try {
        await axios.delete(`${API_URL}/task/${id}`);
    } catch (error) {
        console.error("Error deleting task:", error);
    }
};

export const completeTask = async (id) => {
    try {
        const response = await axios.put(`${API_URL}/task/${id}/complete`);
        return response.data;
    } catch (error) {
        console.error("Error completing task:", error);
        return null;
    }
};