// Bối cảnh vẽ phẳng, khung 320×180.
const SCENES = {
  classroom: <>
    <rect width="320" height="180" fill="#E0ECFF" />
    <rect y="140" width="320" height="40" fill="#C8A27A" />
    <rect x="70" y="24" width="180" height="84" rx="4" fill="#1F6F50" stroke="#8B5E34" strokeWidth="6" />
    <text x="160" y="74" textAnchor="middle" fontSize="26" fill="#FFFFFF" fontFamily="'Noto Sans KR', sans-serif" opacity=".9">가나다라</text>
    <rect x="100" y="108" width="120" height="6" fill="#8B5E34" />
    <rect x="270" y="30" width="34" height="34" rx="17" fill="#FFFFFF" stroke="#9CA3AF" strokeWidth="3" /><path d="M287 38v9l6 4" stroke="#374151" strokeWidth="2.5" fill="none" />
  </>,
  home: <>
    <rect width="320" height="180" fill="#FDF2E4" />
    <rect y="140" width="320" height="40" fill="#D9B48F" />
    <rect x="34" y="22" width="80" height="70" rx="4" fill="#BFE3FF" stroke="#FFFFFF" strokeWidth="6" /><path d="M74 22v70M34 57h80" stroke="#FFFFFF" strokeWidth="5" />
    <rect x="186" y="96" width="110" height="34" rx="10" fill="#E5484D" /><rect x="180" y="86" width="20" height="50" rx="8" fill="#C53035" /><rect x="282" y="86" width="20" height="50" rx="8" fill="#C53035" />
    <rect x="214" y="30" width="56" height="40" rx="3" fill="#FFFFFF" stroke="#A16207" strokeWidth="4" /><path d="M220 64l14-16 10 10 8-8 12 14z" fill="#86D46B" />
  </>,
  market: <>
    <rect width="320" height="180" fill="#FFF7E0" />
    <rect y="146" width="320" height="34" fill="#D1D5DB" />
    <path d="M10 60l20-36h260l20 36z" fill="#E5484D" />
    <path d="M30 24l-8 36M70 24l-4 36M110 24v36M150 24v36M190 24v36M230 24l4 36M270 24l8 36" stroke="#FFFFFF" strokeWidth="10" opacity=".85" />
    <rect x="20" y="60" width="280" height="10" fill="#B91C1C" />
    <rect x="30" y="104" width="260" height="42" fill="#A16207" />
    <g><circle cx="60" cy="98" r="10" fill="#E5484D" /><circle cx="80" cy="98" r="10" fill="#E5484D" /><circle cx="70" cy="88" r="10" fill="#E5484D" />
      <circle cx="140" cy="98" r="10" fill="#F59E0B" /><circle cx="160" cy="98" r="10" fill="#F59E0B" /><circle cx="150" cy="88" r="10" fill="#F59E0B" />
      <circle cx="230" cy="98" r="10" fill="#86D46B" /><circle cx="250" cy="98" r="10" fill="#86D46B" /><circle cx="240" cy="88" r="10" fill="#86D46B" /></g>
  </>,
  park: <>
    <rect width="320" height="180" fill="#CFEAFF" />
    <circle cx="270" cy="34" r="18" fill="#FACC15" />
    <path d="M0 120c60-20 120-20 180 0s100 10 140-6v66H0z" fill="#86D46B" />
    <rect y="150" width="320" height="30" fill="#5CB85C" />
    <rect x="44" y="70" width="10" height="70" fill="#7C4A1E" /><circle cx="49" cy="60" r="30" fill="#22A35A" />
    <path d="M180 90l40-60 40 60z" fill="#94A3B8" /><path d="M208 48l12-18 12 18-12-4z" fill="#FFFFFF" />
  </>,
  cafe: <>
    <rect width="320" height="180" fill="#F3E5D8" />
    <rect y="140" width="320" height="40" fill="#8B5E34" />
    <g fill="#E8D3BF"><rect x="0" y="20" width="60" height="16" /><rect x="70" y="20" width="60" height="16" /><rect x="140" y="20" width="60" height="16" /><rect x="210" y="20" width="60" height="16" /><rect x="30" y="44" width="60" height="16" /><rect x="100" y="44" width="60" height="16" /><rect x="170" y="44" width="60" height="16" /><rect x="240" y="44" width="60" height="16" /></g>
    <path d="M60 0v26M260 0v26" stroke="#374151" strokeWidth="2" /><path d="M48 26h24l-4 10H52zM248 26h24l-4 10h-16z" fill="#FACC15" />
    <rect x="120" y="104" width="80" height="8" rx="3" fill="#6B3F1D" /><path d="M134 112v28M186 112v28" stroke="#6B3F1D" strokeWidth="5" />
    <path d="M146 92h16v8a8 8 0 0 1-16 0z" fill="#FFFFFF" /><path d="M162 94h4a3 3 0 0 1 0 6h-4" stroke="#FFFFFF" strokeWidth="2" fill="none" />
  </>,
  office: <>
    <rect width="320" height="180" fill="#EEF2F7" />
    <rect y="142" width="320" height="38" fill="#94A3B8" />
    <rect x="24" y="18" width="120" height="80" fill="#BFDBFE" stroke="#FFFFFF" strokeWidth="5" /><path d="M64 18v80M104 18v80M24 58h120" stroke="#FFFFFF" strokeWidth="4" />
    <rect x="180" y="100" width="120" height="8" fill="#6B7280" /><rect x="214" y="70" width="52" height="30" rx="3" fill="#374151" /><rect x="218" y="74" width="44" height="22" fill="#93C5FD" />
    <rect x="276" y="52" width="16" height="48" rx="3" fill="#22A35A" /><circle cx="284" cy="46" r="12" fill="#22A35A" />
  </>,
  studio: <>
    <rect width="320" height="180" fill="#0F2B5B" />
    <rect x="170" y="20" width="130" height="80" rx="6" fill="#1E40AF" /><path d="M180 86l30-36 20 22 16-14 34 28z" fill="#38BDF8" opacity=".7" />
    <text x="235" y="40" textAnchor="middle" fontSize="13" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="700">NEWS 9</text>
    <rect x="0" y="126" width="320" height="54" fill="#1E3A8A" /><rect x="0" y="126" width="320" height="6" fill="#E5484D" />
    <text x="16" y="160" fontSize="14" fill="#FFFFFF" fontFamily="'Noto Sans KR', sans-serif">속보 · 환경 뉴스</text>
  </>,
  hall: <>
    <rect width="320" height="180" fill="#E9E5FF" />
    <rect x="40" y="14" width="240" height="96" rx="4" fill="#FFFFFF" stroke="#7C3AED" strokeWidth="4" />
    <path d="M60 90l40-40 30 26 30-34 40 30 40-20" stroke="#7C3AED" strokeWidth="4" fill="none" />
    <text x="160" y="38" textAnchor="middle" fontSize="14" fill="#4C1D95" fontFamily="'Noto Sans KR', sans-serif" fontWeight="700">인공지능과 미래</text>
    <rect y="140" width="320" height="40" fill="#5B21B6" />
    <rect x="230" y="118" width="40" height="30" fill="#8B5CF6" />
  </>,
  street: <>
    <rect width="320" height="180" fill="#DBEAFE" />
    <g><rect x="10" y="40" width="50" height="110" fill="#94A3B8" /><rect x="64" y="20" width="60" height="130" fill="#64748B" /><rect x="130" y="56" width="44" height="94" fill="#A5B4FC" /><rect x="180" y="30" width="56" height="120" fill="#7C8DB5" /><rect x="242" y="60" width="70" height="90" fill="#94A3B8" /></g>
    <g fill="#FEF3C7" opacity=".9"><rect x="74" y="34" width="10" height="10" /><rect x="94" y="34" width="10" height="10" /><rect x="74" y="56" width="10" height="10" /><rect x="94" y="56" width="10" height="10" /><rect x="190" y="44" width="10" height="10" /><rect x="212" y="44" width="10" height="10" /><rect x="190" y="66" width="10" height="10" /><rect x="212" y="66" width="10" height="10" /></g>
    <rect y="150" width="320" height="30" fill="#4B5563" /><path d="M0 165h320" stroke="#FFFFFF" strokeWidth="3" strokeDasharray="18 14" />
  </>,
  clinic: <>
    <rect width="320" height="180" fill="#EAF6F4" />
    <rect y="140" width="320" height="40" fill="#CBD5E1" />
    <rect x="24" y="20" width="60" height="60" rx="6" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="3" /><rect x="48" y="30" width="12" height="40" fill="#E5484D" /><rect x="34" y="44" width="40" height="12" fill="#E5484D" />
    <rect x="200" y="92" width="100" height="16" rx="6" fill="#93C5FD" /><path d="M206 108v32M294 108v32" stroke="#64748B" strokeWidth="5" />
    <rect x="110" y="24" width="70" height="44" rx="4" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="3" /><path d="M118 46h10l6-12 8 24 6-12h24" stroke="#22A35A" strokeWidth="3" fill="none" />
  </>,
  restaurant: <>
    <rect width="320" height="180" fill="#FFF4E8" />
    <rect y="138" width="320" height="42" fill="#A16207" />
    <rect x="20" y="16" width="120" height="70" rx="4" fill="#7C2D12" /><path d="M32 34h96M32 50h80M32 66h88" stroke="#FDE68A" strokeWidth="4" strokeLinecap="round" />
    <path d="M190 0v40M260 0v40" stroke="#374151" strokeWidth="2" /><ellipse cx="190" cy="46" rx="16" ry="8" fill="#F59E0B" /><ellipse cx="260" cy="46" rx="16" ry="8" fill="#F59E0B" />
    <rect x="160" y="104" width="140" height="10" rx="4" fill="#6B3F1D" />
    <ellipse cx="200" cy="100" rx="18" ry="6" fill="#FFFFFF" /><ellipse cx="200" cy="98" rx="12" ry="4" fill="#E5484D" /><ellipse cx="256" cy="100" rx="16" ry="6" fill="#FFFFFF" /><ellipse cx="256" cy="98" rx="10" ry="4" fill="#22A35A" />
  </>,
  bank: <>
    <rect width="320" height="180" fill="#EFF6FF" />
    <rect y="140" width="320" height="40" fill="#94A3B8" />
    <path d="M90 40l70-26 70 26z" fill="#1E40AF" /><rect x="96" y="40" width="128" height="6" fill="#1E40AF" />
    <g fill="#BFDBFE"><rect x="104" y="50" width="12" height="44" /><rect x="134" y="50" width="12" height="44" /><rect x="174" y="50" width="12" height="44" /><rect x="204" y="50" width="12" height="44" /></g>
    <rect x="90" y="94" width="140" height="8" fill="#1E40AF" />
    <rect x="20" y="104" width="280" height="36" fill="#E2E8F0" /><text x="160" y="32" textAnchor="middle" fontSize="12" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="700">BANK</text>
    <rect x="248" y="60" width="44" height="30" rx="4" fill="#FFFFFF" stroke="#1E40AF" strokeWidth="2" /><text x="270" y="80" textAnchor="middle" fontSize="12" fill="#1E40AF" fontFamily="sans-serif">₩</text>
  </>,
  festival: <>
    <rect width="320" height="180" fill="#FFF1E6" />
    <path d="M0 22c60 20 100 20 160 0s100-20 160 0" stroke="#7C4A1E" strokeWidth="2" fill="none" />
    <g>{[30, 80, 130, 190, 240, 290].map((x, i) => <g key={x}><ellipse cx={x} cy={i % 2 ? 34 : 28} rx="12" ry="15" fill={['#E5484D', '#F59E0B', '#3B82F6', '#22A35A', '#8B5CF6', '#F472B6'][i]} /><rect x={x - 5} y={(i % 2 ? 34 : 28) + 13} width="10" height="4" fill="#7C4A1E" /></g>)}</g>
    <path d="M70 140V90l40-26 40 26v50z" fill="#DC2626" /><path d="M56 92l54-34 54 34" stroke="#1F2937" strokeWidth="8" fill="none" strokeLinecap="round" />
    <rect x="98" y="104" width="24" height="36" fill="#7C2D12" />
    <rect y="140" width="320" height="40" fill="#D6B48A" />
    <circle cx="250" cy="110" r="22" fill="#FDE68A" /><path d="M250 88v44M228 110h44" stroke="#F59E0B" strokeWidth="3" />
  </>
};

export function SceneArt({ id }) {
  return SCENES[id] || SCENES.classroom;
}

export default function Scene({ id, className = '' }) {
  return (
    <svg viewBox="0 0 320 180" className={className} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <SceneArt id={id} />
    </svg>
  );
}
