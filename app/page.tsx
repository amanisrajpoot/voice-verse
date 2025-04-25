export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-700 text-white">
      <div className="w-full max-w-md mx-auto p-6 rounded-2xl shadow-xl backdrop-blur-md bg-white/5 border border-white/10 animate-fadeIn">
        {/* Content like Recorder goes here */}
        <Recorder />
      </div>
    </main>
  );
}
