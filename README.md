# 겨를 | 학교 3D 공간기록 웹 열람 시범

공공 기록관리기관 홈페이지에서 SuperSplat 3DGS를 열람하는 비공식 기술 실증입니다. 현재 장면은 사용자가 제공한 겨를의 부여여자고등학교 항공 3DGS입니다. 원본: https://superspl.at/s?id=d7e9d718

## 배포
Settings → Pages → Deploy from a branch → main / (root) → Save. 별도 빌드나 유료 서버가 필요하지 않습니다.

## 장면 교체
scene-config.js의 embedUrl은 SuperSplat Embed 메뉴에서 제공하는 iframe src로 변경합니다. originalUrl·title·label·description·notice도 변경하고 실제 학교 콘텐츠를 연결한 뒤 isSample을 false로 바꿉니다. index.html의 scene-config.js 버전 쿼리도 갱신합니다. 공개 허가된 데이터만 사용하세요.

## 파일
index.html: 화면 / styles.css: 반응형 스타일 / app.js: 로딩 안내·재시도·전체화면 / scene-config.js: 장면 설정 / .nojekyll: 정적 배포.

## 검증 상태
2026-11-04: 페이지 구현 및 GitHub Pages 공개 배포 완료. 공개 URL 직접 접속·페이지 새로고침·원본 열람 링크 새 탭 열림을 확인했습니다. 내부 미리보기의 390px CSS 프레임 레이아웃 점검은 실제 스마트폰 검증이 아닙니다. 원격 브라우저에서 그래픽 장치 생성 오류를 관찰하여 3D 렌더링 성공은 아직 확인하지 못했습니다. 전체화면 요청 거부 시 원본 링크 안내가 표시됩니다.

## 한계
iframe load는 실제 3D 표시 성공을 뜻하지 않습니다. 교차 출처 뷰어 내부 상태를 직접 읽지 않으며 계속 흐리거나 빈 화면이면 원본 링크를 제공합니다. 외부 서비스·장면 삭제와 기기 GPU 성능에 영향을 받습니다.

## 자체 호스팅
Viewer App ZIP 내보내기 결과를 viewer/에 풀고 embedUrl·originalUrl을 ./viewer/index.html로 설정합니다. mode를 self-hosted로 변경하고 안내 문구를 조정합니다. 현재 자체 호스팅은 미구현·미검증입니다. B 방식에는 별도로 Viewer App 내보내기 파일이 필요합니다.

## 공식 근거
- [공식 임베드 안내](https://developer.playcanvas.com/user-manual/supersplat/scene-page/)
- [Viewer App 자체 호스팅](https://developer.playcanvas.com/user-manual/supersplat/viewer/self-hosting/)
- [초기 테스트 데모 출처](https://blog.playcanvas.com/supersplat-3dgs-viewer-is-now-open-source/)
- [GitHub Pages 제한](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits)


## 결과물
- [실제 공개 사이트](https://create-your63.github.io/gyeoreul-3d-archive-embed-poc/)
- [테스트 결과](docs/test-report.md)
- [기관 전달용 1페이지 기술 검토서](docs/technical-review.pdf)
- [브라우저 캡처: 렌더링 실패 상태](docs/github-pages-browser.jpg)

현재 1차 완료 조건(배포 URL에서 실제 3D 작동 확인)은 충족하지 않았습니다. 공개 배포와 3D 작동 성공은 별개입니다. 2차 자체 호스팅 및 기관 적용도 미완료입니다.

## 두 호스팅 방식 비교
| 항목 | A 외부 임베드 | B 자체 호스팅 |
|---|---|---|
| 구현 | iframe 연결, 현재 구현 | Viewer App HTML/ZIP 배포, 미구현 |
| 데이터 위치 | 외부 SuperSplat 서비스 | 선택한 GitHub/기관 서버 |
| 유지관리 | 링크·서비스 상태 확인 | 뷰어 버전·보안 패치·파일 백업 |
| 지속성 | 외부 계정·서비스·장면 삭제 영향 | 독립 보존 가능, 호스팅 운영은 필요 |
| 용량 | 페이지는 작고 장면은 외부 정책 적용 | 일반 Git 개별 파일 100MiB, Pages 전체 1GB·월 대역폭 100GB 소프트 한도 |
| 기관 적용 | 외부 접속·iframe 허용 협의 | 정적 배포·권한·보안·유지관리 협의 |

Git LFS는 GitHub Pages에서 지원되지 않습니다. Pages는 상업 거래나 상용 SaaS 운영을 위한 무료 호스팅으로 허용되지 않으므로, 본 페이지는 비거래 기술 실증으로 유지합니다. 실제 서비스 운영에는 별도 호스트 검토가 필요합니다.

기관 홈페이지 내부 설정은 확인하지 못했습니다. iframe 허용 여부, CSP, 외부 도메인/CDN, 정적 파일 배포, 웹 접근성, 원본 납품·보존 기준은 **기관 협의 필요**입니다.

추가 공식 근거:
- [일반 Git 파일 제한](https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-large-files-on-github)
- [Pages의 LFS 미지원](https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-git-large-file-storage)
- [iframe load 이벤트의 한계](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/iframe)
- [CSP frame-ancestors](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/frame-ancestors)
