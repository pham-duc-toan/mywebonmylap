function timeBasedRandom() {
  // Lấy giá trị thời gian chính xác đến micro giây
  const time = performance.now(); // Trả về thời gian dưới dạng số thực, với phần thập phân là micro giây.

  // Lấy phần nguyên của thời gian để tạo seed ban đầu
  const integerPart = Math.floor(time);

  // Lấy phần thập phân của thời gian (phần micro giây) để thêm tính ngẫu nhiên
  const fractionalPart = time - integerPart;

  // Tạo giá trị ngẫu nhiên dựa trên phần nguyên và phần thập phân, chuyển đổi thành giá trị giữa 0 và 1
  const randomValue = (Math.sin(integerPart) * 10000 + fractionalPart) % 1;

  return randomValue;
}
i = 0;
while (i < 10) {
  console.log(timeBasedRandom());
  i += 1;
}
