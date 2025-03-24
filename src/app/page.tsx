'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabase/client';

import { Sidebar, Header } from '@/components/layout';
import { 
  StatCard, 
  RevenueChart, 
  TaskList, 
  NotificationPanel 
} from '@/components/dashboard';

export default function DashboardPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* サイドバー */}
      <Sidebar currentPath="/dashboard" />

      {/* メインコンテンツエリア */}
      <div className="flex-1 flex flex-col">
        <Header 
          profile={profile} 
          title="ダッシュボード" 
        />

        {/* メインコンテンツ */}
        <main className="flex-1 p-6">
          {/* KPIカード セクション */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <StatCard
              title="フォロワー合計"
              value="2,845"
              change={{ value: "12%", isPositive: true }}
              icon={<UsersIcon />}
              footer="先月比: +321"
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
              <RevenueChart />
            </div>
            
            {/* 通知パネル - 1カラム幅 */}
            <div>
              <NotificationPanel />
            </div>
            
            {/* タスクリスト - フル幅 */}
            <div className="lg:col-span-3 mt-6">
              <TaskList />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}