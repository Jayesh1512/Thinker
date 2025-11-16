/**
 * Admin Authentication Utilities
 *
 * Simple bearer token authentication for MVP.
 * For production, consider upgrading to NextAuth.js or similar.
 */

/**
 * Check if request has valid admin authentication
 *
 * @param request - Next.js Request object
 * @returns true if authenticated, false otherwise
 */
export async function checkAdminAuth(request: Request): Promise<boolean> {
  try {
    const authHeader = request.headers.get('authorization');
    const adminPassword = process.env.ADMIN_PASSWORD;

    // Check if admin password is configured
    if (!adminPassword) {
      console.error('ADMIN_PASSWORD not configured in environment variables');
      return false;
    }

    // Check if authorization header exists
    if (!authHeader) {
      return false;
    }

    // Parse Bearer token
    const [type, credentials] = authHeader.split(' ');

    // Validate format
    if (type !== 'Bearer' || !credentials) {
      return false;
    }

    // Compare credentials with configured password
    return credentials === adminPassword;
  } catch (error) {
    console.error('Admin auth check error:', error);
    return false;
  }
}

/**
 * Create an unauthorized response
 */
export function unauthorizedResponse(message: string = 'Unauthorized') {
  return Response.json(
    { error: message },
    {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Bearer realm="Admin Area"',
      },
    }
  );
}

/**
 * Verify admin authentication or return error response
 *
 * @param request - Next.js Request object
 * @returns null if authenticated, Response if not authenticated
 */
export async function requireAdminAuth(
  request: Request
): Promise<Response | null> {
  const isAuthorized = await checkAdminAuth(request);

  if (!isAuthorized) {
    return unauthorizedResponse('Admin authentication required');
  }

  return null;
}
