# Tribe Team Store

Simple React + Vite website for a Tribe Baseball decal and sticker pre-order page.

## Quick start

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## What to update before you deploy

1. Replace the placeholder product images in `src/App.jsx`
2. Replace the sample Google Form link in `src/App.jsx`
3. Update pricing and product descriptions as needed

## Deploy to AWS Amplify

1. Create a GitHub repo
2. Upload these files to the repo
3. In AWS Amplify, connect the repo and choose the `main` branch
4. Use the included `amplify.yml` or default Vite settings
5. Deploy

## Vite build output

Amplify should use:

- Build command: `npm run build`
- Output directory: `dist`
