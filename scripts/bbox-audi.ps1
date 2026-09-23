# Compute the non-transparent bounding box of the rendered Audi PNG.
Add-Type -AssemblyName System.Drawing

$path = 'A:\Github\F1Community\public\imgAudi800X800.png'
$bmp = New-Object System.Drawing.Bitmap($path)

$minX = $bmp.Width; $minY = $bmp.Height; $maxX = -1; $maxY = -1
for ($y = 0; $y -lt $bmp.Height; $y++) {
    for ($x = 0; $x -lt $bmp.Width; $x++) {
        if ($bmp.GetPixel($x, $y).A -gt 10) {
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
        }
    }
}
Write-Host ('content bbox: x {0}..{1}  y {2}..{3}' -f $minX, $maxX, $minY, $maxY)
Write-Host ('size: {0}x{1}' -f ($maxX - $minX + 1), ($maxY - $minY + 1))
$bmp.Dispose()