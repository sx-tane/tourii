# 🔒 Tourii Security Guidelines

## Overview

This document outlines Tourii’s essential security practices across both frontend and backend systems, with a focus on Web3 authentication, API security, and user protection.

---

## 1. Rate Limiting

### Why It's Important

Uncontrolled endpoint access can lead to:

- Database crashes
- Excessive Supabase usage
- Increased costs
- Vulnerability to DDoS attacks

### Implementation Tools

- Supabase Edge Functions with rate limiter
- Vercel Middleware
- Next.js middleware for IP throttling

### Action Items

To implement this security feature:

- Follow the setup steps using the recommended tools
- Verify integration with actual usage flows
- Log results and adjust based on live monitoring



---

## 2. Row-Level Security (RLS)

### Why It's Important

Without RLS, users can potentially access other users' data.

### Implementation Steps

- Enable RLS on all tables:
   - Navigate to Table → RLS → Enable
   - Implement policies using `user_id = auth.uid()`
- Test policies thoroughly
- Never disable RLS in production

### Action Items

To implement this security feature:

- Follow the setup steps using the recommended tools
- Verify integration with actual usage flows
- Log results and adjust based on live monitoring

---

## 3. CAPTCHA Implementation

### Why It's Important

Prevents automated bot attacks and fake signups.

### Required Locations

- Signup forms
- Login pages
- Password reset flows

### Implementation Options

- hCaptcha
- reCAPTCHA

### Action Items

To implement this security feature:

- Follow the setup steps using the recommended tools
- Verify integration with actual usage flows
- Log results and adjust based on live monitoring



---

## 4. Web Application Firewall (WAF)

### Implementation Steps for Vercel

1. Navigate to Vercel → Settings → Security → Web Application Firewall
2. Enable "Attack Challenge" on all routes

### Benefits

- Blocks malicious traffic before reaching the application
- No code changes required
- Built-in DDoS protection

### Action Items

To implement this security feature:

- Follow the setup steps using the recommended tools
- Verify integration with actual usage flows
- Log results and adjust based on live monitoring

-

---

## 5. API Keys and Secrets Management

### Best Practices

- Store all secrets in .env files
- Use server-only functions for sensitive operations
- Never expose secrets in frontend code
- Regular rotation of API keys

### Action Items

To implement this security feature:

- Follow the setup steps using the recommended tools
- Verify integration with actual usage flows
- Log results and adjust based on live monitoring

-

---

## 6. Backend Input Validation

### Required Validation Points

- Email addresses
- Passwords
- File uploads
- Form inputs
- API payloads

### Implementation Guidelines

- Validate all inputs server-side regardless of frontend validation
- Implement strong type checking
- Sanitize all user inputs

### Action Items

To implement this security feature:

- Follow the setup steps using the recommended tools
- Verify integration with actual usage flows
- Log results and adjust based on live monitoring

---

## 7. Dependencies Management

### Regular Maintenance

- Run `npm audit fix` or `yarn audit` regularly
- Remove unused packages
- Check for critical vulnerabilities
- Minimize dependency usage

### Action Items

To implement this security feature:

- Follow the setup steps using the recommended tools

- Verify integration with actual usage flows

- Log results and adjust based on live monitoring

-

---

## 8. Monitoring and Logging

### Implementation Tools

- Supabase Logs
- Vercel Analytics
- Server-side logging

### What to Monitor

- Failed login attempts
- Traffic spikes
- 500 errors
- Unhandled exceptions
- API usage patterns

### Logging Requirements

- Include timestamps
- Log IP addresses
- Track user sessions
- Monitor authentication events

### Action Items

To implement this security feature:

- Follow the setup steps using the recommended tools
- Verify integration with actual usage flows
- Log results and adjust based on live monitoring

---

## 9. Authentication & Wallet Security

### Flow

- Email/OAuth (Google, Discord, Twitter)
- Wallet login (signature nonce)
- JWT access tokens stored in `HttpOnly` cookies or secure `localStorage`

### Action Items

To implement this security feature:

- Follow the setup steps using the recommended tools
- Verify integration with actual usage flows
- Log results and adjust based on live monitoring
- 
---

## 10. Smart Contract & NFT Verification

### Areas at Risk

- Incorrect token ownership checks
- Bad data embedded in on-chain metadata
- NFT spoofing in client

### Action Items

To implement this security feature:

- Follow the setup steps using the recommended tools
- Verify integration with actual usage flows
- Log results and adjust based on live monitoring

---

## 11. WebSocket Security

### Authentication

- Attach JWT or API key during initial `onopen` handshake:

```ts
socket.send(JSON.stringify({ type: 'auth', token }));
```

### Action Items

To implement this security feature:

- Follow the setup steps using the recommended tools
- Verify integration with actual usage flows
- Log results and adjust based on live monitoring

---

## 📆 Regular Security Review Schedule

- Reviewing endpoints bi-monthly
- Rotating secrets regularly
- Auditing WebSocket & NFT logic
- Running optional 3rd-party pen tests

---

## 📣 Reporting Vulnerabilities

Please report all potential issues to: `security@tourii.com`

- Do not disclose publicly
- Include reproduction steps or payload examples

---

**Note**: This is a living document. Update it regularly as new security measures are implemented or requirements change.

*Last updated: June 16 2025*

