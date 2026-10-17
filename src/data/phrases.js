// Mẫu câu giao tiếp theo tình huống — dùng cho luyện nói (nghe, nhắc lại, ghi âm).
const RAW = [
  { id: 'gioi-thieu', name: 'Tự giới thiệu', level: 1, lines: `
안녕하세요. 저는 란이에요.|Xin chào. Tôi là Lan.
저는 베트남에서 왔어요.|Tôi đến từ Việt Nam.
저는 스물다섯 살이에요.|Tôi 25 tuổi.
저는 회사원이에요.|Tôi là nhân viên công ty.
한국어를 공부하고 있어요.|Tôi đang học tiếng Hàn.
제 취미는 음악 듣기예요.|Sở thích của tôi là nghe nhạc.
처음 뵙겠습니다. 잘 부탁드립니다.|Lần đầu gặp mặt. Mong được giúp đỡ.
만나서 반갑습니다.|Rất vui được gặp bạn.` },
  { id: 'hoi-dap', name: 'Hỏi thăm hằng ngày', level: 1, lines: `
잘 지냈어요?|Dạo này bạn khỏe không?
네, 잘 지냈어요.|Vâng, tôi khỏe.
요즘 어떻게 지내요?|Dạo này bạn thế nào?
이름이 뭐예요?|Bạn tên là gì?
몇 살이에요?|Bạn bao nhiêu tuổi?
어디에 살아요?|Bạn sống ở đâu?
무슨 일을 하세요?|Bạn làm nghề gì?
주말에 뭐 했어요?|Cuối tuần bạn đã làm gì?` },
  { id: 'lop-hoc', name: 'Trong lớp học', level: 1, lines: `
다시 한번 말해 주세요.|Hãy nói lại một lần nữa.
천천히 말해 주세요.|Hãy nói chậm lại.
잘 모르겠어요.|Tôi không hiểu lắm.
이건 한국어로 뭐예요?|Cái này tiếng Hàn là gì?
질문이 있어요.|Tôi có câu hỏi.
알겠습니다.|Tôi hiểu rồi.
이 단어는 무슨 뜻이에요?|Từ này nghĩa là gì?
어떻게 발음해요?|Phát âm thế nào?` },
  { id: 'mua-sam', name: 'Mua sắm', level: 2, lines: `
이거 얼마예요?|Cái này bao nhiêu tiền?
좀 깎아 주세요.|Bớt cho tôi chút đi.
다른 색깔 있어요?|Có màu khác không?
입어 봐도 돼요?|Tôi mặc thử được không?
좀 더 큰 사이즈 있어요?|Có cỡ lớn hơn không?
카드로 계산할게요.|Tôi sẽ thanh toán bằng thẻ.
영수증 주세요.|Cho tôi hóa đơn.
이거 환불할 수 있어요?|Cái này hoàn tiền được không?` },
  { id: 'nha-hang', name: 'Ở nhà hàng', level: 2, lines: `
두 명이에요.|Chúng tôi có hai người.
메뉴판 좀 주세요.|Cho tôi xem thực đơn.
뭐가 맛있어요?|Món nào ngon?
비빔밥 하나하고 불고기 2인분 주세요.|Cho một cơm trộn và hai suất bulgogi.
안 맵게 해 주세요.|Làm không cay giúp tôi.
여기요! 물 좀 더 주세요.|Ơi! Cho thêm chút nước.
계산해 주세요.|Tính tiền giúp tôi.
포장해 주세요.|Gói mang về giúp tôi.` },
  { id: 'hoi-duong', name: 'Hỏi đường & giao thông', level: 2, lines: `
실례지만, 지하철역이 어디에 있어요?|Xin lỗi, ga tàu điện ngầm ở đâu?
여기에서 멀어요?|Có xa đây không?
걸어서 얼마나 걸려요?|Đi bộ mất bao lâu?
쭉 가서 오른쪽으로 가세요.|Đi thẳng rồi rẽ phải.
이 버스 서울역에 가요?|Xe buýt này có đi ga Seoul không?
어디에서 갈아타야 돼요?|Tôi phải chuyển tuyến ở đâu?
명동역에서 내리세요.|Hãy xuống ở ga Myeongdong.
기사님, 여기에서 세워 주세요.|Bác tài, dừng ở đây giúp tôi.` },
  { id: 'benh-vien', name: 'Ở bệnh viện, hiệu thuốc', level: 2, lines: `
어디가 아프세요?|Bạn đau ở đâu?
머리가 아프고 열이 나요.|Tôi đau đầu và sốt.
어제부터 기침을 해요.|Tôi ho từ hôm qua.
감기약 있어요?|Có thuốc cảm không?
하루에 세 번, 식후에 드세요.|Ngày ba lần, uống sau bữa ăn.
알레르기가 있어요.|Tôi bị dị ứng.
보험이 돼요?|Có được bảo hiểm chi trả không?
푹 쉬세요.|Hãy nghỉ ngơi thật tốt.` },
  { id: 'dien-thoai', name: 'Gọi điện thoại & hẹn gặp', level: 2, lines: `
여보세요?|A lô?
민수 씨 계세요?|Có anh Minsu ở đó không?
잠깐만 기다리세요.|Xin đợi một chút.
나중에 다시 전화할게요.|Tôi sẽ gọi lại sau.
내일 시간 있어요?|Mai bạn có rảnh không?
몇 시에 만날까요?|Mấy giờ gặp nhau nhé?
강남역 2번 출구에서 만나요.|Gặp ở cửa ra số 2 ga Gangnam nhé.
조금 늦을 것 같아요. 미안해요.|Tôi có lẽ đến muộn một chút. Xin lỗi.` },
  { id: 'cong-so', name: 'Nơi công sở', level: 3, lines: `
회의는 몇 시에 시작해요?|Cuộc họp bắt đầu lúc mấy giờ?
보고서를 내일까지 제출하겠습니다.|Tôi sẽ nộp báo cáo trước ngày mai.
이 부분을 다시 확인해 주시겠어요?|Anh/chị kiểm tra lại phần này giúp được không?
오늘은 일찍 퇴근해도 될까요?|Hôm nay tôi về sớm được không ạ?
메일로 자료를 보내 드렸습니다.|Tôi đã gửi tài liệu qua email.
수고하셨습니다. 내일 뵙겠습니다.|Anh/chị vất vả rồi. Hẹn gặp ngày mai.
제가 담당하겠습니다.|Tôi sẽ phụ trách.
일정을 조정할 수 있을까요?|Có thể điều chỉnh lịch được không?` },
  { id: 'phong-van', name: 'Phỏng vấn xin việc', level: 3, lines: `
간단하게 자기소개를 해 주세요.|Hãy giới thiệu ngắn gọn về bản thân.
저는 무역학을 전공했습니다.|Tôi học chuyên ngành thương mại.
이 회사에 지원한 이유는 무엇입니까?|Lý do bạn ứng tuyển công ty này là gì?
저의 장점은 꼼꼼하고 성실하다는 것입니다.|Ưu điểm của tôi là cẩn thận và chăm chỉ.
베트남 회사에서 3년 동안 일한 경험이 있습니다.|Tôi có kinh nghiệm 3 năm làm ở công ty Việt Nam.
입사하게 된다면 최선을 다하겠습니다.|Nếu được vào công ty tôi sẽ cố gắng hết sức.
혹시 질문 있으세요?|Bạn có câu hỏi nào không?
기회를 주셔서 감사합니다.|Cảm ơn vì đã cho tôi cơ hội.` },
  { id: 'y-kien', name: 'Nêu ý kiến & thảo luận', level: 4, lines: `
제 생각에는 그 방법이 더 효과적인 것 같아요.|Theo tôi phương pháp đó hiệu quả hơn.
저는 그 의견에 찬성합니다.|Tôi tán thành ý kiến đó.
저는 조금 다르게 생각합니다.|Tôi nghĩ hơi khác một chút.
물론 그런 면도 있지만 단점도 있습니다.|Tất nhiên có mặt đó nhưng cũng có nhược điểm.
예를 들면, 출퇴근 시간이 줄어듭니다.|Ví dụ như thời gian đi lại giảm đi.
그 이유는 두 가지가 있습니다.|Có hai lý do.
결론적으로 개인과 사회가 함께 노력해야 합니다.|Tóm lại, cá nhân và xã hội phải cùng nỗ lực.
다른 분들은 어떻게 생각하세요?|Mọi người khác nghĩ thế nào?` },
  { id: 'phat-bieu', name: 'Phát biểu trang trọng', level: 5, lines: `
바쁘신 가운데 참석해 주셔서 진심으로 감사드립니다.|Xin chân thành cảm ơn quý vị đã dành thời gian tham dự.
오늘 발표할 주제는 인공지능과 교육입니다.|Chủ đề tôi trình bày hôm nay là AI và giáo dục.
먼저 현황을 살펴보겠습니다.|Trước tiên chúng ta xem xét hiện trạng.
이 자료에서 알 수 있듯이 수요가 급격히 증가했습니다.|Như tài liệu này cho thấy, nhu cầu đã tăng mạnh.
이 문제를 해결하기 위해 세 가지 방안을 제시하고자 합니다.|Để giải quyết vấn đề này tôi xin đề xuất ba phương án.
장기적인 관점에서 접근할 필요가 있습니다.|Cần tiếp cận từ góc độ dài hạn.
이상으로 발표를 마치겠습니다.|Tôi xin kết thúc phần trình bày.
경청해 주셔서 감사합니다.|Cảm ơn quý vị đã lắng nghe.` }
];

export const PHRASE_SETS = RAW.map(s => ({
  ...s,
  lines: s.lines.trim().split('\n').map(l => { const [ko, vi] = l.split('|'); return { ko: ko.trim(), vi: vi.trim() }; })
}));
