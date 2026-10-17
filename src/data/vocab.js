// Từ vựng theo chủ đề. Mỗi dòng: "tiếng Hàn|nghĩa tiếng Việt".
// level: 1 = Sơ cấp 1, 2 = Sơ cấp 2, 3 = Trung cấp 1, 4 = Trung cấp 2, 5 = Cao cấp
const RAW = [
  { id: 'chao-hoi', name: 'Chào hỏi & giao tiếp cơ bản', level: 1, words: `
안녕하세요|Xin chào
안녕히 가세요|Tạm biệt (người ở lại nói)
안녕히 계세요|Tạm biệt (người đi nói)
감사합니다|Cảm ơn
고맙습니다|Cảm ơn
죄송합니다|Xin lỗi (trang trọng)
미안합니다|Xin lỗi
괜찮아요|Không sao
네|Vâng, dạ
아니요|Không
처음 뵙겠습니다|Lần đầu được gặp
만나서 반갑습니다|Rất vui được gặp
잘 부탁드립니다|Mong được giúp đỡ
실례합니다|Xin phép, làm phiền
천만에요|Không có gì
어서 오세요|Xin mời vào
잘 먹겠습니다|Tôi xin phép ăn (trước bữa)
잘 먹었습니다|Tôi đã ăn ngon (sau bữa)
수고하셨습니다|Anh/chị đã vất vả rồi
축하합니다|Chúc mừng
이름|Tên
나이|Tuổi
씨|Anh/chị (gắn sau tên)
저|Tôi (khiêm nhường)
나|Tôi, tớ (thân mật)
우리|Chúng tôi, chúng ta
당신|Bạn, anh, em (thân mật vợ chồng)
누구|Ai
무엇 / 뭐|Cái gì
어디|Ở đâu` },
  { id: 'so-han', name: 'Số đếm Hán Hàn', level: 1, words: `
일|Một (1)
이|Hai (2)
삼|Ba (3)
사|Bốn (4)
오|Năm (5)
육|Sáu (6)
칠|Bảy (7)
팔|Tám (8)
구|Chín (9)
십|Mười (10)
이십|Hai mươi
백|Một trăm
천|Một nghìn
만|Mười nghìn
십만|Một trăm nghìn
백만|Một triệu
억|Một trăm triệu
영 / 공|Số không
원|Won (tiền Hàn)
번|Số (thứ tự, số điện thoại)
층|Tầng
호|Phòng số
분|Phút
년|Năm
월|Tháng
일|Ngày
전화번호|Số điện thoại
몇|Mấy, bao nhiêu
얼마|Bao nhiêu (tiền)` },
  { id: 'so-thuan', name: 'Số thuần Hàn & đơn vị đếm', level: 1, words: `
하나 (한)|Một
둘 (두)|Hai
셋 (세)|Ba
넷 (네)|Bốn
다섯|Năm
여섯|Sáu
일곱|Bảy
여덟|Tám
아홉|Chín
열|Mười
스물 (스무)|Hai mươi
서른|Ba mươi
마흔|Bốn mươi
쉰|Năm mươi
개|Cái, chiếc (đồ vật)
명|Người
분|Vị (người, kính ngữ)
마리|Con (động vật)
권|Quyển
잔|Cốc, chén
병|Chai
장|Tờ, tấm
대|Chiếc (xe, máy)
켤레|Đôi (giày, tất)
벌|Bộ (quần áo)
살|Tuổi
시|Giờ
시간|Tiếng (thời lượng)
번|Lần` },
  { id: 'gia-dinh', name: 'Gia đình', level: 1, words: `
가족|Gia đình
부모님|Bố mẹ
아버지|Bố
어머니|Mẹ
아빠|Bố (thân mật)
엄마|Mẹ (thân mật)
할아버지|Ông
할머니|Bà
형|Anh trai (em trai gọi)
오빠|Anh trai (em gái gọi)
누나|Chị gái (em trai gọi)
언니|Chị gái (em gái gọi)
남동생|Em trai
여동생|Em gái
동생|Em
형제|Anh em
아들|Con trai
딸|Con gái
남편|Chồng
아내|Vợ
부부|Vợ chồng
아이|Đứa trẻ
아기|Em bé
손자|Cháu trai (nội/ngoại)
손녀|Cháu gái
삼촌|Chú
이모|Dì
고모|Cô
사촌|Anh chị em họ
친척|Họ hàng` },
  { id: 'nghe-nghiep', name: 'Nghề nghiệp', level: 1, words: `
직업|Nghề nghiệp
학생|Học sinh
대학생|Sinh viên
선생님|Giáo viên
교수|Giáo sư
회사원|Nhân viên công ty
의사|Bác sĩ
간호사|Y tá
약사|Dược sĩ
경찰|Cảnh sát
소방관|Lính cứu hỏa
요리사|Đầu bếp
가수|Ca sĩ
배우|Diễn viên
기자|Phóng viên
작가|Nhà văn
변호사|Luật sư
은행원|Nhân viên ngân hàng
공무원|Công chức
운전기사|Tài xế
농부|Nông dân
주부|Nội trợ
군인|Quân nhân
사업가|Doanh nhân
디자이너|Nhà thiết kế
엔지니어|Kỹ sư
프로그래머|Lập trình viên
통역사|Phiên dịch viên
점원|Nhân viên bán hàng
미용사|Thợ làm tóc` },
  { id: 'quoc-gia', name: 'Quốc gia & ngôn ngữ', level: 1, words: `
나라|Đất nước
한국|Hàn Quốc
베트남|Việt Nam
중국|Trung Quốc
일본|Nhật Bản
미국|Mỹ
영국|Anh
프랑스|Pháp
독일|Đức
러시아|Nga
태국|Thái Lan
호주|Úc
캐나다|Canada
인도|Ấn Độ
필리핀|Philippines
몽골|Mông Cổ
사람|Người
외국인|Người nước ngoài
한국어|Tiếng Hàn
베트남어|Tiếng Việt
영어|Tiếng Anh
중국어|Tiếng Trung
일본어|Tiếng Nhật
말|Lời nói, tiếng
서울|Seoul
하노이|Hà Nội
호찌민|TP. Hồ Chí Minh
부산|Busan` },
  { id: 'do-vat', name: 'Đồ vật quanh ta', level: 1, words: `
책|Sách
공책|Vở
연필|Bút chì
볼펜|Bút bi
지우개|Cục tẩy
가방|Cặp, túi
책상|Bàn học
의자|Ghế
시계|Đồng hồ
안경|Kính mắt
우산|Ô, dù
휴대폰|Điện thoại di động
컴퓨터|Máy tính
노트북|Máy tính xách tay
텔레비전|Tivi
냉장고|Tủ lạnh
에어컨|Điều hòa
창문|Cửa sổ
문|Cửa
열쇠|Chìa khóa
지갑|Ví
사진|Ảnh
신문|Báo
편지|Thư
선물|Quà
칠판|Bảng
사전|Từ điển
달력|Lịch
침대|Giường
거울|Gương` },
  { id: 'thoi-gian', name: 'Thời gian: ngày, tháng, thứ', level: 1, words: `
오늘|Hôm nay
어제|Hôm qua
내일|Ngày mai
모레|Ngày kia
그저께|Hôm kia
아침|Buổi sáng
점심|Buổi trưa
저녁|Buổi tối
밤|Đêm
오전|Buổi sáng (AM)
오후|Buổi chiều (PM)
월요일|Thứ Hai
화요일|Thứ Ba
수요일|Thứ Tư
목요일|Thứ Năm
금요일|Thứ Sáu
토요일|Thứ Bảy
일요일|Chủ Nhật
주말|Cuối tuần
평일|Ngày thường
요일|Thứ (trong tuần)
이번 주|Tuần này
지난주|Tuần trước
다음 주|Tuần sau
이번 달|Tháng này
올해|Năm nay
작년|Năm ngoái
내년|Năm sau
생일|Sinh nhật
지금|Bây giờ
매일|Mỗi ngày
항상|Luôn luôn
자주|Thường xuyên
가끔|Thỉnh thoảng
보통|Thường thường` },
  { id: 'do-an', name: 'Đồ ăn & thức uống', level: 1, words: `
음식|Món ăn
밥|Cơm
빵|Bánh mì
국|Canh
김치|Kim chi
비빔밥|Cơm trộn
불고기|Thịt bò xào kiểu Hàn
김밥|Cơm cuộn rong biển
라면|Mì ramen
떡볶이|Bánh gạo cay
냉면|Mì lạnh
삼겹살|Thịt ba chỉ nướng
고기|Thịt
소고기|Thịt bò
돼지고기|Thịt lợn
닭고기|Thịt gà
생선|Cá (thực phẩm)
계란 / 달걀|Trứng
야채 / 채소|Rau
과일|Hoa quả
사과|Táo
바나나|Chuối
딸기|Dâu tây
포도|Nho
수박|Dưa hấu
물|Nước
커피|Cà phê
차|Trà
우유|Sữa
주스|Nước ép
맥주|Bia
소주|Rượu soju
쌀국수|Phở` },
  { id: 'dia-diem', name: 'Địa điểm', level: 1, words: `
집|Nhà
학교|Trường học
회사|Công ty
병원|Bệnh viện
약국|Hiệu thuốc
은행|Ngân hàng
우체국|Bưu điện
시장|Chợ
마트|Siêu thị
편의점|Cửa hàng tiện lợi
백화점|Trung tâm thương mại
식당|Nhà hàng, quán ăn
카페|Quán cà phê
도서관|Thư viện
공원|Công viên
영화관|Rạp chiếu phim
서점|Hiệu sách
호텔|Khách sạn
공항|Sân bay
역|Ga
지하철역|Ga tàu điện ngầm
버스 정류장|Bến xe buýt
화장실|Nhà vệ sinh
교실|Phòng học
사무실|Văn phòng
대사관|Đại sứ quán
미용실|Tiệm làm tóc
노래방|Phòng hát karaoke
여기|Ở đây
거기|Ở đó
저기|Ở kia
앞|Phía trước
뒤|Phía sau
옆|Bên cạnh
위|Bên trên
아래 / 밑|Bên dưới
안|Bên trong
밖|Bên ngoài` },
  { id: 'dong-tu-1', name: 'Động từ cơ bản', level: 1, words: `
가다|Đi
오다|Đến
먹다|Ăn
마시다|Uống
자다|Ngủ
일어나다|Thức dậy
보다|Xem, nhìn
듣다|Nghe
읽다|Đọc
쓰다|Viết; dùng
말하다|Nói
이야기하다|Nói chuyện
공부하다|Học
일하다|Làm việc
만나다|Gặp
사다|Mua
팔다|Bán
주다|Cho, đưa
받다|Nhận
앉다|Ngồi
서다|Đứng
알다|Biết
모르다|Không biết
좋아하다|Thích
싫어하다|Ghét
하다|Làm
있다|Có, ở
없다|Không có
배우다|Học (kỹ năng)
가르치다|Dạy
놀다|Chơi
쉬다|Nghỉ ngơi
기다리다|Chờ đợi
만들다|Làm ra, chế tạo
씻다|Rửa
입다|Mặc
열다|Mở
닫다|Đóng
타다|Đi (xe), cưỡi
걷다|Đi bộ` },
  { id: 'tinh-tu-1', name: 'Tính từ cơ bản', level: 1, words: `
좋다|Tốt
나쁘다|Xấu, tồi
크다|To
작다|Nhỏ
많다|Nhiều
적다|Ít
길다|Dài
짧다|Ngắn
높다|Cao
낮다|Thấp
비싸다|Đắt
싸다|Rẻ
덥다|Nóng (thời tiết)
춥다|Lạnh (thời tiết)
따뜻하다|Ấm áp
시원하다|Mát mẻ
뜨겁다|Nóng (vật)
차갑다|Lạnh (vật)
맛있다|Ngon
맛없다|Không ngon
재미있다|Thú vị, vui
재미없다|Chán
바쁘다|Bận
한가하다|Rảnh rỗi
예쁘다|Đẹp, xinh
멋있다|Ngầu, đẹp
아프다|Đau, ốm
피곤하다|Mệt mỏi
어렵다|Khó
쉽다|Dễ
빠르다|Nhanh
느리다|Chậm
가깝다|Gần
멀다|Xa
조용하다|Yên tĩnh
시끄럽다|Ồn ào
깨끗하다|Sạch sẽ
더럽다|Bẩn` },
  { id: 'mau-sac', name: 'Màu sắc', level: 1, words: `
색 / 색깔|Màu sắc
빨간색|Màu đỏ
주황색|Màu cam
노란색|Màu vàng
초록색|Màu xanh lá
파란색|Màu xanh dương
남색|Màu chàm
보라색|Màu tím
분홍색|Màu hồng
하얀색 / 흰색|Màu trắng
검은색 / 까만색|Màu đen
회색|Màu xám
갈색|Màu nâu
하늘색|Màu xanh da trời
금색|Màu vàng kim
은색|Màu bạc` },
  { id: 'co-the', name: 'Cơ thể', level: 1, words: `
몸|Cơ thể
머리|Đầu; tóc
머리카락|Sợi tóc
얼굴|Khuôn mặt
눈|Mắt
코|Mũi
입|Miệng
귀|Tai
이 / 치아|Răng
혀|Lưỡi
입술|Môi
목|Cổ; họng
어깨|Vai
팔|Cánh tay
손|Bàn tay
손가락|Ngón tay
가슴|Ngực
배|Bụng
허리|Eo, thắt lưng
등|Lưng
다리|Chân (cả chân)
무릎|Đầu gối
발|Bàn chân
발가락|Ngón chân
피부|Da` },
  { id: 'dong-vat', name: 'Động vật', level: 1, words: `
동물|Động vật
개|Con chó
고양이|Con mèo
새|Con chim
물고기|Con cá
소|Con bò
돼지|Con lợn
닭|Con gà
말|Con ngựa
토끼|Con thỏ
호랑이|Con hổ
곰|Con gấu
원숭이|Con khỉ
코끼리|Con voi
뱀|Con rắn
쥐|Con chuột
양|Con cừu
오리|Con vịt
나비|Con bướm
개미|Con kiến
거북이|Con rùa
키우다|Nuôi
귀엽다|Dễ thương` },
  { id: 'mua-sam', name: 'Mua sắm & quần áo', level: 2, words: `
쇼핑|Mua sắm
가게|Cửa hàng
가격 / 값|Giá cả
할인|Giảm giá
세일|Giảm giá (sale)
카드|Thẻ
현금|Tiền mặt
영수증|Hóa đơn
계산하다|Thanh toán
교환하다|Đổi hàng
환불하다|Hoàn tiền
사이즈|Kích cỡ
옷|Quần áo
티셔츠|Áo phông
셔츠|Áo sơ mi
바지|Quần
청바지|Quần bò
치마|Váy
원피스|Váy liền
코트|Áo khoác dài
재킷|Áo khoác
양말|Tất
신발|Giày dép
운동화|Giày thể thao
구두|Giày da
모자|Mũ
목도리|Khăn quàng
장갑|Găng tay
귀걸이|Khuyên tai
반지|Nhẫn
목걸이|Vòng cổ
신다|Đi (giày, tất)
쓰다|Đội (mũ), đeo (kính)
끼다|Đeo (nhẫn, găng)
벗다|Cởi
어울리다|Hợp, vừa
크다 / 작다|Rộng / chật (cỡ)` },
  { id: 'giao-thong', name: 'Giao thông', level: 2, words: `
교통|Giao thông
버스|Xe buýt
지하철|Tàu điện ngầm
택시|Taxi
기차|Tàu hỏa
고속버스|Xe buýt cao tốc
비행기|Máy bay
배|Tàu thủy
자동차 / 차|Ô tô
자전거|Xe đạp
오토바이|Xe máy
표|Vé
교통카드|Thẻ giao thông
갈아타다|Chuyển tuyến
내리다|Xuống (xe)
출발하다|Xuất phát
도착하다|Đến nơi
길|Đường
사거리|Ngã tư
신호등|Đèn giao thông
횡단보도|Vạch qua đường
왼쪽|Bên trái
오른쪽|Bên phải
똑바로|Thẳng
건너다|Băng qua
막히다|Tắc (đường)
걸리다|Mất (thời gian)
운전하다|Lái xe
주차장|Bãi đỗ xe
정류장|Bến, trạm
출구|Lối ra
입구|Lối vào
노선도|Bản đồ tuyến` },
  { id: 'thoi-tiet', name: 'Thời tiết & mùa', level: 2, words: `
날씨|Thời tiết
계절|Mùa
봄|Mùa xuân
여름|Mùa hè
가을|Mùa thu
겨울|Mùa đông
맑다|Trong xanh, nắng
흐리다|Âm u
비|Mưa
눈|Tuyết
바람|Gió
구름|Mây
비가 오다|Trời mưa
눈이 오다|Tuyết rơi
바람이 불다|Gió thổi
장마|Mùa mưa dầm
태풍|Bão
기온|Nhiệt độ
도|Độ
습하다|Ẩm
건조하다|Khô
일기예보|Dự báo thời tiết
우산을 쓰다|Che ô
하늘|Bầu trời
햇빛|Ánh nắng
안개|Sương mù
천둥|Sấm
번개|Chớp
쌀쌀하다|Se lạnh
선선하다|Mát mẻ dễ chịu` },
  { id: 'so-thich', name: 'Sở thích & thời gian rảnh', level: 2, words: `
취미|Sở thích
운동|Thể thao, tập thể dục
축구|Bóng đá
야구|Bóng chày
농구|Bóng rổ
배드민턴|Cầu lông
수영|Bơi lội
등산|Leo núi
요가|Yoga
산책|Đi dạo
여행|Du lịch
독서|Đọc sách
음악|Âm nhạc
노래|Bài hát
춤|Điệu nhảy
그림|Tranh
사진을 찍다|Chụp ảnh
요리|Nấu ăn
게임|Trò chơi
영화|Phim điện ảnh
드라마|Phim truyền hình
악기|Nhạc cụ
피아노|Đàn piano
기타|Đàn guitar
낚시|Câu cá
캠핑|Cắm trại
노래하다|Hát
춤을 추다|Nhảy múa
그리다|Vẽ
치다|Chơi (nhạc cụ, bóng)
보통|Thường
시간이 나다|Có thời gian rảnh` },
  { id: 'suc-khoe', name: 'Sức khỏe & bệnh viện', level: 2, words: `
건강|Sức khỏe
병|Bệnh
감기|Cảm cúm
열|Sốt
기침|Ho
콧물|Nước mũi
두통|Đau đầu
배탈|Đau bụng (rối loạn tiêu hóa)
알레르기|Dị ứng
상처|Vết thương
약|Thuốc
처방전|Đơn thuốc
진찰|Khám bệnh
주사|Tiêm
입원하다|Nhập viện
퇴원하다|Xuất viện
수술|Phẫu thuật
응급실|Phòng cấp cứu
환자|Bệnh nhân
보험|Bảo hiểm
아프다|Đau
다치다|Bị thương
낫다|Khỏi bệnh
감기에 걸리다|Bị cảm
약을 먹다|Uống thuốc
쉬다|Nghỉ ngơi
조심하다|Cẩn thận
어지럽다|Chóng mặt
토하다|Nôn
붓다|Sưng` },
  { id: 'nha-o', name: 'Nhà ở', level: 2, words: `
아파트|Chung cư
주택|Nhà riêng
원룸|Phòng đơn (studio)
기숙사|Ký túc xá
하숙집|Nhà trọ có nấu ăn
방|Phòng
거실|Phòng khách
부엌|Bếp
욕실|Phòng tắm
베란다|Ban công
현관|Tiền sảnh, cửa ra vào
월세|Tiền thuê tháng
전세|Thuê nhà đặt cọc lớn
보증금|Tiền đặt cọc
집주인|Chủ nhà
이사하다|Chuyển nhà
청소하다|Dọn dẹp
빨래하다|Giặt giũ
설거지하다|Rửa bát
쓰레기|Rác
버리다|Vứt bỏ
가구|Đồ nội thất
소파|Sofa
옷장|Tủ quần áo
세탁기|Máy giặt
전자레인지|Lò vi sóng
이웃|Hàng xóm
넓다|Rộng
좁다|Hẹp
편리하다|Tiện lợi` },
  { id: 'nha-hang', name: 'Nhà hàng & gọi món', level: 2, words: `
메뉴|Thực đơn
주문하다|Gọi món
맵다|Cay
짜다|Mặn
달다|Ngọt
시다|Chua
쓰다|Đắng
싱겁다|Nhạt
배고프다|Đói
배부르다|No
목마르다|Khát
반찬|Món ăn kèm
숟가락|Thìa
젓가락|Đũa
그릇|Bát
접시|Đĩa
컵|Cốc
물수건|Khăn ướt
포장|Gói mang về
배달|Giao hàng
예약하다|Đặt trước
자리|Chỗ ngồi
인분|Suất (ăn)
더|Thêm
계산서|Hóa đơn
맛보다|Nếm
끓이다|Đun sôi
굽다|Nướng
볶다|Xào
튀기다|Chiên rán` },
  { id: 'cam-xuc', name: 'Cảm xúc', level: 2, words: `
기분|Tâm trạng
기쁘다|Vui mừng
즐겁다|Vui vẻ
행복하다|Hạnh phúc
슬프다|Buồn
화가 나다|Tức giận
무섭다|Sợ hãi
걱정되다|Lo lắng
긴장되다|Căng thẳng, hồi hộp
외롭다|Cô đơn
심심하다|Buồn chán
부끄럽다|Xấu hổ
놀라다|Ngạc nhiên
답답하다|Bực bội, ngột ngạt
속상하다|Buồn bực
신나다|Hào hứng
설레다|Háo hức, xao xuyến
그립다|Nhớ nhung
보고 싶다|Muốn gặp, nhớ
감동하다|Cảm động
실망하다|Thất vọng
만족하다|Hài lòng
편하다|Thoải mái
불편하다|Bất tiện, khó chịu
귀찮다|Phiền, lười
아쉽다|Tiếc
고민|Nỗi băn khoăn
스트레스|Căng thẳng` },
  { id: 'cong-viec', name: 'Công việc & văn phòng', level: 3, words: `
직장|Nơi làm việc
회의|Cuộc họp
출근하다|Đi làm
퇴근하다|Tan làm
야근하다|Làm thêm giờ buổi tối
휴가|Kỳ nghỉ phép
월급|Lương tháng
연봉|Lương năm
승진하다|Thăng chức
면접|Phỏng vấn
이력서|Sơ yếu lý lịch
자기소개서|Bài tự giới thiệu
지원하다|Ứng tuyển
취직하다|Xin được việc
그만두다|Nghỉ việc
상사|Cấp trên
부하 직원|Cấp dưới
동료|Đồng nghiệp
사장님|Giám đốc
부장님|Trưởng phòng
과장님|Trưởng nhóm
업무|Nghiệp vụ, công việc
보고서|Báo cáo
서류|Giấy tờ
계약|Hợp đồng
거래처|Đối tác
출장|Công tác
일정|Lịch trình
마감|Hạn chót
경력|Kinh nghiệm làm việc
신입 사원|Nhân viên mới
아르바이트|Việc làm thêm
담당하다|Phụ trách
처리하다|Xử lý
협력하다|Hợp tác` },
  { id: 'du-lich', name: 'Du lịch', level: 3, words: `
관광|Tham quan
관광지|Điểm du lịch
여행사|Công ty du lịch
여권|Hộ chiếu
비자|Thị thực
항공권|Vé máy bay
왕복|Khứ hồi
편도|Một chiều
숙소|Chỗ ở
숙박|Lưu trú
체크인|Nhận phòng
체크아웃|Trả phòng
짐|Hành lý
여행 가방|Vali
환전하다|Đổi tiền
기념품|Quà lưu niệm
경치|Phong cảnh
명소|Danh lam
바다|Biển
산|Núi
섬|Đảo
강|Sông
호수|Hồ
축제|Lễ hội
문화재|Di sản văn hóa
안내|Hướng dẫn
가이드|Hướng dẫn viên
일정|Lịch trình
구경하다|Ngắm, tham quan
예약을 취소하다|Hủy đặt chỗ
길을 잃다|Lạc đường
추억|Kỷ niệm
경험하다|Trải nghiệm` },
  { id: 'hoc-tap', name: 'Học tập & đại học', level: 3, words: `
교육|Giáo dục
대학교|Trường đại học
대학원|Cao học
전공|Chuyên ngành
학과|Khoa
학기|Học kỳ
수업|Giờ học
강의|Bài giảng
과제|Bài tập
숙제|Bài tập về nhà
시험|Kỳ thi
중간고사|Thi giữa kỳ
기말고사|Thi cuối kỳ
성적|Thành tích
점수|Điểm số
장학금|Học bổng
등록금|Học phí
졸업하다|Tốt nghiệp
입학하다|Nhập học
휴학하다|Bảo lưu
유학|Du học
유학생|Du học sinh
발표하다|Thuyết trình
토론하다|Thảo luận
복습하다|Ôn bài
예습하다|Chuẩn bị bài
합격하다|Đỗ
불합격하다|Trượt
논문|Luận văn
동아리|Câu lạc bộ
선배|Tiền bối
후배|Hậu bối
학점|Tín chỉ
출석|Điểm danh` },
  { id: 'tinh-cach', name: 'Tính cách & ngoại hình', level: 3, words: `
성격|Tính cách
외모|Ngoại hình
착하다|Hiền lành
친절하다|Tử tế, thân thiện
성실하다|Chăm chỉ, chân thành
부지런하다|Siêng năng
게으르다|Lười biếng
활발하다|Hoạt bát
조용하다|Trầm lặng
꼼꼼하다|Cẩn thận, tỉ mỉ
덜렁대다|Hậu đậu
솔직하다|Thẳng thắn
소극적이다|Thụ động
적극적이다|Tích cực
이기적이다|Ích kỷ
유머 감각|Khiếu hài hước
자신감|Sự tự tin
고집이 세다|Cứng đầu
마음이 넓다|Rộng lượng
키가 크다|Cao
키가 작다|Thấp
날씬하다|Thon thả
뚱뚱하다|Béo
잘생기다|Đẹp trai
귀엽다|Dễ thương
머리가 길다|Tóc dài
눈이 크다|Mắt to
닮다|Giống nhau
인상|Ấn tượng` },
  { id: 'hanh-chinh', name: 'Ngân hàng, bưu điện, thủ tục', level: 3, words: `
계좌|Tài khoản
통장|Sổ tài khoản
비밀번호|Mật khẩu
송금하다|Chuyển tiền
입금하다|Gửi tiền vào
출금하다|Rút tiền
이자|Lãi suất
대출|Khoản vay
환율|Tỷ giá
수수료|Phí dịch vụ
신분증|Giấy tờ tùy thân
외국인 등록증|Thẻ người nước ngoài
신청하다|Đăng ký, nộp đơn
발급하다|Cấp (giấy tờ)
서명하다|Ký tên
작성하다|Điền, soạn
제출하다|Nộp
택배|Chuyển phát
소포|Bưu phẩm
보내다|Gửi
주소|Địa chỉ
우편번호|Mã bưu chính
등기|Thư bảo đảm
번호표|Phiếu số thứ tự
창구|Quầy giao dịch
절차|Thủ tục
기간|Thời hạn
연장하다|Gia hạn` },
  { id: 'moi-truong', name: 'Môi trường', level: 4, words: `
환경|Môi trường
환경 보호|Bảo vệ môi trường
오염|Ô nhiễm
대기 오염|Ô nhiễm không khí
수질 오염|Ô nhiễm nước
미세 먼지|Bụi mịn
지구 온난화|Nóng lên toàn cầu
기후 변화|Biến đổi khí hậu
탄소|Các-bon
배출하다|Thải ra
재활용|Tái chế
분리수거|Phân loại rác
일회용품|Đồ dùng một lần
플라스틱|Nhựa
에너지|Năng lượng
절약하다|Tiết kiệm
낭비하다|Lãng phí
자원|Tài nguyên
친환경|Thân thiện môi trường
생태계|Hệ sinh thái
멸종|Tuyệt chủng
자연재해|Thiên tai
홍수|Lũ lụt
가뭄|Hạn hán
산불|Cháy rừng
줄이다|Giảm
보호하다|Bảo vệ
심각하다|Nghiêm trọng
실천하다|Thực hành
캠페인|Chiến dịch` },
  { id: 'xa-hoi', name: 'Xã hội & truyền thông', level: 4, words: `
사회|Xã hội
문제|Vấn đề
현상|Hiện tượng
인구|Dân số
저출산|Tỷ lệ sinh thấp
고령화|Già hóa
1인 가구|Hộ một người
세대|Thế hệ
갈등|Mâu thuẫn
차별|Phân biệt đối xử
평등|Bình đẳng
복지|Phúc lợi
봉사 활동|Hoạt động tình nguyện
기부하다|Quyên góp
언론|Báo chí, ngôn luận
방송|Phát sóng
뉴스|Tin tức
기사|Bài báo
광고|Quảng cáo
인터넷|Internet
SNS|Mạng xã hội
댓글|Bình luận
악플|Bình luận ác ý
정보|Thông tin
가짜 뉴스|Tin giả
여론|Dư luận
조사|Khảo sát
결과|Kết quả
응답하다|Trả lời (khảo sát)
비율|Tỷ lệ
증가하다|Tăng
감소하다|Giảm
영향을 미치다|Gây ảnh hưởng` },
  { id: 'kinh-te', name: 'Kinh tế', level: 4, words: `
경제|Kinh tế
시장|Thị trường
기업|Doanh nghiệp
산업|Công nghiệp
무역|Thương mại
수출|Xuất khẩu
수입|Nhập khẩu; thu nhập
소비|Tiêu dùng
소비자|Người tiêu dùng
생산|Sản xuất
투자|Đầu tư
주식|Cổ phiếu
물가|Vật giá
인플레이션|Lạm phát
경기|Tình hình kinh tế
불황|Suy thoái
호황|Thịnh vượng
실업|Thất nghiệp
실업률|Tỷ lệ thất nghiệp
취업률|Tỷ lệ có việc làm
일자리|Việc làm
임금|Tiền lương
세금|Thuế
예산|Ngân sách
이익|Lợi nhuận
손해|Thiệt hại
경쟁|Cạnh tranh
성장|Tăng trưởng
창업|Khởi nghiệp
상품|Sản phẩm, hàng hóa` },
  { id: 'cong-nghe', name: 'Khoa học & công nghệ', level: 5, words: `
과학|Khoa học
기술|Kỹ thuật, công nghệ
인공지능|Trí tuệ nhân tạo
로봇|Rô-bốt
자동화|Tự động hóa
정보 통신|Thông tin – truyền thông
빅데이터|Dữ liệu lớn
개인 정보|Thông tin cá nhân
유출되다|Bị rò rỉ
보안|Bảo mật
해킹|Tấn công mạng
연구|Nghiên cứu
개발|Phát triển
발명|Phát minh
발견|Phát hiện
실험|Thí nghiệm
혁신|Đổi mới
발달하다|Phát triển
대체하다|Thay thế
활용하다|Tận dụng, ứng dụng
의존하다|Phụ thuộc
편의성|Tính tiện lợi
부작용|Tác dụng phụ
윤리|Đạo đức
규제|Quy định hạn chế
우주|Vũ trụ
생명 공학|Công nghệ sinh học
가상 현실|Thực tế ảo
전자 상거래|Thương mại điện tử
디지털 격차|Khoảng cách số` },
  { id: 'chinh-tri', name: 'Chính trị & pháp luật', level: 5, words: `
정치|Chính trị
정부|Chính phủ
국회|Quốc hội
대통령|Tổng thống
선거|Bầu cử
투표하다|Bỏ phiếu
정책|Chính sách
제도|Chế độ, thể chế
법|Luật
법률|Pháp luật
헌법|Hiến pháp
권리|Quyền lợi
의무|Nghĩa vụ
시민|Công dân
국민|Nhân dân
범죄|Tội phạm
처벌|Xử phạt
재판|Xét xử
판결|Phán quyết
규정|Quy định
위반하다|Vi phạm
시행하다|Thi hành
도입하다|Đưa vào áp dụng
폐지하다|Bãi bỏ
개정하다|Sửa đổi
외교|Ngoại giao
협정|Hiệp định
공공|Công cộng
행정|Hành chính
여당 / 야당|Đảng cầm quyền / đối lập` },
  { id: 'van-hoa', name: 'Văn hóa & lịch sử', level: 5, words: `
문화|Văn hóa
전통|Truyền thống
역사|Lịch sử
풍습|Phong tục
명절|Ngày lễ truyền thống
설날|Tết Nguyên đán
추석|Tết Trung thu
한복|Hanbok
제사|Lễ cúng tổ tiên
세배|Lạy chào năm mới
예절|Lễ nghi
존댓말|Kính ngữ
반말|Lời nói trống không
왕조|Triều đại
조선|Triều Joseon
훈민정음|Huấn dân chính âm
세종대왕|Vua Sejong
유산|Di sản
박물관|Bảo tàng
예술|Nghệ thuật
공연|Biểu diễn
전시회|Triển lãm
한류|Làn sóng Hàn Quốc
대중문화|Văn hóa đại chúng
다문화|Đa văn hóa
정체성|Bản sắc
계승하다|Kế thừa
보존하다|Bảo tồn
기원|Nguồn gốc
상징하다|Tượng trưng` },
  { id: 'nghi-luan', name: 'Từ dùng trong văn nghị luận (TOPIK 54)', level: 5, words: `
측면|Khía cạnh
관점|Quan điểm
입장|Lập trường
주장하다|Chủ trương, cho rằng
근거|Căn cứ
논란|Tranh cãi
우려|Mối lo ngại
불가피하다|Không thể tránh khỏi
바람직하다|Đáng mong muốn
필수적이다|Thiết yếu
긍정적이다|Tích cực
부정적이다|Tiêu cực
효율적이다|Hiệu quả
장기적|Dài hạn
단기적|Ngắn hạn
요인|Yếu tố
원인|Nguyên nhân
해결책|Giải pháp
방안|Phương án
대책|Đối sách
마련하다|Chuẩn bị, xây dựng
모색하다|Tìm kiếm (giải pháp)
대응하다|Ứng phó
초래하다|Gây ra
야기하다|Dẫn đến
간과하다|Bỏ qua, xem nhẹ
인식|Nhận thức
가치관|Giá trị quan
확산되다|Lan rộng
결론적으로|Tóm lại
반면|Ngược lại
게다가|Hơn nữa
따라서|Do đó
그럼에도 불구하고|Mặc dù vậy` }
];

export const LEVEL_NAMES = { 1: 'Sơ cấp 1', 2: 'Sơ cấp 2', 3: 'Trung cấp 1', 4: 'Trung cấp 2', 5: 'Cao cấp' };

export const TOPICS = RAW.map(t => ({
  ...t,
  words: t.words.trim().split('\n').map(l => {
    const [ko, vi] = l.split('|');
    return { ko: ko.trim(), vi: vi.trim(), level: t.level, topic: t.id };
  })
}));

export const ALL_WORDS = TOPICS.flatMap(t => t.words);
