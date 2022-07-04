import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.client.builder.AwsClientBuilder;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import serverless.bnb.lambda.model.Room;
import serverless.bnb.lambda.model.RoomType;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class PrepopulateDb {

    private static String ACCESS_KEY = "AKIAQVMKKDE3SWBCF7TL";
    private static String SECRET_KEY = "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";
    private static String AWS_REGION = "us-east-1";
    private static String ENDPOINT_URL = "dynamodb.us-east-1.amazonaws.com";

    public static void main (String a[]) {

        AWSCredentials dynamoDBCredentials = new BasicAWSCredentials(ACCESS_KEY, SECRET_KEY);

        AmazonDynamoDB dynamoDbClient = AmazonDynamoDBClientBuilder
                .standard()
                .withCredentials(new AWSStaticCredentialsProvider(dynamoDBCredentials))
                .withEndpointConfiguration(new AwsClientBuilder.EndpointConfiguration(ENDPOINT_URL, AWS_REGION))
                .build();

        DynamoDBMapper mapper = new DynamoDBMapper(dynamoDbClient);

        Map<String, List<String>> roomAmenities = new HashMap<>();
        roomAmenities.put("Bathroom", Arrays.asList("Toilet paper", "Towels", "Toilet", "Bath", "Shower"));
        roomAmenities.put("Bedroom", Arrays.asList("Wardrobe or closet", "Flat-screen TV", "Radio", "TV"));
        roomAmenities.put("Room Amenities", Arrays.asList("Socket near the bed", "Drying rack for clothing", "Clothes rack"));

        Room executiveRoom = Room.builder()
                                .roomType(RoomType.EXECUTIVE)
                                .numberOfBeds(1)
                                .totalRooms(4)
                                .price(100.00f)
                                .currency("CAD")
                                .roomArea("70 sq m")
                                .amenities(roomAmenities)
                                .build();


        Room deluxeRoom = Room.builder()
                .roomType(RoomType.DELUXE)
                .numberOfBeds(1)
                .totalRooms(3)
                .price(150.00f)
                .currency("CAD")
                .roomArea("100 sq m")
                .amenities(roomAmenities)
                .build();

        mapper.batchSave(Arrays.asList(executiveRoom, deluxeRoom));
    }

}
