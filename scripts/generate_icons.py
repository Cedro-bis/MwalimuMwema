import zlib
import struct
import math
import os

def create_png(width, height, is_maskable, filepath):
    # Colors
    # Deep indigo background: (15, 23, 42) #0f172a
    # Gradient accent or symbol: vibrant blue / cyan / gold
    raw_data = bytearray()
    
    # Safe zone for maskable icon is inside 80% circle (radius = 0.4 * min(w, h))
    center_x = width / 2.0
    center_y = height / 2.0
    scale = (width * 0.38) if is_maskable else (width * 0.45)
    
    for y in range(height):
        raw_data.append(0)  # filter type 0 (None)
        ny = (y - center_y) / scale
        for x in range(width):
            nx = (x - center_x) / scale
            dist = math.sqrt(nx * nx + ny * ny)
            
            # Default background: Dark sleek indigo / obsidian
            # #0f172a = (15, 23, 42)
            # Subtle radial vignette
            bg_factor = min(1.0, math.sqrt((x/width - 0.5)**2 + (y/height - 0.5)**2) * 1.2)
            bg_r = int(18 - bg_factor * 8)
            bg_g = int(24 - bg_factor * 8)
            bg_b = int(45 - bg_factor * 12)
            
            r, g, b, a = bg_r, bg_g, bg_b, 255
            
            # Draw Book / Graduation Cap & Sparkle Glyph
            # 1. Graduation Cap diamond (rhombus): |nx| + |ny + 0.2|*1.8 < 0.8
            cap_dist = abs(nx) + abs(ny + 0.18) * 1.8
            if cap_dist < 0.65 and ny < 0.15:
                # Gradient from vibrant indigo (79, 70, 229) to cyan (14, 165, 233)
                t = (nx + 0.65) / 1.3
                r = int(79 * (1 - t) + 14 * t)
                g = int(70 * (1 - t) + 165 * t)
                b = int(229 * (1 - t) + 233 * t)
                # Edge highlight
                if cap_dist > 0.58:
                    r, g, b = min(255, r + 40), min(255, g + 40), min(255, b + 40)
            
            # Cap band: curved underneath
            if -0.35 < nx < 0.35 and 0.05 < ny < 0.32:
                arc = (nx / 0.35) ** 2
                if ny > 0.08 + arc * 0.1 and ny < 0.26 + arc * 0.08:
                    r, g, b = 99, 102, 241
            
            # Book pages below
            if -0.7 < nx < 0.7 and 0.32 < ny < 0.75:
                # Left page or right page
                book_y = 0.35 + abs(nx) * 0.12 - (nx ** 2) * 0.08
                if ny > book_y and ny < book_y + 0.25:
                    page_t = (ny - book_y) / 0.25
                    # Glowing white-cyan page
                    r = int(230 + 25 * (1 - page_t))
                    g = int(240 + 15 * (1 - page_t))
                    b = int(255)
            
            # Golden Sparkle / Star of Knowledge top right: nx ~ 0.5, ny ~ -0.45
            snx = nx - 0.45
            sny = ny + 0.42
            sdist = abs(snx) * abs(sny)
            slen = math.sqrt(snx * snx + sny * sny)
            if slen < 0.28 and (sdist < 0.012 or slen < 0.06):
                # Gold amber sparkle (251, 191, 36)
                r, g, b = 251, 191, 36
            
            raw_data.extend([r, g, b, a])
            
    compressed = zlib.compress(bytes(raw_data), 9)
    
    def chunk(tag, data):
        return struct.pack('>I', len(data)) + tag + data + struct.pack('>I', zlib.crc32(tag + data) & 0xffffffff)

    png = b'\x89PNG\r\n\x1a\n'
    ihdr = struct.pack('>IIBBBBB', width, height, 8, 6, 0, 0, 0)
    png += chunk(b'IHDR', ihdr)
    png += chunk(b'IDAT', compressed)
    png += chunk(b'IEND', b'')
    
    os.makedirs(os.path.dirname(filepath), exist_ok=True)
    with open(filepath, 'wb') as f:
        f.write(png)
    print(f"Generated PNG: {filepath} ({width}x{height})")

def main():
    icons = [
        (192, 192, False, 'public/pwa-192x192.png'),
        (512, 512, False, 'public/pwa-512x512.png'),
        (512, 512, True, 'public/pwa-maskable-512x512.png'),
        (180, 180, False, 'public/apple-touch-icon.png'),
        (192, 192, False, 'public/icon-192.png'),
        (512, 512, False, 'public/icon-512.png'),
    ]
    for w, h, maskable, path in icons:
        create_png(w, h, maskable, path)

if __name__ == '__main__':
    main()
