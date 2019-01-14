import json

with open('stuff.json') as f:
    data = json.load(f)

html = '<html><body>'

for x in data:
    html += '<div>' + str(x) + '</div>'

html += '</body></html>'

with open('lol.html', 'w') as f:
    f.write(html)
