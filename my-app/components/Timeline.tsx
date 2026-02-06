import { Building2, Calendar } from 'lucide-react';

type TimelineItem = {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string;
  achievements: string[];
  color: 'blue' | 'green' | 'purple' | 'orange';
};

export function Timeline() {
  const timelineData: TimelineItem[] = [
    {
      id: '1',
      title: '시니어 백엔드 엔지니어',
      company: 'Tech Corp',
      period: '2024 - 현재',
      description: '대규모 e-커머스 플랫폼의 백엔드 아키텍처 설계 및 구현을 담당',
      achievements: [
        '마이크로서비스 아키텍처로 전환하여 시스템 확장성 200% 향상',
        '데이터베이스 쿼리 최적화로 응답 시간 60% 단축',
        'Redis 캐싱 전략 도입으로 서버 부하 40% 감소',
        '주니어 개발자 3명 멘토링',
      ],
      color: 'blue',
    },
    {
      id: '2',
      title: '백엔드 엔지니어',
      company: 'StartUp Inc',
      period: '2022 - 2024',
      description: '핀테크 스타트업에서 결제 시스템 및 API 개발',
      achievements: [
        'RESTful API 설계 및 개발 (일 100만+ 트랜잭션 처리)',
        'AWS 기반 인프라 구축 및 CI/CD 파이프라인 구성',
        'PostgreSQL 데이터베이스 설계 및 최적화',
        '보안 취약점 개선으로 PCI DSS 인증 획득',
      ],
      color: 'green',
    },
    {
      id: '3',
      title: '주니어 백엔드 개발자',
      company: 'Digital Agency',
      period: '2020 - 2022',
      description: '다양한 클라이언트 프로젝트의 백엔드 개발 담당',
      achievements: [
        'Node.js와 Express를 활용한 10+ 프로젝트 완수',
        'MongoDB 및 MySQL 데이터베이스 설계 및 관리',
        'Docker를 활용한 개발 환경 표준화',
        '코드 리뷰 프로세스 도입으로 코드 품질 향상',
      ],
      color: 'purple',
    },
    {
      id: '4',
      title: '컴퓨터 공학 학사',
      company: 'University',
      period: '2016 - 2020',
      description: '컴퓨터 공학 학사 학위 취득',
      achievements: [
        '자료구조 및 알고리즘 과목 우수상',
        '데이터베이스 설계 프로젝트 최우수상',
        '졸업 프로젝트: 실시간 채팅 애플리케이션 개발',
      ],
      color: 'orange',
    },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { dot: string; line: string; badge: string }> = {
      blue: {
        dot: 'bg-blue-600 ring-blue-100',
        line: 'bg-blue-200',
        badge: 'bg-blue-100 text-blue-700'
      },
      green: {
        dot: 'bg-green-600 ring-green-100',
        line: 'bg-green-200',
        badge: 'bg-green-100 text-green-700'
      },
      purple: {
        dot: 'bg-purple-600 ring-purple-100',
        line: 'bg-purple-200',
        badge: 'bg-purple-100 text-purple-700'
      },
      orange: {
        dot: 'bg-orange-600 ring-orange-100',
        line: 'bg-orange-200',
        badge: 'bg-orange-100 text-orange-700'
      },
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="relative">
      {timelineData.map((item, index) => {
        const colors = getColorClasses(item.color);
        const isLast = index === timelineData.length - 1;

        return (
          <div key={item.id} className="relative pb-12">
            {/* Connecting Line */}
            {!isLast && (
              <div className={`absolute left-4 top-10 w-0.5 h-full ${colors.line}`}></div>
            )}

            {/* Timeline Item */}
            <div className="flex gap-6">
              {/* Dot */}
              <div className="relative flex-shrink-0">
                <div className={`w-8 h-8 rounded-full ${colors.dot} ring-4 flex items-center justify-center`}>
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{item.title}</h3>
                    <div className="flex flex-wrap items-center gap-3 text-gray-600 mb-2">
                      <span className="flex items-center gap-1">
                        <Building2 className="w-4 h-4" />
                        {item.company}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {item.period}
                      </span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${colors.badge}`}>
                    {item.period.split(' - ')[0]}
                  </span>
                </div>

                <p className="text-gray-700 mb-4">{item.description}</p>

                <div className="space-y-2">
                  <p className="text-sm font-semibold text-gray-900">주요 성과:</p>
                  <ul className="space-y-1">
                    {item.achievements.map((achievement, i) => (
                      <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full ${colors.dot.split(' ')[0]} mt-1.5 flex-shrink-0`}></span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
