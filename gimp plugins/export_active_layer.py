#!/usr/bin/env python

from gimpfu import *
from Queue import Queue
import os
import json
from collections import defaultdict


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
    menu='<Image>/Image/Custom plugins'
)

main()
