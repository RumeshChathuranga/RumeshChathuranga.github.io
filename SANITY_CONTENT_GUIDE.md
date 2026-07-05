# 🚀 Sanity CMS - Complete Setup & Content Guide

This guide walks you through setting up your Sanity CMS project from scratch and populating your portfolio with content.

---

## Table of Contents

1. [Create a Sanity Project](#1-create-a-sanity-project)
2. [Configure Your Project IDs](#2-configure-your-project-ids)
3. [Generate an API Token](#3-generate-an-api-token)
4. [Start Sanity Studio](#4-start-sanity-studio)
5. [Add CORS Origin](#5-add-cors-origin)
6. [Adding Content](#6-adding-content)
   - [About Section](#61-about-section)
   - [Works/Projects](#62-worksprojects)
   - [Skills](#63-skills)
   - [Experiences](#64-experiences)
   - [Testimonials](#65-testimonials)
   - [Brands](#66-brands)
7. [Start the Frontend](#7-start-the-frontend)
8. [Deployment](#8-deployment)

---

## 1. Create a Sanity Project

### Option A: Via Sanity Website (Recommended for Beginners)

1. Go to [https://www.sanity.io/manage](https://www.sanity.io/manage)
2. Log in with your Sanity account (Google, GitHub, or email)
3. Click **"Create new project"**
4. Enter a project name: e.g., `Rumesh Portfolio`
5. Choose the **Free plan** (Generous for portfolios)
6. A **dataset** named `production` will be auto-created
7. Copy your **Project ID** from the project dashboard (it looks like: `abc123xy`)

### Option B: Via CLI

```bash
cd backend_sanity_portfolio
npx sanity login
npx sanity init --project-plan free
```

Follow the prompts and note down your **Project ID**.

---

## 2. Configure Your Project IDs

You need to set your Project ID in **two places**:

### Frontend (.env file in the project root)

Open the file `.env` in the project root directory:

```env
REACT_APP_SANITY_PROJECT_ID=your_actual_project_id
REACT_APP_SANITY_TOKEN=your_api_token_here
```

### Backend (.env file in backend_sanity_portfolio/)

Open the file `backend_sanity_portfolio/.env`:

```env
SANITY_STUDIO_PROJECT_ID=your_actual_project_id
SANITY_STUDIO_DATASET=production
```

> ⚠️ **Important:** Both Project IDs must be **the same**! They point to the same Sanity project.

---

## 3. Generate an API Token

The frontend needs a **token** to read (and write contact form data) from Sanity.

1. Go to [https://www.sanity.io/manage](https://www.sanity.io/manage)
2. Click on your project
3. Go to **API** → **Tokens**
4. Click **"Add API Token"**
5. Configure:
   - **Name:** `Portfolio Frontend`
   - **Permissions:** Select **Editor** (needed for contact form submissions)
6. Click **Save**
7. **Copy the token immediately** — it won't be shown again!
8. Paste it in your `.env` file as `REACT_APP_SANITY_TOKEN`

---

## 4. Start Sanity Studio

Sanity Studio is your **content management dashboard** — this is where you add all your portfolio content.

```bash
cd backend_sanity_portfolio
npm run dev
```

This will start Sanity Studio at **http://localhost:3333**

> 💡 You'll be prompted to log in with the same account you created the project with.

---

## 5. Add CORS Origin

For the frontend to communicate with Sanity, you need to allow its origin.

1. Go to [https://www.sanity.io/manage](https://www.sanity.io/manage) → Your Project
2. Go to **API** → **CORS Origins**
3. Add the following origins:
   - `http://localhost:3000` (for development)
   - `http://localhost:3333` (for Sanity Studio)
   - Your production URL (when you deploy, e.g., `https://yourportfolio.netlify.app`)
4. Check **"Allow credentials"** for each

---

## 6. Adding Content

Open Sanity Studio at **http://localhost:3333** and follow these guides for each section.

### 6.1 About Section

The About section shows cards with titles, descriptions, and images that describe what you do.

| Field | What to Enter | Example |
|-------|---------------|---------|
| **Title** | A short skill/service name | "Web Development" |
| **Description** | Brief description (1-2 sentences) | "I build modern, responsive web applications using React and Node.js" |
| **ImgUrl** | Upload a relevant image/icon | Upload a web dev illustration |

**Recommended:** Add 3-4 about cards. Ideas:
- 🌐 Web Development
- 📱 Mobile Development
- 🎨 UI/UX Design
- 💻 Backend Development

### 6.2 Works/Projects

This is your portfolio showcase — each entry is a project you've built.

| Field | What to Enter | Example |
|-------|---------------|---------|
| **Title** | Project name | "E-Commerce Platform" |
| **Description** | What the project does (1-2 sentences) | "Full-stack e-commerce app with payment integration" |
| **Project Link** | Live demo URL | "https://myproject.vercel.app" |
| **Code Link** | GitHub repository URL | "https://github.com/rumesh/project" |
| **ImageUrl** | Upload a screenshot of the project | Upload a screenshot |
| **Tags** | Categories for filtering | Add tags like: "Web App", "React JS", "UI/UX", "Mobile App" |

> 💡 **Tags are important!** They power the filter buttons on your portfolio. Use these exact tag names to match the filter: `UI/UX`, `Web App`, `Mobile App`, `React JS`

**Recommended:** Add at least 4-6 projects.

### 6.3 Skills

These appear as icon bubbles showing your tech stack.

| Field | What to Enter | Example |
|-------|---------------|---------|
| **Name** | Technology name | "React" |
| **BgColor** | Hex color for the background | "#edf2f8" (light blue) |
| **Icon** | Upload the tech logo/icon | Upload React logo PNG |

**Color suggestions for popular skills:**
| Skill | Suggested BgColor |
|-------|-------------------|
| React | `#edf2f8` |
| JavaScript | `#f0db4f33` |
| TypeScript | `#007acc33` |
| Node.js | `#68a06333` |
| Python | `#306998` |
| HTML | `#e44d2633` |
| CSS | `#264de433` |
| Git | `#f0503233` |
| MongoDB | `#4db33d33` |
| Firebase | `#ffca2833` |

> 💡 **Tip:** You can find tech logo PNGs at [https://devicon.dev/](https://devicon.dev/) or use the ones already in the project's `src/assets/` folder.

### 6.4 Experiences

Experiences show your work history in a timeline format.

#### Step 1: Create Work Experience entries first

Go to **"Work Experience"** in the sidebar and create entries:

| Field | What to Enter | Example |
|-------|---------------|---------|
| **Name** | Job title | "Full Stack Developer" |
| **Company** | Company name | "ABC Technologies" |
| **Desc** | Brief description of your role | "Developed and maintained web applications using React and Node.js" |

#### Step 2: Create Experience entries (timeline years)

Go to **"Experiences"** in the sidebar:

| Field | What to Enter | Example |
|-------|---------------|---------|
| **Year** | The year | "2024" |
| **Works** | Select from your Work Experience entries | Select "Full Stack Developer at ABC Technologies" |

> 💡 Each "Experience" groups multiple "Work Experience" entries under a year. You can have multiple jobs per year.

### 6.5 Testimonials

Client or colleague testimonials add credibility.

| Field | What to Enter | Example |
|-------|---------------|---------|
| **Name** | Person's name | "John Doe" |
| **Company** | Their company/role | "CEO at TechCorp" |
| **ImgUrl** | Upload their photo | Upload a headshot |
| **Feedback** | Their testimonial quote | "Rumesh delivered an exceptional website that exceeded our expectations..." |

> 💡 If you don't have real testimonials yet, you can skip this section or add testimonials from professors, mentors, or project collaborators.

### 6.6 Brands

Brands/logos of companies you've worked with or technologies you're proficient in.

| Field | What to Enter | Example |
|-------|---------------|---------|
| **ImgUrl** | Upload a company/brand logo | Upload logo PNG |
| **Name** | Brand/company name | "Google" |

> 💡 These appear as a logo carousel in the Testimonials section.

---

## 7. Start the Frontend

After adding content to Sanity Studio, start the React app to see your portfolio:

```bash
# Make sure you're in the project root (not backend_sanity_portfolio)
npm start
```

This will open **http://localhost:3000** with your portfolio.

> 💡 Content changes in Sanity Studio appear on the frontend within seconds (you may need to refresh the page).

---

## 8. Deployment

### Deploy Sanity Studio (Your CMS)

```bash
cd backend_sanity_portfolio
npx sanity deploy
```

This deploys your Studio to a URL like `https://your-project.sanity.studio`

### Deploy Frontend (Your Portfolio Website)

**Option A: Netlify (Recommended)**
1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Connect your GitHub repo
5. Set build settings:
   - Build command: `npm run build`
   - Publish directory: `build`
6. Add environment variables:
   - `REACT_APP_SANITY_PROJECT_ID` = your project ID
   - `REACT_APP_SANITY_TOKEN` = your API token
7. Click Deploy

**Option B: Vercel**
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add the same environment variables as above
5. Deploy

> ⚠️ **Remember:** After deploying, add your production URL to the CORS origins in Sanity Manage (Step 5).

---

## Quick Reference: Sanity Studio URL

| Environment | URL |
|-------------|-----|
| Local Studio | http://localhost:3333 |
| Local Frontend | http://localhost:3000 |
| Sanity Dashboard | https://www.sanity.io/manage |

---

## Need Help?

- **Sanity Docs:** [https://www.sanity.io/docs](https://www.sanity.io/docs)
- **GROQ Query Language:** [https://www.sanity.io/docs/groq](https://www.sanity.io/docs/groq)
- **Sanity Community:** [https://slack.sanity.io](https://slack.sanity.io)
