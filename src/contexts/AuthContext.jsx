import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Check if user is stored in localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('avarista_user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (!user.likedStores) user.likedStores = [];
      setCurrentUser(user);
    }
    setLoading(false);
  }, []);
  
  // Mock login function
  const login = (email, password) => {
    // This would be replaced with an actual API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Mock validation
        if (email && password) {
          const user = {
            id: '123',
            name: 'John Doe',
            email,
            role: 'customer',
            avatar: 'https://via.placeholder.com/150',
          };
          
          setCurrentUser(user);
          localStorage.setItem('avarista_user', JSON.stringify(user));
          resolve(user);
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 500);
    });
  };
  
  // Mock retailer login
  const loginAsRetailer = (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password) {
          const user = {
            id: '456',
            name: 'Retail Store Owner',
            email,
            role: 'retailer',
            storeId: '1',
            avatar: 'https://via.placeholder.com/150',
          };
          
          setCurrentUser(user);
          localStorage.setItem('avarista_user', JSON.stringify(user));
          resolve(user);
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 500);
    });
  };
  
  // Mock logout function
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('avarista_user');
    return Promise.resolve();
  };
  
  // Mock register function
  const register = (name, email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (name && email && password) {
          const user = {
            id: Date.now().toString(),
            name,
            email,
            role: 'customer',
            avatar: 'https://via.placeholder.com/150',
          };
          
          setCurrentUser(user);
          localStorage.setItem('avarista_user', JSON.stringify(user));
          resolve(user);
        } else {
          reject(new Error('Invalid registration information'));
        }
      }, 500);
    });
  };
  
  // Add likedStores to user profile
  useEffect(() => {
    const storedUser = localStorage.getItem('avarista_user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (!user.likedStores) user.likedStores = [];
      setCurrentUser(user);
    }
    setLoading(false);
  }, []);

  const likeStore = (storeId) => {
    setCurrentUser(prev => {
      if (!prev) return prev;
      const updated = {
        ...prev,
        likedStores: prev.likedStores ? [...new Set([...prev.likedStores, storeId])] : [storeId]
      };
      localStorage.setItem('avarista_user', JSON.stringify(updated));
      return updated;
    });
  };

  const unlikeStore = (storeId) => {
    setCurrentUser(prev => {
      if (!prev) return prev;
      const updated = {
        ...prev,
        likedStores: prev.likedStores ? prev.likedStores.filter(id => id !== storeId) : []
      };
      localStorage.setItem('avarista_user', JSON.stringify(updated));
      return updated;
    });
  };

  const value = {
    currentUser,
    loading,
    login,
    loginAsRetailer,
    logout,
    register,
    likeStore,
    unlikeStore
  };
  
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};