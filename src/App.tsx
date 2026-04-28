import { DocLayout } from './components/upload/DocLayout';

/**
 * Root application component.
 *
 * Renders the DocuGen documentation viewer, which manages file uploads,
 * file tree navigation, and Markdown rendering in a full-page layout.
 *
 * @returns The root JSX element
 */
export function App() {
  return <DocLayout />;
}

export default App;
