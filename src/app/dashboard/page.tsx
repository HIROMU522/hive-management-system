'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabase/client';

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
    <div className="p-10">
      <h1 className="text-3xl font-bold">HIVE管理システム ダッシュボード</h1>
      <div className="mt-4">
        <p><strong>ユーザーID:</strong> {profile.user_id}</p>
        <p><strong>メールアドレス:</strong> {profile.email}</p>
      </div>
      <button 
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
        onClick={handleLogout}
      >
        ログアウト
      </button>
    </div>
  );
}
