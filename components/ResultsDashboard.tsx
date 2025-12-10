import { DollarSign, TrendingUp, Calculator, Percent, AlertCircle, CheckCircle } from 'lucide-react';
import { PricingTables } from './PricingTables';
import { SmartTooltip } from './SmartTooltip';

interface ResultsDashboardProps {
  teamSize: number;
  hoursSaved: number;
  hourlyCost: number;
  costPerUser: number;
  aiTool: string;
  licenseType: string;
  pricingModel: string;
  usageScenario: string;
  projectTimeline: number;
  inputTokens: number;
  outputTokens: number;
  isDarkMode: boolean;
}

export function ResultsDashboard({
  teamSize,
  hoursSaved,
  hourlyCost,
  costPerUser,
  aiTool,
  licenseType,
  pricingModel,
  usageScenario,
  projectTimeline,
  inputTokens,
  outputTokens,
  isDarkMode,
}: ResultsDashboardProps) {
  // ROI Calculations
  const annualEffortSaved = teamSize * hoursSaved * projectTimeline; // hours
  const totalEffort = teamSize * 40 * projectTimeline; // total hours available
  const effortSavedPercentage = (annualEffortSaved / totalEffort) * 100; // percentage of total effort saved
  const costSavingsPerWeek = hourlyCost * hoursSaved * teamSize; // cost savings per week
  const totalCostSavings = projectTimeline * hourlyCost * hoursSaved * teamSize; // total cost savings over project timeline
  const annualCostSavings = totalCostSavings; // for backward compatibility with other calculations
  
  // Calculate what percentage of annual savings this project timeline represents
  const annualWeeks = 52;
  const timelinePercentageOfYear = (projectTimeline / annualWeeks) * 100;
  
  // Tool cost calculations based on project timeline
  const weeksPerMonth = 4.33; // Average weeks per month
  const totalToolCost = costPerUser * teamSize * (projectTimeline / weeksPerMonth); // Total tool cost for project duration
  const annualToolCost = costPerUser * teamSize * 12; // Annual tool cost for reference
  const weeklyToolCost = totalToolCost / projectTimeline; // Weekly Tool Cost
  const monthlyToolCost = costPerUser * teamSize; // Monthly Tool Cost
  
  // Net savings based on project timeline
  const netProjectSavings = totalCostSavings - totalToolCost;
  const netAnnualSavings = annualCostSavings - annualToolCost; // Keep for backward compatibility
  const roiPercentage = (netProjectSavings / totalToolCost) * 100;

  // Multi-period views
  const monthlySavings = netAnnualSavings / 12;
  const quarterlySavings = netAnnualSavings / 4;
  const weeklySavings = netAnnualSavings / projectTimeline;

  // Break-even calculation (months)
  const monthlyNetSavings = monthlySavings;
  const breakEvenMonths = monthlyNetSavings > 0 ? 0 : Math.abs(annualToolCost / (annualCostSavings / 12));

  // Discount percentages for stakeholder negotiations
  const savingsPercentage = (hoursSaved / 40) * 100; // Assuming 40 hour work week
  const safeDiscount = Math.min(savingsPercentage * 0.3, 15); // 30% of savings, max 15%
  const moderateDiscount = Math.min(savingsPercentage * 0.5, 25); // 50% of savings, max 25%
  const aggressiveDiscount = Math.min(savingsPercentage * 0.7, 35); // 70% of savings, max 35%

  // Recommendation based on ROI
  const getRecommendation = () => {
    if (roiPercentage > 500) return { text: 'Excellent Investment', color: 'text-green-600', icon: CheckCircle };
    if (roiPercentage > 200) return { text: 'Strong ROI', color: 'text-green-600', icon: CheckCircle };
    if (roiPercentage > 100) return { text: 'Good Investment', color: 'text-blue-600', icon: CheckCircle };
    if (roiPercentage > 0) return { text: 'Positive ROI', color: 'text-yellow-600', icon: AlertCircle };
    return { text: 'Review Required', color: 'text-red-600', icon: AlertCircle };
  };

  const recommendation = getRecommendation();
  const RecommendationIcon = recommendation.icon;

  return (
    <div className="space-y-6">
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Effort Saved */}
        <div className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} rounded-lg shadow p-6 border`}>
          <div className="flex items-center justify-between mb-2">
            <span className={`${isDarkMode ? 'text-blue-400' : 'text-blue-600'} font-semibold`}>Effort Saved</span>
            <Calculator className="w-5 h-5 text-blue-600" />
          </div>
          
          {/* Primary Value - Total Effort Saved with Tooltip */}
          <div className="flex items-center gap-2">
            <div className={`${isDarkMode ? 'text-white' : 'text-slate-900'} font-bold`}>
              {annualEffortSaved.toLocaleString()} hrs <span className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>({projectTimeline}-{projectTimeline < 2 ? 'week' : 'weeks'})</span>
            </div>
            <SmartTooltip
              isDarkMode={isDarkMode}
              content={
                <div className="space-y-3">
                  <p className={`mb-2 ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>Calculation Formula:</p>
                  <div className="text-sm space-y-2">
                    <div className={`font-mono text-xs p-3 rounded ${
                      isDarkMode 
                        ? 'bg-slate-800 text-blue-300 border border-slate-700' 
                        : 'bg-slate-100 text-blue-700 border border-slate-300'
                    }`}>
                      Total Effort Saved = Hours Saved per Week × Project Timeline (weeks) × Team Size
                    </div>
                    <div className={`mt-3 pt-3 border-t ${isDarkMode ? 'border-slate-700' : 'border-slate-300'}`}>
                      <p className={`mb-1 ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>Example Display:</p>
                      <div className={`space-y-1 ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>
                        <p className="font-mono text-xs">= {hoursSaved} hrs/week × {projectTimeline} weeks × {teamSize} developers</p>
                        <p className="font-mono text-xs">= {annualEffortSaved.toLocaleString()} hrs</p>
                      </div>
                    </div>
                  </div>
                </div>
              }
            />
          </div>
          
          {/* Secondary Supporting Values */}
          <div className="space-y-0.5 mt-2">
            {/* Effort Saved Percentage with Tooltip */}
            <div className="flex items-center gap-1.5">
              <p className={`${isDarkMode ? 'text-slate-500' : 'text-slate-500'} text-sm`}>
                {effortSavedPercentage.toFixed(1)}% of total effort saved
              </p>
              <SmartTooltip
                isDarkMode={isDarkMode}
                iconSize="sm"
                content={
                  <div className="space-y-3">
                    <p className={`mb-2 ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>Calculation Formula:</p>
                    <div className="text-sm space-y-2">
                      <div className={`font-mono text-xs p-3 rounded ${
                        isDarkMode 
                          ? 'bg-slate-800 text-blue-300 border border-slate-700' 
                          : 'bg-slate-100 text-blue-700 border border-slate-300'
                      }`}>
                        Effort Saved Percentage = (Total Effort Saved / Total Effort) × 100
                      </div>
                      <div className={`mt-3 pt-3 border-t ${isDarkMode ? 'border-slate-700' : 'border-slate-300'}`}>
                        <p className={`mb-1 ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>Example Display:</p>
                        <div className={`space-y-1 ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>
                          <p className="font-mono text-xs">= ({annualEffortSaved.toLocaleString()} / {totalEffort.toLocaleString()}) × 100</p>
                          <p className="font-mono text-xs">= {effortSavedPercentage.toFixed(1)}%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                }
              />
            </div>
            
            {/* Total Effort with Tooltip */}
            <div className="flex items-center gap-1.5">
              <p className={`${isDarkMode ? 'text-slate-500' : 'text-slate-500'} text-sm`}>
                {totalEffort.toLocaleString()} hrs total effort
              </p>
              <SmartTooltip
                isDarkMode={isDarkMode}
                iconSize="sm"
                content={
                  <div className="space-y-3">
                    <p className={`mb-2 ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>Calculation Formula:</p>
                    <div className="text-sm space-y-2">
                      <div className={`font-mono text-xs p-3 rounded ${
                        isDarkMode 
                          ? 'bg-slate-800 text-blue-300 border border-slate-700' 
                          : 'bg-slate-100 text-blue-700 border border-slate-300'
                      }`}>
                        Total Effort = Timeline (weeks) × 40 × Team Size
                      </div>
                      <div className={`mt-3 pt-3 border-t ${isDarkMode ? 'border-slate-700' : 'border-slate-300'}`}>
                        <p className={`mb-1 ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>Example Display:</p>
                        <div className={`space-y-1 ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>
                          <p className="font-mono text-xs">= {projectTimeline} weeks × 40 hrs/week × {teamSize} developers</p>
                          <p className="font-mono text-xs">= {totalEffort.toLocaleString()} hrs</p>
                        </div>
                      </div>
                    </div>
                  </div>
                }
              />
            </div>
          </div>
        </div>

        {/* Cost Savings */}
        <div className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} rounded-lg shadow p-6 border`}>
          <div className="flex items-center justify-between mb-2">
            <span className={`${isDarkMode ? 'text-green-400' : 'text-green-600'} font-semibold`}>Cost Savings</span>
            <DollarSign className="w-5 h-5 text-green-600" />
          </div>
          
          {/* Primary Value - Total Cost Savings with Tooltip */}
          <div className="flex items-center gap-2">
            <div className={`${isDarkMode ? 'text-white' : 'text-slate-900'} font-bold`}>
              ${totalCostSavings.toLocaleString()} <span className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>({projectTimeline}-{projectTimeline < 2 ? 'week' : 'weeks'})</span>
            </div>
            <SmartTooltip
              isDarkMode={isDarkMode}
              content={
                <div className="space-y-3">
                  <p className={`font-semibold mb-2 ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>Calculation Formula:</p>
                  <div className="text-sm space-y-2">
                    <div className={`font-mono text-xs p-3 rounded ${
                      isDarkMode 
                        ? 'bg-slate-800 text-blue-300 border border-slate-700' 
                        : 'bg-slate-100 text-blue-700 border border-slate-300'
                    }`}>
                      Total Cost Savings = Timeline (weeks) × Hourly Cost × Hours Saved/Week × Team Size
                    </div>
                    <div className={`mt-3 pt-3 border-t ${isDarkMode ? 'border-slate-700' : 'border-slate-300'}`}>
                      <p className={`font-semibold mb-1 ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>Current Calculation:</p>
                      <div className={`space-y-1 ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>
                        <p className="font-mono text-xs">= {projectTimeline} weeks × ${hourlyCost}/hr × {hoursSaved} hrs/week × {teamSize} developers</p>
                        <p className="font-mono text-xs">= ${totalCostSavings.toLocaleString()}</p>
                        <p className="font-mono text-xs mt-2">Per Week = ${costSavingsPerWeek.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}/week</p>
                      </div>
                    </div>
                  </div>
                </div>
              }
            />
          </div>
          
          {/* Secondary Supporting Value */}
          <p className={`${isDarkMode ? 'text-slate-500' : 'text-slate-500'} text-sm mt-2`}>
            {timelinePercentageOfYear.toFixed(1)}% of total cost savings
          </p>
        </div>

        {/* Tool Cost */}
        <div className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} rounded-lg shadow p-6 border`}>
          <div className="flex items-center justify-between mb-2">
            <span className={`${isDarkMode ? 'text-red-400' : 'text-red-600'} font-semibold`}>AI Tool Cost</span>
            <DollarSign className="w-5 h-5 text-red-600" />
          </div>
          
          {/* Primary Value - Total Tool Cost with Tooltip */}
          <div className="flex items-center gap-2">
            <div className={`${isDarkMode ? 'text-white' : 'text-slate-900'} font-bold`}>
              ${totalToolCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>({projectTimeline}-{projectTimeline < 2 ? 'week' : 'weeks'})</span>
            </div>
            <SmartTooltip
              isDarkMode={isDarkMode}
              content={
                <div className="space-y-3">
                  <p className={`font-semibold mb-2 ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>Calculation Formula:</p>
                  <div className="text-sm space-y-2">
                    <div className={`font-mono text-xs p-3 rounded ${
                      isDarkMode 
                        ? 'bg-slate-800 text-blue-300 border border-slate-700' 
                        : 'bg-slate-100 text-blue-700 border border-slate-300'
                    }`}>
                      Total Tool Cost = Cost per User × Team Size × (Timeline / 4.33 weeks/month)
                    </div>
                    <div className={`mt-3 pt-3 border-t ${isDarkMode ? 'border-slate-700' : 'border-slate-300'}`}>
                      <p className={`font-semibold mb-1 ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>Current Calculation:</p>
                      <div className={`space-y-1 ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>
                        <p className="font-mono text-xs">= ${costPerUser}/month × {teamSize} developers × ({projectTimeline} weeks / 4.33)</p>
                        <p className="font-mono text-xs">= ${totalToolCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                        <p className="font-mono text-xs mt-2">Per Week = ${weeklyToolCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}/week</p>
                        <p className="font-mono text-xs">Per Month = ${monthlyToolCost.toLocaleString()}/month</p>
                      </div>
                    </div>
                  </div>
                </div>
              }
            />
          </div>
        </div>

        {/* ROI Percentage */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <span className="text-blue-100">ROI</span>
            <Percent className="w-5 h-5 text-blue-100" />
          </div>
          <div className="flex items-center gap-2">
            <div className="text-white font-bold">{roiPercentage.toFixed(0)}% <span className="text-sm text-blue-100">({projectTimeline}-{projectTimeline < 2 ? 'week' : 'weeks'})</span></div>
            <SmartTooltip
              isDarkMode={isDarkMode}
              iconColor="light"
              content={
                <div className="space-y-3">
                  <p className={`font-semibold mb-2 ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>ROI % Formula</p>
                  <div className="text-sm space-y-2">
                    <div className={`font-mono text-xs p-3 rounded ${
                      isDarkMode 
                        ? 'bg-slate-800 text-blue-300 border border-slate-700' 
                        : 'bg-slate-100 text-blue-700 border border-slate-300'
                    }`}>
                      ROI % = ((Total Cost Savings − Total Tool Cost) ÷ Total Tool Cost) × 100
                    </div>
                    <div className={`mt-3 pt-3 border-t ${isDarkMode ? 'border-slate-700' : 'border-slate-300'}`}>
                      <p className={`font-semibold mb-1 ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>Current Calculation:</p>
                      <div className={`space-y-1 ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>
                        <p className="font-mono text-xs">= (${totalCostSavings.toLocaleString()} − ${totalToolCost.toLocaleString()}) ÷ ${totalToolCost.toLocaleString()} × 100</p>
                        <p className="font-mono text-xs">= ${netProjectSavings.toLocaleString()} ÷ ${totalToolCost.toLocaleString()} × 100</p>
                        <p className="font-mono text-xs">= {roiPercentage.toFixed(0)}%</p>
                      </div>
                    </div>
                  </div>
                </div>
              }
            />
          </div>
          <p className="text-blue-100 text-sm mt-1">Return on Investment</p>
        </div>
      </div>

      {/* Detailed Results */}
      <div className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} rounded-lg shadow-lg p-6 border`}>
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          <h2 className={`${isDarkMode ? 'text-white' : 'text-slate-900'} font-semibold`}>ROI Analysis</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Financial Metrics */}
          <div className="space-y-4">
            {/* Net Annual Savings with Tooltip */}
            <div className={`flex justify-between items-center pb-3 border-b ${isDarkMode ? 'border-slate-700' : 'border-slate-200'}`}>
              <div className="flex items-center gap-2">
                <span className={`${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>Net Annual Savings</span>
                <SmartTooltip
                  isDarkMode={isDarkMode}
                  content={
                    <div className="space-y-3">
                      <p className={`font-semibold mb-2 ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>Calculation Formula:</p>
                      <div className="text-sm space-y-2">
                        <div className={`font-mono text-xs p-3 rounded ${
                          isDarkMode 
                            ? 'bg-slate-800 text-blue-300 border border-slate-700' 
                            : 'bg-slate-100 text-blue-700 border border-slate-300'
                        }`}>
                          Net Annual Savings = Annual Cost Savings − Annual Tool Cost
                        </div>
                        <div className={`mt-3 space-y-1 ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>
                          <p className="font-semibold">Where:</p>
                          <p>• Annual Cost Savings = Team Size × Hours Saved/Week × Project Timeline × Hourly Cost</p>
                          <p>• Annual Tool Cost = Cost per User × Team Size × 12</p>
                        </div>
                        <div className={`mt-3 pt-3 border-t ${isDarkMode ? 'border-slate-700' : 'border-slate-300'}`}>
                          <p className={`font-semibold mb-1 ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>Current Values:</p>
                          <div className={`space-y-1 ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>
                            <p>• Team Size: <span className="font-semibold">{teamSize}</span></p>
                            <p>• Hours Saved/Week: <span className="font-semibold">{hoursSaved}</span></p>
                            <p>• Hourly Cost: <span className="font-semibold">${hourlyCost}</span></p>
                            <p>• Cost per User: <span className="font-semibold">${costPerUser}/month</span></p>
                            <p>• Project Timeline: <span className="font-semibold">{projectTimeline} weeks</span></p>
                          </div>
                        </div>
                      </div>
                    </div>
                  }
                />
              </div>
              <span className={`${netAnnualSavings >= 0 ? 'text-green-600' : 'text-red-600'} font-semibold`}>
                ${netAnnualSavings.toLocaleString()}
              </span>
            </div>

            {/* Quarterly Net Savings with Tooltip */}
            <div className={`flex justify-between items-center pb-3 border-b ${isDarkMode ? 'border-slate-700' : 'border-slate-200'}`}>
              <div className="flex items-center gap-2">
                <span className={`${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>Quarterly Net Savings</span>
                <SmartTooltip
                  isDarkMode={isDarkMode}
                  content={
                    <div className="space-y-3">
                      <p className={`font-semibold mb-2 ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>Calculation Formula:</p>
                      <div className="text-sm space-y-2">
                        <div className={`font-mono text-xs p-3 rounded ${
                          isDarkMode 
                            ? 'bg-slate-800 text-blue-300 border border-slate-700' 
                            : 'bg-slate-100 text-blue-700 border border-slate-300'
                        }`}>
                          Quarterly Net Savings = Net Annual Savings ÷ 4
                        </div>
                        <div className={`mt-3 space-y-1 ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>
                          <p className="font-semibold">Breakdown:</p>
                          <p>• Net Annual Savings = Annual Cost Savings − Annual Tool Cost</p>
                          <p>• Divided by 4 quarters to get quarterly average</p>
                        </div>
                        <div className={`mt-3 pt-3 border-t ${isDarkMode ? 'border-slate-700' : 'border-slate-300'}`}>
                          <p className={`font-semibold mb-1 ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>Current Calculation:</p>
                          <div className={`space-y-1 ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>
                            <p>• Net Annual Savings: <span className="font-semibold">${netAnnualSavings.toLocaleString()}</span></p>
                            <p>• Quarterly Net Savings: <span className="font-semibold">${quarterlySavings.toLocaleString()}</span></p>
                          </div>
                        </div>
                      </div>
                    </div>
                  }
                />
              </div>
              <span className={`${quarterlySavings >= 0 ? 'text-green-600' : 'text-red-600'} font-semibold`}>
                ${quarterlySavings.toLocaleString()}
              </span>
            </div>

            {/* Monthly Net Savings with Tooltip */}
            <div className={`flex justify-between items-center pb-3 border-b ${isDarkMode ? 'border-slate-700' : 'border-slate-200'}`}>
              <div className="flex items-center gap-2">
                <span className={`${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>Monthly Net Savings</span>
                <SmartTooltip
                  isDarkMode={isDarkMode}
                  content={
                    <div className="space-y-3">
                      <p className={`font-semibold mb-2 ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>Calculation Formula:</p>
                      <div className="text-sm space-y-2">
                        <div className={`font-mono text-xs p-3 rounded ${
                          isDarkMode 
                            ? 'bg-slate-800 text-blue-300 border border-slate-700' 
                            : 'bg-slate-100 text-blue-700 border border-slate-300'
                        }`}>
                          Monthly Net Savings = Net Annual Savings ÷ 12
                        </div>
                        <div className={`mt-3 space-y-1 ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>
                          <p className="font-semibold">Breakdown:</p>
                          <p>• Net Annual Savings = Annual Cost Savings − Annual Tool Cost</p>
                          <p>• Divided by 12 months to get monthly average</p>
                        </div>
                        <div className={`mt-3 pt-3 border-t ${isDarkMode ? 'border-slate-700' : 'border-slate-300'}`}>
                          <p className={`font-semibold mb-1 ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>Current Calculation:</p>
                          <div className={`space-y-1 ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>
                            <p>• Net Annual Savings: <span className="font-semibold">${netAnnualSavings.toLocaleString()}</span></p>
                            <p>• Monthly Net Savings: <span className="font-semibold">${monthlySavings.toLocaleString()}</span></p>
                          </div>
                        </div>
                      </div>
                    </div>
                  }
                />
              </div>
              <span className={`${monthlySavings >= 0 ? 'text-green-600' : 'text-red-600'} font-semibold`}>
                ${monthlySavings.toLocaleString()}
              </span>
            </div>

            {/* Weekly Net Savings with Tooltip */}
            <div className={`flex justify-between items-center pb-3 border-b ${isDarkMode ? 'border-slate-700' : 'border-slate-200'}`}>
              <div className="flex items-center gap-2">
                <span className={`${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>Weekly Net Savings</span>
                <SmartTooltip
                  isDarkMode={isDarkMode}
                  content={
                    <div className="space-y-3">
                      <p className={`font-semibold mb-2 ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>Calculation Formula:</p>
                      <div className="text-sm space-y-2">
                        <div className={`font-mono text-xs p-3 rounded ${
                          isDarkMode 
                            ? 'bg-slate-800 text-blue-300 border border-slate-700' 
                            : 'bg-slate-100 text-blue-700 border border-slate-300'
                        }`}>
                          Weekly Net Savings = Net Annual Savings ÷ Project Timeline (Weeks)
                        </div>
                        <div className={`mt-3 space-y-1 ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>
                          <p className="font-semibold">Breakdown:</p>
                          <p>• Net Annual Savings = Annual Cost Savings − Annual Tool Cost</p>
                          <p>• Divided by project timeline in weeks to get weekly average</p>
                        </div>
                        <div className={`mt-3 pt-3 border-t ${isDarkMode ? 'border-slate-700' : 'border-slate-300'}`}>
                          <p className={`font-semibold mb-1 ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>Current Calculation:</p>
                          <div className={`space-y-1 ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>
                            <p>• Net Annual Savings: <span className="font-semibold">${netAnnualSavings.toLocaleString()}</span></p>
                            <p>• Project Timeline: <span className="font-semibold">{projectTimeline} weeks</span></p>
                            <p>• Weekly Net Savings: <span className="font-semibold">${weeklySavings.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}/week</span></p>
                          </div>
                        </div>
                      </div>
                    </div>
                  }
                />
              </div>
              <span className={`${weeklySavings >= 0 ? 'text-green-600' : 'text-red-600'} font-semibold`}>
                ${weeklySavings.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>

            <div className={`flex justify-between items-center pb-3 border-b ${isDarkMode ? 'border-slate-700' : 'border-slate-200'}`}>
              <span className={`${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Break-even Point</span>
              <span className={`${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                {breakEvenMonths === 0 ? 'Immediate' : `${breakEvenMonths.toFixed(1)} months`}
              </span>
            </div>

            <div className={`flex justify-between items-center pb-3 border-b ${isDarkMode ? 'border-slate-700' : 'border-slate-200'}`}>
              <span className={`${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Productivity Gain</span>
              <span className={`${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{savingsPercentage.toFixed(1)}%</span>
            </div>
          </div>

          {/* Right Column - Recommendations */}
          <div className="space-y-4">
            {/* Investment Recommendation */}
            <div className={`${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'} rounded-lg p-4 border`}>
              <div className="flex items-center gap-2 mb-2">
                <RecommendationIcon className={`w-5 h-5 ${recommendation.color}`} />
                <span className={`${recommendation.color} font-semibold`}>
                  {recommendation.text}
                </span>
              </div>
              <p className={`${isDarkMode ? 'text-slate-400' : 'text-slate-600'} text-sm`}>
                {roiPercentage > 100
                  ? `This investment will return ${roiPercentage.toFixed(0)}% of its cost annually, representing excellent value.`
                  : roiPercentage > 0
                  ? `Positive ROI of ${roiPercentage.toFixed(0)}%. Consider team size and usage optimization.`
                  : 'Current parameters show negative ROI. Consider increasing usage or team size.'}
              </p>
            </div>

            {/* Client Discount Recommendations */}
            <div className={`${isDarkMode ? 'bg-blue-900/20 border-blue-800' : 'bg-blue-50 border-blue-200'} rounded-xl p-3 sm:p-4 border`}>
              <h4 className={`${isDarkMode ? 'text-white' : 'text-slate-900'} mb-3 font-semibold text-base sm:text-lg`}>Selected Input Parameters</h4>
              
              {/* Single Column on Mobile, 2-Column Grid on Desktop */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2.5 sm:gap-y-2">
                {/* AI Tool */}
                <div className="flex items-start justify-between gap-3">
                  <span className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'} text-sm leading-tight flex-1 min-w-0 break-words pt-1 sm:pt-0.5`}>
                    AI Tool:
                  </span>
                  <span className={`inline-flex items-center px-3 py-1.5 sm:py-1 rounded-full text-xs flex-shrink-0 ${
                    isDarkMode 
                      ? 'bg-blue-800 text-blue-100 border border-blue-700' 
                      : 'bg-blue-100 text-blue-800 border border-blue-300'
                  }`}>
                    {aiTool}
                  </span>
                </div>
                
                {/* License Type - Only show if applicable */}
                {(aiTool === 'GitHub Copilot' || aiTool === 'Claude') && pricingModel === 'Per Seat' && (
                  <div className="flex items-start justify-between gap-3">
                    <span className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'} text-sm leading-tight flex-1 min-w-0 break-words pt-1 sm:pt-0.5`}>
                      License Type:
                    </span>
                    <span className={`inline-flex items-center px-3 py-1.5 sm:py-1 rounded-full text-xs flex-shrink-0 ${
                      isDarkMode 
                        ? 'bg-purple-800 text-purple-100 border border-purple-700' 
                        : 'bg-purple-100 text-purple-800 border border-purple-300'
                    }`}>
                      {licenseType}
                    </span>
                  </div>
                )}
                
                {/* Pricing Model */}
                <div className="flex items-start justify-between gap-3">
                  <span className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'} text-sm leading-tight flex-1 min-w-0 break-words pt-1 sm:pt-0.5`}>
                    Pricing Model:
                  </span>
                  <span className={`inline-flex items-center px-3 py-1.5 sm:py-1 rounded-full text-xs flex-shrink-0 ${
                    isDarkMode 
                      ? 'bg-green-800 text-green-100 border border-green-700' 
                      : 'bg-green-100 text-green-800 border border-green-300'
                  }`}>
                    {pricingModel}
                  </span>
                </div>
                
                {/* Usage Scenario */}
                <div className="flex items-start justify-between gap-3">
                  <span className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'} text-sm leading-tight flex-1 min-w-0 break-words pt-1 sm:pt-0.5`}>
                    Usage Scenario:
                  </span>
                  <span className={`inline-flex items-center px-3 py-1.5 sm:py-1 rounded-full text-xs flex-shrink-0 ${
                    isDarkMode 
                      ? 'bg-amber-800 text-amber-100 border border-amber-700' 
                      : 'bg-amber-100 text-amber-800 border border-amber-300'
                  }`}>
                    {usageScenario}
                  </span>
                </div>
                
                {/* Project Timeline */}
                <div className="flex items-start justify-between gap-3">
                  <span className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'} text-sm leading-tight flex-1 min-w-0 break-words pt-1 sm:pt-0.5`}>
                    Project Timeline (Weeks):
                  </span>
                  <span className={`inline-flex items-center px-3 py-1.5 sm:py-1 rounded-full text-xs flex-shrink-0 ${
                    isDarkMode 
                      ? 'bg-indigo-800 text-indigo-100 border border-indigo-700' 
                      : 'bg-indigo-100 text-indigo-800 border border-indigo-300'
                  }`}>
                    {projectTimeline}
                  </span>
                </div>
                
                {/* Team Size */}
                <div className="flex items-start justify-between gap-3">
                  <span className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'} text-sm leading-tight flex-1 min-w-0 break-words pt-1 sm:pt-0.5`}>
                    Team Size (Developers):
                  </span>
                  <span className={`inline-flex items-center px-3 py-1.5 sm:py-1 rounded-full text-xs flex-shrink-0 ${
                    isDarkMode 
                      ? 'bg-cyan-800 text-cyan-100 border border-cyan-700' 
                      : 'bg-cyan-100 text-cyan-800 border border-cyan-300'
                  }`}>
                    {teamSize}
                  </span>
                </div>
                
                {/* Hourly Cost per Developer */}
                <div className="flex items-start justify-between gap-3">
                  <span className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'} text-sm leading-tight flex-1 min-w-0 break-words pt-1 sm:pt-0.5`}>
                    Hourly Cost per Developer:
                  </span>
                  <span className={`inline-flex items-center px-3 py-1.5 sm:py-1 rounded-full text-xs flex-shrink-0 ${
                    isDarkMode 
                      ? 'bg-teal-800 text-teal-100 border border-teal-700' 
                      : 'bg-teal-100 text-teal-800 border border-teal-300'
                  }`}>
                    ${hourlyCost}
                  </span>
                </div>
                
                {/* Hours Saved per Week/Developer */}
                <div className="flex items-start justify-between gap-3">
                  <span className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'} text-sm leading-tight flex-1 min-w-0 break-words pt-1 sm:pt-0.5`}>
                    Hours Saved per Week/Developer:
                  </span>
                  <span className={`inline-flex items-center px-3 py-1.5 sm:py-1 rounded-full text-xs flex-shrink-0 ${
                    isDarkMode 
                      ? 'bg-emerald-800 text-emerald-100 border border-emerald-700' 
                      : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  }`}>
                    {hoursSaved}
                  </span>
                </div>
                
                {/* Input Tokens - Only show for API pricing */}
                {pricingModel === 'API' && (
                  <div className="flex items-start justify-between gap-3">
                    <span className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'} text-sm leading-tight flex-1 min-w-0 break-words pt-1 sm:pt-0.5`}>
                      Input Tokens (M/month):
                    </span>
                    <span className={`inline-flex items-center px-3 py-1.5 sm:py-1 rounded-full text-xs flex-shrink-0 ${
                      isDarkMode 
                        ? 'bg-orange-800 text-orange-100 border border-orange-700' 
                        : 'bg-orange-100 text-orange-800 border border-orange-300'
                    }`}>
                      {inputTokens}
                    </span>
                  </div>
                )}
                
                {/* Output Tokens - Only show for API pricing */}
                {pricingModel === 'API' && (
                  <div className="flex items-start justify-between gap-3">
                    <span className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'} text-sm leading-tight flex-1 min-w-0 break-words pt-1 sm:pt-0.5`}>
                      Output Tokens (M/month):
                    </span>
                    <span className={`inline-flex items-center px-3 py-1.5 sm:py-1 rounded-full text-xs flex-shrink-0 ${
                      isDarkMode 
                        ? 'bg-rose-800 text-rose-100 border border-rose-700' 
                        : 'bg-rose-100 text-rose-800 border border-rose-300'
                    }`}>
                      {outputTokens}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Licensing Recommendation */}
            <div className={`${isDarkMode ? 'bg-green-900/20 border-green-800' : 'bg-green-50 border-green-200'} rounded-lg p-4 border`}>
              <h4 className={`${isDarkMode ? 'text-white' : 'text-slate-900'} mb-2 font-semibold`}>Licensing Recommendation</h4>
              <p className={`${isDarkMode ? 'text-slate-400' : 'text-slate-600'} text-sm`}>
                {pricingModel === 'Per Seat'
                  ? `Per-seat licensing is ideal for ${usageScenario.toLowerCase()} scenarios with ${teamSize} developers.`
                  : `API-based pricing may be more cost-effective for variable usage patterns.`}
              </p>
              {usageScenario === 'High Usage' && (
                <p className="text-green-600 text-sm mt-2">
                  ✓ High usage justifies enterprise licensing for maximum value
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Reference Data Section */}
      <div className="pt-2">
        <PricingTables isDarkMode={isDarkMode} />
      </div>
    </div>
  );
}