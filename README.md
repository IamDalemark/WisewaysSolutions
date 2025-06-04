# WISEWAYS SOLUTIONS

## Getting Started

First, install dependencies

```bash
npm i
```

add .env at the root folder

```bash
NEXT_PUBLIC_SUPABASE_URL="your supabase URL"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your supabase anon key"
```

run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Linting

```bash
npm run lint
```

## Testing

```bash
NEXT_PUBLIC_SUPABASE_URL_TEST="your supabase URL"
NEXT_PUBLIC_SUPABASE_ANON_KEY_TEST="your supabase anon key"
```

### Storybook

```bash
npm run storybook
```

### jest

run development server on Port: 3000

```bash
npm run test
```

### cypress (e2e)

run development server on Port: 3000

```bash
npx cypress open
```
