const axios = require('axios');

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const googleScriptUrl = 'https://script.google.com/macros/s/AKfycbxfUAB-uPsPoPf_zKSW2ltTgytThmGzfdiESQj4dB5ajKCLHY2KD7NCrTUB0F21XIkk/exec'; // Replace with your actual Google Apps Script URL

  try {
    const response = await axios.post(googleScriptUrl, JSON.parse(event.body), {
      headers: { 'Content-Type': 'application/json' },
    });
    return {
      statusCode: response.status,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    console.error('Error forwarding to Google Script:', error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to send data to Google Apps Script' }),
    };
  }
};
