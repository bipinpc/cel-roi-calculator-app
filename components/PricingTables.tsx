import { useState } from 'react';
import { Table, ChevronDown, ChevronUp, BarChart3, DollarSign } from 'lucide-react';

interface PricingTablesProps {
  isDarkMode: boolean;
}

type CardType = 'scenarios' | 'pricing' | null;

export function PricingTables({ isDarkMode }: PricingTablesProps) {
  const [expandedCard, setExpandedCard] = useState<CardType>('scenarios');

  const toggleCard = (card: CardType) => {
    setExpandedCard(expandedCard === card ? null : card);
  };

  return (
    <div className={`${isDarkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-white/90 border-slate-200'} rounded-xl shadow-lg border backdrop-blur-sm`}>
      {/* Sticky Header */}
      <div className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-slate-200'} sticky top-20 z-40 border-b rounded-t-xl`}>
        <div className="px-6 py-4">
          <div className="flex items-center gap-3">
            <Table className="w-6 h-6 text-blue-600" />
            <div>
              <h2 className={`${isDarkMode ? 'text-white' : 'text-slate-900'} font-semibold`}>Reference Data</h2>
              <p className={`${isDarkMode ? 'text-slate-400' : 'text-slate-600'} text-sm`}>
                Pricing tables and scenario data
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Accordion Cards */}
      <div className="p-6 space-y-4">
        {/* Card 1: Usage Scenarios */}
        <div className={`${isDarkMode ? 'bg-slate-900/50 border-slate-700' : 'bg-gradient-to-br from-white to-slate-50 border-slate-200'} rounded-xl border shadow-sm overflow-hidden transition-all duration-300`}>
          <button
            onClick={() => toggleCard('scenarios')}
            className={`w-full flex items-center justify-between p-5 ${isDarkMode ? 'hover:bg-slate-800/50' : 'hover:bg-slate-50'} transition-colors`}
          >
            <div className="flex items-center gap-3">
              <div className={`${isDarkMode ? 'bg-blue-900/30' : 'bg-blue-100'} p-2 rounded-lg`}>
                <BarChart3 className={`w-5 h-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              </div>
              <div className="text-left">
                <h3 className={`${isDarkMode ? 'text-white' : 'text-slate-900'} font-semibold`}>Usage Scenarios</h3>
                <p className={`${isDarkMode ? 'text-slate-400' : 'text-slate-600'} text-sm`}>
                  Hours saved and token usage by scenario type
                </p>
              </div>
            </div>
            <div className={`${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              {expandedCard === 'scenarios' ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </div>
          </button>

          {expandedCard === 'scenarios' && (
            <div className={`px-5 pb-5 ${isDarkMode ? 'border-slate-700' : 'border-slate-200'} border-t`}>
              <div className="pt-4 overflow-x-auto">
                {/* Desktop Table View */}
                <div className="hidden md:block">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className={`${isDarkMode ? 'bg-slate-800' : 'bg-slate-100'} rounded-lg`}>
                        <th className={`text-left py-3 px-4 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'} rounded-tl-lg`}>
                          Scenario
                        </th>
                        <th className={`text-right py-3 px-4 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                          Hours Saved/Week
                        </th>
                        <th className={`text-right py-3 px-4 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                          Input Tokens (M)
                        </th>
                        <th className={`text-right py-3 px-4 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'} rounded-tr-lg`}>
                          Output Tokens (M)
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className={`${isDarkMode ? 'border-slate-700' : 'border-slate-200'} border-b last:border-0`}>
                        <td className={`py-3 px-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                          Low Usage
                        </td>
                        <td className={`py-3 px-4 text-right ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                          2
                        </td>
                        <td className={`py-3 px-4 text-right ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                          0.25
                        </td>
                        <td className={`py-3 px-4 text-right ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                          0.25
                        </td>
                      </tr>
                      <tr className={`${isDarkMode ? 'border-slate-700' : 'border-slate-200'} border-b last:border-0`}>
                        <td className={`py-3 px-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                          Medium Usage
                        </td>
                        <td className={`py-3 px-4 text-right ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                          5
                        </td>
                        <td className={`py-3 px-4 text-right ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                          0.5
                        </td>
                        <td className={`py-3 px-4 text-right ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                          0.5
                        </td>
                      </tr>
                      <tr className={`${isDarkMode ? 'border-slate-700' : 'border-slate-200'} border-b last:border-0`}>
                        <td className={`py-3 px-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                          High Usage
                        </td>
                        <td className={`py-3 px-4 text-right ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                          8
                        </td>
                        <td className={`py-3 px-4 text-right ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                          1
                        </td>
                        <td className={`py-3 px-4 text-right ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                          1
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden space-y-3">
                  {[
                    { name: 'Low Usage', hours: 2, input: 0.25, output: 0.25 },
                    { name: 'Medium Usage', hours: 5, input: 0.5, output: 0.5 },
                    { name: 'High Usage', hours: 8, input: 1, output: 1 },
                  ].map((scenario) => (
                    <div
                      key={scenario.name}
                      className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} border rounded-lg p-4`}
                    >
                      <div className={`${isDarkMode ? 'text-white' : 'text-slate-900'} mb-3`}>
                        {scenario.name}
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className={`${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                            Hours/Week:
                          </span>
                          <span className={`ml-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                            {scenario.hours}
                          </span>
                        </div>
                        <div>
                          <span className={`${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                            Input (M):
                          </span>
                          <span className={`ml-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                            {scenario.input}
                          </span>
                        </div>
                        <div>
                          <span className={`${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                            Output (M):
                          </span>
                          <span className={`ml-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                            {scenario.output}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Card 2: AI Tool Pricing */}
        <div className={`${isDarkMode ? 'bg-slate-900/50 border-slate-700' : 'bg-gradient-to-br from-white to-slate-50 border-slate-200'} rounded-xl border shadow-sm overflow-hidden transition-all duration-300`}>
          <button
            onClick={() => toggleCard('pricing')}
            className={`w-full flex items-center justify-between p-5 ${isDarkMode ? 'hover:bg-slate-800/50' : 'hover:bg-slate-50'} transition-colors`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg ${isDarkMode ? 'bg-green-900/30' : 'bg-green-100'} flex items-center justify-center flex-shrink-0`}>
                <DollarSign className={`w-5 h-5 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
              </div>
              <div className="text-left">
                <h3 className={`${isDarkMode ? 'text-white' : 'text-slate-900'} font-semibold`}>AI Tool Pricing</h3>
                <p className={`${isDarkMode ? 'text-slate-400' : 'text-slate-600'} text-sm`}>
                  Per-seat and API pricing for all AI tools
                </p>
              </div>
            </div>
            <div className={`${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              {expandedCard === 'pricing' ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </div>
          </button>

          {expandedCard === 'pricing' && (
            <div className={`px-5 pb-5 ${isDarkMode ? 'border-slate-700' : 'border-slate-200'} border-t`}>
              <div className="pt-4 overflow-x-auto">
                {/* Desktop Table View */}
                <div className="hidden md:block">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className={`${isDarkMode ? 'bg-slate-800' : 'bg-slate-100'} rounded-lg`}>
                        <th className={`text-left py-3 px-4 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'} rounded-tl-lg`}>
                          AI Tool
                        </th>
                        <th className={`text-left py-3 px-4 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                          Pricing Model
                        </th>
                        <th className={`text-right py-3 px-4 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'} rounded-tr-lg`}>
                          Cost per Unit
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { tool: 'Claude', model: 'Per Seat', cost: '$150' },
                        { tool: 'Claude', model: 'API Input (per M tokens)', cost: '$15' },
                        { tool: 'Claude', model: 'API Output (per M tokens)', cost: '$75' },
                        { tool: 'OpenAI', model: 'Per Seat', cost: '$60' },
                        { tool: 'OpenAI', model: 'API Input (per M tokens)', cost: '$30' },
                        { tool: 'OpenAI', model: 'API Output (per M tokens)', cost: '$60' },
                        { tool: 'Gemini', model: 'Per Seat', cost: '$30' },
                        { tool: 'Gemini', model: 'API Input (per M tokens)', cost: '$7' },
                        { tool: 'Gemini', model: 'API Output (per M tokens)', cost: '$21' },
                        { tool: 'GitHub Copilot', model: 'Per Seat', cost: '$19' },
                      ].map((item, index) => (
                        <tr
                          key={index}
                          className={`${isDarkMode ? 'border-slate-700' : 'border-slate-200'} border-b last:border-0`}
                        >
                          <td className={`py-3 px-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                            {item.tool}
                          </td>
                          <td className={`py-3 px-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                            {item.model}
                          </td>
                          <td className={`py-3 px-4 text-right ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                            {item.cost}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden space-y-3">
                  {[
                    { tool: 'Claude', models: [{ name: 'Per Seat', cost: '$150' }, { name: 'API Input', cost: '$15' }, { name: 'API Output', cost: '$75' }] },
                    { tool: 'OpenAI', models: [{ name: 'Per Seat', cost: '$60' }, { name: 'API Input', cost: '$30' }, { name: 'API Output', cost: '$60' }] },
                    { tool: 'Gemini', models: [{ name: 'Per Seat', cost: '$30' }, { name: 'API Input', cost: '$7' }, { name: 'API Output', cost: '$21' }] },
                    { tool: 'GitHub Copilot', models: [{ name: 'Per Seat', cost: '$19' }] },
                  ].map((toolData) => (
                    <div
                      key={toolData.tool}
                      className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} border rounded-lg p-4`}
                    >
                      <div className={`${isDarkMode ? 'text-white' : 'text-slate-900'} mb-3`}>
                        {toolData.tool}
                      </div>
                      <div className="space-y-2 text-sm">
                        {toolData.models.map((model, idx) => (
                          <div key={idx} className="flex justify-between">
                            <span className={`${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                              {model.name}:
                            </span>
                            <span className={`${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                              {model.cost}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}