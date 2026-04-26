# datadonation.eu

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-brightgreen)](https://your-github-pages-url)

Welcome to datadonation.eu, the website of D3I, a project funded by PDI-SSH. The purpose of datadonation.eu is to unite an international community of researchers interested in leveraging data donation for research purposes.

Are you looking to collect digital trace data in a transparent manner that prioritizes the privacy of your research participants? Data donation offers a solution! Here, you can explore the concept of data donation, learn how to prepare a data donation study, and discover our data donation software, [Port](https://github.com/eyra/port).

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Contact](#contact)

## Introduction

The datadonation.eu website serves as a central hub for researchers interested in exploring the potential of data donation for their projects. Whether you are new to the concept or already familiar, this platform provides valuable resources, guidelines, and tools to help you make the most of data donation.

## Features

- **Information**: Learn about the principles and benefits of data donation.
- **Study Preparation**: Discover guidelines and best practices for setting up a data donation study.
- **Port**: Explore our data donation software, Port, designed to facilitate the collection and analysis of digital trace data.
- **Community**: Connect with like-minded researchers from around the world and exchange ideas and experiences.
- **Resources**: Access a curated collection of papers, articles, and external links related to data donation and its applications.

## Contact

For any questions or comments, feel free to reach out to our [team members](https://datadonation.eu/team/)

We appreciate your interest in datadonation.eu and look forward to hearing from you!

## Development

**Static site generator: Jekyll**

This site uses [jekyll](https://jekyllrb.com/) as static site generator and is hosted by Github Pages.
In order to develop this site locally:

1. Install [Ruby](https://www.ruby-lang.org/en/)
2. Install bundler: `gem install bundler`
3. Clone this repository and change directory
4. Configure Bundler to install gems locally (avoids needing root/system write access): `bundle config set --local path vendor/bundle`
5. Run: `bundle install` to install the necessary gems
6. Run: `bundle exec jekyll serve` and the site should be hosted at `http://localhost:4000`

**Content editing (local CMS preview)**

A local-only [Sveltia CMS](https://sveltiacms.app) demo is wired to `_data/team.yml`. It edits your working copy directly via the browser's File System Access API — no proxy, no auth, nothing deploys.

1. Run the site: `bundle exec jekyll serve`
2. In a Chromium-based browser (Chrome/Edge/Brave), open: `http://localhost:4000/admin/`
3. When prompted, grant access to this repository's folder. Changes save as regular file edits you can inspect with `git diff`.

**Theme Minimal mistakes**

This site uses [Minimal Mistakes](https://mmistakes.github.io/minimal-mistakes/) as the basis for its theme. 
Please check their documentation in order to learn how to make changes to the theme.
