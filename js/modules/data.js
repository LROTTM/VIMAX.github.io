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

