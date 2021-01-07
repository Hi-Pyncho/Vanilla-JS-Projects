(() => {
  const select = document.querySelector('.select-section');
  select.addEventListener('click', () => selectEvent())

  const selectEvent = () => {
    if (event.type == 'click') {
      if (select.classList.contains('closed')) {
        select.classList.replace('closed', 'opened');
      } else {
        select.classList.replace('opened', 'closed');
      }
    }
  }
})()