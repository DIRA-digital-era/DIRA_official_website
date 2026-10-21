# DIRA SAS Website Copy and SEO Review

## Scope

This review covers the website source in this checkout, its public-facing copy, HTML metadata, sitemap, robots file, JavaScript-generated content, and Netlify build output. It does not evaluate the currently hosted website or treat its deployment state as a prerequisite for preparing this source tree.

The review considered the DIRA background documents and writing guidance supplied with the project. AI-writing patterns are editorial signals, not proof of authorship. The goal is clear, fact-based public copy that distinguishes DIRA SAS from DIRA Foundation and DIRA Tech Fest and does not expose internal or client-sensitive detail.

## SEO assessment

The earlier **55/100** score is the pre-edit source-tree baseline, not a score for the current version. I have not assigned a new numeric score: a defensible score needs a consistent post-edit checklist and performance/indexing evidence that is not available in the source alone.

The source now has a sound technical foundation: distinct titles and descriptions on the public pages, canonical URLs and sitemap entries aligned to Netlify Pretty URLs, a valid robots file, and Organization structured data on the homepage. The content also has useful local relevance for Bamenda and Cameroon.

SEO readiness is improved on-page, but not yet fully measured. The remaining weaknesses are article and portfolio content that depends on JavaScript, limited structured data, a few aggregate claims that need a clear basis, and the absence of current Core Web Vitals, Search Console, ranking, traffic, and backlink evidence.

## Approved copy changes completed

- Reframed the homepage and About page around DIRA SAS, preserving the approved tamper-evident systems description and adding the approved training and government-partnership figures.
- Removed the Tech Fest attendee metric. The approved training figure is stated as **108+ engineers trained** consistently on the homepage, About, Services, Training, and Gallery pages; no Tech Fest attendee total is included.
- Updated the two regional survey pages to describe active institutional partnerships and government endorsement, use seven divisions, state programme durations, and describe investments of over 70 million XAF for NWDRS and over 40 million XAF for NW-GPIDRS as committed by the DIRA Group.
- Added the supplied MINPOSTEL and MINPMEESA logos to the left of a multiplication-sign partnership mark, with the DIRA SAS logo on the right. The paired logos use a responsive layout and `object-fit: contain`.
- Kept SHESA Connect's public description to DIRA's delivery for the SHESA alumni network. Removed feature-level descriptions and the separate status field.
- Corrected ASWEDO's expansion to “Aspired Women Empowerment and Development Organization,” replacing the inaccurate prior expansion on its case-study page and portfolio data.
- Removed marketplace MOU/NDA/redaction explanations and client-specific or unapproved implementation detail.
- Reworked DHUB copy to describe its rental listings (single rooms, studios, apartments, hotels and guest houses), landlord and property-management software, hostel operations, and hospitality bookings. The copy positions it as a SaaS product for consumers, businesses, and institutions and uses “Cameroon's premier,” not “first.”
- Added separate DHUB links for the product information website (`https://dhubcmr.netlify.app/`), the web app (`https://dhubweb.diracmr.com/`), and Google Play. The user supplied `https://play.google.com/store/apps/details?id=com.dira.dhub`; its Play listing resolves to “DHUB – Find & Rent Housing in Cameroon.”
- Added an exponential backoff to the client-feedback toast: it first appears after 15 seconds, then the next appearance is delayed by 2, 4, 8, 16, and at most 30 minutes. The schedule persists in local storage and remains functional if storage is unavailable. The toast waits to hide while a visitor is using a focused control inside it.
- Changed the NW-GPIDRS heading “Why a regional baseline matters” to “Digital readiness in public institutions.” Removed justified paragraph alignment and the paragraph width cap so case-study copy uses its available column width.
- Reviewed the SHESA web app's Framer Motion timing. DIRA already has a scroll-triggered reveal system with matching easing and a 320 ms card stagger; no new animation dependency or faster timing change was needed.
- Reworked NWDRS and NW-GPIDRS descriptions to explain DIRA's diagnostic process and IT consulting experience in plain language. NWDRS explicitly mentions microfinance institutions (MFIs), cooperative credit unions, SMEs and other organisations; NW-GPIDRS connects public-institution assessments to DIRA's consulting for public institutions and businesses. Both pages now link to the consulting service.
- Updated the consulting service description to explain the assessment, gap identification and practical planning work DIRA offers to businesses and institutions.
- Corrected ASWEDO's expansion to “Aspired Women Empowerment and Development Organization,” replacing the inaccurate prior expansion on its case-study page and portfolio data.
- Replaced unsupported “zero downtime” and “flawless audit trails” language, clarified SaaS before using the abbreviation on the homepage, and removed repeated DHUB-specific SaaS jargon from unrelated project cards.
- Added `docs/` to `.gitignore`. The source documents remain in place and are not copied by the Netlify build script.
- Updated static canonical and sitemap URLs to extensionless paths without a trailing slash, and updated dynamic article links for the same URL convention.
- Applied a final copy pass to several pages. At the user's request, the non-hero homepage copy from that pass was subsequently reverted; the revised hero remains, along with the user's approved homepage facts and disclosure limits.
- Tightened contact, Content Studio, gallery, SHESA and NW-GPIDRS search metadata; replaced broad regional section headings with direct descriptions of assessment work and outputs.
- DIRA confirmed that DIRA Foundation, Open Dreams Portal and AgriChain AI are DIRA SAS-delivered work; their entries remain in the portfolio with shorter, factual descriptions.
- The user confirmed that the homepage's displayed testimonial wording and attributions are approved, and that the current security and training/value-proposition wording reflects DIRA. The undefined “100% Verified Deployment” metric and homepage commercial-promise list were removed; the homepage retains 3+ partnerships, 108+ engineers trained, and 20+ delivered platforms.

## Remaining content checks

1. **“20+ Platforms” metric:** the homepage still uses this aggregate. It does not need a full list on the homepage, but the count and the meaning of “platforms” should be supported by an internal record and the label should make the scope clear. Do not publish a longer list unless it helps the public portfolio.
2. **Logo asset quality:** the paired logos were checked in a browser at desktop and 390px mobile widths; they remain side-by-side and fit within the cards using `object-fit: contain`. The supplied MINPOSTEL image is only 216×119 pixels and looks soft, so a higher-resolution source would improve its presentation if available.
3. **Public claims and testimonials:** retain only claims and quotations that DIRA has approved and can substantiate. Keep programme and client details at the disclosure level explicitly approved for the public site.

## Technical SEO findings

- `sitemap.xml` contains 19 extensionless URLs without a trailing slash, except for the homepage root URL. Internal public-page links use extensionless paths; `netlify.toml` contains no explicit per-page redirect rules.
- `robots.txt` permits crawling and points to the sitemap.
- Static public HTML pages have titles, descriptions, one H1 and matching canonical/Open Graph URLs. Admin-only pages are marked `noindex, nofollow`; their missing public metadata is intentional. The article template adds article-specific canonical and social metadata after content loads.
- The homepage contains Organization JSON-LD. No other JSON-LD was found in the HTML; accurate Article/BlogPosting or BreadcrumbList data could be considered where the visible page content supports it.
- The article reader obtains its title, description, canonical URL, and body through a client-side API request. The portfolio and reports views also depend on JavaScript to populate content. This can reduce resilience for crawlers and users when scripts or APIs fail; server-rendered or statically generated content would be more robust if these pages are important organic landing pages.
- Some images were previously measured at roughly 1.9–3.0 MB. Resize and compress large assets to their rendered dimensions and use responsive modern formats where practical.
- An earlier PageSpeed Insights request was rate-limited (HTTP 429). No LCP, INP, CLS, Lighthouse, Search Console, ranking, traffic, or backlink result is claimed here.
- Internal public-page links use extensionless paths. Keep Netlify Pretty URLs enabled to serve clean routes from static `.html` files; explicit page redirects are not configured.

## Practical SEO priorities

1. Confirm and accurately label the “20+ Platforms” figure.
2. DIRA confirmed DIRA Foundation, Open Dreams Portal and AgriChain AI are DIRA SAS-delivered work; keep their portfolio entries.
3. The supplied DHUB Play Store link resolves. Replace the MINPOSTEL logo with a higher-resolution official asset if available.
4. Consider rendering article and portfolio content in the initial HTML if organic discovery of those pages is important.
5. Add page-specific structured data only where it matches visible, verified content.
6. Review large images and measure mobile/desktop Core Web Vitals with field or lab tools.
7. After publishing, use Search Console to inspect indexing and queries; source inspection alone cannot establish rankings or organic performance.

## Web references

- [Google guidance on generative AI content](https://developers.google.com/search/docs/fundamentals/using-gen-ai-content)
- [Google guidance on helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- [Google guidance on title links](https://developers.google.com/search/docs/appearance/title-link)
- [Google sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Google page-experience guidance](https://developers.google.com/search/docs/appearance/page-experience)
- [web.dev Web Vitals guidance](https://web.dev/articles/vitals)
