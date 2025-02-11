<?php

namespace App\Controller;

use App\Document\Article;
use Doctrine\ODM\MongoDB\DocumentManager;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;

#[Route('/api/articles')]
class ArticleController extends AbstractController
{

    #[Route('', methods: ['GET'])]
    public function getAll(DocumentManager $dm): JsonResponse
    {
        $this->denyAccessUnlessGranted('ROLE_USER');

        $articles = $dm->getRepository(Article::class)->findAll();
        return $this->json($articles);
    }

    #[Route('/{id}', methods: ['GET'])]
    public function getOne(DocumentManager $dm, string $id): JsonResponse
    {
        $this->denyAccessUnlessGranted('ROLE_USER');

        $article = $dm->getRepository(Article::class)->find($id);
        return $article ? $this->json($article) : $this->json(['error' => 'Not found'], 404);
    }

    #[Route('', methods: ['POST'])]
    public function create(Request $request, DocumentManager $dm): JsonResponse
    {
        $this->denyAccessUnlessGranted('ROLE_USER');

        $data = json_decode($request->getContent(), true);

        if (!isset($data['name'], $data['description'], $data['price'], $data['quantity'])) {
            return new JsonResponse(['message' => 'Missing fields'], 400);
        }

        if ($data['price'] <= 0 || $data['quantity'] <= 0) {
            return new JsonResponse(['message' => 'Price and quantity must be positive'], 400);
        }

        $article = new Article();
        $article->setName($data['name']);
        $article->setDescription($data['description']);
        $article->setPrice($data['price']);
        $article->setQuantity($data['quantity']);

        $dm->persist($article);
        $dm->flush();

        return $this->json($article, 201);
    }

    #[Route('/{id}', methods: ['PUT'])]
    public function update(Request $request, DocumentManager $dm, string $id): JsonResponse
    {
        $this->denyAccessUnlessGranted('ROLE_USER');

        $article = $dm->getRepository(Article::class)->find($id);
        if (!$article) {
            return $this->json(['error' => 'Not found'], 404);
        }

        $data = json_decode($request->getContent(), true);

        if ($data['price'] <= 0 || $data['quantity'] <= 0) {
            return new JsonResponse(['message' => 'Price and quantity must be positive'], 400);
        }

        $article->setName($data['name']);
        $article->setDescription($data['description']);
        $article->setPrice($data['price']);
        $article->setQuantity($data['quantity']);

        $dm->flush();

        return $this->json($article, 200);
    }

    #[Route('/{id}', methods: ['DELETE'])]
    public function delete(DocumentManager $dm, string $id): JsonResponse
    {
        $this->denyAccessUnlessGranted('ROLE_USER');

        $article = $dm->getRepository(Article::class)->find($id);
        if (!$article) {
            return $this->json(['error' => 'Not found'], 404);
        }

        $dm->remove($article);
        $dm->flush();

        return $this->json(null, 204);
    }
}
