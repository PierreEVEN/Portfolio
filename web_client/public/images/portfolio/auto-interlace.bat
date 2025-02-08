@echo off
setlocal enabledelayedexpansion

rem Set the directory path (you can modify this as needed)
set "directory=.\"

rem Recursively list all files in the directory
for /r "%directory%" %%f in (*) do (
    echo Interlacing %%f
    magick %%f -interlace plane %%f
)

endlocal