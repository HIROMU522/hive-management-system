import React, { useState } from 'react';
import { Card } from '@/components/ui';

// タスクのタイプ定義
interface Task {
  id: number;
  title: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in-progress' | 'completed';
  department: 'pulse' | 'growth' | 'tech' | 'asset' | 'common';
  assignee: string;
}

// モックデータ
const mockTasks: Task[] = [
  {
    id: 1,
    title: 'Pulse部門のTwitterアカウント設定',
    dueDate: '2025-04-02',
    priority: 'high',
    status: 'in-progress',
    department: 'pulse',
    assignee: '山田太郎',
  },
  {
    id: 2,
    title: 'Growth部門のYouTubeチャンネル設計',
    dueDate: '2025-04-10',
    priority: 'medium',
    status: 'pending',
    department: 'growth',
    assignee: '佐藤花子',
  },
  {
    id: 3,
    title: 'Tech部門のクライアント提案資料作成',
    dueDate: '2025-04-05',
    priority: 'high',
    status: 'completed',
    department: 'tech',
    assignee: '鈴木一郎',
  },
  {
    id: 4,
    title: '全体会議の議事録作成',
    dueDate: '2025-04-01',
    priority: 'low',
    status: 'completed',
    department: 'common',
    assignee: '高橋和子',
  },
  {
    id: 5,
    title: 'ビジネスプラン第2版の更新',
    dueDate: '2025-04-15',
    priority: 'medium',
    status: 'pending',
    department: 'common',
    assignee: '山田太郎',
  },
];

interface TaskListProps {
  tasks?: Task[];
  className?: string;
}

const TaskList: React.FC<TaskListProps> = ({ 
  tasks = mockTasks,
  className = ''
}) => {
  const [filter, setFilter] = useState<{
    status: string;
    department: string;
  }>({
    status: 'all',
    department: 'all',
  });

  // フィルタリングロジック
  const filteredTasks = tasks.filter(task => {
    const statusMatch = filter.status === 'all' || task.status === filter.status;
    const departmentMatch = filter.department === 'all' || task.department === filter.department;
    return statusMatch && departmentMatch;
  });

  // ステータスに応じたバッジの色
  const statusClasses = {
    'pending': 'bg-gray-100 text-gray-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    'completed': 'bg-green-100 text-green-800',
  };

  // 優先度に応じたバッジの色
  const priorityClasses = {
    'high': 'bg-red-100 text-red-800',
    'medium': 'bg-amber-100 text-amber-800',
    'low': 'bg-green-100 text-green-800',
  };

  // 部門に応じたバッジの色
  const departmentClasses = {
    'pulse': 'bg-blue-50 text-blue-600',
    'growth': 'bg-green-50 text-green-600',
    'tech': 'bg-purple-50 text-purple-600',
    'asset': 'bg-amber-50 text-amber-600',
    'common': 'bg-gray-50 text-gray-600',
  };

  // 日本語表記のステータス
  const statusLabels = {
    'pending': '未着手',
    'in-progress': '進行中',
    'completed': '完了',
  };

  // 日本語表記の優先度
  const priorityLabels = {
    'high': '高',
    'medium': '中',
    'low': '低',
  };

  // 日本語表記の部門
  const departmentLabels = {
    'pulse': 'Pulse部門',
    'growth': 'Growth部門',
    'tech': 'Tech部門',
    'asset': 'Asset部門',
    'common': '共通',
  };

  return (
    <Card 
      title="タスク一覧" 
      className={className}
      headerAction={
        <div className="flex space-x-2">
          <select
            className="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-amber-400"
            value={filter.status}
            onChange={e => setFilter({ ...filter, status: e.target.value })}
          >
            <option value="all">全ステータス</option>
            <option value="pending">未着手</option>
            <option value="in-progress">進行中</option>
            <option value="completed">完了</option>
          </select>
          <select
            className="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-amber-400"
            value={filter.department}
            onChange={e => setFilter({ ...filter, department: e.target.value })}
          >
            <option value="all">全部門</option>
            <option value="pulse">Pulse部門</option>
            <option value="growth">Growth部門</option>
            <option value="tech">Tech部門</option>
            <option value="asset">Asset部門</option>
            <option value="common">共通</option>
          </select>
        </div>
      }
    >
      {filteredTasks.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">タスク</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">期日</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">優先度</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ステータス</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">担当者</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">部門</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTasks.map((task) => (
                <tr key={task.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{task.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{task.dueDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${priorityClasses[task.priority]}`}>
                      {priorityLabels[task.priority]}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClasses[task.status]}`}>
                      {statusLabels[task.status]}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{task.assignee}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${departmentClasses[task.department]}`}>
                      {departmentLabels[task.department]}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="py-8 text-center text-gray-500">
          表示するタスクがありません
        </div>
      )}
    </Card>
  );
};

export default TaskList;