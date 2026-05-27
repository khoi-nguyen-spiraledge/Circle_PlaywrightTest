# Playwright + CircleCI Login Test Demo

Project này gồm 2 phần:

1. Demo Login Web App bằng NodeJS + Express
2. Playwright Automation Test + CircleCI config

Mục tiêu:

- Khi release, CircleCI chạy login test.
- Test pass thì pipeline pass, có thể release.
- Test fail thì pipeline fail, block release.
- Hỗ trợ chạy trên CircleCI self-hosted runner cho web nội bộ/chưa có domain.

## Cấu trúc project

```txt
playwright-circleci-login-test/
├── app/
│   ├── index.html
│   ├── login.html
│   ├── dashboard.html
│   ├── style.css
│   └── server.js
├── tests/
│   └── login.spec.ts
├── pages/
│   └── LoginPage.ts
├── utils/
│   └── env.ts
├── .circleci/
│   └── config.yml
├── playwright.config.ts
├── package.json
├── tsconfig.json
├── .env.example
├── .gitignore
└── README.md
```

## Account demo

```txt
Username: testuser
Password: 123456
```

## Cài đặt

```bash
npm install
npx playwright install
```

## Tạo file env

```bash
cp .env.example .env
```

Nội dung mẫu:

```env
BASE_URL=http://127.0.0.1:3000
LOGIN_USERNAME=testuser
LOGIN_PASSWORD=123456
```

## Chạy demo app

```bash
npm run app
```

Mở browser:

```txt
http://127.0.0.1:3000
```

## Chạy test local

Mở terminal 1:

```bash
npm run app
```

Mở terminal 2:

```bash
npm run test:login
```

Hoặc chạy app + test cùng lúc:

```bash
npm run ci:test
```

## Xem HTML report

```bash
npm run report
```

## CircleCI

File config nằm tại:

```txt
.circleci/config.yml
```

Flow:

```txt
Push main/release branch
        ↓
CircleCI trigger pipeline
        ↓
Start demo login app
        ↓
Run Playwright login test
        ↓
PASS → release OK
FAIL → block release
```

## CircleCI Self-hosted Runner

Nếu web của bạn chưa có domain và chỉ chạy trong mạng nội bộ, nên cài CircleCI self-hosted runner trên server có thể truy cập web đó.

Ví dụ URL nội bộ:

```env
BASE_URL=http://192.168.1.40:3000
```

Sau khi tạo runner trong CircleCI, sửa dòng này trong `.circleci/config.yml`:

```yaml
resource_class: your-namespace/your-runner
```

Thành resource class thật của bạn.

## Ghi chú cho project thật

Với web thật, bạn chỉ cần sửa:

```env
BASE_URL=http://your-internal-server:port
LOGIN_USERNAME=your_username
LOGIN_PASSWORD=your_password
```

Nếu selector login page khác demo, sửa trong:

```txt
pages/LoginPage.ts
```

Ví dụ:

```ts
readonly usernameInput = this.page.locator('#username');
readonly passwordInput = this.page.locator('#password');
readonly loginButton = this.page.locator('#login-button');
```
