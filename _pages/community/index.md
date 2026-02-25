---
layout: single-toc-on-top
classes: wide
title: "Community"
permalink: /community/
toc: false
sidebar:
  nav: "community"
---

## Join the Data Donation Community

Welcome to the data donation community! We bring together researchers, methodologists, legal experts, and practitioners interested in using digital trace data for scientific research.

### Get Involved

Whether you're new to data donation or an experienced researcher, there are many ways to engage with our community:

- **Join the institutional network** to join our international collaboration
- **Attend our courses** to learn best practices and technical skills
- **Attend symposia** to network and share research findings
- **Subscribe to our newsletter** for regular updates 
- **Contact our team** if you need support with your data donation study

### Explore Our Community Resources

{% comment %}Get the children from the first item (Community Overview){% endcomment %}
{% assign community_overview = site.data.navigation.community | first %}
{% assign community_children = community_overview.children %}

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin: 20px 0;">
{% for nav_item in community_children %}
  {% assign page = site.pages | where: "url", nav_item.url | first %}
  <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #008cba;">
    <h3 style="margin-top: 0;">{{ nav_item.title }}</h3>
    {% if page.excerpt %}
      <p>{{ page.excerpt | strip_html | truncatewords: 30 }}</p>
    {% elsif page %}
      <p>{{ page.content | strip_html | truncatewords: 30 }}</p>
    {% endif %}
    <a href="{{ nav_item.url }}" style="background-color: #008cba; color: white; padding: 8px 16px; border-radius: 5px; text-decoration: none; display: inline-block; margin-top: 10px;">Learn More →</a>
  </div>
{% endfor %}
</div>

For questions or to get involved, please reach out to our [team members](/about-the-project/team).

### Position on the GDPR Omnibus Proposal

<div style="background-color: #f0f8ff; padding: 16px 20px; border-radius: 8px; border-left: 4px solid #008cba; margin-top: 10px;">
  <p style="margin: 0;">The European Omnibus Act poses a direct risk to fundamental human rights and to data donation as a research method. Read our letter (<a href="/community/omnibus-letter">EN</a>/<a href="/community/omnibus-letter-nl">NL</a>) about our position and use it to call your government to vote against this.</p>
</div>


