# Celsior ROI Calculator

An interactive web portal that helps business stakeholders evaluate the return on investment for AI productivity tools like Claude, OpenAI, Gemini, and GitHub Copilot.

## Features

- **Dynamic Pricing Logic**: Handle both per-seat and API-based pricing models
- **Scenario-Based Calculations**: Low/Medium/High usage scenarios for accurate projections
- **Comprehensive ROI Metrics**: Annual effort saved, cost savings, net savings, and ROI percentages
- **Professional Visualizations**: C-level presentation-ready charts and data displays
- **Client Recommendations**: Discount recommendations and break-even analysis
- **Licensing Recommendations**: Smart suggestions based on usage patterns
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark Mode**: Full dark mode support with theme switcher
- **WCAG Compliant**: Fully accessible tooltips and UI elements

## Tech Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **Tailwind CSS v4** - Utility-first CSS framework
- **Recharts** - Professional data visualization
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library

## Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- npm 9.0.0 or higher

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd celsior-roi-calculator
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Project Structure

```
/
├── components/           # React components
│   ├── Calculator.tsx   # Main calculator logic
│   ├── CategoryNavigation.tsx
│   ├── ResultsDashboard.tsx
│   ├── PricingTables.tsx
│   ├── SmartTooltip.tsx
│   ├── ui/             # Reusable UI components
│   └── figma/          # Figma-related components
├── styles/
│   └── globals.css     # Global styles and Tailwind config
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
├── index.html          # HTML template
├── vite.config.ts      # Vite configuration
├── tsconfig.json       # TypeScript configuration
└── package.json        # Project dependencies

```

## Key Features Explained

### GitHub Copilot Pricing
- Includes additional $4 GitHub license fee per user on top of base Copilot license cost
- Automatically calculated in per-seat pricing model

### Scenario-Based Calculations
- **Low Usage**: Conservative estimates for minimal adoption
- **Medium Usage**: Balanced approach for typical usage patterns
- **High Usage**: Aggressive estimates for maximum productivity gains

### ROI Metrics
- **Annual Effort Saved**: Total hours saved per year
- **Effort Saved %**: Percentage improvement in productivity
- **Cost Savings**: Dollar value of time saved
- **Net Savings**: Cost savings minus tool investment
- **ROI %**: Return on investment percentage
- **Break-Even Analysis**: Time to recover investment

### Accessibility
- All tooltips are WCAG contrast compliant
- Keyboard navigation support
- Screen reader friendly
- Touch-optimized for mobile/tablet (44px minimum touch targets)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Copyright © 2024 Pyramid Consulting Inc. All rights reserved.

## Support

For questions or support, please contact Pyramid Consulting Inc.

---

Built with ❤️ by Pyramid Consulting Inc.
