import React, { useState, useMemo } from 'react';
import { Grant, RecipientCategory } from '../../types/grant';
import {
  Search,
  Filter,
  DollarSign,
  TrendingUp,
  CheckCircle2,
  Clock,
  Building2,
  GraduationCap,
  Landmark,
  HeartHandshake,
  ChevronRight,
  ShieldCheck,
  FileText
} from 'lucide-react';

interface GrantDashboardProps {
  grants: Grant[];
  onSelectGrant: (grant: Grant) => void;
  onGenerateSgxReport: (grant: Grant) => void;
}

export const GrantDashboard: React.FC<GrantDashboardProps> = ({
  grants,
  onSelectGrant,
  onGenerateSgxReport
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Key KPI metrics
  const totalBudget = useMemo(
    () => grants.reduce((sum, g) => sum + g.totalApprovedBudget, 0),
    [grants]
  );
  const totalDisbursed = useMemo(
    () => grants.reduce((sum, g) => sum + g.disbursedAmount, 0),
    [grants]
  );
  const avgEfficacy = useMemo(
    () =>
      grants.length > 0
        ? Math.round(
            grants.reduce((sum, g) => sum + g.efficacyRating, 0) / grants.length
          )
        : 0,
    [grants]
  );

  const totalDeliverables = useMemo(
    () => grants.reduce((sum, g) => sum + g.deliverables.length, 0),
    [grants]
  );
  const verifiedDeliverables = useMemo(
    () =>
      grants.reduce(
        (sum, g) =>
          sum + g.deliverables.filter((d) => d.status === 'Verified').length,
        0
      ),
    [grants]
  );

  const filteredGrants = useMemo(() => {
    return grants.filter((g) => {
      const matchCat =
        selectedCategory === 'all' || g.category === selectedCategory;
      const matchStatus =
        selectedStatus === 'all' || g.status === selectedStatus;
      const matchSearch =
        searchQuery === '' ||
        g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        g.funderName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        g.recipientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        g.code.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchStatus && matchSearch;
    });
  }, [grants, selectedCategory, selectedStatus, searchQuery]);

  const getCategoryIcon = (cat: RecipientCategory) => {
    switch (cat) {
      case 'Government agency':
        return <Landmark className="w-4 h-4 text-sky-600" />;
      case 'Foundations':
        return <Building2 className="w-4 h-4 text-purple-600" />;
      case 'Schools':
        return <GraduationCap className="w-4 h-4 text-amber-600" />;
      case 'Non profit organisations':
        return <HeartHandshake className="w-4 h-4 text-emerald-600" />;
      default:
        return <Building2 className="w-4 h-4 text-slate-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Platform Value Proposition Kicker banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-sm border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-amber-300 font-semibold tracking-wide uppercase">
            <ShieldCheck className="w-4 h-4" />
            <span>Operational Efficacy & Impact Engine</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-1">
            Grant Capital & Efficacy Portfolio
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Eliminating manual spreadsheet tracking and human error with milestone-contingent
            disbursements, verified deliverable registries, and SGX-compliant ESG reporting.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <div className="px-3.5 py-2 rounded-lg bg-slate-800/80 border border-slate-700/80 text-right">
            <span className="block text-[11px] text-slate-400">Total Capital Monitored</span>
            <span className="font-mono text-base font-bold text-white tabular-nums">
              SGD {(totalBudget / 1000000).toFixed(2)}M
            </span>
          </div>
        </div>
      </div>

      {/* KPI Overview Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Capital Disbursed</span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900 font-mono tabular-nums">
              SGD {(totalDisbursed / 1000).toFixed(0)}k
            </span>
            <span className="text-xs text-slate-500">
              of {(totalBudget / 1000).toFixed(0)}k
            </span>
          </div>
          <div className="mt-3 w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-emerald-500 h-full rounded-full"
              style={{ width: `${Math.round((totalDisbursed / totalBudget) * 100)}%` }}
            />
          </div>
          <span className="mt-1.5 block text-[11px] text-slate-500 tabular-nums">
            {Math.round((totalDisbursed / totalBudget) * 100)}% disbursed to date
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Portfolio Efficacy Score</span>
            <TrendingUp className="w-4 h-4 text-sky-600" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900 font-mono tabular-nums">
              {avgEfficacy}%
            </span>
            <span className="text-xs text-emerald-600 font-medium">Outcomes Verified</span>
          </div>
          <div className="mt-3 w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-sky-500 h-full rounded-full"
              style={{ width: `${avgEfficacy}%` }}
            />
          </div>
          <span className="mt-1.5 block text-[11px] text-slate-500">
            Based on audited deliverables & KPI milestones
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Deliverable Integrity</span>
            <CheckCircle2 className="w-4 h-4 text-purple-600" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900 font-mono tabular-nums">
              {verifiedDeliverables}/{totalDeliverables}
            </span>
            <span className="text-xs text-slate-500 font-medium">Deliverables</span>
          </div>
          <div className="mt-3 w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-purple-500 h-full rounded-full"
              style={{
                width: `${Math.round((verifiedDeliverables / totalDeliverables) * 100)}%`
              }}
            />
          </div>
          <span className="mt-1.5 block text-[11px] text-slate-500 tabular-nums">
            {Math.round((verifiedDeliverables / totalDeliverables) * 100)}% verified with evidence
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Active Beneficiaries</span>
            <Building2 className="w-4 h-4 text-amber-600" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900 font-mono tabular-nums">
              6,290+
            </span>
            <span className="text-xs text-slate-500">Individuals</span>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-[11px] text-slate-500">
            <span>SGX ESG Core Compliant</span>
            <span aria-hidden="true">·</span>
            <span>4 Grant Streams</span>
          </div>
          <span className="mt-1.5 block text-[11px] text-slate-500">
            Across 12 Schools & 8 Community Hubs
          </span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by grant name, funder, recipient, or code..."
            className="w-full text-xs pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400"
          />
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <div className="flex items-center gap-1 text-xs">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-500 hidden sm:inline">Category:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 focus:outline-none"
            >
              <option value="all">All Customer Segments</option>
              <option value="Government agency">Government agency</option>
              <option value="Foundations">Foundations</option>
              <option value="Schools">Schools</option>
              <option value="Non profit organisations">Non profit organisations</option>
            </select>
          </div>

          <div className="flex items-center gap-1 text-xs">
            <span className="text-slate-500 hidden sm:inline">Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 focus:outline-none"
            >
              <option value="all">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Completed">Completed</option>
              <option value="Pending Disbursement">Pending Disbursement</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grant Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredGrants.length === 0 ? (
          <div className="col-span-full py-12 text-center bg-white rounded-xl border border-slate-200">
            <FileText className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-sm font-medium text-slate-600">No grant initiatives matched your criteria</p>
            <p className="text-xs text-slate-400 mt-1">Try clearing search terms or category filters</p>
          </div>
        ) : (
          filteredGrants.map((grant) => {
            const pctDisbursed = Math.round(
              (grant.disbursedAmount / grant.totalApprovedBudget) * 100
            );
            const verifiedCount = grant.deliverables.filter(
              (d) => d.status === 'Verified'
            ).length;

            return (
              <div
                key={grant.id}
                className="bg-white rounded-xl border border-slate-200 hover:border-slate-300 transition-all p-5 shadow-xs flex flex-col justify-between"
              >
                <div>
                  {/* Top line metadata without pills */}
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                    <div className="flex items-center gap-1.5 font-mono text-[11px]">
                      <span>{grant.code}</span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1 text-slate-700 font-sans font-medium">
                        {getCategoryIcon(grant.category)}
                        {grant.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-slate-900">
                        {grant.status}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 tracking-tight leading-snug">
                    {grant.title}
                  </h3>

                  <p className="text-xs text-slate-600 mt-1.5 line-clamp-2 leading-relaxed">
                    {grant.description}
                  </p>

                  {/* Funder & Recipient Strip */}
                  <div className="mt-3.5 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="block text-[11px] text-slate-400">Funding Sponsor</span>
                      <span className="font-semibold text-slate-800 truncate block">
                        {grant.funderName}
                      </span>
                    </div>
                    <div>
                      <span className="block text-[11px] text-slate-400">Recipient Partner</span>
                      <span className="font-semibold text-slate-800 truncate block">
                        {grant.recipientName}
                      </span>
                    </div>
                  </div>

                  {/* Financial & Verification Indicators */}
                  <div className="mt-3.5 bg-slate-50 rounded-lg p-3 border border-slate-100 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500">Budget Deployed</span>
                      <span className="font-mono font-bold text-slate-900 tabular-nums">
                        SGD {grant.disbursedAmount.toLocaleString()} / {grant.totalApprovedBudget.toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-slate-900 h-full rounded-full"
                        style={{ width: `${pctDisbursed}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-0.5">
                      <span>{pctDisbursed}% Disbursed</span>
                      <span>
                        {verifiedCount} of {grant.deliverables.length} Deliverables Verified
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-xs">
                    <span className="text-slate-400">Efficacy:</span>
                    <span className="font-mono font-bold text-emerald-700 tabular-nums">
                      {grant.efficacyRating}%
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onGenerateSgxReport(grant)}
                      className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200/80 rounded-lg transition-colors flex items-center gap-1"
                      title="Generate Board and SGX sustainability report"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>SGX Report</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onSelectGrant(grant)}
                      className="px-3.5 py-1.5 text-xs font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1 shadow-xs"
                    >
                      <span>Manage Milestones</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
