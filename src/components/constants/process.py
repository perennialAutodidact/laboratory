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
    if new_city not in countries[city['country']]['cities'][city['name'][0].upper()]:
        countries[city['country']]['cities'][city['name'][0].upper()].append({
            'name': city['name'],
            'lat': city['lat'],
            'lng': city['lng']
        })


# for country in countries:
#     for key in countries[country]['cities']:
#         if countries[country]['cities'][key]:
#             countries[country]['cities'][key] = list(set(countries[country]['cities'][key]))

with open('countries.json', 'w') as file:
    json.dump(countries, file, indent=4)

# # print(countries)