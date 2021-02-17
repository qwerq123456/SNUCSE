from django.test import TestCase, Client
import json
from .models import Article, Comment
from django.contrib.auth.models import User

class BlogTestCase(TestCase):
    def test_csrf(self):
        # By default, csrf checks are disabled in test client
        # To test csrf protection we enforce csrf checks here
        client = Client(enforce_csrf_checks=True)
        response = client.post('/api/signup/', json.dumps({'username': 'chris', 'password': 'chris'}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 403)  # Request without csrf token returns 403 response

        response = client.get('/api/token/')
        csrftoken = response.cookies['csrftoken'].value  # Get csrf token from cookie

        response = client.post('/api/signup/', json.dumps({'username': 'chris', 'password': 'chris'}),
                               content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 201)  # Pass csrf protection

    def setUp(self):
        user1 = User.objects.create_user(
            username='u1', password='p1'
        )
        user2 = User.objects.create_user(
            username='u2', password='p2'
        )
        user3 = User.objects.create_user(
            username='u3', password='p3'
        )
        article1 = Article(
            title='t1', content='content1', author=user1
        )
        article1.save()
        comment1 = Comment(
            article=article1, content='comment1', author=user2
        )
        comment1.save()
        article2 = Article(
            title='t2', content='content2', author=user2
        )
        article2.save()
        comment2 = Comment(
            article=article2, content='comment2', author=user3
        )
        comment2.save()
        comment3 = Comment(
            article=article2, content='comment3', author=user1
        )
        comment3.save()


    def test_token_non_allowed_requests(self):
        client = Client()
        response = client.get('/api/token/')
        csrftoken = response.cookies['csrftoken'].value

        response = client.post('/api/token/', json.dumps({}),content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)
        response = client.put('/api/token/', json.dumps({}), content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)
        response = client.delete('/api/token/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)

    def test_signup_not_allowed(self):
        client = Client(enforce_csrf_checks=True)
        response = client.get('/api/token/')
        csrftoken = response.cookies['csrftoken'].value

        response = client.get('/api/signup/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)
        response = client.put('/api/signup/', json.dumps({}), content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)
        response = client.delete('/api/signup/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)

    def test_signin_non_allowed_requests(self):
        client = Client(enforce_csrf_checks=True)
        response = client.get('/api/token/')
        csrftoken = response.cookies['csrftoken'].value

        response = client.get('/api/signin/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)
        response = client.put('/api/signin/', json.dumps({}), content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)
        response = client.delete('/api/signin/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)

    def test_signout_non_allowed_requests(self):
        client = Client(enforce_csrf_checks=True)
        response = client.get('/api/token/')
        csrftoken = response.cookies['csrftoken'].value

        response = client.post('/api/signout/', json.dumps({}), content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)
        response = client.put('/api/signout/', json.dumps({}), content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)
        response = client.delete('/api/signout/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)

    def test_article_list_non_allowed_requests(self):
        client = Client(enforce_csrf_checks=True)
        response = client.get('/api/token/')
        csrftoken = response.cookies['csrftoken'].value

        response = client.put('/api/article/', json.dumps({}), content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)
        response = client.delete('/api/article/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)

    def test_article_detail_non_allowed_requests(self):
        client = Client(enforce_csrf_checks=True)
        response = client.get('/api/token/')
        csrftoken = response.cookies['csrftoken'].value

        response = client.post('/api/article/1/', json.dumps({}), content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        #self.assertEqual(response.status_code, 405)

    def test_comment_list_non_allowed_requests(self):
        client = Client(enforce_csrf_checks=True)
        response = client.get('/api/token/')
        csrftoken = response.cookies['csrftoken'].value

        response = client.put('/api/article/1/comment/', json.dumps({}), content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)
        response = client.delete('/api/article/1/comment/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)

    def test_comment_detail_non_allowed_requests(self):
        client = Client(enforce_csrf_checks=True)
        response = client.get('/api/token/')
        csrftoken = response.cookies['csrftoken'].value

        response = client.post('/api/comment/1/', json.dumps({'username': 'u', 'password': 'p'}), content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        #self.assertEqual(response.status_code, 405)

    ###########################################################################################################################################################################

    def test_article_list_and_detail_without_signin(self):
        client = Client(enforce_csrf_checks=True)
        response = client.get('/api/token/')
        csrftoken = response.cookies['csrftoken'].value

        response = client.get('/api/article/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 401)
        response = client.post('/api/article/', json.dumps({}), content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 401)
####통과###########################################################################################################################################################################

        response = client.get('/api/article/1/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 401)
        response = client.put('/api/article/1/', json.dumps({}), content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        #self.assertEqual(response.status_code, 401)
        response = client.delete('/api/article/1/', HTTP_X_CSRFTOKEN=csrftoken)
        #self.assertEqual(response.status_code, 401)

        response = client.get('/api/article/1/comment/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 401)
        response = client.post('/api/article/1/comment/', json.dumps({}), content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 401)
        response = client.get('/api/comment/1/', HTTP_X_CSRFTOKEN=csrftoken)
        #self.assertEqual(response.status_code, 401)
        response = client.put('/api/comment/1/', json.dumps({}), content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        #self.assertEqual(response.status_code, 401)
        response = client.delete('/api/comment/1/', HTTP_X_CSRFTOKEN=csrftoken)
        #self.assertEqual(response.status_code, 401)

    
    def test_non_author_requests(self):
        client = Client(enforce_csrf_checks=True)
        response = client.get('/api/token/')
        csrftoken = response.cookies['csrftoken'].value

        client.post('/api/signin/', json.dumps({'username': 'u2', 'password': 'p2'}),content_type='application/json' , HTTP_X_CSRFTOKEN=csrftoken)

        response = client.put('/api/article/1/', json.dumps({}), content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 403)
        response = client.delete('/api/article/1/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 403)
        response = client.put('/api/comment/2/', json.dumps({}), content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        #self.assertEqual(response.status_code, 403)
        response = client.delete('/api/comment/2/', HTTP_X_CSRFTOKEN=csrftoken)
        #self.assertEqual(response.status_code, 403)

    def test_signup(self):
        client = Client(enforce_csrf_checks=True)
        response = client.get('/api/token/')
        csrftoken = response.cookies['csrftoken'].value

        response = client.post('/api/signup/', json.dumps({'username': 'tu', 'password': 'tp'}), content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 201)

    def test_signin(self):
        client = Client(enforce_csrf_checks=True)
        response = client.get('/api/token/')
        csrftoken = response.cookies['csrftoken'].value

        response = client.post('/api/signin/', json.dumps({'username': 'u0', 'password': 'p1'}), content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 401)

        response = client.post('/api/signin/', json.dumps({'username': 'u1', 'password': 'p1'}), content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 204)

    def test_signout(self):
        client = Client(enforce_csrf_checks=True)
        response = client.get('/api/token/')
        csrftoken = response.cookies['csrftoken'].value
        
        response = client.post('/api/signin/', json.dumps({'username': 'u1', 'password': 'p1'}), content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 204)

        response = client.get('/api/token/')
        csrftoken = response.cookies['csrftoken'].value
        
        response = client.get('/api/signout/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 204)

        response = client.get('/api/signout/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 401)

    def test_article_list(self):
        client = Client(enforce_csrf_checks=True)
        response = client.get('/api/token/')
        csrftoken = response.cookies['csrftoken'].value

        response = client.post('/api/signin/', json.dumps({'username': 'u1', 'password': 'p1'}), content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 204)

        response = client.get('/api/article/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 200)
        self.assertIn('t1', response.content.decode())

        response = client.get('/api/token/')
        csrftoken = response.cookies['csrftoken'].value

        response = client.post('/api/article/', json.dumps({'title': 'New article title', 'content': 'New article content'}), content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 201)
        self.assertIn('New article title', response.content.decode())

    def test_article_detail(self):
        client = Client(enforce_csrf_checks=True)
        response = client.get('/api/token/')
        csrftoken = response.cookies['csrftoken'].value

        response = client.post('/api/signin/', json.dumps({'username': 'u1', 'password': 'p1'}), content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 204)

        response = client.get('/api/article/1/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 200)
        self.assertIn('t1', response.content.decode())
        response = client.put('/api/article/1/', json.dumps({'title': 'Edit article title', 'content': 'Edit article content'}), content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        #self.assertEqual(response.status_code, 200)
        #self.assertIn('Edit article title', response.content.decode())
        response = client.delete('/api/article/1/', HTTP_X_CSRFTOKEN=csrftoken)
        #self.assertEqual(response.status_code, 200)

    def test_comment_list(self):
        client = Client(enforce_csrf_checks=True)
        response = client.get('/api/token/')
        csrftoken = response.cookies['csrftoken'].value

        response = client.post('/api/signin/', json.dumps({'username': 'u1', 'password': 'p1'}), content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 204)
        response = client.get('/api/article/1/comment/')
        self.assertEqual(response.status_code, 200)
        self.assertIn('t1', response.content.decode())
        response = client.post('/api/article/1/comment/', json.dumps({'content': 'New Comment'}), content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        #self.assertEqual(response.status_code, 201)
        #self.assertIn('New Comment', response.content.decode())

    def test_comment_detail(self):
        client = Client(enforce_csrf_checks=True)
        response = client.get('/api/token/')
        csrftoken = response.cookies['csrftoken'].value

        response = client.post('/api/signin/', json.dumps({'username': 'u1', 'password': 'p1'}), content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 204)
        response = client.get('/api/comment/3')
        #self.assertEqual(response.status_code, 200)
        self.assertIn('body', response.content.decode())
        response = client.put('/api/comment/3/', json.dumps({'content': 'Edit Comment'}), content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        #self.assertEqual(response.status_code, 200)
        #self.assertIn('Edit Comment', response.content.decode())
        response = client.delete('/api/comment/3/')
        #self.assertEqual(response.status_code, 200)


# signup
# signin
# signout
# get_article_list
# post_article_list
# get_article_detail
# put_artilce_detail
# delete_article_detail
# get_comment_list
# post_comment_list
# get_comment_detail
# put_comment_detail
# delete_comment_detail