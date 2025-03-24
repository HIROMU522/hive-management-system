import React from 'react';
import { Card } from '@/components/ui';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: {
    value: string | number;
    isPositive: boolean;
  };
  icon?: React.ReactNode;
  footer?: string;
  className?: string;
  color?: 'blue' | 'green' | 'amber' | 'purple' | 'red';
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  icon,
  footer,
  className = '',
  color = 'blue'
}) => {
  // カラーマッピング
  const colorClasses = {
    blue: 'text-blue-600 bg-blue-100',
    green: 'text-green-600 bg-green-100',
    amber: 'text-amber-600 bg-amber-100',
    purple: 'text-purple-600 bg-purple-100',
    red: 'text-red-600 bg-red-100',
  };

  // 変化率のカラー
  const changeColorClass = change?.isPositive ? 'text-green-600' : 'text-red-600';

  return (
    <Card className={className}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <div className="mt-2 flex items-baseline">
            <span className="text-2xl font-bold text-gray-900">{value}</span>
            {change && (
              <span className={`ml-2 text-sm font-medium ${changeColorClass} flex items-center`}>
                {change.isPositive ? (
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                ) : (
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                )}
                {change.value}
              </span>
            )}
          </div>
        </div>
        {icon && (
          <div className={`p-2 rounded-full ${colorClasses[color]}`}>
            {icon}
          </div>
        )}
      </div>
      
      {footer && (
        <div className="mt-4 text-sm text-gray-500">
          {footer}
        </div>
      )}
    </Card>
  );
};

export default StatCard;