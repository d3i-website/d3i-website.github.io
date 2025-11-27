---
layout: single-toc-on-top
classes: wide
title: "Community"
permalink: /community/
toc: false
sidebar:
  nav: "community"
---

<div style="background-color: #d9534f; color: white; padding: 25px; border-radius: 8px; margin-bottom: 40px; border: 3px solid #c9302c;">
  <h2 style="color: white; margin-top: 0;">⚠️ Urgent Action Needed</h2>
  <p style="font-size: 1.2em; margin: 15px 0;"><strong>Data donation research is under threat from a proposed EU GDPR amendment.</strong></p>
  <p style="margin: 15px 0;">Join researchers across Europe in protecting this crucial method for independent platform research. The letter will be sent to the European Commission on <strong>December 15, 2025</strong>.</p>
  <a href="/community/open-letter" style="background-color: white; color: #d9534f; padding: 12px 24px; border-radius: 5px; text-decoration: none; display: inline-block; font-weight: bold; margin-top: 10px;">Learn More & Sign the Letter →</a>
</div>

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

{% assign community_nav = site.data.navigation.community | where_exp: "item", "item.url != '/community/'" %}

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin: 20px 0;">
{% for nav_item in community_nav %}
  {% assign page = site.pages | where: "url", nav_item.url | first %}
    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #008cba;">

      <h3 style="margin-top: 0;">{{ page.title }}</h3>
      {% if page.excerpt %}
        <p>{{ page.excerpt | strip_html | truncatewords: 30 }}</p>
      {% elsif page %}
        <p>{{ page.content | strip_html | truncatewords:30 }}</p>
      {% endif %}
      <a href="{{ nav_item.url }}" style="background-color: #008cba; color: white; padding: 8px 16px; border-radius: 5px; text-decoration: none; display: inline-block; margin-top: 10px;">Learn More</a>
    </div>

{% endfor %}
</div>

For questions or to get involved, please reach out to our [team members](/about-the-project/team).


