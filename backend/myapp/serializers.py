from rest_framework import serializers
from myapp.models import Product, PriceHistory


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model=Product
        fields=('id','url','title','imageURL','currentPrice','originalPrice','lowestPrice','highestPrice','averagePrice','category','isOutOfStock')
        
class PriceHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = PriceHistory
        fields = ('date', 'price')
