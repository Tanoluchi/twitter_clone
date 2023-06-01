from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from .models import Tweet, Comment
from users.models import User
from .serializers import TweetSerializer, CommentSerializer, MyTweetSerializer
from users.permissions import IsUserOrReadOnly
from backend.pagination import CustomPagination

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def like(request, pk):
    tweet = Tweet.objects.get(pk=pk)
    if request.user in tweet.liked.all():
        tweet.liked.remove(request.user)
    else:
        tweet.liked.add(request.user)
        # if request.user != tweet.user:
        #     Noti.objects.get_or_create(type='like you tweet', tweet=tweet, to_user=tweet.user, from_user=request.user)
    return Response({'status': 'ok'})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_tweets(request, username):
    user = User.objects.get(username=username)
    tweets = Tweet.objects.filter(user=user)
    serializer = MyTweetSerializer(tweets, many=True)
    return Response(serializer.data)

class TweetList(generics.ListCreateAPIView):
    queryset = Tweet.objects.all()
    serializer_class = TweetSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = CustomPagination

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class TweetDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Tweet.objects.all()
    serializer_class = TweetSerializer
    permission_classes = [IsAuthenticated, IsUserOrReadOnly]