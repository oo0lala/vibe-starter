import React, { useState } from 'react';
import { Grant, Deliverable, Disbursement } from '../../types/grant';
import {
  X,
  CheckCircle2,
  AlertCircle,
  Clock,
  FileCheck,
  DollarSign,
  Calendar,
  Building,
  Upload,
  ShieldCheck,
  Send
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface GrantDetailModalProps {
  grant: Grant | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateGrant: (updatedGrant: Grant) => void;
  onOpenSgxReport: (grant: Grant) => void;
}

export const GrantDetailModal: React.FC<GrantDetailModalProps> = ({
  grant,
  isOpen,
  onClose,
  onUpdateGrant,
  onOpenSgxReport
}) => {
  const [selectedTab, setSelectedTab] = useState<'deliverables' | 'disbursements' | 'audit'>('deliverables');
  const [verifyingDeliverableId, setVerifyingDeliverableId] = useState<string | null>(null);
  const [auditNote, setAuditNote] = useState('');

  if (!isOpen || !grant) return null;

  const handleVerifyDeliverable = (deliverableId: string) => {
    const updatedDeliverables = grant.deliverables.map((del) => {
      if (del.id === deliverableId) {
        return {
          ...del,
          status: 'Verified' as const,
          verifiedAt: new Date().toISOString().split('T')[0],
          evidenceNotes: auditNote || del.evidenceNotes || 'Verified by independent grant administrator.',
          currentMetric: del.targetMetric
        };
      }
      return del;
    });

    const newEfficacy = Math.min(
      100,
      Math.round(
        (updatedDeliverables.filter((d) => d.status === 'Verified').length /
          updatedDeliverables.length) *
          100
      )
    );

    const updatedGrant: Grant = {
      ...grant,
      deliverables: updatedDeliverables,
      efficacyRating: newEfficacy
    };

    onUpdateGrant(updatedGrant);
    setVerifyingDeliverableId(null);
    setAuditNote('');

    // Trigger celebratory particle animation for milestone verification
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // Ignore if confetti fails
    }
  };

  const handleDisburseTranche = (disbursementId: string) => {
    const updatedDisbursements = grant.disbursements.map((disb) => {
      if (disb.id === disbursementId) {
        return {
          ...disb,
          isDisbursed: true,
          disbursedDate: new Date().toISOString().split('T')[0]
        };
      }
      return disb;
    });

    const newTotalDisbursed = updatedDisbursements
      .filter((d) => d.isDisbursed)
      .reduce((sum, d) => sum + d.amount, 0);

    const updatedGrant: Grant = {
      ...grant,
      disbursements: updatedDisbursements,
      disbursedAmount: newTotalDisbursed,
      status: newTotalDisbursed >= grant.totalApprovedBudget ? 'Completed' : 'Active'
    };

    onUpdateGrant(updatedGrant);

    try {
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.7 }
      });
    } catch (e) {
      // ignore
    }
  };

  const pctBudgetDisbursed = Math.round(
    (grant.disbursedAmount / grant.totalApprovedBudget) * 100
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-start justify-between gap-4 bg-slate-50/60 shrink-0">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <span className="font-mono font-medium">{grant.code}</span>
              <span aria-hidden="true">·</span>
              <span>{grant.category}</span>
              <span aria-hidden="true">·</span>
              <span className="font-semibold text-slate-800">{grant.status}</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
              {grant.title}
            </h2>
            <div className="flex items-center gap-4 text-xs text-slate-600 mt-1.5 flex-wrap">
              <span>
                <strong>Funder:</strong> {grant.funderName}
              </span>
              <span>·</span>
              <span>
                <strong>Recipient:</strong> {grant.recipientName}
              </span>
              <span>·</span>
              <span>
                <strong>Term:</strong> {grant.startDate} to {grant.endDate}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="px-6 py-2.5 border-b border-slate-200 bg-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setSelectedTab('deliverables')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                selectedTab === 'deliverables'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Deliverables & Proof ({grant.deliverables.length})
            </button>
            <button
              type="button"
              onClick={() => setSelectedTab('disbursements')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                selectedTab === 'disbursements'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Disbursement Tranches ({grant.disbursements.length})
            </button>
            <button
              type="button"
              onClick={() => setSelectedTab('audit')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                selectedTab === 'audit'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              SGX & Audit Metrics
            </button>
          </div>

          <button
            type="button"
            onClick={() => onOpenSgxReport(grant)}
            className="px-3 py-1.5 text-xs font-medium text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <FileCheck className="w-3.5 h-3.5" />
            <span>View Board Report</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* Top KPI bar */}
          <div className="grid grid-cols-3 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <div>
              <span className="block text-[11px] text-slate-500">Approved Grant Budget</span>
              <span className="font-mono font-bold text-slate-900 text-sm sm:text-base tabular-nums">
                SGD {grant.totalApprovedBudget.toLocaleString()}
              </span>
            </div>
            <div>
              <span className="block text-[11px] text-slate-500">Total Disbursed ({pctBudgetDisbursed}%)</span>
              <span className="font-mono font-bold text-emerald-700 text-sm sm:text-base tabular-nums">
                SGD {grant.disbursedAmount.toLocaleString()}
              </span>
            </div>
            <div>
              <span className="block text-[11px] text-slate-500">Verified Efficacy</span>
              <span className="font-mono font-bold text-sky-700 text-sm sm:text-base tabular-nums">
                {grant.efficacyRating}%
              </span>
            </div>
          </div>

          {/* Tab 1: Deliverables & Milestones */}
          {selectedTab === 'deliverables' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Deliverable Registry & Evidence Log
                </h4>
                <span className="text-xs text-slate-500">
                  {grant.deliverables.filter((d) => d.status === 'Verified').length} of{' '}
                  {grant.deliverables.length} verified
                </span>
              </div>

              <div className="space-y-3">
                {grant.deliverables.map((del, idx) => {
                  const isVerified = del.status === 'Verified';
                  const isUnderReview = del.status === 'Under Review';
                  const isVerifying = verifyingDeliverableId === del.id;

                  return (
                    <div
                      key={del.id}
                      className={`p-4 rounded-xl border transition-all ${
                        isVerified
                          ? 'bg-emerald-50/30 border-emerald-200'
                          : isUnderReview
                          ? 'bg-amber-50/30 border-amber-200'
                          : 'bg-white border-slate-200'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 text-xs mb-1">
                            <span className="font-mono text-slate-500">M0{idx + 1}</span>
                            <span aria-hidden="true">·</span>
                            <span
                              className={`font-semibold ${
                                isVerified
                                  ? 'text-emerald-700'
                                  : isUnderReview
                                  ? 'text-amber-700'
                                  : 'text-slate-600'
                              }`}
                            >
                              {del.status}
                            </span>
                            <span aria-hidden="true">·</span>
                            <span className="text-slate-500">Due: {del.deadline}</span>
                          </div>

                          <h5 className="font-bold text-sm text-slate-900">{del.title}</h5>
                          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                            {del.description}
                          </p>

                          {/* Metric Progress */}
                          <div className="mt-3 flex items-center gap-3 text-xs">
                            <span className="text-slate-500">{del.metricLabel}:</span>
                            <span className="font-mono font-bold text-slate-900 tabular-nums">
                              {del.currentMetric} / {del.targetMetric} {del.metricUnit}
                            </span>
                            <div className="w-32 bg-slate-200 rounded-full h-1.5 overflow-hidden">
                              <div
                                className={`h-full rounded-full ${
                                  isVerified ? 'bg-emerald-500' : 'bg-slate-800'
                                }`}
                                style={{
                                  width: `${Math.min(
                                    100,
                                    Math.round((del.currentMetric / del.targetMetric) * 100)
                                  )}%`
                                }}
                              />
                            </div>
                          </div>

                          {/* Audit Notes & Evidence File */}
                          {del.evidenceNotes && (
                            <div className="mt-2.5 pt-2 border-t border-slate-100 text-xs text-slate-600 bg-white/70 p-2 rounded">
                              <span className="font-semibold text-slate-800">Verification Trail: </span>
                              {del.evidenceNotes}
                              {del.proofFileName && (
                                <div className="mt-1 flex items-center gap-1.5 font-mono text-[11px] text-sky-700">
                                  <FileCheck className="w-3.5 h-3.5" />
                                  <span>{del.proofFileName}</span>
                                </div>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="shrink-0 flex items-center sm:flex-col sm:items-end gap-2 pt-2 sm:pt-0">
                          {isVerified ? (
                            <div className="flex items-center gap-1 text-xs text-emerald-700 font-semibold bg-emerald-100/70 px-2.5 py-1 rounded-md">
                              <CheckCircle2 className="w-4 h-4" />
                              <span>Verified</span>
                            </div>
                          ) : isVerifying ? (
                            <div className="w-full sm:w-64 space-y-2 bg-white p-2.5 rounded-lg border border-slate-200 shadow-sm">
                              <label className="block text-[11px] font-medium text-slate-700">
                                Auditor / Signoff Note:
                              </label>
                              <input
                                type="text"
                                value={auditNote}
                                onChange={(e) => setAuditNote(e.target.value)}
                                placeholder="Audit check complete, signed invoice verified..."
                                className="w-full text-xs p-1.5 border border-slate-200 rounded text-slate-800"
                              />
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => setVerifyingDeliverableId(null)}
                                  className="px-2 py-1 text-xs text-slate-600 hover:bg-slate-100 rounded"
                                >
                                  Cancel
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleVerifyDeliverable(del.id)}
                                  className="px-2.5 py-1 text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-700 rounded shadow-xs"
                                >
                                  Confirm Signoff
                                </button>
                              </div>
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() => {
                                setVerifyingDeliverableId(del.id);
                                setAuditNote('');
                              }}
                              className="px-3 py-1.5 text-xs font-medium bg-slate-900 text-white hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
                            >
                              <ShieldCheck className="w-3.5 h-3.5" />
                              <span>Verify Deliverable</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Tab 2: Disbursement Tranches */}
          {selectedTab === 'disbursements' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Tranche Release & Governance Schedule
                </h4>
                <span className="text-xs text-slate-500">
                  {grant.disbursements.filter((d) => d.isDisbursed).length} of{' '}
                  {grant.disbursements.length} released
                </span>
              </div>

              <div className="space-y-3">
                {grant.disbursements.map((tranche) => (
                  <div
                    key={tranche.id}
                    className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      tranche.isDisbursed
                        ? 'bg-emerald-50/20 border-emerald-200'
                        : 'bg-white border-slate-200'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2 text-xs mb-1">
                        <span className="font-bold text-slate-900">
                          Tranche #{tranche.trancheNumber}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono font-bold text-emerald-700">
                          SGD {tranche.amount.toLocaleString()}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="text-slate-500">
                          Scheduled: {tranche.scheduledDate}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600">{tranche.purpose}</p>
                      {tranche.disbursedDate && (
                        <p className="text-[11px] text-emerald-700 mt-1 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Disbursed on {tranche.disbursedDate}</span>
                        </p>
                      )}
                    </div>

                    <div className="shrink-0">
                      {tranche.isDisbursed ? (
                        <span className="text-xs font-semibold text-emerald-700 bg-emerald-100/70 px-3 py-1.5 rounded-lg inline-block">
                          Funds Released
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleDisburseTranche(tranche.id)}
                          className="px-3.5 py-1.5 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Release Tranche</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: SGX & Audit Metrics */}
          {selectedTab === 'audit' && (
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Singapore Exchange (SGX) Core ESG Alignment
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <span className="text-[11px] text-slate-500 uppercase font-semibold">
                    SGX Core Metric Code
                  </span>
                  <div className="font-mono font-bold text-slate-900 text-base">
                    {grant.sgxMetrics.sgxCoreMetricCode}
                  </div>
                  <p className="text-xs text-slate-600">
                    Category: {grant.sgxMetrics.esgCategory}
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <span className="text-[11px] text-slate-500 uppercase font-semibold">
                    UN Sustainable Development Goal
                  </span>
                  <div className="font-bold text-slate-900 text-sm">
                    {grant.sgxMetrics.primarySdg}
                  </div>
                  <p className="text-xs text-slate-600">
                    Reporting Year: {grant.sgxMetrics.reportingYear}
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <span className="text-[11px] text-slate-500 uppercase font-semibold">
                    Audited Beneficiaries Reached
                  </span>
                  <div className="font-mono font-bold text-slate-900 text-xl tabular-nums">
                    {grant.sgxMetrics.beneficiariesCount.toLocaleString()}
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Validated against Ministry & community agency census registers.
                  </p>
                </div>

                {grant.sgxMetrics.co2OffsetTonnes && (
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                    <span className="text-[11px] text-slate-500 uppercase font-semibold">
                      Carbon Offset Efficacy
                    </span>
                    <div className="font-mono font-bold text-emerald-700 text-xl tabular-nums">
                      {grant.sgxMetrics.co2OffsetTonnes} tCO2e
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Estimated greenhouse gas reduction verified by LCA study.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-white flex items-center justify-between shrink-0">
          <span className="text-xs text-slate-500">
            Cryptographic audit trail hash: <code className="font-mono text-slate-700">0x7F2a...9b1C</code>
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
};
