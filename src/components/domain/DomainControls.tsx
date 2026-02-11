import React, { useState, useEffect } from 'react';
import { GlobeAltIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

export type DomainConfig = {
  domain: string;
  subdomain: string;
  sslEnabled: boolean;
  lastVerified?: string;
};

export type DomainControlsProps = {
  onDomainUpdate?: (config: DomainConfig) => void;
  onSSLRequest?: (domain: string) => void;
  className?: string;
};

export function DomainControls({ onDomainUpdate, onSSLRequest, className }: DomainControlsProps) {
  const [config, setConfig] = useState<DomainConfig>({
    domain: '',
    subdomain: '',
    sslEnabled: false,
  });

  const [isCheckingSSL, setIsCheckingSSL] = useState(false);
  const [sslStatus, setSslStatus] = useState<'checking' | 'valid' | 'invalid' | null>(null);

  // Load domain config from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('docugen-domain-config');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setConfig(parsed);
        } catch {
          // Ignore invalid data
        }
      }
    }
  }, []);

  // Save domain config to localStorage when it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('docugen-domain-config', JSON.stringify(config));
    }
    onDomainUpdate?.(config);
  }, [config, onDomainUpdate]);

  const handleSSLCheck = async () => {
    if (!config.domain) return;

    setIsCheckingSSL(true);
    setSslStatus('checking');

    try {
      // Simulate SSL certificate check
      // In a real app, this would call an API
      const response = await new Promise<{ valid: boolean; error?: string }>(resolve => {
        setTimeout(() => {
          // Simple simulation: check if domain starts with https://
          const isValid = config.domain.startsWith('https://');
          resolve({ valid: isValid, error: isValid ? undefined : 'SSL certificate required' });
        }, 2000);
      });

      if (response.valid) {
        setConfig(prev => ({ ...prev, sslEnabled: true, lastVerified: new Date().toISOString() }));
        setSslStatus('valid');
      } else {
        setConfig(prev => ({ ...prev, sslEnabled: false }));
        setSslStatus('invalid');
      }
    } catch (error) {
      setSslStatus('invalid');
    } finally {
      setIsCheckingSSL(false);
    }
  };

  const handleDomainChange = (field: keyof DomainConfig, value: string) => {
    setConfig(prev => ({ ...prev, [field]: value }));
  };

  const handleSSLRequest = () => {
    if (config.domain && onSSLRequest) {
      onSSLRequest(config.domain);
    }
  };

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 space-y-6 ${className || ''}`}
    >
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">Custom Domain</h3>

      {/* Domain Configuration */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Domain Name
          </label>
          <div className="flex space-x-2">
            <input
              type="text"
              value={config.domain}
              onChange={e => handleDomainChange('domain', e.target.value)}
              placeholder="https://docs.example.com"
              className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
            />
            <input
              type="text"
              value={config.subdomain}
              onChange={e => handleDomainChange('subdomain', e.target.value)}
              placeholder="docs"
              className="w-24 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
            />
          </div>
          {config.domain && (
            <a
              href={`https://${config.domain}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-3 py-2 text-sm text-teal-600 hover:text-teal-700 rounded-md border border-teal-600"
            >
              <GlobeAltIcon className="w-4 h-4 mr-2" />
              Test
            </a>
          )}
        </div>

        {/* SSL Status */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              SSL Certificate
            </label>
            <div className="flex items-center space-x-2">
              <div className={`text-sm ${config.sslEnabled ? 'text-green-600' : 'text-gray-500'}`}>
                {config.sslEnabled ? (
                  <>
                    <ShieldCheckIcon className="w-4 h-4 inline mr-1" />
                    Verified
                  </>
                ) : (
                  'Not Verified'
                )}
              </div>
              {!config.sslEnabled && config.domain && (
                <button
                  onClick={handleSSLRequest}
                  className="text-teal-600 hover:text-teal-700 text-sm font-medium"
                >
                  Request SSL
                </button>
              )}
            </div>
          </div>

          {/* SSL Status Messages */}
          {isCheckingSSL && (
            <div className="text-sm text-blue-600">Checking SSL certificate...</div>
          )}

          {sslStatus === 'valid' && (
            <div className="text-sm text-green-600">SSL certificate is valid and active</div>
          )}

          {sslStatus === 'invalid' && (
            <div className="text-sm text-red-600">
              SSL certificate could not be verified. Please check your domain configuration.
            </div>
          )}
        </div>

        {/* Last Verification */}
        {config.lastVerified && (
          <div className="text-xs text-gray-500 mt-2">
            Last verified: {new Date(config.lastVerified).toLocaleString()}
          </div>
        )}
      </div>
    </div>
  );
}
