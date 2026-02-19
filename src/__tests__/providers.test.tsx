import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DeploymentControls } from '../components/deploy/DeploymentControls';
import { ProviderControls } from '../components/providers/ProviderControls';
import { deployToProvider } from '../lib/deploy';

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
};
vi.stubGlobal('localStorage', localStorageMock);

// Mock URL.createObjectURL
const mockCreateObjectURL = vi.fn().mockImplementation(() => 'blob:mock-url');
Object.defineProperty(URL, 'createObjectURL', { value: mockCreateObjectURL });

describe('ProviderControls', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders provider selection buttons', () => {
    render(<ProviderControls />);
    expect(screen.getByText('GitHub')).toBeInTheDocument();
    expect(screen.getByText('Netlify')).toBeInTheDocument();
    expect(screen.getByText('Vercel')).toBeInTheDocument();
  });

  it('shows Netlify config when Netlify is selected', async () => {
    render(<ProviderControls />);
    const netlifyButton = screen.getByText('Netlify');
    await userEvent.click(netlifyButton);
    expect(screen.getByPlaceholderText('netlify_api_key_xxxx')).toBeInTheDocument();
  });

  it('shows Vercel config when Vercel is selected', async () => {
    render(<ProviderControls />);
    const vercelButton = screen.getByText('Vercel');
    await userEvent.click(vercelButton);
    expect(screen.getByPlaceholderText('vercel_token_xxxx')).toBeInTheDocument();
  });

  it('saves provider config to localStorage', async () => {
    render(<ProviderControls />);
    const netlifyButton = screen.getByText('Netlify');
    await userEvent.click(netlifyButton);

    const apiKeyInput = screen.getByPlaceholderText('netlify_api_key_xxxx');
    await userEvent.type(apiKeyInput, 'test-api-key');

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'docugen-provider-config',
      expect.stringContaining('"provider":"netlify"')
    );
  });
});

describe('deployToProvider', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deploys to Netlify', async () => {
    const result = await deployToProvider(
      'netlify',
      { provider: 'netlify', apiKey: 'test', siteId: 'my-site' },
      '<h1>Test</h1>',
      '',
      ''
    );
    expect(result.success).toBe(true);
    expect(result.url).toContain('my-site.netlify.app');
  });

  it('deploys to Vercel', async () => {
    const result = await deployToProvider(
      'vercel',
      { provider: 'vercel', apiKey: 'test', projectId: 'my-project' },
      '<h1>Test</h1>',
      '',
      ''
    );
    expect(result.success).toBe(true);
    expect(result.url).toContain('my-project.vercel.app');
  });

  it('deploys to GitHub Pages', async () => {
    const result = await deployToProvider(
      'github',
      { provider: 'github', siteId: 'owner', domain: 'repo' },
      '<h1>Test</h1>',
      '',
      ''
    );
    expect(result.success).toBe(true);
    expect(result.url).toContain('owner.github.io/repo');
  });
});

describe('DeploymentControls', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('shows deployment result on success', async () => {
    const onDeploy = vi.fn();
    render(<DeploymentControls html="<h1>Test</h1>" css="" js="" onDeploy={onDeploy} />);

    const deployButton = screen.getByRole('button', { name: /Deploy to GitHub Pages/i });
    await userEvent.click(deployButton);

    await new Promise(resolve => setTimeout(resolve, 100));

    expect(onDeploy).toHaveBeenCalled();
  });
});
