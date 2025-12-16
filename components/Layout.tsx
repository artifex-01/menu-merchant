import React from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Store as StoreIcon, User, Plus, ArrowLeft, LayoutGrid } from 'lucide-react';

const Layout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Logic to identify page types
  const isStoreDetail = location.pathname.includes('/store/');
  // Check if current page is a sub-page of profile (e.g. /profile/edit, /profile/security)
  const isProfileSubPage = location.pathname.startsWith('/profile/') && location.pathname !== '/profile';
  const isAuthPage = ['/login', '/register', '/forgot-password'].includes(location.pathname);
  
  // Hide bottom nav on auth pages AND all profile sub-pages (edit, security, etc)
  // We keep bottom nav ONLY on main tabs: Home, Store List (implied), and main Profile tab
  const showBottomNav = !isAuthPage && !isProfileSubPage && !location.pathname.includes('/menu') && !location.pathname.includes('/qr');
  
  // Show back button on store details and profile sub-pages
  const showBackButton = isStoreDetail || isProfileSubPage;

  const getPageTitle = () => {
    if (location.pathname === '/') return 'My Stores';
    if (location.pathname === '/profile') return 'Merchant Profile';
    if (location.pathname === '/profile/edit') return 'Edit Profile';
    if (location.pathname === '/profile/security') return 'Login & Security';
    if (location.pathname === '/profile/notifications') return 'Notifications';
    if (location.pathname === '/profile/help') return 'Help Center';
    if (location.pathname.includes('/edit')) return 'Edit Store';
    if (location.pathname.includes('/menu')) return 'Menu Builder';
    if (location.pathname.includes('/qr')) return 'QR Code';
    return 'Merchant Hub';
  };

  return (
    <div className="w-full h-[100dvh] bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col relative overflow-hidden transition-colors duration-300">
      {/* Top Header - Hidden on Auth Pages */}
      {!isAuthPage && (
        <header className="bg-white dark:bg-gray-800 px-6 pt-14 pb-4 z-20 shadow-sm flex items-center justify-between shrink-0 transition-colors duration-300">
          <div className="flex items-center gap-3">
             {showBackButton && (
               <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 active:scale-95 transition-all">
                 <ArrowLeft size={22} strokeWidth={2.5} />
               </button>
             )}
             <div>
                <h1 className="text-xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-none transition-colors">{getPageTitle()}</h1>
                {!isStoreDetail && !isProfileSubPage && <p className="text-[11px] text-orange-600 dark:text-orange-400 font-bold uppercase tracking-wider mt-1">Merchant Dashboard</p>}
             </div>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white shadow-lg shadow-orange-500/20">
            <StoreIcon size={18} strokeWidth={2.5} />
          </div>
        </header>
      )}

      {/* Main Content Area */}
      <main className={`flex-1 overflow-y-auto scroll-smooth no-scrollbar ${showBottomNav ? 'pb-32' : 'pb-8'}`}>
        <Outlet />
      </main>

      {/* Modern Floating Bottom Navigation */}
      {showBottomNav && (
        <div className="absolute bottom-8 left-0 right-0 flex justify-center z-30 px-6 pointer-events-none">
          <nav className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl border border-white/50 dark:border-gray-700/50 shadow-[0_8px_30px_rgba(0,0,0,0.12)] rounded-full p-2 flex items-center gap-2 pointer-events-auto w-full max-w-[340px] transition-colors duration-300">
            
            {/* Home Tab */}
            <NavLink 
              to="/" 
              end
              className={({ isActive }) => `flex-1 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${isActive ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white shadow-inner' : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'}`}
            >
              {({ isActive }) => (
                <div className="flex flex-col items-center gap-0.5">
                    <LayoutGrid size={22} strokeWidth={isActive ? 2.5 : 2} />
                    {isActive && <div className="w-1 h-1 bg-gray-900 dark:bg-white rounded-full mt-0.5"></div>}
                </div>
              )}
            </NavLink>
            
            {/* Center Action Button */}
            <NavLink 
              to="/store/new" 
              className="flex-shrink-0 -mt-10"
            >
              <div className="w-16 h-16 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 flex items-center justify-center shadow-xl shadow-gray-900/30 border-[4px] border-white dark:border-gray-800 transition-all active:scale-95 hover:scale-105">
                <Plus size={28} strokeWidth={3} />
              </div>
            </NavLink>

            {/* Profile Tab */}
            <NavLink 
              to="/profile" 
              className={({ isActive }) => `flex-1 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${isActive ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white shadow-inner' : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'}`}
            >
              {({ isActive }) => (
                 <div className="flex flex-col items-center gap-0.5">
                    <User size={22} strokeWidth={isActive ? 2.5 : 2} />
                    {isActive && <div className="w-1 h-1 bg-gray-900 dark:bg-white rounded-full mt-0.5"></div>}
                 </div>
              )}
            </NavLink>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Layout;