import json
import re

# Extracts the airport codes
airport_data = {}
for line in open('airports.dat', 'r'):
    (airport, city, country, code) = [x.replace('"', '') for x in line.split(',')[1:5]]
    if code == '':
        continue
    airport_data['{} - {}, {}'.format(airport, city, country)] = code

with open('airports.js', 'w') as airport_output_file:
    airport_output_file.write('module.exports = {};\n'.format(json.dumps(airport_data)))


# Extracts the culture codes
culture_data = {}
for line in open('cultures.txt', 'r'):
    (code, culture) = re.split('\s{2,}', line)[:2]
    culture_data[culture] = code

with open('cultures.js', 'w') as culture_output_file:
    culture_output_file.write('module.exports = {};\n'.format(json.dumps(culture_data)))


# Extracts the currency codes
currencies_data = {}
for line in open('currencies.txt', 'r'):
    (code, currency) = line[0:3], re.sub('\s*$', '', line[4:])
    currencies_data[currency] = code

with open('currencies.js', 'w') as currencies_output_file:
    currencies_output_file.write('module.exports = {};\n'.format(json.dumps(currencies_data)))
