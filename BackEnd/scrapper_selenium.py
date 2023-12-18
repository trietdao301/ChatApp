from selenium import webdriver
from selenium.webdriver.common.by import By
from time import sleep
import re
from app import db
from app.Model.model import Product


def amazon(driver,item):
    url = 'https://www.amazon.com/?tag=hymsabk-20&ref=pd_sl_290dlthsvm_e&adgrpid=1341404752168026&hvadid=83837868333246&hvnetw=o&hvqmt=e&hvbmt=be&hvdev=c&hvlocint=&hvlocphy=110598&hvtargid=kwd-83838147155260:loc-190&hydadcr=28884_11845483'
    search_box = "field-keywords"
    submit_button = "nav-search-submit-button"
    products_class = "s-card-container"
    
    driver.get(url)
    # Enable this to maximize the window
    driver.maximize_window()
    driver.find_element(By.NAME, search_box ).send_keys(item)
    sleep(2)
    driver.find_element(By.ID, submit_button).click()
    sleep(2)
    products = driver.find_elements(By.CLASS_NAME, products_class)
    sleep(2)
    
    data = []
    for i in range(0,10):
        item = products[i].text
        data.append(tokenize(item))
    return data
    

def ebay(driver,item):
    url = 'https://www.ebay.com/'
    search_box = "ui-autocomplete-input"
    submit_button = 'gh-btn'
    products_class_name = "s-item"
    
    driver.get(url)
    # Enable this to maximize the window
    driver.maximize_window()
    
    # Search Bar
    driver.find_element(By.CLASS_NAME, search_box).send_keys(item)
    sleep(2)
    
    # Submit button
    driver.find_element(By.ID, submit_button).click()
    sleep(2)
    
    
    products = driver.find_elements(By.CLASS_NAME, products_class_name)
    sleep(2)
    
    data = []
    for i in range(0,10):
        item = products[i].text
        data.append(tokenize(item))
    return data
    

def tokenizePrice(string):
    # Define the regular expression pattern
    patternPrice = re.compile(r'\$([0-9,]+(?:\.[0-9]{2})?)')
    
    # Search for the pattern in the string
    match = re.search(patternPrice, string)
    if match:
        money_value = match.group(1)
        return money_value
    else:
        return None
    
def tokenizeName(string):
    # Split the string into lines
    lines = string.split('\n')
    min_len = 0
    result = None
    prefix_accordingto_string_lenght = 3
    prefix_accordingto_string_format = 1
    max_iteration = int(len(lines)/prefix_accordingto_string_lenght)+prefix_accordingto_string_format
    
    # Select the first line as the product name
    for i in range (0,max_iteration):
        product_name = lines[i].strip()
        if len(product_name) > min_len:
            result = product_name
            min_len = len(product_name)
    return result
 
def tokenize(string):
    name = tokenizeName(string)
    price = tokenizePrice(string)
    if (name and price):
        data = {name:float(price.replace(',', ''))}
        return data


def scrap():
    options = webdriver.ChromeOptions()
    options.headless = False
    driver = webdriver.Chrome(options=options)
    driver.implicitly_wait(10)
    
    item = "laptop"
    ebay_data = ebay(driver,item)
        

    # item = "laptop"
    # amazon_data = amazon(driver,item)

    driver.quit()
    return ebay_data 
    