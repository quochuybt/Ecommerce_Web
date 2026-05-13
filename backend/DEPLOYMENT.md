# Backend Deployment

## Render

Use these settings:

- Root Directory: `backend`
- Build Command: `npm install`
- Start Command: `npm start`
- Health Check Path: `/api/health`

Set environment variables from `.env.production.example`.

## Railway

Use these settings:

- Root Directory: `backend`
- Start Command: `npm start`

Set environment variables from `.env.production.example`.

## After Deploy

Check:

```text
https://your-backend-domain/api/health
```

Then update frontend:

```env
VITE_API_URL=https://your-backend-domain/api
```
