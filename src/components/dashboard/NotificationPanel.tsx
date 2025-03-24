import React, { useState } from 'react';
import { Card } from '@/components/ui';

interface Notification {
  id: number;
  title: string;
  content: string;
  time: string;
  isRead: boolean;
  type: 'info' | 'warning' | 'success' | 'error';
}

// モックデータ
const mockNotifications: Notification[] = [
  {
    id: 1,
    title: 'タスク期限間近',
    content: 'タスク「Pulse部門のTwitterアカウント設定」の期限が明日までです。',
    time: '10分前',
    isRead: false,
    type: 'warning',
  },
  {
    id: 2,
    title: '目標達成',
    content: 'Pulse部門の月間フォロワー増加目標を達成しました。おめでとうございます！',
    time: '1時間前',
    isRead: false,
    type: 'success',
  },
  {
    id: 3,
    title: '新しいメンバー',
    content: '鈴木一郎さんがTech部門に参加しました。',
    time: '昨日',
    isRead: true,
    type: 'info',
  },
  {
    id: 4,
    title: 'システムメンテナンス',
    content: '明日午前2時から4時までシステムメンテナンスを実施します。',
    time: '2日前',
    isRead: true,
    type: 'info',
  },
  {
    id: 5,
    title: '収益レポート',
    content: '3月の収益レポートが公開されました。確認してください。',
    time: '3日前',
    isRead: true,
    type: 'info',
  },
];

interface NotificationPanelProps {
  notifications?: Notification[];
  className?: string;
  maxItems?: number;
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({
  notifications = mockNotifications,
  className = '',
  maxItems = 5,
}) => {
  const [showAll, setShowAll] = useState(false);
  const [readAll, setReadAll] = useState(false);

  // すべて既読に設定する関数
  const handleReadAll = () => {
    setReadAll(true);
  };

  // 表示数の制御
  const displayedNotifications = showAll ? notifications : notifications.slice(0, maxItems);

  // タイプに応じたアイコンと色の設定
  const getTypeIcon = (type: Notification['type']) => {
    switch (type) {
      case 'info':
        return (
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
      case 'warning':
        return (
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-100 text-amber-500 flex items-center justify-center">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        );
      case 'success':
        return (
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 text-green-500 flex items-center justify-center">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
      case 'error':
        return (
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-100 text-red-500 flex items-center justify-center">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Card
      title="通知"
      className={className}
      headerAction={
        <button
          onClick={handleReadAll}
          className="text-xs text-amber-500 hover:text-amber-600 transition-colors"
        >
          すべて既読にする
        </button>
      }
    >
      <div className="space-y-4">
        {displayedNotifications.length > 0 ? (
          <>
            {displayedNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`flex space-x-3 ${
                  !notification.isRead && !readAll ? 'bg-gray-50 p-2 -mx-2 rounded' : ''
                }`}
              >
                {getTypeIcon(notification.type)}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">
                    {notification.title}
                    {!notification.isRead && !readAll && (
                      <span className="ml-2 inline-block h-2 w-2 rounded-full bg-amber-400"></span>
                    )}
                  </p>
                  <p className="text-sm text-gray-500">{notification.content}</p>
                  <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                </div>
              </div>
            ))}
            
            {notifications.length > maxItems && (
              <div className="text-center pt-2">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="text-sm text-amber-500 hover:text-amber-600 transition-colors"
                >
                  {showAll ? '一部のみ表示' : `さらに${notifications.length - maxItems}件表示`}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="py-10 text-center text-gray-500">
            通知はありません
          </div>
        )}
      </div>
    </Card>
  );
};

export default NotificationPanel;