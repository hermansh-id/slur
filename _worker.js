export default {
  async fetch(request, env, ctx) {
    // The rest of your Worker code goes here
    const url = new URL(request.url);
    
    // Serve static assets from the .next directory
    if (url.pathname.startsWith('/_next/')) {
      // This is a Next.js asset
      return env.ASSETS.fetch(request);
    }
    
    // Otherwise, serve the Next.js application
    return env.NEXT_APP.fetch(request);
  }
}; 