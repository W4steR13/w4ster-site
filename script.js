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
/* NEXT CHAPTER · отсчёт до начала 30 октября (МСК) */
(() => {
  const timer = document.getElementById('nextChapterTimer');
  if (!timer) return;
  const target = new Date('2026-10-30T00:00:00+03:00').getTime();
  const fields = ['ncDays','ncHours','ncMinutes','ncSeconds'].map(id=>document.getElementById(id));
  function updateCountdown() {
    const remaining = Math.max(0, target - Date.now());
    const total = Math.floor(remaining / 1000);
    const values = [Math.floor(total/86400), Math.floor(total/3600)%24, Math.floor(total/60)%60, total%60];
    fields.forEach((el,index)=>{ if(el) el.textContent=String(values[index]).padStart(2,'0'); });
    if (remaining===0) {
      timer.setAttribute('aria-label', '30 октября наступило');
      clearInterval(tick);
    }
  }
  const tick = setInterval(updateCountdown,1000);
  updateCountdown();
})();

/* Secret release — interactive clue */
document.addEventListener('DOMContentLoaded', () => {
  const trigger=document.querySelector('.nc-reveal-trigger');
  const dialog=document.getElementById('ncHintDialog');
  if(!trigger||!dialog)return;
  const close=()=>{
    dialog.hidden=true;
    document.body.style.overflow='';
    trigger.focus();
  };
  trigger.addEventListener('click',()=>{
    dialog.hidden=false;
    document.body.style.overflow='hidden';
    dialog.querySelector('.nc-hint-close').focus();
  });
  dialog.querySelectorAll('[data-close-hint]').forEach(x=>x.addEventListener('click',close));
  document.addEventListener('keydown',e=>{
    if(dialog.hidden)return;
    if(e.key==='Escape')close();
    if(e.key==='Tab'){
      e.preventDefault();
      dialog.querySelector('.nc-hint-close').focus();
    }
  });
});
