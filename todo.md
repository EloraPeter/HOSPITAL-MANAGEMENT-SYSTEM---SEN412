# TODO.md – Hospital Management System
## 50 People | 1 Repository | 6 Branches | GitHub Flow

> **REPO STRUCTURE**  
> `main` (protected) ← `group/frontend` ← `feature/frontend-*`  
> `main` (protected) ← `group/backend` ← `feature/backend-*`  
> `main` (protected) ← `group/database` ← `feature/database-*`  
> `main` (protected) ← `group/medical` ← `feature/medical-*`  
> `main` (protected) ← `group/qa` ← `feature/qa-*`  

---

## 📜 UNIVERSAL CHECKLIST (EVERY PERSON)

**Before ANY code:**
- [ ] I know my group branch: `group/frontend` | `group/backend` | `group/database` | `group/medical` | `group/qa`
- [ ] I have read the branch protection rules (no direct pushes to group branches or main)
- [ ] I have `git pull origin {group-branch}` before creating feature branch

**For EVERY task:**
- [ ] Create branch from MY group branch: `git checkout -b feature/{group}-{task-name}`
- [ ] Follow naming: `feature/frontend-login`, `feature/backend-auth`, `feature/database-users`, etc.
- [ ] Write clean code + comments where needed
- [ ] Test locally WITHOUT breaking existing features
- [ ] Push to remote: `git push origin feature/{group}-{task-name}`
- [ ] Open Pull Request to MY GROUP BRANCH (not main!)
- [ ] Assign PR to MY GROUP LEADER only
- [ ] Respond to review feedback within 12 hours
- [ ] After merge, delete feature branch (local + remote)
- [ ] Update task status on shared board (Notion/Trello)

---

## 🗄️ GROUP 1 – DATABASE TEAM (10 people)

**Group Branch:** `group/database`  
**Leader:** `Dorothy`  
**Mission:** Schema design, migrations, indexes, performance

### 👑 LEADER TASKS (Database Leader)

**Before backend starts (Day 1):**
- [ ] Approve final schema – no changes after Day 2 without emergency meeting
- [ ] Create ER and all UML diagrams 
- [ ] Share schema with Backend Leader + Medical Leader

- [ ] Review all PRs to `group/database` within 4 hours
- [ ] Prevent duplicate/conflicting tables
- [ ] Ensure 3NF normalization (justify any denormalization)
- [ ] Coordinate every schema change with Backend Leader

- [ ] Run performance analysis on slow queries
- [ ] Add missing indexes based on query patterns

- [ ] Merge all migration PRs to `group/database`
- [ ] Test migrations rollback (down migration)
- [ ] Push final branch for main integration

---

### 👥 MEMBER TASKS )

**Each person completes ALL for assigned table(s):**

- [ ] **Design table** – name, fields, data types, constraints
- [ ] **Define primary key** (UUID/serial)
- [ ] **Add foreign keys** – reference other tables correctly
- [ ] **Set NOT NULL / DEFAULT** where appropriate
- [ ] **Avoid redundancy** – extract repeated data to separate table
- [ ] **Write migration file** (UP + DOWN)
- [ ] **Write seed data** (at least 10 realistic rows)
- [ ] **Add indexes** on: foreign keys, frequently queried fields
- [ ] **Test queries** – `EXPLAIN ANALYZE` for slow queries
- [ ] **Push to** `feature/database-{table}`
- [ ] **Open PR** to `group/database` → assign to Database Leader
- [ ] **Respond to review** within 12 hours

**Required tables :**
1. `users` (auth + profile)
2. `patients` (medical records linkage)
3. `doctors` (specialties, schedule)
4. `appointments` (time, status, notes)
5. `medical_records` (diagnosis, treatment)
6. `prescriptions` (meds, dosage, refills)
7. `billing` (charges, payments, insurance)
8. `labs` (tests, results, ranges)
9. `discharge_summaries` (final notes, follow-up)

---

## 🧑‍⚕️ GROUP 2 – FRONTEND TEAM 

**Group Branch:** `group/frontend`  
**Leader:** `Elora`  
**Mission:** UI components, pages, state management, API integration

### 👑 LEADER TASKS (Frontend Leader)

- [ ] Check all open PRs to `group/frontend` 
- [ ] Verify no duplicate components – enforce shared component library
- [ ] Sync with Backend Leader: confirm API endpoints are ready
- [ ] Run `git pull origin group/frontend && git rebase main` 

- [ ] Assign 2-3 pages/components to each of members (no overlap)
- [ ] Distribute design system specs (Figma/frame)

- [ ] Review ALL group member PRs (approve or request changes)
- [ ] Merge approved PRs to `group/frontend` (squash + merge)
- [ ] Resolve merge conflicts within frontend team
- [ ] Push final `group/frontend` main integration

- [ ] Enforce UI consistency (colors, spacing, typography)
- [ ] Ensure all pages connect to real APIs (no hardcoded mock data)
- [ ] Review all PRs for: responsive design, loading/error states, form validation

---

### 👥 MEMBER TASKS 

**Each person completes ALL of these per assigned component:**

- [ ] **Build UI component/page** from leader's assignment
- [ ] **Follow design system** exactly (Figma link: `[insert]`)
- [ ] **Make responsive** – works on mobile, tablet, desktop
- [ ] **Integrate real API endpoint** (from backend contract)
- [ ] **Handle loading states** (spinner/skeleton)
- [ ] **Handle error states** (user-friendly error messages)
- [ ] **Validate forms** (client-side: required, email, min/max)
- [ ] **NEVER hardcode data** – always from API or state
- [ ] **Test interactions** – clicks, form submit, navigation
- [ ] **Commit & push** to `feature/frontend-{component}`
- [ ] **Open PR** to `group/frontend` → assign to Frontend Leader
- [ ] **Respond to review** within 12 hours, push fixes

---

## 🏥 GROUP 3 – MEDICAL & PATIENT SERVICES (

**Group Branch:** `group/medical`  
**Leader:** `Genexis`  
**Mission:** Clinical workflows, business rules, domain logic 

### 👑 LEADER TASKS (Medical Lead)

- [ ] Validate all 9 modules with real hospital workflow (or approved simulation)

- [ ] Review all PRs to `group/medical` (markdown/diagrams only)
- [ ] Remove conflicting rules between modules
- [ ] Ensure edge cases documented (e.g., patient cancels mid-treatment)
- [ ] Deliver final docs to Backend Leader + QA Leader

- [ ] Walk through end-to-end patient journey with all  members
- [ ] Identify gaps in logic

**Before weekly integration (Tuesday 9:30 AM):**
- [ ] Merge all documentation PRs to `group/medical`
- [ ] Tag final version as `medical-spec-v1.0`

---

### 👥 MEMBER TASKS 

**Each person owns ONE module – document EVERYTHING in markdown:**

**Module 1 – Appointments**
- [ ] Define booking rules (lead time, cancellation window)
- [ ] Define reschedule policy (fees, limits)
- [ ] Define no-show handling
- [ ] Define emergency override process

**Module 2 – Patient Lifecycle**
- [ ] Map states: Registered → Triaged → Admitted → Treatment → Discharged
- [ ] Define state transitions (who can change, when)
- [ ] Document readmission rules

**Module 3 – Medical Records**
- [ ] Define required fields (diagnosis, symptoms, vitals)
- [ ] Define edit rules (append-only, no deletion)
- [ ] Define access control (patient, doctor, nurse, admin)

**Module 4 – Prescriptions**
- [ ] Define structure (medication, dosage, frequency, duration)
- [ ] Define refill rules (max refills, doctor approval)
- [ ] Define controlled substance handling

**Module 5 – Billing Rules**
- [ ] Define consultation fee calculation
- [ ] Define procedure/itemized charges
- [ ] Define insurance claim workflow
- [ ] Define payment plans

**Module 6 – Lab Results**
- [ ] Define order workflow (doctor orders → lab runs → results reviewed)
- [ ] Define critical value alert rules
- [ ] Define result normal ranges per test

**Module 7 – Discharge Summary**
- [ ] Define required sections (diagnosis, treatment, follow-up, medications)
- [ ] Define who can sign off
- [ ] Define distribution (patient, primary care, pharmacy)

**Module 8 – Referrals**
- [ ] Define referral request workflow
- [ ] Define referral acceptance/rejection rules
- [ ] Define external provider data format

**Module 9 – Notifications**
- [ ] Define trigger events (appointment reminder, lab ready, discharge)
- [ ] Define channel priority (SMS, email, in-app)
- [ ] Define opt-out rules

**Each person also:**
- [ ] Document 5+ edge cases per module
- [ ] Create simple flowchart (Mermaid/draw.io)
- [ ] Communicate requirements to Backend Leader (in sprint planning)
- [ ] Push to `feature/medical-{module}`
- [ ] Open PR to `group/medical` → assign to Medical Leader

---

## ⚙️ GROUP 4 – BACKEND TEAM

**Group Branch:** `group/backend`  
**Leader:** `Favour`  
**Mission:** REST APIs, authentication, business logic, security

### 👑 LEADER TASKS (Backend Leader)

- [ ] Define complete API contract (OpenAPI/Swagger YAML)
- [ ] Share contract with Frontend Leader + Database Leader
- [ ] Lock contract – no changes without 24-hour notice

- [ ] Assign endpoints to 9 members (no overlap)
- [ ] Check all PRs to `group/backend` – review within 4 hours
- [ ] Enforce consistent response format: `{ status, data, message, errors? }`
- [ ] Validate auth & role checks in every PR
- [ ] Sync with Database Leader (schema changes)
- [ ] Sync with Frontend Leader (API readiness)

- [ ] Run Postman/Newman collection against all endpoints
- [ ] Any failing test? Block merge until fixed

- [ ] Merge all approved backend PRs to `group/backend`
- [ ] Resolve conflicts
- [ ] Push final branch for main integration

---

### 👥 MEMBER TASKS 

**Each person completes ALL for assigned endpoint(s):**

- [ ] **Implement endpoint** (route → controller → service → model)
- [ ] **Follow API contract exactly** – no extra fields, no missing fields
- [ ] **Validate incoming data** (Joi/Zod/pydantic)
- [ ] **Handle errors** with standard format + proper HTTP codes
  - 400: Bad request (validation)
  - 401: Unauthorized
  - 403: Forbidden
  - 404: Not found
  - 500: Server error
- [ ] **Secure endpoint** – JWT required + role check (admin/doctor/patient)
- [ ] **Connect to database** – use DB schema from Database team
- [ ] **Write unit tests** for edge cases
- [ ] **Test with Postman** (positive + negative + auth fail)
- [ ] **Document endpoint** in shared Postman collection
- [ ] **Push to** `feature/backend-{endpoint}`
- [ ] **Open PR** to `group/backend` → assign to Backend Leader
- [ ] **Respond to review** within 12 hours

**Example endpoint assignment:**
1. `POST /auth/login`
2. `POST /auth/register`
3. `GET /patients/{id}`
4. `POST /appointments`
5. `GET /appointments?doctor={id}`
6. `PUT /medical-records/{id}`
7. `POST /prescriptions`
8. `GET /billing/{patientId}`
9. `POST /discharge/{patientId}`

---


## 🧪 GROUP 5 – QA / TESTING / DOCUMENTATION 

**Group Branch:** `group/qa`  
**Leader:** `Jovis`  
**Mission:** Test coverage, bug tracking, user docs, technical docs

### 👑 LEADER TASKS (QA Lead)

**Before sprint starts:**
- [ ] Define test strategy (smoke, regression, integration, E2E)
- [ ] Create test plan document

**Daily:**
- [ ] Assign features to 9 testers (no overlap)
- [ ] Ensure all bugs logged in GitHub Issues (labels: `bug`, `priority-high`, etc.)
- [ ] Verify fixes before closure (re-test within 24 hours)
- [ ] Sync with Medical Lead on clinical test scenarios

**Before weekly integration :**
- [ ] Run regression suite against `group/qa`
- [ ] Any blocker? Flag to all leaders immediately

**Release day :**
- [ ] Approve final release readiness
- [ ] Sign off user documentation

---

### 👥 MEMBER TASKS 

**Each person tests assigned feature(s) – both functional + non-functional:**

- [ ] **Read feature requirements** (from Medical team docs)
- [ ] **Create test cases** (positive + negative + edge)
- [ ] **Test UI** – all interactions, responsive, error messages
- [ ] **Test API** – valid/invalid inputs, auth, rate limits
- [ ] **Test database** – data persists correctly, constraints enforced
- [ ] **Log bugs** with: steps to reproduce, expected vs actual, screenshots, environment
- [ ] **Re-test fixes** – verify bug is gone + no regression
- [ ] **Update test report** daily (shared Google Sheet)

**Documentation tasks :**

**User Documentation :**
- [ ] Write user manual (patient portal)
- [ ] Write doctor/nurse quick start guide
- [ ] Write admin configuration guide
- [ ] Create video tutorials (Loom)

**Technical Documentation :**
- [ ] Document API endpoints (from Postman)
- [ ] Document database schema (from ER diagram)
- [ ] Document environment setup (dev, staging, prod)
- [ ] Document deployment process
- [ ] Document troubleshooting common errors

**Each person:**
- [ ] Push docs to `feature/qa-{doc-name}`
- [ ] Open PR to `group/qa` → assign to QA Lead

---

## 🔁 GITHUB WORKFLOW – COMPLETE PROCESS

### Branch Hierarchy (Visual)

main (protected, 2 approvals required)
│
├── group/frontend (protected, 1 approval - Frontend Leader)
│ ├── feature/frontend-login
│ ├── feature/frontend-dashboard
│ └── feature/frontend-patients
│
├── group/backend (protected, 1 approval - Backend Leader)
│ ├── feature/backend-auth
│ └── feature/backend-appointments
│
├── group/database (protected, 1 approval - Database Leader)
│ ├── feature/database-users
│ └── feature/database-patients
│
├── group/medical (protected, 1 approval - Medical Leader)
│ └── feature/medical-workflows
│
└── group/qa (protected, 1 approval - QA Leader)
└── feature/qa-test-plans




1.
git checkout group/frontend
git pull origin group/frontend

# 2. Create feature branch
git checkout -b feature/frontend-login-page

# 3. Work, commit
git add .
git commit -m "feat: add login form with validation"

# 4. Push & create PR
git push origin feature/frontend-login-page
# Then open PR on GitHub: feature/frontend-login-page → group/frontend

# 5. After PR approved & merged by leader
git checkout group/frontend
git pull origin group/frontend
git branch -d feature/frontend-login-page
git push origin --delete feature/frontend-login-page

# Step 1: Integration Manager (rotating role) merges group branches to main
git checkout main
git pull origin main

# Step 2: Merge each group branch (in order: DB → Backend → Frontend → Medical → QA)
git merge --no-ff group/database   # Database Leader must be present
git merge --no-ff group/backend    # Backend Leader must be present
git merge --no-ff group/frontend   # Frontend Leader must be present
git merge --no-ff group/medical    # Medical Leader (docs only)
git merge --no-ff group/qa         # QA Leader (test files/docs)

# Step 3: Resolve conflicts TOGETHER (no single leader resolves cross-group conflicts)
# Step 4: Push main
git push origin main

# Step 5: Each leader rebases their group branch onto main
git checkout group/database
git rebase main
git push --force-with-lease origin group/database

# Step 6: Each developer rebases their feature branches
git checkout feature/frontend-xyz
git rebase group/frontend
git push --force-with-lease

# 1. Create hotfix branch from main
git checkout main
git checkout -b hotfix/critical-bug

# 2. Fix, test, push
git push origin hotfix/critical-bug

# 3. Open PR to main, assign to ALL 5 leaders
# 4. Minimum 3 approvals required

# 5. After merge, ALL group branches rebase


🚫 GITHUB PROTECTION RULES (Configure in Settings)
For main branch:
☑️ Require pull request before merging
☑️ Require 2 approvals (must include Backend Lead + Medical Lead if clinical code)
☑️ Dismiss stale reviews when new commits pushed
☑️ Require status checks (CI must pass)
☑️ Require branches to be up-to-date
☑️ Restrict push access to Integration Manager only
☑️ Allow force pushes: NO
☑️ Linear history required (no merge commits)

For each group/* branch:
☑️ Require pull request before merging
☑️ Require 1 approval (group leader only)
☑️ Dismiss stale reviews
☑️ Require status checks (if CI exists)
☑️ Restrict push access to group leader only
☑️ Allow force pushes: ONLY for rebase (with force-with-lease)

📋 SHARED ARTIFACTS 
API Contract (Postman collection + OpenAPI YAML) – owned by Backend Leader
Database Schema (ER diagram + migration files) – owned by Database Leader
Design System (Figma + CSS variables) – owned by Frontend Leader
Medical Workflows (Markdown + flowcharts) – owned by Medical Leader
Test Plan (TestRail/Google Sheets) – owned by QA Leader
Task Board (Notion/Trello) – one view per group, cross-group blockers column
Bug Tracker (GitHub Issues) – labels: bug, group-frontend, priority-high, etc.
Shared Drive (Google Drive) – all docs, screenshots, videos
Communication (Slack/Discord) – channels: #frontend, #backend, #database, #medical, #qa, #integration

⚠️ EMERGENCY RESPONSE (Things That Will Break)
Problem	Immediate Action
Someone pushed directly to main	Integration Manager reverts + removes contributor's write access
Merge conflict during integration	ALL 5 leaders resolve together – no single leader decides
CI broken for >2 hours	QA Lead identifies culprit PR, revert it
API contract changed without notice	Backend Leader reverts change + 15-min all-hands meeting
Medical logic contradicts backend	Medical Leader + Backend Leader pause feature – resolve within 4 hours
Developer unresponsive for 24h	Group leader reassigns tasks, escalates after 48h

✅ LAUNCH CHECKLIST (Day 0 – Before ANYONE writes code)
Invite all 50 people to GitHub repo (write access to group branches only)
Configure GitHub Actions CI (lint, test, build)
Create shared Google Drive folder

Then:
Every person clones repo: git clone [url]
Every person runs: git branch -a (see all group branches)
Every person reads this entire document 

Then:
GO! Start tasks above

🏁 SUCCESS METRICS 
No direct pushes to main or group/* (audit log)
demo shows working patient registration → appointment booking → prescription
<5 unresolved bugs
100% of team can explain branch workflow without looking at this doc

