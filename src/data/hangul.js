// [chữ, tên, phiên âm, cách đọc gần tiếng Việt, từ ví dụ, nghĩa, âm tiết mẫu]
export const CONS = [
  ['ㄱ', '기역', 'g / k', 'g (đầu), c (cuối)', '가방', 'cái cặp', '가'],
  ['ㄴ', '니은', 'n', 'n', '나무', 'cái cây', '나'],
  ['ㄷ', '디귿', 'd / t', 'đ (đầu), t (cuối)', '다리', 'cái chân', '다'],
  ['ㄹ', '리을', 'r / l', 'r nhẹ (đầu), l (cuối)', '라면', 'mì ramen', '라'],
  ['ㅁ', '미음', 'm', 'm', '모자', 'cái mũ', '마'],
  ['ㅂ', '비읍', 'b / p', 'b (đầu), p (cuối)', '바다', 'biển', '바'],
  ['ㅅ', '시옷', 's', 'x / s', '사과', 'quả táo', '사'],
  ['ㅇ', '이응', '– / ng', 'câm (đầu), ng (cuối)', '영어', 'tiếng Anh', '아'],
  ['ㅈ', '지읒', 'j', 'ch nhẹ', '지도', 'bản đồ', '자'],
  ['ㅊ', '치읓', 'ch', 'ch bật hơi', '치마', 'cái váy', '차'],
  ['ㅋ', '키읔', 'k', 'kh (bật hơi)', '커피', 'cà phê', '카'],
  ['ㅌ', '티읕', 't', 'th (bật hơi)', '토마토', 'cà chua', '타'],
  ['ㅍ', '피읖', 'p', 'p bật hơi', '포도', 'quả nho', '파'],
  ['ㅎ', '히읗', 'h', 'h', '하늘', 'bầu trời', '하']
];
export const DCONS = [
  ['ㄲ', '쌍기역', 'kk', 'c căng, không bật hơi', '꼬리', 'cái đuôi', '까'],
  ['ㄸ', '쌍디귿', 'tt', 't căng', '딸기', 'dâu tây', '따'],
  ['ㅃ', '쌍비읍', 'pp', 'p căng', '빵', 'bánh mì', '빠'],
  ['ㅆ', '쌍시옷', 'ss', 's căng, rít', '쌀', 'gạo', '싸'],
  ['ㅉ', '쌍지읒', 'jj', 'ch căng', '짜다', 'mặn', '짜']
];
export const VOWS = [
  ['ㅏ', '아', 'a', 'a', '아이', 'đứa trẻ', '아'],
  ['ㅑ', '야', 'ya', 'ya', '야구', 'bóng chày', '야'],
  ['ㅓ', '어', 'eo', 'ơ (mở miệng rộng)', '어머니', 'mẹ', '어'],
  ['ㅕ', '여', 'yeo', 'yơ', '여자', 'con gái', '여'],
  ['ㅗ', '오', 'o', 'ô (tròn môi)', '오이', 'dưa chuột', '오'],
  ['ㅛ', '요', 'yo', 'yô', '요리', 'nấu ăn', '요'],
  ['ㅜ', '우', 'u', 'u', '우산', 'cái ô', '우'],
  ['ㅠ', '유', 'yu', 'yu', '유리', 'kính', '유'],
  ['ㅡ', '으', 'eu', 'ư', '그네', 'xích đu', '으'],
  ['ㅣ', '이', 'i', 'i', '이름', 'tên', '이']
];
export const CVOWS = [
  ['ㅐ', '애', 'ae', 'e', '개', 'con chó', '애'],
  ['ㅒ', '얘', 'yae', 'ye', '얘기', 'câu chuyện', '얘'],
  ['ㅔ', '에', 'e', 'ê (nay gần giống ㅐ)', '게', 'con cua', '에'],
  ['ㅖ', '예', 'ye', 'yê', '시계', 'đồng hồ', '예'],
  ['ㅘ', '와', 'wa', 'oa', '사과', 'quả táo', '와'],
  ['ㅙ', '왜', 'wae', 'oe', '돼지', 'con lợn', '왜'],
  ['ㅚ', '외', 'oe', 'uê', '회사', 'công ty', '외'],
  ['ㅝ', '워', 'wo', 'uơ', '원', 'won (tiền)', '워'],
  ['ㅞ', '웨', 'we', 'uê', '웨이터', 'bồi bàn', '웨'],
  ['ㅟ', '위', 'wi', 'uy', '귀', 'cái tai', '위'],
  ['ㅢ', '의', 'ui', 'ưi', '의사', 'bác sĩ', '의']
];

export const ALPHABET_GROUPS = [
  { id: 'cons', name: 'Phụ âm cơ bản', list: CONS },
  { id: 'dcons', name: 'Phụ âm căng', list: DCONS },
  { id: 'vows', name: 'Nguyên âm cơ bản', list: VOWS },
  { id: 'cvows', name: 'Nguyên âm ghép', list: CVOWS }
];

export const RULES = [
  { vi: 'Nối âm', ko: '연음화', desc: 'Âm tiết có patchim đứng trước âm tiết bắt đầu bằng ㅇ (câm) thì patchim được đọc nối sang âm tiết sau.', ex: [['음악', '으막', 'âm nhạc'], ['한국어', '한구거', 'tiếng Hàn'], ['옷이', '오시', 'áo (chủ ngữ)'], ['읽어요', '일거요', 'đọc']] },
  { vi: 'Mũi hóa', ko: '비음화', desc: 'Patchim đọc là [k], [t], [p] gặp ㄴ hoặc ㅁ phía sau sẽ đổi thành [ng], [n], [m].', ex: [['합니다', '함니다', 'làm (trang trọng)'], ['국물', '궁물', 'nước canh'], ['거짓말', '거진말', 'lời nói dối'], ['한국말', '한궁말', 'tiếng Hàn']] },
  { vi: 'Biến âm ㄹ', ko: '유음화', desc: 'ㄴ đứng cạnh ㄹ (trước hoặc sau) thì đọc thành ㄹ.', ex: [['신라', '실라', 'Silla'], ['연락', '열락', 'liên lạc'], ['설날', '설랄', 'Tết'], ['편리', '펼리', 'tiện lợi']] },
  { vi: 'Bật hơi hóa', ko: '격음화', desc: 'ㄱ, ㄷ, ㅂ, ㅈ gặp ㅎ (trước hoặc sau) sẽ thành ㅋ, ㅌ, ㅍ, ㅊ.', ex: [['축하', '추카', 'chúc mừng'], ['좋다', '조타', 'tốt'], ['입학', '이팍', 'nhập học'], ['많지', '만치', 'nhiều mà']] },
  { vi: 'Căng hóa', ko: '경음화', desc: 'Sau patchim đọc là [k], [t], [p], phụ âm ㄱ ㄷ ㅂ ㅅ ㅈ đứng sau đọc thành âm căng ㄲ ㄸ ㅃ ㅆ ㅉ.', ex: [['학교', '학꾜', 'trường học'], ['식당', '식땅', 'nhà ăn'], ['잡지', '잡찌', 'tạp chí'], ['국수', '국쑤', 'mì sợi']] },
  { vi: 'Vòm hóa', ko: '구개음화', desc: 'Patchim ㄷ, ㅌ gặp nguyên âm 이 thì đọc thành ㅈ, ㅊ.', ex: [['같이', '가치', 'cùng nhau'], ['굳이', '구지', 'nhất thiết'], ['해돋이', '해도지', 'bình minh']] },
  { vi: 'Lược ㅎ', ko: 'ㅎ 탈락', desc: 'Patchim ㅎ gặp nguyên âm phía sau thì không phát âm.', ex: [['좋아요', '조아요', 'tốt / thích'], ['싫어요', '시러요', 'không thích'], ['많이', '마니', 'nhiều'], ['넣어요', '너어요', 'cho vào']] }
];

export const PATCHIM = [
  ['[k]', 'ㄱ ㅋ ㄲ', '부엌 → [부억]', '부엌'],
  ['[n]', 'ㄴ', '산', '산'],
  ['[t]', 'ㄷ ㅌ ㅅ ㅆ ㅈ ㅊ ㅎ', '옷 → [옫], 낮 → [낟]', '옷'],
  ['[l]', 'ㄹ', '말', '말'],
  ['[m]', 'ㅁ', '밤', '밤'],
  ['[p]', 'ㅂ ㅍ', '앞 → [압]', '앞'],
  ['[ng]', 'ㅇ', '강', '강']
];

export const MINIMAL = [
  ['가', '카', '까'], ['다', '타', '따'], ['바', '파', '빠'], ['자', '차', '짜'], ['사', null, '싸'],
  ['굴', '쿨', '꿀'], ['달', '탈', '딸'], ['불', '풀', '뿔'], ['자다', '차다', '짜다']
];

export const PRON_QUIZ = [
  ['국물', ['궁물', '국물', '굼물', '국믈']], ['합니다', ['함니다', '합니다', '하니다', '함미다']],
  ['같이', ['가치', '가티', '같이', '가지']], ['축하', ['추카', '축하', '추가', '축카']],
  ['신라', ['실라', '신나', '신라', '시나']], ['좋아요', ['조아요', '조하요', '좋아요', '초아요']],
  ['학교', ['학꾜', '학교', '하교', '항교']], ['음악', ['으막', '음악', '응악', '으마']],
  ['연락', ['열락', '연낙', '여락', '연락']], ['한국어', ['한구거', '항국어', '한궁어', '하눅어']],
  ['식당', ['식땅', '식당', '시땅', '신당']], ['많이', ['마니', '만히', '만이', '마히']]
];

export const CONFUSE = [['가', '카', '까'], ['다', '타', '따'], ['바', '파', '빠'], ['자', '차', '짜'], ['사', '싸'], ['어', '오'], ['으', '우'], ['여', '요'], ['발', '밥', '박'], ['강', '감', '간'], ['곰', '공', '곤'], ['서', '소'], ['거', '고', '구']];

/* ---- Vị trí lưỡi & môi (cho sơ đồ khẩu hình) ----
   Tọa độ trong khung 320×260, mặt quay sang trái: môi ở x≈40, họng ở x≈232.
   tongue: 6 điểm từ đầu lưỡi → gốc lưỡi. lips: 0 mở, 1 khép kín. round: 0 dẹt, 1 tròn chu.
   jaw: độ mở hàm 0–1. velum: 0 nâng (đóng đường mũi), 1 hạ (khí ra mũi). */
const REST = [[74, 146], [96, 136], [128, 128], [160, 126], [190, 134], [212, 170]];
export const POSES = {
  rest: { tongue: REST, lips: 0.15, round: 0, jaw: 0.2, velum: 0 },
  bilabial: { tongue: REST, lips: 1, round: 0, jaw: 0.1, velum: 0 },
  alveolar: { tongue: [[86, 104], [100, 108], [126, 120], [160, 126], [190, 134], [212, 170]], lips: 0.25, round: 0, jaw: 0.15, velum: 0 },
  alveolarL: { tongue: [[86, 106], [102, 112], [128, 122], [160, 128], [190, 136], [212, 170]], lips: 0.3, round: 0, jaw: 0.2, velum: 0 },
  sibilant: { tongue: [[82, 116], [98, 113], [126, 118], [160, 126], [190, 134], [212, 170]], lips: 0.3, round: 0, jaw: 0.12, velum: 0 },
  palatal: { tongue: [[74, 140], [102, 102], [124, 96], [156, 112], [190, 132], [212, 170]], lips: 0.3, round: 0.2, jaw: 0.12, velum: 0 },
  velar: { tongue: [[74, 146], [98, 136], [134, 118], [172, 98], [196, 104], [214, 168]], lips: 0.35, round: 0, jaw: 0.25, velum: 0 },
  glottal: { tongue: REST, lips: 0.4, round: 0, jaw: 0.4, velum: 0 },
  vI: { tongue: [[76, 142], [98, 120], [126, 100], [160, 104], [190, 128], [212, 170]], lips: 0.2, round: 0, jaw: 0.15, velum: 0 },
  vE: { tongue: [[76, 144], [98, 126], [126, 110], [160, 114], [190, 130], [212, 170]], lips: 0.3, round: 0, jaw: 0.35, velum: 0 },
  vA: { tongue: [[78, 152], [100, 148], [130, 142], [162, 138], [190, 142], [210, 176]], lips: 0.5, round: 0, jaw: 1, velum: 0 },
  vEO: { tongue: [[76, 150], [98, 144], [130, 134], [166, 120], [192, 130], [212, 172]], lips: 0.45, round: 0.1, jaw: 0.65, velum: 0 },
  vO: { tongue: [[76, 150], [98, 142], [132, 128], [170, 106], [194, 116], [212, 170]], lips: 0.55, round: 0.8, jaw: 0.4, velum: 0 },
  vU: { tongue: [[76, 150], [98, 140], [134, 120], [172, 98], [196, 108], [212, 168]], lips: 0.65, round: 1, jaw: 0.2, velum: 0 },
  vEU: { tongue: [[76, 148], [98, 136], [130, 114], [164, 100], [192, 114], [212, 168]], lips: 0.25, round: 0, jaw: 0.15, velum: 0 }
};

// kind: plain = thường, asp = bật hơi, tense = căng, nasal = âm mũi, fric = âm xát, liquid = âm lưu
export const ARTIC = [
  { id: 'moi', title: 'Âm môi', sub: 'ㅁ ㅂ ㅍ ㅃ', pose: 'bilabial',
    how: ['Khép hai môi lại, lưỡi nằm thả lỏng.', 'ㅁ: giữ môi khép, cho hơi thoát ra đường mũi (ngân "m").', 'ㅂ ㅍ ㅃ: dồn hơi sau môi rồi mở môi bật ra.'],
    sounds: [{ ch: 'ㅁ', syl: '마', kind: 'nasal' }, { ch: 'ㅂ', syl: '바', kind: 'plain' }, { ch: 'ㅍ', syl: '파', kind: 'asp' }, { ch: 'ㅃ', syl: '빠', kind: 'tense' }] },
  { id: 'loi', title: 'Âm đầu lưỡi – lợi', sub: 'ㄴ ㄷ ㅌ ㄸ', pose: 'alveolar',
    how: ['Đặt đầu lưỡi chạm vào lợi ngay sau răng cửa trên.', 'ㄴ: giữ lưỡi, hơi ra mũi.', 'ㄷ ㅌ ㄸ: chặn hơi rồi hạ đầu lưỡi xuống thật nhanh.'],
    sounds: [{ ch: 'ㄴ', syl: '나', kind: 'nasal' }, { ch: 'ㄷ', syl: '다', kind: 'plain' }, { ch: 'ㅌ', syl: '타', kind: 'asp' }, { ch: 'ㄸ', syl: '따', kind: 'tense' }] },
  { id: 'r-l', title: 'Âm ㄹ', sub: 'ㄹ đầu từ và patchim ㄹ', pose: 'alveolarL',
    how: ['Đầu từ hoặc giữa hai nguyên âm: đầu lưỡi búng nhẹ một lần vào lợi trên (gần "r" nhẹ, không rung).', 'Patchim ㄹ: đầu lưỡi chạm và giữ ở lợi trên, hơi thoát hai bên lưỡi (giống "l").', 'Không cong lưỡi về sau như "r" tiếng Anh.'],
    sounds: [{ ch: 'ㄹ', syl: '라', kind: 'liquid' }, { ch: 'ㄹ', syl: '말', kind: 'liquid' }] },
  { id: 'xat', title: 'Âm xát', sub: 'ㅅ ㅆ', pose: 'sibilant',
    how: ['Đưa đầu lưỡi gần lợi trên nhưng không chạm, để khe hẹp.', 'Thổi hơi qua khe tạo tiếng "x".', 'ㅅ đứng trước ㅣ, ㅑ, ㅕ, ㅛ, ㅠ đọc gần "s" mềm (시 ≈ "si" nhẹ); ㅆ căng cổ và rít mạnh hơn.'],
    sounds: [{ ch: 'ㅅ', syl: '사', kind: 'fric' }, { ch: 'ㅆ', syl: '싸', kind: 'tense' }] },
  { id: 'vom', title: 'Âm mặt lưỡi – vòm', sub: 'ㅈ ㅊ ㅉ', pose: 'palatal',
    how: ['Đầu lưỡi tì sau răng dưới, mặt lưỡi áp lên vòm cứng phía trước.', 'Chặn hơi rồi hé ra cho hơi xát ra (giống "ch" nhẹ).', 'ㅊ bật hơi mạnh; ㅉ căng cổ, không bật hơi.'],
    sounds: [{ ch: 'ㅈ', syl: '자', kind: 'plain' }, { ch: 'ㅊ', syl: '차', kind: 'asp' }, { ch: 'ㅉ', syl: '짜', kind: 'tense' }] },
  { id: 'cuong', title: 'Âm cuống lưỡi', sub: 'ㄱ ㅋ ㄲ ㅇ(ng)', pose: 'velar',
    how: ['Nâng cuống lưỡi chạm vào vòm mềm (phía sau vòm miệng).', 'ㄱ ㅋ ㄲ: chặn hơi rồi hạ cuống lưỡi.', 'Patchim ㅇ: giữ cuống lưỡi, hơi ra mũi (giống "ng").'],
    sounds: [{ ch: 'ㄱ', syl: '가', kind: 'plain' }, { ch: 'ㅋ', syl: '카', kind: 'asp' }, { ch: 'ㄲ', syl: '까', kind: 'tense' }, { ch: 'ㅇ', syl: '강', kind: 'nasal' }] },
  { id: 'hong', title: 'Âm họng', sub: 'ㅎ', pose: 'glottal',
    how: ['Miệng mở tự nhiên theo nguyên âm đi sau.', 'Đẩy hơi nhẹ từ họng ra (giống "h").', 'Patchim ㅎ không đọc riêng; nó làm âm sau bật hơi hoặc bị lược.'],
    sounds: [{ ch: 'ㅎ', syl: '하', kind: 'fric' }] },
  { id: 'ng-truoc', title: 'Nguyên âm lưỡi trước', sub: 'ㅣ ㅔ ㅐ', pose: 'vI',
    how: ['ㅣ: lưỡi nâng cao, đẩy ra trước, môi kéo dẹt (như cười).', 'ㅔ / ㅐ: hạ lưỡi và hàm một chút so với ㅣ.', 'Người Hàn trẻ hầu như không phân biệt ㅔ và ㅐ khi nói.'],
    sounds: [{ ch: 'ㅣ', syl: '이', kind: 'vowel', pose: 'vI' }, { ch: 'ㅔ', syl: '에', kind: 'vowel', pose: 'vE' }, { ch: 'ㅐ', syl: '애', kind: 'vowel', pose: 'vE' }] },
  { id: 'ng-thap', title: 'Nguyên âm mở', sub: 'ㅏ ㅓ', pose: 'vA',
    how: ['ㅏ: há miệng rộng, lưỡi nằm thấp.', 'ㅓ: hàm mở vừa, lưỡi lùi về sau, môi KHÔNG tròn. Người Việt hay đọc thành "ơ" quá hẹp; hãy mở miệng rộng hơn.'],
    sounds: [{ ch: 'ㅏ', syl: '아', kind: 'vowel', pose: 'vA' }, { ch: 'ㅓ', syl: '어', kind: 'vowel', pose: 'vEO' }] },
  { id: 'ng-sau', title: 'Nguyên âm lưỡi sau', sub: 'ㅗ ㅜ ㅡ', pose: 'vU',
    how: ['ㅗ: chu môi tròn, miệng mở vừa (giống "ô").', 'ㅜ: chu môi tròn hơn và nhô ra (giống "u").', 'ㅡ: lưỡi ở vị trí như ㅜ nhưng môi kéo ngang, không tròn (giống "ư").'],
    sounds: [{ ch: 'ㅗ', syl: '오', kind: 'vowel', pose: 'vO' }, { ch: 'ㅜ', syl: '우', kind: 'vowel', pose: 'vU' }, { ch: 'ㅡ', syl: '으', kind: 'vowel', pose: 'vEU' }] }
];

export const KIND_LABEL = {
  plain: 'Âm thường: hơi ra nhẹ',
  asp: 'Âm bật hơi: luồng hơi mạnh (đặt tờ giấy trước miệng sẽ rung)',
  tense: 'Âm căng: căng cổ họng, không bật hơi, giọng hơi cao',
  nasal: 'Âm mũi: hạ vòm mềm, hơi thoát ra mũi',
  fric: 'Âm xát: hơi đi qua khe hẹp',
  liquid: 'Âm lưu: búng nhẹ hoặc hơi đi hai bên lưỡi',
  vowel: 'Nguyên âm: luồng hơi đi tự do'
};
