---
layout: single-toc-on-top
classes: wide
title: "Our Software"
permalink: /software/
toc: false
sidebar:
  nav: "software"
---

<div class="notice--info">
  <h4>If you use our software for your research, please cite:</h4>
  <p> Boeschoten, L., De Schipper, N.C., Mendrik, A.M., Van der Veen, E., 
  Struminskaya, B., Janssen, H. and Araujo, T. (2023). Port: A software tool for 
  digital data donation. Journal of Open Source Software, 8(90), 5596, 
  <a href="https://doi.org/10.21105/joss.05596">https://doi.org/10.21105/joss.05596</a></p>
</div>


## Run a Data Donation Study with Port

Port is open-source software that helps researchers collect donated digital data from participants in a transparent, privacy-friendly way. It guides participants step by step through downloading their platform data and donating selected parts for research.

You don’t need to build technical infrastructure from scratch. Port provides ready-made components that let you focus on your research questions — whether you’re studying social media use, streaming behavior, messaging patterns, or emerging platforms.

### How Researchers Use Port

Researchers use Port in different ways, depending on their experience and goals:

- **New to data donation?** Start with a high-level overview and simple setup options  
- **Looking for a specific platform?** Download a ready-made script and get started quickly  
- **Want richer data or engagement?** Add visualizations and interactive features  
- **Building something custom?** Dive into technical resources and source code  

### Explore the Software

Choose where to start below — you can always come back and explore more as your study develops.

{% comment %}Get the children from the first item (Software Overview){% endcomment %}
{% assign software_overview = site.data.navigation.software | first %}
{% assign software_children = software_overview.children %}


<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin: 20px 0;">
{% for nav_item in software_children %}
  {% assign target_url = nav_item.url %}
  {% assign page_match = site.pages | where: "url", target_url | first %}
  {% assign cta = nav_item.cta | default: "Learn More →" %}


  <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #008cba;">
    <h3 style="margin-top: 0;">{{ nav_item.title }}</h3>

    {% if page_match and page_match.excerpt %}
      <p>{{ page_match.excerpt | strip_html | truncatewords: 30 }}</p>
    {% elsif page_match %}
      <p>{{ page_match.content | strip_html | truncatewords: 30 }}</p>
    {% endif %}
	<a href="{{ nav_item.url | relative_url }}" >{{ cta }}</a>
  </div>
{% endfor %}
</div>


For questions or support, please reach out through our [help page](/software/help/).