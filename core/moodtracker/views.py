from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import MoodQuestion, MoodResponse, MoodLog
from .serializers import MoodQuestionSerializer, MoodResponseSerializer, MoodLogSerializer

class MoodTrackingViewSet(viewsets.ViewSet):
    def get_questions(self, request):
        questions = MoodQuestion.objects.all()
        serializer = MoodQuestionSerializer(questions, many = True)
        return Response(serializer.data)

    def submit_responses(self, request):
        user = request.user
        responses = request.data.get('responses', [])
        total_score = 0
        response_objects = []

        for response in responses:
            question = MoodQuestion.objects.get(id = response['question_id'])
            answer = response['answer']

            score = question.options.index(answer) if answer in question.options else 0
            total_score += score
            response_obj = MoodResponse(user = user, question = question, answer = answer)
            response_objects.append(response_obj)

        MoodResponse.objects.bulk_create(response_objects)
        mood_log = MoodLog.objects.create(user = user, score = total_score)

        return Response(MoodLogSerializer(mood_log).data)