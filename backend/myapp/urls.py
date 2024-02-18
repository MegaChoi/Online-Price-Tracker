from django.urls import path
from . import views
from .views import getAllProducts,getProductById, getProductByUrl,PostProduct

urlpatterns = [
    path('',views.home, name='home'),
    path('products/<int:id>/', getProductById, name='get_product_by_id'),
    path('products/', getAllProducts, name='get_all_products'),
    path('products/by-url/<path:url>/', getProductByUrl, name='get_product_by_url'),
    path('post/<path:url>/', PostProduct, name='post_product')
]