// src/lib/api.ts

// Types for API responses
interface PayloadResponse<T> {
  docs: T[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

interface Homepage {
  id: string;
  title: string;
  hero?: any;
  body?: any[];
  callToAction?: any;
  siteKey: string;
  [key: string]: any;
}

interface Navigation {
  id: string;
  menuItems?: Array<{
    label: string;
    href: string;
  }>;
  siteKey: string;
  [key: string]: any;
}

interface SiteSettings {
  id: string;
  siteTitle?: string;
  navigation?: any;
  contact?: any;
  siteKey: string;
  [key: string]: any;
}

interface Service {
  id: string;
  title: string;
  description?: string;
  slug?: string;
  siteKey: string;
  [key: string]: any;
}

interface Video {
  id: string;
  publicId: string;
  siteKey: string;
  [key: string]: any;
}

// API configuration
const API_URL = process.env.PAYLOAD_PUBLIC_SERVER_URL || 'https://vae-payload-hq.payloadcms.app';
const API_SECRET = process.env.PAYLOAD_SECRET;
const DEFAULT_SITE_KEY = 'dfwPoolBuilder';

// Revalidation time in seconds
const REVALIDATION_TIME = 60; // 1 minute, adjust as needed

// Helper function to create the site key filter
function createSiteKeyFilter(siteKey: string = DEFAULT_SITE_KEY) {
  return {
    siteKey: {
      equals: siteKey
    }
  };
}

// Helper function for proper query parameter serialization
function serializeParams(params: Record<string, any>): string {
  const searchParams = new URLSearchParams();
  
  // Handle special case for 'where' parameter (needs to be stringified)
  if (params.where) {
    searchParams.append('where', JSON.stringify(params.where));
  }
  
  // Add all other parameters
  Object.entries(params).forEach(([key, value]) => {
    if (key !== 'where') {
      searchParams.append(key, value.toString());
    }
  });
  
  return searchParams.toString();
}

// Base fetch function with error handling and revalidation
async function fetchFromPayload<T>(
  endpoint: string, 
  params: Record<string, any> = {},
  siteKey: string = DEFAULT_SITE_KEY
): Promise<PayloadResponse<T> | null> {
  // Apply site key filter by default unless explicitly provided in params
  const whereParams = params.where || createSiteKeyFilter(siteKey);
  
  const url = `${API_URL}${endpoint}?${serializeParams({
    ...params,
    where: whereParams
  })}`;
  
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${API_SECRET}`,
        'Content-Type': 'application/json',
      },
      next: { 
        revalidate: REVALIDATION_TIME 
      }
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching from ${endpoint}:`, error);
    return null;
  }
}

// Fetch the homepage data
export async function getHomepage(siteKey: string = DEFAULT_SITE_KEY): Promise<Homepage | null> {
  const data = await fetchFromPayload<Homepage>('/api/homepage', {
    depth: 2 // To populate relationships
  }, siteKey);
  
  return data?.docs?.[0] || null;
}

// Fetch navigation data
export async function getNavigation(siteKey: string = DEFAULT_SITE_KEY): Promise<Navigation | null> {
  const data = await fetchFromPayload<Navigation>('/api/navigation', {
    depth: 2
  }, siteKey);
  
  return data?.docs?.[0] || null;
}

// Fetch site settings
export async function getSiteSettings(siteKey: string = DEFAULT_SITE_KEY): Promise<SiteSettings | null> {
  const data = await fetchFromPayload<SiteSettings>('/api/siteSettings', {}, siteKey);
  
  return data?.docs?.[0] || null;
}

// Fetch services
export async function getServices(siteKey: string = DEFAULT_SITE_KEY): Promise<Service[]> {
  const data = await fetchFromPayload<Service>('/api/services', {}, siteKey);

  return data?.docs || [];
}

// Fetch videos with pagination
export async function getVideos(
  page: number = 1,
  limit: number = 9,
  siteKey: string = DEFAULT_SITE_KEY
): Promise<PayloadResponse<Video> | null> {
  const data = await fetchFromPayload<Video>(
    '/api/videos',
    { page, limit },
    siteKey
  );

  return data;
}