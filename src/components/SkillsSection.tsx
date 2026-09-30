import React, { useState } from 'react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { SkillCategory } from '../types';

export const SkillsSection: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [activeChipDetail, setActiveChipDetail] = useState<{
    label: string;
    detail?: string;
  } | null>(null);

  const filteredCategories =
    selectedFilter === 'all'
      ? SKILL_CATEGORIES
      : SKILL_CATEGORIES.filter((cat) => cat.id === selectedFilter);

  const getChipStyle = (variant: 'neon' | 'cyan' | 'neutral' | 'muted') => {
    switch (variant) {
      case 'neon':
        return 'bg-[#2a2b3a]/60 border border-[#ffa94d]/50 text-[#ffa94d] font-semibold hover:bg-[#ffa94d]/10';
      case 'cyan':
        return 'bg-[#2a2b3a]/60 border border-[#4fd1ae]/40 text-[#c7f9ec] hover:bg-[#4fd1ae]/10';
      case 'muted':
        return 'bg-[#2a2b3a]/60 border border-[#33344a]/40 text-[#8b8ca3] hover:text-[#e8e8f0]';
      case 'neutral':
      default:
        return 'bg-[#2a2b3a]/60 border border-[#33344a]/40 text-[#e8e8f0] hover:border-[#8b8ca3]';
    }
  };

  return (
    <section
      id="skills"
      className="relative py-16 px-4 sm:px-6 lg:px-12 border-t border-[#33344a]/20"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="flex flex-col gap-1">
            <span className="font-label-code-sm text-xs text-[#ffa94d] tracking-widest uppercase">
              // 02. ARSENAL_DE_COMPETÊNCIAS
            </span>
            <h2 className="font-headline-lg text-2xl sm:text-3xl lg:text-4xl text-[#f8f6f2] tracking-tight font-bold">
              Capacidades Táticas & Ferramentas
            </h2>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-[#20212e] font-label-code-sm text-xs text-[#8b8ca3]">
              <span className="w-2 h-2 rounded-full bg-[#ffa94d]"></span>
              <span>TOTAL_NODES: 28 MATRIZES ATIVAS</span>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 font-label-code-sm text-xs scrollbar-none">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-3 py-1.5 rounded transition-all whitespace-nowrap ${
              selectedFilter === 'all'
                ? 'bg-[#ffa94d] text-[#3a1a00] font-bold shadow-[0_0_15px_rgba(255,169,77,0.3)]'
                : 'bg-[#14151f] text-[#c6c7d6] hover:text-white border border-[#33344a]/40'
            }`}
          >
            Todos os Quadrantes (28)
          </button>
          <button
            onClick={() => setSelectedFilter('redes')}
            className={`px-3 py-1.5 rounded transition-all whitespace-nowrap ${
              selectedFilter === 'redes'
                ? 'bg-[#ffa94d] text-[#3a1a00] font-bold shadow-[0_0_15px_rgba(255,169,77,0.3)]'
                : 'bg-[#14151f] text-[#c6c7d6] hover:text-white border border-[#33344a]/40'
            }`}
          >
            01 // Redes & Infra (8)
          </button>
          <button
            onClick={() => setSelectedFilter('red-team')}
            className={`px-3 py-1.5 rounded transition-all whitespace-nowrap ${
              selectedFilter === 'red-team'
                ? 'bg-[#ffa94d] text-[#3a1a00] font-bold shadow-[0_0_15px_rgba(255,169,77,0.3)]'
                : 'bg-[#14151f] text-[#c6c7d6] hover:text-white border border-[#33344a]/40'
            }`}
          >
            02 // Red Team (7)
          </button>
          <button
            onClick={() => setSelectedFilter('blue-team')}
            className={`px-3 py-1.5 rounded transition-all whitespace-nowrap ${
              selectedFilter === 'blue-team'
                ? 'bg-[#4fd1ae] text-[#062420] font-bold shadow-[0_0_15px_rgba(79,209,174,0.3)]'
                : 'bg-[#14151f] text-[#c6c7d6] hover:text-white border border-[#33344a]/40'
            }`}
          >
            03 // Blue Team (6)
          </button>
          <button
            onClick={() => setSelectedFilter('automacao')}
            className={`px-3 py-1.5 rounded transition-all whitespace-nowrap ${
              selectedFilter === 'automacao'
                ? 'bg-[#ffa94d] text-[#3a1a00] font-bold shadow-[0_0_15px_rgba(255,169,77,0.3)]'
                : 'bg-[#14151f] text-[#c6c7d6] hover:text-white border border-[#33344a]/40'
            }`}
          >
            04 // Automação (5)
          </button>
        </div>

        {/* Active Node Detail Callout if clicked */}
        {activeChipDetail && (
          <div className="p-3 rounded-lg bg-[#14151f] border border-[#ffa94d]/50 flex items-start justify-between gap-3 animate-fadeIn">
            <div className="flex items-start gap-2">
              <span className="material-symbols-outlined text-[#ffa94d] text-[18px] shrink-0 mt-0.5">
                info
              </span>
              <div>
                <span className="font-mono text-xs font-bold text-[#ffa94d]">
                  [{activeChipDetail.label}]
                </span>
                <p className="text-xs text-[#e8e8f0] mt-0.5">
                  {activeChipDetail.detail || 'Competência técnica ativa e validada nos laboratórios.'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setActiveChipDetail(null)}
              className="text-[#8b8ca3] hover:text-white text-xs font-mono"
            >
              [FECHAR]
            </button>
          </div>
        )}

        {/* 4 Quadrants Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCategories.map((category: SkillCategory) => {
            const isBlueOrDef = category.id === 'blue-team';
            return (
              <div
                key={category.id}
                className="flex flex-col justify-between p-6 rounded-xl bg-[#181a26]/50 backdrop-blur-md border border-[#33344a]/30 transition-all duration-300 hover:border-[#ffa94d]/40 hover:bg-[#20212e]/40"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-[#33344a]/20 pb-3 mb-4">
                    <div className="flex items-center gap-2">
                      <span
                        className={`material-symbols-outlined text-[22px] ${
                          isBlueOrDef ? 'text-[#4fd1ae]' : 'text-[#ffa94d]'
                        }`}
                      >
                        {category.icon}
                      </span>
                      <h3 className="font-title-code text-base font-bold text-[#f8f6f2]">
                        {category.number} // {category.title}
                      </h3>
                    </div>
                    <span className="font-label-code-sm text-xs text-[#8b8ca3]">
                      {category.level}
                    </span>
                  </div>

                  <p className="font-body-sm text-xs text-[#c6c7d6] mb-4 leading-relaxed">
                    {category.description}
                  </p>

                  {/* Chips List */}
                  <div className="flex flex-wrap gap-2">
                    {category.chips.map((chip, idx) => (
                      <button
                        key={idx}
                        onClick={() =>
                          setActiveChipDetail({
                            label: chip.label,
                            detail: chip.detail,
                          })
                        }
                        className={`px-2 py-1 rounded font-label-code-sm text-xs cursor-pointer transition-colors ${getChipStyle(
                          chip.variant
                        )}`}
                        title="Clique para ver detalhe técnico"
                      >
                        {chip.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Telemetry Progress Bar */}
                <div className="mt-6 pt-2 border-t border-[#33344a]/20">
                  <div className="flex items-center justify-between font-label-code-sm text-xs text-[#8b8ca3] mb-1.5">
                    <span>MASTERY_TELEMETRY</span>
                    <span
                      className={`font-bold ${
                        isBlueOrDef ? 'text-[#4fd1ae]' : 'text-[#ffa94d]'
                      }`}
                    >
                      {category.masteryPercentage}%
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-[#0d0e18] rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ${
                        isBlueOrDef ? 'bg-[#4fd1ae]' : 'bg-[#ffa94d]'
                      }`}
                      style={{ width: `${category.masteryPercentage}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
