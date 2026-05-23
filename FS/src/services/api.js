import axios from 'axios'

const api = axios.create({
  baseURL: 'https://capstonebare-production.up.railway.app/api', 
})

// Dashboard
export const getDashboard = () => api.get('/dashboard')

// Students
export const getStudents = (params) => api.get('/students', { params })

// Predict
export const predictStudent = (data) => api.post('/predict', data)

// Predictions history
export const getPredictions = () => api.get('/predictions')