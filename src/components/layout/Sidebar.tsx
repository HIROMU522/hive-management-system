import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// アイコンコンポーネント
const DashboardIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
  </svg>
);

const TaskIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
  </svg>
);

const RevenueIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
  </svg>
);

const IntelligenceIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
  </svg>
);

const AccountsIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
  </svg>
);

const SettingsIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
  </svg>
);

interface SidebarProps {
  currentPath: string;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPath }) => {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { name: 'ダッシュボード', path: '/dashboard', icon: <DashboardIcon /> },
    { name: 'タスク管理', path: '/tasks', icon: <TaskIcon /> },
    { name: '収益管理', path: '/revenue', icon: <RevenueIcon /> },
    { name: 'インテリジェンス', path: '/intelligence', icon: <IntelligenceIcon /> },
    { name: 'アカウント管理', path: '/accounts', icon: <AccountsIcon /> },
    { name: '設定', path: '/settings', icon: <SettingsIcon /> },
  ];

  return (
    <aside 
      className={`bg-gray-800 text-white transition-all duration-300 ease-in-out
        ${collapsed ? 'w-16' : 'w-64'} 
        fixed h-full left-0 z-10 md:relative`}
    >
      {/* ロゴ */}
      <div className={`flex items-center ${collapsed ? 'justify-center' : 'px-6'} h-16 border-b border-gray-700`}>
        {collapsed ? (
          <div className="text-2xl font-bold text-amber-400">🐝</div>
        ) : (
          <div className="text-2xl font-bold text-amber-400">🐝 HIVE</div>
        )}
      </div>

      {/* メニュー */}
      <nav className="mt-6">
        <ul>
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link 
                href={item.path}
                className={`
                  flex items-center py-3 ${collapsed ? 'justify-center px-3' : 'px-6'} 
                  ${currentPath === item.path 
                    ? 'bg-gray-700 border-l-4 border-amber-400' 
                    : 'hover:bg-gray-700'}
                `}
              >
                <span className="text-gray-300">{item.icon}</span>
                {!collapsed && <span className="ml-3">{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* 部門セクション */}
      {!collapsed && (
        <div className="mt-8 px-6">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            部門
          </h3>
          <div className="mt-3 space-y-2">
            <Link href="/department/pulse" className="flex items-center text-sm text-gray-300 hover:text-white py-1">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              Pulse部門
            </Link>
            <Link href="/department/growth" className="flex items-center text-sm text-gray-300 hover:text-white py-1">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Growth部門
            </Link>
            <Link href="/department/tech" className="flex items-center text-sm text-gray-300 hover:text-white py-1">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
              Tech部門
            </Link>
            <Link href="/department/asset" className="flex items-center text-sm text-gray-300 hover:text-white py-1">
              <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
              Asset部門
            </Link>
          </div>
        </div>
      )}

      {/* トグルボタン */}
      <button
        className="absolute bottom-4 right-0 bg-gray-700 rounded-l-md p-1 transform translate-x-1/2"
        onClick={() => setCollapsed(!collapsed)}
      >
        <svg
          className={`w-4 h-4 text-gray-300 transition-transform ${collapsed ? 'rotate-0' : 'rotate-180'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
        </svg>
      </button>
    </aside>
  );
};

export default Sidebar;