import React from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Store as StoreIcon, User, PlusCircle, ArrowLeft } from 'lucide-react';

const Layout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isStoreDetail = location.pathname.includes('/store/');
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  const getPageTitle = () => {
    if (location.pathname === '/') return 'My Stores';
    if (location.pathname === '/profile') return 'Merchant Profile';
    if (location.pathname.includes('/edit')) return 'Edit Store';
    if (location.pathname.includes('/menu')) return 'Menu Builder';
    if (location.pathname.includes('/qr')) return 'QR Code';
    return 'Merchant Hub';
  };

  return (
    <div className="w-[430px] h-[932px] bg-gray-50 text-gray-900 flex flex-col relative shadow-2xl overflow-hidden rounded-[55px] border-[8px] border-gray-900 ring-1 ring-white/10 transform-gpu">
      {/* Top Header - Hidden on Auth Pages */}
      {!isAuthPage && (
        <header className="bg-white px-6 pt-14 pb-4 z-20 shadow-sm flex items-center justify-between shrink-0 transition-all">
          <div className="flex items-center gap-3">
             {isStoreDetail && (
               <button onClick={() => navigate(-1)} className="p-1 -ml-2 rounded-full hover:bg-gray-100 text-gray-600">
                 <ArrowLeft size={24} />
               </button>
             )}
             <div>
                <h1 className="text-xl font-bold text-gray-900 tracking-tight">{getPageTitle()}</h1>
                {!isStoreDetail && <p className="text-xs text-orange-600 font-medium">Merchant Dashboard</p>}
             </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white shadow-md">
            <StoreIcon size={16} />
          </div>
        </header>
      )}

      {/* Main Content Area */}
      <main className={`flex-1 overflow-y-auto scroll-smooth no-scrollbar ${!isAuthPage ? 'pb-24' : ''}`}>
        <Outlet />
      </main>

      {/* Bottom Navigation - Hidden on Auth Pages */}
      {!isAuthPage && (
        <nav className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-100 px-8 pb-8 pt-4 flex justify-between items-center z-30 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
          <NavLink 
            to="/" 
            end
            className={({ isActive }) => `flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-orange-600' : 'text-gray-400 hover:text-gray-600'}`}
          >
            {({ isActive }) => (
              <>
                <StoreIcon size={24} strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-[10px] font-medium">Stores</span>
              </>
            )}
          </NavLink>
          
          <NavLink 
            to="/store/new" 
            className={({ isActive }) => `flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-orange-600' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <div className="w-12 h-12 rounded-full bg-gray-900 text-white flex items-center justify-center shadow-lg -mt-8 border-4 border-gray-50">
              <PlusCircle size={24} />
            </div>
            <span className="text-[10px] font-medium">Add New</span>
          </NavLink>

          <NavLink 
            to="/profile" 
            className={({ isActive }) => `flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-orange-600' : 'text-gray-400 hover:text-gray-600'}`}
          >
            {({ isActive }) => (
              <>
                <User size={24} strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-[10px] font-medium">Account</span>
              </>
            )}
          </NavLink>
        </nav>
      )}
      
      {/* Home Indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-gray-300 rounded-full z-40 pointer-events-none"></div>
    </div>
  );
};

export default Layout;