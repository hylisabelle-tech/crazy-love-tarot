# Project Rules — Sunshine Starter Kit (Light)

MUI 기본 컴포넌트와 디자인 토큰만 담은 라이트 스타터킷.
커스텀 컴포넌트 라이브러리는 포함하지 않으며, MUI 대표 컴포넌트 데모와 토큰 문서만 제공한다.

## Workflow

- 컴포넌트 작업 → `/component-work` Skill이 워크플로우 담당
- 리팩토링 → `refactoring-guide.md` 참조, 기존 스토리 통과 확인
- 룰 수정 시 → `pnpm generate-rules` 실행하여 Storybook 시각화 동기화

## 구성

- **Skills**: `component-work`(Claude), `vdl-visual-asset-prompt`(Codex)
- **Agents**: `ai-slop-fixer`, `stable-layout-auditor`, `typography-auditor`
- **Storybook**: Style(디자인 토큰) · Overview · Components(MUI 대표 컴포넌트 데모)