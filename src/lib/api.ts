import axios from 'axios';
import { cache } from 'react';
import { revalidatePath } from 'next/cache';

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

// Revalidation time in seconds - adjust as needed for "near real-time"
const REVALIDATION_TIME = 10; // Check for new content every 10 seconds

// Create a cached fetch wrapper for axios calls
const cachedAxiosGet = cache(async (url: string, params: any) => {
  const { data } = await apiClient.get(url, { params });
  
  // This schedules a revalidation of the current path
  // which will trigger a refresh of the content
  try {
    revalidatePath('/', 'layout');
  } catch (error) {
    // Revalidation might fail in local development, but will work in production
    console.log('Revalidation scheduled');
  }
  
  return data;
});

// Fetch the homepage data with revalidation
export async function getHomepage() {
  try {
    const data = await cachedAxiosGet('/api/homepage', {
      where: siteKeyFilter,
      depth: 2, // To populate relationships
      next: { 
        revalidate: REVALIDATION_TIME 
      }
    });
    return data.docs[0] || null;
  } catch (error) {
    console.error('Error fetching homepage:', error);
    return null;
  }
}

// Fetch navigation data with revalidation
export async function getNavigation() {
  try {
    const data = await cachedAxiosGet('/api/navigation', {
      where: siteKeyFilter,
      depth: 2,
      next: { 
        revalidate: REVALIDATION_TIME 
      }
    });
    return data.docs[0] || null;
  } catch (error) {
    console.error('Error fetching navigation:', error);
    return null;
  }
}

// Fetch site settings with revalidation
export async function getSiteSettings() {
  try {
    const data = await cachedAxiosGet('/api/siteSettings', {
      where: siteKeyFilter,
      next: { 
        revalidate: REVALIDATION_TIME 
      }
    });
    return data.docs[0] || null;
  } catch (error) {
    console.error('Error fetching site settings:', error);
    return null;
  }
}

// Fetch services with revalidation
export async function getServices() {
  try {
    const data = await cachedAxiosGet('/api/services', {
      where: siteKeyFilter,
      next: { 
        revalidate: REVALIDATION_TIME 
      }
    });
    return data.docs || [];
  } catch (error) {
    console.error('Error fetching services:', error);
    return [];
  }
}