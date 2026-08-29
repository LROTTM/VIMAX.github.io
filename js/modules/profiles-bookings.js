            //  PROFILES
            // ════════════════════════════════════════════════════════════
            function viewProfile(mechId) {
                const m = MECHANICS.find(x => x.id === mechId);
                if (!m) return;
                const svcs = SERVICES.filter(s => s.mechId === mechId && s.active);
                const revs = REVIEWS.filter(r => r.mechId === mechId);
                const idx = MECHANICS.indexOf(m);
                const c = document.getElementById('profile-content');
                c.innerHTML = `
  <button class="btn btn-o btn-sm" style="margin-bottom:14px" onclick="goPage('search')"><i class="ti ti-arrow-left"></i> Volver</button>
  <div class="prof-hero">
    <div class="av prof-big" style="${avatarStyle(idx)}color:#fff">${initials(m.name)}</div>
    <div style="flex:1;min-width:0">
      <div style="display:flex;align-items:flex-start;justify-content:space-between;flex-wrap:wrap;gap:12px">
        <div>
          <h2 style="font-size:20px">${m.name}</h2>
          <p style="color:var(--tx2);margin-top:3px;font-size:13px"><i class="ti ti-map-pin" style="font-size:13px"></i> ${m.city} · ${m.dist.toFixed(1)} km</p>
          <div class="stars" style="font-size:15px;margin-top:5px">${'★'.repeat(Math.round(m.rating))}<span style="color:var(--tx2);font-size:13px"> ${m.rating} — ${m.jobs} trabajos</span></div>
          <p style="color:var(--tx2);font-size:13px;margin-top:8px;max-width:400px">${m.bio || 'Sin descripción.'}</p>
        </div>
        <div style="display:flex;gap:7px;flex-wrap:wrap">
          <button class="btn btn-p" onclick="openChatWith('${m.userId}')"><i class="ti ti-message-2"></i> Mensaje</button>
          <button class="btn btn-o" onclick="openBooking('${m.id}',null,'${m.name}')"><i class="ti ti-bolt"></i> Contratar</button>
        </div>
      </div>
      <div class="pbadges">
        ${m.verified ? `<span class="badge bg"><i class="ti ti-shield-check" style="font-size:10px"></i> Verificado</span>` : `<span class="badge bw"><i class="ti ti-clock" style="font-size:10px"></i> Pendiente verificación</span>`}
        <span class="badge ${m.available ? 'bg' : 'br'}">${m.available ? 'Disponible ahora' : 'No disponible'}</span>
        ${m.jobs >= 100 ? `<span class="badge bw"><i class="ti ti-star" style="font-size:10px"></i> Top Mecánico</span>` : ''}
        <span class="badge ba">${m.exp} años exp.</span>
      </div>
    </div>
  </div>
  <div class="g2">
    <div>
      <div class="card" style="margin-bottom:14px">
        <div class="ct">Estadísticas</div>
        <div class="metric-grid" style="grid-template-columns:repeat(3,1fr)">
          <div class="mc"><div class="ml">Trabajos</div><div class="mv">${m.jobs}</div></div>
          <div class="mc"><div class="ml">Calificación</div><div class="mv" style="color:var(--gold)">${m.rating}</div></div>
          <div class="mc"><div class="ml">Satisfacción</div><div class="mv" style="color:var(--ok)">${m.jobs > 0 ? '99%' : '—'}</div></div>
        </div>
        <div style="margin-top:10px"><div style="display:flex;justify-content:space-between;font-size:12px;color:var(--tx2);margin-bottom:4px"><span>Tasa de respuesta</span><span>95%</span></div><div class="prog"><div class="prog-bar" style="width:95%"></div></div></div>
        <div style="margin-top:8px"><div style="display:flex;justify-content:space-between;font-size:12px;color:var(--tx2);margin-bottom:4px"><span>Satisfacción general</span><span>99%</span></div><div class="prog"><div class="prog-bar" style="width:99%"></div></div></div>
      </div>
      <div class="card">
        <div class="ct">Servicios que ofrece</div>
        <div style="display:flex;flex-direction:column;gap:9px">
        ${svcs.length ? svcs.map(s => `
          <div style="display:flex;justify-content:space-between;align-items:center;padding:10px;background:var(--bg3);border-radius:8px">
            <div><div style="font-size:13px;font-weight:500">${s.name}</div><div style="font-size:11px;color:var(--tx3)">${s.time}</div></div>
            <div style="text-align:right"><div style="font-weight:600;color:var(--ok)">Bs. ${s.price}</div><button class="btn btn-p btn-sm" style="margin-top:4px" onclick="openBooking('${m.id}','${s.id}','${m.name}','${s.name}')">Contratar</button></div>
          </div>`).join('') : '<p style="color:var(--tx3);font-size:13px">Sin servicios publicados.</p>'}
        </div>
      </div>
    </div>
    <div>
      <div class="card">
        <div class="ct">Reseñas de clientes <span class="badge ba">${revs.length} reseñas</span></div>
        <div style="display:flex;flex-direction:column;gap:12px">
        ${revs.length ? revs.map(r => {
                    const u = USERS.find(x => x.id === r.clientId);
                    return `<div style="padding:11px;background:var(--bg3);border-radius:8px">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">
              <div class="av" style="width:28px;height:28px;font-size:11px;${avatarStyle(USERS.indexOf(u))}color:#fff">${initials(u ? u.fname + ' ' + u.lname : '?')}</div>
              <div style="font-size:13px;font-weight:500">${u ? u.fname + ' ' + u.lname : 'Usuario'}</div>
              <div class="stars" style="font-size:12px;margin-left:auto">${'★'.repeat(r.rating)}</div>
            </div>
            <p style="font-size:13px;color:var(--tx2)">"${r.comment || 'Sin comentario.'}"</p>
            <div style="font-size:11px;color:var(--tx3);margin-top:5px">${fmtTime(r.date)}</div>
          </div>`;
                }).join('') : `<p style="color:var(--tx3);font-size:13px">Sin reseñas aún.</p>`}
        </div>
        ${CU && CU.role === 'client' ? `<button class="btn btn-o btn-sm" style="margin-top:12px;width:100%" onclick="document.getElementById('rev-mech-id').value='${m.id}';openModal('modalReview')"><i class="ti ti-star"></i> Escribir reseña</button>` : ''}
      </div>
    </div>
  </div>`;
                goPage('profile');
            }

            function showMyProfile() {
                if (!CU) return;
                const m = MECHANICS.find(x => x.userId === CU.id);
                const c = document.getElementById('myprofile-content');
                const idx = USERS.indexOf(CU);
                c.innerHTML = `
  <div class="ph"><h2>Mi Perfil</h2><button class="btn btn-p" onclick="saveMyProfile()"><i class="ti ti-check"></i> Guardar cambios</button></div>
  <div class="g2">
    <div>
      <div class="card" style="margin-bottom:14px;text-align:center">
        <div class="av" style="width:72px;height:72px;font-size:24px;${avatarStyle(idx)}color:#fff;margin:0 auto 12px">${initials(CU.fname + ' ' + CU.lname)}</div>
        <div style="font-size:16px;font-weight:600">${CU.fname} ${CU.lname}</div>
        <div style="font-size:13px;color:var(--tx2);margin-top:4px">${CU.email}</div>
        <span class="badge ${CU.role === 'mechanic' ? 'bw' : CU.role === 'admin' ? 'br' : 'ba'}" style="margin-top:8px;display:inline-flex">${CU.role === 'mechanic' ? 'Mecánico' : CU.role === 'admin' ? 'Administrador' : 'Cliente'}</span>
      </div>
      <div class="card">
        <div class="ct">Datos personales</div>
        <div class="fr"><div class="fg"><label class="fl">Nombre</label><input class="fi" id="mp-fname" value="${CU.fname}"></div><div class="fg"><label class="fl">Apellido</label><input class="fi" id="mp-lname" value="${CU.lname}"></div></div>
        <div class="fg"><label class="fl">Correo</label><input class="fi" id="mp-email" value="${CU.email}"></div>
        <div class="fg"><label class="fl">Nueva contraseña</label><input class="fi" id="mp-pass" type="password" placeholder="Dejar en blanco para no cambiar"></div>
        ${m ? `<div class="fg"><label class="fl">Teléfono</label><input class="fi" id="mp-phone" value="${m.phone || ''}"></div><div class="fg"><label class="fl">Descripción / Bio</label><textarea class="fi" id="mp-bio" rows="3">${m.bio || ''}</textarea></div>` : ''}
      </div>
    </div>
    <div>
      <div class="card">
        <div class="ct">Historial de servicios</div>
        ${renderMyHistory()}
      </div>
    </div>
  </div>`;
            }
            function saveMyProfile() {
                CU.fname = document.getElementById('mp-fname')?.value.trim() || CU.fname;
                CU.lname = document.getElementById('mp-lname')?.value.trim() || CU.lname;
                CU.email = document.getElementById('mp-email')?.value.trim() || CU.email;
                const np = document.getElementById('mp-pass')?.value;
                if (np && np.length >= 6) CU.pass = np;
                const ui = USERS.findIndex(x => x.id === CU.id);
                if (ui >= 0) USERS[ui] = { ...USERS[ui], ...CU };
                const m = MECHANICS.find(x => x.userId === CU.id);
                if (m) {
                    m.phone = document.getElementById('mp-phone')?.value || m.phone;
                    m.bio = document.getElementById('mp-bio')?.value || m.bio;
                }
                saveData(); setCU(CU); toast('Perfil actualizado', 'ok');
            }
            function renderMyHistory() {
                const bks = BOOKINGS.filter(b => b.clientId === CU.id || MECHANICS.find(m => m.id === b.mechId && m.userId === CU.id));
                if (!bks.length) return '<p style="color:var(--tx3);font-size:13px">Sin historial de servicios.</p>';
                return bks.slice(0, 5).map(b => {
                    const m = MECHANICS.find(x => x.id === b.mechId);
                    const s = SERVICES.find(x => x.id === b.svcId);
                    const sc = { PENDING: 'bw', ACCEPTED: 'ba', IN_PROGRESS: 'bp', COMPLETED: 'bg', CANCELLED: 'br' };
                    return `<div style="padding:9px;background:var(--bg3);border-radius:8px;margin-bottom:7px">
      <div style="display:flex;justify-content:space-between;margin-bottom:4px"><span style="font-size:13px;font-weight:500">${s ? s.name : b.desc.substring(0, 30)}</span><span class="badge ${sc[b.status] || 'ba'}">${b.status}</span></div>
      <div style="font-size:12px;color:var(--tx3)">${m ? m.name : 'Mecánico'} · ${fmtTime(b.date)}</div>
    </div>`;
                }).join('');
            }

            // ════════════════════════════════════════════════════════════
            //  BOOKING
            // ════════════════════════════════════════════════════════════
            function openBooking(mechId, svcId, mechName, svcName) {
                if (!requireAuth()) return;
                document.getElementById('book-mech-id').value = mechId;
                document.getElementById('book-svc-id').value = svcId || '';
                document.getElementById('book-title').textContent = `Contratar — ${mechName}${svcName ? ' (' + svcName + ')' : ''}`;
                const now = new Date(); now.setHours(now.getHours() + 1);
                document.getElementById('book-date').value = now.toISOString().slice(0, 16);
                openModal('modalBook');
            }
            function submitBooking() {
                if (!requireAuth()) return;
                const mechId = document.getElementById('book-mech-id').value;
                const svcId = document.getElementById('book-svc-id').value;
                const desc = document.getElementById('book-desc').value.trim();
                const brand = document.getElementById('book-brand').value.trim();
                const loc = document.getElementById('book-loc').value.trim();
                if (!desc || !brand || !loc) { toast('Completa todos los campos', 'warn'); return; }
                const svc = SERVICES.find(x => x.id === svcId);
                const b = { id: 'b' + Date.now(), clientId: CU.id, mechId, svcId: svcId || null, status: 'PENDING', desc, brand, year: document.getElementById('book-year').value, loc, date: new Date().toISOString(), price: svc ? svc.price : null, express: false };
                BOOKINGS.push(b);
                // add notification to mechanic
                const m = MECHANICS.find(x => x.id === mechId);
                if (m) { NOTIFS.push({ id: 'n' + Date.now(), userId: m.userId, type: 'request', title: 'Nueva solicitud de servicio', body: `${CU.fname} ${CU.lname} solicitó: ${desc.substring(0, 60)}`, read: false, time: new Date().toISOString() }); }
                saveData(); closeModal('modalBook');
                toast('Solicitud enviada al mecánico', 'ok');
            }
            function sendExpress() {
                if (!requireAuth()) { closeModal('modalExpress'); return; }
                const type = document.getElementById('ex-type').value;
                const desc = document.getElementById('ex-desc').value.trim();
                if (!desc) { toast('Describe el problema', 'warn'); return; }
                MECHANICS.filter(m => m.available).forEach(m => {
                    NOTIFS.push({ id: 'n' + Date.now() + '_' + m.id, userId: m.userId, type: 'request', title: '⚡ Solicitud Express', body: `${CU.fname}: ${type} — ${desc.substring(0, 60)}`, read: false, time: new Date().toISOString() });
                });
                saveData(); closeModal('modalExpress');
                toast('Solicitud express enviada a mecánicos cercanos!', 'ok');
            }

