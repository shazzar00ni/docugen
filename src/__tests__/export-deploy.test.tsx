/// <reference types="vitest globals" />
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ExportControls } from '../components/deploy/ExportControls';
import { DeploymentControls } from '../components/deploy/DeploymentControls';

// Mock URL.createObjectURL and link creation
const mockCreateObjectURL = vi.fn().mockImplementation(() => 'blob:mock-url');
Object.defineProperty(URL, 'createObjectURL', { value: mockCreateObjectURL });

// Mock Blob
class MockBlob {
  constructor() {}
}
Object.defineProperty(globalThis, 'Blob', { value: MockBlob });

// Mock DOMPurify to avoid actual DOM interaction in tests
vi.mock('dompurify', () => ({
  sanitize: vi.fn((html: string) => html),
}));

describe('ExportControls', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('exports ZIP file when clicked', async () => {
    const html = '<h1>Test</h1>';
    const css = 'body { color: red; }';
    const js = 'console.log("test");';

    render(<ExportControls html={html} css={css} js={js} />);
    const exportButton = screen.getByRole('button', { name: /Export ZIP/i });
    await userEvent.click(exportButton);

    // Wait for export to complete
    await new Promise(resolve => setTimeout(resolve, 0));

    expect(mockCreateObjectURL).toHaveBeenCalled();
    expect(screen.getByRole('link')).toHaveAttribute('download', 'documentation.zip');
  });

  it('shows loading state during export', async () => {
    const html = '<h1>Test</h1>';
    const css = 'body { color: red; }';
    const js = 'console.log("test");';

    // Mock JSZip to be slow for testing loading state
    vi.doMock('../lib/export', () => ({
      exportStaticZip: vi.fn().mockImplementation(() => {
        return new Promise(resolve =>
          setTimeout(
            () =>
              resolve({
                generateAsync: vi.fn().mockResolvedValue(new Blob()),
              } as any),
            100
          )
        );
      }),
    }));

    render(<ExportControls html={html} css={css} js={js} />);
    const exportButton = screen.getByRole('button', { name: /Export ZIP/i });
    await userEvent.click(exportButton);

    // Should show loading state
    expect(screen.getByText('Exporting...')).toBeInTheDocument();
  });
});

describe('DeploymentControls', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('deploys to GitHub Pages when clicked', async () => {
    const html = '<h1>Test</h1>';
    const css = 'body { color: red; }';
    const js = 'console.log("test");';

    render(<DeploymentControls html={html} css={css} js={js} />);
    const deployButton = screen.getByRole('button', { name: /Deploy to GitHub Pages/i });
    await userEvent.click(deployButton);

    // Wait for deployment to complete
    await new Promise(resolve => setTimeout(resolve, 0));

    expect(deployToGitHubPages).toHaveBeenCalledWith({
      owner: 'your-username',
      repo: 'your-repo',
      branch: 'gh-pages',
      commitMessage: 'Deploy documentation site',
    });
  });

  it('shows success state on successful deployment', async () => {
    const html = '<h1>Test</h1>';
    const css = 'body { color: red; }';
    const js = 'console.log("test");';

    vi.doMock('../lib/github', () => ({
      deployToGitHubPages: vi.fn().mockResolvedValue({
        success: true,
        url: 'https://your-username.github.io/your-repo',
      }),
    }));

    const onDeploy = vi.fn();
    render(<DeploymentControls html={html} css={css} js={js} onDeploy={onDeploy} />);
    const deployButton = screen.getByRole('button', { name: /Deploy to GitHub Pages/i });
    await userEvent.click(deployButton);

    await new Promise(resolve => setTimeout(resolve, 0));

    expect(onDeploy).toHaveBeenCalledWith({
      success: true,
      url: 'https://your-username.github.io/your-repo',
    });
    expect(screen.getByText('Deployed successfully!')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'View Site' })).toHaveAttribute(
      'href',
      'https://your-username.github.io/your-repo'
    );
  });

  it('shows error state on failed deployment', async () => {
    const html = '<h1>Test</h1>';
    const css = 'body { color: red; }';
    const js = 'console.log("test");';

    vi.doMock('../lib/github', () => ({
      deployToGitHubPages: vi.fn().mockResolvedValue({
        success: false,
        error: 'Authentication failed',
      }),
    }));

    const onDeploy = vi.fn();
    render(<DeploymentControls html={html} css={css} js={js} onDeploy={onDeploy} />);
    const deployButton = screen.getByRole('button', { name: /Deploy to GitHub Pages/i });
    await userEvent.click(deployButton);

    await new Promise(resolve => setTimeout(resolve, 0));

    expect(onDeploy).toHaveBeenCalledWith({
      success: false,
      error: 'Authentication failed',
    });
    expect(screen.getByText(/Deployment failed/)).toBeInTheDocument();
  });
});
