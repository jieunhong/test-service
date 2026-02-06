import { User, Briefcase, Code, Award, Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { TechStack } from './TechStack';
import { Timeline } from './Timeline';

export function About() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Profile Section */}
      <section className="mb-16">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 md:p-12">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-shrink-0">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                <User className="w-16 h-16 text-white" />
              </div>
            </div>

            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                백엔드 개발자
              </h1>
              <p className="text-xl text-gray-700 mb-6">
                확장 가능한 시스템 설계와 효율적인 API 개발에 열정을 가진 백엔드 개발자입니다.
                대규모 트래픽을 처리하는 서비스 설계 및 최적화에 집중하고 있습니다.
              </p>

              <div className="flex flex-wrap gap-4 mb-6 text-gray-600">
                <span className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Seoul, South Korea
                </span>
                <span className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  5년 이상의 경력
                </span>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <Github className="w-5 h-5" />
                  GitHub
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                  LinkedIn
                </a>
                <a
                  href="mailto:contact@example.com"
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  Email
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Me */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <User className="w-8 h-8 text-blue-600" />
          자기 소개
        </h2>
        <div className="bg-white border border-gray-200 rounded-xl p-8">
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="mb-4">
              안녕하세요! 백엔드 개발자로서 견고하고 확장 가능한 시스템을 설계하고 구축하는 일에 큰 보람을 느낍니다.
              특히 대규모 트래픽 처리, 데이터베이스 최적화, 마이크로서비스 아키텍처 설계에 관심이 많습니다.
            </p>
            <p className="mb-4">
              실무에서는 Node.js와 Python을 주로 사용하며, RESTful API 설계부터 데이터베이스 스키마 설계,
              캐싱 전략 수립, CI/CD 파이프라인 구축까지 백엔드 개발의 전 과정을 경험했습니다.
            </p>
            <p>
              기술 블로그를 통해 제가 배운 내용과 문제 해결 경험을 공유하고,
              개발 커뮤니티와 함께 성장하는 것을 즐깁니다.
            </p>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <Code className="w-8 h-8 text-blue-600" />
          기술 스택
        </h2>
        <TechStack />
      </section>

      {/* Career Timeline */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <Briefcase className="w-8 h-8 text-blue-600" />
          경력 타임라인
        </h2>
        <Timeline />
      </section>

      {/* Achievements */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <Award className="w-8 h-8 text-blue-600" />
          수상 및 자격증
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Award className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">AWS Certified Solutions Architect</h3>
                <p className="text-gray-600 text-sm mb-2">Amazon Web Services</p>
                <p className="text-gray-500 text-sm">2025</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Award className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">최우수 퍼포먼스 상</h3>
                <p className="text-gray-600 text-sm mb-2">데이터베이스 최적화 프로젝트</p>
                <p className="text-gray-500 text-sm">2024</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Award className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">오픈 소스 기여자</h3>
                <p className="text-gray-600 text-sm mb-2">Express.js, Fastify</p>
                <p className="text-gray-500 text-sm">2023 - Present</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">기술 블로그 어워드</h3>
                <p className="text-gray-600 text-sm mb-2">최우수 기술 문서 작성</p>
                <p className="text-gray-500 text-sm">2023</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
