import { useState, useMemo } from 'react';

export type FileTreeProps = {
  files: File[];
  activeFile: File | null;
  onSelect: (file: File) => void;
};

type TreeNode = {
  name: string;
  path: string;
  file?: File;
  children: Map<string, TreeNode>;
};

/**
 * Build a tree structure from a flat list of File objects.
 *
 * Files without a `webkitRelativePath` are treated as top-level items.
 */
function buildTree(files: File[]): TreeNode {
  const root: TreeNode = { name: '', path: '', children: new Map() };

  for (const file of files) {
    const relativePath = file.webkitRelativePath || file.name;
    const parts = relativePath.split('/');
    let node = root;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const isLeaf = i === parts.length - 1;
      const nodePath = parts.slice(0, i + 1).join('/');

      if (!node.children.has(part)) {
        node.children.set(part, {
          name: part,
          path: nodePath,
          file: isLeaf ? file : undefined,
          children: new Map(),
        });
      }

      const child = node.children.get(part)!;
      if (isLeaf) {
        child.file = file;
      }
      node = child;
    }
  }

  return root;
}

type TreeNodeItemProps = {
  node: TreeNode;
  activeFile: File | null;
  onSelect: (file: File) => void;
  depth: number;
};

function TreeNodeItem({ node, activeFile, onSelect, depth }: TreeNodeItemProps) {
  const [expanded, setExpanded] = useState(true);
  const isFolder = node.children.size > 0 && !node.file;
  const isActive = node.file != null && node.file === activeFile;

  const sortedChildren = useMemo(() => {
    const entries = Array.from(node.children.values());
    // Folders first, then files; alphabetical within each group
    return entries.sort((a, b) => {
      const aIsFolder = a.children.size > 0 && !a.file;
      const bIsFolder = b.children.size > 0 && !b.file;
      if (aIsFolder !== bIsFolder) return aIsFolder ? -1 : 1;
      return a.name.localeCompare(b.name);
    });
  }, [node.children]);

  const indent = depth * 12;

  if (isFolder) {
    return (
      <li>
        <button
          type="button"
          onClick={() => setExpanded(prev => !prev)}
          className="flex items-center w-full text-left px-2 py-1 rounded hover:bg-dark-800 text-dark-400 text-sm"
          style={{ paddingLeft: `${indent + 8}px` }}
          aria-expanded={expanded}
        >
          <svg
            className={`w-3 h-3 mr-1 flex-shrink-0 transition-transform ${expanded ? 'rotate-90' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <svg
            className="w-4 h-4 mr-1.5 flex-shrink-0 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
          </svg>
          <span className="truncate">{node.name}</span>
        </button>
        {expanded && (
          <ul>
            {sortedChildren.map(child => (
              <TreeNodeItem
                key={child.path}
                node={child}
                activeFile={activeFile}
                onSelect={onSelect}
                depth={depth + 1}
              />
            ))}
          </ul>
        )}
      </li>
    );
  }

  if (node.file) {
    return (
      <li>
        <button
          type="button"
          onClick={() => onSelect(node.file!)}
          className={`flex items-center w-full text-left px-2 py-1.5 rounded text-sm transition-colors ${
            isActive
              ? 'bg-teal-500/20 text-teal-400'
              : 'hover:bg-dark-800 text-dark-400 hover:text-dark-200'
          }`}
          style={{ paddingLeft: `${indent + 8}px` }}
          aria-current={isActive ? 'page' : undefined}
        >
          <svg
            className={`w-4 h-4 mr-1.5 flex-shrink-0 ${isActive ? 'text-teal-400' : 'text-dark-500'}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <span className="truncate">{node.name}</span>
        </button>
      </li>
    );
  }

  return null;
}

/**
 * Render a collapsible file tree sidebar for navigating uploaded Markdown files.
 *
 * Files are organised into a hierarchy based on their `webkitRelativePath`; files uploaded
 * individually (without a relative path) appear as top-level items. Clicking a file invokes
 * the `onSelect` callback and the active file is highlighted.
 *
 * @param files - List of uploaded File objects
 * @param activeFile - Currently selected file, or null if none
 * @param onSelect - Callback invoked when the user selects a file
 * @returns A React element rendering the file tree
 */
export function FileTree({ files, activeFile, onSelect }: FileTreeProps) {
  const tree = useMemo(() => buildTree(files), [files]);

  const rootChildren = useMemo(() => {
    const entries = Array.from(tree.children.values());
    return entries.sort((a, b) => {
      const aIsFolder = a.children.size > 0 && !a.file;
      const bIsFolder = b.children.size > 0 && !b.file;
      if (aIsFolder !== bIsFolder) return aIsFolder ? -1 : 1;
      return a.name.localeCompare(b.name);
    });
  }, [tree.children]);

  if (files.length === 0) {
    return (
      <div className="px-4 py-6 text-center text-dark-500 text-sm">
        <svg
          className="w-8 h-8 mx-auto mb-2 text-dark-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
          />
        </svg>
        <p>No files uploaded</p>
      </div>
    );
  }

  return (
    <nav aria-label="File tree">
      <ul className="space-y-0.5">
        {rootChildren.map(node => (
          <TreeNodeItem
            key={node.path}
            node={node}
            activeFile={activeFile}
            onSelect={onSelect}
            depth={0}
          />
        ))}
      </ul>
    </nav>
  );
}
