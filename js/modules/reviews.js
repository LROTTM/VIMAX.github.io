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
