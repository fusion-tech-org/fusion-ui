import { useEffect, useRef, useState } from "react";


const fetchUserData = () => {
  // Place the network request here
  console.log('Data fetching...');

  return {
    username: 'john_doe',
    password: 'user_password',
  };
};

const useSecureUserData = () => {
  const [userData, setUserData] = useState(null);

  const isUserAdmin = () => {
    // Implement your authorization logic here
    // For simplicity, assume logged user is admin
    return true;
  };

  useEffect(() => {
    const userProxy = new Proxy(fetchUserData(), {
      get(target, prop) {
        // Check if the user is authorized to access the user password
        if (prop === 'password' && !isUserAdmin()) {
          console.warn('Unauthorized access to password!');
          return null; // Return null or handle unauthorized access
        }

        return target[prop];
      },
    });

    setUserData(userProxy);
  }, []);

  return userData;
};

export const ProxyPattern = () => {
  const userData = useSecureUserData();

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p>Username: {userData.username}</p>
      <p>Password: {userData.password}</p>
    </div>
  );
};