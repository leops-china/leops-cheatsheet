## 监控文件夹变换

```powershell
# 定义要监控的文件夹，这个文件夹必须先存在。
$folder = 'D:\images\'
# 定义每次监控的间隔时间，这时定义为1000毫秒，即1秒
$timeout = 1000
# 创建文件系统监视对象
$FileSystemWatcher = New-Object System.IO.FileSystemWatcher $folder
# 监控文件下的子文件夹
$FileSystemWatcher.IncludeSubdirectories = $true;
# 过滤监控的文件类型
$FileSystemWatcher.Filter = "*.as*";
Write-Host ”按 CTRL+C 来退出对文件夹 $folder 的监控”
while ($true) {
  # 监控文件夹内的所有变化
  $result = $FileSystemWatcher.WaitForChanged('all', $timeout)
  if ($result.TimedOut -eq $false)
   {
   # 当文件夹的内容变化时，发出警告提示
   Write-Warning ('File {0} : {1}' -f $result.ChangeType, $result.name)
   $title = ('File {0} : {1}' -f $result.ChangeType, $result.name)
   $body = ('File {0} : {1}{2}' -f $result.ChangeType, $folder,$result.name)
   # (Get-Credential).password | ConvertFrom-SecureString > mpass.txt  生成密码文件，输入smt验证的用户名和密码
   $pw = Get-Content .\mpass.txt | ConvertTo-SecureString
   $cred = New-Object System.Management.Automation.PSCredential "noreplay@test.com", $pw
   Send-MailMessage  -To test@test.com  -from "文件监控 <noreplay@test.com>"  -Subject "$title" -Body "$body" -encoding ([System.Text.Encoding]::UTF8) -priority High -smtpServer smtp.test.com -Credential $cred;

   }
}
Write-Host '监控被取消.'
```
