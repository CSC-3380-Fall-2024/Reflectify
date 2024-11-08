from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import MoodInputSerializer, MoodOutputSerializer

@api_view(['POST'])
def calculate_mood(request):
    input_serializer = MoodInputSerializer(data=request.data)
    
    if input_serializer.is_valid():
        answers = input_serializer.validated_data["answers"]
        total_score = sum(answers)
        average_score = total_score / len(answers)

        # Determine mood based on the average score
        if average_score >= 4:
            mood = "Happy"
        elif average_score >= 3:
            mood = "Neutral"
        else:
            mood = "Sad"

        # Prepare the output using the output serializer
        output_serializer = MoodOutputSerializer(data={"mood": mood, "score": total_score})
        output_serializer.is_valid(raise_exception=True)
        return Response(output_serializer.data)
    
    return Response(input_serializer.errors, status=status.HTTP_400_BAD_REQUEST)