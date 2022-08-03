#!python3

import enum
import requests
import json

URL = "http://localhost:4000/api/telldata/getAll"

r = requests.post(URL, {"limit": 2000})

data = r.json()

for i, el1 in enumerate(data):
    #print(i, el) 
    
    for j, el2 in enumerate(data):

        if(i != j and i < j):
            
            doc1 = el1['comment']
            doc2 = el2['comment']
            words_doc1 = set(doc1.lower().split())
            words_doc2 = set(doc2.lower().split())

            intersection = words_doc1.intersection(words_doc2)
            union = words_doc1.union(words_doc2)
            if(len(union) > 0):
                jaccard_value = float(len(intersection)/len(union))
                if(jaccard_value >= 0.4 and jaccard_value < 1):
                    print(jaccard_value, words_doc1, el1['number'], "  ---  " , words_doc2, el2['number'])
                    #print(doc1," |||||", doc2)