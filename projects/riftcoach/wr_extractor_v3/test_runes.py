from bs4 import BeautifulSoup
import urllib.request
html = urllib.request.urlopen('https://www.wildriftfire.com/rune-list').read()
soup = BeautifulSoup(html, 'lxml')
blocks = soup.find_all('div', class_='wf-tier-list__tiers__block')
for b in blocks:
    for h in b.find_all('div', class_='ico-holder'):
        a = h.find('a')
        print(h.find('span').text, '->', a['href'] if a else 'No Link')
