from django.shortcuts import render,HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from myapp.models import Product,PriceHistory
from myapp.serializers import ProductSerializer
from django.http import HttpResponse, HttpResponseNotAllowed
from .scraper import ScrapeProduct
from datetime import date,timedelta
import decimal
# Create your views here.
def home(request):
    return render(request, 'home.html')

@csrf_exempt
def getProductById(request, id):
    try:
        product = Product.objects.get(id=id)
        product_serializer = ProductSerializer(product)
        return JsonResponse(product_serializer.data, safe=False)
    except Product.DoesNotExist:
        return JsonResponse({'message': 'Product not found'}, status=404)

@csrf_exempt
def getAllProducts(request):
    products = Product.objects.all()
    products_serializer = ProductSerializer(products, many=True)
    return JsonResponse(products_serializer.data, safe=False)

@csrf_exempt
def getProductByUrl(request, url):
    try:
        product = Product.objects.get(url=url)
        product_serializer = ProductSerializer(product)
        return JsonResponse(product_serializer.data, safe=False)
    except Product.DoesNotExist:
        return JsonResponse({'message': 'Product not found'}, status=404)


@csrf_exempt
def PostProduct(request, url):
    try:
        if request.method == 'POST':
            product = ScrapeProduct(url)
            
            existingProduct = None 
            
            # check if current product already exist in database
            try:
                existingProduct = Product.objects.get(url=url)
            except Exception as e:
                print('New product added')
            
            # if product does not exist, add product to the database
            if(existingProduct == None):
                newProduct = Product(
                url = product.url,
                title = product.title,
                imageURL = product.image,
                currentPrice = product.currentPrice,
                originalPrice = product.originalPrice,
                category = product.category,
                lowestPrice = product.currentPrice,
                highestPrice = product.originalPrice,
                averagePrice = (decimal.Decimal(product.originalPrice) + decimal.Decimal(product.currentPrice)) / 2
                )
                newProduct.save()
                savePriceHistory(newProduct)
            else:
                existingProduct.title = product.title
                existingProduct.imageURL = product.image
                existingProduct.currentPrice = product.currentPrice
                existingProduct.originalPrice = product.originalPrice
                existingProduct.category = product.category
                existingProduct.lowestPrice = product.currentPrice
                existingProduct.highestPrice = product.originalPrice
                existingProduct.averagePrice = getAveragePrice(existingProduct.id)
                existingProduct.save()
                savePriceHistory(existingProduct)

            return HttpResponse(status=200)
        else:
            # Return a 405 Method Not Allowed response for non-POST requests
            return HttpResponseNotAllowed(['POST'])
    except Exception as e:
        print('Failed to post product. Invalid link')
        return HttpResponseNotAllowed(['POST'])

    
def getPrices(productId):
    try:
        priceHistoryList = PriceHistory.objects.filter(product_id=productId)
        return priceHistoryList
    except Exception as e:
        print('Failed to get price history list')
    
def getAveragePrice(productId):
    try:
        priceHistoryList = getPrices(productId)
        sum = 0
        for priceHistory in priceHistoryList:
            sum += priceHistory.price
        averagePrice = sum / len(priceHistoryList)
        return averagePrice
    except Exception as e:
        print('Failed to get average price')

def savePriceHistory(product):
    try: 
        PriceHistory.objects.create(
            product=product,
            date = date.today() + timedelta(days=2),
            price = product.currentPrice
        )
    except Exception as e:
        print('Failed to save price history record')