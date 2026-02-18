import React, { useState } from 'react';
import { CloudArrowDownIcon, RocketLaunchIcon } from '@heroicons/react/24/outline';
import { exportStaticZip } from '../../lib/export';
import { deployToGitHubPages } from '../../lib/github';
import {
  ProviderControls,
  type Provider,
  type ProviderConfig,
} from '../providers/ProviderControls';
import { deployToProvider } from '../../lib/deploy';

export type DeploymentControlsProps = {
  html: string;
  css: string;
  js: string;
  onDeploy?: (result: { success: boolean; url?: string; error?: string }) => void;
  className?: string;
};

/**
 * Render deployment controls for GitHub Pages and other providers.
 *
 * Renders provider selection, configuration UI, actions to trigger deployments, and a result panel that shows success or failure and an optional site link.
 *
 * @param html - The HTML asset content for the site to be deployed
 * @param css - The CSS asset content for the site to be deployed
 * @param js - The JavaScript asset content for the site to be deployed
 * @param onDeploy - Optional callback invoked after a deployment attempt with `{ success, url?, error? }`
 * @param className - Optional additional CSS class names applied to the root container
 * @returns A React element containing provider controls, deployment buttons, and a deployment result display
 */
export function DeploymentControls({
  html,
  css,
  js,
  onDeploy,
  className,
}: DeploymentControlsProps) {
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployResult, setDeployResult] = useState<{
    success: boolean;
    url?: string;
    error?: string;
  } | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<Provider>('github');

  const handleGitHubDeploy = async () => {
    setIsDeploying(true);
    setDeployResult(null);

    const result = await deployToGitHubPages({
      owner: 'your-username',
      repo: 'your-repo',
      branch: 'gh-pages',
      commitMessage: 'Deploy documentation site',
    });

    setDeployResult(result);
    onDeploy?.(result);
    setIsDeploying(false);
  };

  const handleProviderDeploy = async (provider: Provider, config: ProviderConfig) => {
    setIsDeploying(true);
    setDeployResult(null);

    const result = await deployToProvider(provider, config, html, css, js);

    setDeployResult(result);
    onDeploy?.(result);
    setIsDeploying(false);
  };

  return (
    <div className={`space-y-6 ${className || ''}`}>
      {/* Provider Selection */}
      <ProviderControls
        onProviderSelect={setSelectedProvider}
        onProviderConfig={config => {
          if (config.provider !== 'github') {
            handleProviderDeploy(config.provider, config);
          }
        }}
      />

      {/* GitHub Pages Deploy (when GitHub selected) */}
      {selectedProvider === 'github' && (
        <div>
          <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
            GitHub Pages
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
            className="flex items-center px-3 py-2 mt-2 text-sm font-medium text-white bg-teal-600 rounded-lg shadow-sm hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors w-full justify-center"
          >
            <RocketLaunchIcon className="w-4 h-4 mr-2" />
            {isDeploying ? 'Deploying...' : 'Deploy to GitHub Pages'}
          </button>
        </div>
      )}

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
                <RocketLaunchIcon className="w-4 h-4 mr-2 text-green-600" />
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