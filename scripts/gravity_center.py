import re

x, y, z = 0.0, 0.0, 0.0
count = 0

for line in open('Globe_Scene.obj'):
    if re.match('^v ', line):
        line = line.split(' ')
        x += float(line[1])
        y += float(line[2])
        z += float(line[3])
        count += 1

print x / count
print y / count
print z / count
