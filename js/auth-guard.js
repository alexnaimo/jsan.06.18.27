// ══════════════════════════════════════════════
// AUTH GUARD — included on every protected page
// Set window.PAGE_TAB before this script loads:
//   <script>window.PAGE_TAB = 'planner';</script>
// Valid tab keys: home | planner | photographer |
//                venue | registry | wedding-party
// ══════════════════════════════════════════════

(function () {

  // ── Overlay shown while auth check runs ──────
  function showOverlay(html) {
    let o = document.getElementById('auth-overlay');
    if (!o) {
      o = document.createElement('div');
      o.id = 'auth-overlay';
      o.style.cssText = [
        'position:fixed;inset:0;z-index:99999',
        'background:#fffdf9',
        'display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px',
        'font-family:Lato,sans-serif',
        'transition:opacity .3s'
      ].join(';');
      document.body.appendChild(o);
    }
    o.innerHTML = html;
    return o;
  }

  function removeOverlay() {
    const o = document.getElementById('auth-overlay');
    if (o) { o.style.opacity = '0'; setTimeout(() => o.remove(), 300); }
  }

  function spinnerHtml() {
    return `
      <div style="font-family:'Cormorant Garamond',Georgia,serif;font-size:28px;color:#2d1f1a;letter-spacing:.5px;">Alex &amp; Jenna</div>
      <div style="font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#b8924f;">June 18, 2027</div>
      <div style="margin-top:8px;width:32px;height:32px;border:2px solid #e8ddd5;border-top-color:#b8924f;border-radius:50%;animation:spin .8s linear infinite;"></div>
      <style>@keyframes spin{to{transform:rotate(360deg)}}</style>
    `;
  }

  function messageHtml(icon, title, body, actionHtml) {
    return `
      <div style="font-size:40px;">${icon}</div>
      <div style="font-family:'Cormorant Garamond',Georgia,serif;font-size:30px;color:#2d1f1a;">${title}</div>
      <div style="font-size:14px;color:#9a8880;max-width:380px;text-align:center;line-height:1.7;">${body}</div>
      ${actionHtml}
    `;
  }

  function btnStyle(bg) {
    return `style="margin-top:4px;padding:10px 26px;background:${bg};color:white;border:none;border-radius:6px;font-size:12px;letter-spacing:1px;text-transform:uppercase;cursor:pointer;font-family:Lato,sans-serif;"`;
  }

  function signOutBtn() {
    return `<button ${btnStyle('#b8924f')} onclick="auth.signOut().then(()=>window.location.href='login.html')">Sign Out</button>`;
  }

  // ── Nav helpers ───────────────────────────────
  const TAB_HREFS = {
    planner:       'sunken-meadow.html',
    photographer:  'britt-call-notes.html',
    venue:         'venue.html',
    registry:      'registry.html',
    'wedding-party': 'wedding-party.html',
    todos:         'todos.html',
    budget:        'budget.html',
    rehearsal:     'rehearsal.html',
    bach:          'bach.html'
  };

  function addSignOutToNav() {
    const nav = document.querySelector('.site-nav .nav-links');
    if (!nav || nav.querySelector('.auth-signout')) return;
    const btn = document.createElement('button');
    btn.className = 'auth-signout';
    btn.textContent = 'Sign Out';
    btn.style.cssText = 'background:none;border:1px solid #e8ddd5;border-radius:4px;padding:6px 12px;font-size:11px;letter-spacing:1px;text-transform:uppercase;color:#9a8880;cursor:pointer;font-family:Lato,sans-serif;margin-left:4px;';
    btn.onclick = () => auth.signOut().then(() => { window.location.href = 'login.html'; });
    nav.appendChild(btn);
  }

  function addAdminLinkToNav() {
    const nav = document.querySelector('.site-nav .nav-links');
    if (!nav || nav.querySelector('.auth-admin-link')) return;
    const a = document.createElement('a');
    a.href = 'admin.html';
    a.className = 'auth-admin-link';
    a.textContent = '⚙️ Admin';
    a.style.cssText = 'color:#b8924f!important;font-weight:700!important;';
    nav.appendChild(a);
  }

  function hideUnauthorizedTabs(allowedTabs) {
    const nav = document.querySelector('.site-nav .nav-links');
    if (!nav) return;
    nav.querySelectorAll('a').forEach(link => {
      const href = (link.getAttribute('href') || '').replace(/^\.\//, '');
      const key = Object.keys(TAB_HREFS).find(k => TAB_HREFS[k] === href);
      if (key && !allowedTabs.includes(key)) {
        link.style.display = 'none';
      }
    });
  }

  // ── Main auth check ───────────────────────────
  // Wait for DOM to be ready before attaching overlay
  function init() {
    showOverlay(spinnerHtml());
    auth.onAuthStateChanged(runCheck);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  async function runCheck(user) {
    if (!user) {
      window.location.href = 'login.html';
      return;
    }

    // Admin gets full access — no Firestore check needed
    if (user.email === ADMIN_EMAIL) {
      removeOverlay();
      addAdminLinkToNav();
      addSignOutToNav();
      return;
    }

    // Regular user — check Firestore status + permissions
    try {
      const snap = await db.collection('users').doc(user.uid).get();

      if (!snap.exists) {
        showOverlay(messageHtml('⏳', 'Access Pending',
          'Your request has been received. Alex or Jenna will grant you access soon.',
          signOutBtn()));
        return;
      }

      const data = snap.data();

      if (data.status === 'pending') {
        showOverlay(messageHtml('⏳', 'Access Pending',
          'Your request is still being reviewed. Check back soon!',
          signOutBtn()));
        return;
      }

      if (data.status === 'denied') {
        showOverlay(messageHtml('🚫', 'Access Denied',
          'Your access request was not approved. Contact Alex or Jenna if you think this is a mistake.',
          signOutBtn()));
        return;
      }

      // Approved — check tab-level permission
      const allowedTabs = data.tabs || [];
      const currentTab  = window.PAGE_TAB || '';

      if (currentTab && currentTab !== 'home' && !allowedTabs.includes(currentTab)) {
        showOverlay(messageHtml('🔒', 'No Access Here',
          "You don't have permission to view this section. Ask Alex or Jenna to add it to your account.",
          `<a href="index.html" ${btnStyle('#b8924f').replace('style=', '')} style="margin-top:4px;padding:10px 26px;background:#b8924f;color:white;text-decoration:none;border-radius:6px;font-size:12px;letter-spacing:1px;text-transform:uppercase;font-family:Lato,sans-serif;">Go Home</a>`));
        return;
      }

      // All clear
      removeOverlay();
      hideUnauthorizedTabs(allowedTabs);
      addSignOutToNav();

    } catch (err) {
      console.error('Auth guard error:', err);
      showOverlay(messageHtml('⚠️', 'Something Went Wrong',
        'Could not verify your access. Please refresh and try again.',
        `<button ${btnStyle('#b8924f')} onclick="location.reload()">Retry</button>`));
    }
  }

})();
