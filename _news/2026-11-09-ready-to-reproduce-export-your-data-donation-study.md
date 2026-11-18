---
title: 'Ready to reproduce: export your data donation study'
date: 2026-11-09
summary: 'Port users running a data donation study on Next can now export the complete study setup as an RO-Crate: one .zip file containing study configuration, consent and info texts, and provenance and license metadata. This makes studies easier to share and reproduce so that your study follows FAIR principles.'
image: /assets/images/news/export-study-crate-card.webp
image_alt: RO-Crate preview of an exported study, listing its name, type, description, publication date and authors.
external_url: ''
layout: page
---

If you run a data donation study with Port on [Next](https://next.eyra.co), you can now export your study setup as an RO-Crate with one click. The export packages everything that participants see, including information pages, consent, instructions, and tasks into a single documentation package. This makes your study easier to archive and reproduce.

## How to export your study

Open your study in Next, click the **⋮** menu at the top right next to **Publish** and choose **Export**. Your browser downloads a .zip file with the name of your study. 

![The study page in Next with the ⋮ menu opened, showing the Export option](/assets/images/news/export-study-menu.webp "Open the ⋮ menu (1) and choose Export (2). The blue button next to it reads Preview or Finish up, depending on whether your study has been live.")

## What's in the package

```plain
my_study/
├── next-metadata.json
├── ro-crate-metadata.json
└── assets/
    ├── logo.png
    ├── privacy-statement.pdf
    └── instruction-step-1-1-1.png
```

- **next-metadata.json** holds the study setup itself: branding (title, subtitle, logo), the About and Helpdesk pages, the consent text, and the workflow: each task in order, such as questionnaires, instruction manuals, documents and the data donation task.
- **assets/** contains the files the setup refers to: your logo, privacy statement, documents and the images in your instruction manuals.
- **ro-crate-metadata.json** describes the package: what it is, who made it, when it was exported, where it came from and under which licence it may be reused

## Why RO-Crate

The package is a research object built on [RO-Crate](https://www.researchobject.org/ro-crate/) (Research Object Crate), an open standard for describing research outputs with structured metadata. Repositories and tools that understand RO-Crate can read who created your study, when it was exported, and where it came from (its provenance) without opening the files.

![An RO-Crate preview page for an example study, listing its name, type, description, publication date and authors](/assets/images/news/export-study-crate.webp "The crate's own description of an exported study, as shown by the standard RO-Crate preview. Example study with placeholder names.")

All of this supports the FAIR principles: Findable, Accessible, Interoperable and Reusable. You can store the export with your data, add it to a repository, or share it with reviewers and colleagues.

## Together with script selector

The setup export captures your study as it runs on Next. The donation flow itself and its codebook come from the [script selector](/software/script-selector/) package. Together the pair provide everything required to run the study again. 

## What's next

We are working on a broader framework for FAIR data donation studies and will share more about it in a future update.

This development was funded by [SSHOC-NL](https://sshoc.nl/).
