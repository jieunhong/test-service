export function TechStack() {
  const techCategories = [
    {
      category: 'Languages',
      color: 'blue',
      skills: [
        { name: 'JavaScript/TypeScript', level: 95 },
        { name: 'Python', level: 85 },
        { name: 'Go', level: 70 },
        { name: 'Java', level: 65 },
      ]
    },
    {
      category: 'Backend Frameworks',
      color: 'green',
      skills: [
        { name: 'Node.js/Express', level: 95 },
        { name: 'Fastify', level: 85 },
        { name: 'NestJS', level: 80 },
        { name: 'Django/FastAPI', level: 75 },
      ]
    },
    {
      category: 'Databases',
      color: 'purple',
      skills: [
        { name: 'PostgreSQL', level: 90 },
        { name: 'MongoDB', level: 85 },
        { name: 'Redis', level: 90 },
        { name: 'Elasticsearch', level: 70 },
      ]
    },
    {
      category: 'DevOps & Tools',
      color: 'orange',
      skills: [
        { name: 'Docker/Kubernetes', level: 85 },
        { name: 'AWS', level: 80 },
        { name: 'CI/CD (GitHub Actions)', level: 85 },
        { name: 'Nginx', level: 75 },
      ]
    },
    {
      category: 'Message Queues',
      color: 'red',
      skills: [
        { name: 'RabbitMQ', level: 80 },
        { name: 'Apache Kafka', level: 75 },
        { name: 'Redis Pub/Sub', level: 85 },
      ]
    },
    {
      category: 'Testing & Monitoring',
      color: 'indigo',
      skills: [
        { name: 'Jest/Vitest', level: 90 },
        { name: 'Prometheus/Grafana', level: 75 },
        { name: 'ELK Stack', level: 70 },
      ]
    }
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; bar: string; badge: string }> = {
      blue: { bg: 'bg-blue-50', bar: 'bg-blue-600', badge: 'bg-blue-100 text-blue-700' },
      green: { bg: 'bg-green-50', bar: 'bg-green-600', badge: 'bg-green-100 text-green-700' },
      purple: { bg: 'bg-purple-50', bar: 'bg-purple-600', badge: 'bg-purple-100 text-purple-700' },
      orange: { bg: 'bg-orange-50', bar: 'bg-orange-600', badge: 'bg-orange-100 text-orange-700' },
      red: { bg: 'bg-red-50', bar: 'bg-red-600', badge: 'bg-red-100 text-red-700' },
      indigo: { bg: 'bg-indigo-50', bar: 'bg-indigo-600', badge: 'bg-indigo-100 text-indigo-700' },
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {techCategories.map((category) => {
        const colors = getColorClasses(category.color);
        return (
          <div
            key={category.category}
            className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
          >
            <div className="mb-4">
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${colors.badge}`}>
                {category.category}
              </span>
            </div>
            
            <div className="space-y-4">
              {category.skills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                    <span className="text-xs text-gray-500">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`${colors.bar} h-2 rounded-full transition-all duration-500`}
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
