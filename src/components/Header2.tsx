'use client'
import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../services/queries';
import LoadingIndicator from './LoadingIndicator';
import Sidebar from './Sidebar';
import { axiosInstance } from '../services/fetcher';

const Header = () => {
  const { data, isLoading, error } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (isLoading) return <LoadingIndicator />;
  if (error) return <div className="text-center text-red-600">Failed to load user data.</div>;

  const isLoggedIn = data?.isAuthenticated;

  const handleLogout = async () => {
    try {
      const result = await axiosInstance('/auth/logout');
      window.location.href = '/'; // Redirect to the sign-in page
    } catch (error) {
      console.error('Logout failed:', error);
      // Handle error, maybe display a message to the user
    }
  };
  

  return (
    <>
      <header className="bg-gray-800 text-white px-20 py-4 flex justify-between items-center shadow-md">
        <Link href="/"
          className="text-lg font-bold hover:text-gray-300 transition-colors">دوري
        </Link>
        <div className="hidden md:flex space-x-4">
          <Link href="/" className="hover:text-gray-300 transition-colors font-bold py-2 px-4">الرئيسية</Link>
          {isLoggedIn ? (
            <>
              <Link href="/create"className="hover:text-gray-300 transition-colors font-bold py-2 px-4">أنشئ</Link>
              <Link href="/my-pages"className="hover:text-gray-300 transition-colors font-bold py-2 px-4">دورياتي</Link>
              <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 transition-colors text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">تسجيل الخروج</button>
            </>
          ) : (
            <>
              <Link href="/signin" className="hover:text-gray-300 transition-colors font-bold py-2 px-4">تسجيل دخول</Link>
              <Link href="/signup" className="bg-blue-500 hover:bg-blue-700 transition-colors text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">مستخدم جديد</Link>
            </>
          )}
        </div>
        <button className="md:hidden px-2 py-1 rounded-md bg-gray-700 hover:bg-gray-600 transition-colors" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          {/* Replace "Menu" with an icon or SVG for better UX */}
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
        </button>
      </header>
      <Sidebar isOpen={isSidebarOpen} toggle={() => setIsSidebarOpen(false)} isLoggedIn={isLoggedIn} />
    </>
  );
};

export default Header;
