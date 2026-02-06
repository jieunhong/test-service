import { Code2, ArrowLeft } from 'lucide-react';

type HeaderProps = {
  onLogoClick: () => void;
  showBackButton?: boolean;
  currentPage?: 'home' | 'about';
  onNavigate?: (page: 'home' | 'about') => void;
};

export function Header({ onLogoClick, showBackButton, currentPage = 'home', onNavigate }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={onLogoClick}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <Code2 className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-semibold text-gray-900">백엔드 개발 블로그</span>
          </button>

          <div className="flex items-center gap-6">
            {!showBackButton && onNavigate && (
              <nav className="flex items-center gap-6">
                <button
                  onClick={() => onNavigate('home')}
                  className={`text-sm font-medium transition-colors ${currentPage === 'home'
                      ? 'text-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                    }`}
                >
                  블로그
                </button>
                <button
                  onClick={() => onNavigate('about')}
                  className={`text-sm font-medium transition-colors ${currentPage === 'about'
                      ? 'text-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                    }`}
                >
                  소개
                </button>
              </nav>
            )}

            {showBackButton && (
              <button
                onClick={onLogoClick}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:inline">뒤로</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}