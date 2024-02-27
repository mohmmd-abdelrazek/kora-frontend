import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../services/queries';

const withAuth = (WrappedComponent: React.ComponentType<any>) => {
  const Auth: React.FC = (props) => {
    const router = useRouter();
    const {data, isLoading} = useAuth();

    useEffect(() => {
      if (!data?.isAuthenticated && !isLoading) {
      
          router.push('/signin');
        
      }
    }, [data?.isAuthenticated, isLoading, router]);

    if (isLoading) {
      return <div>Loading...</div>; // Or your custom loading indicator
    }

    if (!data?.isAuthenticated) {
      return null; // Prevent flash of content
    }

    return <WrappedComponent {...props} />;
  };

  return Auth;
};

export default withAuth;
