'use strict';
(() => {
  const config = window.ARCHIVE_SCENE;
  const slot = document.getElementById('frame-slot');
  const status = document.getElementById('viewer-status');
  const wrap = document.getElementById('viewer-wrap');
  const full = document.getElementById('fullscreen');
  let timer;
  function safeUrl(value, embedded) {
    const url = new URL(value, location.href);
    if (url.origin === location.origin && ['http:', 'https:', 'file:'].includes(url.protocol)) return url.href;
    if (url.protocol !== 'https:' || (embedded && url.origin !== 'https://superspl.at')) throw new Error('허용되지 않은 URL');
    return url.href;
  }
  let embedUrl;
  try {
    embedUrl = safeUrl(config.embedUrl, true);
    document.getElementById('original').href = safeUrl(config.originalUrl, false);
    document.getElementById('scene-label').textContent = config.label;
    document.getElementById('record-description').textContent = config.description;
    document.getElementById('scene-notice').textContent = config.notice;
    const title = document.getElementById('record-title');
    title.replaceChildren(document.createTextNode(config.title + ' '));
    if (config.isSample) {
      const badge = document.createElement('span');
      badge.className = 'small-label'; badge.textContent = '콘텐츠 연결 예정'; title.append(badge);
    }
  } catch {
    status.textContent = '장면 설정을 읽지 못했습니다. 원본 열람을 이용해 주세요.';
    document.getElementById('retry').disabled = true;
    full.disabled = true;
    return;
  }
  function loadViewer() {
    clearTimeout(timer);
    status.textContent = '외부 뷰어를 불러오는 중입니다. 3D 표시까지 잠시 기다려 주세요.';
    const frame = document.createElement('iframe');
    frame.title = config.isSample ? '공개 테스트 장면 - 부여여고 콘텐츠 아님' : config.title + ' 3D 공간기록 뷰어';
    frame.allow = 'fullscreen'; frame.allowFullscreen = true;
    frame.referrerPolicy = 'strict-origin-when-cross-origin';
    frame.addEventListener('load', () => {
      // A cross-origin load event does NOT prove rendering or even HTTP success.
      status.textContent = '뷰어 응답을 받았습니다. 실제 3D 표시 여부는 화면에서 확인해 주세요.';
    });
    frame.addEventListener('error', () => {
      status.textContent = '뷰어 연결 오류가 감지되었습니다. 원본 열람을 이용해 주세요.';
    });
    frame.src = embedUrl;
    slot.replaceChildren(frame);
    timer = setTimeout(() => {
      status.textContent = '장면이 보이나요? 계속 흐리거나 비어 있다면 원본 열람 또는 다른 브라우저를 이용해 주세요.';
    }, 20000);
  }
  full.addEventListener('click', async () => {
    if (!document.fullscreenEnabled || !wrap.requestFullscreen) {
      status.textContent = '이 브라우저는 전체화면을 지원하지 않습니다. 원본 열람을 이용해 주세요.';
      return;
    }
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await wrap.requestFullscreen();
    } catch {
      status.textContent = '전체화면이 허용되지 않았습니다. 원본 열람을 이용해 주세요.';
    }
  });
  document.addEventListener('fullscreenchange', () => {
    full.textContent = document.fullscreenElement === wrap ? '전체화면 닫기' : '전체화면 보기';
  });
  document.getElementById('retry').addEventListener('click', loadViewer);
  loadViewer();
})();
