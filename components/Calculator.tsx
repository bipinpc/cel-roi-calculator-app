import { useState, useEffect } from 'react';
import { ResultsDashboard } from './ResultsDashboard';
import { Settings, Users, DollarSign, Clock, Calendar } from 'lucide-react';

// Data structures based on spreadsheet
const SCENARIO_DATA = {
  'Low Usage': { hoursSaved: 2, inputTokens: 0.25, outputTokens: 0.25 },
  'Medium Usage': { hoursSaved: 5, inputTokens: 0.5, outputTokens: 0.5 },
  'High Usage': { hoursSaved: 8, inputTokens: 1, outputTokens: 1 },
};

// License configurations for each tool
const LICENSE_DATA = {
  'GitHub Copilot': {
    'Individuals': {
      'Pro': 10,
      'Pro+': 39,
    },
    'Business': {
      'Business': 19,
      'Enterprise': 39,
    },
  },
  'Claude': {
    'Individuals': {
      'Pro': 17,
      'Max': 100,
    },
    'Team': {
      'Standard Seat': 25,
      'Premium Seat': 150,
    },
  },
};

const PRICING_DATA = {
  'Claude': {
    'Per Seat': 150,
    'API Input': 15,
    'API Output': 75,
  },
  'OpenAI': {
    'Per Seat': 60,
    'API Input': 30,
    'API Output': 60,
  },
  'Gemini': {
    'Per Seat': 30,
    'API Input': 7,
    'API Output': 21,
  },
  'GitHub Copilot': {
    'Per Seat': 19,
    'API Input': 10,
    'API Output': 10,
  },
};

const AI_TOOLS = ['Claude', 'OpenAI', 'Gemini', 'GitHub Copilot'];
const PRICING_MODELS = ['Per Seat', 'API'];
const USAGE_SCENARIOS = ['Low Usage', 'Medium Usage', 'High Usage'];

// GitHub Copilot requires additional GitHub license fee
const GITHUB_LICENSE_FEE = 4; // $4 per user

interface CalculatorProps {
  isDarkMode: boolean;
}

export function Calculator({ isDarkMode }: CalculatorProps) {
  const [aiTool, setAiTool] = useState('GitHub Copilot');
  const [licenseType, setLicenseType] = useState('Business - Business'); // Format: "Category - License"
  const [pricingModel, setPricingModel] = useState('Per Seat');
  const [usageScenario, setUsageScenario] = useState('High Usage');
  const [projectTimeline, setProjectTimeline] = useState(52); // New field: Project Timeline in weeks
  const [teamSize, setTeamSize] = useState(10);
  const [hourlyCost, setHourlyCost] = useState(55);
  
  // Auto-populated fields
  const [hoursSaved, setHoursSaved] = useState(8);
  const [inputTokens, setInputTokens] = useState(0);
  const [outputTokens, setOutputTokens] = useState(0);
  const [costPerUser, setCostPerUser] = useState(19);

  // Update auto-populated fields when scenario changes
  useEffect(() => {
    const scenario = SCENARIO_DATA[usageScenario as keyof typeof SCENARIO_DATA];
    setHoursSaved(scenario.hoursSaved);
    setInputTokens(scenario.inputTokens);
    setOutputTokens(scenario.outputTokens);
  }, [usageScenario]);

  // Helper function to check if tool has license types
  const hasLicenseTypes = (tool: string): boolean => {
    return tool === 'GitHub Copilot' || tool === 'Claude';
  };

  // Helper function to get license price
  const getLicensePrice = (tool: string, licenseString: string): number => {
    if (!hasLicenseTypes(tool)) return 0;
    
    const [category, license] = licenseString.split(' - ');
    const toolLicenses = LICENSE_DATA[tool as keyof typeof LICENSE_DATA];
    
    if (toolLicenses && toolLicenses[category as keyof typeof toolLicenses]) {
      const categoryLicenses = toolLicenses[category as keyof typeof toolLicenses];
      return categoryLicenses[license as keyof typeof categoryLicenses] || 0;
    }
    
    return 0;
  };

  // Reset license type when AI tool changes
  useEffect(() => {
    if (aiTool === 'GitHub Copilot') {
      setLicenseType('Business - Business');
    } else if (aiTool === 'Claude') {
      setLicenseType('Team - Standard Seat');
    }
  }, [aiTool]);

  // Update cost per user when tool, license, or pricing model changes
  useEffect(() => {
    const pricing = PRICING_DATA[aiTool as keyof typeof PRICING_DATA];
    
    if (pricingModel === 'Per Seat') {
      if (hasLicenseTypes(aiTool)) {
        // Use license-based pricing
        const licensePrice = getLicensePrice(aiTool, licenseType);
        // Add GitHub license fee if GitHub Copilot is selected
        const githubFee = aiTool === 'GitHub Copilot' ? GITHUB_LICENSE_FEE : 0;
        setCostPerUser(licensePrice + githubFee);
      } else {
        // Use default pricing for tools without license types
        const baseCost = pricing['Per Seat'];
        setCostPerUser(baseCost);
      }
    } else {
      // API-based pricing
      const inputCost = inputTokens * pricing['API Input'];
      const outputCost = outputTokens * pricing['API Output'];
      setCostPerUser(inputCost + outputCost);
    }
  }, [aiTool, licenseType, pricingModel, inputTokens, outputTokens]);

  // Check if License Type should be shown
  const showLicenseType = hasLicenseTypes(aiTool) && pricingModel === 'Per Seat';

  // Generate license options for dropdown
  const getLicenseOptions = () => {
    if (!hasLicenseTypes(aiTool)) return [];
    
    const toolLicenses = LICENSE_DATA[aiTool as keyof typeof LICENSE_DATA];
    const options: Array<{ value: string; label: string; price: number }> = [];
    
    Object.entries(toolLicenses).forEach(([category, licenses]) => {
      Object.entries(licenses).forEach(([license, price]) => {
        options.push({
          value: `${category} - ${license}`,
          label: `${category} - ${license} ($${price}/month)`,
          price: price as number,
        });
      });
    });
    
    return options;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
      {/* Left Panel - Input Parameters */}
      <div className="lg:col-span-3">
        <div className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} rounded-lg shadow-lg p-4 sm:p-6 border lg:sticky lg:top-24`}>
          <div className="flex items-center gap-2 mb-4 sm:mb-6">
            <Settings className="w-5 h-5 text-blue-600" />
            <h2 className={`${isDarkMode ? 'text-white' : 'text-slate-900'} font-semibold text-base sm:text-lg`}>Input Parameters</h2>
          </div>

          <div className="space-y-4 sm:space-y-5">
            {/* AI Tool Selection */}
            <div>
              <label className={`block ${isDarkMode ? 'text-slate-300' : 'text-slate-700'} mb-2 font-semibold text-sm sm:text-base`}>
                AI Tool
              </label>
              <select
                value={aiTool}
                onChange={(e) => setAiTool(e.target.value)}
                className={`w-full px-4 py-3 sm:py-2 border ${isDarkMode ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-slate-300 text-slate-900'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[44px] text-sm sm:text-base`}
              >
                {AI_TOOLS.map(tool => (
                  <option key={tool} value={tool}>{tool}</option>
                ))}
              </select>
              <p className={`${isDarkMode ? 'text-slate-400' : 'text-slate-500'} text-xs sm:text-sm mt-1`}>Select AI productivity tool</p>
            </div>

            {/* License Type */}
            {showLicenseType && (
              <div>
                <label className={`block ${isDarkMode ? 'text-slate-300' : 'text-slate-700'} mb-2 font-semibold text-sm sm:text-base`}>
                  License Type
                </label>
                <select
                  value={licenseType}
                  onChange={(e) => setLicenseType(e.target.value)}
                  className={`w-full px-4 py-3 sm:py-2 border ${isDarkMode ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-slate-300 text-slate-900'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[44px] text-sm sm:text-base`}
                >
                  {getLicenseOptions().map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
                <p className={`${isDarkMode ? 'text-slate-400' : 'text-slate-500'} text-xs sm:text-sm mt-1`}>Select license type</p>
              </div>
            )}

            {/* Pricing Model */}
            <div>
              <label className={`block ${isDarkMode ? 'text-slate-300' : 'text-slate-700'} mb-2 font-semibold text-sm sm:text-base`}>
                Pricing Model
              </label>
              <select
                value={pricingModel}
                onChange={(e) => setPricingModel(e.target.value)}
                className={`w-full px-4 py-3 sm:py-2 border ${isDarkMode ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-slate-300 text-slate-900'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[44px] text-sm sm:text-base`}
              >
                <option value="Per Seat">Per Seat</option>
                <option value="API">API</option>
              </select>
              <p className={`${isDarkMode ? 'text-slate-400' : 'text-slate-500'} text-xs sm:text-sm mt-1`}>Select pricing model</p>
            </div>

            {/* Usage Scenario */}
            <div>
              <label className={`block ${isDarkMode ? 'text-slate-300' : 'text-slate-700'} mb-2 font-semibold text-sm sm:text-base`}>
                Usage Scenario
              </label>
              <select
                value={usageScenario}
                onChange={(e) => setUsageScenario(e.target.value)}
                className={`w-full px-4 py-3 sm:py-2 border ${isDarkMode ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-slate-300 text-slate-900'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[44px] text-sm sm:text-base`}
              >
                {USAGE_SCENARIOS.map(scenario => (
                  <option key={scenario} value={scenario}>{scenario}</option>
                ))}
              </select>
              <p className={`${isDarkMode ? 'text-slate-400' : 'text-slate-500'} text-xs sm:text-sm mt-1`}>Expected usage intensity</p>
            </div>

            {/* Project Timeline */}
            <div>
              <label className={`block ${isDarkMode ? 'text-slate-300' : 'text-slate-700'} mb-2 font-semibold text-sm sm:text-base`}>
                <Calendar className="w-4 h-4 inline mr-1" />
                Project Timeline (Weeks)
              </label>
              <input
                type="number"
                value={projectTimeline}
                onChange={(e) => setProjectTimeline(Number(e.target.value))}
                min="1"
                max="260"
                className={`w-full px-4 py-3 sm:py-2 border ${isDarkMode ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-slate-300 text-slate-900'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[44px] text-sm sm:text-base`}
              />
              <p className={`${isDarkMode ? 'text-slate-400' : 'text-slate-500'} text-xs sm:text-sm mt-1`}>Total duration of the project in weeks</p>
            </div>

            {/* Team Size */}
            <div>
              <label className={`block ${isDarkMode ? 'text-slate-300' : 'text-slate-700'} mb-2 font-semibold text-sm sm:text-base`}>
                <Users className="w-4 h-4 inline mr-1" />
                Team Size (Developers)
              </label>
              <input
                type="number"
                value={teamSize}
                onChange={(e) => setTeamSize(Number(e.target.value))}
                min="1"
                max="500"
                className={`w-full px-4 py-3 sm:py-2 border ${isDarkMode ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-slate-300 text-slate-900'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[44px] text-sm sm:text-base`}
              />
              <p className={`${isDarkMode ? 'text-slate-400' : 'text-slate-500'} text-xs sm:text-sm mt-1`}>Number of developers using the tool</p>
            </div>

            {/* Hourly Cost */}
            <div>
              <label className={`block ${isDarkMode ? 'text-slate-300' : 'text-slate-700'} mb-2 font-semibold text-sm sm:text-base`}>
                <DollarSign className="w-4 h-4 inline mr-1" />
                Hourly Cost per Developer ($)
              </label>
              <input
                type="number"
                value={hourlyCost}
                onChange={(e) => setHourlyCost(Number(e.target.value))}
                min="0"
                step="5"
                className={`w-full px-4 py-3 sm:py-2 border ${isDarkMode ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-slate-300 text-slate-900'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[44px] text-sm sm:text-base`}
              />
              <p className={`${isDarkMode ? 'text-slate-400' : 'text-slate-500'} text-xs sm:text-sm mt-1`}>Fully loaded hourly cost per developer</p>
            </div>

            {/* Divider */}
            <div className={`border-t ${isDarkMode ? 'border-slate-700' : 'border-slate-200'} pt-4 sm:pt-5`}>
              <p className={`${isDarkMode ? 'text-slate-400' : 'text-slate-600'} text-xs sm:text-sm mb-4`}>Auto-calculated Fields ({usageScenario})</p>
            </div>

            {/* Hours Saved - Auto-populated but editable */}
            <div>
              <label className={`block ${isDarkMode ? 'text-slate-300' : 'text-slate-700'} mb-2 font-semibold text-sm sm:text-base`}>
                <Clock className="w-4 h-4 inline mr-1" />
                Hours Saved per Week/Developer
              </label>
              <input
                type="number"
                value={hoursSaved}
                onChange={(e) => setHoursSaved(Number(e.target.value))}
                min="0"
                step="0.5"
                className={`w-full px-4 py-3 sm:py-2 border ${isDarkMode ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-slate-300 text-slate-900'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[44px] text-sm sm:text-base`}
              />
              <p className={`${isDarkMode ? 'text-slate-400' : 'text-slate-500'} text-xs sm:text-sm mt-1`}>Auto-calculated but editable</p>
            </div>

            {/* Input Tokens - Auto-populated but editable */}
            <div>
              <label className={`block ${isDarkMode ? 'text-slate-300' : 'text-slate-700'} mb-2 font-semibold text-sm sm:text-base`}>
                Input Tokens (Millions/month)
              </label>
              <input
                type="number"
                value={inputTokens}
                onChange={(e) => setInputTokens(Number(e.target.value))}
                min="0"
                step="0.01"
                className={`w-full px-4 py-3 sm:py-2 border ${isDarkMode ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-slate-300 text-slate-900'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[44px] text-sm sm:text-base`}
              />
              <p className={`${isDarkMode ? 'text-slate-400' : 'text-slate-500'} text-xs sm:text-sm mt-1`}>Auto-calculated but editable</p>
            </div>

            {/* Output Tokens - Auto-populated but editable */}
            <div>
              <label className={`block ${isDarkMode ? 'text-slate-300' : 'text-slate-700'} mb-2 font-semibold text-sm sm:text-base`}>
                Output Tokens (Millions/month)
              </label>
              <input
                type="number"
                value={outputTokens}
                onChange={(e) => setOutputTokens(Number(e.target.value))}
                min="0"
                step="0.01"
                className={`w-full px-4 py-3 sm:py-2 border ${isDarkMode ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-slate-300 text-slate-900'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[44px] text-sm sm:text-base`}
              />
              <p className={`${isDarkMode ? 'text-slate-400' : 'text-slate-500'} text-xs sm:text-sm mt-1`}>Auto-calculated but editable</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Results and Analysis */}
      <div className="lg:col-span-9 space-y-6">
        <ResultsDashboard
          teamSize={teamSize}
          hoursSaved={hoursSaved}
          hourlyCost={hourlyCost}
          costPerUser={costPerUser}
          aiTool={aiTool}
          licenseType={licenseType}
          pricingModel={pricingModel}
          usageScenario={usageScenario}
          projectTimeline={projectTimeline}
          inputTokens={inputTokens}
          outputTokens={outputTokens}
          isDarkMode={isDarkMode}
        />
      </div>
    </div>
  );
}