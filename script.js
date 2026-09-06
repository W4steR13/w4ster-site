document.addEventListener('DOMContentLoaded', () => {
  // Плавная прокрутка якорей
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Интерактивная витрина дискографии
  const rows = document.querySelectorAll('.release-row');
  const previewBox = document.getElementById('previewBox');
  const previewIdle = document.getElementById('previewIdle');
  const previewDisplay = document.getElementById('previewDisplay');
  const previewImg = document.getElementById('previewImg');
  const previewTitle = document.getElementById('previewTitle');

  if (previewBox && rows.length > 0) {
    rows.forEach(row => {
      row.addEventListener('mouseenter', (e) => {
        // Гарантированно берем атрибут именно у самой строки, даже если мышь зашла на <strong>
        const currentTarget = e.currentTarget;
        const rawCover = currentTarget.getAttribute('data-cover');
        const title = currentTarget.getAttribute('data-title');

        if (rawCover) {
          // Корректно экранируем пробелы (например, "Focus Failed.png" -> "Focus%20Failed.png")
          const cleanSrc = encodeURI(rawCover.trim());
          
          previewImg.src = cleanSrc;
          previewTitle.textContent = title || '';

          previewBox.classList.add('has-hover');
          if (previewIdle) previewIdle.classList.remove('active');
          if (previewDisplay) previewDisplay.classList.add('active');
        }
      });

      row.addEventListener('mouseleave', () => {
        previewBox.classList.remove('has-hover');
        if (previewDisplay) previewDisplay.classList.remove('active');
        if (previewIdle) previewIdle.classList.add('active');
        if (previewImg) previewImg.src = '';
      });
    });
  }
});