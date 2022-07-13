package serverless.bnb.lambda;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.client.builder.AwsClientBuilder;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;

public class DynamoDB {

    private static String ACCESS_KEY = System.getenv("DYNAMO_DB_ACCESS_KEY");
    private static String SECRET_KEY = System.getenv("DYNAMO_DB_SECRET_KEY");
    private static String AWS_REGION = System.getenv("DYNAMO_DB_REGION");
    private static String ENDPOINT_URL = String.format("dynamodb.%s.amazonaws.com", AWS_REGION);

    public static AmazonDynamoDB getDynamoDBClient() {
        AWSCredentials dynamoDBCredentials = new BasicAWSCredentials(ACCESS_KEY, SECRET_KEY);

        return AmazonDynamoDBClientBuilder
                .standard()
                .withCredentials(new AWSStaticCredentialsProvider(dynamoDBCredentials))
                .withEndpointConfiguration(new AwsClientBuilder.EndpointConfiguration(ENDPOINT_URL, AWS_REGION))
                .build();
    }

    public static DynamoDBMapper getMapper() {
        AmazonDynamoDB dynamoDB = getDynamoDBClient();
        return new DynamoDBMapper(dynamoDB);
    }

}
