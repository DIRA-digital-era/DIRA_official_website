// Review and clean the newsletter list.
//
//   node scripts/clean-subscribers.js report.csv          dry run: writes the review file, changes nothing
//   node scripts/clean-subscribers.js report.csv --apply  marks the flagged subscribers "excluded"
//
// Flagged subscribers are never deleted. "excluded" means they stop receiving emails;
// setting status back to "active" restores one.
require('dotenv').config();
const fs = require('fs');
const mongoose = require('mongoose');
const { Subscriber } = require('../models/Subscriber');
const { suspicionReason, inboxKey, gmailDotCount } = require('../lib/email-quality');

// A real browser never sends a user agent that starts with a quote mark; the bot that
// filled the list in November does.
function suspiciousClient(userAgent) {
  const ua = String(userAgent || '').trim();
  if (ua.startsWith('"')) return 'scripted sign-up (malformed browser signature)';
  return '';
}

const [reportPath, flag] = process.argv.slice(2);
const apply = flag === '--apply';
if (!reportPath) {
  console.error('Usage: node scripts/clean-subscribers.js <report.csv> [--apply]');
  process.exit(1);
}

(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  const subscribers = await Subscriber.find({ status: 'active' }).sort({ _id: 1 }).lean();

  const flagged = new Map();
  for (const s of subscribers) {
    const reason = suspicionReason(s.email) || suspiciousClient(s.userAgent);
    if (reason) flagged.set(String(s._id), reason);
  }

  // Same Gmail inbox signed up more than once with dots moved around: keep the one with
  // the fewest dots (the earliest when tied), flag the rest.
  const byInbox = new Map();
  for (const s of subscribers) {
    const key = inboxKey(s.email);
    if (!byInbox.has(key)) byInbox.set(key, []);
    byInbox.get(key).push(s);
  }
  for (const group of byInbox.values()) {
    if (group.length < 2) continue;
    const keep = [...group].sort((a, b) => gmailDotCount(a.email) - gmailDotCount(b.email))[0];
    for (const s of group) {
      if (s !== keep && !flagged.has(String(s._id))) flagged.set(String(s._id), `same inbox as ${keep.email}`);
    }
  }

  const rows = [['email', 'signed_up', 'source', 'reason']];
  for (const s of subscribers) {
    const reason = flagged.get(String(s._id));
    if (reason) rows.push([s.email, new Date(s.createdAt || s.subscribedAt).toISOString().slice(0, 10), s.source || '', reason]);
  }
  const csv = rows.map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n');
  fs.writeFileSync(reportPath, csv + '\n');

  console.log(`Active subscribers: ${subscribers.length}`);
  console.log(`Flagged: ${flagged.size}  (kept: ${subscribers.length - flagged.size})`);
  console.log(`Review file: ${reportPath}`);

  if (apply) {
    const ids = [...flagged.keys()];
    const now = new Date();
    const ops = ids.map(id => ({
      updateOne: { filter: { _id: id, status: 'active' }, update: { $set: { status: 'excluded', excludedReason: flagged.get(id), excludedAt: now } } }
    }));
    const result = ops.length ? await Subscriber.bulkWrite(ops) : { modifiedCount: 0 };
    console.log(`Marked excluded: ${result.modifiedCount}`);
  } else {
    console.log('Dry run: nothing changed. Re-run with --apply to exclude the flagged subscribers.');
  }
  await mongoose.disconnect();
})().catch(error => { console.error(error.message); process.exit(1); });
