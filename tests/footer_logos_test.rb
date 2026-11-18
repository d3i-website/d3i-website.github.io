# Run: bundle exec ruby tests/footer_logos_test.rb
#
# The footer logos are sized from each file's measured ink box (_sass/_footer.scss),
# so every logo carries about the same weight while the files are used as-is.
require "minitest/autorun"
require "sass-embedded"

ROOT = File.expand_path("..", __dir__)

module FooterCss
  def self.css
    @css ||= begin
      src = File.read(File.join(ROOT, "assets/css/main.scss")).sub(/\A---\s*\n---\s*\n/, "")
      Sass.compile_string(src, load_paths: [File.join(ROOT, "_sass")], style: :expanded, quiet_deps: true, silence_deprecations: ["import", "global-builtin"]).css
    end
  end

  # [selector, body] pairs for every plain rule, at any nesting depth.
  def self.rules
    @rules ||= css.scan(/([^{}]+)\{([^{}]*)\}/).map { |sel, body| [sel.strip, body] }
  end

  def self.block(selector)
    rules.select { |sel, _| sel.split(/\s*,\s*/).include?(selector) }.map(&:last).join
  end

  # The rem number in a declaration, also inside calc(var(--logo-scale, 1) * Xrem).
  def self.rem(body, prop)
    decl = body[/(?:^|[;\s])#{Regexp.escape(prop)}:\s*([^;]+);/, 1] or return nil
    decl[/(-?[\d.]+)rem/, 1]&.to_f
  end
end

class FooterLogosTest < Minitest::Test
  UU_ASPECT = 662.0 / 225

  def test_no_scale_on_footer_logos
    offenders = FooterCss.rules.select { |sel, body| sel.include?("site-footer") && body.include?("scale(") }
    assert_empty offenders.map(&:first)
  end

  def test_footer_not_clipped
    refute_match(/overflow-x:\s*clip/, FooterCss.block(".site-footer"))
  end

  def test_uu_cell_is_ink_box
    cell = FooterCss.block(".site-footer__cell--uu")
    img = FooterCss.block(".site-footer__cell--uu img")
    refute_nil FooterCss.rem(cell, "width"), "no .site-footer__cell--uu width"
    refute_nil FooterCss.rem(img, "height"), "no .site-footer__cell--uu img height"
    assert_in_delta Math.sqrt(14.25 * UU_ASPECT), FooterCss.rem(cell, "width"), 0.01
    assert_in_delta Math.sqrt(14.25 / UU_ASPECT) * 532 / 225, FooterCss.rem(img, "height"), 0.01
  end

  def test_odissei_wordmark_legible
    height = FooterCss.rem(FooterCss.block(".site-footer__cell--odissei"), "height")
    refute_nil height
    assert_operator height, :>=, 3.05
  end

  def test_cells_clip_with_margin
    names = %w[odissei eyra uva ru uu vu tilburg eur]
    names.each do |name|
      assert_match(/overflow-clip-margin:\s*1px/, FooterCss.block(".site-footer__cell--#{name}"), name)
    end
  end
end
