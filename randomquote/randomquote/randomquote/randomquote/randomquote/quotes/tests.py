# quotes/tests.py

from django.test import TestCase
from django.urls import reverse
from .models import Quote
from .views import home_view, add_quote_view

class ViewsTestCase(TestCase):

    def setUp(self):
        self.quote1 = Quote.objects.create(text='Quote 1 text', author='Author 1')
        self.quote2 = Quote.objects.create(text='Quote 2 text', author='Author 2')

    def test_home_view(self):
        url = reverse('home')
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, self.quote1.text)
        self.assertContains(response, self.quote2.text)

    def test_add_quote_view(self):
        url = reverse('add_quote')
        data = {'text': 'New Quote Text', 'author': 'New Author'}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, 302)  # Check if redirecting after POST
        self.assertTrue(Quote.objects.filter(text='New Quote Text').exists())

    # Add more test cases as needed for other views and functionalities
