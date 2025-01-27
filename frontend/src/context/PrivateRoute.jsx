import { Navigate } from 'react-router-dom'; // For programmatically navigating users
import { useAuth } from './AuthProvider'; // Custom hook to check authentication status
import { RoutesPathName } from '../constants'; // Centralized route path constants

/**
 * PrivateRoute: A wrapper component to restrict access based on authentication.
 * - If the user is authenticated, it renders the child components.
 * - If not authenticated, it redirects the user to the login page.
 *
 * @param {ReactNode} children - The child components to render if authenticated.
 * @returns {ReactNode | JSX.Element} - The children if authenticated or a redirect to the login page.
 */
export default function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth(); // Get the authentication status from AuthProvider

  // If the user is not authenticated, redirect to the login page
  if (!isAuthenticated) {
    return <Navigate to={RoutesPathName.LOGIN_PAGE} replace />;
  }
 
  // If authenticated, render the child components
  return children;
}