import { createClient } from '@/lib/supabase/server'
import { updateTaskStatus } from './actions'
import { NewTaskForm } from './NewTaskForm'

export default async function TasksPage({
  searchParams,
}: {
  searchParams: Promise<{ assignee?: string }>
}) {
  const { assignee } = await searchParams
  const supabase = await createClient()

  const { data: allTasks } = await supabase.from('tasks').select('*')

  const today = new Date().toISOString().split('T')[0]

  const summary = {
    未対応: allTasks?.filter((t) => t.status === '未対応').length ?? 0,
    対応中: allTasks?.filter((t) => t.status === '対応中').length ?? 0,
    対応済み: allTasks?.filter((t) => t.status === '対応済み').length ?? 0,
    期限超過:
      allTasks?.filter(
        (t) => t.due_date && t.due_date < today && t.status !== '対応済み'
      ).length ?? 0,
  }

  const assignees = Array.from(
    new Set(allTasks?.map((t) => t.assignee).filter(Boolean))
  )

  const filteredTasks = assignee
    ? allTasks?.filter((t) => t.assignee === assignee)
    : allTasks

  const sortedTasks = [...(filteredTasks ?? [])].sort((a, b) => {
    if (!a.due_date) return 1
    if (!b.due_date) return -1
    return a.due_date.localeCompare(b.due_date)
  })

  return (
    <div className="space-y-8 p-6">
      <h1 className="text-2xl font-bold">問い合わせ・タスク一覧</h1>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="rounded-lg border p-4">
          <p className="text-sm text-gray-500">未対応</p>
          <p className="text-2xl font-bold">{summary.未対応}</p>
        </div>
        <div className="rounded-lg border p-4">
          <p className="text-sm text-gray-500">対応中</p>
          <p className="text-2xl font-bold">{summary.対応中}</p>
        </div>
        <div className="rounded-lg border p-4">
          <p className="text-sm text-gray-500">対応済み</p>
          <p className="text-2xl font-bold">{summary.対応済み}</p>
        </div>
        <div className="rounded-lg border border-red-300 bg-red-50 p-4">
          <p className="text-sm text-red-600">期限超過</p>
          <p className="text-2xl font-bold text-red-600">{summary.期限超過}</p>
        </div>
      </div>

      <form className="flex items-center gap-2">
        <label className="text-sm">担当者で絞り込み：</label>
        <select name="assignee" defaultValue={assignee ?? ''} className="rounded border p-2">
          <option value="">すべて</option>
          {assignees.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
        <button type="submit" className="rounded border px-3 py-1 text-sm hover:bg-gray-100">
          絞り込む
        </button>
      </form>

      <NewTaskForm />

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
          {sortedTasks?.map((task) => {
            const isOverdue =
              task.due_date && task.due_date < today && task.status !== '対応済み'
            return (
              <tr key={task.id} className={`border-b ${isOverdue ? 'bg-red-50' : ''}`}>
                <td className="p-2">{task.counterpart_type}</td>
                <td className="p-2">{task.company_name}</td>
                <td className="p-2">{task.content}</td>
                <td className="p-2">
                  {task.due_date ?? '-'}
                  {isOverdue && (
                    <span className="ml-1 text-xs font-semibold text-red-600">期限超過</span>
                  )}
                </td>
                <td className="p-2">{task.priority}</td>
                <td className="p-2">{task.assignee ?? '-'}</td>
                <td className="p-2">
                  <form
                    action={updateTaskStatus.bind(null, task.id)}
                    className="flex items-center gap-2"
                  >
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
            )
          })}
        </tbody>
      </table>
    </div>
  )
}