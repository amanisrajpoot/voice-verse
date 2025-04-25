import Recorder from '../components/Recorder';

export default function RecordPage() {
  return (
    <main className="min-h-screen p-4 flex flex-col items-center">
      <h1 className="text-2xl font-semibold mb-6">Record your voice</h1>
      <Recorder />
      <a href="/entries" className="mt-6 text-blue-600 hover:underline">View all entries</a>
    </main>
  );
}
