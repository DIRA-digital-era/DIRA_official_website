(function () {
  'use strict';

  const API_BASE = window.DIRA_API_BASE || (window.location.protocol === 'file:' ? 'http://localhost:3000/api' : '/api');

  function escapeHtml(value) {
    const element = document.createElement('div');
    element.textContent = value == null ? '' : String(value);
    return element.innerHTML;
  }

  function formatSize(bytes) {
    if (!bytes) return 'PDF';
    return `PDF (${(bytes / (1024 * 1024)).toFixed(1)} MB)`;
  }

  function reportCard(report, includeDelete) {
    return `<article class="report-card uploaded-report-card">
      <div class="report-header-badge"><span class="report-type">${escapeHtml(report.type)}</span><span class="report-year">${escapeHtml(report.year)}</span></div>
      <div class="report-icon-box" aria-hidden="true">&#128196;</div>
      <h3 class="report-title">${escapeHtml(report.title)}</h3>
      <p class="report-summary">${escapeHtml(report.summary)}</p>
      <div class="report-metadata"><span>${formatSize(report.documentSize)}</span><span>&bull;</span><span>${escapeHtml(report.documentName)}</span></div>
      <div class="report-actions"><a href="${escapeHtml(report.documentUrl)}" download="${escapeHtml(report.documentName)}" class="report-btn report-btn-primary">Download PDF</a><a href="${escapeHtml(report.documentUrl)}" target="_blank" rel="noopener" class="report-btn report-btn-outline">Preview</a>${includeDelete ? `<button type="button" class="report-btn report-btn-outline report-delete-btn" data-id="${escapeHtml(report.id)}">Delete</button>` : ''}</div>
    </article>`;
  }

  async function request(path, options) {
    const response = await fetch(`${API_BASE}${path}`, options);
    const body = response.status === 204 ? null : await response.json();
    if (!response.ok) throw new Error(body && body.error ? body.error : 'Report request failed.');
    return body;
  }

  async function getAll() { return request('/reports'); }
  async function createReport(data) { return request('/reports', { method: 'POST', body: data }); }
  async function deleteReport(id) { return request(`/reports/${encodeURIComponent(id)}`, { method: 'DELETE' }); }

  window.DiraReports = { api: { getAll, createReport, deleteReport } };

  async function renderReports() {
    const grid = document.getElementById('uploadedReportsGrid');
    const recentGrid = document.getElementById('recentReportsGrid');
    if (!grid && !recentGrid) return;
    try {
      const reports = await getAll();
      const emptyMessage = '<p class="reports-empty">No uploaded reports yet.</p>';
      if (grid) grid.innerHTML = reports.length ? reports.map(report => reportCard(report, false)).join('') : emptyMessage;
      if (recentGrid) recentGrid.innerHTML = reports.length ? reports.slice(0, 3).map(report => reportCard(report, false)).join('') : emptyMessage;
    } catch (error) {
      if (grid) grid.innerHTML = `<p class="reports-empty">${escapeHtml(error.message)}</p>`;
      if (recentGrid) recentGrid.innerHTML = `<p class="reports-empty">${escapeHtml(error.message)}</p>`;
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', renderReports); else renderReports();
})();
