# Run: bundle exec ruby tests/news_figures_test.rb
require "minitest/autorun"
require_relative "../_plugins/news_figures"

class NewsFiguresTest < Minitest::Test
  def captionize(html) = NewsFigures.captionize(html)

  def test_wraps_titled_standalone_image
    assert_equal(
      %(<figure class="section-figure"><img src="/a.webp" alt="Menu" /><figcaption>Open the menu.</figcaption></figure>),
      captionize(%(<p><img src="/a.webp" alt="Menu" title="Open the menu." /></p>))
    )
  end

  def test_leaves_untitled_image_alone
    html = %(<p><img src="/c.png" alt="No title" /></p>)
    assert_equal html, captionize(html)
  end

  def test_leaves_inline_image_alone
    html = %(<p>Inline <img src="/b.png" alt="x" title="t" /> here.</p>)
    assert_equal html, captionize(html)
  end

  def test_captions_linked_image
    assert_equal(
      %(<figure class="section-figure"><a href="https://example.org/a?b=1&amp;c=2"><img src="/b.png" alt="x" /></a><figcaption>t</figcaption></figure>),
      captionize(%(<p><a href="https://example.org/a?b=1&amp;c=2"><img src="/b.png" alt="x" title="t" /></a></p>))
    )
  end

  def test_leaves_link_with_text_alone
    html = %(<p><a href="/x">see <img src="/b.png" alt="x" title="t" /></a></p>)
    assert_equal html, captionize(html)
  end

  def test_leaves_empty_title_alone
    html = %(<p><img src="/b.png" alt="x" title="" /></p>)
    assert_equal html, captionize(html)
  end

  def test_keeps_escaped_entities
    assert_equal(
      %(<figure class="section-figure"><img src="/a.webp" alt="Alt &amp; x" /><figcaption>A &amp; B &quot;C&quot;</figcaption></figure>),
      captionize(%(<p><img src="/a.webp" alt="Alt &amp; x" title="A &amp; B &quot;C&quot;" /></p>))
    )
  end

  def test_title_markdown_stays_literal
    assert_equal(
      %(<figure class="section-figure"><img src="/a.webp" alt="m" /><figcaption>choose *Export*.</figcaption></figure>),
      captionize(%(<p><img src="/a.webp" alt="m" title="choose *Export*." /></p>))
    )
  end

  # kramdown keeps Markdown backslash escapes in the title attribute.
  def test_unescapes_backslash_escapes_in_caption
    assert_equal(
      %(<figure class="section-figure"><img src="/a.webp" alt="m" /><figcaption>say &quot;hi&quot;, it's a back \\ slash</figcaption></figure>),
      captionize(%(<p><img src="/a.webp" alt="m" title="say \\&quot;hi\\&quot;, it\\'s a back \\\\ slash" /></p>))
    )
  end

  def test_converts_every_match
    html = <<~HTML
      <p><img src="/1.webp" alt="one" title="First." /></p>

      <p>Text.</p>

      <p><img src="/2.webp" alt="two" title="Second." /></p>
    HTML
    expected = <<~HTML
      <figure class="section-figure"><img src="/1.webp" alt="one" /><figcaption>First.</figcaption></figure>

      <p>Text.</p>

      <figure class="section-figure"><img src="/2.webp" alt="two" /><figcaption>Second.</figcaption></figure>
    HTML
    assert_equal expected, captionize(html)
  end

  def test_ignores_data_title_attribute
    html = %(<p><img src="/b.png" data-title="t" alt="x" /></p>)
    assert_equal html, captionize(html)
  end
end
