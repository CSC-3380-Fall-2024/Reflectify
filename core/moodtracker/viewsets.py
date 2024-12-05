from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import MoodQuestion, MoodResponse, MoodLog
from .serializers import MoodQuestionSerializer, MoodResponseSerializer, MoodLogSerializer

class MoodQuestionViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for MoodQuestion. Allows only retrieving questions.
    """
    queryset = MoodQuestion.objects.all()
    serializer_class = MoodQuestionSerializer


class MoodResponseViewSet(viewsets.ModelViewSet):
    """
    ViewSet for MoodResponse. Allows users to create responses and view their own.
    """
    serializer_class = MoodResponseSerializer

    def get_queryset(self):
        """
        Restrict responses to the authenticated user.
        """
        return MoodResponse.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        """
        Automatically associate the logged-in user with their responses.
        """
        serializer.save(user=self.request.user)


class MoodLogViewSet(viewsets.ModelViewSet):
    """
    ViewSet for MoodLog. Allows users to view or create their mood logs.
    """
    serializer_class = MoodLogSerializer

    def get_queryset(self):
        """
        Restrict mood logs to the authenticated user.
        """
        return MoodLog.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        """
        Automatically associate the logged-in user with their mood log.
        """
        serializer.save(user=self.request.user)

    @action(detail=False, methods=['GET'])
    def latest(self, request):
        """
        Custom action to retrieve the latest mood log for the authenticated user.
        """
        latest_log = self.get_queryset().order_by('-log_date').first()
        if latest_log:
            serializer = self.get_serializer(latest_log)
            return Response(serializer.data)
        return Response({"detail": "No mood logs found."})