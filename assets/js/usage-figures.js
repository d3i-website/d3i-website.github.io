(function () {
  var root = document.querySelector('.usage-figures');
  if (!root) return;
  var DATA;
  try { DATA = JSON.parse(document.getElementById('usage-data').textContent); }
  catch (e) { return; }
  var COUNTRIES_URL = root.getAttribute('data-countries-url');
  var LOGO_BASE = root.getAttribute('data-logo-base');
  var INK = '#252a34';
  function tint(hex, a) { var n = parseInt(hex.slice(1), 16); return 'rgba(' + (n>>16&255) + ',' + (n>>8&255) + ',' + (n&255) + ',' + a + ')'; }

  // ---------- data prep ----------
  var byear = (DATA.studies_per_year || []).map(function (d) { return { y: String(d.year), n: +d.count }; });
  var maxYear = byear.reduce(function (m, d) { return (+d.y > +m.y) ? d : m; }, byear[0] || { y: '0' }).y;

  var cColor = {}, cOrder = [], cFallback = {};
  (DATA.countries || []).forEach(function (c) { cColor[c.name] = c.color; cOrder.push(c.name); cFallback[c.name] = [c.lng, c.lat]; });

  var instAll = {}, instLocated = {};
  (DATA.institutions || []).forEach(function (it) {
    (instAll[it.country] = instAll[it.country] || []).push(it.name);
    if (typeof it.lat === 'number' && typeof it.lng === 'number')
      (instLocated[it.country] = instLocated[it.country] || []).push([it.name, [it.lng, it.lat]]);
  });

  var countries = cOrder.filter(function (name) { return (instAll[name] || []).length > 0; }).map(function (name) {
    var loc = (instLocated[name] || []).map(function (x) { return x[1]; });
    var coords = loc.length ? d3.geoCentroid({ type: 'MultiPoint', coordinates: loc }) : (cFallback[name] || [0, 0]);
    return { name: name, coords: coords, n: (instAll[name] || []).length, c: cColor[name] || '#888' };
  });

  // ---------- bar ----------
  (function renderYear() {
    var bw = 640, bh = 250, bm = { t: 26, r: 14, b: 30, l: 34 };
    var bsvg = d3.select('#usage-year').append('svg').attr('viewBox', '0 0 ' + bw + ' ' + bh).style('width', '100%').style('height', 'auto');
    var bx = d3.scaleBand().domain(byear.map(function (d) { return d.y; })).range([bm.l, bw - bm.r]).padding(0.4);
    var by = d3.scaleLinear().domain([0, d3.max(byear, function (d) { return d.n; })]).nice().range([bh - bm.b, bm.t]);
    bsvg.append('g').attr('transform', 'translate(' + bm.l + ',0)').call(d3.axisLeft(by).ticks(4).tickSize(-(bw - bm.l - bm.r)))
      .call(function (g) { g.select('.domain').remove(); }).call(function (g) { g.selectAll('line').attr('stroke', '#eef0f4'); }).call(function (g) { g.selectAll('text').attr('fill', '#6a6a6a').attr('font-size', 11); });
    bsvg.append('g').selectAll('rect').data(byear).join('rect').attr('x', function (d) { return bx(d.y); }).attr('y', function (d) { return by(d.n); }).attr('width', bx.bandwidth()).attr('height', function (d) { return by(0) - by(d.n); }).attr('rx', 6)
      .attr('fill', function (d) { return d.y === maxYear ? '#FF5E5E' : '#4272EF'; });
    bsvg.append('g').selectAll('text').data(byear).join('text').attr('x', function (d) { return bx(d.y) + bx.bandwidth() / 2; }).attr('y', function (d) { return by(d.n) - 7; }).attr('text-anchor', 'middle').attr('font-weight', 800).attr('fill', INK).attr('font-size', 13).text(function (d) { return d.n; });
    bsvg.append('g').selectAll('text.xl').data(byear).join('text').attr('class', 'xl').attr('x', function (d) { return bx(d.y) + bx.bandwidth() / 2; }).attr('y', bh - 9).attr('text-anchor', 'middle').attr('font-weight', 700).attr('fill', '#333').attr('font-size', 13).text(function (d) { return d.y; });
  })();

  // ---------- globe ----------
  var S = 480, DEF_SCALE = S / 2 - 6, DEF_ROT = [30, -45];
  var svg = d3.select('#usage-globe').append('svg').attr('viewBox', '0 0 ' + S + ' ' + S);
  var projection = d3.geoOrthographic().scale(DEF_SCALE).translate([S / 2, S / 2]).rotate(DEF_ROT).clipAngle(90);
  var path = d3.geoPath(projection);
  var r = d3.scaleSqrt().domain([0, 7]).range([0, 30]);
  var grat = d3.geoGraticule10();
  svg.append('path').datum({ type: 'Sphere' }).attr('class', 'sphere').attr('fill', '#f3f6fb').attr('stroke', '#dfe6f2');
  var gGrat = svg.append('path').attr('fill', 'none').attr('stroke', '#e6ebf5').attr('stroke-width', 0.5);
  var gLand = svg.append('g');
  var gMark = svg.append('g');
  var selected = null;
  function visible(c) { return d3.geoDistance(c, [-projection.rotate()[0], -projection.rotate()[1]]) < Math.PI / 2; }

  function render() {
    svg.select('.sphere').attr('d', path); gGrat.attr('d', path(grat)); gLand.selectAll('path').attr('d', path);
    gMark.selectAll('*').remove();
    if (!selected) {
      countries.forEach(function (d) {
        if (!visible(d.coords)) return; var p = projection(d.coords);
        var g = gMark.append('g').style('cursor', 'pointer').on('click', function () { drillIn(d); });
        g.append('circle').attr('cx', p[0]).attr('cy', p[1]).attr('r', r(d.n)).attr('fill', d.c).attr('fill-opacity', 0.82).attr('stroke', d.c).attr('stroke-width', 1.4);
        g.append('text').attr('x', p[0]).attr('y', p[1]).attr('dy', '.35em').attr('text-anchor', 'middle').attr('fill', '#fff').attr('font-weight', 800).attr('font-size', d.n > 2 ? 13 : 10).text(d.n);
      });
    } else {
      var col = cColor[selected.name];
      var items = (instLocated[selected.name] || []).map(function (d) { return { name: d[0], p: projection(d[1]), vis: visible(d[1]) }; }).filter(function (d) { return d.vis; });
      if (items.length) {
        var colX = Math.min(S - 170, d3.max(items, function (d) { return d.p[0]; }) + 22);
        var ordered = items.slice().sort(function (a, b) { return a.p[1] - b.p[1]; });
        var LH = 16, last = -1e9; ordered.forEach(function (it) { it.ly = Math.max(it.p[1], last + LH); last = it.ly; });
        var shift = d3.mean(ordered, function (d) { return d.p[1]; }) - d3.mean(ordered, function (d) { return d.ly; }); ordered.forEach(function (it) { it.ly += shift; });
        ordered.forEach(function (it) { gMark.append('path').attr('d', 'M' + it.p[0] + ',' + it.p[1] + ' L' + (colX - 5) + ',' + it.ly).attr('fill', 'none').attr('stroke', tint(col, 0.55)).attr('stroke-width', 1); });
        items.forEach(function (it) { gMark.append('circle').attr('cx', it.p[0]).attr('cy', it.p[1]).attr('r', 5.5).attr('fill', col).attr('stroke', '#fff').attr('stroke-width', 1.5); });
        ordered.forEach(function (it) { gMark.append('text').attr('x', colX).attr('y', it.ly).attr('dy', '.32em').attr('font-size', 11).attr('font-weight', 700).attr('fill', INK).text(it.name).attr('paint-order', 'stroke').attr('stroke', '#fff').attr('stroke-width', 3).attr('stroke-linejoin', 'round'); });
      }
    }
  }
  function fly(rotTarget, scaleTarget) {
    var r0 = projection.rotate(), s0 = projection.scale();
    d3.transition().duration(1000).tween('fly', function () { var ri = d3.interpolate(r0, rotTarget), si = d3.interpolate(s0, scaleTarget); return function (t) { projection.rotate(ri(t)); projection.scale(si(t)); render(); }; });
  }
  function drillScale(name) {
    var pts = (instLocated[name] || []).map(function (x) { return x[1]; });
    var centroid = pts.length ? d3.geoCentroid({ type: 'MultiPoint', coordinates: pts }) : (cFallback[name] || [0, 0]);
    var spread = 0; pts.forEach(function (p) { spread = Math.max(spread, d3.geoDistance(p, centroid)); });
    var target = spread < 0.01 ? DEF_SCALE * 6 : 200 / Math.sin(spread);
    return { centroid: centroid, scale: Math.max(DEF_SCALE * 2.6, Math.min(3400, target)) };
  }
  function drillIn(d) { selected = d; document.getElementById('usage-back').style.display = 'block'; var ds = drillScale(d.name); fly([-ds.centroid[0], -ds.centroid[1]], ds.scale); }
  function drillOut() { selected = null; document.getElementById('usage-back').style.display = 'none'; fly(DEF_ROT, DEF_SCALE); }

  d3.json(COUNTRIES_URL).then(function (world) {
    gLand.selectAll('path').data(topojson.feature(world, world.objects.countries).features).join('path').attr('fill', '#e7ecf5').attr('stroke', '#fff').attr('stroke-width', 0.4);
    render();
  });
  svg.call(d3.drag().on('drag', function (ev) { var k = 70 / projection.scale(), rot = projection.rotate(); var lat = Math.max(-90, Math.min(90, rot[1] - ev.dy * k)); projection.rotate([rot[0] + ev.dx * k, lat]); render(); }));
  function zoomBy(f) { projection.scale(Math.max(120, Math.min(3600, projection.scale() * f))); render(); }
  svg.on('wheel', function (ev) { ev.preventDefault(); zoomBy(ev.deltaY < 0 ? 1.08 : 0.93); }, { passive: false });
  document.getElementById('usage-zin').onclick = function () { zoomBy(1.25); };
  document.getElementById('usage-zout').onclick = function () { zoomBy(0.8); };
  document.getElementById('usage-back').onclick = drillOut;

  // ---------- names ----------
  document.getElementById('usage-names').innerHTML = cOrder.filter(function (c) { return (instAll[c] || []).length; }).map(function (c) {
    return '<div class="usage-country"><h4 style="--dot:' + cColor[c] + ';color:' + cColor[c] + '">' + c + '</h4><ul>' + (instAll[c] || []).map(function (n) { return '<li>' + n + '</li>'; }).join('') + '</ul></div>';
  }).join('');

  // ---------- platforms ----------
  var platOrder = [], platGroups = {};
  (DATA.platforms || []).forEach(function (p) { if (!platGroups[p.category]) { platGroups[p.category] = []; platOrder.push(p.category); } platGroups[p.category].push(p); });
  document.getElementById('usage-platforms').innerHTML = platOrder.map(function (g) {
    return '<div class="usage-pg"><h4>' + g + '</h4><div class="usage-plats">' + platGroups[g].map(function (p) {
      return '<span class="usage-plat"><img src="' + LOGO_BASE + p.icon + '.svg" alt="" onerror="this.style.display=\'none\'">' + p.name + '</span>';
    }).join('') + '</div></div>';
  }).join('');

  // ---------- stats ----------
  document.getElementById('usage-stat-institutions').textContent = (DATA.institutions || []).length;
  document.getElementById('usage-stat-countries').textContent = countries.length;
})();
