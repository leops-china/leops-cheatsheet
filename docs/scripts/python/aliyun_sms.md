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
