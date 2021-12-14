import json
from string import ascii_uppercase as ABCs
import requests


# with open('countryAbb.json', 'r', encoding='utf-8') as file:
#     countries = json.loads(file.read())
    

# delete_keys = ['languages', 'currency','capital', 'phone', 'native','continent']
# for country in countries:
#     for key in delete_keys:
#         del countries[country][key]
#     other_chars = 'ÀÁÂÄÅÆÇÈÉÍÎÐÑÒÓÔÖØÚÜÝÞĀĆČĐĒĦĪİĶĽŁŌŐŒŘŚŞŠŢŪŬŻŽƏȘȚЈАБГЗИКНОПРСЦЧḎḐḤḨṞṬẔẤ'
#     countries[country]['cities'] = {letter:[] for letter in ABCs + other_chars}


# with open('newCountryList.json', 'r', encoding='utf-8') as file:
#     cities = json.loads(file.read())


# for city in cities:
#     new_city = {
#         'name': city['name'],
#         'lat': city['lat'],
#         'lng': city['lng']
#     }
#     city_list = countries[city['country']]['cities'][city['name'][0].upper()]
#     if new_city not in city_list:
#         city_list.append(new_city)


# for country in countries:
#     for key in countries[country]['cities']:
#         if countries[country]['cities'][key]:
#             countries[country]['cities'][key] = list(set(countries[country]['cities'][key]))

# with open('countries.json', 'w') as file:
#     json.dump(countries, file, indent=2)

with open('countries.json', 'r', encoding='utf-8') as file:
    countries = json.loads(file.read())

with open('stateList.json', 'r', encoding='utf-8') as file:
    states = json.loads(file.read())


for key in states.keys():
    states[key].update({'cities':[]})

print(states)
# print(len(countries['US']['cities']))

us_cities = countries['US']['cities']

# print(sum([len(us_cities[key]) for key in us_cities.keys()]))



# OPEN_CAGE_DATA_API_KEY = '963c93262be848549d28f798d9fe620f'
# for key in 'A':#us_cities.keys():
#     for index in range(1):#range(len(us_cities[key])):
#         city = us_cities[key][index]

#         print(index, city)
#         if 'state_code' not in city.keys():

#             query = f"{city['lat']},{city['lng']}"
#         #     print(query)
#             url = f'https://api.opencagedata.com/geocode/v1/json?q={query}&key=963c93262be848549d28f798d9fe620f'

#             res = requests.get(url).json()

#             remaining_requests = res['rate']['remaining']
#             state_code = res['results'][0]['components']['state_code']

#             print('requests remaining:', remaining_requests)
#             print(state_code)

#             city['state_code'] = state_code

#             us_cities[key][index] = city



# us_cities['A'][0] = city 

# countries['US']['cities'] = us_cities

# print(countries['US']['cities']['A'][:3])