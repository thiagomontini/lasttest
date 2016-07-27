import re

def invert_string_number(s):
    if re.match('^-', s):
        return s[1:]
    return '-' + s

with open('Globe_Scene_mirrored.obj', 'w') as output_file:
    for line in open('Globe_Scene.obj'):
        if re.match('^v ', line):
            line = line.split(' ')
            line[2] = invert_string_number(line[2])
            line = ' '.join(line)

        elif re.match('^vn ', line):
            line = line.split(' ')
            line[1:3] = map(invert_string_number, line[1:3])
            line = ' '.join(line)

        elif re.match('^f ', line):
            line = line.replace('\r\n', '')
            line = line.split(' ')
            line[1:] = list(reversed(line[1:]))
            line = ' '.join(line) + '\r\n'

        output_file.write(line)
