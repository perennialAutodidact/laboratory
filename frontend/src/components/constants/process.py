import json
from string import ascii_uppercase as ABCs
import requests
from secrets import OPEN_CAGE_DATA_API_KEY
import time

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

def write_to_file(contents):
    with open('us_states.json', 'w') as file:
        json.dump(contents, file, indent=2)
            
with open('countries.json', 'r', encoding='utf-8') as file:
    countries = json.loads(file.read())

with open('us_states.json', 'r', encoding='utf-8') as file:
    us_states = json.loads(file.read())




us_cities = countries['US']['cities']

# since the API only allows 2500 requests/day, this is to
# keep track of next starting position


for key in us_cities.keys():
    for index in range(len(us_cities[key])):

        time.sleep()

        lat = us_cities[key][index]['lat']
        lng = us_cities[key][index]['lng']
       

        query = f"{lat},{lng}"
        print(query)
        url = f'https://api.opencagedata.com/geocode/v1/json?q={query}&key={OPEN_CAGE_DATA_API_KEY}'

        res = requests.get(url).json()

        remaining_requests = res['rate']['remaining']
        state_code = res['results'][0]['components']['state_code']

        print('requests remaining:', remaining_requests)
        # print(state_code)


        # us_cities[key][index] = city
        state = us_states[state_code]

        city = {
            'name': us_cities[key][index]['name'],
            'state_code': state_code,
            'lat': lat,
            'lng': lng
        }

        if city not in us_states[state_code]['cities']:
            us_states[state_code]['cities'].append(city)
        else:
            print('DUPLICATE')
            print(city)

        
        if remaining_requests < 10:
            write_to_file(us_states)
            print(f'last city index: {index}')
            print(f'last letter key: {key}')
            exit()

print(f'last city index: {index}')
print(f'last letter key: {key}')
write_to_file(us_states)
# # us_cities['A'][0] = city 

# # countries['US']['cities'] = us_cities

# # print(countries['US']['cities']['A'][:3])
# print(us_states)

