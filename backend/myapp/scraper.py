from selenium import webdriver
from bs4 import BeautifulSoup
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from urllib.parse import urlparse
from .product import Product
import decimal

# Browser options
chrome_options= Options()
# chrome_options.add_argument('--no-sandbox')
chrome_options.add_argument('--headless')
chrome_options.add_argument('--disable-gpu')
# chrome_options.add_argument("--disable-third-party-cookies")
chrome_options.add_argument('--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36')
chrome_options.add_argument('--disbale-dev-shm-usage')
chrome_options.add_argument('log-level=3')
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)



def ScrapeProduct(url):
    try:
        driver.get(url)     
        soup = BeautifulSoup(driver.page_source, 'lxml')
        
        # extract domain name from url
        domain = extractDomainFromUrl(url)

        if domain == 'www.coles.com.au':
            return getColes(soup,url)
        elif domain == 'www.jbhifi.com.au':
            return getJBHIFI(soup,url)
        elif domain == 'www.woolworths.com.au':
            return getWoolies(soup,url)

        # driver.quit()
    except Exception as e:
        print(e)

    
def extractDomainFromUrl(url):
    parsed_url = urlparse(url)
    domainName = parsed_url.netloc
    return domainName


def printInfo(title, currentPrice, originalPrice, image):
    print('\033[91m' + '------------------------'+'\033[0m')
    print('\033[91m')
    print('title : ' + title)
    print('currentPrice : $' + currentPrice)
    print('originalPrice : $' + originalPrice)
    print('image CDN : ' + image)
    print('\033[0m')
    print('\033[91m' + '------------------------'+'\033[0m')
    
def getColes(soup, url):
    try:
        title = soup.find('h1', {'class' : 'product__title'}).getText()
        currentPrice = soup.find('span',{'class' : 'price__value'}).getText().replace("$", "")
        originalPrice = soup.find('span',{'class' : 'price__was'})

        if originalPrice == None:
            originalPrice = currentPrice
        else:
            originalPrice = originalPrice.getText().replace("| Was $", "").replace(' ', '')
            
        
        divs = soup.find_all('div', class_=['sc-c1029195-0', 'hFaYaU', 'coles-targeting-SliderSlideSlide'])
        images = divs[1].find_all('img')
        image = images[1]['src']
        
        printInfo(title, currentPrice, originalPrice,image)
        
        return Product(
            url=url,
            title=title,
            image=image,
            currentPrice=currentPrice,
            originalPrice=originalPrice,
            category='Coles'
        )
        
    except Exception as e:
        print(e)
    

    
    
def getWoolies(soup,url):
    try:
        priceDiv = soup.find('div', class_ = ['shelfProductTile-price'] )
        currentPrice = priceDiv.find('div', {'class' : 'price'}).getText().replace(' ', '').replace('$','')
        originalPrice = priceDiv.find('div', {'class' : 'price-offer-info'})

        if originalPrice == None:
            originalPrice = currentPrice
        else:
            originalPrice = originalPrice.getText().replace('Will be $','').replace(' ', '')
            
        title = soup.find('h1', {'class' : 'shelfProductTile-title'}).getText()
        image = (soup.find('img',class_='main-image-v2'))['src']
        printInfo(title, currentPrice, originalPrice,image)
        
        return Product(
            url=url,
            title=title,
            image=image,
            currentPrice=currentPrice,
            originalPrice=originalPrice,
            category='WoolWorths'
        )
        
    except Exception as e:
        print(e)
    
def getJBHIFI(soup,url):
    try:
        
        priceDiv = soup.find('div', id = 'pdp-price-cta')
        currentPrice = priceDiv.find('span',{'class' : 'PriceTag_actual__1eb7mu9q'}).getText()
        originalPrice = priceDiv.find('div',{'class' : 'StrikeText_styles_container__rkpz4f0'})
        if originalPrice == None:
            originalPrice = currentPrice
        else:
            originalPrice = originalPrice.getText().replace('$','')
            
 
        title = soup.find('h1',{'class' :'_12mtftw9'}).getText()
        images = soup.find_all('img')
        image = ''
        
        for img in images:
            if img['src'].startswith('//www.jbhifi.com.au/cdn'):
                image = img['src']
                break     
        printInfo(title, currentPrice, originalPrice,image)    
             
        return Product(
            url=url,
            title=title,
            image=image,
            currentPrice=currentPrice,
            originalPrice=originalPrice,
            category='JBHIFI'
        )   
        
    except Exception as e:
        print(e)