export function parseMarkdown(md: string): string {
  const escapeHtml = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  const lines = md.split(/\r?\n/);
  let html = '';
  let para: string[] = [];
  let inCodeBlock = false;
  let codeBlockLines: string[] = [];

  const flushPara = () => {
    if (para.length) {
      html += `<p>${escapeHtml(para.join(' '))}</p>`;
      para = [];
    }
  };

  const flushCodeBlock = () => {
    if (inCodeBlock && codeBlockLines.length) {
      html += `<pre><code>${escapeHtml(codeBlockLines.join('\n'))}</code></pre>`;
      codeBlockLines = [];
      inCodeBlock = false;
    }
  };

  for (const line of lines) {
    const trimmed = line.trim();

    // Detect fenced code block start/end
    if (trimmed === '```') {
      if (!inCodeBlock) {
        flushPara();
        inCodeBlock = true;
      } else {
        flushCodeBlock();
      }
      continue;
    }

    // Inside a code block: collect lines
    if (inCodeBlock) {
      codeBlockLines.push(line);
      continue;
    }

    // Indented code block (4+ spaces)
    if (/^ {4,}/.test(line)) {
      flushPara();
      if (!inCodeBlock) {
        inCodeBlock = true;
        codeBlockLines = [line.slice(4)];
        continue;
      }
    }

    // Inline code within paragraphs
    // Simple approach: split on ` and process segments
    const inlineCodeSegments = line.split(/(`.+?`)/);
    const processedLine = inlineCodeSegments
      .map(seg => {
        if (seg.startsWith('`') && seg.endsWith('`')) {
          return `<code>${escapeHtml(seg.slice(1, -1))}</code>`;
        }
        // Autolink detection
        const urlMatch = seg.match(/(https?:\/\/[^\s]+)/g);
        if (urlMatch) {
          let replaced = seg;
          for (const url of urlMatch) {
            replaced = replaced.replace(
              url,
              `<a href="${url}" target="_blank" rel="noopener noreferrer">${escapeHtml(url)}</a>`
            );
          }
          return replaced;
        }
        return escapeHtml(seg);
      })
      .join('');
    // If there was inline code or links, treat as its own paragraph fragment
    if (processedLine !== escapeHtml(line) || line.includes('`') || line.match(/https?:\/\//)) {
      para.push(processedLine);
      continue;
    }

    // Unordered list
    if (/^[\s]*[-*+]\s/.test(line)) {
      flushPara();
      const content = line.replace(/^[\s]*[-*+]\s/, '');
      html += `<ul><li>${escapeHtml(content)}</li></ul>`;
      continue;
    }

    // Ordered list
    if (/^[\s]*\d+\.\s/.test(line)) {
      flushPara();
      const content = line.replace(/^[\s]*\d+\.\s/, '');
      html += `<ol><li>${escapeHtml(content)}</li></ol>`;
      continue;
    }

    // Headings
    const heading = line.match(/^(#{1,6})\s+(.*)$/);
    if (heading) {
      flushPara();
      const level = heading[1].length;
      const text = escapeHtml(heading[2]);
      html += `<h${level}>${text}</h${level}>`;
      continue;
    }

    // Blank line: end paragraph
    if (trimmed === '') {
      flushPara();
      continue;
    }

    // Normal line: start or continue paragraph
    para.push(line);
  }

  flushPara();
  flushCodeBlock();
  return html;
}
