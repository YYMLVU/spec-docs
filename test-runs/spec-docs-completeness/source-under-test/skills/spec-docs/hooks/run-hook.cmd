: << 'CMDBLOCK'
@echo off
set "SCRIPT_DIR=%~dp0"
set "SCRIPT_NAME=%~1"
if "%SCRIPT_NAME%"=="" exit /b 0
"C:\Program Files\Git\bin\bash.exe" -l -c "cd \"$(cygpath -u \"%SCRIPT_DIR%\")\" && \"./scripts/%SCRIPT_NAME%\""
exit /b
CMDBLOCK

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
SCRIPT_NAME="$1"
if [ -z "$SCRIPT_NAME" ]; then
  exit 0
fi
"${SCRIPT_DIR}/scripts/${SCRIPT_NAME}"
