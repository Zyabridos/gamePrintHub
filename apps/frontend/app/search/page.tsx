export default function SearchPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Search</h2>

      <input
        type="text"
        placeholder="Search articles..."
        className="w-full border rounded-md p-3"
      />

      <p className="text-gray-600 mt-4">Search results will appear here.</p>
    </div>
  );
}
