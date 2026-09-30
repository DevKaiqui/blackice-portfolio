import React, { useState } from 'react';
import { CREDENTIALS_LIST } from '../data/portfolioData';
import { CredentialItem } from '../types';

export const CredentialsSection: React.FC = () => {
  const [selectedCred, setSelectedCred] = useState<CredentialItem | null>(null);

  const getStatusBadge = (type: CredentialItem['statusType'], text: string) => {
    switch (type) {
      case 'achieved':
      case 'progress':
        return (
          <span className="px-2 py-0.5 rounded bg-[#ffa94d]/10 text-[#ffa94d] font-label-code-sm text-[11px] border border-[#ffa94d]/30">
            {text}
          </span>
        );
      case 'prep':
      case 'completed':
      default:
        return (
          <span className="px-2 py-0.5 rounded bg-[#20212e] text-[#8b8ca3] font-label-code-sm text-[11px] border border-[#33344a]/40">
            {text}
          </span>
        );
    }
  };

  return (
    <section
      id="credenciais"
      className="relative py-16 px-4 sm:px-6 lg:px-12 border-t border-[#33344a]/20"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
          <div className="flex flex-col gap-1">
            <span className="font-label-code-sm text-xs text-[#ffa94d] tracking-widest uppercase">
              // 04. CREDENCIAIS &amp; APRENDIZADO
            </span>
            <h2 className="font-headline-lg text-2xl sm:text-3xl lg:text-4xl text-[#f8f6f2] tracking-tight font-bold">
              Rigor Técnico em Constante Expansão
            </h2>
          </div>
          <span className="font-label-code-sm text-xs text-[#8b8ca3]">
            CONTINUOUS_SECURITY_EDUCATION
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CREDENTIALS_LIST.map((cert) => (
            <div
              key={cert.id}
              onClick={() => setSelectedCred(selectedCred?.id === cert.id ? null : cert)}
              className="p-5 rounded-xl bg-[#181a26]/50 border border-[#33344a]/30 flex flex-col justify-between hover:border-[#ffa94d]/40 hover:bg-[#20212e]/40 transition-all cursor-pointer group"
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="font-label-code-sm text-xs text-[#4fd1ae] font-bold">
                    {cert.issuer}
                  </span>
                  {getStatusBadge(cert.statusType, cert.statusText)}
                </div>

                <h3 className="font-title-code text-base text-[#f8f6f2] font-bold mt-1 group-hover:text-[#ffa94d] transition-colors">
                  {cert.title}
                </h3>

                <p className="font-body-sm text-xs text-[#c6c7d6] leading-relaxed">
                  {cert.description}
                </p>

                {selectedCred?.id === cert.id && cert.details && (
                  <div className="mt-2 pt-2 border-t border-[#33344a]/30 space-y-1 text-[11px] font-mono text-[#e8e8f0]">
                    {cert.details.map((item, i) => (
                      <div key={i} className="flex items-center gap-1.5">
                        <span className="text-[#ffa94d]">✓</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-4 pt-2 border-t border-[#33344a]/20 font-label-code-sm text-[10px] text-[#8b8ca3] flex items-center justify-between">
                <span>{cert.focusFooter}</span>
                <span className="text-[#ffa94d] group-hover:translate-x-0.5 transition-transform">
                  &gt;
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
