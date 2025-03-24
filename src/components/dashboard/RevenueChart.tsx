import React, { useState } from 'react';
import { Card } from '@/components/ui';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// モックデータ
const mockData = [
  { month: '1月', pulse: 12000, growth: 4000, tech: 8000, asset: 0 },
  { month: '2月', pulse: 13500, growth: 5200, tech: 9300, asset: 0 },
  { month: '3月', pulse: 15800, growth: 7500, tech: 11000, asset: 1000 },
  { month: '4月', pulse: 14200, growth: 8700, tech: 14500, asset: 1500 },
  { month: '5月', pulse: 16500, growth: 10800, tech: 18000, asset: 2000 },
  { month: '6月', pulse: 19000, growth: 12500, tech: 16500, asset: 2500 },
];

interface RevenueChartProps {
  data?: any[];
  className?: string;
}

const RevenueChart: React.FC<RevenueChartProps> = ({ 
  data = mockData, 
  className = ''
}) => {
  const [chartType, setChartType] = useState<'line' | 'bar'>('line');

  // 部門ごとの色の設定
  const colors = {
    pulse: '#3B82F6', // blue
    growth: '#10B981', // green
    tech: '#8B5CF6', // purple
    asset: '#F59E0B', // amber
  };

  // 合計値を計算
  const calculateTotalRevenue = () => {
    return data.reduce((acc, month) => {
      const monthTotal = Object.keys(month)
        .filter(key => key !== 'month')
        .reduce((sum, key) => sum + month[key], 0);
      return acc + monthTotal;
    }, 0);
  };

  const formatYenValue = (value: number) => {
    return `¥${value.toLocaleString()}`;
  };

  return (
    <Card 
      title="収益推移" 
      subtitle={`総収益: ${formatYenValue(calculateTotalRevenue())}`}
      className={className}
      headerAction={
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setChartType('line')}
            className={`px-3 py-1 rounded text-xs font-medium ${
              chartType === 'line' 
                ? 'bg-amber-100 text-amber-800' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            折れ線
          </button>
          <button
            onClick={() => setChartType('bar')}
            className={`px-3 py-1 rounded text-xs font-medium ${
              chartType === 'bar' 
                ? 'bg-amber-100 text-amber-800' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            棒グラフ
          </button>
        </div>
      }
    >
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'line' ? (
            <LineChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={formatYenValue} />
              <Tooltip formatter={(value) => formatYenValue(value as number)} />
              <Legend />
              <Line type="monotone" dataKey="pulse" stroke={colors.pulse} name="Pulse部門" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="growth" stroke={colors.growth} name="Growth部門" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="tech" stroke={colors.tech} name="Tech部門" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="asset" stroke={colors.asset} name="Asset部門" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          ) : (
            <BarChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={formatYenValue} />
              <Tooltip formatter={(value) => formatYenValue(value as number)} />
              <Legend />
              <Bar dataKey="pulse" fill={colors.pulse} name="Pulse部門" />
              <Bar dataKey="growth" fill={colors.growth} name="Growth部門" />
              <Bar dataKey="tech" fill={colors.tech} name="Tech部門" />
              <Bar dataKey="asset" fill={colors.asset} name="Asset部門" />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default RevenueChart;