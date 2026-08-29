            //  DASHBOARD
            // ════════════════════════════════════════════════════════════
            let dashSection = 'overview';
            let earningsChart = null, statsChart = null;
            function initDash() {
                if (!CU) { goPage('auth'); return; }
                const m = MECHANICS.find(x => x.userId === CU.id);
                const av = document.getElementById('dash-avatar');
                if (av) { const i = USERS.indexOf(CU); av.textContent = initials(CU.fname + ' ' + CU.lname); av.style.cssText = `width:38px;height:38px;font-size:13px;${avatarStyle(i)}color:#fff;`; }
                document.getElementById('dash-uname').textContent = `${CU.fname} ${CU.lname}`;
                const myReqs = BOOKINGS.filter(b => b.mechId === m?.id && b.status === 'PENDING').length;
                document.getElementById('req-badge').textContent = myReqs;
                setDashSection(dashSection);
            }
            function setDashSection(s) {
                dashSection = s;
                document.querySelectorAll('.sidebar .si').forEach(b => b.classList.remove('on'));
                const btn = document.getElementById('dsi-' + s);
                if (btn) btn.classList.add('on');
                const dm = document.getElementById('dash-main');
                if (!dm) return;
                if (earningsChart) { earningsChart.destroy(); earningsChart = null; }
                if (statsChart) { statsChart.destroy(); statsChart = null; }
                const m = MECHANICS.find(x => x.userId === CU?.id);
                const mb = BOOKINGS.filter(b => b.mechId === m?.id);
                switch (s) {
                    case 'overview': dm.innerHTML = renderDashOverview(m, mb); setTimeout(() => drawEarningsChart(m), 50); break;
                    case 'requests': dm.innerHTML = renderDashRequests(m, mb); break;
                    case 'services': dm.innerHTML = renderDashServices(m); break;
                    case 'history': dm.innerHTML = renderDashHistory(m, mb); break;
                    case 'reviews': dm.innerHTML = renderDashReviews(m); break;
                    case 'earnings': dm.innerHTML = renderDashEarnings(m, mb); setTimeout(() => drawEarningsChart(m, 'earnings-chart2'), 50); break;
                    case 'stats': dm.innerHTML = renderDashStats(m, mb); setTimeout(() => drawStatsCharts(m, mb), 50); break;
                    case 'profile': dm.innerHTML = renderDashProfile(m); break;
                    case 'avail': dm.innerHTML = renderDashAvail(m); break;
                }
            }
            function renderDashOverview(m, mb) {
                const pending = mb.filter(b => b.status === 'PENDING');
                const completed = mb.filter(b => b.status === 'COMPLETED');
                const monthEarnings = m ? m.earnings : 0;
                return `<div class="ph"><div><h2>Dashboard</h2><p>Hola ${CU?.fname}, tienes ${pending.length} solicitudes pendientes</p></div>
  <div style="display:flex;gap:7px">
    <div class="toggle-wrap"><button class="toggle ${m?.available ? 'on' : ''}" onclick="toggleAvail(this)" title="Disponibilidad"></button><span style="font-size:13px;color:var(--tx2)">${m?.available ? 'Disponible' : 'No disponible'}</span></div>
  </div></div>
  <div class="metric-grid">
    <div class="mc"><div class="ml">Trabajos mes</div><div class="mv">${Math.floor(mb.length * 0.6)}</div><div class="ms up"><i class="ti ti-trending-up" style="font-size:11px"></i> +12%</div></div>
    <div class="mc"><div class="ml">Ganancias (mes)</div><div class="mv" style="color:var(--ok)">Bs. ${monthEarnings.toLocaleString()}</div><div class="ms up"><i class="ti ti-trending-up" style="font-size:11px"></i> +8%</div></div>
    <div class="mc"><div class="ml">Calificación</div><div class="mv" style="color:var(--gold)">${m?.rating || 0}★</div><div class="ms neu">${REVIEWS.filter(r => r.mechId === m?.id).length} reseñas</div></div>
    <div class="mc"><div class="ml">Solicitudes pend.</div><div class="mv" style="color:var(--warn)">${pending.length}</div><div class="ms" style="color:var(--warn)">Responder pronto</div></div>
  </div>
  <div class="g2">
    <div class="card">
      <div class="ct">Solicitudes recientes <span class="badge bw">${pending.length} pendientes</span></div>
      <div style="display:flex;flex-direction:column;gap:9px">
      ${pending.slice(0, 3).map(b => {
                    const u = USERS.find(x => x.id === b.clientId); return `
        <div style="display:flex;align-items:center;justify-content:space-between;padding:11px;background:var(--bg3);border-radius:8px;border-left:3px solid var(--warn)">
          <div><div style="font-size:13px;font-weight:500">${b.desc.substring(0, 40)}</div><div style="font-size:11px;color:var(--tx3)">${u ? u.fname + ' ' + u.lname : 'Cliente'} · ${fmtTime(b.date)}</div></div>
          <div style="display:flex;gap:5px"><button class="btn btn-ok btn-sm" onclick="acceptBooking('${b.id}')"><i class="ti ti-check"></i></button><button class="btn btn-err btn-sm" onclick="rejectBooking('${b.id}')"><i class="ti ti-x"></i></button></div>
        </div>`}).join('') || '<p style="color:var(--tx3);font-size:13px">Sin solicitudes pendientes.</p>'}
      </div>
      <button class="btn btn-o btn-sm" style="margin-top:10px" onclick="setDashSection('requests')">Ver todas →</button>
    </div>
    <div class="card">
      <div class="ct">Ganancias últimos 7 días</div>
      <div style="font-size:22px;font-weight:700;color:var(--ok);margin-bottom:10px">Bs. ${Math.floor(monthEarnings * 0.26).toLocaleString()}</div>
      <div class="chart-wrap"><canvas id="earnings-chart"></canvas></div>
    </div>
  </div>`;
            }
            function renderDashRequests(m, mb) {
                return `<div class="ph"><h2>Solicitudes</h2><button class="btn btn-p btn-sm" onclick="setDashSection('overview')"><i class="ti ti-arrow-left"></i> Volver</button></div>
  <div class="tabs" style="margin-bottom:16px">
    <button class="tab on" onclick="filterRequests('all',this)">Todas (${mb.length})</button>
    <button class="tab" onclick="filterRequests('PENDING',this)">Pendientes (${mb.filter(b => b.status === 'PENDING').length})</button>
    <button class="tab" onclick="filterRequests('IN_PROGRESS',this)">En progreso</button>
    <button class="tab" onclick="filterRequests('COMPLETED',this)">Completadas</button>
  </div>
  <div id="req-list">${renderReqList(mb)}</div>`;
            }
            function renderReqList(list) {
                if (!list.length) return '<p style="color:var(--tx3);padding:20px 0">Sin solicitudes en esta categoría.</p>';
                return list.map(b => {
                    const u = USERS.find(x => x.id === b.clientId);
                    const s = SERVICES.find(x => x.id === b.svcId);
                    const sc = { PENDING: 'bw', ACCEPTED: 'ba', IN_PROGRESS: 'bp', COMPLETED: 'bg', CANCELLED: 'br' };
                    return `<div class="card" style="margin-bottom:10px;border-left:3px solid ${b.status === 'PENDING' ? 'var(--warn)' : b.status === 'IN_PROGRESS' ? 'var(--acc)' : b.status === 'COMPLETED' ? 'var(--ok)' : 'var(--err)'}">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:10px">
        <div>
          <div style="font-size:14px;font-weight:500;margin-bottom:4px">${s ? s.name : b.desc.substring(0, 50)}</div>
          <div style="font-size:12px;color:var(--tx2)"><i class="ti ti-user" style="font-size:12px"></i> ${u ? u.fname + ' ' + u.lname : 'Cliente'} · <i class="ti ti-map-pin" style="font-size:12px"></i> ${b.loc} · ${fmtTime(b.date)}</div>
          <div style="font-size:12px;color:var(--tx2);margin-top:3px">${b.brand} ${b.year} · <span class="badge ${sc[b.status]}">${b.status}</span></div>
          ${b.price ? `<div style="font-size:13px;color:var(--ok);font-weight:600;margin-top:4px">Bs. ${b.price}</div>` : ''}
        </div>
        <div style="display:flex;gap:6px;flex-wrap:wrap">
          ${b.status === 'PENDING' ? `<button class="btn btn-ok btn-sm" onclick="acceptBooking('${b.id}')"><i class="ti ti-check"></i> Aceptar</button><button class="btn btn-err btn-sm" onclick="rejectBooking('${b.id}')"><i class="ti ti-x"></i> Rechazar</button>` : ''}
          ${b.status === 'IN_PROGRESS' ? `<button class="btn btn-p btn-sm" onclick="completeBooking('${b.id}')"><i class="ti ti-check"></i> Marcar completado</button>` : ''}
          ${b.status === 'COMPLETED' ? `<span style="color:var(--ok);font-size:12px"><i class="ti ti-check"></i> Completado</span>` : ''}
          <button class="btn btn-o btn-sm" onclick="openChatWith('${b.clientId}')"><i class="ti ti-message-2"></i></button>
        </div>
      </div>
    </div>`;
                }).join('');
            }
            function filterRequests(status, btn) {
                const m = MECHANICS.find(x => x.userId === CU.id);
                const mb = BOOKINGS.filter(b => b.mechId === m?.id);
                const list = status === 'all' ? mb : mb.filter(b => b.status === status);
                document.getElementById('req-list').innerHTML = renderReqList(list);
                document.querySelectorAll('#dash-main .tabs .tab').forEach(t => t.classList.remove('on'));
                btn.classList.add('on');
            }
            function acceptBooking(id) {
                const b = BOOKINGS.find(x => x.id === id); if (!b) return;
                b.status = 'IN_PROGRESS';
                const u = USERS.find(x => x.id === b.clientId);
                if (u) NOTIFS.push({ id: 'n' + Date.now(), userId: u.id, type: 'booking', title: 'Solicitud aceptada', body: `Tu solicitud fue aceptada. El mecánico está en camino.`, read: false, time: new Date().toISOString() });
                saveData(); setDashSection('requests'); toast('Solicitud aceptada', 'ok');
            }
            function rejectBooking(id) {
                const b = BOOKINGS.find(x => x.id === id); if (!b) return;
                b.status = 'CANCELLED'; saveData(); setDashSection('requests'); toast('Solicitud rechazada', 'warn');
            }
            function completeBooking(id) {
                const b = BOOKINGS.find(x => x.id === id); if (!b) return;
                b.status = 'COMPLETED'; b.completedAt = new Date().toISOString();
                const m = MECHANICS.find(x => x.id === b.mechId);
                if (m) { m.jobs += 1; if (b.price) m.earnings += b.price; }
                const u = USERS.find(x => x.id === b.clientId);
                if (u) NOTIFS.push({ id: 'n' + Date.now(), userId: u.id, type: 'booking', title: 'Servicio completado', body: `Tu servicio ha sido marcado como completado. ¡No olvides calificar!`, read: false, time: new Date().toISOString() });
                saveData(); setDashSection('requests'); toast('Servicio marcado como completado', 'ok');
            }
            function renderDashServices(m) {
                const svcs = SERVICES.filter(s => s.mechId === m?.id);
                return `<div class="ph"><h2>Mis Servicios</h2><button class="btn btn-p" onclick="openNewService()"><i class="ti ti-plus"></i> Nuevo servicio</button></div>
  <div style="display:flex;flex-direction:column;gap:10px" id="svc-list">
  ${svcs.length ? svcs.map(s => `
    <div class="card" style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px">
      <div>
        <div style="font-size:14px;font-weight:500">${s.name}</div>
        <div style="font-size:12px;color:var(--tx2);margin-top:3px">${s.cat} · ${s.time}</div>
        <div style="font-size:12px;color:var(--tx3);margin-top:2px">${s.desc}</div>
      </div>
      <div style="display:flex;align-items:center;gap:10px">
        <div style="font-size:16px;font-weight:700;color:var(--ok)">Bs. ${s.price}</div>
        <button class="btn btn-o btn-sm" onclick="editService('${s.id}')"><i class="ti ti-edit"></i></button>
        <button class="btn btn-err btn-sm" onclick="deleteService('${s.id}')"><i class="ti ti-trash"></i></button>
        <div class="toggle ${s.active ? 'on' : ''}" onclick="toggleService('${s.id}',this)" title="${s.active ? 'Desactivar' : 'Activar'}"></div>
      </div>
    </div>`).join('') : '<p style="color:var(--tx3);padding:20px 0">Sin servicios publicados. Añade tu primer servicio.</p>'}
  </div>`;
            }
            function openNewService() { document.getElementById('svc-edit-id').value = '';['svc-name', 'svc-desc', 'svc-price', 'svc-time'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; }); document.getElementById('modal-svc-title').textContent = 'Nuevo Servicio'; openModal('modalService'); }
            function editService(id) {
                const s = SERVICES.find(x => x.id === id); if (!s) return;
                document.getElementById('svc-edit-id').value = id;
                document.getElementById('svc-name').value = s.name;
                document.getElementById('svc-cat').value = s.cat;
                document.getElementById('svc-desc').value = s.desc;
                document.getElementById('svc-price').value = s.price;
                document.getElementById('svc-time').value = s.time;
                document.getElementById('modal-svc-title').textContent = 'Editar Servicio';
                openModal('modalService');
            }
            function saveService() {
                const editId = document.getElementById('svc-edit-id').value;
                const name = document.getElementById('svc-name').value.trim();
                const cat = document.getElementById('svc-cat').value;
                const desc = document.getElementById('svc-desc').value.trim();
                const price = parseFloat(document.getElementById('svc-price').value) || 0;
                const time = document.getElementById('svc-time').value.trim();
                if (!name || !price) { toast('Nombre y precio son obligatorios', 'warn'); return; }
                const m = MECHANICS.find(x => x.userId === CU.id);
                if (editId) {
                    const s = SERVICES.find(x => x.id === editId);
                    if (s) { Object.assign(s, { name, cat, desc, price, time }); }
                } else {
                    SERVICES.push({ id: 's' + Date.now(), mechId: m?.id, name, cat, desc, price, time, active: true });
                }
                saveData(); closeModal('modalService'); setDashSection('services'); toast(editId ? 'Servicio actualizado' : 'Servicio creado', 'ok');
            }
            function deleteService(id) { if (!confirm('¿Eliminar este servicio?')) return; const i = SERVICES.findIndex(x => x.id === id); if (i >= 0) SERVICES.splice(i, 1); saveData(); setDashSection('services'); toast('Servicio eliminado', 'ok'); }
            function toggleService(id, el) { const s = SERVICES.find(x => x.id === id); if (!s) return; s.active = !s.active; el.classList.toggle('on', s.active); saveData(); }
            function renderDashHistory(m, mb) {
                return `<div class="ph"><h2>Historial de Servicios</h2></div>
  <div class="tw"><table><thead><tr><th>Servicio</th><th>Cliente</th><th>Fecha</th><th>Precio</th><th>Estado</th><th></th></tr></thead><tbody>
  ${mb.length ? mb.sort((a, b) => new Date(b.date) - new Date(a.date)).map(b => {
                    const u = USERS.find(x => x.id === b.clientId);
                    const s = SERVICES.find(x => x.id === b.svcId);
                    const sc = { PENDING: 'bw', ACCEPTED: 'ba', IN_PROGRESS: 'bp', COMPLETED: 'bg', CANCELLED: 'br' };
                    return `<tr>
      <td style="color:var(--tx1)">${s ? s.name : b.desc.substring(0, 30)}</td>
      <td>${u ? u.fname + ' ' + u.lname : '—'}</td>
      <td>${new Date(b.date).toLocaleDateString('es')}</td>
      <td style="color:var(--ok)">${b.price ? 'Bs. ' + b.price : '—'}</td>
      <td><span class="badge ${sc[b.status]}">${b.status}</span></td>
      <td><button class="btn btn-o btn-sm" onclick="openChatWith('${b.clientId}')"><i class="ti ti-message-2"></i></button></td>
    </tr>`;
                }).join('') : `<tr><td colspan="6" style="text-align:center;padding:20px;color:var(--tx3)">Sin historial</td></tr>`}
  </tbody></table></div>`;
            }
            function renderDashReviews(m) {
                const revs = REVIEWS.filter(r => r.mechId === m?.id);
                const avg = revs.length ? Math.round(revs.reduce((a, r) => a + r.rating, 0) / revs.length * 10) / 10 : 0;
                return `<div class="ph"><h2>Mis Reseñas</h2></div>
  <div class="g2" style="margin-bottom:16px">
    <div class="mc"><div class="ml">Calificación promedio</div><div class="mv" style="color:var(--gold)">${avg}★</div></div>
    <div class="mc"><div class="ml">Total reseñas</div><div class="mv">${revs.length}</div></div>
  </div>
  <div style="display:flex;flex-direction:column;gap:12px">
  ${revs.length ? revs.map(r => {
                    const u = USERS.find(x => x.id === r.clientId);
                    return `<div class="card">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
        <div class="av" style="width:32px;height:32px;font-size:12px;${avatarStyle(USERS.indexOf(u))}color:#fff">${initials(u ? u.fname + ' ' + u.lname : '?')}</div>
        <div><div style="font-size:13px;font-weight:500">${u ? u.fname + ' ' + u.lname : 'Cliente'}</div><div style="font-size:11px;color:var(--tx3)">${fmtTime(r.date)}</div></div>
        <div class="stars" style="margin-left:auto">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</div>
      </div>
      <p style="font-size:13px;color:var(--tx2)">"${r.comment || 'Sin comentario.'}"</p>
      <button class="btn btn-o btn-sm" style="margin-top:8px" onclick="replyToReview(this)">Responder</button>
    </div>`;
                }).join('') : '<p style="color:var(--tx3)">Sin reseñas aún.</p>'}
  </div>`;
            }
            function replyToReview(btn) {
                const card = btn.parentElement;
                btn.style.display = 'none';
                const inp = document.createElement('div'); inp.innerHTML = `<div class="fg" style="margin-top:8px"><textarea class="fi" rows="2" placeholder="Escribe tu respuesta..."></textarea><button class="btn btn-p btn-sm" style="margin-top:6px" onclick="toast('Respuesta publicada','ok');this.parentElement.remove()">Publicar respuesta</button></div>`;
                card.appendChild(inp);
            }
            function renderDashEarnings(m, mb) {
                const completed = mb.filter(b => b.status === 'COMPLETED');
                const total = m?.earnings || 0;
                const rows = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map((_, i) => Math.floor(Math.random() * 300 + 50));
                return `<div class="ph"><h2>Ganancias</h2></div>
  <div class="metric-grid">
    <div class="mc"><div class="ml">Total acumulado</div><div class="mv" style="color:var(--ok)">Bs. ${total.toLocaleString()}</div></div>
    <div class="mc"><div class="ml">Este mes</div><div class="mv" style="color:var(--ok)">Bs. ${Math.floor(total * 0.22).toLocaleString()}</div></div>
    <div class="mc"><div class="ml">Esta semana</div><div class="mv">Bs. ${Math.floor(total * 0.06).toLocaleString()}</div></div>
    <div class="mc"><div class="ml">Comisión plataforma</div><div class="mv" style="color:var(--warn)">10%</div></div>
  </div>
  <div class="g2">
    <div class="card"><div class="ct">Ganancias semanales</div><div class="chart-wrap"><canvas id="earnings-chart2"></canvas></div></div>
    <div class="card"><div class="ct">Últimos pagos</div>
    ${completed.slice(0, 5).map(b => { const s = SERVICES.find(x => x.id === b.svcId); return `<div class="earn-row"><div><div style="font-size:13px;font-weight:500">${s ? s.name : b.desc.substring(0, 25)}</div><div style="font-size:11px;color:var(--tx3)">${new Date(b.date).toLocaleDateString('es')}</div></div><div style="font-weight:700;color:var(--ok)">+Bs. ${b.price || '—'}</div></div>`; }).join('') || '<p style="color:var(--tx3)">Sin pagos registrados.</p>'}
    </div>
  </div>`;
            }
            function renderDashStats(m, mb) {
                return `<div class="ph"><h2>Estadísticas</h2></div>
  <div class="metric-grid">
    <div class="mc"><div class="ml">Tasa aceptación</div><div class="mv" style="color:var(--ok)">94%</div></div>
    <div class="mc"><div class="ml">Tiempo resp. prom.</div><div class="mv">12 min</div></div>
    <div class="mc"><div class="ml">Clientes únicos</div><div class="mv">${new Set(mb.map(b => b.clientId)).size}</div></div>
    <div class="mc"><div class="ml">Calificación prom.</div><div class="mv" style="color:var(--gold)">${m?.rating || 0}★</div></div>
  </div>
  <div class="g2">
    <div class="card"><div class="ct">Distribución de servicios</div><div class="chart-wrap"><canvas id="stats-chart1"></canvas></div></div>
    <div class="card"><div class="ct">Trabajos por mes</div><div class="chart-wrap"><canvas id="stats-chart2"></canvas></div></div>
  </div>`;
            }
            function renderDashProfile(m) {
                return `<div class="ph"><h2>Mi Perfil Profesional</h2><button class="btn btn-p" onclick="saveMechProfile()"><i class="ti ti-check"></i> Guardar</button></div>
  <div class="g2">
    <div class="card">
      <div class="ct">Información básica</div>
      <div class="fg"><label class="fl">Nombre completo</label><input class="fi" id="dp-name" value="${m?.name || CU?.fname + ' ' + CU?.lname}"></div>
      <div class="fg"><label class="fl">Teléfono</label><input class="fi" id="dp-phone" value="${m?.phone || ''}"></div>
      <div class="fg"><label class="fl">Ciudad</label><input class="fi" id="dp-city" value="${m?.city || 'La Paz'}"></div>
      <div class="fg"><label class="fl">Precio por hora (Bs.)</label><input class="fi" id="dp-price" type="number" value="${m?.price || 80}"></div>
      <div class="fg"><label class="fl">Años de experiencia</label><input class="fi" id="dp-exp" type="number" value="${m?.exp || 0}"></div>
      <div class="fg"><label class="fl">Especialidades</label><div style="display:flex;flex-wrap:wrap;gap:6px;padding:10px;background:var(--bg3);border-radius:8px">
        ${['Motor', 'Frenos', 'Eléctrico', 'Transmisión', 'AC', 'Carrocería', 'Diagnóstico', 'Suspensión'].map(sp => `<label style="display:flex;align-items:center;gap:5px;font-size:13px;cursor:pointer"><input type="checkbox" ${m?.specialty?.includes(sp) ? 'checked' : ''}> ${sp}</label>`).join('')}
      </div></div>
    </div>
    <div class="card">
      <div class="ct">Descripción profesional</div>
      <div class="fg"><textarea class="fi" id="dp-bio" rows="5" placeholder="Describe tu experiencia y especialidades...">${m?.bio || ''}</textarea></div>
      <div style="margin-top:14px">
        <div style="font-size:12px;font-weight:600;color:var(--tx2);text-transform:uppercase;letter-spacing:.05em;margin-bottom:8px">Estado de verificación</div>
        <div style="background:var(--bg3);border-radius:8px;padding:12px">
          ${m?.verified ? `<div style="color:var(--ok);display:flex;align-items:center;gap:7px"><i class="ti ti-shield-check"></i> Perfil verificado por VIMAX</div>` :
                        `<div style="color:var(--warn);display:flex;align-items:center;gap:7px"><i class="ti ti-clock"></i> Verificación pendiente</div><p style="font-size:12px;color:var(--tx3);margin-top:6px">Sube tus documentos de identidad para acelerar la verificación.</p>`}
        </div>
      </div>
    </div>
  </div>`;
            }
            function saveMechProfile() {
                const m = MECHANICS.find(x => x.userId === CU.id); if (!m) return;
                m.name = document.getElementById('dp-name').value.trim() || m.name;
                m.phone = document.getElementById('dp-phone').value.trim();
                m.city = document.getElementById('dp-city').value.trim();
                m.price = parseFloat(document.getElementById('dp-price').value) || m.price;
                m.exp = parseInt(document.getElementById('dp-exp').value) || m.exp;
                m.bio = document.getElementById('dp-bio').value.trim();
                const checks = document.querySelectorAll('#dash-main input[type=checkbox]');
                m.specialty = [...checks].filter(c => c.checked).map(c => c.nextSibling.textContent.trim());
                m.cat = [...m.specialty];
                saveData(); toast('Perfil actualizado', 'ok');
            }
            function renderDashAvail(m) {
                const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
                const worked = m?.workingDays || ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
                return `<div class="ph"><h2>Disponibilidad</h2><button class="btn btn-p" onclick="saveAvail()"><i class="ti ti-check"></i> Guardar</button></div>
  <div class="card" style="margin-bottom:14px">
    <div class="ct">Estado general</div>
    <div class="toggle-wrap"><button class="toggle ${m?.available ? 'on' : ''}" id="avail-toggle" onclick="toggleAvail(this)"></button><span style="font-size:13px;color:var(--tx2)" id="avail-lbl">${m?.available ? 'Disponible para recibir solicitudes' : 'No disponible'}</span></div>
  </div>
  <div class="card" style="margin-bottom:14px">
    <div class="ct">Días de trabajo</div>
    <div class="avail-grid" id="avail-days">
      ${days.map(d => `<div class="avail-day ${worked.includes(d) ? 'on' : ''}" onclick="this.classList.toggle('on')" data-day="${d}"><div class="dn2">${d.substring(0, 3)}</div></div>`).join('')}
    </div>
  </div>
  <div class="card">
    <div class="ct">Horario de atención</div>
    <div class="fr">
      <div class="fg"><label class="fl">Desde</label><input class="fi" id="avail-from" type="time" value="${m?.availableFrom || '08:00'}"></div>
      <div class="fg"><label class="fl">Hasta</label><input class="fi" id="avail-to" type="time" value="${m?.availableTo || '18:00'}"></div>
    </div>
  </div>`;
            }
            function saveAvail() {
                const m = MECHANICS.find(x => x.userId === CU.id); if (!m) return;
                m.workingDays = [...document.querySelectorAll('#avail-days .avail-day.on')].map(d => d.dataset.day);
                m.availableFrom = document.getElementById('avail-from')?.value;
                m.availableTo = document.getElementById('avail-to')?.value;
                m.available = document.getElementById('avail-toggle')?.classList.contains('on');
                saveData(); toast('Disponibilidad actualizada', 'ok');
            }
            function toggleAvail(el) {
                el.classList.toggle('on');
                const on = el.classList.contains('on');
                const lbl = document.getElementById('avail-lbl') || document.getElementById('dash-status-lbl');
                if (lbl) lbl.textContent = on ? 'Disponible para recibir solicitudes' : 'No disponible';
                const m = MECHANICS.find(x => x.userId === CU?.id);
                if (m) { m.available = on; saveData(); }
            }
            function drawEarningsChart(m, canvasId = 'earnings-chart') {
                const canvas = document.getElementById(canvasId); if (!canvas) return;
                const base = m ? Math.floor(m.earnings * 0.04) : 100;
                const data = [base * 0.6, base * 0.9, base * 0.7, base * 1.1, base * 0.8, base * 1.3, base * 1.0];
                if (earningsChart) earningsChart.destroy();
                earningsChart = new Chart(canvas, { type: 'bar', data: { labels: ['L', 'M', 'X', 'J', 'V', 'S', 'D'], datasets: [{ data, backgroundColor: 'rgba(37,99,235,.6)', borderRadius: 4 }] }, options: { plugins: { legend: { display: false } }, scales: { x: { grid: { color: 'rgba(255,255,255,.05)' }, ticks: { color: '#6B7280' } }, y: { grid: { color: 'rgba(255,255,255,.05)' }, ticks: { color: '#6B7280' } } }, responsive: true, maintainAspectRatio: false } });
            }
            function drawStatsCharts(m, mb) {
                const cats = SERVICES.filter(s => s.mechId === m?.id).map(s => s.cat);
                const catCounts = {}; cats.forEach(c => { catCounts[c] = (catCounts[c] || 0) + 1; });
                const c1 = document.getElementById('stats-chart1');
                if (c1) statsChart = new Chart(c1, { type: 'doughnut', data: { labels: Object.keys(catCounts), datasets: [{ data: Object.values(catCounts), backgroundColor: COLORS.slice(0, Object.keys(catCounts).length) }] }, options: { plugins: { legend: { position: 'bottom', labels: { color: '#9CA3AF', font: { size: 11 } } } }, responsive: true, maintainAspectRatio: false } });
                const c2 = document.getElementById('stats-chart2');
                if (c2) new Chart(c2, { type: 'line', data: { labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'], datasets: [{ data: [8, 12, 9, 15, 11, 18], borderColor: '#2563EB', backgroundColor: 'rgba(37,99,235,.1)', fill: true, tension: .4 }] }, options: { plugins: { legend: { display: false } }, scales: { x: { grid: { color: 'rgba(255,255,255,.05)' }, ticks: { color: '#6B7280' } }, y: { grid: { color: 'rgba(255,255,255,.05)' }, ticks: { color: '#6B7280' } } }, responsive: true, maintainAspectRatio: false } });
            }

            // ════════════════════════════════════════════════════════════
