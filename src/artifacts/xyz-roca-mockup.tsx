import React, { useState } from 'react';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, Cell, Area, AreaChart,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  ScatterChart, Scatter, ZAxis
} from 'recharts';
import { 
  Wallet, BarChart3, ArrowUpDown, ShieldAlert, Landmark, 
  AlertTriangle, Clock, ChevronRight
} from 'lucide-react';

// Import Google Fonts (similar to 4Thought style)
// This will load fonts similar to Tiempos Headline and Post Grotesk without requiring installation
const fontStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@400;500;700&display=swap');
`;

// 4Thought color palette
const colors = {
  // Main palette
  lead: "#1E1E1F",
  cobalt: "#2C3D7D",
  lightRed: "#D87766",
  lightGold: "#D3A073",
  
  // Alternative palette
  lightBlue: "#C5D7FB",
  darkBlue: "#14346F",
  darkGold: "#CE8628",
  darkRed: "#C11B24", 
  lightGreen: "#7EB7A5",
  darkGreen: "#0B5D37",
  lightPurple: "#C4C2E5",
  darkPurple: "#4F2779",
  lightTeal: "#87DEE1",
  darkTeal: "#0B666B"
};

// Sample data
const assetsByCategory = [
  { name: 'Treasuries', value: 450, color: colors.cobalt },
  { name: 'FX Positions', value: 250, color: colors.lightBlue },
  { name: 'Crypto', value: 180, color: colors.lightRed },
  { name: 'Structured Notes', value: 220, color: colors.lightGold },
];

const liquidityByTimeframe = [
  { name: 'Overnight', value: 220, color: colors.cobalt },
  { name: '1-7 Days', value: 180, color: colors.lightBlue },
  { name: '8-30 Days', value: 240, color: colors.darkBlue },
  { name: '31-90 Days', value: 310, color: colors.lightGreen },
  { name: '91-365 Days', value: 290, color: colors.darkGreen },
  { name: '>365 Days', value: 350, color: colors.lightTeal },
];

const interestRateRiskData = [
  { name: 'Up 25bps', impact: -12, probability: 35 },
  { name: 'Up 50bps', impact: -24, probability: 25 },
  { name: 'Up 100bps', impact: -48, probability: 15 },
  { name: 'Down 25bps', impact: 10, probability: 15 },
  { name: 'Down 50bps', impact: 21, probability: 8 },
  { name: 'Down 100bps', impact: 42, probability: 2 },
];

const fixedVsFloating = [
  { name: 'Fixed Rate', value: 65, color: colors.cobalt },
  { name: 'Floating Rate', value: 35, color: colors.lightGreen },
];

const concentrationRiskData = [
  { name: 'Client A', value: 12, limit: 15, color: colors.cobalt },
  { name: 'Client B', value: 8, limit: 15, color: colors.lightBlue },
  { name: 'Client C', value: 15, limit: 15, color: colors.darkBlue },
  { name: 'Client D', value: 7, limit: 15, color: colors.lightGreen },
  { name: 'Client E', value: 11, limit: 15, color: colors.darkGreen },
];

const structuredNotesRisk = [
  { name: 'Early Withdrawal', value: 8, threshold: 10 },
  { name: 'Market Price', value: 6, threshold: 10 },
  { name: 'Liquidity', value: 5, threshold: 10 },
  { name: 'Counterparty', value: 4, threshold: 10 },
  { name: 'Operational', value: 3, threshold: 10 },
];

const fxRiskData = [
  { currency: 'EUR', exposure: 18, hedgeRatio: 80, netRisk: 3.6 },
  { currency: 'JPY', exposure: 12, hedgeRatio: 75, netRisk: 3.0 },
  { currency: 'GBP', exposure: 8, hedgeRatio: 90, netRisk: 0.8 },
  { currency: 'CHF', exposure: 5, hedgeRatio: 60, netRisk: 2.0 },
  { currency: 'CAD', exposure: 4, hedgeRatio: 70, netRisk: 1.2 },
];

const yieldCurveData = [
  { term: '1M', current: 3.8, previous: 3.5 },
  { term: '3M', current: 4.0, previous: 3.8 },
  { term: '6M', current: 4.1, previous: 4.0 },
  { term: '1Y', current: 4.2, previous: 4.3 },
  { term: '2Y', current: 4.3, previous: 4.5 },
  { term: '5Y', current: 4.4, previous: 4.6 },
  { term: '10Y', current: 4.5, previous: 4.7 },
  { term: '30Y', current: 4.6, previous: 4.8 },
];

const alertsData = [
  { id: 1, severity: 'High', type: 'Concentration', message: 'Client C exposure at limit (15%)', timestamp: '10:32 AM' },
  { id: 2, severity: 'Medium', type: 'Liquidity', message: 'Overnight liquidity below threshold', timestamp: '09:45 AM' },
  { id: 3, severity: 'Medium', type: 'Interest Rate', message: 'Duration gap outside target range', timestamp: '08:30 AM' },
  { id: 4, severity: 'Low', type: 'FX', message: 'EUR hedge ratio decreased to 80%', timestamp: 'Yesterday' },
];

const maturityProfile = [
  { range: '0-3M', assets: 35, liabilities: 28 },
  { range: '3-6M', assets: 25, liabilities: 32 },
  { range: '6-12M', assets: 30, liabilities: 25 },
  { range: '1-3Y', assets: 45, liabilities: 38 },
  { range: '3-5Y', assets: 40, liabilities: 30 },
  { range: '>5Y', assets: 25, liabilities: 15 },
];

const treasuryArbitrageData = [
  { platform: 'Ondo Finance', yield: 4.85, liquidity: 90, spread: 0.12 },
  { platform: 'Franklin Templeton', yield: 4.92, liquidity: 85, spread: 0.19 },
  { platform: 'Maple Finance', yield: 5.10, liquidity: 75, spread: 0.37 },
  { platform: 'Benji', yield: 4.88, liquidity: 80, spread: 0.15 },
  { platform: 'RippleHub', yield: 4.95, liquidity: 82, spread: 0.22 },
];

// Metric Card Component
const MetricCard = ({ title, value, change, icon, isPositive }) => {
  return (
    <div className="rounded-lg p-6" style={{ 
      backgroundColor: 'white', 
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      border: `1px solid ${colors.lightBlue}` 
    }}>
      <div className="flex justify-between items-start">
        <div>
          <div className="text-sm font-medium" style={{ 
            color: colors.lead,
            fontFamily: "'Inter', sans-serif",
            fontWeight: 500
          }}>{title}</div>
          <div className="mt-1 text-3xl font-semibold" style={{ 
            color: colors.lead,
            fontFamily: "'Playfair Display', serif"
          }}>{value}</div>
        </div>
        <div className="p-2 rounded-md" style={{ 
          backgroundColor: colors.lightBlue + '20', // 20% opacity
          color: colors.cobalt 
        }}>
          {icon}
        </div>
      </div>
      <div className="mt-4 flex items-center">
        <span className="text-xs font-medium" style={{ 
          color: isPositive ? colors.darkGreen : colors.darkRed,
          fontFamily: "'Inter', sans-serif",
          fontWeight: 500
        }}>
          {change}
        </span>
        <span className="text-xs ml-2" style={{ 
          color: colors.lead + '80', // 80% opacity
          fontFamily: "'Inter', sans-serif"
        }}>from last month</span>
      </div>
    </div>
  );
};

// Overview Tab
const OverviewTab = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-6">
        <MetricCard 
          title="Total Assets" 
          value="$1.1B" 
          change="+3.2%" 
          icon={<Wallet className="h-5 w-5 text-blue-600" />}
          isPositive={true} 
        />
        <MetricCard 
          title="Risk-Weighted Assets" 
          value="$620M" 
          change="+1.8%" 
          icon={<BarChart3 className="h-5 w-5 text-blue-600" />}
          isPositive={true} 
        />
        <MetricCard 
          title="VaR (95%, 1 day)" 
          value="$4.2M" 
          change="-0.5%" 
          icon={<ShieldAlert className="h-5 w-5 text-blue-600" />}
          isPositive={true} 
        />
        <MetricCard 
          title="Liquidity Coverage" 
          value="142%" 
          change="+2.5%" 
          icon={<ArrowUpDown className="h-5 w-5 text-blue-600" />}
          isPositive={true} 
        />
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="rounded-lg p-6" style={{ 
            backgroundColor: 'white', 
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            border: `1px solid ${colors.lightBlue}` 
          }}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold" style={{ 
              color: colors.lead,
              fontFamily: "'Playfair Display', serif"
            }}>Asset Allocation</h2>
            <BarChart3 className="h-5 w-5" style={{ color: colors.cobalt }} />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={assetsByCategory}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {assetsByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-lg p-6" style={{ 
            backgroundColor: 'white', 
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            border: `1px solid ${colors.lightBlue}` 
          }}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold" style={{ 
              color: colors.lead,
              fontFamily: "'Playfair Display', serif"
            }}>Risk Alerts</h2>
            <AlertTriangle className="h-5 w-5" style={{ color: colors.lightRed }} />
          </div>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {alertsData.map(alert => (
              <div 
                key={alert.id} 
                className={`p-3 rounded-md ${
                  alert.severity === 'High' 
                    ? 'bg-red-50 border-l-4 border-red-500' 
                    : alert.severity === 'Medium'
                      ? 'bg-yellow-50 border-l-4 border-yellow-500'
                      : 'bg-blue-50 border-l-4 border-blue-500'
                }`}
              >
                <div className="flex justify-between">
                  <span className={`text-sm font-medium ${
                    alert.severity === 'High' 
                      ? 'text-red-800' 
                      : alert.severity === 'Medium'
                        ? 'text-yellow-800'
                        : 'text-blue-800'
                  }`}>
                    {alert.type}
                  </span>
                  <span className="text-xs text-gray-500">{alert.timestamp}</span>
                </div>
                <p className="text-sm text-gray-700 mt-1">{alert.message}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg p-6" style={{ 
            backgroundColor: 'white', 
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            border: `1px solid ${colors.lightBlue}` 
          }}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold" style={{ 
              color: colors.lead,
              fontFamily: "'Playfair Display', serif"
            }}>Top Risk Exposures</h2>
            <BarChart3 className="h-5 w-5" style={{ color: colors.cobalt }} />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  { name: 'Interest Rate', value: 85, threshold: 100 },
                  { name: 'FX Risk', value: 65, threshold: 100 },
                  { name: 'Concentration', value: 78, threshold: 100 },
                  { name: 'Liquidity', value: 45, threshold: 100 },
                  { name: 'Operational', value: 35, threshold: 100 },
                ]}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" />
                <Bar dataKey="threshold" fill="transparent" stroke="#ff0000" strokeDasharray="3 3" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="rounded-lg p-6" style={{ 
            backgroundColor: 'white', 
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            border: `1px solid ${colors.lightBlue}` 
          }}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold" style={{ 
              color: colors.lead,
              fontFamily: "'Playfair Display', serif"
            }}>Maturity Profile</h2>
            <Clock className="h-5 w-5" style={{ color: colors.cobalt }} />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={maturityProfile}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="assets" name="Assets" fill="#8884d8" />
                <Bar dataKey="liabilities" name="Liabilities" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-lg p-6" style={{ 
            backgroundColor: 'white', 
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            border: `1px solid ${colors.lightBlue}` 
          }}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold" style={{ 
              color: colors.lead,
              fontFamily: "'Playfair Display', serif"
            }}>Yield Curve</h2>
            <BarChart3 className="h-5 w-5" style={{ color: colors.cobalt }} />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={yieldCurveData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="term" />
                <YAxis domain={[3, 5]} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="current" name="Current" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="previous" name="Previous Week" stroke="#82ca9d" strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-6">
        <div className="rounded-lg overflow-hidden" style={{ 
            backgroundColor: 'white', 
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            border: `1px solid ${colors.lightBlue}` 
          }}>
          <div className="px-6 py-4" style={{ borderBottom: `1px solid ${colors.lightBlue}` }}>
            <h2 className="text-lg font-semibold" style={{ 
              color: colors.lead,
              fontFamily: "'Playfair Display', serif"
            }}>Interest Rate Risk (Expected Impact)</h2>
          </div>
          <div className="p-6">
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={interestRateRiskData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis label={{ value: 'Impact (USD Millions)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip formatter={(value) => `${value}M`} />
                  <Bar dataKey="impact" fill={(data) => data.impact > 0 ? '#82ca9d' : '#ff7675'} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 p-4 rounded-lg" style={{ 
              backgroundColor: `${colors.lightGold}20`,
              border: `1px solid ${colors.lightGold}`
            }}>
              <div className="flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2" style={{ color: colors.darkGold }} />
                <h3 className="text-sm font-medium" style={{ 
                  color: colors.darkGold,
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600
                }}>High Sensitivity Alert</h3>
              </div>
              <p className="text-sm mt-1" style={{ 
                color: colors.lead,
                fontFamily: "'Inter', sans-serif"
              }}>100bps rate increase would result in -$48M impact, exceeding threshold of -$40M.</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg overflow-hidden" style={{ 
            backgroundColor: 'white', 
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            border: `1px solid ${colors.lightBlue}` 
          }}>
          <div className="px-6 py-4" style={{ borderBottom: `1px solid ${colors.lightBlue}` }}>
            <h2 className="text-lg font-semibold" style={{ 
              color: colors.lead,
              fontFamily: "'Playfair Display', serif"
            }}>FX Risk Exposure</h2>
          </div>
          <div className="p-6">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Currency
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Exposure (%)
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Hedge Ratio (%)
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Net Risk (%)
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {fxRiskData.map((row, idx) => (
                    <tr key={idx}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {row.currency}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {row.exposure}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {row.hedgeRatio}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          row.netRisk > 3 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {row.netRisk}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="h-48 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={fxRiskData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="currency" type="category" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="exposure" name="Total Exposure" stackId="a" fill="#8884d8" />
                  <Bar dataKey="netRisk" name="Net Risk" stackId="b" fill="#ff7675" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-lg overflow-hidden" style={{ 
          backgroundColor: 'white', 
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          border: `1px solid ${colors.lightBlue}` 
        }}>
        <div className="px-6 py-4" style={{ borderBottom: `1px solid ${colors.lightBlue}` }}>
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold" style={{ 
              color: colors.lead,
              fontFamily: "'Playfair Display', serif"
            }}>Treasury Arbitrage Opportunities</h2>
            <div className="flex space-x-2">
              <span className="px-2 py-1 rounded-full text-xs font-medium" style={{ 
                backgroundColor: `${colors.lightGreen}30`,
                color: colors.darkGreen
              }}>AI Recommended Trades</span>
              <span className="px-2 py-1 rounded-full text-xs font-medium" style={{ 
                backgroundColor: `${colors.lightBlue}30`,
                color: colors.darkBlue
              }}>Best Yields</span>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Platform
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Yield (%)
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Liquidity (%)
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Spread (%)
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {treasuryArbitrageData.map((row, idx) => (
                  <tr key={idx} className={idx === 2 ? 'bg-green-50' : ''}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {row.platform}
                      {idx === 2 && <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Best</span>}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {row.yield}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {row.liquidity}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      +{row.spread}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="inline-flex items-center px-3 py-1 border text-xs leading-4 font-medium rounded-md" style={{ 
                        fontFamily: "'Inter', sans-serif",
                        backgroundColor: idx === 2 ? colors.cobalt : 'white',
                        color: idx === 2 ? 'white' : colors.lead,
                        borderColor: idx === 2 ? 'transparent' : colors.lightBlue,
                        transition: 'all 0.2s ease'
                      }}>
                        {idx === 2 ? 'Execute Trade' : 'View Details'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
                      <div className="mt-6">
            <div className="rounded-lg p-4" style={{ 
              backgroundColor: `${colors.lightGreen}20`,
              border: `1px solid ${colors.lightGreen}`
            }}>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <ShieldAlert className="h-5 w-5" style={{ color: colors.darkGreen }} />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium" style={{ 
                    color: colors.darkGreen,
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 600
                  }}>AI Trade Recommendation</h3>
                  <div className="mt-2 text-sm" style={{ 
                    color: colors.lead,
                    fontFamily: "'Inter', sans-serif"
                  }}>
                    <p>Move $20M from Franklin Templeton to Maple Finance for an estimated gain of $0.36M over 30 days.</p>
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                      <li>Yield improvement: +0.18% (4.92% → 5.10%)</li>
                      <li>Slippage estimate: 0.02%</li>
                      <li>Transaction cost: $8,000</li>
                      <li>Net gain: $360,000</li>
                    </ul>
                    <div className="mt-3 flex space-x-3">
                      <button className="inline-flex items-center px-3 py-2 border text-sm leading-4 font-medium rounded-md" style={{ 
                        fontFamily: "'Inter', sans-serif",
                        backgroundColor: colors.cobalt,
                        color: 'white',
                        borderColor: 'transparent',
                        transition: 'all 0.2s ease'
                      }}>
                        Execute Trade
                      </button>
                      <button className="inline-flex items-center px-3 py-2 border text-sm leading-4 font-medium rounded-md" style={{ 
                        fontFamily: "'Inter', sans-serif",
                        backgroundColor: 'white',
                        color: colors.lead,
                        borderColor: colors.lightBlue,
                        transition: 'all 0.2s ease'
                      }}>
                        View Details
                      </button>
                      <button className="inline-flex items-center px-3 py-2 border text-sm leading-4 font-medium rounded-md" style={{ 
                        fontFamily: "'Inter', sans-serif",
                        backgroundColor: 'white',
                        color: colors.lead,
                        borderColor: colors.lightBlue,
                        transition: 'all 0.2s ease'
                      }}>
                        Generate Rationale
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Portfolio Tab
const PortfolioTab = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-6">
        <MetricCard 
          title="Total Portfolio Value" 
          value="$1.1B" 
          change="+3.2%" 
          icon={<Wallet className="h-5 w-5 text-blue-600" />}
          isPositive={true} 
        />
        <MetricCard 
          title="Risk-Weighted Assets" 
          value="$620M" 
          change="+1.8%" 
          icon={<BarChart3 className="h-5 w-5 text-blue-600" />}
          isPositive={true} 
        />
        <MetricCard 
          title="Portfolio Yield" 
          value="4.78%" 
          change="+0.12%" 
          icon={<ArrowUpDown className="h-5 w-5 text-blue-600" />}
          isPositive={true} 
        />
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Portfolio Composition</h2>
        </div>
        <div className="grid grid-cols-2 p-6 gap-6">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={assetsByCategory}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value, percent }) => `${name}: ${value}M (${(percent * 100).toFixed(0)}%)`}
                >
                  {assetsByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}M`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="h-72 space-y-4">
            <h3 className="text-md font-medium text-gray-900">Asset Breakdown</h3>
            <div className="space-y-2">
              {assetsByCategory.map((item, index) => (
                <div key={index} className="flex items-center">
                  <div 
                    className="w-4 h-4 rounded-full mr-2" 
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-700">{item.name}</span>
                      <span className="text-sm text-gray-500">${item.value}M</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className="h-2 rounded-full" 
                        style={{ 
                          width: `${(item.value / assetsByCategory.reduce((acc, curr) => acc + curr.value, 0)) * 100}%`,
                          backgroundColor: item.color 
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end">
              <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
                View detailed breakdown
                <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Bond Portfolio by Maturity Buckets</h2>
        </div>
        <div className="p-6">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  { name: 'Overnight', value: 120 },
                  { name: '1-7 Days', value: 85 },
                  { name: '8-30 Days', value: 110 },
                  { name: '31-90 Days', value: 145 },
                  { name: '91-180 Days', value: 95 },
                  { name: '181-365 Days', value: 75 },
                  { name: '1-2 Years', value: 120 },
                  { name: '2-5 Years', value: 150 },
                  { name: '5-10 Years', value: 80 },
                  { name: '10+ Years', value: 35 },
                ]}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis label={{ value: 'Value (USD Millions)', angle: -90, position: 'insideLeft' }} />
                <Tooltip formatter={(value) => `${value}M`} />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Fixed vs Floating Rate Exposure</h2>
          </div>
          <div className="p-6 grid grid-cols-2 gap-6">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={fixedVsFloating}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {fixedVsFloating.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col justify-center space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-blue-800">Fixed Rate Assets</h3>
                <p className="text-2xl font-bold text-blue-900 mt-1">65%</p>
                <p className="text-xs text-blue-700 mt-1">$715M total exposure</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-green-800">Floating Rate Assets</h3>
                <p className="text-2xl font-bold text-green-900 mt-1">35%</p>
                <p className="text-xs text-green-700 mt-1">$385M total exposure</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Concentration Risk (Top Counterparties)</h2>
          </div>
          <div className="p-6">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={concentrationRiskData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 20]} />
                  <YAxis dataKey="name" type="category" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" name="Current Exposure (%)" fill="#8884d8" />
                  <Bar dataKey="limit" name="Limit (%)" fill="transparent" stroke="#ff0000" strokeDasharray="3 3" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Liquidity Tab
const LiquidityTab = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-6">
        <MetricCard 
          title="Liquidity Coverage Ratio" 
          value="142%" 
          change="+2.5%" 
          icon={<ArrowUpDown className="h-5 w-5 text-blue-600" />}
          isPositive={true} 
        />
        <MetricCard 
          title="Overnight Liquidity" 
          value="$220M" 
          change="-3.2%" 
          icon={<Clock className="h-5 w-5 text-blue-600" />}
          isPositive={false} 
        />
        <MetricCard 
          title="30-Day Liquidity" 
          value="$640M" 
          change="+5.8%" 
          icon={<BarChart3 className="h-5 w-5 text-blue-600" />}
          isPositive={true} 
        />
        <MetricCard 
          title="Liquidity Reserve" 
          value="$180M" 
          change="+0.0%" 
          icon={<Wallet className="h-5 w-5 text-blue-600" />}
          isPositive={true} 
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Liquidity by Timeframe</h2>
          </div>
          <div className="p-6">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={liquidityByTimeframe}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => `${value}M`} />
                  <Bar dataKey="value" fill="#8884d8">
                    {liquidityByTimeframe.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Liquidity Stress Test</h2>
          </div>
          <div className="p-6">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={[
                    { day: 1, baseline: 100, moderate: 92, severe: 78 },
                    { day: 2, baseline: 98, moderate: 85, severe: 65 },
                    { day: 3, baseline: 96, moderate: 80, severe: 55 },
                    { day: 5, baseline: 95, moderate: 75, severe: 48 },
                    { day: 7, baseline: 94, moderate: 72, severe: 42 },
                    { day: 10, baseline: 92, moderate: 68, severe: 38 },
                    { day: 15, baseline: 90, moderate: 65, severe: 35 },
                    { day: 20, baseline: 88, moderate: 64, severe: 34 },
                    { day: 30, baseline: 85, moderate: 60, severe: 32 },
                  ]}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" label={{ value: 'Days', position: 'insideBottom', offset: -5 }} />
                  <YAxis domain={[0, 100]} label={{ value: 'Liquidity Remaining (%)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="baseline" name="Baseline" stroke="#4ade80" strokeWidth={2} dot />
                  <Line type="monotone" dataKey="moderate" name="Moderate Stress" stroke="#facc15" strokeWidth={2} dot />
                  <Line type="monotone" dataKey="severe" name="Severe Stress" stroke="#ef4444" strokeWidth={2} dot />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
              <div className="flex items-center">
                <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
                <h3 className="text-sm font-medium text-yellow-800">Severe Scenario Alert</h3>
              </div>
              <p className="text-sm text-yellow-700 mt-1">In the severe scenario, liquidity falls below 40% threshold within 7 days, requiring contingency funding plan activation.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Maturity Gap Analysis</h2>
        </div>
        <div className="p-6">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={maturityProfile}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" />
                <YAxis />
                <Tooltip formatter={(value) => `${value}M`} />
                <Legend />
                <Bar dataKey="assets" name="Assets" fill="#8884d8" />
                <Bar dataKey="liabilities" name="Liabilities" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-6">
            <div className="p-3 bg-blue-50 rounded-lg">
              <h3 className="text-sm font-medium text-blue-800">Short-Term Gap (0-6M)</h3>
              <p className="text-2xl font-bold text-blue-900 mt-1">$0M</p>
              <p className="text-xs text-blue-700 mt-1">Assets: $60M / Liabilities: $60M</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <h3 className="text-sm font-medium text-green-800">Medium-Term Gap (6M-3Y)</h3>
              <p className="text-2xl font-bold text-green-900 mt-1">+$12M</p>
              <p className="text-xs text-green-700 mt-1">Assets: $75M / Liabilities: $63M</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <h3 className="text-sm font-medium text-purple-800">Long-Term Gap (&lt;3Y)</h3>
              <p className="text-2xl font-bold text-purple-900 mt-1">+$20M</p>
              <p className="text-xs text-purple-700 mt-1">Assets: $65M / Liabilities: $45M</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Liquidity Sources and Requirements</h2>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Source/Requirement
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Overnight
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    1-7 Days
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    8-30 Days
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    31-90 Days
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Cash and Deposits
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$120M</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$120M</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$120M</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$120M</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Liquid Securities
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$100M</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$150M</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$180M</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$220M</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Repo Capacity
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$80M</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$120M</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$150M</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$150M</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Total Sources
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">$300M</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">$390M</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">$450M</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">$490M</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Expected Outflows
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$80M</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$120M</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$180M</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$220M</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Stress Outflows
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$140M</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$210M</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$280M</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$320M</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-900">
                    Net Position (Expected)
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-900">+$220M</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-900">+$270M</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-900">+$270M</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-900">+$270M</td>
                </tr>
                <tr className="bg-yellow-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-yellow-900">
                    Net Position (Stress)
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-yellow-900">+$160M</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-yellow-900">+$180M</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-yellow-900">+$170M</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-yellow-900">+$170M</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

// Market Risk Tab
const MarketRiskTab = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-6">
        <MetricCard 
          title="Value at Risk (95%)" 
          value="$4.2M" 
          change="-0.5%" 
          icon={<ShieldAlert className="h-5 w-5 text-blue-600" />}
          isPositive={true} 
        />
        <MetricCard 
          title="Interest Rate Sensitivity" 
          value="$48M/100bps" 
          change="+2.1%" 
          icon={<ArrowUpDown className="h-5 w-5 text-blue-600" />}
          isPositive={false} 
        />
        <MetricCard 
          title="FX Risk Exposure" 
          value="$12.4M" 
          change="-1.2%" 
          icon={<BarChart3 className="h-5 w-5 text-blue-600" />}
          isPositive={true} 
        />
        <MetricCard 
          title="Market Volatility Index" 
          value="24.8" 
          change="+3.4%" 
          icon={<AlertTriangle className="h-5 w-5 text-blue-600" />}
          isPositive={false} 
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Interest Rate Risk (Expected Impact)</h2>
          </div>
          <div className="p-6">
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={interestRateRiskData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis label={{ value: 'Impact (USD Millions)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip formatter={(value) => `${value}M`} />
                  <Bar dataKey="impact" fill={(data) => data.impact > 0 ? '#82ca9d' : '#ff7675'} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
              <div className="flex items-center">
                <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
                <h3 className="text-sm font-medium text-yellow-800">High Sensitivity Alert</h3>
              </div>
              <p className="text-sm text-yellow-700 mt-1">100bps rate increase would result in -$48M impact, exceeding threshold of -$40M.</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Yield Curve Shift Analysis</h2>
          </div>
          <div className="p-6">
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={yieldCurveData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="term" />
                  <YAxis domain={[3, 5]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="current" name="Current" stroke="#8884d8" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="previous" name="Previous Week" stroke="#82ca9d" strokeDasharray="5 5" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <h3 className="text-sm font-medium text-blue-800">Analysis</h3>
              <p className="text-sm text-blue-700 mt-1">Flattening trend observed in the yield curve with short-term rates rising. This indicates potential economic slowdown expectations.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">FX Risk Exposure</h2>
          </div>
          <div className="p-6">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Currency
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Exposure (%)
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Hedge Ratio (%)
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Net Risk (%)
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {fxRiskData.map((row, idx) => (
                    <tr key={idx}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {row.currency}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {row.exposure}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {row.hedgeRatio}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          row.netRisk > 3 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {row.netRisk}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="h-48 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={fxRiskData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="currency" type="category" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="exposure" name="Total Exposure" stackId="a" fill="#8884d8" />
                  <Bar dataKey="netRisk" name="Net Risk" stackId="b" fill="#ff7675" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Crypto Volatility Analysis</h2>
          </div>
          <div className="p-6">
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart
                  margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                >
                  <CartesianGrid />
                  <XAxis type="number" dataKey="volatility" name="Volatility" unit="%" />
                  <YAxis type="number" dataKey="exposure" name="Exposure" unit="M" />
                  <ZAxis type="number" dataKey="value" range={[50, 400]} />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                  <Legend />
                  <Scatter name="Crypto Assets" data={[
                    { name: 'BTC', volatility: 48, exposure: 62, value: 150 },
                    { name: 'ETH', volatility: 52, exposure: 48, value: 120 },
                    { name: 'XRP', volatility: 37, exposure: 24, value: 80 },
                    { name: 'SOL', volatility: 65, exposure: 18, value: 70 },
                    { name: 'ADA', volatility: 55, exposure: 14, value: 60 },
                    { name: 'AVAX', volatility: 72, exposure: 8, value: 40 },
                    { name: 'MATIC', volatility: 68, exposure: 6, value: 30 },
                  ]} fill="#8884d8" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700">Bubble size represents total value in USD millions. High volatility assets (&gt;50%) represent 54% of crypto portfolio.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Treasury Tab
const TreasuryTab = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-6">
        <MetricCard 
          title="Treasury Assets" 
          value="$450M" 
          change="+4.2%" 
          icon={<Wallet className="h-5 w-5 text-blue-600" />}
          isPositive={true} 
        />
        <MetricCard 
          title="Average Yield" 
          value="4.92%" 
          change="+0.15%" 
          icon={<ArrowUpDown className="h-5 w-5 text-blue-600" />}
          isPositive={true} 
        />
        <MetricCard 
          title="Arbitrage Opportunities" 
          value="5" 
          change="+2" 
          icon={<BarChart3 className="h-5 w-5 text-blue-600" />}
          isPositive={true} 
        />
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">Treasury Arbitrage Opportunities</h2>
            <div className="flex space-x-2">
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">AI Recommended Trades</span>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">Best Yields</span>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Platform
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Yield (%)
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Liquidity (%)
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Spread (%)
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {treasuryArbitrageData.map((row, idx) => (
                  <tr key={idx} className={idx === 2 ? 'bg-green-50' : ''}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {row.platform}
                      {idx === 2 && <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Best</span>}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {row.yield}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {row.liquidity}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      +{row.spread}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className={`inline-flex items-center px-3 py-1 border border-transparent text-xs leading-4 font-medium rounded-md ${
                        idx === 2 
                          ? 'text-white bg-green-600 hover:bg-green-700' 
                          : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
                      }`}>
                        {idx === 2 ? 'Execute Trade' : 'View Details'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <ShieldAlert className="h-5 w-5 text-green-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">AI Trade Recommendation</h3>
                  <div className="mt-2 text-sm text-green-700">
                    <p>Move $20M from Franklin Templeton to Maple Finance for an estimated gain of $0.36M over 30 days.</p>
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                      <li>Yield improvement: +0.18% (4.92% → 5.10%)</li>
                      <li>Slippage estimate: 0.02%</li>
                      <li>Transaction cost: $8,000</li>
                      <li>Net gain: $360,000</li>
                    </ul>
                    <div className="mt-3 flex space-x-3">
                      <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700">
                        Execute Trade
                      </button>
                      <button className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                        View Details
                      </button>
                      <button className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                        Generate Rationale
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Treasury Yield Curve</h2>
          </div>
          <div className="p-6">
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={yieldCurveData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="term" />
                  <YAxis domain={[3, 5]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="current" name="Current" stroke="#8884d8" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="previous" name="Previous Week" stroke="#82ca9d" strokeDasharray="5 5" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Maturity Distribution</h2>
          </div>
          <div className="p-6">
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={liquidityByTimeframe}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis label={{ value: 'Value (USD Millions)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip formatter={(value) => `${value}M`} />
                  <Bar dataKey="value" fill="#8884d8">
                    {liquidityByTimeframe.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Structured Notes Tab
const StructuredNotesTab = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-6">
        <MetricCard 
          title="Total Structured Notes" 
          value="$220M" 
          change="+5.2%" 
          icon={<Wallet className="h-5 w-5 text-blue-600" />}
          isPositive={true} 
        />
        <MetricCard 
          title="Average Yield" 
          value="6.8%" 
          change="+0.2%" 
          icon={<ArrowUpDown className="h-5 w-5 text-blue-600" />}
          isPositive={true} 
        />
        <MetricCard 
          title="Risk Score" 
          value="3.8/10" 
          change="-0.2" 
          icon={<AlertTriangle className="h-5 w-5 text-blue-600" />}
          isPositive={true} 
        />
        <MetricCard 
          title="Average Maturity" 
          value="2.4 Years" 
          change="+0.1" 
          icon={<Clock className="h-5 w-5 text-blue-600" />}
          isPositive={true} 
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Structured Notes by Type</h2>
          </div>
          <div className="p-6">
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Growth Notes', value: 85, color: '#8884d8' },
                      { name: 'Market-Linked CDs', value: 45, color: '#83a6ed' },
                      { name: 'Income Notes', value: 35, color: '#8dd1e1' },
                      { name: 'Absolute Notes', value: 28, color: '#82ca9d' },
                      { name: 'Digital Notes', value: 15, color: '#a4de6c' },
                      { name: 'Principal Protected Notes', value: 12, color: '#d0ed57' },
                    ]}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value, percent }) => `${name}: ${value}M (${(percent * 100).toFixed(0)}%)`}
                  >
                    {[
                      { name: 'Growth Notes', value: 85, color: '#8884d8' },
                      { name: 'Market-Linked CDs', value: 45, color: '#83a6ed' },
                      { name: 'Income Notes', value: 35, color: '#8dd1e1' },
                      { name: 'Absolute Notes', value: 28, color: '#82ca9d' },
                      { name: 'Digital Notes', value: 15, color: '#a4de6c' },
                      { name: 'Principal Protected Notes', value: 12, color: '#d0ed57' },
                    ].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}M`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Risk Assessment Matrix</h2>
          </div>
          <div className="p-6">
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart outerRadius={90} width={730} height={250} data={structuredNotesRisk}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="name" />
                  <PolarRadiusAxis angle={30} domain={[0, 10]} />
                  <Radar name="Current Risk" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                  <Radar name="Threshold" dataKey="threshold" stroke="#ff0000" fill="#ff0000" fillOpacity={0.1} />
                  <Legend />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Structured Products Detail</h2>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Yield
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Early Withdrawal Risk
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Market Risk
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[
                  { type: 'Growth Notes', amount: 85, yield: 7.2, earlyRisk: 'High', marketRisk: 'High', status: 'Normal' },
                  { type: 'Market-Linked CDs', amount: 45, yield: 5.8, earlyRisk: 'Medium', marketRisk: 'Medium', status: 'Normal' },
                  { type: 'Income Notes', amount: 35, yield: 6.5, earlyRisk: 'Medium', marketRisk: 'Low', status: 'Attention' },
                  { type: 'Absolute Notes', amount: 28, yield: 8.2, earlyRisk: 'High', marketRisk: 'Medium', status: 'Normal' },
                  { type: 'Digital Notes', amount: 15, yield: 7.8, earlyRisk: 'Low', marketRisk: 'High', status: 'Warning' },
                  { type: 'Principal Protected Notes', amount: 12, yield: 4.2, earlyRisk: 'Low', marketRisk: 'Low', status: 'Normal' },
                ].map((row, idx) => (
                  <tr key={idx}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {row.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${row.amount}M
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {row.yield}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        row.earlyRisk === 'High' 
                          ? 'bg-red-100 text-red-800' 
                          : row.earlyRisk === 'Medium'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-green-100 text-green-800'
                      }`}>
                        {row.earlyRisk}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        row.marketRisk === 'High' 
                          ? 'bg-red-100 text-red-800' 
                          : row.marketRisk === 'Medium'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-green-100 text-green-800'
                      }`}>
                        {row.marketRisk}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        row.status === 'Warning' 
                          ? 'bg-red-100 text-red-800' 
                          : row.status === 'Attention'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-green-100 text-green-800'
                      }`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

// Stress Test Tab
const StressTestTab = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Interest Rate Stress Test</h2>
          </div>
          <div className="p-6">
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { scenario: 'Baseline', impact: 0 },
                    { scenario: '+100 bps Parallel', impact: -24 },
                    { scenario: '+250 bps Parallel', impact: -62 },
                    { scenario: '+500 bps Parallel', impact: -135 },
                    { scenario: 'Yield Curve Flattening', impact: -38 },
                    { scenario: 'Yield Curve Steepening', impact: -15 },
                  ]}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[-150, 20]} />
                  <YAxis dataKey="scenario" type="category" width={150} />
                  <Tooltip formatter={(value) => `${Math.abs(value)}M impact`} />
                  <Legend />
                  <Bar dataKey="impact" name="P&L Impact (USD Millions)" fill={(data) => data.impact < -100 ? '#ef4444' : data.impact < -50 ? '#f97316' : data.impact < -20 ? '#facc15' : '#84cc16'} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Liquidity Stress Test</h2>
          </div>
          <div className="p-6">
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={[
                    { day: 1, baseline: 100, moderate: 92, severe: 78 },
                    { day: 2, baseline: 98, moderate: 85, severe: 65 },
                    { day: 3, baseline: 96, moderate: 80, severe: 55 },
                    { day: 5, baseline: 95, moderate: 75, severe: 48 },
                    { day: 7, baseline: 94, moderate: 72, severe: 42 },
                    { day: 10, baseline: 92, moderate: 68, severe: 38 },
                    { day: 15, baseline: 90, moderate: 65, severe: 35 },
                    { day: 20, baseline: 88, moderate: 64, severe: 34 },
                    { day: 30, baseline: 85, moderate: 60, severe: 32 },
                  ]}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" label={{ value: 'Days', position: 'insideBottom', offset: -5 }} />
                  <YAxis domain={[0, 100]} label={{ value: 'Liquidity Remaining (%)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="baseline" name="Baseline" stroke="#4ade80" strokeWidth={2} dot />
                  <Line type="monotone" dataKey="moderate" name="Moderate Stress" stroke="#facc15" strokeWidth={2} dot />
                  <Line type="monotone" dataKey="severe" name="Severe Stress" stroke="#ef4444" strokeWidth={2} dot />
                  <Line type="monotone" y={40} stroke="#ef4444" strokeDasharray="3 3" name="Minimum Threshold" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Concentration Risk Impact</h2>
          </div>
          <div className="p-6">
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { counterparty: 'Client A', baseline: 0, stressed: -8 },
                    { counterparty: 'Client B', baseline: 0, stressed: -5 },
                    { counterparty: 'Client C', baseline: 0, stressed: -12 },
                    { counterparty: 'Client D', baseline: 0, stressed: -4 },
                    { counterparty: 'Client E', baseline: 0, stressed: -7 },
                  ]}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="counterparty" />
                  <YAxis domain={[-15, 0]} />
                  <Tooltip formatter={(value) => `${Math.abs(value)}M impact`} />
                  <Legend />
                  <Bar dataKey="baseline" name="Baseline" fill="#84cc16" />
                  <Bar dataKey="stressed" name="Stressed Scenario" fill="#ef4444" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">FX Stress Test</h2>
          </div>
          <div className="p-6">
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { currency: 'EUR', moderate: -4.2, severe: -7.5 },
                    { currency: 'JPY', moderate: -3.5, severe: -6.2 },
                    { currency: 'GBP', moderate: -1.8, severe: -3.2 },
                    { currency: 'CHF', moderate: -1.2, severe: -2.1 },
                    { currency: 'CAD', moderate: -0.9, severe: -1.6 },
                  ]}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[-10, 0]} />
                  <YAxis dataKey="currency" type="category" />
                  <Tooltip formatter={(value) => `${Math.abs(value)}M impact`} />
                  <Legend />
                  <Bar dataKey="moderate" name="10% Adverse Move" fill="#facc15" />
                  <Bar dataKey="severe" name="20% Adverse Move" fill="#ef4444" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Comprehensive Stress Test Results</h2>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Scenario
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Capital Impact
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Liquidity Impact
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Post-Stress Capital Ratio
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[
                  { scenario: 'Baseline', capitalImpact: 0, liquidityImpact: 0, ratio: 18.5, status: 'Pass' },
                  { scenario: 'Moderate Recession', capitalImpact: -38, liquidityImpact: -15, ratio: 16.2, status: 'Pass' },
                  { scenario: 'Severe Recession', capitalImpact: -85, liquidityImpact: -32, ratio: 14.8, status: 'Pass' },
                  { scenario: 'Market Crash', capitalImpact: -112, liquidityImpact: -45, ratio: 13.6, status: 'Pass' },
                  { scenario: 'Liquidity Crisis', capitalImpact: -65, liquidityImpact: -60, ratio: 15.2, status: 'Pass' },
                  { scenario: 'Combined Severe Stress', capitalImpact: -145, liquidityImpact: -68, ratio: 11.8, status: 'Warning' },
                ].map((row, idx) => (
                  <tr key={idx} className={row.status === 'Warning' ? 'bg-yellow-50' : ''}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {row.scenario}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {row.capitalImpact === 0 ? '-' : `${Math.abs(row.capitalImpact)}M`}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {row.liquidityImpact === 0 ? '-' : `${Math.abs(row.liquidityImpact)}%`}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {row.ratio}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        row.status === 'Pass' 
                          ? 'bg-green-100 text-green-800' 
                          : row.status === 'Warning'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                      }`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
              <h3 className="text-sm font-medium text-yellow-800">Stress Test Finding</h3>
            </div>
            <p className="text-sm text-yellow-700 mt-1">The "Combined Severe Stress" scenario shows potential vulnerability if multiple risk factors materialize simultaneously. While still above regulatory minimum (8%), capital ratio would drop to 11.8%, which is below our internal target of 12%.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Dashboard Component
const RiskDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f5f5f7' }}>
      {/* Add font styles to the document */}
      <style dangerouslySetInnerHTML={{ __html: fontStyles }} />
      
      <header className="py-4 px-6 flex justify-between items-center" style={{ backgroundColor: colors.lead, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <div className="flex items-center space-x-2">
          <Landmark className="h-8 w-8" style={{ color: colors.lightGold }} />
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>ROCA Bank - Risk Management Dashboard</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="px-3 py-1 rounded-full text-sm font-medium" style={{ backgroundColor: 'rgba(126, 183, 165, 0.2)', color: colors.lightGreen }}>
            All Systems Normal
          </div>
          <div className="text-sm text-gray-300">Last updated: March 10, 2025 • 11:42 AM</div>
        </div>
      </header>

      <nav className="px-6 py-2" style={{ backgroundColor: colors.cobalt, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <ul className="flex space-x-6">
          <li>
            <button
              onClick={() => setActiveTab('overview')}
              className="px-3 py-2 font-medium rounded-md"
              style={{ 
                fontFamily: "'Inter', sans-serif",
                backgroundColor: activeTab === 'overview' ? colors.darkBlue : 'transparent',
                color: activeTab === 'overview' ? colors.lightBlue : 'white',
                transition: 'all 0.2s ease'
              }}
            >
              Overview
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab('portfolio')}
              className="px-3 py-2 font-medium rounded-md"
              style={{ 
                fontFamily: "'Inter', sans-serif",
                backgroundColor: activeTab === 'portfolio' ? colors.darkBlue : 'transparent',
                color: activeTab === 'portfolio' ? colors.lightBlue : 'white',
                transition: 'all 0.2s ease'
              }}
            >
              Portfolio
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab('liquidity')}
              className="px-3 py-2 font-medium rounded-md"
              style={{ 
                fontFamily: "'Inter', sans-serif",
                backgroundColor: activeTab === 'liquidity' ? colors.darkBlue : 'transparent',
                color: activeTab === 'liquidity' ? colors.lightBlue : 'white',
                transition: 'all 0.2s ease'
              }}
            >
              Liquidity
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab('market')}
              className="px-3 py-2 font-medium rounded-md"
              style={{ 
                fontFamily: "'Inter', sans-serif",
                backgroundColor: activeTab === 'market' ? colors.darkBlue : 'transparent',
                color: activeTab === 'market' ? colors.lightBlue : 'white',
                transition: 'all 0.2s ease'
              }}
            >
              Market Risk
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab('treasury')}
              className="px-3 py-2 font-medium rounded-md"
              style={{ 
                fontFamily: "'Inter', sans-serif",
                backgroundColor: activeTab === 'treasury' ? colors.darkBlue : 'transparent',
                color: activeTab === 'treasury' ? colors.lightBlue : 'white',
                transition: 'all 0.2s ease'
              }}
            >
              Treasury
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab('structured')}
              className="px-3 py-2 font-medium rounded-md"
              style={{ 
                fontFamily: "'Inter', sans-serif",
                backgroundColor: activeTab === 'structured' ? colors.darkBlue : 'transparent',
                color: activeTab === 'structured' ? colors.lightBlue : 'white',
                transition: 'all 0.2s ease'
              }}
            >
              Structured Notes
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab('stress')}
              className="px-3 py-2 font-medium rounded-md"
              style={{ 
                fontFamily: "'Inter', sans-serif",
                backgroundColor: activeTab === 'stress' ? colors.darkBlue : 'transparent',
                color: activeTab === 'stress' ? colors.lightBlue : 'white',
                transition: 'all 0.2s ease'
              }}
            >
              Stress Tests
            </button>
          </li>
        </ul>
      </nav>

      <main className="container mx-auto px-6 py-4">
        <div style={{ fontFamily: "'Inter', sans-serif" }}>
          {activeTab === 'overview' && <OverviewTab />}
          {activeTab === 'portfolio' && <PortfolioTab />}
          {activeTab === 'liquidity' && <LiquidityTab />}
          {activeTab === 'market' && <MarketRiskTab />}
          {activeTab === 'treasury' && <TreasuryTab />}
          {activeTab === 'structured' && <StructuredNotesTab />}
          {activeTab === 'stress' && <StressTestTab />}
        </div>
      </main>
    </div>
  );
};

export default RiskDashboard;
