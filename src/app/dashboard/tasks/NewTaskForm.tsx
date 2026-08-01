"use client"

import { PlusIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { createTask } from "./actions"

function TaskFormFields() {
  return (
    <>
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
    </>
  )
}

export function NewTaskForm() {
  return (
    <>
      {/* PC表示：常時表示のフォーム */}
      <form
        action={createTask}
        className="hidden max-w-xl space-y-3 rounded-lg border p-4 md:block"
      >
        <h2 className="font-semibold">新規登録</h2>
        <TaskFormFields />
        <Button type="submit">登録</Button>
      </form>

      {/* スマホ表示：フローティングボタン＋モーダル */}
      <div className="md:hidden">
        <Drawer>
          <DrawerTrigger
            render={
              <Button
                size="icon"
                className="fixed right-6 bottom-6 z-50 size-14 rounded-full shadow-lg"
              />
            }
          >
            <PlusIcon className="size-6" />
            <span className="sr-only">新規登録</span>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>新規登録</DrawerTitle>
              <DrawerDescription>問い合わせ・タスクを登録します</DrawerDescription>
            </DrawerHeader>
            <form action={createTask} className="space-y-3 overflow-y-auto px-4 pb-4">
              <TaskFormFields />
              <DrawerFooter className="px-0">
                <Button type="submit">登録</Button>
                <DrawerClose render={<Button variant="outline" />}>閉じる</DrawerClose>
              </DrawerFooter>
            </form>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  )
}