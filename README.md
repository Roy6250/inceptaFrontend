# Incepta frontend

The student and mentor web app for Incepta. It includes the public landing page, account signup and verification, college and mentor discovery, connection requests, messaging, credits, profile settings, and account recovery.

## Local setup

Use Node.js 24 or newer and pnpm. Start the [Incepta backend](https://github.com/aaritpaliwal/inceptaBackend) on port 5000 first. Then run:

```sh
pnpm install
pnpm start
```

Open `http://localhost:3000`. The development server forwards `/api` requests to the backend on port 5000. For local testing, the backend can show verification codes in the signup page when `ALLOW_DEV_VERIFICATION=true` and `NODE_ENV` is not `production`.

## Build and deployment

```sh
pnpm build
```

Serve the `build/` directory over HTTPS with a fallback to `index.html` for app routes. Forward `/api/*` to the backend on the same site origin, or set `REACT_APP_SERVER_URL` to your HTTPS API URL before building and configure the backend origin and cookies for that deployment. The frontend build does not contain payment secrets; Stripe Checkout is created by the backend.

The platform needs an SMTP provider for production email verification and Stripe keys plus Price IDs for credit purchases. See the backend README for the required settings. Mentor accounts must be reviewed and approved before appearing in search. The Terms and Privacy pages should be reviewed by the owner and legal counsel before a public launch.
