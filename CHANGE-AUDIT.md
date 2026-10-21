# DIRA Website Change Audit

This audit maps the current worktree changes against the repository's `HEAD`. Line numbers below are current source line numbers; removed lines are identified as removals at their former location. Related adjacent lines are grouped into one entry. This includes the previously approved copy/SEO pass and the latest follow-up changes.

## Per-file audit

| File and current line(s) | Change |
|---|---|
| `.gitignore:6` | Ignore `docs/` so internal source documents are not accidentally committed. No documents were deleted. |
| `about.html:8-11,14-15` | Refresh About-page title and search/social metadata; use the Pretty URL canonical. |
| `about.html:38-43,50-52,61-62,71-72,81,89,97,106-120,134-151` | Rewrite company copy and principles in direct DIRA SAS language; identify DIRA SAS as the legal entity behind the DIRA Group trade name; remove government-adjacent, audit-day and hiring-pipeline wording. Keep approved figures and distinguish the SAS from related ventures. |
| `about.html:152,164,166-173` | Refine About-page recognition copy and remove the SHESA-specific recognition image/caption to avoid disclosing project details there. |
| `articles.html:14-15` | Set canonical and Open Graph URL to `/articles` (no trailing slash). |
| `contact.html:8-15,101,172` | Set a DIRA SAS-focused local title and description, preserve the slashless canonical, and replace generic “journey” wording with a direct social-channel invitation. |
| `content-studio.html:8-11,22-23,55-56` | Shorten the description to name the services and Bamenda location; retain the slashless canonical and remove premature/editorial copy describing an emerging news function. |
| `gallery.html:8-11,25-26,55-56,63,67,69,73,75` | Focus the gallery description on DIRA SAS projects, training and media work; use the clean canonical and revise gallery metrics/captions to avoid the Tech Fest attendee metric and state the approved training figure without an unsupported plus sign. |
| `gallery.html:116,120,129-135` | Replace the detailed SHESA quotation and platform description with the approved brief delivery statement; update the image alt text and attribution. |
| `group.html:22-23,74,78-89` | Use the clean group canonical and describe DHUB as SaaS serving renters, landlords, property operators, hostels, hotels and guest houses. |
| `group.html:97-111` | Separate the DHUB product-information website, DHUB web app and Google Play links. Use the user-supplied `com.dira.dhub` listing URL. |
| Internal page links throughout `about.html`, `article.html`, `gallery-upload.html`, `index.html`, `group.html`, `portfolio.html`, `project-*.html`, `services.html`, `training.html`, `contact.html`, `content-studio.html`, `reports.html`, `terms-of-service.html`, and `js/` page templates | Convert internal page links from `.html` file names to root-based extensionless paths; preserve query strings and anchors. This includes the main site navigation, portfolio case-study cards, related-project links, and article/report links. |
| `index.html:8-11,20-42,70,79,86,93,118-140,156-158,171-203,237-260` | Refresh homepage SEO metadata and Organization structured data; retain the updated hero copy; restore the earlier non-hero homepage wording at the user's request. Preserve the user's approved training/partnership figures and the stated company-registration context. |
| `index.html:209-220` | Show the approved figures: 3+ government partnerships, 108+ engineers trained, and 20+ delivered platforms. Remove the undefined “100% Verified Deployment” metric and Tech Fest attendee count. |
| `index.html:237-249` | Replace the commercial guarantee/scoping/support bullet list with a general project CTA and requirements-review invitation, as approved. |
| `index.html:269-296` | Retain the homepage testimonial section after the user confirmed the displayed statements and attributions are approved; SHESA remains limited to the approved delivery statement. |
| `style/home.css:753-758` | Make the single-column CTA copy span the panel after removing the commercial-promise list. |
| `article.html:9` | Improve the fallback article description for users and crawlers before article content and metadata load. |
| `js/article-api.js:87,91` | Generate article links using the clean `/article?slug=...` route without a trailing slash. |
| `js/articles.js:17` | Make article-list cards use the same slashless article route. |
| `js/header.js:35-36` | Provide separate “DHUB website” and “DHUB web app” navigation links. |
| `js/header.js:18-79,338-350` | Convert header/footer page links to extensionless routes and match the current clean path when highlighting navigation; project pages highlight Portfolio and the article reader highlights Articles. Remove dropdown-parent highlighting that incorrectly kept DIRA Group active when a child page was open. |
| `js/portfolio.js:5-6,9-21` | Reposition DHUB as property-management and booking software; distinguish the DHUB website URL from the web-app URL; describe the service scope and audiences. |
| `js/portfolio.js:8,30,46,64,82,104,124` | Store case-study paths as extensionless routes so dynamically rendered portfolio cards and modals do not navigate to `.html` URLs. |
| `js/portfolio.js:29,32,36,42,48-50,60,62,66-68` | Simplify SHESA's entry; present NW-GPIDRS and NWDRS as government-endorsed assessment programmes, clarify their work and investment/timing context, and position the assessments as evidence of DIRA's diagnostic consulting experience. |
| `js/portfolio.js:84-86,126-128,151-153,174-176,199-201` | Present the user-confirmed DIRA SAS-delivered ASWEDO, Camer Young Boyz FC, DIRA Foundation, Open Dreams and AgriChain work using factual summaries; remove unsupported performance, scouting, donor, pipeline, adulteration-prevention, immutability and decentralization claims. |
| `js/portfolio.js:100-114` | Remove marketplace MOU/NDA/redaction and implementation specifics; use a restrained portfolio description. Simplify tags and related project labels. |
| `js/portfolio.js:265-275,292,295-303,357-360,383` | Add DHUB information-site link to portfolio cards and overview modal while retaining the web-app link; label each link clearly. |
| `js/testimonial-toast.js:4-32,103,113,116-130,134-138,145-151,155,158-162` | Add local-storage-backed exponential backoff: first display after 15 seconds; subsequent appearances after 2, 4, 8, 16 minutes, capped at 30 minutes. Dismissal and timed hiding respect focused controls. Storage failures do not prevent the toast from working for the current page. |
| `js/testimonial-toast.js:50` | Fetch the gallery from its extensionless route. |
| `portfolio.html:22-23,52,54-55,92,94` | Use the clean portfolio canonical, refine DHUB/SHESA labels and category wording, and adjust related portfolio text. |
| `project-aswedo.html:9,11,14-15,38,49-58,78,83-84` | Correct the organization name to **Aspired Women Empowerment and Development Organization** in search metadata and visible copy; replace unsubstantiated NGO and performance claims with a concise summary of the website delivered. |
| `project-cybfc.html:14-15,38,49-56,81,86-87` | Use the clean canonical, replace speculative scouting/problem claims with a factual description of the club website and its visible content, and correct the related DHUB card label. |
| `project-dhub.html:8-11,14-15,36,38,43-58,62,64` | Rewrite DHUB SEO metadata and case-study copy around the approved SaaS audiences and uses: rental listings (with examples), property operations, university hostels, and hospitality bookings. |
| `project-dhub.html:68-70` | Provide distinct buttons for the DHUB product website, web app, and verified Play Store listing. |
| `project-dhub.html:90-91` | Correct related-project labels. |
| `project-marketplace.html:8-11,14-15,36-38,41,63` | Use the clean canonical and a brief, anonymous commerce-platform portfolio description; remove internal NDA/redaction/MOU language and unapproved technical/client specifics. |
| `project-marketplace.html:42-61` (removed) | Remove the long confidentiality/redaction explanation and project implementation details from the public case study. |
| `project-nwdrs.html:8-11,14-15,38,44-48` | Update search metadata and preserve the approved programme facts: seven divisions, eight-month duration, target range, institutional partner and investment of over 70 million XAF committed by the DIRA Group. |
| `project-nwdrs.html:51-66` | Add a responsive MINPMEESA/DIRA SAS paired-logo card; identify the institutional partner; describe the assessment focus. |
| `project-nwdrs.html:71,73-75,80,82,96,98-99,104,107,115-116` | Explain DIRA's diagnostic work across records, loan and operational workflows, reporting, connectivity and skills; explicitly include MFIs and cooperative credit unions alongside SMEs and other organisations; replace generic headings with direct assessment/output labels. |
| `project-nwdrs.html:123-124` | Add a direct route to discuss a digital assessment and retain the related NW-GPIDRS link. |
| `project-nw-gpidrs.html:8-11,14-15,38,44-48` | Shorten the search title and retain the approved seven-division scope, six-to-eight-month duration, target range, MINPOSTEL partnership, and over-40-million-XAF DIRA Group investment. |
| `project-nw-gpidrs.html:51-66` | Add the responsive MINPOSTEL/ DIRA SAS paired-logo card and identify the ministry partner. |
| `project-nw-gpidrs.html:71,73-75,80,82,95,97-98,103,113-114` | Position public-institution assessments as DIRA IT consulting experience, describe assessment findings and regional priorities, replace the generic regional heading with “Regional planning,” and link to consulting. |
| `project-nw-gpidrs.html:121-122` | Add a direct route to discuss a digital assessment and retain the related NWDRS link. |
| `project-shesa.html:9,11,14-15,38,43,63,68-69` | Improve the concise SHESA delivery description for search snippets; use the clean canonical and approved case-study wording; remove detailed features, internal presentation material and the separate status field. |
| `project-shesa.html:42-71` (removed) | Remove the longer, unapproved description of platform features, data, and delivery claims. |
| `reports.html:14-15` | Set canonical and Open Graph URL to `/reports` (no trailing slash). |
| `server.js:538,751` | Generate clean article notification URLs and clean query-based article URLs in the dynamic sitemap. |
| `netlify.toml` | Keep only the existing sitemap and API function rewrites; remove explicit per-page redirects as requested. |
| `services.html:14-15` | Set canonical and Open Graph URL to `/services` (no trailing slash). |
| `services.html:111-125` | Refine service metrics and labels to use the approved counts and remove unsupported plus signs from the 108-engineer figure. |
| `services.html:153` | Remove DHUB/SHESA-specific claims from generic custom-platform copy. |
| `services.html:143-154,183-194,235` | Replace absolute audit-trail/immutability promises with accurate tamper-evident wording, simplify platform capabilities and training copy, and use a direct consulting CTA. |
| `js/newsletter.js:120` | Replace the unsupported “exclusive monthly insights” promise with a factual description of the email newsletter. |
| `server.js:277` | Replace “high-impact” and vague “digital ecosystem” language in the report-notification email with a factual description. |
| `sitemap.xml:7,10,13,16,19,22,25,28,31,34,37,40,43,46,49,52,55,58` | Use extensionless sitemap locations without trailing slashes (the homepage remains `/`). |
| `style/home.css:714` | Adjust the homepage quote/feature layout to match the revised copy presentation. |
| `style/pg-case.css:121-202` | Add responsive paired-logo layout, captions, and contained image sizing for ministry and DIRA SAS marks. |
| `style/pg-case.css` (former line 212 removed; current anchor 293) | Remove the 44-rem paragraph width cap that was unnecessarily restricting case-study text width. |
| `terms-of-service.html:14-15` | Set canonical and Open Graph URL to `/terms-of-service` (no trailing slash). |
| `training.html:9,11,14-15,66-67,69,72` | Update training SEO metadata, state 108+ engineers trained, and remove the Tech Fest attendee statistic and related copy. The same 108+ label is used on the homepage, About, Services, and Gallery pages. |
| `upload.html:403,744` | Make generated admin preview/article links use the clean, slashless query-based article route. |
| `upload.html:596,704` | Point the admin editor's cancel and post-save links to the clean Articles and Reports routes. |

## Non-line-based assets and deliverables

- `images/utils/minpostel.jpg` and `images/utils/mipmeesa.png` are user-supplied binary logo assets; no text line numbers apply. The MINPOSTEL image is 216×119 pixels and may look soft at larger display sizes.
- `FULL-AUDIT-REPORT.md` and `ACTION-PLAN.md` are new review documents. The report records SEO findings, verified constraints, and remaining items; the action plan lists follow-up work. Neither is deployed by the Netlify build allowlist.
- The project source documents under `docs/` were not edited or deleted.

## Verification

- `npm.cmd run check` passed.
- `node --check` passed for `js/article-api.js`, `js/articles.js`, `js/animate.js`, `js/header.js`, `js/portfolio.js`, and `js/testimonial-toast.js`.
- `npm.cmd run build:netlify` passed; required survey pages, ministry logos and sitemap were present in the generated output. The generated `dist/` directory was removed after verification.
- Sitemap check found 19 extensionless entries without trailing slashes, except for the homepage root URL.
- Static page canonical and Open Graph URLs, sitemap entries, and generated article links use `/page`, not `/page/`.
- `git diff --check` passed.
- Play Store URL `https://play.google.com/store/apps/details?id=com.dira.dhub` was fetched and resolves to “DHUB – Find & Rent Housing in Cameroon.”
- Paired logos were visually checked at desktop and 390px mobile widths; they remain side-by-side and do not cause horizontal overflow.
- A small isolated timer/storage harness verified the toast's initial 15-second delay and successive 2-minute and 4-minute persisted backoffs.

No commit was made. The worktree also contains the user-supplied logo files and prior review deliverables; these were not staged.
