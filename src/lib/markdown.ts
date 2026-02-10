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

    // Detect fenced code block
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

    // Unordered list
    if (/^[\s]*[-*+]\s/.test(line)) {
      flushPara();
      const content = escapeHtml(line.replace(/^[\s]*[-*+]\s/, ''));
      html += `<ul><li>${content}</li></ul>`;
      continue;
    }

    // Ordered list
    if (/^[\s]*\d+\.\s/.test(line)) {
      flushPara();
      const content = escapeHtml(line.replace(/^[\s]*\d+\.\s/, ''));
      html += `<ol><li>${content}</li></ol>`;
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
