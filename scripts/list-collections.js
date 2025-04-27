// scripts/list-collections.js
const axios = require('axios');

const API_URL = 'https://vae-payload-hq.payloadcms.app';
const API_SECRET = process.env.PAYLOAD_SECRET;

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${API_SECRET}`
  }
});

async function listCollections() {
  console.log('Attempting to connect to Payload CMS...');
  
  try {
    // Try to get a list of collections or check API status
    const response = await apiClient.get('/api');
    console.log('API Root Response:', response.data);
  } catch (error) {
    console.error('Connection failed:', error.message);
    
    if (error.response) {
      console.log('Error status:', error.response.status);
      console.log('Error data:', error.response.data);
    }
  }
}

listCollections();