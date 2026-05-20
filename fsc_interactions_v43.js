(function(){
  // ── Guard: prevent double-execution ─────────────────────────────────────
  if (window.__fscV43Loaded) return;
  window.__fscV43Loaded = true;

  // ── Float bar visibility CSS (missing from native Webflow stylesheet) ────
  (function(){
    var id = 'fsc-float-bar-css';
    if (document.getElementById(id)) return;
    var s = document.createElement('style');
    s.id = id;
    s.textContent = [
      '.fsc_float_bar.is-visible {',
      '  transform: translateY(0) !important;',
      '  pointer-events: auto !important;',
      '  opacity: 1 !important;',
      '}'
    ].join('\n');
    document.head.appendChild(s);
  })();

  // ── Config ──────────────────────────────────────────────────────────────
  var CTA_HREF = 'https://calendly.com/d/ctyv-h7x-g98/15-minute-growth-opportunities-call';
  var SCROLL_OFFSET = 101;

  // ── Legal page overlay ───────────────────────────────────────────────────
  function renderLegalOverlay(path) {
    var existing = document.getElementById('fsc-legal-overlay');
    if (existing) existing.parentNode.removeChild(existing);

    var pages = {
      '/terms':   { title: 'Terms of Service',  lastUpdated: 'Last updated: May 2026' },
      '/privacy': { title: 'Privacy Policy',    lastUpdated: 'Last updated: May 2026' }
    };
    var page = pages[path];
    if (!page) return false;

    var termsContent = [
      {t:'p',x:'Welcome to fscollective.co, the website of FS Collective LLC (\u201cFS Collective,\u201d \u201cwe,\u201d \u201cus,\u201d or \u201cour\u201d). By accessing or using our website, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website.'},
      {t:'h2',x:'1. About FS Collective'},
      {t:'p',x:'FS Collective LLC is a creative growth studio providing ecommerce marketing services including, but not limited to, email and SMS retention marketing, paid media management, creative direction, and growth strategy for direct-to-consumer brands. We are based in the United States.'},
      {t:'h2',x:'2. Use of This Website'},
      {t:'p',x:'This website is provided for informational purposes and to facilitate communication between FS Collective and prospective or current clients. You agree to use this website only for lawful purposes and in a manner that does not infringe upon the rights of others or restrict their use of the website.'},
      {t:'p',x:'You may not:'},
      {t:'ul',x:['Use the website in any way that could damage, disable, or impair the site or interfere with any other party\u2019s use','Attempt to gain unauthorized access to any part of the website or its related systems','Use automated tools to scrape, crawl, or extract content from the website without our written permission','Reproduce, duplicate, copy, sell, or exploit any portion of the website for commercial purposes without our express consent']},
      {t:'h2',x:'3. Services and Engagements'},
      {t:'p',x:'Information about our services presented on this website is for general informational purposes only and does not constitute a binding offer. All service engagements, project scopes, deliverables, timelines, and pricing are subject to a separate written agreement between FS Collective and the client.'},
      {t:'p',x:'Nothing on this website guarantees specific results. Marketing outcomes depend on numerous factors including market conditions, brand positioning, product quality, and other variables outside of our control.'},
      {t:'h2',x:'4. Intellectual Property'},
      {t:'p',x:'All content on this website \u2014 including but not limited to text, graphics, logos, images, design elements, and code \u2014 is the property of FS Collective LLC and is protected by United States copyright and trademark laws.'},
      {t:'p',x:'The FS Collective name, logo, and related branding are trademarks of FS Collective LLC. You may not use our trademarks without our prior written permission.'},
      {t:'h2',x:'5. Third-Party Links and Services'},
      {t:'p',x:'Our website may contain links to third-party websites, platforms, or services (such as Calendly, Klaviyo, Shopify, Meta, and others). These links are provided for convenience only. FS Collective does not control and is not responsible for the content, privacy practices, or availability of third-party websites.'},
      {t:'h2',x:'6. Disclaimer of Warranties'},
      {t:'p',x:'This website is provided on an \u201cas is\u201d and \u201cas available\u201d basis without warranties of any kind, either express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, or non-infringement.'},
      {t:'h2',x:'7. Limitation of Liability'},
      {t:'p',x:'To the fullest extent permitted by applicable law, FS Collective LLC, its owners, employees, and affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or relating to your use of or inability to use this website.'},
      {t:'h2',x:'8. Indemnification'},
      {t:'p',x:'You agree to indemnify and hold harmless FS Collective LLC, its owners, employees, and affiliates from and against any claims, liabilities, damages, losses, or expenses arising out of your use of this website or your violation of these Terms of Service.'},
      {t:'h2',x:'9. Governing Law'},
      {t:'p',x:'These Terms of Service are governed by and construed in accordance with the laws of the State of Florida, United States, without regard to its conflict of law provisions.'},
      {t:'h2',x:'10. Changes to These Terms'},
      {t:'p',x:'We reserve the right to update or modify these Terms of Service at any time without prior notice. Changes will be effective when posted on this page with an updated \u201cLast updated\u201d date.'},
      {t:'h2',x:'11. Contact Information'},
      {t:'p',x:'If you have questions about these Terms of Service, please contact us:'},
      {t:'contact',name:'FS Collective LLC',email:'josh@fscollective.co',website:'fscollective.co'}
    ];

    var privacyContent = [
      {t:'p',x:'FS Collective LLC (\u201cFS Collective,\u201d \u201cwe,\u201d \u201cus,\u201d or \u201cour\u201d) respects your privacy and is committed to being transparent about how we collect, use, and protect your information.'},
      {t:'h2',x:'1. Information We Collect'},
      {t:'h3',x:'Information You Provide Directly'},
      {t:'p',x:'When you interact with us through our website, you may provide us with:'},
      {t:'ul',x:['Contact information such as your name, email address, phone number, and company name','Business information such as your brand name, website URL, and details about your marketing goals','Communication content such as the messages, questions, and feedback you send us']},
      {t:'h3',x:'Information Collected Automatically'},
      {t:'p',x:'When you visit our website, certain information may be collected automatically through cookies and similar technologies:'},
      {t:'ul',x:['Device and browser information such as your browser type, operating system, and screen resolution','Usage data such as pages visited, time spent on pages, referring URLs, and general navigation patterns','IP address and approximate geographic location derived from your IP address']},
      {t:'h3',x:'Information from Third-Party Tools'},
      {t:'p',x:'Our website uses third-party services that may collect data independently, including Webflow, Calendly, and Google Analytics. Each of these services has its own privacy policy.'},
      {t:'h2',x:'2. How We Use Your Information'},
      {t:'p',x:'We use the information we collect to:'},
      {t:'ul',x:['Respond to your inquiries and communicate with you about our services','Schedule and manage consultations and strategy calls','Provide, maintain, and improve our website and services','Understand how visitors use our website so we can improve the experience','Send you relevant information about our services if you have opted in','Comply with legal obligations and protect our rights']},
      {t:'p',x:'We do not sell your personal information to third parties.'},
      {t:'h2',x:'3. How We Share Your Information'},
      {t:'p',x:'We may share your information with trusted service providers who assist us in operating our website, or as required by law. In the event of a merger or acquisition, your information may be transferred as part of that transaction.'},
      {t:'h2',x:'4. Cookies and Tracking Technologies'},
      {t:'p',x:'Our website uses cookies and similar technologies to enhance your browsing experience and collect usage data. You can control cookies through your browser settings, though disabling them may affect site functionality.'},
      {t:'h2',x:'5. Your Rights and Choices'},
      {t:'p',x:'You may request access to, correction of, or deletion of your personal information by contacting us. You may also opt out of marketing communications at any time.'},
      {t:'h3',x:'California Residents'},
      {t:'p',x:'If you are a California resident, you may have additional rights under the CCPA, including the right to know what personal information we collect and how it is used. We do not sell personal information as defined by the CCPA.'},
      {t:'h3',x:'EU and UK Residents'},
      {t:'p',x:'If you are located in the EEA or UK, you may have additional rights under the GDPR, including the right to access, rectify, erase, restrict processing, data portability, and the right to object.'},
      {t:'h2',x:'6. Data Security'},
      {t:'p',x:'We implement reasonable security measures to protect your personal information. However, no method of transmission over the internet is completely secure.'},
      {t:'h2',x:'7. Data Retention'},
      {t:'p',x:'We retain your personal information only for as long as necessary to fulfill the purposes for which it was collected.'},
      {t:'h2',x:"8. Children's Privacy"},
      {t:'p',x:'Our website and services are not directed to individuals under the age of 16. We do not knowingly collect personal information from children.'},
      {t:'h2',x:'9. Changes to This Privacy Policy'},
      {t:'p',x:'We may update this Privacy Policy from time to time. We will post the revised policy on this page with an updated \u201cLast updated\u201d date.'},
      {t:'h2',x:'10. Contact Us'},
      {t:'p',x:'If you have questions or concerns about this Privacy Policy, please contact us:'},
      {t:'contact',name:'FS Collective LLC',email:'josh@fscollective.co',website:'fscollective.co'}
    ];

    var contentBlocks = path === '/terms' ? termsContent : privacyContent;

    var overlay = document.createElement('div');
    overlay.id = 'fsc-legal-overlay';
    overlay.style.cssText = 'position:fixed;inset:0;background:#f8fafc;z-index:99999;overflow-y:auto;font-family:\'DM Sans\',sans-serif;';

    function goHome(e) {
      e.preventDefault();
      window.history.pushState({}, '', '/');
      overlay.remove();
      Array.from(document.body.children).forEach(function(el){
        if (el.id !== 'fsc-legal-overlay') el.style.display = '';
      });
    }

    var html = '<nav style="position:sticky;top:0;background:#f8fafc;border-bottom:1px solid #e2e8f0;z-index:10;padding:0 5%;">'
      + '<div style="max-width:720px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;height:72px;">'
        + '<a href="/" id="fsc-legal-logo" style="display:flex;align-items:center;gap:10px;text-decoration:none;cursor:pointer;">'
          + '<div style="width:36px;height:36px;border:1.5px solid #4f46e5;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:#4f46e5;letter-spacing:0.02em;">FS</div>'
          + '<div style="display:flex;flex-direction:column;line-height:1.15;">'
            + '<span style="font-size:11px;font-weight:600;color:#0f172a;letter-spacing:0.1em;">COLLECTIVE</span>'
            + '<span style="font-size:9px;font-weight:300;color:#94a3b8;letter-spacing:0.08em;">LLC</span>'
          + '</div>'
        + '</a>'
        + '<a href="/" id="fsc-legal-back" style="font-size:14px;color:#64748b;text-decoration:none;cursor:pointer;">\u2190 Back to site</a>'
      + '</div>'
    + '</nav>';
    html += '<div style="max-width:720px;margin:0 auto;padding:64px 5% 120px;box-sizing:border-box;">';
    html += '<h1 style="font-family:Georgia,serif;font-size:clamp(2rem,5vw,3rem);font-weight:700;color:#0f172a;line-height:1.1;margin:0 0 12px;letter-spacing:-0.02em;">' + page.title + '</h1>';
    html += '<p style="font-size:13px;color:#94a3b8;margin:0 0 56px;font-style:italic;">' + page.lastUpdated + '</p>';
    contentBlocks.forEach(function(b) {
      if (b.t==='h2') html += '<h2 style="font-family:Georgia,serif;font-size:1.4rem;font-weight:700;color:#0f172a;margin:48px 0 16px;border-top:1px solid #e2e8f0;padding-top:40px;">'+b.x+'</h2>';
      else if (b.t==='h3') html += '<h3 style="font-family:Georgia,serif;font-size:1.1rem;font-weight:700;color:#0f172a;margin:32px 0 12px;">'+b.x+'</h3>';
      else if (b.t==='p') html += '<p style="font-size:16px;color:#334155;line-height:1.75;margin:0 0 16px;">'+b.x+'</p>';
      else if (b.t==='ul') {
        html += '<ul style="margin:0 0 16px;padding-left:24px;">';
        b.x.forEach(function(li){ html += '<li style="font-size:16px;color:#334155;line-height:1.75;margin-bottom:8px;">'+li+'</li>'; });
        html += '</ul>';
      } else if (b.t==='contact') {
        html += '<div style="background:#f1f5f9;border-radius:12px;padding:24px 28px;margin-top:16px;">'
          + '<p style="font-size:16px;color:#334155;margin:0 0 6px;font-weight:600;">'+b.name+'</p>'
          + '<p style="font-size:15px;color:#475569;margin:0 0 4px;">Email: <a href="mailto:'+b.email+'" style="color:#4f46e5;text-decoration:none;">'+b.email+'</a></p>'
          + '<p style="font-size:15px;color:#475569;margin:0;">Website: <a href="https://'+b.website+'" style="color:#4f46e5;text-decoration:none;">'+b.website+'</a></p>'
          + '</div>';
      }
    });
    html += '</div>';
    overlay.innerHTML = html;
    Array.from(document.body.children).forEach(function(el){ el.style.display = 'none'; });
    document.body.appendChild(overlay);
    window.scrollTo(0, 0);

    overlay.querySelector('#fsc-legal-logo').addEventListener('click', goHome);
    overlay.querySelector('#fsc-legal-back').addEventListener('click', goHome);
    return true;
  }

  // Handle /terms and /privacy routes
  var currentPath = window.location.pathname;
  if (currentPath === '/terms' || currentPath === '/privacy') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function(){ renderLegalOverlay(currentPath); });
    } else {
      renderLegalOverlay(currentPath);
    }
  }

  // Intercept clicks on legal links
  document.addEventListener('click', function(e) {
    var a = e.target.closest('a');
    if (!a) return;
    var href = a.getAttribute('href');
    if (href === '/terms' || href === '/privacy') {
      e.preventDefault();
      window.history.pushState({}, '', href);
      renderLegalOverlay(href);
    }
  });

  // ── Scroll margin for anchor sections ───────────────────────────────────
  ['hero','services','process','pricing','integrations','about','contact'].forEach(function(id){
    var el = document.getElementById(id);
    if (el) el.style.scrollMarginTop = SCROLL_OFFSET + 'px';
  });

  // ── Float bar ────────────────────────────────────────────────────────────
  function initFloatBar() {
  var fb = document.querySelector('.fsc_float_bar');
  var fbClosed = false;
  if (fb) {
    var lbl = fb.querySelector('.fsc_float_label, [class*="label"]');
    if (lbl) {
      lbl.textContent = 'GROWTH CALL';
      lbl.style.marginBottom = '0';
      lbl.style.paddingBottom = '0';
      lbl.style.lineHeight = '1.2';
    }
    var sub = fb.querySelector('.fsc_float_sub, p, [class*="sub"]');
    if (sub) {
      sub.style.cssText = 'display:block!important;color:rgba(255,255,255,0.92)!important;font-size:13px!important;font-weight:500!important;margin-top:0!important;margin-bottom:0!important;line-height:1.3!important;letter-spacing:-0.01em!important;padding:0!important;';
      sub.textContent = 'A quick conversation about growth.';
    }
    var ctaBtn = fb.querySelector('.fsc_float_cta, a[href*="calendly"], button[class*="cta"]');
    if (!ctaBtn) {
      var fbBtnsAll = fb.querySelectorAll('a, button');
      for (var bi=0; bi<fbBtnsAll.length; bi++) {
        var t = fbBtnsAll[bi].textContent.trim().toLowerCase();
        if (t.indexOf('book')!==-1 || t.indexOf('call')!==-1) { ctaBtn = fbBtnsAll[bi]; break; }
      }
    }
    if (ctaBtn) {
      var ctaClone = ctaBtn.cloneNode(true);
      ctaBtn.parentNode.replaceChild(ctaClone, ctaBtn);
      ctaBtn = ctaClone;
      ctaBtn.removeAttribute('href');
      ctaBtn.style.cssText += 'cursor:pointer!important;pointer-events:auto!important;';
      ctaBtn.addEventListener('click', function(e){
        e.preventDefault();
        e.stopImmediatePropagation();
        window.open(CTA_HREF, '_blank', 'noopener,noreferrer');
      });
    }
    var closeBtn = fb.querySelector('.fsc_float_close, [class*="close"]');
    if (!closeBtn) {
      var allFbBtns = fb.querySelectorAll('button');
      if (allFbBtns.length) closeBtn = allFbBtns[allFbBtns.length-1];
    }
    if (closeBtn) {
      var closeClone = closeBtn.cloneNode(true);
      closeBtn.parentNode.replaceChild(closeClone, closeBtn);
      closeBtn = closeClone;
      closeBtn.style.cssText = 'width:28px!important;height:28px!important;border-radius:50%!important;display:flex!important;align-items:center!important;justify-content:center!important;background:rgba(255,255,255,.12)!important;border:none!important;cursor:pointer!important;flex-shrink:0!important;box-shadow:none!important;color:#fff!important;font-size:14px!important;pointer-events:auto!important;position:relative!important;z-index:10!important;';
      closeBtn.addEventListener('click', function(e){
        e.preventDefault();
        e.stopImmediatePropagation();
        fbClosed = true;
        fb.style.setProperty('display', 'none', 'important');
        fb.style.setProperty('opacity', '0', 'important');
        fb.classList.remove('is-visible');
      });
    }
    var heroBtns = document.querySelector('.hero_btns');
    var ctaSection = document.querySelector('#contact');
    function updateFloatBar() {
      if (fbClosed) return;
      var heroBottom = heroBtns ? heroBtns.getBoundingClientRect().bottom : 0;
      var ctaTop = ctaSection ? ctaSection.getBoundingClientRect().top : 9999;
      var shouldShow = heroBottom < 0 && ctaTop > window.innerHeight;
      fb.classList.toggle('is-visible', shouldShow);
      if (shouldShow) fb.style.display = '';
    }
        window.addEventListener('scroll', updateFloatBar, {passive:true});
    updateFloatBar();
  }
  } // end initFloatBar
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFloatBar);
  } else {
    initFloatBar();
  }
  // ── Load DM Sans font ────────────────────────────────────────────────────
  if (!document.getElementById('fsc-dm-sans')) {
    var fontLink = document.createElement('link');
    fontLink.id = 'fsc-dm-sans';
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,300&display=swap';
    document.head.appendChild(fontLink);
  }

  // ── Mobile drawer ────────────────────────────────────────────────────────
  var NAV_ICONS = {
    'services':     '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#818cf8" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>',
    'process':      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#818cf8" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',
    'pricing':      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#818cf8" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>',
    'integrations': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#818cf8" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07M8.46 8.46a5 5 0 0 0 0 7.07"/></svg>',
    'about':        '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#818cf8" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
    'blog':         '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#818cf8" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>'
  };
  var NAV_SUB = {
    'services':     'Email & SMS, Paid Media, Ecommerce Strategy, CRO',
    'process':      'Our proven 4-step growth system',
    'pricing':      'Flexible, \u00e0 la carte \u2014 built around your brand',
    'integrations': 'The platforms and tools we build on',
    'about':        'Our philosophy, team, and approach',
    'blog':         'Expert articles on ecommerce growth'
  };
  var drawerNavItems = [
    {text:'Services',    href:'#services'},
    {text:'Process',     href:'#process'},
    {text:'Pricing',     href:'#pricing'},
    {text:'Integrations',href:'#integrations'},
    {text:'About',       href:'#about'},
    {text:'Blog',        href:'/blog', isPage:true}
  ];
  var itemsHTML = drawerNavItems.map(function(item){
    var key = item.text.toLowerCase().replace(/\s+/g,'');
    var icon = NAV_ICONS[key] || '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#818cf8" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>';
    var sub = NAV_SUB[key] || '';
    var linkHref = item.isPage ? item.href : 'javascript:void(0)';
    return '<a href="'+linkHref+'" data-target="'+item.href+'" style="display:flex;align-items:center;gap:16px;padding:22px 28px;text-decoration:none;border-bottom:1px solid rgba(255,255,255,0.06);transition:background 0.2s;cursor:pointer;" onmouseenter="this.style.background=\'rgba(255,255,255,0.04)\'" onmouseleave="this.style.background=\'transparent\'">'
      + '<span style="width:40px;height:40px;border-radius:50%;background:rgba(99,102,241,0.15);border:1px solid rgba(99,102,241,0.3);display:flex;align-items:center;justify-content:center;flex-shrink:0;">'+icon+'</span>'
      + '<span style="flex:1;min-width:0;">'
        + '<span style="display:block;font-family:\'DM Sans\',sans-serif;font-size:18px;font-weight:500;color:#f1f5f9;letter-spacing:-0.02em;line-height:1.2;">'+item.text+'</span>'
        + (sub ? '<span style="display:block;font-family:\'DM Sans\',sans-serif;font-size:12px;font-weight:300;color:#64748b;margin-top:3px;line-height:1.4;letter-spacing:0.01em;">'+sub+'</span>' : '')
      + '</span>'
      + '<span style="color:#334155;font-size:18px;font-weight:300;">\u203a</span>'
    + '</a>';
  }).join('');

  // Backdrop
  var bd = document.createElement('div');
  bd.id = 'fsc-bd';
  bd.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.65);z-index:9998;opacity:0;transition:opacity 0.3s;pointer-events:none;backdrop-filter:blur(3px);';
  document.body.appendChild(bd);

  // Drawer
  var dr = document.createElement('div');
  dr.id = 'fsc-drawer';
  dr.style.cssText = 'position:fixed;top:0;right:0;bottom:0;width:300px;max-width:85vw;background:#0a1628;z-index:9999;transform:translateX(100%);transition:transform 0.35s cubic-bezier(0.23,1,0.32,1),visibility 0s linear 0.35s;display:flex;flex-direction:column;overflow:hidden;box-shadow:-12px 0 48px rgba(0,0,0,0.6);font-family:\'DM Sans\',sans-serif;visibility:hidden;';
  var logoHTML = '<div style="display:flex;align-items:center;gap:10px;">'
    + '<div style="width:36px;height:36px;border:1.5px solid rgba(99,102,241,0.7);display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:#818cf8;letter-spacing:0.02em;flex-shrink:0;font-family:\'DM Sans\',sans-serif;">FS</div>'
    + '<div style="display:flex;flex-direction:column;line-height:1.15;">'
      + '<span style="font-family:\'DM Sans\',sans-serif;font-size:12px;font-weight:600;color:#e2e8f0;letter-spacing:0.1em;">COLLECTIVE</span>'
      + '<span style="font-family:\'DM Sans\',sans-serif;font-size:10px;font-weight:300;color:#475569;letter-spacing:0.08em;">LLC</span>'
    + '</div>'
  + '</div>';
  dr.innerHTML = '<div style="display:flex;align-items:center;justify-content:space-between;padding:22px 24px;border-bottom:1px solid rgba(255,255,255,0.07);">'
    + logoHTML
    + '<button id="fsc-dr-close" aria-label="Close menu" style="width:32px;height:32px;border-radius:50%;background:rgba(255,255,255,0.07);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;color:#94a3b8;font-size:20px;line-height:1;transition:background 0.15s;font-family:sans-serif;" onmouseenter="this.style.background=\'rgba(255,255,255,0.14)\'" onmouseleave="this.style.background=\'rgba(255,255,255,0.07)\'">&#215;</button>'
  + '</div>'
  + '<div style="flex:1;overflow-y:auto;">'+itemsHTML+'</div>'
  + '<div style="padding:20px 24px;border-top:1px solid rgba(255,255,255,0.07);">'
    + '<a href="'+CTA_HREF+'" target="_blank" rel="noopener noreferrer" style="display:flex;align-items:center;gap:10px;background:#4f46e5;border-radius:8px;padding:11px 16px;text-decoration:none;transition:background 0.2s;" onmouseenter="this.style.background=\'#4338ca\'" onmouseleave="this.style.background=\'#4f46e5\'">'
      + '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>'
      + '<span style="font-family:\'DM Sans\',sans-serif;font-size:14px;font-weight:600;color:#fff;letter-spacing:-0.01em;flex:1;">Work With Us</span>'
      + '<span style="color:rgba(255,255,255,0.5);font-size:16px;">\u203a</span>'
    + '</a>'
  + '</div>';
  document.body.appendChild(dr);

  // ── Open/close helpers ───────────────────────────────────────────────────
  function openDrawer() {
    dr.style.visibility = 'visible';
    dr.style.transition = 'transform 0.35s cubic-bezier(0.23,1,0.32,1),visibility 0s linear 0s';
    dr.style.transform = 'translateX(0)';
    bd.style.opacity = '1';
    bd.style.pointerEvents = 'auto';
    document.body.style.overflow = 'hidden';
  }
  function closeDrawer() {
    dr.style.transition = 'transform 0.35s cubic-bezier(0.23,1,0.32,1),visibility 0s linear 0.35s';
    dr.style.transform = 'translateX(100%)';
    dr.style.visibility = 'hidden';
    bd.style.opacity = '0';
    bd.style.pointerEvents = 'none';
    document.body.style.overflow = '';
  }

  // ── Smooth scroll helper ─────────────────────────────────────────────────
  function getAbsoluteTop(el) {
    var top = 0;
    while (el) { top += el.offsetTop; el = el.offsetParent; }
    return top;
  }
  function scrollToSection(hash) {
    var id = hash.replace(/^#/, '');
    var target = document.getElementById(id);
    if (!target) return;
    var eyebrow = target.querySelector('.text_eyebrow, [class*="eyebrow"]');
    var scrollEl = eyebrow || target;
    var absoluteTop = getAbsoluteTop(scrollEl);
    closeDrawer();
    setTimeout(function(){
      window.scrollTo({ top: Math.max(0, absoluteTop - SCROLL_OFFSET), behavior: 'smooth' });
    }, 400);
  }

  var drCloseBtn = dr.querySelector('#fsc-dr-close');
  if (drCloseBtn) {
    drCloseBtn.addEventListener('click', function(e){
      e.preventDefault();
      e.stopPropagation();
      closeDrawer();
    });
  }
  bd.addEventListener('click', closeDrawer);

  dr.querySelectorAll('a[data-target]').forEach(function(a){
    a.addEventListener('click', function(e){
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      var tgt = a.getAttribute('data-target') || '';
      if (tgt.charAt(0) === '#') {
        scrollToSection(tgt);
      } else if (tgt) {
        closeDrawer();
        setTimeout(function(){ window.location.href = tgt; }, 400);
      }
    }, true);
  });

  // Attach to hamburger button
  function attachHamburger() {
    var ham = document.getElementById('fsc-ham-btn') || document.querySelector('.fsc_ham_btn');
    if (!ham) return;
    // Suppress Webflow's native nav
    var wfNavOverlay = document.querySelector('.w-nav-overlay, .fsc_mobile_nav, #fsc-mobile-nav');
    if (wfNavOverlay) wfNavOverlay.style.cssText = 'display:none!important;visibility:hidden!important;';
    ['click','touchstart'].forEach(function(ev){
      ham.addEventListener(ev, function(e){
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        openDrawer();
      }, {capture:true, passive:false});
    });
  }

  function onReady() {
    attachHamburger();
    // Suppress Webflow's nav overlay
    var wfOverlay = document.querySelector('.w-nav-overlay');
    if (wfOverlay) wfOverlay.style.cssText = 'display:none!important;visibility:hidden!important;';
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', onReady);
  } else {
    onReady();
  }

  // ── Expert Articles section ──────────────────────────────────────────────
  var COLL_ID = '6a0b54f9aa1e8e24939ebbc4';
  var CAT_NAMES = {
    '92fcf17fa450956ab96c3fb091b04b30':'Email & SMS',
    '7456e4f1baddbf1eed12efbca99df928':'Paid Media',
    'c62ccf6db393dc2c879cb157d65ac515':'Ecommerce Strategy',
    '245a2a0f9953e6fccbc47aea8bcf8f9e':'CRO',
    'a513189a328f005debec1c8544b9a6c7':'Creative',
    '72d8f62422ebdaa0c667bb53ece6c450':'Growth Insights',
    '152918da07a778cb12ea5e511b44dae8':'Case Study'
  };
  var CAT_COLORS = {
    'Email & SMS':        'rgba(99,102,241,0.12)|rgba(99,102,241,0.3)|#818cf8',
    'Paid Media':         'rgba(16,185,129,0.1)|rgba(16,185,129,0.25)|#34d399',
    'Ecommerce Strategy': 'rgba(245,158,11,0.1)|rgba(245,158,11,0.25)|#fbbf24',
    'CRO':                'rgba(239,68,68,0.1)|rgba(239,68,68,0.25)|#f87171',
    'Creative':           'rgba(168,85,247,0.1)|rgba(168,85,247,0.25)|#c084fc',
    'Growth Insights':    'rgba(14,165,233,0.1)|rgba(14,165,233,0.25)|#38bdf8',
    'Case Study':         'rgba(234,179,8,0.1)|rgba(234,179,8,0.25)|#facc15'
  };
  function catBadge(catId) {
    var cat = CAT_NAMES[catId];
    if (!cat) return '';
    var c = (CAT_COLORS[cat]||'rgba(255,255,255,0.07)|rgba(255,255,255,0.15)|#94a3b8').split('|');
    return '<span style="display:inline-block;font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;padding:3px 9px;border-radius:20px;background:'+c[0]+';border:1px solid '+c[1]+';color:'+c[2]+';">'+cat+'</span>';
  }
  function fmtDate(iso) {
    if (!iso) return '';
    try { return new Date(iso).toLocaleDateString('en-US',{year:'numeric',month:'short',day:'numeric'}); } catch(e){ return ''; }
  }
  function esc(s){ return s?String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'):''; }
  function buildCard(fd) {
    var imgBg = fd['featured-image']&&fd['featured-image'].url
      ? 'background-image:url('+fd['featured-image'].url+');background-size:cover;background-position:center;'
      : 'background:linear-gradient(135deg,rgba(99,102,241,0.08) 0%,rgba(10,22,40,0) 100%);';
    return '<a href="/blog/'+esc(fd.slug||'')+'" style="display:flex;flex-direction:column;text-decoration:none;background:#0d1b2e;border:1px solid rgba(255,255,255,0.07);border-radius:14px;overflow:hidden;transition:border-color 0.2s,transform 0.2s;" onmouseenter="this.style.borderColor=\'rgba(99,102,241,0.4)\';this.style.transform=\'translateY(-3px)\'" onmouseleave="this.style.borderColor=\'rgba(255,255,255,0.07)\';this.style.transform=\'translateY(0)\'" >'
      + '<div style="height:160px;'+imgBg+'flex-shrink:0;"></div>'
      + '<div style="padding:22px;flex:1;display:flex;flex-direction:column;">'
        + '<div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;">'
          + catBadge(fd.category)
          + (fd['read-time']?'<span style="font-family:\'DM Sans\',sans-serif;font-size:11px;color:#475569;margin-left:auto;">'+esc(fd['read-time'])+'</span>':'')
        + '</div>'
        + '<h3 style="font-family:\'Playfair Display\',serif;font-size:1.05rem;font-weight:700;color:#f1f5f9;line-height:1.35;margin:0 0 8px;letter-spacing:-0.01em;">'+esc(fd.name||'Untitled')+'</h3>'
        + (fd.excerpt?'<p style="font-family:\'DM Sans\',sans-serif;font-size:13px;color:#64748b;line-height:1.6;margin:0 0 14px;flex:1;">'+esc(fd.excerpt)+'</p>':'<div style="flex:1;"></div>')
        + '<div style="display:flex;align-items:center;justify-content:space-between;margin-top:auto;padding-top:14px;border-top:1px solid rgba(255,255,255,0.06);">'
          + '<span style="font-family:\'DM Sans\',sans-serif;font-size:11px;color:#475569;">'+fmtDate(fd['published-date'])+'</span>'
          + '<span style="font-family:\'DM Sans\',sans-serif;font-size:13px;color:#818cf8;font-weight:500;">Read \u2192</span>'
        + '</div>'
      + '</div>'
    + '</a>';
  }
  function injectExpertArticles() {
    var grid = document.getElementById('fsc-articles-grid');
    if (!grid) return;
    grid.innerHTML = '<p style="grid-column:1/-1;text-align:center;padding:48px 0;color:rgba(255,255,255,0.35);font-family:\'DM Sans\',sans-serif;font-size:15px;">Loading articles\u2026</p>';
    fetch('https://api.webflow.com/v2/collections/' + COLL_ID + '/items?live=true&limit=6', {
      headers: { accept: 'application/json' }
    })
    .then(function(r) { return r.json(); })
    .then(function(data) {
      var items = (data.items || []).filter(function(i) { return !i.isDraft && !i.isArchived; });
      items.sort(function(a, b) {
        var ad = a.fieldData && a.fieldData['published-date'] ? new Date(a.fieldData['published-date']) : new Date(0);
        var bd2 = b.fieldData && b.fieldData['published-date'] ? new Date(b.fieldData['published-date']) : new Date(0);
        return bd2 - ad;
      });
      var g = document.getElementById('fsc-articles-grid');
      if (!g) return;
      if (items.length === 0) {
        g.innerHTML = '<p style="grid-column:1/-1;text-align:center;padding:48px 0;color:rgba(255,255,255,0.35);font-family:\'DM Sans\',sans-serif;font-size:15px;">Articles coming soon.</p>';
        return;
      }
      g.innerHTML = items.slice(0, 3).map(function(i) { return buildCard(i.fieldData || {}); }).join('');
    })
    .catch(function() {
      var g = document.getElementById('fsc-articles-grid');
      if (g) g.innerHTML = '<p style="grid-column:1/-1;text-align:center;padding:48px 0;color:rgba(255,255,255,0.35);font-family:\'DM Sans\',sans-serif;font-size:15px;">Articles coming soon.</p>';
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectExpertArticles);
  } else {
    injectExpertArticles();
  }

  // Grid layout is now handled natively in Webflow styles - no JS override needed

})();
