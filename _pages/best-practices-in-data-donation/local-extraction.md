---
layout: single-toc-on-top
classes: wide
title:  Local extraction
permalink: /best-practices-in-data-donation/local-extraction
toc: true
sidebar:
  nav: "best-practices-in-data-donation"
---

# Script preparations

In the local extraction step of the workflow, a feature extraction script is used to locally extract and process the targeted data from the selected DDP. When explaining challenges occuring in preparing an extraction script, we make use of Python script illustrations, since extraction scripts using Port so far have made use of Python. However, note that these challenges raised apply to any other programming language as well. The extraction script is usually not built by the principal researcher, as they might not be familiar with programming. In this section, we assume the script is built by the domain expert, the research engineer. The process of arriving at a robust extraction script is summarized in Figure 8. This process commences with deciding on the set of functionalities that the extraction script needs to have, as well as with acquainting the targeted DDPs (section 5.1). These actions form the groundwork for building the script. Based on this collected knowledge, a draft script is built (5.2). This script consists of four major elements:

1. Reading in the DDPs.
2. Extraction and processing of targeted data.
3. Interactive script elements.
4. Output presentation. 
While building the draft script, different forms of diversity and volatility in DDPs should be taken into account (section 5.3). When accounting for this volatility, the full script should be tested properly while being built. After proper testing and once volatility in DDPs is accounted for, the final robust extraction script is attained.

## Script preparations

The preparations for building the extraction script comprises of deciding on the functionalities of the script and acquainting the concerned DDPs. Based on the research purpose and selected DDPs (section 3), the desired functionalities of the extraction script are outlined. For example, these functionalities could be what data should be extracted from a DDP and in what format this data should be returned. If no clear research purpose is defined, deciding on the required script functionalities can become an intricate exercise and more iterations between researcher and research engineer are required.

Acquainting the DDPs of interest occurs simultaneously to deciding the script functionalities. The structure of the DDPs, as well as locations of target data should be studied by the person writing the script. For example, in the illustrative study on inferred interests of platform users (RQ 2), for each type of DDP it should be identified in what file the inferred interests are stored, and if they might be present in different forms or multiple files. If not all data related to the target construct are identified, or if data are selected that do not comprise the construct, validity of the data might decrease. Once script functionalities and relevant data points are identified, a draft script can be constructed.

**Figure 8**

![Figure 8: Construction of the feature extraction script](/assets/images/about/participant_flow_v4.png)

Construction of the feature extraction script

# The extraction script

The extraction script starts with reading in the DDP and selecting the files that will be processed. The script should be built so that different file types can be imported. DDPs can consist of a wide variety of files, such as .txt-files, .JSON-files, .HTML-files, and .jpg-files. The file type of the target data can differ over DDPs. For example, when requesting a Facebook DDP, a choice can be made between .JSON-files and .HTML-files. Therefore, the script should ideally be able to handle different file types. Although the aim is to build a robust script regarding file types, it should be specified how the script deals with unforeseen file types or incorrect files. These specifications are called exception handling. Good practices for exception handling are including logs, alerting participants, and making sure the exceptions do not result in errors aborting the entire script. Although discussed here for reading in DDPs, exception handling should be considered for all script elements.

Once the DDP is read in correctly, the extraction script continues with extracting and processing the targeted data. The level of processing differs per data donation study, and can range from no processing at all to advanced algorithms that process the data. For example, in the social media inferred interest study (RQ 2), no processing of the targeted data occurred, and the extracted data formed the direct output data. Contrarily, in the GSLH study (RQ 1) and the WhatsApp study (RQ 3), targeted data were processed to summary statistics as the output. An example of processing with an algorithm could be a study where a person’s mood is inferred from pictures on social media, where solely a mood state is presented as the output.

In data donation studies where the processing makes use of algorithms or prediction models, performance of these algorithms should be taken into account. Algorithms and prediction models are seldom perfect and error can occur in their processing of the targeted data. Although this error might be hard to account for, thorough evaluation of used algorithms should take place to minimize the influence of their potential inaccuracy.

While the script is extracting and processing the targeted data, feedback should be provided to participants. Extraction and processing can take up high amounts of time when for example complex algorithms are used or when large amount of data need to be processed. When these times get higher than anticipated by participants, participants might quit the process, assuming that a problem was encountered. To prevent this from happening, it needs to be ensured that expectations about the extraction time are communicated clearly, either in instructions prior to extraction, or by feedback provided by the extraction script.

Potentially, local interaction between the participant and the script helps the researcher to extract the required data while preserving the privacy of the participants. In such a case, an interactive script element can be used. Interactive script elements are steps in the processing in which input of the participant is required. For example, in the WhatsApp data donation study (RQ 3), participants had to indicate their name from a list of all users present in the chat file. This way, distinction could be made between the data on the participant and data on other chat users. The names present in the chat were not saved to preserve privacy, but the indication of what data belonged to the participant grants information that could not be obtained without the input of the participant.

The final part of the extraction script summarizes the extracted data and transforms these to the output that is presented to the participant. The presentation differs based on the data extracted. The data can be clear and summarily, or can become a long, potentially obscure list. Optionally, it can be decided that the participant can edit or delete part of the output presented. For example, in the inferred interests study (RQ 2), participants could delete individual data points from the list of extracted interests. In the data donation studies we conducted so far, output presentation always had the form of tabular data. Potentially, other forms of output presentation could improve participant-experiences, such as visualizations with the aim of providing participants insights about themselves (Gomez Ortega et al., 2021; Li, 2021). It can be desirable to consult the IT expert to check if all ideas for the output presentation are feasible for the software used.


# Acounting for DDP volatility and testing the script

While building the extraction script, attention should be paid to making the script robust. In order to attain this, the research engineer should code the script as generic as possible. DDPs show volatility in their structure and content, which should be accounted for in the extraction script. This volatility shows in several ways. First, the type of device can lead to variation in DDPs of the same platform. For example, in the WhatsApp example study it was found that DDPs of iPhones (Apple devices) and DDPs of phones with an Android operational system differed in the way some data was present, such as timestamps and references to media files. Second, DDPs of a platform might become different when the language of the device where the DDP is requested differ. In the example study on inferred interests, the research engineer encountered that ‘key labels’ in the JSON structures of the DDPs differed when the DDP changed in language. Similarly, in the WhatsApp example study, WhatsApp DDPs changed in terminology used when the DDP was requested under different language settings. Third, structures and content of DDPs can also change over time. For example, when the platform adds new features or has a new update, the DDP can also change. This happened in the WhatsApp study during the period of data collection. The script was no longer able to handle the updated structure and data extraction failed for part of the participants.

Once the full draft extraction script has been constructed and accounts for diversity in DDPs, the script should be tested extensively. It is important to include as many different DDPs as possible in this testing, to map the potential presence of volatility. Variation in test DDPs could be achieved by actively reaching out to people that use the targeted platform in varying ways. Variations in language, devices, and settings are necessary to include in the testing procedure to get maximum value out of the testing. These variations need to be representative for the variation that will be present in the study population. In order to test systematically, good logging systems, as described in section 5.2, can provide concrete results and indications on script elements that need adjustments. Testing and adjusting or improving the script form a simultaneous and iterative process that should ultimately lead to a final robust script.
