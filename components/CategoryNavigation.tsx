import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Save, Trash2 } from 'lucide-react';

interface CategoryNavigationProps {
  isDarkMode: boolean;
}

export function CategoryNavigation({ isDarkMode }: CategoryNavigationProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState('Select Existing Calculations');
  const [searchInput, setSearchInput] = useState('Celsior ROI Calculator Title');
  const [titles, setTitles] = useState([
    'Select Existing Calculations',
    'Q1 2025 Budget Planning',
    'Enterprise AI Evaluation',
    'Developer Productivity Study',
    'Cost Optimization Analysis'
  ]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [titleToDelete, setTitleToDelete] = useState<string>('');
  
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleTitleSelect = (title: string) => {
    setSelectedTitle(title);
    setSearchInput(title);
    setIsDropdownOpen(false);
  };

  const handleSave = () => {
    const trimmedInput = searchInput.trim();
    
    // Only save if input is not empty and not the placeholder
    if (trimmedInput && trimmedInput !== 'Celsior ROI Calculator Title') {
      // Check if title already exists in the list
      if (!titles.includes(trimmedInput)) {
        // Add new title to the list
        setTitles([...titles, trimmedInput]);
      }
      // Set as selected title
      setSelectedTitle(trimmedInput);
      console.log('Saved title:', trimmedInput);
    }
  };

  const handleDelete = (title: string) => {
    const newTitles = titles.filter(t => t !== title);
    setTitles(newTitles);
    if (selectedTitle === title) {
      setSelectedTitle('Select Existing Calculations');
      setSearchInput('Celsior ROI Calculator Title');
    }
    console.log('Deleted title:', title);
  };

  const openDeleteDialog = (title: string) => {
    console.log('openDeleteDialog called with title:', title);
    setTitleToDelete(title);
    setIsDeleteDialogOpen(true);
    console.log('State should be updated now');
  };

  const closeDeleteDialog = () => {
    console.log('closeDeleteDialog called');
    setIsDeleteDialogOpen(false);
  };

  // Debug: log state changes
  useEffect(() => {
    console.log('isDeleteDialogOpen changed to:', isDeleteDialogOpen);
  }, [isDeleteDialogOpen]);

  return (
    <div className={`${
      isDarkMode 
        ? 'bg-slate-800 border-slate-700' 
        : 'bg-white border-slate-200'
    } border rounded-lg shadow-sm mb-6 p-3 sm:p-4`}>
      {/* Navigation Bar - Responsive Layout */}
      <div className="flex flex-col sm:flex-row items-stretch gap-2 sm:gap-0">
        
        {/* Dropdown - Full Width on Mobile */}
        <div className="relative w-full sm:w-auto sm:min-w-[200px]" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={`h-full w-full flex items-center justify-between px-4 py-3 sm:py-2.5 rounded-lg sm:rounded-l-lg sm:rounded-r-none border sm:border-r-0 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[44px] ${
              isDarkMode 
                ? 'bg-slate-700/50 border-slate-600 text-white hover:bg-slate-600' 
                : 'bg-slate-100 border-slate-300 text-slate-900 hover:bg-slate-300'
            }`}
            aria-expanded={isDropdownOpen}
            aria-haspopup="listbox"
          >
            <span className="truncate text-sm sm:text-base">{selectedTitle}</span>
            <ChevronDown className={`w-4 h-4 ml-2 flex-shrink-0 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className={`absolute top-full left-0 right-0 sm:right-auto mt-2 w-full sm:min-w-[250px] rounded-lg border shadow-xl z-50 ${
              isDarkMode 
                ? 'bg-slate-900 border-slate-600' 
                : 'bg-white border-slate-300'
            }`}>
              <div className="max-h-64 overflow-y-auto">
                {titles.map((title, index) => (
                  <button
                    key={index}
                    onClick={() => handleTitleSelect(title)}
                    className={`w-full text-left px-4 py-3 sm:py-2.5 transition-colors text-sm sm:text-base ${
                      isDarkMode 
                        ? 'text-white hover:bg-blue-700/40' 
                        : 'text-slate-900 hover:bg-blue-100'
                    } ${selectedTitle === title ? (isDarkMode ? 'bg-blue-900/30' : 'bg-blue-50') : ''}`}
                    role="option"
                    aria-selected={selectedTitle === title}
                  >
                    {title}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Editable Input - Full Width on Mobile */}
        <div className="flex-1 w-full">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Celsior ROI Calculator Title"
            className={`h-full w-full px-4 py-3 sm:py-2.5 rounded-lg sm:rounded-none border sm:border-t sm:border-b sm:border-r-0 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[44px] text-sm sm:text-base ${
              isDarkMode 
                ? 'bg-slate-800 border-slate-600 text-white placeholder-slate-400' 
                : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
            }`}
          />
        </div>

        {/* Action Buttons Row - Full Width on Mobile */}
        <div className="flex items-stretch gap-2 w-full sm:w-auto">
          {/* Save Button */}
          <button
            onClick={handleSave}
            className="flex-1 sm:flex-none h-full flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-2.5 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg sm:rounded-r-lg sm:rounded-l-none transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-sm font-semibold border border-blue-400/30 min-h-[44px] text-sm sm:text-base"
            aria-label="Save Calculation"
          >
            <Save className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Save</span>
          </button>

          {/* Delete Button - Icon Only */}
          <div className="relative group">
            <button
              onClick={() => {
                console.log('=== DELETE BUTTON CLICKED ===');
                console.log('searchInput:', searchInput);
                console.log('selectedTitle:', selectedTitle);
                console.log('isDeleteDialogOpen:', isDeleteDialogOpen);
                
                // Simplified logic - just open the dialog
                const titleForDeletion = selectedTitle !== 'Select Existing Calculations' 
                  ? selectedTitle 
                  : searchInput;
                
                console.log('titleForDeletion:', titleForDeletion);
                console.log('Opening dialog...');
                
                // Always open the dialog to test if it works
                openDeleteDialog(titleForDeletion);
                
                console.log('After openDeleteDialog call');
                console.log('isDeleteDialogOpen should now be:', true);
              }}
              className={`h-full flex items-center justify-center px-3 sm:px-2.5 rounded-lg sm:rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 shadow-sm min-h-[44px] min-w-[44px] ${
                isDarkMode
                  ? 'bg-red-600 hover:bg-red-700 text-white border border-red-500 hover:border-red-600'
                  : 'bg-red-500 hover:bg-red-600 text-white border border-red-400 hover:border-red-500'
              }`}
              aria-label="Delete Calculation"
              title="Delete Calculation"
            >
              <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            
            {/* Tooltip - Hidden on Mobile */}
            <div className={`hidden sm:block absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1.5 rounded-lg text-xs whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity shadow-lg ${
              isDarkMode 
                ? 'bg-slate-900 text-white border border-slate-700' 
                : 'bg-slate-800 text-white'
            }`}>
              Delete Calculation
              <div className={`absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent ${
                isDarkMode ? 'border-t-slate-900' : 'border-t-slate-800'
              }`} />
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      {isDeleteDialogOpen && (
        <div 
          className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-[9999]" 
          onClick={closeDeleteDialog}
        >
          <div 
            className={`w-full max-w-md mx-4 rounded-xl shadow-2xl ${
              isDarkMode 
                ? 'bg-slate-800 border border-slate-700' 
                : 'bg-white border border-slate-200'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Dialog Header */}
            <div className={`px-6 py-4 border-b ${
              isDarkMode ? 'border-slate-700' : 'border-slate-200'
            }`}>
              <h3 className={`text-lg font-semibold ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}>
                Delete Confirmation
              </h3>
            </div>

            {/* Dialog Content */}
            <div className="px-6 py-5">
              <p className={`text-sm leading-relaxed ${
                isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                Are you sure you want to permanently delete this saved configuration? This action cannot be undone.
              </p>
            </div>

            {/* Dialog Actions */}
            <div className={`px-6 py-4 border-t flex justify-between gap-3 ${
              isDarkMode ? 'border-slate-700' : 'border-slate-200'
            }`}>
              {/* Cancel Button - Left */}
              <button
                onClick={closeDeleteDialog}
                className={`flex-1 px-5 py-2.5 rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 ${
                  isDarkMode
                    ? 'bg-slate-700 hover:bg-slate-600 text-white border border-slate-600'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300'
                }`}
              >
                Cancel
              </button>

              {/* Delete Button - Right */}
              <button
                onClick={() => {
                  handleDelete(titleToDelete);
                  closeDeleteDialog();
                }}
                className="flex-1 px-5 py-2.5 bg-[#E53935] hover:bg-[#B71C1C] text-white font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 shadow-sm border border-red-500/50"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}