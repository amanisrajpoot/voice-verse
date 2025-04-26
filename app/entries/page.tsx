import Timeline from '../components/Timeline';

export default function EntriesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-6">
      <h1 className="text-3xl font-bold text-center text-emerald-300 mb-10">Your Voice Timeline</h1>
      <div className="max-w-2xl mx-auto">
      <Timeline />
      <div className="text-center mt-10">
        <a href="/" className="text-blue-400 hover:underline">
          ← Back to Home
        </a>
      </div>
      </div>
    </main>
  );
}