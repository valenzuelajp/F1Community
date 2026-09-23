Add-Type -AssemblyName System.Drawing

$file = 'A:\Github\F1Community\public\imgLogin.png'
$img = [System.Drawing.Bitmap]::FromFile($file)

$maxR = 0; $maxG = 0; $maxB = 0; $bright = 0; $anyRGB = 0; $total = 0
$brightest = @()
$step = 8
for ($y = 0; $y -lt $img.Height; $y += $step) {
    for ($x = 0; $x -lt $img.Width; $x += $step) {
        $p = $img.GetPixel($x, $y)
        $total++
        if ($p.R -gt $maxR) { $maxR = $p.R }
        if ($p.G -gt $maxG) { $maxG = $p.G }
        if ($p.B -gt $maxB) { $maxB = $p.B }
        if (($p.R + $p.G + $p.B) -gt 0) { $anyRGB++ }
        if (($p.R + $p.G + $p.B) -gt 300) { $bright++ }
        if (($p.R + $p.G + $p.B) -gt 500 -and $brightest.Count -lt 5) {
            $brightest += ('({0},{1}) A={2} R={3} G={4} B={5}' -f $x, $y, $p.A, $p.R, $p.G, $p.B)
        }
    }
}
Write-Host ('totalSamples={0} anyRGB={1} bright(>300)={2}' -f $total, $anyRGB, $bright)
Write-Host ('maxR={0} maxG={1} maxB={2}' -f $maxR, $maxG, $maxB)
if ($brightest.Count -gt 0) { $brightest | ForEach-Object { Write-Host $_ } } else { Write-Host 'NO bright pixels found' }
$img.Dispose()