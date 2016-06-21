#!/usr/bin/env python

from gimpfu import *
from Queue import Queue
import os
import json
from collections import defaultdict

def extract_component(pixel_array, width, height, visited, px, py):
    queue = Queue()
    visited[px,py] = True
    queue.put((px, py))

    min_x = px
    min_y = py
    max_x = px
    max_y = py

    pixels = {}

    while not queue.empty():
        x, y = queue.get()
        pixel_pos = 4*(x + y*width)
        pixels[x,y] = map(lambda x:x, pixel_array[pixel_pos:pixel_pos + 4])
        min_x = min(min_x, x)
        min_y = min(min_y, y)
        max_x = max(max_x, x)
        max_y = max(max_y, y)

        if x > 0 and pixel_array[pixel_pos - 4 + 3] != '\x00' and not visited[x-1,y]:
            visited[x-1,y] = True
            queue.put((x-1,y))

        if x < width-1 and pixel_array[pixel_pos + 4 + 3] != '\x00' and not visited[x+1,y]:
            visited[x+1,y] = True
            queue.put((x+1,y))

        if y > 0 and pixel_array[pixel_pos - 4*width + 3] != '\x00' and not visited[x,y-1]:
            visited[x,y-1] = True
            queue.put((x,y-1))

        if y < height-1 and pixel_array[pixel_pos + 4*width + 3] != '\x00' and not visited[x,y+1]:
            visited[x,y+1] = True
            queue.put((x,y+1))

    return {
        'min_x': min_x,
        'max_x': max_x,
        'min_y': min_y,
        'max_y': max_y,
        'pixels': pixels
    }


image_formats = ['png', 'jpg']

def export_active_layer(img, drw, save_path, base_name, image_format, generate_json):
    image_format = image_formats[image_format]
    temp_layer = img.active_layer.copy()
    temp_image = gimp.Image(temp_layer.width, temp_layer.height, RGB)
    base_name = base_name or img.active_layer.name
    file_name = base_name + '.' + image_format
    full_path = os.path.join(save_path, file_name)
    if image_format == 'png':
        pdb.file_png_save_defaults(temp_image, temp_layer, full_path, file_name)
    elif image_format == 'jpg':
        pdb.file_jpeg_save(
            temp_image,
            temp_layer,
            full_path,
            file_name,
            0.6,
            0.0,
            0,
            0,
            '',
            0,
            0,
            0,
            0
        )
    pdb.gimp_image_delete(temp_image)

    if generate_json:
        layer_data = {
            'file_name': file_name,
            'full_path': full_path,
            'layer_coords': img.active_layer.offsets
        }
        json_file_name = base_name + '.json'
        json_full_path = os.path.join(save_path, json_file_name)
        with open(json_full_path, 'w') as output_file:
            output_file.write(json.dumps(layer_data, sort_keys=True, indent=4, separators=(',', ': ')))

register(
    'python_fu_export_active_layer',
    'Export the active layer as a .png file',
    'Export the active layer as a .png file',
    'Carlos Zanella',
    'Carlos Zanella',
    'june 2016',
    'Export layer...',
    'RGBA',
    [
        (PF_IMAGE, 'image', 'Input image', None),
        (PF_DRAWABLE, 'drawable', 'Input drawable', None),
        (PF_DIRNAME, 'save-path', 'Path for file exports', os.getcwd()),
        (PF_STRING, 'base-name', 'Base name for assets (leave blank to use layer name)', ''),
        (PF_OPTION, 'image-format', 'Image format', 0, image_formats),
        (PF_BOOL, 'generate-json', 'Generate a JSON file with the components\' coordinates', False)
    ],
    [],
    export_active_layer,
    menu='<Image>/Image/Cut assets'
)

main()
