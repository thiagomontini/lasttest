#!/usr/bin/env python

from gimpfu import *
from Queue import Queue
import os
import json
from collections import defaultdict

def extract_component(pixel_region, visited, px, py):
    width = pixel_region.w
    height = pixel_region.h
    pixel_array = pixel_region[0:width,0:height]

    queue = Queue()
    queue.put((px, py))

    min_x = px
    min_y = py
    max_x = px
    max_y = py

    pixels = {}

    while not queue.empty():
        x, y = queue.get()
        if visited[x,y]:
            continue

        visited[x,y] = True
        pixel_pos = 4*(x + y*width)
        pixels[x,y] = pixel_array[pixel_pos:pixel_pos + 4]
        min_x = min(min_x, x)
        min_y = min(min_y, y)
        max_x = max(max_x, x)
        max_y = max(max_y, y)

        if x > 0 and pixel_array[pixel_pos - 4 + 3] != '\x00' and not visited[x-1,y]:
            queue.put((x-1,y))

        if x < pixel_region.w-1 and pixel_array[pixel_pos + 4 + 3] != '\x00' and not visited[x+1,y]:
            queue.put((x+1,y))

        if y > 0 and pixel_array[pixel_pos - 4*width + 3] != '\x00' and not visited[x,y-1]:
            queue.put((x,y-1))

        if y < pixel_region.h-1 and pixel_array[pixel_pos + 4*width + 3] != '\x00' and not visited[x,y+1]:
            queue.put((x,y+1))

    return {
        'min_x': min_x,
        'max_x': max_x,
        'min_y': min_y,
        'max_y': max_y,
        'pixels': pixels
    }


def cut_assets(img, drw, save_path, base_name):
    from time import time
    start_time = time()
    base_name = base_name or img.active_layer.name
    file_name_base = base_name + '_{}.png'
    full_path_base = os.path.join(save_path, file_name_base)
    layer = img.active_layer
    pixel_region = layer.get_pixel_rgn(0, 0, layer.width, layer.height)
    components = []
    visited = defaultdict(bool)

    for x in xrange(0, layer.width):
        for y in xrange(0, layer.height):
            if pixel_region[x,y][3] != '\x00' and not visited[x,y]:
                components.append(extract_component(pixel_region, visited, x, y))

    component_data = []
    for index, component in enumerate(components):
        temp_image = gimp.Image(
            component['max_x'] - component['min_x'] + 1,
            component['max_y'] - component['min_y'] + 1,
            RGB)

        temp_layer = gimp.Layer(temp_image, 'Background', temp_image.width, temp_image.height,
            RGBA_IMAGE, 100, NORMAL_MODE)

        pixel_region = temp_layer.get_pixel_rgn(0, 0, temp_layer.width, temp_layer.height)
        for coords, pixel in component['pixels'].iteritems():
            x, y = coords
            pixel_region[x - component['min_x'], y - component['min_y']] = pixel

        temp_layer.update(0, 0, temp_layer.width, temp_layer.height)

        full_path = full_path_base.format(index+1)
        file_name = file_name_base.format(index+1)
        pdb.file_png_save_defaults(temp_image, temp_layer, full_path, file_name)

        pdb.gimp_image_delete(temp_image)

        offset = layer.offsets
        component_data.append({
            'file_name': file_name,
            'full_path': full_path,
            'layer_coords': [component['min_x'], component['min_y']],
            'global_coords': [component['min_x'] + offset[0], component['min_y'] + offset[1]]
        })

    json_file_name = base_name + '.json'
    json_full_path = os.path.join(save_path, json_file_name)
    with open(json_full_path, 'w') as output_file:
        output_file.write(json.dumps(component_data))

    pdb.gimp_message("Total time: {}".format(time() - start_time))

register(
    'python_fu_cut_assets',
    'Break the active layer into connected components and exports them as .png files',
    'Break the active layer into connected components and exports them as .png files',
    'Carlos Zanella',
    'Carlos Zanella',
    'june 2016',
    'Layer _components...',
    'RGBA',
    [
        (PF_IMAGE, 'image', 'Input image', None),
        (PF_DRAWABLE, 'drawable', 'Input drawable', None),
        (PF_DIRNAME, 'save-path', 'Path for file exports', os.getcwd()),
        (PF_STRING, 'base-name', 'Base name for assets (leave blank to use layer name)', ''),
    ],
    [],
    cut_assets,
    menu='<Image>/Image/Cut assets'
)

main()
