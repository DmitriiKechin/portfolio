let time;
const data = new FormData();

document.addEventListener('DOMContentLoaded', () => {
  time = Date.now();
  console.log('time: ', time);
});

window.addEventListener('beforeunload', () => {
  const endTime = Date.now() - time;
  data.set('time', endTime);

  navigator.sendBeacon(
    'https://script.google.com/macros/s/AKfycbyYBH1xcqz2fQG1tyuLZZgsL63tvhw37OvzYg4eLZ1Uit5K3sZCyOsaiD-RXFGUIDqA/exec',
    data
  );
});
