import React, { useState, useEffect } from 'react';
import { CloudIcon, ServerStackIcon } from '@heroicons/react/24/outline';

export type Provider = 'netlify' | 'vercel' | 'github';

export interface ProviderConfig {
  provider: Provider;
  apiKey?: string;
  siteId?: string;
  projectId?: string;
  domain?: string;
}

export type ProviderControlsProps = {
  onProviderSelect?: (provider: Provider) => void;
  onProviderConfig?: (config: ProviderConfig) => void;
  className?: string;
};

/**
 * UI for selecting a deployment provider (GitHub, Netlify, Vercel) and editing the selected provider's configuration.
 *
 * Persists configuration to localStorage under `docugen-provider-config` and invokes `onProviderConfig` whenever configuration changes.
 *
 * @param onProviderSelect - Optional callback invoked with the newly selected provider when the user changes providers.
 * @param onProviderConfig - Optional callback invoked with the current provider configuration whenever it is saved/updated.
 * @param className - Optional additional CSS class names applied to the component wrapper.
 * @returns The component's UI for provider selection and provider-specific configuration inputs.
 */
export function ProviderControls({
  onProviderSelect,
  onProviderConfig,
  className,
}: ProviderControlsProps) {
  const [selectedProvider, setSelectedProvider] = useState<Provider>('github');
  const [config, setConfig] = useState<ProviderConfig>({
    provider: 'github',
  });

  // Load config from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('docugen-provider-config');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setConfig(parsed);
          setSelectedProvider(parsed.provider);
        } catch {
          // Ignore invalid data
        }
      }
    }
  }, []);

  // Save config to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('docugen-provider-config', JSON.stringify(config));
    }
    onProviderConfig?.(config);
  }, [config, onProviderConfig]);

  const handleProviderChange = (provider: Provider) => {
    setSelectedProvider(provider);
    setConfig(prev => ({ ...prev, provider }));
    onProviderSelect?.(provider);
  };

  const handleApiKeyChange = (apiKey: string) => {
    setConfig(prev => ({ ...prev, apiKey }));
  };

  const handleSiteIdChange = (siteId: string) => {
    setConfig(prev => ({ ...prev, siteId }));
  };

  const handleProjectIdChange = (projectId: string) => {
    setConfig(prev => ({ ...prev, projectId }));
  };

  const handleDomainChange = (domain: string) => {
    setConfig(prev => ({ ...prev, domain }));
  };

  return (
    <div className={`space-y-6 ${className || ''}`}>
      {/* Provider Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Deploy to
        </label>
        <div className="grid grid-cols-3 gap-3">
          {/* GitHub Pages */}
          <button
            onClick={() => handleProviderChange('github')}
            className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all ${
              selectedProvider === 'github'
                ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
            }`}
          >
            <svg className="w-8 h-8 mb-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <span className="text-xs font-medium">GitHub</span>
          </button>

          {/* Netlify */}
          <button
            onClick={() => handleProviderChange('netlify')}
            className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all ${
              selectedProvider === 'netlify'
                ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
            }`}
          >
            <CloudIcon className="w-8 h-8 mb-2 text-teal-600" />
            <span className="text-xs font-medium">Netlify</span>
          </button>

          {/* Vercel */}
          <button
            onClick={() => handleProviderChange('vercel')}
            className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all ${
              selectedProvider === 'vercel'
                ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
            }`}
          >
            <ServerStackIcon className="w-8 h-8 mb-2 text-gray-900 dark:text-white" />
            <span className="text-xs font-medium">Vercel</span>
          </button>
        </div>
      </div>

      {/* Provider-specific configuration */}
      <div className="space-y-4">
        {selectedProvider === 'netlify' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                API Key
              </label>
              <input
                type="password"
                value={config.apiKey || ''}
                onChange={e => handleApiKeyChange(e.target.value)}
                placeholder="netlify_api_key_xxxx"
                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Site ID (optional)
              </label>
              <input
                type="text"
                value={config.siteId || ''}
                onChange={e => handleSiteIdChange(e.target.value)}
                placeholder="my-netlify-site"
                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Custom Domain (optional)
              </label>
              <input
                type="text"
                value={config.domain || ''}
                onChange={e => handleDomainChange(e.target.value)}
                placeholder="docs.example.com"
                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
              />
            </div>
          </>
        )}

        {selectedProvider === 'vercel' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Vercel Token
              </label>
              <input
                type="password"
                value={config.apiKey || ''}
                onChange={e => handleApiKeyChange(e.target.value)}
                placeholder="vercel_token_xxxx"
                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Project ID
              </label>
              <input
                type="text"
                value={config.projectId || ''}
                onChange={e => handleProjectIdChange(e.target.value)}
                placeholder="prj_xxxx"
                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Custom Domain (optional)
              </label>
              <input
                type="text"
                value={config.domain || ''}
                onChange={e => handleDomainChange(e.target.value)}
                placeholder="docs.example.com"
                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
              />
            </div>
          </>
        )}

        {selectedProvider === 'github' && (
          <div className="text-sm text-gray-500 dark:text-gray-400">
            GitHub Pages deployment configured. See GitHub Pages section above.
          </div>
        )}
      </div>
    </div>
  );
}