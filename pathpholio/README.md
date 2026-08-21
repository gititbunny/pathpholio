# Pathpholio

![Pathpholio Logo](./public/logo.png)

**Pathpholio** is a full-stack job application tracker designed to make managing a job search simple and organised. Users can create an account, sign in securely, save job applications to the cloud, update their progress, and keep track of opportunities from one clean dashboard.

Built with **React, Vite, Supabase, and React Router**.

## Features

* Secure email and password authentication
* User sign-up and sign-in
* Persistent login sessions
* Cloud-based job application storage with Supabase
* Add new job applications
* Edit existing applications
* Remove applications
* Track application status:

  * Applied
  * Interview
  * Offer
* Filter applications by status
* Save links to original job postings
* Real-time success and error notifications
* Responsive, user-friendly interface
* Protected dashboard for authenticated users

## Tech Stack

**Frontend**

* React
* JavaScript
* CSS
* Vite
* React Router

**Backend & Database**

* Supabase
* Supabase Authentication
* Supabase Database

**Development Tools**

* Git
* GitHub
* ESLint
* npm

## How It Works

After creating an account or signing in, users are taken to their personal job application dashboard.

From the dashboard, they can add a job title, company, application status and an optional link to the job posting. Applications can then be edited, removed or filtered according to their current status.

Application data is persisted through Supabase, allowing users to access their saved information across sessions.

## Project Structure

```text
src/
├── components/
│   ├── Filters.jsx
│   ├── Header.jsx
│   ├── JobForm.jsx
│   ├── JobTable.jsx
│   └── Toast.jsx
├── lib/
│   └── jobsApi.js
├── routes/
│   ├── Auth.jsx
│   └── Dashboard.jsx
├── App.jsx
├── main.jsx
├── styles.css
└── supabase.js
```

## Running the Project Locally

Clone the repository:

```bash
git clone https://github.com/gititbunny/pathpholio.git
```

Navigate into the project directory and install the dependencies:

```bash
npm install
```

Create a `.env` file and add your Supabase credentials:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Start the development server:

```bash
npm run dev
```

## Available Scripts

```bash
npm run dev
```

Runs the application locally using Vite.

```bash
npm run build
```

Creates a production build.

```bash
npm run preview
```

Previews the production build locally.

```bash
npm run lint
```

Runs ESLint across the project.

## What This Project Demonstrates

Pathpholio demonstrates practical experience with:

* Building React applications using reusable components
* Client-side routing
* Authentication and session management
* Connecting a frontend application to a cloud backend
* Database CRUD operations
* Asynchronous JavaScript
* Form handling and validation
* Application state management
* Responsive interface design
* Git and GitHub version control

## Author

Built by **Git It Bunny**

[GitHub](https://github.com/gititbunny)
