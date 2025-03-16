import React, { useState } from 'react';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, Cell
} from 'recharts';
import { 
  Wallet, BarChart3, ArrowUpDown, ShieldAlert, Landmark, 
  AlertTriangle, Clock, ChevronRight, Menu, X, 
  ChevronDown
} from 'lucide-react';

// 4Thought color palette
const colors = {
  lead: "#1E1E1F",
  cobalt: "#2C3D7D",
  lightRed: "#D87766",
  lightGold: "#D3A073",
  lightBlue: "#C5D7FB",
  darkBlue: "#14346F",
  lightGreen: "#7EB7A5",
  darkGreen: "#0B5D37"
};

// Sample data
const assetsByCategory = [
  { name: 'Treasuries', value: 450, color: colors.cobalt },
  { name: 'FX Positions', value: 250, color: colors.lightBlue },
  { name: 'Crypto', value: 180, color: colors.lightRed },
  { name: 'Structured Notes', value: 220, color: colors.lightGold },
];

const topRiskData = [
  { name: 'Interest Rate', value: 85, threshold: 100 },
  { name: 'FX Risk', value: 65, threshold: 100 },
  { name: 'Concentration', value: 78, threshold: 100 },
  { name: 'Liquidity', value: 45, threshold: 100 },
  { name: 'Operational', value: 35, threshold: 100 },
];

const interestRateRiskData = [
  { name: 'Up 25bps', impact: -12 },
  { name: 'Up 50bps', impact: -24 },
  { name: 'Up 100bps', impact: -48 },
  { name: 'Down 25bps', impact: 10 },
  { name: 'Down 50bps', impact: 21 },
  { name: 'Down 100bps', impact: 42 },
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

const maturityProfile = [
  { range: '0-3M', assets: 35, liabilities: 28 },
  { range: '3-6M', assets: 25, liabilities: 32 },
  { range: '6-12M', assets: 30, liabilities: 25 },
  { range: '1-3Y', assets: 45, liabilities: 38 },
  { range: '3-5Y', assets: 40, liabilities: 30 },
  { range: '>5Y', assets: 25, liabilities: 15 },
];

const liquidityStressTest = [
  { day: 1, baseline: 100, moderate: 92, severe: 78 },
  { day: 2, baseline: 98, moderate: 85, severe: 65 },
  { day: 3, baseline: 96, moderate: 80, severe: 55 },
  { day: 5, baseline: 95, moderate: 75, severe: 48 },
  { day: 7, baseline: 94, moderate: 72, severe: 42 },
  { day: 10, baseline: 92, moderate: 68, severe: 38 },
  { day: 15, baseline: 90, moderate: 65, severe: 35 },
  { day: 20, baseline: 88, moderate: 64, severe: 34 },
  { day: 30, baseline: 85, moderate: 60, severe: 32 },
];

const treasuryArbitrageData = [
  { platform: 'Ondo Finance', yield: 4.85, liquidity: 90, spread: 0.12 },
  { platform: 'Franklin Templeton', yield: 4.92, liquidity: 85, spread: 0.19 },
  { platform: 'Maple Finance', yield: 5.10, liquidity: 75, spread: 0.37 },
  { platform: 'Benji', yield: 4.88, liquidity: 80, spread: 0.15 },
  { platform: 'RippleHub', yield: 4.95, liquidity: 82, spread: 0.22 },
];

const alertsData = [
  { id: 1, severity: 'High', type: 'Concentration', message: 'Client C exposure at limit (15%)', timestamp: '10:32 AM' },
  { id: 2, severity: 'Medium', type: 'Liquidity', message: 'Overnight liquidity below threshold', timestamp: '09:45 AM' },
  { id: 3, severity: 'Medium', type: 'Interest Rate', message: 'Duration gap outside target range', timestamp: '08:30 AM' },
  { id: 4, severity: 'Low', type: 'FX', message: 'EUR hedge ratio decreased to 80%', timestamp: 'Yesterday' },
];

// Metric Card Component - Adapted for mobile
const MetricCard = ({ title, value, change, icon, isPositive }) => {
  return (
    <div className="rounded-lg p-4 mb-3 bg-white shadow border border-blue-100">
      <div className="flex justify-between items-start">
        <div>
          <div className="text-sm font-medium text-gray-800">{title}</div>
          <div className="mt-1 text-xl font-semibold text-gray-900">{value}</div>
        </div>
        <div className="p-2 rounded-md bg-blue-50 text-blue-700">
          {icon}
        </div>
      </div>
      <div className="mt-2 flex items-center">
        <span className={`text-xs font-medium ${isPositive ? 'text-green-700' : 'text-red-700'}`}>
          {change}
        </span>
        <span className="text-xs ml-2 text-gray-500">from last month</span>
      </div>
    </div>
  );
};

// Card with Chart Component
const ChartCard = ({ title, icon, children, expandable = true }) => {
  const [expanded, setExpanded] = useState(true);
  
  return (
    <div className="rounded-lg mb-4 bg-white shadow border border-blue-100">
      <div 
        className={`flex justify-between items-center p-4 border-b border-blue-100 ${expandable ? 'cursor-pointer' : ''}`}
        onClick={() => expandable && setExpanded(!expanded)}
      >
        <div className="flex items-center">
          {icon && (
            <span className="mr-2 text-blue-700">
              {icon}
            </span>
          )}
          <h2 className="text-md font-semibold text-gray-800">{title}</h2>
        </div>
        {expandable && (
          <ChevronDown 
            className={`h-4 w-4 text-gray-600 transform transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
          /> 
        )}
      </div>
      {(!expandable || expanded) && (
        <div className="p-4">
          {children}
        </div>
      )}
    </div>
  );
};

// Alert Component
const Alert = ({ severity, message, timestamp, type }) => {
  const bgColor = severity === 'High' ? 'bg-red-50 border-l-4 border-red-500' : 
                 severity === 'Medium' ? 'bg-yellow-50 border-l-4 border-yellow-500' : 
                 'bg-blue-50 border-l-4 border-blue-500';
  const textColor = severity === 'High' ? 'text-red-800' : 
                   severity === 'Medium' ? 'text-yellow-800' : 
                   'text-blue-800';
  
  return (
    <div className={`p-3 rounded-md mb-2 ${bgColor}`}>
      <div className="flex justify-between">
        <span className={`text-sm font-medium ${textColor}`}>{type}</span>
        <span className="text-xs text-gray-500">{timestamp}</span>
      </div>
      <p className="text-sm text-gray-700 mt-1">{message}</p>
    </div>
  );
};

// Mobile Navigation Drawer Component
const MobileNavDrawer = ({ activeTab, setActiveTab, isOpen, setIsOpen }) => {
  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'liquidity', label: 'Liquidity' },
    { id: 'market', label: 'Market Risk' },
    { id: 'treasury', label: 'Treasury' },
    { id: 'stress', label: 'Stress Tests' },
  ];
  
  return (
    <div className={`fixed inset-0 z-20 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsOpen(false)} />
      <div className={`absolute top-0 left-0 w-3/4 h-full bg-white shadow-lg transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-4 flex justify-between items-center bg-blue-900">
          <h2 className="text-lg font-semibold text-white">
            Menu
          </h2>
          <button className="text-white" onClick={() => setIsOpen(false)}>
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="py-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className="w-full text-left px-4 py-3 flex justify-between items-center"
              style={{ 
                backgroundColor: activeTab === tab.id ? 'rgba(197, 215, 251, 0.3)' : 'transparent',
                borderLeft: activeTab === tab.id ? `4px solid ${colors.cobalt}` : '4px solid transparent',
              }}
              onClick={() => {
                setActiveTab(tab.id);
                setIsOpen(false);
              }}
            >
              <span 
                className="font-medium"
                style={{ 
                  color: activeTab === tab.id ? colors.cobalt : colors.lead,
                }}
              >
                {tab.label}
              </span>
              {activeTab === tab.id && (
                <ChevronRight className="h-4 w-4 text-blue-700" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// Overview Tab
const OverviewTab = () => {
  return (
    <div className="space-y-4">
      {/* Key Metrics - Stacked vertically for mobile */}
      <div>
        <MetricCard 
          title="Total Assets" 
          value="$1.1B" 
          change="+3.2%" 
          icon={<Wallet className="h-5 w-5" />}
          isPositive={true} 
        />
        <MetricCard 
          title="Risk-Weighted Assets" 
          value="$620M" 
          change="+1.8%" 
          icon={<BarChart3 className="h-5 w-5" />}
          isPositive={true} 
        />
        <MetricCard 
          title="VaR (95%, 1 day)" 
          value="$4.2M" 
          change="-0.5%" 
          icon={<ShieldAlert className="h-5 w-5" />}
          isPositive={true} 
        />
        <MetricCard 
          title="Liquidity Coverage" 
          value="142%" 
          change="+2.5%" 
          icon={<ArrowUpDown className="h-5 w-5" />}
          isPositive={true} 
        />
      </div>

      {/* Charts/Cards - Single column for mobile */}
      <ChartCard title="Asset Allocation" icon={<BarChart3 className="h-4 w-4" />}>
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
      </ChartCard>

      <ChartCard title="Risk Alerts" icon={<AlertTriangle className="h-4 w-4" />}>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {alertsData.map(alert => (
            <Alert 
              key={alert.id}
              severity={alert.severity}
              type={alert.type}
              message={alert.message}
              timestamp={alert.timestamp}
            />
          ))}
        </div>
      </ChartCard>

      <ChartCard title="Top Risk Exposures" icon={<BarChart3 className="h-4 w-4" />}>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={topRiskData}
              margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} angle={-45} textAnchor="end" height={50} />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Bar dataKey="value" fill={colors.cobalt} />
              <Bar dataKey="threshold" fill="transparent" stroke="#ff0000" strokeDasharray="3 3" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      <ChartCard title="Treasury Arbitrage Opportunities">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Platform
                </th>
                <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Yield
                </th>
                <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {treasuryArbitrageData.slice(0, 3).map((row, idx) => (
                <tr key={idx} className={idx === 2 ? 'bg-green-50' : ''}>
                  <td className="px-3 py-2 whitespace-nowrap text-xs font-medium text-gray-900">
                    {row.platform}
                    {idx === 2 && <span className="ml-1 inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Best</span>}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">
                    {row.yield}%
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">
                    <button className={`inline-flex items-center px-2 py-1 border text-xs leading-4 font-medium rounded-md ${
                      idx === 2 
                        ? 'bg-blue-700 text-white border-transparent' 
                        : 'bg-white text-gray-700 border-gray-300'
                    }`}>
                      {idx === 2 ? 'Execute' : 'View'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-4">
          <div className="rounded-lg p-4 bg-green-50 border border-green-200">
            <div className="flex items-start">
              <ShieldAlert className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
              <div className="ml-2">
                <h3 className="text-sm font-medium text-green-800">AI Trade Recommendation</h3>
                <div className="mt-1 text-xs text-green-700">
                  <p>Move $20M from Franklin Templeton to Maple Finance for an estimated gain of $0.36M over 30 days.</p>
                  <div className="mt-3 flex space-x-2">
                    <button className="inline-flex items-center px-3 py-1 border text-xs leading-4 font-medium rounded-md bg-green-600 text-white border-transparent">
                      Execute
                    </button>
                    <button className="inline-flex items-center px-3 py-1 border text-xs leading-4 font-medium rounded-md bg-white text-gray-700 border-gray-300">
                      Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ChartCard>
    </div>
  );
};

// Portfolio Tab
const PortfolioTab = () => {
  return (
    <div className="space-y-4">
      <div>
        <MetricCard 
          title="Total Portfolio Value" 
          value="$1.1B" 
          change="+3.2%" 
          icon={<Wallet className="h-5 w-5" />}
          isPositive={true} 
        />
        <MetricCard 
          title="Risk-Weighted Assets" 
          value="$620M" 
          change="+1.8%" 
          icon={<BarChart3 className="h-5 w-5" />}
          isPositive={true} 
        />
        <MetricCard 
          title="Portfolio Yield" 
          value="4.78%" 
          change="+0.12%" 
          icon={<ArrowUpDown className="h-5 w-5" />}
          isPositive={true} 
        />
      </div>

      <ChartCard title="Portfolio Composition">
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
              <Tooltip formatter={(value) => `${value}M`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 space-y-2">
          {assetsByCategory.map((item, index) => (
            <div key={index} className="flex items-center">
              <div 
                className="w-3 h-3 rounded-full mr-2" 
                style={{ backgroundColor: item.color }}
              ></div>
              <div className="flex-1 text-xs">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">{item.name}</span>
                  <span className="text-gray-500">${item.value}M</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                  <div 
                    className="h-1.5 rounded-full" 
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
      </ChartCard>

      <ChartCard title="Bond Portfolio by Maturity">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={[
                { name: '0-30D', value: 205 },
                { name: '1-6M', value: 240 },
                { name: '6-12M', value: 75 },
                { name: '1-2Y', value: 120 },
                { name: '2-5Y', value: 150 },
                { name: '5Y+', value: 115 },
              ]}
              margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis label={{ value: 'Value ($M)', angle: -90, position: 'insideLeft', offset: -10, fontSize: 10 }} />
              <Tooltip formatter={(value) => `${value}M`} />
              <Bar dataKey="value" fill={colors.cobalt} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>
    </div>
  );
};

// Liquidity Tab
const LiquidityTab = () => {
  return (
    <div className="space-y-4">
      <div>
        <MetricCard 
          title="Liquidity Coverage Ratio" 
          value="142%" 
          change="+2.5%" 
          icon={<ArrowUpDown className="h-5 w-5" />}
          isPositive={true} 
        />
        <MetricCard 
          title="Overnight Liquidity" 
          value="$220M" 
          change="-3.2%" 
          icon={<Clock className="h-5 w-5" />}
          isPositive={false} 
        />
        <MetricCard 
          title="30-Day Liquidity" 
          value="$640M" 
          change="+5.8%" 
          icon={<BarChart3 className="h-5 w-5" />}
          isPositive={true} 
        />
      </div>

      <ChartCard title="Liquidity Stress Test">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={liquidityStressTest}
              margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="baseline" name="Baseline" stroke="#4ade80" strokeWidth={2} dot />
              <Line type="monotone" dataKey="moderate" name="Moderate" stroke="#facc15" strokeWidth={2} dot />
              <Line type="monotone" dataKey="severe" name="Severe" stroke="#ef4444" strokeWidth={2} dot />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-3 p-3 bg-yellow-50 rounded-lg">
          <div className="flex items-center">
            <AlertTriangle className="h-4 w-4 text-yellow-500 mr-2" />
            <h3 className="text-xs font-medium text-yellow-800">Severe Scenario Alert</h3>
          </div>
          <p className="text-xs text-yellow-700 mt-1">In severe scenario, liquidity falls below 40% threshold within 7 days.</p>
        </div>
      </ChartCard>

      <ChartCard title="Maturity Gap Analysis">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={maturityProfile}
              margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="range" />
              <YAxis />
              <Tooltip formatter={(value) => `${value}M`} />
              <Legend />
              <Bar dataKey="assets" name="Assets" fill={colors.cobalt} />
              <Bar dataKey="liabilities" name="Liabilities" fill={colors.lightGreen} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>
    </div>
  );
};

// Market Risk Tab
const MarketRiskTab = () => {
  return (
    <div className="space-y-4">
      <div>
        <MetricCard 
          title="Value at Risk (95%)" 
          value="$4.2M" 
          change="-0.5%" 
          icon={<ShieldAlert className="h-5 w-5" />}
          isPositive={true} 
        />
        <MetricCard 
          title="Interest Rate Sensitivity" 
          value="$48M/100bps" 
          change="+2.1%" 
          icon={<ArrowUpDown className="h-5 w-5" />}
          isPositive={false} 
        />
        <MetricCard 
          title="FX Risk Exposure" 
          value="$12.4M" 
          change="-1.2%" 
          icon={<BarChart3 className="h-5 w-5" />}
          isPositive={true} 
        />
      </div>

      <ChartCard title="Interest Rate Risk Impact">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={interestRateRiskData}
              margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => `${value}M`} />
              <Bar dataKey="impact" fill={(data) => data.impact > 0 ? colors.lightGreen : colors.lightRed} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-3 p-3 bg-yellow-50 rounded-lg">
          <div className="flex items-center">
            <AlertTriangle className="h-4 w-4 text-yellow-500 mr-2" />
            <h3 className="text-xs font-medium text-yellow-800">High Sensitivity</h3>
          </div>
          <p className="text-xs text-yellow-700 mt-1">100bps rate increase: -$48M impact</p>
        </div>
      </ChartCard>

      <ChartCard title="Yield Curve Shift Analysis">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={yieldCurveData}
              margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="term" />
              <YAxis domain={[3, 5]} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="current" name="Current" stroke={colors.cobalt} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="previous" name="Previous Week" stroke={colors.lightGreen} strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>
    </div>
  );
};

// Stress Test Tab
const StressTestTab = () => {
  return (
    <div className="space-y-4">
      <ChartCard title="Interest Rate Stress Test">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={[
                { scenario: 'Baseline', impact: 0 },
                { scenario: '+100 bps', impact: -24 },
                { scenario: '+250 bps', impact: -62 },
                { scenario: '+500 bps', impact: -135 },
                { scenario: 'Flattening', impact: -38 },
                { scenario: 'Steepening', impact: -15 },
              ]}
              margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
              layout="vertical"
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[-150, 20]} />
              <YAxis dataKey="scenario" type="category" width={55} />
              <Tooltip formatter={(value) => `${Math.abs(value)}M impact`} />
              <Legend />
              <Bar dataKey="impact" name="P&L Impact ($M)" fill={(data) => 
                data.impact < -100 ? '#ef4444' : 
                data.impact < -50 ? '#f97316' : 
                data.impact < -20 ? '#facc15' : 
                '#84cc16'
              } />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      <ChartCard title="Comprehensive Stress Test Results">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Scenario
                </th>
                <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Capital Impact
                </th>
                <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Capital Ratio
                </th>
                <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
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
                { scenario: 'Combined Severe', capitalImpact: -145, liquidityImpact: -68, ratio: 11.8, status: 'Warning' },
              ].map((row, idx) => (
                <tr key={idx} className={row.status === 'Warning' ? 'bg-yellow-50' : ''}>
                  <td className="px-2 py-2 whitespace-nowrap text-xs font-medium text-gray-900">
                    {row.scenario}
                  </td>
                  <td className="px-2 py-2 whitespace-nowrap text-xs text-gray-500">
                    {row.capitalImpact === 0 ? '-' : `${Math.abs(row.capitalImpact)}M`}
                  </td>
                  <td className="px-2 py-2 whitespace-nowrap text-xs text-gray-500">
                    {row.ratio}%
                  </td>
                  <td className="px-2 py-2 whitespace-nowrap">
                    <span className={`px-1.5 inline-flex text-xs leading-5 font-semibold rounded-full ${
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
        <div className="mt-3 p-3 bg-yellow-50 rounded-lg">
          <div className="flex items-center">
            <AlertTriangle className="h-4 w-4 text-yellow-500 mr-2" />
            <h3 className="text-xs font-medium text-yellow-800">Finding</h3>
          </div>
          <p className="text-xs text-yellow-700 mt-1">The "Combined Severe" scenario shows vulnerability with multiple risk factors. Capital ratio would drop to 11.8%, below our internal target of 12%.</p>
        </div>
      </ChartCard>
    </div>
  );
};

// Treasury Tab
const TreasuryTab = () => {
  return (
    <div className="space-y-4">
      <div>
        <MetricCard 
          title="Treasury Assets" 
          value="$450M" 
          change="+4.2%" 
          icon={<Wallet className="h-5 w-5" />}
          isPositive={true} 
        />
        <MetricCard 
          title="Average Yield" 
          value="4.92%" 
          change="+0.15%" 
          icon={<ArrowUpDown className="h-5 w-5" />}
          isPositive={true} 
        />
        <MetricCard 
          title="Arbitrage Opportunities" 
          value="5" 
          change="+2" 
          icon={<BarChart3 className="h-5 w-5" />}
          isPositive={true} 
        />
      </div>

      <ChartCard title="Treasury Arbitrage Opportunities">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Platform
                </th>
                <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Yield
                </th>
                <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Spread
                </th>
                <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {treasuryArbitrageData.map((row, idx) => (
                <tr key={idx} className={idx === 2 ? 'bg-green-50' : ''}>
                  <td className="px-2 py-2 whitespace-nowrap text-xs font-medium text-gray-900">
                    {row.platform}
                    {idx === 2 && <span className="ml-1 inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Best</span>}
                  </td>
                  <td className="px-2 py-2 whitespace-nowrap text-xs text-gray-500">
                    {row.yield}%
                  </td>
                  <td className="px-2 py-2 whitespace-nowrap text-xs text-gray-500">
                    +{row.spread}%
                  </td>
                  <td className="px-2 py-2 whitespace-nowrap text-xs text-gray-500">
                    <button className={`inline-flex items-center px-2 py-1 border text-xs leading-4 font-medium rounded-md ${
                      idx === 2 
                        ? 'bg-blue-700 text-white border-transparent' 
                        : 'bg-white text-gray-700 border-gray-300'
                    }`}>
                      {idx === 2 ? 'Execute' : 'View'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <ShieldAlert className="h-4 w-4 text-green-400" />
              </div>
              <div className="ml-2">
                <h3 className="text-xs font-medium text-green-800">AI Trade Recommendation</h3>
                <div className="mt-2 text-xs text-green-700">
                  <p>Move $20M from Franklin Templeton to Maple Finance for an estimated gain of $0.36M over 30 days.</p>
                  <div className="mt-3 flex space-x-2">
                    <button className="inline-flex items-center px-2 py-1 border border-transparent text-xs leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700">
                      Execute
                    </button>
                    <button className="inline-flex items-center px-2 py-1 border border-gray-300 text-xs leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                      Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ChartCard>

      <ChartCard title="Treasury Yield Curve">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={yieldCurveData}
              margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="term" />
              <YAxis domain={[3, 5]} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="current" name="Current" stroke={colors.cobalt} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="previous" name="Previous Week" stroke={colors.lightGreen} strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>
    </div>
  );
};

// Main Mobile Dashboard Component
const MobileRiskDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Fixed Mobile Header */}
      <header className="py-3 px-4 flex justify-between items-center fixed top-0 left-0 right-0 z-10 bg-gray-900 shadow">
        <div className="flex items-center">
          <button 
            className="mr-3"
            onClick={() => setIsNavOpen(true)}
          >
            <Menu className="h-6 w-6 text-white" />
          </button>
          <div className="flex items-center">
            <Landmark className="h-5 w-5 mr-2 text-yellow-300" />
            <h1 className="text-lg font-bold text-white">ROCA Risk Dashboard</h1>
          </div>
        </div>
        <div className="px-2 py-1 rounded-full text-xs font-medium bg-green-900 bg-opacity-20 text-green-300">
          All Systems Normal
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <MobileNavDrawer 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpen={isNavOpen}
        setIsOpen={setIsNavOpen}
      />

      {/* Main Content with padding for fixed header */}
      <main className="px-4 pt-16 pb-4">
        <div className="py-2">
          <div className="text-xs text-gray-500 flex justify-between">
            <span>Last updated: March 10, 2025 • 11:42 AM</span>
            <span className="font-medium text-blue-700">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </span>
          </div>
        </div>
        
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'portfolio' && <PortfolioTab />}
        {activeTab === 'liquidity' && <LiquidityTab />}
        {activeTab === 'market' && <MarketRiskTab />}
        {activeTab === 'treasury' && <TreasuryTab />}
        {activeTab === 'stress' && <StressTestTab />}
      </main>
    </div>
  );
};

export default MobileRiskDashboard;
