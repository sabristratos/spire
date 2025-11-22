<?php

namespace SpireUI\Http\Controllers;

use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class AssetController extends Controller
{
    /**
     * @var array<string, string>
     */
    protected array $allowedFiles = [
        'spire-ui.css' => 'text/css',
        'spire-ui.esm.js' => 'application/javascript',
        'spire-ui.iife.js' => 'application/javascript',
        'spire-ui.esm.js.map' => 'application/json',
        'spire-ui.iife.js.map' => 'application/json',
    ];

    public function __invoke(string $file): Response|BinaryFileResponse
    {
        if (! array_key_exists($file, $this->allowedFiles)) {
            abort(404);
        }

        $path = __DIR__.'/../../../dist/'.$file;

        if (! file_exists($path)) {
            abort(404);
        }

        $contentType = $this->allowedFiles[$file];
        $lastModified = filemtime($path);

        return response()->file($path, [
            'Content-Type' => $contentType,
            'Cache-Control' => 'public, max-age=31536000, immutable',
            'Last-Modified' => gmdate('D, d M Y H:i:s', $lastModified).' GMT',
        ]);
    }
}
