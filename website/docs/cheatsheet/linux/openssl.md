# Openssl

在计算机网络上，OpenSSL是一个开放源代码的软件库包，应用程序可以使用这个包来进行安全通信，避免窃听，同时确认另一端连线者的身份。这个包广泛被应用在互联网的网页服务器上。 其主要库是以C语言所写成，实现了基本的加密功能，实现了SSL与TLS协议。 



- [官网]([https://www.openssl.org](https://www.openssl.org/))



## 格式说明

PKCS 全称是 Public-Key Cryptography Standards ，是由 RSA 实验室与其它安全系统开发商为促进公钥密码的发展而制订的一系列标准，PKCS 目前共发布过 15 个标准。 常用的有：

| 标准      | 描述                                                         |
| --------- | ------------------------------------------------------------ |
| PKCS#7    | Cryptographic Message Syntax Standard                        |
| PKCS#10   | Certification Request Standard                               |
| PKCS#12   | Personal Information Exchange Syntax Standard                |
| X.509     | 是常见通用的证书格式。所有的证书都符合为Public Key Infrastructure (PKI) 制定的 ITU-T X509 国际标准。 |
| PKCS#7    | 常用的后缀是： .P7B .P7C .SPC                                |
| PKCS#12   | 常用的后缀有： .P12 .PFX                                     |
| X.509 DER | 编码(ASCII)的后缀是： .DER .CER .CRT                         |
| X.509 PAM | 编码(Base64)的后缀是： .PEM .CER .CRT                        |
| .cer/.crt | 是用于存放证书，它是2进制形式存放的，不含私钥。              |
| .pem      | 跟crt/cer的区别是它以Ascii来表示。                           |
| pfx/p12   | 用于存放个人证书/私钥，他通常包含保护密码，2进制方式         |
| p10       | 是证书请求                                                   |
| p7r       | 是CA对证书请求的回复，只用于导入                             |
| p7b       | 以树状展示证书链(certificate chain)，同时也支持单个证书，不含私钥。 |

## 格式内容

### RSA Public Key

```
-----BEGIN RSA PUBLIC KEY-----
-----END RSA PUBLIC KEY-----
```

### Encrypted PEM Private Key

```
-----BEGIN RSA PRIVATE KEY-----
Proc-Type: 4,ENCRYPTED
-----END RSA PRIVATE KEY-----
```

### CRL

```
-----BEGIN X509 CRL-----
-----END X509 CRL-----
```

### CRT

```
-----BEGIN CERTIFICATE-----
-----END CERTIFICATE-----
```

### CSR

```
-----BEGIN CERTIFICATE REQUEST-----
-----END CERTIFICATE REQUEST-----
```

### NEW CSR

```
-----BEGIN NEW CERTIFICATE REQUEST-----
-----END NEW CERTIFICATE REQUEST-----
```

### PEM

```
-----END RSA PRIVATE KEY-----
-----BEGIN RSA PRIVATE KEY-----
```

### PKCS7

```
-----BEGIN PKCS7-----
-----END PKCS7-----
```

### PRIVATE KEY

```
-----BEGIN PRIVATE KEY-----
-----END PRIVATE KEY-----
```

### DSA KEY

```
-----BEGIN DSA PRIVATE KEY-----
-----END DSA PRIVATE KEY-----
```

### Elliptic Curve

```
-----BEGIN EC PRIVATE KEY-----
-----BEGIN EC PRIVATE KEY-----
```

### PGP Private Key

```
-----BEGIN PGP PRIVATE KEY BLOCK-----
-----END PGP PRIVATE KEY BLOCK-----
```

### PGP Public Key

```
-----BEGIN PGP PUBLIC KEY BLOCK-----
-----END PGP PUBLIC KEY BLOCK-----
```

为了让OpenSSL识别出它是一种PEM格式，它必须使用Base64进行编码，并带有以下头部

```
-----BEGIN CERTIFICATE-----
and footer :
-----END CERTIFICATE-----
```

此外，每行最大长度必须为79个字符。否则您将收到错误信息

```
2675996:error:0906D064:PEM routines:PEM_read_bio:bad base64 decode:pem_lib.c:818:
```

注意：PEM标准（RFC1421）强制使用64个字符长的行。 可以使用UNIX命令行实用程序转换存储为单行的PEM证书：

```bash
fold -w 64
```



## 格式互转

```bash
# crt  to  pfx(p12)
openssl pkcs12 -export -inkey server.key -in server.crt -out server.pfx

# csr  to  pfx(p12)
openssl pkcs12 -export -inkey server.key -in server.csr -out server.pfx

# pfx  to  x509
openssl pkcs12 -in onovps.com.pfx -nodes -out onovps.com.pem
openssl rsa -in onovps.com.pem -out onovps.com.key
openssl x509 -in onovps.com.pem -out onovps.com.crt

# rsa privkey to privkey
openssl pkcs8 -topk8 -nocrypt -in privkey.pem

# privkey to rsa privkey
openssl rsa -in server.key -out server_new.key

# pem  to  der
openssl x509 -in cert.crt -outform der -out cert.der

# der  to  pem
openssl x509 -in cert.crt -inform der -outform pem -out cert.pem

# pem  to  crt
openssl x509 -outform der -in certificate.pem -out certificate.crt

# crt  to  pem
openssl x509 -in client.crt -out client.der -outform der
openssl x509 -in client.der -inform der -outform pem -out client.pem

# p12(pfx)  to  pem
openssl pkcs12 -in keyStore.pfx -out keyStore.pem -nodes

# pem  to  p12(pfx)
openssl pkcs12 -export -out certificate.pfx -inkey privateKey.key -in certificate.crt -certfile CACert.crt

# pfx to jks
keytool -importkeystore -v  -srckeystore client.pfx -srcstoretype pkcs12  -destkeystore client.keystore -deststoretype jks

# jks to p12(pfx)
keytool -importkeystore -srckeystore client_pri.keystore -destkeystore client_pri.p12 -srcstoretype JKS -deststoretype PKCS12 -srcalias imgo.tv -destalias imgo.tv -noprompt

# crt  to  p2b
openssl crl2pkcs7 -nocrl -certfile child.crt -certfile ca.crt -out example.p7b

# p2b  to  crt
openssl pkcs7 -in example.p7b -print_certs -out example.crt

# pem to p7b
openssl crl2pkcs7 -nocrl -certfile certificate.cer -out certificate.p7b -certfile CACert.cer

# p7b to pem
openssl pkcs7 -print_certs -in certificate.p7b -out certificate.cer

# p7b to fpx
openssl pkcs7 -print_certs -in certificate.p7b -out certificate.cer

openssl pkcs12 -export -in certificate.cer -inkey privateKey.key -out certificate.pfx -certfile CACert.cer
```



## 生成自签名证书

```bash
# CA配置
touch /etc/pki/CA/index.txt
echo 00 > /etc/pki/CA/serial

# 创建 CA 根级证书
openssl genrsa -out ca.key 2048 # 生成key
openssl req -new -key ca.key -subj "/C=CN/ST=ShangHai/L=ShangHai/O=test/OU=test/CN=test-CA" -out ca.csr # 生成csr
openssl x509 -req -days 3650 -in ca.csr -signkey ca.key -out ca.crt # 生成crt

# 创建server证书
openssl genrsa -out server.key 2048 # 生成key
openssl req -new -key server.key -subj "/C=CN/ST=ShangHai/L=ShangHai/O=test/OU=test/CN=www.test.com" -batch -out server.csr # 生成csr
openssl ca -in server.csr -cert ca.crt -keyfile ca.key -out server.crt -days 3650 #生成crt

# 创建client证书
openssl genrsa -des3 -passout pass:123456 -out client2.key 2048 # 生成key
openssl req -new -key client.key -subj "/C=CN/ST=ShangHai/L=ShangHai/O=test/OU=test/CN=client.test.com" -out client.csr # 生成csr
openssl ca -in client.csr -cert ca.crt -keyfile ca.key -out client.crt -days 3650 # 生成crt

# 导出pl2格式, 大多数浏览器都能识别的 PKCS12 文件
openssl pkcs12 -export -clcerts -in client.crt -inkey client.key -out client.p12  

# 导出pem格式, curl客户端 使用
openssl x509 -in ca.crt -out ca.der -outform der
openssl x509 -in ca.der -inform der -outform pem -out ca.pem

openssl x509 -in client.crt -out client.der -outform der
openssl x509 -in client.der -inform der -outform pem -out client.pem
  
openssl rsa -in client.key -out client.der　-outform DER
openssl rsa -inform DER -outform PEM -in client.der -out client_key.pem
```



**生成带 SAN 的 CSR**

```bash
openssl req -new -sha256 -key double.ecc.key -subj "/" -reqexts SAN -config <(cat /etc/ssl/openssl.cnf <(printf "[SAN]\nsubjectAltName=DNS:a.com,DNS:www.a.com,DNS:b.com,DNS:www.b.com")) > double.ecc.csr 
```



**通过提供openssl配置文件为多域SAN证书生成CSR**

```bash
cat > req.conf <<EOF
[req]
prompt=no
default_md = sha256
distinguished_name = dn
req_extensions = req_ext

[dn]
CN=example.com

[req_ext]
subjectAltName=@alt_names

[alt_names]
DNS.1=example.com
DNS.2=www.example.com
DNS.3=ftp.example.com
EOF

openssl genrsa -des3 -passout pass:123456 -out client2.key 2048
openssl req -new -key client2.key -out client2.csr -config req.conf -passin pass:123456
openssl ca -in client2.csr -cert ca.crt -keyfile ca.key -out client2.crt -days 3650
```



**生成jks**

```bash
# 生成客户端端jks文件
openssl pkcs12 -export -in client.crt -inkey client.key -out client.pkcs12 
keytool -importkeystore -srckeystore client.pkcs12 -destkeystore client.jks -srcstoretype pkcs12
# 生成服务器端jks文件
openssl pkcs12 -export -in server.crt -inkey server.key -out server.pkcs12
keytool -importkeystore -srckeystore server.pkcs12 -destkeystore server.jks -srcstoretype pkcs12
```



**已有域名添加jks**

```bash
openssl pkcs12 -export -in xxx.com.crt -inkey xxx.com.key -out xxx.com.pkcs12
keytool -importkeystore -srckeystore xxx.com.pkcs12 -destkeystore xxx.com.jks -srcstoretype pkcs12
```



## 生成rsa公钥和私钥

```bash
# 生成私钥
openssl genrsa -out rsa_private_key.pem 1024

# 根据私钥生成公钥
openssl rsa -in rsa_private_key.pem -out rsa_public_key.pem -pubou

# 这时候的私钥还不能直接被使用，需要进行PKCS#8编码
openssl pkcs8 -topk8 -in rsa_private_key.pem -out pkcs8_rsa_private_key.pem -nocrypt

# 至此，可用的密钥对已经生成好了，私钥使用pkcs8_rsa_private_key.pem，公钥采用rsa_public_key.pem。
```



## 生成自签X.509证书

```bash
openssl req -new -outform PEM -out smtpd.crt -newkey rsa:2048 -nodes -keyout smtpd.key -keyform PEM -days 3650 -x509

# or

openssl req -nodes -newkey rsa:2048 -keyout example.key -out example.crt -x509 -days 365
openssl x509 -req -in example.csr -signkey example.key -out example.crt -days 365
openssl x509 -req -in child.csr -days 365 -CA ca.crt -CAkey ca.key -set_serial 01 -out child.crt
```



## 验证

```bash
# 验证证书
openssl verify -untrusted ca-chain.pem client-cert.pem

# 加入中间证书
openssl verify -CAfile root.pem -untrusted intermediate-chain.pem client-cert.pem
openssl verify -CAfile root.pem -untrusted <(cat intermediate1.pem intermediate2.pem) client-cert.pem
```

```bash
# 检测本地证书的过期时间
for pem in /etc/ssl/certs/*.pem; do 
       printf '%s: %s\n' \
          "$(date --date="$(openssl x509 -enddate -noout -in "$pem"|cut -d= -f 2)" --iso-8601)" \
          "$pem"
    done | sort
    
# 检测远程服务器的过期时间
function check_certs () {
  if [ -z "$1" ]
  then
    echo "domain name missing"
    exit 1
  fi
  name="$1"
  shift

  now_epoch=$( date +%s )

  dig +noall +answer $name | while read _ _ _ _ ip;
  do
    echo -n "$ip:"
    expiry_date=$( echo | openssl s_client -showcerts -servername $name -connect $ip:443 2>/dev/null | openssl x509 -inform pem -noout -enddate | cut -d "=" -f 2 )
    echo -n " $expiry_date";
    expiry_epoch=$( date -d "$expiry_date" +%s )
    expiry_days="$(( ($expiry_epoch - $now_epoch) / (3600 * 24) ))"
    echo "    $expiry_days days"
  done
}

curl --insecure -v https://www.google.com 2>&1 | awk 'BEGIN { cert=0 } /^\* Server certificate:/ { cert=1 } /^\*/ { if (cert) print }'
```

使用 s_client 进行检查

```bash
# OpenSSL s_client

openssl s_client -showcerts -servername www.example.com -connect www.example.com:443 </dev/null

# 证书的完整信息
echo | \
    openssl s_client -servername www.example.com -connect www.example.com:443 2>/dev/null | \
    openssl x509 -text
    
# OpenSSL TLSv1 command.
openssl s_client -connect google.com:443 -tls1 < /dev/null

# OpenSSL SSLv3 command.
openssl s_client -connect baidu.com:443 -ssl3 < /dev/null

# OpenSSL SSLv2 command.
openssl s_client -connect google.com:443 -ssl2 < /dev/null

# OpenSSL IMAP with TLSv1.
openssl s_client -connect imap.gmail.com:993 -tls1 < /dev/null

# OpenSSL SMTP with STARTTLS TLSv1.
openssl s_client -connect smtp.gmail.com:587 -starttls smtp -tls1 < /dev/null

# Nmap
# Nmap script command.
nmap --script ssl-enum-ciphers google.com


```



## 检查文件

```bash
# 检查公钥的MD5哈希值，以确保它与CSR或私钥中的内容匹配
openssl x509 -noout -modulus -in certificate.crt | openssl md5
openssl rsa -noout -modulus -in privateKey.key | openssl md5
openssl req -noout -modulus -in CSR.csr | openssl md5


# 检查证书
openssl req -text -noout -verify -in CSR.csr
openssl rsa -in privateKey.key -check
openssl x509 -in certificate.crt -text -noout
openssl pkcs12 -info -in keyStore.p12
```



## Java Key store

```bash
keytool -importcert -file certificate.cer -keystore keystore.jks -alias "Alias" 
 ..\..\bin\keytool -import -trustcacerts -keystore cacerts -storepass changeit -noprompt -alias yourAliasName -file path\to\certificate.cer
keytool -import -alias joe -file mycert.cer -keystore mycerts -storepass changeit
```





## 其他命令

```bash
# 打印出证书的内容：
openssl x509 -in cert.pem -noout -text

# 打印出证书的系列号
openssl x509 -in cert.pem -noout -serial

# 打印出证书的拥有者名字
openssl x509 -in cert.pem -noout -subject

# 以RFC2253规定的格式打印出证书的拥有者名字
openssl x509 -in cert.pem -noout -subject -nameopt RFC2253

# 在支持UTF8的终端一行过打印出证书的拥有者名字
openssl x509 -in cert.pem -noout -subject -nameopt oneline -nameopt -escmsb

# 输出证书签名者机构
openssl x509 -in certfile.pem -noout -issuer -issuer_hash

# 查看过期时间
openssl x509 -noout -in certificate.pem -dates

# 打印出证书的MD5特征参数
openssl x509 -in cert.pem -noout -fingerprint

# 打印出证书的SHA特征参数
openssl x509 -sha1 -in cert.pem -noout -fingerprint

# 把PEM格式的证书转化成DER格式
openssl x509 -in cert.pem -inform PEM -out cert.der -outform DER

# 把一个证书转化成CSR
openssl x509 -x509toreq -in cert.pem -out req.pem -signkey key.pem

# 给一个CSR进行处理，颁发字签名证书，增加CA扩展项
openssl x509 -req -in careq.pem -extfile openssl.cnf -extensions v3_ca -signkey key.pem -out cacert.pem

#给一个CSR签名，增加用户证书扩展项
openssl x509 -req -in req.pem -extfile openssl.cnf -extensions v3_usr -CA cacert.pem -CAkey key.pem -CAcreateserial

# 查看csr文件细节
openssl req -in my.csr -noout -text

# 去除密码
openssl rsa -in certkey.key -out nopassphrase.key
```

