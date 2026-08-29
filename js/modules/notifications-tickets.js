            //  NOTIFICATIONS
            // ════════════════════════════════════════════════════════════
            function renderNotifs() {
                const list = document.getElementById('notif-list'); if (!list) return;
                const myNotifs = NOTIFS.filter(n => n.userId === (CU?.id || 'u1')).sort((a, b) => new Date(b.time) - new Date(a.time));
                const icons = { request: 'ti-list-check', review: 'ti-star', payment: 'ti-cash', ticket: 'ti-ticket', booking: 'ti-calendar' };
                list.innerHTML = myNotifs.length ? myNotifs.map(n => `
  <div class="notif" onclick="markRead('${n.id}')">
    <div class="ndot ${n.read ? 'r' : ''}"></div>
    <div style="flex:1">
      <div style="font-size:13px;font-weight:${n.read ? '400' : '600'}">${n.title}</div>
      <div style="font-size:13px;color:var(--tx2);margin-top:2px">${n.body}</div>
      <div style="font-size:11px;color:var(--tx3);margin-top:4px">${fmtTime(n.time)}</div>
    </div>
  </div>`).join('') : '<p style="color:var(--tx3);padding:24px;text-align:center">Sin notificaciones</p>';
            }
            function markRead(id) { const n = NOTIFS.find(x => x.id === id); if (n) { n.read = true; saveData(); renderNotifs(); } }
            function markAllRead() { NOTIFS.forEach(n => { if (n.userId === CU?.id) n.read = true; }); saveData(); renderNotifs(); toast('Todas marcadas como leídas', 'ok'); }

            // ════════════════════════════════════════════════════════════
            //  TICKETS
            // ════════════════════════════════════════════════════════════
            function createTicket() {
                if (!requireAuth()) return;
                const cat = document.getElementById('tk-cat').value;
                const pri = document.getElementById('tk-pri').value;
                const title = document.getElementById('tk-title').value.trim();
                const desc = document.getElementById('tk-desc').value.trim();
                if (!title || !desc) { toast('Completa el título y descripción', 'warn'); return; }
                const t = { id: 't' + Date.now(), num: '#' + Math.floor(1000 + Math.random() * 9000), userId: CU.id, cat, pri, status: 'OPEN', title, desc, date: new Date().toISOString(), replies: [] };
                TICKETS.push(t); saveData(); closeModal('modalTicket');
                toast('Ticket creado. El equipo de soporte te contactará pronto.', 'ok');
                if (document.getElementById('page-support')?.classList.contains('show')) setSupportSection(document.querySelector('#page-support .si.on')?.id?.replace('ssi-', '') || 'all');
            }
            function openTicketDetail(id) {
                const t = TICKETS.find(x => x.id === id); if (!t) return;
                const u = USERS.find(x => x.id === t.userId);
                const sc = { OPEN: 'br', IN_PROGRESS: 'ba', RESOLVED: 'bg', CLOSED: 'bw' };
                document.getElementById('td-title').textContent = `${t.num} — ${t.title}`;
                document.getElementById('td-content').innerHTML = `
  <div style="display:flex;align-items:center;gap:8px;margin-bottom:14px;flex-wrap:wrap">
    <span class="badge ${sc[t.status]}">${t.status}</span>
    <span class="badge bw">${t.pri}</span>
    <span class="badge ba">${t.cat}</span>
  </div>
  <div style="background:var(--bg3);border-radius:8px;padding:12px;margin-bottom:14px">
    <div style="font-size:12px;color:var(--tx3);margin-bottom:5px">Usuario: ${u ? u.fname + ' ' + u.lname : '—'} · ${fmtTime(t.date)}</div>
    <p style="font-size:13px;color:var(--tx2)">${t.desc}</p>
  </div>
  ${t.replies.length ? `<div style="margin-bottom:14px"><div style="font-size:12px;font-weight:600;color:var(--tx2);margin-bottom:8px;text-transform:uppercase;letter-spacing:.05em">Respuestas</div>
  ${t.replies.map(r => `<div style="background:rgba(37,99,235,.08);border-left:3px solid var(--acc);border-radius:0 8px 8px 0;padding:10px;margin-bottom:8px">
    <div style="font-size:12px;color:var(--acc3);font-weight:600;margin-bottom:4px">${r.author} · ${fmtTime(r.date)}</div>
    <p style="font-size:13px;color:var(--tx2)">${r.text}</p>
  </div>`).join('')}</div>` : ''}
  ${(CU?.role === 'support' || CU?.role === 'admin') ? `
  <div class="fg"><label class="fl">Responder</label><textarea class="fi" id="tk-reply" rows="3" placeholder="Escribe una respuesta..."></textarea></div>
  <div style="display:flex;gap:7px;flex-wrap:wrap">
    <button class="btn btn-p btn-sm" onclick="replyTicket('${id}')"><i class="ti ti-send"></i> Enviar respuesta</button>
    ${t.status !== 'RESOLVED' ? `<button class="btn btn-ok btn-sm" onclick="resolveTicket('${id}')"><i class="ti ti-check"></i> Marcar resuelto</button>` : ''}
    ${t.status === 'OPEN' ? `<button class="btn btn-warn btn-sm" onclick="assignTicket('${id}')"><i class="ti ti-user-check"></i> Asignarme</button>` : ''}
  </div>`: `<button class="btn btn-o btn-sm" onclick="openChatWith('${CU?.role === 'support' ? t.userId : 'u4'}')"><i class="ti ti-message-2"></i> Chatear con soporte</button>`}`;
                openModal('modalTicketDetail');
            }
            function replyTicket(id) {
                const t = TICKETS.find(x => x.id === id); if (!t) return;
                const text = document.getElementById('tk-reply')?.value.trim();
                if (!text) { toast('Escribe una respuesta', 'warn'); return; }
                t.replies.push({ author: CU.fname + ' ' + CU.lname, text, date: new Date().toISOString() });
                if (t.status === 'OPEN') t.status = 'IN_PROGRESS';
                NOTIFS.push({ id: 'n' + Date.now(), userId: t.userId, type: 'ticket', title: 'Respuesta en tu ticket', body: `${t.num}: ${text.substring(0, 80)}`, read: false, time: new Date().toISOString() });
                AUDIT.push({ id: 'a' + Date.now(), admin: CU.fname + ' ' + CU.lname, action: 'Respondió ticket', target: t.num, reason: text.substring(0, 50), date: new Date().toISOString() });
                saveData(); closeModal('modalTicketDetail'); toast('Respuesta enviada', 'ok');
                if (document.getElementById('page-support')?.classList.contains('show')) setSupportSection('all');
            }
            function resolveTicket(id) {
                const t = TICKETS.find(x => x.id === id); if (!t) return;
                t.status = 'RESOLVED'; t.resolvedAt = new Date().toISOString();
                NOTIFS.push({ id: 'n' + Date.now(), userId: t.userId, type: 'ticket', title: 'Ticket resuelto', body: `Tu ticket ${t.num} ha sido marcado como resuelto.`, read: false, time: new Date().toISOString() });
                AUDIT.push({ id: 'a' + Date.now(), admin: CU.fname + ' ' + CU.lname, action: 'Resolvió ticket', target: t.num, reason: '', date: new Date().toISOString() });
                saveData(); closeModal('modalTicketDetail'); toast('Ticket marcado como resuelto', 'ok');
                setSupportSection('all');
            }
            function assignTicket(id) {
                const t = TICKETS.find(x => x.id === id); if (!t) return;
                t.assignedTo = CU.id; t.status = 'IN_PROGRESS';
                saveData(); closeModal('modalTicketDetail'); toast('Ticket asignado a ti', 'ok');
                setSupportSection('all');
            }

            // ════════════════════════════════════════════════════════════
