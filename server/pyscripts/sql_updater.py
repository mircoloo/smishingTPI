#!python3

from distutils.log import error
import telGuarder as tG
import tellows
import mysql.connector
import twitt  
import sys
import os

connection_config_dict = {
        'user': 'root',
        'password': '',
        'host': 'localhost',
        'database': 'smishingDB',
        'raise_on_warnings': True,
        'use_pure': False,
        'autocommit': True,
        'pool_size': 5
}

#mysql server connection, this is locally hosted, put here your values
mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="",
  database="smishingDb"
)    
##########################defining functions to extract informations from the scripts #################

def update_tellows_data():
    mycursor = mydb.cursor()
    sql = "INSERT INTO Telldata (number, comment, type, researchs, score, source, organization) VALUES ( %s , %s , %s, %s, %s, %s, %s)"  
    df = tellows.extract_data()
    df_list = df.values.tolist()
    for row in df_list:
        try:
            
            #sql = f"INSERT INTO Twittdata (id, comment, nickname, creation, imageurl, imagetext, organization, link) VALUES ( '{row[0]}' , '{row[1]}' , '{row[2]}', '{row[3]}', '{row[4]}', '{row[5]}', '{row[6]}', '{row[7]}') WHERE NOT EXISTS ( SELECT * FROM Twittdata WHERE id = '{row[0]}')" 
            sql = f"INSERT INTO Telldata (number, comment, type, researchs, score, source, organization) SELECT '{row[0]}' , '{row[1]}' , '{row[2]}', {row[3]}, {row[4]}, '{row[5]}', '{row[6]}' WHERE NOT EXISTS (SELECT * FROM Telldata WHERE number = '{row[0]}')"
            mycursor.execute(sql)

            mydb.commit()
            counter+=1
        except:
            print("Error in inserting row...") 
    print("Tellows was inserted.") 


def update_telguarder_data():
    mycursor = mydb.cursor()
    sql = "INSERT INTO Telldata (number, comment, type, researchs, score, source, organization) VALUES ( %s , %s , %s, %s, %s, %s, %s)"  
    df = tG.extract_data()
    df_list = df.values.tolist()
    for row in df_list:
        try:
            #sql = f"INSERT INTO Twittdata (id, comment, nickname, creation, imageurl, imagetext, organization, link) VALUES ( '{row[0]}' , '{row[1]}' , '{row[2]}', '{row[3]}', '{row[4]}', '{row[5]}', '{row[6]}', '{row[7]}') WHERE NOT EXISTS ( SELECT * FROM Twittdata WHERE id = '{row[0]}')" 
            sql = f"INSERT INTO Telldata (number, comment, type, researchs, score, source, organization) SELECT '{row[0]}' , '{row[1]}' , '{row[2]}', {row[3]}, {row[4]}, '{row[5]}', '{row[6]}' WHERE NOT EXISTS (SELECT * FROM Telldata WHERE number = '{row[0]}')"
            mycursor.execute(sql)
            mydb.commit()
            counter+=1
        except:
            print("Error in inserting row...")
    print("Telguarder was inserted.") 

def update_twitter_data(number=10):
    mycursor = mydb.cursor()
    df = twitt.extract_data(number)
    df_list = df.values.tolist()
    counter = 0
    for row in df_list:
        try:
            #sql = f"INSERT INTO Twittdata (id, comment, nickname, creation, imageurl, imagetext, organization, link) VALUES ( '{row[0]}' , '{row[1]}' , '{row[2]}', '{row[3]}', '{row[4]}', '{row[5]}', '{row[6]}', '{row[7]}') WHERE NOT EXISTS ( SELECT * FROM Twittdata WHERE id = '{row[0]}')" 
            sql = f"INSERT INTO Twittdata (id, comment, nickname, creation, imageurl, imagetext, organization, link) SELECT '{row[0]}' , '{row[1]}' , '{row[2]}', '{row[3]}', '{row[4]}', '{row[5]}', '{row[6]}', '{row[7]}' WHERE NOT EXISTS (SELECT * FROM Twittdata WHERE id = '{row[0]}')"
            mycursor.execute(sql)
            mydb.commit()
            counter+=1
        except:
            print("Error in inserting row...")
    
    print("Twittdata was inserted.")   

if __name__ == '__main__':
    print("Updating data...")
    update_tellows_data()
    update_twitter_data(100)
    update_telguarder_data()
    print("Update finished")
    