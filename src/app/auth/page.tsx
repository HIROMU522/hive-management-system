'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabase/client';

export default function AuthPage() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!userId || !password) {
      alert('ユーザーIDとパスワードを入力してください');
      return;
    }

    setIsLoading(true);

    // SupabaseのusersテーブルからuserIdに紐づくemailを取得する
    const { data, error } = await supabase
      .from('profiles')  // 後で作成するprofilesテーブル
      .select('email')
      .eq('user_id', userId)
      .single();

    if (error || !data) {
      alert('ユーザーIDが存在しません');
      setIsLoading(false);
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
    
    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <div className="flex justify-center text-amber-400 text-4xl mb-2">🐝</div>
          <h1 className="text-2xl font-bold text-gray-800">HIVE</h1>
          <p className="mt-2 text-gray-600">社内管理システム</p>
        </div>
        
        <div className="mt-8">
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="userId" className="block text-sm font-medium text-gray-700 mb-1">
                ユーザーID
              </label>
              <input
                id="userId"
                name="userId"
                type="text"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 
                          placeholder-gray-500 text-gray-900 rounded-md focus:outline-none 
                          focus:ring-amber-500 focus:border-amber-500 focus:z-10 sm:text-sm"
                placeholder="例: a0001.hive"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                パスワード
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 
                          placeholder-gray-500 text-gray-900 rounded-md focus:outline-none 
                          focus:ring-amber-500 focus:border-amber-500 focus:z-10 sm:text-sm"
                placeholder="パスワードを入力"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-6">
            <button
              type="button"
              onClick={handleLogin}
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent 
                        text-sm font-medium rounded-md text-gray-800 bg-amber-400 hover:bg-amber-500 
                        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 
                        disabled:opacity-50 transition-colors duration-200"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  ログイン中...
                </span>
              ) : (
                'ログイン'
              )}
            </button>
          </div>
        </div>
        
        <div className="mt-6 text-center text-sm">
          <p className="text-gray-600">
            ログインできない場合は管理者にお問い合わせください
          </p>
        </div>
        
        <div className="pt-4 mt-6 border-t border-gray-200 text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} HIVE. All rights reserved.
        </div>
      </div>
    </div>
  );
}