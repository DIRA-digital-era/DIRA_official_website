// Email checks shared by the sign-up endpoint, the newsletter sender and the list clean-up script.

// Practical address check: one @, a sensible local part (no leading, trailing or repeated
// dots), and a domain with a real top-level domain. Resend rejects a whole batch if any
// address fails its own check, so anything doubtful is filtered out before sending.
const LOCAL = /^[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*$/;
const DOMAIN = /^(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+[A-Za-z]{2,}$/;

function isValidEmail(email) {
  const value = String(email || '');
  if (value.length > 254) return false;
  const at = value.lastIndexOf('@');
  if (at < 1 || at !== value.indexOf('@')) return false;
  const local = value.slice(0, at);
  const domain = value.slice(at + 1);
  return local.length <= 64 && LOCAL.test(local) && DOMAIN.test(domain);
}

function isGmail(domain) {
  return /^(gmail|googlemail)\.com$/i.test(domain || '');
}

// Gmail ignores dots and anything after "+", so a.b.c@gmail.com and abc+x@gmail.com are
// the same inbox. Used to spot one inbox signed up several times.
function inboxKey(email) {
  const value = String(email || '').trim().toLowerCase();
  const [local, domain] = value.split('@');
  if (!domain) return value;
  if (isGmail(domain)) return `${local.split('+')[0].replace(/\./g, '')}@gmail.com`;
  return value;
}

function gmailDotCount(email) {
  const [local, domain] = String(email || '').toLowerCase().split('@');
  if (!isGmail(domain)) return 0;
  return (local.split('+')[0].match(/\./g) || []).length;
}

// Bots sign real people's Gmail inboxes up to forms using many dots (Gmail still delivers).
// Real Gmail addresses rarely have more than two dots.
const MAX_GMAIL_DOTS = 2;

// Returns a short reason when an address looks like a bot sign-up, otherwise ''.
function suspicionReason(email) {
  if (!isValidEmail(email)) return 'invalid address';
  if (gmailDotCount(email) > MAX_GMAIL_DOTS) return 'gmail address with many dots (bot pattern)';
  return '';
}

module.exports = { isValidEmail, inboxKey, gmailDotCount, suspicionReason, MAX_GMAIL_DOTS };
