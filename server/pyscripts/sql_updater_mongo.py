#!python3

import pymongo
import telGuarder as tG
import tellows
import twitt  
import sys
import os


if __name__ == '__main__':

    client = pymongo.MongoClient("mongodb+srv://mirco:mircomirco@smishingdb.sf0xe.mongodb.net/?retryWrites=true&w=majority")
    db = client["test"]

    """ Collect Twitter data"""
    collection = db["twitt-data"]
    collection.delete_many({})
    data = twitt.extract_data(100)
    collection.insert_many(data.to_dict('records'))
    
    
    """ Collect Telldata and tellows data

    collection = db["tell-data"]
   
    data = tellows.extract_data()
    collection.insert_many(data.to_dict('records'))
    data = tG.extract_data()
    collection.insert_many(data.to_dict('records'))
    """
    