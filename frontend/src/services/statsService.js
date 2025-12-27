import api from './api';

// Get dashboard statistics
export const getDashboardStats = async () => {
    try {
        const response = await api.get('/stats/dashboard');
        return response.data;
    } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        throw error;
    }
};

export default {
    getDashboardStats
};
