import React from 'react';
import { CloudArrowDownIcon, BookOpenIcon, RocketLaunchIcon } from '@heroicons/react/24/outline';
import { exportStaticZip } from '../../lib/export';
import { deployToGitHubPages, type GitHubDeployConfig } from '../../lib/github';

export type ExportControlsProps = {
  html: string;
  css: string;
  js: string;
  className?: string;
};

/**
 * Render controls for exporting the provided HTML, CSS, and JS as a downloadable ZIP file.
 *
 * @param html - The page HTML to include in the exported ZIP
 * @param css - The stylesheet content to include in the exported ZIP
 * @param js - The JavaScript content to include in the exported ZIP
 * @param className - Optional additional CSS classes for the wrapper element
 * @returns The React element containing the export button and related UI
 */
export function ExportControls({ html, css, js, className }: ExportControlsProps) {
  const [isExporting, setIsExporting] = React.useState(false);

  const handleExportZip = async () => {
    setIsExporting(true);
    try {
      const blob = await exportStaticZip(html, css, js);
      // Create download link
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'documentation.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className={`flex flex-wrap gap-2 ${className || ''}`}>
      <button
        onClick={handleExportZip}
        disabled={isExporting}
        className="flex items-center px-3 py-2 text-sm font-medium text-white bg-teal-600 rounded-lg shadow-sm hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <CloudArrowDownIcon className="w-4 h-4 mr-2" />
        {isExporting ? 'Exporting...' : 'Export ZIP'}
      </button>
    </div>
  );
}

export type DeploymentControlsProps = {
  html: string;
  css: string;
  js: string;
  onDeploy?: (result: { success: boolean; url?: string; error?: string }) => void;
  className?: string;
};

/**
 * Render controls that deploy the provided HTML/CSS/JS to GitHub Pages and show deployment status.
 *
 * The component manages deploy state, invokes an internal GitHub Pages deployment flow, and displays
 * a success or error result with an optional link to the deployed site.
 *
 * @param onDeploy - Optional callback invoked with the deployment result `{ success: boolean; url?: string; error?: string }` after a deploy attempt.
 * @param className - Optional container CSS class name to apply to the root element.
 * @returns The React element containing deployment inputs, a deploy action button, and a result panel.
 */
export function DeploymentControls({
  html,
  css,
  js,
  onDeploy,
  className,
}: DeploymentControlsProps) {
  const [isDeploying, setIsDeploying] = React.useState(false);
  const [deployResult, setDeployResult] = React.useState<{
    success: boolean;
    url?: string;
    error?: string;
  } | null>(null);

  const handleGitHubDeploy = async () => {
    setIsDeploying(true);
    setDeployResult(null);

    const config: GitHubDeployConfig = {
      owner: 'your-username', // In real app, load from user settings
      repo: 'your-repo',
      branch: 'gh-pages',
      commitMessage: 'Deploy documentation site',
    };

    const result = await deployToGitHubPages(config);
    setDeployResult(result);
    onDeploy?.(result);
    setIsDeploying(false);
  };

  return (
    <div className={`space-y-3 ${className || ''}`}>
      {/* GitHub Pages Deploy */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          Deploy to GitHub Pages
        </h3>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="username"
            defaultValue="your-username"
            className="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
          />
          <input
            type="text"
            placeholder="repository"
            defaultValue="your-repo"
            className="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
          />
        </div>
        <button
          onClick={handleGitHubDeploy}
          disabled={isDeploying}
          className="flex items-center px-3 py-2 text-sm font-medium text-white bg-teal-600 rounded-lg shadow-sm hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <RocketLaunchIcon className="w-4 h-4 mr-2" />
          {isDeploying ? 'Deploying...' : 'Deploy to GitHub Pages'}
        </button>
      </div>

      {/* Deployment Result */}
      {deployResult && (
        <div
          className={`p-3 rounded-md ${
            deployResult.success
              ? 'bg-green-50 text-green-800 border border-green-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          <div className="flex items-center">
            {deployResult.success ? (
              <>
                <BookOpenIcon className="w-4 h-4 mr-2 text-green-600" />
                <span className="text-sm">Deployed successfully!</span>
              </>
            ) : (
              <>
                <RocketLaunchIcon className="w-4 h-4 mr-2 text-red-600" />
                <span className="text-sm">Deployment failed: {deployResult.error}</span>
              </>
            )}
          </div>
          {deployResult.url && (
            <a
              href={deployResult.url}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 text-teal-600 hover:text-teal-700 text-sm underline"
            >
              View Site
            </a>
          )}
        </div>
      )}
    </div>
  );
}