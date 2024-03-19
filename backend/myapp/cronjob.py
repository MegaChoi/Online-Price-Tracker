from .scraper import ScrapeProduct


def updatePrices():
    ScrapeProduct('https://www.woolworths.com.au/shop/productdetails/135369/woolworths-australian-grown-carrots')
    