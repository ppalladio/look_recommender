/**
 * An array of public routes that do not require authentication.
 * These routes are accessible to all users.
 *
 * @type {string[]}
 */
export const publicRoutes = ['/'];

/**
 * An array of authentication-related routes. for user authentication
 * These routes are used for user sign-in and sign-up processes.
 *
 * @type {string[]}
 */
export const authRoutes = ['/api/signIn', '/api/signUp'];

/**
 * The prefix for api authentication route.
 * This constant is used to define the base path for authentication endpoints.
 *
 * @type {string}
 */
export const authRoutePrefix = '/api/auth';
