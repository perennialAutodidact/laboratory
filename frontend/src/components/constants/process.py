import json
from string import ascii_uppercase as ABCs
import requests
# from secrets import OPEN_CAGE_DATA_API_KEY
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

def write_to_file(contents, filename):
    with open(filename, 'w') as file:
        json.dump(contents, file, indent=2)


# with open('USStates.json', 'r', encoding='UTF-8') as json_file:
#     state_data = json.loads(json_file.read())

# for state_code in state_data:
#     print(state_code)

#     cities = {}
#     for city in state_data[state_code]['cities']:
#         if city['name'] not in cities:
#             cities[city['name']] = {}
        
#         cities[city['name']] = {
#             'state_code': city['state_code'],
#             'lat': city['lat'],
#             'lng': city['lng']
#         }

#     state_data[state_code]['cities'] = cities

# write_to_file(state_data, 'stateListTest.json')

# with open('newCountryList.json', 'r',encoding='UTF-8') as json_file:
#     data = json.loads(json_file.read())
# with open('countryAbb.json', 'r', encoding='UTF-8') as json_file:
#     all_countries = json.loads(json_file.read())

# countries = {}
# for city in data:
#     if city['country'] not in countries:
#         country_abbr = city['country']
#         if country_abbr == 'US':
#             countries[country_abbr] = {
#                 'name': 'United States',
#                 'cities': state_data
#             }
#             continue
#         countries[country_abbr] = {
#             'name': all_countries[country_abbr]['name'],
#             'cities': {}
#         }

#     city_dict = countries[country_abbr]['cities']
#     if city['name'] not in city_dict:
#         city_dict[city['name']] = {
#             'lat': city['lat'],
#             'lng': city['lng']
#         }


# write_to_file(countries, 'countryListTest.json')
# with open('countries.json', 'r', encoding='utf-8') as file:
#     countries = json.loads(file.read())

# with open('stateList.json', 'r', encoding='utf-8') as file:
#     us_states = json.loads(file.read())
#     us_states = [us_states[state]['name'] for state in us_states]

# write_to_file(us_states)

# us_cities = countries['US']['cities']

# since the API only allows 2500 requests/day, this is to
# keep track of next starting position


# for key in us_cities.keys():
#     for index in range(len(us_cities[key])):

#         time.sleep()

#         lat = us_cities[key][index]['lat']
#         lng = us_cities[key][index]['lng']


#         query = f"{lat},{lng}"
#         print(query)
#         url = f'https://api.opencagedata.com/geocode/v1/json?q={query}&key={OPEN_CAGE_DATA_API_KEY}'

#         res = requests.get(url).json()

#         remaining_requests = res['rate']['remaining']
#         state_code = res['results'][0]['components']['state_code']

#         print('requests remaining:', remaining_requests)
#         # print(state_code)


#         # us_cities[key][index] = city
#         state = us_states[state_code]

#         city = {
#             'name': us_cities[key][index]['name'],
#             'state_code': state_code,
#             'lat': lat,
#             'lng': lng
#         }

#         if city not in us_states[state_code]['cities']:
#             us_states[state_code]['cities'].append(city)
#         else:
#             print('DUPLICATE')
#             print(city)


#         if remaining_requests < 10:
#             write_to_file(us_states)
#             print(f'last city index: {index}')
#             print(f'last letter key: {key}')
#             exit()

# print(f'last city index: {index}')
# print(f'last letter key: {key}')
# write_to_file(us_states)
# # us_cities['A'][0] = city

# # countries['US']['cities'] = us_cities

# # print(countries['US']['cities']['A'][:3])
# print(us_states)

with open('countryListTest.json', 'r', encoding='UTF-8') as json_file:
    data = json.loads(json_file.read())
with open('USStates.json', 'r', encoding='UTF-8') as json_file:
    states_data = json.loads(json_file.read())

all_cities = []
for key in data.keys():
    if key == 'US':
        continue
    else:
        cities = data[key].get('cities')
        if cities:
            all_cities.extend([city for city in cities.keys()])
        else:
            print(key)

for state_code in states_data:
    cities = states_data[state_code]['cities']
    for city in cities:
        all_cities.append(city['name'])

write_to_file(all_cities, 'cityList.json')
# print(len(all_cities))