#!/usr/bin/env python
import sys
import urllib2
import json
import time
import datetime
import random
from optparse import OptionParser

url = ""
exampleJsonMetrics = '''{
        "metrics": [{
            "createdAt": "2014-05-14T15:22:11Z",
            "value": 47.8,
        },{
            "createdAt": "2014-05-14T15:23:11Z",
            "value": 50.0,
        }]
    }
'''
def http(route, body=None):
    print url+route
    req = urllib2.Request(url+route, body)
    req.add_header('Content-Type', 'application/json')
    response = urllib2.urlopen(req)
    responseBody = response.read()
    responseCode = response.getcode()
    print "Response:", responseCode, responseBody
    return (responseCode, responseBody)

def postMetrics():
    body = {}
    body['metrics'] = []
    for i in xrange(10):
        body['metrics'].append({'createdAt': datetime.datetime.utcnow().isoformat(), 'value': random.randint(1,100)})

    print "POST:"
    print json.dumps(body)
    http('metrics', json.dumps(body))

def getMetrics():
    print http('metrics')



# Command Line Options
parser = OptionParser()
parser.add_option("-l", "--local",
                  dest="local", action="store_true",
                  help="run in local mode (i.e. pointing localhost.)")
parser.add_option("-d", "--dev",
                  dest="dev", action="store_true",
                  help="run in dev mode (i.e. pointing at development stack.)")
parser.add_option("--postMetrics",
                  action="store_true", dest="postMetrics",
                  help="Perform post of metrics")
parser.add_option("--getMetrics",
                  action="store_true", dest="getMetrics",
                  help="Perform get of metrics")



if __name__ == "__main__":
    (options, args) = parser.parse_args()

    # Make sure we have all the command line arguments
    if not (options.dev or options.local):
        print "Error: must specify stack (dev, local). Aborting."
        sys.exit(1)

    # Point at the correct Mongo server/database
    if options.local:
        url = "http://localhost:3000/"
        print "**** LOCAL ****"
        print "URL:", url
    elif options.dev:
        url = "Some Heroku URL"
        print "**** DEVELOPMENT ****"
        print "URL:", url

    if options.postMetrics:
        postMetrics()
    elif options.getMetrics:
        getMetrics()
