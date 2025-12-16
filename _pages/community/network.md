---
layout: single-toc-on-top
classes: wide
title: "Community Networks"
permalink: /community/institutional-network
excerpt: "Learn more about our institutional network and PhD network"
toc: true
sidebar:
  nav: "community"
---

### Institutional Network

The D3I institutional network connects research institutions across Europe that are actively engaged in data donation research. The network facilitates knowledge exchange, collaboration, and the development of best practices in digital data donation methodologies.

The institutional network meets twice yearly to discuss developments in data donation research, share experiences, and coordinate collaborative initiatives.

**Network Members**

<div class = "taxonomy__index">

{% for institution in site.data.institutions %}
  <div class="page__taxonomy-item">
    <h4>{{ institution.institution }}</h4>
    <p><strong>Affiliate:</strong> <a href="{{ institution.affiliate_url }}">{{ institution.affiliate_name }}</a></p>
    <p>{{ institution.department }}</p>
  </div>
{% endfor %}
</div>

<div class="well">
<strong>Get involved?</strong> If your institution is interested in joining the D3I institutional network, please contact <a href="mailto:d.m.mccool@uu.nl">Danielle McCool</a> for more information about membership and collaboration opportunities.</div>


### PhD Network

We also facilitate an informal PhD network for early-career researchers working with data donation, coordinated by our two PhD representatives [Elisabeth Schmidbauer](https://www.sw.lmu.de/ifkw/en/department/news-activities-history/people-at-the-ifkw/contact-page/elisabeth-schmidbauer-2496577c.html) and [Lion Wedel](https://www.weizenbaum-institut.de/en/portrait/p/lion/#page=1&tags=science_publications&sort=date). Through this network, PhDs can exchange experiences, coordinate around conferences, and share questions, ideas, and opportunities in a low-threshold way. 

If you sign up, your contact details will be used to keep you informed and, if you agree, may be shared within the PhD network to support direct peer-to-peer connection. 

<a target="_blank" 
   href="{{ site.phd_network_signup_url }}" 
   style="background-color: #008CBA; color: white; padding: 10px 20px; border: none; border-radius: 5px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 10px; cursor: pointer; transition: background-color 0.3s, transform 0.2s;"
   onmouseover="this.style.backgroundColor='#005F8E'"
   onmouseout="this.style.backgroundColor='#008CBA'"
   onmousedown="this.style.transform='scale(0.95)'"
   onmouseup="this.style.transform='scale(1)'">
    Subscribe here!
</a>
