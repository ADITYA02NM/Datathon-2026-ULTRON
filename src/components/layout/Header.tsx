'use client';

export function Header() {
  return (
    <div className="border-b border-[#f0b000] bg-[#0a0e1a] px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left: KSP Logo and Text */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f0b000] text-[#0a0e1a] font-bold">
            KSP
          </div>
          <div className="text-sm font-semibold text-[#f0b000]">KARNATAKA STATE POLICE</div>
        </div>

        {/* Center: Chief Ministers */}
        <div className="flex items-center gap-8">
          <div className="flex flex-col items-center gap-1">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#f0b000] to-[#d49000] flex items-center justify-center text-xs font-bold text-[#0a0e1a]">
              CM
            </div>
            <span className="text-xs text-[#f0b000]">Chief Minister</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#20a080] to-[#1a7a5c] flex items-center justify-center text-xs font-bold text-white">
              DCM
            </div>
            <span className="text-xs text-[#f0b000]">Deputy CM</span>
          </div>
        </div>

        {/* Right: ULTRON Branding */}
        <div className="flex flex-col items-center gap-1">
          <div className="text-lg font-bold text-[#f0b000]">ULTRON</div>
          <span className="text-xs text-[#94a3b8]">Crime Analytics</span>
        </div>
      </div>
    </div>
  );
}
