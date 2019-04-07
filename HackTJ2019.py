import tweepy

auth = tweepy.OAuthHandler('fD8O9AisjaU1ytdxSOHpqevxH', 'gQleoJNrpVsjq7za9tLS4Dgl4od9vf9Vy9D3kbhrZ9Tq1viLsf')
auth.set_access_token('940292355063799808-EmfvMfRHrvPI66kAoiaNHOxjuIYmSsZ', 'FE1rgu8IQvznMX2o4p5mY6cryREEg6qMtRV4Qtib2nMGU')

api = tweepy.API(auth)

def find_tweets(keyword,longitude,latitude):
    string = ""+str(longitude)+","+str(latitude)+","+"10mi"
    #print(string)
    location_tweets = api.search(q=keyword,count = 100,geocode=string)
    return location_tweets
def format_string(line_of_tweets):
	for tweet in line_of_tweets:
		if(tweet.text != ''):
			print(tweet.user.name,tweet.created_at,tweet.text.strip())
if __name__ == "__main__":
	file = open("commonwords.txt","r")
	lister = file.readlines()
	for word in lister:
		tweet = find_tweets(word,39.0116285,-77.358158)
		format_string(tweet)
