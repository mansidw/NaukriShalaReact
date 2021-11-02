from flask import Flask,render_template, redirect, url_for, request, flash,jsonify
import time
from flask_cors import CORS #comment this on deployment
from bs4 import BeautifulSoup
import requests
from firebase_admin import credentials, firestore, initialize_app

cred = credentials.Certificate('key.json')
default_app = initialize_app(cred)
db = firestore.client()
joby = db.collection('jobs')

app = Flask(__name__)
CORS(app)

URL = "https://www.freejobalert.com/maharashtra-government-jobs/"
r = requests.get(URL)
soup = BeautifulSoup(r.content, 'html5lib')
table = soup.select(".lattbl tbody tr") 


@app.route('/time')
def get_current_time():
  jobs=[]
  for row in table[1:]:
    job = {}
    job['post'] = row.select(".latcpb")[0].text
    job['rb'] = row.select(".latcr")[0].text
    job['pn'] = row.select(".latceb")[0].text
    job['qual'] = row.select(".latcqb")[0].text
    job['more'] = row.select(".latcmb strong a")[0]['href']
    # try: joby.add(job)
    # except : print("Error occured")
    jobs.append(job)
  return {'time':jobs}

@app.route('/locationwise', methods = ['POST'])
def locationwise():
  location = request.json
  print(location)
  if location:
    jobs=[]
    for row in table[1:]:
      job = {}
      job['post'] = row.select(".latcpb")[0].text
      job['rb'] = row.select(".latcr")[0].text
      job['pn'] = row.select(".latceb")[0].text
      job['qual'] = row.select(".latcqb")[0].text
      job['more'] = row.select(".latcmb strong a")[0]['href']
      jobs.append(job)
    # print(jobs)
    return {'location':jobs}
  return("No value received")


if __name__ == '__main__':
  app.run(debug=True)


# <tr class="lattrbord">
# <td class="latcpb">23/06/2021</td>
# <td class="latcr">SEEPZ</td>
# <td class="latceb">Security Guard – 13 Posts</td>
# <td class="latcqb">08th Class</td>
# <td class="latcab">–</td>
# <td class="latclb">60 Days</td>
# <td class="latcmb"><strong><a href="http://seepz.gov.in/writereaddatafolder/15-06-2021FPSG%20English.pdf" rel="nofollow noopener" target="_blank">Get Details..</a></strong></td>
# </tr>