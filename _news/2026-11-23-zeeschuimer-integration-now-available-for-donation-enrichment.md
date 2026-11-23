---
title: Zeeschuimer integration now available for donation enrichment
date: 2026-11-23
summary: A participant's TikTok donated watch history lists only the videos a participant watched. D3I now integrates with Zeeschuimer and the 4CAT suite to provide a way for these data to be enriched with the comments these videos had. DDP Comments is a secured workspace on SURF Research Cloud where your own collectors gather those comments, starting from the donated video IDs, and store them on your own local backend.
image: /assets/images/news/ddp-comments-card.webp
image_alt: Screenshot of the TikTok comment capture desk with hidden video and donation queue open to the side
external_url: ''
layout: page
---

A donated TikTok history tells you which videos a participant watched, liked or commented on, but it doesn't contain exposure information about what was in the videos or the comments attached to them. DDP Comments is a tool that provides a straightforward way to integrate data donation studies with [Zeeschuimer](https://github.com/digitalmethodsinitiative/zeeschuimer) for comment collection that starts from the video IDs in the donations.

DDP Comments can be started as a workspace on SURF Research Cloud and integrates with the Surf SRAM Collaboration system for access. Your own collectors, for example student assistants, sign in with their institutional account and work through a shared list of videos, in a browser that runs on the workspace. What they collect goes to a local instance of [4CAT](https://4cat.nl/), where you can then combine and export it.

![A donated TikTok history lists the videos a participant watched, not the comments written under them. DDP Comments is a workspace on SURF Research Cloud where your own collectors gather those comments, starting from the donated video IDs, and send them to 4CAT.](/assets/images/news/ddp-comments-1-desk.webp "A collector's page. Open next video (1) opens a video in the browser on the left, where the video is hidden (2) and the collector opens the comments (3). A timer (4) counts down. Zeeschuimer (5) records the comments, and a note (6) says whether they have reached 4CAT. Names, comment text and video IDs are covered in this picture.")

## How it works

1. Upload the combined list of video IDs on the admin page. The list holds IDs only, in shuffled order. Nothing in it says who donated which video.
2. A collector clicks **Open next video**. The desk hands out videos from the list at random, a few at a time.
3. The video page opens in the collector's browser. The video can optionally be hidden, and every image represented as a plain block, so collectors do don't have to be exposed to any sensitive content. No TikTok account is used.
4. The collector opens the comments and scrolls until no more load, or until the timer runs out. [Zeeschuimer](https://github.com/digitalmethodsinitiative/zeeschuimer), a browser extension from the Digital Methods Initiative, records the comments as they load.
5. If a video has been removed, is private, needs a login or is not available in the region, the collector picks that reason from a list and goes on to the next one.
6. When they're finished collecting, they send the captured comments through to the local database.

![A panel in place of the video reads: Video hidden on purpose by the comment collection app. If the comments load, all is well. Beside it the Comments tab is open; the names and the text of three comments are covered by grey blocks.](/assets/images/news/ddp-comments-2-hidden-video.webp "The video can be replaced by a panel for reducing exposure to sensitive content. The comments load beside it. Names and comment text are covered in this picture.")

![The queue: five videos on a line. Videos 2 and 3 are marked Video unavailable or removed, Video 4 is open with 2:12 on its timer and a Report a problem menu under it, and Video 5 is still to do.](/assets/images/news/ddp-comments-3-queue.webp "The queue. Video 4 is open with 2:12 left on its timer, and two earlier videos were no longer available.")

## What you see as a study lead

The admin page shows the collection as it stands: how many videos are waiting, how many are with a collector, how many are done and how many records have been captured. You add videos to the list on the same page.

![The admin page with sample data: of 12,000 videos, 11,480 are waiting in the pool, 20 are with a collector now and 500 are done by 4 collectors, 38 of them reported as a problem; 31,250 records ](/assets/images/news/ddp-comments-4-collection.webp "The collection on the admin page. Sample data.")

For each collector you can see who's active in the system, and whether or not they've uploaded their data to the database.

![A table of four students with sample data: time worked this week and in total, whether their captures were uploaded and when, and whether their session is running. One row is marked: no, captures since Tue 16:20.](/assets/images/news/ddp-comments-5-students.webp "Showing whether each collector's captures have reached 4CAT.")

Videos that could not be collected are listed with the reason.

![A table of two reported problems with sample data: one video unavailable or removed, one marked Something else with the note kept spinning, each with the student and the time. ](/assets/images/news/ddp-comments-6-problems.webp "Videos that could not be collected, with the reason the collector gave.")

## What a study needs

- A collaboration on SURF Research Cloud, with a group for your collectors and a group for study leads, and budget for a workspace with a storage volume.
- A list of TikTok video IDs as a CSV file. A tool that comes with DDP Comments makes this list from the donations you export from Next.
- People to collect. Every video is opened by a person.

## Beside DDP Transcribe and DDP Inspector

DDP Comments is one of three tools on SURF Research Cloud that work with donated data. [DDP Transcribe](/news/2026-11-23-ddp-transcribe/) fetches the videos in the donated watch histories and transcribes what is said in them. DDP Inspector shows the donations and the transcripts in the browser, read-only.

## Getting access

DDP Comments runs on SURF Research Cloud, in your own collaboration. To use it for a study, email [DataDonation@uu.nl](mailto:datadonation@uu.nl).

The code is on [GitHub](https://github.com/daniellemccool/researchcloud-ddp-comments).
