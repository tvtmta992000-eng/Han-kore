// Nhân vật vẽ phẳng (khung 100×100, nửa người). talking = miệng mở.
export const CHARACTERS = {
  minsu: { name: '민수', vi: 'Minsu', skin: '#F2C6A0', hair: '#1F2937', hairStyle: 'short', top: '#3B82F6', collar: 'hood' },
  lan: { name: '란', vi: 'Lan', skin: '#F5CFAE', hair: '#111827', hairStyle: 'long', top: '#F472B6', collar: 'round' },
  sujin: { name: '수진', vi: 'Sujin', skin: '#F7D3B5', hair: '#7C4A1E', hairStyle: 'bob', top: '#FACC15', collar: 'round' },
  shop: { name: '아저씨', vi: 'Chú bán hàng', skin: '#E9B98F', hair: '#9CA3AF', hairStyle: 'short', top: '#16A34A', collar: 'apron', band: '#E5484D' },
  anchor: { name: '앵커', vi: 'Phát thanh viên', skin: '#F2C6A0', hair: '#111827', hairStyle: 'side', top: '#1E3A8A', collar: 'tie' },
  prof: { name: '교수님', vi: 'Giáo sư', skin: '#F5CFAE', hair: '#6B7280', hairStyle: 'bun', top: '#7C3AED', collar: 'blazer', glasses: true },
  reporter: { name: '기자', vi: 'Phóng viên', skin: '#EDBE94', hair: '#3F2A1D', hairStyle: 'short', top: '#0F766E', collar: 'round', glasses: true },
  hanbok: { name: '진행자', vi: 'Người tổ chức', skin: '#F7D3B5', hair: '#111827', hairStyle: 'bun', top: '#DC2626', collar: 'hanbok' }
};

function Hair({ c }) {
  const h = c.hair;
  switch (c.hairStyle) {
    case 'long': return <><path d="M28 40c0-18 10-26 22-26s22 8 22 26v34H62V44H38v30H28z" fill={h} /></>;
    case 'bob': return <path d="M27 50c-2-22 8-34 23-34s25 12 23 34H64l-2-14c-8 2-18 0-24-6l-2 20z" fill={h} />;
    case 'bun': return <><circle cx="50" cy="13" r="8" fill={h} /><path d="M29 40c0-14 9-22 21-22s21 8 21 22c-6-8-14-10-21-10s-15 2-21 10z" fill={h} /></>;
    case 'side': return <path d="M29 40c-1-15 9-23 21-23 14 0 22 8 21 20-8-6-20-10-34-4-4 2-6 4-8 7z" fill={h} />;
    default: return <path d="M29 40c0-15 9-23 21-23s21 8 21 23c-4-6-8-8-12-9-6 4-20 4-30 9z" fill={h} />;
  }
}

function Top({ c }) {
  const body = <path d="M14 100c0-18 14-28 36-28s36 10 36 28z" fill={c.top} />;
  switch (c.collar) {
    case 'hood': return <>{body}<path d="M34 74c4 8 28 8 32 0" stroke="#1E40AF" strokeWidth="4" fill="none" /></>;
    case 'apron': return <>{body}<path d="M36 76h28l4 24H32z" fill="#FDE7C2" /><path d="M38 76l-6-4M62 76l6-4" stroke="#FDE7C2" strokeWidth="3" /></>;
    case 'tie': return <>{body}<path d="M42 72l8 10 8-10" fill="#FFFFFF" /><path d="M50 80l-3 4 3 14 3-14z" fill="#E5484D" /></>;
    case 'blazer': return <>{body}<path d="M42 72l8 12 8-12" fill="#EDE9FE" /><path d="M42 72l6 28M58 72l-6 28" stroke="#5B21B6" strokeWidth="2" /></>;
    case 'hanbok': return <>{body}<path d="M40 72l10 14 10-14" fill="#FFFFFF" /><path d="M50 86c-6 4-6 10-2 14M50 86c6 4 6 10 2 14" stroke="#FACC15" strokeWidth="3" fill="none" /><path d="M14 100c0-12 8-20 18-24v24zM86 100c0-12-8-20-18-24v24z" fill="#FACC15" /></>;
    default: return <>{body}<path d="M40 73c4 5 16 5 20 0" stroke="#FFFFFF" strokeWidth="2.5" fill="none" opacity=".7" /></>;
  }
}

export default function Avatar({ id, talking = false, size = 64, flip = false }) {
  const c = CHARACTERS[id] || CHARACTERS.minsu;
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={`avatar-svg ${talking ? 'talking' : ''}`} aria-hidden="true">
      <g transform={flip ? 'translate(100 0) scale(-1 1)' : undefined}>
      <Top c={c} />
      <rect x="44" y="60" width="12" height="14" fill={c.skin} />
      {c.hairStyle === 'long' && <path d="M30 44h40v20H30z" fill={c.hair} />}
      <ellipse cx="50" cy="44" rx="20" ry="22" fill={c.skin} />
      <ellipse cx="30" cy="46" rx="3.5" ry="5" fill={c.skin} />
      <ellipse cx="70" cy="46" rx="3.5" ry="5" fill={c.skin} />
      <Hair c={c} />
      {c.band && <path d="M30 32c10-6 30-6 40 0" stroke={c.band} strokeWidth="4" fill="none" />}
      <circle cx="42" cy="45" r="2.6" fill="#1F2937" />
      <circle cx="58" cy="45" r="2.6" fill="#1F2937" />
      <path d="M38 39l7-1M55 38l7 1" stroke="#1F2937" strokeWidth="1.8" strokeLinecap="round" />
      {c.glasses && <g fill="none" stroke="#1F2937" strokeWidth="1.8"><circle cx="42" cy="45" r="6" /><circle cx="58" cy="45" r="6" /><path d="M48 45h4" /></g>}
      <circle cx="37" cy="53" r="3" fill="#F472B6" opacity=".35" />
      <circle cx="63" cy="53" r="3" fill="#F472B6" opacity=".35" />
      {talking
        ? <ellipse className="mouth-open" cx="50" cy="56" rx="5" ry="3.5" fill="#9F1239" />
        : <path d="M44 55c4 3 8 3 12 0" stroke="#9F1239" strokeWidth="2.2" fill="none" strokeLinecap="round" />}
      </g>
    </svg>
  );
}
