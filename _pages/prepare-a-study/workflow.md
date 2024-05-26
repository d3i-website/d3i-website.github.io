---
layout: single-toc-on-top
classes: wide
title: Workflow
permalink: /prepare-a-study/workflow
toc: true
sidebar:
  nav: "prepare-a-study"
---

## Introduction

<div class="notice--warning">
  <h4>The following text is a summary of the paper published by Carrière et al., (2023). <br>
  In case you make use of this, please cite:</h4>
  <p> Carrière, T. C., Boeschoten, L., Struminskaya, B., Janssen, H., de Schipper, N. C., & Araujo, T. (2023, October 13). Best practices in data donation: A workflow for studies using digital data donation. <a href="https://doi.org/10.31219/osf.io/3vhbj">https://doi.org/10.31219/osf.io/3vhbj</a></p>
</div>


The workflow we designed for data donation studies is shown in Figure 1. In this section, we first provide a brief overview of the proposed workflow. Next, different domains of expertise are identified for the workflow. At last, illustrative research questions are introduced to guide the more detailed discussion of the workflow in the following sections.

A data donation study starts with a research idea or topic where data donation is considered to be of added value. This research idea becomes more specific by identifying DDPs of relevant platforms and operationalizing how constructs of interest can be measured from those. Then, the workflow continues with (simultaneously) preparing the three core elements of the data donation study:

1. The study design.
2. The feature extraction script.
3. Configuration of the data donation tool.

Next, the study can be submitted to an ethical review boar (ERB). After approval of the ERB, it is advised to conduct a pilot study prior to starting the full data donation study, such that all study elements can be tested and improved accordingly.

**Figure 1**
<figure>
  <img src="/assets/images/about/full_flow_try3.png" alt="Alt Text">
  <figcaption>Full workflow for data donation studies. Different colors refer to the different domain experts involved. The block color indicate the primary domain expert required for this element. Colored circles indicate potential consultants. Parts with an outlined border are explained in more detail in subsequent figures and paragraphs.</figcaption>
</figure>

## Domain experts

In order to successfully prepare a data donation study, unique knowledge and expertise from several
different domains are required. We identified five domains of expertise deemed relevant for data
donation studies, represented by different roles:

1. An applied researcher with a substantive research question to be answered using data donation
is involved in all steps. They carry primary responsibility for the study.
2. An expert in the field of methodology can help to design the study in such a way that potential
bias in outcomes as a result of the study design are minimized.
3. A research engineer can develop the script that extract relevant features from the DDPs of
interest.
4. An IT expert can configure the server which hosts the study and data storage.
5. An expert on legal, privacy and ethical issues can be consulted at various steps of the study
workflow to ensure legal and ethical standards are met.
In Figure 1, it is summarized what domain experts are involved in each step of the workflow.


## Illustrative research questions {#illustrative-research-questions}

To illustrate the workflow and possible challenges that can arise at each step, three example research questions that can be answered with the use of data donation are used. These research questions vary in their level of processing of the extracted data prior to donation. The first research question is based on the study by Struminskaya (2022). Struminskaya et al. investigated data donation in a Dutch non-probability panel, concerning travel data. Data on the number of kilometers and hours traveled was extracted from Google Semantic Location History (GSLH) DDPs and processed to aggregate statistics, using Port. The illustrative research question based on this study is the following:

*RQ1: Did travel behaviour in the Dutch population change during Covid-19?* 

The second example research question is based on a study by Theo Araujo, investigating algorithmic profiling by social media platforms using a first iteration of D3I. The study extracted the inferred interest of participants as raw data from DDPs. The research question following from this example
is:

*RQ2: What interests do social media platforms infer from their users, and how do
these differ over platforms?* 

The last example research question is based on the data donation study by Corten et al. (2022),
studying behaviour of participants ofWhatsApp groups. The study extracted data from two different
WhatsApp DDPs, and used the local processing of Port to aggregate these data. This last research
question is:

*RQ3: What are the social network structures in group chats?* 
