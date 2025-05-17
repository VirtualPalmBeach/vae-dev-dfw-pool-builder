import axios from 'axios';



const API_URL = process.env.PAYLOAD_PUBLIC_SERVER_URL || 'https://vae-payload-hq.payloadcms.app';

const API_SECRET = process.env.PAYLOAD_SECRET;

const SITE_KEY = 'dfwPoolBuilder';



// Configure axios with auth headers

const apiClient = axios.create({

  baseURL: API_URL,

  headers: {

    Authorization: `Bearer ${API_SECRET}`

  }

});



// Helper function to create the site key filter

const siteKeyFilter = {

  siteKey: {

    equals: SITE_KEY

  }

};



// Fetch the homepage data

export async function getHomepage() {

  try {

    const { data } = await apiClient.get('/api/homepage', {

      params: {

        where: siteKeyFilter,

        depth: 2 // To populate relationships

      }

    });

    return data.docs[0] || null;

  } catch (error) {

    console.error('Error fetching homepage:', error);

    return null;

  }

}



// Fetch navigation data

export async function getNavigation() {

  try {

    const { data } = await apiClient.get('/api/navigation', {

      params: {

        where: siteKeyFilter,

        depth: 2,

      },

    });

    return data.docs[0] || null;

  } catch (error) {

    console.error('Error fetching navigation:', error);

    return null;

  }

}



// Fetch site settings

export async function getSiteSettings() {

  try {

    const { data } = await apiClient.get('/api/siteSettings', {

      params: {

        where: siteKeyFilter

      }

    });

    return data.docs[0] || null;

  } catch (error) {

    console.error('Error fetching site settings:', error);

    return null;

  }

}



// Fetch services

export async function getServices() {

  try {

    const { data } = await apiClient.get('/api/services', {

      params: {

        where: siteKeyFilter

      }

    });

    return data.docs || [];

  } catch (error) {

    console.error('Error fetching services:', error);

    return [];

  }

}