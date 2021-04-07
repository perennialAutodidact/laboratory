import json
from string import ascii_uppercase as ABCs

with open('countryAbb.json', 'r', encoding='utf-8') as file:
    countries = json.loads(file.read())
    

delete_keys = ['languages', 'currency','capital', 'phone', 'native','continent']
for country in countries:
    for key in delete_keys:
        del countries[country][key]
    other_chars = 'ÀÁÂÄÅÆÇÈÉÍÎÐÑÒÓÔÖØÚÜÝÞĀĆČĐĒĦĪİĶĽŁŌŐŒŘŚŞŠŢŪŬŻŽƏȘȚЈАБГЗИКНОПРСЦЧḎḐḤḨṞṬẔẤ'
    countries[country]['cities'] = {letter:[] for letter in ABCs + other_chars}


with open('newCountryList.json', 'r', encoding='utf-8') as file:
    cities = json.loads(file.read())


for city in cities:
    new_city = {
        'name': city['name'],
        'lat': city['lat'],
        'lng': city['lng']
    }
    city_list = countries[city['country']]['cities'][city['name'][0].upper()]
    if new_city not in city_list:
        city_list.append(new_city)


# for country in countries:
#     for key in countries[country]['cities']:
#         if countries[country]['cities'][key]:
#             countries[country]['cities'][key] = list(set(countries[country]['cities'][key]))

# with open('countries.json', 'w') as file:
#     json.dump(countries, file, indent=2)

print(len(countries['US']['cities']))

us_cities = countries['US']['cities']

print(sum([len(us_cities[key]) for key in us_cities.keys()]))
