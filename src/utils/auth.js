export const isAuthenticated = () => {
    const token = sessionStorage.getItem('token');  
    // Add your token validation logic here (e.g., check expiration)  
    return !!token; // This is a basic check. Enhance it as needed.  
  };