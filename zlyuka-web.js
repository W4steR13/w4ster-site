/* Злюка — интерактивный хранитель тизера. Без внешних запросов и слежения. */
document.addEventListener('DOMContentLoaded', () => {
  const section = document.getElementById('next-chapter');
  const pet = document.getElementById('ncPet');
  const sprite = document.getElementById('ncPetSprite');
  const button = document.getElementById('ncPetButton');
  const bubble = document.getElementById('ncPetBubble');
  const dismiss = document.getElementById('ncPetDismiss');
  if (!section || !pet || !sprite || !button || !bubble || !dismiss) return;

  const phrases = [
    'Псс... здесь кое-что открылось.',
    'А ты уже заглянул в послание?',
    'Я тут секреты охраняю. Почти.',
    'Не просто так здесь замочки, знаешь ли.',
    'Тихонько нажми на открытую карточку.',
    'Кажется, у этого неба есть секрет.'
  ];
  const daytimePoses = [0, 1, 3, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15];
  const sleepPoses = [16, 18, 19];
  let lastPose = -1;
  let visible = false;
  let speechTimer;
  let poseTimer;
  let sleepTimer;

  const setPose = (index) => {
    sprite.style.backgroundPosition = (index % 4) * 100 / 3 + '% ' + Math.floor(index / 4) * 25 + '%';
    lastPose = index;
  };
  const isNight = () => {
    const h = new Date().getHours();
    return h >= 21 || h < 8;
  };
  const choosePose = () => {
    const poses = isNight() ? sleepPoses : daytimePoses;
    const next = poses[Math.floor(Math.random() * poses.length)];
    setPose(next);
  };
  const say = (message) => {
    if (isNight()) return;
    bubble.textContent = message;
    bubble.hidden = false;
    clearTimeout(speechTimer);
    speechTimer = setTimeout(() => { bubble.hidden = true; }, 5500);
  };
  const heardKey = 'w4ster-zlyuka-greeting-v1';
  const greet = () => {
    if (visible || pet.hidden) return;
    visible = true;
    choosePose();
    // Приветствует один раз за вкладку; не всплывает поверх других разделов.
    if (!isNight() && !sessionStorage.getItem(heardKey)) {
      sessionStorage.setItem(heardKey, '1');
      setTimeout(() => { if (!pet.hidden && section.getBoundingClientRect().bottom > 0) say('Псс... ты видел? Тут кое-что открылось.'); }, 950);
    }
    poseTimer = setInterval(() => { if (!pet.hidden && !document.hidden) choosePose(); }, 55000);
    sleepTimer = setInterval(() => {
      if (!pet.hidden && isNight()) {
        bubble.hidden = true;
        setPose(19);
      }
    }, 60000);
  };

  setPose(isNight() ? 19 : 0);
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { greet(); observer.disconnect(); }
    }, { threshold: 0.18 });
    observer.observe(section);
  } else { greet(); }

  button.addEventListener('click', () => {
    if (isNight()) {
      setPose(19);
      return;
    }
    const message = phrases[Math.floor(Math.random() * phrases.length)];
    say(message);
    choosePose();
  });
  dismiss.addEventListener('click', () => {
    pet.hidden = true;
    clearInterval(poseTimer);
    clearInterval(sleepTimer);
    clearTimeout(speechTimer);
  });
});
