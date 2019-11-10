### 邮件发送

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
