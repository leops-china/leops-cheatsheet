# python的实践例子

## 邮件发送

```python

from email.header import Header
from email.mime.text import MIMEText

def send_mail(self, subject, content):
    """
    :param subject: str
    :param content: str
    :return: bool
    """

    mail_port = self.mail_config.get('mail_port', '')
    mail_host = self.mail_config.get('mail_host', '')
    mail_user = self.mail_config.get('mail_user', '')
    mail_pass = self.mail_config.get('mail_pass', '')
    to_list = self.mail_config.get('to_list', [])

    msg = MIMEText(content, _subtype='plain', _charset='utf-8')
    msg['Subject'] = Header(subject, 'utf-8')
    msg['From'] = mail_user
    msg['to'] = ",".join(to_list)
    try:
        s = smtplib.SMTP_SSL(mail_host, mail_port)
        s.login(mail_user, mail_pass)
        s.sendmail(mail_user, to_list, msg.as_string())
        s.quit()
        return True
    except Exception as e:
        return False

mail_config = {
  'mail_host': 'smtp.test.com',
  'mail_port': '465',
  'mail_user': 'ops@test.com',
  'mail_pass': 'test.',
  'to_list': ['test@test.com']
}
subject = 'hello'

send_mail(subject,mail_config)
```

## 企业微信发送

```python
import json
import requests


class WeChat(object):
    def __init__(self, corpid, secret, agentid):
        """
        初始化微信
        :param corpid:  企业ID
        :param secret:  密钥
        :param agentid: 应用id
        """
        self.url = "https://qyapi.weixin.qq.com"
        self.corpid = corpid
        self.secret = secret
        self.agentid = agentid
        self.token = ''
        self.msg = ''
        self.access_token()

    def access_token(self):
        """
        获取企业微信的 access_token
        :return:
        """
        url_arg = '/cgi-bin/gettoken?corpid={id}&corpsecret={crt}'.format(
            id=self.corpid, crt=self.secret)
        url = self.url + url_arg
        response = requests.get(url=url)
        text = response.text
        self.token = json.loads(text)['access_token']

    def messages(self, msg, touser, toparty, totag):
        """
        构建发送数据格式
        :param msg:
        :param touser:
        :param toparty:
        :param totag:
        :return:
        """
        values = {
            "msgtype": 'text',
            "agentid": self.agentid,
            "text": {'content': msg},
            "safe": 0
        }

        if touser:
            values['touser'] = touser
        if toparty:
            values['toparty'] = toparty
        if toparty:
            values['totag'] = totag

        self.msg = json.dumps(values)

    def send_message(self, msg, touser=None, toparty=None, totag=None):
        """
        发送消息
        :param msg: 消息内容
        :param touser: 指定用户id
        :param toparty:  指定部门id
        :param totag: 指定标签id
        :return:
        """
        self.messages(msg, touser, toparty, totag)

        send_url = '{url}/cgi-bin/message/send?access_token={token}'.format(
            url=self.url, token=self.token)
        response = requests.post(url=send_url, data=self.msg)
        print(response.json())
        errcode = json.loads(response.text)['errcode']

        if errcode == 0:
            print('Succesfully')
        else:
            print('Failed')

    def get_department_user(self, did):
        """
        获取部门成员列表
        :param did:  部门id
        :return:
        """
        send_url = '{url}/cgi-bin/user/simplelist?access_token={token}&department_id={did}&fetch_child=1'.format(
            url=self.url, token=self.token, did=did
        )
        response = requests.get(url=send_url)
        print(response.json())

    def get_department(self):
        """
        获取部门列表
        :return:
        """
        send_url = '{url}/cgi-bin/department/list?access_token={token}'.format(
            url=self.url, token=self.token
        )
        response = requests.get(url=send_url)
        print(response.json())


if __name__ == '__main__':
    corpid = "123456"
    secret = "123456"
    agentid = "123456"
    msg = "facts 123"
    touser = 'user'
    toparty = ''

    wechat = WeChat(corpid, secret, agentid)
    # wechat.send_message(msg, touser, toparty)
    wechat.get_department()
```

## 通过 aws 的 lambda 函数向企业微信发报警通知

```python
import json
from botocore.vendored import requests


def lambda_handler(event, context):
    # TODO implement
    url = "https://qyapi.weixin.qq.com"

    corpid = "123456"
    secret = "123456"
    agentid = "123456"
    touser = '123456'
    toparty = ''
    totag = ''

    headers = {'Content-Type': 'application/json'}

    access_token_url = '{url}/cgi-bin/gettoken?corpid={id}&corpsecret={crt}'.format(url=url, id=corpid, crt=secret)
    access_token_response = requests.get(url=access_token_url, headers=headers)
    token = json.loads(access_token_response.text)['access_token']

    send_url = '{url}/cgi-bin/message/send?access_token={token}'.format(url=url, token=token)
    print(event)
    message = event['Records'][0]['Sns']
    Timestamp = message['Timestamp']
    Subject = message['Subject']
    sns_message = json.loads(message['Message'])
    region = message['TopicArn'].split(':')[-3]

    if "ALARM" in Subject:
        title = '<font color=\"info\">[aws] 警报！！警报！！</font>'
    elif "OK" in Subject:
        title = '<font color=\"info\">[aws] 故障恢复</font>'
    else:
        title = '<font color=\"info\">[aws]</font>'

    content = title \
              + "\n> **详情信息**" \
              + "\n> 时间: " + Timestamp \
              + "\n> 内容: " + Subject \
              + "\n> 状态: <font color=\"comment\">{old}</font> => <font color=\"warning\">{new}</font>".format(
        old=sns_message['OldStateValue'], new=sns_message['NewStateValue']) \
              + "\n> " \
              + "\n> Region: " + sns_message['Region'] \
              + "\n> Namespace: " + sns_message['Trigger']['Namespace'] \
              + "\n> MetricName: " + sns_message['Trigger']['MetricName'] \
              + "\n> " \
              + "\n> AlarmName: " + sns_message['AlarmName'] \
              + "\n> AlarmDescription: " + sns_message['AlarmDescription'] \
              + "\n> " \
              + "\n> 详情请点击：[Alarm](https://{region}.console.amazonaws.cn/cloudwatch/home?region={region}#s=Alarms&alarm={alarm})".format(
        region=region, alarm=sns_message['AlarmName'])

    msg = {
        "msgtype": 'markdown',
        "agentid": agentid,
        "markdown": {'content': content},
        "safe": 0
    }

    if touser:
        msg['touser'] = touser
    if toparty:
        msg['toparty'] = toparty
    if toparty:
        msg['totag'] = totag

    response = requests.post(url=send_url, data=json.dumps(msg), headers=headers)

    errcode = json.loads(response.text)['errcode']
    if errcode == 0:
        print('Succesfully')
    else:
        print(response.json())
        print('Failed')


'''
报警
{
    "Records": [
        {
            "EventSource": "aws:sns",
            "EventVersion": "1.0",
            "EventSubscriptionArn": "arn:aws-cn:sns:cn-north-1:377051238643:baojing:c4e8c500-f3c0-4d12-ad07-21966357a4ae",
            "Sns": {
                "Type": "Notification",
                "MessageId": "e05e7190-311c-5d08-acf0-24643cf78474",
                "TopicArn": "arn:aws-cn:sns:cn-north-1:377051238643:baojing",
                "Subject": "ALARM: \"db_mem\" in China (Beijing)",
                "Message": "{\"AlarmName\":\"db_mem\",\"AlarmDescription\":\"db数据库可用内存不足5g\",\"AWSAccountId\":\"377051238643\",\"NewStateValue\":\"ALARM\",\"NewStateReason\":\"Threshold Crossed: 1 datapoint [1.50785441792E10 (12/09/19 09:06:00)] was greater than the threshold (5.0).\",\"StateChangeTime\":\"2019-09-12T09:11:07.155+0000\",\"Region\":\"China (Beijing)\",\"OldStateValue\":\"OK\",\"Trigger\":{\"MetricName\":\"FreeableMemory\",\"Namespace\":\"AWS/RDS\",\"StatisticType\":\"Statistic\",\"Statistic\":\"AVERAGE\",\"Unit\":null,\"Dimensions\":[{\"value\":\"db\",\"name\":\"DBInstanceIdentifier\"}],\"Period\":300,\"EvaluationPeriods\":1,\"ComparisonOperator\":\"GreaterThanThreshold\",\"Threshold\":5.0,\"TreatMissingData\":\"- TreatMissingData: missing\",\"EvaluateLowSampleCountPercentile\":\"\"}}",
                "Timestamp": "2019-09-12T09:11:07.222Z",
                "SignatureVersion": "1",
                "Signature": "KwapI3oT4030RnNYx9e6qjQw5UrfjeCIkO5aQ6gdCCWte1qot08QxoxI1iOusZkbuj2S9OZINFG4gyvN2oZVDEozjUVgUokrGBalBLMCJjv68DAz2FMGfiftiMY7d+N+ESpymqzNkLVFPxN5oTdbHo2P1eKiODILLDZYD31ICAmyXtl1NPfTLyDFlga+xvTnbF9Qzb8LwjzRr0VoZnnkCYp3lP/Mjr6zdT356Y7s9H8HEVp9YycoVkD2KJK5Bd2cyBuXsQc/I1RzYZbSxbAmqzSTUb0sLAuCTTUTaJRwvGXVtYH0G7fSXv6nDGB9eO8lWWkWBEHCAHcLoI8VyzPndQ==",
                "SigningCertUrl": "https://sns.cn-north-1.amazonaws.com.cn/SimpleNotificationService-3250158c6506d40f628c21ed8dad1787.pem",
                "UnsubscribeUrl": "https://sns.cn-north-1.amazonaws.com.cn/?Action=Unsubscribe&SubscriptionArn=arn:aws-cn:sns:cn-north-1:377051238643:baojing:c4e8c500-f3c0-4d12-ad07-21966357a4ae",
                "MessageAttributes": {}
            }
        }
    ]
}

恢复
{
    "Records": [
        {
            "EventSource": "aws:sns",
            "EventVersion": "1.0",
            "EventSubscriptionArn": "arn:aws-cn:sns:cn-north-1:377051238643:baojing:c4e8c500-f3c0-4d12-ad07-21966357a4ae",
            "Sns": {
                "Type": "Notification",
                "MessageId": "82a293cf-419e-51ba-8eac-c63b598669eb",
                "TopicArn": "arn:aws-cn:sns:cn-north-1:377051238643:baojing",
                "Subject": "OK: \"db_mem\" in China (Beijing)",
                "Message": "{\"AlarmName\":\"db_mem\",\"AlarmDescription\":\"db数据库可用内存不足5g\",\"AWSAccountId\":\"377051238643\",\"NewStateValue\":\"OK\",\"NewStateReason\":\"Threshold Crossed: 1 datapoint [1.50755950592E10 (12/09/19 09:49:00)] was not less than the threshold (5.0).\",\"StateChangeTime\":\"2019-09-12T09:54:32.108+0000\",\"Region\":\"China (Beijing)\",\"OldStateValue\":\"ALARM\",\"Trigger\":{\"MetricName\":\"FreeableMemory\",\"Namespace\":\"AWS/RDS\",\"StatisticType\":\"Statistic\",\"Statistic\":\"AVERAGE\",\"Unit\":null,\"Dimensions\":[{\"value\":\"db\",\"name\":\"DBInstanceIdentifier\"}],\"Period\":300,\"EvaluationPeriods\":1,\"ComparisonOperator\":\"LessThanThreshold\",\"Threshold\":5.0,\"TreatMissingData\":\"- TreatMissingData: missing\",\"EvaluateLowSampleCountPercentile\":\"\"}}",
                "Timestamp": "2019-09-12T09:54:32.174Z",
                "SignatureVersion": "1",
                "Signature": "FaxqVSttIR5A4jOLFE6fFrV/YjwXUYFoWaFvw6+5ItSaPJ1gsxfQOSaqWBct+X7DqBi5VBmqmH7CMhaWCXeHm8Uo3RL0nsy0gsXg4WTo6LCWqC4t+jtI53JjQfDedW3eTEVcYcRjPEcyocWvlSsIXVVE/cdoTJmt0Df9hRhgwRPMOCYC8AGMVgIZuOsOvdNvlACdUS0KJsWlKuoYtA/E0sAWugycxXiArj52vEfj7F7MLdCj+j94wGSImUlGeYc419NqBOjORZN0VtBwQ6fSAp8D1FzUBz58+zHa77UjlRMbnqm+CP2rr1cyd2Scqm8kUqwiemrQa4Ikrf0XngMLsg==",
                "SigningCertUrl": "https://sns.cn-north-1.amazonaws.com.cn/SimpleNotificationService-3250158c6506d40f628c21ed8dad1787.pem",
                "UnsubscribeUrl": "https://sns.cn-north-1.amazonaws.com.cn/?Action=Unsubscribe&SubscriptionArn=arn:aws-cn:sns:cn-north-1:377051238643:baojing:c4e8c500-f3c0-4d12-ad07-21966357a4ae",
                "MessageAttributes": {}
            }
        }
    ]
}
'''
```

## 阿里云短信发送

```python
from aliyunsdkcore.client import AcsClient
from aliyunsdkcore.request import CommonRequest


def send_sms(tel):

    client = AcsClient('<accessKeyId>', '<accessSecret>', 'cn-hangzhou')
    request = CommonRequest()
    request.set_accept_format('json')
    request.set_domain('dysmsapi.aliyuncs.com')
    request.set_method('POST')
    request.set_protocol_type('https')  # https | http
    request.set_version('2017-05-25')
    request.set_action_name('SendSms')

    request.add_query_param('RegionId', "cn-hangzhou")
    request.add_query_param('PhoneNumbers', tel)
    request.add_query_param('SignName', "在你身边云服务平台")
    request.add_query_param('TemplateCode', "SMS_131750117")
    request.add_query_param('TemplateParam', "{\"code\":\""++"\"}")

    response = client.do_action(request)
    # python2:  print(response)
    print(str(response, encoding='utf-8'))
        
if __name__ == "__main__":
    send_sms("13912343964")
```

## 通过 ldap3 进行登录认证

```python
# -*- coding: utf-8 -*-

from ldap3 import Server, Connection,SUBTREE
ldap_host = 'xx.xx.x.x' #ldap服务器地址
ldap_port = 389 #默认389
ldap_admin_user = 'xx' #ldap管理员账户用户名
ldap_admin_password = 'xxx' #ldap管理员账户密码
ldap_base_search = 'dc=xx,dc=xx' #查询域

def ldap_auth(username, password):
    '''
    ldap验证方法
    :param username: 用户名
    :param password: 密码
    :return:
    '''
    s = Server(host=ldap_host, port=ldap_port, use_ssl=False, get_info='ALL')

    #连接ldap服务器
    ldapz_admin_connection = Connection(s, user=ldap_admin_user, password=ldap_admin_password, auto_bind='NONE',
                                        version=3,
                                        authentication='SIMPLE', client_strategy='SYNC', auto_referrals=True,
                                        check_names=True,
                                        read_only=False, lazy=False,
                                        raise_exceptions=False)


    # 连上以后必须bind才能有值
    ldapz_admin_connection.bind()


    # 这个是为了查询你输入的用户名的入口搜索地址
    res = ldapz_admin_connection.search(search_base=ldap_base_search,
                                        search_filter='(sAMAccountName={})'.format(username),
                                        search_scope=SUBTREE,
                                        attributes=['cn', 'givenName', 'mail', 'sAMAccountName'],
                                        )

    try:
        if res:
            entry = ldapz_admin_connection.response[0]
            logger.info(entry)
            dn = entry['dn']
            attr_dict = entry['attributes']
            logger.info('attr_dic:%s' %attr_dict)

            try:
                # 这个connect是通过你的用户名和密码还有上面搜到的入口搜索来查询的
                conn2 = Connection(s, user=dn, password=password, check_names=True, lazy=False, raise_exceptions=False)
                conn2.bind()
                # logger.info(conn2.result["description"])

                # 正确-success 不正确-invalidCredentials
                if conn2.result["description"] == "success":
                    logger.info("ldap auth pass!")
                    return True
                else:
                    logger.info("username or password error!")
                    return False
            except Exception as e:
                logger.info("username or password error!")
                logger.info(e)
                return False
    except KeyError as e:
        logger.info("username or password error!")
        logger.info(e)
        return False
        
if __name__ == "__main__":
    ldap_auth("maqingxiong", "Mqx1801")
```
