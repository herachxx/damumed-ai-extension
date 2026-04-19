(() => {
  if (document.getElementById('aqbobek-root')) return;

  // ── SVG ICONS LIBRARY
  const ICONS = {
    brand:    `<svg viewBox="0 0 24 24" fill="none"><path d="M9 3H15V9H21V15H15V21H9V15H3V9H9V3Z" fill="currentColor"/></svg>`,
    scan:     `<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2"/><rect x="7" y="7" width="10" height="10" rx="1"/></svg>`,
    message:  `<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
    log:      `<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`,
    close:    `<svg viewBox="0 0 24 24" fill="none" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
    mic:      `<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>`,
    micStop:  `<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" fill="currentColor"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>`,
    send:     `<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`,
    apply:    `<svg viewBox="0 0 24 24" fill="none" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
    lightning:`<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
    telescope:`<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="2"/><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>`,
    robot:    `<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"/><path d="M12 11V7"/><circle cx="12" cy="5" r="2"/><path d="M7 15h2M15 15h2"/></svg>`,
    response: `<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>`,
    clock:    `<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
    wave:     `<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
  };

  // ── STATE
  let domElements = [];
  let isRecording = false;
  let pendingJsCode = null;
  let mediaRecorder = null;
  let audioChunks = [];
  let isDragging = false;
  let dragOffsetX = 0, dragOffsetY = 0;

  // ── BUILD PANEL HTML
  const root = document.createElement('div');
  root.id = 'aqbobek-root';
  root.innerHTML = `
    <div id="aq-header">
      <div id="aq-logo">${ICONS.brand}</div>
      <div id="aq-title-block">
        <div id="aq-title">Aqbobek AI Agent</div>
        <div id="aq-subtitle">КМИС Дамумед · RPA</div>
      </div>
      <div id="aq-status-dot"></div>
      <button id="aq-close-btn" title="Закрыть">${ICONS.close}</button>
    </div>

    <div id="aq-tabs">
      <button class="aq-tab active" data-panel="scan">${ICONS.scan} Сканер</button>
      <button class="aq-tab" data-panel="request">${ICONS.message} Запрос</button>
      <button class="aq-tab" data-panel="log">${ICONS.log} Лог</button>
    </div>

    <div id="aq-body">

      <div class="aq-panel active" id="panel-scan">
        <div id="aq-stats">
          <div class="aq-stat"><div class="aq-stat-num" id="stat-inputs">0</div><div class="aq-stat-label">Поля</div></div>
          <div class="aq-stat"><div class="aq-stat-num" id="stat-buttons">0</div><div class="aq-stat-label">Кнопки</div></div>
          <div class="aq-stat"><div class="aq-stat-num" id="stat-total">0</div><div class="aq-stat-label">Всего</div></div>
        </div>
        <button id="aq-scan-btn" class="aq-btn-primary">${ICONS.lightning} Сканировать DOM страницы</button>
        <div class="aq-label">Найденные элементы</div>
        <div id="aq-dom-list">
          <div class="aq-empty"><div class="aq-empty-icon">${ICONS.telescope}</div>Нажмите «Сканировать» чтобы найти<br>все интерактивные элементы страницы</div>
        </div>
      </div>

      <div class="aq-panel" id="panel-request">
        <div id="aq-request-panel">
          <div>
            <div class="aq-field-label">${ICONS.mic} Голосовой ввод</div>
            <button id="aq-voice-btn">${ICONS.mic} Начать запись</button>
          </div>
          <div>
            <div class="aq-field-label">${ICONS.message} Запрос / команда врача</div>
            <textarea id="aq-user-input" placeholder="Например: Заполни жалобы — головные боли, нарушение сна. Диагноз — ДЦП, спастическая форма. Назначь ЛФК и массаж на 9 дней..."></textarea>
          </div>
          <button id="aq-send-btn" class="aq-btn-primary">${ICONS.send} Отправить в AI-агент</button>
          <div>
            <div class="aq-field-label">${ICONS.response} Ответ агента</div>
            <div id="aq-response-box">Ответ появится здесь...</div>
          </div>
          <button id="aq-apply-btn" style="display:none;">${ICONS.apply} Применить изменения на странице</button>
        </div>
      </div>

      <div class="aq-panel" id="panel-log">
        <div class="aq-label">История действий</div>
        <div id="aq-log">
          <div class="aq-empty"><div class="aq-empty-icon">${ICONS.wave}</div>Лог пуст. Действия агента<br>будут отображены здесь.</div>
        </div>
      </div>

    </div>

    <div id="aq-footer">
      <span id="aq-footer-status">Готов к работе</span>
      <span id="aq-footer-url">${location.hostname}</span>
    </div>
  `;

  document.body.appendChild(root);

  const $ = (id) => document.getElementById(id);
  const statusDot = $('aq-status-dot');
  const domList = $('aq-dom-list');
  const footerStatus = $('aq-footer-status');
  const responseBox = $('aq-response-box');

  // ── DRAGGING
  const header = $('aq-header');
  header.addEventListener('mousedown', (e) => {
    if (e.target.closest('#aq-close-btn')) return;
    isDragging = true;
    const rect = root.getBoundingClientRect();
    dragOffsetX = e.clientX - rect.left;
    dragOffsetY = e.clientY - rect.top;
    root.style.transition = 'none';
    e.preventDefault();
  });
  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const x = e.clientX - dragOffsetX;
    const y = e.clientY - dragOffsetY;
    root.style.left = Math.max(0, Math.min(x, window.innerWidth - root.offsetWidth)) + 'px';
    root.style.top = Math.max(0, Math.min(y, window.innerHeight - root.offsetHeight)) + 'px';
    root.style.right = 'auto';
  });
  document.addEventListener('mouseup', () => { isDragging = false; root.style.transition = ''; });

  // ── CLOSE
  $('aq-close-btn').addEventListener('click', () => {
    window.speechSynthesis && window.speechSynthesis.cancel();
    root.classList.add('hidden');
  });

  // ── TABS
  document.querySelectorAll('.aq-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.aq-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.aq-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      $('panel-' + tab.dataset.panel).classList.add('active');
    });
  });

  browser.runtime.onMessage.addListener((msg) => {
    if (msg.type === 'TOGGLE_PANEL') root.classList.toggle('hidden');
  });

  // ── HELPERS
  function setStatus(text) { footerStatus.textContent = text; }

  function addLog(text, type) {
    type = type || 'info';
    const logContainer = $('aq-log');
    const empty = logContainer.querySelector('.aq-empty');
    if (empty) empty.remove();
    const item = document.createElement('div');
    item.className = 'aq-log-item ' + type;
    const timeStr = new Date().toLocaleTimeString('ru-RU');
    item.innerHTML = '<div class="aq-log-time">' + timeStr + '</div><div class="aq-log-text">' + text + '</div>';
    logContainer.prepend(item);
  }

  function getCssSelector(el) {
    if (el.id) return '#' + el.id;
    const parts = [];
    let cur = el;
    while (cur && cur !== document.body) {
      let part = cur.tagName.toLowerCase();
      if (cur.className) { const cls = [...cur.classList].slice(0, 2).join('.'); if (cls) part += '.' + cls; }
      const idx = [...(cur.parentNode ? cur.parentNode.children : [])].indexOf(cur) + 1;
      part += ':nth-child(' + idx + ')';
      parts.unshift(part);
      cur = cur.parentNode;
    }
    return parts.join(' > ');
  }

  function getElementPurpose(el) {
    const candidates = [
      el.getAttribute('placeholder'), el.getAttribute('aria-label'), el.getAttribute('name'),
      el.getAttribute('title'), el.textContent ? el.textContent.trim() : null,
      el.getAttribute('data-field'), el.getAttribute('data-name'), el.id,
      el.closest('label') ? el.closest('label').textContent.trim() : null,
      el.previousElementSibling ? el.previousElementSibling.textContent.trim() : null,
    ];
    for (const c of candidates) { if (c && c.length > 1 && c.length < 80) return c; }
    return el.tagName.toLowerCase();
  }

  function getElementType(el) {
    const tag = el.tagName.toLowerCase();
    if (tag === 'button' || (tag === 'input' && (el.type === 'button' || el.type === 'submit'))) return 'button';
    if (tag === 'select') return 'select';
    if (tag === 'textarea') return 'textarea';
    return 'input';
  }

  function escapeHtml(str) {
    return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  // ── DOM SCANNER
  $('aq-scan-btn').addEventListener('click', scanDOM);

  function scanDOM() {
    statusDot.className = 'scanning';
    setStatus('Сканирование DOM...');
    addLog('Начато сканирование DOM страницы', 'info');
    domElements = [];

    const selectors = [
      'input:not([type="hidden"]):not([disabled])',
      'textarea:not([disabled])', 'select:not([disabled])',
      'button:not([disabled])', '[role="button"]:not([disabled])', 'a[href]'
    ];

    document.querySelectorAll(selectors.join(',')).forEach(function(el) {
      if (root.contains(el)) return;
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const type = getElementType(el);
      const purpose = getElementPurpose(el);
      const selector = getCssSelector(el);
      const value = el.value || (el.textContent ? el.textContent.trim().slice(0, 50) : '') || '';
      domElements.push({
        type: type, purpose: purpose, selector: selector, tag: el.tagName.toLowerCase(),
        id: el.id || null, name: el.getAttribute('name') || null,
        placeholder: el.getAttribute('placeholder') || null, value: value,
        rect: { top: Math.round(rect.top + window.scrollY), left: Math.round(rect.left + window.scrollX) }
      });
    });

    renderDomList();
    const inputs = domElements.filter(function(e) { return e.type !== 'button'; }).length;
    const buttons = domElements.filter(function(e) { return e.type === 'button'; }).length;
    $('stat-inputs').textContent = inputs;
    $('stat-buttons').textContent = buttons;
    $('stat-total').textContent = domElements.length;
    statusDot.className = '';
    setStatus('Найдено ' + domElements.length + ' элементов');
    addLog('Сканирование завершено: ' + inputs + ' полей, ' + buttons + ' кнопок', 'success');
  }

  function renderDomList() {
    if (domElements.length === 0) {
      domList.innerHTML = '<div class="aq-empty"><div class="aq-empty-icon">' + ICONS.telescope + '</div>Интерактивных элементов не найдено</div>';
      return;
    }
    domList.innerHTML = '';
    domElements.slice(0, 60).forEach(function(el, idx) {
      const item = document.createElement('div');
      item.className = 'aq-dom-item type-' + el.type;
      item.dataset.idx = idx;
      item.innerHTML =
        '<span class="aq-dom-badge">' + el.type + '</span>' +
        '<div class="aq-dom-info">' +
          '<div class="aq-dom-name">' + escapeHtml(el.purpose) + '</div>' +
          '<div class="aq-dom-path">' + escapeHtml(el.selector.slice(-60)) + '</div>' +
        '</div>';
      item.addEventListener('mouseenter', function() { highlightElement(idx); });
      item.addEventListener('mouseleave', unhighlightAll);
      domList.appendChild(item);
    });
    if (domElements.length > 60) {
      const more = document.createElement('div');
      more.className = 'aq-empty';
      more.style.paddingTop = '8px';
      more.textContent = '...и ещё ' + (domElements.length - 60) + ' элементов';
      domList.appendChild(more);
    }
  }

  function highlightElement(idx) {
    unhighlightAll();
    const el = domElements[idx];
    if (!el) return;
    const pageEl = document.querySelector(el.selector);
    if (pageEl && !root.contains(pageEl)) pageEl.classList.add('aqbobek-highlight');
  }

  function unhighlightAll() {
    document.querySelectorAll('.aqbobek-highlight').forEach(function(e) { e.classList.remove('aqbobek-highlight'); });
  }

  // ── VOICE
  $('aq-voice-btn').addEventListener('click', toggleVoice);

  async function toggleVoice() {
    if (isRecording) {
      if (mediaRecorder && mediaRecorder.state !== 'inactive') mediaRecorder.stop();
      return;
    }
    let stream;
    try { stream = await navigator.mediaDevices.getUserMedia({ audio: true }); }
    catch (err) { addLog('Нет доступа к микрофону: ' + err.message, 'error'); return; }

    audioChunks = [];
    mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
    mediaRecorder.ondataavailable = function(e) { if (e.data.size > 0) audioChunks.push(e.data); };

    mediaRecorder.onstart = function() {
      isRecording = true;
      const btn = $('aq-voice-btn');
      btn.className = 'recording';
      btn.innerHTML = ICONS.micStop + ' Запись... (нажмите чтобы остановить)';
      addLog('Голосовая запись начата', 'info');
    };

    mediaRecorder.onstop = async function() {
      isRecording = false;
      const btn = $('aq-voice-btn');
      btn.className = '';
      btn.innerHTML = ICONS.mic + ' Начать запись';
      stream.getTracks().forEach(function(t) { t.stop(); });
      const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
      addLog('Запись завершена, отправка аудио...', 'info');
      await sendToWebhook(audioBlob);
    };

    mediaRecorder.onerror = function(e) {
      addLog('Ошибка записи: ' + (e.error && e.error.message ? e.error.message : 'unknown'), 'error');
      isRecording = false;
      const btn = $('aq-voice-btn');
      btn.className = '';
      btn.innerHTML = ICONS.mic + ' Начать запись';
      stream.getTracks().forEach(function(t) { t.stop(); });
    };

    mediaRecorder.start();
  }

  function speak(text) {
    if (!text || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ru-RU'; utterance.rate = 1.5;
    window.speechSynthesis.speak(utterance);
  }

  function speakIfImportant(text, isError) {
    if (!text) return;
    if (isError || text.length > 20) speak(text);
  }

  // ── SEND
  $('aq-send-btn').addEventListener('click', function() { sendToWebhook(null); });

  $('aq-apply-btn').addEventListener('click', function() {
    if (!pendingJsCode) { addLog('Нет ожидающих изменений', 'warn'); return; }
    try {
      new Function(pendingJsCode)();
      addLog('Изменения успешно применены на странице', 'success');
      speakIfImportant('Изменения применены', false);
    } catch (e) {
      addLog('Ошибка применения: ' + e.message, 'error');
      speakIfImportant('Ошибка применения изменений', true);
    }
    pendingJsCode = null;
    $('aq-apply-btn').style.display = 'none';
  });

  async function sendToWebhook(audioBlob) {
    const webhookUrl = 'https://herachxx.app.n8n.cloud/webhook-test/d8bc0686-ef40-4ab5-868c-26fcb20d4119';
    const userQuery = audioBlob ? '' : $('aq-user-input').value.trim();
    if (!audioBlob && !userQuery) { addLog('Пустой запрос — введите команду или используйте голос', 'warn'); return; }

    const sendBtn = $('aq-send-btn');
    sendBtn.disabled = true;
    sendBtn.innerHTML = ICONS.clock + ' Отправка...';
    pendingJsCode = null;
    $('aq-apply-btn').style.display = 'none';
    statusDot.className = 'scanning';
    setStatus('Отправка запроса...');

    const payloadData = {
      timestamp: new Date().toISOString(),
      page: { url: location.href, title: document.title, hostname: location.hostname },
      userQuery: userQuery,
      domElements: domElements.map(function(el) {
        return {
          type: el.type, purpose: el.purpose, selector: el.selector, tag: el.tag,
          id: el.id, name: el.name, label: el.purpose, placeholder: el.placeholder,
          currentValue: el.value, value: el.value, required: false, position: el.rect
        };
      }),
      context: {
        totalElements: domElements.length,
        inputFields: domElements.filter(function(e) { return e.type !== 'button'; }).length,
        buttons: domElements.filter(function(e) { return e.type === 'button'; }).length,
        scannedAt: domElements.length > 0 ? 'pre-scanned' : 'not-scanned'
      }
    };

    let bodyData;
    if (audioBlob) {
      addLog('Подготовка аудио...', 'info');
      const arrayBuffer = await audioBlob.arrayBuffer();
      const uint8 = new Uint8Array(arrayBuffer);
      let binary = '';
      for (let i = 0; i < uint8.length; i++) binary += String.fromCharCode(uint8[i]);
      bodyData = Object.assign({ type: 'audio', audioBase64: btoa(binary), audioMimeType: 'audio/webm' }, payloadData);
      addLog('Отправка голосового сообщения...', 'info');
    } else {
      bodyData = Object.assign({ type: 'text' }, payloadData);
      addLog('Запрос: "' + userQuery.slice(0, 60) + '"', 'info');
    }

    addLog('Payload: ' + domElements.length + ' DOM-элементов', 'info');

    try {
      const res = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyData)
      });

      let responseText = '';
      const contentType = res.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        const json = await res.json();
        responseText = JSON.stringify(json, null, 2);
      } else {
        responseText = await res.text();
      }

      responseBox.textContent = responseText || '(пустой ответ)';
      responseBox.classList.add('visible');

      if (res.ok) {
        addLog('Успешно (HTTP ' + res.status + ')', 'success');
        setStatus('Ответ получен · ' + res.status);
        statusDot.className = '';
        tryExecuteActions(responseText);
      } else {
        const errMsg = 'HTTP ошибка: ' + res.status + ' ' + res.statusText;
        addLog(errMsg, 'error');
        setStatus('Ошибка ' + res.status);
        statusDot.className = 'error';
        speakIfImportant(errMsg, true);
      }
    } catch (err) {
      const errMsg = 'Ошибка сети: ' + err.message;
      addLog(errMsg, 'error');
      responseBox.textContent = errMsg;
      responseBox.classList.add('visible');
      setStatus('Ошибка соединения');
      statusDot.className = 'error';
      speakIfImportant(errMsg, true);
    } finally {
      sendBtn.disabled = false;
      sendBtn.innerHTML = ICONS.send + ' Отправить в AI-агент';
    }
  }

  // ── ACTIONS
  function tryExecuteActions(responseText) {
    if (!responseText || !responseText.trim()) return;
    let data = null;
    try { data = JSON.parse(responseText); } catch(e) { storePendingAndNotify(responseText); return; }
    if (Array.isArray(data)) data = data[0] || {};
    if (data.jsCode !== undefined || data.nextAction !== undefined) { storePendingAndNotify(data.jsCode, data.nextAction); return; }
    if (typeof data.output === 'string') { storePendingAndNotify(data.output); return; }
    if (Array.isArray(data.actions)) {
      addLog('Выполняю ' + data.actions.length + ' действий...', 'info');
      data.actions.forEach(function(action, i) {
        setTimeout(function() { try { executeAction(action); } catch(e) { addLog('Ошибка ' + (i+1) + ': ' + e.message, 'error'); } }, i * 300);
      });
      return;
    }
    addLog('Ответ получен, формат не распознан', 'warn');
  }

  function storePendingAndNotify(jsCodeOrRaw, nextAction) {
    let jsCode = jsCodeOrRaw || '';
    let hint   = nextAction  || '';
    if (!nextAction && typeof jsCodeOrRaw === 'string') {
      const match = jsCodeOrRaw.match(/([\s\S]*?)NEXT_ACTION:\s*([\s\S]*)/);
      if (match) { jsCode = match[1].trim(); hint = match[2].trim(); }
    }
    const applyBtn = $('aq-apply-btn');
    if (jsCode && jsCode.trim()) {
      pendingJsCode = jsCode.trim();
      applyBtn.style.display = '';
      addLog('Агент подготовил изменения — нажмите «Применить»', 'info');
    } else {
      pendingJsCode = null;
      applyBtn.style.display = 'none';
    }
    if (hint) { showNextActionToast(hint); addLog('Следующий шаг: ' + hint, 'info'); speakIfImportant(hint, false); }
  }

  function showNextActionToast(message) {
    const existing = document.getElementById('aqbobek-toast');
    if (existing) existing.remove();
    const toast = document.createElement('div');
    toast.id = 'aqbobek-toast';
    toast.innerHTML =
      '<div id="aqbobek-toast-icon">' + ICONS.robot + '</div>' +
      '<div id="aqbobek-toast-body">' +
        '<div id="aqbobek-toast-label">Следующий шаг</div>' +
        '<div id="aqbobek-toast-msg">' + escapeHtml(message) + '</div>' +
      '</div>' +
      '<button id="aqbobek-toast-close">' + ICONS.close + '</button>';
    document.body.appendChild(toast);
    document.getElementById('aqbobek-toast-close').addEventListener('click', function() {
      toast.classList.add('aqbobek-toast-out');
      setTimeout(function() { toast.remove(); }, 300);
    });
    setTimeout(function() {
      if (toast.isConnected) {
        toast.classList.add('aqbobek-toast-out');
        setTimeout(function() { toast.remove(); }, 300);
      }
    }, 7000);
    requestAnimationFrame(function() { toast.classList.add('aqbobek-toast-in'); });
  }

  function executeAction(action) {
    const type = action.type, selector = action.selector, value = action.value;
    const el = selector ? document.querySelector(selector) : null;
    switch (type) {
      case 'fill':
        if (el) {
          el.focus(); el.value = value || '';
          el.dispatchEvent(new Event('input', { bubbles: true }));
          el.dispatchEvent(new Event('change', { bubbles: true }));
          addLog('Заполнено: "' + (el.getAttribute('placeholder') || selector) + '" → "' + (value || '').slice(0, 40) + '"', 'success');
        }
        break;
      case 'click':
        if (el) { el.click(); addLog('Нажата кнопка: "' + (el.textContent ? el.textContent.trim().slice(0,40) : selector) + '"', 'success'); }
        break;
      case 'navigate':
        if (value) { addLog('Переход: ' + value, 'info'); location.href = value; }
        break;
      case 'select':
        if (el && el.tagName === 'SELECT') { el.value = value; el.dispatchEvent(new Event('change', { bubbles: true })); addLog('Выбрано: "' + value + '"', 'success'); }
        break;
      default: addLog('Неизвестное действие: ' + type, 'warn');
    }
  }

  // ── AUTO SCAN
  setTimeout(scanDOM, 800);
  $('aq-user-input').value = '';
  addLog('Aqbobek AI Agent активирован на ' + location.hostname, 'success');
})();
