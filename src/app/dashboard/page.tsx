'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabase/client';

import Link from 'next/link';

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
        alert('プロフィール取得エラー');
        router.push('/auth');
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
    return <div className="p-10">読み込み中...</div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* サイドバー */}
      <aside className="w-64 bg-gray-700 text-white">
        <div className="p-4 text-2xl font-bold bg-amber-400 text-gray-900">
          🐝 HIVE
        </div>
        <nav className="mt-4">
          <ul>
            <li className="p-3 hover:bg-gray-600 cursor-pointer">ダッシュボード</li>
            <li className="p-3 hover:bg-gray-600 cursor-pointer">タスク管理</li>
            <li className="p-3 hover:bg-gray-600 cursor-pointer">収益管理</li>
            <li className="p-3 hover:bg-gray-600 cursor-pointer">インテリジェンス</li>
          </ul>
        </nav>
      </aside>

      {/* メインコンテンツ */}
      <main className="flex-1 p-10">
        <header className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">ダッシュボード</h1>
          <div className="flex items-center gap-4">
            <span>{profile.user_id}</span>
            <button 
              className="bg-gray-700 text-white px-4 py-2 rounded"
              onClick={handleLogout}
            >
              ログアウト
            </button>
          </div>
        </header>

        <section className="mt-8 grid grid-cols-2 gap-6">
          {/* KPIカードの例 */}
          <div className="bg-white shadow p-6 rounded">主要KPI</div>
          <div className="bg-white shadow p-6 rounded">収益グラフ</div>
          <div className="bg-white shadow p-6 rounded">タスク一覧</div>
          <div className="bg-white shadow p-6 rounded">通知・アラート</div>
        </section>
      </main>
    </div>
  );
}
