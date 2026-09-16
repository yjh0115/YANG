# Pull Request Preview 사용법

## 왜 PR마다 웹 주소를 만들지 않나요?

GitHub Pages는 저장소당 하나의 사이트를 배포하는 기능입니다. 현재 이 저장소의 Pages는 `main`의 정식 사이트에 사용되고 있습니다. 동일한 Pages 사이트를 PR Preview 배포에도 사용하면 정식 사이트의 배포 내용이나 설정을 덮어쓸 위험이 있습니다.

정식 사이트를 그대로 보호하면서 PR마다 별도의 공개 웹 주소를 만들려면 별도의 호스팅 서비스가 필요합니다. 이 프로젝트에서는 복잡한 외부 계정, API 토큰, Repository Secret을 사용하지 않기로 했습니다.

대신 GitHub Actions가 **브라우저에서 바로 열 수 있는 단일 HTML 파일**을 만들고 GitHub Artifact로 제공합니다. 로컬 서버나 패키지 설치는 필요하지 않습니다.

## Preview 확인 방법

1. Codex가 작업 브랜치에 변경 사항을 push하고 Pull Request를 생성합니다.
2. PR의 **Checks** 탭에서 **Browser Preview Package / Create browser preview**가 초록색 체크가 될 때까지 기다립니다. workflow를 처음 추가하는 PR에서는 GitHub의 **Actions → Browser Preview Package**에서 작업 브랜치의 `push` 실행을 확인합니다.
3. PR의 **Conversation** 탭으로 돌아갑니다.
4. `github-actions` 봇 댓글에서 **Preview 다운로드**를 클릭합니다.
5. 다운로드한 ZIP 파일의 압축을 풉니다.
6. `quad-lab-preview.html`을 더블 클릭합니다.
7. 실제 브라우저 화면을 확인한 후 문제가 없을 때만 PR을 `main`에 병합합니다.

봇 댓글을 찾기 어렵다면 **Checks → Browser Preview Package → Create browser preview → Summary**에도 다운로드 링크가 있습니다.

### workflow를 처음 추가하는 현재 PR

GitHub의 `pull_request` workflow는 default branch에 workflow 파일이 아직 없을 때 첫 PR 이벤트를 놓칠 수 있습니다. 그래서 이 workflow는 `main`을 제외한 작업 브랜치의 `push`에서도 실행됩니다. 현재 PR에 이 수정 커밋이 올라가면 다음 순서로 확인합니다.

1. 저장소 상단의 **Actions**를 클릭합니다.
2. 왼쪽에서 **Browser Preview Package**를 클릭합니다.
3. 작업 브랜치의 최신 실행을 클릭합니다.
4. **Summary**의 **Preview ZIP 다운로드**를 클릭합니다.

workflow가 이후 default branch에 포함되면 다음 PR부터는 기존 안내처럼 PR의 **Checks**와 봇 댓글에서도 확인할 수 있습니다.

## 자동 갱신과 정리

- PR에 새 커밋이 추가될 때마다 최신 `index.html`, `styles.css`, `app.js`로 Preview 파일을 다시 만듭니다.
- PR 댓글의 다운로드 링크도 가장 최근 실행의 Artifact로 교체합니다.
- Artifact는 GitHub가 7일 후 자동 삭제하므로 별도 정리나 토큰 관리가 필요 없습니다.
- `main` 브랜치, GitHub Pages 설정, 정식 사이트 주소는 workflow가 전혀 수정하지 않습니다.

## Preview에서 확인할 항목

- 홈 화면과 6개 차시 이동
- SVG 꼭짓점 마우스·터치 드래그와 실시간 측정값
- 발견, 개념 정리, 연습, 도전 문제 단계 이동
- 정답·오답 피드백과 단계별 힌트
- 새로고침 후에도 유지되는 `localStorage` 학습 진도
- 데스크톱과 태블릿 너비의 반응형 레이아웃

> GitHub Artifact 다운로드는 저장소를 볼 수 있고 GitHub에 로그인한 사용자에게 제공됩니다. 공개 URL에서 즉시 실행되는 Preview가 꼭 필요해지면 그때 별도 Preview 호스팅 도입을 검토해야 합니다.
