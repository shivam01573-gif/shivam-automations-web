import os
import sys
from PIL import Image, ImageDraw, ImageFont

# Ensure UTF-8 stdout encoding on Windows
if sys.platform.startswith("win"):
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass

def get_font(font_name, size):
    """
    Attempt to load a font from standard Windows fonts or fall back to default.
    """
    windows_font_path = f"C:\\Windows\\Fonts\\{font_name}"
    if os.path.exists(windows_font_path):
        try:
            return ImageFont.truetype(windows_font_path, size)
        except Exception:
            pass
            
    # Try generic Arial fallback
    arial_path = "C:\\Windows\\Fonts\\arial.ttf"
    if os.path.exists(arial_path):
        try:
            return ImageFont.truetype(arial_path, size)
        except Exception:
            pass
            
    # Fallback to default
    return ImageFont.load_default()

def wrap_text(text, font, max_width, draw):
    """
    Wraps text to fit within a maximum pixel width.
    """
    words = text.split(" ")
    lines = []
    current_line = []
    
    for word in words:
        current_line.append(word)
        line_str = " ".join(current_line)
        # Get width of current line
        bbox = draw.textbbox((0, 0), line_str, font=font)
        width = bbox[2] - bbox[0]
        
        if width > max_width:
            if len(current_line) == 1:
                # Word is too long by itself, force split
                lines.append(line_str)
                current_line = []
            else:
                current_line.pop()
                lines.append(" ".join(current_line))
                current_line = [word]
                
    if current_line:
        lines.append(" ".join(current_line))
        
    return lines

def generate_pinterest_pin(title, output_filename, tool_name="Make.com"):
    """
    Generates a high-quality vertical 1000x1500 Pinterest Pin graphic.
    """
    # Clean emoji characters from the title to prevent square rendering issues in PIL
    title = "".join(c for c in title if ord(c) < 128).strip()
    title = " ".join(title.split()) # normalize whitespace

    # 1. Canvas Setup (Standard Pinterest Pin aspect ratio 2:3)
    width = 1000
    height = 1500
    
    # Sleek dark-mode aesthetic
    bg_color = (13, 17, 23)  # Dark Charcoal #0d1117
    img = Image.new("RGB", (width, height), bg_color)
    draw = ImageDraw.Draw(img)
    
    # 2. Draw Decorative Gradient / Accent Shapes
    # Premium glowing top and bottom borders (Teal to Blue gradient feel)
    accent_teal = (56, 189, 248)  # #38bdf8
    accent_blue = (99, 102, 241)  # #6366f1
    accent_purple = (168, 85, 247) # #a855f7
    
    # Background Grid/Lines for modern design
    for y in range(100, height, 200):
        draw.line([(0, y), (width, y)], fill=(22, 28, 38), width=2)
    for x in range(100, width, 200):
        draw.line([(x, 0), (x, height)], fill=(22, 28, 38), width=2)
        
    # Top accent bar
    draw.rectangle([0, 0, width, 25], fill=accent_teal)
    # Bottom accent bar
    draw.rectangle([0, height-25, width, height], fill=accent_purple)
    
    # Inner border to look premium
    draw.rectangle([40, 40, width-40, height-40], outline=accent_blue, width=3)
    
    # 3. Load Fonts
    font_title = get_font("segoeui.ttf", 64)       # Large bold for main title
    font_category = get_font("segoeuib.ttf", 36)   # Semi-bold for category tag
    font_subtitle = get_font("segoeui.ttf", 30)   # Light-medium for subtitle
    font_brand = get_font("segoeuib.ttf", 40)      # Bold for brand name
    
    # 4. Draw Header / Category Tag
    # Pill background for Tool Tag
    tag_text = f"{tool_name.upper()} INTEGRATION SOP"
    tag_bbox = draw.textbbox((0, 0), tag_text, font=font_category)
    tag_w = tag_bbox[2] - tag_bbox[0]
    tag_h = tag_bbox[3] - tag_bbox[1]
    
    tag_x = (width - tag_w) // 2
    tag_y = 150
    
    # Draw pill background
    draw.rounded_rectangle(
        [tag_x - 30, tag_y - 15, tag_x + tag_w + 30, tag_y + tag_h + 15], 
        radius=25, 
        fill=(30, 41, 59),  # #1e293b Slate
        outline=accent_teal,
        width=2
    )
    draw.text((tag_x, tag_y), tag_text, font=font_category, fill=accent_teal)
    
    # 5. Draw Title (Wrapped to fit)
    wrapped_lines = wrap_text(title, font_title, 800, draw)
    
    # Calculate starting Y to center title vertically around the upper-middle region
    line_spacing = 20
    # Calculate total height of the title block
    total_title_h = 0
    for line in wrapped_lines:
        line_bbox = draw.textbbox((0, 0), line, font=font_title)
        total_title_h += (line_bbox[3] - line_bbox[1]) + line_spacing
        
    start_y = 350
    
    # Draw a container background card for readability
    card_margin = 80
    draw.rounded_rectangle(
        [card_margin, start_y - 50, width - card_margin, start_y + total_title_h + 80],
        radius=20,
        fill=(17, 24, 39, 200), # #111827 Dark Grey
        outline=(55, 65, 81), # #374151
        width=2
    )
    
    current_y = start_y
    for line in wrapped_lines:
        line_bbox = draw.textbbox((0, 0), line, font=font_title)
        line_w = line_bbox[2] - line_bbox[0]
        line_x = (width - line_w) // 2
        
        # Shadow effect
        draw.text((line_x + 3, current_y + 3), line, font=font_title, fill=(0, 0, 0))
        # Main text
        draw.text((line_x, current_y), line, font=font_title, fill=(255, 255, 255))
        
        current_y += (line_bbox[3] - line_bbox[1]) + line_spacing
        
    # 6. Draw Call to Action (CTA) in middle-bottom
    cta_box_y = current_y + 120
    cta_text_1 = "STEP-BY-STEP ERROR DIAGNOSTIC"
    cta_text_2 = "FULL AUTOMATED WORKFLOW SOLUTION"
    
    for idx, cta in enumerate([cta_text_1, cta_text_2]):
        color = accent_purple if idx == 1 else (239, 68, 68) # Red for error, purple for solution
        bbox = draw.textbbox((0, 0), cta, font=font_subtitle)
        w = bbox[2] - bbox[0]
        x = (width - w) // 2
        y = cta_box_y + (idx * 60)
        draw.text((x, y), cta, font=font_subtitle, fill=color)
        
    # 7. Draw Footer / Branding Section
    footer_y = 1250
    # "SHIVAM AUTOMATIONS" Brand Label
    brand_label = "SHIVAM AUTOMATIONS"
    brand_bbox = draw.textbbox((0, 0), brand_label, font=font_brand)
    brand_w = brand_bbox[2] - brand_bbox[0]
    brand_x = (width - brand_w) // 2
    draw.text((brand_x, footer_y), brand_label, font=font_brand, fill=(255, 255, 255))
    
    # Glowing underline
    draw.line([(brand_x, footer_y + 60), (brand_x + brand_w, footer_y + 60)], fill=accent_purple, width=4)
    
    # Website Domain Link
    domain_label = "shivam-automations-web.vercel.app"
    domain_bbox = draw.textbbox((0, 0), domain_label, font=font_subtitle)
    domain_w = domain_bbox[2] - domain_bbox[0]
    domain_x = (width - domain_w) // 2
    draw.text((domain_x, footer_y + 90), domain_label, font=font_subtitle, fill=accent_teal)
    
    # Ensure directory exists
    os.makedirs(os.path.dirname(output_filename), exist_ok=True)
    img.save(output_filename, "PNG")
    print(f"[+] Pinterest graphic generated: {output_filename}")
    return True

if __name__ == "__main__":
    # Test generation with emojis
    test_title = "🔥 App Update: Connect Google Drive with your personal Gmail account"
    output_dir = os.path.join(os.path.dirname(__file__), "..", "public", "pins")
    output_file = os.path.join(output_dir, "test-make-pin.png")
    
    print("[*] Generating test Pinterest pin...")
    try:
        generate_pinterest_pin(test_title, output_file, "Google Drive")
        print("[+] Test pin generation completed successfully!")
    except Exception as e:
        print(f"[!] Error generating test pin: {e}")
