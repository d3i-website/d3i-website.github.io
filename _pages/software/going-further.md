---
layout: software-page
classes: wide
title: "Going further"
permalink: /software/going-further/
toc: false
sidebar:
  nav: "software"
redirect_from:
  - /software/visualizations/
  - /software/plugins/
  - /software/data-donation-task/
  - /software/technical-resources/
contact:
  lead: "Have a question or want to discuss your study?"
  intro: "We can answer your questions about:"
  bullets:
    - "Adding visualizations to engage participants"
    - "Building custom interactive features"
    - "Creating a Data Donation Task from scratch"
  email: DataDonation@uu.nl
  subject: "Question about extending the data donation software"
---

The ready-made scripts cover the basics, but you can do quite a bit more once you've got the foundation in place. The features below give you ways to make a study richer, more interactive, or more transparent for participants — and at the end of the page, pointers for going all the way to building your own.

## Visualizations

Show participants what they're about to share. Word clouds of their messages, timelines of their activity, charts of their viewing habits — anything that helps them see and understand their own data before they decide to donate it.

Visualizations make the donation experience more engaging and the consent decision more informed. Participants who can *see* their data feel more in control of what they're sharing, which is often reflected in higher completion rates and richer qualitative feedback.

## Interactive features

Two built-in interactive capabilities are commonly useful:

**Questionnaires that respond to donated data.** Ask participants questions tied directly to the data they're about to share — for example, showing them their most-watched Netflix shows and asking why they enjoy them, or surfacing specific Facebook groups and asking how they joined. This produces qualitative context that's hard to get any other way.

**Multiple file uploads.** Some studies need more than one file from a participant — different time periods, multiple group chats, related platforms. The interface walks them through it without confusion.

## Custom development

If the ready-made scripts and built-in features don't cover what you need, you can build your own data donation task from scratch. This requires some Python and a willingness to read documentation, but the platform is designed to be extended.

The full developer documentation lives on the project's documentation site:

**[Data donation task documentation →](https://d3i-infra.github.io/data-donation-task/)**

It covers setting up a development environment, writing extraction scripts, adding custom visualizations, testing, and deployment. The source code is on [GitHub](https://github.com/d3i-infra/data-donation-task) if you want to dig into the internals or contribute back.
