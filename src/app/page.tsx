'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/utils/supabase/client';

import { Sidebar, Header } from '@/components/layout';
import { 
  StatCard, 
  RevenueChart, 
  TaskList, 
  NotificationPanel 
} from '@/components/dashboard';

// 有効な色の型を定義
type CardColor = 'blue' | 'green' | 'purple' | 'amber' | 'red';

export default function DashboardPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeDepartment, setActiveDepartment] = useState('all');
  const [timeRange, setTimeRange] = useState('month');

  useEffect(() => {
    const fetchUserProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        // 未認証の場合は /auth にリダイレクト
        router.push('/auth');
        return;
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (error || !data) {
        console.error('プロフィール取得エラー:', error);
        setLoading(false);
        return;
      }

      setProfile(data);
      setLoading(false);
    };

    fetchUserProfile();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/auth');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-400 mx-auto"></div>
          <p className="mt-4 text-gray-600">読み込み中...</p>
        </div>
      </div>
    );
  }

  // KPIカードのアイコン
  const UsersIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  );

  const RevenueIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

  const TaskIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
    </svg>
  );

  const ConversionIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  );

  // 部門フィルターオプション
  const departmentOptions = [
    { value: 'all', label: '全体' },
    { value: 'pulse', label: 'Pulse部門', color: 'bg-blue-500' },
    { value: 'growth', label: 'Growth部門', color: 'bg-green-500' },
    { value: 'tech', label: 'Tech部門', color: 'bg-purple-500' },
    { value: 'asset', label: 'Asset部門', color: 'bg-amber-500' },
  ];

  // Pulse部門（アフィリエイト）のサブカテゴリー
  const pulseSubcategories = [
    { value: 'adult', label: 'アダルト系', icon: '🔞' },
    { value: 'manga', label: '漫画・同人系', icon: '📚' },
    { value: 'nekama', label: 'ネカマ系', icon: '👤' },
    { value: 'fortune', label: '占い系', icon: '🔮' },
    { value: 'selfdev', label: '自己啓発系', icon: '📈' },
  ];

  // 期間フィルターオプション
  const timeRangeOptions = [
    { value: 'week', label: '直近1週間' },
    { value: 'month', label: '直近1ヶ月' },
    { value: 'quarter', label: '直近3ヶ月' },
    { value: 'year', label: '直近1年' },
  ];

  // 部門カラーの取得関数（型を明示的に定義）
  const getDepartmentColor = (dept: string): CardColor => {
    if (dept === 'pulse') return 'blue';
    if (dept === 'growth') return 'green';
    if (dept === 'tech') return 'purple';
    if (dept === 'asset') return 'amber';
    return 'blue'; // デフォルト値
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* サイドバー */}
      <Sidebar currentPath="/" />

      {/* メインコンテンツエリア */}
      <div className="flex-1 flex flex-col">
        <Header 
          profile={profile} 
          title="ダッシュボード" 
        />

        {/* メインコンテンツ */}
        <main className="flex-1 p-6">
          {/* フィルターコントロール */}
          <div className="flex flex-wrap gap-2 mb-6">
            {departmentOptions.map((dept) => (
              <button
                key={dept.value}
                onClick={() => setActiveDepartment(dept.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                  ${activeDepartment === dept.value 
                    ? 'bg-gray-800 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-100'}`}
              >
                {dept.value !== 'all' && (
                  <span className={`inline-block w-2 h-2 rounded-full ${dept.color} mr-2`}></span>
                )}
                {dept.label}
              </button>
            ))}

            <div className="ml-auto flex gap-2">
              {timeRangeOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setTimeRange(option.value)}
                  className={`px-3 py-1 rounded text-xs font-medium transition-colors
                    ${timeRange === option.value 
                      ? 'bg-amber-100 text-amber-800' 
                      : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Pulse部門を選択しているときのみサブカテゴリーを表示 */}
          {activeDepartment === 'pulse' && (
            <div className="mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-sm font-semibold text-gray-800 mb-3">Pulse部門（アフィリエイト）</h2>
              <div className="flex flex-wrap gap-2">
                {pulseSubcategories.map((subcat) => (
                  <Link 
                    key={subcat.value}
                    href={`/department/pulse/${subcat.value}`}
                    className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs 
                              hover:bg-blue-100 transition-colors"
                  >
                    <span className="mr-1">{subcat.icon}</span>
                    {subcat.label}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* KPIカード セクション */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <StatCard
              title="フォロワー合計"
              value="2,845"
              change={{ value: "12%", isPositive: true }}
              icon={<UsersIcon />}
              footer={`${activeDepartment === 'all' ? '全体' : departmentOptions.find(d => d.value === activeDepartment)?.label}: +321人`}
              color="blue"
            />
            <StatCard
              title="月間収益"
              value="¥82,500"
              change={{ value: "8.5%", isPositive: true }}
              icon={<RevenueIcon />}
              footer="目標達成率: 82.5%"
              color="green"
            />
            <StatCard
              title="タスク完了率"
              value="78%"
              change={{ value: "5%", isPositive: true }}
              icon={<TaskIcon />}
              footer="残タスク: 12件"
              color="amber"
            />
            <StatCard
              title="コンバージョン率"
              value="3.2%"
              change={{ value: "0.5%", isPositive: false }}
              icon={<ConversionIcon />}
              footer="業界平均: 2.8%"
              color="purple"
            />
          </div>

          {/* グラフとリストセクション */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 収益チャート - 2カラム幅 */}
            <div className="lg:col-span-2">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium text-gray-800">収益推移</h2>
                  <div className="flex space-x-2">
                    <select 
                      className="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    >
                      <option value="revenue">収益</option>
                      <option value="followers">フォロワー</option>
                      <option value="engagement">エンゲージメント</option>
                      <option value="conversion">コンバージョン</option>
                    </select>
                  </div>
                </div>
                
                <RevenueChart />
                
                {activeDepartment !== 'all' && (
                  <div className="mt-4 text-center">
                    <Link 
                      href={`/department/${activeDepartment}/analytics`} 
                      className="text-sm text-amber-500 hover:text-amber-600 font-medium"
                    >
                      {departmentOptions.find(d => d.value === activeDepartment)?.label}の詳細分析を表示 →
                    </Link>
                  </div>
                )}
              </div>
            </div>
            
            {/* 通知パネル - 1カラム幅 */}
            <div>
              <NotificationPanel />
            </div>
            
            {/* タスクリスト - フル幅 */}
            <div className="lg:col-span-3 mt-6">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium text-gray-800">優先タスク</h2>
                  <Link 
                    href="/tasks" 
                    className="text-sm text-amber-500 hover:text-amber-600 font-medium"
                  >
                    すべてのタスクを表示 →
                  </Link>
                </div>
                <TaskList />
              </div>
            </div>
          </div>

          {/* 最近のアカウント活動 */}
          {activeDepartment === 'pulse' && (
            <div className="mt-6 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-gray-800">最近のアカウント活動</h2>
                <Link 
                  href="/accounts" 
                  className="text-sm text-amber-500 hover:text-amber-600 font-medium"
                >
                  すべてのアカウントを表示 →
                </Link>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">アカウント</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">部門</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">フォロワー</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">直近投稿</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">エンゲージメント</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状態</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">X</div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">@adult_content</div>
                            <div className="text-xs text-gray-500">a0003.hive</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
                          <span className="text-sm text-gray-900">Pulse (アダルト)</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">1,245</div>
                        <div className="text-xs text-green-600">+12 (24h)</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2時間前</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">4.2%</div>
                        <div className="text-xs text-green-600">+0.3%</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          良好
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-500">X</div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">@manga_lover</div>
                            <div className="text-xs text-gray-500">a0010.hive</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
                          <span className="text-sm text-gray-900">Pulse (漫画)</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">864</div>
                        <div className="text-xs text-green-600">+5 (24h)</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">5時間前</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">3.7%</div>
                        <div className="text-xs text-red-600">-0.2%</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          良好
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}