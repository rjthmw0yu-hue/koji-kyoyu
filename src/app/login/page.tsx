import { login } from './actions'

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <form className="w-full max-w-sm space-y-4 rounded-lg border p-6">
        <h1 className="text-xl font-bold">ログイン</h1>
        <div className="space-y-2">
          <label htmlFor="email">メールアドレス</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full rounded border p-2"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="password">パスワード</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="w-full rounded border p-2"
          />
        </div>
        <button
          formAction={login}
          className="w-full rounded bg-black p-2 text-white"
        >
          ログイン
        </button>
      </form>
    </div>
  )
}
