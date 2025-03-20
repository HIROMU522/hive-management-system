'use client';

import { useState } from 'react';
import { supabase } from '@/utils/supabase/client';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) alert(`サインアップエラー: ${error.message}`);
    else alert('サインアップ成功！ログインできます');
  };

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(`ログインエラー: ${error.message}`);
    else alert('ログイン成功！');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">認証画面（ログイン・サインアップ）</h1>

      <input
        className="mb-2 border px-4 py-2"
        type="email"
        placeholder="メールアドレス"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
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

      <button
        className="px-4 py-2 bg-green-500 text-white rounded"
        onClick={handleSignUp}
      >
        サインアップ
      </button>
    </div>
  );
}
