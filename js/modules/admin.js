            //  ADMIN
            // ════════════════════════════════════════════════════════════
            let adminSection = 'overview';
            function initAdmin() {
                const rl = document.getElementById('admin-role-lbl');
                if (rl) rl.textContent = CU?.role === 'admin' ? 'Super Administrador' : 'Sin acceso';
                setAdminSection(adminSection);
            }
            function setAdminSection(s) {
                adminSection = s;
                document.querySelectorAll('#page-admin .sidebar .si').forEach(b => b.classList.remove('on'));
                const btn = document.getElementById('asi-' + s); if (btn) btn.classList.add('on');
                const am = document.getElementById('admin-main'); if (!am) return;
                switch (s) {
                    case 'overview': am.innerHTML = renderAdminOverview(); setTimeout(() => drawAdminCharts(), 50); break;
                    case 'users': am.innerHTML = renderAdminUsers(); break;
                    case 'mechanics': am.innerHTML = renderAdminMechanics(); break;
                    case 'admins': am.innerHTML = renderAdminAdmins(); break;
                    case 'pubs': am.innerHTML = renderAdminPubs(); break;
                    case 'reports': am.innerHTML = renderAdminReports(); break;
                    case 'security': am.innerHTML = renderAdminSecurity(); break;
                    case 'audit': am.innerHTML = renderAdminAudit(); break;
                    case 'astats': am.innerHTML = renderAdminStats(); setTimeout(() => drawAdminStatsCharts(), 50); break;
                    case 'config': am.innerHTML = renderAdminConfig(); break;
                }
            }
            function renderAdminOverview() {
                return `<div class="ph"><h2>Panel de Administración</h2>
  <div style="display:flex;gap:7px"><button class="btn btn-o btn-sm" onclick="openModal('modalNewAdmin')"><i class="ti ti-user-plus"></i> Nuevo Admin</button><button class="btn btn-p btn-sm" onclick="setAdminSection('overview');toast('Datos actualizados','ok')"><i class="ti ti-refresh"></i></button></div></div>
  <div class="metric-grid">
    <div class="mc"><div class="ml">Usuarios Totales</div><div class="mv">${USERS.length.toLocaleString()}</div><div class="ms up"><i class="ti ti-trending-up" style="font-size:11px"></i> +${Math.floor(USERS.length * .13)} esta semana</div></div>
    <div class="mc"><div class="ml">Mecánicos Activos</div><div class="mv">${MECHANICS.filter(m => m.status === 'verified').length}</div><div class="ms up"><i class="ti ti-trending-up" style="font-size:11px"></i> +3 esta semana</div></div>
    <div class="mc"><div class="ml">Servicios del Mes</div><div class="mv">${BOOKINGS.length * 12}</div><div class="ms up"><i class="ti ti-trending-up" style="font-size:11px"></i> +12.4%</div></div>
    <div class="mc"><div class="ml">Reportes Abiertos</div><div class="mv" style="color:var(--err)">${TICKETS.filter(t => t.status === 'OPEN').length}</div><div class="ms dn">Requiere atención</div></div>
    <div class="mc"><div class="ml">Ingresos Plataforma</div><div class="mv" style="color:var(--ok)">Bs. ${(MECHANICS.reduce((a, m) => a + m.earnings, 0) * 0.1).toLocaleString()}</div><div class="ms up"><i class="ti ti-trending-up" style="font-size:11px"></i> +23%</div></div>
    <div class="mc"><div class="ml">Uptime Sistema</div><div class="mv" style="color:var(--ok)">99.9%</div><div class="ms neu">Último 30 días</div></div>
  </div>
  <div class="g2">
    <div class="card"><div class="ct">Crecimiento de usuarios</div><div class="chart-wrap"><canvas id="admin-chart1"></canvas></div></div>
    <div class="card"><div class="ct">Actividad reciente</div>
    ${AUDIT.slice(0, 5).map(a => `<div style="display:flex;gap:9px;padding:8px 0;border-bottom:1px solid var(--bdr)">
      <i class="ti ti-activity" style="color:var(--acc3);font-size:14px;margin-top:2px"></i>
      <div><div style="font-size:13px">${a.action} — <span style="color:var(--acc3)">${a.target}</span></div><div style="font-size:11px;color:var(--tx3)">${a.admin} · ${fmtTime(a.date)}</div></div>
    </div>`).join('')}
    </div>
  </div>`;
            }
            function renderAdminUsers() {
                return `<div class="ph"><h2>Gestión de Usuarios</h2>
  <div style="display:flex;gap:7px"><input class="fi" placeholder="Buscar usuario..." id="au-search" style="width:220px" oninput="filterAdminUsers(this.value)"><select class="fi" id="au-role" style="width:140px" onchange="filterAdminUsers(document.getElementById('au-search').value)"><option value="">Todos los roles</option><option value="client">Clientes</option><option value="mechanic">Mecánicos</option><option value="admin">Admins</option><option value="support">Soporte</option></select></div></div>
  <div class="card">
    <div class="tw"><table><thead><tr><th>Usuario</th><th>Rol</th><th>Estado</th><th>Registro</th><th>Acciones</th></tr></thead><tbody id="users-table">
    ${renderUsersRows(USERS)}
    </tbody></table></div>
  </div>`;
            }
            function renderUsersRows(list) {
                const rmap = { client: 'ba', mechanic: 'bw', admin: 'br', support: 'bp' };
                return list.map((u, i) => `<tr>
    <td><div class="uc"><div class="av" style="width:28px;height:28px;font-size:11px;${avatarStyle(i)}color:#fff">${initials(u.fname + ' ' + u.lname)}</div><div><div class="un">${u.fname} ${u.lname}</div><div class="us">${u.email}</div></div></div></td>
    <td><span class="badge ${rmap[u.role] || 'ba'}">${u.role}</span></td>
    <td><span class="sta ${u.status === 'active' ? 'sta-on' : u.status === 'suspended' ? 'sta-busy' : 'sta-off'}">${u.status}</span></td>
    <td style="color:var(--tx3)">${u.joined || '—'}</td>
    <td><div style="display:flex;gap:4px">
      <button class="btn btn-o btn-sm" onclick="viewUserDetail('${u.id}')"><i class="ti ti-eye"></i></button>
      <button class="btn ${u.status === 'suspended' ? 'btn-ok' : 'btn-warn'} btn-sm" onclick="toggleUserStatus('${u.id}')"><i class="ti ti-${u.status === 'suspended' ? 'player-play' : 'ban'}"></i></button>
      <button class="btn btn-err btn-sm" onclick="deleteUser('${u.id}')"><i class="ti ti-trash"></i></button>
    </div></td>
  </tr>`).join('');
            }
            function filterAdminUsers(q) {
                const role = document.getElementById('au-role')?.value || '';
                let list = USERS;
                if (q) list = list.filter(u => (u.fname + ' ' + u.lname + u.email).toLowerCase().includes(q.toLowerCase()));
                if (role) list = list.filter(u => u.role === role);
                const tb = document.getElementById('users-table'); if (tb) tb.innerHTML = renderUsersRows(list);
            }
            function viewUserDetail(id) {
                const u = USERS.find(x => x.id === id); if (!u) return;
                const m = MECHANICS.find(x => x.userId === id);
                const bks = BOOKINGS.filter(b => b.clientId === id || (m && b.mechId === m.id));
                document.getElementById('ud-title').textContent = u.fname + ' ' + u.lname;
                document.getElementById('ud-content').innerHTML = `
  <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px">
    <div class="av" style="width:56px;height:56px;font-size:18px;${avatarStyle(USERS.indexOf(u))}color:#fff">${initials(u.fname + ' ' + u.lname)}</div>
    <div><div style="font-size:16px;font-weight:600">${u.fname} ${u.lname}</div><div style="color:var(--tx2);font-size:13px">${u.email}</div><span class="badge ba" style="margin-top:4px;display:inline-flex">${u.role}</span></div>
  </div>
  <div class="metric-grid" style="grid-template-columns:repeat(3,1fr);margin-bottom:14px">
    <div class="mc"><div class="ml">Servicios</div><div class="mv">${bks.length}</div></div>
    ${m ? `<div class="mc"><div class="ml">Rating</div><div class="mv" style="color:var(--gold)">${m.rating}★</div></div><div class="mc"><div class="ml">Ganancias</div><div class="mv" style="color:var(--ok)">Bs. ${m.earnings}</div></div>` : '<div class="mc"><div class="ml">Estado</div><div class="mv">${u.status}</div></div>'}
  </div>
  <div style="display:flex;gap:7px;flex-wrap:wrap">
    <button class="btn ${u.status === 'suspended' ? 'btn-ok' : 'btn-warn'} btn-sm" onclick="toggleUserStatus('${u.id}');closeModal('modalUserDetail');setAdminSection('users')">
      <i class="ti ti-${u.status === 'suspended' ? 'player-play' : 'ban'}"></i> ${u.status === 'suspended' ? 'Restaurar' : 'Suspender'}
    </button>
    <button class="btn btn-o btn-sm" onclick="openChatWith('${u.id}');closeModal('modalUserDetail')"><i class="ti ti-message-2"></i> Enviar mensaje</button>
    <button class="btn btn-err btn-sm" onclick="deleteUser('${u.id}');closeModal('modalUserDetail')"><i class="ti ti-trash"></i> Eliminar</button>
  </div>`;
                openModal('modalUserDetail');
            }
            function toggleUserStatus(id) {
                const u = USERS.find(x => x.id === id); if (!u) return;
                u.status = u.status === 'suspended' ? 'active' : 'suspended';
                AUDIT.push({ id: 'a' + Date.now(), admin: CU?.fname + ' ' + CU?.lname, action: u.status === 'suspended' ? 'Suspendió usuario' : 'Restauró usuario', target: u.fname + ' ' + u.lname, reason: 'Acción admin', date: new Date().toISOString() });
                saveData(); setAdminSection('users'); toast(`Usuario ${u.status === 'suspended' ? 'suspendido' : 'restaurado'}`, u.status === 'suspended' ? 'warn' : 'ok');
            }
            function deleteUser(id) {
                if (!confirm('¿Eliminar permanentemente este usuario?')) return;
                const i = USERS.findIndex(x => x.id === id); if (i >= 0) USERS.splice(i, 1);
                AUDIT.push({ id: 'a' + Date.now(), admin: CU?.fname + ' ' + CU?.lname, action: 'Eliminó usuario', target: id, reason: 'Eliminación permanente', date: new Date().toISOString() });
                saveData(); setAdminSection('users'); toast('Usuario eliminado', 'ok');
            }
            function renderAdminMechanics() {
                return `<div class="ph"><h2>Gestión de Mecánicos</h2><button class="btn btn-p btn-sm" onclick="toast('Exportando datos...','info')"><i class="ti ti-download"></i> Exportar</button></div>
  <div class="card">
    <div class="tw"><table><thead><tr><th>Mecánico</th><th>Especialidad</th><th>Estado</th><th>Rating</th><th>Trabajos</th><th>Ganancias</th><th>Acciones</th></tr></thead><tbody>
    ${MECHANICS.map((m, i) => {
                    const u = USERS.find(x => x.id === m.userId); return `<tr>
      <td><div class="uc"><div class="av" style="width:28px;height:28px;font-size:11px;${avatarStyle(i)}color:#fff">${initials(m.name)}</div><div><div class="un">${m.name}</div><div class="us">${u?.email || ''}</div></div></div></td>
      <td>${m.specialty[0] || '—'}</td>
      <td><span class="badge ${m.status === 'verified' ? 'bg' : m.status === 'pending' ? 'bw' : 'br'}">${m.status}</span></td>
      <td style="color:var(--gold)">${m.rating}★</td>
      <td>${m.jobs}</td>
      <td style="color:var(--ok)">Bs. ${m.earnings.toLocaleString()}</td>
      <td><div style="display:flex;gap:4px">
        ${m.status === 'pending' ? `<button class="btn btn-ok btn-sm" onclick="verifyMechanic('${m.id}')"><i class="ti ti-shield-check"></i></button>` : ''}
        <button class="btn btn-o btn-sm" onclick="viewProfile('${m.id}')"><i class="ti ti-eye"></i></button>
        <button class="btn btn-warn btn-sm" onclick="toggleUserStatus('${m.userId}')"><i class="ti ti-ban"></i></button>
      </div></td>
    </tr>`;
                }).join('')}
    </tbody></table></div>
  </div>`;
            }
            function verifyMechanic(id) {
                const m = MECHANICS.find(x => x.id === id); if (!m) return;
                m.status = 'verified'; m.verified = true;
                AUDIT.push({ id: 'a' + Date.now(), admin: CU?.fname + ' ' + CU?.lname, action: 'Verificó mecánico', target: m.name, reason: 'Documentos validados', date: new Date().toISOString() });
                NOTIFS.push({ id: 'n' + Date.now(), userId: m.userId, type: 'review', title: '¡Perfil verificado!', body: 'Tu perfil fue verificado por el equipo VIMAX. Ahora apareces con el sello de verificación.', read: false, time: new Date().toISOString() });
                saveData(); setAdminSection('mechanics'); toast('Mecánico verificado', 'ok');
            }
            function renderAdminAdmins() {
                const admins = USERS.filter(u => u.role === 'admin' || u.role === 'support');
                return `<div class="ph"><h2>Administradores y Soporte</h2><button class="btn btn-p" onclick="openModal('modalNewAdmin')"><i class="ti ti-user-plus"></i> Nuevo Admin</button></div>
  <div class="card">
    <div class="tw"><table><thead><tr><th>Usuario</th><th>Rol</th><th>Estado</th><th>Registro</th><th>Acciones</th></tr></thead><tbody>
    ${admins.map((u, i) => `<tr>
      <td><div class="uc"><div class="av" style="width:28px;height:28px;font-size:11px;${avatarStyle(i)}color:#fff">${initials(u.fname + ' ' + u.lname)}</div><div><div class="un">${u.fname} ${u.lname}</div><div class="us">${u.email}</div></div></div></td>
      <td><span class="badge ${u.role === 'admin' ? 'br' : 'bp'}">${u.role}</span></td>
      <td><span class="sta sta-on">${u.status}</span></td>
      <td>${u.joined || '—'}</td>
      <td><div style="display:flex;gap:4px">
        <button class="btn btn-warn btn-sm" onclick="if(confirm('¿Revocar acceso?')){deleteUser('${u.id}');setAdminSection('admins')}"><i class="ti ti-user-x"></i> Revocar</button>
        <button class="btn btn-o btn-sm" onclick="toast('Restableciendo acceso...','info')"><i class="ti ti-refresh"></i></button>
      </div></td>
    </tr>`).join('') || '<tr><td colspan="5" style="text-align:center;padding:20px;color:var(--tx3)">Sin administradores adicionales</td></tr>'}
    </tbody></table></div>
  </div>`;
            }
            function createAdmin() {
                const name = document.getElementById('na-name').value.trim();
                const email = document.getElementById('na-email').value.trim();
                const pass = document.getElementById('na-pass').value;
                const role = document.getElementById('na-role').value;
                if (!name || !email || !pass) { toast('Completa todos los campos', 'warn'); return; }
                if (USERS.find(u => u.email === email)) { toast('Este correo ya está registrado', 'err'); return; }
                const parts = name.split(' ');
                const u = { id: 'u' + Date.now(), email, pass, role: role === 'support' ? 'support' : 'admin', fname: parts[0], lname: parts.slice(1).join(' ') || '', status: 'active', joined: new Date().toISOString().split('T')[0] };
                USERS.push(u);
                AUDIT.push({ id: 'a' + Date.now(), admin: CU?.fname + ' ' + CU?.lname, action: 'Creó cuenta admin', target: name, reason: `Rol: ${role}`, date: new Date().toISOString() });
                saveData(); closeModal('modalNewAdmin'); setAdminSection('admins'); toast('Administrador creado', 'ok');
            }
            function renderAdminPubs() {
                return `<div class="ph"><h2>Publicaciones de Servicios</h2></div>
  <div class="card">
    <div class="tw"><table><thead><tr><th>Servicio</th><th>Mecánico</th><th>Categoría</th><th>Precio</th><th>Estado</th><th>Acciones</th></tr></thead><tbody>
    ${SERVICES.map(s => {
                    const m = MECHANICS.find(x => x.id === s.mechId); return `<tr>
      <td style="color:var(--tx1)">${s.name}</td>
      <td>${m ? m.name : '—'}</td>
      <td>${s.cat}</td>
      <td style="color:var(--ok)">Bs. ${s.price}</td>
      <td><span class="badge ${s.active ? 'bg' : 'bw'}">${s.active ? 'Activo' : 'Inactivo'}</span></td>
      <td><div style="display:flex;gap:4px">
        <button class="btn btn-o btn-sm" onclick="toast('Publicación revisada','info')"><i class="ti ti-eye"></i></button>
        <button class="btn btn-err btn-sm" onclick="toast('Publicación suspendida','warn')"><i class="ti ti-ban"></i></button>
      </div></td>
    </tr>`;
                }).join('')}
    </tbody></table></div>
  </div>`;
            }
            function renderAdminReports() {
                return `<div class="ph"><h2>Reportes del Sistema</h2></div>
  ${renderReports()}
  <div class="card" style="margin-top:14px">
    <div class="ct">Mecánicos con reportes múltiples</div>
    ${MECHANICS.slice(0, 3).map((m, i) => `<div style="display:flex;justify-content:space-between;align-items:center;padding:9px;background:var(--bg3);border-radius:8px;margin-bottom:7px">
      <div class="uc"><div class="av" style="width:28px;height:28px;font-size:11px;${avatarStyle(i)}color:#fff">${initials(m.name)}</div><div><div class="un">${m.name}</div><div class="us">${m.rating}★ · ${m.jobs} trabajos</div></div></div>
      <div style="display:flex;gap:6px"><span class="badge bw">${Math.floor(Math.random() * 3) + 1} rep.</span><button class="btn btn-warn btn-sm" onclick="toggleUserStatus('${m.userId}');setAdminSection('reports')"><i class="ti ti-ban"></i></button></div>
    </div>`).join('')}
  </div>`;
            }
            function renderAdminSecurity() {
                return `<div class="ph"><h2>Centro de Seguridad</h2></div>
  <div class="g2">
    <div class="card">
      <div class="ct">Estado de seguridad</div>
      ${[['JWT Auth', 'ok', 'Activo'], ['Bcrypt Hash', 'ok', 'Activo'], ['Rate Limiting', 'ok', '100 req/min'], ['CORS', 'ok', 'Configurado'], ['CSRF Protection', 'ok', 'Activo'], ['SQL Injection Guard', 'ok', 'Activo'], ['XSS Protection', 'ok', 'Activo'], ['DDoS Básico', 'warn', 'Modo básico']].map(([name, status, val]) => `
      <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid var(--bdr)">
        <div style="display:flex;align-items:center;gap:7px"><i class="ti ti-${status === 'ok' ? 'shield-check' : 'alert-triangle'}" style="color:var(--${status === 'ok' ? 'ok' : 'warn'});font-size:14px"></i><span style="font-size:13px">${name}</span></div>
        <span class="badge ${status === 'ok' ? 'bg' : 'bw'}">${val}</span>
      </div>`).join('')}
    </div>
    <div>
      <div class="card" style="margin-bottom:14px">
        <div class="ct">Accesos sospechosos</div>
        <div style="color:var(--tx3);font-size:13px;text-align:center;padding:20px">Sin alertas activas <i class="ti ti-shield-check" style="color:var(--ok)"></i></div>
      </div>
      <div class="card">
        <div class="ct">Configuración</div>
        <div class="toggle-wrap"><button class="toggle on" onclick="this.classList.toggle('on')"></button><span style="font-size:13px;color:var(--tx2)">2FA Obligatorio para admins</span></div>
        <div class="toggle-wrap" style="margin-top:8px"><button class="toggle on" onclick="this.classList.toggle('on')"></button><span style="font-size:13px;color:var(--tx2)">Logs de auditoría</span></div>
        <div class="toggle-wrap" style="margin-top:8px"><button class="toggle on" onclick="this.classList.toggle('on')"></button><span style="font-size:13px;color:var(--tx2)">Alertas por email</span></div>
        <div class="fg" style="margin-top:12px"><label class="fl">Intentos máximos de login</label><input class="fi" value="5" type="number"></div>
        <button class="btn btn-p btn-sm" style="margin-top:8px" onclick="toast('Configuración guardada','ok')"><i class="ti ti-check"></i> Guardar</button>
      </div>
    </div>
  </div>`;
            }
            function renderAdminAudit() {
                return `<div class="ph"><h2>Registro de Auditoría</h2><button class="btn btn-o btn-sm" onclick="toast('Exportando log...','info')"><i class="ti ti-download"></i> Exportar</button></div>
  <div class="card"><div class="tw"><table><thead><tr><th>Admin</th><th>Acción</th><th>Objetivo</th><th>Razón</th><th>IP</th><th>Fecha</th></tr></thead><tbody>
  ${AUDIT.sort((a, b) => new Date(b.date) - new Date(a.date)).map(a => `<tr>
    <td style="color:var(--tx1)">${a.admin}</td>
    <td><span class="badge ba">${a.action}</span></td>
    <td style="color:var(--acc3)">${a.target}</td>
    <td style="color:var(--tx3)">${a.reason || '—'}</td>
    <td style="color:var(--tx3)">192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}</td>
    <td>${new Date(a.date).toLocaleString('es')}</td>
  </tr>`).join('')}
  </tbody></table></div></div>`;
            }
            function renderAdminStats() {
                return `<div class="ph"><h2>Estadísticas del Sistema</h2></div>
  <div class="metric-grid">
    <div class="mc"><div class="ml">Total usuarios</div><div class="mv">${USERS.length}</div></div>
    <div class="mc"><div class="ml">Mecánicos verificados</div><div class="mv">${MECHANICS.filter(m => m.verified).length}</div></div>
    <div class="mc"><div class="ml">Servicios registrados</div><div class="mv">${SERVICES.length}</div></div>
    <div class="mc"><div class="ml">Reservas totales</div><div class="mv">${BOOKINGS.length}</div></div>
    <div class="mc"><div class="ml">Reseñas</div><div class="mv">${REVIEWS.length}</div></div>
    <div class="mc"><div class="ml">Tickets</div><div class="mv">${TICKETS.length}</div></div>
  </div>
  <div class="g2">
    <div class="card"><div class="ct">Usuarios por rol</div><div class="chart-wrap"><canvas id="astat1"></canvas></div></div>
    <div class="card"><div class="ct">Servicios por categoría</div><div class="chart-wrap"><canvas id="astat2"></canvas></div></div>
  </div>`;
            }
            function renderAdminConfig() {
                return `<div class="ph"><h2>Configuración del Sistema</h2><button class="btn btn-p" onclick="toast('Configuración guardada','ok')"><i class="ti ti-check"></i> Guardar todo</button></div>
  <div class="g2">
    <div class="card">
      <div class="ct">General</div>
      <div class="fg"><label class="fl">Nombre de la plataforma</label><input class="fi" value="VIMAX"></div>
      <div class="fg"><label class="fl">URL de la plataforma</label><input class="fi" value="https://vimax.bo"></div>
      <div class="fg"><label class="fl">Comisión de la plataforma (%)</label><input class="fi" type="number" value="10"></div>
      <div class="fg"><label class="fl">Email de contacto</label><input class="fi" value="info@vimax.bo"></div>
      <div class="fg"><label class="fl">Ciudad por defecto</label><input class="fi" value="La Paz, Bolivia"></div>
    </div>
    <div>
      <div class="card" style="margin-bottom:14px">
        <div class="ct">Funciones</div>
        <div class="toggle-wrap"><button class="toggle on" onclick="this.classList.toggle('on')"></button><span style="font-size:13px;color:var(--tx2)">Registro de clientes</span></div>
        <div class="toggle-wrap" style="margin-top:8px"><button class="toggle on" onclick="this.classList.toggle('on')"></button><span style="font-size:13px;color:var(--tx2)">Registro de mecánicos</span></div>
        <div class="toggle-wrap" style="margin-top:8px"><button class="toggle on" onclick="this.classList.toggle('on')"></button><span style="font-size:13px;color:var(--tx2)">Solicitudes express</span></div>
        <div class="toggle-wrap" style="margin-top:8px"><button class="toggle" onclick="this.classList.toggle('on')"></button><span style="font-size:13px;color:var(--tx2)">Modo mantenimiento</span></div>
      </div>
      <div class="card">
        <div class="ct">Notificaciones</div>
        <div class="toggle-wrap"><button class="toggle on" onclick="this.classList.toggle('on')"></button><span style="font-size:13px;color:var(--tx2)">Notificaciones email</span></div>
        <div class="toggle-wrap" style="margin-top:8px"><button class="toggle on" onclick="this.classList.toggle('on')"></button><span style="font-size:13px;color:var(--tx2)">Notificaciones push</span></div>
        <div class="toggle-wrap" style="margin-top:8px"><button class="toggle" onclick="this.classList.toggle('on')"></button><span style="font-size:13px;color:var(--tx2)">SMS (Twilio)</span></div>
      </div>
    </div>
  </div>`;
            }
            function drawAdminCharts() {
                const c1 = document.getElementById('admin-chart1');
                if (c1) new Chart(c1, { type: 'line', data: { labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul'], datasets: [{ label: 'Usuarios', data: [120, 210, 340, 480, 620, 780, 950], borderColor: '#2563EB', backgroundColor: 'rgba(37,99,235,.1)', fill: true, tension: .4 }, { label: 'Mecánicos', data: [20, 45, 80, 110, 140, 165, 190], borderColor: '#10B981', backgroundColor: 'rgba(16,185,129,.1)', fill: true, tension: .4 }] }, options: { plugins: { legend: { labels: { color: '#9CA3AF', font: { size: 11 } } } }, scales: { x: { grid: { color: 'rgba(255,255,255,.05)' }, ticks: { color: '#6B7280' } }, y: { grid: { color: 'rgba(255,255,255,.05)' }, ticks: { color: '#6B7280' } } }, responsive: true, maintainAspectRatio: false } });
            }
            function drawAdminStatsCharts() {
                const roles = USERS.reduce((a, u) => { a[u.role] = (a[u.role] || 0) + 1; return a; }, {});
                const c1 = document.getElementById('astat1');
                if (c1) new Chart(c1, { type: 'pie', data: { labels: Object.keys(roles), datasets: [{ data: Object.values(roles), backgroundColor: COLORS.slice(0, Object.keys(roles).length) }] }, options: { plugins: { legend: { position: 'bottom', labels: { color: '#9CA3AF', font: { size: 11 } } } }, responsive: true, maintainAspectRatio: false } });
                const cats = SERVICES.reduce((a, s) => { a[s.cat] = (a[s.cat] || 0) + 1; return a; }, {});
                const c2 = document.getElementById('astat2');
                if (c2) new Chart(c2, { type: 'bar', data: { labels: Object.keys(cats), datasets: [{ data: Object.values(cats), backgroundColor: COLORS }] }, options: { plugins: { legend: { display: false } }, scales: { x: { grid: { color: 'rgba(255,255,255,.05)' }, ticks: { color: '#6B7280' } }, y: { grid: { color: 'rgba(255,255,255,.05)' }, ticks: { color: '#6B7280' } } }, responsive: true, maintainAspectRatio: false } });
            }

