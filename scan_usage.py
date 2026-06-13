import glob
import os
import re
import json

# UI import usage
ui_files = sorted(glob.glob('src/components/ui/*.tsx'))
source_files = [f for f in glob.glob('src/**/*.*', recursive=True) if os.path.splitext(f)[1] in ('.ts', '.tsx', '.js', '.jsx')]
source_files_no_ui = [f for f in source_files if f not in ui_files]
print('UI IMPORT USAGE:')
for ui in ui_files:
    name = os.path.splitext(os.path.basename(ui))[0]
    pattern = re.compile(rf'@/components/ui/{re.escape(name)}\b')
    found = False
    for src in source_files_no_ui:
        with open(src, 'r', encoding='utf-8') as f:
            if pattern.search(f.read()):
                found = True
                break
    print(f'{name}: {"USED" if found else "UNUSED"}')

# Package usage
with open('package.json', 'r', encoding='utf-8') as f:
    pkg = json.load(f)
all_deps = list(pkg.get('dependencies', {}).keys()) + list(pkg.get('devDependencies', {}).keys())
print('\nPACKAGE USAGE:')
for name in sorted(all_deps):
    found = False
    for root, dirs, files in os.walk('.'):
        if root.startswith('.\\node_modules') or root.startswith('.\\.git'):
            continue
        for file in files:
            if os.path.splitext(file)[1] not in ('.ts', '.tsx', '.js', '.jsx', '.json', '.css', '.html', '.toml'):
                continue
            path = os.path.join(root, file)
            if os.path.abspath(path) in (os.path.abspath('package.json'), os.path.abspath('package-lock.json')):
                continue
            try:
                text = open(path, 'r', encoding='utf-8').read()
            except Exception:
                continue
            if name in text:
                found = True
                break
        if found:
            break
    print(f'{name}: {"USED" if found else "MISSING"}')
