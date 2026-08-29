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

