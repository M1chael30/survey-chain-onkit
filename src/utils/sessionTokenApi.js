/**
 * Session Token API utilities for secure initialization
 */
import { generateJwt } from '@coinbase/cdp-sdk/auth';

/**
 * Generates a JWT token for CDP API authentication using the CDP SDK
 * @param {string} keyName - The CDP API key name
 * @param {string} keySecret - The CDP API private key
 * @returns {Promise<string>} Signed JWT token
 */
export async function generateJWT(keyName, keySecret) {
  const requestMethod = 'POST';
  const requestHost = 'api.developer.coinbase.com';
  const requestPath = '/onramp/v1/token';

  try {
    // Use the CDP SDK to generate the JWT
    const token = await generateJwt({
      apiKeyId: keyName,
      apiKeySecret: keySecret,
      requestMethod: requestMethod,
      requestHost: requestHost,
      requestPath: requestPath,
      expiresIn: 120, // optional (defaults to 120 seconds)
    });

    return token;
  } catch (error) {
    console.error('Error generating JWT:', error);
    throw error;
  }
}

/**
 * Generates a session token for secure onramp/offramp initialization
 * @param {Object} params - The parameters for session token generation
 * @returns {Promise<string|null>} The session token or null if generation fails
 */
export async function generateSessionToken(params) {
  try {
    const response = await fetch('/api/session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Session token generation failed:', error);
      throw new Error(error.error || 'Failed to generate session token');
    }

    const data = await response.json();
    return data.token;
  } catch (error) {
    console.error('Error generating session token:', error);
    return null;
  }
}

/**
 * Helper function to format addresses for session token request
 * @param {string} address - The wallet address
 * @param {string[]} networks - Array of blockchain networks
 * @returns {Array<{address: string, blockchains: string[]}>} Formatted addresses array
 */
export function formatAddressesForToken(address, networks) {
  return [
    {
      address,
      blockchains: networks,
    },
  ];
}
