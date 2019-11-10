## 更改网卡为 dhcp

```bat
@echo off
:::::::::::::::::::::::::::
:必须要管理员权限
:更改网卡为dhcp


netsh interface ip delete dns "Local Area Connection" all
netsh interface ip set address "Local Area Connection" dhcp
netsh interface ip delete dns "Local Area Connection" all
ipconfig /release
ipconfig /flushdns
netsh interface ip delete arpcache
ipconfig /renew
```

## 更改远程桌面端口

```bat
@echo off
::::::::::::::::::::::::::::
:必须要管理员权限
:首先写入一个注册表文件
:提醒用户输入需要更改的端口号
:由于这里需要十六进制数据，但是用户不会记录这个，所以要有一个转换过程
:转换完毕后继续写入注册表，然后运行该注册表，最后删除
echo Windows Registry Editor Version 5.00 >t1.reg
echo.
echo [HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Terminal Server\WinStations\RDP-Tcp] >>t1.reg
:::::::::::::::::::::::::::::::::::::十进制转换十六进制
setlocal enabledelayedexpansion
set hexstr=0 1 2 3 4 5 6 7 8 9 A B C D E F
set d=0
for %%i in (%hexstr%) do (set d!d!=%%i&set/a d+=1)
set/p scanf=请输入需要改变的RDP端口号，不可超过65535：
if not defined scanf exit/b
set dec=%scanf%
call :d2h
if not defined hex set hex=0
::echo %dec% 的十六进制为：0x%hex%
echo "PortNumber"=dword:0%hex% >>t1.reg
regedit /s t1.reg
del /q t1.reg
:d2h
if %scanf% equ 0 exit/b
set/a tscanf=%scanf%"&"15
set/a scanf">>="4
set hex=!d%tscanf%!!hex!
goto :d2h
```
