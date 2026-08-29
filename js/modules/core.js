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

