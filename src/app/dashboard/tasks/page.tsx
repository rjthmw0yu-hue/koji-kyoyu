import { createClient } from '@/lib/supabase/server'
import { createTask, updateTaskStatus } from './actions'

export default async function TasksPage() {
  const supabase = await createClient()
  const { data: tasks } = await supabase
    .from('tasks')
    .select('*')
    .order('due_date', { ascending: true, nullsFirst: false })

  return (
    <div className="space-y-8 p-6">
      <h1 className="text-2xl font-bold">問い合わせ・タスク一覧</h1>

      <form action={createTask} className="max-w-xl space-y-3 rounded-lg border p-4">
        <h2 className="font-semibold">新規登録</h2>
        <div>
          <label className="block text-sm">相手先区分</label>
          <select name="counterpart_type" required className="w-full rounded border p-2">
            <option value="契約先">契約先</option>
            <option value="営業先">営業先</option>
            <option value="業者">業者</option>
            <option value="顧問">顧問</option>
          </select>
        </div>
        <div>
          <label className="block text-sm">会社名・氏名</label>
          <input name="company_name" required className="w-full rounded border p-2" />
        </div>
        <div>
          <label className="block text-sm">内容概要</label>
          <textarea name="content" className="w-full rounded border p-2" />
        </div>
        <div>
          <label className="block text-sm">対応期限</label>
          <input type="date" name="due_date" className="w-full rounded border p-2" />
        </div>
        <div>
          <label className="block text-sm">優先度</label>
          <select name="priority" className="w-full rounded border p-2" defaultValue="中">
            <option value="高">高</option>
            <option value="中">中</option>
            <option value="低">低</option>
          </select>
        </div>
        <div>
          <label className="block text-sm">担当者</label>
          <input name="assignee" className="w-full rounded border p-2" />
        </div>
        <div>
          <label className="block text-sm">メモ・次アクション</label>
          <textarea name="notes" className="w-full rounded border p-2" />
        </div>
        <button type="submit" className="rounded bg-black px-4 py-2 text-white">
          登録
        </button>
      </form>

      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b text-left">
            <th className="p-2">相手先</th>
            <th className="p-2">会社名・氏名</th>
            <th className="p-2">内容</th>
            <th className="p-2">期限</th>
            <th className="p-2">優先度</th>
            <th className="p-2">担当</th>
            <th className="p-2">ステータス</th>
          </tr>
        </thead>
        <tbody>
          {tasks?.map((task) => (
            <tr key={task.id} className="border-b">
              <td className="p-2">{task.counterpart_type}</td>
              <td className="p-2">{task.company_name}</td>
              <td className="p-2">{task.content}</td>
              <td className="p-2">{task.due_date ?? '-'}</td>
              <td className="p-2">{task.priority}</td>
              <td className="p-2">{task.assignee ?? '-'}</td>
              <td className="p-2">
                <form action={updateTaskStatus.bind(null, task.id)} className="flex items-center gap-2">
                  <select name="status" defaultValue={task.status} className="rounded border p-1">
                    <option value="未対応">未対応</option>
                    <option value="対応中">対応中</option>
                    <option value="対応済み">対応済み</option>
                  </select>
                  <button type="submit" className="rounded border px-2 py-1 text-xs hover:bg-gray-100">
                    更新
                  </button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}