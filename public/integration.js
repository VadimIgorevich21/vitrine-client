const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRLZXkiOiIxMjAxOWFlNS03ZDIxLTQwZDYtOGY3Mi00ODA5OTI3M2NiOTQiLCJhcHBLZXkiOiJlNWMzY2M5YS02NDRjLTQxOTAtOWRjNi1kMmRhMjQ3MjFkODciLCJ0cmFuc2FjdGlvbklkIjoiNmExMjgzYjAtODliYi00ZmY2LTljNGMtNTU5YTM2MDhlNDIyIiwibG9jYWxlIjoicnUiLCJyZWRpcmVjdFVybCI6bnVsbCwibW9kZSI6IlRFU1QiLCJmbG93SWQiOjYwNiwiZXh0ZXJuYWxVc2VySWQiOiJ1c2VyXzQiLCJhcHBsaWNhbnRJZCI6ImJmNjIwYWI4LTJhOTItNGQ2MC04ZjIyLWZlOTM5NGU5YTljZiIsImlhdCI6MTc3MjYwNTE5NCwiZXhwIjoxNzcyNjA4Nzk0fQ.KET2yIoZafwzjr1EjiLsBAxqUDPoeX1x98-BKGLRZ8M';

(() => {
  const allpassId = 'allpass';
  /** UI actions */
  const setElmsDisplay = (hide, show) => {
    document.getElementById(hide).style.display = 'none';
    document.getElementById(show).style.display = 'block';
  }
  const finishUI = () => {
    setTimeout(() => {
      setElmsDisplay(allpassId, 'start');
      window.Allpass.close();
    }, 10000);
  };

  /** event handlers */
  const onLoad = (e) => {
    console.log('onLoad', e);
    setElmsDisplay('loader', allpassId);
  };
  const onRestart = (e) => {
    console.log('onRestart', e);
    setElmsDisplay('start', 'loader');
  };
  const onStart = (e) => {
    console.log('onStart', e);
  };
  const onPassStep = (e) => {
    console.log('onPassStep', e);
  };
  const onComplete = (e) => {
    console.log('onComplete', e);
    finishUI();
  };
  const onError = (e) => {
    console.log('onError', e);
    finishUI();
  };

  /** initialize Allpass SDK */
  const init = () => {
    window.Allpass.init({
      onLoad,
      onRestart,
      onStart,
      onPassStep,
      onComplete,
      onError,
    }).restart();
  };

  /** create Allpass library */
  const script = document.createElement('script');
  script.src = 'https://unpkg.com/@allpass/web-sdk';
  script.async = true;
  script.onload = () => init();
  document.body.appendChild(script);

  /** start verification process */
  document.getElementById('start').onclick = async () => {
    setElmsDisplay('start', 'loader');
    await window.Allpass.start(accessToken);
  };
})();