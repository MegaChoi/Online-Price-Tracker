from selenium import webdriver
from bs4 import BeautifulSoup
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager

# Browser options
chrome_options= Options()
# chrome_options.add_argument('--no-sandbox')
chrome_options.add_argument('--headless')
chrome_options.add_argument('--disable-gpu')
chrome_options.add_argument('--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36')
# chrome_options.add_argument('--disbale-dev-shm-usage')


driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)

url = 'https://www.woolworths.com.au/shop/productdetails/629441/woolworths-cook-chicken-kebab-honey-soy'

driver.get(url)

soup = BeautifulSoup(driver.page_source, 'lxml')

price = soup.find('span', {'class' : 'price-dollars'})

print(price.getText())

driver.quit()