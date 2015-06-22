import requests
import json
import hashlib, base64
import mfile
# Set the request parameters
baseUrl='https://mobileqa.sunovacu.ca/'
seedUrl='api/Login/GenerateSeed'

url = baseUrl+seedUrl
user = 'your_email_address'
pwd = 'your_password'

# Do the HTTP get request
sent='{"id":71604,"appId":"sunova","token":null,"isSuccessful":false,"expiry":null,"messages":[]}'
#payload = {'appId': 'sunova', 'id': 71604}
payload=json.loads(sent)
# r = requests.post("http://httpbin.org/post", data=payload)


rfrom='{"seed":"vn075mO+UaZ1Tlj/A8EqVmQ6aoouQB94BYoc/5EiS5UHz3lUj0gvVs+Q/nEOWjro3uOzE74XpbP4eO83osOSZjt6bPyP0niRHDRO55f+t34=","messages":[],"appId":"sunova","id":71604,"isSuccessful":true,"token":"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=","expiry":"2015-06-01T10:27:30.0285074-05:00","confirmationId":""}'
data=json.loads(rfrom)

#response = requests.post(url,data=payload)#, auth=(user, pwd))
#data = response.json()

# Check for HTTP codes other than 200
# if response.status_code != 200: 
#     print('Status:', response.status_code, 'Problem with the request. Exiting.')
#     exit()

# Decode the JSON response into a dictionary and use the data

def mhash(plaintext):
    import hashlib, base64

    hashed = hashlib.sha256(plaintext).digest()
    return base64.b64encode(hashed)

# Example 1: Print the name of the first group in the list
#data['token']='b'
print json.dumps(data, sort_keys=True, indent=4)

# print data['seed']
print mfile.mobilehash('71604butterfly1')
# tt=mhash('71604butterfly1')+data['seed']
# print mhash(tt)
#print {'4': 5, '6': 7}
# print( 'First group = ', data['groups'][0]['name'] )

# # Example 2: Print the name of each group in the list
# group_list = data['groups']
# for group in group_list:
#     print(group['name'])

# print "t"