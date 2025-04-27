// scripts/test-connection.mjs
import axios from 'axios';

// Get environment variables from process
const API_URL = process.env.PAYLOAD_PUBLIC_SERVER_URL;
const API_SECRET = process.env.PAYLOAD_SECRET;
const SITE_KEY = 'dfwPoolBuilder';

console.log('Testing connection to Payload CMS...');
console.log('API URL:', API_URL);
console.log('API Secret length:', API_SECRET ? API_SECRET.length : 'not set');

// Create axios client with auth
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: API_SECRET ? `Bearer ${API_SECRET}` : undefined
  }
});

// Test connection to homepage collection
async function testConnection() {
  try {
    console.log('\nAttempting to fetch from /api/homepage...');
    const response = await apiClient.get('/api/homepage');
    console.log('Success! Status:', response.status);
    console.log('Response structure:', Object.keys(response.data));
    console.log('Total docs:', response.data.docs?.length || 0);
  } catch (error) {
    console.error('Connection failed:', error.message);
    
    // Try without the site key filter
    try {
      console.log('\nTrying again without filters...');
      const simpleResponse = await apiClient.get('/api/homepage');
      console.log('Success on simple request! Status:', simpleResponse.status);
    } catch (secondError) {
      console.error('Second attempt also failed:', secondError.message);
    }
  }
}

testConnection();