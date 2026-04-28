import type { FileNode } from '../components/nav/FileTree';

/**
 * Builds a FileNode tree from a list of uploaded File objects.
 * Files with a `webkitRelativePath` are organised into folder nodes;
 * files without are placed at the root level.
 *
 * @param files - Array of browser File objects
 * @returns Sorted array of root-level FileNode entries
 */
export function buildFileTree(files: File[]): FileNode[] {
  const rootNodes: FileNode[] = [];
  const folderMap = new Map<string, FileNode>();

  for (const file of files) {
    const relativePath = file.webkitRelativePath || file.name;
    const parts = relativePath.split('/');

    if (parts.length === 1) {
      rootNodes.push({ name: file.name, path: relativePath, type: 'file' });
    } else {
      // Build folder hierarchy
      let currentChildren = rootNodes;
      let currentPath = '';

      for (let i = 0; i < parts.length - 1; i++) {
        currentPath = currentPath ? `${currentPath}/${parts[i]}` : parts[i];
        let folder = folderMap.get(currentPath);
        if (!folder) {
          folder = { name: parts[i], path: currentPath, type: 'folder', children: [] };
          folderMap.set(currentPath, folder);
          currentChildren.push(folder);
        }
        currentChildren = folder.children!;
      }

      currentChildren.push({ name: parts[parts.length - 1], path: relativePath, type: 'file' });
    }
  }

  return sortNodes(rootNodes);
}

function sortNodes(nodes: FileNode[]): FileNode[] {
  return nodes
    .sort((a, b) => {
      // Folders before files, then alphabetically
      if (a.type !== b.type) return a.type === 'folder' ? -1 : 1;
      return a.name.localeCompare(b.name);
    })
    .map(node => (node.children ? { ...node, children: sortNodes(node.children) } : node));
}
