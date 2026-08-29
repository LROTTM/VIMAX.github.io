            //  SUPPORT
            // ════════════════════════════════════════════════════════════
            function initSupport() {
                setSupportSection('all');
            }
            function setSupportSection(s) {
                document.querySelectorAll('#page-support .sidebar .si').forEach(b => b.classList.remove('on'));
                const btn = document.getElementById('ssi-' + s); if (btn) btn.classList.add('on');
                const sm = document.getElementById('support-main'); if (!sm) return;
                const filterMap = { all: null, pending: 'OPEN', progress: 'IN_PROGRESS', resolved: 'RESOLVED' };
                if (['all', 'pending', 'progress', 'resolved'].includes(s)) {
                    const status = filterMap[s];
                    const list = status ? TICKETS.filter(t => t.status === status) : TICKETS;
                    sm.innerHTML = `
    <div class="ph"><h2>Tickets de Soporte</h2><button class="btn btn-p" onclick="openModal('modalTicket')"><i class="ti ti-plus"></i> Nuevo Ticket</button></div>
    <div class="metric-grid" style="grid-template-columns:repeat(4,1fr);margin-bottom:16px">
      <div class="mc"><div class="ml">Pendientes</div><div class="mv" style="color:var(--warn)">${TICKETS.filter(t => t.status === 'OPEN').length}</div></div>
      <div class="mc"><div class="ml">En proceso</div><div class="mv" style="color:var(--acc3)">${TICKETS.filter(t => t.status === 'IN_PROGRESS').length}</div></div>
      <div class="mc"><div class="ml">Resueltos</div><div class="mv" style="color:var(--ok)">${TICKETS.filter(t => t.status === 'RESOLVED').length}</div></div>
      <div class="mc"><div class="ml">T. resp.</div><div class="mv">2.4h</div></div>
    </div>
    ${list.sort((a, b) => new Date(b.date) - new Date(a.date)).map(t => renderTicketCard(t)).join('') || '<p style="color:var(--tx3);padding:20px 0">Sin tickets en esta categoría.</p>'}`;
                } else if (s === 'sreports') { sm.innerHTML = renderReports(); }
                else if (s === 'mod') { sm.innerHTML = renderModeration(); }
                else if (s === 'actlog') { sm.innerHTML = renderActionLog(); }
            }
            function renderTicketCard(t) {
                const priC = { URGENT: 'var(--err)', HIGH: 'var(--warn)', NORMAL: 'var(--acc)', LOW: 'var(--tx3)' };
                const sc = { OPEN: 'br', IN_PROGRESS: 'ba', RESOLVED: 'bg', CLOSED: 'bw' };
                const u = USERS.find(x => x.id === t.userId);
                return `<div class="tcard" style="border-left:3px solid ${priC[t.pri]}" onclick="openTicketDetail('${t.id}')">
    <div class="thead2">
      <span style="font-size:12px;color:var(--tx3)">${t.num}</span>
      <span class="badge ${sc[t.status]}">${t.status}</span>
    </div>
    <div class="ttitle">${t.title}</div>
    <div class="tmeta">
      <span><i class="ti ti-user" style="font-size:11px"></i> ${u ? u.fname + ' ' + u.lname : 'Usuario'}</span>
      <span><i class="ti ti-clock" style="font-size:11px"></i> ${fmtTime(t.date)}</span>
      <span><i class="ti ti-category" style="font-size:11px"></i> ${t.cat}</span>
      <span class="badge bw" style="font-size:10px">${t.pri}</span>
    </div>
  </div>`;
            }
            function renderReports() {
                const reports = [
                    { id: 'rep1', type: 'Comportamiento', from: 'María Torres', against: 'Mecánico Carlos G.', date: new Date(Date.now() - 86400000).toISOString(), status: 'Pendiente' },
                    { id: 'rep2', type: 'Perfil falso', from: 'Juan Pérez', against: 'Usuario anónimo', date: new Date(Date.now() - 172800000).toISOString(), status: 'En revisión' },
                    { id: 'rep3', type: 'Fraude', from: 'Ana López', against: 'Cliente desconocido', date: new Date(Date.now() - 259200000).toISOString(), status: 'Resuelto' },
                ];
                return `<div class="ph"><h2>Reportes</h2></div>
  <div class="tw"><table><thead><tr><th>Tipo</th><th>Reportado por</th><th>Contra</th><th>Fecha</th><th>Estado</th><th></th></tr></thead><tbody>
  ${reports.map(r => `<tr>
    <td style="color:var(--tx1)">${r.type}</td><td>${r.from}</td><td>${r.against}</td>
    <td>${new Date(r.date).toLocaleDateString('es')}</td>
    <td><span class="badge ${r.status === 'Resuelto' ? 'bg' : r.status === 'En revisión' ? 'ba' : 'bw'}">${r.status}</span></td>
    <td><button class="btn btn-p btn-sm" onclick="toast('Reporte marcado como revisado','ok')">Revisar</button></td>
  </tr>`).join('')}
  </tbody></table></div>`;
            }
            function renderModeration() {
                return `<div class="ph"><h2>Moderación de Contenido</h2></div>
  <div class="card" style="margin-bottom:14px">
    <div class="ct">Publicaciones reportadas</div>
    ${SERVICES.slice(0, 3).map(s => {
                    const m = MECHANICS.find(x => x.id === s.mechId); return `
    <div style="display:flex;justify-content:space-between;align-items:center;padding:10px;background:var(--bg3);border-radius:8px;margin-bottom:8px">
      <div><div style="font-size:13px;font-weight:500">${s.name}</div><div style="font-size:12px;color:var(--tx3)">${m ? m.name : 'Mecánico'} · ${s.cat}</div></div>
      <div style="display:flex;gap:6px">
        <button class="btn btn-ok btn-sm" onclick="toast('Publicación aprobada','ok')"><i class="ti ti-check"></i></button>
        <button class="btn btn-err btn-sm" onclick="toast('Publicación suspendida','warn')"><i class="ti ti-ban"></i></button>
      </div>
    </div>`;
                }).join('')}
  </div>
  <div class="card">
    <div class="ct">Cuentas con reportes</div>
    ${USERS.filter(u => u.role === 'mechanic').slice(0, 3).map((u, i) => `
    <div style="display:flex;justify-content:space-between;align-items:center;padding:10px;background:var(--bg3);border-radius:8px;margin-bottom:8px">
      <div class="uc"><div class="av" style="width:28px;height:28px;font-size:11px;${avatarStyle(i)}color:#fff">${initials(u.fname + ' ' + u.lname)}</div><div><div class="un">${u.fname} ${u.lname}</div><div class="us">${u.email}</div></div></div>
      <div style="display:flex;gap:6px">
        <span class="badge bw">${Math.floor(Math.random() * 3) + 1} reportes</span>
        <button class="btn btn-warn btn-sm" onclick="suspendUser('${u.id}')"><i class="ti ti-ban"></i></button>
      </div>
    </div>`).join('')}
  </div>`;
            }
            function renderActionLog() {
                return `<div class="ph"><h2>Historial de Acciones</h2></div>
  <div class="card">
    <div class="tw"><table><thead><tr><th>Administrador</th><th>Acción</th><th>Objetivo</th><th>Razón</th><th>Fecha</th></tr></thead><tbody>
    ${AUDIT.sort((a, b) => new Date(b.date) - new Date(a.date)).map(a => `<tr>
      <td style="color:var(--tx1)">${a.admin}</td>
      <td>${a.action}</td>
      <td style="color:var(--acc3)">${a.target}</td>
      <td style="color:var(--tx3)">${a.reason || '—'}</td>
      <td>${new Date(a.date).toLocaleDateString('es')}</td>
    </tr>`).join('')}
    </tbody></table></div>
  </div>`;
            }
            function suspendUser(id) {
                const u = USERS.find(x => x.id === id); if (!u) return;
                u.status = u.status === 'suspended' ? 'active' : 'suspended';
                AUDIT.push({ id: 'a' + Date.now(), admin: CU?.fname + ' ' + CU?.lname, action: u.status === 'suspended' ? 'Suspendió usuario' : 'Restauró usuario', target: u.fname + ' ' + u.lname, reason: 'Acción de moderación', date: new Date().toISOString() });
                saveData(); toast(`Usuario ${u.status === 'suspended' ? 'suspendido' : 'restaurado'}`, u.status === 'suspended' ? 'warn' : 'ok');
            }

            // ════════════════════════════════════════════════════════════
