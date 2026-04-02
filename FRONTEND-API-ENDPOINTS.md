# Frontend API Endpoints - Deployment Guide

## Current Status

Your frontend is currently configured to use **relative API paths** (e.g., `/api/students`), which means:
- ✅ **During development**: The proxy in `client/package.json` forwards requests to `http://localhost:5000`
- ❌ **When deployed**: These will try to call the SAME domain where your frontend is hosted

## Solution Options

### Option 1: Use Environment Variable (RECOMMENDED)

Update `client/src/config/api.ts` to use an environment variable for production.

**Current Configuration:**
```typescript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://ccs-profiling-backend.onrender.com';
```

**However**, your pages are NOT using this config! They're using direct `fetch('/api/...')` calls.

---

## Complete List of API Endpoints Used in Frontend

### 1. **Students API** (`/api/students`)
**Used in:**
- `Dashboard.tsx` (line 33) - GET all students
- `StudentList.tsx` (line 33) - GET all students
- `StudentList.tsx` (line 46) - DELETE student by ID
- `AddStudent.tsx` (line 35) - POST new student
- `EditStudent.tsx` (line 28) - GET student by ID
- `EditStudent.tsx` (line 67) - PUT update student

**Endpoints needed:**
```
GET    /api/students
GET    /api/students/:id
POST   /api/students
PUT    /api/students/:id
DELETE /api/students/:id
```

---

### 2. **Faculty API** (`/api/faculty`)
**Used in:**
- `FacultyList.tsx` (line 37) - GET all faculty
- `FacultyList.tsx` (line 50) - DELETE faculty by ID
- `AddFaculty.tsx` (line 94) - POST new faculty
- `EditFaculty.tsx` (line 37) - GET faculty by ID
- `EditFaculty.tsx` (line 127) - PUT update faculty

**Endpoints needed:**
```
GET    /api/faculty
GET    /api/faculty/:id
POST   /api/faculty
PUT    /api/faculty/:id
DELETE /api/faculty/:id
```

---

### 3. **Instruction API** (`/api/instruction`)
**Used in:**
- `InstructionList.tsx` (line 40) - GET all instructions
- `InstructionList.tsx` (line 53) - DELETE instruction by ID
- `AddInstruction.tsx` (line 85) - POST new instruction
- `EditInstruction.tsx` (line 34) - GET instruction by ID
- `EditInstruction.tsx` (line 122) - PUT update instruction

**Endpoints needed:**
```
GET    /api/instruction
GET    /api/instruction/:id
POST   /api/instruction
PUT    /api/instruction/:id
DELETE /api/instruction/:id
```

---

### 4. **Scheduling API** (`/api/scheduling`)
**Used in:**
- `ScheduleList.tsx` (line 57) - GET all schedules
- `ScheduleList.tsx` (line 70) - DELETE schedule by ID
- `AddSchedule.tsx` (line 99) - POST new schedule
- `EditSchedule.tsx` (line 40) - GET schedule by ID
- `EditSchedule.tsx` (line 140) - PUT update schedule

**Endpoints needed:**
```
GET    /api/scheduling
GET    /api/scheduling/:id
POST   /api/scheduling
PUT    /api/scheduling/:id
DELETE /api/scheduling/:id
```

---

### 5. **Events API** (`/api/events`)
**Used in:**
- `EventList.tsx` (line 59) - GET all events
- `EventList.tsx` (line 72) - DELETE event by ID
- `AddEvent.tsx` (line 104) - POST new event
- `EditEvent.tsx` (line 36) - GET event by ID
- `EditEvent.tsx` (line 142) - PUT update event

**Endpoints needed:**
```
GET    /api/events
GET    /api/events/:id
POST   /api/events
PUT    /api/events/:id
DELETE /api/events/:id
```

---

### 6. **Health Check** (`/api/health`)
**Available but not used in frontend yet**
```
GET /api/health
```

---

### 7. **Query System** (`/api/query`)
**Available but not used in frontend yet**
```
GET/POST /api/query
```

---

## Required Backend URLs for Deployment

You need to replace ALL `fetch('/api/...')` calls with full URLs pointing to your backend deployment.

### Your Backend Deployment URLs:

**If deploying to Render:**
```
https://ccs-profiling-backend.onrender.com
```

**If deploying locally (for testing):**
```
http://localhost:5000
```

---

## Implementation Steps

### Step 1: Update API Config File

Your `client/src/config/api.ts` already has the right idea, but it's not being used. Let's make it the central config:

```typescript
// client/src/config/api.ts
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export default API_BASE_URL;
```

### Step 2: Create `.env` file in `client` folder

Create `client/.env`:
```env
REACT_APP_API_URL=https://ccs-profiling-backend.onrender.com
```

For local development, create `client/.env.development`:
```env
REACT_APP_API_URL=http://localhost:5000
```

### Step 3: Update All API Calls

Replace all `fetch('/api/...')` with `fetch(`${API_BASE_URL}/api/...`)`

**Example for Dashboard.tsx:**
```typescript
import API_BASE_URL from '../config/api';

// Change from:
const studentsResponse = await fetch('/api/students');

// To:
const studentsResponse = await fetch(`${API_BASE_URL}/api/students`);
```

---

## Quick Fix - Centralized API Service

Your `client/src/services/apiService.ts` is already set up correctly! You just need to:

1. **Import and use it in all components**
2. **Set the correct base URL in `.env`**

**Example usage:**
```typescript
import { api } from '../services/apiService';

// Instead of:
const response = await fetch('/api/students');

// Use:
const response = await api.get('/students');
```

---

## Files That Need Updating

Here's the complete list of files that need API endpoint updates:

### Pages Directory:
1. ✅ `Dashboard.tsx` - Line 33
2. ✅ `StudentList.tsx` - Lines 33, 46
3. ✅ `FacultyList.tsx` - Lines 37, 50
4. ⏳ `InstructionList.tsx` - Lines 40, 53
5. ⏳ `ScheduleList.tsx` - Lines 57, 70
6. ⏳ `EventList.tsx` - Lines 59, 72
7. ⏳ `AddStudent.tsx` - Line 35
8. ⏳ `AddFaculty.tsx` - Line 94
9. ⏳ `AddInstruction.tsx` - Line 85
10. ⏳ `AddSchedule.tsx` - Line 99
11. ⏳ `AddEvent.tsx` - Line 104
12. ⏳ `EditStudent.tsx` - Lines 28, 67
13. ⏳ `EditFaculty.tsx` - Lines 37, 127
14. ⏳ `EditInstruction.tsx` - Lines 34, 122
15. ⏳ `EditSchedule.tsx` - Lines 40, 140
16. ⏳ `EditEvent.tsx` - Lines 36, 142

---

## Summary

**Total API Endpoints Needed:**
- Students: 5 endpoints
- Faculty: 5 endpoints
- Instruction: 5 endpoints
- Scheduling: 5 endpoints
- Events: 5 endpoints
- Health: 1 endpoint
- Query: 1 endpoint

**Total: 27 endpoints across 7 resource types**

**Files to Update: 16 component files**

---

## Next Steps

Would you like me to:
1. Update all files to use the centralized `apiService.ts`?
2. Or manually update each file with full URLs?
3. Set up environment variables for different environments?

Let me know which approach you prefer!
