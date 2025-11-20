# Security Policy

## Supported Versions

We release patches for security vulnerabilities. Below are the versions currently being supported with security updates:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

The Spire UI team takes security bugs seriously. We appreciate your efforts to responsibly disclose your findings.

### How to Report

**Please do NOT report security vulnerabilities through public GitHub issues.**

Instead, please report security vulnerabilities by email to:

**sabri@stratosdigital.io**

Please include the following information:
- Type of vulnerability (e.g., XSS, CSRF, injection, etc.)
- Full paths of source file(s) related to the vulnerability
- The location of the affected source code (tag/branch/commit or direct URL)
- Any special configuration required to reproduce the issue
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the issue, including how an attacker might exploit it

### What to Expect

- **Acknowledgment**: We will acknowledge receipt of your vulnerability report within 48 hours
- **Updates**: We will send you regular updates about our progress
- **Timeline**: We aim to patch critical vulnerabilities within 7 days and moderate vulnerabilities within 30 days
- **Credit**: If you wish, we will credit you in the security advisory

### Our Commitment

- We will respond to your report within 48 hours with our evaluation and expected resolution date
- We will handle your report with strict confidentiality and not pass on your personal details to third parties without your permission
- We will keep you informed of the progress towards resolving the problem
- We will credit you as the discoverer of the vulnerability (unless you prefer to remain anonymous)

### Safe Harbor

We support safe harbor for security researchers who:
- Make a good faith effort to avoid privacy violations, destruction of data, and interruption or degradation of our services
- Only interact with accounts you own or with explicit permission of the account holder
- Do not exploit a security issue you discover for any reason (including demonstrating additional risk)
- Report the vulnerability to us promptly

## Security Best Practices

When using Spire UI, we recommend following these security best practices:

### Input Sanitization
- Always sanitize user input before passing it to components
- Use Laravel's built-in validation features
- Be cautious with `wire:model` on user-controlled data

### XSS Protection
- Blade automatically escapes output by default
- Only use `{!! !!}` for trusted, already-sanitized content
- Be careful when using slots with user-generated content

### CSRF Protection
- Spire UI components work with Laravel's CSRF protection
- Ensure `@csrf` directive is present in forms
- Livewire components automatically handle CSRF tokens

### Authentication & Authorization
- Always implement proper authentication before using Spire UI components
- Use Laravel policies and gates for authorization
- Never rely solely on front-end component visibility for security

### Content Security Policy
- Consider implementing CSP headers
- Configure CSP to allow inline styles if using Spire UI's dynamic styling
- Test your CSP configuration with all components

### Dependency Security
- Regularly update Spire UI to the latest version
- Keep Laravel, Livewire, and Alpine.js updated
- Monitor security advisories for all dependencies

## Known Issues

We maintain a list of known security issues and their status:

- No known security issues at this time

## Security Updates

Security updates will be released as patch versions (e.g., 1.0.1, 1.0.2) and announced through:
- GitHub Security Advisories
- Release notes
- Security mailing list (if available)

## Disclosure Policy

When we receive a security bug report, we will:

1. Confirm the problem and determine affected versions
2. Audit code to find any similar problems
3. Prepare fixes for all supported releases
4. Release new security patch versions
5. Publish a security advisory with credit to the reporter (if desired)

We ask that you:
- Allow us reasonable time to fix the vulnerability before public disclosure
- Make a good faith effort to avoid privacy violations and data destruction
- Not exploit the vulnerability beyond what is necessary to demonstrate it

## Security Hall of Fame

We thank the following researchers for responsibly disclosing security issues:

- (No vulnerabilities reported yet)

## Contact

For security-related questions that are not vulnerabilities, please contact:
- Email: sabri@stratosdigital.io
- GitHub Discussions: https://github.com/sabristratos/spire/discussions

For general support questions, please use:
- GitHub Issues: https://github.com/sabristratos/spire/issues
- Documentation: https://sabristratos.github.io/spire/

Thank you for helping keep Spire UI and our users safe!
