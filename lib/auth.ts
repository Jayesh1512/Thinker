/**
 * Authentication utilities for admin access
 *
 * MVP: Simple bearer token authentication
 * Future: Upgrade to NextAuth.js or similar
 */

/**
 * Check if the request has valid admin authentication
 * Uses bearer token matching ADMIN_PASSWORD environment variable
 */
export async function checkAdminAuth(req: Request): Promise<boolean> {
  const authHeader = req.headers.get('authorization');
  const adminPassword = process.env.ADMIN_PASSWORD;

  // No password configured - deny access
  if (!adminPassword) {
    console.error('ADMIN_PASSWORD environment variable not set');
    return false;
  }

  // No auth header - deny access
  if (!authHeader) {
    return false;
  }

  // Parse authorization header
  const [type, credentials] = authHeader.split(' ');

  // Must be Bearer token
  if (type !== 'Bearer') {
    return false;
  }

  // Verify credentials match admin password
  return credentials === adminPassword;
}

/**
 * Create an unauthorized response
 */
export function unauthorizedResponse(message: string = 'Unauthorized'): Response {
  return Response.json(
    { error: message },
    {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Bearer realm="Admin Access"',
      },
    }
  );
}

/**
 * Create a forbidden response
 */
export function forbiddenResponse(message: string = 'Forbidden'): Response {
  return Response.json(
    { error: message },
    { status: 403 }
  );
}
