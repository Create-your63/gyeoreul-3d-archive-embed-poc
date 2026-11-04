# 겨를 | 학교 3D 공간기록 웹 열람 시범

공공 기록관리기관 홈페이지에서 SuperSplat 3DGS를 열람하는 비공식 기술 실증입니다. 현재 장면은 PlayCanvas 공식 소개 글의 공개 데모이며 부여여자고등학교 기록이 아닙니다.

## 배포
Settings → Pages → Deploy from a branch → main / (root) → Save. 별도 빌드나 유료 서버가 필요하지 않습니다.

## 장면 교체
scene-config.js의 embedUrl은 SuperSplat Embed 메뉴에서 제공하는 iframe src로 변경합니다. originalUrl·title·label·description·notice도 변경하고 실제 학교 콘텐츠를 연결한 뒤 isSample을 false로 바꿉니다. 공개 허가된 데이터만 사용하세요.

## 파일
index.html: 화면 / styles.css: 반응형 스타일 / app.js: 로딩 안내·재시도·전체화면 / scene-config.js: 장면 설정 / .nojekyll: 정적 배포.

## 검증 상태
2026-11-04: 페이지 구현 완료, GitHub Pages 배포 검증 진행 중. 내부 미리보기의 390px CSS 프레임 레이아웃 점검은 실제 스마트폰 검증이 아닙니다. 원격 브라우저에서 그래픽 장치 생성 오류를 관찰하여 3D 렌더링 성공은 아직 확인하지 못했습니다. 전체화면 요청 거부 시 원본 링크 안내가 표시됩니다.

## 한계
iframe load는 실제 3D 표시 성공을 뜻하지 않습니다. 교차 출처 뷰어 내부 상태를 직접 읽지 않으며 계속 흐리거나 빈 화면이면 원본 링크를 제공합니다. 외부 서비스·장면 삭제와 기기 GPU 성능에 영향을 받습니다.

## 자체 호스팅
Viewer App ZIP 내보내기 결과를 viewer/에 풀고 embedUrl·originalUrl을 ./viewer/index.html로 설정합니다. mode를 self-hosted로 변경하고 안내 문구를 조정합니다. 현재 자체 호스팅은 미구현·미검증입니다. 데모 데이터의 재호스팅 권한을 가정하지 않습니다.

## 공식 근거
- [공식 임베드 안내](https://developer.playcanvas.com/user-manual/supersplat/scene-page/)
- [Viewer App 자체 호스팅](https://developer.playcanvas.com/user-manual/supersplat/viewer/self-hosting/)
- [데모 출처](https://blog.playcanvas.com/supersplat-3dgs-viewer-is-now-open-source/)
- [GitHub Pages 제한](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits)
