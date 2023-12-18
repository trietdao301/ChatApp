import pytest

from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys

from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support.ui import Select
from selenium.webdriver.chrome.service import Service as ChromeService
from selenium.webdriver.support import expected_conditions as ec
from time import sleep

@pytest.fixture
def browser():
    CHROME_PATH = "c:\\Webdriver"
    print(CHROME_PATH)
    options = webdriver.ChromeOptions()
    options.headless = False
    driver = webdriver.Chrome(options=options)
    driver.implicitly_wait(10)
    
    yield driver

    # For cleanup, quit the driver
    driver.quit()

def test_form(browser):
    amazon_url = 'https://www.amazon.com/?tag=hymsabk-20&ref=pd_sl_290dlthsvm_e&adgrpid=1341404752168026&hvadid=83837868333246&hvnetw=o&hvqmt=e&hvbmt=be&hvdev=c&hvlocint=&hvlocphy=110598&hvtargid=kwd-83838147155260:loc-190&hydadcr=28884_11845483'
    browser.get(amazon_url)
    # Enable this to maximize the window
    browser.maximize_window()
    browser.find_element(By.NAME, "field-keywords").send_keys("laptop")
    sleep(2)
    browser.find_element(By.ID, "nav-search-submit-button").click()
    # browser.find_element(By.NAME, "email").send_keys(user2['email'])
    sleep(2)
    products = browser.find_elements(By.CLASS_NAME, "s-result-item")
    sleep(2)
    # browser.find_element(By.NAME, "password").send_keys(user2['password'])
    
    # browser.find_element(By.NAME, "password2").send_keys(user2['password'])    
    # sleep(2)
    # browser.find_element(By.NAME, "submit").click()
    # sleep(5)
    #verification
    content = browser.page_source
    # print(content)
    #assert 'Last Minute Deals' in content
    # assert 'laptop' in content  
    # assert '1-16' in content  
    for item in products:
        print(item.text)
    if __name__ == "__main__":
        retcode = pytest.main()