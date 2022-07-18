import googleapiclient.discovery
import os
import json
from google.cloud import pubsub_v1
os.environ["GOOGLE_APPLICATION_CREDENTIALS"]="./GCP_KEY.json"

def predict_json(instances,user, project="sonic-anagram-341118", model="Group9ProjectMLModel", version=None):
    service = googleapiclient.discovery.build('ml', 'v1')
    name = 'projects/{}/models/{}'.format(project, model)

    if version is not None:
        name += '/versions/{}'.format(version)

    response = service.projects().predict(
        name=name,
        body={'instances': instances}
    ).execute()

    if 'error' in response:
        raise RuntimeError(response['error'])

    publisher = pubsub_v1.PublisherClient()
    topic_path = publisher.topic_path(project, "writeRecommendation")
    future = publisher.publish(
        topic_path, "trying from local".encode("utf-8"), origin="TourService", username="gcp"
    )
    print(future.result())


    # return json.dumps({"user":user,"tour":response['predictions'][0]['classes'][0]})



res = predict_json(json.loads('[{"csv_row":"1,2,23,2,1","key":"1"}]'),"shiva shankar")
print(res)