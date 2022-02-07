# Spotify Mixer

*A tool for creating playlists containing the songs you listen to the most*

CURRENTLY IN DEVELOPMENT MODE
![spotify-mixer-beta vercel app](https://user-images.githubusercontent.com/78728519/152783835-8e65030b-982c-4cbc-9b81-9956f179fd08.png)


## Information
My first project built with [NextJS](https://nextjs.org). I wanted to try out a new framework and since I am already familiar with [ReactJS](https://reactjs.org) I chose Next.
This app makes use of Spotify's API to display the user's top songs of their chosen timespan and allow them to add them to their playlist. 

To allow multiple users to collaborate on a playlist I had find a workaround since the API does not allow anyone but the creator of a given playlist to modify it. That is why I added the option to merge two playlists:

The actual owner of the "shared" playlist can provide the app with links to both their own and their collaborator's playlist. The app then adds all non-duplicate songs from the other playlist to the owned one.
