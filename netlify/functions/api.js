process.env.NETLIFY = 'true';
process.env.SITEMAP_PATH = require('path').join(process.cwd(), 'sitemap.xml');

const mongoose = require('mongoose');
const serverless = require('serverless-http');
const app = require('../../server');

const proxy = serverless(app, { basePath: '/.netlify/functions/api' });
let connectionPromise;

async function connectToDatabase() {
  if (mongoose.connection.readyState === 1) return;
  if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI is not configured.');
  if (!connectionPromise) {
    connectionPromise = mongoose.connect(process.env.MONGODB_URI).catch(error => {
      connectionPromise = null;
      throw error;
    });
  }
  await connectionPromise;
}

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    await connectToDatabase();
    return await proxy(event, context);
  } catch (error) {
    console.error('Netlify API request failed:', error.message);
    return {
      statusCode: 503,
      headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
      body: JSON.stringify({ error: 'The service is temporarily unavailable.' })
    };
  }
};
