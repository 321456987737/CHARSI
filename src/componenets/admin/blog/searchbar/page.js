import { AdminSearch } from "@/componenets/admin/blog/actiononblogs/page";

export default function AdminDashboard() {
  return (
    <div className="  p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Content Manager</h1>
          <p className="text-gray-500 mt-2">Search and manage your blog posts</p>
        </header>

        {/* Search Section */}
        <section className="mb-12">
          <div className="bg-white rounded-2xl shadow-xs p-6 border border-gray-200">
            <AdminSearch />
          </div>
        </section>
      </div>
    </div>
  );
}