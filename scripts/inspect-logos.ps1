# Inspect existing team logo PNG dimensions + check opacity, then convert the
# VCARB SVG (transparent 1050x350) to an 800x800 transparent PNG like the rest.
Add-Type -AssemblyName System.Drawing

$publicDir = 'A:\Github\F1Community\public'

Write-Host '--- Existing square logos ---'
Get-ChildItem (Join-Path $publicDir '*.png') | Where-Object {
    $_.Name -match 'img(Redbull|Mercedes|Alpine|Ferrari|Alpha|Alfa)'
} | ForEach-Object {
    $img = [System.Drawing.Image]::FromFile($_.FullName)
    Write-Host ('{0}  {1}x{2}  {3}' -f $_.Name, $img.Width, $img.Height, $img.PixelFormat)
    $img.Dispose()
}

Write-Host '--- Sample pixel alpha (corner vs center) of Red Bull ---'
$rb = New-Object System.Drawing.Bitmap((Join-Path $publicDir 'imgRedbull800X8001.png'))
Write-Host ('corner(0,0):  A={0} R={1} G={2} B={3}' -f $rb.GetPixel(0,0).A, $rb.GetPixel(0,0).R, $rb.GetPixel(0,0).G, $rb.GetPixel(0,0).B)
Write-Host ('center(400,400): A={0} R={1} G={2} B={3}' -f $rb.GetPixel(400,400).A, $rb.GetPixel(400,400).R, $rb.GetPixel(400,400).G, $rb.GetPixel(400,400).B)
$rb.Dispose()