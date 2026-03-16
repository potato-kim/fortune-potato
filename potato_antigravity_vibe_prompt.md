
# 🥔 Potato Fortune Cookie
## Antigravity Full‑Stack Vibe Coding Prompt

This document is intended to be pasted directly into an AI coding environment such as **Antigravity** to generate a near‑complete full‑stack application.

---

# Project Overview

Build a playful meme‑style web service called **Potato Fortune Cookie**.

Users press a button to draw a **random potato fortune message**.

Each potato contains a humorous quote based on modified famous quotes, proverbs, or memes rewritten with a **potato theme**.

Users can also submit their own potato quotes and interact with others.

The tone should feel:

- playful
- meme‑driven
- simple
- shareable

Think **Fortune Cookie + Reddit + DCInside humor**.

---

# Core Product Idea

A single button:

**"🥔 감자 뽑기" (Draw Potato)**

When pressed:

1. A random potato fortune appears
2. Users can like it
3. Users can comment
4. Users can share it
5. Users can submit their own potato fortune

---

# Tech Stack Requirements

Frontend

- Next.js (App Router)
- React
- TailwindCSS

Backend

- Node.js
- Express API

Database

- PostgreSQL

ORM

- Prisma

Image generation

- Server generated share card (OG image)

Deployment ready structure.

---

# Core Features

## 1. Random Potato Draw

Main page contains:

Button

```
🥔 감자 뽑기
```

When clicked:

Fetch random potato from database.

Display

- quote
- author
- likes
- comment count

Example

```
🥔 오늘의 감자

"될성부른 감자는
싹부터 다르다."
```

---

# 2. Default Potato Quotes

Seed database with **100 default potato quotes**.

Author should be:

```
Potato Oracle
```

Use meme‑style modified proverbs.

Example

- 될성부른 감자는 싹부터 다르다
- 늦었다고 생각할 때가 이미 감자 삶을 시간이다
- 티끌 모아 감자전
- 감자도 밭이 좋아야 큰다

---

# 3. User Quote Submission

Users can submit their own potato quotes.

Form

- nickname
- password
- message

Rules

- max 120 characters
- potato themed humor preferred

---

# 4. Nickname + Password System

No signup required.

Posting requires:

```
nickname
password
```

Password stored as hash.

Purpose

- edit post
- delete post

This system mimics **DCInside anonymous posting**.

---

# 5. Comments

Each potato quote supports comments.

Comment fields

- nickname
- password
- message

---

# 6. Likes

Each potato message can receive likes.

Users can like once per session.

Likes used for ranking.

---

# 7. Hall of Fame

Page showing most liked potatoes.

Sort options

- most liked
- recent trending

---

# 8. Share Card Generation

Generate shareable image.

Layout example

```
🥔 Potato Fortune Cookie

"늦었다고 생각할 때가
이미 감자 삶을 시간이다."
```

Used for

- Twitter
- Instagram
- Kakao

---

# Database Schema

## Potato

Fields

- id
- message
- author
- likes
- comments_count
- created_at
- is_default

---

## Comment

Fields

- id
- potato_id
- author
- message
- created_at

---

## User

Fields

- nickname
- password_hash
- created_at

---

# API Routes

## Draw Potato

GET

```
/api/potato/random
```

Returns random potato.

---

## Create Potato

POST

```
/api/potato
```

Body

```
nickname
password
message
```

---

## Like Potato

POST

```
/api/potato/:id/like
```

---

## Comment

POST

```
/api/potato/:id/comment
```

---

## Hall of Fame

GET

```
/api/potato/top
```

---

# Frontend Pages

## Home

Random draw button

## Potato Detail

Quote
Likes
Comments

## Submit Potato

Form

## Hall of Fame

Ranking list

---

# UI Style

Design tone

- meme style
- potato theme
- playful
- simple

Use emojis frequently.

Example

🥔 🍟

---

# Future Features

Optional later expansion

- Daily potato
- Potato rarity system
- AI potato generator
- Potato challenge events

---

# Final Instruction

Generate a **complete full‑stack project** implementing:

- Next.js frontend
- Express backend
- PostgreSQL database
- Prisma ORM
- REST API
- Tailwind UI

Include:

- seed script for 100 potato quotes
- hall of fame page
- share card generator

The code should be structured and production ready.
