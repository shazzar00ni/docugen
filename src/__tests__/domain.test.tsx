import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DomainControls } from '../components/domain/DomainControls';

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
};
vi.stubGlobal('localStorage', localStorageMock);

describe('DomainControls', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders domain configuration form', () => {
    const onDomainUpdate = vi.fn();
    render(<DomainControls onDomainUpdate={onDomainUpdate} />);

    expect(screen.getByDisplayValue('Domain Name')).toBeInTheDocument();
    expect(screen.getByDisplayValue(/Test link/i)).toBeInTheDocument();
    expect(screen.getByText('SSL Certificate')).toBeInTheDocument();
  });

  it('updates domain configuration when inputs change', async () => {
    const onDomainUpdate = vi.fn();
    render(<DomainControls onDomainUpdate={onDomainUpdate} />);

    const domainInput = screen.getByDisplayValue('Domain Name');
    await userEvent.clear(domainInput);
    await userEvent.type(domainInput, 'https://docs.example.com');
    await userEvent.tab();

    const subdomainInput = screen.getByDisplayValue(/Test link/i);
    await userEvent.clear(subdomainInput);
    await userEvent.type(subdomainInput, 'docs');
    await userEvent.tab();

    expect(onDomainUpdate).toHaveBeenCalledWith({
      domain: 'https://docs.example.com',
      subdomain: 'docs',
      sslEnabled: false,
    });
  });

  it('saves domain configuration to localStorage', async () => {
    render(<DomainControls onDomainUpdate={() => {}} />);

    const domainInput = screen.getByDisplayValue('Domain Name');
    await userEvent.clear(domainInput);
    await userEvent.type(domainInput, 'https://test.example.com');
    await userEvent.tab();

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'docugen-domain-config',
      expect.stringContaining('"domain":"https://test.example.com"')
    );
  });

  it('loads domain configuration from localStorage', () => {
    localStorageMock.getItem.mockImplementation((key: string) => {
      if (key === 'docugen-domain-config') {
        return JSON.stringify({
          domain: 'https://loaded.example.com',
          subdomain: 'docs',
          sslEnabled: true,
        });
      }
      return null;
    });

    render(<DomainControls onDomainUpdate={() => {}} />);

    expect(screen.getByDisplayValue('Domain Name')).toHaveValue('https://loaded.example.com');
    expect(screen.getByDisplayValue(/Test link/i)).toHaveValue('docs');
  });

  it('triggers SSL verification when requested', async () => {
    const onDomainUpdate = vi.fn();
    render(<DomainControls onDomainUpdate={onDomainUpdate} />);

    // Set a domain first
    const domainInput = screen.getByDisplayValue('Domain Name');
    await userEvent.clear(domainInput);
    await userEvent.type(domainInput, 'https://test.example.com');
    await userEvent.tab();

    // Click SSL check button
    const sslButton = screen.getByRole('button', { name: 'Request SSL' });
    await userEvent.click(sslButton);

    // Should show checking status
    expect(screen.getByText('Checking SSL certificate...')).toBeInTheDocument();
  });

  it('shows SSL status after verification', async () => {
    render(<DomainControls onDomainUpdate={() => {}} />);

    // Mock a successful domain setup
    const domainInput = screen.getByDisplayValue('Domain Name');
    await userEvent.clear(domainInput);
    await userEvent.type(domainInput, 'https://example.com');
    await userEvent.tab();

    // Simulate SSL check completion
    const sslButton = screen.getByRole('button', { name: 'Request SSL' });
    await userEvent.click(sslButton);

    // Wait for async check to complete
    await new Promise(resolve => setTimeout(resolve, 0));

    expect(screen.getByText('SSL certificate is valid and active')).toBeInTheDocument();
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'docugen-domain-config',
      expect.stringContaining('"sslEnabled":true')
    );
  });
});
