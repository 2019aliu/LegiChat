import tweepy

auth = tweepy.OAuthHandler('fD8O9AisjaU1ytdxSOHpqevxH', 'gQleoJNrpVsjq7za9tLS4Dgl4od9vf9Vy9D3kbhrZ9Tq1viLsf')
auth.set_access_token('940292355063799808-EmfvMfRHrvPI66kAoiaNHOxjuIYmSsZ', 'FE1rgu8IQvznMX2o4p5mY6cryREEg6qMtRV4Qtib2nMGU')

api = tweepy.API(auth)

def find_tweets(longitude,latitude):
    string = ""+str(longitude)+","+str(latitude)+","+"3mi"
    print(string)
    location_tweets = api.search(q='Trump',count = 100,geocode=string)
    for tweet in location_tweets:
        print(tweet)
find_tweets(39.0116285,-77.358158)
