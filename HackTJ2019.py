import tweepy
import json
long = 39.0116285
lat = -77.358158
auth = tweepy.OAuthHandler('fD8O9AisjaU1ytdxSOHpqevxH', 'gQleoJNrpVsjq7za9tLS4Dgl4od9vf9Vy9D3kbhrZ9Tq1viLsf')
auth.set_access_token('940292355063799808-EmfvMfRHrvPI66kAoiaNHOxjuIYmSsZ', 'FE1rgu8IQvznMX2o4p5mY6cryREEg6qMtRV4Qtib2nMGU')

api = tweepy.API(auth)

def find_tweets(keyword,longitude,latitude):
    string = ""+str(longitude)+","+str(latitude)+","+"10mi"
    #print(string)
    location_tweets = api.search(q=keyword,count = 100,geocode=string)
    return location_tweets
def format_string(line_of_tweets):
    # type: (object) -> object
    returninglist = []
    for tweet in line_of_tweets:
        returninglist.append(tweet.user.name+" "+str(tweet.created_at)+" "+tweet.text.rstrip())
    return returninglist
def coordinates(a,b):
    global long,lat
    long = a
    lat = b
if __name__ == "__main__":
    file = open("commonwords.txt","r")
    lister = file.readlines()
    dictionary = {}
    for word in lister:
        tweet = find_tweets(word,long,lat)
        listing = format_string(tweet)
        dictionary[word] = listing
    string = json.dumps(dictionary)
    print(string)
