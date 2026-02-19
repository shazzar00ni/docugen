# Deployment Guide

This guide covers production deployment configuration for DocuGen, including security headers and analytics setup.

## Table of Contents

- [Security Headers](#security-headers)
- [Analytics Configuration](#analytics-configuration)
- [Deployment Platforms](#deployment-platforms)

## Security Headers

DocuGen includes security headers configuration to protect against common web vulnerabilities.

### Configured Headers

The following security headers are configured:

- **Content-Security-Policy (CSP)**: Controls which resources can be loaded
- **X-Content-Type-Options**: Prevents MIME type sniffing (`nosniff`)
- **X-Frame-Options**: Prevents clickjacking (`DENY`)
- **Referrer-Policy**: Controls referrer information (`strict-origin-when-cross-origin`)
- **Permissions-Policy**: Restricts browser features (`microphone=()`)

### Platform-Specific Configuration

#### Vercel

Security headers are configured in `vercel.json` at the project root:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "Permissions-Policy",
          "value": "microphone=()"
        }
      ]
    }
  ]
}
```

#### Netlify

For Netlify deployments, use the `_headers` file:

```
/*
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: microphone=()
```

### Customizing CSP

If you need to load external resources (e.g., Google Fonts, CDNs), update the CSP:

```json
{
  "key": "Content-Security-Policy",
  "value": "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.example.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self'"
}
```

## Analytics Configuration

DocuGen supports privacy-respecting analytics through Plausible Analytics.

### Setup

1. **Create a Plausible account** at https://plausible.io

2. **Add your domain** to Plausible (e.g., `docugen.example.com`)

3. **Configure environment variable** in your deployment:

   Create a `.env` file locally or set environment variables in your deployment platform:

   ```
   VITE_PLAUSIBLE_DOMAIN=docugen.example.com
   ```

   For Vercel:

   ```bash
   vercel env add VITE_PLAUSIBLE_DOMAIN
   # Enter your domain when prompted
   ```

   For Netlify:
   - Go to Site settings → Build & deploy → Environment variables
   - Add `VITE_PLAUSIBLE_DOMAIN` with your domain

4. **Deploy** - The analytics script will be automatically injected on page load

### How It Works

The `Analytics` component in `src/components/Analytics.tsx`:

- Checks for `VITE_PLAUSIBLE_DOMAIN` environment variable
- Dynamically injects the Plausible tracking script only when configured
- Automatically cleans up the script on component unmount
- Respects user privacy (no cookies, GDPR compliant)

### Verifying Analytics

1. Open your deployed site
2. Open browser DevTools → Network tab
3. Look for a request to `plausible.io/js/plausible.js`
4. Check Plausible dashboard for incoming data (may take a few minutes)

### Disabling Analytics

To disable analytics, simply:

- Remove the `VITE_PLAUSIBLE_DOMAIN` environment variable, or
- Set it to an empty value

The Analytics component will not inject any tracking code if the variable is not set.

## Deployment Platforms

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect `vercel.json` headers
3. Add environment variables in Vercel dashboard
4. Deploy

### Netlify

1. Connect your GitHub repository to Netlify
2. Ensure `_headers` file is at project root
3. Add environment variables in Netlify dashboard
4. Deploy

### Other Platforms

For platforms without built-in header configuration:

1. Configure headers at the CDN/proxy level (Cloudflare, AWS CloudFront, etc.)
2. Set environment variables in the platform's dashboard
3. Ensure `VITE_PLAUSIBLE_DOMAIN` is available at build time

## Security Best Practices

1. **Regularly review CSP**: As you add external resources, update your CSP accordingly
2. **Test headers**: Use https://securityheaders.com to verify your headers
3. **Keep dependencies updated**: Enable Dependabot for automatic security updates
4. **Monitor analytics**: Regularly check your Plausible dashboard for unusual activity

## Troubleshooting

### Headers not appearing

- Verify `vercel.json` or `_headers` is at the project root
- Check deployment platform's documentation for header syntax
- Ensure file is committed and pushed to the deployment branch

### Analytics not loading

- Verify `VITE_PLAUSIBLE_DOMAIN` is set in environment variables
- Check that the domain matches exactly what's configured in Plausible
- Look for errors in browser console
- Ensure the domain is registered in your Plausible account

### CSP errors in console

- Check browser console for specific CSP violation messages
- Update CSP in `vercel.json` or `_headers` to allow required resources
- Be specific with domain allowances (avoid `*` wildcards when possible)
