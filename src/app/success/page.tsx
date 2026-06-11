export default function SuccessPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white">
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-bold text-green-400">
          Payment Successful 🚀
        </h1>
        <p className="text-white/60">
          Welcome to Altivora AI. Your account is now active.
        </p>

        <a
          href="/admin"
          className="inline-block rounded bg-violet-600 px-4 py-2"
        >
          Go to Dashboard
        </a>
      </div>
    </div>
  );
}