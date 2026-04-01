---
layout: single-toc-on-top
classes: wide
title: "Getting Started with Port"
permalink: /software/getting-started/
excerpt: Learn what Port does, how participants donate data, and which hosting option fits your situation. No technical background required.
toc: true
sidebar:
  nav: "software"
redirect_from:
  - /software/port/
  - /software/next/
---

> This page explains **how to access Port and what it does**, not how to code or configure scripts.

## What is Port?

Port is our open-source software for data donation studies. It creates a secure website that guides participants through donating their digital data -- from platforms like Instagram, Netflix, or WhatsApp -- while keeping their privacy protected.

### How Port Works

Port follows a simple, privacy-first workflow:

<figure style="width: 350px" class="align-right">
  <figcaption>Optional: technical architecture overview</figcaption>
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/port.svg" alt="Optional system architecture diagram for Port. Click to enlarge.">
</figure> 

<ol>
  <li><strong>Participants request their data</strong> from the platform (Instagram, Netflix, etc.).</li>
  <li><strong>They download it</strong> to their own device.</li>
  <li><strong>Port processes the data locally</strong>, extracting only what’s needed.</li>
  <li><strong>Participants review</strong> what will be shared.</li>
  <li><strong>They consent and donate</strong> the extracted data for your research.</li>
</ol>


This means participants stay in control, and sensitive information never leaves their device unless they choose to share it.

## What You Can Set Up in Port

Port allows you to configure everything you need for a complete data donation study:

- **Consent forms** -- Ready-to-use templates or create your own
- **Privacy statements** -- Clear explanations of data handling
- **Participant instructions** -- Step-by-step guides for requesting and downloading data
- **Questionnaires** -- Collect additional context from participants
- **Data donation task** -- The core process that extracts and processes donated files

## Choose Your Platforms

We provide ready-made scripts for the most popular platforms. These handle all the technical details of extracting data from each platform's format:

| Platform | What You Can Collect |
|----------|---------------------|
| Instagram | Posts, comments, followers, activity |
| TikTok | Videos, likes, viewing history |
| Netflix | Viewing history, ratings |
| WhatsApp | Group chat messages |
| Facebook | Posts, photos, connections |
| YouTube | Watch history, searches, subscriptions |
| ChatGPT | Conversation history |
| LinkedIn | Profile, connections, activity |
| X (Twitter) | Tweets, likes, followers |

See the full list and download scripts on our [ready-made scripts page](/software/ready-made-scripts/).

## How to Access Port

Port runs on the open-source Next platform. There are three ways to get access:

### Option 1: Software-as-a-Service (Easiest)
Purchase a license from [Eyra](https://www.eyra.co/projects/data-donation) for a fully managed solution. They handle hosting, maintenance, and technical support.

**Best for:** Researchers who want to focus on their study, not infrastructure.

### Option 2: SURF Research Cloud (For Dutch Researchers)
Use Port on SURF Research Cloud through a [SURF e-infra grant](https://www.surf.nl/en/access-to-compute-services).

**Best for:** Dutch academic researchers with existing SURF access.

### Option 3: Self-Hosting (Most Flexible)
Host Port yourself on your own infrastructure. Full technical documentation is available.

**Best for:** Teams with technical expertise who need complete control.

### Decision Tree

<div style="text-align: center; width: 100%; margin: 20px auto;">
  <div class="svg-container"> 
    <img src="/assets/images/beslisboom.svg" alt="Decision tree for choosing Port hosting option"> 
  </div>
</div>

## Extend Port with Advanced Features

Once you have the basics set up, you can enhance your study with:

### Visualizations
Show participants visual representations of their data (word clouds, graphs, timelines). This helps them understand what they're sharing and makes the experience more engaging.

[Learn about visualizations &rarr;](/software/visualizations/)

### Interactive Plugins
Add questionnaires that respond to donated data, or allow participants to upload multiple files. These plugins create more dynamic, personalized experiences.

[Explore plugins &rarr;](/software/plugins/)

### Custom Extraction Scripts
Need to work with a platform we don't support yet? You can create your own extraction scripts. Our documentation walks you through the process.

[View technical documentation &rarr;](https://d3i-infra.github.io/data-donation-task/)

## What Do You Want to Do Next?

- **Collect data from a platform** → Ready-Made Scripts  
- **Enhance participant experience** → Visualizations or Interactive Features  
- **Customize or develop** → Technical Resources  
- **Need support** → Help page

## Need Help?

We're here to support you:

- Help getting access to Port
- Custom script development
- Technical support and training
- Community of researchers and developers

[Get in touch &rarr;](/software/help/)

## Port in Practice

Want to see how others have used Port? Check out our [completed projects](/prepare-a-study/completed-projects/) to see real examples of data donation studies across different platforms and research questions.

Or visit our [usage report](/software/usage/) to see statistics on Port adoption and platform coverage.