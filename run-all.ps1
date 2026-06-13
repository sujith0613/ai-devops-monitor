Write-Host "Starting AI DevOps Monitor..." -ForegroundColor Cyan

# Start backend
Write-Host "[1/2] Starting backend (port 8000)..." -ForegroundColor Yellow
$backendJob = Start-Job -Name "ai-backend" -ScriptBlock {
    cd "$using:PSScriptRoot\backend"
    & "$using:PSScriptRoot\backend\venv\Scripts\python.exe" -m uvicorn main:app --host 0.0.0.0 --port 8000 --ssl-keyfile=key.pem --ssl-certfile=cert.pem
}
Start-Sleep -Seconds 2

# Start frontend
Write-Host "[2/2] Starting frontend (port 3000)..." -ForegroundColor Yellow
$frontendJob = Start-Job -Name "ai-frontend" -ScriptBlock {
    cd "$using:PSScriptRoot\frontend\dist"
    npx serve
}

Write-Host ""
Write-Host "======================================" -ForegroundColor Cyan
Write-Host "  AI DevOps Monitor is running!" -ForegroundColor Green
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "  Backend API:  https://localhost:8000" -ForegroundColor White
Write-Host "  Frontend UI:  http://localhost:3000" -ForegroundColor White
Write-Host ""
Write-Host "  To stop, run:  Stop-Job -Name 'ai-backend', 'ai-frontend'" -ForegroundColor Gray
Write-Host "======================================" -ForegroundColor Cyan

# Keep script alive to show output
while ($true) {
    $b = Get-Job -Name "ai-backend" -ErrorAction SilentlyContinue
    $f = Get-Job -Name "ai-frontend" -ErrorAction SilentlyContinue
    if (-not $b -or $b.State -eq 'Failed' -or -not $f -or $f.State -eq 'Failed') {
        Write-Host "A server stopped unexpectedly!" -ForegroundColor Red
        Receive-Job -Name "ai-backend" -ErrorAction SilentlyContinue
        Receive-Job -Name "ai-frontend" -ErrorAction SilentlyContinue
        break
    }
    Start-Sleep -Seconds 10
}
