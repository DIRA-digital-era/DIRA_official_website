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
      <div class="report-icon-box" aria-hidden="true">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          <polyline points="14 2 14 8 20 8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          <line x1="8" y1="13" x2="16" y2="13" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
          <line x1="8" y1="17" x2="13" y2="17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
        </svg>
      </div>
      <h3 class="report-title">${escapeHtml(report.title)}</h3>
      <p class="report-summary">${escapeHtml(report.summary)}</p>
      <div class="report-metadata"><span>${formatSize(report.documentSize)}</span><span>&bull;</span><span>${escapeHtml(report.documentName)}</span></div>
      <div class="report-actions">
        <a href="${escapeHtml(report.documentUrl)}" download="${escapeHtml(report.documentName)}" class="report-btn report-btn-primary">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="vertical-align:middle;margin-right:4px;">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Download PDF
        </a>
        <a href="${escapeHtml(report.documentUrl)}" target="_blank" rel="noopener" class="report-btn report-btn-outline">Preview</a>
        ${includeDelete ? `<button type="button" class="report-btn report-btn-outline report-delete-btn" data-id="${escapeHtml(report.id)}">Delete</button>` : ''}
      </div>
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
