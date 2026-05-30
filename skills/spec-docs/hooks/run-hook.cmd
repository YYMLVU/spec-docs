: << 'CMDBLOCK'
@echo off
set "SCRIPT_DIR=%~dp0"
set "SCRIPT_NAME=%~1"
if "%SCRIPT_NAME%"=="" exit /b 0
if "%SPEC_DOCS_HOOK_SESSION_ID%"=="" set "SPEC_DOCS_HOOK_SESSION_ID=%RANDOM%-%TIME::=-%"
if "%SPEC_DOCS_HOOK_STATE_DIR%"=="" set "SPEC_DOCS_HOOK_STATE_DIR=%TEMP%\spec-docs-hooks-%USERNAME%-%SPEC_DOCS_HOOK_SESSION_ID%"
"C:\Program Files\Git\bin\bash.exe" -l -c "cd \"$(cygpath -u \"%SCRIPT_DIR%\")\" && SPEC_DOCS_HOOK_STATE_DIR=\"$(cygpath -u \"%SPEC_DOCS_HOOK_STATE_DIR%\")\" \"./scripts/%SCRIPT_NAME%\""
exit /b
CMDBLOCK

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
SCRIPT_NAME="$1"
if [ -z "$SCRIPT_NAME" ]; then
  exit 0
fi
if [ -z "${SPEC_DOCS_HOOK_SESSION_ID:-}" ]; then
  SPEC_DOCS_HOOK_SESSION_ID="${PPID:-$$}"
fi
if [ -z "${SPEC_DOCS_HOOK_STATE_DIR:-}" ]; then
  SAFE_SESSION_ID=$(printf '%s' "$SPEC_DOCS_HOOK_SESSION_ID" | tr -c 'A-Za-z0-9_.-' '_')
  export SPEC_DOCS_HOOK_STATE_DIR="${TMPDIR:-/tmp}/spec-docs-hooks-${USER:-unknown}-${SAFE_SESSION_ID}"
fi
mkdir -p "$SPEC_DOCS_HOOK_STATE_DIR"
MARKER="$SPEC_DOCS_HOOK_STATE_DIR/runner-${SCRIPT_NAME}.shown"
if [ -f "$MARKER" ]; then
  printf '%s\n' "spec-docs ${SCRIPT_NAME} reminder already shown for this session/change unit."
  exit 0
fi
: > "$MARKER"
"${SCRIPT_DIR}/scripts/${SCRIPT_NAME}"
