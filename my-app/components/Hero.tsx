export function Hero() {
  return (
    <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-3xl">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            백엔드 개발<br />인사이트 & 튜토리얼
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            시스템 설계, API 개발, 데이터베이스, 확장 가능한 아키텍처에 대한 심층 분석.<br />
            엔지니어를 위해 엔지니어가 작성했습니다.
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              시스템 설계
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              API 개발
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              데이터베이스 엔지니어링
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
