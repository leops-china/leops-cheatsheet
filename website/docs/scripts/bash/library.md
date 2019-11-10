## Docker 容器

```bashDD
# $1: container name
func_docker_destroy_container(){
	local exist=`docker ps -a |awk '{print $NF}'|grep $1`
	if [[ $exist == "" ]];then
		return 0
	fi
	docker kill $1 >/dev/null 2>&1
	if [[ $(docker version --format '{{.Server.Version}}') = 17.06.0* ]]; then
		# Workaround https://github.com/moby/moby/issues/33948.
		# TODO: remove when 17.06.0 is not relevant anymore
		DOCKER_API_VERSION=v1.29 docker wait "$1" >/dev/null 2>&1 || true
	else
		docker wait "$1" >/dev/null 2>&1 || true
	fi
	docker rm -f -v "$1" >/dev/null 2>&1 || true
}

#$1: imagename:tag
#ret: 0 exist, 1 not exist
func_docker_image_exist(){
	local ret=`docker images $1  |wc |awk '{ print $1 }'`
	if [[ $ret == "2" ]];then
		return 0
	fi
	return 1
}

#$1: imagename:tag
func_docker_destroy_image(){
	func_docker_image_exist $1
	if [[ $? == "0" ]];then
		docker rmi $1
	fi
}
```

## Openssl

```bash
#$1: keyfile
#$2: cafile
#$3: valid_days
func_self_signed_ca_interactive(){
	local key=$1
	local ca=$2
	local days=$3
	if [ ! -d `dirname $key` ];then
		mkdir -p `dirname $key`
	fi
	if [ ! -d `dirname $ca` ];then
		mkdir -p `dirname $ca`
	fi
	openssl req  -nodes -new -x509 -days ${days} -keyout ${key} -out ${ca}
}

#$1: result config file
#$2: prompt, yes/no
#$3: bits
#$4: keyfile
#$5: email
#$6: commonName
#$7: subjectAltName
func_cert_sign_req_config(){
	local config_file=$1
	local dir=`dirname $config_file`
	if [ ! -d $dir ];then
		mkdir -p $dir
	fi

	local prompt=$2
	local bits=$3
	local keyfile=$4
	local email=$5
	local commonName=$6
	local subjectAltName=$7

	cat > $config_file <<EOF
[ req ]
prompt                 = ${prompt}
default_bits           = ${bits}
default_keyfile        = ${keyfile}
distinguished_name     = req_distinguished_name
attributes             = req_attributes
x509_extensions        = v3_ca

dirstring_type = nobmp

[ req_distinguished_name ]

countryName                    = Country Name (2 letter code)
countryName_default            = CN
countryName_min                = 2
countryName_max                = 2

localityName                   = Locality Name (eg, city)
localityName_default           = BeiJing

organizationalUnitName         = Organizational Unit Name (eg, section)
organizationalUnitName_default = no

commonName                     = Common Name (eg, YOUR name)
commonName_default             = ${commonName}
commonName_max                 = 64

emailAddress                   = Email Address
emailAddress_default           = ${email}
emailAddress_max               = 40

[ req_attributes ]
challengePassword              = A challenge password
challengePassword_min          = 4
challengePassword_max          = 20

[ v3_ca ]
subjectKeyIdentifier=hash
authorityKeyIdentifier=keyid:always,issuer:always
basicConstraints = CA:true
subjectAltName=${subjectAltName}
EOF
}
```

## k8s

```bash
#Generate config file from k8s style params
#$1: Saved Config file
#$2: command
#$3..:  command params
func_gen_config_k8s(){
	local file=$1
	local cmd=$2
	shift 2
	echo "declare -A CONFIGS" >$file
	$cmd 2>&1 $* |sed '1d' |sed  -E  's/.*(--[^:]*):(.*)/\#\2\n\1/' | sed -E 's/\[(.*)\]/\1/' | sed -E "s/--(.*)=(.*)/CONFIGS\[\1\]=\'--\1=\2\'/" >>$file
}
```

## Time

```bash
func_since_1970(){
    echo `date +"%s"`
}
func_cur_date(){
    echo `date +"%Y%m%d"`
}
func_yesterday_date(){
    echo `date -d yesterday +"%Y%m%d"`
}
func_before_yesterday_date(){
    echo `date -d "-2 day" +"%Y%m%d"`
}
func_cur_time(){
    echo `date +"%Y-%m-%d %H:%M:%S"`
}
func_yesterday_time(){
    echo `date -d yesterday +"%Y-%m-%d %H:%M:%S"`
}
```

## 编码转换

```bash
#convert 16base into 10base
#
func_16to10(){
	echo "ibase=16;obase=A; $1"|bc
}
```

## 网卡

```bash
#Get the net interfaces's name
func_nic_names(){
	local names=`ip addr |grep \<.*\>|awk '{print $2}'|sed -e "s/://"`
	echo $names
}
```

## 错误日志

```bash
#$1: message
func_fatal(){
	echo  -n -e "\033[31m"
	echo "Fatal Error: $1"
echo -n -e "\033[0m"
exit
}
```

## 字体颜色

```bash
#Input is the command.
#The command's execute output will use red color
func_red_cmd(){
	echo  -n -e "\033[31m"
	$*
	echo  -n -e "\033[0m"
}

#Input is the command.
#The command's execute output will use yellow color
func_yellow_cmd(){
	echo  -n -e "\033[33m"
	$*
	echo  -n -e "\033[0m"
}

#Input is the command
#If command is error, display the error
func_error_cmd(){
	$*
	local ret=$?
	if [ ! $ret -eq 0 ];then
		echo  -n -e "\033[41;37m"
		echo "Error: [$ret] $*"
		echo  -n -e "\033[0m"
	fi
	return 0
}

#Input is the command
#If command is error, display the error and eixt
func_fatal_cmd(){
	$*
	local ret=$?
	if [ ! $ret -eq 0 ];then
		echo  -n -e "\033[41;37m"
		echo "Error: [$ret] $*"
		echo  -n -e "\033[0m"
		exit 1
	fi
	return 0
}

#Input is a string.
#The string  will be displayed with green color
func_green_str(){
	echo  -n -e "\033[32m"
	echo  -e "$*"
	echo  -n -e "\033[0m"
}

func_yellow_str(){
	echo  -n -e "\033[33m"
	echo  -e "$*"
	echo  -n -e "\033[0m"
}

#Input is a string.
#The string  will be displayed with red color
func_red_str(){
	echo  -n -e "\033[31m"
	echo  -e "$*"
	echo  -n -e "\033[0m"
}
```

## 系统服务

```bash
#Start a systemd style Service
func_start_sd_service(){
	systemctl start $1
	sleep 1
	local sta=`systemctl status ${1} |grep "Active: failed"`
	if [ -n "$sta" ];then
		func_red_str   "Start[Fail] $1"
		func_red_str   "            $sta"
		ret=1
	else
		local x=`systemctl status ${1} | grep "Active:"`
		func_green_str "Start[OK]   $1"
		func_green_str "            $x"
	fi
	return $ret
}

#Start a systemd style Service
func_stop_sd_service(){
	systemctl stop $1
	ret=$?
	local sta=`systemctl status ${1} |grep "Active:"`
	func_yellow_str "Stopping $1"
	func_yellow_str "         $sta"
}
```

## 目录操作

```bash
#Create Dirs: $1 $2 $3 ...
func_create_dirs(){
	for i in $*
	do
		if [ ! -d $i ];then
			mkdir -p $i
		fi
	done
}

#Force Copy:
#$1: Destiation Directory
#$2,$3,$4,...: Source File or Directories
func_force_copy(){
	local dest=$1
	shift 1

	if [ ! -d $dest ];then
		func_red_str "Dest Dir doesn't exist: $dest"
		return 1
	fi

	for i in $*
	do
		if [ ! -e $i ];then
			func_red_str "Not Found: $i"
			return 1
		fi
	done

	for i in $*
	do
		cp -rf $i $dest/
	done
}
```

## Git

```bash
#$1: respositry url
#$2：branch
#$3: tag
#$4: local directory
func_git_check_tag(){
	local url=$1
	local branch=$2
	local tag=$3
	local dir=$4

	if [ ! -e $dir ];then
		func_error_cmd git clone $url $dir
		if [ ! $?  -eq 0 ];then
			func_red_str "Something is wrong in cloning"
			return 1
		fi
	fi

	if [ ! -d $dir ];then
		func_red_str "The local respositry is not a directory"
		return 1
	fi

	local cur=`pwd`
	cd $dir
		func_error_cmd git checkout master
		func_error_cmd git pull
		func_error_cmd git checkout $branch
		func_error_cmd git checkout $tag
		if [ ! $? -eq 0 ];then
			return 1
		fi
	cd $cur
}
```

## 守护进程

```bash
#$1: pidfile
#$2: log file
#$4: commands
func_daemon_cmd(){
	local pidfile=$1
	local stdout="$2.stdout"
	local stderr="$2.stderr"
	shift 2

	$* 1>>$stdout 2>>$stderr &
	local pid=$!
	echo $pid >$pidfile
}

#$1: pid
func_check_pid(){
	ps -p $1 1>/dev/null 2>&1
	if [ $? -eq 0 ];then
		return 0
	fi
	return 1
}

#$1: pid
#$2: pid desc
func_exit_no_pid(){
	func_check_pid  $1
	if [ ! $? -eq 0 ];then
		func_red_str "Pid($1:$2) doesn't exist"
		exit 1
	fi
	return 0
}

#$1: pid file
#$2: log file
#$3: executuable binary file name
#$4: command
func_start_cmd(){
	local pidf=$1
	local logf=$2
	local name=$3
	shift 3
	local cmd=$*

	if [ -e $pidf ];then
		func_red_str "The PID file has already existed, please check: $pidf"
		func_yellow_str "It may be running or hasn't delete the PID file when it was stopped last time"
		exit 1
	fi
	func_daemon_cmd $pidf $logf $cmd
	sleep 1
	func_exit_no_pid `cat $pidf` "[Fail]${name} is not running!"
	if [ $? -eq 0 ];then
		return 0
	fi
}

#$1: pid file
func_stop_cmd(){
	local pidf=$1

	if [ ! -e $pidf ];then
		func_red_str "The PID file doesn't exist': $pidf"
		func_yellow_str "It may be not running"
		exit 1
	fi

	local pid=`cat $pidf`
	if [ "$pid" == "1" ];then
		func_red_str "You are not allowed to stop PID 1 !"
		exit 1
	else
		kill -9 $pid
		rm -rf $pidf
	fi
	return 0
}

#$1: Target executable  file
#$2: Log path
#$3: An config Array's name, the Array must be global. Becareful, Just give Name, not value(no $)
#$4: Other parametes from the command line, [start|stop]
func_service_template_1(){
	local TARGET=$1
	local Logs=$2
	eval config_2334200776=\${$3[@]}
	local cmdline=$4
	CMD="${TARGET} ${config_2334200776[@]}"
	NAME=`basename ${TARGET}`
	PID_FILE="${Logs}/${NAME}.pid"
	LOG_FILE="${Logs}/${NAME}"
	OPERATE="${Logs}/${NAME}.operate"

	start(){
		echo -e "`func_cur_time`: [start] $CMD" >>$OPERATE
		func_start_cmd $PID_FILE $LOG_FILE $NAME $CMD
		if [ $? == 0 ];then
			func_green_str "$TARGET is running"
		fi
	}

	stop(){
		echo -e "`func_cur_time`: [stop]" >>$OPERATE
		func_stop_cmd $PID_FILE
		if [ $? == 0 ];then
			func_red_str "$TARGET is terminated"
		fi
	}

	case $cmdline in
		(start)
			start;;
		(stop)
			stop;;
		(restart)
			stop;start;;
		(*)
			echo "usage: $0 [stop|start|restart]"
	esac
}
```

## 数组

```bash
#$1: sep string
#$2: prefix
#$3: Array's name, the Array must be global. Becareful, Just give Name, not value(no $)
#$4: postfix
func_join_array(){
	local sep=$1
	local prefix=$2
	local postfix=$4
	eval array_doimgaeg3234553=(\${$3[@]})
	local len=${#array_doimgaeg3234553[@]}

	if [ $len -eq 1 ];then
		echo ${prefix}${array_doimgaeg3234553[@]}${postfix}
		return 0
	fi

	local i=0
	local str=${prefix}${array_doimgaeg3234553[$i]}${postfix}
	i=$(($i+1))

	while [ $i -lt $len ]
	do
		str=${str}${sep}${prefix}${array_doimgaeg3234553[$i]}${postfix}
		i=$(($i+1))
	done
	echo $str
	return 0
}

#if value is in array, return 0, else return 1
#$1: value
#$2: Array's name, the Array must be global. Becareful, Just give Name, not value(no $)
func_in_array(){
	eval array_adfadfadfgli3323455=(\${$2[@]})
	for i in ${array_adfadfadfgli3323455[@]}
	do
		if [ $i == $1 ];then
			return 0
		fi
	done
	return 1
}
```

## 系统信息

```bash
#Get ipv4 address
func_ipv4_addr(){
	local ips=`ip addr |grep inet|grep -v inet6| awk '{print $2}'|sed "s/\/.*//"`
	echo $ips
}
```

## 更新

```bash
#return 0: the file is updated  1: nothing is changed 2:remote is wrong.
#must checksum by sha1sum
#$1: local version file
#$2: remote version url
#$3: local file path
#$4: remote file url
func_update_file(){
	if [ ! -e $1 ];then
		func_red_str "Can't found Local Version"
		exit 1
	fi

	local lver=`cat $1`
	if [ "$lver" == "" ];then
		func_red_str "Local Version is NULL!"
		exit 1
	fi

	local rver=`curl $2 2>/dev/null |grep -v \<`
	if [ "$rver" == "" ];then
		func_red_str "Can't get Remote Version"
		exit 1
	fi

	if [ "$lver" == "$rver" ];then
		func_green_str "Local Version matches the Remote Version."
		return 1
	fi

	local lfile=$3
	curl -o $lfile  $4 2>/dev/null

	local lsha1=`sha1sum $lfile|awk '{print $1}'`
	local rsha1=`echo $rver|awk '{print $1}'`

	if [ "$lsha1" == "$rsha1" ];then
		func_green_str "The Remote Version file lays: $lfile"
		return 0
	else
		func_red_str "The Remote File dosen't match the Remote Version: $lfile"
		return 2
	fi
}

#$1: local file path
#$2: remote file url
func_replace_lfile(){
	curl -o $1 $2 2>/dev/null
}

#get a file and check the sha1 code
#$1 local file
#$2 file url
#$3 sha1 code url
func_curl_file_sha1(){
	local rsha1=`curl $3 2>/dev/null|grep -v \<|awk '{print $1}'`
	if [ "$rsha1" == "" ];then
		func_red_str "Can't the file sha1 code!"
		return 1
	fi
	curl -o $1 $2
	local lsha1=`sha1sum $1|awk '{print $1}'`

	if [ "$lsha1" == "$rsha1" ];then
		func_green_str "The File lays: $lfile"
		return 0
	else
		func_red_str "The File dosen't match the sha1 code: $1"
		return 2
	fi
}
```

## 交互操作

```bash
#$1: password
#$2...: cmds
func_cmd_need_password(){
	local password=$1
	shift 1
	expect -c "
		spawn $*
		expect {
			\"*password:\" {set timeout 300; send \"${password}\r\";}
			\"*yes/no\" {send \"yes\r\"; exp_continue;}
		}
	expect eof"
}

#$1: VARNAME
#$2: prompt
func_secret_input(){
	echo -n "$2"
	stty -echo
	read $1
	stty echo
	echo ""
}
```

## 随机数

```bash
function TimestampRand()
{
    range=$1
    timestamp=`date +%s%N`
    let res=$timestamp%$range
    echo $res
}

function RandomRand()
{
    range=$1
    let res=$RANDOM%$range
    echo $res
}

function UrandomRand()
{
    range=$1
    rand=`head -200 /dev/urandom | cksum | cut -f1 -d" "`
    let res=$rand%$range
    echo $res
}

function UuidRand()
{
    range=$1
    rand=`cat /proc/sys/kernel/random/uuid| cksum | cut -f1 -d" "`
    let res=$rand%$range
    echo $res
}


function exp()
{
    echo "基于时间戳: `TimestampRand 10`"
    echo "基于\$RANDOM: `RandomRand 10`"
    echo "基于urandom: `UrandomRand 10`"
    echo "基于uuid: `UuidRand 10`"

    str=""
    for i in `seq 1 6`;do
        str="$str`RandomRand 9`"
    done

    echo $str
    echo "字符翻转:"
    echo $str | rev

    echo $str | awk '{for(i=1;i<=length;i++){line=substr($0,i,1)line}}END{print line}'
}

function random_str()
{
  num=8
  [ ! -z $1 ] && num=$1
  base64 /dev/urandom | tr -d '/+' | dd bs=$num count=1 2>/dev/null
}

```

## IP 地址处理

```bash
# converts IPv4 as "A.B.C.D" to integer
ip4_to_int() {
  IFS=. read -r i j k l <<EOF
$1
EOF
  echo $(( (i << 24) + (j << 16) + (k << 8) + l ))
}

# converts interger to IPv4 as "A.B.C.D"
int_to_ip4() {
  echo "$(( ($1 >> 24) % 256 )).$(( ($1 >> 16) % 256 )).$(( ($1 >> 8) % 256 )).$(( $1 % 256 ))"
}

# returns the ip part of an CIDR
cidr_ip() {
  IFS=/ read -r ip _ <<EOF
$1
EOF
  echo $ip
}

# returns the prefix part of an CIDR
cidr_prefix() {
  IFS=/ read -r _ prefix <<EOF
$1
EOF
  echo $prefix
}

# returns net mask in numberic from prefix size
netmask_of_prefix() {
  echo $((4294967295 ^ (1 << (32 - $1)) - 1))
}

# returns default gateway address (network address + 1) from CIDR
cidr_default_gw() {
  ip=$(ip4_to_int $(cidr_ip $1))
  prefix=$(cidr_prefix $1)
  netmask=$(netmask_of_prefix $prefix)
  gw=$((ip & netmask + 1))
  int_to_ip4 $gw
}

# returns default gateway address (broadcast address - 1) from CIDR
cidr_default_gw_2() {
  ip=$(ip4_to_int $(cidr_ip $1))
  prefix=$(cidr_prefix $1)
  netmask=$(netmask_of_prefix $prefix)
  broadcast=$(((4294967295 - netmask) | ip))
  int_to_ip4 $((broadcast - 1))
}


ip4_to_int 192.168.0.1
# => 3232235521

int_to_ip4 3232235521
# => 192.168.0.1


# network address
ip=$(ip4_to_int 172.16.10.20)
netmask=$(ip4_to_int 255.255.252.0)
int_to_ip4 $((ip & netmask))
# => 172.16.8.0


# broadcast address
ip=$(ip4_to_int 172.16.10.20)
netmask=$(ip4_to_int 255.255.252.0)
int_to_ip4 $(((ip & netmask) + 1))
# => 172.16.8.1


cidr_ip "172.16.0.10/22"
# => 172.16.0.10

cidr_prefix "172.16.0.10/22"
# => 22

netmask_of_prefix 8
# => 4278190080


cidr_default_gw 192.168.10.1/24
# => 192.168.10.1
cidr_default_gw 192.168.10.1/16
# => 192.168.0.1
cidr_default_gw 172.17.18.19/20
# => 172.17.16.1


cidr_default_gw_2 192.168.10.1/24
# => 192.168.10.254
cidr_default_gw_2 192.168.10.1/16
# => 192.168.255.254
cidr_default_gw_2 172.17.18.19/20
# => 172.17.31.254
```
