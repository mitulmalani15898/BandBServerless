import boto3
from botocore.config import Config
from datetime import date

dynamoDB = boto3.client(
    'dynamodb',
    config = Config(region_name = 'us-east-1'),
    aws_access_key_id="ASIAUY3T34APOTTZEVRR",
    aws_secret_access_key="ad02nECoHCC3F0xFraSfdR6KpjpUKhwia/ecGqDs",
    aws_session_token="FwoGZXIvYXdzEKj//////////wEaDLmlT/nGYy+fqnOyTiLAAT0FsGvzuZgDJ8L2+oNE3LmOFou6UJpTQstHqxXzCxtZcvLkQ0RLOHNvj/DgQNCM3R+8T0XU1I6JeYfToZm4n3tyeeopDbxxStITEk3n/660woazVefATyFSjRiHWpLbLMv05gKPxN8dNmB8YyBgF5oIVk5UAGUrEn6RqhhyXtVUZvmrmI7RbGdO74DPy2ljCPyew1JJetG9EJO91F1/h51CiYUYtmtk+wqMppEeXu49FoO95uVhqRiPXqYkW8VY0iiJ5c6WBjItRcsoiGYevCwxTOX/JfVO6z7pocl6lreX8z+Aye3FE1VhN3q1pC0GEGnsQZo+"
    )

# ddb_exceptions = dynamoDB.exceptions

def createRecommendationsInformationTable():
    try:
        res = dynamoDB.create_table(
            TableName="RecommendationsInfo",
            AttributeDefinitions=[
                {
                    "AttributeName": "RecID",
                    "AttributeType": "S"
                }
            ],
            KeySchema=[
                {
                    "AttributeName": "RecID",
                    "KeyType": "HASH"
                }
            ],
            ProvisionedThroughput={
                "ReadCapacityUnits": 1,
                "WriteCapacityUnits": 1
            }
        )

        res.wait_until_exists()


        # dynamoDB.put_item(TableName='Recommendations',Item={'RecID':{'S':'1'},'Date':{'S':str(date.today())},'recommendation':{'S':'1'}})
        # put all recommendations decided here so they could be tagged along from the database


        print("received response now ",res)
        return "succeeded"

    except Exception as e:
        print("exception raise : ",e)
        return "failed"






def createUserRecommendationsTableIfNotExists():
    try:
        res = dynamoDB.create_table(
            TableName="Recommendations",
            AttributeDefinitions=[
                {
                    "AttributeName": "userID",
                    "AttributeType": "S"
                }
            ],
            KeySchema=[
                {
                    "AttributeName": "userID",
                    "KeyType": "HASH"
                }
            ],
            ProvisionedThroughput={
                "ReadCapacityUnits": 1,
                "WriteCapacityUnits": 1
            }
        )

        res.wait_until_exists()

        print("received response now ",res)
        return "succeeded"

    except Exception as e:
        print("exception raise : ",e)
        return "failed"


def writeRecommendationToDynamoDB(request):
    request_json = request.get_json()
    try:
        tables = dynamoDB.list_tables()['TableNames']
        print(tables)
        if 'Recommendations' not in tables:
            print("table does not exists, so creating")
            createUserRecommendationsTableIfNotExists()
            print("table created successfully")
        
        print("putting item in the table")
        dynamoDB.put_item(TableName='Recommendations',Item={'userID':{'S':'shiva shankar'},'Date':{'S':str(date.today())},'recommendation':{'S':'1'}})
        print("item inserted successfully")
        
        
        return "item inserted successfully"
        # return readRecommendationFromDynamoDB()
    except Exception as e:
        print("exception raised in writing recommendations: ",e)
        return "exception raised in writing recommendations"


# writeRecommendationToDynamoDB()

def readRecommendationFromDynamoDB():
    res = dynamoDB.get_item(TableName='Recommendations', Key={'userID':{'S':'shiva shankar'}})
    print(res['Item']['recommendation']['S'])
    return res['Item']['recommendation']['S']

# readRecommendationFromDynamoDB()
