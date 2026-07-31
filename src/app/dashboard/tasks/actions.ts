'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export async function createTask(formData: FormData) {
  const supabase = await createClient()

  const { error } = await supabase.from('tasks').insert({
    counterpart_type: formData.get('counterpart_type') as string,
    company_name: formData.get('company_name') as string,
    content: formData.get('content') as string,
    due_date: formData.get('due_date') || null,
    priority: formData.get('priority') as string,
    assignee: formData.get('assignee') as string,
    notes: formData.get('notes') as string,
  })

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/dashboard/tasks')
}

export async function updateTaskStatus(id: string, formData: FormData) {
  const status = formData.get('status') as string
  const supabase = await createClient()

  await supabase
    .from('tasks')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', id)

  revalidatePath('/dashboard/tasks')
}