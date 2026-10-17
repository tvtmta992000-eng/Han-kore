// Cấu trúc ngữ pháp theo cấp độ.
// Mỗi dòng: mẫu | nghĩa | cách dùng | ví dụ 1 (Hàn=Việt) | ví dụ 2 (Hàn=Việt)
const RAW = {
1: `
N은/는|Trợ từ chủ đề|Danh từ có patchim + 은, không có patchim + 는. Nêu chủ đề hoặc đối chiếu.|저는 학생이에요.=Tôi là học sinh.|오늘은 월요일이에요.=Hôm nay là thứ Hai.
N이/가|Trợ từ chủ ngữ|Có patchim + 이, không có patchim + 가. Nhấn vào chủ thể, thông tin mới.|비가 와요.=Trời mưa.|친구가 왔어요.=Bạn tôi đã đến.
N입니다 / N입니까?|"Là" (trang trọng)|Gắn trực tiếp sau danh từ. Câu hỏi đổi thành 입니까?|저는 회사원입니다.=Tôi là nhân viên công ty.|학생입니까?=Bạn là học sinh phải không?
N이에요/예요|"Là" (thân mật lịch sự)|Có patchim + 이에요, không có patchim + 예요.|선생님이에요.=Là giáo viên.|의사예요.=Là bác sĩ.
N이/가 아니에요|"Không phải là"|Có patchim + 이, không có + 가. Trang trọng: 아닙니다.|저는 중국 사람이 아니에요.=Tôi không phải người Trung Quốc.|이것은 제 가방이 아니에요.=Đây không phải túi của tôi.
이/그/저 N|Này / đó / kia|이: gần người nói; 그: gần người nghe hoặc đã nhắc; 저: xa cả hai.|이 책은 재미있어요.=Quyển sách này hay.|저 사람은 누구예요?=Người kia là ai?
이것/그것/저것|Cái này / cái đó / cái kia|Nói tắt: 이거, 그거, 저거.|이것은 뭐예요?=Cái này là gì?|그거 주세요.=Cho tôi cái đó.
N이/가 있어요/없어요|Có / không có; ở / không ở|Chỉ sở hữu hoặc sự tồn tại.|시간이 있어요.=Tôi có thời gian.|동생이 없어요.=Tôi không có em.
N에 있어요|Ở (đâu)|에 chỉ vị trí tồn tại.|화장실은 2층에 있어요.=Nhà vệ sinh ở tầng 2.|책이 책상 위에 있어요.=Sách ở trên bàn.
V/A-ㅂ/습니다|Đuôi câu trang trọng|Gốc không patchim + ㅂ니다; có patchim + 습니다. Hỏi: -ㅂ/습니까?|감사합니다.=Cảm ơn.|매일 운동합니다.=Tôi tập thể dục mỗi ngày.
V/A-아요/어요|Đuôi câu thân mật lịch sự|Nguyên âm cuối gốc là ㅏ, ㅗ → 아요; còn lại → 어요; 하다 → 해요.|학교에 가요.=Tôi đi học.|밥을 먹어요.=Tôi ăn cơm.
N을/를|Trợ từ tân ngữ|Có patchim + 을, không có patchim + 를.|커피를 마셔요.=Tôi uống cà phê.|책을 읽어요.=Tôi đọc sách.
N에 가다/오다|Đi / đến (nơi nào)|에 chỉ điểm đến.|회사에 가요.=Tôi đi làm.|한국에 왔어요.=Tôi đã đến Hàn Quốc.
N에서|Tại, ở (nơi hành động diễn ra); từ|Dùng với động từ hành động.|도서관에서 공부해요.=Tôi học ở thư viện.|하노이에서 왔어요.=Tôi đến từ Hà Nội.
N(시간)에|Vào lúc|Gắn sau thời điểm. Không dùng với 오늘, 어제, 내일, 지금.|7시에 일어나요.=Tôi dậy lúc 7 giờ.|주말에 쉬어요.=Cuối tuần tôi nghỉ.
N와/과, N하고|Và, với|와: không patchim; 과: có patchim; 하고: văn nói.|빵과 우유를 샀어요.=Tôi đã mua bánh mì và sữa.|친구하고 영화를 봐요.=Tôi xem phim với bạn.
N도|Cũng|Thay cho 은/는, 이/가, 을/를.|저도 학생이에요.=Tôi cũng là học sinh.|김치도 좋아해요.=Tôi cũng thích kim chi.
안 V/A, V/A-지 않다|Không (phủ định)|안 đặt trước động từ; -지 않다 gắn sau gốc.|오늘은 안 바빠요.=Hôm nay tôi không bận.|고기를 먹지 않아요.=Tôi không ăn thịt.
V/A-았/었어요|Thì quá khứ|ㅏ, ㅗ → 았어요; còn lại → 었어요; 하다 → 했어요.|어제 친구를 만났어요.=Hôm qua tôi đã gặp bạn.|숙제를 했어요.=Tôi đã làm bài tập.
V-(으)세요|Hãy (mời, yêu cầu lịch sự)|Gốc có patchim + 으세요.|여기 앉으세요.=Mời ngồi đây.|천천히 말해 주세요.=Hãy nói chậm giúp tôi.
N 주세요 / V-아/어 주세요|Cho tôi... / làm ơn...|Nhờ vả lịch sự.|물 좀 주세요.=Cho tôi chút nước.|사진 좀 찍어 주세요.=Chụp ảnh giúp tôi với.
V-고 싶다|Muốn|Ngôi thứ ba dùng -고 싶어하다.|한국에 가고 싶어요.=Tôi muốn đi Hàn Quốc.|뭐 먹고 싶어요?=Bạn muốn ăn gì?
`,
2: `
V/A-고|Và, rồi|Nối hai hành động hoặc hai tính chất.|밥을 먹고 학교에 가요.=Tôi ăn cơm rồi đi học.|이 식당은 싸고 맛있어요.=Quán này rẻ và ngon.
V/A-지만|Nhưng|Nối hai vế đối lập.|한국어는 어렵지만 재미있어요.=Tiếng Hàn khó nhưng thú vị.|비싸지만 샀어요.=Đắt nhưng tôi vẫn mua.
V/A-아서/어서|Vì... nên; rồi (trình tự)|Không dùng với quá khứ ở vế trước, không dùng với mệnh lệnh ở vế sau.|배가 아파서 병원에 갔어요.=Vì đau bụng nên tôi đi viện.|시장에 가서 과일을 샀어요.=Tôi đến chợ rồi mua hoa quả.
V/A-(으)니까|Vì (nêu lý do, đi được với mệnh lệnh)|Vế sau có thể là đề nghị, mệnh lệnh.|비가 오니까 우산을 가져가세요.=Trời mưa nên hãy mang ô.|시간이 없으니까 빨리 가요.=Không có thời gian nên đi nhanh thôi.
V-(으)ㄹ 거예요|Sẽ (dự định, phỏng đoán)|Gốc có patchim + 을 거예요.|내일 영화를 볼 거예요.=Mai tôi sẽ xem phim.|아마 비가 올 거예요.=Có lẽ trời sẽ mưa.
V-겠어요|Sẽ (ý chí); chắc là|Ý chí của người nói hoặc phỏng đoán tại chỗ.|열심히 하겠습니다.=Tôi sẽ cố gắng.|맛있겠어요!=Trông ngon quá!
V-고 있다|Đang|Hành động đang diễn ra.|지금 공부하고 있어요.=Bây giờ tôi đang học.|비가 오고 있어요.=Trời đang mưa.
V-(으)ㄹ 수 있다/없다|Có thể / không thể|Khả năng hoặc khả năng xảy ra.|한국어를 할 수 있어요.=Tôi nói được tiếng Hàn.|오늘은 갈 수 없어요.=Hôm nay tôi không đi được.
못 V, V-지 못하다|Không thể (do năng lực, hoàn cảnh)|못 đặt trước động từ.|수영을 못 해요.=Tôi không biết bơi.|바빠서 가지 못했어요.=Vì bận nên tôi đã không đi được.
V-아/어야 하다|Phải|Bắt buộc, cần thiết.|내일까지 숙제를 해야 해요.=Phải làm bài trước ngày mai.|약을 먹어야 돼요.=Phải uống thuốc.
V-아/어도 되다|Được phép|Hỏi xin phép: -아/어도 돼요?|여기 앉아도 돼요?=Tôi ngồi đây được không?|사진을 찍어도 돼요.=Được chụp ảnh.
V-(으)면 안 되다|Không được|Cấm đoán.|여기에서 담배를 피우면 안 돼요.=Không được hút thuốc ở đây.|늦으면 안 돼요.=Không được muộn.
V-지 마세요|Đừng|Mệnh lệnh phủ định lịch sự.|걱정하지 마세요.=Đừng lo lắng.|만지지 마세요.=Đừng chạm vào.
V-(으)ㄹ까요?|Nhé? / ... không nhỉ?|Rủ rê hoặc hỏi ý kiến.|같이 점심 먹을까요?=Cùng ăn trưa nhé?|창문을 열까요?=Tôi mở cửa sổ nhé?
V-(으)ㅂ시다|Hãy cùng...|Rủ rê (với người ngang hàng hoặc dưới).|같이 갑시다.=Cùng đi nào.|여기에서 쉽시다.=Nghỉ ở đây đi.
V-(으)러 가다/오다|Đi / đến để...|Chỉ đi với động từ di chuyển.|밥을 먹으러 가요.=Tôi đi ăn cơm.|책을 빌리러 도서관에 왔어요.=Tôi đến thư viện để mượn sách.
V-기 전에|Trước khi|Danh từ: N 전에.|자기 전에 샤워해요.=Tôi tắm trước khi ngủ.|식사 전에 손을 씻으세요.=Rửa tay trước bữa ăn.
V-(으)ㄴ 후에|Sau khi|Danh từ: N 후에.|수업이 끝난 후에 만나요.=Gặp nhau sau giờ học.|졸업 후에 취직했어요.=Sau tốt nghiệp tôi đã đi làm.
V/A-(으)ㄹ 때|Khi|Danh từ: N 때.|시간이 있을 때 연락하세요.=Khi có thời gian hãy liên lạc.|어렸을 때 부산에 살았어요.=Hồi nhỏ tôi sống ở Busan.
A-(으)ㄴ N|Định ngữ tính từ|Có patchim + 은, không có + ㄴ; 있다/없다 → 는.|예쁜 꽃=Bông hoa đẹp|맛있는 음식=Món ăn ngon
V-는 N / V-(으)ㄴ N / V-(으)ㄹ N|Định ngữ động từ (hiện tại / quá khứ / tương lai)|-는: đang; -(으)ㄴ: đã; -(으)ㄹ: sẽ.|지금 읽는 책=Quyển sách đang đọc|어제 본 영화=Bộ phim đã xem hôm qua
V-아/어 보다|Thử làm|Quá khứ: đã từng thử.|이 옷을 입어 보세요.=Hãy mặc thử áo này.|한국 음식을 먹어 봤어요.=Tôi đã ăn thử món Hàn.
V-(으)ㄹ게요|Tôi sẽ (hứa, quyết định có tính đến người nghe)|Chỉ dùng ngôi thứ nhất.|제가 전화할게요.=Tôi sẽ gọi điện.|내일 다시 올게요.=Mai tôi sẽ quay lại.
V/A-네요|... quá nhỉ! (cảm thán khi nhận ra)|Phản ứng với điều vừa thấy.|날씨가 좋네요.=Trời đẹp quá nhỉ.|한국어를 잘하시네요.=Bạn nói tiếng Hàn giỏi quá.
V/A-지요(죠)?|... đúng không?|Xác nhận điều người nói đã biết.|오늘 덥지요?=Hôm nay nóng nhỉ?|내일 시험이죠?=Mai thi đúng không?
N보다 (더)|Hơn (so sánh)|N보다 đặt sau đối tượng bị so sánh.|오늘이 어제보다 더 추워요.=Hôm nay lạnh hơn hôm qua.|버스보다 지하철이 빨라요.=Tàu điện nhanh hơn xe buýt.
N 중에서 제일/가장|... nhất trong số|So sánh nhất.|과일 중에서 딸기를 제일 좋아해요.=Trong các loại quả tôi thích dâu nhất.|반에서 가장 키가 커요.=Cao nhất lớp.
N(으)로|Bằng (phương tiện); về hướng|Có patchim (trừ ㄹ) + 으로.|버스로 가요.=Tôi đi bằng xe buýt.|오른쪽으로 가세요.=Hãy đi về bên phải.
N부터 N까지|Từ... đến...|Thời gian; nơi chốn dùng N에서 N까지.|9시부터 6시까지 일해요.=Tôi làm từ 9 giờ đến 6 giờ.|집에서 학교까지 멀어요.=Từ nhà đến trường xa.
`,
3: `
V-(으)려고 하다|Định, dự định|Gốc có patchim + 으려고.|방학에 한국에 가려고 해요.=Kỳ nghỉ tôi định đi Hàn.|운동을 시작하려고 해요.=Tôi định bắt đầu tập thể dục.
V-(으)려고|Để (mục đích)|Vế sau không dùng mệnh lệnh, rủ rê.|한국 회사에 취직하려고 한국어를 배워요.=Tôi học tiếng Hàn để xin việc ở công ty Hàn.|살을 빼려고 저녁을 안 먹어요.=Tôi không ăn tối để giảm cân.
V-기로 하다|Quyết định|Thường ở quá khứ -기로 했어요.|담배를 끊기로 했어요.=Tôi đã quyết định bỏ thuốc.|친구와 같이 여행하기로 했어요.=Tôi đã quyết định đi du lịch với bạn.
A/V-기 때문에, N 때문에|Vì|Không dùng với mệnh lệnh, rủ rê ở vế sau.|비가 오기 때문에 집에 있어요.=Vì mưa nên tôi ở nhà.|시험 때문에 바빠요.=Bận vì kỳ thi.
V-(으)ㄴ 적이 있다/없다|Đã từng / chưa từng|Thường đi với -아/어 보다.|한국에 가 본 적이 있어요.=Tôi đã từng đến Hàn.|이런 음식을 먹은 적이 없어요.=Tôi chưa từng ăn món như thế này.
A/V-(으)면|Nếu, khi|Điều kiện, giả định.|시간이 있으면 같이 가요.=Nếu có thời gian thì đi cùng.|봄이 되면 꽃이 펴요.=Khi xuân đến hoa nở.
A/V-(으)면 좋겠다|Giá mà, ước gì|Mong muốn.|주말에 날씨가 좋으면 좋겠어요.=Mong cuối tuần trời đẹp.|시험에 합격하면 좋겠어요.=Ước gì tôi thi đỗ.
A/V-(으)ㄴ/는데|... nhưng / nên (bối cảnh)|Đưa ra bối cảnh trước khi nói ý chính.|배가 고픈데 뭐 먹을까요?=Đói rồi, ăn gì nhỉ?|비싼데 품질이 좋아요.=Đắt nhưng chất lượng tốt.
V-는 동안|Trong lúc|Hai việc diễn ra cùng khoảng thời gian.|제가 요리하는 동안 청소해 주세요.=Trong lúc tôi nấu ăn bạn dọn dẹp giúp nhé.|방학 동안 아르바이트를 했어요.=Trong kỳ nghỉ tôi làm thêm.
V-면서|Vừa... vừa|Cùng chủ ngữ.|음악을 들으면서 공부해요.=Vừa nghe nhạc vừa học.|걸으면서 전화했어요.=Vừa đi vừa gọi điện.
V-자마자|Ngay sau khi|Hai hành động liên tiếp.|집에 오자마자 잤어요.=Vừa về nhà là ngủ ngay.|졸업하자마자 취직했어요.=Tốt nghiệp xong là đi làm ngay.
A/V-(으)ㄹ 것 같다|Có lẽ, hình như|Phỏng đoán.|비가 올 것 같아요.=Có lẽ trời sẽ mưa.|이 옷이 작을 것 같아요.=Áo này có vẻ chật.
A-아/어 보이다|Trông có vẻ|Nhận xét qua vẻ ngoài.|피곤해 보여요.=Trông bạn có vẻ mệt.|맛있어 보여요.=Trông ngon.
A-아/어지다|Trở nên|Sự thay đổi trạng thái.|날씨가 따뜻해졌어요.=Trời đã ấm lên.|한국어 실력이 좋아졌어요.=Tiếng Hàn đã tốt lên.
V-게 되다|Được, bị, trở nên (kết quả không do chủ ý)|Thay đổi do hoàn cảnh.|한국에서 일하게 됐어요.=Tôi được làm việc ở Hàn.|김치를 좋아하게 됐어요.=Tôi dần thích kim chi.
V-아/어 있다|Đang ở trạng thái|Trạng thái kéo dài sau hành động (thường với nội động từ).|문이 열려 있어요.=Cửa đang mở.|의자에 앉아 있어요.=Đang ngồi trên ghế.
V-고 나서|Sau khi... xong|Nhấn mạnh hoàn thành việc trước.|숙제를 하고 나서 놀아요.=Làm xong bài tập rồi chơi.|밥을 먹고 나서 약을 드세요.=Ăn xong hãy uống thuốc.
V-기 위해서, N을/를 위해서|Để, vì|Mục đích, đi được với mệnh lệnh.|건강을 위해서 운동하세요.=Hãy tập thể dục vì sức khỏe.|합격하기 위해서 열심히 공부해요.=Học chăm để thi đỗ.
V-는 게 좋겠다|Nên... thì hơn|Khuyên nhủ.|병원에 가는 게 좋겠어요.=Bạn nên đi khám thì hơn.|일찍 출발하는 게 좋겠어요.=Nên xuất phát sớm.
V-(으)ㄹ 줄 알다/모르다|Biết / không biết (cách làm)|Kỹ năng.|운전할 줄 알아요?=Bạn biết lái xe không?|요리할 줄 몰라요.=Tôi không biết nấu ăn.
A/V-거든요|... mà (giải thích lý do)|Nêu lý do người nghe chưa biết.|오늘 못 가요. 약속이 있거든요.=Hôm nay tôi không đi được. Tôi có hẹn mà.|이 식당 자주 와요. 맛있거든요.=Tôi hay đến quán này. Ngon mà.
A/V-잖아요|... mà, còn gì (nhắc điều ai cũng biết)|Nhắc lại điều người nghe đã biết.|내일 시험이잖아요.=Mai thi rồi còn gì.|제가 말했잖아요.=Tôi đã nói rồi mà.
V-다가|Đang... thì|Hành động bị chuyển sang việc khác.|집에 가다가 친구를 만났어요.=Đang về nhà thì gặp bạn.|공부하다가 잠이 들었어요.=Đang học thì ngủ quên.
A/V-(으)ㄹ까 봐|Sợ rằng, e là|Lo lắng điều có thể xảy ra.|늦을까 봐 택시를 탔어요.=Sợ muộn nên tôi đi taxi.|잊어버릴까 봐 메모했어요.=Sợ quên nên tôi ghi chú.
A/V-다고 하다|Nói rằng (câu gián tiếp)|Động từ: -ㄴ/는다고; tính từ: -다고; danh từ: -(이)라고.|친구가 바쁘다고 했어요.=Bạn nói là bận.|내일 비가 온다고 해요.=Nghe nói mai trời mưa.
`,
4: `
A/V-(으)ㄹ 뿐만 아니라|Không những... mà còn|Vế sau thường có 도.|이 식당은 맛있을 뿐만 아니라 값도 싸요.=Quán này không chỉ ngon mà còn rẻ.|그는 노래뿐만 아니라 춤도 잘 춰요.=Anh ấy không chỉ hát mà còn nhảy giỏi.
V-도록|Để, sao cho|Mục đích, mức độ.|늦지 않도록 일찍 출발하세요.=Hãy đi sớm để không muộn.|모두 알아들을 수 있도록 천천히 말했어요.=Tôi nói chậm để mọi người nghe hiểu.
A/V-더라도|Dù cho|Giả định; vế sau giữ nguyên ý định.|힘들더라도 포기하지 마세요.=Dù vất vả cũng đừng bỏ cuộc.|비가 오더라도 갈 거예요.=Dù mưa tôi vẫn đi.
V-는 바람에|Vì (dẫn đến kết quả xấu)|Vế sau thường ở quá khứ.|늦잠을 자는 바람에 지각했어요.=Vì ngủ quên nên đi muộn.|차가 막히는 바람에 비행기를 놓쳤어요.=Vì tắc đường nên lỡ máy bay.
A/V-(으)ㄴ/는 반면에|Trái lại|Đối chiếu hai mặt.|도시는 편리한 반면에 공기가 나빠요.=Thành phố tiện lợi nhưng không khí kém.|수입은 늘어난 반면에 지출도 늘었다.=Thu nhập tăng nhưng chi tiêu cũng tăng.
A/V-(으)ㄴ/는 편이다|Thuộc loại, khá là|Nhận xét mang tính tương đối.|저는 매운 음식을 잘 먹는 편이에요.=Tôi thuộc dạng ăn cay giỏi.|이 동네는 조용한 편이에요.=Khu này khá yên tĩnh.
A/V-(으)ㄹ 텐데|Chắc là... (nên)|Phỏng đoán làm nền cho vế sau.|피곤할 텐데 좀 쉬세요.=Chắc bạn mệt, nghỉ chút đi.|길이 막힐 텐데 지하철을 타세요.=Chắc tắc đường, đi tàu điện đi.
V-느라고|Vì mải (làm gì) nên|Cùng chủ ngữ; kết quả tiêu cực.|게임을 하느라고 숙제를 못 했어요.=Mải chơi game nên không làm bài.|일하느라고 점심을 못 먹었어요.=Mải làm nên chưa ăn trưa.
A/V-더니|Thấy... rồi thì (quan sát quá khứ)|Người nói đã quan sát sự thay đổi.|아침에는 흐리더니 오후에는 맑아졌어요.=Sáng âm u, chiều thì đã nắng.|열심히 공부하더니 합격했네요.=Thấy học chăm, giờ đỗ rồi.
A/V-았/었더라면|Giá mà đã|Tiếc nuối về quá khứ.|조금 더 일찍 왔더라면 만났을 거예요.=Giá đến sớm hơn chút thì đã gặp.|열심히 공부했더라면 합격했을 텐데.=Giá mà đã học chăm thì đã đỗ.
V-(으)ㄴ 채로|Trong trạng thái giữ nguyên|Giữ nguyên trạng thái khi làm việc khác.|불을 켠 채로 잤어요.=Tôi ngủ mà vẫn để đèn.|신발을 신은 채로 들어가면 안 돼요.=Không được đi nguyên giày vào.
A/V-(으)ㄹ 정도로|Đến mức|Mức độ.|눈물이 날 정도로 감동했어요.=Cảm động đến mức rơi nước mắt.|못 걸을 정도로 아팠어요.=Đau đến mức không đi được.
A/V-기는 하지만|Thì có... nhưng|Thừa nhận một phần rồi phản bác.|비싸기는 하지만 품질이 좋아요.=Đắt thì có đắt nhưng chất lượng tốt.|어렵기는 하지만 재미있어요.=Khó thì khó nhưng thú vị.
V-아/어 버리다|... mất rồi, ... hết|Hoàn thành hoàn toàn, thường kèm tiếc nuối hoặc nhẹ nhõm.|케이크를 다 먹어 버렸어요.=Ăn hết bánh mất rồi.|비밀을 말해 버렸어요.=Lỡ nói ra bí mật rồi.
V-아/어 놓다/두다|Làm sẵn, để sẵn|Duy trì kết quả để dùng sau.|호텔을 예약해 놓았어요.=Tôi đã đặt sẵn khách sạn.|창문을 열어 두세요.=Hãy để cửa sổ mở.
A/V-(으)ㄹ수록|Càng... càng|Thường đi với -(으)면 ... -(으)ㄹ수록.|한국어는 배울수록 재미있어요.=Tiếng Hàn càng học càng thú vị.|많으면 많을수록 좋아요.=Càng nhiều càng tốt.
N에 비해(서)|So với|So sánh trong văn viết, mô tả số liệu.|작년에 비해 물가가 많이 올랐다.=So với năm ngoái vật giá tăng nhiều.|가격에 비해 품질이 좋다.=So với giá thì chất lượng tốt.
V-(으)ㄴ/는 대로|Ngay khi; theo như|Hai nghĩa: ngay khi / đúng như.|도착하는 대로 연락할게요.=Đến nơi tôi sẽ liên lạc ngay.|들은 대로 말해 주세요.=Hãy nói đúng như đã nghe.
A/V-다면|Nếu như (giả định mạnh)|Giả định ít khả năng xảy ra.|복권에 당첨된다면 세계 여행을 하고 싶어요.=Nếu trúng xổ số tôi muốn đi vòng quanh thế giới.|시간을 되돌릴 수 있다면 좋겠어요.=Giá có thể quay ngược thời gian.
V-는 김에|Nhân tiện|Tận dụng dịp làm việc này để làm việc khác.|시장에 가는 김에 과일도 샀어요.=Nhân tiện đi chợ tôi mua cả hoa quả.|말이 나온 김에 하나 물어볼게요.=Nhân tiện nhắc đến, tôi hỏi một câu.
`,
5: `
A/V-(으)ㄹ 수밖에 없다|Đành phải, tất yếu|Không còn lựa chọn nào khác.|막차가 끊겨서 택시를 탈 수밖에 없었다.=Lỡ chuyến cuối nên đành đi taxi.|노력하지 않으면 실패할 수밖에 없다.=Không cố gắng thì tất yếu thất bại.
A/V-기 마련이다|Vốn dĩ, lẽ thường|Quy luật chung.|누구나 실수하기 마련이다.=Ai cũng có lúc mắc lỗi.|시간이 지나면 잊혀지기 마련이다.=Thời gian trôi thì sẽ quên.
N에 따라(서)|Tùy theo|Biến đổi theo tiêu chí.|지역에 따라 음식 문화가 다르다.=Văn hóa ẩm thực khác nhau tùy vùng.|상황에 따라 결정하겠습니다.=Tôi sẽ quyết định tùy tình hình.
A/V-(으)ㄴ/는 셈이다|Coi như là|Kết luận gần đúng.|일주일에 6일 운동하니까 거의 매일 하는 셈이다.=Tập 6 ngày một tuần coi như ngày nào cũng tập.|월급의 절반을 저축하는 셈이다.=Coi như tiết kiệm một nửa lương.
A/V-(으)ㄴ/는 데 반해|Trái với, trong khi|Đối lập hai đối tượng.|수도권 인구는 증가하는 데 반해 지방 인구는 감소하고 있다.=Dân số vùng thủ đô tăng trong khi địa phương giảm.|남성은 운동을 선호한 데 반해 여성은 여행을 선호했다.=Nam thích thể thao trong khi nữ thích du lịch.
A/V-(으)ㄹ지라도|Dù cho (văn viết)|Mạnh hơn -더라도.|결과가 좋지 않을지라도 최선을 다해야 한다.=Dù kết quả không tốt cũng phải cố hết sức.|어려울지라도 포기하지 않겠다.=Dù khó tôi cũng không bỏ cuộc.
N(으)로 인해(서)|Do, bởi (nguyên nhân)|Văn viết, tin tức.|태풍으로 인해 많은 피해가 발생했다.=Do bão, nhiều thiệt hại đã xảy ra.|스트레스로 인해 건강이 나빠졌다.=Do căng thẳng sức khỏe xấu đi.
V-는 한|Chừng nào còn|Điều kiện tiên quyết.|포기하지 않는 한 기회는 있다.=Chừng nào không bỏ cuộc thì còn cơ hội.|제가 할 수 있는 한 돕겠습니다.=Tôi sẽ giúp trong khả năng có thể.
A/V-(으)ㅁ에도 불구하고|Mặc dù|Nhượng bộ, văn viết.|많은 노력에도 불구하고 실패했다.=Mặc dù nỗ lực nhiều vẫn thất bại.|비가 옴에도 불구하고 경기는 계속되었다.=Mặc dù mưa trận đấu vẫn tiếp tục.
V-기 십상이다|Dễ bị, rất dễ|Kết quả tiêu cực dễ xảy ra.|준비 없이 시작하면 실패하기 십상이다.=Bắt đầu không chuẩn bị thì dễ thất bại.|급하게 먹으면 체하기 십상이다.=Ăn vội dễ bị đầy bụng.
A/V-(으)ㄴ/는 탓에|Tại vì (lỗi do)|Nguyên nhân tiêu cực.|준비가 부족한 탓에 발표를 망쳤다.=Tại chuẩn bị thiếu nên hỏng bài thuyết trình.|날씨가 추운 탓에 손님이 적었다.=Tại trời lạnh nên ít khách.
V-(으)ㄹ 뿐이다|Chỉ là, chỉ|Giới hạn.|저는 제 의견을 말했을 뿐이에요.=Tôi chỉ nói ý kiến của mình.|최선을 다할 뿐이다.=Chỉ còn cách cố hết sức.
A/V-는가 하면|Có khi... nhưng cũng có khi|Liệt kê hiện tượng đối lập.|찬성하는 사람이 있는가 하면 반대하는 사람도 있다.=Có người tán thành, cũng có người phản đối.|성공하는 경우가 있는가 하면 실패하는 경우도 있다.=Có khi thành công, cũng có khi thất bại.
V-(으)ㄹ 게 아니라|Không nên... mà nên|Đề xuất thay thế.|불평만 할 게 아니라 해결책을 찾아야 한다.=Không nên chỉ phàn nàn mà phải tìm giải pháp.|기다릴 게 아니라 먼저 연락해 보세요.=Đừng chờ, hãy liên lạc trước.
A/V-(으)므로|Vì (văn viết trang trọng)|Dùng trong văn bản, thông báo.|비가 많이 왔으므로 행사를 취소합니다.=Do mưa lớn nên hủy sự kiện.|건강이 중요하므로 꾸준히 관리해야 한다.=Vì sức khỏe quan trọng nên phải chăm sóc đều đặn.
`
};

export const GRAMMAR = Object.entries(RAW).flatMap(([level, block]) =>
  block.trim().split('\n').map((line, i) => {
    const [p, m, n, e1, e2] = line.split('|');
    const ex = [e1, e2].filter(Boolean).map(e => { const [ko, vi] = e.split('='); return { ko: ko.trim(), vi: (vi || '').trim() }; });
    return { id: `g${level}-${i + 1}`, level: +level, p: p.trim(), m: m.trim(), n: n.trim(), ex };
  })
);
