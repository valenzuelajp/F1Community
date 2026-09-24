# Verify the rendered Audi PNG: dimensions, pixel format, and sample pixels.
Add-Type -AssemblyName System.Drawing

$path = 'A:\Github\F1Community\public\imgAudi800X800.png'
$bmp = New-Object System.Drawing.Bitmap($path)

Write-Host ('{0}x{1}  {2}' -f $bmp.Width, $bmp.Height, $bmp.PixelFormat)

$samples = @(
    'corner(0,0)', 0, 0,
    'corner(799,799)', 799, 799,
    'center(400,400)', 400, 400,
    'center(400,100)', 400, 100,
    'center(400,700)', 400, 700,
    'center(100,400)', 100, 400,
    'center(700,400)', 700, 400
)

for ($i = 0; $i -lt $samples.Length; $i += 3) {
    $label = $samples[$i]
    $x = $samples[$i + 1]
    $y = $samples[$i + 2]
    $p = $bmp.GetPixel($x, $y)
    Write-Host ('{0}: A={1} R={2} G={3} B={4}' -f $label, $p.A, $p.R, $p.G, $p.B)
}

# Count non-transparent pixels to confirm content was drawn.
$nonTransparent = 0
$total = $bmp.Width * $bmp.Height
for ($x = 0; $x -lt $bmp.Width; $x += 10) {
    for ($y = 0; $y -lt $bmp.Height; $y += 10) {
        if ($bmp.GetPixel($x, $y).A -gt 0) { $nonTransparent++ }
    }
}
Write-Host ('sampled non-transparent pixels: {0} (of {1} samples)' -f $nonTransparent, [Math]::Ceiling($bmp.Width / 10) * [Math]::Ceiling($bmp.Height / 10))

$bmp.Dispose()