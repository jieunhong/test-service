export function Hero() {
  return (
    <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-3xl">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Backend Development<br />Insights & Tutorials
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Deep dives into system design, API development, databases, and scalable architecture.
            Written by engineers, for engineers.
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              System Design
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              API Development
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              Database Engineering
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
