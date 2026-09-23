Add-Type -AssemblyName System.Drawing
$files = @(
    'A:\Github\F1Community\public\imgDriversHamilton44.png',
    'A:\Github\F1Community\public\imgDriversAntonelli12.png',
    'A:\Github\F1Community\public\imgDriversRussel63.png'
)
foreach ($f in $files) {
    $img = [System.Drawing.Image]::FromFile($f)
    Write-Host ('{0}  {1}x{2}  {3}' -f (Split-Path $f -Leaf), $img.Width, $img.Height, $img.PixelFormat)
    $img.Dispose()
}