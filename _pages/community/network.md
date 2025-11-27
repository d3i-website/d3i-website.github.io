---
layout: single-toc-on-top
classes: wide
title: "Institutional Network"
permalink: /community/institutional-network
toc: false
sidebar:
  nav: "community"
---

The D3I institutional network connects research institutions across Europe that are actively engaged in data donation research. The network facilitates knowledge exchange, collaboration, and the development of best practices in digital data donation methodologies.


### Network Members

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 25px; margin: 30px 0;">

{% for institution in site.data.institutions %}
  <div style="background-color: #f8f9fa; padding: 25px; border-radius: 8px; border-left: 4px solid #008CBA;">
    <h4 style="margin-top: 0;">{{ institution.institution }}</h4>
    <p><strong>Affiliate:</strong> <a href="{{ institution.affiliate_url }}">{{ institution.affiliate_name }}</a></p>
    <p style="color: #666; font-size: 0.9em;">{{ institution.department }}</p>
  </div>
{% endfor %}

</div>

### Get Involved

If your institution is interested in joining the D3I institutional network, please contact [Danielle McCool](mailto:d.m.mccool@uu.nl) for more information about membership and collaboration opportunities.

---

*The institutional network meets yearly discuss developments in data donation research, share experiences, and coordinate collaborative initiatives.*

