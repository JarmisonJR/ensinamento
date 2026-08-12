document.addEventListener('DOMContentLoaded', () => {

  /* --- 1. ACCORDION DOS SERVIÇOS --- */
  const accordionHeaders = document.querySelectorAll('.accordion-header');

  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isActive = item.classList.contains('active');

      // Fecha todos os itens
      document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('active'));

      // Abre o selecionado se não estava ativo
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  /* --- 2. CALCULADORA TRIBUTÁRIA --- */
  const taxForm = document.getElementById('tax-form');
  const calcResults = document.getElementById('calc-results');

  taxForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const fatMensal = parseFloat(document.getElementById('faturamento-anual').value);
    const folhaMensal = parseFloat(document.getElementById('folha-pagamento').value);

    // Cálculo simplificado para fins de simulação
    // Simples Nacional (Anexo III aprox. médio 8%)
    const impostoSimples = fatMensal * 0.08;

    // Lucro Presumido (Aprox. 13.33% somando PIS/COFINS/IRPJ/CSLL + ISS)
    const impostoPresumido = fatMensal * 0.1333;

    // Formatação
    document.getElementById('res-simples').textContent = impostoSimples.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    document.getElementById('res-presumido').textContent = impostoPresumido.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    const recBadge = document.getElementById('res-recomendacao');
    
    if (impostoSimples < impostoPresumido) {
      recBadge.textContent = "Melhor Opção Estimada: Simples Nacional";
    } else {
      recBadge.textContent = "Melhor Opção Estimada: Lucro Presumido";
    }

    calcResults.classList.remove('hidden');
  });

  /* --- 3. CONTADORES ANIMADOS (SCROLL) --- */
  const counters = document.querySelectorAll('.counter');
  let animated = false;

  const startCounters = () => {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      let count = 0;
      const speed = target / 50;

      const updateCount = () => {
        count += speed;
        if (count < target) {
          counter.innerText = Math.ceil(count);
          setTimeout(updateCount, 30);
        } else {
          counter.innerText = target;
        }
      };
      updateCount();
    });
  };

  window.addEventListener('scroll', () => {
    const metricsSection = document.querySelector('.metrics-section');
    if (!metricsSection) return;
    const sectionPos = metricsSection.getBoundingClientRect().top;
    const screenPos = window.innerHeight;

    if (sectionPos < screenPos && !animated) {
      startCounters();
      animated = true;
    }
  });

  /* --- 4. FILTRO DE NOTÍCIAS --- */
  const tabBtns = document.querySelectorAll('.tab-btn');
  const newsCards = document.querySelectorAll('.news-card');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      newsCards.forEach(card => {
        if (filter === 'todos' || card.getAttribute('data-category') === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* --- 5. MODAL DE AGENDAMENTO --- */
  const modal = document.getElementById('modal-agendamento');
  const openModalBtns = [
    document.getElementById('open-modal-nav'),
    document.getElementById('open-modal-hero')
  ];
  const closeModalBtn = document.getElementById('close-modal');

  openModalBtns.forEach(btn => {
    if (btn) {
      btn.addEventListener('click', () => modal.classList.add('active'));
    }
  });

  closeModalBtn.addEventListener('click', () => modal.classList.remove('active'));

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
  });

  document.getElementById('appointment-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Solicitação de agendamento enviada com sucesso! Entre em contato em breve.');
    modal.classList.remove('active');
  });
});
document.addEventListener('DOMContentLoaded', () => {

  /* --- LÓGICA DO PORTAL DO CLIENTE (TABS) --- */
  const portalMenuItems = document.querySelectorAll('.portal-menu-item');
  const portalTabs = document.querySelectorAll('.portal-tab');

  portalMenuItems.forEach(item => {
    item.addEventListener('click', () => {
      portalMenuItems.forEach(i => i.classList.remove('active'));
      portalTabs.forEach(t => t.classList.remove('active'));

      item.classList.add('active');
      const targetTab = item.getAttribute('data-tab');
      document.getElementById(targetTab).classList.add('active');
    });
  });

  // Formulário de Solicitação no Portal
  const ticketForm = document.getElementById('ticket-form');
  if (ticketForm) {
    ticketForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Chamado aberto com sucesso! Nossa equipe técnica responderá em até 2 horas úteis.');
      ticketForm.reset();
    });
  }

  /* --- LÓGICA DO MODAL DE AGENDAMENTO DE CONSULTORIA --- */
  const bookingModal = document.getElementById('modal-booking');
  const openBookingBtns = [
    document.getElementById('open-booking-btn'),
    document.getElementById('open-booking-hero')
  ];
  const closeBookingBtn = document.getElementById('close-booking');

  // Abrir Modal
  openBookingBtns.forEach(btn => {
    if (btn) {
      btn.addEventListener('click', () => bookingModal.classList.add('active'));
    }
  });

  // Rolagem até o Portal do Cliente
  const openPortalBtns = [
    document.getElementById('open-portal-btn'),
    document.getElementById('open-portal-hero')
  ];

  openPortalBtns.forEach(btn => {
    if (btn) {
      btn.addEventListener('click', () => {
        document.getElementById('portal-section').scrollIntoView({ behavior: 'smooth' });
      });
    }
  });

  // Fechar Modal
  if (closeBookingBtn) {
    closeBookingBtn.addEventListener('click', () => bookingModal.classList.remove('active'));
  }

  bookingModal.addEventListener('click', (e) => {
    if (e.target === bookingModal) bookingModal.classList.remove('active');
  });

  // Seleção de Horários
  const timeBtns = document.querySelectorAll('.time-btn');
  const selectedTimeInput = document.getElementById('selected-time');

  timeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      timeBtns.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedTimeInput.value = btn.textContent;
    });
  });

  // Troca de Etapas do Formulário
  const step1 = document.getElementById('step-1');
  const step2 = document.getElementById('step-2');
  const btnNext = document.getElementById('btn-next-step');
  const btnPrev = document.getElementById('btn-prev-step');

  btnNext.addEventListener('click', () => {
    const service = document.getElementById('book-service').value;
    const date = document.getElementById('book-date').value;
    const time = selectedTimeInput.value;

    if (!service || !date || !time) {
      alert('Por favor, selecione o serviço, a data e um horário disponível.');
      return;
    }

    step1.classList.remove('active');
    step2.classList.add('active');
  });

  btnPrev.addEventListener('click', () => {
    step2.classList.remove('active');
    step1.classList.add('active');
  });

  // Envio do Agendamento
  document.getElementById('booking-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('book-name').value;
    const date = document.getElementById('book-date').value;
    const time = selectedTimeInput.value;

    alert(`Consultoria agendada com sucesso para ${name} no dia ${date} às ${time}! Enviamos a confirmação para o seu e-mail.`);
    
    // Reseta o modal
    bookingModal.classList.remove('active');
    step2.classList.remove('active');
    step1.classList.add('active');
    document.getElementById('booking-form').reset();
    timeBtns.forEach(b => b.classList.remove('selected'));
  });
});
document.addEventListener('DOMContentLoaded', () => {

  /* --- 1. ACCORDION DOS SERVIÇOS --- */
  const accordionHeaders = document.querySelectorAll('.accordion-header');

  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isActive = item.classList.contains('active');

      document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('active'));

      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  /* --- 2. CALCULADORA TRIBUTÁRIA --- */
  const taxForm = document.getElementById('tax-form');
  const calcResults = document.getElementById('calc-results');

  if (taxForm) {
    taxForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const fatMensal = parseFloat(document.getElementById('faturamento-anual').value);
      const folhaMensal = parseFloat(document.getElementById('folha-pagamento').value);

      const impostoSimples = fatMensal * 0.08;
      const impostoPresumido = fatMensal * 0.1333;

      document.getElementById('res-simples').textContent = impostoSimples.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
      document.getElementById('res-presumido').textContent = impostoPresumido.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

      const recBadge = document.getElementById('res-recomendacao');
      
      if (impostoSimples < impostoPresumido) {
        recBadge.textContent = "Melhor Opção Estimada: Simples Nacional";
      } else {
        recBadge.textContent = "Melhor Opção Estimada: Lucro Presumido";
      }

      calcResults.classList.remove('hidden');
    });
  }

  /* --- 3. CONTADORES ANIMADOS (SCROLL) --- */
  const counters = document.querySelectorAll('.counter');
  let animated = false;

  const startCounters = () => {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      let count = 0;
      const speed = target / 50;

      const updateCount = () => {
        count += speed;
        if (count < target) {
          counter.innerText = Math.ceil(count);
          setTimeout(updateCount, 30);
        } else {
          counter.innerText = target;
        }
      };
      updateCount();
    });
  };

  window.addEventListener('scroll', () => {
    const metricsSection = document.querySelector('.metrics-section');
    if (!metricsSection) return;
    const sectionPos = metricsSection.getBoundingClientRect().top;
    const screenPos = window.innerHeight;

    if (sectionPos < screenPos && !animated) {
      startCounters();
      animated = true;
    }
  });

  /* --- 4. FILTRO DE NOTÍCIAS --- */
  const tabBtns = document.querySelectorAll('.tab-btn');
  const newsCards = document.querySelectorAll('.news-card');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      newsCards.forEach(card => {
        if (filter === 'todos' || card.getAttribute('data-category') === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* --- 5. PORTAL DO CLIENTE (TABS) --- */
  const portalMenuItems = document.querySelectorAll('.portal-menu-item');
  const portalTabs = document.querySelectorAll('.portal-tab');

  portalMenuItems.forEach(item => {
    item.addEventListener('click', () => {
      portalMenuItems.forEach(i => i.classList.remove('active'));
      portalTabs.forEach(t => t.classList.remove('active'));

      item.classList.add('active');
      const targetTab = item.getAttribute('data-tab');
      document.getElementById(targetTab).classList.add('active');
    });
  });

  const ticketForm = document.getElementById('ticket-form');
  if (ticketForm) {
    ticketForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Chamado aberto com sucesso! Nossa equipe técnica responderá em até 2 horas úteis.');
      ticketForm.reset();
    });
  }

  /* --- 6. MODAL DE AGENDAMENTO --- */
  const bookingModal = document.getElementById('modal-booking');
  const openBookingBtns = [
    document.getElementById('open-booking-btn'),
    document.getElementById('open-booking-hero')
  ];
  const closeBookingBtn = document.getElementById('close-booking');

  openBookingBtns.forEach(btn => {
    if (btn) {
      btn.addEventListener('click', () => bookingModal.classList.add('active'));
    }
  });

  const openPortalBtns = [
    document.getElementById('open-portal-btn'),
    document.getElementById('open-portal-hero')
  ];

  openPortalBtns.forEach(btn => {
    if (btn) {
      btn.addEventListener('click', () => {
        document.getElementById('portal-section').scrollIntoView({ behavior: 'smooth' });
      });
    }
  });

  if (closeBookingBtn) {
    closeBookingBtn.addEventListener('click', () => bookingModal.classList.remove('active'));
  }

  bookingModal.addEventListener('click', (e) => {
    if (e.target === bookingModal) bookingModal.classList.remove('active');
  });

  const timeBtns = document.querySelectorAll('.time-btn');
  const selectedTimeInput = document.getElementById('selected-time');

  timeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      timeBtns.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedTimeInput.value = btn.textContent;
    });
  });

  const step1 = document.getElementById('step-1');
  const step2 = document.getElementById('step-2');
  const btnNext = document.getElementById('btn-next-step');
  const btnPrev = document.getElementById('btn-prev-step');

  if (btnNext) {
    btnNext.addEventListener('click', () => {
      const service = document.getElementById('book-service').value;
      const date = document.getElementById('book-date').value;
      const time = selectedTimeInput.value;

      if (!service || !date || !time) {
        alert('Por favor, selecione o serviço, a data e um horário disponível.');
        return;
      }

      step1.classList.remove('active');
      step2.classList.add('active');
    });
  }

  if (btnPrev) {
    btnPrev.addEventListener('click', () => {
      step2.classList.remove('active');
      step1.classList.add('active');
    });
  }

  const bookingForm = document.getElementById('booking-form');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('book-name').value;
      const date = document.getElementById('book-date').value;
      const time = selectedTimeInput.value;

      alert(`Consultoria agendada com sucesso para ${name} no dia ${date} às ${time}! Enviamos a confirmação para o seu e-mail.`);
      
      bookingModal.classList.remove('active');
      step2.classList.remove('active');
      step1.classList.add('active');
      bookingForm.reset();
      timeBtns.forEach(b => b.classList.remove('selected'));
    });
  }
});
