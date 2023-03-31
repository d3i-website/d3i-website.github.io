---
layout: single
classes: wide
title: About
permalink: /about/
toc: false
---

## What is data donation?

Data donation is a method for data collection. It allows a researcher to collect digital trace data, by asking their participants to request and share their Data Download Packages (DDPs).

## Why use data donation?

In our everyday lives, we leave more and more digital traces behind. Whether we like a post on Instagram, or send a message on WhatsApp. Even when we check-in at a public transportation, or when we do a bank transaction, we leave behind a digital trace. The promise of digital humanities and computational social science has been that researchers can utilize these digital traces to study human behavior and interaction at an unprecendented level of detail.

However, while the amount of digital trace data increases, most are closed off in proprietary archives of commercial corporations, with only a subset being available to a small set of elite researchers at a platform's discretion, through initiatives such as Social Science One, or through increasingly restricted and opaque APIs.

An alternative approach to gain access to digital traces is enabled thanks to the European Union's General Data Protection Regulations (GDPR) right to data access and data portability. Thanks to this legislation, all data processing entities are required to provide citizens a digital copy of their personal data upon request, which typically come in the form of .zip files to which we refer as *Data Download Packages* (DDPs).

## How does data donation work?

Data donation allows researchers to invite participants to share their DDPs. A major challenge is however that DDPs potentially contain very sensitive data, and often not all data is needed to answer the specific research question under investigation. To circumvent these challenges, an alternative framework was developed: First, the research participant requests their personal DDP at the platform of interest. Second, they download it onto their own personal device. Third, by means of local processing, only the features of interest to the researcher are extracted from that DDP. Fourth, the participant inspects the extracted features after which they can consent (or decline) to donate. Only after providing this consent, the donated data is sent to a server which can be accessed by the researcher for further analyses.

![Figure 1: An overview of the data donation workflow](/assets/images/about/figure_workflow.jpg)

## PORT: Software for data donation

To allow for the local processing step to take place, we developed the software PORT. PORT is open-source and allows for researchers to fully configure their own data donation study. It creates a website that guides participants through the data donation steps. Researchers can tailor this website to their own DDPs of interest and process these in their desired ways. We have both a free open-source version available that you can configure yourself, or you can use our SURF configuration. Please see PORT for more details. 

## The D3I Project

D3I is a project funded by PDI-SSH. PDI-SSH is responsible for allocating resources to digital infrastructure facilities within the SSH domain, for coordinating digital infrastructures in the SSH domain and for strategy within that domain. For more information, see [their website](https://pdi-ssh.nl/en/). The D3I project runs from March 2022 to February 2025 and primarily aims to make data donation available to all social science and humanities researchers in the Netherlands.




