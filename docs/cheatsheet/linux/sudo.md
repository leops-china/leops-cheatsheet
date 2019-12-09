# sudo

## 配置文件

```
# /etc/sudoers

# 授权用户/组 主机=[(切换到哪些用户或组)] [是否需要输入密码验证] 命令1,命令2,

# 授予用户所有权限
test ALL=(ALL:ALL) ALL

# 授予用户组所有权限
%wheel ALL=(ALL) ALL

# 不需要输入密码
test ALL=(ALL) NOPASSWD: ALL

# 允许users用户组中的用户像root用户一样使用mount\unmount cdrom命令
%users ALL=/sbin/mount /mnt/cdrom, /sbin/umount /mnt/cdrom

# 不需要输入密码执行命令
lucy ALL=(ALL) NOPASSWD: /bin/useradd
```
