import React, { useState } from 'react';
import {
  SUBSCRIPTION_TIERS,
  PAID_ADDONS,
  COST_BREAKDOWN
} from '../../data/businessModelData';
import { Check, Shield, Zap, HelpCircle, ArrowRight, DollarSign } from 'lucide-react';

export const RevenueModelPricing: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([
    'addon-onboarding'
  ]);

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const selectedTier = SUBSCRIPTION_TIERS[1]; // default enterprise tier
  const tierCost =
    billingCycle === 'annual'
      ? Math.round(selectedTier.priceAnnual / 12)
      : selectedTier.priceMonthly;

  const addonMonthlySum = PAID_ADDONS.filter(
    (a) => selectedAddons.includes(a.id) && a.type === 'monthly'
  ).reduce((sum, a) => sum + a.price, 0);

  const addonOneTimeSum = PAID_ADDONS.filter(
    (a) => selectedAddons.includes(a.id) && a.type === 'one-time'
  ).reduce((sum, a) => sum + a.price, 0);

  const totalMonthlyInvestment = tierCost + addonMonthlySum;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          Canvas Financial Architecture
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Revenue Streams & Commercial Packaging
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Directly structured from the Business Model Canvas: tiered SaaS subscriptions, paid add-ons,
          dedicated onboarding fees, and premium technical SLA support.
        </p>

        {/* Billing cycle segmented control */}
        <div className="inline-flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200 mt-4">
          <button
            type="button"
            onClick={() => setBillingCycle('monthly')}
            className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              billingCycle === 'monthly'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Monthly Cadence
          </button>
          <button
            type="button"
            onClick={() => setBillingCycle('annual')}
            className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
              billingCycle === 'annual'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>Annual Commitment</span>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
              Save 20%
            </span>
          </button>
        </div>
      </div>

      {/* Subscription Tiers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {SUBSCRIPTION_TIERS.map((tier) => {
          const isRec = tier.recommended;
          const displayPrice =
            billingCycle === 'annual'
              ? Math.round(tier.priceAnnual / 12)
              : tier.priceMonthly;

          return (
            <div
              key={tier.id}
              className={`rounded-2xl p-6 flex flex-col justify-between transition-all ${
                isRec
                  ? 'bg-white border-2 border-slate-900 shadow-md relative'
                  : 'bg-white border border-slate-200 hover:border-slate-300 shadow-xs'
              }`}
            >
              {isRec && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full">
                  Recommended for Institutions
                </span>
              )}

              <div>
                <h3 className="text-lg font-bold text-slate-900">{tier.name}</h3>
                <p className="text-xs text-slate-500 mt-0.5">{tier.targetAudience}</p>

                <div className="mt-4 pb-4 border-b border-slate-100">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
                      SGD ${displayPrice.toLocaleString()}
                    </span>
                    <span className="text-xs text-slate-500">/ month</span>
                  </div>
                  <span className="text-[11px] text-slate-400 block mt-1">
                    {billingCycle === 'annual'
                      ? `Billed annually (SGD $${tier.priceAnnual.toLocaleString()} / yr)`
                      : 'Billed on a monthly rolling basis'}
                  </span>
                  <div className="mt-2 text-xs font-semibold text-slate-700 bg-slate-50 px-2.5 py-1 rounded inline-block">
                    {tier.grantVolumeLimit}
                  </div>
                </div>

                {/* Features List */}
                <ul className="mt-4 space-y-2.5 text-xs text-slate-600">
                  {tier.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  className={`w-full py-2 px-4 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 ${
                    isRec
                      ? 'bg-slate-900 text-white hover:bg-slate-800'
                      : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                  }`}
                >
                  <span>Select {tier.name}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Paid Add-ons & Customization Strip */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div>
          <h3 className="text-base font-bold text-slate-900">
            Paid Add-ons, Onboarding Fees & Technical Support
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Select additional services identified in the Canvas revenue model to calculate customized deployment cost.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {PAID_ADDONS.map((addon) => {
            const isSelected = selectedAddons.includes(addon.id);

            return (
              <div
                key={addon.id}
                onClick={() => toggleAddon(addon.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start justify-between gap-3 ${
                  isSelected
                    ? 'border-slate-900 bg-slate-50/60 ring-1 ring-slate-900/10'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-4 h-4 rounded border flex items-center justify-center ${
                        isSelected
                          ? 'bg-slate-900 border-slate-900 text-white'
                          : 'border-slate-300 bg-white'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3" />}
                    </div>
                    <span className="font-bold text-xs text-slate-900">{addon.name}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 pl-6 leading-relaxed">
                    {addon.description}
                  </p>
                  <div className="pl-6 pt-1 text-[11px] text-slate-400">
                    Category: <span className="font-medium text-slate-600">{addon.category}</span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="font-mono text-xs font-bold text-slate-900 tabular-nums">
                    SGD ${addon.price.toLocaleString()}
                  </span>
                  <span className="block text-[10px] text-slate-400">
                    {addon.type === 'monthly' ? '/ month' : 'one-time'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Investment Summary */}
        <div className="p-4 bg-slate-900 text-white rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-4">
          <div>
            <span className="text-xs text-slate-400 block">
              Estimated Total Investment (Impact Enterprise + Selected Add-ons)
            </span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-2xl font-bold font-mono text-white tabular-nums">
                SGD ${totalMonthlyInvestment.toLocaleString()}
              </span>
              <span className="text-xs text-slate-400">/ month</span>
              {addonOneTimeSum > 0 && (
                <span className="text-xs text-amber-300 ml-2">
                  + SGD ${addonOneTimeSum.toLocaleString()} one-time setup
                </span>
              )}
            </div>
          </div>

          <button
            type="button"
            className="px-4 py-2 text-xs font-semibold bg-emerald-500 hover:bg-emerald-600 text-slate-950 rounded-lg transition-colors shrink-0 font-medium"
          >
            Request Institutional Proposal
          </button>
        </div>
      </div>

      {/* Cost Structure Comparison */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div>
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            Canvas Cost Structure Analysis
          </span>
          <h3 className="text-base font-bold text-slate-900 mt-0.5">
            Operational Expenditure & Expense Breakdown
          </h3>
          <p className="text-xs text-slate-500">
            Comparing revenue potential against projected operational expenditure based on the whiteboard cost buckets.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {COST_BREAKDOWN.map((cost, idx) => (
            <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-slate-900">{cost.category}</span>
                <span className="font-mono text-xs font-semibold text-slate-700 tabular-nums">
                  {cost.percentage}% of OpEx
                </span>
              </div>
              <div className="font-mono text-lg font-bold text-slate-900 tabular-nums">
                SGD ${cost.monthlyExpenseSGD.toLocaleString()} / mo
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">{cost.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
