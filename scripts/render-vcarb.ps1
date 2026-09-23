# Rasterize the VCARB SVG onto an 800x800 transparent PNG using Edge headless.
$ErrorActionPreference = 'Stop'

$edge = 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
if (-not (Test-Path $edge)) {
    $edge = 'C:\Program Files\Microsoft\Edge\Application\msedge.exe'
}

$html = 'C:\Users\jpagu\AppData\Local\Temp\opencode\vcarb-render.html'
$out = 'A:\Github\F1Community\public\imgVcarb800X800.png'

if (Test-Path $out) { Remove-Item $out -Force }

$args = @(
    '--headless',
    '--disable-gpu',
    '--force-device-scale-factor=1',
    '--default-background-color=00000000',
    "--screenshot=$out",
    '--window-size=800,800',
    $html
)

& $edge @args

# Edge exits before writing; wait a moment and verify the file exists.
$deadline = (Get-Date).AddSeconds(10)
while (-not (Test-Path $out) -and (Get-Date) -lt $deadline) {
    Start-Sleep -Milliseconds 500
}

if (Test-Path $out) {
    Get-Item $out | Select-Object Name, Length
} else {
    Write-Error 'Screenshot file was not created.'
    exit 1
}