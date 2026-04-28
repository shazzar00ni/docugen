import { useState, useCallback } from 'react';

export type FileNode = {
  name: string;
  path: string;
  type: 'file' | 'folder';
  children?: FileNode[];
};

type FileTreeNodeProps = {
  node: FileNode;
  depth: number;
  selectedPath: string | null;
  onSelect: (path: string) => void;
};

function FileTreeNode({ node, depth, selectedPath, onSelect }: FileTreeNodeProps) {
  const [expanded, setExpanded] = useState(true);
  const isSelected = node.path === selectedPath;
  const indent = depth * 12;

  const handleClick = useCallback(() => {
    if (node.type === 'folder') {
      setExpanded(prev => !prev);
    } else {
      onSelect(node.path);
    }
  }, [node.path, node.type, onSelect]);

  return (
    <li>
      <button
        type="button"
        onClick={handleClick}
        style={{ paddingLeft: `${indent + 8}px` }}
        className={`w-full flex items-center gap-2 py-1.5 pr-3 text-sm rounded-md text-left transition-colors
          ${
            isSelected
              ? 'bg-teal-600/20 text-teal-400'
              : 'text-dark-300 hover:bg-dark-800 hover:text-dark-100'
          }`}
        aria-current={isSelected ? 'page' : undefined}
      >
        {node.type === 'folder' ? (
          <svg
            className={`w-4 h-4 flex-shrink-0 transition-transform ${expanded ? 'rotate-90' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        ) : (
          <svg
            className="w-4 h-4 flex-shrink-0 text-dark-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        )}
        <span className="truncate">{node.name}</span>
      </button>
      {node.type === 'folder' && expanded && node.children && (
        <ul>
          {node.children.map(child => (
            <FileTreeNode
              key={child.path}
              node={child}
              depth={depth + 1}
              selectedPath={selectedPath}
              onSelect={onSelect}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

export type FileTreeProps = {
  nodes: FileNode[];
  selectedPath: string | null;
  onSelect: (path: string) => void;
};

/**
 * Renders a collapsible file tree sidebar for navigating uploaded documentation files.
 *
 * @param nodes - Tree of file/folder nodes to display
 * @param selectedPath - Currently selected file path
 * @param onSelect - Callback when a file node is selected
 */
export function FileTree({ nodes, selectedPath, onSelect }: FileTreeProps) {
  if (nodes.length === 0) {
    return <div className="p-4 text-sm text-dark-500 text-center">No files uploaded yet.</div>;
  }

  return (
    <nav aria-label="File navigation">
      <ul className="space-y-0.5 py-2">
        {nodes.map(node => (
          <FileTreeNode
            key={node.path}
            node={node}
            depth={0}
            selectedPath={selectedPath}
            onSelect={onSelect}
          />
        ))}
      </ul>
    </nav>
  );
}
