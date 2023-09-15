---
layout: single
title:  Local extraction
permalink: /best-practices-in-data-donation/local-extraction/script-preparations
toc: false
sidebar:
  nav: "best-practices-in-data-donation"
---

In the local extraction step of the workflow, a feature extraction script is used to locally extract and process the targeted data from the selected DDP. When explaining challenges occuring in preparing an extraction script, we make use of Python script illustrations, since extraction scripts using PORT so far have made use of Python. However, note that these challenges raised apply to any other programming language as well. The extraction script is usually not built by the principal researcher, as they might not be familiar with programming. In this section, we assume the script is built by the domain expert, the research engineer. The process of arriving at a robust extraction script is summarized in Figure 8. This process commences with deciding on the set of functionalities that the extraction script needs to have, as well as with acquainting the targeted DDPs (section 5.1). These actions form the groundwork for building the script. Based on this collected knowledge, a draft script is built (5.2). This script consists of four major elements:
1. Reading in the DDPs.
2. Extraction and processing of targeted data.
3. Interactive script elements.
4. Output presentation. 
While building the draft script, different forms of diversity and volatility in DDPs should be taken into account (section 5.3). When accounting for this volatility, the full script should be tested properly while being built. After proper testing and once volatility in DDPs is accounted for, the final robust extraction script is attained.

## Script preparations
The preparations for building the extraction script comprises of deciding on the functionalities of the script and acquainting the concerned DDPs. Based on the research purpose and selected DDPs (section 3), the desired functionalities of the extraction script are outlined. For example, these functionalities could be what data should be extracted from a DDP and in what format this data should be returned. If no clear research purpose is defined, deciding on the required script functionalities can become an intricate exercise and more iterations between researcher and research engineer are required.

Acquainting the DDPs of interest occurs simultaneously to deciding the script functionalities. The structure of the DDPs, as well as locations of target data should be studied by the person writing the script. For example, in the illustrative study on inferred interests of platform users (RQ 2), for each type of DDP it should be identified in what file the inferred interests are stored, and if they might be present in different forms or multiple files. If not all data related to the target construct are identified, or if data are selected that do not comprise the construct, validity of the data might decrease. Once script functionalities and relevant data points are identified, a draft script can be constructed.

## Figure 8:
![Figure 8: Construction of the feature extraction script](/assets/images/about/participant_flow_v4.png)

Construction of the feature extraction script