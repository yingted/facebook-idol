Facebook  Idol
==============
To view received requests, go to
> http://www.facebook.com/appcenter/requests
Joining a room: Share the URL with your friends
Starting a karaoke session: Search and click a video (ends current session)
Features:
- Shares video and audio streams for each user
- Upvote and Downvote: When downvote ≥ 10, session ends (you can vote as many times as you like)
- Correct video time skew.
- Singer can pause and seek. This pauses and/or seeks everyone's videos.
- Singer audio power spectrum is displayed on his/her screen.
- Facebook integration
- If you want any semblance of security, make the room id (the part after # in the URL) a long random number (base62 is more secure than decimal).
Usage:

    $ node server

Visit localhost:8000. Also, change the Facebook app secret token to your own.
