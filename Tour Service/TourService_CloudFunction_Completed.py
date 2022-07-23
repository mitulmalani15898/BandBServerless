import googleapiclient.discovery
import os
import json
import base64
from google.cloud import pubsub_v1
os.environ["GOOGLE_APPLICATION_CREDENTIALS"]="./GCP_KEY.json"

def predict_recommendations(event,context):
    project="sonic-anagram-341118"
    model="ProjectRecommendationModel"
    try:
      pubsub_message = base64.b64decode(event['data']).decode('utf-8')
      # instances = "test@gmail.com~1,2,123,3,4"
      # print(instances)
      user,s,persons,cost, duration = (pubsub_message.split("~"))
      s='[{"csv_row":"data","key":"1"}]'.replace("data",s)
      # print(s)
      instances = json.loads(s)
      # print(instances)
      
      
      service = googleapiclient.discovery.build('ml', 'v1')
      name = 'projects/{}/models/{}'.format(project, model)

      response = service.projects().predict(
          name=name,
          body={'instances': instances}
      ).execute()

      if 'error' in response:
          raise RuntimeError(response['error'])

      print(response)
      data = json.dumps({"user":user,"tour":response['predictions'][0]['classes'][0],"persons":persons,"cost":cost, "duration":duration})
      print(data)

      publisher = pubsub_v1.PublisherClient()
      topic_path = publisher.topic_path(project, "writeRecommendation")
      future = publisher.publish( topic_path, data.encode("utf-8"), origin="TourService", username="gcp" )
      print(future.result())


      # return json.dumps({"user":user,"tour":response['predictions'][0]['classes'][0]})
      return "succeeded"
    except Exception as e:
      print(e)
      return "Failed"


# res = predict_json(json.loads('[{"csv_row":"1,2,23,2,1","key":"1"}]'),"shiva shankar")
# print(res)