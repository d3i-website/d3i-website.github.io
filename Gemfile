source "https://rubygems.org"

# Jekyll 4.x
gem "jekyll", "~> 4.3"

# Theme - install as gem instead of remote theme
gem "minimal-mistakes-jekyll", "~> 4.24"

# Essential plugins
group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.17"
  gem "jekyll-include-cache", "~> 0.2"
  gem "jekyll-sitemap", "~> 1.4"
  gem "jekyll-seo-tag", "~> 2.8"
  gem "jekyll-paginate", "~> 1.1"
  gem "jekyll-gist", "~> 1.5"
  gem "jemoji", "~> 0.13"
  gem "jekyll-archives"
end

# Windows and JRuby does not include zoneinfo files
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.1", :platforms => [:mingw, :x64_mingw, :mswin]

# Lock http_parser.rb to v0.6.x for JRuby
gem "http_parser.rb", "~> 0.6.0", :platforms => [:jruby]

# Web server
gem "webrick", "~> 1.8"

gem "erb", "~> 6.0"
