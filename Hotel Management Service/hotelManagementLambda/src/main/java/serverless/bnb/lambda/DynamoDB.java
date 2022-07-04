package serverless.bnb.lambda;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.client.builder.AwsClientBuilder;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;

public class DynamoDB {

    private static String ACCESS_KEY = "AKIAQVMKKDE3SWBCF7TL";
    private static String SECRET_KEY = "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";
    private static String AWS_REGION = "us-east-1";
    private static String ENDPOINT_URL = "dynamodb.us-east-1.amazonaws.com";

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
