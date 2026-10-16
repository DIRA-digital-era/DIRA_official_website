# Netlify drag-and-drop deployment

## Upload the static website

1. On your computer, open PowerShell in the website's project folder.
2. Install the project dependencies once:

   ```powershell
   npm install
   ```

3. Each time you want to prepare a new upload, build the website:

   ```powershell
   npm run build:netlify
   ```

   This creates the `dist` folder containing the public HTML pages and their
   images, scripts, styles, reports, `robots.txt`, and `sitemap.xml`.

4. Sign in to Netlify and open your site.
5. Open **Deploys** and locate the manual production deploy / drag-and-drop
   area.
6. Drag the generated `dist` folder into that area, or select the `dist`
   folder when prompted. Upload the folder itself, not the project root and
   not individual files inside it.
7. Wait for the deploy to finish, then open the production URL and check the
   pages and assets.

For later updates, repeat the build and drag-and-drop steps with the newly
generated `dist` folder. Each upload publishes a new static deploy.

## Important: drag-and-drop does not deploy functions

This drag-and-drop procedure publishes only static files. Netlify does not
deploy the API function from `netlify/functions` or apply the API and sitemap
rewrites in `netlify.toml` through a static folder upload. Therefore, with this
method, backend-dependent functionality will not work: admin login and
publishing, live articles/reports/gallery data, newsletter submissions, and
the dynamic sitemap.

To run the complete website functionality configured in this project, deploy
through a Git-connected Netlify site or the Netlify CLI. Those methods deploy
the static site together with its function and redirects. Configure the
environment variables listed below in Netlify before deploying.

## Environment variables for full-function deployments

Required:

- `MONGODB_URI`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- `ADMIN_TOKEN_SECRET` (use a long, stable random value)
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `RESEND_API_KEY`

Optional:

- `CORS_ORIGIN` (Netlify site, preview, and deploy URLs are allowed automatically)
- `RESEND_AUDIENCE_ID`
- `NEWSLETTER_FROM_EMAIL`
- `SITE_URL` (defaults to `https://diracmr.com`)

Netlify-hosted uploads are limited to 4 MB per file. Cloudinary stores uploaded
article and gallery images and report PDFs; Netlify's function filesystem is
not persistent. Local Express development retains its 8 MB image and 25 MB PDF
limits.
