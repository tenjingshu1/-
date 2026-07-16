$ErrorActionPreference = "Stop"
$dist = Join-Path $PSScriptRoot "app\dist"
Set-Location -LiteralPath $dist
Write-Host "城管领域本体库：http://192.168.4.93:3004/"
python -m http.server 3004 --bind 0.0.0.0
