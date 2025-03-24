'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/utils/supabase/client';

import { Sidebar, Header } from '@/components/layout';
import { StatCard, RevenueChart, NotificationPanel } from '@/components/dashboard';

// アカウント情報の型定義
interface PulseAccount {
  id: number;
  name: string;
  username: string;
  accountId: string;
  platform: 'twitter' | 'tiktok' | 'instagram' | 'other';
  category: string;
  followers: number;
  followersChange: number;
  lastPosted: string;
  engagement: number;
  engagementChange: number;
  status: 'good' | 'warning' | 'danger' | 'suspended';
}

export default function PulseDepartmentPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('month');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // モック: Pulseアカウントデータ
  const pulseAccounts: PulseAccount[] = [
    {
      id: 1,
      name: 'アダルトメイン',
      username: '@adult_content',
      accountId: 'a0003.hive',
      platform: 'twitter',
      category: 'adult',
      followers: 1245,
      followersChange: 12,
      lastPosted: '2時間前',
      engagement: 4.2,
      engagementChange: 0.3,
      status: 'good',
    },
    {
      id: 2,
      name: '漫画・同人系',
      username: '@manga_lover',
      accountId: 'a0010.hive',
      platform: 'twitter',
      category: 'manga',
      followers: 864,
      followersChange: 5,
      lastPosted: '5時間前',
      engagement: 3.7,
      engagementChange: -0.2,
      status: 'good',
    },
    {
      id: 3,
      name: 'ネカマアカウント',
      username: '@yu_yume__',
      accountId: 'a0005.hive',
      platform: 'twitter',
      category: 'nekama',
      followers: 723,
      followersChange: -3,
      lastPosted: '1日前',
      engagement: 2.9,
      engagementChange: -0.5,
      status: 'warning',
    },
    {
      id: 4,
      name: 'TikTok誘導',
      username: '@tnk_airport',
      accountId: 'a0004.hive',
      platform: 'tiktok',
      category: 'adult',
      followers: 456,
      followersChange: 21,
      lastPosted: '4時間前',
      engagement: 7.8,
      engagementChange: 1.2,
      status: 'good',
    },
    {
      id: 5,
      name: '海外向け',
      username: '@overseas_adult',
      accountId: 'a0020.hive',
      platform: 'twitter',
      category: 'adult',
      followers: 312,
      followersChange: 8,
      lastPosted: '12時間前',
      engagement: 3.1,
      engagementChange: 0.1,
      status: 'good',
    }
  ];

  useEffect(() => {
    const fetchUserProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
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

  // アカウントのフィルタリング
  const filteredAccounts = selectedCategory === 'all' 
    ? pulseAccounts 
    : pulseAccounts.filter(account => account.category === selectedCategory);

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

  const ConversionIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  );

  const EngagementIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  );

  // Pulse部門のカテゴリー
  const pulseCategories = [
    { value: 'all', label: '全体' },
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

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* サイドバー */}
      <Sidebar currentPath="/department/pulse" />

      {/* メインコンテンツエリア */}
      <div className="flex-1 flex flex-col">
        <Header 
          profile={profile} 
          title="Pulse部門" 
        />

        {/* メインコンテンツ */}
        <main className="flex-1 p-6">
          {/* ヘッダー情報 */}
          <div className="mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-800 flex items-center">
                  <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                  Pulse部門
                </h1>
                <p className="text-sm text-gray-600 mt-1">アダルトアフィリエイト・収益化部門</p>
              </div>
              <div className="mt-4 md:mt-0 space-x-2">
                <Link href="/department/pulse/create" className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  新規アカウント作成
                </Link>
                <Link href="/department/pulse/strategy" className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  戦略・計画
                </Link>
              </div>
            </div>
          </div>

          {/* フィルターコントロール */}
          <div className="flex flex-wrap gap-2 mb-6">
            {pulseCategories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                  ${selectedCategory === cat.value 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-100'}`}
              >
                {cat.icon && <span className="mr-1">{cat.icon}</span>}
                {cat.label}
              </button>
            ))}

            <div className="ml-auto flex gap-2">
              {timeRangeOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setTimeRange(option.value)}
                  className={`px-3 py-1 rounded text-xs font-medium transition-colors
                    ${timeRange === option.value 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* KPIカード セクション */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <StatCard
              title="総フォロワー数"
              value={pulseAccounts.reduce((sum, acc) => sum + acc.followers, 0).toLocaleString()}
              change={{ 
                value: "+2.8%", 
                isPositive: true 
              }}
              icon={<UsersIcon />}
              footer={`目標: 5,000 (${Math.round(pulseAccounts.reduce((sum, acc) => sum + acc.followers, 0) / 5000 * 100)}%達成)`}
              color="blue"
            />
            <StatCard
              title="月間収益"
              value="¥32,500"
              change={{ 
                value: "12.4%", 
                isPositive: true 
              }}
              icon={<RevenueIcon />}
              footer="目標達成率: 65%"
              color="green"
            />
            <StatCard
              title="平均エンゲージメント"
              value={`${(pulseAccounts.reduce((sum, acc) => sum + acc.engagement, 0) / pulseAccounts.length).toFixed(1)}%`}
              change={{ 
                value: "+0.3%", 
                isPositive: true 
              }}
              icon={<EngagementIcon />}
              footer="業界平均: 3.2%"
              color="purple"
            />
            <StatCard
              title="コンバージョン率"
              value="2.8%"
              change={{ 
                value: "0.2%", 
                isPositive: false 
              }}
              icon={<ConversionIcon />}
              footer="前月比: -7%"
              color="amber"
            />
          </div>

          {/* チャートセクション */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* 収益チャート - 2カラム幅 */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200">
              <RevenueChart />
            </div>
            
            {/* 通知パネル - 1カラム幅 */}
            <div>
              <NotificationPanel />
            </div>
          </div>

          {/* アカウント一覧テーブル */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-800">アカウント一覧</h2>
              <div className="flex space-x-2">
                <select 
                  className="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="followers">フォロワー順</option>
                  <option value="engagement">エンゲージメント順</option>
                  <option value="revenue">収益順</option>
                  <option value="status">ステータス順</option>
                </select>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">アカウント</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">種別</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">フォロワー</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">直近投稿</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">エンゲージメント</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状態</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">アクション</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredAccounts.map((account) => (
                    <tr key={account.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                            {account.platform === 'twitter' ? 'X' : account.platform === 'tiktok' ? 'T' : 'I'}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{account.username}</div>
                            <div className="text-xs text-gray-500">{account.accountId}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-sm text-gray-900">
                            {account.category === 'adult' && '🔞 アダルト系'}
                            {account.category === 'manga' && '📚 漫画・同人系'}
                            {account.category === 'nekama' && '👤 ネカマ系'}
                            {account.category === 'fortune' && '🔮 占い系'}
                            {account.category === 'selfdev' && '📈 自己啓発系'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{account.followers.toLocaleString()}</div>
                        <div className={`text-xs ${account.followersChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {account.followersChange >= 0 ? '+' : ''}{account.followersChange} (24h)
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{account.lastPosted}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{account.engagement}%</div>
                        <div className={`text-xs ${account.engagementChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {account.engagementChange >= 0 ? '+' : ''}{account.engagementChange}%
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                          ${account.status === 'good' ? 'bg-green-100 text-green-800' : 
                            account.status === 'warning' ? 'bg-yellow-100 text-yellow-800' : 
                            account.status === 'danger' ? 'bg-red-100 text-red-800' : 
                            'bg-gray-100 text-gray-800'}`}
                        >
                          {account.status === 'good' ? '良好' : 
                           account.status === 'warning' ? '注意' : 
                           account.status === 'danger' ? '危険' : 
                           account.status === 'suspended' ? '停止中' : ''}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <Link href={`/department/pulse/account/${account.id}`} className="text-blue-600 hover:text-blue-900 mr-3">
                          詳細
                        </Link>
                        <Link href={`/department/pulse/account/${account.id}/edit`} className="text-gray-600 hover:text-gray-900">
                          編集
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pulse部門ロードマップ */}
          <div className="mt-6 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-lg font-medium text-gray-800 mb-4">部門ロードマップ</h2>
            
            <div className="relative pb-4">
              {/* 縦の線 */}
              <div className="absolute inset-0 flex justify-center">
                <div className="w-px h-full bg-blue-200"></div>
              </div>
              
              {/* マイルストーン */}
              <div className="relative flex flex-col space-y-8">
                <div className="relative flex items-center">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white z-10">1</div>
                  <div className="ml-4 bg-blue-50 p-3 rounded-lg border border-blue-100 flex-grow">
                    <h3 className="text-sm font-semibold text-blue-800">フォロワー1,000人達成</h3>
                    <p className="text-xs text-blue-600 mt-1">初期段階の信頼性確立とリーチ向上</p>
                    <div className="mt-2 h-2 bg-blue-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: '80%' }}></div>
                    </div>
                  </div>
                </div>
                
                <div className="relative flex items-center">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center text-blue-700 z-10">2</div>
                  <div className="ml-4 bg-white p-3 rounded-lg border border-gray-200 flex-grow">
                    <h3 className="text-sm font-semibold text-gray-800">月間収益3万円達成</h3>
                    <p className="text-xs text-gray-600 mt-1">アフィリエイトリンクの最適化とCTR向上</p>
                    <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                </div>
                
                <div className="relative flex items-center">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 z-10">3</div>
                  <div className="ml-4 bg-white p-3 rounded-lg border border-gray-200 flex-grow">
                    <h3 className="text-sm font-semibold text-gray-800">ニッチ特化アカウント追加</h3>
                    <p className="text-xs text-gray-600 mt-1">漫画・同人系アカウントの拡充</p>
                    <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: '35%' }}></div>
                    </div>
                  </div>
                </div>
                
                <div className="relative flex items-center">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 z-10">4</div>
                  <div className="ml-4 bg-white p-3 rounded-lg border border-gray-200 flex-grow">
                    <h3 className="text-sm font-semibold text-gray-800">月間収益5万円達成</h3>
                    <p className="text-xs text-gray-600 mt-1">副業から個人事業主への移行準備</p>
                    <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: '20%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}