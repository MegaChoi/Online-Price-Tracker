from django.db import models

class Product(models.Model):
    id = models.BigAutoField(primary_key=True)
    url = models.CharField(max_length=300)
    title = models.CharField(max_length=200)
    imageURL = models.CharField(max_length=200, null=True)
    currentPrice = models.DecimalField(max_digits=10, decimal_places=2)
    originalPrice = models.DecimalField(max_digits=10, decimal_places=2)
    lowestPrice = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    highestPrice = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    averagePrice = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    category = models.CharField(max_length=255, null=True)
    isOutOfStock = models.BooleanField(default=False)

class PriceHistory(models.Model):
    product = models.ForeignKey(Product, related_name='price_history', on_delete=models.CASCADE)
    date = models.DateField()
    price = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        unique_together = ['product', 'date']