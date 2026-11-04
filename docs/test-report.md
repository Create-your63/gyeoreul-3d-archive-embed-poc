# 실제 테스트 결과

확인일: 2026-11-04 (Asia/Seoul). 환경: ChatGPT 원격 Chrome. 현재 콘텐츠: 사용자가 직접 제공한 겨를의 **부여여고 항공 3DGS** `https://superspl.at/s?id=d7e9d718`. 초기에는 공식 공개 데모(db6ab60b)로 시험했고 이후 실제 학교 장면으로 교체했다.

대상: https://create-your63.github.io/gyeoreul-3d-archive-embed-poc/

## 판정
| 항목 | 결과 | 근거·한계 |
|---|---|---|
| 구현 완료 | 완료 | HTML/CSS/JS와 iframe, 안내·원본 링크·전체화면 요청·재시도 구현 |
| 공개 GitHub 저장소 | 완료 | Create-your63/gyeoreul-3d-archive-embed-poc 신규 생성 |
| GitHub Pages 외부 접속 | 성공 | Pages 설정의 Your site is live 및 실제 URL에서 제목·본문 확인 |
| iframe 문서 연결 | 성공 | 배포 페이지 DOM에서 src=https://superspl.at/s?id=d7e9d718 확인. 3D 성공 의미 아님 |
| 실제 3DGS 표시 | 실패(시험 환경) | 흐린 초기 이미지에 머무름. Failed to create a graphics device |
| 공간 회전·이동·확대 | 미검증 | 렌더링 실패로 조작 결과 판정 불가 |
| 전체화면 | 실패(시험 환경) | requestFullscreen 거부, fullscreenElement null, 대체 안내 표시 |
| 390px 레이아웃 | 부분 검증 | 내부 미리보기 CSS iframe 폭 390px, 본문과 scrollWidth 375px 동일. 실기기나 모바일 에뮬레이션 아님 |
| 실제 스마트폰·터치 | 미검증 | Android/iOS 실기기 미사용 |
| 로딩 안내 | 성공 | 초기 안내·응답 안내·20초 후 대체 안내 확인 |
| 오류 없는지 | 실패 | 뷰어 GPU 생성 오류 발견. 부모 코드 오류는 관찰 범위에서 발견되지 않음 |
| 원본 열람 링크 | 성공(이동) | 링크 클릭으로 새 탭 SuperSplat Viewer 열림. 원본 3D 렌더링은 미확인 |
| 새로고침·직접 접속 | 성공(페이지) | 공개 주소 신규 탭 접속 및 reload 후 제목·본문 유지 |
| 다시 불러오기 | 부분 검증 | 내부 미리보기에서 iframe 재생성·로딩 안내 확인. 공개 URL 별도 재시험 필요 |
| 부여여고 콘텐츠 | 연결 구현 / 조작 미검증 | 사용자 제공 URL 및 학교 안내 반영을 배포 페이지에서 확인. 원본·배포 iframe 모두 그래픽 장치 생성 오류 |
| B 자체 호스팅 | 미구현·미검증 | 권한 있는 Viewer App 패키지 필요 |
| 기관 적용 | 기관 협의 필요 | CMS·CSP·접속정책·접근성·파일 수납 기준 미확인 |
| 추가 승인 필요 | 기관 적용 단계 | 현재 공개 데모 배포에 추가 사용자 승인은 없음 |

## 오류 증거
```
AggregateError: Failed to create a graphics device
https://superspl.at/assets/main-TJqab3mE.js
```
이 오류는 초기 데모와 부여여고의 공개 사이트 iframe·원본 직접 접속에서 관찰했다. 원격 환경의 그래픽 장치 생성 문제와 일치하지만 실제 사용자 PC에서의 성공을 대신 증명하지 않는다. 브라우저 확장 메타데이터 오류도 있었으며 사이트 자체 코드 오류와 구분한다.

[실제 공개 페이지 캡처](github-pages-browser.jpg)는 렌더링 실패 상태이다. 3D가 작동하는 화면으로 사용하지 않는다.

## 완료 조건
- 1차: **미충족**. 페이지 공개 배포 완료, 실제 3D 렌더링·조작 확인 대기.
- 2차: **미충족**. B 방식 미구현.
- 기관 적용: **미판정**. 관리자 협의 필요.

## 후속 확인
실제 PC에서 공개 URL을 열어 장면 표시, 드래그 회전, 휠 확대·축소, 카메라 모드별 이동, 전체화면 진입·해제를 확인한다. 스마트폰은 별도로 기종·OS·브라우저 버전과 터치 동작을 기록한다. 부여여고 장면을 실제 PC·모바일에서 같은 항목으로 시험한다. 외부 임베드의 load 이벤트만으로 성공 판정을 하지 않는다.

## 캐시 처리
장면 교체 직후 index.html은 최신인데 scene-config.js는 이전 데모로 남는 캐시 상태를 관찰하여 script URL에 장면 버전 쿼리 `?v=d7e9d718`을 추가했다. 향후 장면 교체 시 이 버전도 갱신한다.

최종 학교 장면 확인: `/index.html` 직접 접속에서 부여여고 제목·설명·원본 URL·iframe src를 확인했다. 캡처는 이 학교 장면의 렌더링 실패 상태다.
