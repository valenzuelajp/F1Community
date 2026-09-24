Add-Type -AssemblyName System.Drawing

$files = @(
    'A:\Github\F1Community\public\race-week-variant5-160-8493.png',
    'A:\Github\F1Community\public\imgImage1.png',
    'A:\Github\F1Community\public\imgImage2.png',
    'A:\Github\F1Community\public\imgImage3.png',
    'A:\Github\F1Community\public\imgImage4.png',
    'A:\Github\F1Community\public\imgImage5.png',
    'A:\Github\F1Community\login-1440.png',
    'A:\Github\F1Community\assets\Screenshot 2026-09-16 122645.png'
)

foreach ($f in $files) {
    if (-not (Test-Path $f)) { Write-Host ("MISSING  " + (Split-Path $f -Leaf)); continue }
    $img = [System.Drawing.Bitmap]::FromFile($f)
    $maxR = 0; $maxG = 0; $maxB = 0; $anyRGB = 0; $total = 0
    $step = 24
    for ($y = 0; $y -lt $img.Height; $y += $step) {
        for ($x = 0; $x -lt $img.Width; $x += $step) {
            $p = $img.GetPixel($x, $y)
            $total++
            if ($p.R -gt $maxR) { $maxR = $p.R }
            if ($p.G -gt $maxG) { $maxG = $p.G }
            if ($p.B -gt $maxB) { $maxB = $p.B }
            if (($p.R + $p.G + $p.B) -gt 0) { $anyRGB++ }
        }
    }
    Write-Host ('{0}  {1}x{2}  maxR={3} maxG={4} maxB={5}  anyRGB={6}/{7}' -f (Split-Path $f -Leaf), $img.Width, $img.Height, $maxR, $maxG, $maxB, $anyRGB, $total)
    $img.Dispose()
}