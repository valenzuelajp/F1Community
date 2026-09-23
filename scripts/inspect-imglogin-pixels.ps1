Add-Type -AssemblyName System.Drawing

$file = 'A:\Github\F1Community\public\imgLogin.png'
$img = [System.Drawing.Bitmap]::FromFile($file)
Write-Host ('size {0}x{1}  format {2}' -f $img.Width, $img.Height, $img.PixelFormat)

# Sample a grid of points and report alpha + color
$samples = @(
    @{ x = 0; y = 0 },
    @{ x = 1280; y = 0 },
    @{ x = 2559; y = 0 },
    @{ x = 0; y = 850 },
    @{ x = 1280; y = 850 },
    @{ x = 2559; y = 850 },
    @{ x = 0; y = 1699 },
    @{ x = 1280; y = 1699 },
    @{ x = 2559; y = 1699 }
)
foreach ($s in $samples) {
    $p = $img.GetPixel($s.x, $s.y)
    Write-Host ('({0},{1}) A={2} R={3} G={4} B={5}' -f $s.x, $s.y, $p.A, $p.R, $p.G, $p.B)
}

# Overall alpha stats
$minA = 255; $maxA = 0; $opaque = 0; $nonTransparent = 0
$step = 32
for ($y = 0; $y -lt $img.Height; $y += $step) {
    for ($x = 0; $x -lt $img.Width; $x += $step) {
        $p = $img.GetPixel($x, $y)
        if ($p.A -lt $minA) { $minA = $p.A }
        if ($p.A -gt $maxA) { $maxA = $p.A }
        if ($p.A -eq 255) { $opaque++ }
        if ($p.A -gt 0) { $nonTransparent++ }
    }
}
Write-Host ('alpha min={0} max={1} opaqueSamples={2} nonTransparentSamples={3}' -f $minA, $maxA, $opaque, $nonTransparent)
$img.Dispose()