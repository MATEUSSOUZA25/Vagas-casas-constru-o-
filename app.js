const FORMSUBMIT_URL = 'https://formsubmit.co/ajax/mlreserva469@gmail.com';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('jobApplicationForm');
    const successView = document.getElementById('successView');
    const successMessage = document.getElementById('successMessage');

    // 1. Condicional: Dependentes
    const dependentRadios = document.querySelectorAll('input[name="Possui_Dependentes"]');
    const dependentsCountWrapper = document.getElementById('dependentsCountWrapper');
    const dependentsCountInput = document.getElementById('dependentsCount');
    const dependentsContainer = document.getElementById('dependentsContainer');

    function escapeAttr(value) {
        return String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
    }

    function renderDependents() {
        const count = Math.max(0, Math.min(20, Number(dependentsCountInput.value) || 0));
        const previous = Array.from(dependentsContainer.querySelectorAll('.dependent-card')).map(card => ({
            name: card.querySelector('.dep-name')?.value || '',
            relationship: card.querySelector('.dep-relationship')?.value || '',
            birth: card.querySelector('.dep-birth')?.value || '',
            cpf: card.querySelector('.dep-cpf')?.value || ''
        }));
        dependentsContainer.innerHTML = '';
        for (let i = 0; i < count; i++) {
            const item = previous[i] || {};
            const card = document.createElement('div');
            card.className = 'dependent-card grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 rounded-xl bg-white border border-amber-200';
            card.innerHTML = `
                <div class="sm:col-span-2 text-xs font-bold uppercase tracking-wide text-casas-dark">Dependente ${i + 1}</div>
                <label class="text-xs font-semibold text-slate-700">Nome completo *
                    <input type="text" name="Dependente_${i + 1}_Nome" class="dep-name mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" required value="${escapeAttr(item.name || '')}" placeholder="Nome completo">
                </label>
                <label class="text-xs font-semibold text-slate-700">Parentesco *
                    <select name="Dependente_${i + 1}_Parentesco" class="dep-relationship mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" required>
                        <option value="">Selecione...</option>
                        ${['Filho(a)', 'Cônjuge', 'Companheiro(a)', 'Enteado(a)', 'Pai/Mãe', 'Outro'].map(v => `<option ${item.relationship === v ? 'selected' : ''}>${v}</option>`).join('')}
                    </select>
                </label>
                <label class="text-xs font-semibold text-slate-700">Data de nascimento *
                    <input type="date" name="Dependente_${i + 1}_Nascimento" class="dep-birth mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" required value="${escapeAttr(item.birth || '')}">
                </label>
                <label class="text-xs font-semibold text-slate-700">CPF (opcional)
                    <input type="text" name="Dependente_${i + 1}_CPF" class="dep-cpf mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" maxlength="14" value="${escapeAttr(item.cpf || '')}" placeholder="000.000.000-00">
                </label>`;
            dependentsContainer.appendChild(card);
        }
    }

    dependentsCountInput.addEventListener('input', renderDependents);

    dependentRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            if (e.target.value === 'Sim') {
                dependentsCountWrapper.classList.remove('hidden');
                dependentsCountInput.required = true;
                renderDependents();
            } else {
                dependentsCountWrapper.classList.add('hidden');
                dependentsCountInput.required = false;
                dependentsContainer.innerHTML = '';
            }
        });
    });

    // 2. Condicional: Habilitação (CNH)
    const cnhRadios = document.querySelectorAll('input[name="Habilitado_CNH"]');
    const cnhDetailsWrapper = document.getElementById('cnhDetailsWrapper');
    const cnhCategorySelect = document.getElementById('cnhCategory');

    cnhRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            if (e.target.value === 'Sim') {
                cnhDetailsWrapper.classList.remove('hidden');
                cnhCategorySelect.required = true;
            } else {
                cnhDetailsWrapper.classList.add('hidden');
                cnhCategorySelect.required = false;
                cnhCategorySelect.value = '';
                document.getElementById('hasEAR').checked = false;
            }
        });
    });

    // 3. Experiências Anteriores Dinâmicas
    const experiencesContainer = document.getElementById('experiencesContainer');
    const addExperienceBtn = document.getElementById('addExperienceBtn');

    function renumberExperiences() {
        const cards = experiencesContainer.querySelectorAll('.experience-card');
        cards.forEach((card, index) => {
            const label = card.querySelector('.exp-title-text');
            if (label) {
                label.innerHTML = `<span class="fa-solid fa-building text-casas-blue" aria-hidden="true">◆</span> Experiência recente #${index + 1}`;
            }
        });
    }

    addExperienceBtn.addEventListener('click', () => {
        const nextNum = experiencesContainer.querySelectorAll('.experience-card').length + 1;
        const card = document.createElement('div');
        card.className = 'experience-card p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-4';
        card.innerHTML = `
            <div class="flex items-center justify-between border-b border-slate-200 pb-2.5">
                <span class="exp-title-text text-xs font-bold uppercase tracking-wider text-casas-dark flex items-center gap-2">
                    <span class="fa-solid fa-building text-casas-blue" aria-hidden="true">◆</span> Experiência recente #${nextNum}
                </span>
                <button type="button" class="remove-exp-btn text-xs text-red-600 hover:text-red-800 font-semibold flex items-center gap-1 px-2.5 py-1 rounded-lg hover:bg-red-50 transition-colors">
                    <span aria-hidden="true">✕</span> Remover
                </button>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label class="block text-xs font-semibold text-slate-700 mb-1">Nome da Empresa</label>
                    <input type="text" class="exp-company w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-casas-blue/30 focus:border-casas-blue" placeholder="Ex: Construtora Central">
                </div>
                <div>
                    <label class="block text-xs font-semibold text-slate-700 mb-1">Cargo / Máquina Operada</label>
                    <input type="text" class="exp-role w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-casas-blue/30 focus:border-casas-blue" placeholder="Ex: Operador de Motoniveladora">
                </div>
                <div>
                    <label class="block text-xs font-semibold text-slate-700 mb-1">Período (início e término)</label>
                    <div class="grid grid-cols-2 gap-2">
                        <input type="month" class="exp-start w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-sm" aria-label="Mês e ano de início">
                        <input type="month" class="exp-end w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-sm" aria-label="Mês e ano de término">
                    </div>
                </div>
                <div class="md:col-span-3">
                    <label class="block text-xs font-semibold text-slate-700 mb-1">Principais Atividades / Tipo de Obra</label>
                    <input type="text" class="exp-activities w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-casas-blue/30 focus:border-casas-blue" placeholder="Ex: Nivelamento de subleito, pavimentação asfáltica, drenagem...">
                </div>
            </div>
        `;
        card.querySelector('.remove-exp-btn').addEventListener('click', () => {
            card.remove();
            renumberExperiences();
        });
        experiencesContainer.appendChild(card);
    });

    // 4. Máscara de WhatsApp: (XX) XXXXX-XXXX
    const whatsappInput = document.getElementById('whatsapp');
    whatsappInput.addEventListener('input', (e) => {
        let v = e.target.value.replace(/\D/g, '').slice(0, 11);
        if (v.length > 6) {
            v = `(${v.slice(0, 2)}) ${v.slice(2, 7)}-${v.slice(7)}`;
        } else if (v.length > 2) {
            v = `(${v.slice(0, 2)}) ${v.slice(2)}`;
        } else if (v.length > 0) {
            v = `(${v}`;
        }
        e.target.value = v;
    });

    // 5. Máscara e Consulta Automática de CEP (ViaCEP)
    const cepInput = document.getElementById('cep');
    const cepSpinner = document.getElementById('cepSpinner');
    const cepFeedback = document.getElementById('cepFeedback');
    cepInput.addEventListener('input', async (e) => {
        const digits = e.target.value.replace(/\D/g, '').slice(0, 8);
        e.target.value = digits.length > 5 ? `${digits.slice(0, 5)}-${digits.slice(5)}` : digits;

        if (digits.length === 8) {
            cepSpinner.classList.remove('hidden');
            cepFeedback.textContent = 'Buscando endereço...';
            cepFeedback.className = 'mt-1 text-xs text-casas-blue';
            try {
                const res = await fetch(`https://viacep.com.br/ws/${digits}/json/`);
                const data = await res.json();
                if (!data.erro) {
                    if (data.logradouro) document.getElementById('street').value = data.logradouro;
                    if (data.bairro) document.getElementById('neighborhood').value = data.bairro;
                    if (data.localidade && data.uf) document.getElementById('cityState').value = `${data.localidade} - ${data.uf}`;
                    cepFeedback.textContent = 'Endereço localizado automaticamente.';
                    cepFeedback.className = 'mt-1 text-xs text-emerald-600 font-medium';
                } else {
                    cepFeedback.textContent = 'CEP não encontrado. Preencha o endereço manualmente.';
                    cepFeedback.className = 'mt-1 text-xs text-amber-600';
                }
            } catch {
                cepFeedback.textContent = 'Preencha rua, bairro e cidade manualmente.';
                cepFeedback.className = 'mt-1 text-xs text-slate-500';
            } finally {
                cepSpinner.classList.add('hidden');
            }
        } else {
            cepSpinner.classList.add('hidden');
            cepFeedback.textContent = 'Informe o CEP de sua residência.';
            cepFeedback.className = 'mt-1 text-xs text-slate-400';
        }
    });

    // 6. Máscara Monetária (R$)
    document.querySelectorAll('.currency-input').forEach(input => {
        input.addEventListener('input', (e) => {
            let v = e.target.value.replace(/\D/g, '');
            if (!v) {
                e.target.value = '';
                return;
            }
            v = (parseInt(v, 10) / 100).toFixed(2).replace('.', ',');
            v = v.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
            e.target.value = v;
        });
    });

    // 7. Feedback Visual dos Uploads
    const resumeInput = document.getElementById('resumeFile');
    const resumePlaceholder = document.getElementById('resumePlaceholder');
    const resumeSelected = document.getElementById('resumeSelected');
    const resumeFileName = document.getElementById('resumeFileName');

    resumeInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files.length > 0) {
            resumeFileName.textContent = e.target.files[0].name;
            resumePlaceholder.classList.add('hidden');
            resumeSelected.classList.remove('hidden');
        } else {
            resumePlaceholder.classList.remove('hidden');
            resumeSelected.classList.add('hidden');
        }
    });

    const diplomaInput = document.getElementById('diplomaFiles');
    const diplomaPlaceholder = document.getElementById('diplomaPlaceholder');
    const diplomaSelected = document.getElementById('diplomaSelected');
    const diplomaFileNames = document.getElementById('diplomaFileNames');

    diplomaInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const total = e.target.files.length;
            diplomaFileNames.textContent = total === 1
                ? e.target.files[0].name
                : `${total} arquivos selecionados`;
            diplomaPlaceholder.classList.add('hidden');
            diplomaSelected.classList.remove('hidden');
        } else {
            diplomaPlaceholder.classList.remove('hidden');
            diplomaSelected.classList.add('hidden');
        }
    });

    // 8. Toast Flutuante
    function showToast(msg, isError = false) {
        const toast = document.getElementById('toastNotification');
        const toastMsg = document.getElementById('toastMessage');
        const toastIcon = document.getElementById('toastIcon');

        toastMsg.textContent = msg;
        toastIcon.className = isError
            ? 'fa-solid fa-circle-exclamation text-casas-yellow text-lg'
            : 'fa-solid fa-circle-check text-emerald-400 text-lg';

        toast.classList.remove('hidden');
        setTimeout(() => toast.classList.remove('translate-y-4', 'opacity-0'), 10);
        setTimeout(() => {
            toast.classList.add('translate-y-4', 'opacity-0');
            setTimeout(() => toast.classList.add('hidden'), 300);
        }, 4500);
    }

    // 9. Validação de Campos Obrigatórios
    function validateForm() {
        let valid = true;
        const requiredFields = form.querySelectorAll('[required]');

        requiredFields.forEach(field => {
            if (field.offsetParent === null && field.type !== 'file') return;

            const container = field.closest('div');
            const errorEl = container ? (container.parentElement.querySelector('.error-msg') || container.querySelector('.error-msg')) : null;

            let fieldOk = true;
            if (field.type === 'file') {
                fieldOk = field.files && field.files.length > 0;
            } else if (field.type === 'email') {
                fieldOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim());
            } else if (field.id === 'whatsapp') {
                fieldOk = field.value.replace(/\D/g, '').length >= 10;
            } else if (field.id === 'age') {
                const ageNum = parseInt(field.value, 10);
                fieldOk = !isNaN(ageNum) && ageNum >= 18 && ageNum <= 85;
            } else {
                fieldOk = field.value.trim() !== '';
            }

            if (!fieldOk) {
                valid = false;
                field.classList.add('border-red-500', 'bg-red-50/30');
                if (errorEl) errorEl.classList.remove('hidden');
            } else {
                field.classList.remove('border-red-500', 'bg-red-50/30');
                if (errorEl) errorEl.classList.add('hidden');
            }
        });

        // Valida seleção de pelo menos uma máquina
        const checkedMachines = document.querySelectorAll('input[name="Maquinas_Operadas[]"]:checked');
        const machinesError = document.getElementById('machinesError');
        const machinesGroup = document.getElementById('machinesGroup');

        if (checkedMachines.length === 0) {
            valid = false;
            machinesError.classList.remove('hidden');
            machinesGroup.classList.add('ring-2', 'ring-red-400/50', 'rounded-xl', 'p-2');
        } else {
            machinesError.classList.add('hidden');
            machinesGroup.classList.remove('ring-2', 'ring-red-400/50', 'rounded-xl', 'p-2');
        }

        return valid;
    }

    // 10. Envio Real via FormSubmit.co (mlreserva469@gmail.com)
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            showToast('Verifique os campos obrigatórios destacados em vermelho.', true);
            const firstErr = form.querySelector('.border-red-500, #machinesGroup.ring-2');
            if (firstErr) firstErr.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }

        const submitBtn = document.getElementById('submitBtn');
        const submitIcon = document.getElementById('submitIcon');
        const submitBtnText = document.getElementById('submitBtnText');

        submitBtn.disabled = true;
        submitIcon.textContent = '…';
        submitBtnText.textContent = 'Enviando candidatura...';

        // Atualiza assunto com o nome e cargo do candidato
        const candidateName = document.getElementById('fullName').value.trim();
        const candidateRole = document.getElementById('role').value;
        const hiddenSubject = document.getElementById('hiddenSubject');
        if (hiddenSubject) {
            hiddenSubject.value = `Nova Candidatura: ${candidateName} - ${candidateRole} | Casas Engenharia`;
        }

        // Prepara experiências dinâmicas em um campo consolidado antes do envio
        const expCards = document.querySelectorAll('.experience-card');
        const expSummary = [];
        expCards.forEach((card, idx) => {
            const comp = card.querySelector('.exp-company').value.trim();
            const role = card.querySelector('.exp-role').value.trim();
            const start = card.querySelector('.exp-start')?.value || '';
            const end = card.querySelector('.exp-end')?.value || '';
            const period = [start, end || (start ? 'Atual' : '')].filter(Boolean).join(' a ');
            const act = card.querySelector('.exp-activities').value.trim();
            if (comp || role || period || act) {
                expSummary.push(`Exp #${idx + 1}: Empresa: ${comp || '-'} | Cargo/Máquina: ${role || '-'} | Período: ${period || '-'} | Atividades: ${act || '-'}`);
            }
        });

        const existingExpHidden = form.querySelector('input[name="Historico_Experiencias_Anteriores"]');
        if (existingExpHidden) existingExpHidden.remove();

        const expHiddenInput = document.createElement('input');
        expHiddenInput.type = 'hidden';
        expHiddenInput.name = 'Historico_Experiencias_Anteriores';
        expHiddenInput.value = expSummary.length > 0 ? expSummary.join(' || ') : 'Nenhuma experiência anterior informada';
        form.appendChild(expHiddenInput);

        // Consolida máquinas marcadas em texto legível para a tabela do e-mail
        const checkedMachines = Array.from(document.querySelectorAll('input[name="Maquinas_Operadas[]"]:checked')).map(cb => cb.value);
        const existingMachHidden = form.querySelector('input[name="Resumo_Maquinas_Operadas"]');
        if (existingMachHidden) existingMachHidden.remove();
        const machHidden = document.createElement('input');
        machHidden.type = 'hidden';
        machHidden.name = 'Resumo_Maquinas_Operadas';
        machHidden.value = checkedMachines.join(', ');
        form.appendChild(machHidden);

        // Consolida certificações NRs marcadas
        const checkedNRs = Array.from(document.querySelectorAll('input[name="Certificacoes_NRs[]"]:checked')).map(cb => cb.value);
        const existingNrHidden = form.querySelector('input[name="Resumo_Certificacoes_NRs"]');
        if (existingNrHidden) existingNrHidden.remove();
        const nrHidden = document.createElement('input');
        nrHidden.type = 'hidden';
        nrHidden.name = 'Resumo_Certificacoes_NRs';
        nrHidden.value = checkedNRs.length > 0 ? checkedNRs.join(', ') : 'Nenhuma marcada';
        form.appendChild(nrHidden);

        const formData = new FormData(form);

        try {
            const response = await fetch(FORMSUBMIT_URL, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            const result = await response.json().catch(() => ({}));

            if (response.ok && (result.success === 'true' || result.success === true || response.status === 200)) {
                successMessage.textContent = 'Sua candidatura foi encaminhada com sucesso para análise do setor de Recursos Humanos.';
                form.classList.add('hidden');
                successView.classList.remove('hidden');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                // Fallback para envio tradicional caso o navegador/CORS bloqueie AJAX com anexos
                form.submit();
                return;
            }
        } catch (error) {
            // Fallback nativo para garantir o envio dos anexos via FormSubmit
            form.submit();
            return;
        } finally {
            submitBtn.disabled = false;
            submitIcon.textContent = '◆';
            submitBtnText.textContent = 'Enviar Candidatura';
        }
    });

    // 11. Reiniciar para Nova Candidatura
    document.getElementById('newApplicationBtn').addEventListener('click', () => {
        form.reset();
        dependentsCountWrapper.classList.add('hidden');
        dependentsContainer.innerHTML = '';
        cnhDetailsWrapper.classList.remove('hidden');
        resumePlaceholder.classList.remove('hidden');
        resumeSelected.classList.add('hidden');
        diplomaPlaceholder.classList.remove('hidden');
        diplomaSelected.classList.add('hidden');
        cepFeedback.textContent = 'Informe o CEP de sua residência.';
        cepFeedback.className = 'mt-1 text-xs text-slate-400';

        const extraCards = experiencesContainer.querySelectorAll('.experience-card:not(:first-child)');
        extraCards.forEach(c => c.remove());

        successView.classList.add('hidden');
        successMessage.textContent = 'Sua candidatura foi encaminhada com sucesso para análise do setor de Recursos Humanos.';
        form.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});
