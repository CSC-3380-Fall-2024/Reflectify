from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from core.moodtracker.models import MoodQuestion, MoodResponse, MoodLog
from core.moodtracker.serializers import MoodQuestionSerializer, MoodResponseSerializer, MoodLogSerializer
from typing import Any

class MoodQuestionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = MoodQuestion.objects.all()
    serializer_class = MoodQuestionSerializer


class MoodResponseViewSet(viewsets.ModelViewSet):
    serializer_class = MoodResponseSerializer

    def get_queryset(self) -> Any:
        return MoodResponse.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class MoodLogViewSet(viewsets.ModelViewSet):

    serializer_class = MoodLogSerializer

    def get_queryset(self) -> Any:
        return MoodLog.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=False, methods=['GET'])
    def latest(self, request):

        latest_log = self.get_queryset().order_by('-log_date').first()
        if latest_log:
            serializer = self.get_serializer(latest_log)
            return Response(serializer.data)
        return Response({"detail": "No mood logs found."})
