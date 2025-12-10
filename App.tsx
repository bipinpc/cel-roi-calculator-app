import { useState } from 'react';
import { Calculator } from './components/Calculator';
import { CategoryNavigation } from './components/CategoryNavigation';
import { TrendingUp, Moon, Sun, LogIn, LogOut, User, FileDown } from 'lucide-react';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleLogin = () => {
    // Login functionality
    console.log('Login clicked');
  };

  const handleLogout = () => {
    // Logout functionality
    console.log('Logout clicked');
  };

  const handlePDFExport = () => {
    // PDF export functionality
    console.log('PDF Export clicked');
  };

  return (
    <div className={`min-h-screen overflow-x-hidden ${isDarkMode ? 'bg-slate-900' : 'bg-gradient-to-br from-slate-50 to-slate-100'}`}>
      {/* Top Header */}
      <header className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} border-b sticky top-0 z-50 shadow-sm`}>
        <div className="w-full px-3 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            {/* Company Logo */}
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
              <div className={`${isDarkMode ? 'bg-blue-600' : 'bg-blue-600'} rounded-lg p-1.5 sm:p-2 flex-shrink-0`}>
                <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div className="min-w-0">
                <h1 className={`${isDarkMode ? 'text-white' : 'text-slate-900'} text-base sm:text-xl font-bold truncate`}>Celsior ROI Calculator</h1>
                <p className={`${isDarkMode ? 'text-slate-400' : 'text-slate-500'} text-xs sm:text-sm hidden sm:block`}>AI Productivity Tools Analysis</p>
              </div>
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
              {/* Theme Switcher */}
              <button
                onClick={toggleTheme}
                className={`${isDarkMode ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'} p-2.5 sm:p-2 rounded-lg transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center`}
                title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                aria-label={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              {/* Login Icon */}
              <button
                onClick={handleLogin}
                className={`${isDarkMode ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'} p-2.5 sm:p-2 rounded-lg transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center hidden sm:flex`}
                title="Profile"
                aria-label="Profile"
              >
                <User className="w-5 h-5" />
              </button>

              {/* Logout Icon */}
              <button
                onClick={handleLogout}
                className={`${isDarkMode ? 'bg-red-900/20 text-red-400 hover:bg-red-900/30' : 'bg-red-50 text-red-600 hover:bg-red-100'} p-2.5 sm:px-3 sm:py-2 rounded-lg transition-colors flex items-center gap-2 min-w-[44px] min-h-[44px]`}
                title="Logout"
                aria-label="Logout"
              >
                <LogOut className="w-5 h-5" />
                <span className="text-sm hidden lg:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="w-full px-3 sm:px-6 py-3 sm:py-4">
        {/* Page Title */}
        <div className="mb-3 flex flex-col sm:flex-row items-start sm:items-start justify-between gap-3 sm:gap-4">
          <div className="flex-1 min-w-0 w-full sm:w-auto">
            <h2 className={`${isDarkMode ? 'text-white' : 'text-slate-900'} mb-1 sm:mb-2 font-bold text-lg sm:text-xl`}>AI Productivity Tools ROI Calculator</h2>
            <p className={`${isDarkMode ? 'text-slate-400' : 'text-slate-600'} max-w-4xl overflow-hidden text-sm sm:text-base`}>
              Evaluate the return on investment for AI productivity tools and make data-driven decisions for your development team
            </p>
          </div>
          
          {/* PDF Export Button - Right Aligned */}
          <button
            onClick={handlePDFExport}
            className={`bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-xl ${
              isDarkMode ? 'shadow-blue-900/50' : 'shadow-blue-600/30'
            } px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 sm:gap-3 w-full sm:w-auto font-semibold hover:scale-105 hover:shadow-2xl group border border-blue-400/30 min-h-[44px]`}
            title="Export to PDF"
            aria-label="Export to PDF"
          >
            <FileDown className="w-5 h-5 sm:w-6 sm:h-6 group-hover:animate-bounce" />
            <span className="text-sm sm:text-base">Export PDF</span>
          </button>
        </div>

        {/* Category Navigation */}
        <CategoryNavigation isDarkMode={isDarkMode} />

        {/* Main Calculator */}
        <Calculator isDarkMode={isDarkMode} />
      </div>

      {/* Footer */}
      <footer className={`${isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-400' : 'bg-white border-slate-200 text-slate-600'} border-t mt-6`}>
        <div className="w-full px-6 py-6">
          <div className="text-center text-sm">
            © 2025 Copyright Pyramid Consulting Inc. | All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}