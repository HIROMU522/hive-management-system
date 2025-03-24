'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabase/client';

export default function AuthPage() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    // SupabaseのusersテーブルからuserIdに紐づくemailを取得する
    const { data, error } = await supabase
      .from('profiles')  // 後で作成するprofilesテーブル
      .select('email')
      .eq('user_id', userId)
      .single();

    if (error || !data) {
      alert('ユーザーIDが存在しません');
      return;
    }

    const email = data.email;

    const { error: loginError } = await supabase.auth.signInWithPassword({ email, password });
    if (loginError) {
      alert(`ログインエラー: ${loginError.message}`);
    } else {
      alert('ログイン成功！');
      router.push('/'); // メインページ(ルート)に遷移するよう変更
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">社員専用ログイン画面</h1>

      <input
        className="mb-2 border px-4 py-2"
        type="text"
        placeholder="ユーザーID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />

      <input
        className="mb-4 border px-4 py-2"
        type="password"
        placeholder="パスワード"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        className="mb-2 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={handleLogin}
      >
        ログイン
      </button>
    </div>
  );
}