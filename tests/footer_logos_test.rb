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
  # Darker logos are drawn a little smaller: (typical darkness / its darkness) ** 0.25.
  UU_DENSITY_WEIGHT = (0.17 / 0.243)**0.25
  UU_INK_H = Math.sqrt(13.7 / UU_ASPECT) * UU_DENSITY_WEIGHT

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
    assert_in_delta UU_INK_H * UU_ASPECT, FooterCss.rem(cell, "width"), 0.01
    assert_in_delta UU_INK_H * 532 / 225, FooterCss.rem(img, "height"), 0.01
  end

  def test_tilburg_drawn_larger_for_its_light_ink
    height = FooterCss.rem(FooterCss.block(".site-footer__cell--tilburg"), "height")
    refute_nil height
    assert_in_delta Math.sqrt(13.7 / (1296.0 / 329)) * (0.17 / 0.063)**0.25, height, 0.01
  end

  # Phone: two left-aligned columns of a fixed width, with a gap wide enough that
  # Utrecht's right-hand clear zone ends before the second column starts.
  def phone_columns
    footer = FooterCss.block(".site-footer")
    [FooterCss.rem(footer, "--footer-col"), FooterCss.rem(footer, "--footer-gap")]
  end

  def test_phone_grid_uses_fixed_columns
    grid = FooterCss.block(".site-footer__grid")
    assert_match(/grid-template-columns:\s*repeat\(2,\s*var\(--footer-col\)\)/, grid)
    assert_match(/column-gap:\s*var\(--footer-gap\)/, grid)
    refute_match(/nth-child\((odd|even)\)/, FooterCss.css)
  end

  def test_phone_blocks_centred
    %w[.site-footer__grid .site-footer__providers].each do |sel|
      assert_match(/justify-content:\s*center/, FooterCss.block(sel), sel)
    end
  end

  def test_partners_label_styled_like_provider_labels
    assert_match(/<p class="site-footer__label site-footer__label--small">Project partners<\/p>/, FOOTER)
  end

  # Desktop row: one gap for all, as wide as the widest clear zone, so the spacing
  # stays even and no per-logo margin opens a wider gap after Utrecht.
  def test_desktop_row_gap_even_and_clears_every_zone
    margins = FooterCss.rules.select { |sel, body| sel.include?("site-footer") && body =~ /margin-(left|right):\s*max\(/ }
    assert_empty margins.map(&:first)
    gap = FooterCss.rem(FooterCss.block(".site-footer"), "--footer-row-gap")
    refute_nil gap, "no --footer-row-gap"
    %w[uva ru uu vu tilburg eur].each do |name|
      cell = FooterCss.block(".site-footer__cell--#{name}")
      %w[--clear-l --clear-r].each do |side|
        assert_operator FooterCss.rem(cell, side), :<=, gap + 0.001, "#{name} #{side}"
      end
    end
  end

  # Phone: the partner block is centred, so its heading is too. Wider, the
  # partners span the footer and the heading sits left, as Danielle wants.
  def test_partners_label_centred_on_phone_only
    phone = /@media \(max-width: 767px\) \{\s*\.site-footer__partners > \.site-footer__label \{\s*text-align: center;/
    assert FooterCss.css.match?(phone), "no phone-only centring of the partners label"
    centred = FooterCss.css.scan(/\.site-footer__partners > \.site-footer__label \{[^}]*text-align: center/).size
    assert_equal 1, centred, "the partners label is centred outside the phone query too"
  end

  def test_labels_sit_same_distance_above_logos
    gaps = [".site-footer__provider", ".site-footer__partners"].map { |sel| FooterCss.block(sel)[/(?:^|\s)gap:\s*([^;]+);/, 1] }
    assert_equal ["0.5rem", "0.5rem"], gaps
  end

  # Danielle's call: Eyra read too small next to ODISSEI, so it is drawn 1.2x.
  def test_eyra_nudged_up
    height = FooterCss.rem(FooterCss.block(".site-footer__cell--eyra"), "height")
    refute_nil height
    assert_in_delta Math.sqrt(17.8 / (786.0 / 276)) * (0.17 / 0.267)**0.25 * 1.2, height, 0.01
  end

  def test_phone_gap_clears_utrecht
    col, gap = phone_columns
    refute_nil col, "no --footer-col"
    refute_nil gap, "no --footer-gap"
    uu = FooterCss.block(".site-footer__cell--uu")
    assert_operator FooterCss.rem(uu, "width") + FooterCss.rem(uu, "--clear-r"), :<=, col + gap + 0.001
  end

  def test_phone_columns_fit_360
    col, gap = phone_columns
    refute_nil col, "no --footer-col"
    # 360px screen less the footer's 1rem side padding, in rem
    assert_operator 2 * col + gap, :<=, (360 - 32) / 16.0
  end

  def test_odissei_wordmark_legible
    height = FooterCss.rem(FooterCss.block(".site-footer__cell--odissei"), "height")
    refute_nil height
    assert_operator height, :>=, 3.05
  end

  FOOTER = File.read(File.join(ROOT, "_includes/site-footer.html"))

  def test_provider_labels
    marks = ["Provided by", "site-footer__cell--odissei", "Supported by", "site-footer__cell--eyra"]
    positions = marks.map { |m| FOOTER.index(m) }
    assert_equal marks.size, positions.compact.size, "missing one of #{marks}"
    assert_equal positions.sort, positions
  end

  def test_partner_order
    names = %w[uva ru uu vu tilburg eur]
    positions = names.map { |n| FOOTER.index("site-footer__cell--#{n}") }
    assert_equal names.size, positions.compact.size, "missing a partner cell"
    assert_equal positions.sort, positions
  end

  def test_alt_text_kept
    ["ODISSEI", "Eyra", "University of Amsterdam", "Radboud University", "Utrecht University",
     "Vrije Universiteit Amsterdam", "Tilburg University", "Erasmus University Rotterdam"].each do |alt|
      assert_includes FOOTER, %(alt="#{alt}")
    end
  end

  def test_cells_clip_with_margin
    names = %w[odissei eyra uva ru uu vu tilburg eur]
    names.each do |name|
      assert_match(/overflow-clip-margin:\s*1px/, FooterCss.block(".site-footer__cell--#{name}"), name)
    end
  end
end
