import json
from string import ascii_uppercase as ABCs

with open('countryAbb.json', 'r', encoding='utf-8') as file:
    countries = json.loads(file.read())
    

delete_keys = ['languages', 'currency','capital', 'phone', 'native','continent']
for country in countries:
    for key in delete_keys:
        del countries[country][key]
    other_chars = 'АĀÁÀÅÄÆÇČĆСḎÐĐŒÈÉĒƏḨНḤĪȘЗİÍĽПЈĶКĦŁÑБИŌÖÓОŐÎÒØЧЦÞРГŘṞŞŚŠŢȚṬŪÜÚŬÝŻŽẔ'
    countries[country]['cities'] = {letter:[] for letter in ABCs + other_chars}


with open('newCountryList.json', 'r', encoding='utf-8') as file:
    cities = json.loads(file.read())

# print(countries)
# print(cities[:3])

for city in cities[len(cities)/2:]:
    print(city['name'])
    countries[city['country']]['cities'][city['name'][0].upper()].append(city['name'])


print(countries)