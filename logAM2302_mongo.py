#!/usr/bin/python

import sys
import time
import datetime
import json
import Adafruit_DHT

from pymongo import MongoClient

######MONGOSTUFF#####
## make connection to mongo
#connection = MongoClient()
# connect to the sensors database

connection = MongoClient("ds063769.mongolab.com", 63769)
db = connection["sensors"]
# MongoLab has user authentication
db.authenticate("elleken", "Elleken!234")

am2302_collection = db.am2302

# create dictionary
values = {}


######SENSORSTUFF######
# Type of sensor, can be Adafruit_DHT.DHT11, Adafruit_DHT.DHT22, or Adafruit_DHT.AM2302.
DHT_TYPE = Adafruit_DHT.AM2302
# Example of sensor connected to Raspberry Pi pin 23
DHT_PIN  = 24
# Example of sensor connected to Beaglebone Black pin P8_11
#DHT_PIN  = 'P8_11'
# How long to wait (in seconds) between measurements.
FREQUENCY_SECONDS      = 60*5


##LOOOP FOR LOGGIN DATA EVERY 5mins

while True:

  # Attempt to get sensor reading.
  humidity, temp = Adafruit_DHT.read(DHT_TYPE, DHT_PIN)

  print(temp)
  print(humidity)

  # Skip to the next reading if a valid measurement couldn't be taken.
  # This might happen if the CPU is under a lot of load and the sensor
  # can't be reliably read (timing is critical to read the sensor).
  if humidity is None or temp is None:
    time.sleep(2)
    continue

  now = datetime.datetime.now()
  timestamp = unicode(now.replace(microsecond=0))
  tempFormatted = '{0:0.1f}'.format(temp)
  humidFormatted = '{0:0.1f}'.format(humidity)

    # place values in dictionary
  value_record = {'temperature':tempFormatted,'humidity':humidFormatted, 'timestamp':timestamp}
    # insert the record
  am2302_collection.insert(value_record)

  time.sleep(FREQUENCY_SECONDS)





# close the connection to MongoDB
connection.close()
