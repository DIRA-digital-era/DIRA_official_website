# DIRA SAS Website: Remaining Copy and SEO Work

This plan concerns the source checkout being polished for release. It does not depend on the state of the currently hosted website.

## Completed in the approved copy pass

- Rewrote high-visibility DIRA SAS copy to remove generic filler and internal narration.
- Kept DIRA SAS distinct from DIRA Foundation and DIRA Tech Fest.
- Updated the homepage partnership and training figures; removed the Tech Fest attendee metric.
- Corrected both survey pages to seven divisions, with the approved programme durations and DIRA Group investment wording.
- Added the supplied ministry logos to the two survey pages.
- Limited SHESA Connect copy to its approved delivery statement and removed extra feature descriptions and a separate status field.
- Corrected ASWEDO's full name to Aspired Women Empowerment and Development Organization on the case-study page and portfolio data.
- Removed marketplace MOU/NDA/redaction references and unapproved client or implementation detail.
- Repositioned DHUB as SaaS for individual users, businesses, and institutions, covering rentals (single rooms, studios, apartments, hotels and guest houses), property management, hostels, and hospitality bookings.
- Added separate DHUB links for the product information website, web app, and Google Play listing. Verified the user-supplied Play Store link resolves to “DHUB – Find & Rent Housing in Cameroon.”
- Paired each government ministry logo with the DIRA SAS logo and a partnership mark. Checked the layout in a browser at desktop and 390px mobile widths; both logos remain legible within their cards.
- Added a persistent exponential backoff to the client-feedback toast.
- Replaced the NW-GPIDRS heading “Why a regional baseline matters” with “Digital readiness in public institutions.” Removed justified alignment and the paragraph width cap so text uses its available column width.
- Reviewed SHESA motion patterns; retained DIRA's existing reveal system and 320 ms stagger rather than adding another dependency or speeding it up.
- Repositioned the NWDRS and NW-GPIDRS case studies around DIRA's assessment method and consulting experience, and linked both to the consulting service. Updated the consulting service description to state who it serves and what DIRA does.
- Added `docs/` to `.gitignore` without deleting the source documents.
- Aligned static canonical URLs, sitemap entries, internal navigation, and generated article links with Netlify Pretty URLs, using `/page` rather than `/page/`. Removed explicit per-page redirects; the Netlify configuration retains only the sitemap and API rewrites.
- Replaced unsupported “zero downtime” and “flawless audit trails” claims.
- Applied a final AI-language and SEO copy pass to several pages. The user subsequently requested that non-hero homepage edits from that pass be reverted; the revised hero and previously approved homepage facts remain.

## Remaining actions

### 1. Confirm the aggregate platform metric

The homepage says “20+ Platforms.” Confirm the number and what is counted as a platform. A concise, accurate label and an internal evidence source are enough; the homepage does not need to enumerate every item.

### 2. Improve the MINPOSTEL source image if a better asset is available

The supplied MINPOSTEL image is 216×119 pixels and looks soft. Replace it with a higher-resolution official image if DIRA has one. The current desktop and mobile layouts fit both logos within their cards.

### 3. Portfolio scope and platform metric

- DIRA confirmed DIRA Foundation, Open Dreams Portal and AgriChain AI are DIRA SAS-delivered work; retain these entries in the DIRA SAS portfolio.
- Keep the homepage's “20+ Platforms” as an aggregate; no public item-by-item list is needed. Ensure the count is supportable internally.

### 4. Improve crawlable article and portfolio content

- Article title, description, canonical URL, and content are inserted after the article API responds.
- Portfolio and reports content also depend on JavaScript.
- If these pages are important search landing pages, consider server-side rendering or static generation so their main content and metadata are present in the initial HTML.

### 5. Extend structured data selectively

Organization JSON-LD exists on the homepage. Add Article/BlogPosting or BreadcrumbList markup only where it accurately reflects visible, approved page content; validate it with Google's rich-results tools.

### 6. Measure performance and search visibility

- Compress and resize the largest source images; prefer responsive formats where useful.
- Run mobile and desktop Core Web Vitals checks. An earlier PageSpeed Insights request was rate-limited, so there is no verified field or lab result yet.
- After release, use Search Console to check indexing, impressions, queries, and errors. Do not infer search rank or traffic from source inspection alone.

## Release checklist

- Confirm every sitemap URL represents an approved public page and uses the no-trailing-slash canonical form (except the homepage root). Keep Netlify Pretty URLs enabled so `/page` resolves without a trailing slash.
- Check the seven-division count, programme durations, investment wording, DHUB audiences and service scope, and SHESA/marketplace disclosure limits on all affected surfaces.
- Keep private source documents out of the published output; the existing Netlify build allowlist does not copy `docs/`.
- Recheck internal links, images, and clean routes in a browser before release.
