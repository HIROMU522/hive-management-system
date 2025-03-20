// src/app/test/page.tsx
import { supabase } from '@/utils/supabase/client';

export default async function TestPage() {
  const { data, error } = await supabase.from('test').select('*');

  if (error) {
    return <div>エラー発生: {error.message}</div>;
  }

  return (
    <div>
      <h1>Supabaseデータ取得テスト</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
