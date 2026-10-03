---
title: Article title shown as the page heading
seoTitle: Optional. Search-result title, aim for 60 characters or fewer. Defaults to the title plus the site name.
description: One or two sentences, 150-160 characters. Used on the Insights listing, as the meta description and in link previews.
author: Mukherji Architects Milano
date: 2026-01-31
tag: Hospitality
cover: images/cover.jpg
coverAlt: Describe what the cover image shows, for screen readers and search.
coverCaption: Short caption shown under the cover image.
coverProject: Project name | /project/project-slug
coverPhotographer: Photographer name
coverCredit: Image courtesy of Mukherji Architects Milano
---

The first paragraph is the introduction. It is shown in the page header in larger type, so keep it to two or three sentences.

## Section heading

Body text. Use [source links](https://example.com) for evidence and plain paths for pages on this site, for example [a project](/project/novotel-vrindavan) or [the studio](/about-mukherji-architects-milano). Use **bold** sparingly.

:::figure images/example.jpg
alt: Describe the image for screen readers and search.
caption: Short caption.
project: Project name | /project/project-slug
photographer: Photographer name
credit: Image courtesy of Mukherji Architects Milano
:::

::::gallery
:::figure images/example-1.jpg
alt: Describe the first image.
caption: Caption for the first image.
:::
:::figure images/example-2.jpg
alt: Describe the second image.
caption: Caption for the second image.
:::
::::

<!--
HOW TO PUBLISH
1. Copy this whole folder (_template) to a new name next to it. The folder name becomes the URL:
   content/insights/my-article/  ->  /insights/my-article
   Folders starting with "_" are ignored, so this template is never published.
2. Edit article.md. Required front matter: title, description, date (YYYY-MM-DD).
3. Images: put image files in the article's images/ folder, in any size or format. The build creates
   compressed, responsive versions, so use the largest original you have (2000px wide or more is ideal).
   To reuse a photo already on the site, point at it instead: /images/projects/<category>/<project>/...
   Never put an image on the site unless you have the right to publish it.
4. Cover (front matter): cover, coverAlt (required with a cover), coverCaption, coverProject,
   coverPhotographer, coverCredit. The cover is cropped to 16:9 and also becomes the social-preview image.
5. Figures: ":::figure <path>" with alt (required), caption, project ("Name | /project/slug"),
   photographer, credit. Optional: size (wide or inline, default wide), aspect (e.g. 4:3), name
   (file name used for the image, e.g. a descriptive search-friendly name).
   "::::gallery" holds two or three figures side by side. Leave out photographer and credit lines you
   do not know; nothing is shown for them.
6. Other optional front matter:
   updated:           YYYY-MM-DD. Add only after a substantive change; it is then shown and sent to search engines.
   disclosure:        A short note under the byline, for example when the article features the studio itself.
   numberedSections:  true numbers the ## sections 01, 02, ... (good for "Top 5" style lists).
   authorType / authorUrl:  Person or Organization (default Organization), and a link for structured data.
   draft:             true keeps the article out of the site, listing and sitemap.
7. Do not repeat the title as a "# Heading" in the body; the page adds it.
8. Run "npm run dev" to preview. Pushing to main publishes it; the sitemap updates automatically.
-->
