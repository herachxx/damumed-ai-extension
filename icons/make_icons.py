from PIL import Image, ImageDraw
import os

def make_icon(size, path):
    img = Image.new('RGBA', (size, size), (0,0,0,0))
    d = ImageDraw.Draw(img)
    # Background circle
    d.ellipse([2, 2, size-2, size-2], fill=(14, 165, 233))
    # Brain emoji approximation - white circle
    inner = size // 4
    d.ellipse([inner, inner, size-inner, size-inner], fill=(255,255,255,220))
    img.save(path)

try:
    make_icon(48, '/home/claude/aqbobek-extension/icons/icon48.png')
    make_icon(96, '/home/claude/aqbobek-extension/icons/icon96.png')
    print("Icons created with PIL")
except ImportError:
    # Fallback: create minimal PNG manually
    import struct, zlib

    def create_simple_png(size):
        # Minimal blue square PNG
        raw = b''
        for y in range(size):
            raw += b'\x00'
            for x in range(size):
                # Blue gradient pixel RGBA
                raw += bytes([14, 165, 233, 255])
        
        def chunk(name, data):
            c = zlib.crc32(name + data) & 0xffffffff
            return struct.pack('>I', len(data)) + name + data + struct.pack('>I', c)
        
        ihdr = struct.pack('>IIBBBBB', size, size, 8, 2, 0, 0, 0)
        idat = zlib.compress(raw)
        
        return b'\x89PNG\r\n\x1a\n' + chunk(b'IHDR', ihdr) + chunk(b'IDAT', idat) + chunk(b'IEND', b'')
    
    with open('/home/claude/aqbobek-extension/icons/icon48.png', 'wb') as f:
        f.write(create_simple_png(48))
    with open('/home/claude/aqbobek-extension/icons/icon96.png', 'wb') as f:
        f.write(create_simple_png(96))
    print("Icons created manually")
