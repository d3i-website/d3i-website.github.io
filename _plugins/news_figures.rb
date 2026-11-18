# Captioned figures in news posts.
#
# In a news post, an image that is the only content of its paragraph and has a
# title, `![alt](src "Caption")`, renders as a `.section-figure` with the title
# as its caption. The CMS (Sveltia) image dialog sets the title in its Title
# field. An image wrapped in a link (the dialog's Link field) keeps the link.
# Images without a title, or inline with text, are left as kramdown renders them.
module NewsFigures
  # kramdown renders a standalone image as <p><img … /></p>, and a linked one as
  # <p><a href="…"><img … /></a></p>.
  STANDALONE = %r{<p>\s*(<a\s[^>]*>)?\s*(<img\s[^>]*>)\s*(</a>)?\s*</p>}
  # The title arrives HTML-escaped from kramdown, so it is used as-is, except
  # for Markdown backslash escapes (\" \' \\), which kramdown keeps.
  TITLE = /\stitle="([^"]+)"/
  BACKSLASH_ESCAPE = /\\(&quot;|'|\\)/

  def self.captionize(html)
    html.gsub(STANDALONE) do
      paragraph = Regexp.last_match(0)
      link_open, img, link_close = Regexp.last_match.captures
      title = img[TITLE, 1]
      next paragraph if title.nil? || link_open.nil? != link_close.nil?

      image = "#{link_open}#{img.sub(TITLE, '')}#{link_close}"
      caption = title.gsub(BACKSLASH_ESCAPE, '\1')
      %(<figure class="section-figure">#{image}<figcaption>#{caption}</figcaption></figure>)
    end
  end
end

# post_convert runs on the converted body, before the layout wraps it.
if defined?(Jekyll::Hooks)
  Jekyll::Hooks.register :documents, :post_convert do |doc|
    doc.content = NewsFigures.captionize(doc.content) if doc.collection.label == "news"
  end
end
