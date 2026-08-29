            //  CHAT
            // ════════════════════════════════════════════════════════════
            let activeConv = null;
            let chatInterval = null;
            function initChat() {
                renderConvList();
                if (activeConv) openConv(activeConv);
            }
            function renderConvList(filter = '') {
                const cl = document.getElementById('conv-list'); if (!cl) return;
                const convs = CONVS.filter(c => c.participants.some(p => p === (CU?.id || 'u1')) || (c.isSupport && (CU?.role === 'support' || CU?.role === 'admin')));
                const filtered = filter ? convs.filter(c => {
                    const other = c.participants.find(p => p !== CU?.id);
                    const u = USERS.find(x => x.id === other);
                    return u && (u.fname + ' ' + u.lname).toLowerCase().includes(filter.toLowerCase());
                }) : convs;
                cl.innerHTML = filtered.map(c => {
                    const otherId = c.participants.find(p => p !== (CU?.id || 'u1')) || c.participants[0];
                    const other = USERS.find(x => x.id === otherId);
                    const unread = MESSAGES.filter(m => m.convId === c.id && m.senderId !== CU?.id).length > 0;
                    const idx = other ? USERS.indexOf(other) : 0;
                    return `<div class="chi ${activeConv === c.id ? 'on' : ''}" onclick="openConv('${c.id}')">
      <div class="av" style="width:36px;height:36px;font-size:13px;${avatarStyle(idx)}color:#fff;flex-shrink:0">${other ? initials(other.fname + ' ' + other.lname) : 'S'}</div>
      <div class="chi-info">
        <div class="chi-name">${other ? other.fname + ' ' + other.lname : (c.isSupport ? 'Soporte VIMAX' : 'Conversación')}</div>
        <div class="chi-prev">${c.lastMsg || '...'}</div>
      </div>
      <div class="chi-meta">
        <div class="chi-time">${fmtTime(c.lastTime)}</div>
        ${unread ? '<div class="chi-unread">•</div>' : ''}
      </div>
    </div>`;
                }).join('') || '<p style="color:var(--tx3);font-size:13px;padding:14px">Sin conversaciones</p>';
            }
            function filterConvs(q) { renderConvList(q); }
            function openConv(convId) {
                activeConv = convId;
                const c = CONVS.find(x => x.id === convId); if (!c) return;
                const otherId = c.participants.find(p => p !== (CU?.id || 'u1')) || c.participants[0];
                const other = USERS.find(x => x.id === otherId);
                const cm = document.getElementById('chat-main'); if (!cm) return;
                const msgs = MESSAGES.filter(m => m.convId === convId);
                const idx = other ? USERS.indexOf(other) : 0;
                cm.innerHTML = `
  <div class="chmtop">
    <div class="av" style="width:36px;height:36px;font-size:13px;${avatarStyle(idx)}color:#fff">${other ? initials(other.fname + ' ' + other.lname) : 'S'}</div>
    <div><div style="font-size:14px;font-weight:600">${other ? other.fname + ' ' + other.lname : (c.isSupport ? 'Soporte VIMAX' : 'Chat')}</div><div class="sta sta-on" style="color:var(--ok);font-size:11px">En línea</div></div>
    <div style="margin-left:auto;display:flex;gap:6px">
      ${other?.role === 'mechanic' ? `<button class="btn btn-o btn-sm" onclick="viewProfile('${MECHANICS.find(m => m.userId === other.id)?.id}')"><i class="ti ti-user"></i> Perfil</button>` : ''}
      <button class="btn btn-o btn-sm" onclick="openModal('modalTicket')"><i class="ti ti-ticket"></i> Ticket</button>
    </div>
  </div>
  <div class="msgs" id="msgs-box">${msgs.map(m => renderMsg(m)).join('')}</div>
  <div class="chinput">
    <button class="btn btn-o" style="padding:7px 9px" title="Adjuntar imagen" onclick="toast('Función de imágenes disponible en app móvil','info')"><i class="ti ti-paperclip"></i></button>
    <input id="chat-msg-input" type="text" placeholder="Escribe un mensaje..." onkeydown="if(event.key==='Enter')sendMsg()">
    <button class="btn btn-p" style="padding:7px 11px" onclick="sendMsg()"><i class="ti ti-send"></i></button>
  </div>`;
                renderConvList();
                setTimeout(() => { const b = document.getElementById('msgs-box'); if (b) b.scrollTop = b.scrollHeight; }, 50);
            }
            function renderMsg(m) {
                const isOut = m.senderId === (CU?.id || 'u1');
                return `<div class="msg ${isOut ? 'msg-out' : 'msg-in'}">
    ${m.text}
    <div class="msg-t ${isOut ? 'msg-t-out' : ''}">${fmtTime(m.time)}</div>
  </div>`;
            }
            function sendMsg() {
                if (!activeConv) return;
                const inp = document.getElementById('chat-msg-input');
                const text = inp?.value.trim();
                if (!text) return;
                const msg = { id: 'msg' + Date.now(), convId: activeConv, senderId: CU?.id || 'u1', text, time: new Date().toISOString() };
                MESSAGES.push(msg);
                const c = CONVS.find(x => x.id === activeConv);
                if (c) { c.lastMsg = text; c.lastTime = msg.time; }
                saveData(); inp.value = '';
                const box = document.getElementById('msgs-box');
                if (box) { box.insertAdjacentHTML('beforeend', renderMsg(msg)); box.scrollTop = box.scrollHeight; }
                renderConvList();
                // simulate reply after 1-3s
                setTimeout(() => {
                    const replies = ['Entendido, enseguida te atiendo.', '¿Puedes darme más detalles?', 'Perfecto, estamos coordinando.', 'Ok, te confirmo en unos minutos.', 'Recibido, muchas gracias.'];
                    const r = replies[Math.floor(Math.random() * replies.length)];
                    const otherId = c?.participants.find(p => p !== (CU?.id || 'u1')) || 'u1';
                    const replyMsg = { id: 'msg' + Date.now(), convId: activeConv, senderId: otherId, text: r, time: new Date().toISOString() };
                    MESSAGES.push(replyMsg);
                    if (c) { c.lastMsg = r; c.lastTime = replyMsg.time; }
                    saveData();
                    if (document.getElementById('msgs-box')) {
                        const box = document.getElementById('msgs-box');
                        box.insertAdjacentHTML('beforeend', renderMsg(replyMsg));
                        box.scrollTop = box.scrollHeight;
                    }
                    renderConvList();
                }, Math.random() * 2000 + 1000);
            }
            function openChatWith(userId) {
                if (!CU) { toast('Inicia sesión para chatear', 'warn'); goPage('auth'); return; }
                let conv = CONVS.find(c => c.participants.includes(CU.id) && c.participants.includes(userId));
                if (!conv) {
                    conv = { id: 'c' + Date.now(), participants: [CU.id, userId], isSupport: false, lastMsg: '', lastTime: new Date().toISOString() };
                    CONVS.push(conv); saveData();
                }
                activeConv = conv.id;
                goPage('chat');
            }
            function searchUsersForChat(q) {
                const r = document.getElementById('nc-results'); if (!r) return;
                if (!q) { r.innerHTML = ''; return; }
                const users = USERS.filter(u => u.id !== CU?.id && (u.fname + ' ' + u.lname + u.email).toLowerCase().includes(q.toLowerCase())).slice(0, 6);
                r.innerHTML = users.map((u, i) => `
  <div style="display:flex;align-items:center;gap:9px;padding:9px;background:var(--bg3);border-radius:8px;cursor:pointer" onclick="closeModal('modalNewChat');openChatWith('${u.id}')">
    <div class="av" style="width:32px;height:32px;font-size:12px;${avatarStyle(i)}color:#fff">${initials(u.fname + ' ' + u.lname)}</div>
    <div><div style="font-size:13px;font-weight:500">${u.fname} ${u.lname}</div><div style="font-size:12px;color:var(--tx3)">${u.role} · ${u.email}</div></div>
  </div>`).join('') || '<p style="color:var(--tx3);font-size:13px">No se encontraron usuarios</p>';
            }

            // ════════════════════════════════════════════════════════════
