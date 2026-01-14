# OctoFit Tracker Project Guide

## Project Overview

OctoFit Tracker is a fitness tracking web application for Mergington High School, enabling students to log activities, compete in teams, and earn achievements. Built with **Django REST API (backend)** + **React (frontend)** + **MongoDB (database)**.

## Architecture & Structure

```
octofit-tracker/
├── backend/
│   ├── venv/                    # Python virtual environment (pre-configured)
│   ├── octofit_tracker/         # Django project root
│   │   ├── settings.py          # Must include CODESPACE_NAME in ALLOWED_HOSTS
│   │   ├── urls.py              # API endpoints with codespace-aware URLs
│   │   └── management/commands/ # Custom Django commands (e.g., populate_db.py)
└── frontend/                    # React app with Bootstrap styling
    ├── src/
    └── package.json
```

**Key Collections**: users, teams, activities, leaderboard, workouts

## Critical Workflow Rules

### 1. Never Change Directories
**Always use absolute paths** when running commands. The project expects operations from the workspace root.

```bash
# ✅ Correct
source octofit-tracker/backend/venv/bin/activate
python octofit-tracker/backend/manage.py migrate

# ❌ Wrong - Do not cd into directories
cd octofit-tracker/backend && python manage.py migrate
```

### 2. Python Environment
The virtual environment at `octofit-tracker/backend/venv` is pre-created with all dependencies from `requirements.txt`. Always activate it before Django operations:

```bash
source octofit-tracker/backend/venv/bin/activate
```

### 3. MongoDB Management
- Check if MongoDB is running: `ps aux | grep mongod` (not `service status`)
- Connect using: `mongosh` (official client, not deprecated `mongo`)
- **Use Django ORM for database operations** - avoid direct MongoDB scripts except for verification

### 4. GitHub Codespace Integration

**Django settings.py** must include:
```python
import os
ALLOWED_HOSTS = ['localhost', '127.0.0.1']
if os.environ.get('CODESPACE_NAME'):
    ALLOWED_HOSTS.append(f"{os.environ.get('CODESPACE_NAME')}-8000.app.github.dev")
```

**Django urls.py** should construct URLs dynamically:
```python
import os
codespace_name = os.environ.get('CODESPACE_NAME')
base_url = f"https://{codespace_name}-8000.app.github.dev" if codespace_name else "http://localhost:8000"
```

**Ports (configured in [.devcontainer/devcontainer.json](.devcontainer/devcontainer.json))**:
- `3000`: React frontend (public)
- `8000`: Django backend (public)  
- `27017`: MongoDB (private)

Use ONLY these ports - do not propose alternatives.

## Development Workflows

### Running the Application
Use [.vscode/launch.json](.vscode/launch.json) configurations:
- **Launch Django Backend**: Runs Django server on port 8000 with virtual environment
- **Launch React Frontend**: Runs React dev server on port 3000

### Testing REST API Endpoints
Always use `curl` to test API endpoints (per backend guidelines):
```bash
curl https://${CODESPACE_NAME}-8000.app.github.dev/api/users/
```

### Database Population
Reference [.github/prompts/init-populate-octofit_db.prompt.md](.github/prompts/init-populate-octofit_db.prompt.md):
1. Configure Django settings for Djongo (no auth required)
2. Add `octofit_tracker`, `rest_framework`, `djongo` to `INSTALLED_APPS`
3. Create management command at `octofit-tracker/backend/octofit_tracker/management/commands/populate_db.py`
4. Use **superhero theme** (Team Marvel vs Team DC) for sample data
5. Verify with `mongosh`: list collections and sample documents

### Frontend Setup
```bash
npx create-react-app octofit-tracker/frontend --template cra-template --use-npm
npm install bootstrap react-router-dom --prefix octofit-tracker/frontend
```

Add Bootstrap import to **top** of `src/index.js`:
```javascript
import 'bootstrap/dist/css/bootstrap.min.css';
```

## Project-Specific Conventions

### Serializers (Django)
Convert MongoDB `ObjectId` fields to strings in serializers.

### CORS Configuration
Enable all origins, methods, and headers. Set `ALLOWED_HOSTS = ['*']` for development.

### Image Assets
Use `docs/octofitapp-small.png` for the app logo/branding.

### Instruction Files
The project uses scoped instruction files in [.github/instructions/](.github/instructions/):
- `octofit_tracker_setup_project.instructions.md` - Overall setup rules (applies to all files)
- `octofit_tracker_django_backend.instructions.md` - Backend patterns (applies to `backend/**`)
- `octofit_tracker_react_frontend.instructions.md` - Frontend patterns (applies to `frontend/**`)

### Prompt Files
Reusable agent mode prompts in [.github/prompts/](.github/prompts/):
- `create-django-project.prompt.md` - Django project initialization
- `init-populate-octofit_db.prompt.md` - Database setup with test data

## Quick Reference

**Install Python packages**: Use existing venv, avoid creating new ones  
**Check MongoDB**: `ps aux | grep mongod` then `mongosh` to verify  
**Launch app**: Use VS Code launch configurations, not terminal commands  
**Test APIs**: Use `curl` with codespace URLs  
**Frontend commands**: Always include `--prefix octofit-tracker/frontend`
