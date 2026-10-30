@echo off
cd /d "%~dp0"
powershell -NoProfile -Command "try { $null = Invoke-WebRequest -Uri 'http://127.0.0.1:3000/' -UseBasicParsing -TimeoutSec 2; exit 0 } catch { exit 1 }" >nul 2>&1
if errorlevel 1 (
  start "CollegeFinder server" cmd /k "cd /d ""%~dp0"" && npm.cmd start"
  timeout /t 3 /nobreak >nul
)
start "" http://localhost:3000
