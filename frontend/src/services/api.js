import axios from 'axios';

// Create an axios instance
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Adjust in production
});

// Intercept requests to attach the token
api.interceptors.request.use(
  (config) => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      const parsedUser = JSON.parse(userInfo);
      if (parsedUser && parsedUser.token) {
        config.headers.Authorization = `Bearer ${parsedUser.token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Opportunities API
export const getOpportunities = async (search = '', domain = '') => {
  const { data } = await api.get(`/opportunities?search=${search}&domain=${domain}`);
  return data;
};

export const getOpportunityById = async (id) => {
  const { data } = await api.get(`/opportunities/${id}`);
  return data;
};

export const createOpportunity = async (opportunityData) => {
  const { data } = await api.post('/opportunities', opportunityData);
  return data;
};

export const updateOpportunity = async (id, opportunityData) => {
  const { data } = await api.put(`/opportunities/${id}`, opportunityData);
  return data;
};

export const deleteOpportunity = async (id) => {
  const { data } = await api.delete(`/opportunities/${id}`);
  return data;
};

// Applications API
export const submitApplication = async (applicationData) => {
  const { data } = await api.post('/applications', applicationData);
  return data;
};

export const getApplications = async () => {
  const { data } = await api.get('/applications');
  return data;
};

export default api;
