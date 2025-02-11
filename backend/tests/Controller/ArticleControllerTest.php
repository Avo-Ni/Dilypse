<?php

namespace App\Tests\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Symfony\Component\HttpFoundation\Response;

class ArticleControllerTest extends WebTestCase
{
    public function testGetAllArticlesRequiresAuthentication()
    {
        $client = static::createClient();
        $client->request('GET', '/api/articles');

        $this->assertResponseStatusCodeSame(Response::HTTP_UNAUTHORIZED);
    }

    public function testCreateArticle()
    {
        $client = static::createClient();
        $client->request('POST', '/api/articles', [], [], ['CONTENT_TYPE' => 'application/json'], json_encode([
            'name' => 'Test Article',
            'description' => 'Test Description',
            'price' => 100,
            'quantity' => 10
        ]));

        $this->assertResponseStatusCodeSame(Response::HTTP_CREATED);
    }

    public function testGetOneArticle()
    {
        $client = static::createClient();
        $client->request('GET', '/api/articles/1');

        $this->assertResponseStatusCodeSame(Response::HTTP_UNAUTHORIZED);
    }

    public function testUpdateArticle()
    {
        $client = static::createClient();
        $client->request('PUT', '/api/articles/1', [], [], ['CONTENT_TYPE' => 'application/json'], json_encode([
            'name' => 'Updated Article',
            'description' => 'Updated Description',
            'price' => 150,
            'quantity' => 5
        ]));

        $this->assertResponseStatusCodeSame(Response::HTTP_UNAUTHORIZED);
    }

    public function testDeleteArticle()
    {
        $client = static::createClient();
        $client->request('DELETE', '/api/articles/1');

        $this->assertResponseStatusCodeSame(Response::HTTP_UNAUTHORIZED);
    }
}