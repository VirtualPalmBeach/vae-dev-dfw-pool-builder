// scripts/test-payload-connection.js
const axios = require('axios');

// These would normally come from environment variables
const API_URL = 'https://vae-payload-hq.payloadcms.app';
const API_SECRET = process.env.PAYLOAD_SECRET;
const SITE_KEY = 'dfwPoolBuilder';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${API_SECRET}`
  }
});

async function testConnection() {
  console.log('Testing Payload CMS connection...');
  
  try {
    // Test homepage endpoint
    console.log('\nTesting homepages collection:');
    const homepageResponse = await apiClient.get('/api/homepages', {
      params: {
        where: {
          siteKey: {
            equals: SITE_KEY
          }
        }
      }
    });
    console.log('Status:', homepageResponse.status);
    console.log('Data structure:', Object.keys(homepageResponse.data));
    console.log('Number of documents:', homepageResponse.data.docs?.length || 0);
    console.log('First document fields:', homepageResponse.data.docs?.[0] ? Object.keys(homepageResponse.data.docs[0]) : 'No documents found');
    
    // Test other collections
    const collections = ['navigations', 'siteSettings', 'services'];
    
    for (const collection of collections) {
      console.log(`\nTesting ${collection} collection:`);
      try {
        const response = await apiClient.get(`/api/${collection}`, {
          params: {
            where: {
              siteKey: {
                equals: SITE_KEY
              }
            }
          }
        });
        console.log('Status:', response.status);
        console.log('Data structure:', Object.keys(response.data));
        console.log('Number of documents:', response.data.docs?.length || 0);
      } catch (error) {
        console.error(`Error with ${collection}:`, error.message);
      }
    }
    
  } catch (error) {
    console.error('Connection test failed:', error.message);
  }
}

testConnection();