import React, {useEffect} from 'react'
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';

const Protect = ({ children }) => {
  const { User, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && User) {
      if (User.role !== "customer") router.push("/VendorTools/Dashboard");
    }
  }, [User, isLoading]);


  if (isLoading ) return <p>Loading...</p>;

  return children;
}

export default Protect