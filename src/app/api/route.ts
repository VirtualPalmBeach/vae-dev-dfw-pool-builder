import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

// Use environment variable for security
const REVALIDATION_TOKEN = process.env.REVALIDATION_TOKEN;

export async function POST(request: NextRequest) {
 try {
   // Check if token is configured
   if (!REVALIDATION_TOKEN) {
     console.error('REVALIDATION_TOKEN environment variable is not set');
     return NextResponse.json(
       { success: false, message: 'Server configuration error' },
       { status: 500 }
     );
   }

   const requestBody = await request.json();
   const requestToken = request.nextUrl.searchParams.get('token');

   // Validate the token
   if (requestToken !== REVALIDATION_TOKEN) {
     return NextResponse.json(
       { success: false, message: 'Invalid token' },
       { status: 401 }
     );
   }

   // Get collection and doc information from Payload webhook
   const collection = requestBody.collection;
   
   // Revalidate the specific path if provided
   if (requestBody.doc?.siteKey === 'dfwPoolBuilder') {
     // Revalidate the homepage
     revalidatePath('/', 'layout');
     
     // If the updated document is from a specific collection, revalidate related paths
     if (collection === 'services') {
       revalidatePath('/services', 'layout');
     }

     // You can add more collection-specific paths as needed
     
     return NextResponse.json({
       success: true,
       message: `Revalidated paths for ${collection}`,
       revalidated: true,
     });
   }

   return NextResponse.json({
     success: false,
     message: 'Not revalidated: Document is not for this site',
   });

 } catch (error) {
   console.error('Revalidation error:', error);
   return NextResponse.json(
     { success: false, message: 'Error revalidating', error: String(error) },
     { status: 500 }
   );
 }
}