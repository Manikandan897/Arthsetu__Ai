import React, { useState } from 'react';
import { OFFICIAL_SCHEMES } from '../../data/schemes';
import { DocumentRequirement } from '../../types';
import { FileCheck, CheckCircle2, Circle, AlertCircle, ExternalLink, HelpCircle, Download, Printer } from 'lucide-react';

interface DocumentChecklistViewProps {
  initialSchemeId?: string;
}

export const DocumentChecklistView: React.FC<DocumentChecklistViewProps> = ({
  initialSchemeId = 'all'
}) => {
  const [selectedSchemeFilter, setSelectedSchemeFilter] = useState<string>(initialSchemeId);
  const [checkedDocIds, setCheckedDocIds] = useState<Record<string, boolean>>({
    'doc-aadhaar': true,
    'doc-bank': true
  });

  // Collect all unique documents
  const allDocuments: (DocumentRequirement & { schemeNames: string[] })[] = [];
  const docMap = new Map<string, DocumentRequirement & { schemeNames: string[] }>();

  OFFICIAL_SCHEMES.forEach(scheme => {
    scheme.documents.forEach(doc => {
      if (docMap.has(doc.name)) {
        docMap.get(doc.name)!.schemeNames.push(scheme.shortName);
      } else {
        docMap.set(doc.name, {
          ...doc,
          schemeNames: [scheme.shortName]
        });
      }
    });
  });

  docMap.forEach(v => allDocuments.push(v));

  // Filter based on scheme selection
  const displayedDocuments =
    selectedSchemeFilter === 'all'
      ? allDocuments
      : (OFFICIAL_SCHEMES.find(s => s.id === selectedSchemeFilter)?.documents || []).map(doc => ({
          ...doc,
          schemeNames: [OFFICIAL_SCHEMES.find(s => s.id === selectedSchemeFilter)?.shortName || '']
        }));

  const totalMandatory = displayedDocuments.filter(d => d.mandatory).length;
  const readyMandatory = displayedDocuments.filter(d => d.mandatory && checkedDocIds[d.id]).length;
  const readinessPercent = Math.round((readyMandatory / Math.max(1, totalMandatory)) * 100);

  const toggleDoc = (id: string) => {
    setCheckedDocIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="mb-6 pb-4 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <FileCheck className="w-5 h-5 text-blue-900" />
            <span className="text-xs font-semibold text-blue-900 uppercase tracking-wider">
              Verification Readiness
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Government Scheme Document Checklist
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Track your paperwork readiness before applying at Common Service Centres or bank desks.
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="self-start md:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Print Checklist</span>
        </button>
      </div>

      {/* Scheme Selector & Readiness Progress Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs mb-8 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <label className="text-xs font-bold text-slate-700">Filter by Scheme:</label>
            <select
              value={selectedSchemeFilter}
              onChange={e => setSelectedSchemeFilter(e.target.value)}
              className="text-xs p-2 border border-slate-300 rounded-md bg-white font-medium text-slate-800 focus:ring-2 focus:ring-blue-600"
            >
              <option value="all">All Schemes Master Checklist</option>
              {OFFICIAL_SCHEMES.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>

          <div className="text-xs font-medium text-slate-600">
            Mandatory Documents Prepared:{' '}
            <strong className="text-slate-900 font-mono text-sm">{readyMandatory}</strong> of{' '}
            <strong className="text-slate-900 font-mono text-sm">{totalMandatory}</strong>
          </div>
        </div>

        {/* Readiness Meter */}
        <div>
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1.5">
            <span>Application Filing Readiness</span>
            <span className="font-mono text-blue-900 font-bold">{readinessPercent}%</span>
          </div>
          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 rounded-full ${
                readinessPercent >= 80
                  ? 'bg-emerald-600'
                  : readinessPercent >= 50
                  ? 'bg-blue-600'
                  : 'bg-amber-500'
              }`}
              style={{ width: `${readinessPercent}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1">
            <span>Begin scanning documents</span>
            <span>Ready for CSC / JanSamarth Submission</span>
          </div>
        </div>
      </div>

      {/* Documents List */}
      <div className="space-y-4">
        {displayedDocuments.map(doc => {
          const isChecked = !!checkedDocIds[doc.id];
          return (
            <div
              key={doc.id}
              onClick={() => toggleDoc(doc.id)}
              className={`border rounded-xl p-4 sm:p-5 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-start justify-between gap-4 ${
                isChecked
                  ? 'bg-blue-50/30 border-blue-200'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div className="mt-0.5 shrink-0">
                  {isChecked ? (
                    <CheckCircle2 className="w-5 h-5 text-blue-900" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-300 hover:text-slate-400" />
                  )}
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className={`text-sm font-bold tracking-tight ${isChecked ? 'text-blue-950' : 'text-slate-900'}`}>
                      {doc.name}
                    </h3>
                    <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                      {doc.category}
                    </span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${doc.mandatory ? 'bg-red-50 text-red-700' : 'bg-slate-100 text-slate-500'}`}>
                      {doc.mandatory ? 'Mandatory' : 'Optional / Supplementary'}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
                    {doc.description}
                  </p>

                  <div className="mt-2 text-xs text-slate-500 flex items-center gap-1.5">
                    <strong className="text-slate-700">Where to obtain:</strong>
                    <span>{doc.howToObtain}</span>
                  </div>

                  {doc.schemeNames && doc.schemeNames.length > 0 && (
                    <div className="mt-2.5 flex flex-wrap items-center gap-1">
                      <span className="text-[10px] text-slate-400 mr-1">Required by:</span>
                      {doc.schemeNames.map((sName: string, i: number) => (
                        <span key={i} className="text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded">
                          {sName}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Status Indicator */}
              <div className="shrink-0 self-end sm:self-start">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded ${
                  isChecked ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                }`}>
                  {isChecked ? 'Ready in File' : 'Mark as Ready'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
