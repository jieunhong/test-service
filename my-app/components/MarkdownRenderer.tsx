type MarkdownRendererProps = {
  content: string;
};

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  // Simple markdown parser for common elements
  const parseMarkdown = (text: string) => {
    const lines = text.split('\n');
    const elements: JSX.Element[] = [];
    let currentList: string[] = [];
    let inCodeBlock = false;
    let codeBlockLines: string[] = [];
    let codeBlockLang = '';

    const flushList = () => {
      if (currentList.length > 0) {
        elements.push(
          <ul key={`list-${elements.length}`} className="list-disc pl-6 mb-4 space-y-2">
            {currentList.map((item, i) => (
              <li key={i} dangerouslySetInnerHTML={{ __html: parseInline(item) }} />
            ))}
          </ul>
        );
        currentList = [];
      }
    };

    const flushCodeBlock = () => {
      if (codeBlockLines.length > 0) {
        elements.push(
          <pre key={`code-${elements.length}`} className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
            <code className={`language-${codeBlockLang}`}>
              {codeBlockLines.join('\n')}
            </code>
          </pre>
        );
        codeBlockLines = [];
        codeBlockLang = '';
      }
    };

    lines.forEach((line, index) => {
      // Code blocks
      if (line.startsWith('```')) {
        if (inCodeBlock) {
          flushCodeBlock();
          inCodeBlock = false;
        } else {
          flushList();
          inCodeBlock = true;
          codeBlockLang = line.slice(3).trim();
        }
        return;
      }

      if (inCodeBlock) {
        codeBlockLines.push(line);
        return;
      }

      // Headers
      if (line.startsWith('### ')) {
        flushList();
        elements.push(
          <h3 key={index} className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            {line.slice(4)}
          </h3>
        );
      } else if (line.startsWith('## ')) {
        flushList();
        elements.push(
          <h2 key={index} className="text-3xl font-bold text-gray-900 mt-8 mb-4">
            {line.slice(3)}
          </h2>
        );
      } else if (line.startsWith('# ')) {
        flushList();
        elements.push(
          <h1 key={index} className="text-4xl font-bold text-gray-900 mt-8 mb-4">
            {line.slice(2)}
          </h1>
        );
      }
      // Lists
      else if (line.match(/^[-*]\s/)) {
        currentList.push(line.slice(2));
      }
      // Numbered lists
      else if (line.match(/^\d+\.\s/)) {
        flushList();
        const match = line.match(/^\d+\.\s(.+)/);
        if (match) {
          currentList.push(match[1]);
        }
      }
      // Empty lines
      else if (line.trim() === '') {
        flushList();
      }
      // Paragraphs
      else if (line.trim()) {
        flushList();
        elements.push(
          <p
            key={index}
            className="mb-4 text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: parseInline(line) }}
          />
        );
      }
    });

    flushList();
    flushCodeBlock();

    return elements;
  };

  const parseInline = (text: string) => {
    return text
      // Bold
      .replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold">$1</strong>')
      // Italic
      .replace(/\*(.+?)\*/g, '<em class="italic">$1</em>')
      // Inline code
      .replace(/`(.+?)`/g, '<code class="bg-gray-100 text-red-600 px-2 py-1 rounded text-sm font-mono">$1</code>')
      // Links
      .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-blue-600 hover:text-blue-700 underline">$1</a>');
  };

  return <div className="markdown-content">{parseMarkdown(content)}</div>;
}
