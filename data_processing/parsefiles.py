import sys
import json
import re
import operator
import pymongo
from pymongo import MongoClient

def clean_string(data):
    return data.translate(None,'~')
    
def get_database_connection():
    connection = MongoClient("mongodb://phoodie:ph00dieAdmin@troup.mongohq.com:10041/app21948504")
    return connection
    
def parse_food_group_def(data_directory):    
    food_groups = []
    food_group_file = open(data_directory + '/' + 'FD_GROUP.txt')
    lines = food_group_file.readlines()
    for line in lines:     
        map = {}
        string_array = line.rstrip().split('^')
        map['_id'] = clean_string(string_array[0])
        map['fdgrp_desc'] = clean_string(string_array[1])
        food_groups.append(map)
    return food_groups

def parse_nutrition_def(data_directory):
    nutrition = []
    nutrition_file = open(data_directory + '/' + 'NUTR_DEF.txt')
    lines = nutrition_file.readlines()
    for line in lines:
        map = {}
        string_array = line.rstrip().split('^')
        map['_id'] = clean_string(string_array[0])
        
        if( clean_string(string_array[1]) == '\xb5g'):
            units = 'mu'
        else:
            units = clean_string(string_array[1])
            
        map['units'] = units
        map['tagname'] = clean_string(string_array[2])
        map['nutrdesc'] = clean_string(string_array[3])
        map['num_dec'] = clean_string(string_array[4])
        map['sr_order'] = clean_string(string_array[5])
        nutrition.append(map)
    return nutrition    
    
def parse_food_nutrition_def(data_directory,db):
    food_nutrition = []
    nutrition_data_file = open(data_directory + '/' + 'NUT_DATA.txt')
    lines = nutrition_data_file.readlines()
    for line in lines:
        map = {}
        string_array = line.rstrip().split('^')
        map['ndb_no'] = clean_string(string_array[0])
        map['nutr_no'] = clean_string(string_array[1])
        map['nutr_val'] = clean_string(string_array[2])
        map['num_data_pts'] = clean_string(string_array[3])
        map['std_error'] = clean_string(string_array[4])
        map['src_cd'] = clean_string(string_array[5])
        map['deriv_cd'] = clean_string(string_array[6])
        map['add_nutr_mark'] = clean_string(string_array[8])
        db.food_nutrition.insert(map)
        food_nutrition.append(map)
    return food_nutrition        
    
    
def parse_food_def(data_directory):    
    food = []
    food_file = open(data_directory + '/' + 'FOOD_DES.txt')
    lines = food_file.readlines()
    for line in lines:     
        map = {}
        string_array = line.rstrip().split('^')
        map['_id'] = clean_string(string_array[0])
        map['fdgrp_cd'] = clean_string(string_array[1])
        map['long_desc'] = clean_string(string_array[2])
        map['shrt_desc'] = clean_string(string_array[3])
        map['comname'] = clean_string(string_array[4])
        map['manufacname'] = clean_string(string_array[5])
        map['survey'] = clean_string(string_array[6])
        map['ref_desc'] = clean_string(string_array[7])
        map['refuse'] = clean_string(string_array[8])
        map['sciname'] = clean_string(string_array[9])
        map['n_factor'] = clean_string(string_array[10])
        map['pro_factor']= clean_string(string_array[11])
        map['fat_factor'] = clean_string(string_array[12])
        map['cho_factor'] = clean_string(string_array[13])
        food.append(map)
    return food


    
def main():
    data_directory = sys.argv[1]    
    #food_data = parse_food_def(data_directory)  
    #nutrient_data = parse_nutrition_def(data_directory)
    #food_group_data = parse_food_group_def(data_directory)
    connection = get_database_connection()
    db = connection.app21948504
    food_nutrient_data = parse_food_nutrition_def(data_directory,db)
    
    #db.food.insert(food_group_data)
    #db.food_group.insert(food_group_data)
    #db.nutrients.insert(nutrient_data)
    #db.food_nutrients.insert(food_nutrient_data)
    connection.close()
    
if __name__ == '__main__':
    main()