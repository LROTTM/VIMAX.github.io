            // ════════════════════════════════════════════════════════════
            //  MAP
            // ════════════════════════════════════════════════════════════
            let leafMap = null, leafMarkers = [];
            function initSearch() {
                setTimeout(() => {
                    const mc = document.getElementById('map-container');
                    if (!mc) return;
                    if (!leafMap) {
                        leafMap = L.map('map-container').setView([-16.505, -68.115], 13);
                        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OpenStreetMap', maxZoom: 18 }).addTo(leafMap);
                    }
                    doSearch();
                }, 100);
            }
            function updateMapMarkers(mechs) {
                if (!leafMap) return;
                leafMarkers.forEach(m => leafMap.removeLayer(m)); leafMarkers = [];
                mechs.forEach(m => {
                    const icon = L.divIcon({ className: '', html: `<div style="background:${m.available ? '#10B981' : '#6B7280'};width:10px;height:10px;border-radius:50%;border:2px solid white;box-shadow:0 2px 4px rgba(0,0,0,.3)"></div>`, iconSize: [14, 14] });
                    const mk = L.marker([m.lat, m.lng], { icon }).addTo(leafMap);
                    mk.bindPopup(`<div style="font-size:13px"><b>${m.name}</b><br>${m.specialty[0]}<br>⭐ ${m.rating} · ${m.jobs} trabajos<br>Bs. ${m.price}/hr</div>`);
                    leafMarkers.push(mk);
                });
            }

            // ════════════════════════════════════════════════════════════
            //  SEARCH
            // ════════════════════════════════════════════════════════════
            let activeCat = 'all';
            function setChip(el, type) {
                document.querySelectorAll('#cat-chips .chip').forEach(c => c.classList.remove('on'));
                el.classList.add('on');
                activeCat = el.dataset.cat;
                doSearch();
            }
            function doSearch() {
                const q = (document.getElementById('s-query')?.value || '').toLowerCase().trim();
                const sort = document.getElementById('s-sort')?.value || 'dist';
                let list = [...MECHANICS];
                if (q) list = list.filter(m => m.name.toLowerCase().includes(q) || m.specialty.some(s => s.toLowerCase().includes(q)) || m.cat.some(c => c.toLowerCase().includes(q)));
                if (activeCat && activeCat !== 'all') list = list.filter(m => m.cat.some(c => c.includes(activeCat)) || m.specialty.some(s => s.includes(activeCat)));
                if (sort === 'dist') list.sort((a, b) => a.dist - b.dist);
                else if (sort === 'rating') list.sort((a, b) => b.rating - a.rating);
                else if (sort === 'price_asc') list.sort((a, b) => a.price - b.price);
                else if (sort === 'price_desc') list.sort((a, b) => b.price - a.price);
                else if (sort === 'jobs') list.sort((a, b) => b.jobs - a.jobs);
                renderMechs(list);
                updateMapMarkers(list);
                document.getElementById('result-count').textContent = list.length;
                document.getElementById('no-results').style.display = list.length ? 'none' : 'block';
            }
            function renderMechs(list) {
                const c = document.getElementById('mech-results');
                if (!c) return;
                c.innerHTML = list.map((m, i) => `
  <div class="mcard" onclick="viewProfile('${m.id}')">
    <div class="mch">
      <div class="av mav" style="${avatarStyle(i)}color:#fff;width:48px;height:48px;font-size:16px">${initials(m.name)}</div>
      ${m.available ? `<div class="odot" style="background:var(--ok)"></div>` : `<div class="odot" style="background:var(--tx3)"></div>`}
      <div style="min-width:0">
        <div style="font-size:14px;font-weight:600">${m.name}</div>
        <div style="font-size:12px;color:var(--tx2)">${m.specialty[0]} · ${m.dist.toFixed(1)} km</div>
        <div class="stars" style="font-size:12px">${'★'.repeat(Math.round(m.rating))}<span style="color:var(--tx3);font-size:11px"> ${m.rating} (${m.jobs} trabajos)</span></div>
      </div>
    </div>
    <div class="mcb">
      <div class="mtags">${m.specialty.slice(0, 3).map(s => `<span class="mtag">${s}</span>`).join('')}</div>
      <div class="mft">
        <div class="mprice">Bs. ${m.price}/hr</div>
        <div style="display:flex;gap:5px">
          <button class="btn btn-o btn-sm" onclick="event.stopPropagation();openChatWith('${m.userId}')"><i class="ti ti-message-2"></i></button>
          <button class="btn btn-p btn-sm" onclick="event.stopPropagation();openBooking('${m.id}',null,'${m.name}')">Contratar</button>
        </div>
      </div>
    </div>
  </div>`).join('');
            }

            // ════════════════════════════════════════════════════════════
