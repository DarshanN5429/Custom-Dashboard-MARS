import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const fetchWidgets = async () => {
    const response = await apiClient.get('/widgets');
    return response.data;
};

export const createWidget = async (widget) => {
    const response = await apiClient.post('/widgets', widget);
    return response.data;
};
export const previewWidget = async (widget) => {
    const response = await apiClient.post('/widgets/preview', widget);
    return response.data;
};

export const updateWidget = async (id, widget) => {
    const response = await apiClient.put(`/widgets/${id}`, widget);
    return response.data;
};

export const deleteWidget = async (id) => {
    const response = await apiClient.delete(`/widgets/${id}`);
    return response.data;
};

export const saveDashboard = async (dashboardData) => {
    const response = await apiClient.post('/dashboard/layout', dashboardData);
    return response.data;
};

export const fetchDashboard = async () => {
    const response = await apiClient.get('/dashboard/fetch-widget');
    return response.data;
};

