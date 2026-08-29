// ════════════════════════════════════════════════════════════
            //  DATA STORE
            // ════════════════════════════════════════════════════════════
            const COLORS = ['#2563EB', '#7C3AED', '#059669', '#DC2626', '#D97706', '#0891B2', '#9333EA', '#16A34A'];
            const GRADIENTS = [
                'linear-gradient(135deg,#2563EB,#7C3AED)',
                'linear-gradient(135deg,#059669,#0891B2)',
                'linear-gradient(135deg,#DC2626,#7C3AED)',
                'linear-gradient(135deg,#D97706,#059669)',
                'linear-gradient(135deg,#7C3AED,#EC4899)',
                'linear-gradient(135deg,#0891B2,#2563EB)',
            ];
            function avatarStyle(i) { return `background:${GRADIENTS[i % GRADIENTS.length]};`; }
            function initials(name) { if (!name) return '?'; const p = name.trim().split(' '); return (p[0][0] + (p[1] ? p[1][0] : '')).toUpperCase(); }

            // ── USERS ──────────────────────────────────────────────────
            let USERS = JSON.parse(localStorage.getItem('vimax_users') || 'null') || [
                { id: 'u1', email: 'marco@vimax.bo', pass: 'vimax123', role: 'mechanic', fname: 'Marco', lname: 'Rodríguez', status: 'active', joined: '2025-01-10' },
                { id: 'u2', email: 'juan@vimax.bo', pass: 'vimax123', role: 'client', fname: 'Juan', lname: 'Pérez', status: 'active', joined: '2025-02-05' },
                { id: 'u3', email: 'admin@vimax.bo', pass: 'admin123', role: 'admin', fname: 'Admin', lname: 'VIMAX', status: 'active', joined: '2024-12-01' },
                { id: 'u4', email: 'soporte@vimax.bo', pass: 'soporte123', role: 'support', fname: 'Ana', lname: 'Soporte', status: 'active', joined: '2025-01-15' },
                { id: 'u5', email: 'ana@vimax.bo', pass: 'vimax123', role: 'mechanic', fname: 'Ana', lname: 'López', status: 'active', joined: '2025-03-01' },
                { id: 'u6', email: 'carlos@vimax.bo', pass: 'vimax123', role: 'mechanic', fname: 'Carlos', lname: 'Gutiérrez', status: 'suspended', joined: '2025-01-20' },
                { id: 'u7', email: 'maria@vimax.bo', pass: 'vimax123', role: 'client', fname: 'María', lname: 'Torres', status: 'active', joined: '2025-02-14' },
                { id: 'u8', email: 'jose@vimax.bo', pass: 'vimax123', role: 'mechanic', fname: 'José', lname: 'Pacheco', status: 'active', joined: '2025-02-28' },
                { id: 'u9', email: 'luis@vimax.bo', pass: 'vimax123', role: 'mechanic', fname: 'Luis', lname: 'Flores', status: 'active', joined: '2025-03-10' },
                { id: 'u10', email: 'rosa@vimax.bo', pass: 'vimax123', role: 'mechanic', fname: 'Rosa', lname: 'Mamani', status: 'active', joined: '2025-03-20' },
            ];

            // ── MECHANICS ─────────────────────────────────────────────
            let MECHANICS = JSON.parse(localStorage.getItem('vimax_mechanics') || 'null') || [
                { id: 'm1', userId: 'u1', name: 'Marco Rodríguez', specialty: ['Motor', 'Diagnóstico', 'Frenos'], cat: ['Motor', 'Diagnóstico', 'Frenos'], rating: 4.9, jobs: 127, price: 80, dist: 1.2, lat: -16.505, lng: -68.115, city: 'San Miguel, La Paz', bio: 'Mecánico con 8 años de experiencia en motores Toyota y Kia.', available: true, verified: true, exp: 8, status: 'verified', earnings: 4820, phone: '+591 76543210' },
                { id: 'm2', userId: 'u5', name: 'Ana López', specialty: ['Eléctrico', 'Sensores', 'ECU'], cat: ['Eléctrico'], rating: 4.8, jobs: 89, price: 100, dist: 2.4, lat: -16.510, lng: -68.120, city: 'Sopocachi, La Paz', bio: 'Especialista en sistemas eléctricos y diagnóstico electrónico.', available: true, verified: true, exp: 6, status: 'verified', earnings: 3400, phone: '+591 77654321' },
                { id: 'm3', userId: 'u6', name: 'Carlos Gutiérrez', specialty: ['Transmisión', 'Caja', 'Diferencial'], cat: ['Transmisión'], rating: 4.6, jobs: 214, price: 120, dist: 3.1, lat: -16.500, lng: -68.110, city: 'Miraflores, La Paz', bio: 'Especialista en cajas de velocidades automáticas y manuales.', available: false, verified: true, exp: 12, status: 'verified', earnings: 8200, phone: '+591 78765432' },
                { id: 'm4', userId: 'u8', name: 'José Pacheco', specialty: ['AC', 'Climatización', 'Refrigeración'], cat: ['AC'], rating: 4.9, jobs: 56, price: 90, dist: 4.0, lat: -16.515, lng: -68.125, city: 'Obrajes, La Paz', bio: 'Técnico en sistemas de climatización automotriz.', available: true, verified: true, exp: 5, status: 'verified', earnings: 2100, phone: '+591 79876543' },
                { id: 'm5', userId: 'u9', name: 'Luis Flores', specialty: ['Carrocería', 'Pintura', 'Chapistería'], cat: ['Carrocería'], rating: 4.5, jobs: 178, price: 150, dist: 5.3, lat: -16.520, lng: -68.130, city: 'Calacoto, La Paz', bio: 'Especialista en carrocería y pintura automotriz de alta calidad.', available: true, verified: false, exp: 10, status: 'pending', earnings: 6800, phone: '+591 70987654' },
                { id: 'm6', userId: 'u10', name: 'Rosa Mamani', specialty: ['Frenos', 'Suspensión', 'Dirección'], cat: ['Frenos', 'Suspensión'], rating: 5.0, jobs: 43, price: 85, dist: 6.0, lat: -16.525, lng: -68.135, city: 'Achumani, La Paz', bio: 'Especialista en sistemas de frenos ABS y suspensión.', available: true, verified: true, exp: 4, status: 'verified', earnings: 1800, phone: '+591 71098765' },
            ];

            // ── SERVICES ──────────────────────────────────────────────
            let SERVICES = JSON.parse(localStorage.getItem('vimax_services') || 'null') || [
                { id: 's1', mechId: 'm1', name: 'Diagnóstico General', cat: 'Diagnóstico', desc: 'Revisión completa del vehículo con escáner OBD2.', price: 80, time: '~45 min', active: true },
                { id: 's2', mechId: 'm1', name: 'Cambio de Aceite', cat: 'Motor', desc: 'Cambio de aceite de motor + filtro. Aceite 5W30 semi o sintético.', price: 120, time: '~30 min', active: true },
                { id: 's3', mechId: 'm1', name: 'Reparación de Motor', cat: 'Motor', desc: 'Diagnóstico y reparación de fallas en motor.', price: 400, time: '~3-5 horas', active: true },
                { id: 's4', mechId: 'm2', name: 'Diagnóstico Eléctrico', cat: 'Eléctrico', desc: 'Diagnóstico completo del sistema eléctrico.', price: 100, time: '~60 min', active: true },
                { id: 's5', mechId: 'm2', name: 'Reemplazo de Sensores', cat: 'Eléctrico', desc: 'Cambio de sensores de O2, MAF, MAP y otros.', price: 180, time: '~2 horas', active: true },
                { id: 's6', mechId: 'm4', name: 'Carga y Revisión de AC', cat: 'AC', desc: 'Carga de gas refrigerante R134a + revisión del sistema.', price: 150, time: '~90 min', active: true },
                { id: 's7', mechId: 'm6', name: 'Cambio de Pastillas de Freno', cat: 'Frenos', desc: 'Cambio de pastillas delanteras y traseras + revisión de discos.', price: 200, time: '~2 horas', active: true },
                { id: 's8', mechId: 'm6', name: 'Alineación y Balanceo', cat: 'Suspensión', desc: 'Alineación de 4 ruedas + balanceo + revisión de suspensión.', price: 130, time: '~90 min', active: true },
            ];

            // ── BOOKINGS ──────────────────────────────────────────────
            let BOOKINGS = JSON.parse(localStorage.getItem('vimax_bookings') || 'null') || [
                { id: 'b1', clientId: 'u2', mechId: 'm1', svcId: 's2', status: 'PENDING', desc: 'Necesito cambio de aceite urgente.', brand: 'Toyota', year: '2019', loc: 'Av. Arce 2356, La Paz', date: new Date(Date.now() - 300000).toISOString(), price: 120, express: false },
                { id: 'b2', clientId: 'u7', mechId: 'm1', svcId: 's7', status: 'PENDING', desc: 'Frenos hacen ruido metálico.', brand: 'Chevrolet', year: '2017', loc: 'Miraflores, La Paz', date: new Date(Date.now() - 720000).toISOString(), price: 200, express: true },
                { id: 'b3', clientId: 'u2', mechId: 'm1', svcId: 's1', status: 'IN_PROGRESS', desc: 'Luz de motor encendida.', brand: 'Kia', year: '2021', loc: 'El Alto, La Paz', date: new Date(Date.now() - 3600000).toISOString(), price: 80, express: false },
                { id: 'b4', clientId: 'u2', mechId: 'm2', svcId: 's4', status: 'COMPLETED', desc: 'Sensor de O2 defectuoso.', brand: 'Hyundai', year: '2018', loc: 'Sopocachi, La Paz', date: new Date(Date.now() - 86400000 * 3).toISOString(), price: 100, express: false },
                { id: 'b5', clientId: 'u7', mechId: 'm4', svcId: 's6', status: 'COMPLETED', desc: 'AC no enfría bien.', brand: 'Nissan', year: '2020', loc: 'Obrajes, La Paz', date: new Date(Date.now() - 86400000 * 7).toISOString(), price: 150, express: false },
            ];

            // ── REVIEWS ───────────────────────────────────────────────
            let REVIEWS = JSON.parse(localStorage.getItem('vimax_reviews') || 'null') || [
                { id: 'r1', bookingId: 'b4', clientId: 'u2', mechId: 'm2', rating: 5, comment: 'Excelente trabajo. Ana identificó el problema rápido y a buen precio.', date: new Date(Date.now() - 86400000 * 3).toISOString() },
                { id: 'r2', bookingId: 'b5', clientId: 'u7', mechId: 'm4', rating: 5, comment: 'José llegó en menos de 20 minutos y resolvió el AC perfectamente.', date: new Date(Date.now() - 86400000 * 7).toISOString() },
                { id: 'r3', mechId: 'm1', clientId: 'u7', rating: 5, comment: 'Marco resolvió el motor de mi Toyota. Muy profesional y honesto con los precios.', date: new Date(Date.now() - 86400000 * 2).toISOString() },
                { id: 'r4', mechId: 'm1', clientId: 'u2', rating: 4, comment: 'Buen servicio, llegó un poco tarde pero hizo el trabajo bien.', date: new Date(Date.now() - 86400000 * 10).toISOString() },
            ];

            // ── CONVERSATIONS ──────────────────────────────────────────
            let CONVS = JSON.parse(localStorage.getItem('vimax_convs') || 'null') || [
                { id: 'c1', participants: ['u1', 'u2'], isSupport: false, lastMsg: 'Perfecto, te mando la ubicación.', lastTime: new Date(Date.now() - 600000).toISOString() },
                { id: 'c2', participants: ['u1', 'u7'], isSupport: false, lastMsg: '¿Podría llegar a las 3pm?', lastTime: new Date(Date.now() - 3600000).toISOString() },
                { id: 'c3', participants: ['u2', 'support'], isSupport: true, lastMsg: 'Su ticket #1042 fue resuelto.', lastTime: new Date(Date.now() - 86400000).toISOString() },
            ];
            let MESSAGES = JSON.parse(localStorage.getItem('vimax_msgs') || 'null') || [
                { id: 'msg1', convId: 'c1', senderId: 'u2', text: 'Hola Marco, tengo un problema con el motor. Hace ruido al arrancar.', time: new Date(Date.now() - 3600000).toISOString() },
                { id: 'msg2', convId: 'c1', senderId: 'u1', text: 'Hola Juan! ¿Es un golpeteo metálico o más un zumbido?', time: new Date(Date.now() - 3500000).toISOString() },
                { id: 'msg3', convId: 'c1', senderId: 'u2', text: 'Es un golpeteo metálico, especialmente al inicio.', time: new Date(Date.now() - 3400000).toISOString() },
                { id: 'msg4', convId: 'c1', senderId: 'u1', text: 'Puede ser desgaste en cojinetes. Puedo ir hoy. ¿Me compartes ubicación?', time: new Date(Date.now() - 3300000).toISOString() },
                { id: 'msg5', convId: 'c1', senderId: 'u2', text: 'Perfecto, te mando la ubicación.', time: new Date(Date.now() - 600000).toISOString() },
                { id: 'msg6', convId: 'c2', senderId: 'u7', text: 'Hola, quería consultar si tiene disponibilidad mañana para cambio de pastillas.', time: new Date(Date.now() - 7200000).toISOString() },
                { id: 'msg7', convId: 'c2', senderId: 'u1', text: 'Hola María! Sí tengo disponibilidad. ¿A qué hora le queda mejor?', time: new Date(Date.now() - 7000000).toISOString() },
                { id: 'msg8', convId: 'c2', senderId: 'u7', text: '¿Podría llegar a las 3pm?', time: new Date(Date.now() - 3600000).toISOString() },
            ];

            // ── TICKETS ───────────────────────────────────────────────
            let TICKETS = JSON.parse(localStorage.getItem('vimax_tickets') || 'null') || [
                { id: 't1', num: '#1045', userId: 'u7', cat: 'Incumplimiento', pri: 'URGENT', status: 'OPEN', title: 'Mecánico no se presentó al servicio contratado', desc: 'Contraté un servicio para las 2pm y el mecánico nunca llegó ni respondió mensajes.', date: new Date(Date.now() - 900000).toISOString(), replies: [] },
                { id: 't2', num: '#1044', userId: 'u2', cat: 'Facturación', pri: 'HIGH', status: 'OPEN', title: 'Problema con el cobro del servicio — monto incorrecto', desc: 'Me cobraron Bs. 250 pero el precio acordado era Bs. 200.', date: new Date(Date.now() - 3600000).toISOString(), replies: [] },
                { id: 't3', num: '#1043', userId: 'u9', cat: 'Verificación', pri: 'NORMAL', status: 'IN_PROGRESS', title: 'Solicitud de verificación de perfil de mecánico', desc: 'Envié mis documentos hace 5 días y aún no recibo respuesta.', date: new Date(Date.now() - 10800000).toISOString(), replies: [{ author: 'Ana Soporte', text: 'Estamos revisando sus documentos. En 24 horas recibirá respuesta.', date: new Date(Date.now() - 3600000).toISOString() }] },
                { id: 't4', num: '#1042', userId: 'u2', cat: 'Acceso', pri: 'NORMAL', status: 'RESOLVED', title: 'No puedo iniciar sesión con mi cuenta', desc: 'Olvidé mi contraseña y el correo de recuperación no llega.', date: new Date(Date.now() - 86400000).toISOString(), replies: [{ author: 'Ana Soporte', text: 'Hemos restablecido su contraseña. Revise su correo.', date: new Date(Date.now() - 79200000).toISOString() }] },
                { id: 't5', num: '#1041', userId: 'u7', cat: 'Reporte', pri: 'HIGH', status: 'IN_PROGRESS', title: 'Mecánico con comportamiento inapropiado', desc: 'El mecánico fue muy grosero y amenazante durante el servicio.', date: new Date(Date.now() - 172800000).toISOString(), replies: [] },
            ];

            // ── NOTIFICATIONS ─────────────────────────────────────────
            let NOTIFS = JSON.parse(localStorage.getItem('vimax_notifs') || 'null') || [
                { id: 'n1', userId: 'u1', type: 'request', title: 'Nueva solicitud de servicio', body: 'Juan Pérez solicita diagnóstico de motor en Zona Sur.', read: false, time: new Date(Date.now() - 300000).toISOString() },
                { id: 'n2', userId: 'u1', type: 'review', title: 'Nueva reseña recibida', body: 'Carmen Torres te calificó con 5 estrellas. "Excelente profesional!"', read: false, time: new Date(Date.now() - 7200000).toISOString() },
                { id: 'n3', userId: 'u1', type: 'payment', title: 'Pago recibido', body: 'Bs. 320 acreditados por servicio de motor completado.', read: false, time: new Date(Date.now() - 86400000).toISOString() },
                { id: 'n4', userId: 'u2', type: 'ticket', title: 'Ticket actualizado', body: 'Tu ticket #1042 fue resuelto por el equipo de soporte.', read: true, time: new Date(Date.now() - 172800000).toISOString() },
                { id: 'n5', userId: 'u2', type: 'booking', title: 'Solicitud aceptada', body: 'Marco Rodríguez aceptó tu solicitud de diagnóstico.', read: true, time: new Date(Date.now() - 86400000 * 3).toISOString() },
            ];

            // ── AUDIT LOG ─────────────────────────────────────────────
            let AUDIT = JSON.parse(localStorage.getItem('vimax_audit') || 'null') || [
                { id: 'a1', admin: 'Admin VIMAX', action: 'Suspendió usuario', target: 'Carlos Gutiérrez', reason: 'Múltiples reportes', date: new Date(Date.now() - 86400000 * 2).toISOString() },
                { id: 'a2', admin: 'Admin VIMAX', action: 'Verificó mecánico', target: 'Rosa Mamani', reason: 'Documentos validados', date: new Date(Date.now() - 86400000 * 3).toISOString() },
                { id: 'a3', admin: 'Ana Soporte', action: 'Resolvió ticket', target: '#1042', reason: 'Contraseña restablecida', date: new Date(Date.now() - 79200000).toISOString() },
                { id: 'a4', admin: 'Admin VIMAX', action: 'Creó cuenta admin', target: 'Ana Soporte', reason: 'Nuevo agente de soporte', date: new Date(Date.now() - 86400000 * 10).toISOString() },
            ];

            function saveData() {
                localStorage.setItem('vimax_users', JSON.stringify(USERS));
                localStorage.setItem('vimax_mechanics', JSON.stringify(MECHANICS));
                localStorage.setItem('vimax_services', JSON.stringify(SERVICES));
                localStorage.setItem('vimax_bookings', JSON.stringify(BOOKINGS));
                localStorage.setItem('vimax_reviews', JSON.stringify(REVIEWS));
                localStorage.setItem('vimax_convs', JSON.stringify(CONVS));
                localStorage.setItem('vimax_msgs', JSON.stringify(MESSAGES));
                localStorage.setItem('vimax_tickets', JSON.stringify(TICKETS));
                localStorage.setItem('vimax_notifs', JSON.stringify(NOTIFS));
                localStorage.setItem('vimax_audit', JSON.stringify(AUDIT));
            }

            // ════════════════════════════════════════════════════════════
            //  AUTH STATE
            // ════════════════════════════════════════════════════════════
            let CU = JSON.parse(sessionStorage.getItem('vimax_cu') || 'null');// current user
            function setCU(u) { CU = u; sessionStorage.setItem('vimax_cu', JSON.stringify(u)); updateNavAuth(); }
            function logout() { setCU(null); goPage('home'); toast('Sesión cerrada', 'info'); }
            function updateNavAuth() {
                const auth = document.getElementById('nav-auth-btns');
                const info = document.getElementById('nav-user-info');
                const av = document.getElementById('nav-avatar');
                if (CU) {
                    auth.style.display = 'none';
                    info.style.display = 'flex';
                    av.textContent = initials(CU.fname + ' ' + CU.lname);
                    av.style.cssText = `width:32px;height:32px;font-size:12px;cursor:pointer;${avatarStyle(USERS.indexOf(CU))}color:#fff;`;
                } else {
                    auth.style.display = 'flex';
                    info.style.display = 'none';
                }
            }
            function requireAuth(role) {
                if (!CU) { toast('Debes iniciar sesión primero', 'err'); goPage('auth'); return false; }
                if (role && CU.role !== role && CU.role !== 'admin') { toast('No tienes permisos para esta sección', 'err'); return false; }
                return true;
            }

            // ════════════════════════════════════════════════════════════
            //  ROUTER
            // ════════════════════════════════════════════════════════════
            function goPage(id) {
                ['home', 'search', 'profile', 'myprofile', 'dash', 'chat', 'notif', 'auth', 'admin', 'support'].forEach(p => {
                    const el = document.getElementById('page-' + p);
                    if (el) { el.classList.remove('show'); }
                });
                const el = document.getElementById('page-' + id);
                if (el) el.classList.add('show');
                // update nav
                document.querySelectorAll('#topnav .nb').forEach(b => b.classList.remove('on'));
                const nb = document.getElementById('nav-' + id);
                if (nb) nb.classList.add('on');
                // page inits
                if (id === 'search') { initSearch(); }
                if (id === 'dash') { initDash(); }
                if (id === 'admin') { initAdmin(); }
                if (id === 'support') { initSupport(); }
                if (id === 'chat') { initChat(); }
                if (id === 'notif') { renderNotifs(); }
                window.scrollTo(0, 0);
            }

            // ════════════════════════════════════════════════════════════
            //  TOAST
            // ════════════════════════════════════════════════════════════
            function toast(msg, type = 'info', dur = 3000) {
                const t = document.getElementById('toast');
                const d = document.createElement('div');
                const icons = { ok: 'ti-check', err: 'ti-x', warn: 'ti-alert-triangle', info: 'ti-info-circle' };
                d.className = `toast-item toast-${type}`;
                d.innerHTML = `<i class="ti ${icons[type] || icons.info}" style="font-size:16px;flex-shrink:0"></i><span>${msg}</span>`;
                t.appendChild(d);
                setTimeout(() => { d.style.opacity = '0'; d.style.transform = 'translateX(20px)'; d.style.transition = '.3s'; setTimeout(() => d.remove(), 300); }, dur);
            }

            // ════════════════════════════════════════════════════════════
            //  MODALS
            // ════════════════════════════════════════════════════════════
            function openModal(id) { document.getElementById(id).classList.add('open'); }
            function closeModal(id) { document.getElementById(id).classList.remove('open'); }
            document.querySelectorAll('.overlay').forEach(o => { o.addEventListener('click', e => { if (e.target === o) o.classList.remove('open'); }); });

            // ════════════════════════════════════════════════════════════
            //  AUTH
            // ════════════════════════════════════════════════════════════
            let regRole = 'client';
            function setAuthTab(t) {
                document.getElementById('auth-form-login').style.display = t === 'login' ? 'block' : 'none';
                document.getElementById('auth-form-register').style.display = t === 'register' ? 'block' : 'none';
                document.querySelectorAll('#auth-tabs .tab').forEach((b, i) => b.classList.toggle('on', i === (t === 'login' ? 0 : 1)));
            }
            function setRegRole(r) {
                regRole = r;
                document.getElementById('mech-extra').style.display = r === 'mechanic' ? 'block' : 'none';
                document.querySelectorAll('#reg-role-tabs .tab').forEach((b, i) => b.classList.toggle('on', i === (r === 'client' ? 0 : 1)));
            }
            function doLogin() {
                const email = document.getElementById('li-email').value.trim().toLowerCase();
                const pass = document.getElementById('li-pass').value;
                const u = USERS.find(x => x.email.toLowerCase() === email && x.pass === pass);
                if (!u) { toast('Correo o contraseña incorrectos', 'err'); return; }
                if (u.status === 'suspended') { toast('Tu cuenta está suspendida. Contacta a soporte.', 'err'); return; }
                setCU(u);
                toast(`Bienvenido, ${u.fname}!`, 'ok');
                goPage(u.role === 'admin' ? 'admin' : u.role === 'support' ? 'support' : u.role === 'mechanic' ? 'dash' : 'home');
            }
            function quickLogin(r) {
                const map = { client: 'u2', mechanic: 'u1', admin: 'u3', support: 'u4' };
                const u = USERS.find(x => x.id === map[r]);
                setCU(u);
                toast(`Bienvenido, ${u.fname}! (${r})`, 'ok');
                goPage(r === 'admin' ? 'admin' : r === 'support' ? 'support' : r === 'mechanic' ? 'dash' : 'home');
            }
            function doRegister() {
                const fname = document.getElementById('rg-fname').value.trim();
                const lname = document.getElementById('rg-lname').value.trim();
                const email = document.getElementById('rg-email').value.trim().toLowerCase();
                const pass = document.getElementById('rg-pass').value;
                const pass2 = document.getElementById('rg-pass2').value;
                if (!fname || !email || !pass) { toast('Completa todos los campos', 'warn'); return; }
                if (pass !== pass2) { toast('Las contraseñas no coinciden', 'err'); return; }
                if (USERS.find(x => x.email === email)) { toast('Este correo ya está registrado', 'err'); return; }
                const id = 'u' + Date.now();
                const u = { id, email, pass, role: regRole, fname, lname, status: 'active', joined: new Date().toISOString().split('T')[0] };
                USERS.push(u);
                if (regRole === 'mechanic') {
                    const spec = document.getElementById('rg-spec').value;
                    const exp = parseInt(document.getElementById('rg-exp').value) || 0;
                    const mid = 'm' + Date.now();
                    MECHANICS.push({ id: mid, userId: id, name: `${fname} ${lname}`, specialty: [spec], cat: [spec], rating: 0, jobs: 0, price: 80, dist: Math.random() * 10 + 0.5, lat: -16.5 + Math.random() * 0.05 - 0.025, lng: -68.12 + Math.random() * 0.05 - 0.025, city: 'La Paz', bio: '', available: true, verified: false, exp, status: 'pending', earnings: 0, phone: '' });
                }
                saveData();
                setCU(u);
                toast(`¡Cuenta creada! Bienvenido, ${fname}!`, 'ok');
                goPage(regRole === 'mechanic' ? 'dash' : 'home');
            }
            function doRegisterModal() {
                const fname = document.getElementById('m-fname').value.trim();
                const lname = document.getElementById('m-lname').value.trim();
                const email = document.getElementById('m-email').value.trim().toLowerCase();
                const pass = document.getElementById('m-pass').value;
                const role = document.getElementById('m-role').value;
                if (!fname || !email || !pass) { toast('Completa todos los campos', 'warn'); return; }
                if (USERS.find(x => x.email === email)) { toast('Este correo ya está registrado', 'err'); return; }
                const id = 'u' + Date.now();
                const u = { id, email, pass, role, fname, lname, status: 'active', joined: new Date().toISOString().split('T')[0] };
                USERS.push(u);
                if (role === 'mechanic') {
                    const spec = document.getElementById('m-spec').value;
                    MECHANICS.push({ id: 'm' + Date.now(), userId: id, name: `${fname} ${lname}`, specialty: [spec], cat: [spec], rating: 0, jobs: 0, price: 80, dist: Math.random() * 10 + 0.5, lat: -16.5 + Math.random() * 0.05, lng: -68.12 + Math.random() * 0.05, city: 'La Paz', bio: '', available: true, verified: false, exp: 0, status: 'pending', earnings: 0, phone: '' });
                }
                saveData(); setCU(u); closeModal('modalRegister');
                toast(`¡Cuenta creada! Bienvenido, ${fname}!`, 'ok');
                goPage(role === 'mechanic' ? 'dash' : 'home');
            }
            function setRegTab(btn, role) {
                document.querySelectorAll('#modalRegister .tabs .tab').forEach(b => b.classList.remove('on'));
                btn.classList.add('on');
                document.getElementById('m-role').value = role;
                document.getElementById('m-mech-extra').style.display = role === 'mechanic' ? 'block' : 'none';
            }
            function sendForgot() {
                const email = document.getElementById('fp-email').value.trim();
                if (!email) { toast('Ingresa tu correo', 'warn'); return; }
                closeModal('modalForgot');
                toast('Instrucciones enviadas a tu correo', 'ok');
            }

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

            // ════════════════════════════════════════════════════════════
            //  REVIEWS
            // ════════════════════════════════════════════════════════════
            let selectedStars = 0;
            function setStars(n) {
                selectedStars = n;
                const labels = ['', 'Muy malo', 'Malo', 'Regular', 'Bueno', 'Excelente'];
                document.getElementById('star-label').textContent = labels[n];
                document.querySelectorAll('#star-picker .rstar').forEach((s, i) => {
                    s.style.color = i < n ? 'var(--gold)' : 'var(--tx3)';
                });
            }
            function submitReview() {
                if (!requireAuth()) return;
                if (!selectedStars) { toast('Selecciona una calificación', 'warn'); return; }
                const mechId = document.getElementById('rev-mech-id').value;
                const comment = document.getElementById('rev-comment').value.trim();
                const r = { id: 'r' + Date.now(), mechId, clientId: CU.id, rating: selectedStars, comment, date: new Date().toISOString() };
                REVIEWS.push(r);
                // update mechanic rating
                const m = MECHANICS.find(x => x.id === mechId);
                if (m) { const rs = REVIEWS.filter(x => x.mechId === mechId); m.rating = Math.round(rs.reduce((a, x) => a + x.rating, 0) / rs.length * 10) / 10; m.totalReviews = rs.length; }
                saveData(); closeModal('modalReview'); selectedStars = 0;
                toast('Reseña publicada. ¡Gracias!', 'ok');
            }

            // ════════════════════════════════════════════════════════════
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

            // ════════════════════════════════════════════════════════════
            //  UTILS
            // ════════════════════════════════════════════════════════════
            function fmtTime(iso) {
                if (!iso) return '—';
                const d = new Date(iso); const now = new Date();
                const diff = (now - d) / 1000;
                if (diff < 60) return 'Ahora mismo';
                if (diff < 3600) return `Hace ${Math.floor(diff / 60)} min`;
                if (diff < 86400) return `Hace ${Math.floor(diff / 3600)} h`;
                if (diff < 604800) return `Hace ${Math.floor(diff / 86400)} días`;
                return d.toLocaleDateString('es');
            }

            // ════════════════════════════════════════════════════════════
            //  INIT
            // ════════════════════════════════════════════════════════════
            updateNavAuth();
            goPage('home');
