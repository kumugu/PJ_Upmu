# 업무 체크리스트 PWA 시스템 (작업중)

> 근무 일정, 업무 체크리스트, 이슈 관리 및 실시간 업무 상태 공유 기능을 제공하는 효율적인 업무 관리 플랫폼

## 프로젝트 개요

업무 체크리스트 효율적으로 업무를 관리할 수 있도록 설계된 Progressive Web App입니다. 모바일과 PC 환경에서 모두 원활하게 동작하며, 오프라인 환경에서도 기본 기능을 사용할 수 있습니다.

### 주요 목표
- 근무 일정 관리 및 시각화
- 실시간 업무 체크리스트 수행
- 이슈 발생 시 즉각적인 대응 체계
- 크로스 플랫폼 지원 (모바일/PC)

## 주요 기능

### 인증 시스템
- JWT 기반 로그인 유지
- 이메일 기반 회원가입
- 역할 기반 접근 제어

### 대시보드
- 금일 근무 상태 요약
- 실시간 공지사항 표시
- 미해결 이슈 현황

### 근무 스케줄
- 월간 캘린더 기반 일정 관리
- 근무 종류별 색상 구분
- 날짜별 상세 정보 (시간, 급여 등)

### 업무 실행
- 시간별 체크리스트 자동 생성
- 알림 기반 업무 안내
- 실시간 이슈 등록 및 추적

### 업무 현황
- 근무 기록 이력 조회 및 통계
- 체크리스트 수행 통계
- 이슈 처리 내역 관리

### 개인 설정
- 알림 설정 관리
- 테마 및 언어 설정
- 사용자 정보 수정

## 시스템 아키텍처

```
┌─────────────────┐    API 호출    ┌──────────────────┐
│   PWA Client    │ ───────────► │   Supabase       │
│   (Next.js)     │              │   (PostgreSQL +  │
│                 │              │    Auth +        │
│   Service       │              │    Storage)      │
│   Worker        │              │                  │
└─────────────────┘              └──────────────────┘
        │
        ▼
┌─────────────────┐
│ Notification    │
│ API             │
└─────────────────┘
```

## 데이터베이스 설계

### ERD 구조
```
Users ──────► Shifts ──────► Tasks
  │              │              │
  ▼              │              ▼
Settings         ▼          Issues
                Notices
```

### 주요 테이블

#### Users (사용자)
- `id` (PK) - 사용자 고유 ID
- `name` - 사용자 이름
- `email` - 이메일 (로그인 ID)
- `role` - 역할 (admin/staff)
- `created_at` - 생성일시

#### Shifts (근무)
- `id` (PK) - 근무 고유 ID
- `user_id` (FK) - 사용자 ID
- `date` - 근무 날짜
- `shift_type` - 근무 유형 (day/night)
- `start_time`, `end_time` - 근무 시간
- `pay` - 급여
- `status` - 상태 (scheduled/completed)

#### Tasks (업무)
- `id` (PK) - 업무 고유 ID
- `shift_id` (FK) - 근무 ID
- `title` - 업무 제목
- `scheduled_time` - 예정 시간
- `is_checked` - 완료 여부
- `checked_at` - 완료 시간

#### Issues (이슈)
- `id` (PK) - 이슈 고유 ID
- `shift_id` (FK) - 근무 ID
- `task_id` (FK, nullable) - 업무 ID
- `description` - 이슈 내용
- `status` - 상태 (open/resolved)
- `created_at` - 발생일시
- `resolved_at` - 해결일시

## 기술 스택

### Frontend
- **Next.js 15** - App Router 사용
- **TypeScript** - 타입 안전성 보장
- **TailwindCSS** - 유틸리티 우선 CSS
- **shadcn/ui** - 재사용 가능한 UI 컴포넌트

### Backend & Database
- **Supabase** - PostgreSQL + 실시간 구독
- **Supabase Auth** - 사용자 인증
- **Next.js API Routes** - 서버사이드 로직

### PWA & 알림
- **Service Worker** - 오프라인 지원
- **Web Notification API** - 브라우저 푸시 알림
- **React Big Calendar** - 캘린더 UI

### 배포 & 호스팅
- **Vercel** - 프론트엔드 배포
- **Supabase Cloud** - 백엔드 서비스

## 개발 로드맵

### Phase 1: 기본 인프라 (2주)
- [x] 프로젝트 초기 설정
- [x] Supabase 연동 및 데이터베이스 구성
- [x] 사용자 인증 시스템 구현

### Phase 2: 핵심 기능 (3주)
- [ ] 대시보드 구현
- [ ] 근무 스케줄 캘린더
- [ ] 업무 체크리스트 실행

### Phase 3: 고급 기능 (2주)
- [ ] 이슈 관리 시스템
- [ ] 업무 현황 조회
- [ ] 알림 시스템

### Phase 4: 최적화 & 배포 (1주)
- [ ] PWA 최적화
- [ ] 성능 개선
- [ ] 배포 및 테스트

## 📱 설치 및 실행

### 사전 요구사항
- Node.js 18 이상
- npm 또는 yarn
- Supabase 계정

### 로컬 개발 환경 설정

```bash
# 저장소 클론
git clone https://github.com/kumugu/PJ_Upmu.git
cd upmu

# 의존성 설치
npm install

# 환경 변수 설정
cp .env.example .env.local
# .env.local 파일에 Supabase 설정 추가

# 개발 서버 실행
npm run dev
```

### 환경 변수 설정
```env
(준비중)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

## 테스트

```bash
# 단위 테스트 실행
npm run test

# E2E 테스트 실행
npm run test:e2e

# 커버리지 확인
npm run test:coverage
```

## 배포

### Vercel 배포
```bash
# Vercel CLI 설치
npm install -g vercel

# 배포
vercel --prod
```

### PWA 빌드
```bash
# 프로덕션 빌드
npm run build

# PWA 매니페스트 생성
npm run generate-manifest
```

## 향후 확장 계획

### v2.0 계획
- [ ] 업무 내용 생성(추가, 수정, 삭제 기능)
- [ ] 다국어 지원 (i18n)
- [ ] 관리자 통계 대시보드
- [ ] PDF 리포트 생성
- [ ] 실시간 채팅 시스템

### v3.0 계획
- [ ] 모바일 네이티브 앱 (Capacitor)
- [ ] AI 기반 업무 추천
- [ ] 고급 분석 및 인사이트

---
