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
