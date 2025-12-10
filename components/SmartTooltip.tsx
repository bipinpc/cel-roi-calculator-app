import { Info } from 'lucide-react';
import { useState, useRef, useEffect, useCallback } from 'react';

interface SmartTooltipProps {
  content: React.ReactNode;
  isDarkMode: boolean;
  iconSize?: 'sm' | 'md';
  id?: string;
  iconColor?: 'default' | 'light'; // Add custom color option for special backgrounds
}

// Global state to manage which tooltip is currently open
let currentOpenTooltipId: string | null = null;
const tooltipCloseCallbacks: Map<string, () => void> = new Map();

export function SmartTooltip({ content, isDarkMode, iconSize = 'md', id, iconColor = 'default' }: SmartTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [isPositioned, setIsPositioned] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);
  const tooltipId = useRef(id || `tooltip-${Math.random().toString(36).substring(7)}`);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isHoverOpenRef = useRef(false);

  useEffect(() => {
    setIsMounted(true);
    // Detect mobile and tablet devices (up to 1024px)
    const checkMobileOrTablet = () => {
      setIsMobileOrTablet(window.innerWidth < 1024);
    };
    checkMobileOrTablet();
    window.addEventListener('resize', checkMobileOrTablet);
    return () => window.removeEventListener('resize', checkMobileOrTablet);
  }, []);

  // Register close callback for this tooltip
  useEffect(() => {
    const closeCallback = () => {
      setIsOpen(false);
      isHoverOpenRef.current = false;
    };
    tooltipCloseCallbacks.set(tooltipId.current, closeCallback);
    return () => {
      tooltipCloseCallbacks.delete(tooltipId.current);
    };
  }, []);

  // Calculate position to keep tooltip in viewport
  const calculatePosition = useCallback(() => {
    if (!triggerRef.current || !tooltipRef.current) return;

    const trigger = triggerRef.current.getBoundingClientRect();
    const tooltip = tooltipRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const padding = 16;

    let top = trigger.bottom + 8;
    let left = trigger.left;

    // On mobile/tablet, center the tooltip
    if (isMobileOrTablet) {
      left = padding;
      top = Math.max(padding, (viewportHeight - tooltip.height) / 2);
    } else {
      // Desktop positioning logic
      if (left + tooltip.width > viewportWidth - padding) {
        left = viewportWidth - tooltip.width - padding;
      }

      if (left < padding) {
        left = padding;
      }

      if (top + tooltip.height > viewportHeight - padding) {
        top = trigger.top - tooltip.height - 8;
      }

      if (top < padding) {
        top = padding;
      }
    }

    setPosition({ top, left });
    setIsPositioned(true);
  }, [isMobileOrTablet]);

  // Recalculate position when tooltip opens
  useEffect(() => {
    if (isOpen) {
      // Small delay to ensure DOM is ready
      const timeoutId = setTimeout(() => {
        calculatePosition();
      }, 10);
      return () => clearTimeout(timeoutId);
    }
  }, [isOpen, isMobileOrTablet, calculatePosition]);

  // Handle close
  const handleClose = useCallback(() => {
    if (currentOpenTooltipId === tooltipId.current) {
      currentOpenTooltipId = null;
    }
    setIsOpen(false);
    setIsPositioned(false);
    isHoverOpenRef.current = false;
  }, []);

  // Handle open
  const handleOpen = useCallback(() => {
    // Close all other tooltips
    tooltipCloseCallbacks.forEach((callback, id) => {
      if (id !== tooltipId.current) {
        callback();
      }
    });
    currentOpenTooltipId = tooltipId.current;
    setIsOpen(true);
  }, []);

  // Handle toggle (for mobile/tablet clicks)
  const handleToggle = useCallback(() => {
    if (isOpen) {
      handleClose();
    } else {
      handleOpen();
      isHoverOpenRef.current = false; // This is a click/tap, not hover
    }
  }, [isOpen, handleOpen, handleClose]);

  // Handle button click (for mobile/tablet)
  const handleButtonClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    // On mobile/tablet, handle click to toggle
    if (isMobileOrTablet) {
      e.preventDefault();
      e.stopPropagation();
      handleToggle();
    }
  }, [isMobileOrTablet, handleToggle]);

  // Handle backdrop interaction
  const handleBackdropClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    handleClose();
  }, [handleClose]);

  // Close on escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, handleClose]);

  // Handle outside click for desktop
  useEffect(() => {
    if (!isOpen || isMobileOrTablet) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        tooltipRef.current && 
        !tooltipRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        handleClose();
      }
    };

    const timeoutId = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, isMobileOrTablet, handleClose]);

  // Lock body scroll when tooltip is open on mobile/tablet
  useEffect(() => {
    if (isOpen && isMobileOrTablet) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      
      return () => {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen, isMobileOrTablet]);

  // Desktop hover behavior - only on desktop
  const handleMouseEnter = useCallback(() => {
    if (isMobileOrTablet) return;
    
    // Clear any pending close timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    
    if (!isOpen) {
      handleOpen();
      isHoverOpenRef.current = true;
    }
  }, [isMobileOrTablet, isOpen, handleOpen]);

  const handleMouseLeave = useCallback(() => {
    if (isMobileOrTablet) return;
    
    // Only auto-close if it was opened by hover (not by click)
    if (isOpen && isHoverOpenRef.current) {
      hoverTimeoutRef.current = setTimeout(() => {
        handleClose();
      }, 150);
    }
  }, [isMobileOrTablet, isOpen, handleClose]);

  // Cleanup hover timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  if (!isMounted) return null;

  const iconClass = iconSize === 'sm' ? 'w-3 h-3' : 'w-4 h-4';
  const minTouchTarget = isMobileOrTablet ? 'min-w-[44px] min-h-[44px]' : '';
  
  // Icon color based on background
  const iconColorClass = iconColor === 'light'
    ? 'text-blue-100 hover:text-white active:text-blue-50'
    : isDarkMode 
      ? 'text-slate-400 hover:text-blue-400 active:text-blue-300' 
      : 'text-slate-500 hover:text-blue-600 active:text-blue-700';

  return (
    <div className="relative inline-block">
      <button
        ref={triggerRef}
        onClick={handleButtonClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`${iconColorClass} cursor-pointer transition-colors inline-flex items-center justify-center ${minTouchTarget} ${
          isMobileOrTablet ? 'p-2' : ''
        } touch-manipulation select-none`}
        aria-label="More information"
        aria-expanded={isOpen}
        type="button"
        style={{ 
          WebkitTapHighlightColor: 'transparent',
          touchAction: 'manipulation'
        }}
      >
        <Info className={iconClass} />
      </button>

      {isOpen && (
        <>
          {/* Mobile/Tablet: Backdrop overlay */}
          {isMobileOrTablet && (
            <div
              className="fixed inset-0 bg-black/60 z-[9998] backdrop-blur-sm animate-in fade-in duration-200"
              onClick={handleBackdropClick}
              style={{ touchAction: 'manipulation' }}
            />
          )}

          {/* Tooltip Content */}
          <div
            ref={tooltipRef}
            className={`fixed z-[9999] rounded-lg shadow-2xl border transition-opacity duration-200 ${
              isDarkMode 
                ? 'bg-slate-900 border-slate-600 text-slate-100' 
                : 'bg-white border-slate-300 text-slate-900'
            } ${
              isMobileOrTablet 
                ? 'w-[90vw] max-h-[85vh] overflow-y-auto p-5' 
                : 'w-96 max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)] overflow-y-auto p-4'
            }`}
            style={{
              top: `${position.top}px`,
              left: `${position.left}px`,
              right: isMobileOrTablet ? '16px' : 'auto',
              opacity: isPositioned ? 1 : 0,
            }}
            onClick={(e) => e.stopPropagation()}
            onMouseEnter={!isMobileOrTablet ? handleMouseEnter : undefined}
            onMouseLeave={!isMobileOrTablet ? handleMouseLeave : undefined}
          >
            {/* Mobile/Tablet: Close button */}
            {isMobileOrTablet && (
              <button
                onClick={handleClose}
                className={`absolute top-3 right-3 ${
                  isDarkMode 
                    ? 'text-slate-400 hover:text-slate-200 active:text-slate-100' 
                    : 'text-slate-500 hover:text-slate-700 active:text-slate-900'
                } transition-colors ${minTouchTarget} flex items-center justify-center rounded-full touch-manipulation`}
                aria-label="Close"
                type="button"
                style={{ 
                  WebkitTapHighlightColor: 'transparent',
                  touchAction: 'manipulation'
                }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}

            {/* Tooltip content */}
            <div className={`${isMobileOrTablet ? 'pr-8' : ''}`}>
              {content}
            </div>
          </div>
        </>
      )}
    </div>
  );
}