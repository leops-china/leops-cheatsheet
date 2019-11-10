## shell 模板

```bash
#!/bin/env bash
###################################################################
#Script Name	:
#Description	:
#Args           :
#Update Date    :
#Author       	: lework
#Email         	: lework@yeah.net
###################################################################

set -o errexit          # Exit on most errors (see the manual)
set -o errtrace         # Make sure any error trap is inherited
set -o nounset          # Disallow expansion of unset variables
set -o pipefail         # Use last non-zero exit code in a pipeline


TAG="CMD"
LOG_PATH="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )/logs"
LOG_FILE="$LOG_PATH/example_`date +"%Y%m%d"`.log"
HIDE_LOG=true

function log() {
    [ ! -d "$LOG_PATH" ] && mkdir -p $LOG_PATH
    if [ $HIDE_LOG ]; then
        echo -e "[`date +"%Y/%m/%d:%H:%M:%S %z"`] [`whoami`] [$TAG] $@" >> $LOG_FILE
    else
        echo "[`date +"%Y/%m/%d:%H:%M:%S %z"`] [`whoami`] [$TAG] $@" | tee -a $LOG_FILE
    fi
}

function script_trap_err() {
    local exit_code=1

    # Disable the error trap handler to prevent potential recursion
    trap - ERR

    # Consider any further errors non-fatal to ensure we run to completion
    set +o errexit
    set +o pipefail

    log "[E] ERROR"

    exit "$exit_code"
}

function script_trap_exit() {
    log "[I] shell exec done."
}

function main() {
    trap script_trap_err ERR
    trap script_trap_exit EXIT

    log "[I] shell start"

}

main "${@}"

```

## 日志处理

```bash
#!/bin/env bash


LOGFILE=log.log
RETAIN_NUM_LINES=10

function logsetup {
    TMP=$(tail -n $RETAIN_NUM_LINES $LOGFILE 2>/dev/null) && echo "${TMP}" > $LOGFILE
    exec > >(tee -a $LOGFILE)
    exec 2>&1
}

function log {
    echo "[$(date --rfc-3339=seconds)]: $*"
}

logsetup
log hello this is a log
```

## 通过代理下载谷歌 Docker 容器

```bash
#!/bin/env bash
#
# lework
# Download Google container image from proxy point.


######################################################################################################
# environment configuration
######################################################################################################

RED='\033[0;31m'
GREEN='\033[0;32m'
ORANGE='\033[0;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
GREEN_PS3=$'\e[0;32m'
ORANGE_PS3=$'\e[0;33m'
WHITE='\033[0;37m'

proxy=(
  "gcr.azk8s.cn/google_containers"
  "registry.aliyuncs.com/google_containers"
  "gcrxio"
)
images=(
  "k8s.gcr.io/kube-apiserver:"
  "k8s.gcr.io/kube-controller-manager:"
  "k8s.gcr.io/kube-scheduler:"
  "k8s.gcr.io/kube-proxy:"
  "k8s.gcr.io/pause-amd64:3.1"
)

######################################################################################################
# function
######################################################################################################

function check() {
  docker info >/dev/null 2>1
  if [ "$?" != "0" ]; then
    echo -e "${RED}Please check if the docker service is started or installed."
    tput sgr0
    exit 1
  fi
}

function pull() {
  local image_url=$1
  local image=${image_url##*/}

  for proxy_url in ${proxy[*]}; do
    [ "${proxy_url:0-1}" != "/" ] && proxy_url=$proxy_url/
    echo -e "${ORANGE}[Proxy:] $proxy_url"
    echo -e "[Image:] $image_url"
    tput sgr0
    docker pull $proxy_url$image
    if [ "$?" == "0" ]; then
      docker tag $proxy_url$image $image_url
      docker images ${image_url}
      echo -e "${ORANGE}[Delete:] Delete Proxy image."
      tput sgr0
      docker rmi $proxy_url$image
      echo -e "${GREEN}[Result:] Pull image success."
      tput sgr0
      echo
      break
    else
      echo -e "${RED}[Result:] Pull image failed."
      tput sgr0
      echo
    fi
  done
}

function usage {
    echo "Download the Google docker image through the proxy node"
    echo
    echo "Usage: $0 [[[-p proxy] [-i image] | [-t tag] | [-f file]] | [-h]]"
    echo "  -p,--proxy      Specify proxy node url"
    echo "  -i,--image      Specify the image name"
    echo "  -t,--tag        Specify the image tag and download the k8s family bucket."
    echo "  -f,--file       Specify a file path containing the name"
    echo "  -h,--help       View help"
    echo
    echo
    echo "Example:"
    echo "  $0 gcr.io/google_containers/pause-amd64:3.1"
    echo "  $0 \"k8s.gcr.io/kube-{apiserver,controller-manager,proxy,scheduler}:v1.14.3\""
    echo "  $0 -i k8s.gcr.io/pause-amd64:3.1"
    echo "  $0 -p registry.aliyuncs.com/google_containers -i k8s.gcr.io/pause-amd64:3.1"
    echo "  $0 -t v1.14.3"
    echo "  $0 -f ./images.txt"
    echo
    exit 1
}


######################################################################################################
# main
######################################################################################################

check

[ "$#" == "0" ] && usage

while [ "$1" != "" ]; do
    case $1 in
        -p | --proxy )          shift
                                unset proxy
                                proxy=$1
                                ;;
        -i | --image )          shift
				image_url=$1
                                ;;
        -t | --tag )            shift
				tag=$1
                                ;;
        -f | --file )           shift
				file=$1
                                ;;
        -h | --help )           usage
                                exit
                                ;;
        *\.* | *\/*)            image_url=$1
                                ;;
        * )                     usage
                                exit 1
    esac
    shift
done

if echo "$image_url" | grep -q "{"; then
  prefix_image=$(echo $image_url | cut -d '{' -f 1)
  tag_image=$(echo $image_url | cut -d ':' -f 2)
  muti_image=$(echo $image_url | cut -d '{' -f 2 | cut -d '}' -f 1)
  for i in $(echo $muti_image | tr "," "\n")
  do
    pull $prefix_image$i:$tag_image
  done
  exit 0
fi

if [ "$tag" != "" ]; then
  for image in ${images[*]}
  do
    [ "${image:0-1}" == ":" ] && pull $image$tag || pull $image
  done
  exit 0
fi

if [ "$file" != "" ]; then
  while IFS= read line
  do
    pull $line
  done <"$file"
  exit 0
fi

pull $image_url
```

## 获取系统资源

> 以 json 数据格式返回

```bash
#!/bin/bash
#
# author: lework
# date: 2019-10-11


######################################################################################################
# Environmental configuration
######################################################################################################

export PATH=$PATH:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/root/bin


######################################################################################################
# Define globle variable
######################################################################################################

system_facts=''
cpu_facts=''
mem_facts=''
disk_facts=''
network_facts=''

bad=''
critical=''

bad_threshold=80
critical_threshold=90


######################################################################################################
# Define function
######################################################################################################

function check_used() {
  # 依据阀值设置,进行标记严重程度

  item=$1
  value=${2:-0}

  if [[ ${value%.*} -ge ${critical_threshold%.*} ]]; then
    critical=${critical}'"'${item}'",'
  elif [[ ${value%.*} -ge ${bad_threshold%.*} ]]; then
    bad=${bad}'"'${item}'",'
  fi

}


function get_system() {
  # 获取系统信息

  hostname=$(hostname 2>/dev/null)
  default_ipv4=$(ip -4 route get 8.8.8.8 2>/dev/null | head -1 | awk '{print $7}')
  distribution=$(awk '/^ID=/' /etc/*-release 2>/dev/null | awk -F'=' '{gsub("\"","");print $2}')
  distribution_version=$(python -c 'import platform; print platform.linux_distribution()[1]' 2>/dev/null)
  [ -z $distribution_version ] && distribution_version=$(awk '/^VERSION_ID=/' /etc/*-release 2>/dev/null | awk -F'=' '{gsub("\"","");print $2}')
  os_pretty_name=$(awk '/^PRETTY_NAME=/' /etc/*-release 2>/dev/null | awk -F'=' '{gsub("\"","");print $2 }')
  kernel=$(uname -r 2>/dev/null)
  os_time=$(date +"%F %T" 2>/dev/null)
  uptime=$(uptime 2>/dev/null |awk '{print $3}'|awk -F, '{print $1}')

  system_facts=$(cat << EOF
  {
    "hostname": "${hostname:-}",
    "default_ipv4": "${default_ipv4:-}",
    "distribution": "${distribution:-}",
    "distribution_version": "${distribution_version:-}",
    "os_pretty_name": "${os_pretty_name:-}",
    "kernel": "${kernel:-}",
    "os_time": "${os_time:-}",
    "uptime": "${uptime:-}"
  }
EOF
  )

}


function get_cpu() {
  # 获取cpu使用信息

  cpu_usedutilization=$(cat <(grep 'cpu ' /proc/stat) <(sleep 1 && grep 'cpu ' /proc/stat) | awk -v RS="" '{printf ("%.2f\n", ($13-$2+$15-$4)*100/($13-$2+$15-$4+$16-$5))}')
  cpu_loadavg1=$(awk '{print $1}' /proc/loadavg)
  cpu_loadavg5=$(awk '{print $2}' /proc/loadavg)
  cpu_loadavg15=$(awk '{print $3}' /proc/loadavg)

  cpu_facts=$(cat << EOF
  {
    "cpu_usedutilization": "${cpu_usedutilization:-0}",
    "cpu_loadavg1": "${cpu_loadavg1:-0}",
    "cpu_loadavg5": "${cpu_loadavg5:-0}",
    "cpu_loadavg15": "${cpu_loadavg15:-0}"
  }
EOF
  )

  check_used 'cpu_usedutilization' ${cpu_usedutilization}
  check_used 'cpu_loadavg1' ${cpu_loadavg1}
  check_used 'cpu_loadavg5' ${cpu_loadavg5}
  check_used 'cpu_loadavg15' ${cpu_loadavg15}

}


function get_mem() {
  # 获取内存使用信息

  memfree=$(awk -F":|kB" '$1~/^MemFree/{gsub(/ +/,"",$0);print $2}' /proc/meminfo)
  memavailable=$(awk -F":|kB" '$1~/^MemAvailable/{gsub(/ +/,"",$0);print $2}' /proc/meminfo)
  memtotal=$(awk -F":|kB" '$1~/^MemTotal/{gsub(/ +/,"",$0);print $2}' /proc/meminfo)
  memcache=$(awk -F":|kB" '$1~/^Cached/{gsub(/ +/,"",$0);print $2}' /proc/meminfo)
  membuffer=$(awk -F":|kB" '$1~/^Buffers/{gsub(/ +/,"",$0);print $2}' /proc/meminfo)
  swaptotal=$(awk -F":|kB" '$1~/^SwapTotal/{gsub(/ +/,"",$0);print $2}' /proc/meminfo)
  swapfree=$(awk -F":|kB" '$1~/^SwapFree/{gsub(/ +/,"",$0);print $2}' /proc/meminfo)

  [ "${memtotal:-0}" != "0" ] && mem_usedutilization=$(echo "${memtotal:-0} ${memfree:-0} ${memcache:-0} ${membuffer:-0}" | awk '{printf ("%.2f\n", ($1-$2-$3-$4)*100/$1)}')
  [ "${swaptotal:-0}" != "0" ] && swap_usedutilization=$(echo "${swaptotal:-0} ${swapfree:-0}"| awk '{printf ("%.2f\n", ($1-$2)*100/$1)}')

  mem_facts=$(cat << EOF
  {
    "memtotal": "${memtotal:-}",
    "memfree": "${memfree:-}",
    "memavailable": "${memavailable:-}",
    "memcache": "${memcache:-}",
    "membuffer": "${membuffer:-}",
    "mem_usedutilization": "${mem_usedutilization:-0}",
    "swaptotal": "${swaptotal:-}",
    "swapfree": "${swapfree:-}",
    "swap_usedutilization": "${swap_usedutilization:-0}"
  }
EOF
  )

  check_used 'mem' ${mem_usedutilization}
  check_used 'swap' ${swap_usedutilization}

}


function get_disk() {
  # 获取磁盘使用信息

  mount=$(grep '^/dev/' /proc/mounts | grep -v -E 'docker|containers|iso9660|kubelet' | awk '{print $2}')

  for m in ${mount:-}; do
    size_total=$(df -hP $m 2>/dev/null | awk 'END{print $2}')
    size_use=$(df -hP $m 2>/dev/null | awk 'END{print $3}')
    size_available=$(df -hP $m 2>/dev/null | awk 'END{print $4}')
    size_usedutilization=$(df -hP $m 2>/dev/null | awk 'END{sub(/'%'/,"");print $5}')
    block_total=$(df -hPBM $m 2>/dev/null | awk 'END{print $2}')
    block_use=$(df -hPBM $m 2>/dev/null | awk 'END{print $3}')
    block_available=$(df -hPBM $m 2>/dev/null | awk 'END{print $4}')
    block_usedutilization=$(df -hPBM $m 2>/dev/null | awk 'END{sub(/'%'/,"");print $5}')
    inode_total=$(df -hPi $m 2>/dev/null | awk 'END{print $2}')
    inode_use=$(df -hPi $m 2>/dev/null | awk 'END{print $3}')
    inode_available=$(df -hPi $m 2>/dev/null | awk 'END{print $4}')
    inode_usedutilization=$(df -hPi $m 2>/dev/null | awk 'END{sub(/'%'/,"");print $5}')

    mount_facts=${mount_facts:-''}$(cat <<EOF
    {
      "mount": "${m:-}",
      "size_total": "${size_total:-}",
      "size_use": "${size_use:-}",
      "size_available": "${size_available:-}",
      "size_usedutilization": "${size_usedutilization:-0}",
      "block_total": "${block_total:-}",
      "block_use": "${block_use:-}",
      "block_available": "${block_available:-}",
      "block_usedutilization": "${block_usedutilization:-0}",
      "inode_total": "${inode_total:-}",
      "inode_use": "${inode_use:-}",
      "inode_available": "${inode_available:-}",
      "inode_usedutilization": "${inode_usedutilization:-0}"
    },
EOF
    )

    check_used 'mount_size_'${m} ${size_usedutilization}
    check_used 'mount_block_'${m} ${block_usedutilization}
    check_used 'mount_inode_'${m} ${inode_usedutilization}
  done

  disk_facts="["${mount_facts%?}"]"

}


function get_network() {
  # 获取网络信息

  stat=$(netstat -nat 2>/dev/null | awk '/^tcp/{++S[$NF]}END{for(m in S) print "\"" m "\":",S[m] ","}')

  conn="None"
  curl -V >/dev/null 2>&1
  if [ $? -eq 0 ]; then
    curl -sI http://www.baidu.com 2>/dev/null | grep '200 OK' >/dev/null 2>&1
    [ $? -eq 0 ] && conn="True"
  fi
  network_facts=$(cat << EOF
  {
    "tcpconnection": {${stat%?}},
    "conn": "${conn}"
  }
EOF
  )

}


function main() {
  # 脚本主要流程

  get_system
  get_cpu
  get_mem
  get_disk
  get_network


  [ ! -z $bad ] && bad='['${bad%?}']'
  [ ! -z $critical ] && critical='['${critical%?}']'

  check_facts=$(cat << EOF
  {
    "system": ${system_facts:-[]},
    "cpu": ${cpu_facts:-[]},
    "mem": ${mem_facts:-[]},
    "disk": ${disk_facts:-[]},
    "network": ${network_facts:-[]},
    "bad": ${bad:-[]},
    "critical": ${critical:-[]}
  }
EOF
  )

  echo ${check_facts:-[]}

}


######################################################################################################
# main
######################################################################################################

main

```
