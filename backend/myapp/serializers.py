from rest_framework import serializers
from myapp.models import Product, PriceHistory


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model=Product
        fields=('id','url','title','image','currentPrice','originalPrice','priceHistory','lowestPrice','highestPrice','averagePrice','discountRate','category','isOutOfStock')
        
class PriceHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = PriceHistory
        fields = ('date', 'price')
