@echo off
setlocal enabledelayedexpansion

set "directory=.\"
set "max_width=1920"

rem Convert all images to webp
for /r "%directory%" %%f in (*.png *.jpg *.jpeg) do (
    echo Converting %%f to WebP format
    magick "%%f" -interlace plane "%%~dpnf.webp"
    del "%%f"
)

rem limit resolution to max_res
for /r "%directory%" %%f in (*.webp) do (
    for /f "tokens=*" %%a in ('identify -format "%%w" "%%f"') do set "width=%%a"

    rem Check if the image is wider than the maximum width
    if !width! gtr %max_width% (
        rem Resize the image to fit the max width and convert to WebP
        echo Resizing %%f from !width! to %max_width% width
        magick "%%f" -resize %max_width%x -interlace plane "%%f"
    )
)