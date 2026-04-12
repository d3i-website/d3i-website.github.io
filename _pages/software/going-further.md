---
layout: page
classes: wide
title: "Going further"
permalink: /software/going-further/
toc: false
sidebar:
  nav: "software"
hero:
  image: /assets/images/hub/data-trends.svg
  alt: "A person reviewing a dashboard of charts and data trends."
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

The ready-made scripts cover the basics, but you can do quite a bit more once you've got the foundation in place. The features below give you ways to make a study richer, more interactive, or more transparent for participants.

## Visualizations

Show participants what they're about to share. Word clouds of their most-played titles, area graphs of their viewing volume over time, timelines of their messaging activity. Visuals turn an abstract spreadsheet into something a participant can actually recognize as theirs.

Visualizations make the donation experience more engaging and the consent decision more informed. Participants who can *see* their data feel more in control of what they're sharing, which is often reflected in higher completion rates and richer qualitative feedback.

Two examples from a Netflix donation flow:

{% include figure
   image_path="/assets/images/visualization_wordcloud.png"
   alt="A Netflix ratings table above a wordcloud of the participant's most-watched titles."
   caption="A wordcloud surfaces the participant's most-played titles directly from their viewing history."
   class="section-figure" %}

{% include figure
   image_path="/assets/images/visualization_area.png"
   alt="A Netflix viewing log table above an area chart of total hours watched per month."
   caption="An area graph shows how the participant's viewing volume rises and falls across years of watching."
   class="section-figure" %}

## Interactive features

**Questionnaires that respond to donated data.** Ask participants questions tied directly to the data they're about to share. For example, you can show them their most-watched Netflix shows and ask why they enjoy them, or surface specific Facebook groups and ask how they joined. This produces qualitative context that's hard to get any other way.

{% include figure
   image_path="/assets/images/questionnaire.png"
   alt="A questionnaire shown to participants during the donation flow, with multiple question types and a Continue button."
   caption="Questions appear inline during the donation flow, so participants can answer them right next to the data they're about to share."
   class="section-figure" %}

**Multiple file uploads.** Some studies need more than one file from a participant: different time periods, multiple group chats, related platforms. The interface walks them through it without confusion.

## Custom development

If the ready-made scripts and built-in features don't cover what you need, you can build your own data donation task from scratch. This requires some Python and a willingness to read documentation, but the platform is designed to be extended.

The full developer documentation lives on the project's documentation site:

**[Data donation task documentation →](https://d3i-infra.github.io/data-donation-task/)**

It covers setting up a development environment, writing extraction scripts, adding custom visualizations, testing, and deployment. The source code is on [GitHub](https://github.com/d3i-infra/data-donation-task) if you want to dig into the internals or contribute back.
