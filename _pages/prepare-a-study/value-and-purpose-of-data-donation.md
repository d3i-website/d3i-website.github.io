---
layout: single-toc-on-top
classes: wide
title: Value and purpose of data donation
permalink: /prepare-a-study/value-and-purpose-of-data-donation
toc: true
sidebar:
  nav: "prepare-a-study"
---

# Introduction

 When considering using data donation to collect digital trace data for your research, carefully think about what the exact purpose and added value is of using data donation here. Defining such a purpose is mandated by the GDPR for processing any personal data (Hoofnagle et al., 2019). It helps to make more specific how you plan to use data donation exactly:

1. Operationalize your constructs.
2. Identify candidate platforms.
3. Evaluate how to measure constructs per platform.
4. Evaluate how to use your chosen platform(s). 
5. Map the limitations of the chosen platform(s). 


# 1. Operationalize your constructs

Determine which constructs you are planning to measure through data donation, and how you want to measure them. Also consider other potential aspects, such as time restrictions or the population of interest. 

To illustrate, for the construct "Travel behavior" in [RQ1](/prepare-a-study/workflow#Illustrative-research-questions/).

[RQ1](/prepare-a-study/workflow#illustrative-research-questions/), being able to distinguish various modes of travel is important, being able to measure travel behavior over time is important, and it is important that data is donated from a commonly used platform, since it is of interest to generalize with respect to the Dutch population. Sometimes, constructs are already specific by their own definition. An example of such a construct is "Inferred interests by social media platforms" in [RQ2](/prepare-a-study/workflow#illustrative-research-questions/). 

# 2. Identify candidate platforms

The next step is to determine the platform of which the data can bring the most value for your study. We advise to explore a wide range of platforms connected to the research topic, as well as on the population of users. Platform usage can substantially differ over demographic groups. Studies on platform usage can help here (see e.g. Hoekstra et al., 2022), but be aware that usage can also rapidly change.

Also note that as a researcher you are interested in the content of the Data Download Package (DDP), so do not only explore the platforms, but also perform a data access request and download your own DDP to get a good understanding of what data can be found here. You can even make new or fake profiles for this purpose only! 

# 3. Evaluate how to measure constructs per platform

Once an overview of candidate platforms is created, evaluate how well each platform matches the defined constructs and the research question. You can decide to continue with a single platform, but if multiple platforms are equally suited or can supplement each other, you can also decide to perform a data donation study using multiple platforms. Do note that this also doubles the amount of work for your participants.

# 4. Evaluate how to use your chosen platform(s) 

Once a suitable platform is selected, determine what data from its DDP you will exactly need to measure your constructs. In some cases, you can measure your constructs directly in the DDP and no further processing is required. This is for example the case for the construct **Inferred interests by social media platforms** in [RQ2](/prepare-a-study/workflow#illustrative-research-questions/). Alternatively, to measure a construct such as **Travel behavior** in [RQ1](/prepare-a-study/workflow#illustrative-research-questions/) requires substantial processing of the data found in the DDP. Now is a good time to map out exactly those processing steps. 

A challenge is that platforms do not always fully adhere to the GDPR (Müller et al., 2019; Sørum & Presthus, 2020). This can result in data occasionally not being present in a DDP while one would expect this data to be there. Therefore, we advise to always carefully check if theoretical measurements are actually present in the DDPs. To illustrate, for the construct **Who responds most to someone** in [RQ3](/prepare-a-study/workflow/#illustrative-research-questions), we ideally want to count the number of times a participant used the quote function in WhatsApp. However, this is not provided by WhatsApp (see Figure 2 below).

# 5. Map limitations of choice

Finally, map the potential limitations of the DDPs of the chosen platforms. Common limitations are: 
   - Conditions under which a platform does not collect data.
   - Platform features on which no data is present in the DDPs.
   - The presence of potentially incorrect logs or measurements in the DDPs. 
You cannot always prevent these limitations from being there, but by being aware of their presence you can at least design your study in such a way that you can take them into account. 

You now have the basis for your data donation study, and can continue with: 
  - [Designing the study](/prepare-a-study/study-design/)
  - [Developing the data extraction script]().
  - [Configuration of the data donation software]().  

These steps have all been worked out for the example research questions in the paper by Carrière et al. (2023). 

**Figure 2**
<figure>
  <img src="/assets/images/about/WhatsApp_quoting_figure_v2.png" alt="Alt Text">
  <figcaption>Illustration of the WhatsApp functionality to quote other user’s messages, and how data on this functionality cannot be found in the WhatsApp DDPs.</figcaption>
</figure>
